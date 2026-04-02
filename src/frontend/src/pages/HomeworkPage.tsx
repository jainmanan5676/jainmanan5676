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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  BookCheck,
  CheckCircle2,
  Clock,
  Pencil,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type Homework = {
  id: number;
  subject: string;
  className: string;
  title: string;
  description: string;
  dueDate: string;
  assignedBy: string;
  status: "Active" | "Closed";
};

type Submission = {
  id: number;
  studentName: string;
  class: string;
  subject: string;
  assignmentTitle: string;
  submittedDate: string;
  fileName: string;
  notes: string;
  status: "Submitted" | "Graded" | "Pending";
  score: number | null;
  feedback: string;
};

const SUBJECTS = [
  "Mathematics",
  "Science",
  "English",
  "History",
  "Geography",
  "Physics",
  "Chemistry",
  "Biology",
  "Computer Science",
  "Hindi",
];
const CLASSES = [
  "Class 6",
  "Class 7",
  "Class 8",
  "Class 9",
  "Class 10",
  "Class 11",
  "Class 12",
];

const SEED: Homework[] = [
  {
    id: 1,
    subject: "Mathematics",
    className: "Class 10",
    title: "Chapter 5 - Quadratic Equations Exercise 5.3",
    description:
      "Solve all problems from Exercise 5.3 (Q1 to Q10). Show all steps clearly.",
    dueDate: "2026-03-27",
    assignedBy: "Mr. Rajiv Kapoor",
    status: "Active",
  },
  {
    id: 2,
    subject: "Science",
    className: "Class 9",
    title: "Motion and Newton's Laws - Summary",
    description:
      "Write a one-page summary of Newton's three laws of motion with real-life examples.",
    dueDate: "2026-03-28",
    assignedBy: "Ms. Anita Desai",
    status: "Active",
  },
  {
    id: 3,
    subject: "English",
    className: "Class 8",
    title: "Essay: My Favourite Season",
    description:
      "Write a 200-word essay on your favourite season. Use at least 5 adjectives.",
    dueDate: "2026-03-26",
    assignedBy: "Mrs. Priya Menon",
    status: "Closed",
  },
  {
    id: 4,
    subject: "History",
    className: "Class 11",
    title: "The French Revolution - Timeline",
    description:
      "Create a detailed timeline of major events of the French Revolution from 1789 to 1799.",
    dueDate: "2026-03-29",
    assignedBy: "Mr. Sanjay Kulkarni",
    status: "Active",
  },
  {
    id: 5,
    subject: "Chemistry",
    className: "Class 12",
    title: "Organic Reactions - Practice Problems",
    description:
      "Complete all 15 reaction mechanism problems from the practice booklet Chapter 8.",
    dueDate: "2026-03-30",
    assignedBy: "Dr. Kavita Sharma",
    status: "Active",
  },
  {
    id: 6,
    subject: "Computer Science",
    className: "Class 10",
    title: "Python Basics - Loops Assignment",
    description:
      "Write 5 Python programs using for and while loops as described in the problem sheet.",
    dueDate: "2026-03-25",
    assignedBy: "Mr. Arun Pillai",
    status: "Closed",
  },
];

