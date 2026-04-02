import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  BookMarked,
  BookOpen,
  Briefcase,
  Clock,
  FileText,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  Search,
  Users,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { SmartAssistant } from "../components/SmartAssistant";
import ClubsPage from "./ClubsPage";
import ForumsPage from "./ForumsPage";
import MessagesPage from "./MessagesPage";
import QuestionPaperPage from "./QuestionPaperPage";

type Props = {
  onLogout: () => void;
  facultyName?: string;
  department?: string;
};

const myCourses = [
  {
    code: "CS401",
    name: "Machine Learning",
    enrolled: 38,
    schedule: "Mon/Wed 9:00-10:30am",
    room: "CS-301",
    semester: "Spring 2026",
  },
  {
    code: "CS312",
    name: "Data Structures & Algorithms",
    enrolled: 45,
    schedule: "Tue/Thu 11:00am-12:30pm",
    room: "CS-205",
    semester: "Spring 2026",
  },
  {
    code: "CS501",
    name: "Deep Learning",
    enrolled: 22,
    schedule: "Fri 2:00-5:00pm",
    room: "CS-LAB-2",
    semester: "Spring 2026",
  },
  {
    code: "CS201",
    name: "Introduction to Programming",
    enrolled: 60,
    schedule: "Mon/Wed/Fri 8:00-9:00am",
    room: "CS-101",
    semester: "Spring 2026",
  },
];

const rosterData: Record<
  string,
  { name: string; id: string; attendance: number; grade: string }[]
> = {
  CS401: [
    { name: "Aryan Kapoor", id: "CS-2021-001", attendance: 92, grade: "A" },
    { name: "Sneha Patel", id: "ME-2023-003", attendance: 88, grade: "A-" },
    { name: "Vikram Singh", id: "CS-2020-045", attendance: 75, grade: "B+" },
    { name: "Divya Nair", id: "CS-2023-021", attendance: 95, grade: "A" },
  ],
  CS312: [
    { name: "Karan Joshi", id: "EE-2022-008", attendance: 80, grade: "B" },
    { name: "Priya Sharma", id: "BBA-2022-012", attendance: 70, grade: "C" },
    { name: "Rohan Mehta", id: "CE-2021-007", attendance: 85, grade: "B+" },
  ],
  CS501: [
    { name: "Aryan Kapoor", id: "CS-2021-001", attendance: 100, grade: "A" },
    { name: "Vikram Singh", id: "CS-2020-045", attendance: 90, grade: "B+" },
  ],
  CS201: [
    { name: "Divya Nair", id: "CS-2023-021", attendance: 98, grade: "A" },
    { name: "Sneha Patel", id: "ME-2023-003", attendance: 94, grade: "A-" },
    { name: "Karan Joshi", id: "EE-2022-008", attendance: 87, grade: "B" },
    { name: "Priya Sharma", id: "BBA-2022-012", attendance: 91, grade: "B+" },
  ],
};

type Assignment = {
  id: number;
  course: string;
  title: string;
  dueDate: string;
  description: string;
  submissions: number;
};

const initialAssignments: Assignment[] = [
  {
    id: 1,
    course: "CS401",
    title: "Neural Network from Scratch",
    dueDate: "2026-03-28",
    description: "Implement a 3-layer neural network using numpy only.",
    submissions: 30,
  },
  {
    id: 2,
    course: "CS312",
    title: "Graph Traversal Problems",
    dueDate: "2026-03-25",
    description: "Solve 5 BFS/DFS problems on provided graph datasets.",
    submissions: 38,
  },
  {
    id: 3,
    course: "CS501",
    title: "CNN Image Classifier",
    dueDate: "2026-04-05",
    description: "Train a CNN on CIFAR-10 and report accuracy above 80%.",
    submissions: 15,
  },
];

const gradeOptions = ["A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D", "F"];

type EnrolledStudent = {
  name: string;
  studentId: string;
  program: string;
  semester: string;
  enrolledDate: string;
  status: "Active" | "Dropped" | "Waitlisted";
};

