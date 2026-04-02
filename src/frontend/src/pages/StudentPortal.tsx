import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  BookOpen,
  CalendarCheck,
  CheckCircle,
  CheckCircle2,
  ClipboardList,
  CreditCard,
  FileText,
  GraduationCap,
  LogOut,
  Mail,
  MessageSquare,
  Printer,
  Star,
  User,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { SmartAssistant } from "../components/SmartAssistant";
import ForumsPage from "./ForumsPage";
import MessagesPage from "./MessagesPage";

interface Props {
  studentName: string;
  onLogout: () => void;
}

const SEED_GRADES = [
  { id: 1, subject: "Mathematics", exam: "Mid-Term", score: 88, total: 100 },
  { id: 2, subject: "Science", exam: "Mid-Term", score: 75, total: 100 },
  { id: 3, subject: "English", exam: "Mid-Term", score: 92, total: 100 },
  { id: 4, subject: "History", exam: "Mid-Term", score: 68, total: 100 },
  { id: 5, subject: "Geography", exam: "Unit Test 1", score: 81, total: 100 },
  {
    id: 6,
    subject: "Computer Science",
    exam: "Unit Test 1",
    score: 95,
    total: 100,
  },
  { id: 7, subject: "Mathematics", exam: "Unit Test 2", score: 79, total: 100 },
  { id: 8, subject: "Science", exam: "Unit Test 2", score: 83, total: 100 },
];

const SEED_ATTENDANCE = [
  { id: 1, date: "2026-03-01", subject: "Mathematics", status: "Present" },
  { id: 2, date: "2026-03-02", subject: "Science", status: "Present" },
  { id: 3, date: "2026-03-03", subject: "English", status: "Absent" },
  { id: 4, date: "2026-03-04", subject: "History", status: "Present" },
  { id: 5, date: "2026-03-05", subject: "Geography", status: "Late" },
  { id: 6, date: "2026-03-08", subject: "Mathematics", status: "Present" },
  { id: 7, date: "2026-03-09", subject: "Computer Science", status: "Present" },
  { id: 8, date: "2026-03-10", subject: "English", status: "Present" },
  { id: 9, date: "2026-03-11", subject: "Science", status: "Present" },
  { id: 10, date: "2026-03-12", subject: "History", status: "Absent" },
];

const SEED_FEES = [
  {
    id: 1,
    term: "Tuition Fee — Term 1",
    amount: 4000,
    dueDate: "2026-04-10",
    status: "Paid",
  },
  {
    id: 2,
    term: "Tuition Fee — Term 2",
    amount: 4000,
    dueDate: "2026-07-10",
    status: "Paid",
  },
  {
    id: 3,
    term: "Tuition Fee — Term 3",
    amount: 4000,
    dueDate: "2026-10-10",
    status: "Unpaid",
  },
  {
    id: 4,
    term: "Library & Lab Fee",
    amount: 1200,
    dueDate: "2026-04-10",
    status: "Paid",
  },
  {
    id: 5,
    term: "Sports & Activity Fee",
    amount: 800,
    dueDate: "2026-04-10",
    status: "Unpaid",
  },
];

const SEED_HOMEWORK = [
  {
    id: 1,
    subject: "Mathematics",
    title: "Chapter 5 Exercises",
    dueDate: "2026-04-05",
    completed: false,
  },
  {
    id: 2,
    subject: "Science",
    title: "Lab Report — Photosynthesis",
    dueDate: "2026-04-07",
    completed: true,
  },
  {
    id: 3,
    subject: "English",
    title: "Essay: Climate Change",
    dueDate: "2026-04-08",
    completed: false,
  },
  {
    id: 4,
    subject: "History",
    title: "Timeline Project",
    dueDate: "2026-04-10",
    completed: false,
  },
  {
    id: 5,
    subject: "Computer Science",
    title: "Python OOP Assignment",
    dueDate: "2026-04-12",
    completed: true,
  },
];

