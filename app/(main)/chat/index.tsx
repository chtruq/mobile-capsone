import {
  View,
  Text,
  ActivityIndicator,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  FlatList,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ThemedView } from "@/components/ThemedView";
import { useAuth } from "@/context/AuthContext";
import {
  createChatSession,
  getMessages,
  sendChatMessage,
} from "@/services/api/chat";
import * as ImagePicker from "expo-image-picker";
import Feather from "@expo/vector-icons/Feather";
import { signalRService } from "@/services/api/signalRservice";
import { useSignalR } from "@/hooks/useSignalR";
import Toast from "react-native-toast-message";
import { Colors } from "@/constants/Colors";
interface MessageData {
  sessionId: string;
  senderId: string;
  messageContent: string;
  image?: any;
}

const ChatScreen = () => {
  const { userInfo, userToken } = useAuth();
  const { isConnected, error } = useSignalR(userInfo?.id || "");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [newReceiveMessage, setNewReceiveMessage] = useState<ChatMessage>();
  const [customerId, setCustomerId] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [status, setStatus] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string>("");
  const handlePress = (item: ChatMessage) => {
    setExpandedItemId(expandedItemId === item.id ? null : item.id);
  };
  const createSession = async () => {
    try {
      const createSession = await createChatSession(userInfo?.id || "");
      setSessionId(createSession?.data?.id);
    } catch (error) {
      console.error("Error creating session: ", error);
      Toast.show({
        type: "error",
        text1: "Đang kết nối",
      });
    }
  };

  useEffect(() => {
    createSession();
  }, []);

  const fetchMessages = async () => {
    setIsLoading(true);
    if (!sessionId) {
      console.log("Session ID is required.");
      return;
    }
    try {
      const fetchedMessages = await getMessages(sessionId);
      if (fetchedMessages?.data) {
        setMessages(fetchedMessages?.data);
        setCustomerId(userInfo?.id || "");
      }
    } catch (error) {
      console.error("Error fetching messages: ", error);
      Toast.show({
        type: "error",
        text1: "Đang kết nối",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const checkConnection = async () => {
      if (!signalRService.isConnected()) {
        await signalRService.startConnection(userToken || "");
      }
      await fetchMessages();
      await connectToSignalR();
    };
    checkConnection();
  }, [sessionId]);

  // Connect to SignalR
  const connectToSignalR = async () => {
    try {
      if (!userToken) {
        Alert.alert("Token không hợp lệ.");
        return;
      }
      console.log("Token được sử dụng:", userToken);
      setStatus("Đang kết nối tới SignalR Hub...");
      await signalRService.startConnection(userToken);
      setStatus("Kết nối thành công với SignalR Hub!");
      signalRService.setMessageCallback((message) => {
        console.log("Message received:chathub", message);
        setNewReceiveMessage(message);
        console.log("New message:", newReceiveMessage);
      });

      setStatus("Connected to SignalR Hub!");
    } catch (error) {
      setStatus("Failed to connect. Check your token.");
    }
  };

  useEffect(() => {
    const connection = signalRService.getConnection();

    if (!connection) return;
    connection.on("ReceiveChatMessage", () =>
      console.log("ReceiveChatMessage event registered")
    );
    connection.onclose(() => {
      console.warn("SignalR connection closed. Reconnecting...");
      setStatus("Connection closed. Reconnecting...");
      reconnectToSignalR();
    });

    connection.onreconnecting(() => {
      console.warn("SignalR is reconnecting...");
      setStatus("Reconnecting...");
    });

    connection.onreconnected(() => {
      console.log("SignalR reconnected.");
      setStatus("Reconnected to SignalR Hub!");
    });

    return () => {
      signalRService.stopConnection();
    };
  }, []);

  // Reconnect Logic
  const reconnectToSignalR = () => {
    setTimeout(() => {
      connectToSignalR();
    }, 5000);
  };
  const displayMessage = (message: ChatMessage) => {
    const newMessage: ChatMessage = {
      id: message.id,
      sessionId: message.sessionId,
      senderId: message.senderId,
      receiverId: message.receiverId,
      messageContent: message.messageContent,
      timestamp: message.timestamp,
      imageUrl: message.imageUrl,
    };

    setMessages((prevMessages: any) => {
      const newMessages = [newMessage as ChatMessage, ...prevMessages];
      const uniqueMessages = Array.from(
        new Set(newMessages.map((msg) => msg.id))
      ).map((id) => newMessages.find((msg) => msg.id === id));
      return uniqueMessages;
    });
  };

  useEffect(() => {
    if (newReceiveMessage) {
      displayMessage(newReceiveMessage);
    }
  }, [newReceiveMessage]);

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setSelectedImage(result.assets[0]);
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Toast.show({
        type: "error",
        text1: "Có lỗi xảy ra",
      });
    }
  };

  // Hàm gửi tin nhắn với ảnh
  const handleSendMessage = async () => {
    try {
      if (!newMessage && !selectedImage) return;

      const messageData: MessageData = {
        sessionId: sessionId,
        senderId: customerId,
        messageContent: newMessage,
      };

      // Nếu có ảnh được chọn, thêm vào FormData
      if (selectedImage) {
        // Tạo file từ URI
        const imageUri = selectedImage.uri;
        const filename = imageUri.split("/").pop();
        const match = /\.(\w+)$/.exec(filename || "");
        const type = match ? `image/${match[1]}` : "image";

        const image = {
          uri: imageUri,
          name: filename,
          type,
        } as any;

        messageData.image = image;
      }

      await sendChatMessage(messageData);

      // Reset sau khi gửi
      setNewMessage("");
      setSelectedImage(null);
      await fetchMessages();
    } catch (error) {
      console.error("Error sending message:", error);
      Toast.show({
        position: "top",
        type: "error",
        text1: "Đang kết nối",
      });
    }
  };

  //

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={90}
      style={{
        flex: 1,
      }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ThemedView style={{ flex: 1 }}>
          {isLoading && (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ActivityIndicator size="large" color={Colors.light.primary} />
            </View>
          )}

          <FlatList
            style={{}}
            data={messages}
            renderItem={({ item }) => (
              <Pressable
                key={item.id}
                style={{
                  width: "100%",
                  alignItems:
                    item.senderId === customerId ? "flex-end" : "flex-start",
                  marginVertical: 5,
                }}
                onPress={() => handlePress(item)}
              >
                <View
                  style={{
                    backgroundColor:
                      item.senderId === customerId ? "#007AFF" : "#e5e5e5",
                    padding: 10,
                    borderRadius: 10,
                    maxWidth: "70%",
                  }}
                >
                  {item.imageUrl && (
                    <Image
                      source={{ uri: item.imageUrl }}
                      style={{ width: 200, height: 200, borderRadius: 10 }}
                    />
                  )}

                  <Text
                    style={{
                      color: item.senderId === customerId ? "#fff" : "#000",
                    }}
                  >
                    {item.messageContent}
                  </Text>
                </View>
                {expandedItemId === item.id && (
                  <Text
                    style={{
                      color: "#ccc",
                      fontSize: 12,
                      marginTop: 5,
                    }}
                  >
                    {item?.timestamp
                      ? new Date(item.timestamp).toLocaleString()
                      : "Invalid date"}
                  </Text>
                )}
              </Pressable>
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ padding: 16 }}
            keyboardShouldPersistTaps="handled"
            inverted // Đảo ngược danh sách để hiển thị tin nhắn mới nhất ở dưới cùng
          />

          {/* Input section */}

          <View
            style={{
              padding: 15,
              borderTopWidth: 1,
              borderTopColor: "#e5e5e5",
              backgroundColor: "#fff",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <TouchableOpacity onPress={pickImage} style={{ marginRight: 10 }}>
                <Feather name="image" size={24} color="black" />
              </TouchableOpacity>

              {selectedImage && (
                <Image
                  source={{ uri: selectedImage.uri }}
                  style={{ width: 40, height: 40, marginRight: 10 }}
                />
              )}

              <TextInput
                style={{
                  flex: 1,
                  borderWidth: 1,
                  borderRadius: 20,
                  padding: 20,
                  maxHeight: 100,
                  borderColor: "#e5e5e5",
                }}
                value={newMessage}
                onChangeText={setNewMessage}
                placeholder="Nhập tin nhắn..."
                multiline
              />

              {
                // Nếu không có tin nhắn thì disable nút gửi
                newMessage || selectedImage ? (
                  <TouchableOpacity
                    onPress={handleSendMessage}
                    style={{ marginLeft: 10 }}
                  >
                    <Feather name="send" size={24} color="black" />
                  </TouchableOpacity>
                ) : (
                  <View style={{ marginLeft: 10 }}>
                    <Feather name="send" size={24} color="#e5e5e5" />
                  </View>
                )
              }

              {/* <TouchableOpacity
                onPress={handleSendMessage}
                style={{ marginLeft: 10 }}
              >
                <Feather name="send" size={24} color="black" />
              </TouchableOpacity> */}
            </View>
          </View>
        </ThemedView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;
