import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Plus,
  Reply as ReplyIcon,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const SUBJECTS = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "English",
  "History",
  "Computer Science",
  "Data Structures",
  "Machine Learning",
  "Business Strategy",
];

interface ForumReply {
  id: number;
  author: string;
  content: string;
  date: string;
}

interface Thread {
  id: number;
  subject: string;
  title: string;
  author: string;
  date: string;
  message: string;
  replies: ForumReply[];
  answered: boolean;
}

const INITIAL_THREADS: Thread[] = [
  {
    id: 1,
    subject: "Mathematics",
    title: "How to solve integration by parts?",
    author: "Riya Sharma",
    date: "Mar 24",
    message:
      "I'm struggling with integration by parts. Can someone explain the LIATE rule and when to apply it?",
    replies: [
      {
        id: 1,
        author: "Mr. Arjun Nair",
        content:
          "Great question! LIATE stands for Logarithmic, Inverse trig, Algebraic, Trigonometric, Exponential. Choose u from the left side of LIATE and dv from the rest.",
        date: "Mar 24",
      },
    ],
    answered: true,
  },
  {
    id: 2,
    subject: "Mathematics",
    title: "Difference between permutations and combinations?",
    author: "Dev Patel",
    date: "Mar 23",
    message:
      "When should I use permutation vs combination? The order matters concept is confusing me.",
    replies: [],
    answered: false,
  },
  {
    id: 3,
    subject: "Physics",
    title: "Why does current lag in an inductor?",
    author: "Priya Singh",
    date: "Mar 22",
    message:
      "In AC circuits, I read that current lags voltage in an inductor by 90 degrees. Can anyone explain the intuition behind this?",
    replies: [
      {
        id: 1,
        author: "Ms. Kavita Rao",
        content:
          "Think of inductance as electromagnetic inertia. An inductor resists changes in current, so when voltage tries to push current through, the inductor fights back, causing the lag.",
        date: "Mar 22",
      },
    ],
    answered: true,
  },
  {
    id: 4,
    subject: "Computer Science",
    title: "Best resources to learn recursion?",
    author: "Aditya Kumar",
    date: "Mar 21",
    message:
      "Recursion always confuses me. What are the best resources (YouTube, books, etc.) to really understand it?",
    replies: [],
    answered: false,
  },
  {
    id: 5,
    subject: "Data Structures",
    title: "Time complexity of HashMaps?",
    author: "Sneha Roy",
    date: "Mar 20",
    message:
      "Is the time complexity of HashMap get/put always O(1)? What happens with collisions?",
    replies: [
      {
        id: 1,
        author: "Prof. Suresh Menon",
        content:
          "Average case is O(1), but worst case is O(n) with many collisions (e.g., poor hash function). Java's HashMap uses tree bins for better worst-case performance in Java 8+.",
        date: "Mar 20",
      },
    ],
    answered: true,
  },
  {
    id: 6,
    subject: "Machine Learning",
    title: "Overfitting vs underfitting - how to detect?",
    author: "Neha Joshi",
    date: "Mar 19",
    message:
      "I trained a model and I think it might be overfitting. How do I detect and fix it?",
    replies: [],
    answered: false,
  },
  {
    id: 7,
    subject: "English",
    title: "Difference between affect and effect?",
    author: "Aryan Mehta",
    date: "Mar 18",
    message: "I always mix up affect and effect. Any easy way to remember?",
    replies: [
      {
        id: 1,
        author: "Ms. Preethi Nair",
        content:
          "Affect is a Verb (action word), Effect is a noun. A-for-Action, E-for-End result. RAVEN: Remember Affect Verb Effect Noun!",
        date: "Mar 18",
      },
    ],
    answered: true,
  },
  {
    id: 8,
    subject: "Chemistry",
    title: "Le Chatelier's Principle in real life?",
    author: "Tanvi Gupta",
    date: "Mar 17",
    message:
      "Can someone give a real-life example of Le Chatelier's principle that makes it easier to understand?",
    replies: [],
    answered: false,
  },
];

