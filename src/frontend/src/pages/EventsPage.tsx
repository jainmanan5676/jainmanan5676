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
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Calendar,
  MapPin,
  Pencil,
  Plus,
  Search,
  Trash2,
  Users,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type Event = {
  id: number;
  title: string;
  date: string;
  type: string;
  description: string;
  location: string;
  participants: string;
};

const SEED: Event[] = [
  {
    id: 1,
    title: "Annual Sports Day",
    date: "2026-03-25",
    type: "Sports",
    description: "Full-day sports competition for all grades.",
    location: "School Grounds",
    participants: "All Students",
  },
  {
    id: 2,
    title: "Parent-Teacher Meeting",
    date: "2026-03-28",
    type: "Meeting",
    description: "Quarterly meeting between parents and teachers.",
    location: "Classrooms",
    participants: "Parents & Teachers",
  },
  {
    id: 3,
    title: "Mid-Term Exams Begin",
    date: "2026-04-01",
    type: "Academic",
    description: "Mid-term examinations for all classes (Grade 6-12).",
    location: "Exam Halls",
    participants: "All Students",
  },
  {
    id: 4,
    title: "Science Exhibition",
    date: "2026-04-08",
    type: "Academic",
    description: "Annual science fair.",
    location: "Main Hall",
    participants: "Grade 8-12",
  },
  {
    id: 5,
    title: "Annual Cultural Day",
    date: "2026-04-14",
    type: "Cultural",
    description: "Celebrate diversity with music, dance, and drama.",
    location: "Auditorium",
    participants: "All Students",
  },
  {
    id: 6,
    title: "Inter-School Debate",
    date: "2026-04-18",
    type: "Academic",
    description: "Debate competition with 8 participating schools.",
    location: "Conference Hall",
    participants: "Selected Students",
  },
  {
    id: 7,
    title: "Earth Day Seminar",
    date: "2026-04-22",
    type: "Cultural",
    description: "Environmental awareness seminar.",
    location: "School Campus",
    participants: "All Students",
  },
];

const EVENT_TYPES = [
  "Academic",
  "Sports",
  "Cultural",
  "Meeting",
  "Holiday",
  "Workshop",
  "Other",
];
const EMPTY = {
  title: "",
  date: "",
  type: "Academic",
  description: "",
  location: "",
  participants: "",
};

const typeColor: Record<string, string> = {
  Academic: "bg-blue-100 text-blue-700",
  Sports: "bg-green-100 text-green-700",
  Cultural: "bg-purple-100 text-purple-700",
  Meeting: "bg-orange-100 text-orange-700",
  Holiday: "bg-amber-100 text-amber-700",
  Workshop: "bg-indigo-100 text-indigo-700",
  Other: "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200",
};
const typeDateBg: Record<string, string> = {
  Academic: "bg-blue-600",
  Sports: "bg-green-600",
  Cultural: "bg-purple-600",
  Meeting: "bg-orange-500",
  Holiday: "bg-amber-500",
  Workshop: "bg-indigo-600",
  Other: "bg-gray-700",
};

