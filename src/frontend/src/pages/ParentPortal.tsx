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
import { useLanguage } from "@/contexts/LanguageContext";
import {
  BookOpen,
  CalendarCheck,
  CheckCircle,
  CreditCard,
  DollarSign,
  GraduationCap,
  MessageSquare,
  Send,
  Users2,
} from "lucide-react";
import { useState } from "react";
import { SmartAssistant } from "../components/SmartAssistant";

type ChildRecord = {
  name: string;
  rollNumber: string;
  className: string;
  age: number;
  section: string;
  attendance: { date: string; status: string }[];
  grades: { subject: string; marks: number; total: number; grade: string }[];
  timetable: { day: string; periods: string[] }[];
  fees: { term: string; amount: number; dueDate: string; status: string }[];
};

const CHILDREN: ChildRecord[] = [
  {
    name: "Aisha Patel",
    rollNumber: "10-A-001",
    className: "Class 10",
    age: 15,
    section: "A",
    attendance: [
      { date: "2026-03-20", status: "Present" },
      { date: "2026-03-21", status: "Present" },
      { date: "2026-03-22", status: "Absent" },
      { date: "2026-03-23", status: "Present" },
      { date: "2026-03-24", status: "Present" },
      { date: "2026-03-17", status: "Present" },
      { date: "2026-03-18", status: "Late" },
    ],
    grades: [
      { subject: "Mathematics", marks: 88, total: 100, grade: "A" },
      { subject: "Science", marks: 92, total: 100, grade: "A+" },
      { subject: "English", marks: 78, total: 100, grade: "B" },
      { subject: "History", marks: 85, total: 100, grade: "A" },
      { subject: "Computer Science", marks: 95, total: 100, grade: "A+" },
    ],
    timetable: [
      {
        day: "Monday",
        periods: [
          "Mathematics",
          "Science",
          "English",
          "History",
          "Computer Science",
          "Physical Education",
        ],
      },
      {
        day: "Tuesday",
        periods: [
          "English",
          "Mathematics",
          "Science",
          "Computer Science",
          "Art",
          "History",
        ],
      },
      {
        day: "Wednesday",
        periods: [
          "Science",
          "English",
          "Mathematics",
          "Computer Science",
          "History",
          "Library",
        ],
      },
      {
        day: "Thursday",
        periods: [
          "History",
          "Computer Science",
          "Mathematics",
          "English",
          "Science",
          "Hindi",
        ],
      },
      {
        day: "Friday",
        periods: [
          "Computer Science",
          "History",
          "English",
          "Mathematics",
          "Science",
          "Art",
        ],
      },
    ],
    fees: [
      {
        term: "Term 1 (Apr–Jun)",
        amount: 4000,
        dueDate: "2026-04-10",
        status: "Paid",
      },
      {
        term: "Term 2 (Jul–Sep)",
        amount: 4000,
        dueDate: "2026-07-10",
        status: "Paid",
      },
      {
        term: "Term 3 (Oct–Dec)",
        amount: 4000,
        dueDate: "2026-10-10",
        status: "Unpaid",
      },
    ],
  },
  {
    name: "Marcus Johnson",
    rollNumber: "10-B-012",
    className: "Class 10",
    age: 15,
    section: "B",
    attendance: [
      { date: "2026-03-20", status: "Present" },
      { date: "2026-03-21", status: "Absent" },
      { date: "2026-03-22", status: "Absent" },
      { date: "2026-03-23", status: "Present" },
      { date: "2026-03-24", status: "Present" },
    ],
    grades: [
      { subject: "Mathematics", marks: 70, total: 100, grade: "B" },
      { subject: "Science", marks: 65, total: 100, grade: "C" },
      { subject: "English", marks: 80, total: 100, grade: "A" },
      { subject: "History", marks: 72, total: 100, grade: "B" },
    ],
    timetable: [
      {
        day: "Monday",
        periods: [
          "English",
          "Mathematics",
          "Science",
          "History",
          "Hindi",
          "Art",
        ],
      },
      {
        day: "Tuesday",
        periods: [
          "Mathematics",
          "Science",
          "English",
          "Hindi",
          "History",
          "Computer Science",
        ],
      },
      {
        day: "Wednesday",
        periods: [
          "Science",
          "History",
          "Mathematics",
          "English",
          "Art",
          "Physical Education",
        ],
      },
      {
        day: "Thursday",
        periods: [
          "Hindi",
          "English",
          "History",
          "Mathematics",
          "Science",
          "Library",
        ],
      },
      {
        day: "Friday",
        periods: [
          "Art",
          "Science",
          "Hindi",
          "English",
          "Mathematics",
          "History",
        ],
      },
    ],
    fees: [
      {
        term: "Term 1 (Apr–Jun)",
        amount: 4000,
        dueDate: "2026-04-10",
        status: "Paid",
      },
      {
        term: "Term 2 (Jul–Sep)",
        amount: 4000,
        dueDate: "2026-07-10",
        status: "Partial",
      },
      {
        term: "Term 3 (Oct–Dec)",
        amount: 4000,
        dueDate: "2026-10-10",
        status: "Unpaid",
      },
    ],
  },
  {
    name: "Lily Zhang",
    rollNumber: "9-A-007",
    className: "Class 9",
    age: 14,
    section: "A",
    attendance: [
      { date: "2026-03-20", status: "Present" },
      { date: "2026-03-21", status: "Present" },
      { date: "2026-03-22", status: "Present" },
      { date: "2026-03-23", status: "Present" },
      { date: "2026-03-24", status: "Late" },
    ],
    grades: [
      { subject: "Mathematics", marks: 96, total: 100, grade: "A+" },
      { subject: "Science", marks: 94, total: 100, grade: "A+" },
      { subject: "English", marks: 89, total: 100, grade: "A" },
      { subject: "Geography", marks: 91, total: 100, grade: "A+" },
    ],
    timetable: [
      {
        day: "Monday",
        periods: [
          "Mathematics",
          "Geography",
          "English",
          "Science",
          "Hindi",
          "Art",
        ],
      },
      {
        day: "Tuesday",
        periods: [
          "Science",
          "Mathematics",
          "Geography",
          "English",
          "Art",
          "Physical Education",
        ],
      },
      {
        day: "Wednesday",
        periods: [
          "English",
          "Science",
          "Mathematics",
          "Geography",
          "Hindi",
          "Library",
        ],
      },
      {
        day: "Thursday",
        periods: [
          "Geography",
          "English",
          "Science",
          "Hindi",
          "Mathematics",
          "Computer Science",
        ],
      },
      {
        day: "Friday",
        periods: [
          "Hindi",
          "Mathematics",
          "English",
          "Science",
          "Geography",
          "Art",
        ],
      },
    ],
    fees: [
      {
        term: "Term 1 (Apr–Jun)",
        amount: 3800,
        dueDate: "2026-04-10",
        status: "Paid",
      },
      {
        term: "Term 2 (Jul–Sep)",
        amount: 3800,
        dueDate: "2026-07-10",
        status: "Paid",
      },
      {
        term: "Term 3 (Oct–Dec)",
        amount: 3800,
        dueDate: "2026-10-10",
        status: "Paid",
      },
    ],
  },
];

