interface ChatMessage {
  id: string;
  sessionId: string;
  senderId: string;
  receiverId?: string;
  messageContent: string;
  timestamp?: string;
  imageUrl?: string;
}
