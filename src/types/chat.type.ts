export interface AccessChatInterface {
  userId: string;
}

export interface ChatDataInterface {
  chatName: string;
  isGroupChat: boolean;
  users: any[];
}

export interface GroupChatInterface {
  groupName: string;
  users: string;
}

export interface RenameGroupInterface {
  groupName: string;
  chatId: string;
}

export interface UserManipulationInterface {
  chatId: string;
  userId: string;
}
