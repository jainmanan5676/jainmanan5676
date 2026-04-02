import { Bot, Mic, MicOff, Send, Volume2, VolumeX, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Message {
  role: "user" | "assistant";
  text: string;
}

const KNOWLEDGE_BASE: Record<string, string> = {
  dashboard:
    "Your Dashboard is your command center! It gives you a beautiful overview of all your key stats, recent activities, and quick-access links to the most important sections. It's the best place to start your day — you'll see everything at a glance without having to dig around. Want me to take you there?",
  grades:
    "Great news — your Grades section is fully packed with information! It shows your marks, performance scores, and subject-wise breakdown across all your enrolled courses. You can track how you're doing over time and spot subjects where you might need a little extra focus. Shall I open it for you?",
  attendance:
    "Your attendance record is really important! It tracks every single day you were present, absent, or late throughout the academic year. You'll need to maintain at least 75% attendance to be eligible for your exams — so make sure to keep an eye on it regularly. Want me to take you there?",
  timetable:
    "Your Timetable is your personal weekly class schedule! It shows all your subjects, the teachers taking each class, the room numbers, and the timings for Monday through Saturday. It's super helpful for planning your study time. Want me to open your timetable right now?",
  homework:
    "The Homework section lists all your assigned tasks from teachers. You can see what's due, mark tasks as complete after you've submitted them, and keep track of upcoming deadlines. Need me to take you there?",
  fees: "Paying your fees is quick and secure through our online payment system! You can pay your tuition fees and other dues using your debit or credit card via Stripe. The system supports test payments too — use card number 4242 4242 4242 4242 with any future expiry date. Want me to open the fee payment section?",
  messages:
    "The Messages section works just like Gmail! You can send and receive messages with your teachers, classmates, and administrators all in one place. It keeps all your academic communication organized and easy to find. Want me to open your inbox?",
  forums:
    "Discussion Forums are your subject-wise Q&A boards! You can ask questions, answer your classmates' queries, and have academic discussions per subject. Shall I take you to the forums?",
  leave:
    "Need some time off? The Leave Application section lets you submit leave requests directly to your teachers or administrators. You can also track the approval status of your requests. Want me to open it?",
  courses:
    "My Courses is your personal academic portfolio! It shows all the courses you're currently enrolled in, their schedules, credit hours, and academic details. Shall I take you there?",
  gpa: "The GPA Calculator is incredibly handy! It automatically computes your Grade Point Average based on all your enrolled courses, their credit hours, and your grades. Want me to open the GPA Calculator?",
  rsvp: "Campus RSVP lets you register for exciting college events, seminars, cultural programs, and workshops! Want me to take you to Campus Events?",
  grievance:
    "If something is bothering you or you have a concern about your academic experience, the Grievance Submission section is the right place! You can formally report issues to the administration and track the resolution status. Need me to take you there?",
  registration:
    "Course Registration is where you select the courses you want to study for the semester! You can browse all available courses and register for up to 18 credit hours. Want me to take you to course registration?",
  materials:
    "Study Materials is your digital learning hub! It gives you access to PDFs, video lectures, notes, and other resources shared by your professors for each course. Shall I open Study Materials for you?",
  internships:
    "The Internship Tracker helps you manage your entire internship journey! You can track application statuses — Applied, Interview Scheduled, Offer Received, or Rejected — all in one organized dashboard. Want me to take you there?",
  research:
    "Research Projects shows you all the exciting faculty-led research initiatives that you can apply to join! Shall I open Research Projects?",
  scholarships:
    "The Scholarships section lists all available financial aid options with details about eligibility criteria, award amounts, and application deadlines. Want me to show you what's available?",
  placement:
    "The Placement Tracker monitors all campus recruitment drives and helps you manage your job applications! Shall I open the Placement Tracker?",
  clubs:
    "Clubs & Societies is your gateway to extracurricular life on campus! You can browse all available clubs, check their requirements and member lists, and join the ones that match your interests. Want me to take you there?",
  students:
    "The Students page is a comprehensive directory of all enrolled school students! You can view full profiles, contact details, class assignments, and academic records. Shall I open Students?",
  teachers:
    "The Teachers page shows all your school staff members with their assigned classes, subjects, and contact details. Want me to take you there?",
  finance:
    "The Finance section is your complete financial management hub! It handles fee collection, tracks payment history, generates budget reports, and manages outstanding dues. Shall I open Finance?",
  library:
    "The Library is fully digital! You can search for books, borrow physical copies, access the digital library for e-books and study PDFs, manage fines for late returns, and even reserve books in advance. Want me to open the Library?",
  events:
    "The Events page shows all upcoming school and college events — from cultural programs to sports meets to academic seminars. Shall I take you to Events?",
  reports:
    "Reports lets you generate professional attendance, grade, and financial reports in PDF or CSV format! Want me to open Reports?",
  analytics:
    "The Analytics Dashboard displays beautiful visual charts of school performance trends — attendance patterns, grade distributions, fee collection summaries, and more! It helps administrators make data-driven decisions. Shall I open the Analytics Dashboard?",
  transport:
    "Transport Management handles all your school transportation logistics — bus routes, driver assignments, student allocations to buses, and pickup/drop schedules. Want me to take you there?",
  documents:
    "The Documents Portal is your secure digital filing cabinet! You can upload, organize, and access important documents like certificates, ID proofs, admission letters, and more. Shall I open your Documents Portal?",
  settings:
    "Settings lets you personalize your EduManage experience! You can update your profile information, change your password, set notification preferences, and customize how the app looks. Want me to take you to Settings?",
  admin:
    "The Admin Dashboard is the nerve center of the entire school management system! From there, you can manage students, teachers, finances, announcements, and virtually every aspect of school operations. Want me to open it?",
  help: "I'm your EduManage Smart Assistant, and I'm here to help with everything! I can navigate you to any section of the app, answer questions about features, explain how things work, and guide you through processes. Just ask me anything — whether it's 'go to attendance', 'what is GPA?', or 'how do I pay my fees?' What would you like to do?",
  login:
    "Logging in is easy! Just go to the login page, enter your registered email address and password, and you're in. The default admin credentials are admin@edumanage.com with password admin123. Need help with anything else?",
  stripe:
    "Online payments in EduManage are powered by Stripe, which is completely secure and reliable! For testing, use card 4242 4242 4242 4242 with any future expiry date and any 3-digit CVV. Want me to take you to the payment section?",
  darkmode:
    "Switching between light and dark mode is super simple! Just look for the moon icon or sun icon in the top header bar and click it. Your preference is saved automatically so it persists even after you refresh the page.",
  language:
    "EduManage supports 9 languages! You can switch between English, Hindi, Tamil, Telugu, Kannada, Malayalam, Bengali, Marathi, and Gujarati using the language dropdown in the header. Want to try switching languages?",
  "college-students":
    "The College Students section is where you manage all enrolled college-level students! You can view their profiles, course enrollments, GPA records, attendance, and placement status. Want me to take you to College Students?",
  "college-faculty":
    "The College Faculty section lists all your college teaching staff with their departments, designations, research areas, and course assignments. Shall I open College Faculty?",
  "bulk-import":
    "Bulk Import lets you upload hundreds of student or teacher records at once using an Excel or CSV file! It's a massive time-saver compared to adding records one by one. Want me to take you to Bulk Import?",
  "academic-year":
    "Academic Year Management lets you switch between different academic years and archive old data. It ensures all records, grades, and attendance are properly organized per year. Want me to open Academic Year Management?",
  audit:
    "The Audit Log is your institution's activity trail! It records every action taken in the system — who added or deleted a record, when changes were made, and by which user. It's essential for accountability and security. Shall I open the Audit Log?",
};

const CONVERSATIONAL_RESPONSES: Array<{
  patterns: RegExp;
  responses: string[];
}> = [
  {
    patterns:
      /^(hi|hello|hey|good morning|good afternoon|good evening|namaste|hola|howdy)/,
    responses: [
      "Hello there! 👋 I'm your EduManage Smart Assistant, and I'm super excited to help you today! I can navigate you to any section, answer questions about features, explain how things work, or just have a chat. What's on your mind?",
      "Hey! Great to see you! 😊 I'm your Smart Assistant for EduManage — think of me as your personal guide to the entire system. You can ask me about attendance, grades, fees, timetable, and much more. Or just say 'go to [page]' to navigate instantly. What can I help you with?",
      "Hi! Welcome to EduManage! 🌟 I'm here to make your experience as smooth as possible. Whether you need to check your grades, pay fees, navigate to a page, or learn about a feature — just ask me! So, what would you like to do today?",
    ],
  },
  {
    patterns:
      /how are you|how are you doing|how do you do|how's it going|what's up/,
    responses: [
      "I'm doing absolutely fantastic, thank you for asking! 😄 Always energized and ready to help with anything EduManage-related. How about you? Is there something I can help you with today?",
      "I'm great, thanks! 🚀 I've been busy learning everything about EduManage so I can give you the best answers. Ready to assist! What do you need help with?",
      "Wonderful, as always! 😊 Being helpful is what I do best. Is there something specific you're looking for today?",
    ],
  },
  {
    patterns:
      /what is edumanage|tell me about edumanage|what does edumanage do/,
    responses: [
      "EduManage is a comprehensive, all-in-one school and college management system! 🏫 It has dedicated portals for students, college students, teachers, college faculty, administrators, and parents. You get 17+ pages covering everything from attendance and grades to library management, finance, events, and even a placement tracker. It supports 9 languages, has dark mode, and even has me — your Smart Assistant! Pretty impressive, right? 😄",
    ],
  },
  {
    patterns:
      /what can you do|what do you do|your capabilities|list your features/,
    responses: [
      "Oh, I can do quite a lot! 🌟 I can navigate you to any section ('go to timetable'), answer questions about any feature ('what is GPA?'), listen to your voice commands, speak my replies aloud, and guide you through the entire EduManage system. What would you like to try first?",
    ],
  },
  {
    patterns: /thank you|thanks|thank u|thx|appreciate it|that.s helpful/,
    responses: [
      "You're most welcome! 😊 That's exactly what I'm here for. Is there anything else I can help you with?",
      "Happy to help! 🌟 Don't hesitate to ask if you need anything else. I'm always here!",
      "Anytime! 😄 It's a pleasure helping you navigate EduManage. Anything else on your mind?",
    ],
  },
  {
    patterns: /bye|goodbye|see you|see ya|take care|good night/,
    responses: [
      "Goodbye! 👋 It was great chatting with you. Come back anytime you need help — I'll be right here! Have a wonderful day! 😊",
      "See you later! 🌟 Remember, I'm always available whenever you need guidance. Take care!",
    ],
  },
  {
    patterns: /who are you|what are you|introduce yourself/,
    responses: [
      "I'm your EduManage Smart Assistant! 🤖 Think of me as a knowledgeable, always-available guide who knows every corner of this platform. I can navigate you between pages, explain features, answer questions, and even talk to you through voice! What can I do for you?",
    ],
  },
  {
    patterns: /what is gpa|explain gpa|how does gpa work/,
    responses: [
      "GPA stands for Grade Point Average — it measures your academic performance on a 4.0 scale! 📊 An A gives you 4 points, B gives 3, C gives 2, and D gives 1. Each course has credit hours, and your GPA is the weighted average across all courses. A higher GPA opens doors to scholarships, internships, and graduate programs. Want me to open the GPA Calculator?",
    ],
  },
  {
    patterns: /what is attendance|how does attendance work/,
    responses: [
      "Attendance tracks every day you show up to class — present, absent, or late! 📋 Most institutions require at least 75% attendance to be eligible to sit for exams. EduManage tracks this automatically and gives you a visual chart so you always know where you stand. Want me to show you your attendance record?",
    ],
  },
  {
    patterns:
      /about college|college section|college student|college features|what is in college|college portal/,
    responses: [
      "The College Section in EduManage is incredibly feature-rich! 🎓\n\n**College Students** — GPA calculator, course registration (up to 18 credits), study materials, internship tracker, research projects, scholarships, exam hall ticket, transcript generator, placement tracker, clubs & societies, campus event RSVP, course drop/add requests, and grievance submission.\n\n**College Faculty** — Research publications, office hours, leave requests, student feedback, question paper builder, mentorship panel, thesis tracker, conference registration, and curriculum editor.\n\nWant me to take you to College Students or College Faculty?",
    ],
  },
  {
    patterns:
      /general section|what is in general|general portal|general features/,
    responses: [
      "The General Section contains institution-wide admin tools! 🔧\n\n📊 **Analytics Dashboard** — Charts for attendance trends, grade distributions, and fee collection.\n📋 **Audit Log** — Full activity trail of all system changes.\n🚌 **Transport** — Bus routes and student allocations.\n📂 **Documents** — Secure digital filing cabinet.\n📥 **Bulk Import** — Upload records from Excel/CSV.\n📅 **Academic Year** — Switch and archive academic years.\n\nWant me to take you to any of these? Just say 'go to analytics' or 'open audit log'!",
    ],
  },
];

const NAV_COMMANDS: Array<{ patterns: string[]; page: string }> = [
  // School section
  { patterns: ["dashboard", "home", "overview"], page: "dashboard" },
  {
    patterns: ["students", "student list", "school students"],
    page: "students",
  },
  { patterns: ["teachers", "teacher list"], page: "teachers" },
  { patterns: ["classes", "class list"], page: "classes" },
  { patterns: ["attendance", "present", "absent"], page: "attendance" },
  { patterns: ["grades", "marks", "score"], page: "grades" },
  { patterns: ["subjects", "subject list"], page: "subjects" },
  {
    patterns: ["timetable", "schedule", "time table", "class schedule"],
    page: "timetable",
  },
  { patterns: ["exams", "exam list"], page: "exams" },
  {
    patterns: ["question paper", "question papers", "paper builder"],
    page: "question-paper",
  },
  { patterns: ["library"], page: "library" },
  {
    patterns: ["finance", "financial", "fees", "payment", "pay fee"],
    page: "finance",
  },
  { patterns: ["events", "event list", "school events"], page: "events" },
  { patterns: ["reports", "report"], page: "reports" },
  {
    patterns: [
      "bulk import",
      "import students",
      "import teachers",
      "csv import",
    ],
    page: "bulk-import",
  },
  {
    patterns: ["academic year", "year management", "academic years"],
    page: "academic-year",
  },
  { patterns: ["announcements", "notice"], page: "announcements" },
  {
    patterns: ["transport", "transportation", "bus routes", "bus"],
    page: "transport",
  },
  { patterns: ["homework", "homework tracker"], page: "homework" },
  { patterns: ["parent portal", "parent"], page: "parent-portal" },
  // College section
  {
    patterns: [
      "college students",
      "college student list",
      "college student portal",
      "show college",
      "college section",
    ],
    page: "college-students",
  },
  {
    patterns: [
      "college faculty",
      "faculty list",
      "college faculty portal",
      "faculty members",
    ],
    page: "college-faculty",
  },
  // General section
  { patterns: ["messages", "inbox", "mail", "messaging"], page: "messages" },
  { patterns: ["forums", "discussion", "discussion forums"], page: "forums" },
  {
    patterns: ["documents", "document portal", "document storage", "files"],
    page: "documents",
  },
  {
    patterns: ["analytics", "analytics dashboard", "charts", "statistics"],
    page: "analytics",
  },
  {
    patterns: ["audit", "audit log", "activity log", "logs"],
    page: "audit-log",
  },
  { patterns: ["settings"], page: "settings" },
  // Section shortcuts
  {
    patterns: ["school section", "show school", "go school"],
    page: "students",
  },
  {
    patterns: ["general section", "show general", "go general"],
    page: "analytics",
  },
];

const QUICK_CHIPS = [
  // School
  "View Students",
  "Open Library",
  "View Finance",
  "Check Attendance",
  // College
  "College Students",
  "College Faculty",
  // General
  "Open Analytics",
  "Audit Log",
  "View Documents",
];

const CHIP_COMMANDS: Record<string, string> = {
  "View Students": "go to students",
  "Open Library": "go to library",
  "View Finance": "go to finance",
  "Check Attendance": "go to attendance",
  "College Students": "go to college students",
  "College Faculty": "go to college faculty",
  "Open Analytics": "go to analytics",
  "Audit Log": "go to audit log",
  "View Documents": "go to documents",
};

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getResponse(input: string): { text: string; page?: string } {
  const lower = input.toLowerCase().trim();

  // Section shortcuts
  if (/school section|show school|go to school|open school/.test(lower)) {
    return {
      text: "Opening the School section for you! 🏫 Taking you to Students as a starting point. You can navigate to Classes, Attendance, Grades, Timetable, Library, Finance, and more from the sidebar!",
      page: "students",
    };
  }
  if (/college section|show college|go to college|open college/.test(lower)) {
    return {
      text: "Opening the College section! 🎓 Taking you to College Students. You can also access College Faculty from the sidebar!",
      page: "college-students",
    };
  }
  if (/general section|show general|go to general|open general/.test(lower)) {
    return {
      text: "Opening the General section! 🔧 Taking you to Analytics Dashboard. You can also access Audit Log, Transport, Documents, Bulk Import, and Academic Year from the sidebar!",
      page: "analytics",
    };
  }

  const navTriggers = [
    "go to",
    "open",
    "navigate to",
    "take me to",
    "show me",
    "switch to",
  ];
  const isNavIntent = navTriggers.some((t) => lower.includes(t));

  if (isNavIntent || lower.startsWith("go ")) {
    for (const cmd of NAV_COMMANDS) {
      for (const pattern of cmd.patterns) {
        if (lower.includes(pattern)) {
          const pageName = cmd.page.replace(/-/g, " ");
          const navResponses = [
            `Sure! Opening ${pageName} for you right now! ✨ Let me know if you need any help once you're there.`,
            `On it! Taking you to ${pageName} immediately! 🚀 Feel free to ask if you have questions.`,
            `Got it! Navigating to ${pageName}! 🌟 I'll be right here if you need anything else.`,
          ];
          return { text: pickRandom(navResponses), page: cmd.page };
        }
      }
    }
    return {
      text: "Hmm, I couldn't find that specific section. 🤔 Could you try using the exact page name? For example, 'go to timetable', 'open college students', or 'take me to analytics'. I'm happy to help!",
    };
  }

  // Conversational patterns
  for (const entry of CONVERSATIONAL_RESPONSES) {
    if (entry.patterns.test(lower)) {
      return { text: pickRandom(entry.responses) };
    }
  }

  // Knowledge base
  for (const [key, answer] of Object.entries(KNOWLEDGE_BASE)) {
    if (lower.includes(key.replace(/-/g, " ")) || lower.includes(key)) {
      return { text: answer };
    }
  }

  if (
    lower.includes("pay") ||
    lower.includes("fee") ||
    lower.includes("payment")
  ) {
    return { text: KNOWLEDGE_BASE.fees };
  }

  const fallbacks = [
    "Hmm, I'm not quite sure about that one. 🤔 Could you try asking about a specific feature like attendance, grades, fees, or timetable? Or say 'help' to see what I can do!",
    "I didn't quite catch that — could you rephrase it? 😊 I understand questions about EduManage features and navigation commands. For example, 'what is GPA?' or 'go to library'.",
    "That's an interesting question! 🤔 Try asking me about a specific EduManage feature, or say 'what can you do?' to see all my capabilities!",
    "I'm still learning, but I might not have info on that specific topic. 😅 Try asking about attendance, grades, timetable, fees, college students, or analytics!",
  ];
  return { text: pickRandom(fallbacks) };
}

function speak(text: string, isMuted: boolean) {
  if (isMuted || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const cleanText = text.replace(/[*_#~`]/g, "").replace(/\n+/g, " ");
  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.rate = 1.0;
  utterance.pitch = 1.0;
  utterance.volume = 1.0;
  const voices = window.speechSynthesis.getVoices();
  const preferred =
    voices.find((v) => v.lang === "en-US" && v.name.includes("Google")) ||
    voices.find((v) => v.lang === "en-US") ||
    voices[0];
  if (preferred) utterance.voice = preferred;
  window.speechSynthesis.speak(utterance);
}

export function FloatingSmartAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Hi there! 👋 I'm your EduManage Smart Assistant. I can help you navigate anywhere in the app — including College Students, College Faculty, Analytics, Audit Log, and more. Just say 'go to [page]' or ask me anything. What can I do for you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const lastSent = useRef("");
  const chatEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll on message count change
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages.length, isTyping]);

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || trimmed === lastSent.current) return;
    lastSent.current = trimmed;
    setMessages((prev) => [...prev, { role: "user", text: trimmed }]);
    setInput("");
    setIsTyping(true);

    const delay = 600 + Math.random() * 300;
    setTimeout(() => {
      const { text: reply, page } = getResponse(trimmed);
      setIsTyping(false);
      setMessages((prev) => [...prev, { role: "assistant", text: reply }]);
      speak(reply, isMuted);
      if (page) {
        window.dispatchEvent(
          new CustomEvent("edumanage-navigate", { detail: { page } }),
        );
      }
      setTimeout(() => {
        lastSent.current = "";
      }, 800);
    }, delay);
  };

  const handleSend = () => sendMessage(input);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  const toggleVoice = () => {
    const SpeechRec =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (!SpeechRec) {
      alert(
        "Voice input is not supported in this browser. Please use Chrome or Edge.",
      );
      return;
    }
    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }

    const rec = new SpeechRec();
    recognitionRef.current = rec;
    rec.continuous = true;
    rec.interimResults = true;
    rec.lang = "en-US";
    rec.maxAlternatives = 1;

    let finalTranscript = "";
    let silenceTimer: ReturnType<typeof setTimeout> | null = null;

    rec.onstart = () => {
      setListening(true);
      finalTranscript = "";
    };

    rec.onresult = (e: any) => {
      let interim = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const t = e.results[i][0].transcript;
        if (e.results[i].isFinal) {
          finalTranscript += `${t} `;
        } else {
          interim += t;
        }
      }
      setInput((finalTranscript + interim).trim());

      if (silenceTimer) clearTimeout(silenceTimer);
      silenceTimer = setTimeout(() => {
        rec.stop();
      }, 2000);
    };

    rec.onend = () => {
      setListening(false);
      if (silenceTimer) clearTimeout(silenceTimer);
      const finalText = finalTranscript.trim();
      if (finalText) {
        sendMessage(finalText);
      }
    };

    rec.onerror = (e: any) => {
      setListening(false);
      if (e.error !== "no-speech") {
        console.error("Speech recognition error:", e.error);
      }
    };

    try {
      rec.start();
    } catch {
      setListening(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Chat panel */}
      {open && (
        <div
          className="w-80 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          style={{
            height: "460px",
            background: "#000",
            border: "1px solid rgba(255,255,255,0.12)",
          }}
          data-ocid="floating_assistant.panel"
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3 flex-shrink-0"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}
          >
            <div className="flex items-center gap-2">
              <Bot size={16} className="text-white" />
              <span className="text-white text-sm font-semibold">
                Smart Assistant
              </span>
              {listening && (
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-gray-400 animate-pulse" />
                  <span className="text-[10px] text-gray-400">
                    Listening...
                  </span>
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsMuted((m) => !m)}
                className="text-gray-400 hover:text-white transition-colors"
                title={isMuted ? "Unmute" : "Mute"}
                data-ocid="floating_assistant.mute_button"
              >
                {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
                data-ocid="floating_assistant.close_button"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div
            className="flex-1 overflow-y-auto px-3 py-3 space-y-2"
            data-ocid="floating_assistant.messages"
          >
            {messages.map((msg, i) => (
              <div
                key={`${msg.role}-${i}`}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <span
                  className={`text-xs px-3 py-2 rounded-xl max-w-[85%] leading-relaxed whitespace-pre-line ${
                    msg.role === "user"
                      ? "bg-white dark:bg-gray-900 text-black"
                      : "text-white"
                  }`}
                  style={
                    msg.role === "assistant"
                      ? { background: "rgba(255,255,255,0.1)" }
                      : {}
                  }
                >
                  {msg.text}
                </span>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <span
                  className="text-white px-3 py-2.5 rounded-xl"
                  style={{ background: "rgba(255,255,255,0.1)" }}
                >
                  <span className="flex gap-1 items-center">
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-gray-300 animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    />
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-gray-300 animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-gray-300 animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                  </span>
                </span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick chips */}
          <div className="px-3 pb-2 flex flex-wrap gap-1 flex-shrink-0">
            {QUICK_CHIPS.map((chip) => (
              <button
                key={chip}
                type="button"
                onClick={() => sendMessage(CHIP_COMMANDS[chip] || chip)}
                className="text-[10px] px-2 py-0.5 rounded-full text-gray-300 hover:text-white transition-colors"
                style={{ background: "rgba(255,255,255,0.1)" }}
                data-ocid="floating_assistant.chip"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="px-3 pb-3 flex items-center gap-1.5 flex-shrink-0">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                listening ? "Listening... speak now" : "Ask anything..."
              }
              className="flex-1 text-white text-xs rounded-lg px-3 py-2 outline-none placeholder:text-gray-500 dark:text-gray-400"
              style={{
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.15)",
              }}
              data-ocid="floating_assistant.input"
            />
            <button
              type="button"
              onClick={toggleVoice}
              className={`p-2 rounded-lg transition-colors ${
                listening
                  ? "bg-gray-500 text-white animate-pulse"
                  : "text-gray-300 hover:text-white"
              }`}
              style={!listening ? { background: "rgba(255,255,255,0.1)" } : {}}
              data-ocid="floating_assistant.mic_button"
            >
              {listening ? <MicOff size={13} /> : <Mic size={13} />}
            </button>
            <button
              type="button"
              onClick={handleSend}
              className="p-2 rounded-lg bg-white dark:bg-gray-900 text-black hover:bg-gray-200 transition-colors"
              data-ocid="floating_assistant.send_button"
            >
              <Send size={13} />
            </button>
          </div>
        </div>
      )}

      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="h-14 w-14 rounded-full bg-black flex items-center justify-center shadow-2xl hover:bg-gray-900 transition-colors"
        style={{ border: "2px solid rgba(255,255,255,0.2)" }}
        data-ocid="floating_assistant.open_modal_button"
        aria-label="Open Smart Assistant"
      >
        <Bot size={24} className="text-white" />
      </button>
    </div>
  );
}
