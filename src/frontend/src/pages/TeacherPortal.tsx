import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  BookCheck,
  BookOpen,
  Calendar,
  ClipboardCheck,
  ClipboardList,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  Star,
  Trash2,
  Upload,
  Users,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { SmartAssistant } from "../components/SmartAssistant";
import MessagesPage from "./MessagesPage";

interface Props {
  teacherName: string;
  onLogout: () => void;
}

const MY_CLASSES = [
  { id: 1, class: "Grade 10-A", subject: "Mathematics", students: 32 },
  { id: 2, class: "Grade 9-B", subject: "Mathematics", students: 29 },
  { id: 3, class: "Grade 8-A", subject: "Mathematics", students: 34 },
  { id: 4, class: "Grade 10-B", subject: "Algebra", students: 30 },
];

const STUDENTS = [
  { id: 1, name: "Aisha Patel", class: "Grade 10-A" },
  { id: 2, name: "Marcus Johnson", class: "Grade 10-A" },
  { id: 3, name: "Lily Zhang", class: "Grade 10-A" },
  { id: 4, name: "Omar Hassan", class: "Grade 9-B" },
  { id: 5, name: "Sara Kim", class: "Grade 9-B" },
  { id: 6, name: "Raj Sharma", class: "Grade 8-A" },
];

const TIMETABLE = [
  {
    day: "Monday",
    time: "8:00–9:30",
    class: "Grade 10-A",
    subject: "Mathematics",
    room: "101",
  },
  {
    day: "Monday",
    time: "10:00–11:30",
    class: "Grade 9-B",
    subject: "Mathematics",
    room: "203",
  },
  {
    day: "Tuesday",
    time: "8:00–9:30",
    class: "Grade 8-A",
    subject: "Mathematics",
    room: "105",
  },
  {
    day: "Wednesday",
    time: "9:00–10:30",
    class: "Grade 10-A",
    subject: "Mathematics",
    room: "101",
  },
  {
    day: "Thursday",
    time: "8:00–9:30",
    class: "Grade 10-B",
    subject: "Algebra",
    room: "102",
  },
  {
    day: "Friday",
    time: "10:00–11:30",
    class: "Grade 9-B",
    subject: "Mathematics",
    room: "203",
  },
  {
    day: "Saturday",
    time: "8:00–9:30",
    class: "Grade 8-A",
    subject: "Mathematics",
    room: "105",
  },
];

const INIT_ATTENDANCE = STUDENTS.map((s) => ({ ...s, status: "Present" }));

const INIT_HOMEWORK = [
  {
    id: 1,
    class: "Grade 10-A",
    subject: "Mathematics",
    title: "Chapter 5 Exercises",
    dueDate: "2026-04-05",
  },
  {
    id: 2,
    class: "Grade 9-B",
    subject: "Mathematics",
    title: "Algebra Practice",
    dueDate: "2026-04-07",
  },
  {
    id: 3,
    class: "Grade 8-A",
    subject: "Mathematics",
    title: "Fractions Worksheet",
    dueDate: "2026-04-08",
  },
];

const INIT_GRADES = [
  {
    id: 1,
    student: "Aisha Patel",
    class: "Grade 10-A",
    subject: "Mathematics",
    exam: "Mid-Term",
    score: 88,
    total: 100,
  },
  {
    id: 2,
    student: "Marcus Johnson",
    class: "Grade 10-A",
    subject: "Mathematics",
    exam: "Mid-Term",
    score: 72,
    total: 100,
  },
  {
    id: 3,
    student: "Lily Zhang",
    class: "Grade 10-A",
    subject: "Mathematics",
    exam: "Mid-Term",
    score: 95,
    total: 100,
  },
  {
    id: 4,
    student: "Omar Hassan",
    class: "Grade 9-B",
    subject: "Mathematics",
    exam: "Mid-Term",
    score: 65,
    total: 100,
  },
  {
    id: 5,
    student: "Sara Kim",
    class: "Grade 9-B",
    subject: "Mathematics",
    exam: "Mid-Term",
    score: 80,
    total: 100,
  },
];

const PORTAL_TABS = [
  {
    value: "dashboard",
    label: "Dashboard",
    icon: <LayoutDashboard size={15} />,
  },
  { value: "classes", label: "My Classes", icon: <BookOpen size={15} /> },
  {
    value: "attendance",
    label: "Attendance",
    icon: <ClipboardCheck size={15} />,
  },
  { value: "grades", label: "Grades", icon: <Star size={15} /> },
  { value: "homework", label: "Homework", icon: <BookCheck size={15} /> },
  { value: "timetable", label: "Timetable", icon: <Calendar size={15} /> },
  { value: "messages", label: "Messages", icon: <Mail size={15} /> },
  {
    value: "lesson-plans",
    label: "Lesson Plans",
    icon: <BookOpen size={15} />,
  },
  { value: "progress", label: "Progress", icon: <GraduationCap size={15} /> },
  { value: "exam-upload", label: "Exam Upload", icon: <Upload size={15} /> },
  {
    value: "parent-log",
    label: "Parent Log",
    icon: <ClipboardList size={15} />,
  },
  { value: "substitutes", label: "Substitutes", icon: <Users size={15} /> },
];

