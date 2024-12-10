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
} from "react-native";
import React, { useEffect, useState } from "react";
import { ThemedView } from "@/components/ThemedView";
import { useAuth } from "@/context/AuthContext";
import { useSignalR } from "@/hooks/useSignalR";
import { signalRService } from "@/services/api/signalRservice";
import {
  createChatSession,
  getMessages,
  sendChatMessage,
} from "@/services/api/chat";
import * as ImagePicker from "expo-image-picker";
import Feather from "@expo/vector-icons/Feather";
interface MessageData {
  sessionId: string;
  senderId: string;
  messageContent: string;
  image?: any;
}

const ChatScreen = () => {
  const { userInfo } = useAuth();
  const { isConnected, isLoading, error } = useSignalR(userInfo?.id || "");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [customerId, setCustomerId] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<any>(null);
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const createSession = await createChatSession(userInfo?.id || "");
        const sessionId =
          createSession?.data?.id || "c55e81f4-1e92-433a-8181-5379f4f45663";

        const fetchedMessages = await getMessages(sessionId);
        if (fetchedMessages?.data) {
          setMessages(fetchedMessages.data);
          setCustomerId(fetchedMessages.data[0]?.senderId || "");
        }
      } catch (error) {
        console.error("Error fetching messages: ", error);
      }
    };

    if (isConnected) {
      fetchMessages();
    }
  }, [isConnected]);

  useEffect(() => {
    const chatConnection = signalRService.getChatConnection();

    if (chatConnection) {
      chatConnection.on("ReceiveChatMessage", (message: ChatMessage) => {
        console.log("Received message:", message);
        setMessages((prevMessages) => {
          const messageExists = prevMessages.some(
            (msg) => msg.id === message.id
          );
          if (messageExists) return prevMessages;
          return [...prevMessages, message];
        });
      });

      // Xử lý reconnect
      chatConnection.onreconnecting(() => {
        console.warn("Chat reconnecting...");
      });

      chatConnection.onreconnected(() => {
        console.log("Chat reconnected successfully.");
      });

      chatConnection.onclose((error) => {
        console.error("Chat connection closed:", error);
      });

      return () => {
        chatConnection.off("ReceiveChatMessage");
        chatConnection.off("reconnecting");
        chatConnection.off("reconnected");
        chatConnection.off("close");
      };
    }
  }, []);

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
    }
  };

  // Hàm gửi tin nhắn với ảnh
  const handleSendMessage = async () => {
    try {
      if (!newMessage && !selectedImage) return;

      const messageData: MessageData = {
        sessionId: "c55e81f4-1e92-433a-8181-5379f4f45663",
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
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  //

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ThemedView style={{ flex: 1 }}>
        <Text>
          Connection Status: {isConnected ? "Connected" : "Disconnected"}
        </Text>

        {isLoading && <ActivityIndicator size="large" color="#0000ff" />}

        {error && <Text style={{ color: "red" }}>{error}</Text>}

        <Text>Chat Screen</Text>
        <FlatList
          data={messages}
          renderItem={({ item }) => (
            <View
              key={item.id}
              style={{
                width: "100%",
                alignItems:
                  item.senderId === customerId ? "flex-end" : "flex-start",
                marginVertical: 5,
              }}
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
                <Text
                  style={{
                    color: item.senderId === customerId ? "#fff" : "#000",
                  }}
                >
                  {item.messageContent}
                </Text>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16 }}
          keyboardShouldPersistTaps="handled"
          // inverted // Đảo ngược danh sách để hiển thị tin nhắn mới nhất ở dưới cùng
        />

        {/* Input section */}
        <View
          style={{
            padding: 10,
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
                padding: 10,
                maxHeight: 100,
                borderColor: "#e5e5e5",
              }}
              value={newMessage}
              onChangeText={setNewMessage}
              placeholder="Nhập tin nhắn..."
              multiline
            />

            <TouchableOpacity
              onPress={handleSendMessage}
              style={{ marginLeft: 10 }}
            >
              <Feather name="send" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </ThemedView>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;
