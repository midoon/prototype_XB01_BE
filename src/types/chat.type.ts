export interface AccessChatInterface {
  user_id: string;
}

export interface ChatDataInterface {
  chatName: string;
  isGroupChat: boolean;
  users: any[];
}

export interface GroupChatInterface {
  group_name: string;
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
