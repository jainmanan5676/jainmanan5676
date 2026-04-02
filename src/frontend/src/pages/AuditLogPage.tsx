import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
import { ClipboardList, Download, Search } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type AuditEntry = {
  id: number;
  timestamp: string;
  user: string;
  role: string;
  action: string;
  details: string;
  category: string;
};

const SEED_LOGS: AuditEntry[] = [
  {
    id: 1,
    timestamp: "2026-03-26 09:15:32",
    user: "Administrator",
    role: "Admin",
    action: "Added Student",
    details: "Added student Arjun Sharma to Class 10-A",
    category: "Student",
  },
  {
    id: 2,
    timestamp: "2026-03-26 09:22:10",
    user: "Mr. Rajiv Kapoor",
    role: "Teacher",
    action: "Updated Grades",
    details: "Updated grades for Class 9 Mathematics — 32 entries",
    category: "Grade",
  },
  {
    id: 3,
    timestamp: "2026-03-26 10:05:44",
    user: "Administrator",
    role: "Admin",
    action: "Deleted Event",
    details: "Deleted event 'Science Fair'",
    category: "System",
  },
  {
    id: 4,
    timestamp: "2026-03-26 10:30:21",
    user: "Administrator",
    role: "Admin",
    action: "Updated Fee Record",
    details:
      "Updated fee record for Priya Patel — marked partial payment ₹21,000",
    category: "Finance",
  },
  {
    id: 5,
    timestamp: "2026-03-26 11:00:05",
    user: "Dr. Meena Iyer",
    role: "College Faculty",
    action: "Approved Enrollment",
    details: "Approved enrollment for student Rahul Verma in CSE101",
    category: "Attendance",
  },
  {
    id: 6,
    timestamp: "2026-03-26 11:45:18",
    user: "Ms. Anita Desai",
    role: "Teacher",
    action: "Posted Homework",
    details: "Posted homework assignment 'Newton's Laws Summary' for Class 9",
    category: "Student",
  },
  {
    id: 7,
    timestamp: "2026-03-26 12:10:30",
    user: "Administrator",
    role: "Admin",
    action: "Added Book",
    details: "Added book 'Quantum Physics Fundamentals' to library",
    category: "Library",
  },
  {
    id: 8,
    timestamp: "2026-03-25 14:22:55",
    user: "Administrator",
    role: "Admin",
    action: "Deleted Student",
    details: "Removed student record for Kiran Rao (transferred)",
    category: "Student",
  },
  {
    id: 9,
    timestamp: "2026-03-25 15:05:40",
    user: "Mr. Sanjay Kulkarni",
    role: "Teacher",
    action: "Marked Attendance",
    details: "Marked attendance for Class 11 History — 38/40 present",
    category: "Attendance",
  },
  {
    id: 10,
    timestamp: "2026-03-25 15:30:12",
    user: "Administrator",
    role: "Admin",
    action: "Sent Announcement",
    details: "Posted announcement 'Annual Sports Day' to All",
    category: "System",
  },
  {
    id: 11,
    timestamp: "2026-03-25 16:00:00",
    user: "Administrator",
    role: "Admin",
    action: "Updated School Info",
    details: "Updated school address and contact details in Settings",
    category: "System",
  },
  {
    id: 12,
    timestamp: "2026-03-25 16:45:20",
    user: "Dr. Kavita Sharma",
    role: "Teacher",
    action: "Created Exam",
    details: "Created exam 'Chemistry Mid-Term' for Class 12 on April 5",
    category: "Grade",
  },
  {
    id: 13,
    timestamp: "2026-03-24 09:10:00",
    user: "Administrator",
    role: "Admin",
    action: "Added Fee Record",
    details: "Added fee record for new student Tanvi Gupta — ₹45,000",
    category: "Finance",
  },
  {
    id: 14,
    timestamp: "2026-03-24 10:25:33",
    user: "Administrator",
    role: "Admin",
    action: "Issued Book",
    details: "Issued book 'Biology: Life on Earth' to Ethan Rivera",
    category: "Library",
  },
  {
    id: 15,
    timestamp: "2026-03-24 11:00:45",
    user: "Dr. Priya Nair",
    role: "College Faculty",
    action: "Updated Course",
    details: "Updated course syllabus for Advanced Mathematics (MTH301)",
    category: "Grade",
  },
  {
    id: 16,
    timestamp: "2026-03-24 12:30:15",
    user: "Mr. Arun Pillai",
    role: "Teacher",
    action: "Graded Assignment",
    details: "Graded 24 Python Loops assignments for Class 10",
    category: "Grade",
  },
  {
    id: 17,
    timestamp: "2026-03-23 09:00:00",
    user: "Administrator",
    role: "Admin",
    action: "Added Transport Route",
    details: "Added bus route BUS-07 covering North Sector",
    category: "System",
  },
  {
    id: 18,
    timestamp: "2026-03-23 10:15:22",
    user: "Administrator",
    role: "Admin",
    action: "Recorded Payment",
    details: "Recorded online payment of ₹45,000 from Arjun Sharma",
    category: "Finance",
  },
  {
    id: 19,
    timestamp: "2026-03-23 11:45:10",
    user: "Mrs. Priya Menon",
    role: "Teacher",
    action: "Returned Book",
    details: "Marked book '1984' as returned by Lily Zhang (fine: ₹32)",
    category: "Library",
  },
  {
    id: 20,
    timestamp: "2026-03-23 14:00:00",
    user: "Administrator",
    role: "Admin",
    action: "Created Club",
    details: "Created new club 'Photography Club' with 0 members",
    category: "Student",
  },
  {
    id: 21,
    timestamp: "2026-03-22 09:30:00",
    user: "Administrator",
    role: "Admin",
    action: "Bulk Import",
    details: "Imported 15 student records via CSV for Class 8-A",
    category: "Student",
  },
  {
    id: 22,
    timestamp: "2026-03-22 10:00:00",
    user: "Administrator",
    role: "Admin",
    action: "Updated Academic Year",
    details: "Switched active academic year to 2026-27",
    category: "System",
  },
];

