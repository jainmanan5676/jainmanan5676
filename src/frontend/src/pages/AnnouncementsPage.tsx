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
import { Bell, Megaphone, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type Announcement = {
  id: number;
  title: string;
  content: string;
  audience: string;
  date: string;
  priority: string;
};

const SEED: Announcement[] = [
  {
    id: 1,
    title: "Annual Sports Day",
    content:
      "Annual Sports Day will be held on March 25th at the school grounds.",
    audience: "All",
    date: "2026-03-20",
    priority: "High",
  },
  {
    id: 2,
    title: "Parent-Teacher Meeting",
    content: "PTM scheduled for March 28th from 10 AM to 1 PM.",
    audience: "Parents",
    date: "2026-03-21",
    priority: "High",
  },
  {
    id: 3,
    title: "Mid-Term Exam Schedule",
    content: "Mid-term examinations will begin from April 1st.",
    audience: "Students",
    date: "2026-03-19",
    priority: "Medium",
  },
  {
    id: 4,
    title: "Staff Meeting",
    content: "Monthly staff meeting on Friday March 27th at 3 PM.",
    audience: "Teachers",
    date: "2026-03-22",
    priority: "Medium",
  },
  {
    id: 5,
    title: "Holiday Notice",
    content: "School will remain closed on April 14th.",
    audience: "All",
    date: "2026-03-18",
    priority: "Low",
  },
  {
    id: 6,
    title: "Science Exhibition",
    content:
      "Annual science fair on April 8th. Submit proposals by March 30th.",
    audience: "Students",
    date: "2026-03-17",
    priority: "Medium",
  },
  {
    id: 7,
    title: "College Semester Registration",
    content:
      "Online course registration for Semester 2 opens April 1st. Maximum 18 credits allowed.",
    audience: "College Students",
    date: "2026-03-20",
    priority: "High",
  },
  {
    id: 8,
    title: "Faculty Research Grant Deadline",
    content:
      "Applications for the annual research grant must be submitted by April 10th.",
    audience: "College Faculty",
    date: "2026-03-22",
    priority: "High",
  },
];

const AUDIENCES = [
  "All",
  "Students",
  "Teachers",
  "Parents",
  "Staff",
  "College Students",
  "College Faculty",
];
const PRIORITIES = ["High", "Medium", "Low"];
const EMPTY = {
  title: "",
  content: "",
  audience: "All",
  date: new Date().toISOString().split("T")[0],
  priority: "Medium",
};

const audienceBadge: Record<string, string> = {
  All: "bg-indigo-100 text-indigo-700",
  Students: "bg-blue-100 text-blue-700",
  Teachers: "bg-green-100 text-green-700",
  Parents: "bg-purple-100 text-purple-700",
  Staff: "bg-orange-100 text-orange-700",
  "College Students": "bg-teal-100 text-teal-700",
  "College Faculty": "bg-violet-100 text-violet-700",
};
const priorityColor: Record<string, string> = {
  High: "bg-red-100 text-red-700",
  Medium: "bg-amber-100 text-amber-700",
  Low: "bg-green-100 text-green-700",
};
const audienceIconBg: Record<string, string> = {
  All: "bg-indigo-100 text-indigo-600",
  Students: "bg-blue-100 text-blue-600",
  Teachers: "bg-green-100 text-green-600",
  Parents: "bg-purple-100 text-purple-600",
  Staff: "bg-orange-100 text-orange-600",
  "College Students": "bg-teal-100 text-teal-600",
  "College Faculty": "bg-violet-100 text-violet-600",
};

export default function AnnouncementsPage() {
  const { t } = useLanguage();
  const [announcements, setAnnouncements] = useState<Announcement[]>(SEED);
  const [search, setSearch] = useState("");
  const [audienceFilter, setAudienceFilter] = useState("All");
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [nextId, setNextId] = useState(SEED.length + 1);

  const filtered = announcements.filter((a) => {
    const matchSearch =
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.content.toLowerCase().includes(search.toLowerCase()) ||
      a.audience.toLowerCase().includes(search.toLowerCase());
    const matchAudience =
      audienceFilter === "All" || a.audience === audienceFilter;
    return matchSearch && matchAudience;
  });

  const openAdd = () => {
    setEditId(null);
    setForm(EMPTY);
    setOpen(true);
  };
  const openEdit = (a: Announcement) => {
    setEditId(a.id);
    setForm({
      title: a.title,
      content: a.content,
      audience: a.audience,
      date: a.date,
      priority: a.priority,
    });
    setOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.content) {
      toast.error("Title and content are required");
      return;
    }
    if (editId !== null) {
      setAnnouncements((prev) =>
        prev.map((a) => (a.id === editId ? { ...a, ...form } : a)),
      );
      toast.success(`${t("update")} ${t("announcements")}`);
    } else {
      setAnnouncements((prev) => [{ id: nextId, ...form }, ...prev]);
      setNextId((n) => n + 1);
      toast.success(t("addAnnouncement"));
    }
    setOpen(false);
  };

  const handleDelete = () => {
    setAnnouncements((prev) => prev.filter((a) => a.id !== deleteId));
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
            {t("announcementsPage")}
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {announcements.length} {t("announcements")}
          </p>
        </div>
        <Button
          onClick={openAdd}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
          data-ocid="announcements.primary_button"
        >
          <Plus size={16} className="mr-2" /> {t("addAnnouncement")}
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <Search size={16} className="text-muted-foreground" />
          <Input
            placeholder={`${t("search")} ${t("announcements")}...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-64 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600"
            data-ocid="announcements.search_input"
          />
        </div>
        <Select value={audienceFilter} onValueChange={setAudienceFilter}>
          <SelectTrigger
            className="w-44"
            data-ocid="announcements.audience_filter_select"
          >
            <SelectValue placeholder={t("audience")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">
              {t("all")} {t("audience")}
            </SelectItem>
            {AUDIENCES.map((a) => (
              <SelectItem key={a} value={a}>
                {a}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        {filtered.length === 0 && (
          <Card>
            <CardContent
              className="py-12 text-center"
              data-ocid="announcements.empty_state"
            >
              <Megaphone
                size={32}
                className="mx-auto mb-3 text-muted-foreground opacity-40"
              />
              <p className="text-muted-foreground">{t("noData")}</p>
            </CardContent>
          </Card>
        )}
        {filtered.map((a, i) => (
          <Card key={a.id} data-ocid={`announcements.item.${i + 1}`}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div
                    className={`p-2 rounded-lg shrink-0 ${audienceIconBg[a.audience] ?? "bg-indigo-100 text-indigo-600"}`}
                  >
                    <Bell size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <p className="font-semibold text-sm dark:text-white">
                        {a.title}
                      </p>
                      <Badge className={`text-xs ${priorityColor[a.priority]}`}>
                        {a.priority}
                      </Badge>
                      <Badge
                        className={`text-xs ${audienceBadge[a.audience] ?? "bg-indigo-100 text-indigo-700"}`}
                      >
                        {a.audience}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {a.content}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {a.date}
                    </p>
                  </div>
                </div>
                <div className="flex gap-1 shrink-0">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => openEdit(a)}
                    data-ocid={`announcements.edit_button.${i + 1}`}
                  >
                    <Pencil size={14} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-red-500 hover:text-red-600"
                    onClick={() => setDeleteId(a.id)}
                    data-ocid={`announcements.delete_button.${i + 1}`}
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
            <DialogTitle>
              {editId ? t("edit") : t("addAnnouncement")}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <Label>{t("name")}</Label>
              <Input
                value={form.title}
                onChange={(e) => f("title", e.target.value)}
                placeholder={t("announcementsPage")}
                data-ocid="announcements.title.input"
              />
            </div>
            <div className="space-y-1">
              <Label>{t("description")}</Label>
              <Textarea
                value={form.content}
                onChange={(e) => f("content", e.target.value)}
                placeholder="Write announcement content..."
                rows={4}
                data-ocid="announcements.textarea"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-1">
                <Label>{t("audience")}</Label>
                <Select
                  value={form.audience}
                  onValueChange={(v) => f("audience", v)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {AUDIENCES.map((a) => (
                      <SelectItem key={a} value={a}>
                        {a}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label>{t("priorityLabel")}</Label>
                <Select
                  value={form.priority}
                  onValueChange={(v) => f("priority", v)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PRIORITIES.map((p) => (
                      <SelectItem key={p} value={p}>
                        {p}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label>{t("date")}</Label>
                <Input
                  type="date"
                  value={form.date}
                  onChange={(e) => f("date", e.target.value)}
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
                data-ocid="announcements.submit_button"
              >
                {editId ? t("update") : t("postAnnouncement")}
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
              {t("delete")} {t("announcements")}
            </AlertDialogTitle>
            <AlertDialogDescription>
              Permanently delete this announcement.
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
