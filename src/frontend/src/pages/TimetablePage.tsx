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
import { useLanguage } from "@/contexts/LanguageContext";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const PERIODS = [
  "Period 1 (8:00-8:45)",
  "Period 2 (8:50-9:35)",
  "Period 3 (9:40-10:25)",
  "Period 4 (10:40-11:25)",
  "Period 5 (11:30-12:15)",
  "Period 6 (1:00-1:45)",
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
  "Physical Education",
];
const TEACHERS = [
  "Mr. Raj Kumar",
  "Ms. Sarah Lee",
  "Dr. James Park",
  "Ms. Priya Nair",
  "Mr. David Chen",
  "Mr. Ali Hassan",
  "Mr. Kevin Tan",
];

// Day keys used for translation and stable values for filtering
const DAY_KEYS = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
] as const;
// English day names used as stable data keys in seed entries
const DAY_EN = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

type Entry = {
  id: number;
  class: string;
  day: string; // always stored in English
  period: string;
  subject: string;
  teacher: string;
  room: string;
};

const SEED: Entry[] = [
  {
    id: 1,
    class: "10-A",
    day: "Monday",
    period: "Period 1 (8:00-8:45)",
    subject: "Mathematics",
    teacher: "Mr. Raj Kumar",
    room: "401",
  },
  {
    id: 2,
    class: "10-A",
    day: "Monday",
    period: "Period 2 (8:50-9:35)",
    subject: "Physics",
    teacher: "Ms. Sarah Lee",
    room: "401",
  },
  {
    id: 3,
    class: "10-A",
    day: "Monday",
    period: "Period 3 (9:40-10:25)",
    subject: "Chemistry",
    teacher: "Dr. James Park",
    room: "401",
  },
  {
    id: 4,
    class: "10-A",
    day: "Tuesday",
    period: "Period 1 (8:00-8:45)",
    subject: "English",
    teacher: "Mr. David Chen",
    room: "401",
  },
  {
    id: 5,
    class: "10-A",
    day: "Tuesday",
    period: "Period 2 (8:50-9:35)",
    subject: "Biology",
    teacher: "Ms. Priya Nair",
    room: "401",
  },
  {
    id: 6,
    class: "9-A",
    day: "Monday",
    period: "Period 1 (8:00-8:45)",
    subject: "Mathematics",
    teacher: "Mr. Raj Kumar",
    room: "301",
  },
  {
    id: 7,
    class: "9-A",
    day: "Monday",
    period: "Period 2 (8:50-9:35)",
    subject: "English",
    teacher: "Mr. David Chen",
    room: "301",
  },
];

const EMPTY = {
  class: "",
  day: "",
  period: "",
  subject: "",
  teacher: "",
  room: "",
};

