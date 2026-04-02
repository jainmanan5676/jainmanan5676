import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import {
  ChevronLeft,
  Inbox,
  Mail,
  Plus,
  Reply,
  Send,
  Star,
  Trash2,
} from "lucide-react";
import { useState } from "react";

type Role =
  | "teacher"
  | "college_faculty"
  | "student"
  | "college_student"
  | "admin";

interface Contact {
  id: string;
  name: string;
  role: Role;
}

interface Message {
  id: string;
  from: Contact;
  to: Contact;
  subject: string;
  body: string;
  timestamp: string;
  read: boolean;
  starred: boolean;
  folder: "inbox" | "sent" | "trash";
}

const CONTACTS: Contact[] = [
  { id: "c1", name: "Rajesh Kumar", role: "teacher" },
  { id: "c2", name: "Priya Sharma", role: "teacher" },
  { id: "c3", name: "Amit Singh", role: "teacher" },
  { id: "c4", name: "Dr. Sarah Johnson", role: "college_faculty" },
  { id: "c5", name: "Prof. Michael Chen", role: "college_faculty" },
  { id: "c6", name: "Dr. Priya Patel", role: "college_faculty" },
  { id: "c7", name: "Aisha Rahman", role: "student" },
  { id: "c8", name: "Ali Hassan", role: "student" },
  { id: "c9", name: "Fatima Malik", role: "student" },
  { id: "c10", name: "Riya Sharma", role: "college_student" },
  { id: "c11", name: "Arjun Patel", role: "college_student" },
  { id: "c12", name: "Neha Gupta", role: "college_student" },
  { id: "c13", name: "Principal Office", role: "admin" },
];

const ME: Contact = { id: "me", name: "You", role: "admin" };

const ROLE_LABELS: Record<Role, string> = {
  teacher: "Teacher",
  college_faculty: "College Faculty",
  student: "Student",
  college_student: "College Student",
  admin: "Admin",
};

const ROLE_COLORS: Record<Role, string> = {
  teacher: "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200",
  college_faculty:
    "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200",
  student: "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200",
  college_student:
    "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200",
  admin: "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200",
};

