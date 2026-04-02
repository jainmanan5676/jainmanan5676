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
import { BookOpen, Briefcase, Plus, Search, Trash2, Users } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type Faculty = {
  id: string;
  name: string;
  department: string;
  designation:
    | "Lecturer"
    | "Assistant Professor"
    | "Associate Professor"
    | "Professor";
  courses: string;
  email: string;
  officeHours: string;
};

const sampleFaculty: Faculty[] = [
  {
    id: "FAC-CS-001",
    name: "Dr. Amit Verma",
    department: "Computer Science",
    designation: "Professor",
    courses: "Data Structures, Algorithms, ML",
    email: "amit.verma@university.edu",
    officeHours: "Mon-Wed 10am-12pm",
  },
  {
    id: "FAC-BBA-002",
    name: "Prof. Kavita Reddy",
    department: "Business",
    designation: "Associate Professor",
    courses: "Marketing, Consumer Behavior",
    email: "kavita.reddy@university.edu",
    officeHours: "Tue-Thu 2pm-4pm",
  },
  {
    id: "FAC-ME-003",
    name: "Dr. Suresh Kumar",
    department: "Mechanical Engineering",
    designation: "Assistant Professor",
    courses: "Thermodynamics, Fluid Mechanics",
    email: "suresh.kumar@university.edu",
    officeHours: "Mon-Fri 9am-10am",
  },
  {
    id: "FAC-CS-004",
    name: "Ms. Neha Agarwal",
    department: "Computer Science",
    designation: "Lecturer",
    courses: "Web Development, Database Systems",
    email: "neha.agarwal@university.edu",
    officeHours: "Wed-Fri 11am-1pm",
  },
  {
    id: "FAC-EE-005",
    name: "Dr. Rajesh Pillai",
    department: "Electrical Engineering",
    designation: "Professor",
    courses: "Circuit Theory, Signal Processing",
    email: "rajesh.pillai@university.edu",
    officeHours: "Tue-Thu 10am-12pm",
  },
  {
    id: "FAC-BBA-006",
    name: "Prof. Meera Jain",
    department: "Business",
    designation: "Associate Professor",
    courses: "Finance, Corporate Accounting",
    email: "meera.jain@university.edu",
    officeHours: "Mon-Wed 3pm-5pm",
  },
  {
    id: "FAC-CE-007",
    name: "Dr. Harish Nair",
    department: "Civil Engineering",
    designation: "Assistant Professor",
    courses: "Structural Analysis, Geotechnics",
    email: "harish.nair@university.edu",
    officeHours: "Thu-Fri 9am-11am",
  },
  {
    id: "FAC-CS-008",
    name: "Mr. Deepak Malhotra",
    department: "Computer Science",
    designation: "Lecturer",
    courses: "Operating Systems, Computer Networks",
    email: "deepak.m@university.edu",
    officeHours: "Mon-Tue 1pm-3pm",
  },
];

const departments = [
  "Computer Science",
  "Business",
  "Mechanical Engineering",
  "Electrical Engineering",
  "Civil Engineering",
];
const designations: Faculty["designation"][] = [
  "Lecturer",
  "Assistant Professor",
  "Associate Professor",
  "Professor",
];

const emptyForm = (): Omit<Faculty, "id"> => ({
  name: "",
  department: "",
  designation: "Lecturer",
  courses: "",
  email: "",
  officeHours: "",
});