const SEED_SUBMISSIONS: Submission[] = [
  {
    id: 1,
    studentName: "Arjun Sharma",
    class: "Class 10",
    subject: "Mathematics",
    assignmentTitle: "Chapter 5 - Quadratic Equations",
    submittedDate: "2026-03-26",
    fileName: "arjun_math_ch5.pdf",
    notes: "All questions solved",
    status: "Graded",
    score: 88,
    feedback: "Good work, but Q7 had an error in factorization.",
  },
  {
    id: 2,
    studentName: "Priya Patel",
    class: "Class 9",
    subject: "Science",
    assignmentTitle: "Newton's Laws Summary",
    submittedDate: "2026-03-27",
    fileName: "priya_newton_summary.docx",
    notes: "",
    status: "Submitted",
    score: null,
    feedback: "",
  },
  {
    id: 3,
    studentName: "Rohan Mehta",
    class: "Class 10",
    subject: "Computer Science",
    assignmentTitle: "Python Loops Assignment",
    submittedDate: "2026-03-24",
    fileName: "rohan_python_loops.zip",
    notes: "Included bonus program",
    status: "Graded",
    score: 95,
    feedback: "Excellent work! Very clean code.",
  },
  {
    id: 4,
    studentName: "Sneha Reddy",
    class: "Class 11",
    subject: "History",
    assignmentTitle: "French Revolution Timeline",
    submittedDate: "2026-03-25",
    fileName: "sneha_french_rev.pdf",
    notes: "",
    status: "Submitted",
    score: null,
    feedback: "",
  },
  {
    id: 5,
    studentName: "Vikram Singh",
    class: "Class 12",
    subject: "Chemistry",
    assignmentTitle: "Organic Reactions Problems",
    submittedDate: "2026-03-26",
    fileName: "vikram_organic_chem.pdf",
    notes: "Completed 12/15",
    status: "Submitted",
    score: null,
    feedback: "",
  },
  {
    id: 6,
    studentName: "Ananya Gupta",
    class: "Class 8",
    subject: "English",
    assignmentTitle: "Essay: My Favourite Season",
    submittedDate: "2026-03-25",
    fileName: "ananya_essay.docx",
    notes: "220 words",
    status: "Graded",
    score: 92,
    feedback: "Beautiful essay with vivid descriptions!",
  },
  {
    id: 7,
    studentName: "Karthik Nair",
    class: "Class 9",
    subject: "Science",
    assignmentTitle: "Newton's Laws Summary",
    submittedDate: "2026-03-27",
    fileName: "karthik_newtons_laws.pdf",
    notes: "",
    status: "Pending",
    score: null,
    feedback: "",
  },
  {
    id: 8,
    studentName: "Divya Krishnan",
    class: "Class 10",
    subject: "Mathematics",
    assignmentTitle: "Chapter 5 - Quadratic Equations",
    submittedDate: "2026-03-26",
    fileName: "divya_math.pdf",
    notes: "Used alternate method for Q5",
    status: "Submitted",
    score: null,
    feedback: "",
  },
  {
    id: 9,
    studentName: "Rahul Verma",
    class: "Class 11",
    subject: "History",
    assignmentTitle: "French Revolution Timeline",
    submittedDate: "2026-03-26",
    fileName: "rahul_history.pdf",
    notes: "",
    status: "Graded",
    score: 78,
    feedback: "Timeline is mostly correct but missing 3 key events.",
  },
  {
    id: 10,
    studentName: "Meera Iyer",
    class: "Class 12",
    subject: "Chemistry",
    assignmentTitle: "Organic Reactions Problems",
    submittedDate: "2026-03-27",
    fileName: "meera_chem.pdf",
    notes: "All 15 completed",
    status: "Submitted",
    score: null,
    feedback: "",
  },
];

const EMPTY = {
  subject: "",
  className: "",
  title: "",
  description: "",
  dueDate: "",
  assignedBy: "",
  status: "Active" as "Active" | "Closed",
};

const statusColor: Record<string, string> = {
  Active:
    "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  Closed: "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300",
};

const submissionStatusColor: Record<string, string> = {
  Submitted: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  Graded:
    "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  Pending:
    "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
};