const INITIAL_MESSAGES: Message[] = [
  {
    id: "m1",
    from: CONTACTS[6],
    to: ME,
    subject: "Assignment Submission Query",
    body: "Dear Sir/Ma'am,\n\nI wanted to confirm whether my assignment for Mathematics Chapter 5 has been received. I submitted it on Monday but haven't received any acknowledgment yet. Could you please check and let me know?\n\nThank you,\nAisha Rahman",
    timestamp: "2026-03-24T09:15:00",
    read: false,
    starred: false,
    folder: "inbox",
  },
  {
    id: "m2",
    from: CONTACTS[0],
    to: ME,
    subject: "Grade Query - Class 10B",
    body: "Hello,\n\nI need to discuss the grading criteria for the mid-term exams for Class 10B. Several students have raised concerns about the marking scheme. Could we schedule a meeting at your earliest convenience?\n\nBest regards,\nRajesh Kumar",
    timestamp: "2026-03-24T08:45:00",
    read: false,
    starred: true,
    folder: "inbox",
  },
  {
    id: "m3",
    from: CONTACTS[3],
    to: ME,
    subject: "Course Registration Help",
    body: "Dear Admin,\n\nSeveral college students have been facing issues with the course registration portal. They are unable to enroll in elective courses. Could you please look into this technical issue urgently?\n\nKind regards,\nDr. Sarah Johnson",
    timestamp: "2026-03-23T16:30:00",
    read: false,
    starred: false,
    folder: "inbox",
  },
  {
    id: "m4",
    from: CONTACTS[9],
    to: ME,
    subject: "Exam Schedule Conflict",
    body: "Hi,\n\nI noticed that my Data Structures exam and the Physics lab exam are scheduled on the same day and time. This seems to be an error in the timetable. Could you please help resolve this conflict?\n\nThanks,\nRiya Sharma",
    timestamp: "2026-03-23T14:00:00",
    read: true,
    starred: false,
    folder: "inbox",
  },
  {
    id: "m5",
    from: CONTACTS[12],
    to: ME,
    subject: "Fee Payment Reminder",
    body: "Dear Students,\n\nThis is a reminder that the second semester fee payment deadline is approaching. Please ensure all outstanding fees are cleared by March 30, 2026, to avoid any late payment penalties.\n\nPrincipal Office",
    timestamp: "2026-03-22T11:00:00",
    read: true,
    starred: true,
    folder: "inbox",
  },
  {
    id: "m6",
    from: CONTACTS[7],
    to: ME,
    subject: "Library Book Return Request",
    body: "Hello,\n\nI borrowed 'Advanced Mathematics' by Prof. Sharma last month and I would like to renew it for another two weeks as I am still using it for my project. Could you please approve the renewal?\n\nThank you,\nAli Hassan",
    timestamp: "2026-03-22T09:30:00",
    read: true,
    starred: false,
    folder: "inbox",
  },
  {
    id: "m7",
    from: CONTACTS[4],
    to: ME,
    subject: "Annual Science Event Invitation",
    body: "Dear Colleagues,\n\nIt is my pleasure to invite you to the Annual Science Exhibition scheduled for April 5, 2026. This event will showcase projects from both school and college students. Your participation as a judge would be greatly appreciated.\n\nWarm regards,\nProf. Michael Chen",
    timestamp: "2026-03-21T15:00:00",
    read: true,
    starred: false,
    folder: "inbox",
  },
  {
    id: "m8",
    from: CONTACTS[1],
    to: ME,
    subject: "Attendance Query - Priya Sharma",
    body: "Dear Admin,\n\nI would like to request a review of the attendance records for Class 8A for the month of February. There seems to be some discrepancy in the data that needs to be corrected before the report is generated.\n\nThank you,\nPriya Sharma",
    timestamp: "2026-03-20T10:15:00",
    read: true,
    starred: false,
    folder: "inbox",
  },
  {
    id: "s1",
    from: ME,
    to: CONTACTS[6],
    subject: "Re: Assignment Submission Query",
    body: "Dear Aisha,\n\nYour assignment has been received and is currently under review. You will receive your grade within the next 3 business days.\n\nBest regards,\nAdmin",
    timestamp: "2026-03-23T10:00:00",
    read: true,
    starred: false,
    folder: "sent",
  },
  {
    id: "s2",
    from: ME,
    to: CONTACTS[9],
    subject: "Re: Exam Schedule Conflict",
    body: "Dear Riya,\n\nThank you for bringing this to our attention. The timetable has been updated. Your Data Structures exam is now rescheduled to March 28 at 10 AM. Please check the updated timetable.\n\nBest regards,\nAdmin",
    timestamp: "2026-03-23T15:30:00",
    read: true,
    starred: false,
    folder: "sent",
  },
  {
    id: "s3",
    from: ME,
    to: CONTACTS[3],
    subject: "Re: Course Registration Help",
    body: "Dear Dr. Johnson,\n\nThe technical issue with course registration has been identified and fixed. Students should now be able to enroll in elective courses without any issues. Please have them try again.\n\nBest regards,\nAdmin",
    timestamp: "2026-03-23T17:00:00",
    read: true,
    starred: false,
    folder: "sent",
  },
];

function formatTime(ts: string): string {
  const d = new Date(ts);
  const now = new Date();
  const isToday = d.toDateString() === now.toDateString();
  if (isToday) {
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }
  return d.toLocaleDateString([], { month: "short", day: "numeric" });
}

function initials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