const enrollmentData: Record<string, EnrolledStudent[]> = {
  CS401: [
    {
      name: "Aryan Kapoor",
      studentId: "CS-2021-001",
      program: "B.Tech Computer Science",
      semester: "7th",
      enrolledDate: "2026-01-10",
      status: "Active",
    },
    {
      name: "Sneha Patel",
      studentId: "ME-2023-003",
      program: "B.Tech Mechanical",
      semester: "5th",
      enrolledDate: "2026-01-10",
      status: "Active",
    },
    {
      name: "Vikram Singh",
      studentId: "CS-2020-045",
      program: "B.Tech Computer Science",
      semester: "9th",
      enrolledDate: "2026-01-11",
      status: "Active",
    },
    {
      name: "Divya Nair",
      studentId: "CS-2023-021",
      program: "B.Tech Computer Science",
      semester: "5th",
      enrolledDate: "2026-01-12",
      status: "Active",
    },
    {
      name: "Rahul Gupta",
      studentId: "EE-2022-009",
      program: "B.Tech Electrical",
      semester: "5th",
      enrolledDate: "2026-01-13",
      status: "Active",
    },
    {
      name: "Anjali Mehta",
      studentId: "CS-2022-034",
      program: "B.Tech Computer Science",
      semester: "5th",
      enrolledDate: "2026-01-14",
      status: "Waitlisted",
    },
    {
      name: "Saurav Bose",
      studentId: "ME-2021-017",
      program: "B.Tech Mechanical",
      semester: "7th",
      enrolledDate: "2026-01-15",
      status: "Active",
    },
    {
      name: "Riya Sharma",
      studentId: "CS-2023-056",
      program: "B.Tech Computer Science",
      semester: "3rd",
      enrolledDate: "2026-01-15",
      status: "Dropped",
    },
    {
      name: "Nikhil Verma",
      studentId: "CE-2022-011",
      program: "B.Tech Civil",
      semester: "5th",
      enrolledDate: "2026-01-16",
      status: "Active",
    },
    {
      name: "Pooja Agarwal",
      studentId: "CS-2021-072",
      program: "B.Tech Computer Science",
      semester: "7th",
      enrolledDate: "2026-01-17",
      status: "Active",
    },
  ],
  CS312: [
    {
      name: "Karan Joshi",
      studentId: "EE-2022-008",
      program: "B.Tech Electrical",
      semester: "5th",
      enrolledDate: "2026-01-10",
      status: "Active",
    },
    {
      name: "Priya Sharma",
      studentId: "BBA-2022-012",
      program: "BBA",
      semester: "5th",
      enrolledDate: "2026-01-10",
      status: "Active",
    },
    {
      name: "Rohan Mehta",
      studentId: "CE-2021-007",
      program: "B.Tech Civil",
      semester: "7th",
      enrolledDate: "2026-01-11",
      status: "Active",
    },
    {
      name: "Amita Rao",
      studentId: "CS-2023-041",
      program: "B.Tech Computer Science",
      semester: "3rd",
      enrolledDate: "2026-01-12",
      status: "Active",
    },
    {
      name: "Dev Patel",
      studentId: "ME-2022-028",
      program: "B.Tech Mechanical",
      semester: "5th",
      enrolledDate: "2026-01-13",
      status: "Active",
    },
    {
      name: "Sunita Kumari",
      studentId: "CS-2022-019",
      program: "B.Tech Computer Science",
      semester: "5th",
      enrolledDate: "2026-01-14",
      status: "Waitlisted",
    },
    {
      name: "Harsh Tiwari",
      studentId: "EE-2021-033",
      program: "B.Tech Electrical",
      semester: "7th",
      enrolledDate: "2026-01-15",
      status: "Active",
    },
    {
      name: "Meghna Desai",
      studentId: "CS-2023-068",
      program: "B.Tech Computer Science",
      semester: "3rd",
      enrolledDate: "2026-01-15",
      status: "Dropped",
    },
    {
      name: "Tanya Singh",
      studentId: "BBA-2023-005",
      program: "BBA",
      semester: "3rd",
      enrolledDate: "2026-01-16",
      status: "Active",
    },
    {
      name: "Arun Nanda",
      studentId: "CE-2022-044",
      program: "B.Tech Civil",
      semester: "5th",
      enrolledDate: "2026-01-17",
      status: "Active",
    },
    {
      name: "Kriti Malhotra",
      studentId: "CS-2021-088",
      program: "B.Tech Computer Science",
      semester: "7th",
      enrolledDate: "2026-01-18",
      status: "Active",
    },
    {
      name: "Yash Bhatt",
      studentId: "ME-2023-014",
      program: "B.Tech Mechanical",
      semester: "3rd",
      enrolledDate: "2026-01-18",
      status: "Active",
    },
  ],
  CS501: [
    {
      name: "Aryan Kapoor",
      studentId: "CS-2021-001",
      program: "B.Tech Computer Science",
      semester: "7th",
      enrolledDate: "2026-01-10",
      status: "Active",
    },
    {
      name: "Vikram Singh",
      studentId: "CS-2020-045",
      program: "B.Tech Computer Science",
      semester: "9th",
      enrolledDate: "2026-01-10",
      status: "Active",
    },
    {
      name: "Ritika Sen",
      studentId: "CS-2021-055",
      program: "B.Tech Computer Science",
      semester: "7th",
      enrolledDate: "2026-01-11",
      status: "Active",
    },
    {
      name: "Sahil Choudhary",
      studentId: "CS-2020-062",
      program: "B.Tech Computer Science",
      semester: "9th",
      enrolledDate: "2026-01-12",
      status: "Active",
    },
    {
      name: "Neha Kapoor",
      studentId: "CS-2021-037",
      program: "B.Tech Computer Science",
      semester: "7th",
      enrolledDate: "2026-01-12",
      status: "Active",
    },
    {
      name: "Mohit Taneja",
      studentId: "CS-2022-009",
      program: "M.Tech AI",
      semester: "3rd",
      enrolledDate: "2026-01-13",
      status: "Active",
    },
    {
      name: "Payal Sharma",
      studentId: "CS-2022-031",
      program: "M.Tech AI",
      semester: "3rd",
      enrolledDate: "2026-01-13",
      status: "Waitlisted",
    },
    {
      name: "Vishal Kumar",
      studentId: "CS-2021-093",
      program: "B.Tech Computer Science",
      semester: "7th",
      enrolledDate: "2026-01-14",
      status: "Active",
    },
  ],
  CS201: [
    {
      name: "Divya Nair",
      studentId: "CS-2023-021",
      program: "B.Tech Computer Science",
      semester: "1st",
      enrolledDate: "2026-01-10",
      status: "Active",
    },
    {
      name: "Sneha Patel",
      studentId: "ME-2023-003",
      program: "B.Tech Mechanical",
      semester: "1st",
      enrolledDate: "2026-01-10",
      status: "Active",
    },
    {
      name: "Karan Joshi",
      studentId: "EE-2022-008",
      program: "B.Tech Electrical",
      semester: "1st",
      enrolledDate: "2026-01-11",
      status: "Active",
    },
    {
      name: "Priya Sharma",
      studentId: "BBA-2022-012",
      program: "BBA",
      semester: "1st",
      enrolledDate: "2026-01-11",
      status: "Active",
    },
    {
      name: "Akash Malviya",
      studentId: "CE-2023-006",
      program: "B.Tech Civil",
      semester: "1st",
      enrolledDate: "2026-01-12",
      status: "Active",
    },
    {
      name: "Swati Dubey",
      studentId: "CS-2023-047",
      program: "B.Tech Computer Science",
      semester: "1st",
      enrolledDate: "2026-01-12",
      status: "Active",
    },
    {
      name: "Manish Jha",
      studentId: "EE-2023-022",
      program: "B.Tech Electrical",
      semester: "1st",
      enrolledDate: "2026-01-13",
      status: "Active",
    },
    {
      name: "Roshni Gupta",
      studentId: "ME-2023-039",
      program: "B.Tech Mechanical",
      semester: "1st",
      enrolledDate: "2026-01-13",
      status: "Active",
    },
    {
      name: "Tarun Mishra",
      studentId: "CS-2023-058",
      program: "B.Tech Computer Science",
      semester: "1st",
      enrolledDate: "2026-01-14",
      status: "Waitlisted",
    },
    {
      name: "Isha Goyal",
      studentId: "BBA-2023-011",
      program: "BBA",
      semester: "1st",
      enrolledDate: "2026-01-14",
      status: "Active",
    },
    {
      name: "Suraj Pathak",
      studentId: "CE-2023-015",
      program: "B.Tech Civil",
      semester: "1st",
      enrolledDate: "2026-01-15",
      status: "Active",
    },
    {
      name: "Kavya Iyer",
      studentId: "CS-2023-071",
      program: "B.Tech Computer Science",
      semester: "1st",
      enrolledDate: "2026-01-15",
      status: "Active",
    },
    {
      name: "Abhishek Roy",
      studentId: "EE-2023-030",
      program: "B.Tech Electrical",
      semester: "1st",
      enrolledDate: "2026-01-16",
      status: "Dropped",
    },
  ],
};

// ==================== PUBLICATIONS TAB ====================
type PubStatus = "Published" | "Under Review" | "Draft";
const initialPublications = [
  {
    title: "Deep Learning for Medical Image Segmentation",
    journal: "IEEE Transactions on Medical Imaging",
    year: 2025,
    coAuthors: "Dr. Priya Singh, Prof. Suresh Nair",
    status: "Published" as PubStatus,
  },
  {
    title: "Federated Learning in Edge Computing Networks",
    journal: "ACM SIGCOMM Conference",
    year: 2025,
    coAuthors: "Mr. Deepak Malhotra",
    status: "Published" as PubStatus,
  },
  {
    title: "Explainable AI for Credit Risk Assessment",
    journal: "Journal of Financial Data Science",
    year: 2026,
    coAuthors: "Prof. Lakshmi Rajan",
    status: "Under Review" as PubStatus,
  },
  {
    title: "Quantum-Resistant Cryptography Algorithms",
    journal: "IACR Crypto Conference",
    year: 2026,
    coAuthors: "Dr. Amit Verma, Prof. Ramesh Kumar",
    status: "Under Review" as PubStatus,
  },
  {
    title: "Sustainable Computing Frameworks",
    journal: "ACM Computing Surveys",
    year: 2026,
    coAuthors: "Solo",
    status: "Draft" as PubStatus,
  },
];

const pubStatusColors: Record<PubStatus, string> = {
  Published:
    "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800",
  "Under Review":
    "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800",
  Draft:
    "bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600",
};

