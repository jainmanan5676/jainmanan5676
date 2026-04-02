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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Award,
  BookMarked,
  BookOpen,
  Briefcase,
  Calendar,
  CheckCircle,
  CheckCircle2,
  ClipboardList,
  FlaskConical,
  GraduationCap,
  LogOut,
  Mail,
  Search,
  Users,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { SmartAssistant } from "../components/SmartAssistant";
import ClubsPage from "./ClubsPage";
import ForumsPage from "./ForumsPage";
import MessagesPage from "./MessagesPage";

type Props = { onLogout: () => void; studentName?: string; studentId?: string };

const courses = [
  {
    code: "CS401",
    name: "Machine Learning",
    instructor: "Dr. Amit Verma",
    credits: 3,
    schedule: "Mon/Wed 9:00-10:30am",
    room: "CS-301",
  },
  {
    code: "CS412",
    name: "Computer Networks",
    instructor: "Mr. Deepak Malhotra",
    credits: 3,
    schedule: "Tue/Thu 11:00am-12:30pm",
    room: "CS-205",
  },
  {
    code: "MATH301",
    name: "Advanced Mathematics",
    instructor: "Prof. Lakshmi Rajan",
    credits: 4,
    schedule: "Mon/Wed/Fri 8:00-9:00am",
    room: "MATH-101",
  },
  {
    code: "CS421",
    name: "Software Engineering",
    instructor: "Dr. Priya Iyer",
    credits: 3,
    schedule: "Tue/Thu 2:00-3:30pm",
    room: "CS-410",
  },
  {
    code: "HUM201",
    name: "Technical Communication",
    instructor: "Ms. Sunita Rao",
    credits: 2,
    schedule: "Fri 10:00am-12:00pm",
    room: "HUM-102",
  },
];

const catalogCourses = [
  {
    code: "CS450",
    name: "Cloud Computing",
    department: "CS",
    instructor: "Dr. Ravi Shankar",
    credits: 3,
    schedule: "Mon/Wed 11:00am-12:30pm",
    room: "CS-402",
    seatsAvailable: 12,
    description:
      "Introduction to cloud architecture, AWS, Azure, and GCP services. Hands-on labs included.",
  },
  {
    code: "CS460",
    name: "Cybersecurity Fundamentals",
    department: "CS",
    instructor: "Prof. Neha Gupta",
    credits: 3,
    schedule: "Tue/Thu 9:00-10:30am",
    room: "CS-315",
    seatsAvailable: 8,
    description:
      "Threat modeling, cryptography, network security, and ethical hacking principles.",
  },
  {
    code: "CS470",
    name: "Distributed Systems",
    department: "CS",
    instructor: "Dr. Suresh Kumar",
    credits: 3,
    schedule: "Mon/Wed/Fri 1:00-2:00pm",
    room: "CS-220",
    seatsAvailable: 6,
    description:
      "Consensus algorithms, CAP theorem, microservices, and distributed databases.",
  },
  {
    code: "MATH350",
    name: "Probability & Statistics",
    department: "MATH",
    instructor: "Prof. Ananya Sharma",
    credits: 4,
    schedule: "Tue/Thu/Fri 8:00-9:00am",
    room: "MATH-201",
    seatsAvailable: 20,
    description:
      "Probability theory, statistical inference, regression analysis, and hypothesis testing.",
  },
  {
    code: "MATH360",
    name: "Discrete Mathematics",
    department: "MATH",
    instructor: "Dr. Rajesh Pillai",
    credits: 3,
    schedule: "Mon/Wed 3:00-4:30pm",
    room: "MATH-105",
    seatsAvailable: 15,
    description:
      "Graph theory, combinatorics, logic, and proof techniques for computer science.",
  },
  {
    code: "PHY201",
    name: "Quantum Mechanics Intro",
    department: "PHY",
    instructor: "Prof. Vikram Nair",
    credits: 3,
    schedule: "Tue/Thu 1:00-2:30pm",
    room: "PHY-301",
    seatsAvailable: 18,
    description:
      "Wave-particle duality, Schrödinger equation, quantum states, and measurement theory.",
  },
  {
    code: "HUM301",
    name: "Ethics in Technology",
    department: "HUM",
    instructor: "Dr. Meera Iyer",
    credits: 2,
    schedule: "Fri 2:00-4:00pm",
    room: "HUM-201",
    seatsAvailable: 25,
    description:
      "Ethical implications of AI, data privacy, algorithmic bias, and digital citizenship.",
  },
  {
    code: "ELE301",
    name: "Digital Signal Processing",
    department: "ELE",
    instructor: "Dr. Kiran Bose",
    credits: 3,
    schedule: "Mon/Wed 4:00-5:30pm",
    room: "ELE-205",
    seatsAvailable: 10,
    description:
      "Fourier transforms, FIR/IIR filters, spectral analysis, and real-time signal applications.",
  },
];

const grades = [
  {
    code: "CS401",
    name: "Machine Learning",
    credits: 3,
    grade: "A",
    points: 4.0,
  },
  {
    code: "CS412",
    name: "Computer Networks",
    credits: 3,
    grade: "B+",
    points: 3.3,
  },
  {
    code: "MATH301",
    name: "Advanced Mathematics",
    credits: 4,
    grade: "A-",
    points: 3.7,
  },
  {
    code: "CS421",
    name: "Software Engineering",
    credits: 3,
    grade: "A",
    points: 4.0,
  },
  {
    code: "HUM201",
    name: "Technical Communication",
    credits: 2,
    grade: "B",
    points: 3.0,
  },
];

const assignments = [
  {
    id: 1,
    course: "CS401",
    title: "Neural Network Implementation",
    dueDate: "Mar 28, 2026",
    status: "Submitted" as const,
  },
  {
    id: 2,
    course: "CS412",
    title: "TCP/IP Protocol Analysis",
    dueDate: "Mar 25, 2026",
    status: "Pending" as const,
  },
  {
    id: 3,
    course: "MATH301",
    title: "Problem Set 7",
    dueDate: "Mar 20, 2026",
    status: "Overdue" as const,
  },
  {
    id: 4,
    course: "CS421",
    title: "Sprint 3 Deliverable",
    dueDate: "Apr 5, 2026",
    status: "Pending" as const,
  },
  {
    id: 5,
    course: "HUM201",
    title: "Technical Report Draft",
    dueDate: "Mar 22, 2026",
    status: "Submitted" as const,
  },
  {
    id: 6,
    course: "CS412",
    title: "Lab 4: Routing Simulation",
    dueDate: "Mar 15, 2026",
    status: "Overdue" as const,
  },
];

const calendarEvents = [
  { date: "Mar 15, 2026", label: "Mid-Term Exams Begin", type: "exam" },
  { date: "Mar 22, 2026", label: "Mid-Term Exams End", type: "exam" },
  { date: "Mar 23-27, 2026", label: "Spring Break", type: "holiday" },
  { date: "Apr 1, 2026", label: "Classes Resume", type: "academic" },
  { date: "Apr 15, 2026", label: "Last Day to Withdraw", type: "deadline" },
  { date: "May 5, 2026", label: "Final Exams Begin", type: "exam" },
  { date: "May 15, 2026", label: "Final Exams End", type: "exam" },
  { date: "May 20, 2026", label: "Semester Ends", type: "academic" },
  { date: "Jun 1, 2026", label: "Results Declared", type: "academic" },
];

const feeData = {
  total: 85000,
  paid: 60000,
  semesterBreakdown: [
    {
      semester: "Sem 5 (Fall 2025)",
      amount: 42500,
      paid: 42500,
      status: "Paid",
    },
    {
      semester: "Sem 6 (Spring 2026)",
      amount: 42500,
      paid: 17500,
      status: "Partial",
    },
  ],
  payments: [
    {
      date: "Aug 15, 2025",
      amount: 42500,
      mode: "Bank Transfer",
      ref: "TXN-2025-0815",
    },
    {
      date: "Jan 10, 2026",
      amount: 17500,
      mode: "Online",
      ref: "TXN-2026-0110",
    },
  ],
};

const statusColor: Record<string, string> = {
  Submitted: "bg-green-100 text-green-700",
  Pending: "bg-amber-100 text-amber-700",
  Overdue: "bg-red-100 text-red-700",
};

const calendarColor: Record<string, string> = {
  exam: "bg-purple-600 text-white",
  holiday: "bg-amber-100 text-amber-700",
  academic: "bg-blue-600 text-white",
  deadline: "bg-red-100 text-red-700",
};

const gradeColor: Record<string, string> = {
  A: "text-green-700 font-bold",
  "A-": "text-green-600 font-bold",
  "B+": "text-blue-700 font-bold",
  B: "text-blue-600 font-bold",
  "B-": "text-cyan-600 font-bold",
  C: "text-amber-700 font-bold",
};

const gradeDistribution = [
  { label: "A", count: 2, color: "bg-green-600" },
  { label: "A-", count: 1, color: "bg-green-400" },
  { label: "B+", count: 1, color: "bg-blue-500" },
  { label: "B", count: 1, color: "bg-blue-300" },
];

const MAX_CREDITS = 18;