type Folder = "inbox" | "sent" | "starred" | "trash";

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [activeFolder, setActiveFolder] = useState<Folder>("inbox");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [composeOpen, setComposeOpen] = useState(false);
  const [replyOpen, setReplyOpen] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [composeTo, setComposeTo] = useState("");
  const [composeSubject, setComposeSubject] = useState("");
  const [composeBody, setComposeBody] = useState("");
  const [search, setSearch] = useState("");

  const folderMessages = messages.filter((m) => {
    if (activeFolder === "starred") return m.starred && m.folder !== "trash";
    return m.folder === activeFolder;
  });

  const filtered = folderMessages.filter(
    (m) =>
      m.subject.toLowerCase().includes(search.toLowerCase()) ||
      m.from.name.toLowerCase().includes(search.toLowerCase()) ||
      m.to.name.toLowerCase().includes(search.toLowerCase()),
  );

  const selected = messages.find((m) => m.id === selectedId) ?? null;

  function openMessage(id: string) {
    setSelectedId(id);
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, read: true } : m)),
    );
    setReplyOpen(false);
    setReplyText("");
  }

  function toggleStar(id: string, e: React.MouseEvent) {
    e.stopPropagation();
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, starred: !m.starred } : m)),
    );
  }

  function deleteMessage(id: string) {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, folder: "trash" } : m)),
    );
    if (selectedId === id) setSelectedId(null);
  }

  function sendReply() {
    if (!selected || !replyText.trim()) return;
    const newMsg: Message = {
      id: `r${Date.now()}`,
      from: ME,
      to: selected.from.id === "me" ? selected.to : selected.from,
      subject: `Re: ${selected.subject}`,
      body: replyText,
      timestamp: new Date().toISOString(),
      read: true,
      starred: false,
      folder: "sent",
    };
    setMessages((prev) => [...prev, newMsg]);
    setReplyOpen(false);
    setReplyText("");
  }

  function sendCompose() {
    const toContact = CONTACTS.find((c) => c.id === composeTo);
    if (!toContact || !composeSubject.trim() || !composeBody.trim()) return;
    const newMsg: Message = {
      id: `c${Date.now()}`,
      from: ME,
      to: toContact,
      subject: composeSubject,
      body: composeBody,
      timestamp: new Date().toISOString(),
      read: true,
      starred: false,
      folder: "sent",
    };
    setMessages((prev) => [...prev, newMsg]);
    setComposeOpen(false);
    setComposeTo("");
    setComposeSubject("");
    setComposeBody("");
  }

  const inboxUnread = messages.filter(
    (m) => m.folder === "inbox" && !m.read,
  ).length;

  const sidebarItems: {
    id: Folder;
    label: string;
    icon: React.ReactNode;
    count?: number;
  }[] = [
    {
      id: "inbox",
      label: "Inbox",
      icon: <Inbox size={16} />,
      count: inboxUnread,
    },
    { id: "sent", label: "Sent", icon: <Send size={16} /> },
    { id: "starred", label: "Starred", icon: <Star size={16} /> },
    { id: "trash", label: "Trash", icon: <Trash2 size={16} /> },
  ];

  return (
    <div className="flex h-full" style={{ minHeight: "calc(100vh - 64px)" }}>
      {/* Left panel */}
      <div className="w-52 shrink-0 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 flex flex-col pt-4 pb-4">
        <div className="px-3 mb-4">
          <Button
            className="w-full bg-black text-white hover:bg-gray-800 gap-2"
            onClick={() => setComposeOpen(true)}
            data-ocid="messages.compose.button"
          >
            <Plus size={16} />
            Compose
          </Button>
        </div>
        <nav className="flex flex-col gap-0.5 px-2">
          {sidebarItems.map((item) => (
            <button
              type="button"
              key={item.id}
              onClick={() => {
                setActiveFolder(item.id);
                setSelectedId(null);
              }}
              data-ocid={`messages.${item.id}.tab`}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeFolder === item.id
                  ? "bg-gray-100 dark:bg-gray-700 text-black"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 dark:bg-gray-800 hover:text-black dark:hover:text-white"
              }`}
            >
              {item.icon}
              <span className="flex-1 text-left">{item.label}</span>
              {item.count !== undefined && item.count > 0 && (
                <span className="bg-black text-white text-xs rounded-full px-1.5 py-0.5 leading-none">
                  {item.count}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Message list */}
      <div
        className={`border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 flex flex-col ${
          selected
            ? "hidden md:flex w-80 shrink-0"
            : "flex-1 md:flex md:w-80 md:shrink-0"
        }`}
      >
        <div className="p-3 border-b border-gray-100 dark:border-gray-700">
          <div className="relative">
            <Mail
              size={14}
              className="absolute left-2.5 top-2.5 text-gray-400"
            />
            <Input
              placeholder="Search messages..."
              className="pl-7 h-8 text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              data-ocid="messages.search_input"
            />
          </div>
        </div>
        <ScrollArea className="flex-1">
          {filtered.length === 0 ? (
            <div
              className="p-8 text-center text-gray-400 text-sm"
              data-ocid="messages.empty_state"
            >
              No messages
            </div>
          ) : (
            filtered.map((msg, idx) => (
              <button
                type="button"
                key={msg.id}
                onClick={() => openMessage(msg.id)}
                data-ocid={`messages.item.${idx + 1}`}
                className={`w-full text-left px-4 py-3 border-b border-gray-50 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700 dark:bg-gray-800 ${
                  selectedId === msg.id ? "bg-gray-100 dark:bg-gray-700" : ""
                }`}
              >
                <div className="flex items-start gap-2.5">
                  {!msg.read && msg.folder === "inbox" && (
                    <span className="mt-1.5 w-2 h-2 rounded-full bg-black shrink-0" />
                  )}
                  {(msg.read || msg.folder !== "inbox") && (
                    <span className="mt-1.5 w-2 h-2 shrink-0" />
                  )}
                  <Avatar className="w-8 h-8 shrink-0">
                    <AvatarFallback className="bg-gray-200 text-gray-700 dark:text-gray-200 text-xs">
                      {initials(
                        msg.folder === "sent" ? msg.to.name : msg.from.name,
                      )}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <span
                        className={`text-sm truncate ${!msg.read && msg.folder === "inbox" ? "font-semibold text-black" : "font-medium text-gray-700 dark:text-gray-200"}`}
                      >
                        {msg.folder === "sent" ? msg.to.name : msg.from.name}
                      </span>
                      <span className="text-xs text-gray-400 shrink-0">
                        {formatTime(msg.timestamp)}
                      </span>
                    </div>
                    <div
                      className={`text-xs truncate mb-0.5 ${!msg.read && msg.folder === "inbox" ? "font-semibold text-black" : "text-gray-600 dark:text-gray-300"}`}
                    >
                      {msg.subject}
                    </div>
                    <div className="text-xs text-gray-400 truncate">
                      {msg.body.slice(0, 60)}...
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => toggleStar(msg.id, e)}
                    data-ocid={`messages.toggle.${idx + 1}`}
                    className="shrink-0 mt-0.5"
                  >
                    <Star
                      size={14}
                      className={
                        msg.starred
                          ? "fill-gray-400 text-gray-400"
                          : "text-gray-300 hover:text-gray-400"
                      }
                    />
                  </button>
                </div>
              </button>
            ))
          )}
        </ScrollArea>
      </div>

      {/* Detail pane */}
      {selected ? (
        <div className="flex-1 flex flex-col bg-white dark:bg-gray-900">
          <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-100 dark:border-gray-700">
            <button
              type="button"
              onClick={() => setSelectedId(null)}
              className="md:hidden p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 dark:bg-gray-700"
              data-ocid="messages.close_button"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-black">
                {selected.subject}
              </h2>
            </div>
            <button
              type="button"
              onClick={() => deleteMessage(selected.id)}
              className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
              data-ocid="messages.delete_button"
            >
              <Trash2 size={16} />
            </button>
          </div>

          <ScrollArea className="flex-1 px-6 py-4">
            <div className="flex items-start gap-3 mb-6">
              <Avatar className="w-10 h-10 shrink-0">
                <AvatarFallback className="bg-black text-white text-sm">
                  {initials(
                    selected.folder === "sent"
                      ? selected.to.name
                      : selected.from.name,
                  )}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-black">
                    {selected.folder === "sent"
                      ? selected.to.name
                      : selected.from.name}
                  </span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      ROLE_COLORS[
                        selected.folder === "sent"
                          ? selected.to.role
                          : selected.from.role
                      ]
                    }`}
                  >
                    {
                      ROLE_LABELS[
                        selected.folder === "sent"
                          ? selected.to.role
                          : selected.from.role
                      ]
                    }
                  </span>
                  <span className="text-xs text-gray-400">
                    {new Date(selected.timestamp).toLocaleString()}
                  </span>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  To: {selected.folder === "sent" ? selected.to.name : "me"}
                </div>
              </div>
            </div>

            <div className="text-sm text-gray-700 dark:text-gray-200 whitespace-pre-wrap leading-relaxed">
              {selected.body}
            </div>

            {replyOpen && (
              <div className="mt-8 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-2 font-medium">
                  Reply to{" "}
                  {selected.folder === "sent"
                    ? selected.to.name
                    : selected.from.name}
                </div>
                <Textarea
                  placeholder="Write your reply..."
                  className="min-h-[100px] text-sm mb-3"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  data-ocid="messages.textarea"
                />
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                    onClick={sendReply}
                    data-ocid="messages.reply.submit_button"
                  >
                    Send Reply
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setReplyOpen(false)}
                    data-ocid="messages.reply.cancel_button"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </ScrollArea>

          {!replyOpen && (
            <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-700">
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={() => setReplyOpen(true)}
                data-ocid="messages.reply.button"
              >
                <Reply size={14} />
                Reply
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex-1 hidden md:flex items-center justify-center bg-gray-50 dark:bg-gray-800">
          <div
            className="text-center text-gray-400"
            data-ocid="messages.empty_state"
          >
            <Mail size={48} className="mx-auto mb-3 opacity-30" />
            <p className="text-sm">Select a message to read</p>
          </div>
        </div>
      )}

      {/* Compose Modal */}
      <Dialog open={composeOpen} onOpenChange={setComposeOpen}>
        <DialogContent className="sm:max-w-lg" data-ocid="messages.dialog">
          <DialogHeader>
            <DialogTitle>New Message</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <div className="text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">
                To
              </div>
              <select
                className="w-full border border-gray-200 dark:border-gray-700 rounded-md px-3 py-2 text-sm bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-black"
                value={composeTo}
                onChange={(e) => setComposeTo(e.target.value)}
                data-ocid="messages.compose.select"
              >
                <option value="">Select recipient...</option>
                {[
                  "teacher",
                  "college_faculty",
                  "student",
                  "college_student",
                  "admin",
                ].map((role) => (
                  <optgroup key={role} label={ROLE_LABELS[role as Role]}>
                    {CONTACTS.filter((c) => c.role === role).map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>
            <div>
              <div className="text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">
                Subject
              </div>
              <input
                className="w-full border border-gray-200 dark:border-gray-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Enter subject..."
                value={composeSubject}
                onChange={(e) => setComposeSubject(e.target.value)}
                data-ocid="messages.compose.input"
              />
            </div>
            <div>
              <div className="text-xs font-medium text-gray-600 dark:text-gray-300 mb-1">
                Message
              </div>
              <Textarea
                placeholder="Write your message..."
                className="min-h-[140px] text-sm"
                value={composeBody}
                onChange={(e) => setComposeBody(e.target.value)}
                data-ocid="messages.compose.textarea"
              />
            </div>
            <div className="flex gap-2 justify-end pt-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setComposeOpen(false)}
                data-ocid="messages.compose.cancel_button"
              >
                Cancel
              </Button>
              <Button
                size="sm"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={sendCompose}
                data-ocid="messages.compose.submit_button"
              >
                Send
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
