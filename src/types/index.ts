// 消息类型定义
export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: number;
  metadata?: Record<string, any>;
}

// 聊天状态
export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}