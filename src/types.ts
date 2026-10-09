export type TabId = 
  | 'home' 
  | 'daily-notes' 
  | 'daily-quiz' 
  | 'subject-quizzes' 
  | 'samples' 
  | 'videos' 
  | 'images' 
  | 'buy' 
  | 'orders' 
  | 'about' 
  | 'admin';

export interface TabConfig {
  id: TabId;
  label: string;
  enabled: boolean;
  order: number;
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  answer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  subjectId?: string;
  chapterId?: string;
}

export interface SubjectQuiz {
  id: string;
  title: string;
  icon: string;
  category: 'core-nursing' | 'allied-sciences' | 'non-nursing';
  questionCount: number;
  questions: Question[];
  highYieldTopics: string[];
}

export interface SamplePage {
  pageNumber: number;
  header: string;
  title: string;
  content: string[];
  keyPoints?: string[];
  table?: {
    caption: string;
    headers: string[];
    rows: string[][];
  };
  clinicalAlert?: string;
}

export interface SampleChapter {
  id: string;
  title: string;
  subtitle: string;
  unit: string;
  pageRange: string;
  pages: SamplePage[];
  questions: Question[];
}

export interface DailyNote {
  id: string;
  title: string;
  date: string;
  subject: string;
  readTime: string;
  content: string; // Markdown supported
  tags: string[];
  isGolden: boolean;
}

export interface OrderItem {
  id: string;
  name: string;
  volume: string;
  quantity: number;
  price: number;
  mrp: number;
}

export type OrderStatus = 'Submitted' | 'Confirmed' | 'Dispatched' | 'Delivered' | 'Cancelled';

export interface Order {
  id: string;
  buyerName: string;
  phone: string;
  altPhone?: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  landmark?: string;
  items: OrderItem[];
  itemDescription: string;
  totalAmount: number;
  utr: string; // 12-digit UPI reference number
  upiIdUsed: string;
  payeeName: string;
  status: OrderStatus;
  trackingNumber?: string;
  courierPartner?: string;
  adminNote?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ShopConfig {
  upiId: string;
  accountName: string;
  setPrice: number;
  setMrp: number;
  vol1Price: number;
  vol1Mrp: number;
  vol2Price: number;
  vol2Mrp: number;
  deliveryFee: number;
  isOpen: boolean;
  noticeBanner: string;
  aboutText: string;
}

export interface VideoItem {
  id: string;
  title: string;
  youtubeId: string;
  duration: string;
  subject: string;
  instructor: string;
  summary: string;
}

export interface ClinicalImage {
  id: string;
  title: string;
  category: string;
  description: string;
  diagramSvg?: string;
  imageUrl?: string;
  tags: string[];
}
