import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  TabId, 
  TabConfig, 
  SampleChapter, 
  SubjectQuiz, 
  DailyNote, 
  VideoItem, 
  ClinicalImage, 
  ShopConfig, 
  Order,
  Question,
  OrderStatus 
} from '../types';
import { 
  INITIAL_TABS, 
  INITIAL_SHOP_CONFIG, 
  INITIAL_SAMPLE_CHAPTERS, 
  INITIAL_DAILY_NOTES, 
  INITIAL_SUBJECT_QUIZZES, 
  INITIAL_VIDEOS, 
  INITIAL_CLINICAL_IMAGES, 
  INITIAL_ORDERS 
} from '../data/initialData';

interface QuizResult {
  score: number;
  total: number;
  date: string;
}

interface AppContextType {
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;
  tabs: TabConfig[];
  updateTabs: (tabs: TabConfig[]) => void;
  
  sampleChapters: SampleChapter[];
  subjectQuizzes: SubjectQuiz[];
  dailyNotes: DailyNote[];
  addDailyNote: (note: Omit<DailyNote, 'id' | 'date'>) => void;
  deleteDailyNote: (id: string) => void;
  updateDailyNote: (note: DailyNote) => void;
  
  videos: VideoItem[];
  addVideo: (video: Omit<VideoItem, 'id'>) => void;
  deleteVideo: (id: string) => void;

  images: ClinicalImage[];
  addImage: (image: Omit<ClinicalImage, 'id'>) => void;
  deleteImage: (id: string) => void;

  shopConfig: ShopConfig;
  updateShopConfig: (config: Partial<ShopConfig>) => void;

  orders: Order[];
  createOrder: (orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus, trackingNumber?: string, courier?: string, note?: string) => void;
  
  isAdmin: boolean;
  loginAdmin: (passcodeOrEmail: string, pass?: string) => boolean;
  logoutAdmin: () => void;
  
  showCoverModal: boolean;
  setShowCoverModal: (show: boolean) => void;
  coverModalVolume: 1 | 2;
  setCoverModalVolume: (vol: 1 | 2) => void;

  bookmarks: string[];
  toggleBookmark: (id: string) => void;

  quizScores: Record<string, QuizResult>;
  saveQuizScore: (quizId: string, score: number, total: number) => void;

  selectedSubjectIdForQuiz: string | null;
  setSelectedSubjectIdForQuiz: (id: string | null) => void;

  versionTapCount: number;
  handleVersionTap: () => void;
  showAdminAuthModal: boolean;
  setShowAdminAuthModal: (show: boolean) => void;

  addQuestionsToSubject: (subjectId: string, questions: Question[]) => void;

  showChatbot: boolean;
  setShowChatbot: (show: boolean) => void;
  chatbotInitialQuery: string | null;
  openChatbotWithQuery: (query?: string) => void;

