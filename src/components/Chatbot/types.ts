export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'text' | 'options' | 'form';
  options?: string[];
  metadata?: {
    userInfo?: Partial<UserInfo>;
    intent?: string;
    confidence?: number;
  };
}

export interface UserInfo {
  name: string;
  email: string;
  phone: string;
  hasProvidedInfo: boolean;
  interests?: string[];
  propertyType?: 'residential' | 'commercial' | 'industrial';
  monthlyBill?: number;
  location?: string;
}

export interface ChatbotState {
  isOpen: boolean;
  isMinimized: boolean;
  messages: ChatMessage[];
  isTyping: boolean;
  userInfo: UserInfo;
  conversationStage: 'greeting' | 'info_gathering' | 'qualifying' | 'providing_info' | 'closing';
}

export interface BotResponse {
  text: string;
  type?: 'text' | 'options' | 'form';
  options?: string[];
  userInfo?: Partial<UserInfo>;
  nextStage?: ChatbotState['conversationStage'];
}