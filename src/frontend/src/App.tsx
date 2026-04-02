import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/sonner";
import {
  BarChart2,
  Bell,
  BookCheck,
  BookOpen,
  Briefcase,
  Bus,
  Calendar,
  CalendarRange,
  CheckCircle2,
  ClipboardCheck,
  ClipboardList,
  DollarSign,
  FileBarChart,
  FileText,
  FolderOpen,
  Globe,
  GraduationCap,
  LayoutDashboard,
  Library,
  LogOut,
  Mail,
  Menu,
  MessageSquare,
  RefreshCw,
  Search,
  Settings,
  ShieldCheck,
  Star,
  Upload,
  User,
  UserSquare,
  Users,
  Users2,
  UsersRound,
  X,
} from "lucide-react";
import {
  Component,
  type ErrorInfo,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { toast } from "sonner";
import { FloatingSmartAssistant } from "./components/FloatingSmartAssistant";
import { LanguageProvider, useLanguage } from "./contexts/LanguageContext";

import AcademicYearPage from "./pages/AcademicYearPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import AnnouncementsPage from "./pages/AnnouncementsPage";
import AttendancePage from "./pages/AttendancePage";
import AuditLogPage from "./pages/AuditLogPage";
import BulkImportPage from "./pages/BulkImportPage";
import ClassesPage from "./pages/ClassesPage";
import ClubsPage from "./pages/ClubsPage";
import CollegeStudentPortal from "./pages/CollegeStudentPortal";
import CollegeStudentsPage from "./pages/CollegeStudentsPage";
import Dashboard from "./pages/Dashboard";
import DocumentsPage from "./pages/DocumentsPage";
import EventsPage from "./pages/EventsPage";
import ExamsPage from "./pages/ExamsPage";
import FacultyPage from "./pages/FacultyPage";
import FacultyPortal from "./pages/FacultyPortal";
import FinancePage from "./pages/FinancePage";
import ForumsPage from "./pages/ForumsPage";
import GradesPage from "./pages/GradesPage";
import HomeworkPage from "./pages/HomeworkPage";
import LandingPage from "./pages/LandingPage";
import LibraryPage from "./pages/LibraryPage";
import MessagesPage from "./pages/MessagesPage";
import ParentPortal from "./pages/ParentPortal";
import QuestionPaperPage from "./pages/QuestionPaperPage";
import ReportsPage from "./pages/ReportsPage";
import SettingsPage from "./pages/SettingsPage";
import StudentPortal from "./pages/StudentPortal";
import StudentsPage from "./pages/StudentsPage";
import SubjectsPage from "./pages/SubjectsPage";
import TeacherPortal from "./pages/TeacherPortal";
import TeachersPage from "./pages/TeachersPage";
import TimetablePage from "./pages/TimetablePage";
import TransportPage from "./pages/TransportPage";

// ─── localStorage Auth Helpers ───────────────────────────────────────────────
const SESSION_KEY = "edumanage_session";
const USERS_KEY = "edumanage_users";

export type UserRole =
  | "admin"
  | "teacher"
  | "student"
  | "college_student"
  | "faculty"
  | "parent";

export interface AppUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface AppSession {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

function getUsers(): AppUser[] {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveUsers(users: AppUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function getSession(): AppSession | null {
  try {
    const s = localStorage.getItem(SESSION_KEY);
    return s ? JSON.parse(s) : null;
  } catch {
    return null;
  }
}

function saveSession(s: AppSession) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(s));
}

function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

// ─── Error Boundary ──────────────────────────────────────────────────────────
interface EBState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<
  { children: ReactNode; fallback?: ReactNode },
  EBState
> {
  constructor(props: { children: ReactNode; fallback?: ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error: Error): EBState {
    return { hasError: true, error };
  }
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("[EduManage] Caught error:", error, info);
  }
  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <div className="flex flex-col items-center justify-center min-h-[300px] p-8 text-center">
          <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 max-w-md w-full">
            <h2 className="text-lg font-bold text-gray-700 dark:text-gray-200 mb-2">
              Something went wrong
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              {this.state.error?.message || "An unexpected error occurred."}
            </p>
            <button
              type="button"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-700 text-white text-sm rounded-lg hover:bg-gray-800 transition-colors"
              onClick={() => this.setState({ hasError: false, error: null })}
            >
              <RefreshCw size={14} /> Try Again
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

class AppErrorBoundary extends Component<{ children: ReactNode }, EBState> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error: Error): EBState {
    return { hasError: true, error };
  }
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("[EduManage AppError]", error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-black p-6">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-10 max-w-md w-full text-center">
            <GraduationCap size={40} className="mx-auto mb-4 text-black" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              EduManage
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mb-2">
              The application encountered an error.
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 rounded p-2 mb-6 font-mono">
              {this.state.error?.message || "Unknown error"}
            </p>
            <button
              type="button"
              className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-900 transition-colors"
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.reload();
              }}
            >
              <RefreshCw size={16} /> Reload App
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// ─── Types ───────────────────────────────────────────────────────────────────
type Page =
  | "dashboard"
  | "students"
  | "teachers"
  | "classes"
  | "attendance"
  | "grades"
  | "timetable"
  | "exams"
  | "announcements"
  | "library"
  | "finance"
  | "events"
  | "subjects"
  | "reports"
  | "messages"
  | "settings"
  | "college-students"
  | "faculty"
  | "transport"
  | "homework"
  | "parent-portal"
  | "bulk-import"
  | "academic-year"
  | "clubs"
  | "question-paper"
  | "forums"
  | "documents"
  | "analytics"
  | "audit-log";

const navItems: { id: Page; label: string; icon: ReactNode }[] = [
  { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
  { id: "students", label: "Students", icon: <Users size={18} /> },
  { id: "teachers", label: "Teachers", icon: <GraduationCap size={18} /> },
  { id: "classes", label: "Classes", icon: <BookOpen size={18} /> },
  { id: "attendance", label: "Attendance", icon: <ClipboardCheck size={18} /> },
  { id: "grades", label: "Grades", icon: <Star size={18} /> },
  { id: "subjects", label: "Subjects", icon: <FileText size={18} /> },
  { id: "timetable", label: "Timetable", icon: <Calendar size={18} /> },
  { id: "exams", label: "Exams", icon: <FileText size={18} /> },
  {
    id: "question-paper",
    label: "Question Papers",
    icon: <ClipboardList size={18} />,
  },
  { id: "library", label: "Library", icon: <Library size={18} /> },
  { id: "finance", label: "Finance", icon: <DollarSign size={18} /> },
  { id: "events", label: "Events", icon: <Calendar size={18} /> },
  { id: "clubs", label: "Clubs & Societies", icon: <UsersRound size={18} /> },
  { id: "reports", label: "Reports", icon: <FileBarChart size={18} /> },
  { id: "bulk-import", label: "Bulk Import", icon: <Upload size={18} /> },
  {
    id: "academic-year",
    label: "Academic Year",
    icon: <CalendarRange size={18} />,
  },
  { id: "announcements", label: "Announcements", icon: <Bell size={18} /> },
  { id: "transport", label: "Transport", icon: <Bus size={18} /> },
  { id: "homework", label: "Homework", icon: <BookCheck size={18} /> },
  {
    id: "college-students",
    label: "College Students",
    icon: <UserSquare size={18} />,
  },
  { id: "faculty", label: "College Faculty", icon: <Briefcase size={18} /> },
  { id: "parent-portal", label: "Parent Portal", icon: <Users2 size={18} /> },
  { id: "messages", label: "Messages", icon: <Mail size={18} /> },
  {
    id: "forums",
    label: "Discussion Forums",
    icon: <MessageSquare size={18} />,
  },
  { id: "documents", label: "Documents", icon: <FolderOpen size={18} /> },
  { id: "analytics", label: "Analytics", icon: <BarChart2 size={18} /> },
  { id: "audit-log", label: "Audit Log", icon: <ShieldCheck size={18} /> },
  { id: "settings", label: "Settings", icon: <Settings size={18} /> },
];

const schoolNavItems: { id: Page; label: string; icon: ReactNode }[] = [
  { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
  { id: "students", label: "Students", icon: <Users size={18} /> },
  { id: "teachers", label: "Teachers", icon: <GraduationCap size={18} /> },
  { id: "classes", label: "Classes", icon: <BookOpen size={18} /> },
  { id: "attendance", label: "Attendance", icon: <ClipboardCheck size={18} /> },
  { id: "grades", label: "Grades", icon: <Star size={18} /> },
  { id: "subjects", label: "Subjects", icon: <FileText size={18} /> },
  { id: "timetable", label: "Timetable", icon: <Calendar size={18} /> },
  { id: "exams", label: "Exams", icon: <FileText size={18} /> },
  {
    id: "question-paper",
    label: "Question Papers",
    icon: <ClipboardList size={18} />,
  },
  { id: "library", label: "Library", icon: <Library size={18} /> },
  { id: "finance", label: "Finance", icon: <DollarSign size={18} /> },
  { id: "events", label: "Events", icon: <Calendar size={18} /> },
  { id: "clubs", label: "Clubs & Societies", icon: <UsersRound size={18} /> },
  { id: "reports", label: "Reports", icon: <FileBarChart size={18} /> },
  { id: "bulk-import", label: "Bulk Import", icon: <Upload size={18} /> },
  {
    id: "academic-year",
    label: "Academic Year",
    icon: <CalendarRange size={18} />,
  },
  { id: "announcements", label: "Announcements", icon: <Bell size={18} /> },
  { id: "transport", label: "Transport", icon: <Bus size={18} /> },
  { id: "homework", label: "Homework", icon: <BookCheck size={18} /> },
  { id: "parent-portal", label: "Parent Portal", icon: <Users2 size={18} /> },
];

const collegeNavItems: { id: Page; label: string; icon: ReactNode }[] = [
  {
    id: "college-students",
    label: "College Students",
    icon: <UserSquare size={18} />,
  },
  { id: "faculty", label: "College Faculty", icon: <Briefcase size={18} /> },
];

const generalNavItems: { id: Page; label: string; icon: ReactNode }[] = [
  { id: "messages", label: "Messages", icon: <Mail size={18} /> },
  {
    id: "forums",
    label: "Discussion Forums",
    icon: <MessageSquare size={18} />,
  },
  { id: "documents", label: "Documents", icon: <FolderOpen size={18} /> },
  { id: "analytics", label: "Analytics", icon: <BarChart2 size={18} /> },
  { id: "audit-log", label: "Audit Log", icon: <ShieldCheck size={18} /> },
  { id: "settings", label: "Settings", icon: <Settings size={18} /> },
];

type Notification = {
  id: number;
  title: string;
  time: string;
  read: boolean;
  page: Page;
};

const initialNotifications: Notification[] = [
  {
    id: 1,
    title: "New student enrolled: Aisha Rahman",
    time: "2 min ago",
    read: false,
    page: "students",
  },
  {
    id: 2,
    title: "Exam results posted for Grade 10",
    time: "15 min ago",
    read: false,
    page: "exams",
  },
  {
    id: 3,
    title: "Upcoming event: Sports Day on Friday",
    time: "1 hr ago",
    read: false,
    page: "events",
  },
  {
    id: 4,
    title: "Library book overdue: Physics Vol. 2",
    time: "3 hrs ago",
    read: true,
    page: "library",
  },
  {
    id: 5,
    title: "Fee payment received from Ali Hassan",
    time: "Yesterday",
    read: true,
    page: "finance",
  },
];

function ParentPortalWrapper({ onLogout }: { onLogout: () => void }) {
  return (
    <div className="flex flex-col h-screen">
      <div className="bg-black text-white px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <GraduationCap size={20} />
          <span className="font-bold">EduManage — Parent Portal</span>
        </div>
        <button
          type="button"
          onClick={onLogout}
          className="flex items-center gap-1.5 text-sm text-gray-300 hover:text-white"
        >
          <LogOut size={15} /> Sign Out
        </button>
      </div>
      <div className="flex-1 overflow-auto">
        <ParentPortal />
      </div>
    </div>
  );
}

// ─── Language Switcher ────────────────────────────────────────────────────────
function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const langs = [
    { value: "en", label: "English" },
    { value: "hi", label: "हिन्दी" },
    { value: "ta", label: "தமிழ்" },
    { value: "te", label: "తెలుగు" },
    { value: "kn", label: "ಕನ್ನಡ" },
    { value: "ml", label: "മലയാളം" },
    { value: "bn", label: "বাংলা" },
    { value: "mr", label: "मराठी" },
    { value: "gu", label: "ગુજરાતી" },
  ];
  return (
    <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 dark:bg-gray-800 rounded-lg px-2 py-1">
      <Globe size={14} className="text-muted-foreground shrink-0" />
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as typeof language)}
        data-ocid="header.lang.select"
        className="bg-transparent text-xs font-medium text-gray-700 dark:text-gray-200 border-none outline-none cursor-pointer"
      >
        {langs.map((l) => (
          <option key={l.value} value={l.value}>
            {l.label}
          </option>
        ))}
      </select>
    </div>
  );
}

