export interface CreateMessageInterface {
  content: string;
  chatId: string;
}

export interface StoreMessageInterface {
  sender: string;
  content: string;
  chatId: string;
}