export default function EventsPage() {
  const { t } = useLanguage();
  const [events, setEvents] = useState<Event[]>(SEED);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [nextId, setNextId] = useState(SEED.length + 1);

  const filtered = events.filter(
    (e) =>
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.type.toLowerCase().includes(search.toLowerCase()) ||
      e.location.toLowerCase().includes(search.toLowerCase()),
  );

  const openAdd = () => {
    setEditId(null);
    setForm(EMPTY);
    setOpen(true);
  };
  const openEdit = (e: Event) => {
    setEditId(e.id);
    setForm({
      title: e.title,
      date: e.date,
      type: e.type,
      description: e.description,
      location: e.location,
      participants: e.participants,
    });
    setOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.date) {
      toast.error("Title and date are required");
      return;
    }
    if (editId !== null) {
      setEvents((prev) =>
        prev.map((ev) => (ev.id === editId ? { ...ev, ...form } : ev)),
      );
      toast.success(`${t("update")} ${t("events")}`);
    } else {
      setEvents((prev) =>
        [...prev, { id: nextId, ...form }].sort((a, b) =>
          a.date.localeCompare(b.date),
        ),
      );
      setNextId((n) => n + 1);
      toast.success(t("addEventBtn"));
    }
    setOpen(false);
  };

  const handleDelete = () => {
    setEvents((prev) => prev.filter((e) => e.id !== deleteId));
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
            {t("eventsPage")}
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {events.length} {t("events")}
          </p>
        </div>
        <Button
          onClick={openAdd}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
          data-ocid="events.primary_button"
        >
          <Plus size={16} className="mr-2" /> {t("addEventBtn")}
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <Search size={16} className="text-muted-foreground" />
        <Input
          placeholder={t("searchEvents")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600"
          data-ocid="events.search_input"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {filtered.length === 0 && (
          <Card className="col-span-2">
            <CardContent
              className="py-12 text-center"
              data-ocid="events.empty_state"
            >
              <Calendar
                size={36}
                className="mx-auto text-muted-foreground mb-2"
              />
              <p className="text-muted-foreground">{t("noData")}</p>
            </CardContent>
          </Card>
        )}
        {filtered.map((e, i) => (
          <Card key={e.id} data-ocid={`events.item.${i + 1}`}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="flex gap-3 items-start flex-1">
                  <div
                    className={`${typeDateBg[e.type] || "bg-gray-700"} text-white rounded-lg p-2 text-center min-w-[48px]`}
                  >
                    <div className="text-xs font-medium">
                      {new Date(e.date).toLocaleString("en", {
                        month: "short",
                      })}
                    </div>
                    <div className="text-lg font-bold leading-tight">
                      {new Date(e.date).getDate()}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className="font-semibold dark:text-white">
                        {e.title}
                      </h3>
                      <Badge
                        className={
                          typeColor[e.type] ||
                          "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
                        }
                      >
                        {e.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {e.description}
                    </p>
                    <div className="flex gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin size={11} />
                        {e.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users size={11} />
                        {e.participants}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-1 shrink-0">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => openEdit(e)}
                    data-ocid={`events.edit_button.${i + 1}`}
                  >
                    <Pencil size={14} />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-red-500 hover:text-red-600 hover:border-red-300"
                    onClick={() => setDeleteId(e.id)}
                    data-ocid={`events.delete_button.${i + 1}`}
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editId ? t("edit") : t("addEventBtn")}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <Label>{t("eventTitle")} *</Label>
              <Input
                value={form.title}
                onChange={(e) => f("title", e.target.value)}
                placeholder={t("eventTitle")}
                data-ocid="events.input"
              />
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
                <Label>{t("type")}</Label>
                <Select value={form.type} onValueChange={(v) => f("type", v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {EVENT_TYPES.map((tp) => (
                      <SelectItem key={tp} value={tp}>
                        {tp}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-1">
              <Label>{t("description")}</Label>
              <Textarea
                value={form.description}
                onChange={(e) => f("description", e.target.value)}
                placeholder={t("description")}
                rows={3}
                data-ocid="events.textarea"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label>{t("location")}</Label>
                <Input
                  value={form.location}
                  onChange={(e) => f("location", e.target.value)}
                  placeholder={t("location")}
                />
              </div>
              <div className="space-y-1">
                <Label>{t("participants")}</Label>
                <Input
                  value={form.participants}
                  onChange={(e) => f("participants", e.target.value)}
                  placeholder={t("participants")}
                />
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
                data-ocid="events.submit_button"
              >
                {editId ? t("update") : t("addEventBtn")}
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
              {t("delete")} {t("events")}
            </AlertDialogTitle>
            <AlertDialogDescription>
              Permanently delete this event?
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
