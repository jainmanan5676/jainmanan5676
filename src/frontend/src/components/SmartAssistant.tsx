import {
  Bot,
  ChevronDown,
  ChevronUp,
  Mic,
  MicOff,
  Send,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface Message {
  role: "user" | "assistant";
  text: string;
}

interface Props {
  onNavigate: (page: string) => void;
  currentPortal: string;
  onSwitchPortal?: (portal: string) => void;
}

const KNOWLEDGE_BASE: Record<string, string> = {
  dashboard:
    "Your Dashboard is your command center! It gives you a beautiful overview of all your key stats, recent activities, and quick-access links to the most important sections. It's the best place to start your day — you'll see everything at a glance without having to dig around. Want me to take you there?",
  grades:
    "Great news — your Grades section is fully packed with information! It shows your marks, performance scores, and subject-wise breakdown across all your enrolled courses. You can track how you're doing over time and spot subjects where you might need a little extra focus. Shall I open it for you?",
  attendance:
    "Your attendance record is really important! It tracks every single day you were present, absent, or late throughout the academic year. You'll need to maintain at least 75% attendance to be eligible for your exams — so make sure to keep an eye on it regularly. You can view your full attendance chart in the Attendance Summary section. Want me to take you there?",
  timetable:
    "Your Timetable is your personal weekly class schedule! It shows all your subjects, the teachers taking each class, the room numbers, and the timings for Monday through Saturday. It's super helpful for planning your study time. Want me to open your timetable right now?",
  homework:
    "The Homework section lists all your assigned tasks from teachers. You can see what's due, mark tasks as complete after you've submitted them, and keep track of upcoming deadlines. It's a great way to stay on top of your academic responsibilities! Need me to take you there?",
  fees: "Paying your fees is quick and secure through our online payment system! You can pay your tuition fees and other dues using your debit or credit card via Stripe. The system supports test payments too — use card number 4242 4242 4242 4242 with any future expiry date. Want me to open the fee payment section?",
  messages:
    "The Messages section works just like Gmail! You can send and receive messages with your teachers, classmates, and administrators all in one place. It keeps all your academic communication organized and easy to find. Want me to open your inbox?",
  forums:
    "Discussion Forums are your subject-wise Q&A boards! You can ask questions, answer your classmates' queries, and have academic discussions per subject. It's a fantastic way to learn collaboratively and clear doubts outside class hours. Shall I take you to the forums?",
  leave:
    "Need some time off? The Leave Application section lets you submit leave requests directly to your teachers or administrators. You can also track the approval status of your requests — whether they're pending, approved, or rejected. It's all paperless and super convenient! Want me to open it?",
  "attendance-summary":
    "Your Attendance Summary gives you a beautiful visual chart showing all your present, absent, and late days at a glance. It's much easier to understand than just numbers — you can instantly see your attendance trend over time. This is really useful to make sure you stay above the 75% threshold! Want me to show it to you?",
  "report-card":
    "Your Report Card shows your complete term-wise academic performance, including grades for every subject and remarks from your teachers. The best part? You can print it directly from the browser — no need to visit the office! It's your official academic record. Want me to open it?",
  courses:
    "My Courses is your personal academic portfolio! It shows all the courses you're currently enrolled in, their schedules, credit hours, and academic details. It's a great place to review what you're studying this semester. Shall I take you there?",
  gpa: "The GPA Calculator is incredibly handy! It automatically computes your Grade Point Average based on all your enrolled courses, their credit hours, and your grades. You can see your current GPA instantly without doing any manual calculations. The maximum is typically 4.0. Want me to open the GPA Calculator?",
  rsvp: "Campus RSVP lets you register for exciting college events, seminars, cultural programs, and workshops! Once you register, you'll get a confirmation. It's a great way to stay involved in campus life and build your extracurricular profile. Want me to take you to Campus Events?",
  grievance:
    "If something is bothering you or you have a concern about your academic experience, the Grievance Submission section is the right place! You can formally report issues to the administration and track the resolution status. Your feedback matters and helps improve the institution. Need me to take you there?",
  "course-requests":
    "Course Drop/Add Requests allows you to make changes to your course enrollment within the official deadline period. You can request to add a new course or drop one you no longer want to continue. Just remember the 18-credit limit! Want me to open course requests?",
  registration:
    "Course Registration is where you select the courses you want to study for the semester! You can browse all available courses and register for up to 18 credit hours. Choose wisely based on your academic goals and prerequisites. Want me to take you to course registration?",
  materials:
    "Study Materials is your digital learning hub! It gives you access to PDFs, video lectures, notes, and other resources shared by your professors for each course. Everything you need to study is organized in one place. Shall I open Study Materials for you?",
  internships:
    "The Internship Tracker helps you manage your entire internship journey! You can track application statuses — whether Applied, Interview Scheduled, Offer Received, or Rejected — all in one organized dashboard. It's perfect for staying on top of your career development. Want me to take you there?",
  research:
    "Research Projects shows you all the exciting faculty-led research initiatives that you can apply to join! You can filter by department or project status and explore cutting-edge academic research happening right on campus. It's a wonderful opportunity to build your research profile. Shall I open Research Projects?",
  scholarships:
    "The Scholarships section lists all available financial aid options with details about eligibility criteria, award amounts, and application deadlines. It's worth checking regularly because new scholarships get added often! Want me to show you what's available?",
  "exam-ticket":
    "Your Exam Hall Ticket is your official admit card for college examinations — you absolutely need it to enter the exam hall! You can download and print it directly from this section. Make sure to download it before your exam date. Want me to open your Exam Hall Ticket?",
  transcript:
    "The Transcript Generator creates an official downloadable PDF of your complete academic record, including all courses, grades, credit hours, and GPA. It's useful for job applications, internships, and higher education admissions. Want me to generate your transcript?",
  placement:
    "The Placement Tracker monitors all campus recruitment drives and helps you manage your job applications! You can see which companies are visiting, track your application status, and prepare for interviews. It's your career launchpad! Shall I open the Placement Tracker?",
  clubs:
    "Clubs & Societies is your gateway to extracurricular life on campus! You can browse all available clubs, check their requirements and member lists, and join the ones that match your interests — from tech clubs to cultural societies to sports teams. Want me to take you there?",
  classes:
    "My Classes shows all the class sections you're assigned to as a teacher or faculty member, along with their student lists and schedules. It's your quick reference for knowing which groups you're responsible for. Shall I open My Classes?",
  roster:
    "The Student Roster gives you a complete list of all students enrolled in your courses, with their details and enrollment status. It's really useful for taking attendance or planning group activities. Want me to show you the roster?",
  assignments:
    "The Assignments section lets you create, distribute, and grade student work all in one place! You can set deadlines, attach resources, and review submitted work from your students. It makes managing coursework so much easier. Shall I open Assignments?",
  publications:
    "Research & Publications is your academic portfolio for tracking all your scholarly work! You can manage journal papers, conference proceedings, and co-authored research. It's a great way to build and showcase your academic reputation. Want me to take you there?",
  officehours:
    "Office Hours shows your weekly consultation schedule and manages student appointments. Students can book slots to meet with you, and you can toggle your availability. It keeps consultations organized and efficient. Shall I open Office Hours?",
  "leave-faculty":
    "The Leave Requests section lets you apply for casual leave, medical leave, or duty leave and track whether your requests have been approved or are still pending. Everything is documented and easy to manage. Want me to open Leave Requests?",
  feedback:
    "Student Feedback gives you valuable insights into how your students perceive your teaching! You can see aggregated course ratings, response breakdowns, and anonymized student comments. It's a powerful tool for continuous improvement. Shall I show you your feedback?",
  "question-papers":
    "The Question Paper Builder is a fantastic tool for creating professional exam papers! You can add questions, set marks, organize by sections, and save them for future use. It saves a lot of time compared to creating papers manually. Want me to open it?",
  mentorship:
    "The Mentorship Panel lets you manage your student mentees and track their academic and personal development over time. You can log meetings, set goals, and monitor progress. It's a rewarding way to guide the next generation of scholars! Shall I open the Mentorship Panel?",
  conferences:
    "Conference & Seminar Registration lets you browse and register for upcoming academic events, workshops, and professional development programs. Staying active in academic communities is great for your career! Want me to show you what's available?",
  "lesson-plans":
    "The Lesson Plan Builder helps you create detailed, structured teaching plans for each subject and session! You can organize content, set learning objectives, add activities, and save plans to reuse or share with colleagues. It makes your teaching more organized and effective. Want me to open it?",
  progress:
    "The Student Progress Tracker shows you detailed performance trends for individual students across all terms and subjects. You can identify who needs extra support and celebrate those who are excelling. It's data-driven teaching at its best! Shall I take you there?",
  "exam-upload":
    "Exam Result Upload lets you bulk-upload student marks from a CSV file — no need to enter grades one by one! Just prepare your spreadsheet and upload it in seconds. It saves enormous amounts of time during result season. Want me to open it?",
  "parent-log":
    "The Parent Communication Log helps you keep organized records of all meetings, phone calls, and interactions with student parents. It's incredibly useful for follow-ups and maintaining a professional communication trail. Shall I open the Parent Log?",
  substitutes:
    "Substitute Class Management lets you log when you're covering another teacher's class or when someone is covering yours. It keeps the administration informed and ensures no class goes unaccounted for. Want me to take you there?",
  students:
    "The Students page is a comprehensive directory of all enrolled school students! You can view full profiles, contact details, class assignments, and academic records. It's the central hub for student management. Shall I open Students?",
  teachers:
    "The Teachers page shows all your school staff members with their assigned classes, subjects, and contact details. It's perfect for managing your teaching faculty and understanding workload distribution. Want me to take you there?",
  finance:
    "The Finance section is your complete financial management hub! It handles fee collection, tracks payment history, generates budget reports, and manages outstanding dues. You can download payment records for individual students too. Shall I open Finance?",
  library:
    "The Library is fully digital! You can search for books, borrow physical copies, access the digital library for e-books and study PDFs, manage fines for late returns, and even reserve books in advance. It's a complete academic resource center. Want me to open the Library?",
  events:
    "The Events page shows all upcoming school and college events — from cultural programs to sports meets to academic seminars. You can RSVP for events you want to attend and stay updated on campus activities. Shall I take you to Events?",
  reports:
    "Reports lets you generate professional attendance, grade, and financial reports in PDF or CSV format! You can filter by date ranges, classes, or subjects and download comprehensive data. It's very useful for administrative reviews. Want me to open Reports?",
  analytics:
    "The Analytics Dashboard displays beautiful visual charts of school performance trends — attendance patterns, grade distributions, fee collection summaries, and more! It helps administrators make data-driven decisions. Shall I open the Analytics Dashboard?",
  transport:
    "Transport Management handles all your school transportation logistics — bus routes, driver assignments, student allocations to buses, and pickup/drop schedules. It ensures students travel safely and efficiently. Want me to take you there?",
  documents:
    "The Documents Portal is your secure digital filing cabinet! You can upload, organize, and access important documents like certificates, ID proofs, admission letters, and more. Everything is stored safely and accessible anytime. Shall I open your Documents Portal?",
  settings:
    "Settings lets you personalize your EduManage experience! You can update your profile information, change your password, set notification preferences, and customize how the app looks and behaves. Want me to take you to Settings?",
  admin:
    "The Admin Dashboard is the nerve center of the entire school management system! From there, you can manage students, teachers, finances, announcements, and virtually every aspect of school operations. It's a comprehensive control panel. Want me to open it?",
  parent:
    "The Parent Portal gives parents a dedicated window into their child's academic life! They can view attendance records, check grades, pay fees, communicate with teachers, see homework assignments, and browse the school calendar — all in one place. It keeps parents actively involved.",
  "college-students":
    "The College Students section is where you manage all enrolled college-level students! You can view their profiles, course enrollments, GPA records, attendance, and placement status. It's the central hub for college student management. Want me to take you to College Students?",
  "college-faculty":
    "The College Faculty section lists all your college teaching staff with their departments, designations, research areas, and course assignments. You can view faculty profiles, office hours, and publications from here. Shall I open College Faculty?",
  "bulk-import":
    "Bulk Import lets you upload hundreds of student or teacher records at once using an Excel or CSV file! It's a massive time-saver compared to adding records one by one. Just prepare your file in the correct format and upload it. Want me to take you to Bulk Import?",
  "academic-year":
    "Academic Year Management lets you switch between different academic years and archive old data. It ensures all records, grades, and attendance are properly organized per year. Want me to open Academic Year Management?",
  audit:
    "The Audit Log is your institution's activity trail! It records every action taken in the system — who added or deleted a record, when changes were made, and by which user. It's essential for accountability and security. Shall I open the Audit Log?",
  help: "I'm your EduManage Smart Assistant, and I'm here to help with everything! I can navigate you to any section of the app, answer questions about features, explain how things work, and guide you through processes. Just ask me anything — whether it's 'go to attendance', 'what is GPA?', or 'how do I pay my fees?' I've got you covered! What would you like to do?",
  login:
    "Logging in is easy! Just go to the login page, enter your registered email address and password, and you're in. The default admin credentials are admin@edumanage.com with password admin123. If you're a student or teacher, use the email and password you set during signup. Need help with anything else?",
  signup:
    "Signing up is quick! Click on Sign Up from the landing page, enter your email address, choose your role (Student, College Student, Teacher, College Faculty, or Parent), and create a password. Once signed up, you'll be automatically directed to your role-specific portal. Easy, right?",
  gpa_calc:
    "GPA is calculated using a straightforward formula! For each course, multiply your grade points (A=4, B=3, C=2, D=1) by the course credit hours to get quality points. Then sum all quality points and divide by total credit hours. For example, if you scored an A in a 3-credit course and a B in a 2-credit course: (4×3 + 3×2) ÷ 5 = 3.6 GPA. Does that make sense?",
  stripe:
    "Online payments in EduManage are powered by Stripe, which is completely secure and reliable! For testing, you can use the card number 4242 4242 4242 4242 with any future expiry date and any 3-digit CVV. Real transactions work with actual debit and credit cards. Want me to take you to the payment section?",
  darkmode:
    "Switching between light and dark mode is super simple! Just look for the moon icon (for dark mode) or sun icon (for light mode) in the top header bar and click it. Your preference is saved automatically so it persists even after you refresh the page. Pretty handy, right?",
  language:
    "EduManage supports 9 languages! You can switch between English, Hindi, Tamil, Telugu, Kannada, Malayalam, Bengali, Marathi, and Gujarati using the language dropdown in the header. The translations cover navigation labels, page headings, button labels, and table columns throughout the app. Want to try switching languages?",
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
      "Wonderful, as always! 😊 Being helpful is what I do best. Is there something specific you're looking for, or would you like me to tell you about what's new in EduManage?",
    ],
  },
  {
    patterns:
      /what is edumanage|tell me about edumanage|what does edumanage do/,
    responses: [
      "EduManage is a comprehensive, all-in-one school and college management system! 🏫 It has dedicated portals for students, college students, teachers, college faculty, administrators, and parents. You get 17+ pages covering everything from attendance and grades to library management, finance, events, and even a placement tracker. It supports 9 languages, has dark mode, and even has me — your Smart Assistant — to help you navigate! Pretty impressive, right? 😄",
    ],
  },
  {
    patterns:
      /what can you do|what do you do|your capabilities|your features|list your features/,
    responses: [
      "Oh, I can do quite a lot! 🌟 Here's a quick rundown:\n\n🧭 **Navigate** — Say 'go to timetable', 'open finance', or 'take me to grades' and I'll take you there instantly.\n\n💡 **Answer questions** — Ask me about any feature like attendance, GPA, scholarships, or fees.\n\n🎤 **Voice input** — Tap the mic and just speak! I'll capture your full sentence.\n\n🔊 **Speak back** — I can read my responses aloud using text-to-speech.\n\n📚 **Explain features** — From Clubs & Societies to Research Publications, I know it all!\n\nWhat would you like to try first?",
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
    patterns: /bye|goodbye|see you|see ya|take care|good night|good bye/,
    responses: [
      "Goodbye! 👋 It was great chatting with you. Come back anytime you need help — I'll be right here! Have a wonderful day! 😊",
      "See you later! 🌟 Remember, I'm always available whenever you need guidance or have questions. Take care!",
      "Bye! 😄 Hope I was helpful. Wishing you a productive and successful day ahead. Feel free to come back anytime!",
    ],
  },
  {
    patterns:
      /who are you|what are you|introduce yourself|tell me about yourself/,
    responses: [
      "I'm your EduManage Smart Assistant! 🤖 Think of me as a knowledgeable, always-available guide who knows every corner of this platform. I can navigate you between pages, explain features, answer questions about academic processes, and even talk to you through voice! I was built to make your EduManage experience as smooth and efficient as possible. What can I do for you?",
    ],
  },
  {
    patterns: /tell me more|explain more|more details|elaborate|can you expand/,
    responses: [
      "I'd love to elaborate! Could you let me know which specific topic or feature you'd like more details about? For example, you could say 'tell me more about attendance' or 'explain the GPA calculator'. I'm all ears! 😊",
    ],
  },
  {
    patterns: /what is gpa|explain gpa|how does gpa work/,
    responses: [
      "GPA stands for Grade Point Average, and it's a standardized way to measure your academic performance! 📊 It's calculated on a 4.0 scale — an A gives you 4 points, B gives 3, C gives 2, and D gives 1. Each course has credit hours, and your GPA is the weighted average of your grade points across all courses. A higher GPA means better academic performance and opens doors to scholarships, internships, and graduate programs. Want me to open the GPA Calculator so you can see yours?",
    ],
  },
  {
    patterns:
      /what is attendance|how does attendance work|why is attendance important/,
    responses: [
      "Attendance is a record of every day you show up to class — whether present, absent, or late! 📋 It's extremely important because most institutions require at least 75% attendance to make you eligible to sit for exams. If you fall below that threshold, you might be barred from appearing in certain papers. EduManage tracks this automatically and gives you a visual chart in the Attendance Summary section so you always know where you stand. Want me to show you your attendance record?",
    ],
  },
  {
    patterns: /about admin|admin portal|administrator|admin features/,
    responses: [
      "The Admin Portal is the most powerful role in EduManage! 👑 Administrators have access to everything — managing students, teachers, finances, classes, timetables, library, transport, announcements, bulk imports, academic year management, audit logs, analytics dashboards, and much more. It's the complete command center for running the entire institution. Are you an administrator? Want me to navigate somewhere specific?",
    ],
  },
  {
    patterns: /about teacher|teacher portal|teacher features/,
    responses: [
      "The Teacher Portal is packed with useful tools! 👩‍🏫 Teachers can manage their classes, track student progress, build lesson plans, upload exam results via CSV, log parent communications, handle substitute classes, create discussion forums, and even use the question paper builder. It's designed to make teaching more organized and effective. Want me to navigate to a specific teacher feature?",
    ],
  },
  {
    patterns: /about student|student portal|student features/,
    responses: [
      "The School Student Portal has everything a student needs! 📚 You get your timetable, attendance summary with visual charts, grades, homework tracker, leave applications, report card generator (printable!), fee payment history, discussion forums, and a messaging system. It's your complete academic companion. Is there a specific section you'd like to explore?",
    ],
  },
  {
    patterns:
      /about college|college section|college student|college features|what is in college|college portal/,
    responses: [
      "The College Section in EduManage is incredibly feature-rich! 🎓 It has two main areas:\n\n**College Students** — GPA calculator, course registration (up to 18 credits), study materials, internship tracker, research projects, scholarships, exam hall ticket, transcript generator, placement tracker, clubs & societies, campus event RSVP, course drop/add requests, grievance submission, and peer study groups.\n\n**College Faculty** — Research publications, office hours, leave requests, student feedback, question paper builder, mentorship panel, thesis tracker, conference registration, grant & funding tracker, and curriculum editor.\n\nWant me to take you to College Students or College Faculty?",
    ],
  },
  {
    patterns:
      /general section|what is in general|general portal|general features/,
    responses: [
      "The General Section contains institution-wide tools for administrators! 🔧 Here's what's in it:\n\n📊 **Analytics Dashboard** — Charts for attendance trends, grade distributions, and fee collection.\n\n📋 **Audit Log** — Full activity trail showing who made what changes and when.\n\n🚌 **Transport** — Bus routes, driver assignments, and student allocations.\n\n📂 **Documents** — Secure digital filing cabinet for certificates and important files.\n\n📥 **Bulk Import** — Upload hundreds of student/teacher records from Excel/CSV.\n\n📅 **Academic Year** — Switch between years and archive old data.\n\nWant me to take you to any of these? Just say 'go to analytics' or 'open audit log'!",
    ],
  },
  {
    patterns: /about faculty|college faculty|faculty features/,
    responses: [
      "College Faculty have access to some amazing tools! 🔬 Beyond standard teaching features, faculty can manage research publications, set office hours, submit leave requests, view student feedback, build question papers, track mentees, register for conferences and seminars, manage grants & funding, and even use a curriculum editor. It's a comprehensive professional platform. Want me to take you somewhere?",
    ],
  },
  {
    patterns: /about parent|parent portal|parent features/,
    responses: [
      "The Parent Portal keeps parents closely connected to their child's academic journey! 👨‍👩‍👧 Parents can view their child's attendance records, check grades, pay school fees online via Stripe, send messages directly to teachers, see homework assignments, and browse the school calendar for upcoming events. It bridges the gap between home and school beautifully. Want to know more about any specific parent feature?",
    ],
  },
];

