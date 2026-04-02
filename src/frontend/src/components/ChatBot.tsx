import {
  Bot,
  MessageCircle,
  Mic,
  MicOff,
  Send,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Message = {
  id: number;
  role: "user" | "bot";
  text: string;
  timestamp: Date;
};

const KNOWLEDGE_BASE: { keywords: string[]; reply: string }[] = [
  {
    keywords: [
      "hello",
      "hi",
      "hey",
      "good morning",
      "good afternoon",
      "good evening",
      "howdy",
    ],
    reply: "Hello! Welcome to EduManage. How can I assist you today?",
  },
  {
    keywords: [
      "bye",
      "goodbye",
      "see you",
      "thanks",
      "thank you",
      "ok thanks",
      "okay thanks",
    ],
    reply: "You're welcome! Feel free to ask anytime. Have a great day!",
  },
  {
    keywords: [
      "add student",
      "new student",
      "enroll student",
      "create student",
    ],
    reply:
      "To add a new student, go to the Students page from the sidebar and click the '+ Add Student' button. Fill in the name, class, section, and other details, then click Save.",
  },
  {
    keywords: ["student", "students"],
    reply:
      "You can manage all students from the Students page. It supports adding, editing, deleting, searching by name/class, and linking login accounts for portal access.",
  },
  {
    keywords: ["add teacher", "new teacher", "create teacher"],
    reply:
      "To add a teacher, go to the Teachers page and click '+ Add Teacher'. You can fill in their name, subject, and contact details.",
  },
  {
    keywords: ["teacher", "teachers"],
    reply:
      "Teacher records are managed on the Teachers page. You can add, edit, and delete teachers, assign subjects, and view their full profiles.",
  },
  {
    keywords: ["mark attendance", "take attendance", "attendance today"],
    reply:
      "Go to the Attendance page, select a class and today's date, and toggle each student as Present or Absent. Changes are saved automatically.",
  },
  {
    keywords: ["attendance"],
    reply:
      "The Attendance page lets you track daily attendance for any class. Select a class and date, then mark each student present or absent.",
  },
  {
    keywords: ["enter grade", "add grade", "grade entry", "enter marks"],
    reply:
      "Go to the Grades page, select a class and subject, then enter scores for each student. Grades are saved per subject per class.",
  },
  {
    keywords: ["grade", "grades", "marks", "score", "scores"],
    reply:
      "Grades are managed on the Grades page. Select the class and subject, then enter or update each student's score. Grade reports can be viewed in Reports.",
  },
  {
    keywords: ["timetable", "schedule", "class schedule", "period"],
    reply:
      "The Timetable page lets you build and edit class schedules. You can add periods, set timings, and assign teachers and subjects to each slot.",
  },
  {
    keywords: ["exam", "exams", "test", "tests", "examination"],
    reply:
      "Exams are scheduled on the Exams page. You can create exam entries with dates, subjects, and class, and record results after they're completed.",
  },
  {
    keywords: ["book", "books", "library", "borrow", "return book"],
    reply:
      "The Library page lets you manage the school's book inventory. You can add books, track availability, and manage borrowing and return records.",
  },
  {
    keywords: ["fee", "fees", "payment", "finance", "due", "dues", "invoice"],
    reply:
      "Finance tracking is on the Finance page. You can record fee payments, view outstanding dues per student, and generate financial summaries.",
  },
  {
    keywords: ["event", "events", "school event", "activity"],
    reply:
      "School events are created and managed on the Events page. You can add event names, dates, descriptions, and notify relevant users.",
  },
  {
    keywords: ["announcement", "announcements", "notice", "notices"],
    reply:
      "Post announcements from the Announcements page. They are visible to all users on their dashboards and portals.",
  },
  {
    keywords: ["subject", "subjects"],
    reply:
      "Subjects are managed on the Subjects page. You can add subjects, and each class from Nursery to Grade 12 has its own set of assigned subjects.",
  },
  {
    keywords: ["class", "classes", "nursery", "lkg", "ukg", "grade"],
    reply:
      "EduManage supports all classes from Nursery, LKG, UKG to Grade 12. Each class has its own students, subjects, timetable, and attendance records.",
  },
  {
    keywords: ["dark mode", "dark theme", "theme"],
    reply:
      "Dark mode can be toggled from the Settings page under Appearance. Once enabled, it applies to the entire app immediately.",
  },
  {
    keywords: ["password", "change password", "reset password"],
    reply:
      "To change your password, go to Settings and find the Security section. Enter your current password and the new password, then click Save.",
  },
  {
    keywords: ["notification", "notifications", "bell"],
    reply:
      "Notifications appear in the bell icon at the top right of the page. Click any notification to jump directly to the relevant section.",
  },
  {
    keywords: ["setting", "settings", "profile", "account settings"],
    reply:
      "In the Settings page you can update your profile name and photo, change your password, toggle notifications, and switch dark mode on or off.",
  },
  {
    keywords: ["dashboard"],
    reply:
      "The Dashboard is your home screen. It shows total students, teachers, attendance stats, recent activity, top students leaderboard, and quick action buttons.",
  },
  {
    keywords: ["message", "messages", "inbox", "send message", "compose"],
    reply:
      "Messages work like a Gmail inbox. Go to the Messages page to compose a new message, reply to received ones, or view starred and sent messages. All user roles can message each other.",
  },
  {
    keywords: ["college student", "college students"],
    reply:
      "College Students have a dedicated portal with tabs for My Courses, My Grades (with GPA), Assignments, Fee Status, Academic Calendar, and Messages.",
  },
  {
    keywords: ["college faculty", "faculty", "professor"],
    reply:
      "College Faculty have their own portal with My Courses, Student Roster, Grade Submission, Assignments, Attendance, and Messages tabs. They can also manage course enrollments.",
  },
  {
    keywords: [
      "course",
      "courses",
      "enroll",
      "enrollment",
      "register",
      "credit",
    ],
    reply:
      "College students can register for courses from the Course Registration tab in their portal. There's a live credit tracker and an 18-credit limit. Faculty can view and manage enrollments from their portal.",
  },
  {
    keywords: ["login", "sign in", "log in"],
    reply:
      "To log in, click Sign In on the landing page and enter your credentials. New users can click Sign Up and choose their role to get started.",
  },
  {
    keywords: ["signup", "sign up", "new account", "create account"],
    reply:
      "Click Sign Up on the login screen, enter your full name, and choose your role: Student, Teacher, College Student, College Faculty, or Admin. You'll be taken to your role-specific portal.",
  },
  {
    keywords: ["logout", "log out", "sign out"],
    reply:
      "To log out, click the Sign Out button at the top right of the page or portal header.",
  },
  {
    keywords: ["report", "reports"],
    reply:
      "The Reports page provides summaries for attendance, grades, and finance. Select a period and format (PDF/CSV/XLSX), then click Download on any report card.",
  },
  {
    keywords: ["link account", "link login", "student login"],
    reply:
      "On the Students page, each student row has a 'Login Account' column. Click the Link button to associate a student with a login account for portal access.",
  },
  {
    keywords: ["gpa", "cgpa"],
    reply:
      "College students can view their GPA on the My Grades tab inside the College Student Portal. GPA is calculated based on submitted course grades.",
  },
  {
    keywords: [
      "what can you do",
      "what do you do",
      "features",
      "help me",
      "help",
    ],
    reply:
      "I can help you with: Students, Teachers, Attendance, Grades, Timetable, Exams, Library, Finance, Events, Announcements, Messages, Settings, College portals, Course registration, and more. I can also navigate you to any section — just say 'go to [page name]'!",
  },
  {
    keywords: [
      "switch portal",
      "go to admin",
      "admin portal",
      "open portal",
      "change portal",
    ],
    reply:
      "To switch portals, click the Sign Out / Logout button at the top right, then sign back in with the appropriate account credentials for the portal you want to access.",
  },
  // Student portal tab navigation
  {
    keywords: ["my grades", "grades tab", "view grades", "show grades"],
    reply: "Opening the Grades tab for you now!",
  },
  {
    keywords: [
      "my attendance",
      "attendance tab",
      "view attendance",
      "show attendance",
    ],
    reply: "Opening the Attendance tab for you now!",
  },
  {
    keywords: ["pay fees", "fees tab", "fee payment", "view fees"],
    reply: "Opening the Fees tab for you now!",
  },
  {
    keywords: ["my messages", "messages tab", "open messages", "view messages"],
    reply: "Opening the Messages tab for you now!",
  },
  // College student portal tabs
  {
    keywords: ["my courses", "course registration", "register course"],
    reply: "Opening the Courses tab for you now!",
  },
  {
    keywords: ["study materials", "study material", "course materials"],
    reply: "Opening the Study Materials tab for you now!",
  },
  {
    keywords: ["internship", "internships", "internship tracker"],
    reply: "Opening the Internships tab for you now!",
  },
  {
    keywords: ["scholarship", "scholarships"],
    reply: "Opening the Scholarships tab for you now!",
  },
  {
    keywords: ["research project", "research tab"],
    reply: "Opening the Research tab for you now!",
  },
  // Faculty portal tabs
  {
    keywords: ["student roster", "roster tab", "view roster"],
    reply: "Opening the Student Roster tab for you now!",
  },
  {
    keywords: ["grade submission", "submit grades"],
    reply: "Opening the Grade Submission tab for you now!",
  },
  {
    keywords: ["office hours", "office hour"],
    reply: "Opening the Office Hours tab for you now!",
  },
  {
    keywords: ["leave request", "leave requests", "apply leave"],
    reply: "Opening the Leave Requests tab for you now!",
  },
  {
    keywords: ["student feedback", "feedback tab", "view feedback"],
    reply: "Opening the Student Feedback tab for you now!",
  },
];

const FALLBACK_RESPONSES = [
  "I'm not sure about that specific topic. Try asking about students, teachers, attendance, grades, exams, library, finance, events, or any EduManage feature!",
  "That's outside my current knowledge. I can help you with features like Students, Grades, Attendance, Finance, Messages, or Settings -- just ask!",
  "I didn't quite catch that. Could you rephrase? I can answer questions about managing students, teachers, timetables, exams, library, and more.",
  "I'm best at answering questions about EduManage features. Try asking about a specific page like Dashboard, Attendance, Grades, or Finance.",
  "Not sure I have an answer for that. You can ask me things like 'How do I add a student?' or 'Where do I find attendance?' or say 'go to grades' to navigate!",
];

function getNavigationIntent(input: string): string | null {
  const lower = input.toLowerCase().trim();
  const navMap: { keywords: string[]; page: string }[] = [
    {
      keywords: ["student portal", "go to student", "open student portal"],
      page: "students",
    },
    {
      keywords: ["finance", "payment page", "go to finance", "open finance"],
      page: "finance",
    },
    {
      keywords: ["dashboard", "go to dashboard", "open dashboard", "home"],
      page: "dashboard",
    },
    {
      keywords: ["go to attendance", "open attendance", "attendance page"],
      page: "attendance",
    },
    {
      keywords: ["go to grades", "open grades", "grades page"],
      page: "grades",
    },
    {
      keywords: ["timetable", "go to timetable", "open timetable"],
      page: "timetable",
    },
    { keywords: ["go to exams", "open exams", "exams page"], page: "exams" },
    { keywords: ["library", "go to library", "open library"], page: "library" },
    {
      keywords: ["go to teachers", "open teachers", "teachers page"],
      page: "teachers",
    },
    {
      keywords: ["go to classes", "open classes", "classes page"],
      page: "classes",
    },
    {
      keywords: ["announcements", "go to announcements", "open announcements"],
      page: "announcements",
    },
    {
      keywords: ["go to events", "open events", "events page"],
      page: "events",
    },
    {
      keywords: ["go to subjects", "open subjects", "subjects page"],
      page: "subjects",
    },
    {
      keywords: ["go to reports", "open reports", "reports page"],
      page: "reports",
    },
    {
      keywords: [
        "go to messages",
        "open messages",
        "messages page",
        "open inbox",
      ],
      page: "messages",
    },
    {
      keywords: ["go to settings", "open settings", "settings page"],
      page: "settings",
    },
    {
      keywords: ["transport", "go to transport", "open transport"],
      page: "transport",
    },
    {
      keywords: ["homework", "go to homework", "open homework"],
      page: "homework",
    },
    // Portal tabs
    {
      keywords: ["my grades", "grades tab", "view grades", "show grades"],
      page: "grades",
    },
    {
      keywords: ["my attendance", "attendance tab", "view attendance"],
      page: "attendance",
    },
    {
      keywords: ["pay fees", "fees tab", "fee payment", "view fees"],
      page: "fees",
    },
    { keywords: ["my messages", "messages tab"], page: "messages" },
    {
      keywords: [
        "my courses",
        "course registration",
        "register course",
        "courses tab",
      ],
      page: "courses",
    },
    {
      keywords: ["study materials", "study material", "course materials"],
      page: "materials",
    },
    {
      keywords: ["internship tracker", "internships tab", "view internships"],
      page: "internships",
    },
    {
      keywords: ["scholarships tab", "view scholarships"],
      page: "scholarships",
    },
    { keywords: ["research tab", "research project"], page: "research" },
    { keywords: ["student roster", "roster tab"], page: "roster" },
    {
      keywords: ["grade submission", "submit grades", "grades tab"],
      page: "grades",
    },
    {
      keywords: ["office hours tab", "view office hours"],
      page: "officehours",
    },
    { keywords: ["leave request tab", "view leave requests"], page: "leave" },
    { keywords: ["student feedback tab", "view feedback"], page: "feedback" },
  ];
  for (const entry of navMap) {
    for (const kw of entry.keywords) {
      if (lower.includes(kw)) return entry.page;
    }
  }
  return null;
}

function getBotReply(
  input: string,
  fallbackIndexRef: React.MutableRefObject<number>,
): string {
  const lower = input.toLowerCase().trim();
  if (!lower) return "Please type a message and I'll do my best to help!";

  for (const entry of KNOWLEDGE_BASE) {
    for (const kw of entry.keywords) {
      if (lower.includes(kw)) {
        return entry.reply;
      }
    }
  }

  const reply =
    FALLBACK_RESPONSES[fallbackIndexRef.current % FALLBACK_RESPONSES.length];
  fallbackIndexRef.current++;
  return reply;
}

export function ChatBot({
  onNavigate,
}: { onNavigate?: (page: string) => void } = {}) {
  const msgIdRef = useRef(1);
  const fallbackIndexRef = useRef(0);

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => [
    {
      id: msgIdRef.current++,
      role: "bot",
      text: "Hi! I'm the EduManage Assistant. Ask me anything about the system, or say 'go to [section]' to navigate!",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [speaking, setSpeaking] = useState(false);
  const [listening, setListening] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);
  const transcriptRef = useRef("");
  const isSendingRef = useRef(false);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll on message/typing change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const speak = (text: string) => {
    if (!ttsEnabled) return;
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.rate = 1.05;
    utt.pitch = 1;
    utt.onstart = () => setSpeaking(true);
    utt.onend = () => setSpeaking(false);
    utt.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(utt);
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setSpeaking(false);
  };

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    if (isSendingRef.current) return;
    isSendingRef.current = true;

    const userMsg: Message = {
      id: msgIdRef.current++,
      role: "user",
      text: trimmed,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const reply = getBotReply(trimmed, fallbackIndexRef);
      const navPage = getNavigationIntent(trimmed);
      let finalReply: string;
      if (navPage && onNavigate) {
        onNavigate(navPage);
        finalReply = `Taking you to the ${navPage.charAt(0).toUpperCase() + navPage.slice(1)} section now! ${reply}`;
      } else {
        finalReply = reply;
      }
      const botMsg: Message = {
        id: msgIdRef.current++,
        role: "bot",
        text: finalReply,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
      speak(finalReply);
      isSendingRef.current = false;
    }, 600);
  };

  const startListening = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in your browser.");
      return;
    }

    transcriptRef.current = "";
    isSendingRef.current = false;

    const rec = new SpeechRecognition();
    rec.lang = "en-US";
    rec.continuous = true;
    rec.interimResults = true;
    rec.maxAlternatives = 1;

    rec.onresult = (e: any) => {
      let finalPart = "";
      let interimPart = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const t = e.results[i][0].transcript;
        if (e.results[i].isFinal) {
          finalPart += `${t} `;
        } else {
          interimPart += t;
        }
      }
      if (finalPart) {
        transcriptRef.current += finalPart;
      }
      const display = (transcriptRef.current + interimPart).trim();
      setInput(display);
    };

    rec.onerror = () => {
      setListening(false);
      isSendingRef.current = false;
    };

    rec.onend = () => {
      setListening(false);
      const captured = transcriptRef.current.trim();
      transcriptRef.current = "";
      if (captured) {
        sendMessage(captured);
      }
    };

    recognitionRef.current = rec;
    rec.start();
    setListening(true);
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setListening(false);
  };

  const formatTime = (d: Date) =>
    d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <>
      {/* Chat Window */}
      {open && (
        <div
          className="fixed bottom-24 right-6 z-[200] w-80 sm:w-96 flex flex-col rounded-2xl shadow-2xl overflow-hidden"
          style={{
            background: "#fff",
            border: "1.5px solid #e5e7eb",
            maxHeight: "520px",
          }}
        >
          {/* Header */}
          <div
            className="flex items-center gap-3 px-4 py-3"
            style={{ background: "#0a0a0a" }}
          >
            <div className="h-9 w-9 rounded-full bg-white dark:bg-gray-900/10 flex items-center justify-center shrink-0">
              <Bot size={20} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold text-sm leading-tight">
                EduManage Assistant
              </p>
              <p className="text-gray-400 text-xs">
                {listening
                  ? "Listening... tap mic to send"
                  : "Always here to help"}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                title={ttsEnabled ? "Mute voice" : "Enable voice"}
                className="p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-white dark:bg-gray-900/10 transition-colors"
                onClick={() => {
                  if (ttsEnabled) stopSpeaking();
                  setTtsEnabled((v) => !v);
                }}
              >
                {ttsEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
              </button>
              <button
                type="button"
                title="Close"
                className="p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-white dark:bg-gray-900/10 transition-colors"
                onClick={() => {
                  setOpen(false);
                  stopSpeaking();
                }}
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div
            className="flex-1 overflow-y-auto px-4 py-3 space-y-3"
            style={{ minHeight: 0, maxHeight: "360px", background: "#f9fafb" }}
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.role === "bot" && (
                  <div className="h-7 w-7 rounded-full bg-black flex items-center justify-center shrink-0 mr-2 mt-0.5">
                    <Bot size={14} className="text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[78%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-black text-white rounded-br-sm"
                      : "bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 rounded-bl-sm shadow-sm border border-gray-100"
                  }`}
                >
                  <p>{msg.text}</p>
                  <p className="text-[10px] mt-1 text-gray-400">
                    {formatTime(msg.timestamp)}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="h-7 w-7 rounded-full bg-black flex items-center justify-center shrink-0 mr-2 mt-0.5">
                  <Bot size={14} className="text-white" />
                </div>
                <div className="bg-white dark:bg-gray-900 border border-gray-100 shadow-sm rounded-2xl rounded-bl-sm px-4 py-3">
                  <span className="flex gap-1 items-center h-4">
                    <span
                      className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    />
                    <span
                      className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <span
                      className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                  </span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="px-3 py-3 bg-white dark:bg-gray-900 border-t border-gray-100 flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              readOnly={listening}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage(input);
                }
              }}
              placeholder={
                listening ? "Speaking... tap mic to send" : "Type a message..."
              }
              className="flex-1 text-sm bg-gray-100 dark:bg-gray-700 rounded-full px-4 py-2 outline-none border-0 focus:ring-2 focus:ring-black/10 placeholder-gray-400 min-w-0"
            />
            <button
              type="button"
              title={listening ? "Stop & send" : "Speak"}
              onClick={listening ? stopListening : startListening}
              className={`h-9 w-9 rounded-full flex items-center justify-center transition-all shrink-0 ${
                listening
                  ? "bg-gray-500 text-white scale-110"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200"
              }`}
            >
              {listening ? <MicOff size={16} /> : <Mic size={16} />}
            </button>
            <button
              type="button"
              title="Send"
              onClick={() => sendMessage(input)}
              disabled={!input.trim()}
              className="h-9 w-9 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
            >
              <Send size={15} />
            </button>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        type="button"
        title="Open EduManage Assistant"
        onClick={() => {
          setOpen((v) => !v);
          if (open) stopSpeaking();
        }}
        className="fixed bottom-6 right-6 z-[200] h-14 w-14 rounded-full bg-black text-white flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-transform"
        style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.35)" }}
      >
        {open ? (
          <X size={22} />
        ) : (
          <div className="relative">
            <MessageCircle size={26} />
            {speaking && (
              <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-gray-400 animate-pulse border-2 border-black" />
            )}
          </div>
        )}
      </button>
    </>
  );
}