// ==================== STUDY MATERIALS TAB ====================
const studyMaterialsCourses = [
  {
    code: "CS401",
    name: "Machine Learning",
    resources: [
      { name: "Introduction to ML - Lecture Notes", type: "PDF" },
      { name: "Neural Networks Explained", type: "Video" },
      { name: "Scikit-learn Documentation", type: "Link" },
      { name: "Assignment 1 - Dataset Analysis", type: "PDF" },
    ],
  },
  {
    code: "CS412",
    name: "Computer Networks",
    resources: [
      { name: "OSI Model Overview", type: "PDF" },
      { name: "TCP/IP Fundamentals - Video Lecture", type: "Video" },
      { name: "Wireshark Tutorial", type: "Link" },
    ],
  },
  {
    code: "MATH301",
    name: "Advanced Mathematics",
    resources: [
      { name: "Linear Algebra Cheat Sheet", type: "PDF" },
      { name: "Calculus Revision Notes", type: "PDF" },
      { name: "Khan Academy - Linear Algebra", type: "Link" },
    ],
  },
  {
    code: "CS350",
    name: "Software Engineering",
    resources: [
      { name: "Agile Methodology Slides", type: "PDF" },
      { name: "Design Patterns Workshop", type: "Video" },
      { name: "Git Best Practices Guide", type: "Link" },
    ],
  },
];