const NAV_COMMANDS: Array<{ patterns: string[]; page: string }> = [
  { patterns: ["dashboard", "home", "overview"], page: "dashboard" },
  { patterns: ["grades", "marks", "score"], page: "grades" },
  { patterns: ["attendance", "present", "absent"], page: "attendance" },
  {
    patterns: ["timetable", "schedule", "time table", "class schedule"],
    page: "timetable",
  },
  { patterns: ["homework", "assignments", "tasks"], page: "homework" },
  { patterns: ["fees", "payment", "pay", "finance"], page: "fees" },
  { patterns: ["messages", "inbox", "mail", "chat"], page: "messages" },
  {
    patterns: ["forums", "discussion", "forum", "discussion forums"],
    page: "forums",
  },
  { patterns: ["leave", "leave application", "apply leave"], page: "leave" },
  {
    patterns: ["attendance summary", "attendance chart"],
    page: "attendance-summary",
  },
  { patterns: ["report card", "term report"], page: "report-card" },
  { patterns: ["courses", "enrolled courses"], page: "courses" },
  { patterns: ["gpa", "gpa calculator", "grade point"], page: "gpa" },
  {
    patterns: ["rsvp", "campus event", "events", "register event"],
    page: "rsvp",
  },
  { patterns: ["grievance", "complaint", "feedback"], page: "grievance" },
  {
    patterns: ["course request", "add course", "drop course", "course change"],
    page: "course-requests",
  },
  {
    patterns: ["registration", "register course", "course registration"],
    page: "registration",
  },
  { patterns: ["materials", "study material", "resources"], page: "materials" },
  { patterns: ["internship", "internships"], page: "internships" },
  { patterns: ["research", "research project"], page: "research" },
  {
    patterns: ["scholarship", "scholarships", "financial aid"],
    page: "scholarships",
  },
  {
    patterns: ["hall ticket", "admit card", "exam ticket"],
    page: "exam-ticket",
  },
  { patterns: ["transcript", "academic record"], page: "transcript" },
  { patterns: ["placement", "job", "recruitment"], page: "placement" },
  {
    patterns: ["clubs", "societies", "club", "clubs and societies"],
    page: "clubs",
  },
  { patterns: ["my classes"], page: "classes" },
  { patterns: ["roster", "student roster"], page: "roster" },
  { patterns: ["lesson plan", "lesson plans"], page: "lesson-plans" },
  { patterns: ["progress tracker", "student progress"], page: "progress" },
  {
    patterns: ["exam upload", "upload marks", "bulk upload marks"],
    page: "exam-upload",
  },
  { patterns: ["parent log", "parent communication"], page: "parent-log" },
  { patterns: ["substitute", "substitutes", "sub class"], page: "substitutes" },
  { patterns: ["publications", "research publications"], page: "publications" },
  { patterns: ["office hours", "officehours"], page: "officehours" },
  { patterns: ["student feedback"], page: "feedback" },
  { patterns: ["question paper", "question papers"], page: "question-papers" },
  { patterns: ["mentorship", "mentee", "mentor"], page: "mentorship" },
  { patterns: ["conference", "seminar", "conferences"], page: "conferences" },
  { patterns: ["fee payment", "pay fee"], page: "fee-payment" },
  {
    patterns: ["teacher communication", "message teacher"],
    page: "teacher-comm",
  },
  { patterns: ["school calendar", "calendar"], page: "school-calendar" },
  { patterns: ["homework view", "child homework"], page: "homework-view" },
  // Admin - School section
  { patterns: ["students", "student list"], page: "students" },
  { patterns: ["teachers", "teacher list"], page: "teachers" },
  { patterns: ["classes", "class list"], page: "classes" },
  { patterns: ["subjects", "subject list"], page: "subjects" },
  { patterns: ["attendance page"], page: "attendance" },
  { patterns: ["exams", "exam list"], page: "exams" },
  { patterns: ["announcements", "notice"], page: "announcements" },
  { patterns: ["library"], page: "library" },
  { patterns: ["finance", "financial"], page: "finance" },
  { patterns: ["reports", "report"], page: "reports" },
  { patterns: ["events", "event list"], page: "events" },
  // Admin - College section
  {
    patterns: [
      "college students",
      "college student list",
      "college student portal",
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
  // Admin - General section
  {
    patterns: ["analytics", "analytics dashboard", "charts", "statistics"],
    page: "analytics",
  },
  {
    patterns: ["audit", "audit log", "activity log", "logs"],
    page: "audit-log",
  },
  {
    patterns: ["transport", "transportation", "bus routes", "bus"],
    page: "transport",
  },
  {
    patterns: ["documents", "document portal", "document storage", "files"],
    page: "documents",
  },
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
  { patterns: ["settings"], page: "settings" },
];

const QUICK_CHIPS: Record<string, string[]> = {
  student: [
    "Go to Timetable",
    "Submit Leave",
    "Check Attendance",
    "View Grades",
  ],
  college: ["Calculate GPA", "Course Requests", "Campus RSVP", "My Courses"],
  teacher: ["Lesson Plans", "Progress Tracker", "Exam Upload", "Parent Log"],
  faculty: ["Mentorship", "Conferences", "Office Hours", "Leave Requests"],
  parent: [
    "Fee Payment",
    "Message Teacher",
    "View Homework",
    "School Calendar",
  ],
  admin: ["School Section", "College Students", "Open Analytics", "Audit Log"],
};

const CHIP_COMMANDS: Record<string, string> = {
  "Go to Timetable": "go to timetable",
  "Submit Leave": "go to leave",
  "Check Attendance": "go to attendance summary",
  "View Grades": "go to grades",
  "Calculate GPA": "go to gpa",
  "Course Requests": "go to course requests",
  "Campus RSVP": "go to rsvp",
  "My Courses": "go to courses",
  "Lesson Plans": "go to lesson plans",
  "Progress Tracker": "go to progress tracker",
  "Exam Upload": "go to exam upload",
  "Parent Log": "go to parent log",
  Mentorship: "go to mentorship",
  Conferences: "go to conferences",
  "Office Hours": "go to office hours",
  "Leave Requests": "go to leave",
  "Fee Payment": "go to fee payment",
  "Message Teacher": "go to teacher communication",
  "View Homework": "go to homework view",
  "School Calendar": "go to school calendar",
  "College Students": "go to college students",
  Analytics: "go to analytics",
  Transport: "go to transport",
  "School Section": "school section",
  "Open Analytics": "go to analytics",
  "Audit Log": "go to audit log",
};

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getResponse(
  input: string,
  onNavigate: (page: string) => void,
): string {
  const lower = input.toLowerCase().trim();

  // Section shortcuts
  if (/school section|show school|go to school section/.test(lower)) {
    onNavigate("students");
    return "Opening the School section! 🏫 I've navigated you to Students. From here you can explore Classes, Attendance, Grades, Timetable, Library, Finance, and all other school sections from the sidebar!";
  }
  if (/college section|show college|go to college section/.test(lower)) {
    onNavigate("college-students");
    return "Opening the College section! 🎓 Taking you to College Students. You can also access College Faculty from the sidebar. The college portal has GPA calculator, internships, research, scholarships, and much more!";
  }
  if (/general section|show general|go to general section/.test(lower)) {
    onNavigate("analytics");
    return "Opening the General section! 🔧 Taking you to the Analytics Dashboard. The General section also includes Audit Log, Transport, Documents, Bulk Import, and Academic Year Management!";
  }

  // Check navigation intent
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
          onNavigate(cmd.page);
          const pageName = cmd.page.replace(/-/g, " ");
          const navResponses = [
            `Sure! Opening ${pageName} for you right now! ✨ Let me know if you need any help once you're there.`,
            `On it! Taking you to ${pageName} immediately! 🚀 Feel free to ask if you have questions.`,
            `Got it! Navigating to ${pageName}! 🌟 I'll be right here if you need anything else.`,
          ];
          return pickRandom(navResponses);
        }
      }
    }
    return "Hmm, I couldn't find that specific section. 🤔 Could you try using the exact page name? For example, try saying 'go to college students', 'open analytics', or 'take me to audit log'. I'm happy to help!";
  }

  // Conversational patterns
  for (const entry of CONVERSATIONAL_RESPONSES) {
    if (entry.patterns.test(lower)) {
      return pickRandom(entry.responses);
    }
  }

  // Knowledge base lookup
  for (const [key, answer] of Object.entries(KNOWLEDGE_BASE)) {
    if (lower.includes(key.replace(/-/g, " ")) || lower.includes(key)) {
      return answer;
    }
  }

  // Fee/payment fallback
  if (
    lower.includes("pay") ||
    lower.includes("fee") ||
    lower.includes("payment")
  ) {
    return KNOWLEDGE_BASE.fees;
  }

  // Default fallbacks
  const fallbacks = [
    "Hmm, I'm not quite sure about that one. 🤔 Could you try asking about a specific feature like attendance, grades, fees, or timetable? Or say 'help' to see what I can do!",
    "I didn't quite catch that — could you rephrase it? 😊 I understand questions about EduManage features and navigation commands. For example, 'what is GPA?' or 'go to library'.",
    "That's an interesting question! I'm not sure I have a great answer for that. 🤔 Try asking me about a specific EduManage feature, or say 'what can you do?' to see all my capabilities!",
    "I'm still learning, but I might not have info on that specific topic. 😅 Try asking about attendance, grades, timetable, fees, or any other EduManage section — I know those really well!",
  ];
  return pickRandom(fallbacks);
}

