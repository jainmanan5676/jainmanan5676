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
import { useLanguage } from "@/contexts/LanguageContext";
import {
  BookOpen,
  GraduationCap,
  Plus,
  Search,
  Trash2,
  UserCheck,
  Users,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type CollegeStudent = {
  id: string;
  name: string;
  program: string;
  semester: number;
  gpa: number;
  email: string;
  status: "Active" | "Inactive";
};

const sampleStudents: CollegeStudent[] = [
  {
    id: "CS-2021-001",
    name: "Aryan Kapoor",
    program: "Computer Science",
    semester: 6,
    gpa: 3.8,
    email: "aryan.k@university.edu",
    status: "Active",
  },
  {
    id: "BBA-2022-012",
    name: "Priya Sharma",
    program: "Business Administration",
    semester: 4,
    gpa: 3.5,
    email: "priya.s@university.edu",
    status: "Active",
  },
  {
    id: "CE-2021-007",
    name: "Rohan Mehta",
    program: "Civil Engineering",
    semester: 7,
    gpa: 3.2,
    email: "rohan.m@university.edu",
    status: "Active",
  },
  {
    id: "ME-2023-003",
    name: "Sneha Patel",
    program: "Mechanical Engineering",
    semester: 2,
    gpa: 3.9,
    email: "sneha.p@university.edu",
    status: "Active",
  },
  {
    id: "CS-2020-045",
    name: "Vikram Singh",
    program: "Computer Science",
    semester: 8,
    gpa: 3.4,
    email: "vikram.s@university.edu",
    status: "Active",
  },
  {
    id: "BBA-2021-019",
    name: "Ananya Gupta",
    program: "Business Administration",
    semester: 5,
    gpa: 2.9,
    email: "ananya.g@university.edu",
    status: "Inactive",
  },
  {
    id: "EE-2022-008",
    name: "Karan Joshi",
    program: "Electrical Engineering",
    semester: 3,
    gpa: 3.6,
    email: "karan.j@university.edu",
    status: "Active",
  },
  {
    id: "CS-2023-021",
    name: "Divya Nair",
    program: "Computer Science",
    semester: 1,
    gpa: 3.7,
    email: "divya.n@university.edu",
    status: "Active",
  },
];

const programs = [
  "Computer Science",
  "Business Administration",
  "Civil Engineering",
  "Mechanical Engineering",
  "Electrical Engineering",
];

const emptyForm = (): Omit<CollegeStudent, "id"> => ({
  name: "",
  program: "",
  semester: 1,
  gpa: 0,
  email: "",
  status: "Active",
});

export default function CollegeStudentsPage() {
  const { t } = useLanguage();
  const [students, setStudents] = useState<CollegeStudent[]>(sampleStudents);
  const [search, setSearch] = useState("");
  const [filterProgram, setFilterProgram] = useState("all");
  const [filterSemester, setFilterSemester] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm());
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = students.filter((s) => {
    const matchSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.id.toLowerCase().includes(search.toLowerCase());
    const matchProgram = filterProgram === "all" || s.program === filterProgram;
    const matchSem =
      filterSemester === "all" || s.semester === Number(filterSemester);
    return matchSearch && matchProgram && matchSem;
  });

  const openAdd = () => {
    setEditId(null);
    setForm(emptyForm());
    setDialogOpen(true);
  };

  const openEdit = (s: CollegeStudent) => {
    setEditId(s.id);
    setForm({
      name: s.name,
      program: s.program,
      semester: s.semester,
      gpa: s.gpa,
      email: s.email,
      status: s.status,
    });
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!form.name.trim() || !form.program || !form.email.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }
    if (editId) {
      setStudents((prev) =>
        prev.map((s) => (s.id === editId ? { ...s, ...form } : s)),
      );
      toast.success("Student updated successfully.");
    } else {
      const newId = `${form.program
        .split(" ")
        .map((w) => w[0])
        .join(
          "",
        )}-${new Date().getFullYear()}-${String(students.length + 1).padStart(3, "0")}`;
      setStudents((prev) => [...prev, { id: newId, ...form }]);
      toast.success("Student added successfully.");
    }
    setDialogOpen(false);
  };

  const handleDelete = () => {
    if (!deleteId) return;
    setStudents((prev) => prev.filter((s) => s.id !== deleteId));
    setDeleteId(null);
    toast.success("Student removed.");
  };

  const avgGpa = students.length
    ? (students.reduce((acc, s) => acc + s.gpa, 0) / students.length).toFixed(2)
    : "0.00";
  const uniquePrograms = new Set(students.map((s) => s.program)).size;
  const activeCount = students.filter((s) => s.status === "Active").length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            College Students
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            Manage undergraduate and graduate students
          </p>
        </div>
        <Button
          className="bg-black text-white hover:bg-gray-900 gap-2"
          onClick={openAdd}
          data-ocid="college_students.add_button"
        >
          <Plus size={16} /> Add Student
        </Button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Total Students",
            value: students.length,
            icon: <Users size={20} />,
          },
          {
            label: "Active",
            value: activeCount,
            icon: <UserCheck size={20} />,
          },
          {
            label: "Programs",
            value: uniquePrograms,
            icon: <BookOpen size={20} />,
          },
          {
            label: "Avg GPA",
            value: avgGpa,
            icon: <GraduationCap size={20} />,
          },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-0.5">
                    {stat.value}
                  </p>
                </div>
                <div className="text-gray-400">{stat.icon}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <div className="relative flex-1">
              <Search
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <Input
                placeholder="Search by name or ID..."
                className="pl-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                data-ocid="college_students.search_input"
              />
            </div>
            <Select value={filterProgram} onValueChange={setFilterProgram}>
              <SelectTrigger
                className="w-48"
                data-ocid="college_students.program.select"
              >
                <SelectValue placeholder="All Programs" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Programs</SelectItem>
                {programs.map((p) => (
                  <SelectItem key={p} value={p}>
                    {p}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterSemester} onValueChange={setFilterSemester}>
              <SelectTrigger
                className="w-40"
                data-ocid="college_students.semester.select"
              >
                <SelectValue placeholder="All Semesters" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Semesters</SelectItem>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                  <SelectItem key={n} value={String(n)}>
                    Semester {n}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="dark:text-gray-300">Student ID</TableHead>
                <TableHead>{t("name")}</TableHead>
                <TableHead className="dark:text-gray-300">Program</TableHead>
                <TableHead className="dark:text-gray-300">Semester</TableHead>
                <TableHead className="dark:text-gray-300">GPA</TableHead>
                <TableHead>{t("email")}</TableHead>
                <TableHead>{t("status")}</TableHead>
                <TableHead>{t("actions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="text-center text-gray-400 py-8"
                    data-ocid="college_students.empty_state"
                  >
                    No students found.
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((s, idx) => (
                  <TableRow
                    key={s.id}
                    data-ocid={`college_students.item.${idx + 1}`}
                  >
                    <TableCell className="font-mono text-xs">{s.id}</TableCell>
                    <TableCell className="font-medium">{s.name}</TableCell>
                    <TableCell className="text-sm text-gray-600 dark:text-gray-300">
                      {s.program}
                    </TableCell>
                    <TableCell>{s.semester}</TableCell>
                    <TableCell>
                      <span
                        className={`font-semibold ${s.gpa >= 3.5 ? "text-gray-700 dark:text-gray-200" : s.gpa >= 3.0 ? "text-gray-700 dark:text-gray-200" : "text-gray-700 dark:text-gray-200"}`}
                      >
                        {s.gpa.toFixed(1)}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600 dark:text-gray-300">
                      {s.email}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          s.status === "Active" ? "default" : "secondary"
                        }
                        className={
                          s.status === "Active" ? "bg-black text-white" : ""
                        }
                      >
                        {s.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openEdit(s)}
                          data-ocid={`college_students.edit_button.${idx + 1}`}
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-gray-600 dark:text-gray-300 hover:text-gray-700 dark:text-gray-200"
                          onClick={() => setDeleteId(s.id)}
                          data-ocid={`college_students.delete_button.${idx + 1}`}
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md" data-ocid="college_students.dialog">
          <DialogHeader>
            <DialogTitle>
              {editId ? "Edit Student" : "Add College Student"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <Label>Full Name *</Label>
              <Input
                className="mt-1"
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
                data-ocid="college_students.name.input"
              />
            </div>
            <div>
              <Label>Program *</Label>
              <Select
                value={form.program}
                onValueChange={(v) => setForm((f) => ({ ...f, program: v }))}
              >
                <SelectTrigger
                  className="mt-1"
                  data-ocid="college_students.program_form.select"
                >
                  <SelectValue placeholder="Select program" />
                </SelectTrigger>
                <SelectContent>
                  {programs.map((p) => (
                    <SelectItem key={p} value={p}>
                      {p}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Semester</Label>
                <Select
                  value={String(form.semester)}
                  onValueChange={(v) =>
                    setForm((f) => ({ ...f, semester: Number(v) }))
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                      <SelectItem key={n} value={String(n)}>
                        {n}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>GPA</Label>
                <Input
                  className="mt-1"
                  type="number"
                  min="0"
                  max="4"
                  step="0.1"
                  value={form.gpa}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      gpa: Number.parseFloat(e.target.value) || 0,
                    }))
                  }
                  data-ocid="college_students.gpa.input"
                />
              </div>
            </div>
            <div>
              <Label>Email *</Label>
              <Input
                className="mt-1"
                type="email"
                value={form.email}
                onChange={(e) =>
                  setForm((f) => ({ ...f, email: e.target.value }))
                }
                data-ocid="college_students.email.input"
              />
            </div>
            <div>
              <Label>{t("status")}</Label>
              <Select
                value={form.status}
                onValueChange={(v) =>
                  setForm((f) => ({ ...f, status: v as "Active" | "Inactive" }))
                }
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDialogOpen(false)}
              data-ocid="college_students.cancel_button"
            >
              Cancel
            </Button>
            <Button
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={handleSave}
              data-ocid="college_students.save_button"
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirm */}
      <Dialog open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)}>
        <DialogContent data-ocid="college_students.delete_dialog">
          <DialogHeader>
            <DialogTitle>Remove Student</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Are you sure you want to remove this student? This action cannot be
            undone.
          </p>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteId(null)}
              data-ocid="college_students.delete_cancel_button"
            >
              Cancel
            </Button>
            <Button
              className="bg-gray-600 text-white hover:bg-gray-700"
              onClick={handleDelete}
              data-ocid="college_students.delete_confirm_button"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
