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