const statusBadge = (status: string) => {
  const map: Record<string, string> = {
    Present:
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    Absent: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    Late: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    Paid: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    Unpaid: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    Partial:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  };
  return (
    <Badge
      className={
        map[status] ||
        "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
      }
    >
      {status}
    </Badge>
  );
};

export default function ParentPortal() {
  const { t } = useLanguage();
  const [selectedChild, setSelectedChild] = useState<string>("");

  const child = CHILDREN.find((c) => c.name === selectedChild) || null;

  const presentCount = child
    ? child.attendance.filter((a) => a.status === "Present").length
    : 0;
  const attPct = child
    ? Math.round((presentCount / child.attendance.length) * 100)
    : 0;

  const [, setActiveParentTab] = useState("attendance");
  // Fee payment state
  const [feePayStep, setFeePayStep] = useState<
    "form" | "processing" | "success"
  >("form");
  const [feePayCard, setFeePayCard] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  });
  const [payHistory, setPayHistory] = useState<
    Array<{ date: string; amount: number; method: string }>
  >([
    { date: "2026-01-15", amount: 12000, method: "Card" },
    { date: "2025-10-10", amount: 12000, method: "Card" },
  ]);
  // Teacher comm state
  const [teacherMessages, setTeacherMessages] = useState<
    Array<{ id: number; from: string; text: string; time: string }>
  >([
    {
      id: 1,
      from: "Class Teacher (Mrs. Kapoor)",
      text: "Aisha has shown great improvement in Mathematics this month.",
      time: "Mar 20",
    },
    {
      id: 2,
      from: "You",
      text: "Thank you for the update. We will encourage her at home.",
      time: "Mar 21",
    },
  ]);
  const [teacherMsgText, setTeacherMsgText] = useState("");
  // Homework data
  const hwData = [
    {
      subject: "Mathematics",
      title: "Chapter 5 Exercises",
      assigned: "2026-03-24",
      due: "2026-03-27",
      status: "Pending",
    },
    {
      subject: "Science",
      title: "Lab Report - Photosynthesis",
      assigned: "2026-03-22",
      due: "2026-03-25",
      status: "Submitted",
    },
    {
      subject: "English",
      title: "Essay: My Favourite Festival",
      assigned: "2026-03-20",
      due: "2026-03-23",
      status: "Submitted",
    },
    {
      subject: "History",
      title: "Chapter 3 Notes",
      assigned: "2026-03-25",
      due: "2026-03-28",
      status: "Pending",
    },
    {
      subject: "Computer",
      title: "HTML Project",
      assigned: "2026-03-18",
      due: "2026-03-26",
      status: "Submitted",
    },
  ];
  // Calendar data
  const today = new Date(2026, 2, 27);
  const calYear = today.getFullYear();
  const calMonth = today.getMonth();
  const firstDay = new Date(calYear, calMonth, 1).getDay();
  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
  const calEvents: Record<
    number,
    Array<{ type: "exam" | "event" | "holiday"; label: string }>
  > = {
    3: [{ type: "event", label: "Sports Day" }],
    10: [{ type: "holiday", label: "Holi" }],
    15: [{ type: "exam", label: "Math Exam" }],
    18: [{ type: "exam", label: "Science Exam" }],
    25: [{ type: "event", label: "Annual Day" }],
    29: [{ type: "holiday", label: "Good Friday" }],
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Parent Portal</h1>
        <p className="text-muted-foreground text-sm mt-1">
          View your child&apos;s academic progress and records
        </p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-full">
              <Users2 size={24} />
            </div>
            <div className="flex-1">
              <Label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                Select Your Child
              </Label>
              <Select value={selectedChild} onValueChange={setSelectedChild}>
                <SelectTrigger
                  className="mt-1.5 max-w-xs"
                  data-ocid="parent.select"
                >
                  <SelectValue placeholder="-- Select a student --" />
                </SelectTrigger>
                <SelectContent>
                  {CHILDREN.map((c) => (
                    <SelectItem key={c.name} value={c.name}>
                      {c.name} — {c.className}, Sec {c.section} (Roll:{" "}
                      {c.rollNumber})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {!child && (
        <div
          className="text-center py-20 text-gray-400"
          data-ocid="parent.empty_state"
        >
          <GraduationCap size={48} className="mx-auto mb-3 opacity-20" />
          <p className="text-lg font-medium">
            Select a child to view their records
          </p>
          <p className="text-sm mt-1">
            Choose your child&apos;s name from the dropdown above
          </p>
        </div>
      )}

      {child && (
        <>
          {/* Child info */}
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-full bg-black text-white flex items-center justify-center text-xl font-bold">
                  {child.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h2 className="text-lg font-bold">{child.name}</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {child.className} — Section {child.section} &nbsp;|&nbsp;
                    Roll No: {child.rollNumber} &nbsp;|&nbsp; Age: {child.age}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="attendance" data-ocid="parent.tab">
            <TabsList className="bg-black text-white mb-4 flex-wrap h-auto gap-0.5">
              <TabsTrigger
                value="attendance"
                className="data-[state=active]:bg-white dark:bg-gray-900 data-[state=active]:text-black"
                data-ocid="parent.attendance.tab"
              >
                <CalendarCheck size={14} className="mr-1" /> Attendance
              </TabsTrigger>
              <TabsTrigger
                value="grades"
                className="data-[state=active]:bg-white dark:bg-gray-900 data-[state=active]:text-black"
                data-ocid="parent.grades.tab"
              >
                <BookOpen size={14} className="mr-1" /> Grades
              </TabsTrigger>
              <TabsTrigger
                value="timetable"
                className="data-[state=active]:bg-white dark:bg-gray-900 data-[state=active]:text-black"
                data-ocid="parent.timetable.tab"
              >
                Timetable
              </TabsTrigger>
              <TabsTrigger
                value="fees"
                className="data-[state=active]:bg-white dark:bg-gray-900 data-[state=active]:text-black"
                data-ocid="parent.fees.tab"
              >
                <DollarSign size={14} className="mr-1" /> Fee Status
              </TabsTrigger>
              <TabsTrigger
                value="fee-payment"
                className="data-[state=active]:bg-white dark:bg-gray-900 data-[state=active]:text-black"
                data-ocid="parent.fee_payment.tab"
              >
                <CreditCard size={14} className="mr-1" /> Pay Fees
              </TabsTrigger>
              <TabsTrigger
                value="teacher-comm"
                className="data-[state=active]:bg-white dark:bg-gray-900 data-[state=active]:text-black"
                data-ocid="parent.teacher_comm.tab"
              >
                <MessageSquare size={14} className="mr-1" /> Messages
              </TabsTrigger>
              <TabsTrigger
                value="homework-view"
                className="data-[state=active]:bg-white dark:bg-gray-900 data-[state=active]:text-black"
                data-ocid="parent.homework_view.tab"
              >
                <BookOpen size={14} className="mr-1" /> Homework
              </TabsTrigger>
              <TabsTrigger
                value="school-calendar"
                className="data-[state=active]:bg-white dark:bg-gray-900 data-[state=active]:text-black"
                data-ocid="parent.school_calendar.tab"
              >
                Calendar
              </TabsTrigger>
            </TabsList>

            {/* Attendance */}
            <TabsContent value="attendance">
              <div className="grid grid-cols-3 gap-4 mb-4">
                {[
                  {
                    label: "Total Days",
                    value: child.attendance.length,
                    color: "text-black",
                  },
                  {
                    label: "Present",
                    value: presentCount,
                    color: "text-gray-600 dark:text-gray-300",
                  },
                  {
                    label: "Attendance %",
                    value: `${attPct}%`,
                    color:
                      attPct >= 75
                        ? "text-gray-600 dark:text-gray-300"
                        : "text-gray-600 dark:text-gray-300",
                  },
                ].map((s) => (
                  <Card key={s.label}>
                    <CardContent className="p-4">
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {s.label}
                      </p>
                      <p className={`text-2xl font-bold ${s.color}`}>
                        {s.value}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <Card>
                <Table data-ocid="parent.attendance.table">
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t("date")}</TableHead>
                      <TableHead>{t("status")}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {child.attendance.map((a, i) => (
                      <TableRow
                        key={`att-${a.date}`}
                        data-ocid={`parent.attendance.item.${i + 1}`}
                      >
                        <TableCell>{a.date}</TableCell>
                        <TableCell>{statusBadge(a.status)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </TabsContent>

            {/* Grades */}
            <TabsContent value="grades">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">
                    Subject-wise Performance
                  </CardTitle>
                </CardHeader>
                <Table data-ocid="parent.grades.table">
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t("subject")}</TableHead>
                      <TableHead className="text-right">Marks</TableHead>
                      <TableHead className="text-right">Percentage</TableHead>
                      <TableHead className="text-right">Grade</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {child.grades.map((g, i) => (
                      <TableRow
                        key={`grade-${g.subject}`}
                        data-ocid={`parent.grades.item.${i + 1}`}
                      >
                        <TableCell className="font-medium">
                          {g.subject}
                        </TableCell>
                        <TableCell className="text-right">
                          {g.marks} / {g.total}
                        </TableCell>
                        <TableCell className="text-right font-semibold">
                          {Math.round((g.marks / g.total) * 100)}%
                        </TableCell>
                        <TableCell className="text-right font-bold">
                          {g.grade}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </TabsContent>

            {/* Timetable */}
            <TabsContent value="timetable">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Weekly Timetable</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <Table data-ocid="parent.timetable.table">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="dark:text-gray-300">
                          Day
                        </TableHead>
                        {[
                          "Period 1",
                          "Period 2",
                          "Period 3",
                          "Period 4",
                          "Period 5",
                          "Period 6",
                        ].map((p) => (
                          <TableHead key={p}>{p}</TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {child.timetable.map((t, i) => (
                        <TableRow
                          key={`tt-${t.day}`}
                          data-ocid={`parent.timetable.item.${i + 1}`}
                        >
                          <TableCell className="font-medium">{t.day}</TableCell>
                          {t.periods.map((p, j) => (
                            <TableCell
                              key={`${t.day}-${j}`}
                              className="text-sm text-gray-600 dark:text-gray-300"
                            >
                              {p}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Fee Payment */}
            <TabsContent value="fee-payment">
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  <Card className="border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                    <CardContent className="pt-4 pb-3 text-center">
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Total Fees
                      </p>
                      <p className="text-xl font-bold">
                        ₹
                        {child?.fees
                          .reduce((s, f) => s + f.amount, 0)
                          .toLocaleString()}
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                    <CardContent className="pt-4 pb-3 text-center">
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Paid
                      </p>
                      <p className="text-xl font-bold">
                        ₹
                        {child?.fees
                          .filter((f) => f.status === "Paid")
                          .reduce((s, f) => s + f.amount, 0)
                          .toLocaleString()}
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                    <CardContent className="pt-4 pb-3 text-center">
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Outstanding
                      </p>
                      <p className="text-xl font-bold">
                        ₹
                        {child?.fees
                          .filter((f) => f.status !== "Paid")
                          .reduce((s, f) => s + f.amount, 0)
                          .toLocaleString()}
                      </p>
                    </CardContent>
                  </Card>
                </div>
                {feePayStep === "form" && (
                  <Card>
                    <CardContent className="pt-5 space-y-3">
                      <h3 className="font-semibold flex items-center gap-2">
                        <CreditCard size={16} /> Pay Fees Online
                      </h3>
                      <div>
                        <Label className="text-xs text-gray-500 dark:text-gray-400">
                          Cardholder Name
                        </Label>
                        <Input
                          className="mt-1 h-8 text-sm"
                          value={feePayCard.name}
                          onChange={(e) =>
                            setFeePayCard((p) => ({
                              ...p,
                              name: e.target.value,
                            }))
                          }
                          placeholder="Full name on card"
                          data-ocid="parent.fee_payment.name_input"
                        />
                      </div>
                      <div>
                        <Label className="text-xs text-gray-500 dark:text-gray-400">
                          Card Number
                        </Label>
                        <Input
                          className="mt-1 h-8 text-sm font-mono"
                          value={feePayCard.number}
                          onChange={(e) =>
                            setFeePayCard((p) => ({
                              ...p,
                              number: e.target.value,
                            }))
                          }
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                          data-ocid="parent.fee_payment.card_input"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label className="text-xs text-gray-500 dark:text-gray-400">
                            Expiry
                          </Label>
                          <Input
                            className="mt-1 h-8 text-sm"
                            value={feePayCard.expiry}
                            onChange={(e) =>
                              setFeePayCard((p) => ({
                                ...p,
                                expiry: e.target.value,
                              }))
                            }
                            placeholder="MM/YY"
                            data-ocid="parent.fee_payment.expiry_input"
                          />
                        </div>
                        <div>
                          <Label className="text-xs text-gray-500 dark:text-gray-400">
                            CVV
                          </Label>
                          <Input
                            className="mt-1 h-8 text-sm"
                            type="password"
                            value={feePayCard.cvv}
                            onChange={(e) =>
                              setFeePayCard((p) => ({
                                ...p,
                                cvv: e.target.value,
                              }))
                            }
                            placeholder="•••"
                            maxLength={4}
                            data-ocid="parent.fee_payment.cvv_input"
                          />
                        </div>
                      </div>
                      <Button
                        className="w-full bg-black text-white hover:bg-gray-900"
                        onClick={() => {
                          if (!feePayCard.number || !feePayCard.name) return;
                          setFeePayStep("processing");
                          setTimeout(() => {
                            setFeePayStep("success");
                            setPayHistory((prev) => [
                              {
                                date: new Date().toISOString().slice(0, 10),
                                amount:
                                  child?.fees
                                    .filter((f) => f.status !== "Paid")
                                    .reduce((s, f) => s + f.amount, 0) || 0,
                                method: "Card",
                              },
                              ...prev,
                            ]);
                          }, 2000);
                        }}
                        data-ocid="parent.fee_payment.submit_button"
                      >
                        Pay Outstanding Fees
                      </Button>
                      <p className="text-[10px] text-gray-400 text-center">
                        Powered by Stripe · Test card: 4242 4242 4242 4242
                      </p>
                    </CardContent>
                  </Card>
                )}
                {feePayStep === "processing" && (
                  <Card>
                    <CardContent className="pt-8 pb-8 flex flex-col items-center gap-3">
                      <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin" />
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Processing payment...
                      </p>
                    </CardContent>
                  </Card>
                )}
                {feePayStep === "success" && (
                  <Card className="border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                    <CardContent className="pt-8 pb-8 flex flex-col items-center gap-3">
                      <CheckCircle
                        size={48}
                        className="text-gray-500 dark:text-gray-400"
                      />
                      <p className="font-semibold text-gray-700 dark:text-gray-200">
                        Payment Successful!
                      </p>
                      <Button
                        size="sm"
                        variant="outline"
                        className="mt-2"
                        onClick={() => {
                          setFeePayStep("form");
                          setFeePayCard({
                            number: "",
                            expiry: "",
                            cvv: "",
                            name: "",
                          });
                        }}
                        data-ocid="parent.fee_payment.done_button"
                      >
                        Done
                      </Button>
                    </CardContent>
                  </Card>
                )}
                <Card>
                  <CardContent className="pt-5">
                    <h3 className="font-semibold text-sm mb-3">
                      Payment History
                    </h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="dark:text-gray-300">
                            Date
                          </TableHead>
                          <TableHead className="dark:text-gray-300">
                            Amount
                          </TableHead>
                          <TableHead className="dark:text-gray-300">
                            Method
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {payHistory.map((p, i) => (
                          <TableRow
                            key={`pay-${p.date}-${i}`}
                            data-ocid={`parent.fee_payment.item.${i + 1}`}
                          >
                            <TableCell className="text-sm">{p.date}</TableCell>
                            <TableCell className="text-sm font-medium">
                              ₹{p.amount.toLocaleString()}
                            </TableCell>
                            <TableCell>
                              <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 text-xs">
                                {p.method}
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

            {/* Teacher Communication */}
            <TabsContent value="teacher-comm">
              <div className="space-y-4">
                <Card>
                  <CardContent className="pt-5">
                    <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
                      <MessageSquare size={15} /> Message Thread
                    </h3>
                    <div className="space-y-3 max-h-60 overflow-y-auto mb-4 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      {teacherMessages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`flex ${msg.from === "You" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-[80%] px-3 py-2 rounded-xl text-sm ${msg.from === "You" ? "bg-black text-white" : "bg-white dark:bg-gray-900 border text-gray-700 dark:text-gray-200"}`}
                          >
                            {msg.from !== "You" && (
                              <p className="text-xs font-semibold mb-1 text-gray-400">
                                {msg.from}
                              </p>
                            )}
                            <p>{msg.text}</p>
                            <p className="text-[10px] opacity-50 mt-1">
                              {msg.time}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        className="flex-1 h-8 text-sm"
                        value={teacherMsgText}
                        onChange={(e) => setTeacherMsgText(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && teacherMsgText.trim()) {
                            setTeacherMessages((prev) => [
                              ...prev,
                              {
                                id: Date.now(),
                                from: "You",
                                text: teacherMsgText,
                                time: "Now",
                              },
                            ]);
                            setTeacherMsgText("");
                          }
                        }}
                        placeholder="Type a message to the teacher..."
                        data-ocid="parent.teacher_comm.input"
                      />
                      <Button
                        size="sm"
                        className="bg-black text-white hover:bg-gray-900 px-3"
                        onClick={() => {
                          if (!teacherMsgText.trim()) return;
                          setTeacherMessages((prev) => [
                            ...prev,
                            {
                              id: Date.now(),
                              from: "You",
                              text: teacherMsgText,
                              time: "Now",
                            },
                          ]);
                          setTeacherMsgText("");
                        }}
                        data-ocid="parent.teacher_comm.send_button"
                      >
                        <Send size={14} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Homework View */}
            <TabsContent value="homework-view">
              <Card>
                <CardContent className="pt-5">
                  <h3 className="font-semibold text-sm mb-3">
                    Homework Assignments
                  </h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="dark:text-gray-300">
                          Subject
                        </TableHead>
                        <TableHead className="dark:text-gray-300">
                          Title
                        </TableHead>
                        <TableHead className="dark:text-gray-300">
                          Assigned
                        </TableHead>
                        <TableHead className="dark:text-gray-300">
                          Due
                        </TableHead>
                        <TableHead className="dark:text-gray-300">
                          Status
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {hwData.map((hw, i) => (
                        <TableRow
                          key={`hw-${hw.subject}`}
                          data-ocid={`parent.homework_view.item.${i + 1}`}
                        >
                          <TableCell className="font-medium text-sm">
                            {hw.subject}
                          </TableCell>
                          <TableCell className="text-sm">{hw.title}</TableCell>
                          <TableCell className="text-sm text-gray-500 dark:text-gray-400">
                            {hw.assigned}
                          </TableCell>
                          <TableCell className="text-sm text-gray-500 dark:text-gray-400">
                            {hw.due}
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={
                                hw.status === "Submitted"
                                  ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                  : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                              }
                            >
                              {hw.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* School Calendar */}
            <TabsContent value="school-calendar">
              <div className="space-y-4">
                <Card>
                  <CardContent className="pt-5">
                    <h3 className="font-semibold text-sm mb-4">March 2026</h3>
                    <div className="grid grid-cols-7 gap-1 text-center text-xs mb-1">
                      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                        (d) => (
                          <div
                            key={d}
                            className="font-semibold text-gray-400 py-1"
                          >
                            {d}
                          </div>
                        ),
                      )}
                    </div>
                    <div className="grid grid-cols-7 gap-1">
                      {Array.from({ length: firstDay }).map((_, i) => (
                        // biome-ignore lint/suspicious/noArrayIndexKey: calendar filler has no identity
                        <div key={`filler-${i}`} />
                      ))}
                      {Array.from({ length: daysInMonth }).map((_, i) => {
                        const day = i + 1;
                        const events = calEvents[day];
                        const isToday = day === today.getDate();
                        return (
                          <div
                            key={day}
                            className={`relative rounded-lg py-1.5 px-1 text-center min-h-[40px] ${isToday ? "bg-black text-white" : "hover:bg-gray-50 dark:hover:bg-gray-700 dark:bg-gray-800"}`}
                            data-ocid={`parent.school_calendar.item.${day}`}
                          >
                            <span className="text-xs font-medium">{day}</span>
                            {events && (
                              <div className="flex justify-center gap-0.5 mt-0.5 flex-wrap">
                                {events.map((ev, j) => (
                                  <span
                                    key={`dot-${ev.type}-${j}`}
                                    title={ev.label}
                                    className={`w-1.5 h-1.5 rounded-full inline-block ${ev.type === "exam" ? "bg-gray-500" : ev.type === "event" ? "bg-gray-500" : "bg-gray-500"}`}
                                  />
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex gap-4 mt-4 pt-3 border-t text-xs">
                      <span className="flex items-center gap-1">
                        <span className="w-2.5 h-2.5 rounded-full bg-gray-500 inline-block" />{" "}
                        Exams
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-2.5 h-2.5 rounded-full bg-gray-500 inline-block" />{" "}
                        Events
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="w-2.5 h-2.5 rounded-full bg-gray-500 inline-block" />{" "}
                        Holidays
                      </span>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-5">
                    <h3 className="font-semibold text-sm mb-3">
                      Upcoming Dates
                    </h3>
                    <div className="space-y-2">
                      {Object.entries(calEvents).map(([d, evs]) =>
                        evs.map((ev) => (
                          <div
                            key={`event-${d}-${ev.label}`}
                            className="flex items-center gap-3 text-sm"
                          >
                            <span
                              className={`w-2 h-2 rounded-full ${ev.type === "exam" ? "bg-gray-500" : ev.type === "event" ? "bg-gray-500" : "bg-gray-500"}`}
                            />
                            <span className="text-gray-500 dark:text-gray-400">
                              Mar {d}
                            </span>
                            <span className="font-medium">{ev.label}</span>
                            <Badge
                              className={`text-[10px] ${ev.type === "exam" ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400" : ev.type === "event" ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"}`}
                            >
                              {ev.type}
                            </Badge>
                          </div>
                        )),
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Fee Status */}
            <TabsContent value="fees">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">
                    Fee Payment Status
                  </CardTitle>
                </CardHeader>
                <Table data-ocid="parent.fees.table">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="dark:text-gray-300">Term</TableHead>
                      <TableHead className="text-right">
                        {t("amount")}
                      </TableHead>
                      <TableHead className="dark:text-gray-300">
                        Due Date
                      </TableHead>
                      <TableHead>{t("status")}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {child.fees.map((fee, i) => (
                      <TableRow
                        key={`fee-${fee.term}`}
                        data-ocid={`parent.fees.item.${i + 1}`}
                      >
                        <TableCell className="font-medium">
                          {fee.term}
                        </TableCell>
                        <TableCell className="text-right">
                          ₹{fee.amount.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-sm text-gray-600 dark:text-gray-300">
                          {fee.dueDate}
                        </TableCell>
                        <TableCell>{statusBadge(fee.status)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}
      <SmartAssistant
        onNavigate={(page) => setActiveParentTab(page)}
        currentPortal="parent"
      />
    </div>
  );
}