  showAndroidPublishModal: boolean;
  setShowAndroidPublishModal: (show: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load stored state or fall back to defaults
  const [activeTab, setActiveTab] = useState<TabId>('home');
  
  const [tabs, setTabs] = useState<TabConfig[]>(() => {
    try {
      const saved = localStorage.getItem('tr_tabs');
      return saved ? JSON.parse(saved) : INITIAL_TABS;
    } catch {
      return INITIAL_TABS;
    }
  });

  const [sampleChapters] = useState<SampleChapter[]>(INITIAL_SAMPLE_CHAPTERS);
  
  const [subjectQuizzes, setSubjectQuizzes] = useState<SubjectQuiz[]>(() => {
    try {
      const saved = localStorage.getItem('tr_subject_quizzes');
      return saved ? JSON.parse(saved) : INITIAL_SUBJECT_QUIZZES;
    } catch {
      return INITIAL_SUBJECT_QUIZZES;
    }
  });

  const [dailyNotes, setDailyNotes] = useState<DailyNote[]>(() => {
    try {
      const saved = localStorage.getItem('tr_daily_notes');
      return saved ? JSON.parse(saved) : INITIAL_DAILY_NOTES;
    } catch {
      return INITIAL_DAILY_NOTES;
    }
  });

  // Videos and images left blank by default
  const [videos, setVideos] = useState<VideoItem[]>(() => {
    try {
      localStorage.removeItem('tr_videos'); // Clear old mock videos
      const saved = localStorage.getItem('tr_videos_v2');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [images, setImages] = useState<ClinicalImage[]>(() => {
    try {
      localStorage.removeItem('tr_images'); // Clear old mock images
      const saved = localStorage.getItem('tr_images_v2');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [shopConfig, setShopConfig] = useState<ShopConfig>(() => {
    try {
      const saved = localStorage.getItem('tr_shop_config');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.upiId === 'kiranpatil.nursing@okaxis' || !parsed.upiId) {
          parsed.upiId = '8766492530-3@ybl';
          parsed.accountName = 'KIRAN SURESH MURKUT';
        }
        return { ...INITIAL_SHOP_CONFIG, ...parsed };
      }
      return INITIAL_SHOP_CONFIG;
    } catch {
      return INITIAL_SHOP_CONFIG;
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('tr_orders');
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('tr_admin_auth') === 'true';
    } catch {
      return false;
    }
  });

  const [showCoverModal, setShowCoverModal] = useState<boolean>(false);
  const [coverModalVolume, setCoverModalVolume] = useState<1 | 2>(1);

  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('tr_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [quizScores, setQuizScores] = useState<Record<string, QuizResult>>(() => {
    try {
      const saved = localStorage.getItem('tr_quiz_scores');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [versionTapCount, setVersionTapCount] = useState<number>(0);
  const [showAdminAuthModal, setShowAdminAuthModal] = useState<boolean>(false);
  const [selectedSubjectIdForQuiz, setSelectedSubjectIdForQuiz] = useState<string | null>(null);
  
  const [showChatbot, setShowChatbot] = useState<boolean>(false);
  const [chatbotInitialQuery, setChatbotInitialQuery] = useState<string | null>(null);
  const [showAndroidPublishModal, setShowAndroidPublishModal] = useState<boolean>(false);

  const openChatbotWithQuery = (query?: string) => {
    if (query) {
      setChatbotInitialQuery(query);
    }
    setShowChatbot(true);
  };

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('tr_tabs', JSON.stringify(tabs));
    } catch (e) {
      console.warn('LocalStorage error', e);
    }
  }, [tabs]);

  useEffect(() => {
    try {
      localStorage.setItem('tr_daily_notes', JSON.stringify(dailyNotes));
    } catch (e) {
      console.warn('LocalStorage error', e);
    }
  }, [dailyNotes]);

  useEffect(() => {
    try {
      localStorage.setItem('tr_subject_quizzes', JSON.stringify(subjectQuizzes));
    } catch (e) {
      console.warn('LocalStorage error', e);
    }
  }, [subjectQuizzes]);

  useEffect(() => {
    try {
      localStorage.setItem('tr_videos_v2', JSON.stringify(videos));
    } catch (e) {
      console.warn('LocalStorage error', e);
    }
  }, [videos]);

  useEffect(() => {
    try {
      localStorage.setItem('tr_images_v2', JSON.stringify(images));
    } catch (e) {
      console.warn('LocalStorage error', e);
    }
  }, [images]);

  useEffect(() => {
    try {
      localStorage.setItem('tr_shop_config', JSON.stringify(shopConfig));
    } catch (e) {
      console.warn('LocalStorage error', e);
    }
  }, [shopConfig]);

  useEffect(() => {
    try {
      localStorage.setItem('tr_orders', JSON.stringify(orders));
    } catch (e) {
      console.warn('LocalStorage error', e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('tr_bookmarks', JSON.stringify(bookmarks));
    } catch (e) {
      console.warn('LocalStorage error', e);
    }
  }, [bookmarks]);

  useEffect(() => {
    try {
      localStorage.setItem('tr_quiz_scores', JSON.stringify(quizScores));
    } catch (e) {
      console.warn('LocalStorage error', e);
    }
  }, [quizScores]);

  // Version tap counter - 7 taps unlocks admin modal!
  const handleVersionTap = () => {
    const nextCount = versionTapCount + 1;
    setVersionTapCount(nextCount);
    if (nextCount >= 7) {
      setVersionTapCount(0);
      setShowAdminAuthModal(true);
    }
  };

  const loginAdmin = (passcodeOrEmail: string, pass?: string): boolean => {
    // Allows password 'admin123456', or author name 'kiranpatil', or pass match
    const cleanEmail = passcodeOrEmail.trim().toLowerCase();
    const cleanPass = (pass || '').trim();

    if (
      cleanEmail === 'admin' ||
      cleanEmail === 'admin123456' ||
      cleanEmail === 'kiranpatil' ||
      cleanEmail === 'kiran' ||
      (cleanEmail.includes('nirasha') && cleanPass === 'admin123456') ||
      (cleanPass === 'admin123456' || cleanPass === 'totalrecall2026')
    ) {
      setIsAdmin(true);
      sessionStorage.setItem('tr_admin_auth', 'true');
      setShowAdminAuthModal(false);
      setActiveTab('admin');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
    sessionStorage.removeItem('tr_admin_auth');
    if (activeTab === 'admin') {
      setActiveTab('home');
    }
  };

  const updateTabs = (newTabs: TabConfig[]) => {
    setTabs(newTabs);
  };

  const addDailyNote = (noteData: Omit<DailyNote, 'id' | 'date'>) => {
    const newNote: DailyNote = {
      ...noteData,
      id: `note-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
    };
    setDailyNotes(prev => [newNote, ...prev]);
  };

  const updateDailyNote = (updated: DailyNote) => {
    setDailyNotes(prev => prev.map(n => n.id === updated.id ? updated : n));
  };

  const deleteDailyNote = (id: string) => {
    setDailyNotes(prev => prev.filter(n => n.id !== id));
  };

  const addVideo = (vidData: Omit<VideoItem, 'id'>) => {
    const newVid: VideoItem = {
      ...vidData,
      id: `v-${Date.now()}`
    };
    setVideos(prev => [newVid, ...prev]);
  };

  const deleteVideo = (id: string) => {
    setVideos(prev => prev.filter(v => v.id !== id));
  };

  const addImage = (imgData: Omit<ClinicalImage, 'id'>) => {
    const newImg: ClinicalImage = {
      ...imgData,
      id: `img-${Date.now()}`
    };
    setImages(prev => [newImg, ...prev]);
  };

  const deleteImage = (id: string) => {
    setImages(prev => prev.filter(i => i.id !== id));
  };

  const updateShopConfig = (partial: Partial<ShopConfig>) => {
    setShopConfig(prev => ({ ...prev, ...partial }));
  };

  const createOrder = (orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt' | 'status'>): Order => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newOrder: Order = {
      ...orderData,
      id: `TR-2026-${randomSuffix}`,
      status: 'Submitted',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setOrders(prev => [newOrder, ...prev]);
    return newOrder;
  };

  const updateOrderStatus = (
    orderId: string, 
    status: OrderStatus, 
    trackingNumber?: string, 
    courier?: string, 
    note?: string
  ) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        return {
          ...o,
          status,
          trackingNumber: trackingNumber !== undefined ? trackingNumber : o.trackingNumber,
          courierPartner: courier !== undefined ? courier : o.courierPartner,
          adminNote: note !== undefined ? note : o.adminNote,
          updatedAt: new Date().toISOString(),
        };
      }
      return o;
    }));
  };

  const toggleBookmark = (id: string) => {
    setBookmarks(prev => 
      prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]
    );
  };

  const saveQuizScore = (quizId: string, score: number, total: number) => {
    setQuizScores(prev => ({
      ...prev,
      [quizId]: {
        score,
        total,
        date: new Date().toISOString()
      }
    }));
  };

  const addQuestionsToSubject = (subjectId: string, newQuestions: Question[]) => {
    setSubjectQuizzes(prev => prev.map(subj => {
      if (subj.id === subjectId) {
        return {
          ...subj,
          questions: [...subj.questions, ...newQuestions],
          questionCount: subj.questions.length + newQuestions.length
        };
      }
      return subj;
    }));
  };

  return (
    <AppContext.Provider value={{
      activeTab,
      setActiveTab,
      tabs,
      updateTabs,
      sampleChapters,
      subjectQuizzes,
      dailyNotes,
      addDailyNote,
      deleteDailyNote,
      updateDailyNote,
      videos,
      addVideo,
      deleteVideo,
      images,
      addImage,
      deleteImage,
      shopConfig,
      updateShopConfig,
      orders,
      createOrder,
      updateOrderStatus,
      isAdmin,
      loginAdmin,
      logoutAdmin,
      showCoverModal,
      setShowCoverModal,
      coverModalVolume,
      setCoverModalVolume,
      bookmarks,
      toggleBookmark,
      quizScores,
      saveQuizScore,
      versionTapCount,
      handleVersionTap,
      showAdminAuthModal,
      setShowAdminAuthModal,
      selectedSubjectIdForQuiz,
      setSelectedSubjectIdForQuiz,
      addQuestionsToSubject,
      showChatbot,
      setShowChatbot,
      chatbotInitialQuery,
      openChatbotWithQuery,
      showAndroidPublishModal,
      setShowAndroidPublishModal
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