export default function HomeworkPage() {
  const { t } = useLanguage();
  const [homeworks, setHomeworks] = useState<Homework[]>(SEED);
  const [search, setSearch] = useState("");
  const [filterClass, setFilterClass] = useState("all");
  const [filterSubject, setFilterSubject] = useState("all");
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [nextId, setNextId] = useState(SEED.length + 1);

  // Submissions state
  const [submissions, setSubmissions] =
    useState<Submission[]>(SEED_SUBMISSIONS);
  const [subjectFilter, setSubjectFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [gradeDialogOpen, setGradeDialogOpen] = useState(false);
  const [gradingSubmission, setGradingSubmission] = useState<Submission | null>(
    null,
  );
  const [gradeScore, setGradeScore] = useState("");
  const [gradeFeedback, setGradeFeedback] = useState("");

  const filtered = homeworks.filter((h) => {
    const matchSearch =
      h.title.toLowerCase().includes(search.toLowerCase()) ||
      h.subject.toLowerCase().includes(search.toLowerCase()) ||
      h.assignedBy.toLowerCase().includes(search.toLowerCase());
    const matchClass = filterClass === "all" || h.className === filterClass;
    const matchSubject = filterSubject === "all" || h.subject === filterSubject;
    return matchSearch && matchClass && matchSubject;
  });

  const filteredSubmissions = submissions.filter((s) => {
    const matchSubject = subjectFilter === "all" || s.subject === subjectFilter;
    const matchStatus = statusFilter === "all" || s.status === statusFilter;
    return matchSubject && matchStatus;
  });

  const openAdd = () => {
    setEditId(null);
    setForm(EMPTY);
    setOpen(true);
  };
  const openEdit = (h: Homework) => {
    setEditId(h.id);
    setForm({
      subject: h.subject,
      className: h.className,
      title: h.title,
      description: h.description,
      dueDate: h.dueDate,
      assignedBy: h.assignedBy,
      status: h.status,
    });
    setOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.subject || !form.className || !form.title) {
      toast.error("Subject, class, and title are required");
      return;
    }
    if (editId !== null) {
      setHomeworks((prev) =>
        prev.map((h) => (h.id === editId ? { ...h, ...form } : h)),
      );
      toast.success("Assignment updated");
    } else {
      setHomeworks((prev) => [...prev, { id: nextId, ...form }]);
      setNextId((n) => n + 1);
      toast.success("Assignment added");
    }
    setOpen(false);
  };

  const handleDelete = (id: number) => {
    setHomeworks((prev) => prev.filter((h) => h.id !== id));
    toast.success("Assignment deleted");
  };

  const openGradeDialog = (sub: Submission) => {
    setGradingSubmission(sub);
    setGradeScore(sub.score !== null ? String(sub.score) : "");
    setGradeFeedback(sub.feedback);
    setGradeDialogOpen(true);
  };

  const submitGrade = () => {
    if (!gradeScore || Number.isNaN(Number(gradeScore))) {
      toast.error("Enter a valid score");
      return;
    }
    const score = Math.min(100, Math.max(0, Number(gradeScore)));
    setSubmissions((prev) =>
      prev.map((s) =>
        s.id === gradingSubmission?.id
          ? { ...s, score, feedback: gradeFeedback, status: "Graded" }
          : s,
      ),
    );
    setGradeDialogOpen(false);
    toast.success("Assignment graded");
  };

  const totalSubmissions = submissions.length;
  const gradedCount = submissions.filter((s) => s.status === "Graded").length;
  const pendingCount = submissions.filter((s) => s.status !== "Graded").length;

  const f = (k: keyof typeof EMPTY, v: string) =>
    setForm((p) => ({ ...p, [k]: v }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{t("homework")}</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {homeworks.length} assignments
          </p>
        </div>
        <Button
          onClick={openAdd}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
          data-ocid="homework.primary_button"
        >
          <Plus size={16} className="mr-2" /> Add Assignment
        </Button>
      </div>

      <Tabs defaultValue="assignments">
        <TabsList>
          <TabsTrigger value="assignments" data-ocid="homework.assignments.tab">
            Assignments
          </TabsTrigger>
          <TabsTrigger value="submissions" data-ocid="homework.submissions.tab">
            Submissions
          </TabsTrigger>
        </TabsList>

        {/* Assignments Tab */}
        <TabsContent value="assignments" className="space-y-4">
          <div className="flex flex-wrap gap-3 items-center">
            <div className="flex items-center gap-2">
              <Search size={16} className="text-muted-foreground" />
              <Input
                placeholder="Search assignments..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-52"
                data-ocid="homework.search_input"
              />
            </div>
            <Select value={filterClass} onValueChange={setFilterClass}>
              <SelectTrigger
                className="w-32"
                data-ocid="homework.class_filter_select"
              >
                <SelectValue placeholder="Class" />
              </SelectTrigger>
              <SelectContent
                position="popper"
                className="max-h-60 overflow-y-auto"
              >
                <SelectItem value="all">All Classes</SelectItem>
                {CLASSES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterSubject} onValueChange={setFilterSubject}>
              <SelectTrigger
                className="w-36"
                data-ocid="homework.subject_filter_select"
              >
                <SelectValue placeholder="Subject" />
              </SelectTrigger>
              <SelectContent
                position="popper"
                className="max-h-60 overflow-y-auto"
              >
                <SelectItem value="all">All Subjects</SelectItem>
                {SUBJECTS.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="dark:text-gray-300">
                        Title
                      </TableHead>
                      <TableHead>{t("subject")}</TableHead>
                      <TableHead className="dark:text-gray-300">
                        Class
                      </TableHead>
                      <TableHead className="dark:text-gray-300">
                        Due Date
                      </TableHead>
                      <TableHead className="dark:text-gray-300">
                        Assigned By
                      </TableHead>
                      <TableHead>{t("status")}</TableHead>
                      <TableHead>{t("actions")}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.length === 0 && (
                      <TableRow>
                        <TableCell
                          colSpan={7}
                          className="text-center py-8 text-muted-foreground"
                          data-ocid="homework.empty_state"
                        >
                          <BookCheck
                            size={28}
                            className="mx-auto mb-2 opacity-40"
                          />
                          No assignments found
                        </TableCell>
                      </TableRow>
                    )}
                    {filtered.map((h, i) => (
                      <TableRow key={h.id} data-ocid={`homework.item.${i + 1}`}>
                        <TableCell className="font-medium">{h.title}</TableCell>
                        <TableCell>{h.subject}</TableCell>
                        <TableCell>{h.className}</TableCell>
                        <TableCell>{h.dueDate}</TableCell>
                        <TableCell>{h.assignedBy}</TableCell>
                        <TableCell>
                          <Badge className={`text-xs ${statusColor[h.status]}`}>
                            {h.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() => openEdit(h)}
                              data-ocid={`homework.edit_button.${i + 1}`}
                            >
                              <Pencil size={13} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 text-gray-500 dark:text-gray-400"
                              onClick={() => handleDelete(h.id)}
                              data-ocid={`homework.delete_button.${i + 1}`}
                            >
                              <Trash2 size={13} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Submissions Tab */}
        <TabsContent value="submissions" className="space-y-4">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <BookCheck
                  className="text-gray-600 dark:text-gray-300"
                  size={24}
                />
                <div>
                  <p className="text-xs text-muted-foreground">Total</p>
                  <p className="text-xl font-bold">{totalSubmissions}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <CheckCircle2
                  className="text-gray-600 dark:text-gray-300"
                  size={24}
                />
                <div>
                  <p className="text-xs text-muted-foreground">Graded</p>
                  <p className="text-xl font-bold text-gray-600 dark:text-gray-300">
                    {gradedCount}
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <Clock className="text-gray-600 dark:text-gray-300" size={24} />
                <div>
                  <p className="text-xs text-muted-foreground">
                    {t("pending")}
                  </p>
                  <p className="text-xl font-bold text-gray-600 dark:text-gray-300">
                    {pendingCount}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-wrap gap-3">
            <Select value={subjectFilter} onValueChange={setSubjectFilter}>
              <SelectTrigger
                className="w-36"
                data-ocid="homework.sub_subject_filter_select"
              >
                <SelectValue placeholder="Subject" />
              </SelectTrigger>
              <SelectContent
                position="popper"
                className="max-h-60 overflow-y-auto"
              >
                <SelectItem value="all">All Subjects</SelectItem>
                {SUBJECTS.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger
                className="w-32"
                data-ocid="homework.sub_status_filter_select"
              >
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent
                position="popper"
                className="max-h-60 overflow-y-auto"
              >
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Submitted">Submitted</SelectItem>
                <SelectItem value="Graded">Graded</SelectItem>
                <SelectItem value="Pending">{t("pending")}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="dark:text-gray-300">
                        Student
                      </TableHead>
                      <TableHead className="dark:text-gray-300">
                        Class
                      </TableHead>
                      <TableHead>{t("subject")}</TableHead>
                      <TableHead className="dark:text-gray-300">
                        Assignment
                      </TableHead>
                      <TableHead className="dark:text-gray-300">
                        Submitted
                      </TableHead>
                      <TableHead className="dark:text-gray-300">File</TableHead>
                      <TableHead>{t("status")}</TableHead>
                      <TableHead className="dark:text-gray-300">
                        Score
                      </TableHead>
                      <TableHead className="dark:text-gray-300">
                        Action
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSubmissions.length === 0 && (
                      <TableRow>
                        <TableCell
                          colSpan={9}
                          className="text-center py-8 text-muted-foreground"
                          data-ocid="homework.submissions.empty_state"
                        >
                          No submissions found
                        </TableCell>
                      </TableRow>
                    )}
                    {filteredSubmissions.map((s, i) => (
                      <TableRow
                        key={s.id}
                        data-ocid={`homework.submission.item.${i + 1}`}
                      >
                        <TableCell className="font-medium">
                          {s.studentName}
                        </TableCell>
                        <TableCell>{s.class}</TableCell>
                        <TableCell>{s.subject}</TableCell>
                        <TableCell className="max-w-[160px] truncate">
                          {s.assignmentTitle}
                        </TableCell>
                        <TableCell>{s.submittedDate}</TableCell>
                        <TableCell className="text-xs text-gray-600 dark:text-gray-300">
                          {s.fileName}
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={`text-xs ${submissionStatusColor[s.status]}`}
                          >
                            {s.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {s.score !== null ? (
                            <span className="font-semibold">{s.score}/100</span>
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 text-xs"
                            onClick={() => openGradeDialog(s)}
                            data-ocid={`homework.grade_button.${i + 1}`}
                          >
                            {s.status === "Graded" ? "Update" : "Grade"}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add/Edit Assignment Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editId !== null ? "Edit Assignment" : "Add Assignment"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label>{t("subject")}</Label>
                <Select
                  value={form.subject}
                  onValueChange={(v) => f("subject", v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent
                    position="popper"
                    className="max-h-60 overflow-y-auto"
                  >
                    {SUBJECTS.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label>Class</Label>
                <Select
                  value={form.className}
                  onValueChange={(v) => f("className", v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent
                    position="popper"
                    className="max-h-60 overflow-y-auto"
                  >
                    {CLASSES.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-1">
              <Label>Title</Label>
              <Input
                value={form.title}
                onChange={(e) => f("title", e.target.value)}
                placeholder="Assignment title"
                data-ocid="homework.title.input"
              />
            </div>
            <div className="space-y-1">
              <Label>Description</Label>
              <Textarea
                value={form.description}
                onChange={(e) => f("description", e.target.value)}
                rows={3}
                placeholder="Assignment details"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label>Assigned By</Label>
                <Input
                  value={form.assignedBy}
                  onChange={(e) => f("assignedBy", e.target.value)}
                  placeholder="Teacher name"
                />
              </div>
              <div className="space-y-1">
                <Label>Due Date</Label>
                <Input
                  type="date"
                  value={form.dueDate}
                  onChange={(e) => f("dueDate", e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                data-ocid="homework.submit_button"
              >
                {editId !== null ? "Update" : "Add"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Grade Dialog */}
      <Dialog open={gradeDialogOpen} onOpenChange={setGradeDialogOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Grade Assignment</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {gradingSubmission && (
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                <p className="text-sm font-medium">
                  {gradingSubmission.studentName}
                </p>
                <p className="text-xs text-muted-foreground">
                  {gradingSubmission.assignmentTitle}
                </p>
              </div>
            )}
            <div className="space-y-1">
              <Label>Score (0–100)</Label>
              <Input
                type="number"
                min={0}
                max={100}
                value={gradeScore}
                onChange={(e) => setGradeScore(e.target.value)}
                placeholder="e.g. 85"
                data-ocid="homework.grade.score.input"
              />
            </div>
            <div className="space-y-1">
              <Label>Feedback</Label>
              <Textarea
                value={gradeFeedback}
                onChange={(e) => setGradeFeedback(e.target.value)}
                rows={3}
                placeholder="Optional feedback for the student"
                data-ocid="homework.grade.feedback.textarea"
              />
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setGradeDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={submitGrade}
                data-ocid="homework.grade.submit_button"
              >
                Submit Grade
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