const TIMETABLE = [
  {
    day: "Monday",
    periods: [
      "Mathematics",
      "English",
      "Science",
      "History",
      "Sports",
      "Library",
    ],
  },
  {
    day: "Tuesday",
    periods: [
      "English",
      "Mathematics",
      "Geography",
      "Art",
      "Computer Science",
      "Free",
    ],
  },
  {
    day: "Wednesday",
    periods: [
      "Science",
      "History",
      "Mathematics",
      "English",
      "Music",
      "Sports",
    ],
  },
  {
    day: "Thursday",
    periods: [
      "Geography",
      "Computer Science",
      "English",
      "Mathematics",
      "Science",
      "Free",
    ],
  },
  {
    day: "Friday",
    periods: [
      "Mathematics",
      "Science",
      "Art",
      "English",
      "History",
      "Assembly",
    ],
  },
  {
    day: "Saturday",
    periods: ["Mathematics", "English", "Science", "Free", "—", "—"],
  },
];

const PORTAL_TABS = [
  { value: "dashboard", label: "Dashboard", icon: <Star size={15} /> },
  { value: "grades", label: "My Grades", icon: <GraduationCap size={15} /> },
  {
    value: "attendance",
    label: "Attendance",
    icon: <CalendarCheck size={15} />,
  },
  { value: "timetable", label: "Timetable", icon: <BookOpen size={15} /> },
  { value: "homework", label: "Homework", icon: <CheckCircle2 size={15} /> },
  { value: "fees", label: "Pay Fees", icon: <CreditCard size={15} /> },
  { value: "messages", label: "Messages", icon: <Mail size={15} /> },
  { value: "forums", label: "Forums", icon: <MessageSquare size={15} /> },
  { value: "leave", label: "Leave", icon: <ClipboardList size={15} /> },
  {
    value: "attendance-summary",
    label: "Att. Summary",
    icon: <CalendarCheck size={15} />,
  },
  { value: "report-card", label: "Report Card", icon: <FileText size={15} /> },
];

function getLetterGrade(pct: number): string {
  if (pct >= 90) return "A+";
  if (pct >= 80) return "A";
  if (pct >= 70) return "B";
  if (pct >= 60) return "C";
  if (pct >= 50) return "D";
  return "F";
}

function pctColor(pct: number): string {
  if (pct >= 75) return "text-green-600";
  if (pct >= 50) return "text-amber-600";
  return "text-red-600";
}

