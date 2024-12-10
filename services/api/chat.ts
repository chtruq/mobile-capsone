import { AxiosError } from "axios";
import apiClient from "./apiClient";
interface SendMessagePayload {
  sessionId: string;
  senderId: string;
  messageContent: string;
  image?: File | null;
}
export const createChatSession = async (customerId: string) => {
  try {
    const response = await apiClient.post("/chats/create-session", {
      customerId,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating chat session:", error);
    throw error;
  }
};

export const sendChatMessage = async (data: SendMessagePayload) => {
  try {
    const formData = new FormData();
    console.log("Sending data:", {
      SessionId: data.sessionId,
      SenderId: data.senderId,
      MessageContent: data.messageContent,
    });
    formData.append("SessionId", data.sessionId);
    formData.append("SenderId", data.senderId);
    formData.append("MessageContent", data.messageContent);

    // Nếu có image thì mới append
    if (data.image) {
      formData.append("Image", data.image);
    }
    console.log("FormData content:");
    for (let [key, value] of (formData as any)._parts) {
      console.log(`${key}:`, value);
    }
    const response = await apiClient.post("/chats/send-message", formData, {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
      transformRequest: (data) => data,
    });
    return response.data;
  } catch (error) {
    console.error("Error sending message:", error);
    // details message error
    if (error instanceof AxiosError) {
      console.error("Error details:", error.response?.data);
    }
    throw error;
  }
};

export const getMessages = async (sessionId: string) => {
  try {
    const response = await apiClient.get(`/chats/history/${sessionId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching messages:", error);
    throw error;
  }
};