export default function TimetablePage() {
  const { t } = useLanguage();

  // Days are translated for display but stored in English
  const DAYS_DISPLAY = DAY_KEYS.map((k) => t(k));

  const [entries, setEntries] = useState<Entry[]>(SEED);
  const [selectedClass, setSelectedClass] = useState("10-A");
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [nextId, setNextId] = useState(SEED.length + 1);

  const classEntries = entries.filter((e) => e.class === selectedClass);

  const openAdd = () => {
    setEditId(null);
    setForm({ ...EMPTY, class: selectedClass });
    setOpen(true);
  };

  const openEdit = (e: Entry) => {
    setEditId(e.id);
    setForm({
      class: e.class,
      day: e.day,
      period: e.period,
      subject: e.subject,
      teacher: e.teacher,
      room: e.room,
    });
    setOpen(true);
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!form.class || !form.day || !form.period || !form.subject) {
      toast.error("Class, day, period and subject are required");
      return;
    }
    if (editId !== null) {
      setEntries((prev) =>
        prev.map((e) => (e.id === editId ? { ...e, ...form } : e)),
      );
      toast.success(`${t("update")} ${t("timetable")}`);
    } else {
      setEntries((prev) => [...prev, { id: nextId, ...form }]);
      setNextId((n) => n + 1);
      toast.success(t("addEntry"));
    }
    setOpen(false);
  };

  const handleDelete = () => {
    setEntries((prev) => prev.filter((e) => e.id !== deleteId));
    setDeleteId(null);
    toast.success(t("removeEntry"));
  };

  const f = (k: keyof typeof EMPTY, v: string) =>
    setForm((p) => ({ ...p, [k]: v }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold dark:text-white">
            {t("timetable")}
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {t("weeklySchedule")}
          </p>
        </div>
        <Button
          onClick={openAdd}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
          data-ocid="timetable.primary_button"
        >
          <Plus size={16} className="mr-2" /> {t("addEntry")}
        </Button>
      </div>

      <div className="space-y-1">
        <span className="text-sm font-medium block dark:text-gray-200">
          {t("selectClass")}
        </span>
        <Select value={selectedClass} onValueChange={setSelectedClass}>
          <SelectTrigger className="w-40" data-ocid="timetable.select">
            <SelectValue />
          </SelectTrigger>
          <SelectContent position="popper" className="max-h-60 overflow-y-auto">
            {SCHOOL_CLASSES.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-800">
              <th className="border border-gray-200 dark:border-gray-700 p-3 text-left text-sm font-semibold dark:text-gray-200">
                {t("period")}
              </th>
              {DAYS_DISPLAY.map((d, idx) => (
                <th
                  key={DAY_EN[idx]}
                  className="border border-gray-200 dark:border-gray-700 p-3 text-center text-sm font-semibold dark:text-gray-200"
                >
                  {d}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PERIODS.map((period) => (
              <tr key={period}>
                <td className="border border-gray-200 dark:border-gray-700 p-2 text-xs font-medium text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-800">
                  {period}
                </td>
                {DAY_EN.map((day, _idx) => {
                  const entry = classEntries.find(
                    (e) => e.day === day && e.period === period,
                  );
                  return (
                    <td
                      key={day}
                      className="border border-gray-200 dark:border-gray-700 p-1 align-top min-w-[120px] dark:bg-gray-900"
                    >
                      {entry ? (
                        <div className="rounded bg-black/5 dark:bg-white/10 p-2 space-y-1">
                          <p className="text-xs font-semibold dark:text-gray-100">
                            {entry.subject}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {entry.teacher}
                          </p>
                          <div className="flex gap-1 mt-1">
                            <button
                              type="button"
                              onClick={() => openEdit(entry)}
                              className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white"
                            >
                              <Pencil size={11} />
                            </button>
                            <button
                              type="button"
                              onClick={() => setDeleteId(entry.id)}
                              className="text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400"
                            >
                              <Trash2 size={11} />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            setForm({
                              ...EMPTY,
                              class: selectedClass,
                              day,
                              period,
                            });
                            setEditId(null);
                            setOpen(true);
                          }}
                          className="w-full h-full min-h-[60px] text-xs text-gray-300 hover:text-gray-500 dark:text-gray-600 dark:hover:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 dark:bg-gray-900 rounded transition-colors flex items-center justify-center"
                        >
                          <Plus size={14} />
                        </button>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base dark:text-white">
            {t("all")} {t("timetable")} — {selectedClass}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {classEntries.length === 0 ? (
            <p
              className="text-center py-8 text-muted-foreground"
              data-ocid="timetable.empty_state"
            >
              {t("noEntriesFound")}
            </p>
          ) : (
            <div className="divide-y dark:divide-gray-700">
              {classEntries.map((e, i) => (
                <div
                  key={e.id}
                  className="flex items-center justify-between px-4 py-3"
                  data-ocid={`timetable.item.${i + 1}`}
                >
                  <div className="flex gap-4 items-center">
                    <Badge variant="outline">
                      {DAYS_DISPLAY[DAY_EN.indexOf(e.day)] ?? e.day}
                    </Badge>
                    <span className="text-sm font-medium dark:text-gray-200">
                      {e.subject}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {e.teacher}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {e.period}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => openEdit(e)}
                      data-ocid={`timetable.edit_button.${i + 1}`}
                    >
                      <Pencil size={14} />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-gray-600 dark:text-gray-300"
                      onClick={() => setDeleteId(e.id)}
                      data-ocid={`timetable.delete_button.${i + 1}`}
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editId ? t("edit") : t("add")} {t("timetable")}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label>{t("class")} *</Label>
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
              <div className="space-y-1">
                <Label>{t("selectDay")} *</Label>
                <Select value={form.day} onValueChange={(v) => f("day", v)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t("selectDay")} />
                  </SelectTrigger>
                  <SelectContent
                    position="popper"
                    className="max-h-60 overflow-y-auto"
                  >
                    {DAY_EN.map((d, idx) => (
                      <SelectItem key={d} value={d}>
                        {DAYS_DISPLAY[idx]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-1">
              <Label>{t("period")} *</Label>
              <Select value={form.period} onValueChange={(v) => f("period", v)}>
                <SelectTrigger>
                  <SelectValue placeholder={t("period")} />
                </SelectTrigger>
                <SelectContent
                  position="popper"
                  className="max-h-60 overflow-y-auto"
                >
                  {PERIODS.map((p) => (
                    <SelectItem key={p} value={p}>
                      {p}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label>{t("subject")} *</Label>
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
                <Label>{t("teachers")}</Label>
                <Select
                  value={form.teacher}
                  onValueChange={(v) => f("teacher", v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t("teachers")} />
                  </SelectTrigger>
                  <SelectContent
                    position="popper"
                    className="max-h-60 overflow-y-auto"
                  >
                    {TEACHERS.map((teacher) => (
                      <SelectItem key={teacher} value={teacher}>
                        {teacher}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-1">
              <Label>{t("room")}</Label>
              <Input
                value={form.room}
                onChange={(e) => f("room", e.target.value)}
                placeholder={t("room")}
                data-ocid="timetable.input"
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
                data-ocid="timetable.submit_button"
              >
                {editId ? t("update") : t("add")}
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
            <AlertDialogTitle>{t("removeEntry")}</AlertDialogTitle>
            <AlertDialogDescription>{t("removeEntry")}?</AlertDialogDescription>
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