export default function ForumsPage() {
  const { t } = useLanguage();
  const [threads, setThreads] = useState<Thread[]>(INITIAL_THREADS);
  const [selectedSubject, setSelectedSubject] = useState("Mathematics");
  const [expandedThread, setExpandedThread] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const subjectThreads = threads.filter((t) => t.subject === selectedSubject);

  const handleNewThread = () => {
    if (!newTitle.trim() || !newMessage.trim()) {
      toast.error("Title and message are required");
      return;
    }
    const t: Thread = {
      id: Date.now(),
      subject: selectedSubject,
      title: newTitle.trim(),
      author: "You",
      date: "Just now",
      message: newMessage.trim(),
      replies: [],
      answered: false,
    };
    setThreads((prev) => [t, ...prev]);
    setNewTitle("");
    setNewMessage("");
    setDialogOpen(false);
    toast.success("Thread posted successfully");
  };

  const handleReply = (threadId: number) => {
    if (!replyText.trim()) {
      toast.error("Reply cannot be empty");
      return;
    }
    setThreads((prev) =>
      prev.map((t) =>
        t.id === threadId
          ? {
              ...t,
              replies: [
                ...t.replies,
                {
                  id: Date.now(),
                  author: "You",
                  content: replyText.trim(),
                  date: "Just now",
                },
              ],
            }
          : t,
      ),
    );
    setReplyText("");
    toast.success("Reply posted");
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t("forums")}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
          Per-subject Q&A boards for students and teachers
        </p>
      </div>

      <div className="flex gap-6">
        {/* Subject List */}
        <aside className="w-48 shrink-0">
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
            Subjects
          </p>
          <nav className="space-y-0.5">
            {SUBJECTS.map((s) => {
              const count = threads.filter((t) => t.subject === s).length;
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => {
                    setSelectedSubject(s);
                    setExpandedThread(null);
                  }}
                  data-ocid={`forums.${s.toLowerCase().replace(/\s+/g, "_")}.tab`}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                    selectedSubject === s
                      ? "bg-black text-white font-semibold"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:bg-gray-700"
                  }`}
                >
                  <span>{s}</span>
                  <span
                    className={`text-xs rounded-full px-1.5 ${
                      selectedSubject === s
                        ? "bg-white dark:bg-gray-900/20 text-white"
                        : "bg-gray-200 text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Thread Panel */}
        <main className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              {selectedSubject}
            </h2>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                  size="sm"
                  data-ocid="forums.open_modal_button"
                >
                  <Plus size={14} className="mr-1" /> New Thread
                </Button>
              </DialogTrigger>
              <DialogContent data-ocid="forums.dialog">
                <DialogHeader>
                  <DialogTitle>New Thread in {selectedSubject}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-2">
                  <div>
                    <Label>Title</Label>
                    <Input
                      placeholder="Enter your question..."
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="mt-1"
                      data-ocid="forums.input"
                    />
                  </div>
                  <div>
                    <Label>Message</Label>
                    <Textarea
                      placeholder="Describe your question in detail..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      rows={4}
                      className="mt-1"
                      data-ocid="forums.textarea"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setDialogOpen(false)}
                    data-ocid="forums.cancel_button"
                  >
                    Cancel
                  </Button>
                  <Button
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                    onClick={handleNewThread}
                    data-ocid="forums.submit_button"
                  >
                    Post Thread
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {subjectThreads.length === 0 ? (
            <div
              className="text-center py-16 text-gray-400 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl"
              data-ocid="forums.empty_state"
            >
              <MessageSquare size={40} className="mx-auto mb-3 opacity-40" />
              <p className="font-medium">No threads yet</p>
              <p className="text-sm mt-1">
                Start the conversation by posting a new thread
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {subjectThreads.map((thread, i) => (
                <Card
                  key={thread.id}
                  className="border border-gray-100 dark:border-gray-700 hover:shadow-sm transition-shadow"
                  data-ocid={`forums.item.${i + 1}`}
                >
                  <CardHeader className="pb-2 pt-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          {thread.answered && (
                            <Badge className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-700 text-[10px]">
                              <CheckCircle2 size={9} className="mr-1" />{" "}
                              Answered
                            </Badge>
                          )}
                          <span className="text-xs text-gray-400">
                            {thread.replies.length} replies
                          </span>
                        </div>
                        <CardTitle
                          className="text-base font-semibold text-gray-900 dark:text-white cursor-pointer hover:text-black dark:hover:text-white"
                          onClick={() =>
                            setExpandedThread(
                              expandedThread === thread.id ? null : thread.id,
                            )
                          }
                        >
                          {thread.title}
                        </CardTitle>
                        <p className="text-xs text-gray-400 mt-1">
                          by{" "}
                          <span className="font-medium text-gray-600 dark:text-gray-300">
                            {thread.author}
                          </span>{" "}
                          · {thread.date}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          setExpandedThread(
                            expandedThread === thread.id ? null : thread.id,
                          )
                        }
                        className="text-gray-400 hover:text-gray-600 dark:text-gray-300"
                        data-ocid={`forums.toggle.${i + 1}`}
                      >
                        {expandedThread === thread.id ? (
                          <ChevronUp size={16} />
                        ) : (
                          <ChevronDown size={16} />
                        )}
                      </button>
                    </div>
                  </CardHeader>

                  {expandedThread === thread.id && (
                    <CardContent className="border-t border-gray-100 dark:border-gray-700 pt-4 pb-4 space-y-4">
                      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                        <p className="text-sm text-gray-700 dark:text-gray-200">
                          {thread.message}
                        </p>
                      </div>

                      {thread.replies.length > 0 && (
                        <div className="space-y-2">
                          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                            Replies
                          </p>
                          {thread.replies.map((r) => (
                            <div
                              key={r.id}
                              className="border-l-2 border-gray-200 dark:border-gray-700 pl-3"
                            >
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs font-semibold text-gray-700 dark:text-gray-200">
                                  {r.author}
                                </span>
                                <span className="text-xs text-gray-400">
                                  {r.date}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-300">
                                {r.content}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="flex gap-2">
                        <Textarea
                          placeholder="Write a reply..."
                          rows={2}
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          className="flex-1 text-sm"
                          data-ocid="forums.reply_textarea"
                        />
                        <Button
                          size="sm"
                          className="bg-black text-white hover:bg-gray-800 self-end"
                          onClick={() => handleReply(thread.id)}
                          data-ocid="forums.reply_button"
                        >
                          <ReplyIcon size={13} className="mr-1" /> Reply
                        </Button>
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