export default function TeacherPortal({ teacherName, onLogout }: Props) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("dashboard");
  // Lesson Plans state
  const [lessonPlans, setLessonPlans] = useState<
    Array<{
      id: number;
      subject: string;
      topic: string;
      objectives: string;
      activities: string;
      materials: string;
      duration: string;
      expanded: boolean;
    }>
  >([
    {
      id: 1,
      subject: "Mathematics",
      topic: "Quadratic Equations",
      objectives: "Students will solve quadratic equations using factoring.",
      activities: "Group problem solving, whiteboard practice",
      materials: "Textbook, calculator",
      duration: "45 min",
      expanded: false,
    },
  ]);
  const [lpForm, setLpForm] = useState({
    subject: "",
    topic: "",
    objectives: "",
    activities: "",
    materials: "",
    duration: "",
  });
  // Progress Tracker state
  const [progressStudent, setProgressStudent] = useState("Rahul Sharma");
  const progressStudents = [
    "Rahul Sharma",
    "Priya Patel",
    "Amit Kumar",
    "Sneha Gupta",
    "Ravi Singh",
  ];
  const progressData: Record<
    string,
    Array<{ subject: string; term1: number; term2: number; term3: number }>
  > = {
    "Rahul Sharma": [
      { subject: "Math", term1: 72, term2: 78, term3: 85 },
      { subject: "Science", term1: 68, term2: 74, term3: 80 },
      { subject: "English", term1: 80, term2: 82, term3: 88 },
    ],
    "Priya Patel": [
      { subject: "Math", term1: 90, term2: 92, term3: 94 },
      { subject: "Science", term1: 85, term2: 88, term3: 91 },
      { subject: "English", term1: 88, term2: 90, term3: 93 },
    ],
    "Amit Kumar": [
      { subject: "Math", term1: 60, term2: 65, term3: 70 },
      { subject: "Science", term1: 58, term2: 64, term3: 68 },
      { subject: "English", term1: 72, term2: 75, term3: 78 },
    ],
    "Sneha Gupta": [
      { subject: "Math", term1: 88, term2: 86, term3: 90 },
      { subject: "Science", term1: 82, term2: 85, term3: 87 },
      { subject: "English", term1: 91, term2: 89, term3: 92 },
    ],
    "Ravi Singh": [
      { subject: "Math", term1: 75, term2: 73, term3: 77 },
      { subject: "Science", term1: 70, term2: 72, term3: 75 },
      { subject: "English", term1: 78, term2: 80, term3: 82 },
    ],
  };
  const [progressNotes, setProgressNotes] = useState<Record<string, string>>(
    {},
  );
  // Exam Upload state
  const [examClass, setExamClass] = useState("Class 9-A");
  const [examName, setExamName] = useState("");
  const [examPreview, setExamPreview] = useState<
    Array<{ roll: string; name: string; marks: string }>
  >([]);
  const [examUploaded, setExamUploaded] = useState(false);
  // Parent Log state
  const [parentLogs, setParentLogs] = useState<
    Array<{
      id: number;
      student: string;
      date: string;
      mode: string;
      notes: string;
    }>
  >([
    {
      id: 1,
      student: "Rahul Sharma",
      date: "2026-03-15",
      mode: "Phone Call",
      notes: "Discussed improvement in Math",
    },
  ]);
  const [parentForm, setParentForm] = useState({
    student: "",
    date: "",
    mode: "Phone Call",
    notes: "",
  });
  // Substitute state
  const [subLogs, setSubLogs] = useState<
    Array<{
      id: number;
      date: string;
      class: string;
      subject: string;
      origTeacher: string;
    }>
  >([
    {
      id: 1,
      date: "2026-03-20",
      class: "Class 8-B",
      subject: "Science",
      origTeacher: "Mrs. Sharma",
    },
  ]);
  const [subForm, setSubForm] = useState({
    date: "",
    class: "",
    subject: "",
    origTeacher: "",
  });
  const [attendance, setAttendance] = useState(INIT_ATTENDANCE);
  const [grades, setGrades] = useState(INIT_GRADES);
  const [homework, setHomework] = useState(INIT_HOMEWORK);
  const [hwDialog, setHwDialog] = useState(false);
  const [newHw, setNewHw] = useState({
    class: "",
    subject: "",
    title: "",
    dueDate: "",
  });
  const [editGrade, setEditGrade] = useState<null | {
    id: number;
    score: string;
  }>(null);

  const presentCount = attendance.filter((a) => a.status === "Present").length;
  const avgGrade = Math.round(
    grades.reduce((s, g) => s + g.score, 0) / grades.length,
  );

  const handleAddHomework = () => {
    if (!newHw.class || !newHw.title || !newHw.dueDate) {
      toast.error("Please fill all fields.");
      return;
    }
    setHomework((prev) => [...prev, { id: Date.now(), ...newHw }]);
    setHwDialog(false);
    setNewHw({ class: "", subject: "", title: "", dueDate: "" });
    toast.success("Homework assigned!");
  };

  const handleSaveGrade = () => {
    if (!editGrade) return;
    const score = Number(editGrade.score);
    if (Number.isNaN(score) || score < 0 || score > 100) {
      toast.error("Enter a score between 0-100.");
      return;
    }
    setGrades((prev) =>
      prev.map((g) => (g.id === editGrade.id ? { ...g, score } : g)),
    );
    setEditGrade(null);
    toast.success("Grade updated.");
  };

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
              data-ocid={`teacher.${tab.value}.tab`}
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
          currentPortal="teacher"
        />
        <div className="px-4 py-4 border-t border-white/10">
          <button
            type="button"
            onClick={onLogout}
            className="w-full flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors"
            data-ocid="teacher.logout.button"
          >
            <LogOut size={15} /> Sign Out
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white dark:bg-gray-900 border-b border-border px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold">
              {activeTab === "dashboard"
                ? `Welcome, ${teacherName}`
                : activeTab === "classes"
                  ? "My Classes"
                  : activeTab === "attendance"
                    ? "Mark Attendance"
                    : activeTab === "grades"
                      ? "Grade Entry"
                      : activeTab === "homework"
                        ? "Homework"
                        : activeTab === "timetable"
                          ? "My Timetable"
                          : "Messages"}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Teacher Portal
            </p>
          </div>
          <button
            type="button"
            onClick={onLogout}
            className="hidden md:flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white"
            data-ocid="teacher.header.logout.button"
          >
            <LogOut size={15} /> Sign Out
          </button>
        </div>

        <div className="p-6">
          {/* DASHBOARD */}
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="border-0 shadow-sm">
                  <CardContent className="pt-4 pb-4">
                    <p className="text-2xl font-bold">{MY_CLASSES.length}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      My Classes
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-sm">
                  <CardContent className="pt-4 pb-4">
                    <p className="text-2xl font-bold">
                      {MY_CLASSES.reduce((s, c) => s + c.students, 0)}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Total Students
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-sm">
                  <CardContent className="pt-4 pb-4">
                    <p className="text-2xl font-bold">{avgGrade}%</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Avg Grade
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-sm">
                  <CardContent className="pt-4 pb-4">
                    <p className="text-2xl font-bold">{homework.length}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Assignments
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {PORTAL_TABS.filter((t) => t.value !== "dashboard").map(
                  (tab) => (
                    <button
                      key={tab.value}
                      type="button"
                      onClick={() => setActiveTab(tab.value)}
                      className="flex items-center gap-2 p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-black hover:shadow text-sm font-medium transition-all"
                      data-ocid={`teacher.dashboard.${tab.value}.button`}
                    >
                      {tab.icon} {tab.label}
                    </button>
                  ),
                )}
              </div>
            </div>
          )}

          {/* CLASSES */}
          {activeTab === "classes" && (
            <div className="grid sm:grid-cols-2 gap-4">
              {MY_CLASSES.map((c, idx) => (
                <Card
                  key={c.id}
                  className="border-0 shadow-sm"
                  data-ocid={`teacher.classes.item.${idx + 1}`}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{c.class}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                      <span className="flex items-center gap-1">
                        <BookOpen size={13} /> {c.subject}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users size={13} /> {c.students} students
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* ATTENDANCE */}
          {activeTab === "attendance" && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                <span>
                  {presentCount}/{attendance.length} Present
                </span>
                <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                  {Math.round((presentCount / attendance.length) * 100)}%
                </Badge>
              </div>
              <Card className="border-0 shadow-sm">
                <CardContent className="pt-5">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="dark:text-gray-300">
                          Student
                        </TableHead>
                        <TableHead className="dark:text-gray-300">
                          Class
                        </TableHead>
                        <TableHead>{t("status")}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {attendance.map((a, idx) => (
                        <TableRow
                          key={a.id}
                          data-ocid={`teacher.attendance.item.${idx + 1}`}
                        >
                          <TableCell className="font-medium">
                            {a.name}
                          </TableCell>
                          <TableCell className="text-gray-500 dark:text-gray-400">
                            {a.class}
                          </TableCell>
                          <TableCell>
                            <select
                              value={a.status}
                              onChange={(e) =>
                                setAttendance((prev) =>
                                  prev.map((x) =>
                                    x.id === a.id
                                      ? { ...x, status: e.target.value }
                                      : x,
                                  ),
                                )
                              }
                              className="text-sm border border-gray-200 dark:border-gray-700 rounded-lg px-2 py-1"
                              data-ocid={`teacher.attendance.select.${idx + 1}`}
                            >
                              <option>{t("present")}</option>
                              <option>{t("absent")}</option>
                              <option>Late</option>
                            </select>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <div className="mt-4">
                    <Button
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                      onClick={() => toast.success("Attendance saved!")}
                      data-ocid="teacher.attendance.save.button"
                    >
                      Save Attendance
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* GRADES */}
          {activeTab === "grades" && (
            <Card className="border-0 shadow-sm">
              <CardContent className="pt-5">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="dark:text-gray-300">
                        Student
                      </TableHead>
                      <TableHead className="dark:text-gray-300">
                        Class
                      </TableHead>
                      <TableHead className="dark:text-gray-300">Exam</TableHead>
                      <TableHead className="dark:text-gray-300">
                        Score
                      </TableHead>
                      <TableHead className="dark:text-gray-300">
                        Action
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {grades.map((g, idx) => (
                      <TableRow
                        key={g.id}
                        data-ocid={`teacher.grades.item.${idx + 1}`}
                      >
                        <TableCell className="font-medium">
                          {g.student}
                        </TableCell>
                        <TableCell className="text-gray-500 dark:text-gray-400">
                          {g.class}
                        </TableCell>
                        <TableCell>{g.exam}</TableCell>
                        <TableCell>
                          <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                            {g.score}/{g.total}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-7 text-xs"
                            onClick={() =>
                              setEditGrade({ id: g.id, score: String(g.score) })
                            }
                            data-ocid={`teacher.grades.edit.${idx + 1}`}
                          >
                            Edit
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}

          {/* HOMEWORK */}
          {activeTab === "homework" && (
            <div className="space-y-4">
              <Button
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={() => setHwDialog(true)}
                data-ocid="teacher.homework.add.button"
              >
                <Plus size={16} className="mr-1" /> Assign Homework
              </Button>
              <Card className="border-0 shadow-sm">
                <CardContent className="pt-5">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="dark:text-gray-300">
                          Class
                        </TableHead>
                        <TableHead>{t("subject")}</TableHead>
                        <TableHead className="dark:text-gray-300">
                          Title
                        </TableHead>
                        <TableHead className="dark:text-gray-300">
                          Due Date
                        </TableHead>
                        <TableHead className="dark:text-gray-300">
                          Action
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {homework.map((h, idx) => (
                        <TableRow
                          key={h.id}
                          data-ocid={`teacher.homework.item.${idx + 1}`}
                        >
                          <TableCell>{h.class}</TableCell>
                          <TableCell>{h.subject}</TableCell>
                          <TableCell className="font-medium">
                            {h.title}
                          </TableCell>
                          <TableCell className="text-gray-500 dark:text-gray-400">
                            {h.dueDate}
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-7 text-xs text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 dark:bg-gray-800"
                              onClick={() => {
                                setHomework((prev) =>
                                  prev.filter((x) => x.id !== h.id),
                                );
                                toast.success("Homework removed.");
                              }}
                              data-ocid={`teacher.homework.delete.${idx + 1}`}
                            >
                              <Trash2 size={13} />
                            </Button>
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
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="dark:text-gray-300">Day</TableHead>
                      <TableHead className="dark:text-gray-300">Time</TableHead>
                      <TableHead className="dark:text-gray-300">
                        Class
                      </TableHead>
                      <TableHead>{t("subject")}</TableHead>
                      <TableHead className="dark:text-gray-300">Room</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {TIMETABLE.map((t, idx) => (
                      <TableRow
                        key={`${t.day}-${t.time}`}
                        data-ocid={`teacher.timetable.item.${idx + 1}`}
                      >
                        <TableCell className="font-medium">{t.day}</TableCell>
                        <TableCell className="text-gray-500 dark:text-gray-400">
                          {t.time}
                        </TableCell>
                        <TableCell>{t.class}</TableCell>
                        <TableCell>{t.subject}</TableCell>
                        <TableCell>
                          <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                            {t.room}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}

          {/* MESSAGES */}
          {activeTab === "messages" && <MessagesPage />}
        </div>
      </main>

      {/* Add Homework Dialog */}
      <Dialog open={hwDialog} onOpenChange={setHwDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Homework</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label>Class</Label>
              <Select
                value={newHw.class}
                onValueChange={(v) => setNewHw((p) => ({ ...p, class: v }))}
              >
                <SelectTrigger
                  className="mt-1"
                  data-ocid="teacher.homework.class.select"
                >
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent
                  position="popper"
                  className="max-h-60 overflow-y-auto"
                >
                  {MY_CLASSES.map((c) => (
                    <SelectItem key={c.id} value={c.class}>
                      {c.class}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>{t("subject")}</Label>
              <Input
                className="mt-1"
                placeholder="Subject"
                value={newHw.subject}
                onChange={(e) =>
                  setNewHw((p) => ({ ...p, subject: e.target.value }))
                }
                data-ocid="teacher.homework.subject.input"
              />
            </div>
            <div>
              <Label>Title</Label>
              <Input
                className="mt-1"
                placeholder="Homework title"
                value={newHw.title}
                onChange={(e) =>
                  setNewHw((p) => ({ ...p, title: e.target.value }))
                }
                data-ocid="teacher.homework.title.input"
              />
            </div>
            <div>
              <Label>Due Date</Label>
              <Input
                className="mt-1"
                type="date"
                value={newHw.dueDate}
                onChange={(e) =>
                  setNewHw((p) => ({ ...p, dueDate: e.target.value }))
                }
                data-ocid="teacher.homework.duedate.input"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setHwDialog(false)}>
              Cancel
            </Button>
            <Button
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={handleAddHomework}
              data-ocid="teacher.homework.submit.button"
            >
              Assign
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Grade Dialog */}
      <Dialog
        open={editGrade !== null}
        onOpenChange={(o) => {
          if (!o) setEditGrade(null);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Grade</DialogTitle>
          </DialogHeader>
          <div className="py-2">
            <Label>Score (out of 100)</Label>
            <Input
              className="mt-1"
              type="number"
              min={0}
              max={100}
              value={editGrade?.score ?? ""}
              onChange={(e) =>
                setEditGrade((p) => (p ? { ...p, score: e.target.value } : p))
              }
              data-ocid="teacher.grade.score.input"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditGrade(null)}>
              Cancel
            </Button>
            <Button
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={handleSaveGrade}
              data-ocid="teacher.grade.save.button"
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* LESSON PLANS */}
      {activeTab === "lesson-plans" && (
        <div className="space-y-4">
          <Card className="border-0 shadow-sm">
            <CardContent className="pt-5 space-y-3">
              <h3 className="font-semibold text-sm">Create Lesson Plan</h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs text-gray-500 dark:text-gray-400">
                    Subject
                  </Label>
                  <Input
                    className="mt-1 text-sm h-8"
                    value={lpForm.subject}
                    onChange={(e) =>
                      setLpForm((p) => ({ ...p, subject: e.target.value }))
                    }
                    placeholder="e.g. Mathematics"
                    data-ocid="teacher.lesson_plans.subject_input"
                  />
                </div>
                <div>
                  <Label className="text-xs text-gray-500 dark:text-gray-400">
                    Topic
                  </Label>
                  <Input
                    className="mt-1 text-sm h-8"
                    value={lpForm.topic}
                    onChange={(e) =>
                      setLpForm((p) => ({ ...p, topic: e.target.value }))
                    }
                    placeholder="e.g. Algebra"
                    data-ocid="teacher.lesson_plans.topic_input"
                  />
                </div>
              </div>
              <div>
                <Label className="text-xs text-gray-500 dark:text-gray-400">
                  Objectives
                </Label>
                <textarea
                  className="w-full mt-1 text-sm border border-border rounded-md px-3 py-1.5 bg-background resize-none"
                  rows={2}
                  value={lpForm.objectives}
                  onChange={(e) =>
                    setLpForm((p) => ({ ...p, objectives: e.target.value }))
                  }
                  placeholder="Learning objectives..."
                  data-ocid="teacher.lesson_plans.objectives_textarea"
                />
              </div>
              <div>
                <Label className="text-xs text-gray-500 dark:text-gray-400">
                  Activities
                </Label>
                <textarea
                  className="w-full mt-1 text-sm border border-border rounded-md px-3 py-1.5 bg-background resize-none"
                  rows={2}
                  value={lpForm.activities}
                  onChange={(e) =>
                    setLpForm((p) => ({ ...p, activities: e.target.value }))
                  }
                  placeholder="Classroom activities..."
                  data-ocid="teacher.lesson_plans.activities_textarea"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs text-gray-500 dark:text-gray-400">
                    Materials
                  </Label>
                  <Input
                    className="mt-1 text-sm h-8"
                    value={lpForm.materials}
                    onChange={(e) =>
                      setLpForm((p) => ({ ...p, materials: e.target.value }))
                    }
                    placeholder="e.g. Textbook, charts"
                    data-ocid="teacher.lesson_plans.materials_input"
                  />
                </div>
                <div>
                  <Label className="text-xs text-gray-500 dark:text-gray-400">
                    Duration
                  </Label>
                  <Input
                    className="mt-1 text-sm h-8"
                    value={lpForm.duration}
                    onChange={(e) =>
                      setLpForm((p) => ({ ...p, duration: e.target.value }))
                    }
                    placeholder="e.g. 45 min"
                    data-ocid="teacher.lesson_plans.duration_input"
                  />
                </div>
              </div>
              <Button
                className="bg-black text-white hover:bg-gray-900 text-sm"
                onClick={() => {
                  if (!lpForm.subject || !lpForm.topic) return;
                  setLessonPlans((prev) => [
                    ...prev,
                    { id: Date.now(), ...lpForm, expanded: false },
                  ]);
                  setLpForm({
                    subject: "",
                    topic: "",
                    objectives: "",
                    activities: "",
                    materials: "",
                    duration: "",
                  });
                }}
                data-ocid="teacher.lesson_plans.save_button"
              >
                Save Plan
              </Button>
            </CardContent>
          </Card>
          <div className="space-y-2">
            {lessonPlans.map((plan, i) => (
              <Card
                key={plan.id}
                className="border-0 shadow-sm"
                data-ocid={`teacher.lesson_plans.item.${i + 1}`}
              >
                <CardContent className="pt-4 pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-sm">{plan.topic}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {plan.subject} · {plan.duration}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs h-7"
                        onClick={() =>
                          setLessonPlans((prev) =>
                            prev.map((p) =>
                              p.id === plan.id
                                ? { ...p, expanded: !p.expanded }
                                : p,
                            ),
                          )
                        }
                      >
                        {plan.expanded ? "Hide" : "View"}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs h-7 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 dark:bg-gray-800"
                        onClick={() =>
                          setLessonPlans((prev) =>
                            prev.filter((p) => p.id !== plan.id),
                          )
                        }
                        data-ocid={`teacher.lesson_plans.delete_button.${i + 1}`}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                  {plan.expanded && (
                    <div className="mt-3 space-y-1.5 text-xs text-gray-600 dark:text-gray-300 border-t pt-3">
                      <p>
                        <span className="font-semibold">Objectives:</span>{" "}
                        {plan.objectives}
                      </p>
                      <p>
                        <span className="font-semibold">Activities:</span>{" "}
                        {plan.activities}
                      </p>
                      <p>
                        <span className="font-semibold">Materials:</span>{" "}
                        {plan.materials}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* PROGRESS TRACKER */}
      {activeTab === "progress" && (
        <div className="space-y-4">
          <Card className="border-0 shadow-sm">
            <CardContent className="pt-5">
              <div className="flex items-center gap-3 mb-4">
                <Label className="text-sm font-semibold whitespace-nowrap">
                  Select Student:
                </Label>
                <select
                  className="text-sm border border-border rounded-md px-3 py-1.5 bg-background"
                  value={progressStudent}
                  onChange={(e) => setProgressStudent(e.target.value)}
                  data-ocid="teacher.progress.student_select"
                >
                  {progressStudents.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="dark:text-gray-300">
                      Subject
                    </TableHead>
                    <TableHead className="text-center">Term 1</TableHead>
                    <TableHead className="text-center">Term 2</TableHead>
                    <TableHead className="text-center">Term 3</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(progressData[progressStudent] || []).map((row, i) => (
                    <TableRow
                      key={row.subject}
                      data-ocid={`teacher.progress.item.${i + 1}`}
                    >
                      <TableCell className="font-medium text-sm">
                        {row.subject}
                      </TableCell>
                      {[row.term1, row.term2, row.term3].map((v, j) => (
                        <TableCell
                          key={["t1", "t2", "t3"][j]}
                          className="text-center"
                        >
                          <Badge
                            className={
                              v >= 80
                                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                : v >= 60
                                  ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                                  : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                            }
                          >
                            {v}
                          </Badge>
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="mt-4">
                <Label className="text-xs text-gray-500 dark:text-gray-400">
                  Notes for {progressStudent}
                </Label>
                <textarea
                  className="w-full mt-1 text-sm border border-border rounded-md px-3 py-1.5 bg-background resize-none"
                  rows={3}
                  value={progressNotes[progressStudent] || ""}
                  onChange={(e) =>
                    setProgressNotes((p) => ({
                      ...p,
                      [progressStudent]: e.target.value,
                    }))
                  }
                  placeholder="Add notes about this student..."
                  data-ocid="teacher.progress.notes_textarea"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* EXAM UPLOAD */}
      {activeTab === "exam-upload" && (
        <Card className="border-0 shadow-sm">
          <CardContent className="pt-5 space-y-3">
            <h3 className="font-semibold text-sm">Bulk Upload Exam Marks</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs text-gray-500 dark:text-gray-400">
                  Class
                </Label>
                <select
                  className="w-full mt-1 text-sm border border-border rounded-md px-3 py-1.5 bg-background"
                  value={examClass}
                  onChange={(e) => setExamClass(e.target.value)}
                  data-ocid="teacher.exam_upload.class_select"
                >
                  {[
                    "Class 9-A",
                    "Class 9-B",
                    "Class 10-A",
                    "Class 10-B",
                    "Class 11-A",
                    "Class 12-A",
                  ].map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label className="text-xs text-gray-500 dark:text-gray-400">
                  Exam Name
                </Label>
                <Input
                  className="mt-1 text-sm h-8"
                  value={examName}
                  onChange={(e) => setExamName(e.target.value)}
                  placeholder="e.g. Mid-Term Math"
                  data-ocid="teacher.exam_upload.exam_input"
                />
              </div>
            </div>
            <div>
              <Label className="text-xs text-gray-500 dark:text-gray-400">
                Upload CSV (roll_number, student_name, marks)
              </Label>
              <input
                type="file"
                accept=".csv"
                className="mt-1 w-full text-sm text-gray-600 dark:text-gray-300"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const reader = new FileReader();
                  reader.onload = (ev) => {
                    const text = ev.target?.result as string;
                    const rows = text
                      .split("\n")
                      .slice(1)
                      .filter(Boolean)
                      .map((row) => {
                        const [roll, name, marks] = row.split(",");
                        return {
                          roll: roll?.trim() || "",
                          name: name?.trim() || "",
                          marks: marks?.trim() || "",
                        };
                      });
                    setExamPreview(rows);
                    setExamUploaded(false);
                  };
                  reader.readAsText(file);
                }}
                data-ocid="teacher.exam_upload.upload_button"
              />
            </div>
            {examPreview.length > 0 && !examUploaded && (
              <>
                <div className="border border-border rounded-md overflow-hidden max-h-48 overflow-y-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="dark:text-gray-300">
                          Roll No.
                        </TableHead>
                        <TableHead className="dark:text-gray-300">
                          Name
                        </TableHead>
                        <TableHead className="dark:text-gray-300">
                          Marks
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {examPreview.map((r, i) => (
                        <TableRow
                          key={r.roll || `row-${i}`}
                          data-ocid={`teacher.exam_upload.item.${i + 1}`}
                        >
                          <TableCell>{r.roll}</TableCell>
                          <TableCell>{r.name}</TableCell>
                          <TableCell>{r.marks}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <Button
                  className="bg-black text-white hover:bg-gray-900 text-sm"
                  onClick={() => setExamUploaded(true)}
                  data-ocid="teacher.exam_upload.confirm_button"
                >
                  Confirm Upload ({examPreview.length} students)
                </Button>
              </>
            )}
            {examUploaded && (
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 text-sm font-medium">
                <span>✓</span> Marks uploaded successfully for {examClass} -{" "}
                {examName}
              </div>
            )}
            <div className="text-xs text-gray-400 bg-gray-50 dark:bg-gray-800 rounded p-2">
              Sample CSV format:
              <br />
              roll_number,student_name,marks
              <br />
              001,Rahul Sharma,85
              <br />
              002,Priya Patel,92
            </div>
          </CardContent>
        </Card>
      )}

      {/* PARENT LOG */}
      {activeTab === "parent-log" && (
        <div className="space-y-4">
          <Card className="border-0 shadow-sm">
            <CardContent className="pt-5 space-y-3">
              <h3 className="font-semibold text-sm">
                Log Parent Communication
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs text-gray-500 dark:text-gray-400">
                    Student Name
                  </Label>
                  <Input
                    className="mt-1 text-sm h-8"
                    value={parentForm.student}
                    onChange={(e) =>
                      setParentForm((p) => ({ ...p, student: e.target.value }))
                    }
                    placeholder="Student name"
                    data-ocid="teacher.parent_log.student_input"
                  />
                </div>
                <div>
                  <Label className="text-xs text-gray-500 dark:text-gray-400">
                    Date
                  </Label>
                  <input
                    type="date"
                    className="w-full mt-1 text-sm border border-border rounded-md px-3 py-1.5 bg-background"
                    value={parentForm.date}
                    onChange={(e) =>
                      setParentForm((p) => ({ ...p, date: e.target.value }))
                    }
                    data-ocid="teacher.parent_log.date_input"
                  />
                </div>
              </div>
              <div>
                <Label className="text-xs text-gray-500 dark:text-gray-400">
                  Mode
                </Label>
                <select
                  className="w-full mt-1 text-sm border border-border rounded-md px-3 py-1.5 bg-background"
                  value={parentForm.mode}
                  onChange={(e) =>
                    setParentForm((p) => ({ ...p, mode: e.target.value }))
                  }
                  data-ocid="teacher.parent_log.mode_select"
                >
                  {["Phone Call", "Meeting", "Email", "WhatsApp"].map((m) => (
                    <option key={m}>{m}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label className="text-xs text-gray-500 dark:text-gray-400">
                  Notes
                </Label>
                <textarea
                  className="w-full mt-1 text-sm border border-border rounded-md px-3 py-1.5 bg-background resize-none"
                  rows={3}
                  value={parentForm.notes}
                  onChange={(e) =>
                    setParentForm((p) => ({ ...p, notes: e.target.value }))
                  }
                  placeholder="Summary of communication..."
                  data-ocid="teacher.parent_log.notes_textarea"
                />
              </div>
              <Button
                className="bg-black text-white hover:bg-gray-900 text-sm"
                onClick={() => {
                  if (!parentForm.student || !parentForm.date) return;
                  setParentLogs((prev) => [
                    ...prev,
                    { id: Date.now(), ...parentForm },
                  ]);
                  setParentForm({
                    student: "",
                    date: "",
                    mode: "Phone Call",
                    notes: "",
                  });
                }}
                data-ocid="teacher.parent_log.save_button"
              >
                Save Log
              </Button>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="pt-5">
              <h3 className="font-semibold text-sm mb-3">
                Communication History
              </h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="dark:text-gray-300">
                      Student
                    </TableHead>
                    <TableHead className="dark:text-gray-300">Date</TableHead>
                    <TableHead className="dark:text-gray-300">Mode</TableHead>
                    <TableHead className="dark:text-gray-300">Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {parentLogs.map((log, i) => (
                    <TableRow
                      key={log.id}
                      data-ocid={`teacher.parent_log.item.${i + 1}`}
                    >
                      <TableCell className="font-medium text-sm">
                        {log.student}
                      </TableCell>
                      <TableCell className="text-sm text-gray-500 dark:text-gray-400">
                        {log.date}
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 text-xs">
                          {log.mode}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-gray-500 dark:text-gray-400 max-w-[150px] truncate">
                        {log.notes}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}

      {/* SUBSTITUTES */}
      {activeTab === "substitutes" && (
        <div className="space-y-4">
          <Card className="border-0 shadow-sm">
            <CardContent className="pt-5 space-y-3">
              <h3 className="font-semibold text-sm">Log Substitute Class</h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs text-gray-500 dark:text-gray-400">
                    Date
                  </Label>
                  <input
                    type="date"
                    className="w-full mt-1 text-sm border border-border rounded-md px-3 py-1.5 bg-background"
                    value={subForm.date}
                    onChange={(e) =>
                      setSubForm((p) => ({ ...p, date: e.target.value }))
                    }
                    data-ocid="teacher.substitutes.date_input"
                  />
                </div>
                <div>
                  <Label className="text-xs text-gray-500 dark:text-gray-400">
                    Class
                  </Label>
                  <Input
                    className="mt-1 text-sm h-8"
                    value={subForm.class}
                    onChange={(e) =>
                      setSubForm((p) => ({ ...p, class: e.target.value }))
                    }
                    placeholder="e.g. Class 10-A"
                    data-ocid="teacher.substitutes.class_input"
                  />
                </div>
                <div>
                  <Label className="text-xs text-gray-500 dark:text-gray-400">
                    Subject
                  </Label>
                  <Input
                    className="mt-1 text-sm h-8"
                    value={subForm.subject}
                    onChange={(e) =>
                      setSubForm((p) => ({ ...p, subject: e.target.value }))
                    }
                    placeholder="e.g. Physics"
                    data-ocid="teacher.substitutes.subject_input"
                  />
                </div>
                <div>
                  <Label className="text-xs text-gray-500 dark:text-gray-400">
                    Original Teacher
                  </Label>
                  <Input
                    className="mt-1 text-sm h-8"
                    value={subForm.origTeacher}
                    onChange={(e) =>
                      setSubForm((p) => ({ ...p, origTeacher: e.target.value }))
                    }
                    placeholder="Teacher name"
                    data-ocid="teacher.substitutes.orig_teacher_input"
                  />
                </div>
              </div>
              <Button
                className="bg-black text-white hover:bg-gray-900 text-sm"
                onClick={() => {
                  if (!subForm.date || !subForm.class) return;
                  setSubLogs((prev) => [
                    ...prev,
                    { id: Date.now(), ...subForm },
                  ]);
                  setSubForm({
                    date: "",
                    class: "",
                    subject: "",
                    origTeacher: "",
                  });
                }}
                data-ocid="teacher.substitutes.save_button"
              >
                Log Substitute
              </Button>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="pt-5">
              <h3 className="font-semibold text-sm mb-3">
                My Substitute Classes
              </h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="dark:text-gray-300">Date</TableHead>
                    <TableHead className="dark:text-gray-300">Class</TableHead>
                    <TableHead className="dark:text-gray-300">
                      Subject
                    </TableHead>
                    <TableHead className="dark:text-gray-300">
                      Original Teacher
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subLogs.map((s, i) => (
                    <TableRow
                      key={s.id}
                      data-ocid={`teacher.substitutes.item.${i + 1}`}
                    >
                      <TableCell className="text-sm">{s.date}</TableCell>
                      <TableCell className="font-medium text-sm">
                        {s.class}
                      </TableCell>
                      <TableCell className="text-sm">{s.subject}</TableCell>
                      <TableCell className="text-sm text-gray-500 dark:text-gray-400">
                        {s.origTeacher}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}

      <SmartAssistant
        onNavigate={(page) => setActiveTab(page)}
        currentPortal="teacher"
      />
    </div>
  );
}