// ─── Main App ────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <AppErrorBoundary>
      <LanguageProvider>
        <AppInner />
      </LanguageProvider>
    </AppErrorBoundary>
  );
}

function AppInner() {
  const { t } = useLanguage();

  // Initialize background color from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("edumanage_bg_color");
    if (stored === "black") {
      document.documentElement.classList.add("dark");
      document.body.classList.remove("bg-blue-theme");
    } else if (stored === "blue") {
      document.documentElement.classList.remove("dark");
      document.body.classList.add("bg-blue-theme");
      document.body.style.backgroundColor = "#1e3a5f";
    } else {
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("bg-blue-theme");
    }
  }, []);
  const navKeyMap: Record<string, string> = {
    dashboard: "dashboard",
    students: "students",
    teachers: "teachers",
    classes: "classes",
    attendance: "attendance",
    grades: "grades",
    subjects: "subjects",
    timetable: "timetable",
    exams: "exams",
    "question-paper": "questionPaper",
    library: "library",
    finance: "finance",
    events: "events",
    clubs: "clubs",
    reports: "reports",
    "bulk-import": "bulkImport",
    "academic-year": "academicYear",
    announcements: "announcements",
    transport: "transport",
    homework: "homework",
    "college-students": "collegeStudents",
    faculty: "collegeFaculty",
    "parent-portal": "parentPortal",
    messages: "messages",
    forums: "forums",
    documents: "documents",
    analytics: "analytics",
    "audit-log": "auditLog",
    settings: "settings",
  };
  const [session, setSession] = useState<AppSession | null>(() => getSession());
  const [activePage, setActivePage] = useState<Page>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(
    () => window.innerWidth >= 1024,
  );

  const [showAuthForm, setShowAuthForm] = useState(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupRole, setSignupRole] = useState("");
  const [signupError, setSignupError] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] =
    useState<Notification[]>(initialNotifications);
  const notifRef = useRef<HTMLDivElement>(null);

  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const searchResults = searchQuery.trim()
    ? navItems.filter((item) =>
        item.label.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : [];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node))
        setSearchOpen(false);
      if (notifRef.current && !notifRef.current.contains(e.target as Node))
        setNotifOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target as Node))
        setProfileOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSearchOpen(false);
        setNotifOpen(false);
        setProfileOpen(false);
        setShowAuthForm(false);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    if (localStorage.getItem("edumanage_dark_mode") === "true") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);
  // Listen for navigation events from FloatingSmartAssistant
  useEffect(() => {
    const handler = (e: Event) => {
      const page = (e as CustomEvent).detail?.page;
      if (page && navItems.some((n) => n.id === page)) {
        setActivePage(page as Page);
      }
    };
    window.addEventListener("edumanage-navigate", handler);
    return () => window.removeEventListener("edumanage-navigate", handler);
  }, []);

  const handleLogin = () => {
    setLoginError("");
    if (!loginEmail.trim()) {
      setLoginError("Please enter your email.");
      return;
    }
    if (!loginPassword.trim()) {
      setLoginError("Please enter your password.");
      return;
    }

    const users = getUsers();
    const found = users.find(
      (u) =>
        u.email.toLowerCase() === loginEmail.toLowerCase().trim() &&
        u.password === loginPassword,
    );

    if (!found) {
      if (
        loginEmail.toLowerCase().trim() === "admin@edumanage.com" &&
        loginPassword === "admin123"
      ) {
        const sess: AppSession = {
          id: "admin-default",
          name: "Administrator",
          email: "admin@edumanage.com",
          role: "admin",
        };
        saveSession(sess);
        setSession(sess);
        setShowAuthForm(false);
        setLoginEmail("");
        setLoginPassword("");
        toast.success("Welcome back, Administrator!");
        return;
      }
      setLoginError("Invalid email or password. Try signing up first.");
      return;
    }

    const sess: AppSession = {
      id: found.id,
      name: found.name,
      email: found.email,
      role: found.role,
    };
    saveSession(sess);
    setSession(sess);
    setShowAuthForm(false);
    setLoginEmail("");
    setLoginPassword("");
    toast.success(`Welcome back, ${found.name}!`);
  };

  const handleSignup = () => {
    setSignupError("");
    if (!signupName.trim()) {
      setSignupError("Please enter your full name.");
      return;
    }
    if (!signupEmail.trim()) {
      setSignupError("Please enter your email.");
      return;
    }
    if (!signupPassword.trim()) {
      setSignupError("Please enter a password.");
      return;
    }
    if (!signupRole) {
      setSignupError("Please select your role.");
      return;
    }

    const users = getUsers();
    if (
      users.find(
        (u) => u.email.toLowerCase() === signupEmail.toLowerCase().trim(),
      )
    ) {
      setSignupError("An account with this email already exists.");
      return;
    }

    const newUser: AppUser = {
      id: `user-${Date.now()}`,
      name: signupName.trim(),
      email: signupEmail.trim().toLowerCase(),
      password: signupPassword,
      role: signupRole as UserRole,
    };
    saveUsers([...users, newUser]);

    const sess: AppSession = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    };
    saveSession(sess);
    setSession(sess);
    setShowAuthForm(false);
    setSignupName("");
    setSignupEmail("");
    setSignupPassword("");
    setSignupRole("");

    const roleLabel: Record<string, string> = {
      student: "Student",
      college_student: "College Student",
      teacher: "Teacher",
      faculty: "College Faculty",
      admin: "Administrator",
      parent: "Parent",
    };
    toast.success(
      `Account created! Welcome, ${newUser.name} (${roleLabel[newUser.role] || newUser.role})`,
    );
  };

  const handleLogout = () => {
    clearSession();
    setSession(null);
    setActivePage("dashboard");
  };

  const handleNavigate = (page: string) => {
    if (navItems.some((n) => n.id === page)) setActivePage(page as Page);
  };

  const navigateTo = (page: Page) => {
    setActivePage(page);
    if (window.innerWidth < 768) setSidebarOpen(false);
  };

  // ─── Not authenticated ────────────────────────────────────────────────────
  if (!session) {
    return (
      <>
        <ErrorBoundary>
          <LandingPage
            onSignIn={() => {
              setAuthMode("signin");
              setShowAuthForm(true);
            }}
          />
        </ErrorBoundary>

        {showAuthForm && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm"
            data-ocid="auth.modal"
          >
            <button
              type="button"
              aria-label="Close"
              className="absolute inset-0 w-full h-full cursor-default"
              onClick={() => setShowAuthForm(false)}
            />
            <div className="relative rounded-2xl overflow-hidden shadow-2xl w-full max-w-sm mx-4 max-h-[90vh] overflow-y-auto flex flex-col">
              {/* ── Blue header section ── */}
              <div className="bg-white px-8 py-7 flex-shrink-0 border-b border-gray-200">
                <button
                  type="button"
                  aria-label="Close modal"
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors"
                  data-ocid="auth.modal.close_button"
                  onClick={() => setShowAuthForm(false)}
                >
                  <X size={20} />
                </button>

                <div className="flex items-center justify-center gap-2 mb-1">
                  <GraduationCap size={30} className="text-gray-900" />
                  <span className="text-2xl font-bold text-gray-900 tracking-tight">
                    EduManage
                  </span>
                </div>
                <p className="text-gray-500 text-xs text-center mb-5">
                  Smart School &amp; College Management
                </p>

                {/* Pill tab switcher */}
                <div className="flex gap-2 bg-gray-100 rounded-full p-1">
                  <button
                    type="button"
                    className={`flex-1 py-1.5 rounded-full text-sm font-semibold transition-all ${authMode === "signin" ? "bg-white text-gray-900 shadow" : "text-gray-500 hover:text-gray-700"}`}
                    onClick={() => {
                      setAuthMode("signin");
                      setLoginError("");
                      setSignupError("");
                    }}
                  >
                    Sign In
                  </button>
                  <button
                    type="button"
                    className={`flex-1 py-1.5 rounded-full text-sm font-semibold transition-all ${authMode === "signup" ? "bg-white text-gray-900 shadow" : "text-gray-500 hover:text-gray-700"}`}
                    onClick={() => {
                      setAuthMode("signup");
                      setLoginError("");
                      setSignupError("");
                    }}
                  >
                    Sign Up
                  </button>
                </div>
              </div>

              {/* ── White form section ── */}
              <div className="bg-white px-8 py-6">
                {authMode === "signin" ? (
                  <>
                    <div className="space-y-4">
                      <div>
                        <Label
                          htmlFor="login-email"
                          className="text-sm font-medium text-gray-700"
                        >
                          Email Address
                        </Label>
                        <Input
                          id="login-email"
                          type="email"
                          placeholder="your@email.com"
                          className="mt-1.5 border-gray-300 focus:ring-2 focus:ring-gray-400 focus:border-gray-400"
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                          data-ocid="login.email.input"
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor="login-password"
                          className="text-sm font-medium text-gray-700"
                        >
                          Password
                        </Label>
                        <Input
                          id="login-password"
                          type="password"
                          placeholder="Your password"
                          className="mt-1.5 border-gray-300 focus:ring-2 focus:ring-gray-400 focus:border-gray-400"
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                          data-ocid="login.password.input"
                        />
                      </div>
                      {loginError && (
                        <p
                          className="text-sm text-red-500"
                          data-ocid="login.error_state"
                        >
                          {loginError}
                        </p>
                      )}
                      <div className="text-xs bg-gray-50 border border-gray-200 text-gray-700 rounded-lg p-3">
                        <strong>Demo Admin:</strong> admin@edumanage.com /
                        admin123
                      </div>
                      <Button
                        onClick={handleLogin}
                        className="w-full bg-gray-900 hover:bg-gray-700 text-white shadow-md hover:shadow-lg transition-all"
                        data-ocid="login.primary_button"
                      >
                        Sign In
                      </Button>
                    </div>
                    <p className="mt-5 text-center text-sm text-gray-500">
                      Don&apos;t have an account?{" "}
                      <button
                        type="button"
                        className="text-gray-900 font-semibold hover:text-gray-600 transition-colors"
                        data-ocid="login.signup.link"
                        onClick={() => {
                          setAuthMode("signup");
                          setLoginError("");
                        }}
                      >
                        Sign Up
                      </button>
                    </p>
                  </>
                ) : (
                  <>
                    <div className="space-y-4">
                      <div>
                        <Label
                          htmlFor="signup-name"
                          className="text-sm font-medium text-gray-700"
                        >
                          Full Name
                        </Label>
                        <Input
                          id="signup-name"
                          type="text"
                          placeholder="Enter your full name"
                          className="mt-1.5 border-gray-300 focus:ring-2 focus:ring-gray-400 focus:border-gray-400"
                          value={signupName}
                          onChange={(e) => setSignupName(e.target.value)}
                          data-ocid="signup.name.input"
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor="signup-email"
                          className="text-sm font-medium text-gray-700"
                        >
                          Email Address
                        </Label>
                        <Input
                          id="signup-email"
                          type="email"
                          placeholder="your@email.com"
                          className="mt-1.5 border-gray-300 focus:ring-2 focus:ring-gray-400 focus:border-gray-400"
                          value={signupEmail}
                          onChange={(e) => setSignupEmail(e.target.value)}
                          data-ocid="signup.email.input"
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor="signup-password"
                          className="text-sm font-medium text-gray-700"
                        >
                          Password
                        </Label>
                        <Input
                          id="signup-password"
                          type="password"
                          placeholder="Choose a password"
                          className="mt-1.5 border-gray-300 focus:ring-2 focus:ring-gray-400 focus:border-gray-400"
                          value={signupPassword}
                          onChange={(e) => setSignupPassword(e.target.value)}
                          data-ocid="signup.password.input"
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor="signup-role"
                          className="text-sm font-medium text-gray-700"
                        >
                          Role
                        </Label>
                        <select
                          id="signup-role"
                          value={signupRole}
                          onChange={(e) => setSignupRole(e.target.value)}
                          data-ocid="signup.role.select"
                          className="mt-1.5 w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400"
                        >
                          <option value="" disabled>
                            Select your role
                          </option>
                          <option value="student">Student</option>
                          <option value="college_student">
                            College Student
                          </option>
                          <option value="teacher">Teacher</option>
                          <option value="faculty">College Faculty</option>
                          <option value="parent">Parent</option>
                          <option value="admin">Administrator</option>
                        </select>
                      </div>
                      {signupError && (
                        <p
                          className="text-sm text-red-500"
                          data-ocid="signup.error_state"
                        >
                          {signupError}
                        </p>
                      )}
                      <Button
                        onClick={handleSignup}
                        className="w-full bg-gray-900 hover:bg-gray-700 text-white shadow-md hover:shadow-lg transition-all"
                        data-ocid="signup.submit_button"
                      >
                        Create Account
                      </Button>
                    </div>
                    <p className="mt-5 text-center text-sm text-gray-500">
                      Already have an account?{" "}
                      <button
                        type="button"
                        className="text-gray-900 font-semibold hover:text-gray-600 transition-colors"
                        data-ocid="signup.signin.link"
                        onClick={() => {
                          setAuthMode("signin");
                          setSignupError("");
                        }}
                      >
                        Sign In
                      </button>
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
        <Toaster richColors />
      </>
    );
  }

  // ─── Role-based portal routing ────────────────────────────────────────────
  if (session.role === "student") {
    return (
      <>
        <ErrorBoundary>
          <StudentPortal studentName={session.name} onLogout={handleLogout} />
        </ErrorBoundary>
        <FloatingSmartAssistant />
        <Toaster richColors />
      </>
    );
  }
  if (session.role === "college_student") {
    return (
      <>
        <ErrorBoundary>
          <CollegeStudentPortal
            studentName={session.name}
            onLogout={handleLogout}
          />
        </ErrorBoundary>
        <FloatingSmartAssistant />
        <Toaster richColors />
      </>
    );
  }
  if (session.role === "faculty") {
    return (
      <>
        <ErrorBoundary>
          <FacultyPortal facultyName={session.name} onLogout={handleLogout} />
        </ErrorBoundary>
        <FloatingSmartAssistant />
        <Toaster richColors />
      </>
    );
  }
  if (session.role === "teacher") {
    return (
      <>
        <ErrorBoundary>
          <TeacherPortal teacherName={session.name} onLogout={handleLogout} />
        </ErrorBoundary>
        <FloatingSmartAssistant />
        <Toaster richColors />
      </>
    );
  }
  if (session.role === "parent") {
    return (
      <>
        <ErrorBoundary>
          <ParentPortalWrapper onLogout={handleLogout} />
        </ErrorBoundary>
        <FloatingSmartAssistant />
        <Toaster richColors />
      </>
    );
  }

  // ─── Admin Portal ─────────────────────────────────────────────────────────
  const pageComponents: Record<Page, ReactNode> = {
    dashboard: <Dashboard onNavigate={handleNavigate} />,
    students: <StudentsPage />,
    teachers: <TeachersPage />,
    classes: <ClassesPage />,
    attendance: <AttendancePage />,
    grades: <GradesPage />,
    timetable: <TimetablePage />,
    exams: <ExamsPage />,
    announcements: <AnnouncementsPage />,
    library: <LibraryPage />,
    finance: <FinancePage />,
    events: <EventsPage />,
    subjects: <SubjectsPage />,
    reports: <ReportsPage />,
    messages: <MessagesPage />,
    settings: <SettingsPage />,
    "college-students": <CollegeStudentsPage />,
    faculty: <FacultyPage />,
    transport: <TransportPage />,
    homework: <HomeworkPage />,
    "parent-portal": <ParentPortalWrapper onLogout={handleLogout} />,
    "bulk-import": <BulkImportPage />,
    "academic-year": <AcademicYearPage />,
    clubs: <ClubsPage />,
    "question-paper": <QuestionPaperPage />,
    forums: <ForumsPage />,
    documents: <DocumentsPage />,
    analytics: <AnalyticsPage />,
    "audit-log": <AuditLogPage />,
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-60 flex flex-col transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ background: "#0a0a0a" }}
      >
        <div className="flex items-center justify-between px-5 py-5 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <GraduationCap size={26} className="text-white" />
            <span className="text-white font-bold text-lg tracking-tight">
              EduManage
            </span>
          </div>
          <button
            type="button"
            aria-label="Close sidebar"
            className="text-gray-400 hover:text-white transition-colors"
            data-ocid="sidebar.close_button"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          {/* School Section */}
          <div className="mb-3">
            <p className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">
              {t("school")}
            </p>
            <div className="space-y-0.5">
              {schoolNavItems.map((item) => (
                <button
                  type="button"
                  key={item.id}
                  data-ocid={`nav.${item.id}.link`}
                  onClick={() => navigateTo(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    activePage === item.id
                      ? "bg-white dark:bg-gray-900 text-black"
                      : "text-gray-400 hover:text-white hover:bg-white dark:bg-gray-900/10"
                  }`}
                >
                  {item.icon}
                  {t(navKeyMap[item.id]) || item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-white/10 my-2" />

          {/* College Section */}
          <div className="mb-3">
            <p className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">
              {t("college")}
            </p>
            <div className="space-y-0.5">
              {collegeNavItems.map((item) => (
                <button
                  type="button"
                  key={item.id}
                  data-ocid={`nav.${item.id}.link`}
                  onClick={() => navigateTo(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    activePage === item.id
                      ? "bg-white dark:bg-gray-900 text-black"
                      : "text-gray-400 hover:text-white hover:bg-white dark:bg-gray-900/10"
                  }`}
                >
                  {item.icon}
                  {t(navKeyMap[item.id]) || item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-white/10 my-2" />

          {/* General Section */}
          <div>
            <p className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">
              {t("general")}
            </p>
            <div className="space-y-0.5">
              {generalNavItems.map((item) => (
                <button
                  type="button"
                  key={item.id}
                  data-ocid={`nav.${item.id}.link`}
                  onClick={() => navigateTo(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    activePage === item.id
                      ? "bg-white dark:bg-gray-900 text-black"
                      : "text-gray-400 hover:text-white hover:bg-white dark:bg-gray-900/10"
                  }`}
                >
                  {item.icon}
                  {t(navKeyMap[item.id]) || item.label}
                </button>
              ))}
            </div>
          </div>
        </nav>

        <div className="px-4 py-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="text-xs font-semibold bg-white dark:bg-gray-900 text-black">
                {session.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">
                {session.name}
              </p>
              <p className="text-gray-400 text-xs">Administrator</p>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="text-gray-400 hover:text-white transition-colors"
              data-ocid="nav.logout.button"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          className="fixed inset-0 z-40 bg-black/50 w-full cursor-default"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div
        className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${sidebarOpen ? "ml-60" : "ml-0"}`}
      >
        <header className="h-14 bg-background border-b border-border flex items-center px-4 gap-3 shrink-0">
          <button
            type="button"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Toggle sidebar"
            data-ocid="sidebar.toggle"
            onClick={() => setSidebarOpen((prev) => !prev)}
          >
            <Menu size={20} />
          </button>

          <div className="flex-1 max-w-md" ref={searchRef}>
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                placeholder="Search pages..."
                className="pl-9 h-9 text-sm bg-muted/50 border-0"
                data-ocid="header.search_input"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSearchOpen(true);
                }}
                onFocus={() => setSearchOpen(true)}
              />
              {searchOpen && searchQuery.trim() && (
                <div className="absolute top-full left-0 mt-1 w-full bg-card border border-border rounded-lg shadow-lg z-50 overflow-hidden">
                  {searchResults.length > 0 ? (
                    <ul className="py-1">
                      {searchResults.map((item) => (
                        <li key={item.id}>
                          <button
                            type="button"
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 dark:bg-gray-700 transition-colors"
                            data-ocid={`search.${item.id}.link`}
                            onClick={() => {
                              setActivePage(item.id);
                              setSearchQuery("");
                              setSearchOpen(false);
                            }}
                          >
                            <span className="text-gray-500 dark:text-gray-400">
                              {item.icon}
                            </span>
                            {item.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                      No results found
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="ml-auto flex items-center gap-2 md:gap-3">
            {/* Language Switcher */}
            <LanguageSwitcher />

            <Separator orientation="vertical" className="h-6" />

            {/* Notifications */}
            <div className="relative" ref={notifRef}>
              <button
                type="button"
                className="relative text-muted-foreground hover:text-foreground transition-colors p-1"
                data-ocid="header.notifications.button"
                onClick={() => {
                  setNotifOpen((p) => !p);
                  setProfileOpen(false);
                }}
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-black text-white text-[10px] font-bold flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {notifOpen && (
                <div
                  className="absolute right-0 top-full mt-2 w-80 bg-card border border-border rounded-xl shadow-xl z-50"
                  data-ocid="header.notifications.panel"
                >
                  <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                    <span className="font-semibold text-sm">Notifications</span>
                    {unreadCount > 0 && (
                      <button
                        type="button"
                        className="text-xs text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white"
                        data-ocid="header.notifications.mark_all.button"
                        onClick={() =>
                          setNotifications((n) =>
                            n.map((x) => ({ ...x, read: true })),
                          )
                        }
                      >
                        Mark all read
                      </button>
                    )}
                  </div>
                  <ul className="divide-y divide-gray-50">
                    {notifications.map((n) => (
                      <li key={n.id}>
                        <button
                          type="button"
                          className={`w-full flex items-start gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 dark:bg-gray-800 transition-colors text-left ${n.read ? "opacity-60" : ""}`}
                          data-ocid={`notification.item.${n.id}`}
                          onClick={() => {
                            setNotifications((prev) =>
                              prev.map((x) =>
                                x.id === n.id ? { ...x, read: true } : x,
                              ),
                            );
                            setActivePage(n.page);
                            setNotifOpen(false);
                          }}
                        >
                          {!n.read && (
                            <span className="mt-1.5 h-2 w-2 rounded-full bg-black shrink-0" />
                          )}
                          {n.read && (
                            <span className="mt-1.5 h-2 w-2 shrink-0" />
                          )}
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              {n.title}
                            </p>
                            <p className="text-xs text-gray-400 mt-0.5">
                              {n.time}
                            </p>
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <Separator orientation="vertical" className="h-6" />

            {/* Profile */}
            <div className="relative" ref={profileRef}>
              <button
                type="button"
                className="flex items-center gap-2"
                data-ocid="header.profile.button"
                onClick={() => {
                  setProfileOpen((p) => !p);
                  setNotifOpen(false);
                }}
              >
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="text-xs font-semibold bg-black text-white">
                    {session.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden sm:block text-sm font-medium text-gray-700 dark:text-gray-200">
                  {session.name}
                </span>
              </button>

              {profileOpen && (
                <div
                  className="absolute right-0 top-full mt-2 w-48 bg-card border border-border rounded-xl shadow-xl z-50 overflow-hidden"
                  data-ocid="header.profile.panel"
                >
                  <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {session.name}
                    </p>
                    <p className="text-xs text-gray-400">{session.email}</p>
                  </div>
                  <button
                    type="button"
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 dark:bg-gray-800"
                    data-ocid="header.profile.settings.button"
                    onClick={() => {
                      setActivePage("settings");
                      setProfileOpen(false);
                    }}
                  >
                    <Settings size={14} /> Settings
                  </button>
                  <button
                    type="button"
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 dark:bg-gray-800"
                    data-ocid="header.profile.logout.button"
                    onClick={() => {
                      setProfileOpen(false);
                      handleLogout();
                    }}
                  >
                    <LogOut size={14} /> Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-4 md:p-6">
          <ErrorBoundary key={activePage}>
            {pageComponents[activePage]}
          </ErrorBoundary>
        </main>
      </div>

      <FloatingSmartAssistant />
      <Toaster richColors />
    </div>
  );
}
