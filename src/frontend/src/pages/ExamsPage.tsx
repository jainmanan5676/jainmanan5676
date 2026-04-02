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
import { FileText, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type Exam = {
  id: number;
  name: string;
  subject: string;
  class: string;
  date: string;
  maxMarks: number;
  type: string;
  status: string;
};

const SEED: Exam[] = [
  {
    id: 1,
    name: "Mid-Term Exam",
    subject: "Mathematics",
    class: "10-A",
    date: "2026-04-01",
    maxMarks: 100,
    type: "Written",
    status: "Upcoming",
  },
  {
    id: 2,
    name: "Mid-Term Exam",
    subject: "Physics",
    class: "10-A",
    date: "2026-04-02",
    maxMarks: 100,
    type: "Written",
    status: "Upcoming",
  },
  {
    id: 3,
    name: "Unit Test 1",
    subject: "Chemistry",
    class: "9-A",
    date: "2026-03-28",
    maxMarks: 50,
    type: "Written",
    status: "Upcoming",
  },
  {
    id: 4,
    name: "Class Test",
    subject: "English",
    class: "10-B",
    date: "2026-03-25",
    maxMarks: 30,
    type: "Written",
    status: "Completed",
  },
  {
    id: 5,
    name: "Final Exam",
    subject: "Mathematics",
    class: "12-A",
    date: "2026-05-10",
    maxMarks: 100,
    type: "Written",
    status: "Scheduled",
  },
  {
    id: 6,
    name: "Practical",
    subject: "Biology",
    class: "11-C",
    date: "2026-04-05",
    maxMarks: 50,
    type: "Practical",
    status: "Upcoming",
  },
  {
    id: 7,
    name: "Oral Test",
    subject: "English",
    class: "8-A",
    date: "2026-03-30",
    maxMarks: 20,
    type: "Oral",
    status: "Upcoming",
  },
];

const SCHOOL_CLASSES = [
  "Nursery",
  "LKG",
  "UKG",
  "1-A",
  "1-B",
  "2-A",
  "2-B",
  "3-A",
  "3-B",
  "4-A",
  "4-B",
  "5-A",
  "5-B",
  "6-A",
  "6-B",
  "7-A",
  "7-B",
  "8-A",
  "8-B",
  "9-A",
  "9-B",
  "10-A",
  "10-B",
  "11-A",
  "11-B",
  "11-C",
  "12-A",
  "12-B",
  "12-C",
];
const SUBJECTS = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "English",
  "History",
  "Geography",
  "Computer Science",
];
const TYPES = ["Written", "Practical", "Oral", "MCQ"];
const STATUSES = ["Upcoming", "Scheduled", "Ongoing", "Completed"];
const EMPTY = {
  name: "",
  subject: "",
  class: "",
  date: "",
  maxMarks: "",
  type: "Written",
  status: "Upcoming",
};

const statusColor: Record<string, string> = {
  Upcoming: "bg-blue-100 text-blue-700",
  Scheduled: "bg-amber-100 text-amber-700",
  Ongoing: "bg-green-100 text-green-700",
  Completed:
    "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
};