function speak(text: string, isMuted: boolean) {
  if (isMuted || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  // Strip markdown-like formatting for cleaner speech
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

export function SmartAssistant({
  onNavigate,
  currentPortal,
  onSwitchPortal,
}: Props) {
  const [expanded, setExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Hi there! 👋 I'm your EduManage Smart Assistant. I can help you navigate to any page, answer questions about features, or just have a conversation. What can I do for you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const lastSent = useRef("");
  const chatEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll on message or typing change
  useEffect(() => {
    if (expanded && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [expanded, messages.length, isTyping]);

  const handleNavigate = (page: string) => {
    if (["admin", "administrator"].includes(page) && onSwitchPortal) {
      onSwitchPortal("admin");
      return;
    }
    onNavigate(page);
  };

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || trimmed === lastSent.current) return;
    lastSent.current = trimmed;
    setMessages((prev) => [...prev, { role: "user", text: trimmed }]);
    setInput("");
    setIsTyping(true);

    const delay = 600 + Math.random() * 300;
    setTimeout(() => {
      const reply = getResponse(trimmed, handleNavigate);
      setIsTyping(false);
      setMessages((prev) => [...prev, { role: "assistant", text: reply }]);
      speak(reply, isMuted);
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

  const chips = QUICK_CHIPS[currentPortal] || QUICK_CHIPS.student;

  return (
    <div className="border-t border-white/10 mt-auto">
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-3 text-gray-300 hover:text-white transition-colors"
        data-ocid="smart_assistant.toggle"
      >
        <div className="flex items-center gap-2">
          <Bot size={15} className="text-gray-400" />
          <span className="text-xs font-semibold">Smart Assistant</span>
          {listening && (
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-gray-400 animate-pulse" />
              <span className="text-[10px] text-gray-400">Listening...</span>
            </span>
          )}
        </div>
        {expanded ? <ChevronDown size={13} /> : <ChevronUp size={13} />}
      </button>

      {expanded && (
        <div className="px-2 pb-3 space-y-2">
          {/* Chat history */}
          <div
            className="bg-white dark:bg-gray-900/5 rounded-lg p-2 h-44 overflow-y-auto space-y-1.5"
            data-ocid="smart_assistant.panel"
          >
            {messages.map((msg, i) => (
              <div
                key={`${msg.role}-${i}`}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <span
                  className={`text-[11px] px-2.5 py-1.5 rounded-xl max-w-[85%] leading-relaxed whitespace-pre-line ${
                    msg.role === "user"
                      ? "bg-white dark:bg-gray-900 text-black"
                      : "bg-gray-900/60 text-gray-100"
                  }`}
                >
                  {msg.text}
                </span>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <span className="bg-gray-900/60 text-gray-100 px-3 py-2 rounded-xl">
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
          <div className="flex flex-wrap gap-1">
            {chips.map((chip) => (
              <button
                key={chip}
                type="button"
                onClick={() => sendMessage(CHIP_COMMANDS[chip] || chip)}
                className="text-[10px] px-2 py-0.5 rounded-full bg-white dark:bg-gray-900/10 text-gray-300 hover:bg-white dark:bg-gray-900/20 hover:text-white transition-colors"
                data-ocid="smart_assistant.chip"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Input row */}
          <div className="flex items-center gap-1">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                listening ? "Listening... speak now" : "Ask anything..."
              }
              className="flex-1 bg-white dark:bg-gray-900/10 text-white text-[11px] rounded-lg px-2.5 py-1.5 outline-none placeholder:text-gray-500 dark:text-gray-400 border border-white/10 focus:border-gray-500/50"
              data-ocid="smart_assistant.input"
            />
            <button
              type="button"
              onClick={() => setIsMuted((m) => !m)}
              className="p-1.5 rounded-lg bg-white dark:bg-gray-900/10 text-gray-300 hover:bg-white dark:bg-gray-900/20 transition-colors"
              title={isMuted ? "Unmute assistant" : "Mute assistant"}
              data-ocid="smart_assistant.mute_button"
            >
              {isMuted ? <VolumeX size={12} /> : <Volume2 size={12} />}
            </button>
            <button
              type="button"
              onClick={toggleVoice}
              className={`p-1.5 rounded-lg transition-colors ${
                listening
                  ? "bg-gray-500 text-white animate-pulse"
                  : "bg-white dark:bg-gray-900/10 text-gray-300 hover:bg-white dark:bg-gray-900/20"
              }`}
              data-ocid="smart_assistant.mic_button"
            >
              {listening ? <MicOff size={12} /> : <Mic size={12} />}
            </button>
            <button
              type="button"
              onClick={handleSend}
              className="p-1.5 rounded-lg bg-gray-600 text-white hover:bg-gray-500 transition-colors"
              data-ocid="smart_assistant.send_button"
            >
              <Send size={12} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