function PublicationsTab() {
  const { t } = useLanguage();
  const [pubs, setPubs] = useState(initialPublications);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: "",
    journal: "",
    year: new Date().getFullYear(),
    coAuthors: "",
    status: "Draft" as PubStatus,
  });

  const addPub = () => {
    if (!form.title || !form.journal) {
      toast.error("Title and journal are required");
      return;
    }
    setPubs((prev) => [...prev, { ...form }]);
    setForm({
      title: "",
      journal: "",
      year: new Date().getFullYear(),
      coAuthors: "",
      status: "Draft",
    });
    setShowForm(false);
    toast.success("Publication added!");
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-base font-semibold">Research & Publications</h3>
        <Button
          size="sm"
          className="bg-primary text-primary-foreground hover:bg-primary/90"
          onClick={() => setShowForm((v) => !v)}
          data-ocid="publications.open_modal_button"
        >
          + Add Publication
        </Button>
      </div>
      {showForm && (
        <Card
          className="border border-gray-200 dark:border-gray-700 p-4"
          data-ocid="publications.modal"
        >
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="col-span-2">
              <div className="text-xs font-medium">Title *</div>
              <input
                className="border rounded px-2 py-1 text-sm w-full mt-1 focus:outline-none focus:ring-1 focus:ring-black"
                value={form.title}
                onChange={(e) =>
                  setForm((p) => ({ ...p, title: e.target.value }))
                }
                data-ocid="publications.input"
              />
            </div>
            <div>
              <div className="text-xs font-medium">Journal/Conference *</div>
              <input
                className="border rounded px-2 py-1 text-sm w-full mt-1 focus:outline-none focus:ring-1 focus:ring-black"
                value={form.journal}
                onChange={(e) =>
                  setForm((p) => ({ ...p, journal: e.target.value }))
                }
              />
            </div>
            <div>
              <div className="text-xs font-medium">Year</div>
              <input
                type="number"
                className="border rounded px-2 py-1 text-sm w-full mt-1 focus:outline-none focus:ring-1 focus:ring-black"
                value={form.year}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    year: Number.parseInt(e.target.value) || p.year,
                  }))
                }
              />
            </div>
            <div>
              <div className="text-xs font-medium">Co-Authors</div>
              <input
                className="border rounded px-2 py-1 text-sm w-full mt-1 focus:outline-none focus:ring-1 focus:ring-black"
                value={form.coAuthors}
                onChange={(e) =>
                  setForm((p) => ({ ...p, coAuthors: e.target.value }))
                }
              />
            </div>
            <div>
              <div className="text-xs font-medium">{t("status")}</div>
              <select
                value={form.status}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    status: e.target.value as PubStatus,
                  }))
                }
                className="border rounded px-2 py-1 text-sm w-full mt-1 focus:outline-none focus:ring-1 focus:ring-black"
              >
                {(["Published", "Under Review", "Draft"] as PubStatus[]).map(
                  (s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ),
                )}
              </select>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={addPub}
              data-ocid="publications.submit_button"
            >
              Add
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowForm(false)}
              data-ocid="publications.cancel_button"
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
              <TableHead className="dark:text-gray-300">Title</TableHead>
              <TableHead className="dark:text-gray-300">
                Journal / Conference
              </TableHead>
              <TableHead className="dark:text-gray-300">Year</TableHead>
              <TableHead className="dark:text-gray-300">Co-Authors</TableHead>
              <TableHead>{t("status")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pubs.map((p, i) => (
              <TableRow key={p.title} data-ocid={`publications.item.${i + 1}`}>
                <TableCell className="font-medium max-w-xs">
                  {p.title}
                </TableCell>
                <TableCell className="text-sm text-gray-600 dark:text-gray-300">
                  {p.journal}
                </TableCell>
                <TableCell>{p.year}</TableCell>
                <TableCell className="text-sm text-gray-600 dark:text-gray-300">
                  {p.coAuthors || "—"}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={pubStatusColors[p.status]}
                  >
                    {p.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

// ==================== OFFICE HOURS TAB ====================
type SlotStatus = "Available" | "Booked";
const initialSlots = [
  {
    day: "Monday",
    time: "10:00–11:00 AM",
    room: "CS-F12",
    status: "Available" as SlotStatus,
  },
  {
    day: "Tuesday",
    time: "2:00–3:00 PM",
    room: "CS-F12",
    status: "Booked" as SlotStatus,
    student: "Arjun Sharma",
  },
  {
    day: "Thursday",
    time: "11:00 AM–12:00 PM",
    room: "Staff Room 3",
    status: "Booked" as SlotStatus,
    student: "Priya Mehta",
  },
  {
    day: "Friday",
    time: "3:00–4:00 PM",
    room: "CS-F12",
    status: "Available" as SlotStatus,
  },
];

function OfficeHoursTab() {
  const { t } = useLanguage();
  const [slots, setSlots] = useState(initialSlots);
  const [editing, setEditing] = useState(false);
  const [editSlot, setEditSlot] = useState({
    day: "Monday",
    time: "",
    room: "",
  });

  const saveEdit = () => {
    if (!editSlot.time || !editSlot.room) {
      toast.error("Time and room are required");
      return;
    }
    setSlots((prev) => [...prev, { ...editSlot, status: "Available" }]);
    setEditing(false);
    setEditSlot({ day: "Monday", time: "", room: "" });
    toast.success("Office hour slot added!");
  };

  const toggleStatus = (i: number) => {
    setSlots((prev) =>
      prev.map((s, idx) =>
        idx === i
          ? { ...s, status: s.status === "Available" ? "Booked" : "Available" }
          : s,
      ),
    );
    toast.success("Slot status updated");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-base font-semibold">Office Hours Schedule</h3>
        <Button
          size="sm"
          className="bg-primary text-primary-foreground hover:bg-primary/90"
          onClick={() => setEditing((v) => !v)}
          data-ocid="officehours.open_modal_button"
        >
          + Add Slot
        </Button>
      </div>
      {editing && (
        <Card
          className="border border-gray-200 dark:border-gray-700 p-4"
          data-ocid="officehours.modal"
        >
          <div className="grid grid-cols-3 gap-3 mb-3">
            <div>
              <div className="text-xs font-medium">Day</div>
              <select
                value={editSlot.day}
                onChange={(e) =>
                  setEditSlot((p) => ({ ...p, day: e.target.value }))
                }
                className="border rounded px-2 py-1 text-sm w-full mt-1 focus:outline-none focus:ring-1 focus:ring-black"
                data-ocid="officehours.select"
              >
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map(
                  (d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ),
                )}
              </select>
            </div>
            <div>
              <div className="text-xs font-medium">Time</div>
              <input
                className="border rounded px-2 py-1 text-sm w-full mt-1 focus:outline-none focus:ring-1 focus:ring-black"
                placeholder="e.g. 10:00–11:00 AM"
                value={editSlot.time}
                onChange={(e) =>
                  setEditSlot((p) => ({ ...p, time: e.target.value }))
                }
                data-ocid="officehours.input"
              />
            </div>
            <div>
              <div className="text-xs font-medium">Room</div>
              <input
                className="border rounded px-2 py-1 text-sm w-full mt-1 focus:outline-none focus:ring-1 focus:ring-black"
                placeholder="e.g. CS-F12"
                value={editSlot.room}
                onChange={(e) =>
                  setEditSlot((p) => ({ ...p, room: e.target.value }))
                }
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={saveEdit}
              data-ocid="officehours.submit_button"
            >
              Add
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setEditing(false)}
              data-ocid="officehours.cancel_button"
            >
              Cancel
            </Button>
          </div>
        </Card>
      )}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="dark:text-gray-300">Day</TableHead>
            <TableHead className="dark:text-gray-300">Time</TableHead>
            <TableHead className="dark:text-gray-300">Room</TableHead>
            <TableHead>{t("status")}</TableHead>
            <TableHead className="dark:text-gray-300">Student</TableHead>
            <TableHead className="dark:text-gray-300">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {slots.map((s, i) => (
            <TableRow
              key={s.day + s.time}
              data-ocid={`officehours.item.${i + 1}`}
            >
              <TableCell className="font-medium">{s.day}</TableCell>
              <TableCell>{s.time}</TableCell>
              <TableCell>{s.room}</TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={
                    s.status === "Available"
                      ? "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400"
                  }
                >
                  {s.status}
                </Badge>
              </TableCell>
              <TableCell className="text-sm text-gray-600 dark:text-gray-300">
                {(s as { student?: string }).student || "—"}
              </TableCell>
              <TableCell>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-xs"
                  onClick={() => toggleStatus(i)}
                  data-ocid={`officehours.toggle.${i + 1}`}
                >
                  Toggle
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

// ==================== LEAVE REQUESTS TAB ====================
type LeaveType = "Casual" | "Medical" | "Duty Leave" | "Conference";
type LeaveStatus = "Pending" | "Approved" | "Rejected";
const initialLeaves = [
  {
    type: "Conference" as LeaveType,
    from: "2026-02-10",
    to: "2026-02-12",
    days: 3,
    reason: "ICML 2026 Conference, New Delhi",
    status: "Approved" as LeaveStatus,
  },
  {
    type: "Medical" as LeaveType,
    from: "2026-01-20",
    to: "2026-01-21",
    days: 2,
    reason: "Annual health check-up",
    status: "Approved" as LeaveStatus,
  },
  {
    type: "Casual" as LeaveType,
    from: "2026-03-05",
    to: "2026-03-05",
    days: 1,
    reason: "Personal work",
    status: "Pending" as LeaveStatus,
  },
  {
    type: "Duty Leave" as LeaveType,
    from: "2026-03-15",
    to: "2026-03-16",
    days: 2,
    reason: "University exam duty",
    status: "Pending" as LeaveStatus,
  },
  {
    type: "Casual" as LeaveType,
    from: "2025-12-26",
    to: "2025-12-26",
    days: 1,
    reason: "Family function",
    status: "Rejected" as LeaveStatus,
  },
];

const leaveStatusColors: Record<LeaveStatus, string> = {
  Pending:
    "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800",
  Approved:
    "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800",
  Rejected:
    "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800",
};

function LeaveRequestsTab() {
  const { t } = useLanguage();
  const [leaves, setLeaves] = useState(initialLeaves);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    type: "Casual" as LeaveType,
    from: "",
    to: "",
    reason: "",
  });

  const submitLeave = () => {
    if (!form.from || !form.to || !form.reason) {
      toast.error("All fields are required");
      return;
    }
    const fromDate = new Date(form.from);
    const toDate = new Date(form.to);
    const days = Math.max(
      1,
      Math.round(
        (toDate.getTime() - fromDate.getTime()) / (1000 * 60 * 60 * 24),
      ) + 1,
    );
    setLeaves((prev) => [...prev, { ...form, days, status: "Pending" }]);
    setForm({ type: "Casual", from: "", to: "", reason: "" });
    setShowForm(false);
    toast.success("Leave request submitted!");
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-base font-semibold">Leave Requests</h3>
        <Button
          size="sm"
          className="bg-primary text-primary-foreground hover:bg-primary/90"
          onClick={() => setShowForm((v) => !v)}
          data-ocid="leave.open_modal_button"
        >
          Apply for Leave
        </Button>
      </div>
      {showForm && (
        <Card
          className="border border-gray-200 dark:border-gray-700 p-4"
          data-ocid="leave.modal"
        >
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <div className="text-xs font-medium">Leave Type</div>
              <select
                value={form.type}
                onChange={(e) =>
                  setForm((p) => ({ ...p, type: e.target.value as LeaveType }))
                }
                className="border rounded px-2 py-1 text-sm w-full mt-1 focus:outline-none focus:ring-1 focus:ring-black"
                data-ocid="leave.select"
              >
                {(
                  [
                    "Casual",
                    "Medical",
                    "Duty Leave",
                    "Conference",
                  ] as LeaveType[]
                ).map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div />
            <div>
              <div className="text-xs font-medium">From Date</div>
              <input
                type="date"
                className="border rounded px-2 py-1 text-sm w-full mt-1 focus:outline-none focus:ring-1 focus:ring-black"
                value={form.from}
                onChange={(e) =>
                  setForm((p) => ({ ...p, from: e.target.value }))
                }
                data-ocid="leave.input"
              />
            </div>
            <div>
              <div className="text-xs font-medium">To Date</div>
              <input
                type="date"
                className="border rounded px-2 py-1 text-sm w-full mt-1 focus:outline-none focus:ring-1 focus:ring-black"
                value={form.to}
                onChange={(e) => setForm((p) => ({ ...p, to: e.target.value }))}
              />
            </div>
            <div className="col-span-2">
              <div className="text-xs font-medium">Reason</div>
              <textarea
                className="border rounded px-2 py-1 text-sm w-full mt-1 focus:outline-none focus:ring-1 focus:ring-black h-20"
                value={form.reason}
                onChange={(e) =>
                  setForm((p) => ({ ...p, reason: e.target.value }))
                }
                data-ocid="leave.textarea"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={submitLeave}
              data-ocid="leave.submit_button"
            >
              Submit
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowForm(false)}
              data-ocid="leave.cancel_button"
            >
              Cancel
            </Button>
          </div>
        </Card>
      )}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t("type")}</TableHead>
            <TableHead className="dark:text-gray-300">From</TableHead>
            <TableHead className="dark:text-gray-300">To</TableHead>
            <TableHead className="dark:text-gray-300">Days</TableHead>
            <TableHead className="dark:text-gray-300">Reason</TableHead>
            <TableHead>{t("status")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leaves.map((l, i) => (
            <TableRow key={l.from + l.type} data-ocid={`leave.item.${i + 1}`}>
              <TableCell>
                <Badge variant="outline" className="text-xs">
                  {l.type}
                </Badge>
              </TableCell>
              <TableCell>{l.from}</TableCell>
              <TableCell>{l.to}</TableCell>
              <TableCell>{l.days}</TableCell>
              <TableCell className="text-sm text-gray-600 dark:text-gray-300 max-w-xs truncate">
                {l.reason}
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={leaveStatusColors[l.status]}
                >
                  {l.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

// ==================== STUDENT FEEDBACK TAB ====================
const feedbackData = [
  {
    course: "CS401 – Machine Learning",
    avgRating: 4.6,
    responses: 35,
    breakdown: [2, 3, 5, 12, 13],
    comments: [
      "Excellent depth on neural networks — real-world examples were very helpful.",
      "Assignments were challenging but fair. Lab sessions could be longer.",
      "Best course this semester. The project work was highly practical.",
    ],
  },
  {
    course: "CS312 – Data Structures & Algorithms",
    avgRating: 4.2,
    responses: 42,
    breakdown: [1, 4, 8, 18, 11],
    comments: [
      "Good explanations but pace was sometimes too fast.",
      "Weekly quizzes helped reinforce the concepts well.",
      "Would appreciate more problem-solving sessions.",
    ],
  },
  {
    course: "CS501 – Advanced Database Systems",
    avgRating: 4.4,
    responses: 28,
    breakdown: [0, 2, 5, 14, 7],
    comments: [
      "Very well organized. SQL optimization examples were great.",
      "Industry case studies added real value to the lectures.",
    ],
  },
];

function StudentFeedbackTab() {
  return (
    <div className="space-y-6">
      <h3 className="text-base font-semibold">Student Feedback Summary</h3>
      {feedbackData.map((f, i) => (
        <Card
          key={f.course}
          className="border border-gray-200 dark:border-gray-700"
          data-ocid={`feedback.item.${i + 1}`}
        >
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-sm font-semibold">
                {f.course}
              </CardTitle>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">
                  {f.avgRating.toFixed(1)}
                </span>
                <div>
                  <div className="text-gray-400 text-base leading-none">
                    {"★".repeat(Math.round(f.avgRating))}
                    {"☆".repeat(5 - Math.round(f.avgRating))}
                  </div>
                  <div className="text-xs text-gray-400">
                    {f.responses} responses
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
                Rating Breakdown
              </div>
              {[5, 4, 3, 2, 1].map((star) => {
                const count = f.breakdown[star - 1];
                const pct =
                  f.responses > 0 ? Math.round((count / f.responses) * 100) : 0;
                return (
                  <div key={star} className="flex items-center gap-2 mb-1">
                    <span className="text-xs w-4 text-gray-500 dark:text-gray-400">
                      {star}★
                    </span>
                    <div className="flex-1 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-black rounded-full transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-400 w-6 text-right">
                      {count}
                    </span>
                  </div>
                );
              })}
            </div>
            <div>
              <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
                Student Comments (Anonymized)
              </div>
              <div className="space-y-2">
                {f.comments.map((c) => (
                  <div
                    key={c.slice(0, 20)}
                    className="text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 rounded px-3 py-2 border-l-2 border-gray-300 dark:border-gray-600"
                  >
                    "{c}"
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default function FacultyPortal({
  onLogout,
  facultyName = "Dr. Amit Verma",
  department = "Computer Science",
}: Props) {
  const { t } = useLanguage();
  const [selectedRosterCourse, setSelectedRosterCourse] = useState("CS401");
  const [selectedGradeCourse, setSelectedGradeCourse] = useState("CS401");
  const [grades, setGrades] = useState<Record<string, Record<string, string>>>(
    () => {
      const init: Record<string, Record<string, string>> = {};
      for (const [course, students] of Object.entries(rosterData)) {
        init[course] = {};
        for (const s of students) init[course][s.id] = s.grade;
      }
      return init;
    },
  );
  const [assignments, setAssignments] =
    useState<Assignment[]>(initialAssignments);
  const [newAssignment, setNewAssignment] = useState({
    course: "CS401",
    title: "",
    dueDate: "",
    description: "",
  });

  const [selectedAttCourse, setSelectedAttCourse] = useState("CS401");
  const [attDate, setAttDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [attendance, setAttendance] = useState<
    Record<string, "Present" | "Absent" | "Late">
  >({});

  // Enrollment tab state
  const [selectedEnrollCourse, setSelectedEnrollCourse] = useState("CS401");
  const [enrollSearch, setEnrollSearch] = useState("");

  const handleSaveGrades = () => {
    toast.success(`Grades saved for ${selectedGradeCourse}`);
  };

  const handleAddAssignment = () => {
    if (!newAssignment.title.trim() || !newAssignment.dueDate) {
      toast.error("Please fill in title and due date.");
      return;
    }
    setAssignments((prev) => [
      ...prev,
      { ...newAssignment, id: Date.now(), submissions: 0 },
    ]);
    setNewAssignment({
      course: "CS401",
      title: "",
      dueDate: "",
      description: "",
    });
    toast.success("Assignment created.");
  };

  const handleSubmitAttendance = () => {
    const students = rosterData[selectedAttCourse] ?? [];
    const marked = Object.keys(attendance).length;
    if (marked < students.length) {
      toast.error(
        `Please mark attendance for all ${students.length} students.`,
      );
      return;
    }
    toast.success(
      `Attendance submitted for ${selectedAttCourse} on ${attDate}`,
    );
    setAttendance({});
  };

  const enrolledStudents = enrollmentData[selectedEnrollCourse] ?? [];
  const filteredEnrolled = enrolledStudents.filter(
    (s) =>
      s.name.toLowerCase().includes(enrollSearch.toLowerCase()) ||
      s.studentId.toLowerCase().includes(enrollSearch.toLowerCase()),
  );
  const totalActive = enrolledStudents.filter(
    (s) => s.status === "Active",
  ).length;
  const totalWaitlisted = enrolledStudents.filter(
    (s) => s.status === "Waitlisted",
  ).length;
  const totalDropped = enrolledStudents.filter(
    (s) => s.status === "Dropped",
  ).length;

  const [activeTab, setActiveTab] = useState("courses");

  // Mentorship state
  const [mentees, setMentees] = useState([
    {
      id: 1,
      name: "Arjun Mehta",
      rollNo: "CS2023001",
      attendance: 82,
      gpa: 8.4,
      notes: "",
    },
    {
      id: 2,
      name: "Priya Sharma",
      rollNo: "CS2023015",
      attendance: 91,
      gpa: 9.1,
      notes: "",
    },
    {
      id: 3,
      name: "Rohan Das",
      rollNo: "CS2023028",
      attendance: 74,
      gpa: 7.8,
      notes: "",
    },
  ]);
  const [showAddMentee, setShowAddMentee] = useState(false);
  const [newMentee, setNewMentee] = useState({ name: "", rollNo: "" });
  const [expandedMentee, setExpandedMentee] = useState<number | null>(null);
  // Conference state
  const [conferences] = useState([
    {
      id: 1,
      name: "ICSE 2026 – International Conference on Software Engineering",
      date: "2026-06-15",
      location: "Bengaluru, India",
      deadline: "2026-04-30",
    },
    {
      id: 2,
      name: "IEEE EDUCON 2026 – Education and Engineering",
      date: "2026-07-10",
      location: "Dubai, UAE",
      deadline: "2026-05-15",
    },
    {
      id: 3,
      name: "ACM SIGCSE 2026 – Technical Symposium",
      date: "2026-08-01",
      location: "Portland, USA",
      deadline: "2026-05-30",
    },
    {
      id: 4,
      name: "National Seminar on AI in Education",
      date: "2026-05-25",
      location: "New Delhi, India",
      deadline: "2026-04-15",
    },
    {
      id: 5,
      name: "International Workshop on Cloud Computing",
      date: "2026-09-05",
      location: "Mumbai, India",
      deadline: "2026-06-30",
    },
  ]);
  const [confRegistered, setConfRegistered] = useState<Set<number>>(new Set());
  const [confForms, setConfForms] = useState<
    Record<number, { paperTitle: string; showing: boolean }>
  >({});

  const handleChatNavigate = (page: string) => {
    const tabMap: Record<string, string> = {
      courses: "courses",
      roster: "roster",
      grades: "grades",
      assignments: "assignments",
      attendance: "attendance",
      enrollments: "enrollments",
      publications: "publications",
      officehours: "officehours",
      leave: "leave",
      feedback: "feedback",
      messages: "messages",
      "question-papers": "question-papers",
      forums: "forums",
    };
    if (tabMap[page]) setActiveTab(tabMap[page]);
  };
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-800">
      {/* Header */}
      <header className="bg-black text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Briefcase size={28} />
          <div>
            <h1 className="text-lg font-bold">College Faculty Portal</h1>
            <p className="text-gray-400 text-xs">EduManage University</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="font-semibold text-sm">{facultyName}</p>
            <p className="text-gray-400 text-xs">{department}</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="border-white/30 text-white hover:bg-white dark:bg-gray-900/10 gap-2"
            onClick={onLogout}
            data-ocid="faculty_portal.logout.button"
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
              { value: "roster", label: "Student Roster" },
              { value: "grades", label: "Grade Submission" },
              { value: "assignments", label: "Assignments" },
              { value: "attendance", label: "Attendance" },
              { value: "enrollments", label: "Enrollments" },
              { value: "publications", label: "Publications" },
              { value: "officehours", label: "Office Hours" },
              { value: "leave", label: "Leave Requests" },
              { value: "feedback", label: "Student Feedback" },
              { value: "messages", label: "Messages" },
              { value: "clubs", label: "Clubs & Societies" },
              { value: "mentorship", label: "Mentorship" },
              { value: "conferences", label: "Conferences" },
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
            currentPortal="faculty"
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
                data-ocid="faculty_portal.courses.tab"
              >
                My Courses
              </TabsTrigger>
              <TabsTrigger value="roster" data-ocid="faculty_portal.roster.tab">
                Student Roster
              </TabsTrigger>
              <TabsTrigger value="grades" data-ocid="faculty_portal.grades.tab">
                Grade Submission
              </TabsTrigger>
              <TabsTrigger
                value="assignments"
                data-ocid="faculty_portal.assignments.tab"
              >
                Assignments
              </TabsTrigger>
              <TabsTrigger
                value="attendance"
                data-ocid="faculty_portal.attendance.tab"
              >
                Attendance
              </TabsTrigger>
              <TabsTrigger
                value="enrollments"
                data-ocid="faculty_portal.enrollments.tab"
              >
                Course Enrollments
              </TabsTrigger>
              <TabsTrigger
                value="publications"
                data-ocid="faculty_portal.publications.tab"
              >
                <BookMarked className="h-4 w-4 mr-1" /> Publications
              </TabsTrigger>
              <TabsTrigger
                value="officehours"
                data-ocid="faculty_portal.officehours.tab"
              >
                <Clock className="h-4 w-4 mr-1" /> Office Hours
              </TabsTrigger>
              <TabsTrigger value="leave" data-ocid="faculty_portal.leave.tab">
                <FileText className="h-4 w-4 mr-1" /> Leave Requests
              </TabsTrigger>
              <TabsTrigger
                value="feedback"
                data-ocid="faculty_portal.feedback.tab"
              >
                <MessageSquare className="h-4 w-4 mr-1" /> Feedback
              </TabsTrigger>
              <TabsTrigger
                value="question-papers"
                data-ocid="faculty_portal.question_papers.tab"
              >
                Question Papers
              </TabsTrigger>
              <TabsTrigger value="clubs" data-ocid="faculty_portal.clubs.tab">
                Clubs &amp; Societies
              </TabsTrigger>
              <TabsTrigger value="forums" data-ocid="faculty_portal.forums.tab">
                Forums
              </TabsTrigger>
              <TabsTrigger
                value="messages"
                data-ocid="faculty_portal.messages.tab"
              >
                <Mail size={14} className="mr-1 inline" /> Messages
              </TabsTrigger>
              <TabsTrigger
                value="mentorship"
                data-ocid="faculty_portal.mentorship.tab"
              >
                Mentorship
              </TabsTrigger>
              <TabsTrigger
                value="conferences"
                data-ocid="faculty_portal.conferences.tab"
              >
                Conferences
              </TabsTrigger>
            </TabsList>

            {/* My Courses */}
            <TabsContent value="courses">
              <div className="grid sm:grid-cols-2 gap-4">
                {myCourses.map((c, i) => (
                  <Card
                    key={c.code}
                    data-ocid={`faculty_portal.courses.item.${i + 1}`}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-xs font-mono text-gray-400">
                            {c.code} · {c.semester}
                          </p>
                          <CardTitle className="text-base mt-0.5">
                            {c.name}
                          </CardTitle>
                        </div>
                        <Badge className="bg-blue-600 text-white gap-1">
                          <Users size={10} />
                          {c.enrolled}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                      <p className="flex items-center gap-1.5">
                        <BookOpen size={12} className="text-gray-400" />{" "}
                        {c.schedule}
                      </p>
                      <p className="text-xs text-gray-400">Room: {c.room}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Roster */}
            <TabsContent value="roster">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Label className="shrink-0">Select Course:</Label>
                  <Select
                    value={selectedRosterCourse}
                    onValueChange={setSelectedRosterCourse}
                  >
                    <SelectTrigger
                      className="w-72"
                      data-ocid="faculty_portal.roster.course.select"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {myCourses.map((c) => (
                        <SelectItem key={c.code} value={c.code}>
                          {c.code} – {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Card>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="dark:text-gray-300">
                            Student ID
                          </TableHead>
                          <TableHead>{t("name")}</TableHead>
                          <TableHead className="dark:text-gray-300">
                            Attendance %
                          </TableHead>
                          <TableHead className="dark:text-gray-300">
                            Current Grade
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {(rosterData[selectedRosterCourse] ?? []).map(
                          (s, i) => (
                            <TableRow
                              key={s.id}
                              data-ocid={`faculty_portal.roster.item.${i + 1}`}
                            >
                              <TableCell className="font-mono text-xs">
                                {s.id}
                              </TableCell>
                              <TableCell className="font-medium">
                                {s.name}
                              </TableCell>
                              <TableCell>
                                <span
                                  className={
                                    s.attendance >= 90
                                      ? "text-gray-700 dark:text-gray-200 font-semibold"
                                      : s.attendance >= 75
                                        ? "text-gray-700 dark:text-gray-200 font-semibold"
                                        : "text-gray-700 dark:text-gray-200 font-semibold"
                                  }
                                >
                                  {s.attendance}%
                                </span>
                              </TableCell>
                              <TableCell>
                                <Badge className="bg-black text-white">
                                  {s.grade}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          ),
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Grade Submission */}
            <TabsContent value="grades">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Label className="shrink-0">Select Course:</Label>
                  <Select
                    value={selectedGradeCourse}
                    onValueChange={setSelectedGradeCourse}
                  >
                    <SelectTrigger
                      className="w-72"
                      data-ocid="faculty_portal.grades.course.select"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {myCourses.map((c) => (
                        <SelectItem key={c.code} value={c.code}>
                          {c.code} – {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Card>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="dark:text-gray-300">
                            Student
                          </TableHead>
                          <TableHead className="dark:text-gray-300">
                            ID
                          </TableHead>
                          <TableHead className="dark:text-gray-300">
                            Grade
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {(rosterData[selectedGradeCourse] ?? []).map((s, i) => (
                          <TableRow
                            key={s.id}
                            data-ocid={`faculty_portal.grades.item.${i + 1}`}
                          >
                            <TableCell className="font-medium">
                              {s.name}
                            </TableCell>
                            <TableCell className="font-mono text-xs">
                              {s.id}
                            </TableCell>
                            <TableCell>
                              <Select
                                value={
                                  grades[selectedGradeCourse]?.[s.id] ?? s.grade
                                }
                                onValueChange={(v) =>
                                  setGrades((prev) => ({
                                    ...prev,
                                    [selectedGradeCourse]: {
                                      ...prev[selectedGradeCourse],
                                      [s.id]: v,
                                    },
                                  }))
                                }
                              >
                                <SelectTrigger
                                  className="w-24"
                                  data-ocid={`faculty_portal.grades.grade.select.${i + 1}`}
                                >
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {gradeOptions.map((g) => (
                                    <SelectItem key={g} value={g}>
                                      {g}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
                <Button
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={handleSaveGrades}
                  data-ocid="faculty_portal.grades.save_button"
                >
                  Save Grades
                </Button>
              </div>
            </TabsContent>

            {/* Assignments */}
            <TabsContent value="assignments">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">New Assignment</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label>Course</Label>
                        <Select
                          value={newAssignment.course}
                          onValueChange={(v) =>
                            setNewAssignment((p) => ({ ...p, course: v }))
                          }
                        >
                          <SelectTrigger data-ocid="faculty_portal.assignments.course.select">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {myCourses.map((c) => (
                              <SelectItem key={c.code} value={c.code}>
                                {c.code} – {c.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1">
                        <Label>Title</Label>
                        <Input
                          value={newAssignment.title}
                          onChange={(e) =>
                            setNewAssignment((p) => ({
                              ...p,
                              title: e.target.value,
                            }))
                          }
                          placeholder="Assignment title"
                          data-ocid="faculty_portal.assignments.title.input"
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label>Due Date</Label>
                      <Input
                        type="date"
                        className="w-48"
                        value={newAssignment.dueDate}
                        onChange={(e) =>
                          setNewAssignment((p) => ({
                            ...p,
                            dueDate: e.target.value,
                          }))
                        }
                        data-ocid="faculty_portal.assignments.due_date.input"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label>Description</Label>
                      <Textarea
                        value={newAssignment.description}
                        onChange={(e) =>
                          setNewAssignment((p) => ({
                            ...p,
                            description: e.target.value,
                          }))
                        }
                        placeholder="Assignment details..."
                        data-ocid="faculty_portal.assignments.description.textarea"
                      />
                    </div>
                    <Button
                      className="bg-black text-white hover:bg-gray-900 gap-2"
                      onClick={handleAddAssignment}
                      data-ocid="faculty_portal.assignments.add_button"
                    >
                      <Plus size={14} /> Add Assignment
                    </Button>
                  </CardContent>
                </Card>

                <div className="space-y-3">
                  {assignments.map((a, i) => (
                    <Card
                      key={a.id}
                      data-ocid={`faculty_portal.assignments.item.${i + 1}`}
                    >
                      <CardContent className="p-4 flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {a.course}
                            </Badge>
                            <p className="font-semibold text-sm">{a.title}</p>
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {a.description}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            Due: {a.dueDate}
                          </p>
                        </div>
                        <Badge className="bg-indigo-600 text-white shrink-0 ml-4">
                          {a.submissions} submitted
                        </Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Attendance */}
            <TabsContent value="attendance">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Label className="shrink-0">Course:</Label>
                    <Select
                      value={selectedAttCourse}
                      onValueChange={(v) => {
                        setSelectedAttCourse(v);
                        setAttendance({});
                      }}
                    >
                      <SelectTrigger
                        className="w-64"
                        data-ocid="faculty_portal.attendance.course.select"
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {myCourses.map((c) => (
                          <SelectItem key={c.code} value={c.code}>
                            {c.code} – {c.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center gap-2">
                    <Label className="shrink-0">Date:</Label>
                    <Input
                      type="date"
                      className="w-40"
                      value={attDate}
                      onChange={(e) => setAttDate(e.target.value)}
                      data-ocid="faculty_portal.attendance.date.input"
                    />
                  </div>
                </div>
                <Card>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="dark:text-gray-300">
                            Student
                          </TableHead>
                          <TableHead className="dark:text-gray-300">
                            ID
                          </TableHead>
                          <TableHead>{t("status")}</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {(rosterData[selectedAttCourse] ?? []).map((s, i) => (
                          <TableRow
                            key={s.id}
                            data-ocid={`faculty_portal.attendance.item.${i + 1}`}
                          >
                            <TableCell className="font-medium">
                              {s.name}
                            </TableCell>
                            <TableCell className="font-mono text-xs">
                              {s.id}
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                {(["Present", "Absent", "Late"] as const).map(
                                  (status) => (
                                    <Button
                                      key={status}
                                      size="sm"
                                      variant={
                                        attendance[s.id] === status
                                          ? "default"
                                          : "outline"
                                      }
                                      className={
                                        attendance[s.id] === status
                                          ? status === "Present"
                                            ? "bg-gray-600"
                                            : status === "Absent"
                                              ? "bg-gray-600"
                                              : "bg-gray-500"
                                          : ""
                                      }
                                      onClick={() =>
                                        setAttendance((prev) => ({
                                          ...prev,
                                          [s.id]: status,
                                        }))
                                      }
                                      data-ocid={`faculty_portal.attendance.${status.toLowerCase()}.toggle.${i + 1}`}
                                    >
                                      {status}
                                    </Button>
                                  ),
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
                <Button
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={handleSubmitAttendance}
                  data-ocid="faculty_portal.attendance.submit_button"
                >
                  Submit Attendance
                </Button>
              </div>
            </TabsContent>

            {/* Course Enrollments */}
            <TabsContent value="enrollments">
              <div className="space-y-5">
                {/* Course Selector */}
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Label className="shrink-0">View Enrollments For:</Label>
                    <Select
                      value={selectedEnrollCourse}
                      onValueChange={(v) => {
                        setSelectedEnrollCourse(v);
                        setEnrollSearch("");
                      }}
                    >
                      <SelectTrigger
                        className="w-72"
                        data-ocid="faculty_portal.enrollments.course.select"
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {myCourses.map((c) => (
                          <SelectItem key={c.code} value={c.code}>
                            {c.code} – {c.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Summary Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <p className="text-3xl font-bold">
                        {enrolledStudents.length}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Total Enrolled
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <p className="text-3xl font-bold text-gray-700 dark:text-gray-200">
                        {totalActive}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Active
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <p className="text-3xl font-bold text-gray-600 dark:text-gray-300">
                        {totalWaitlisted}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Waitlisted
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Search */}
                <div className="relative max-w-sm">
                  <input
                    type="text"
                    placeholder="Search by name or ID..."
                    value={enrollSearch}
                    onChange={(e) => setEnrollSearch(e.target.value)}
                    className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black pl-8"
                    data-ocid="faculty_portal.enrollments.search_input"
                  />
                  <Search
                    size={14}
                    className="absolute left-2.5 top-2.5 text-gray-400"
                  />
                </div>

                {/* Enrollment Table */}
                <Card>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="dark:text-gray-300">
                            Student Name
                          </TableHead>
                          <TableHead className="dark:text-gray-300">
                            Student ID
                          </TableHead>
                          <TableHead className="dark:text-gray-300">
                            Program
                          </TableHead>
                          <TableHead className="dark:text-gray-300">
                            Semester
                          </TableHead>
                          <TableHead className="dark:text-gray-300">
                            Enrolled Date
                          </TableHead>
                          <TableHead>{t("status")}</TableHead>
                          <TableHead className="dark:text-gray-300">
                            Action
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredEnrolled.length === 0 && (
                          <TableRow>
                            <TableCell
                              colSpan={7}
                              className="text-center text-gray-400 py-8"
                              data-ocid="faculty_portal.enrollments.empty_state"
                            >
                              No students found
                            </TableCell>
                          </TableRow>
                        )}
                        {filteredEnrolled.map((s, i) => (
                          <TableRow
                            key={s.studentId}
                            data-ocid={`faculty_portal.enrollments.item.${i + 1}`}
                          >
                            <TableCell className="font-medium">
                              {s.name}
                            </TableCell>
                            <TableCell className="font-mono text-xs">
                              {s.studentId}
                            </TableCell>
                            <TableCell className="text-sm text-gray-600 dark:text-gray-300">
                              {s.program}
                            </TableCell>
                            <TableCell>{s.semester}</TableCell>
                            <TableCell className="text-sm text-gray-500 dark:text-gray-400">
                              {s.enrolledDate}
                            </TableCell>
                            <TableCell>
                              <Badge
                                className={
                                  s.status === "Active"
                                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                    : s.status === "Dropped"
                                      ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                                      : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                                }
                              >
                                {s.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-xs"
                                onClick={() =>
                                  toast.info(`Viewing profile: ${s.name}`)
                                }
                                data-ocid={`faculty_portal.enrollments.view_button.${i + 1}`}
                              >
                                View Profile
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                {totalDropped > 0 && (
                  <p className="text-xs text-gray-400">
                    {totalDropped} student(s) dropped this course.
                  </p>
                )}
              </div>
            </TabsContent>
            <TabsContent value="publications">
              <PublicationsTab />
            </TabsContent>
            <TabsContent value="officehours">
              <OfficeHoursTab />
            </TabsContent>
            <TabsContent value="leave">
              <LeaveRequestsTab />
            </TabsContent>
            <TabsContent value="feedback">
              <StudentFeedbackTab />
            </TabsContent>
            <TabsContent value="question-papers">
              <QuestionPaperPage />
            </TabsContent>
            <TabsContent value="clubs">
              <ClubsPage />
            </TabsContent>
            <TabsContent value="forums">
              <ForumsPage />
            </TabsContent>
            <TabsContent value="messages">
              <MessagesPage />
            </TabsContent>
          </Tabs>
        </main>
      </div>

      {/* MENTORSHIP */}
      <TabsContent value="mentorship">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">My Mentees</h2>
            <Button
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => setShowAddMentee((v) => !v)}
              data-ocid="faculty_portal.mentorship.open_modal_button"
            >
              + Add Mentee
            </Button>
          </div>
          {showAddMentee && (
            <Card data-ocid="faculty_portal.mentorship.modal">
              <CardContent className="pt-4 space-y-3">
                <h3 className="font-semibold text-sm">Add New Mentee</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs text-gray-500 dark:text-gray-400">
                      Student Name
                    </Label>
                    <Input
                      className="mt-1 h-8 text-sm"
                      value={newMentee.name}
                      onChange={(e) =>
                        setNewMentee((p) => ({ ...p, name: e.target.value }))
                      }
                      placeholder="Full name"
                      data-ocid="faculty_portal.mentorship.name_input"
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-gray-500 dark:text-gray-400">
                      Roll Number
                    </Label>
                    <Input
                      className="mt-1 h-8 text-sm"
                      value={newMentee.rollNo}
                      onChange={(e) =>
                        setNewMentee((p) => ({ ...p, rollNo: e.target.value }))
                      }
                      placeholder="e.g. CS2023042"
                      data-ocid="faculty_portal.mentorship.roll_input"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    className="bg-black text-white hover:bg-gray-900 text-xs"
                    onClick={() => {
                      if (!newMentee.name) return;
                      setMentees((prev) => [
                        ...prev,
                        {
                          id: Date.now(),
                          name: newMentee.name,
                          rollNo: newMentee.rollNo,
                          attendance: 85,
                          gpa: 8.0,
                          notes: "",
                        },
                      ]);
                      setNewMentee({ name: "", rollNo: "" });
                      setShowAddMentee(false);
                    }}
                    data-ocid="faculty_portal.mentorship.confirm_button"
                  >
                    Add Mentee
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs"
                    onClick={() => setShowAddMentee(false)}
                    data-ocid="faculty_portal.mentorship.cancel_button"
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
          {mentees.map((m, i) => (
            <Card
              key={m.id}
              data-ocid={`faculty_portal.mentorship.item.${i + 1}`}
            >
              <CardContent className="pt-4">
                <button
                  type="button"
                  className="w-full flex items-center justify-between cursor-pointer text-left"
                  onClick={() =>
                    setExpandedMentee(expandedMentee === m.id ? null : m.id)
                  }
                >
                  <div>
                    <p className="font-semibold">{m.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {m.rollNo}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Attendance:{" "}
                      <span
                        className={
                          m.attendance >= 75
                            ? "text-gray-600 dark:text-gray-300 font-semibold"
                            : "text-gray-600 dark:text-gray-300 font-semibold"
                        }
                      >
                        {m.attendance}%
                      </span>
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      GPA: <span className="font-semibold">{m.gpa}</span>
                    </span>
                    <span className="text-xs border rounded px-2 py-0.5">
                      {expandedMentee === m.id ? "Hide" : "View"}
                    </span>
                  </div>
                </button>
                {expandedMentee === m.id && (
                  <div className="mt-3 pt-3 border-t space-y-2">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-sm">
                        <span className="text-gray-500 dark:text-gray-400">
                          Attendance:
                        </span>{" "}
                        <span
                          className={
                            m.attendance >= 75
                              ? "text-gray-600 dark:text-gray-300 font-semibold"
                              : "text-gray-600 dark:text-gray-300 font-semibold"
                          }
                        >
                          {m.attendance}%
                        </span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-500 dark:text-gray-400">
                          GPA:
                        </span>{" "}
                        <span className="font-semibold">{m.gpa} / 10.0</span>
                      </div>
                    </div>
                    <div>
                      <Label className="text-xs text-gray-500 dark:text-gray-400">
                        Notes
                      </Label>
                      <textarea
                        className="w-full mt-1 text-sm border border-border rounded-md px-3 py-1.5 bg-background resize-none"
                        rows={2}
                        value={m.notes}
                        onChange={(e) =>
                          setMentees((prev) =>
                            prev.map((x) =>
                              x.id === m.id
                                ? { ...x, notes: e.target.value }
                                : x,
                            ),
                          )
                        }
                        placeholder="Add notes about this mentee..."
                        data-ocid={`faculty_portal.mentorship.notes_textarea.${i + 1}`}
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>

      {/* CONFERENCES */}
      <TabsContent value="conferences">
        <div className="space-y-4">
          <h2 className="text-lg font-bold">Academic Conferences & Seminars</h2>
          {conferences.map((conf, i) => (
            <Card
              key={conf.id}
              data-ocid={`faculty_portal.conferences.item.${i + 1}`}
            >
              <CardContent className="pt-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{conf.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {conf.date} · {conf.location}
                    </p>
                    <p className="text-xs text-gray-400">
                      Registration deadline: {conf.deadline}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    {confRegistered.has(conf.id) ? (
                      <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                        Registered ✓
                      </Badge>
                    ) : (
                      <Button
                        size="sm"
                        className="bg-black text-white hover:bg-gray-900 text-xs"
                        onClick={() =>
                          setConfForms((p) => ({
                            ...p,
                            [conf.id]: { paperTitle: "", showing: true },
                          }))
                        }
                        data-ocid={`faculty_portal.conferences.button.${i + 1}`}
                      >
                        Register
                      </Button>
                    )}
                  </div>
                </div>
                {confForms[conf.id]?.showing &&
                  !confRegistered.has(conf.id) && (
                    <div className="mt-3 pt-3 border-t space-y-2">
                      <div>
                        <Label className="text-xs text-gray-500 dark:text-gray-400">
                          Paper Title (Optional)
                        </Label>
                        <Input
                          className="mt-1 h-8 text-sm"
                          value={confForms[conf.id]?.paperTitle || ""}
                          onChange={(e) =>
                            setConfForms((p) => ({
                              ...p,
                              [conf.id]: {
                                ...p[conf.id],
                                paperTitle: e.target.value,
                              },
                            }))
                          }
                          placeholder="Enter paper/presentation title..."
                          data-ocid={`faculty_portal.conferences.paper_input.${i + 1}`}
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className="bg-black text-white hover:bg-gray-900 text-xs"
                          onClick={() => {
                            setConfRegistered((prev) => {
                              const n = new Set(prev);
                              n.add(conf.id);
                              return n;
                            });
                            setConfForms((p) => ({
                              ...p,
                              [conf.id]: { ...p[conf.id], showing: false },
                            }));
                          }}
                          data-ocid={`faculty_portal.conferences.confirm_button.${i + 1}`}
                        >
                          Confirm Registration
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-xs"
                          onClick={() =>
                            setConfForms((p) => ({
                              ...p,
                              [conf.id]: { ...p[conf.id], showing: false },
                            }))
                          }
                          data-ocid={`faculty_portal.conferences.cancel_button.${i + 1}`}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>

      <SmartAssistant onNavigate={handleChatNavigate} currentPortal="faculty" />
    </div>
  );
}