export default function ExamsPage() {
  const { t } = useLanguage();
  const [exams, setExams] = useState<Exam[]>(SEED);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [nextId, setNextId] = useState(SEED.length + 1);

  const filtered = exams.filter(
    (e) =>
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.subject.toLowerCase().includes(search.toLowerCase()) ||
      e.class.toLowerCase().includes(search.toLowerCase()),
  );

  const openAdd = () => {
    setEditId(null);
    setForm(EMPTY);
    setOpen(true);
  };
  const openEdit = (e: Exam) => {
    setEditId(e.id);
    setForm({
      name: e.name,
      subject: e.subject,
      class: e.class,
      date: e.date,
      maxMarks: String(e.maxMarks),
      type: e.type,
      status: e.status,
    });
    setOpen(true);
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!form.name || !form.date) {
      toast.error("Name and date are required");
      return;
    }
    if (editId !== null) {
      setExams((prev) =>
        prev.map((e) =>
          e.id === editId
            ? { ...e, ...form, maxMarks: Number(form.maxMarks) || 100 }
            : e,
        ),
      );
      toast.success(`${t("update")} ${t("exams")}`);
    } else {
      setExams((prev) => [
        ...prev,
        { id: nextId, ...form, maxMarks: Number(form.maxMarks) || 100 },
      ]);
      setNextId((n) => n + 1);
      toast.success(t("scheduleNewExam"));
    }
    setOpen(false);
  };

  const handleDelete = () => {
    setExams((prev) => prev.filter((e) => e.id !== deleteId));
    setDeleteId(null);
    toast.success(`${t("delete")} ${t("exams")}`);
  };
  const f = (k: keyof typeof EMPTY, v: string) =>
    setForm((p) => ({ ...p, [k]: v }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold dark:text-white">
            {t("examsPage")}
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {exams.length} {t("exams")}
          </p>
        </div>
        <Button
          onClick={openAdd}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
          data-ocid="exams.primary_button"
        >
          <Plus size={16} className="mr-2" /> {t("scheduleNewExam")}
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {STATUSES.map((s) => (
          <Card key={s}>
            <CardContent className="p-4 text-center">
              <p className="text-xs text-muted-foreground">{s}</p>
              <p className="text-2xl font-bold dark:text-white">
                {exams.filter((e) => e.status === s).length}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <Search size={16} className="text-muted-foreground" />
            <Input
              placeholder={t("searchExams")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-sm dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600"
              data-ocid="exams.search_input"
            />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="dark:text-gray-300">
                  {t("examName")}
                </TableHead>
                <TableHead className="dark:text-gray-300">
                  {t("subject")}
                </TableHead>
                <TableHead className="dark:text-gray-300">
                  {t("class")}
                </TableHead>
                <TableHead className="dark:text-gray-300">
                  {t("date")}
                </TableHead>
                <TableHead className="dark:text-gray-300">
                  {t("maxMarks")}
                </TableHead>
                <TableHead className="dark:text-gray-300">
                  {t("type")}
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
                    colSpan={8}
                    className="text-center text-muted-foreground py-8"
                    data-ocid="exams.empty_state"
                  >
                    <FileText size={28} className="mx-auto mb-2 opacity-40" />
                    {t("noData")}
                  </TableCell>
                </TableRow>
              )}
              {filtered.map((e, i) => (
                <TableRow key={e.id} data-ocid={`exams.item.${i + 1}`}>
                  <TableCell className="font-medium dark:text-gray-200">
                    {e.name}
                  </TableCell>
                  <TableCell className="dark:text-gray-300">
                    {e.subject}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{e.class}</Badge>
                  </TableCell>
                  <TableCell className="text-sm dark:text-gray-300">
                    {e.date}
                  </TableCell>
                  <TableCell className="dark:text-gray-300">
                    {e.maxMarks}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{e.type}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={statusColor[e.status] || ""}>
                      {e.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openEdit(e)}
                        data-ocid={`exams.edit_button.${i + 1}`}
                      >
                        <Pencil size={14} />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-gray-600 dark:text-gray-300"
                        onClick={() => setDeleteId(e.id)}
                        data-ocid={`exams.delete_button.${i + 1}`}
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
              {editId ? t("edit") : t("scheduleNewExam")}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <Label>{t("examName")} *</Label>
              <Input
                value={form.name}
                onChange={(e) => f("name", e.target.value)}
                placeholder={t("examName")}
                data-ocid="exams.input"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label>{t("subject")}</Label>
                <Select
                  value={form.subject}
                  onValueChange={(v) => f("subject", v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t("selectSubject")} />
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
                <Label>{t("class")}</Label>
                <Select value={form.class} onValueChange={(v) => f("class", v)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t("selectClass")} />
                  </SelectTrigger>
                  <SelectContent
                    position="popper"
                    className="max-h-60 overflow-y-auto"
                  >
                    {SCHOOL_CLASSES.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label>{t("date")} *</Label>
                <Input
                  type="date"
                  value={form.date}
                  onChange={(e) => f("date", e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label>{t("maxMarks")}</Label>
                <Input
                  type="number"
                  value={form.maxMarks}
                  onChange={(e) => f("maxMarks", e.target.value)}
                  placeholder="100"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label>{t("type")}</Label>
                <Select value={form.type} onValueChange={(v) => f("type", v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent
                    position="popper"
                    className="max-h-60 overflow-y-auto"
                  >
                    {TYPES.map((tp) => (
                      <SelectItem key={tp} value={tp}>
                        {tp}
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
                  <SelectContent
                    position="popper"
                    className="max-h-60 overflow-y-auto"
                  >
                    {STATUSES.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
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
                data-ocid="exams.submit_button"
              >
                {editId ? t("update") : t("scheduleExam")}
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
              {t("delete")} {t("exams")}
            </AlertDialogTitle>
            <AlertDialogDescription>
              Permanently delete this exam record?
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