const CATEGORIES = [
  "All",
  "Student",
  "Grade",
  "Finance",
  "Library",
  "Attendance",
  "System",
];

const categoryColor: Record<string, string> = {
  Student: "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100",
  Grade: "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100",
  Finance: "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100",
  Library: "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100",
  Attendance: "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100",
  System: "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200",
};

export default function AuditLogPage() {
  const { t } = useLanguage();
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const stored: AuditEntry[] = (() => {
    try {
      return JSON.parse(localStorage.getItem("edumanage_audit_log") || "[]");
    } catch {
      return [];
    }
  })();

  const allLogs = [...SEED_LOGS, ...stored].sort((a, b) =>
    b.timestamp.localeCompare(a.timestamp),
  );

  const filtered = allLogs.filter((entry) => {
    const matchSearch =
      entry.user.toLowerCase().includes(search.toLowerCase()) ||
      entry.action.toLowerCase().includes(search.toLowerCase()) ||
      entry.details.toLowerCase().includes(search.toLowerCase());
    const matchCategory =
      categoryFilter === "All" || entry.category === categoryFilter;
    return matchSearch && matchCategory;
  });

  const exportCsv = () => {
    const header = "Timestamp,User,Role,Action,Details,Category";
    const rows = filtered.map(
      (e) =>
        `"${e.timestamp}","${e.user}","${e.role}","${e.action}","${e.details}","${e.category}"`,
    );
    const blob = new Blob([[header, ...rows].join("\n")], {
      type: "text/csv",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "audit_log.csv";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Audit log exported");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold">{t("auditLog")}</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {filtered.length} entries — full activity history
          </p>
        </div>
        <Button
          onClick={exportCsv}
          variant="outline"
          className="flex items-center gap-2"
          data-ocid="auditlog.download_button"
        >
          <Download size={15} /> Export CSV
        </Button>
      </div>

      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            placeholder="Search by user or action..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
            data-ocid="auditlog.search_input"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-40" data-ocid="auditlog.category_select">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {CATEGORIES.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
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
                  <TableHead className="whitespace-nowrap">Timestamp</TableHead>
                  <TableHead className="dark:text-gray-300">User</TableHead>
                  <TableHead>{t("role")}</TableHead>
                  <TableHead className="dark:text-gray-300">Action</TableHead>
                  <TableHead className="dark:text-gray-300">Details</TableHead>
                  <TableHead className="dark:text-gray-300">Category</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center py-10 text-muted-foreground"
                      data-ocid="auditlog.empty_state"
                    >
                      <ClipboardList
                        size={28}
                        className="mx-auto mb-2 opacity-40"
                      />
                      No log entries found
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((entry, idx) => (
                    <TableRow
                      key={entry.id}
                      data-ocid={`auditlog.item.${idx + 1}`}
                    >
                      <TableCell className="text-xs text-muted-foreground whitespace-nowrap font-mono">
                        {entry.timestamp}
                      </TableCell>
                      <TableCell className="font-medium text-sm">
                        {entry.user}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {entry.role}
                      </TableCell>
                      <TableCell className="text-sm font-medium">
                        {entry.action}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground max-w-xs">
                        {entry.details}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`text-xs ${categoryColor[entry.category] ?? "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200"}`}
                        >
                          {entry.category}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
