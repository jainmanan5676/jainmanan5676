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
import { BookOpen, Clock, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type Subject = {
  id: number;
  name: string;
  code: string;
  department: string;
  teacher: string;
  classes: number;
  weeklyHours: number;
};

type ClassLevel =
  | "all"
  | "nursery-ukg"
  | "class-1-5"
  | "class-6-10"
  | "class-11-12-science"
  | "class-11-12-commerce"
  | "class-11-12-arts";

const CLASS_LEVEL_SUBJECTS: Record<string, string[]> = {
  "nursery-ukg": [
    "Rhymes & Phonics",
    "Drawing & Coloring",
    "Play Activities",
    "Story Time",
    "Motor Skills Development",
    "Music & Movement",
  ],
  "class-1-5": [
    "English",
    "Hindi",
    "Mathematics",
    "Environmental Science (EVS)",
    "Drawing",
    "Physical Education",
    "General Knowledge",
  ],
  "class-6-10": [
    "English",
    "Hindi",
    "Mathematics",
    "Science",
    "Social Studies",
    "Computer Science",
    "Physical Education",
    "Sanskrit",
  ],
  "class-11-12-science": [
    "Physics",
    "Chemistry",
    "Biology",
    "Mathematics",
    "English",
    "Physical Education",
    "Computer Science",
  ],
  "class-11-12-commerce": [
    "Accountancy",
    "Business Studies",
    "Economics",
    "English",
    "Mathematics",
    "Physical Education",
  ],
  "class-11-12-arts": [
    "History",
    "Geography",
    "Political Science",
    "English",
    "Sociology",
    "Physical Education",
    "Psychology",
  ],
};

const CLASS_LEVEL_LABELS: Record<ClassLevel, string> = {
  all: "All Levels",
  "nursery-ukg": "Nursery – UKG (Play-based)",
  "class-1-5": "Class 1 – 5 (Primary)",
  "class-6-10": "Class 6 – 10 (Secondary)",
  "class-11-12-science": "Class 11 – 12 (Science Stream)",
  "class-11-12-commerce": "Class 11 – 12 (Commerce Stream)",
  "class-11-12-arts": "Class 11 – 12 (Arts Stream)",
};

const SEED: Subject[] = [
  {
    id: 1,
    name: "Mathematics",
    code: "MTH101",
    department: "Science",
    teacher: "Mr. Raj Kumar",
    classes: 6,
    weeklyHours: 5,
  },
  {
    id: 2,
    name: "Physics",
    code: "PHY101",
    department: "Science",
    teacher: "Ms. Sarah Lee",
    classes: 4,
    weeklyHours: 4,
  },
  {
    id: 3,
    name: "Chemistry",
    code: "CHM101",
    department: "Science",
    teacher: "Dr. James Park",
    classes: 4,
    weeklyHours: 4,
  },
  {
    id: 4,
    name: "Biology",
    code: "BIO101",
    department: "Science",
    teacher: "Ms. Priya Nair",
    classes: 3,
    weeklyHours: 3,
  },
  {
    id: 5,
    name: "English Literature",
    code: "ENG101",
    department: "Languages",
    teacher: "Mr. David Chen",
    classes: 6,
    weeklyHours: 4,
  },
  {
    id: 6,
    name: "English Grammar",
    code: "ENG102",
    department: "Languages",
    teacher: "Ms. Emily Rose",
    classes: 6,
    weeklyHours: 3,
  },
  {
    id: 7,
    name: "World History",
    code: "HST101",
    department: "Humanities",
    teacher: "Mr. Ali Hassan",
    classes: 5,
    weeklyHours: 3,
  },
  {
    id: 8,
    name: "Geography",
    code: "GEO101",
    department: "Humanities",
    teacher: "Ms. Clara Stone",
    classes: 4,
    weeklyHours: 3,
  },
  {
    id: 9,
    name: "Computer Science",
    code: "CS101",
    department: "Technology",
    teacher: "Mr. Kevin Tan",
    classes: 5,
    weeklyHours: 4,
  },
  {
    id: 10,
    name: "Physical Education",
    code: "PE101",
    department: "Sports",
    teacher: "Mr. Omar Diallo",
    classes: 6,
    weeklyHours: 2,
  },
  {
    id: 11,
    name: "Hindi",
    code: "HIN101",
    department: "Languages",
    teacher: "Ms. Sunita Rao",
    classes: 6,
    weeklyHours: 3,
  },
  {
    id: 12,
    name: "Science",
    code: "SCI101",
    department: "Science",
    teacher: "Dr. James Park",
    classes: 5,
    weeklyHours: 4,
  },
  {
    id: 13,
    name: "Social Studies",
    code: "SS101",
    department: "Humanities",
    teacher: "Mr. Ali Hassan",
    classes: 4,
    weeklyHours: 3,
  },
  {
    id: 14,
    name: "Accountancy",
    code: "ACC101",
    department: "Commerce",
    teacher: "Ms. Kavita Singh",
    classes: 2,
    weeklyHours: 4,
  },
  {
    id: 15,
    name: "Economics",
    code: "ECO101",
    department: "Commerce",
    teacher: "Mr. Ramesh Gupta",
    classes: 2,
    weeklyHours: 3,
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
const TEACHERS = [
  "Mr. Raj Kumar",
  "Ms. Sarah Lee",
  "Dr. James Park",
  "Ms. Priya Nair",
  "Mr. David Chen",
  "Ms. Emily Rose",
  "Mr. Ali Hassan",
  "Ms. Clara Stone",
  "Mr. Kevin Tan",
  "Mr. Omar Diallo",
];
const EMPTY = {
  name: "",
  code: "",
  department: "",
  teacher: "",
  classes: "",
  weeklyHours: "",
};

const deptColor: Record<string, string> = {
  Science: "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100",
  Languages: "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100",
  Humanities: "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100",
  Technology: "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100",
  Sports: "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100",
  Arts: "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100",
  Commerce: "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100",
};

export default function SubjectsPage() {
  const { t } = useLanguage();
  const [subjects, setSubjects] = useState<Subject[]>(SEED);
  const [search, setSearch] = useState("");
  const [classLevel, setClassLevel] = useState<ClassLevel>("all");
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [nextId, setNextId] = useState(SEED.length + 1);

  const levelSubjects =
    classLevel !== "all" ? (CLASS_LEVEL_SUBJECTS[classLevel] ?? []) : [];

  const filtered = subjects.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.code.toLowerCase().includes(search.toLowerCase()) ||
      s.department.toLowerCase().includes(search.toLowerCase()) ||
      s.teacher.toLowerCase().includes(search.toLowerCase()),
  );

  // When a level is selected, highlighted subjects are those whose name is in the level list
  const highlighted =
    classLevel !== "all"
      ? filtered.filter((s) =>
          levelSubjects.some(
            (ls) =>
              ls.toLowerCase() === s.name.toLowerCase() ||
              s.name.toLowerCase().includes(ls.toLowerCase().split(" ")[0]),
          ),
        )
      : [];
  const highlightedIds = new Set(highlighted.map((s) => s.id));
  const rest =
    classLevel !== "all"
      ? filtered.filter((s) => !highlightedIds.has(s.id))
      : filtered;

  const openAdd = () => {
    setEditId(null);
    setForm(EMPTY);
    setOpen(true);
  };
  const openEdit = (s: Subject) => {
    setEditId(s.id);
    setForm({
      name: s.name,
      code: s.code,
      department: s.department,
      teacher: s.teacher,
      classes: String(s.classes),
      weeklyHours: String(s.weeklyHours),
    });
    setOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.code) {
      toast.error("Name and code are required");
      return;
    }
    if (editId !== null) {
      setSubjects((prev) =>
        prev.map((s) =>
          s.id === editId
            ? {
                ...s,
                ...form,
                classes: Number(form.classes) || 0,
                weeklyHours: Number(form.weeklyHours) || 0,
              }
            : s,
        ),
      );
      toast.success("Subject updated");
    } else {
      setSubjects((prev) => [
        ...prev,
        {
          id: nextId,
          ...form,
          classes: Number(form.classes) || 0,
          weeklyHours: Number(form.weeklyHours) || 0,
        },
      ]);
      setNextId((n) => n + 1);
      toast.success("Subject added");
    }
    setOpen(false);
  };

  const handleDelete = () => {
    setSubjects((prev) => prev.filter((s) => s.id !== deleteId));
    setDeleteId(null);
    toast.success("Subject deleted");
  };

  const f = (k: keyof typeof EMPTY, v: string) =>
    setForm((p) => ({ ...p, [k]: v }));

  const SubjectTable = ({
    rows,
    dimmed,
  }: { rows: Subject[]; dimmed?: boolean }) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="dark:text-gray-300">Code</TableHead>
          <TableHead className="dark:text-gray-300">Subject Name</TableHead>
          <TableHead className="dark:text-gray-300">Department</TableHead>
          <TableHead className="dark:text-gray-300">Teacher</TableHead>
          <TableHead>{t("classes")}</TableHead>
          <TableHead className="dark:text-gray-300">Weekly Hours</TableHead>
          <TableHead>{t("actions")}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.length === 0 && (
          <TableRow>
            <TableCell
              colSpan={7}
              className="text-center text-muted-foreground py-6"
              data-ocid="subjects.empty_state"
            >
              No subjects found
            </TableCell>
          </TableRow>
        )}
        {rows.map((s, i) => (
          <TableRow
            key={s.id}
            data-ocid={`subjects.item.${i + 1}`}
            className={dimmed ? "opacity-50" : ""}
          >
            <TableCell className="font-mono text-xs">{s.code}</TableCell>
            <TableCell className="font-medium">{s.name}</TableCell>
            <TableCell>
              <Badge
                variant="secondary"
                className={
                  deptColor[s.department] ??
                  "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
                }
              >
                {s.department}
              </Badge>
            </TableCell>
            <TableCell>{s.teacher}</TableCell>
            <TableCell>{s.classes}</TableCell>
            <TableCell>
              <span className="flex items-center gap-1">
                <Clock size={12} className="text-gray-400" />
                {s.weeklyHours}h
              </span>
            </TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => openEdit(s)}
                  data-ocid={`subjects.edit_button.${i + 1}`}
                >
                  <Pencil size={14} />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-700 dark:text-gray-200"
                  onClick={() => setDeleteId(s.id)}
                  data-ocid={`subjects.delete_button.${i + 1}`}
                >
                  <Trash2 size={14} />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{t("subjects")}</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {subjects.length} subjects offered
          </p>
        </div>
        <Button
          onClick={openAdd}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
          data-ocid="subjects.primary_button"
        >
          <Plus size={16} className="mr-2" /> Add Subject
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Subjects", value: subjects.length },
          {
            label: "Departments",
            value: new Set(subjects.map((s) => s.department)).size,
          },
          {
            label: "Total Weekly Hours",
            value: subjects.reduce((a, s) => a + s.weeklyHours, 0),
          },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <BookOpen size={20} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <div className="flex items-center gap-2">
              <Search size={16} className="text-muted-foreground" />
              <Input
                placeholder="Search subjects..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="max-w-sm"
                data-ocid="subjects.search_input"
              />
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <Label className="shrink-0 text-sm">Filter by Class Level:</Label>
              <Select
                value={classLevel}
                onValueChange={(v) => setClassLevel(v as ClassLevel)}
              >
                <SelectTrigger
                  className="w-64"
                  data-ocid="subjects.level.select"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(Object.keys(CLASS_LEVEL_LABELS) as ClassLevel[]).map(
                    (key) => (
                      <SelectItem key={key} value={key}>
                        {CLASS_LEVEL_LABELS[key]}
                      </SelectItem>
                    ),
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>

          {classLevel !== "all" && (
            <>
              {/* Level subject pills */}
              <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">
                  Subjects for {CLASS_LEVEL_LABELS[classLevel]}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {(CLASS_LEVEL_SUBJECTS[classLevel] ?? []).map((sub) => (
                    <span
                      key={sub}
                      className="text-xs px-2.5 py-1 rounded-full bg-black text-white font-medium"
                    >
                      {sub}
                    </span>
                  ))}
                </div>
              </div>

              {/* Highlighted matching subjects */}
              {highlighted.length > 0 && (
                <Card className="mb-4 border-2 border-black">
                  <CardHeader className="pb-2 pt-3 px-4">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <span className="w-2 h-2 bg-black rounded-full inline-block" />
                      Matching Subjects in Your Records
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <SubjectTable rows={highlighted} />
                  </CardContent>
                </Card>
              )}

              {rest.length > 0 && (
                <div>
                  <p className="text-xs text-gray-400 mb-2 font-medium uppercase tracking-wide">
                    Other Subjects
                  </p>
                  <SubjectTable rows={rest} dimmed />
                </div>
              )}

              {highlighted.length === 0 && rest.length === 0 && (
                <p
                  className="text-center text-muted-foreground py-8"
                  data-ocid="subjects.empty_state"
                >
                  No subjects found
                </p>
              )}
            </>
          )}

          {classLevel === "all" && <SubjectTable rows={rest} />}
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editId ? "Edit Subject" : "Add New Subject"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label>Subject Name *</Label>
                <Input
                  value={form.name}
                  onChange={(e) => f("name", e.target.value)}
                  placeholder="e.g. Mathematics"
                  data-ocid="subjects.input"
                />
              </div>
              <div className="space-y-1">
                <Label>Code *</Label>
                <Input
                  value={form.code}
                  onChange={(e) => f("code", e.target.value)}
                  placeholder="e.g. MTH101"
                />
              </div>
            </div>
            <div className="space-y-1">
              <Label>Department</Label>
              <Select
                value={form.department}
                onValueChange={(v) => f("department", v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select dept" />
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
              <Label>Assigned Teacher</Label>
              <Select
                value={form.teacher}
                onValueChange={(v) => f("teacher", v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select teacher" />
                </SelectTrigger>
                <SelectContent>
                  {TEACHERS.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label>Number of Classes</Label>
                <Input
                  type="number"
                  value={form.classes}
                  onChange={(e) => f("classes", e.target.value)}
                  placeholder="0"
                />
              </div>
              <div className="space-y-1">
                <Label>Weekly Hours</Label>
                <Input
                  type="number"
                  value={form.weeklyHours}
                  onChange={(e) => f("weeklyHours", e.target.value)}
                  placeholder="0"
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
                data-ocid="subjects.submit_button"
              >
                {editId ? "Update" : "Add Subject"}
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
            <AlertDialogTitle>Delete Subject</AlertDialogTitle>
            <AlertDialogDescription>
              Permanently delete this subject from the system?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