function StudyMaterialsTab() {
  const [search, setSearch] = useState("");
  const filtered = studyMaterialsCourses
    .map((c) => ({
      ...c,
      resources: c.resources.filter((r) =>
        r.name.toLowerCase().includes(search.toLowerCase()),
      ),
    }))
    .filter((c) => c.resources.length > 0);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Search className="h-4 w-4 text-gray-400" />
        <input
          className="border rounded px-3 py-2 text-sm w-full max-w-xs focus:outline-none focus:ring-1 focus:ring-black"
          placeholder="Search resources..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          data-ocid="materials.search_input"
        />
      </div>
      {filtered.map((course) => (
        <Card
          key={course.code}
          className="border border-gray-200 dark:border-gray-700"
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">
              {course.code} — {course.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {course.resources.map((r, i) => (
                <div
                  key={r.name}
                  className="flex items-center justify-between py-2 border-b last:border-0"
                >
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className={
                        r.type === "PDF"
                          ? "text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
                          : r.type === "Video"
                            ? "text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
                            : "text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
                      }
                    >
                      {r.type}
                    </Badge>
                    <span className="text-sm">{r.name}</span>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs"
                    onClick={() =>
                      toast.success(
                        `${r.type === "Link" ? "Opening" : "Downloading"}: ${r.name}`,
                      )
                    }
                    data-ocid={`materials.${r.type === "Link" ? "open" : "download"}_button.${i + 1}`}
                  >
                    {r.type === "Link" ? "Open" : "Download"}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
      {filtered.length === 0 && (
        <div
          className="text-center text-gray-400 py-12"
          data-ocid="materials.empty_state"
        >
          No resources match your search.
        </div>
      )}
    </div>
  );
}

// ==================== INTERNSHIP TRACKER TAB ====================
type InternshipStatus = "Applied" | "Interview" | "Offer" | "Rejected";
const initialInternships = [
  {
    company: "Google",
    role: "SWE Intern",
    applied: "2026-01-10",
    deadline: "2026-02-28",
    status: "Interview" as InternshipStatus,
  },
  {
    company: "Amazon",
    role: "Cloud Intern",
    applied: "2026-01-15",
    deadline: "2026-03-01",
    status: "Applied" as InternshipStatus,
  },
  {
    company: "Flipkart",
    role: "Data Analyst Intern",
    applied: "2025-12-20",
    deadline: "2026-01-31",
    status: "Rejected" as InternshipStatus,
  },
  {
    company: "Microsoft",
    role: "Product Intern",
    applied: "2026-01-22",
    deadline: "2026-03-15",
    status: "Applied" as InternshipStatus,
  },
  {
    company: "Infosys",
    role: "Backend Intern",
    applied: "2026-01-05",
    deadline: "2026-02-10",
    status: "Offer" as InternshipStatus,
  },
  {
    company: "Wipro",
    role: "ML Intern",
    applied: "2026-01-28",
    deadline: "2026-03-20",
    status: "Applied" as InternshipStatus,
  },
];

const statusColors: Record<InternshipStatus, string> = {
  Applied: "bg-blue-100 text-blue-700 border-blue-200",
  Interview: "bg-amber-100 text-amber-700 border-amber-200",
  Offer: "bg-green-100 text-green-700 border-green-200",
  Rejected: "bg-red-100 text-red-700 border-red-200",
};

function InternshipTrackerTab() {
  const { t } = useLanguage();
  const [internships, setInternships] = useState(initialInternships);
  const [showForm, setShowForm] = useState(false);
  const [newEntry, setNewEntry] = useState({
    company: "",
    role: "",
    applied: "",
    deadline: "",
  });

  const addInternship = () => {
    if (!newEntry.company || !newEntry.role) {
      toast.error("Company and role are required");
      return;
    }
    setInternships((prev) => [
      ...prev,
      { ...newEntry, status: "Applied" as InternshipStatus },
    ]);
    setNewEntry({ company: "", role: "", applied: "", deadline: "" });
    setShowForm(false);
    toast.success("Internship added!");
  };

  const updateStatus = (idx: number, status: InternshipStatus) => {
    setInternships((prev) =>
      prev.map((it, i) => (i === idx ? { ...it, status } : it)),
    );
    toast.success("Status updated");
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-base font-semibold">My Internship Applications</h3>
        <Button
          size="sm"
          className="bg-primary text-primary-foreground hover:bg-primary/90"
          onClick={() => setShowForm((v) => !v)}
          data-ocid="internships.open_modal_button"
        >
          + Add Internship
        </Button>
      </div>
      {showForm && (
        <Card
          className="border border-gray-200 dark:border-gray-700 p-4"
          data-ocid="internships.modal"
        >
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <div className="text-xs font-medium">Company *</div>
              <input
                className="border rounded px-2 py-1 text-sm w-full mt-1 focus:outline-none focus:ring-1 focus:ring-black"
                value={newEntry.company}
                onChange={(e) =>
                  setNewEntry((p) => ({ ...p, company: e.target.value }))
                }
                data-ocid="internships.input"
              />
            </div>
            <div>
              <div className="text-xs font-medium">Role *</div>
              <input
                className="border rounded px-2 py-1 text-sm w-full mt-1 focus:outline-none focus:ring-1 focus:ring-black"
                value={newEntry.role}
                onChange={(e) =>
                  setNewEntry((p) => ({ ...p, role: e.target.value }))
                }
              />
            </div>
            <div>
              <div className="text-xs font-medium">Applied Date</div>
              <input
                type="date"
                className="border rounded px-2 py-1 text-sm w-full mt-1 focus:outline-none focus:ring-1 focus:ring-black"
                value={newEntry.applied}
                onChange={(e) =>
                  setNewEntry((p) => ({ ...p, applied: e.target.value }))
                }
              />
            </div>
            <div>
              <div className="text-xs font-medium">Deadline</div>
              <input
                type="date"
                className="border rounded px-2 py-1 text-sm w-full mt-1 focus:outline-none focus:ring-1 focus:ring-black"
                value={newEntry.deadline}
                onChange={(e) =>
                  setNewEntry((p) => ({ ...p, deadline: e.target.value }))
                }
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={addInternship}
              data-ocid="internships.submit_button"
            >
              Add
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowForm(false)}
              data-ocid="internships.cancel_button"
            >
              Cancel
            </Button>
          </div>
        </Card>
      )}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="dark:text-gray-300">Company</TableHead>
              <TableHead>{t("role")}</TableHead>
              <TableHead className="dark:text-gray-300">Applied</TableHead>
              <TableHead className="dark:text-gray-300">Deadline</TableHead>
              <TableHead>{t("status")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {internships.map((it, i) => (
              <TableRow
                key={it.company + it.role}
                data-ocid={`internships.item.${i + 1}`}
              >
                <TableCell className="font-medium">{it.company}</TableCell>
                <TableCell>{it.role}</TableCell>
                <TableCell>{it.applied || "—"}</TableCell>
                <TableCell>{it.deadline || "—"}</TableCell>
                <TableCell>
                  <select
                    value={it.status}
                    onChange={(e) =>
                      updateStatus(i, e.target.value as InternshipStatus)
                    }
                    className={`text-xs px-2 py-1 rounded border font-medium ${statusColors[it.status]} focus:outline-none`}
                    data-ocid={`internships.select.${i + 1}`}
                  >
                    {(
                      [
                        "Applied",
                        "Interview",
                        "Offer",
                        "Rejected",
                      ] as InternshipStatus[]
                    ).map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

// ==================== RESEARCH PROJECTS TAB ====================
type ResearchStatus = "Open" | "In Progress" | "Completed";
const researchProjects = [
  {
    title: "AI-Powered Crop Disease Detection",
    dept: "Computer Science",
    supervisor: "Dr. Amit Verma",
    desc: "Using CNN models to detect plant diseases from leaf images for smart agriculture.",
    status: "Open" as ResearchStatus,
    spots: 3,
  },
  {
    title: "Blockchain for Academic Records",
    dept: "Computer Science",
    supervisor: "Prof. Suresh Nair",
    desc: "Secure, tamper-proof storage of student transcripts using Ethereum smart contracts.",
    status: "Open" as ResearchStatus,
    spots: 2,
  },
  {
    title: "Mental Health NLP Analysis",
    dept: "Data Science",
    supervisor: "Dr. Priya Singh",
    desc: "Natural language processing on social media data to identify early mental health indicators.",
    status: "In Progress" as ResearchStatus,
    spots: 0,
  },
  {
    title: "Renewable Energy Optimization",
    dept: "Electrical Engineering",
    supervisor: "Prof. Ramesh Kumar",
    desc: "Optimization algorithms for maximizing solar panel efficiency under varying conditions.",
    status: "Open" as ResearchStatus,
    spots: 4,
  },
  {
    title: "Smart Traffic Management System",
    dept: "Computer Science",
    supervisor: "Dr. Lakshmi Rajan",
    desc: "IoT-based adaptive traffic signal control to reduce urban congestion.",
    status: "Completed" as ResearchStatus,
    spots: 0,
  },
];

const researchStatusColors: Record<ResearchStatus, string> = {
  Open: "bg-blue-100 text-blue-700 border-blue-200",
  "In Progress": "bg-amber-100 text-amber-700 border-amber-200",
  Completed: "bg-green-100 text-green-700 border-green-200",
};

function ResearchProjectsTab() {
  const [deptFilter, setDeptFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [joined, setJoined] = useState<number[]>([]);

  const depts = [
    "All",
    ...Array.from(new Set(researchProjects.map((p) => p.dept))),
  ];
  const statuses = ["All", "Open", "In Progress", "Completed"];

  const filtered = researchProjects.filter(
    (p) =>
      (deptFilter === "All" || p.dept === deptFilter) &&
      (statusFilter === "All" || p.status === statusFilter),
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3 mb-2">
        <select
          value={deptFilter}
          onChange={(e) => setDeptFilter(e.target.value)}
          className="border rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-black"
          data-ocid="research.select"
        >
          {depts.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-black"
        >
          {statuses.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((p, i) => (
          <Card
            key={p.title}
            className="border border-gray-200 dark:border-gray-700"
            data-ocid={`research.item.${i + 1}`}
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-sm font-semibold leading-snug">
                  {p.title}
                </CardTitle>
                <Badge
                  variant="outline"
                  className={researchStatusColors[p.status]}
                >
                  {p.status}
                </Badge>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {p.dept} · Supervisor: {p.supervisor}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                {p.desc}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">
                  {p.spots > 0 ? `${p.spots} spots available` : "No spots"}
                </span>
                {p.status === "Open" &&
                  p.spots > 0 &&
                  (joined.includes(i) ? (
                    <Badge className="bg-indigo-100 text-indigo-700 border-indigo-200 border">
                      Joined
                    </Badge>
                  ) : (
                    <Button
                      size="sm"
                      className="bg-primary text-primary-foreground hover:bg-primary/90 text-xs"
                      onClick={() => {
                        setJoined((prev) => [...prev, i]);
                        toast.success(`Joined: ${p.title}`);
                      }}
                      data-ocid={`research.button.${i + 1}`}
                    >
                      Join Project
                    </Button>
                  ))}
              </div>
            </CardContent>
          </Card>
        ))}
        {filtered.length === 0 && (
          <div
            className="col-span-2 text-center text-gray-400 py-12"
            data-ocid="research.empty_state"
          >
            No projects match the selected filters.
          </div>
        )}
      </div>
    </div>
  );
}

// ==================== SCHOLARSHIPS TAB ====================
type ScholarshipStatus = "Available" | "Applied" | "Awarded";
const scholarshipsList = [
  {
    name: "Merit Excellence Award",
    amount: "₹50,000",
    eligibility: "CGPA ≥ 9.0",
    deadline: "2026-03-31",
    status: "Available" as ScholarshipStatus,
  },
  {
    name: "National Science Fellowship",
    amount: "₹1,20,000/yr",
    eligibility: "Science stream, CGPA ≥ 8.5",
    deadline: "2026-04-15",
    status: "Applied" as ScholarshipStatus,
  },
  {
    name: "Women in Tech Scholarship",
    amount: "₹75,000",
    eligibility: "Female students in CS/IT",
    deadline: "2026-03-10",
    status: "Available" as ScholarshipStatus,
  },
  {
    name: "Sports Achievement Grant",
    amount: "₹30,000",
    eligibility: "State-level sports participation",
    deadline: "2026-02-28",
    status: "Awarded" as ScholarshipStatus,
  },
  {
    name: "Rural Talent Scholarship",
    amount: "₹60,000",
    eligibility: "Rural domicile, family income < ₹3L",
    deadline: "2026-04-30",
    status: "Available" as ScholarshipStatus,
  },
  {
    name: "Industry Innovation Award",
    amount: "₹1,00,000",
    eligibility: "Published research or patent holder",
    deadline: "2026-05-15",
    status: "Applied" as ScholarshipStatus,
  },
];

const scholStatusColors: Record<ScholarshipStatus, string> = {
  Available: "bg-green-100 text-green-700 border-green-200",
  Applied: "bg-blue-100 text-blue-700 border-blue-200",
  Awarded: "bg-emerald-100 text-emerald-700 border-emerald-200",
};

function ScholarshipsTab() {
  const [scholarships, setScholarships] = useState(scholarshipsList);

  const applyScholarship = (idx: number) => {
    setScholarships((prev) =>
      prev.map((s, i) =>
        i === idx ? { ...s, status: "Applied" as ScholarshipStatus } : s,
      ),
    );
    toast.success(`Applied for: ${scholarships[idx].name}`);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-base font-semibold">Available Scholarships</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {scholarships.map((s, i) => (
          <Card
            key={s.name}
            className="border border-gray-200 dark:border-gray-700"
            data-ocid={`scholarships.item.${i + 1}`}
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-sm font-semibold">
                  {s.name}
                </CardTitle>
                <Badge
                  variant="outline"
                  className={scholStatusColors[s.status]}
                >
                  {s.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-1 text-sm text-gray-600 dark:text-gray-300 mb-3">
                <div>
                  <span className="font-medium text-black">Amount:</span>{" "}
                  {s.amount}
                </div>
                <div>
                  <span className="font-medium text-black">Eligibility:</span>{" "}
                  {s.eligibility}
                </div>
                <div>
                  <span className="font-medium text-black">Deadline:</span>{" "}
                  {s.deadline}
                </div>
              </div>
              {s.status === "Available" && (
                <Button
                  size="sm"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 text-xs"
                  onClick={() => applyScholarship(i)}
                  data-ocid={`scholarships.button.${i + 1}`}
                >
                  Apply Now
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default function CollegeStudentPortal({
  onLogout,
  studentName = "Aryan Kapoor",
  studentId = "CS-2021-001",
}: Props) {
  const { t } = useLanguage();
  const [assignmentFilter, setAssignmentFilter] = useState("all");
  const [enrolledCodes, setEnrolledCodes] = useState<Set<string>>(
    () => new Set(courses.map((c) => c.code)),
  );
  const [regSearch, setRegSearch] = useState("");
  const [regDept, setRegDept] = useState("All");

  const totalCredits = grades.reduce((a, g) => a + g.credits, 0);
  const weightedSum = grades.reduce((a, g) => a + g.points * g.credits, 0);
  const gpa = (weightedSum / totalCredits).toFixed(2);

  const filteredAssignments =
    assignmentFilter === "all"
      ? assignments
      : assignments.filter((a) => a.status === assignmentFilter);

  // Compute enrolled credits from catalog + existing courses
  const enrolledCatalogCredits = catalogCourses
    .filter((c) => enrolledCodes.has(c.code))
    .reduce((sum, c) => sum + c.credits, 0);
  const enrolledBaseCredits = courses.reduce((sum, c) => sum + c.credits, 0);
  const totalEnrolledCredits = enrolledBaseCredits + enrolledCatalogCredits;

  const enrolledCatalogCount = catalogCourses.filter((c) =>
    enrolledCodes.has(c.code),
  ).length;

  const filteredCatalog = catalogCourses.filter((c) => {
    const matchesDept = regDept === "All" || c.department === regDept;
    const matchesSearch =
      regSearch === "" ||
      c.name.toLowerCase().includes(regSearch.toLowerCase()) ||
      c.code.toLowerCase().includes(regSearch.toLowerCase()) ||
      c.instructor.toLowerCase().includes(regSearch.toLowerCase());
    return matchesDept && matchesSearch;
  });

  function handleEnroll(code: string, credits: number) {
    if (totalEnrolledCredits + credits > MAX_CREDITS) {
      toast.error(
        `Credit limit reached! Enrolling would exceed ${MAX_CREDITS} credits. Drop a course first.`,
      );
      return;
    }
    setEnrolledCodes((prev) => new Set([...prev, code]));
    const course = catalogCourses.find((c) => c.code === code);
    toast.success(`Enrolled in ${course?.name ?? code}!`);
  }

  function handleDrop(code: string) {
    setEnrolledCodes((prev) => {
      const next = new Set(prev);
      next.delete(code);
      return next;
    });
    const course = catalogCourses.find((c) => c.code === code);
    toast.success(`Dropped ${course?.name ?? code}.`);
  }

  const [activeTab, setActiveTab] = useState("courses");
  const [feeBreakdown, setFeeBreakdown] = useState(feeData.semesterBreakdown);
  const [payTarget, setPayTarget] = useState<string | null>(null);
  const [payStep, setPayStep] = useState<"form" | "processing" | "success">(
    "form",
  );
  const [payCard, setPayCard] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  });

  const handleCollegePay = () => {
    if (!payCard.number || !payCard.expiry || !payCard.cvv || !payCard.name) {
      return;
    }
    setPayStep("processing");
    setTimeout(() => setPayStep("success"), 2000);
  };

  const handleCollegePayClose = (success: boolean) => {
    if (success && payTarget) {
      setFeeBreakdown((prev) =>
        prev.map((r) =>
          r.semester === payTarget
            ? { ...r, paid: r.amount, status: "Paid" }
            : r,
        ),
      );
    }
    setPayTarget(null);
    setPayStep("form");
    setPayCard({ number: "", expiry: "", cvv: "", name: "" });
  };

  // GPA Calculator state
  const gpaGrades: Record<string, number> = {
    "A+": 10,
    A: 9,
    "B+": 8,
    B: 7,
    "C+": 6,
    C: 5,
    D: 4,
    F: 0,
  };
  const [gpaRows, setGpaRows] = useState(
    courses.map((c) => ({
      code: c.code,
      name: c.name,
      credits: c.credits,
      grade: "B+",
    })),
  );
  // Campus RSVP state
  const campusEvents = [
    {
      id: 1,
      name: "Tech Symposium 2026",
      date: "2026-04-15",
      venue: "Main Auditorium",
      seats: 120,
    },
    {
      id: 2,
      name: "Annual Cultural Fest",
      date: "2026-04-22",
      venue: "Open Air Stage",
      seats: 300,
    },
    {
      id: 3,
      name: "Entrepreneurship Summit",
      date: "2026-05-05",
      venue: "Conference Hall",
      seats: 80,
    },
    {
      id: 4,
      name: "Alumni Meet 2026",
      date: "2026-05-12",
      venue: "Sports Complex",
      seats: 200,
    },
    {
      id: 5,
      name: "Research Expo",
      date: "2026-05-20",
      venue: "Science Block",
      seats: 60,
    },
  ];
  const [rsvpSet, setRsvpSet] = useState<Set<number>>(new Set());
  // Grievance state
  const [grievances, setGrievances] = useState<
    Array<{ id: number; category: string; desc: string; status: string }>
  >([
    {
      id: 1,
      category: "Academic",
      desc: "Exam schedule conflict with lab session",
      status: "Resolved",
    },
  ]);
  const [grievanceForm, setGrievanceForm] = useState({
    category: "Academic",
    desc: "",
  });
  // Course Requests state
  const [courseReqTab, setCourseReqTab] = useState<"add" | "drop">("add");
  const [courseRequests, setCourseRequests] = useState<
    Array<{
      id: number;
      type: string;
      course: string;
      reason: string;
      status: string;
    }>
  >([
    {
      id: 1,
      type: "Drop",
      course: "Advanced Algorithms",
      reason: "Schedule conflict",
      status: "Pending",
    },
  ]);
  const [courseReqForm, setCourseReqForm] = useState({
    course: "",
    reason: "",
  });

  const computedGpa = (() => {
    const totalCredits = gpaRows.reduce((s, r) => s + r.credits, 0);
    const totalPoints = gpaRows.reduce(
      (s, r) => s + (gpaGrades[r.grade] || 0) * r.credits,
      0,
    );
    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "0.00";
  })();

  const handleChatNavigate = (page: string) => {
    const tabMap: Record<string, string> = {
      courses: "courses",
      grades: "grades",
      assignments: "assignments",
      fees: "fees",
      calendar: "calendar",
      registration: "registration",
      materials: "materials",
      internships: "internships",
      research: "research",
      scholarships: "scholarships",
      messages: "messages",
      "hall-ticket": "hall-ticket",
      "exam-ticket": "hall-ticket",
      transcript: "transcript",
      clubs: "clubs",
      societies: "clubs",
      gpa: "gpa",
      "campus-rsvp": "campus-rsvp",
      rsvp: "campus-rsvp",
      grievance: "grievance",
      complaint: "grievance",
      "course-requests": "course-requests",
      placement: "placement",
    };
    if (tabMap[page]) setActiveTab(tabMap[page]);
  };
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-800">
      {/* Header */}
      <header className="bg-black text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <GraduationCap size={28} />
          <div>
            <h1 className="text-lg font-bold">Student Portal</h1>
            <p className="text-gray-400 text-xs">EduManage University</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="font-semibold text-sm">{studentName}</p>
            <p className="text-gray-400 text-xs">
              {studentId} · Computer Science · Sem 6
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="border-white/30 text-white hover:bg-white dark:bg-gray-900/10 gap-2"
            onClick={onLogout}
            data-ocid="student_portal.logout.button"
          >
            <LogOut size={14} /> Logout
          </Button>
        </div>
      </header>

      <div className="flex flex-1 min-h-0">
        {/* Sidebar */}
        <aside className="w-56 bg-black text-white flex flex-col shrink-0">
          <div className="px-4 pt-5 pb-3">
            <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">
              Navigation
            </p>
          </div>
          <nav className="flex-1 px-2 space-y-0.5 overflow-y-auto">
            {[
              { value: "courses", label: "My Courses" },
              { value: "grades", label: "My Grades" },
              { value: "assignments", label: "Assignments" },
              { value: "fees", label: "Fee Status" },
              { value: "calendar", label: "Calendar" },
              { value: "registration", label: "Registration" },
              { value: "materials", label: "Study Materials" },
              { value: "internships", label: "Internships" },
              { value: "research", label: "Research" },
              { value: "scholarships", label: "Scholarships" },
              { value: "messages", label: "Messages" },
              { value: "hall-ticket", label: "Hall Ticket" },
              { value: "transcript", label: "Transcript" },
              { value: "clubs", label: "Clubs & Societies" },
              { value: "gpa", label: "GPA Calculator" },
              { value: "campus-rsvp", label: "Campus RSVP" },
              { value: "grievance", label: "Grievance" },
              { value: "course-requests", label: "Course Requests" },
            ].map((tab) => (
              <button
                key={tab.value}
                type="button"
                onClick={() => setActiveTab(tab.value)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                  activeTab === tab.value
                    ? "bg-white dark:bg-gray-900 text-black font-semibold"
                    : "text-gray-300 hover:bg-white dark:bg-gray-900/10 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
          <SmartAssistant
            onNavigate={handleChatNavigate}
            currentPortal="college"
          />
          <div className="p-3 border-t border-white/10">
            <p className="text-[10px] text-gray-500 dark:text-gray-400 text-center">
              Smart Assistant above
            </p>
          </div>
        </aside>

        <main className="flex-1 px-4 py-6 overflow-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="bg-white dark:bg-gray-900 border mb-6 h-auto flex-wrap">
              <TabsTrigger
                value="courses"
                data-ocid="student_portal.courses.tab"
              >
                My Courses
              </TabsTrigger>
              <TabsTrigger value="grades" data-ocid="student_portal.grades.tab">
                My Grades
              </TabsTrigger>
              <TabsTrigger
                value="assignments"
                data-ocid="student_portal.assignments.tab"
              >
                Assignments
              </TabsTrigger>
              <TabsTrigger value="fees" data-ocid="student_portal.fees.tab">
                Fee Status
              </TabsTrigger>
              <TabsTrigger
                value="calendar"
                data-ocid="student_portal.calendar.tab"
              >
                Academic Calendar
              </TabsTrigger>
              <TabsTrigger
                value="registration"
                data-ocid="student_portal.registration.tab"
              >
                Course Registration
              </TabsTrigger>
              <TabsTrigger
                value="materials"
                data-ocid="student_portal.materials.tab"
              >
                <BookMarked className="h-4 w-4 mr-1" /> Study Materials
              </TabsTrigger>
              <TabsTrigger
                value="internships"
                data-ocid="student_portal.internships.tab"
              >
                <Briefcase className="h-4 w-4 mr-1" /> Internships
              </TabsTrigger>
              <TabsTrigger
                value="research"
                data-ocid="student_portal.research.tab"
              >
                <FlaskConical className="h-4 w-4 mr-1" /> Research
              </TabsTrigger>
              <TabsTrigger
                value="scholarships"
                data-ocid="student_portal.scholarships.tab"
              >
                <Award className="h-4 w-4 mr-1" /> Scholarships
              </TabsTrigger>
              <TabsTrigger
                value="messages"
                data-ocid="student_portal.messages.tab"
              >
                <Mail size={14} className="mr-1 inline" /> Messages
              </TabsTrigger>
              <TabsTrigger
                value="hall-ticket"
                data-ocid="student_portal.hall_ticket.tab"
              >
                Hall Ticket
              </TabsTrigger>
              <TabsTrigger value="clubs" data-ocid="student_portal.clubs.tab">
                Clubs
              </TabsTrigger>
              <TabsTrigger value="forums" data-ocid="student_portal.forums.tab">
                Forums
              </TabsTrigger>
              <TabsTrigger
                value="transcript"
                data-ocid="student_portal.transcript.tab"
              >
                Transcript
              </TabsTrigger>
              <TabsTrigger value="gpa" data-ocid="student_portal.gpa.tab">
                GPA Calculator
              </TabsTrigger>
              <TabsTrigger
                value="campus-rsvp"
                data-ocid="student_portal.campus_rsvp.tab"
              >
                Campus RSVP
              </TabsTrigger>
              <TabsTrigger
                value="grievance"
                data-ocid="student_portal.grievance.tab"
              >
                Grievance
              </TabsTrigger>
              <TabsTrigger
                value="course-requests"
                data-ocid="student_portal.course_requests.tab"
              >
                Course Requests
              </TabsTrigger>
            </TabsList>

            {/* My Courses */}
            <TabsContent value="courses">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {courses.map((c, i) => (
                  <Card
                    key={c.code}
                    data-ocid={`student_portal.courses.item.${i + 1}`}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-xs font-mono text-gray-400">
                            {c.code}
                          </p>
                          <CardTitle className="text-base mt-0.5">
                            {c.name}
                          </CardTitle>
                        </div>
                        <Badge className="bg-black text-white text-xs">
                          {c.credits} cr
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                      <p className="flex items-center gap-1.5">
                        <BookOpen size={12} className="text-gray-400" />{" "}
                        {c.instructor}
                      </p>
                      <p className="flex items-center gap-1.5">
                        <Calendar size={12} className="text-gray-400" />{" "}
                        {c.schedule}
                      </p>
                      <p className="text-xs text-gray-400">Room: {c.room}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Grades */}
            <TabsContent value="grades">
              <div className="space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <Card className="col-span-2 sm:col-span-1">
                    <CardContent className="p-4 text-center">
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Cumulative GPA
                      </p>
                      <p className="text-4xl font-bold text-black mt-1">
                        {gpa}
                      </p>
                      <p className="text-xs text-gray-400">/4.0</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Total Credits
                      </p>
                      <p className="text-3xl font-bold text-black mt-1">
                        {totalCredits}
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Courses
                      </p>
                      <p className="text-3xl font-bold text-black mt-1">
                        {grades.length}
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                        Grade Distribution
                      </p>
                      <div className="space-y-1">
                        {gradeDistribution.map((g) => (
                          <div
                            key={g.label}
                            className="flex items-center gap-2"
                          >
                            <span className="text-xs w-5">{g.label}</span>
                            <div
                              className={`h-2 rounded-full ${g.color}`}
                              style={{
                                width: `${(g.count / grades.length) * 100}%`,
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <Card>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="dark:text-gray-300">
                            Course Code
                          </TableHead>
                          <TableHead className="dark:text-gray-300">
                            Course Name
                          </TableHead>
                          <TableHead className="dark:text-gray-300">
                            Credits
                          </TableHead>
                          <TableHead className="dark:text-gray-300">
                            Grade
                          </TableHead>
                          <TableHead className="dark:text-gray-300">
                            Grade Points
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {grades.map((g, i) => (
                          <TableRow
                            key={g.code}
                            data-ocid={`student_portal.grades.item.${i + 1}`}
                          >
                            <TableCell className="font-mono text-sm">
                              {g.code}
                            </TableCell>
                            <TableCell>{g.name}</TableCell>
                            <TableCell>{g.credits}</TableCell>
                            <TableCell>
                              <span
                                className={gradeColor[g.grade] ?? "font-bold"}
                              >
                                {g.grade}
                              </span>
                            </TableCell>
                            <TableCell>{g.points.toFixed(1)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Assignments */}
            <TabsContent value="assignments">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Filter:
                  </span>
                  <div className="flex gap-2">
                    {["all", "Pending", "Submitted", "Overdue"].map((f) => (
                      <Button
                        key={f}
                        size="sm"
                        variant={assignmentFilter === f ? "default" : "outline"}
                        className={
                          assignmentFilter === f ? "bg-black text-white" : ""
                        }
                        onClick={() => setAssignmentFilter(f)}
                        data-ocid={`student_portal.assignments.${f.toLowerCase()}.toggle`}
                      >
                        {f}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  {filteredAssignments.map((a, i) => (
                    <Card
                      key={a.id}
                      data-ocid={`student_portal.assignments.item.${i + 1}`}
                    >
                      <CardContent className="p-4 flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-sm">{a.title}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                            {a.course} · Due: {a.dueDate}
                          </p>
                        </div>
                        <Badge className={statusColor[a.status]}>
                          {a.status}
                        </Badge>
                      </CardContent>
                    </Card>
                  ))}
                  {filteredAssignments.length === 0 && (
                    <p
                      className="text-center text-gray-400 py-8"
                      data-ocid="student_portal.assignments.empty_state"
                    >
                      No assignments found.
                    </p>
                  )}
                </div>
              </div>
            </TabsContent>

            {/* Fee Status */}
            <TabsContent value="fees">
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    {
                      label: "Total Fee",
                      value: `₹${feeData.total.toLocaleString()}`,
                      color: "text-gray-900 dark:text-white",
                    },
                    {
                      label: "Amount Paid",
                      value: `₹${feeData.paid.toLocaleString()}`,
                      color: "text-gray-700 dark:text-gray-200",
                    },
                    {
                      label: "Balance Due",
                      value: `₹${(feeData.total - feeData.paid).toLocaleString()}`,
                      color: "text-gray-700 dark:text-gray-200",
                    },
                  ].map((s) => (
                    <Card key={s.label}>
                      <CardContent className="p-4 text-center">
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {s.label}
                        </p>
                        <p className={`text-2xl font-bold mt-1 ${s.color}`}>
                          {s.value}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">
                      Semester Breakdown
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="dark:text-gray-300">
                            Semester
                          </TableHead>
                          <TableHead className="dark:text-gray-300">
                            Total
                          </TableHead>
                          <TableHead>{t("paid")}</TableHead>
                          <TableHead className="dark:text-gray-300">
                            Balance
                          </TableHead>
                          <TableHead>{t("status")}</TableHead>
                          <TableHead className="dark:text-gray-300">
                            Action
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {feeBreakdown.map((r, i) => (
                          <TableRow
                            key={r.semester}
                            data-ocid={`student_portal.fees.item.${i + 1}`}
                          >
                            <TableCell>{r.semester}</TableCell>
                            <TableCell>₹{r.amount.toLocaleString()}</TableCell>
                            <TableCell>₹{r.paid.toLocaleString()}</TableCell>
                            <TableCell>
                              ₹{(r.amount - r.paid).toLocaleString()}
                            </TableCell>
                            <TableCell>
                              <Badge
                                className={
                                  r.status === "Paid"
                                    ? "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                                    : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                                }
                              >
                                {r.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {r.status !== "Paid" && (
                                <Button
                                  size="sm"
                                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                                  onClick={() => setPayTarget(r.semester)}
                                  data-ocid={`student_portal.fees.pay_button.${i + 1}`}
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
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Payment History</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>{t("date")}</TableHead>
                          <TableHead>{t("amount")}</TableHead>
                          <TableHead className="dark:text-gray-300">
                            Mode
                          </TableHead>
                          <TableHead className="dark:text-gray-300">
                            Reference
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {feeData.payments.map((p, i) => (
                          <TableRow
                            key={p.ref}
                            data-ocid={`student_portal.fees.payment.item.${i + 1}`}
                          >
                            <TableCell>{p.date}</TableCell>
                            <TableCell className="font-semibold">
                              ₹{p.amount.toLocaleString()}
                            </TableCell>
                            <TableCell>{p.mode}</TableCell>
                            <TableCell className="font-mono text-xs">
                              {p.ref}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Academic Calendar */}
            <TabsContent value="calendar">
              <div className="space-y-3">
                {calendarEvents.map((evt, i) => (
                  <Card
                    key={evt.date}
                    data-ocid={`student_portal.calendar.item.${i + 1}`}
                  >
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className="shrink-0 w-2 h-2 rounded-full bg-black mt-1" />
                      <div className="flex-1">
                        <p className="font-semibold text-sm">{evt.label}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                          {evt.date}
                        </p>
                      </div>
                      <Badge className={calendarColor[evt.type]}>
                        {evt.type}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Course Registration */}
            <TabsContent value="registration">
              <div className="space-y-6">
                {/* Summary cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4 flex items-center gap-3">
                      <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center shrink-0">
                        <CheckCircle2 size={20} className="text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Enrolled Credits
                        </p>
                        <p className="text-2xl font-bold text-black">
                          {totalEnrolledCredits}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center shrink-0">
                        <ClipboardList
                          size={20}
                          className="text-gray-600 dark:text-gray-300"
                        />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Max Credits
                        </p>
                        <p className="text-2xl font-bold text-black">
                          {MAX_CREDITS}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center shrink-0">
                        <Users
                          size={20}
                          className="text-gray-600 dark:text-gray-300"
                        />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Courses Registered
                        </p>
                        <p className="text-2xl font-bold text-black">
                          {courses.length + enrolledCatalogCount}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Credit usage bar */}
                <div className="bg-white dark:bg-gray-900 border rounded-lg p-4">
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-2">
                    <span>Credit Load</span>
                    <span>
                      {totalEnrolledCredits} / {MAX_CREDITS} credits used
                    </span>
                  </div>
                  <div className="w-full h-3 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        totalEnrolledCredits >= MAX_CREDITS
                          ? "bg-gray-500"
                          : totalEnrolledCredits >= MAX_CREDITS * 0.8
                            ? "bg-gray-500"
                            : "bg-black"
                      }`}
                      style={{
                        width: `${Math.min(
                          (totalEnrolledCredits / MAX_CREDITS) * 100,
                          100,
                        )}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search
                      size={14}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <Input
                      placeholder="Search by course name, code, or instructor..."
                      className="pl-8"
                      value={regSearch}
                      onChange={(e) => setRegSearch(e.target.value)}
                      data-ocid="registration.search_input"
                    />
                  </div>
                  <Select value={regDept} onValueChange={setRegDept}>
                    <SelectTrigger
                      className="w-full sm:w-44"
                      data-ocid="registration.dept.select"
                    >
                      <SelectValue placeholder="Department" />
                    </SelectTrigger>
                    <SelectContent>
                      {["All", "CS", "MATH", "PHY", "HUM", "ELE"].map((d) => (
                        <SelectItem key={d} value={d}>
                          {d === "All" ? "All Departments" : d}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Course grid */}
                {filteredCatalog.length === 0 ? (
                  <div
                    className="text-center py-12 text-gray-400"
                    data-ocid="registration.empty_state"
                  >
                    <BookOpen size={40} className="mx-auto mb-3 opacity-30" />
                    <p>No courses match your search.</p>
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 gap-4">
                    {filteredCatalog.map((c, i) => {
                      const isEnrolled = enrolledCodes.has(c.code);
                      const wouldExceed =
                        !isEnrolled &&
                        totalEnrolledCredits + c.credits > MAX_CREDITS;
                      return (
                        <Card
                          key={c.code}
                          className={`relative transition-shadow hover:shadow-md ${
                            isEnrolled ? "ring-2 ring-black" : ""
                          }`}
                          data-ocid={`registration.courses.item.${i + 1}`}
                        >
                          <CardHeader className="pb-2">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <p className="text-xs font-mono text-gray-400">
                                    {c.code}
                                  </p>
                                  <Badge
                                    variant="outline"
                                    className="text-xs px-1.5 py-0"
                                  >
                                    {c.department}
                                  </Badge>
                                  {isEnrolled && (
                                    <Badge className="bg-black text-white text-xs px-1.5 py-0">
                                      Enrolled
                                    </Badge>
                                  )}
                                </div>
                                <CardTitle className="text-base mt-1 leading-snug">
                                  {c.name}
                                </CardTitle>
                              </div>
                              <Badge className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 shrink-0">
                                {c.credits} cr
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-2">
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {c.description}
                            </p>
                            <div className="text-xs text-gray-600 dark:text-gray-300 space-y-0.5">
                              <p className="flex items-center gap-1.5">
                                <BookOpen size={11} className="text-gray-400" />
                                {c.instructor}
                              </p>
                              <p className="flex items-center gap-1.5">
                                <Calendar size={11} className="text-gray-400" />
                                {c.schedule} · {c.room}
                              </p>
                              <p className="flex items-center gap-1.5">
                                <Users size={11} className="text-gray-400" />
                                {c.seatsAvailable} seats available
                              </p>
                            </div>
                            <div className="pt-1">
                              {isEnrolled ? (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 dark:bg-gray-800 hover:text-gray-700 dark:text-gray-200 w-full"
                                  onClick={() => handleDrop(c.code)}
                                  data-ocid={`registration.courses.delete_button.${i + 1}`}
                                >
                                  Drop Course
                                </Button>
                              ) : (
                                <Button
                                  size="sm"
                                  className={`w-full ${
                                    wouldExceed
                                      ? "bg-gray-200 text-gray-400 cursor-not-allowed hover:bg-gray-200"
                                      : "bg-black text-white hover:bg-gray-800"
                                  }`}
                                  onClick={() =>
                                    handleEnroll(c.code, c.credits)
                                  }
                                  disabled={wouldExceed}
                                  data-ocid={`registration.courses.button.${i + 1}`}
                                >
                                  {wouldExceed
                                    ? `+${c.credits} cr (limit reached)`
                                    : `Enroll · ${c.credits} credits`}
                                </Button>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                )}
              </div>
            </TabsContent>
            <TabsContent value="materials">
              <StudyMaterialsTab />
            </TabsContent>
            <TabsContent value="internships">
              <InternshipTrackerTab />
            </TabsContent>
            <TabsContent value="research">
              <ResearchProjectsTab />
            </TabsContent>
            <TabsContent value="scholarships">
              <ScholarshipsTab />
            </TabsContent>
            <TabsContent value="messages">
              <MessagesPage />
            </TabsContent>
            <TabsContent value="hall-ticket">
              <HallTicketTab studentName={studentName} />
            </TabsContent>
            <TabsContent value="clubs">
              <ClubsPage />
            </TabsContent>
            <TabsContent value="forums">
              <ForumsPage />
            </TabsContent>
            <TabsContent value="transcript">
              <TranscriptTab studentName={studentName} />
            </TabsContent>
          </Tabs>
        </main>
      </div>
      {/* College Payment Modal */}
      <Dialog
        open={payTarget !== null}
        onOpenChange={(o) => {
          if (!o) handleCollegePayClose(false);
        }}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {payStep === "success"
                ? "Payment Successful"
                : "Pay Semester Fee"}
            </DialogTitle>
          </DialogHeader>
          {payStep === "form" && (
            <div className="space-y-4 py-2">
              <div>
                <Label htmlFor="col-card-name">Cardholder Name</Label>
                <Input
                  id="col-card-name"
                  placeholder="Name on card"
                  className="mt-1"
                  value={payCard.name}
                  onChange={(e) =>
                    setPayCard((p) => ({ ...p, name: e.target.value }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="col-card-number">Card Number</Label>
                <Input
                  id="col-card-number"
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
                  <Label htmlFor="col-card-expiry">Expiry (MM/YY)</Label>
                  <Input
                    id="col-card-expiry"
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
                  <Label htmlFor="col-card-cvv">CVV</Label>
                  <Input
                    id="col-card-cvv"
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
              {payTarget && (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Semester: <strong>{payTarget}</strong>
                  <br />
                  Amount:{" "}
                  <strong>
                    ₹
                    {feeBreakdown
                      .find((r) => r.semester === payTarget)
                      ?.amount.toLocaleString()}
                  </strong>
                </p>
              )}
              <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                <span className="border rounded px-1.5 py-0.5 font-mono">
                  Powered by Stripe
                </span>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => handleCollegePayClose(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={handleCollegePay}
                  data-ocid="college.fees.confirm_button"
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
                ₹
                {feeBreakdown
                  .find((r) => r.semester === payTarget)
                  ?.amount.toLocaleString()}{" "}
                paid for {payTarget}
              </p>
              <span className="border rounded px-2 py-0.5 text-xs font-mono text-gray-400">
                Powered by Stripe
              </span>
              <Button
                className="bg-black text-white hover:bg-gray-900 mt-2"
                onClick={() => handleCollegePayClose(true)}
                data-ocid="college.fees.done_button"
              >
                Done
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* GPA CALCULATOR */}
      <TabsContent value="gpa">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>GPA Calculator</CardTitle>
              <div className="text-right">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Calculated GPA
                </p>
                <p className="text-3xl font-bold">{computedGpa}</p>
                <p className="text-xs text-gray-400">out of 10.00</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="dark:text-gray-300">Course</TableHead>
                  <TableHead className="text-center">Credits</TableHead>
                  <TableHead className="text-center">Grade</TableHead>
                  <TableHead className="text-center">Points</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {gpaRows.map((row, i) => (
                  <TableRow
                    key={row.code}
                    data-ocid={`student_portal.gpa.item.${i + 1}`}
                  >
                    <TableCell className="font-medium text-sm">
                      {row.name}
                    </TableCell>
                    <TableCell className="text-center text-sm">
                      {row.credits}
                    </TableCell>
                    <TableCell className="text-center">
                      <select
                        className="text-sm border border-border rounded px-2 py-0.5 bg-background"
                        value={row.grade}
                        onChange={(e) =>
                          setGpaRows((prev) =>
                            prev.map((r, j) =>
                              j === i ? { ...r, grade: e.target.value } : r,
                            ),
                          )
                        }
                        data-ocid={`student_portal.gpa.grade_select.${i + 1}`}
                      >
                        {Object.keys(gpaGrades).map((g) => (
                          <option key={g}>{g}</option>
                        ))}
                      </select>
                    </TableCell>
                    <TableCell className="text-center text-sm font-semibold">
                      {((gpaGrades[row.grade] || 0) * row.credits).toFixed(1)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>

      {/* CAMPUS RSVP */}
      <TabsContent value="campus-rsvp">
        <div className="space-y-4">
          <h2 className="text-lg font-bold">Campus Events</h2>
          {campusEvents.map((ev, i) => (
            <Card
              key={ev.id}
              data-ocid={`student_portal.campus_rsvp.item.${i + 1}`}
            >
              <CardContent className="pt-4 flex items-center justify-between">
                <div>
                  <p className="font-semibold">{ev.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {ev.date} · {ev.venue}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {ev.seats} seats available
                  </p>
                </div>
                {rsvpSet.has(ev.id) ? (
                  <Badge className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                    Registered ✓
                  </Badge>
                ) : (
                  <Button
                    size="sm"
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                    onClick={() =>
                      setRsvpSet((prev) => {
                        const n = new Set(prev);
                        n.add(ev.id);
                        return n;
                      })
                    }
                    data-ocid={`student_portal.campus_rsvp.button.${i + 1}`}
                  >
                    RSVP
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>

      {/* GRIEVANCE */}
      <TabsContent value="grievance">
        <div className="space-y-4">
          <Card>
            <CardContent className="pt-5 space-y-3">
              <h3 className="font-semibold">Submit Grievance</h3>
              <div>
                <Label className="text-xs text-gray-500 dark:text-gray-400">
                  Category
                </Label>
                <select
                  className="w-full mt-1 text-sm border border-border rounded-md px-3 py-1.5 bg-background"
                  value={grievanceForm.category}
                  onChange={(e) =>
                    setGrievanceForm((p) => ({
                      ...p,
                      category: e.target.value,
                    }))
                  }
                  data-ocid="student_portal.grievance.category_select"
                >
                  {[
                    "Academic",
                    "Administrative",
                    "Infrastructure",
                    "Other",
                  ].map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label className="text-xs text-gray-500 dark:text-gray-400">
                  Description
                </Label>
                <textarea
                  className="w-full mt-1 text-sm border border-border rounded-md px-3 py-1.5 bg-background resize-none"
                  rows={4}
                  value={grievanceForm.desc}
                  onChange={(e) =>
                    setGrievanceForm((p) => ({ ...p, desc: e.target.value }))
                  }
                  placeholder="Describe your grievance in detail..."
                  data-ocid="student_portal.grievance.textarea"
                />
              </div>
              <Button
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={() => {
                  if (!grievanceForm.desc) return;
                  setGrievances((prev) => [
                    ...prev,
                    {
                      id: Date.now(),
                      category: grievanceForm.category,
                      desc: grievanceForm.desc,
                      status: "Pending",
                    },
                  ]);
                  setGrievanceForm((p) => ({ ...p, desc: "" }));
                }}
                data-ocid="student_portal.grievance.submit_button"
              >
                Submit Grievance
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-5">
              <h3 className="font-semibold mb-3">My Grievances</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="dark:text-gray-300">
                      Category
                    </TableHead>
                    <TableHead className="dark:text-gray-300">
                      Description
                    </TableHead>
                    <TableHead className="dark:text-gray-300">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {grievances.map((g, i) => (
                    <TableRow
                      key={g.id}
                      data-ocid={`student_portal.grievance.item.${i + 1}`}
                    >
                      <TableCell className="text-sm">{g.category}</TableCell>
                      <TableCell className="text-sm max-w-[200px] truncate">
                        {g.desc}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            g.status === "Resolved"
                              ? "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
                              : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
                          }
                        >
                          {g.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      {/* COURSE REQUESTS */}
      <TabsContent value="course-requests">
        <div className="space-y-4">
          <div className="flex gap-2">
            <Button
              size="sm"
              variant={courseReqTab === "add" ? "default" : "outline"}
              className={courseReqTab === "add" ? "bg-black text-white" : ""}
              onClick={() => setCourseReqTab("add")}
              data-ocid="student_portal.course_requests.add_tab"
            >
              Add Request
            </Button>
            <Button
              size="sm"
              variant={courseReqTab === "drop" ? "default" : "outline"}
              className={courseReqTab === "drop" ? "bg-black text-white" : ""}
              onClick={() => setCourseReqTab("drop")}
              data-ocid="student_portal.course_requests.drop_tab"
            >
              Drop Request
            </Button>
          </div>
          <Card>
            <CardContent className="pt-5 space-y-3">
              <h3 className="font-semibold">
                {courseReqTab === "add"
                  ? "Add Course Request"
                  : "Drop Course Request"}
              </h3>
              <div>
                <Label className="text-xs text-gray-500 dark:text-gray-400">
                  Course
                </Label>
                <select
                  className="w-full mt-1 text-sm border border-border rounded-md px-3 py-1.5 bg-background"
                  value={courseReqForm.course}
                  onChange={(e) =>
                    setCourseReqForm((p) => ({ ...p, course: e.target.value }))
                  }
                  data-ocid="student_portal.course_requests.course_select"
                >
                  <option value="">Select course...</option>
                  {courses.map((c) => (
                    <option key={c.code} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label className="text-xs text-gray-500 dark:text-gray-400">
                  Reason
                </Label>
                <textarea
                  className="w-full mt-1 text-sm border border-border rounded-md px-3 py-1.5 bg-background resize-none"
                  rows={3}
                  value={courseReqForm.reason}
                  onChange={(e) =>
                    setCourseReqForm((p) => ({ ...p, reason: e.target.value }))
                  }
                  placeholder="Reason for request..."
                  data-ocid="student_portal.course_requests.reason_textarea"
                />
              </div>
              <Button
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={() => {
                  if (!courseReqForm.course) return;
                  setCourseRequests((prev) => [
                    ...prev,
                    {
                      id: Date.now(),
                      type: courseReqTab === "add" ? "Add" : "Drop",
                      course: courseReqForm.course,
                      reason: courseReqForm.reason,
                      status: "Pending",
                    },
                  ]);
                  setCourseReqForm({ course: "", reason: "" });
                }}
                data-ocid="student_portal.course_requests.submit_button"
              >
                Submit Request
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-5">
              <h3 className="font-semibold mb-3">Pending Requests</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="dark:text-gray-300">Type</TableHead>
                    <TableHead className="dark:text-gray-300">Course</TableHead>
                    <TableHead className="dark:text-gray-300">Reason</TableHead>
                    <TableHead className="dark:text-gray-300">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {courseRequests.map((r, i) => (
                    <TableRow
                      key={r.id}
                      data-ocid={`student_portal.course_requests.item.${i + 1}`}
                    >
                      <TableCell>
                        <Badge
                          className={
                            r.type === "Add"
                              ? "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
                              : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
                          }
                        >
                          {r.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">{r.course}</TableCell>
                      <TableCell className="text-sm text-gray-500 dark:text-gray-400 max-w-[150px] truncate">
                        {r.reason}
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                          {r.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <SmartAssistant onNavigate={handleChatNavigate} currentPortal="college" />
    </div>
  );
}

// ─── Hall Ticket Tab ───────────────────────────────────────────────────────
function HallTicketTab({ studentName }: { studentName?: string }) {
  const { t } = useLanguage();
  const examSchedule = [
    {
      subject: "Machine Learning",
      date: "2026-04-10",
      time: "10:00 AM – 1:00 PM",
      hall: "Hall A, Room 101",
    },
    {
      subject: "Computer Networks",
      date: "2026-04-12",
      time: "10:00 AM – 1:00 PM",
      hall: "Hall B, Room 205",
    },
    {
      subject: "Advanced Mathematics",
      date: "2026-04-14",
      time: "2:00 PM – 5:00 PM",
      hall: "Hall A, Room 103",
    },
    {
      subject: "Software Engineering",
      date: "2026-04-16",
      time: "10:00 AM – 1:00 PM",
      hall: "Hall C, Room 301",
    },
    {
      subject: "Technical Communication",
      date: "2026-04-18",
      time: "10:00 AM – 12:00 PM",
      hall: "Hall B, Room 202",
    },
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <div
        className="border-2 border-black rounded-xl overflow-hidden print:shadow-none"
        id="hall-ticket"
      >
        {/* Header */}
        <div className="bg-black text-white px-8 py-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-full bg-white dark:bg-gray-900 flex items-center justify-center">
              <GraduationCap size={22} className="text-black" />
            </div>
            <div>
              <h2 className="text-xl font-bold">EduManage University</h2>
              <p className="text-gray-300 text-xs">
                Accredited A++ Grade Institution
              </p>
            </div>
          </div>
          <p className="text-sm text-gray-300 mt-1">
            End Semester Examination — April 2026
          </p>
        </div>

        {/* Admit Card Header */}
        <div className="bg-gray-50 dark:bg-gray-800 px-8 py-3 border-b border-gray-200 dark:border-gray-700">
          <p className="text-center text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-widest">
            Examination Admit Card
          </p>
        </div>

        {/* Student Details */}
        <div className="px-8 py-5 grid grid-cols-2 gap-4 border-b border-gray-200 dark:border-gray-700">
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
              Student Name
            </p>
            <p className="font-bold text-black">
              {studentName || "Arjun Sharma"}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
              Roll Number
            </p>
            <p className="font-bold text-black">EMU/2023/CS/0147</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
              Programme
            </p>
            <p className="font-semibold">B.Tech. Computer Science</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
              Semester
            </p>
            <p className="font-semibold">6th Semester</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
              {t("academicYear")}
            </p>
            <p className="font-semibold">2025–2026</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
              Exam Centre
            </p>
            <p className="font-semibold">Main Campus, Block A</p>
          </div>
        </div>

        {/* Exam Schedule */}
        <div className="px-8 py-5 border-b border-gray-200 dark:border-gray-700">
          <p className="text-sm font-bold text-black mb-3">
            Examination Schedule
          </p>
          <table className="w-full text-sm border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700">
                <th className="text-left px-3 py-2 text-xs font-semibold text-gray-600 dark:text-gray-300">
                  Subject
                </th>
                <th className="text-left px-3 py-2 text-xs font-semibold text-gray-600 dark:text-gray-300">
                  Date
                </th>
                <th className="text-left px-3 py-2 text-xs font-semibold text-gray-600 dark:text-gray-300">
                  Time
                </th>
                <th className="text-left px-3 py-2 text-xs font-semibold text-gray-600 dark:text-gray-300">
                  Venue
                </th>
              </tr>
            </thead>
            <tbody>
              {examSchedule.map((e, i) => (
                <tr
                  key={e.subject}
                  className={
                    i % 2 === 0
                      ? "bg-white dark:bg-gray-900"
                      : "bg-gray-50 dark:bg-gray-800"
                  }
                >
                  <td className="px-3 py-2">{e.subject}</td>
                  <td className="px-3 py-2">{e.date}</td>
                  <td className="px-3 py-2 text-xs">{e.time}</td>
                  <td className="px-3 py-2 text-xs text-gray-600 dark:text-gray-300">
                    {e.hall}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Instructions */}
        <div className="px-8 py-5 border-b border-gray-200 dark:border-gray-700">
          <p className="text-sm font-bold text-black mb-2">
            Important Instructions
          </p>
          <ul className="text-xs text-gray-600 dark:text-gray-300 space-y-1 list-disc pl-4">
            <li>
              Bring this admit card and a valid photo ID to the examination
              hall.
            </li>
            <li>Report 30 minutes before the scheduled start time.</li>
            <li>
              Mobile phones and electronic devices are strictly prohibited.
            </li>
            <li>Use only black/blue ballpoint pens for answering.</li>
            <li>
              Admit card without Controller of Examinations signature is
              invalid.
            </li>
          </ul>
        </div>

        {/* Signatures */}
        <div className="px-8 py-4 flex justify-between items-end">
          <div className="text-center">
            <div className="border-t border-gray-400 w-32 mb-1" />
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Student Signature
            </p>
          </div>
          <div className="text-center">
            <div className="border-t border-gray-400 w-40 mb-1" />
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Controller of Examinations
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 text-center print:hidden">
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
          data-ocid="hall_ticket.primary_button"
        >
          Print / Download Hall Ticket
        </button>
      </div>
    </div>
  );
}

// ─── Transcript Tab ───────────────────────────────────────────────────────
function TranscriptTab({ studentName }: { studentName?: string }) {
  const semesters = [
    {
      sem: "Semester 1",
      courses: [
        { name: "Engineering Mathematics I", credits: 4, grade: "A", gp: 9 },
        { name: "Engineering Physics", credits: 3, grade: "A+", gp: 10 },
        { name: "Programming Fundamentals", credits: 4, grade: "A", gp: 9 },
        { name: "Engineering Drawing", credits: 2, grade: "B", gp: 7 },
        { name: "Communication Skills", credits: 2, grade: "A", gp: 9 },
      ],
    },
    {
      sem: "Semester 2",
      courses: [
        { name: "Engineering Mathematics II", credits: 4, grade: "A+", gp: 10 },
        { name: "Data Structures", credits: 4, grade: "A", gp: 9 },
        { name: "Digital Electronics", credits: 3, grade: "B+", gp: 8 },
        { name: "Object Oriented Programming", credits: 4, grade: "A", gp: 9 },
        { name: "Environmental Science", credits: 2, grade: "A", gp: 9 },
      ],
    },
    {
      sem: "Semester 5 (Current)",
      courses: [
        { name: "Machine Learning", credits: 3, grade: "A", gp: 9 },
        { name: "Computer Networks", credits: 3, grade: "B+", gp: 8 },
        { name: "Advanced Mathematics", credits: 4, grade: "A+", gp: 10 },
        { name: "Software Engineering", credits: 3, grade: "A", gp: 9 },
        { name: "Technical Communication", credits: 2, grade: "A", gp: 9 },
      ],
    },
  ];

  const allCourses = semesters.flatMap((s) => s.courses);
  const totalCredits = allCourses.reduce((sum, c) => sum + c.credits, 0);
  const totalPoints = allCourses.reduce((sum, c) => sum + c.credits * c.gp, 0);
  const cgpa = (totalPoints / totalCredits).toFixed(2);

  return (
    <div className="max-w-2xl mx-auto">
      <div
        className="border-2 border-black rounded-xl overflow-hidden"
        id="transcript"
      >
        {/* Header */}
        <div className="bg-black text-white px-8 py-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-1">
            <div className="h-10 w-10 rounded-full bg-white dark:bg-gray-900 flex items-center justify-center">
              <GraduationCap size={22} className="text-black" />
            </div>
            <div>
              <h2 className="text-xl font-bold">EduManage University</h2>
              <p className="text-gray-300 text-xs">
                Official Academic Transcript
              </p>
            </div>
          </div>
        </div>

        {/* Student Info */}
        <div className="px-8 py-5 grid grid-cols-2 gap-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Student Name
            </p>
            <p className="font-bold text-black">
              {studentName || "Arjun Sharma"}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Roll Number
            </p>
            <p className="font-bold">EMU/2023/CS/0147</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Programme
            </p>
            <p className="font-semibold">B.Tech. Computer Science</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Date of Issue
            </p>
            <p className="font-semibold">24 March 2026</p>
          </div>
        </div>

        {/* Semester Tables */}
        <div className="px-8 py-5 space-y-5">
          {semesters.map((sem) => {
            const semCredits = sem.courses.reduce((s, c) => s + c.credits, 0);
            const semPoints = sem.courses.reduce(
              (s, c) => s + c.credits * c.gp,
              0,
            );
            const sgpa = (semPoints / semCredits).toFixed(2);
            return (
              <div key={sem.sem}>
                <p className="text-sm font-bold text-black mb-2">{sem.sem}</p>
                <table className="w-full text-sm border border-gray-200 dark:border-gray-700 rounded overflow-hidden">
                  <thead>
                    <tr className="bg-gray-100 dark:bg-gray-700">
                      <th className="text-left px-3 py-2 text-xs text-gray-600 dark:text-gray-300">
                        Course
                      </th>
                      <th className="text-center px-3 py-2 text-xs text-gray-600 dark:text-gray-300">
                        Credits
                      </th>
                      <th className="text-center px-3 py-2 text-xs text-gray-600 dark:text-gray-300">
                        Grade
                      </th>
                      <th className="text-center px-3 py-2 text-xs text-gray-600 dark:text-gray-300">
                        Grade Points
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sem.courses.map((c, ci) => (
                      <tr
                        key={c.name}
                        className={
                          ci % 2 === 0
                            ? "bg-white dark:bg-gray-900"
                            : "bg-gray-50 dark:bg-gray-800"
                        }
                      >
                        <td className="px-3 py-2">{c.name}</td>
                        <td className="px-3 py-2 text-center">{c.credits}</td>
                        <td className="px-3 py-2 text-center font-semibold">
                          {c.grade}
                        </td>
                        <td className="px-3 py-2 text-center">{c.gp}</td>
                      </tr>
                    ))}
                    <tr className="bg-gray-100 dark:bg-gray-700 font-semibold">
                      <td className="px-3 py-2 text-xs text-gray-600 dark:text-gray-300">
                        SGPA
                      </td>
                      <td className="px-3 py-2 text-center">{semCredits}</td>
                      <td
                        colSpan={2}
                        className="px-3 py-2 text-center text-black"
                      >
                        {sgpa}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            );
          })}
        </div>

        {/* CGPA Summary */}
        <div className="px-8 py-5 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-black">
              Cumulative GPA (CGPA)
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Based on {totalCredits} total credits
            </p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-black">{cgpa}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              out of 10.00
            </p>
          </div>
        </div>

        {/* Signatures */}
        <div className="px-8 py-4 flex justify-between items-end border-t border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <div className="border-t border-gray-400 w-32 mb-1" />
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Dean of Academics
            </p>
          </div>
          <div className="text-center">
            <div className="border-t border-gray-400 w-40 mb-1" />
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Registrar
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 text-center print:hidden">
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
          data-ocid="transcript.primary_button"
        >
          Print / Download Transcript
        </button>
      </div>
    </div>
  );
}