export default function StudentPortal({ studentName, onLogout }: Props) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [fees, setFees] = useState(SEED_FEES);
  // Leave Application state
  const [leaveRequests, setLeaveRequests] = useState<
    Array<{
      id: number;
      from: string;
      to: string;
      reason: string;
      status: string;
    }>
  >([
    {
      id: 1,
      from: "2026-03-10",
      to: "2026-03-11",
      reason: "Family function",
      status: "Approved",
    },
    {
      id: 2,
      from: "2026-03-20",
      to: "2026-03-20",
      reason: "Medical appointment",
      status: "Pending",
    },
  ]);
  const [leaveForm, setLeaveForm] = useState({ from: "", to: "", reason: "" });
  // Report Card state
  const [reportTerm, setReportTerm] = useState("Term 1");
  const REPORT_DATA: Record<
    string,
    Array<{
      subject: string;
      marks: number;
      max: number;
      grade: string;
      remarks: string;
    }>
  > = {
    "Term 1": [
      {
        subject: "Mathematics",
        marks: 88,
        max: 100,
        grade: "A",
        remarks: "Excellent work",
      },
      {
        subject: "Science",
        marks: 75,
        max: 100,
        grade: "B",
        remarks: "Good effort",
      },
      {
        subject: "English",
        marks: 92,
        max: 100,
        grade: "A+",
        remarks: "Outstanding",
      },
      {
        subject: "History",
        marks: 68,
        max: 100,
        grade: "C",
        remarks: "Needs improvement",
      },
      {
        subject: "Computer",
        marks: 95,
        max: 100,
        grade: "A+",
        remarks: "Excellent",
      },
    ],
    "Term 2": [
      {
        subject: "Mathematics",
        marks: 91,
        max: 100,
        grade: "A+",
        remarks: "Excellent progress",
      },
      {
        subject: "Science",
        marks: 80,
        max: 100,
        grade: "A",
        remarks: "Good understanding",
      },
      {
        subject: "English",
        marks: 88,
        max: 100,
        grade: "A",
        remarks: "Very good",
      },
      {
        subject: "History",
        marks: 74,
        max: 100,
        grade: "B",
        remarks: "Improved",
      },
      {
        subject: "Computer",
        marks: 97,
        max: 100,
        grade: "A+",
        remarks: "Top performer",
      },
    ],
    "Term 3": [
      {
        subject: "Mathematics",
        marks: 85,
        max: 100,
        grade: "A",
        remarks: "Consistent",
      },
      {
        subject: "Science",
        marks: 83,
        max: 100,
        grade: "A",
        remarks: "Good work",
      },
      {
        subject: "English",
        marks: 90,
        max: 100,
        grade: "A+",
        remarks: "Excellent",
      },
      {
        subject: "History",
        marks: 78,
        max: 100,
        grade: "B+",
        remarks: "Good improvement",
      },
      {
        subject: "Computer",
        marks: 94,
        max: 100,
        grade: "A+",
        remarks: "Excellent",
      },
    ],
  };
  const [homework, setHomework] = useState(SEED_HOMEWORK);
  const [payTarget, setPayTarget] = useState<number | null>(null);
  const [payCard, setPayCard] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  });
  const [payStep, setPayStep] = useState<"form" | "processing" | "success">(
    "form",
  );

  const totalFees = fees.reduce((s, f) => s + f.amount, 0);
  const paidFees = fees
    .filter((f) => f.status === "Paid")
    .reduce((s, f) => s + f.amount, 0);
  const presentDays = SEED_ATTENDANCE.filter(
    (a) => a.status === "Present",
  ).length;
  const attendancePct = Math.round(
    (presentDays / SEED_ATTENDANCE.length) * 100,
  );
  const avgScore = Math.round(
    SEED_GRADES.reduce((s, g) => s + g.score, 0) / SEED_GRADES.length,
  );

  const handlePay = () => {
    if (!payCard.number || !payCard.expiry || !payCard.cvv || !payCard.name) {
      toast.error("Please fill all card details.");
      return;
    }
    setPayStep("processing");
    setTimeout(() => setPayStep("success"), 2000);
  };

  const handlePayClose = (success: boolean) => {
    if (success && payTarget !== null) {
      setFees((prev) =>
        prev.map((f) => (f.id === payTarget ? { ...f, status: "Paid" } : f)),
      );
      toast.success("Payment successful! Fee marked as paid.");
    }
    setPayTarget(null);
    setPayStep("form");
    setPayCard({ number: "", expiry: "", cvv: "", name: "" });
  };

  const navigate = (tab: string) => setActiveTab(tab);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <aside
        className="flex w-52 flex-col shrink-0"
        style={{ background: "#0a0a0a" }}
      >
        <div className="flex items-center gap-2 px-4 py-5 border-b border-white/10">
          <GraduationCap size={22} className="text-white" />
          <span className="text-white font-bold text-base">EduManage</span>
        </div>
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
          {PORTAL_TABS.map((tab) => (
            <button
              key={tab.value}
              type="button"
              onClick={() => setActiveTab(tab.value)}
              data-ocid={`student.${tab.value}.tab`}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.value
                  ? "bg-white dark:bg-gray-900 text-black font-semibold"
                  : "text-gray-400 hover:text-white hover:bg-white dark:bg-gray-900/10"
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </nav>
        <SmartAssistant
          onNavigate={(page) => setActiveTab(page)}
          currentPortal="student"
        />
        <div className="px-4 py-4 border-t border-white/10">
          <button
            type="button"
            onClick={onLogout}
            className="w-full flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors"
            data-ocid="student.logout.button"
          >
            <LogOut size={15} /> Sign Out
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white dark:bg-gray-900 border-b border-border px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-gray-900 dark:text-white">
              {activeTab === "dashboard"
                ? `Welcome, ${studentName}`
                : activeTab === "grades"
                  ? "My Grades"
                  : activeTab === "attendance"
                    ? "My Attendance"
                    : activeTab === "timetable"
                      ? "My Timetable"
                      : activeTab === "homework"
                        ? "Homework"
                        : activeTab === "fees"
                          ? "Fee Payment"
                          : activeTab === "messages"
                            ? "Messages"
                            : "Discussion Forums"}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Student Portal
            </p>
          </div>
          <button
            type="button"
            onClick={onLogout}
            className="hidden md:flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white"
            data-ocid="student.header.logout.button"
          >
            <LogOut size={15} /> Sign Out
          </button>
        </div>

        <div className="p-6">
          {/* DASHBOARD */}
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              {/* Profile Card */}
              <Card className="border-0 shadow-sm">
                <CardContent className="pt-5 pb-4">
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 rounded-full bg-black text-white flex items-center justify-center text-xl font-bold shrink-0">
                      {studentName.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-black">
                        {studentName}
                      </h2>
                      <div className="flex flex-wrap gap-3 mt-1 text-sm text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <User size={13} /> Student Portal
                        </span>
                        <span className="flex items-center gap-1">
                          <BookOpen size={13} /> Grade 10
                        </span>
                        <span className="flex items-center gap-1">
                          <CalendarCheck size={13} /> Academic Year 2026
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="border-0 shadow-sm">
                  <CardContent className="pt-4 pb-4">
                    <p className="text-2xl font-bold">{avgScore}%</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Average Score
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-sm">
                  <CardContent className="pt-4 pb-4">
                    <p className="text-2xl font-bold">{attendancePct}%</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {t("attendance")}
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-sm">
                  <CardContent className="pt-4 pb-4">
                    <p className="text-2xl font-bold">
                      {homework.filter((h) => h.completed).length}/
                      {homework.length}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Homework Done
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-sm">
                  <CardContent className="pt-4 pb-4">
                    <p className="text-2xl font-bold">
                      ₹{paidFees.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Fees Paid
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Quick links */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {PORTAL_TABS.filter((t) => t.value !== "dashboard").map(
                  (tab) => (
                    <button
                      key={tab.value}
                      type="button"
                      onClick={() => navigate(tab.value)}
                      className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-black hover:shadow transition-all text-sm font-medium"
                      data-ocid={`student.dashboard.${tab.value}.button`}
                    >
                      {tab.icon} {tab.label}
                    </button>
                  ),
                )}
              </div>
            </div>
          )}

          {/* GRADES */}
          {activeTab === "grades" && (
            <Card className="border-0 shadow-sm">
              <CardContent className="pt-5">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t("subject")}</TableHead>
                      <TableHead className="dark:text-gray-300">Exam</TableHead>
                      <TableHead className="dark:text-gray-300">
                        Score
                      </TableHead>
                      <TableHead className="dark:text-gray-300">
                        Grade
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {SEED_GRADES.map((g) => {
                      const pct = Math.round((g.score / g.total) * 100);
                      return (
                        <TableRow key={g.id}>
                          <TableCell className="font-medium">
                            {g.subject}
                          </TableCell>
                          <TableCell className="text-gray-500 dark:text-gray-400">
                            {g.exam}
                          </TableCell>
                          <TableCell>
                            <span className={`font-semibold ${pctColor(pct)}`}>
                              {g.score}/{g.total}
                            </span>
                          </TableCell>
                          <TableCell>
                            <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                              {getLetterGrade(pct)}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}

          {/* ATTENDANCE */}
          {activeTab === "attendance" && (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <Card className="border-0 shadow-sm">
                  <CardContent className="pt-4 pb-4">
                    <p className="text-2xl font-bold text-gray-600 dark:text-gray-300">
                      {presentDays}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Days Present
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-sm">
                  <CardContent className="pt-4 pb-4">
                    <p className="text-2xl font-bold text-gray-600 dark:text-gray-300">
                      {
                        SEED_ATTENDANCE.filter((a) => a.status === "Absent")
                          .length
                      }
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Days Absent
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-sm">
                  <CardContent className="pt-4 pb-4">
                    <p className="text-2xl font-bold">{attendancePct}%</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Overall %
                    </p>
                  </CardContent>
                </Card>
              </div>
              <Card className="border-0 shadow-sm">
                <CardContent className="pt-5">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>{t("date")}</TableHead>
                        <TableHead>{t("subject")}</TableHead>
                        <TableHead>{t("status")}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {SEED_ATTENDANCE.map((a) => (
                        <TableRow key={a.id}>
                          <TableCell>{a.date}</TableCell>
                          <TableCell>{a.subject}</TableCell>
                          <TableCell>
                            <Badge
                              className={
                                a.status === "Present"
                                  ? "bg-green-100 text-green-700 border-green-200"
                                  : a.status === "Late"
                                    ? "bg-amber-100 text-amber-700 border-amber-200"
                                    : "bg-red-100 text-red-700 border-red-200"
                              }
                            >
                              {a.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}

          {/* TIMETABLE */}
          {activeTab === "timetable" && (
            <Card className="border-0 shadow-sm overflow-auto">
              <CardContent className="pt-5">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 pr-4 font-semibold w-28">
                        Day
                      </th>
                      {[
                        "Period 1",
                        "Period 2",
                        "Period 3",
                        "Period 4",
                        "Period 5",
                        "Period 6",
                      ].map((p) => (
                        <th
                          key={p}
                          className="text-center py-2 px-2 font-semibold text-xs text-gray-500 dark:text-gray-400 min-w-[90px]"
                        >
                          {p}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {TIMETABLE.map((row) => (
                      <tr key={row.day} className="border-b last:border-0">
                        <td className="py-2.5 pr-4 font-semibold text-gray-700 dark:text-gray-200">
                          {row.day}
                        </td>
                        {row.periods.map((p, i) => (
                          <td
                            key={`${row.day}-${i}`}
                            className="py-2.5 px-2 text-center"
                          >
                            <span
                              className={`text-xs px-2 py-1 rounded-full ${p === "—" || p === "Free" ? "text-gray-300" : "bg-blue-100 text-blue-700"}`}
                            >
                              {p}
                            </span>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          )}

          {/* HOMEWORK */}
          {activeTab === "homework" && (
            <Card className="border-0 shadow-sm">
              <CardContent className="pt-5">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t("subject")}</TableHead>
                      <TableHead className="dark:text-gray-300">
                        Title
                      </TableHead>
                      <TableHead className="dark:text-gray-300">
                        Due Date
                      </TableHead>
                      <TableHead>{t("status")}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {homework.map((h, idx) => (
                      <TableRow key={h.id}>
                        <TableCell>{h.subject}</TableCell>
                        <TableCell className="font-medium">{h.title}</TableCell>
                        <TableCell className="text-gray-500 dark:text-gray-400">
                          {h.dueDate}
                        </TableCell>
                        <TableCell>
                          <button
                            type="button"
                            onClick={() =>
                              setHomework((prev) =>
                                prev.map((x) =>
                                  x.id === h.id
                                    ? { ...x, completed: !x.completed }
                                    : x,
                                ),
                              )
                            }
                            data-ocid={`student.homework.checkbox.${idx + 1}`}
                            className={`text-xs px-3 py-1 rounded-full border transition-colors ${
                              h.completed
                                ? "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400"
                                : "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 hover:bg-amber-200"
                            }`}
                          >
                            {h.completed ? "✓ Done" : "Mark Done"}
                          </button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}

          {/* FEES */}
          {activeTab === "fees" && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Card className="border-0 shadow-sm">
                  <CardContent className="pt-4 pb-4">
                    <p className="text-2xl font-bold">
                      ₹{totalFees.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Total Fees
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-sm">
                  <CardContent className="pt-4 pb-4">
                    <p className="text-2xl font-bold text-gray-600 dark:text-gray-300">
                      ₹{(totalFees - paidFees).toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Outstanding
                    </p>
                  </CardContent>
                </Card>
              </div>
              <Card className="border-0 shadow-sm">
                <CardContent className="pt-5">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="dark:text-gray-300">
                          Description
                        </TableHead>
                        <TableHead>{t("amount")}</TableHead>
                        <TableHead className="dark:text-gray-300">
                          Due Date
                        </TableHead>
                        <TableHead>{t("status")}</TableHead>
                        <TableHead className="dark:text-gray-300">
                          Action
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {fees.map((f, idx) => (
                        <TableRow
                          key={f.id}
                          data-ocid={`student.fees.item.${idx + 1}`}
                        >
                          <TableCell className="font-medium">
                            {f.term}
                          </TableCell>
                          <TableCell>₹{f.amount.toLocaleString()}</TableCell>
                          <TableCell className="text-gray-500 dark:text-gray-400">
                            {f.dueDate}
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={
                                f.status === "Paid"
                                  ? "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400"
                                  : "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400"
                              }
                            >
                              {f.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {f.status === "Unpaid" && (
                              <Button
                                size="sm"
                                className="bg-black text-white hover:bg-gray-900 h-7 text-xs"
                                onClick={() => setPayTarget(f.id)}
                                data-ocid={`student.fees.pay.${idx + 1}`}
                              >
                                Pay Online
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}

          {/* MESSAGES */}
          {activeTab === "messages" && <MessagesPage />}

          {/* FORUMS */}
          {activeTab === "forums" && <ForumsPage />}
        </div>
      </main>

      {/* Payment Dialog */}
      <Dialog
        open={payTarget !== null}
        onOpenChange={(o) => {
          if (!o) handlePayClose(false);
        }}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {payStep === "success" ? "Payment Successful" : "Pay Fee Online"}
            </DialogTitle>
          </DialogHeader>
          {payStep === "form" && (
            <div className="space-y-4 py-2">
              <div>
                <Label htmlFor="card-name">Cardholder Name</Label>
                <Input
                  id="card-name"
                  placeholder="Name on card"
                  className="mt-1"
                  value={payCard.name}
                  onChange={(e) =>
                    setPayCard((p) => ({ ...p, name: e.target.value }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="card-number">Card Number</Label>
                <Input
                  id="card-number"
                  placeholder="4242 4242 4242 4242"
                  className="mt-1"
                  maxLength={19}
                  value={payCard.number}
                  onChange={(e) =>
                    setPayCard((p) => ({ ...p, number: e.target.value }))
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="card-expiry">Expiry (MM/YY)</Label>
                  <Input
                    id="card-expiry"
                    placeholder="MM/YY"
                    className="mt-1"
                    maxLength={5}
                    value={payCard.expiry}
                    onChange={(e) =>
                      setPayCard((p) => ({ ...p, expiry: e.target.value }))
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="card-cvv">CVV</Label>
                  <Input
                    id="card-cvv"
                    placeholder="123"
                    className="mt-1"
                    maxLength={3}
                    value={payCard.cvv}
                    onChange={(e) =>
                      setPayCard((p) => ({ ...p, cvv: e.target.value }))
                    }
                  />
                </div>
              </div>
              {payTarget !== null && (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Amount:{" "}
                  <strong>
                    ₹
                    {fees
                      .find((f) => f.id === payTarget)
                      ?.amount.toLocaleString()}
                  </strong>
                </p>
              )}
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <span className="border rounded px-1.5 py-0.5 font-mono">
                  Powered by Stripe
                </span>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => handlePayClose(false)}>
                  Cancel
                </Button>
                <Button
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={handlePay}
                  data-ocid="student.fees.confirm_button"
                >
                  Pay Now
                </Button>
              </DialogFooter>
            </div>
          )}
          {payStep === "processing" && (
            <div className="py-10 flex flex-col items-center gap-4">
              <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin" />
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Processing your payment...
              </p>
            </div>
          )}
          {payStep === "success" && (
            <div className="py-8 flex flex-col items-center gap-4">
              <CheckCircle
                size={56}
                className="text-gray-500 dark:text-gray-400"
              />
              <p className="text-lg font-semibold">Payment Successful!</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                ₹{fees.find((f) => f.id === payTarget)?.amount.toLocaleString()}{" "}
                paid successfully
              </p>
              <span className="border rounded px-2 py-0.5 text-xs font-mono text-gray-400">
                Powered by Stripe
              </span>
              <Button
                className="bg-black text-white hover:bg-gray-900 mt-2"
                onClick={() => handlePayClose(true)}
                data-ocid="student.fees.done_button"
              >
                Done
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* LEAVE APPLICATION */}
      {activeTab === "leave" && (
        <div className="space-y-4">
          <Card className="border-0 shadow-sm">
            <CardContent className="pt-5 space-y-3">
              <h3 className="font-semibold text-sm">Apply for Leave</h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs text-gray-500 dark:text-gray-400">
                    From Date
                  </Label>
                  <input
                    type="date"
                    className="w-full mt-1 text-sm border border-border rounded-md px-3 py-1.5 bg-background"
                    value={leaveForm.from}
                    onChange={(e) =>
                      setLeaveForm((p) => ({ ...p, from: e.target.value }))
                    }
                    data-ocid="student.leave.from_input"
                  />
                </div>
                <div>
                  <Label className="text-xs text-gray-500 dark:text-gray-400">
                    To Date
                  </Label>
                  <input
                    type="date"
                    className="w-full mt-1 text-sm border border-border rounded-md px-3 py-1.5 bg-background"
                    value={leaveForm.to}
                    onChange={(e) =>
                      setLeaveForm((p) => ({ ...p, to: e.target.value }))
                    }
                    data-ocid="student.leave.to_input"
                  />
                </div>
              </div>
              <div>
                <Label className="text-xs text-gray-500 dark:text-gray-400">
                  Reason
                </Label>
                <textarea
                  className="w-full mt-1 text-sm border border-border rounded-md px-3 py-1.5 bg-background resize-none"
                  rows={3}
                  placeholder="State your reason..."
                  value={leaveForm.reason}
                  onChange={(e) =>
                    setLeaveForm((p) => ({ ...p, reason: e.target.value }))
                  }
                  data-ocid="student.leave.reason_textarea"
                />
              </div>
              <Button
                className="bg-black text-white hover:bg-gray-900 text-sm"
                onClick={() => {
                  if (!leaveForm.from || !leaveForm.to || !leaveForm.reason)
                    return;
                  setLeaveRequests((prev) => [
                    ...prev,
                    {
                      id: Date.now(),
                      from: leaveForm.from,
                      to: leaveForm.to,
                      reason: leaveForm.reason,
                      status: "Pending",
                    },
                  ]);
                  setLeaveForm({ from: "", to: "", reason: "" });
                }}
                data-ocid="student.leave.submit_button"
              >
                Submit Leave Request
              </Button>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="pt-5">
              <h3 className="font-semibold text-sm mb-3">Leave History</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="dark:text-gray-300">From</TableHead>
                    <TableHead className="dark:text-gray-300">To</TableHead>
                    <TableHead className="dark:text-gray-300">Reason</TableHead>
                    <TableHead className="dark:text-gray-300">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leaveRequests.map((lr, i) => (
                    <TableRow
                      key={lr.id}
                      data-ocid={`student.leave.item.${i + 1}`}
                    >
                      <TableCell className="text-sm">{lr.from}</TableCell>
                      <TableCell className="text-sm">{lr.to}</TableCell>
                      <TableCell className="text-sm max-w-[120px] truncate">
                        {lr.reason}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            lr.status === "Approved"
                              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                              : lr.status === "Rejected"
                                ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                                : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                          }
                        >
                          {lr.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}

      {/* ATTENDANCE SUMMARY */}
      {activeTab === "attendance-summary" && (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            {[
              {
                label: "Present",
                count: SEED_ATTENDANCE.filter((a) => a.status === "Present")
                  .length,
                color:
                  "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200",
              },
              {
                label: "Absent",
                count: SEED_ATTENDANCE.filter((a) => a.status === "Absent")
                  .length,
                color:
                  "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200",
              },
              {
                label: "Late",
                count: SEED_ATTENDANCE.filter((a) => a.status === "Late")
                  .length,
                color:
                  "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200",
              },
            ].map((s, i) => (
              <Card
                key={s.label}
                className={`border ${s.color}`}
                data-ocid={`student.attendance_summary.card.${i + 1}`}
              >
                <CardContent className="pt-4 pb-3 text-center">
                  <p className="text-2xl font-bold">{s.count}</p>
                  <p className="text-xs font-medium mt-0.5">{s.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <Card className="border-0 shadow-sm">
            <CardContent className="pt-5">
              <h3 className="font-semibold text-sm mb-4">
                Attendance Bar Chart
              </h3>
              <div className="space-y-3">
                {[
                  {
                    label: "Present",
                    count: SEED_ATTENDANCE.filter((a) => a.status === "Present")
                      .length,
                    color: "bg-gray-500",
                  },
                  {
                    label: "Absent",
                    count: SEED_ATTENDANCE.filter((a) => a.status === "Absent")
                      .length,
                    color: "bg-gray-500",
                  },
                  {
                    label: "Late",
                    count: SEED_ATTENDANCE.filter((a) => a.status === "Late")
                      .length,
                    color: "bg-gray-500",
                  },
                ].map((bar) => (
                  <div key={bar.label} className="flex items-center gap-3">
                    <span className="text-xs text-gray-500 dark:text-gray-400 w-14">
                      {bar.label}
                    </span>
                    <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
                      <div
                        className={`h-full ${bar.color} rounded-full transition-all`}
                        style={{
                          width: `${Math.max(4, (bar.count / SEED_ATTENDANCE.length) * 100)}%`,
                        }}
                      />
                    </div>
                    <span className="text-xs font-semibold w-6 text-right">
                      {bar.count}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-4">
                Overall Attendance:{" "}
                {Math.round(
                  (SEED_ATTENDANCE.filter((a) => a.status === "Present")
                    .length /
                    SEED_ATTENDANCE.length) *
                    100,
                )}
                %
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* REPORT CARD */}
      {activeTab === "report-card" && (
        <Card className="border-0 shadow-sm">
          <CardContent className="pt-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-sm">Report Card</h3>
              <div className="flex items-center gap-2">
                <select
                  className="text-sm border border-border rounded-md px-2 py-1 bg-background"
                  value={reportTerm}
                  onChange={(e) => setReportTerm(e.target.value)}
                  data-ocid="student.report_card.term_select"
                >
                  <option>Term 1</option>
                  <option>Term 2</option>
                  <option>Term 3</option>
                </select>
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-1.5 text-xs"
                  onClick={() => window.print()}
                  data-ocid="student.report_card.print_button"
                >
                  <Printer size={13} /> Print
                </Button>
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="dark:text-gray-300">Subject</TableHead>
                  <TableHead className="text-right">Marks</TableHead>
                  <TableHead className="text-right">Max</TableHead>
                  <TableHead className="dark:text-gray-300">Grade</TableHead>
                  <TableHead className="dark:text-gray-300">Remarks</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(REPORT_DATA[reportTerm] || []).map((row, i) => (
                  <TableRow
                    key={row.subject}
                    data-ocid={`student.report_card.item.${i + 1}`}
                  >
                    <TableCell className="font-medium text-sm">
                      {row.subject}
                    </TableCell>
                    <TableCell className="text-right text-sm">
                      {row.marks}
                    </TableCell>
                    <TableCell className="text-right text-sm text-gray-400">
                      {row.max}
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-black text-white text-xs">
                        {row.grade}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-gray-500 dark:text-gray-400">
                      {row.remarks}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      <SmartAssistant
        onNavigate={(page) => setActiveTab(page)}
        currentPortal="student"
      />
    </div>
  );
}
