import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
import { GraduationCap, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type Teacher = {
  id: number;
  name: string;
  subjects: string;
  contact: string;
  qualification: string;
  department: string;
  status: string;
};

const SEED: Teacher[] = [
  {
    id: 1,
    name: "Mr. Raj Kumar",
    subjects: "Mathematics, Calculus",
    contact: "9811001001",
    qualification: "M.Sc Mathematics",
    department: "Science",
    status: "Active",
  },
  {
    id: 2,
    name: "Ms. Sarah Lee",
    subjects: "Physics",
    contact: "9811001002",
    qualification: "M.Sc Physics",
    department: "Science",
    status: "Active",
  },
  {
    id: 3,
    name: "Dr. James Park",
    subjects: "Chemistry",
    contact: "9811001003",
    qualification: "Ph.D Chemistry",
    department: "Science",
    status: "Active",
  },
  {
    id: 4,
    name: "Ms. Priya Nair",
    subjects: "Biology",
    contact: "9811001004",
    qualification: "M.Sc Biology",
    department: "Science",
    status: "Active",
  },
  {
    id: 5,
    name: "Mr. David Chen",
    subjects: "English Literature",
    contact: "9811001005",
    qualification: "M.A. English",
    department: "Languages",
    status: "Active",
  },
  {
    id: 6,
    name: "Mr. Ali Hassan",
    subjects: "World History",
    contact: "9811001006",
    qualification: "M.A. History",
    department: "Humanities",
    status: "Active",
  },
  {
    id: 7,
    name: "Mr. Kevin Tan",
    subjects: "Computer Science",
    contact: "9811001007",
    qualification: "M.Tech CS",
    department: "Technology",
    status: "Active",
  },
  {
    id: 8,
    name: "Mr. Omar Diallo",
    subjects: "Physical Education",
    contact: "9811001008",
    qualification: "B.P.Ed",
    department: "Sports",
    status: "On Leave",
  },
];

const DEPTS = [
  "Science",
  "Languages",
  "Humanities",
  "Technology",
  "Sports",
  "Arts",
  "Commerce",
];
const EMPTY = {
  name: "",
  subjects: "",
  contact: "",
  qualification: "",
  department: "",
  status: "Active",
};

export default function TeachersPage() {
  const { t } = useLanguage();
  const [teachers, setTeachers] = useState<Teacher[]>(SEED);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [nextId, setNextId] = useState(SEED.length + 1);

  const filtered = teachers.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.department.toLowerCase().includes(search.toLowerCase()) ||
      t.subjects.toLowerCase().includes(search.toLowerCase()),
  );

  const openAdd = () => {
    setEditId(null);
    setForm(EMPTY);
    setOpen(true);
  };
  const openEdit = (teacher: Teacher) => {
    setEditId(teacher.id);
    setForm({
      name: teacher.name,
      subjects: teacher.subjects,
      contact: teacher.contact,
      qualification: teacher.qualification,
      department: teacher.department,
      status: teacher.status,
    });
    setOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name) {
      toast.error("Name is required");
      return;
    }
    if (editId !== null) {
      setTeachers((prev) =>
        prev.map((t) => (t.id === editId ? { ...t, ...form } : t)),
      );
      toast.success(`${t("update")} ${t("teachers")}`);
    } else {
      setTeachers((prev) => [...prev, { id: nextId, ...form }]);
      setNextId((n) => n + 1);
      toast.success(t("addTeacher"));
    }
    setOpen(false);
  };

  const handleDelete = () => {
    setTeachers((prev) => prev.filter((t) => t.id !== deleteId));
    setDeleteId(null);
    toast.success(t("delete"));
  };
  const f = (k: keyof typeof EMPTY, v: string) =>
    setForm((p) => ({ ...p, [k]: v }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold dark:text-white">
            {t("teachersPage")}
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {teachers.length} teaching staff
          </p>
        </div>
        <Button
          onClick={openAdd}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
          data-ocid="teachers.primary_button"
        >
          <Plus size={16} className="mr-2" /> {t("addTeacher")}
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: t("totalTeachers"), value: teachers.length },
          {
            label: t("active"),
            value: teachers.filter((t) => t.status === "Active").length,
          },
          {
            label: t("departments"),
            value: new Set(teachers.map((t) => t.department)).size,
          },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                <GraduationCap size={20} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold dark:text-white">
                  {stat.value}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <Search size={16} className="text-muted-foreground" />
            <Input
              placeholder={t("searchTeachers")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-sm dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600"
              data-ocid="teachers.search_input"
            />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="dark:text-gray-300">
                  {t("name")}
                </TableHead>
                <TableHead className="dark:text-gray-300">
                  {t("subjects")}
                </TableHead>
                <TableHead className="dark:text-gray-300">
                  {t("department")}
                </TableHead>
                <TableHead className="dark:text-gray-300">
                  {t("qualification")}
                </TableHead>
                <TableHead className="dark:text-gray-300">
                  {t("contactNo")}
                </TableHead>
                <TableHead className="dark:text-gray-300">
                  {t("status")}
                </TableHead>
                <TableHead className="dark:text-gray-300">
                  {t("actions")}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center text-muted-foreground py-8"
                    data-ocid="teachers.empty_state"
                  >
                    {t("noData")}
                  </TableCell>
                </TableRow>
              )}
              {filtered.map((teacher, i) => (
                <TableRow key={teacher.id} data-ocid={`teachers.item.${i + 1}`}>
                  <TableCell className="font-medium dark:text-gray-200">
                    {teacher.name}
                  </TableCell>
                  <TableCell className="text-sm dark:text-gray-300">
                    {teacher.subjects}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{teacher.department}</Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {teacher.qualification}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {teacher.contact}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        teacher.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : teacher.status === "On Leave"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-red-100 text-red-700"
                      }
                    >
                      {teacher.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openEdit(teacher)}
                        data-ocid={`teachers.edit_button.${i + 1}`}
                      >
                        <Pencil size={14} />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-gray-600 dark:text-gray-300"
                        onClick={() => setDeleteId(teacher.id)}
                        data-ocid={`teachers.delete_button.${i + 1}`}
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editId ? t("edit") : t("addTeacher")}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <Label>{t("name")} *</Label>
              <Input
                value={form.name}
                onChange={(e) => f("name", e.target.value)}
                placeholder={t("name")}
                data-ocid="teachers.input"
              />
            </div>
            <div className="space-y-1">
              <Label>{t("subjects")}</Label>
              <Input
                value={form.subjects}
                onChange={(e) => f("subjects", e.target.value)}
                placeholder="Math, Physics"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label>{t("department")}</Label>
                <Select
                  value={form.department}
                  onValueChange={(v) => f("department", v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t("department")} />
                  </SelectTrigger>
                  <SelectContent>
                    {DEPTS.map((d) => (
                      <SelectItem key={d} value={d}>
                        {d}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label>{t("status")}</Label>
                <Select
                  value={form.status}
                  onValueChange={(v) => f("status", v)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">{t("active")}</SelectItem>
                    <SelectItem value="On Leave">On Leave</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-1">
              <Label>{t("qualification")}</Label>
              <Input
                value={form.qualification}
                onChange={(e) => f("qualification", e.target.value)}
                placeholder="e.g. M.Sc Mathematics"
              />
            </div>
            <div className="space-y-1">
              <Label>{t("contactNo")}</Label>
              <Input
                value={form.contact}
                onChange={(e) => f("contact", e.target.value)}
                placeholder={t("phone")}
              />
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                {t("cancel")}
              </Button>
              <Button
                type="submit"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                data-ocid="teachers.submit_button"
              >
                {editId ? t("update") : t("addTeacher")}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={deleteId !== null}
        onOpenChange={(o) => !o && setDeleteId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {t("delete")} {t("teachers")}
            </AlertDialogTitle>
            <AlertDialogDescription>
              Permanently remove this teacher from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive hover:bg-destructive/90"
            >
              {t("delete")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
