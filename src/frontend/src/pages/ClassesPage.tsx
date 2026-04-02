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
import { BookOpen, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type ClassItem = {
  id: number;
  name: string;
  section: string;
  teacher: string;
  students: number;
  room: string;
};

type Stream = "Science" | "Commerce" | "Arts";

const CLASS_SUBJECTS: Record<string, string[]> = {
  Nursery: [
    "Rhymes & Phonics",
    "Drawing & Coloring",
    "Play Activities",
    "Story Time",
    "Motor Skills Development",
    "Music & Movement",
  ],
  LKG: [
    "Rhymes & Phonics",
    "Drawing & Coloring",
    "Play Activities",
    "Story Time",
    "Motor Skills Development",
    "Music & Movement",
  ],
  UKG: [
    "Rhymes & Phonics",
    "Drawing & Coloring",
    "Play Activities",
    "Story Time",
    "Motor Skills Development",
    "Music & Movement",
  ],
  "Grade 1": [
    "English",
    "Hindi",
    "Mathematics",
    "EVS",
    "Drawing",
    "Physical Education",
    "General Knowledge",
  ],
  "Grade 2": [
    "English",
    "Hindi",
    "Mathematics",
    "EVS",
    "Drawing",
    "Physical Education",
    "General Knowledge",
  ],
  "Grade 3": [
    "English",
    "Hindi",
    "Mathematics",
    "EVS",
    "Drawing",
    "Physical Education",
    "General Knowledge",
  ],
  "Grade 4": [
    "English",
    "Hindi",
    "Mathematics",
    "EVS",
    "Drawing",
    "Physical Education",
    "General Knowledge",
  ],
  "Grade 5": [
    "English",
    "Hindi",
    "Mathematics",
    "EVS",
    "Drawing",
    "Physical Education",
    "General Knowledge",
  ],
  "Grade 6": [
    "English",
    "Hindi",
    "Mathematics",
    "Science",
    "Social Studies",
    "Computer Science",
    "Physical Education",
    "Sanskrit",
  ],
  "Grade 7": [
    "English",
    "Hindi",
    "Mathematics",
    "Science",
    "Social Studies",
    "Computer Science",
    "Physical Education",
    "Sanskrit",
  ],
  "Grade 8": [
    "English",
    "Hindi",
    "Mathematics",
    "Science",
    "Social Studies",
    "Computer Science",
    "Physical Education",
    "Sanskrit",
  ],
  "Grade 9": [
    "English",
    "Hindi",
    "Mathematics",
    "Science",
    "Social Studies",
    "Computer Science",
    "Physical Education",
    "Sanskrit",
  ],
  "Grade 10": [
    "English",
    "Hindi",
    "Mathematics",
    "Science",
    "Social Studies",
    "Computer Science",
    "Physical Education",
    "Sanskrit",
  ],
};

const STREAM_SUBJECTS: Record<Stream, string[]> = {
  Science: [
    "Physics",
    "Chemistry",
    "Biology",
    "Mathematics",
    "English",
    "Physical Education",
    "Computer Science",
  ],
  Commerce: [
    "Accountancy",
    "Business Studies",
    "Economics",
    "English",
    "Mathematics",
    "Physical Education",
  ],
  Arts: [
    "History",
    "Geography",
    "Political Science",
    "English",
    "Sociology",
    "Physical Education",
    "Psychology",
  ],
};

const SUBJECT_CHIP_COLORS: Record<string, string> = {
  // Nursery-UKG
  "Rhymes & Phonics": "bg-pink-100 text-pink-800",
  "Drawing & Coloring": "bg-yellow-100 text-yellow-800",
  "Play Activities": "bg-green-100 text-green-800",
  "Story Time": "bg-purple-100 text-purple-800",
  "Motor Skills Development": "bg-orange-100 text-orange-800",
  "Music & Movement": "bg-blue-100 text-blue-800",
  // Primary
  English: "bg-blue-100 text-blue-800",
  Hindi: "bg-orange-100 text-orange-800",
  Mathematics: "bg-indigo-100 text-indigo-800",
  EVS: "bg-green-100 text-green-800",
  Drawing: "bg-yellow-100 text-yellow-800",
  "Physical Education": "bg-red-100 text-red-800",
  "General Knowledge": "bg-teal-100 text-teal-800",
  // Secondary
  Science: "bg-cyan-100 text-cyan-800",
  "Social Studies": "bg-amber-100 text-amber-800",
  "Computer Science": "bg-violet-100 text-violet-800",
  Sanskrit: "bg-rose-100 text-rose-800",
  // 11-12 Science
  Physics: "bg-sky-100 text-sky-800",
  Chemistry: "bg-lime-100 text-lime-800",
  Biology: "bg-emerald-100 text-emerald-800",
  // 11-12 Commerce
  Accountancy: "bg-yellow-100 text-yellow-800",
  "Business Studies": "bg-orange-100 text-orange-800",
  Economics: "bg-green-100 text-green-800",
  // 11-12 Arts
  History: "bg-amber-100 text-amber-800",
  Geography: "bg-teal-100 text-teal-800",
  "Political Science": "bg-blue-100 text-blue-800",
  Sociology: "bg-purple-100 text-purple-800",
  Psychology: "bg-pink-100 text-pink-800",
};

function getSubjectColor(subject: string) {
  return (
    SUBJECT_CHIP_COLORS[subject] ??
    "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
  );
}

const SEED: ClassItem[] = [
  {
    id: 1,
    name: "Grade 6",
    section: "A",
    teacher: "Mr. David Chen",
    students: 32,
    room: "101",
  },
  {
    id: 2,
    name: "Grade 7",
    section: "A",
    teacher: "Ms. Priya Nair",
    students: 30,
    room: "102",
  },
  {
    id: 3,
    name: "Grade 7",
    section: "B",
    teacher: "Mr. Ali Hassan",
    students: 28,
    room: "103",
  },
  {
    id: 4,
    name: "Grade 8",
    section: "A",
    teacher: "Ms. Sarah Lee",
    students: 31,
    room: "201",
  },
  {
    id: 5,
    name: "Grade 8",
    section: "B",
    teacher: "Dr. James Park",
    students: 29,
    room: "202",
  },
  {
    id: 6,
    name: "Grade 9",
    section: "A",
    teacher: "Mr. Raj Kumar",
    students: 34,
    room: "301",
  },
  {
    id: 7,
    name: "Grade 9",
    section: "C",
    teacher: "Mr. Kevin Tan",
    students: 27,
    room: "303",
  },
  {
    id: 8,
    name: "Grade 10",
    section: "A",
    teacher: "Mr. Raj Kumar",
    students: 36,
    room: "401",
  },
  {
    id: 9,
    name: "Grade 10",
    section: "B",
    teacher: "Ms. Sarah Lee",
    students: 33,
    room: "402",
  },
  {
    id: 10,
    name: "Grade 11",
    section: "C",
    teacher: "Dr. James Park",
    students: 25,
    room: "501",
  },
  {
    id: 11,
    name: "Grade 12",
    section: "A",
    teacher: "Mr. David Chen",
    students: 22,
    room: "601",
  },
  {
    id: 12,
    name: "Nursery",
    section: "A",
    teacher: "Ms. Sunita Rao",
    students: 20,
    room: "G01",
  },
  {
    id: 13,
    name: "LKG",
    section: "A",
    teacher: "Ms. Meena Joshi",
    students: 22,
    room: "G02",
  },
  {
    id: 14,
    name: "UKG",
    section: "A",
    teacher: "Ms. Anita Verma",
    students: 24,
    room: "G03",
  },
  {
    id: 15,
    name: "Grade 1",
    section: "A",
    teacher: "Mr. Suresh Kumar",
    students: 28,
    room: "G04",
  },
  {
    id: 16,
    name: "Grade 2",
    section: "A",
    teacher: "Ms. Kavita Singh",
    students: 30,
    room: "G05",
  },
  {
    id: 17,
    name: "Grade 3",
    section: "A",
    teacher: "Mr. Ramesh Gupta",
    students: 31,
    room: "G06",
  },
];

const TEACHERS = [
  "Mr. Raj Kumar",
  "Ms. Sarah Lee",
  "Dr. James Park",
  "Ms. Priya Nair",
  "Mr. David Chen",
  "Mr. Ali Hassan",
  "Mr. Kevin Tan",
  "Mr. Omar Diallo",
];
const EMPTY = { name: "", section: "", teacher: "", students: "", room: "" };

function isHighSchool(name: string) {
  return name === "Grade 11" || name === "Grade 12";
}

function SubjectChips({
  className,
  stream,
}: { className: string; stream: Stream }) {
  const subjects = isHighSchool(className)
    ? STREAM_SUBJECTS[stream]
    : CLASS_SUBJECTS[className];
  if (!subjects || subjects.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-1 mt-2">
      {subjects.map((sub) => (
        <span
          key={sub}
          className={`text-xs px-2 py-0.5 rounded-full font-medium ${getSubjectColor(sub)}`}
        >
          {sub}
        </span>
      ))}
    </div>
  );
}

export default function ClassesPage() {
  const { t } = useLanguage();
  const [classes, setClasses] = useState<ClassItem[]>(SEED);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [nextId, setNextId] = useState(SEED.length + 1);
  const [streams, setStreams] = useState<Record<number, Stream>>(() => {
    const init: Record<number, Stream> = {};
    for (const c of SEED) {
      if (isHighSchool(c.name)) init[c.id] = "Science";
    }
    return init;
  });

  const filtered = classes.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.teacher.toLowerCase().includes(search.toLowerCase()) ||
      c.section.toLowerCase().includes(search.toLowerCase()),
  );

  const openAdd = () => {
    setEditId(null);
    setForm(EMPTY);
    setOpen(true);
  };
  const openEdit = (c: ClassItem) => {
    setEditId(c.id);
    setForm({
      name: c.name,
      section: c.section,
      teacher: c.teacher,
      students: String(c.students),
      room: c.room,
    });
    setOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.section) {
      toast.error("Name and section are required");
      return;
    }
    if (editId !== null) {
      setClasses((prev) =>
        prev.map((c) =>
          c.id === editId
            ? { ...c, ...form, students: Number(form.students) || 0 }
            : c,
        ),
      );
      toast.success("Class updated successfully");
    } else {
      const newId = nextId;
      setClasses((prev) => [
        ...prev,
        { id: newId, ...form, students: Number(form.students) || 0 },
      ]);
      if (isHighSchool(form.name)) {
        setStreams((prev) => ({ ...prev, [newId]: "Science" }));
      }
      setNextId((n) => n + 1);
      toast.success("Class added successfully");
    }
    setOpen(false);
  };

  const handleDelete = () => {
    setClasses((prev) => prev.filter((c) => c.id !== deleteId));
    setDeleteId(null);
    toast.success("Class deleted");
  };

  const f = (k: keyof typeof EMPTY, v: string) =>
    setForm((p) => ({ ...p, [k]: v }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{t("classes")}</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {classes.length} {t("activeClasses")}
          </p>
        </div>
        <Button
          onClick={openAdd}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
          data-ocid="classes.primary_button"
        >
          <Plus size={16} className="mr-2" /> {t("addClass")}
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: t("totalClasses"), value: classes.length },
          {
            label: t("totalStudents"),
            value: classes.reduce((a, c) => a + c.students, 0),
          },
          {
            label: t("avgClassSize"),
            value: Math.round(
              classes.reduce((a, c) => a + c.students, 0) /
                (classes.length || 1),
            ),
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
          <div className="flex items-center gap-2 mb-4">
            <Search size={16} className="text-muted-foreground" />
            <Input
              placeholder={t("searchClasses")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-sm"
              data-ocid="classes.search_input"
            />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("class")}</TableHead>
                <TableHead>{t("section")}</TableHead>
                <TableHead>{t("classTeacher")}</TableHead>
                <TableHead>{t("students")}</TableHead>
                <TableHead>{t("room")}</TableHead>
                <TableHead>{t("subjects")}</TableHead>
                <TableHead>{t("actions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center text-muted-foreground py-8"
                    data-ocid="classes.empty_state"
                  >
                    {t("noClassesFound")}
                  </TableCell>
                </TableRow>
              )}
              {filtered.map((c, i) => (
                <TableRow key={c.id} data-ocid={`classes.item.${i + 1}`}>
                  <TableCell className="font-medium">{c.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{c.section}</Badge>
                  </TableCell>
                  <TableCell>{c.teacher}</TableCell>
                  <TableCell>{c.students}</TableCell>
                  <TableCell className="text-muted-foreground">
                    Room {c.room}
                  </TableCell>
                  <TableCell className="min-w-[240px]">
                    {isHighSchool(c.name) && (
                      <div className="mb-1">
                        <Select
                          value={streams[c.id] ?? "Science"}
                          onValueChange={(v) =>
                            setStreams((prev) => ({
                              ...prev,
                              [c.id]: v as Stream,
                            }))
                          }
                        >
                          <SelectTrigger
                            className="h-6 text-xs w-32"
                            data-ocid={`classes.stream.select.${i + 1}`}
                          >
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent position="popper">
                            <SelectItem value="Science">Science</SelectItem>
                            <SelectItem value="Commerce">Commerce</SelectItem>
                            <SelectItem value="Arts">Arts</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                    <SubjectChips
                      className={c.name}
                      stream={streams[c.id] ?? "Science"}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openEdit(c)}
                        data-ocid={`classes.edit_button.${i + 1}`}
                      >
                        <Pencil size={14} />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-gray-600 dark:text-gray-300 hover:text-gray-700 dark:text-gray-200"
                        onClick={() => setDeleteId(c.id)}
                        data-ocid={`classes.delete_button.${i + 1}`}
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
            <DialogTitle>
              {editId ? t("editClass") : t("addNewClass")}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label>{t("gradeName")} *</Label>
                <Input
                  value={form.name}
                  onChange={(e) => f("name", e.target.value)}
                  placeholder="e.g. Grade 10"
                  data-ocid="classes.input"
                />
              </div>
              <div className="space-y-1">
                <Label>Section *</Label>
                <Input
                  value={form.section}
                  onChange={(e) => f("section", e.target.value)}
                  placeholder="e.g. A"
                />
              </div>
            </div>
            <div className="space-y-1">
              <Label>{t("classTeacher")}</Label>
              <Select
                value={form.teacher}
                onValueChange={(v) => f("teacher", v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t("selectTeacher")} />
                </SelectTrigger>
                <SelectContent position="popper">
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
                <Label>{t("numberOfStudents")}</Label>
                <Input
                  type="number"
                  value={form.students}
                  onChange={(e) => f("students", e.target.value)}
                  placeholder="0"
                />
              </div>
              <div className="space-y-1">
                <Label>{t("roomNumber")}</Label>
                <Input
                  value={form.room}
                  onChange={(e) => f("room", e.target.value)}
                  placeholder="e.g. 101"
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
                data-ocid="classes.submit_button"
              >
                {editId ? t("update") : t("addClass")}
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
            <AlertDialogTitle>{t("deleteClass")}</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this class. All associated data may
              be affected.
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
