export interface CreateMessageInterface {
  content: string;
  chatId: string;
}

export interface StoreMessageInterface {
  sender: string;
  content: string;
  chat: string;
  sentiment: string;
  accuracy: number;
}