export default function FacultyPage() {
  const { t } = useLanguage();
  const [faculty, setFaculty] = useState<Faculty[]>(sampleFaculty);
  const [search, setSearch] = useState("");
  const [filterDept, setFilterDept] = useState("all");
  const [filterDesig, setFilterDesig] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm());
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = faculty.filter((f) => {
    const matchSearch =
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.id.toLowerCase().includes(search.toLowerCase());
    const matchDept = filterDept === "all" || f.department === filterDept;
    const matchDesig = filterDesig === "all" || f.designation === filterDesig;
    return matchSearch && matchDept && matchDesig;
  });

  const openAdd = () => {
    setEditId(null);
    setForm(emptyForm());
    setDialogOpen(true);
  };
  const openEdit = (f: Faculty) => {
    setEditId(f.id);
    setForm({
      name: f.name,
      department: f.department,
      designation: f.designation,
      courses: f.courses,
      email: f.email,
      officeHours: f.officeHours,
    });
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!form.name.trim() || !form.department || !form.email.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }
    if (editId) {
      setFaculty((prev) =>
        prev.map((f) => (f.id === editId ? { ...f, ...form } : f)),
      );
      toast.success("College Faculty updated.");
    } else {
      const newId = `FAC-${form.department
        .split(" ")
        .map((w) => w[0])
        .join("")}-${String(faculty.length + 1).padStart(3, "0")}`;
      setFaculty((prev) => [...prev, { id: newId, ...form }]);
      toast.success("College Faculty member added.");
    }
    setDialogOpen(false);
  };

  const handleDelete = () => {
    if (!deleteId) return;
    setFaculty((prev) => prev.filter((f) => f.id !== deleteId));
    setDeleteId(null);
    toast.success("College Faculty member removed.");
  };

  const uniqueDepts = new Set(faculty.map((f) => f.department)).size;
  const professorCount = faculty.filter(
    (f) =>
      f.designation === "Professor" || f.designation === "Associate Professor",
  ).length;
  const avgCourses = faculty.length
    ? (
        faculty.reduce((acc, f) => acc + f.courses.split(",").length, 0) /
        faculty.length
      ).toFixed(1)
    : "0";

  const designationColor: Record<Faculty["designation"], string> = {
    Professor: "bg-black text-white",
    "Associate Professor": "bg-gray-700 text-white",
    "Assistant Professor": "bg-gray-400 text-white",
    Lecturer: "bg-gray-200 text-gray-800 dark:text-gray-100",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            College Faculty
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            Manage faculty members and their assignments
          </p>
        </div>
        <Button
          className="bg-black text-white hover:bg-gray-900 gap-2"
          onClick={openAdd}
          data-ocid="faculty.add_button"
        >
          <Plus size={16} /> Add College Faculty
        </Button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Total College Faculty",
            value: faculty.length,
            icon: <Users size={20} />,
          },
          {
            label: "Departments",
            value: uniqueDepts,
            icon: <Briefcase size={20} />,
          },
          {
            label: "Professors",
            value: professorCount,
            icon: <BookOpen size={20} />,
          },
          {
            label: "Avg Courses",
            value: avgCourses,
            icon: <BookOpen size={20} />,
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
                data-ocid="faculty.search_input"
              />
            </div>
            <Select value={filterDept} onValueChange={setFilterDept}>
              <SelectTrigger
                className="w-48"
                data-ocid="faculty.department.select"
              >
                <SelectValue placeholder="All Departments" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map((d) => (
                  <SelectItem key={d} value={d}>
                    {d}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterDesig} onValueChange={setFilterDesig}>
              <SelectTrigger
                className="w-52"
                data-ocid="faculty.designation.select"
              >
                <SelectValue placeholder="All Designations" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Designations</SelectItem>
                {designations.map((d) => (
                  <SelectItem key={d} value={d}>
                    {d}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="dark:text-gray-300">Faculty ID</TableHead>
                <TableHead>{t("name")}</TableHead>
                <TableHead className="dark:text-gray-300">Department</TableHead>
                <TableHead className="dark:text-gray-300">
                  Designation
                </TableHead>
                <TableHead className="dark:text-gray-300">Courses</TableHead>
                <TableHead>{t("email")}</TableHead>
                <TableHead className="dark:text-gray-300">
                  Office Hours
                </TableHead>
                <TableHead>{t("actions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="text-center text-gray-400 py-8"
                    data-ocid="faculty.empty_state"
                  >
                    No faculty found.
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((f, idx) => (
                  <TableRow key={f.id} data-ocid={`faculty.item.${idx + 1}`}>
                    <TableCell className="font-mono text-xs">{f.id}</TableCell>
                    <TableCell className="font-medium">{f.name}</TableCell>
                    <TableCell className="text-sm text-gray-600 dark:text-gray-300">
                      {f.department}
                    </TableCell>
                    <TableCell>
                      <Badge className={designationColor[f.designation]}>
                        {f.designation}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600 dark:text-gray-300 max-w-[150px] truncate">
                      {f.courses}
                    </TableCell>
                    <TableCell className="text-sm text-gray-600 dark:text-gray-300">
                      {f.email}
                    </TableCell>
                    <TableCell className="text-sm text-gray-600 dark:text-gray-300">
                      {f.officeHours}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openEdit(f)}
                          data-ocid={`faculty.edit_button.${idx + 1}`}
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-gray-600 dark:text-gray-300 hover:text-gray-700 dark:text-gray-200"
                          onClick={() => setDeleteId(f.id)}
                          data-ocid={`faculty.delete_button.${idx + 1}`}
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

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md" data-ocid="faculty.dialog">
          <DialogHeader>
            <DialogTitle>
              {editId ? "Edit College Faculty" : "Add College Faculty Member"}
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
                data-ocid="faculty.name.input"
              />
            </div>
            <div>
              <Label>Department *</Label>
              <Select
                value={form.department}
                onValueChange={(v) => setForm((f) => ({ ...f, department: v }))}
              >
                <SelectTrigger
                  className="mt-1"
                  data-ocid="faculty.department_form.select"
                >
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((d) => (
                    <SelectItem key={d} value={d}>
                      {d}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Designation</Label>
              <Select
                value={form.designation}
                onValueChange={(v) =>
                  setForm((f) => ({
                    ...f,
                    designation: v as Faculty["designation"],
                  }))
                }
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {designations.map((d) => (
                    <SelectItem key={d} value={d}>
                      {d}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Courses Taught</Label>
              <Input
                className="mt-1"
                placeholder="e.g. Data Structures, Algorithms"
                value={form.courses}
                onChange={(e) =>
                  setForm((f) => ({ ...f, courses: e.target.value }))
                }
                data-ocid="faculty.courses.input"
              />
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
                data-ocid="faculty.email.input"
              />
            </div>
            <div>
              <Label>Office Hours</Label>
              <Input
                className="mt-1"
                placeholder="e.g. Mon-Wed 10am-12pm"
                value={form.officeHours}
                onChange={(e) =>
                  setForm((f) => ({ ...f, officeHours: e.target.value }))
                }
                data-ocid="faculty.office_hours.input"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDialogOpen(false)}
              data-ocid="faculty.cancel_button"
            >
              Cancel
            </Button>
            <Button
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={handleSave}
              data-ocid="faculty.save_button"
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)}>
        <DialogContent data-ocid="faculty.delete_dialog">
          <DialogHeader>
            <DialogTitle>Remove College Faculty</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Are you sure you want to remove this faculty member?
          </p>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteId(null)}
              data-ocid="faculty.delete_cancel_button"
            >
              Cancel
            </Button>
            <Button
              className="bg-gray-600 text-white hover:bg-gray-700"
              onClick={handleDelete}
              data-ocid="faculty.delete_confirm_button"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
