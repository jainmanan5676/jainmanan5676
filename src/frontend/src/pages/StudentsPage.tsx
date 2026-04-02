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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Link2,
  Link2Off,
  Pencil,
  Plus,
  Search,
  Trash2,
  Users,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type Student = {
  id: number;
  name: string;
  age: number;
  class: string;
  roll: string;
  contact: string;
  address: string;
  status: string;
  linkedAccount?: string;
};

const SEED: Student[] = [
  {
    id: 1,
    name: "Aisha Patel",
    age: 15,
    class: "10-A",
    roll: "101",
    contact: "9876543210",
    address: "12 Rose Lane",
    status: "Active",
  },
  {
    id: 2,
    name: "Marcus Johnson",
    age: 14,
    class: "10-B",
    roll: "102",
    contact: "9876543211",
    address: "34 Oak Street",
    status: "Active",
  },
  {
    id: 3,
    name: "Lily Zhang",
    age: 15,
    class: "9-A",
    roll: "103",
    contact: "9876543212",
    address: "56 Maple Ave",
    status: "Active",
  },
  {
    id: 4,
    name: "Ethan Rivera",
    age: 16,
    class: "11-C",
    roll: "104",
    contact: "9876543213",
    address: "78 Pine Road",
    status: "Active",
  },
  {
    id: 5,
    name: "Sophie Williams",
    age: 15,
    class: "10-A",
    roll: "105",
    contact: "9876543214",
    address: "90 Cedar Blvd",
    status: "Active",
  },
  {
    id: 6,
    name: "Noah Kim",
    age: 13,
    class: "8-B",
    roll: "106",
    contact: "9876543215",
    address: "11 Birch Court",
    status: "Active",
  },
  {
    id: 7,
    name: "Olivia Brown",
    age: 17,
    class: "12-A",
    roll: "107",
    contact: "9876543216",
    address: "22 Walnut Way",
    status: "Inactive",
  },
  {
    id: 8,
    name: "James Wilson",
    age: 14,
    class: "9-C",
    roll: "108",
    contact: "9876543217",
    address: "33 Elm Street",
    status: "Active",
  },
  {
    id: 9,
    name: "Ananya Singh",
    age: 4,
    class: "Nursery",
    roll: "N01",
    contact: "9876543218",
    address: "44 Garden Blvd",
    status: "Active",
  },
  {
    id: 10,
    name: "Rohan Mehta",
    age: 5,
    class: "LKG",
    roll: "L01",
    contact: "9876543219",
    address: "55 Flower Street",
    status: "Active",
  },
  {
    id: 11,
    name: "Priya Sharma",
    age: 5,
    class: "UKG",
    roll: "U01",
    contact: "9876543220",
    address: "66 Blossom Ave",
    status: "Active",
  },
  {
    id: 12,
    name: "Dev Patel",
    age: 6,
    class: "1-A",
    roll: "1A01",
    contact: "9876543221",
    address: "77 Sunrise Lane",
    status: "Active",
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
const EMPTY = {
  name: "",
  age: "",
  class: "",
  roll: "",
  contact: "",
  address: "",
  status: "Active",
};

export default function StudentsPage() {
  const { t } = useLanguage();
  const [students, setStudents] = useState<Student[]>(SEED);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [nextId, setNextId] = useState(13);
  const [linkOpen, setLinkOpen] = useState(false);
  const [linkStudentId, setLinkStudentId] = useState<number | null>(null);
  const [linkAccount, setLinkAccount] = useState("");
  const [unlinkId, setUnlinkId] = useState<number | null>(null);

  const filtered = students.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.class.toLowerCase().includes(search.toLowerCase()) ||
      s.roll.includes(search),
  );

  const openAdd = () => {
    setEditId(null);
    setForm(EMPTY);
    setOpen(true);
  };
  const openEdit = (s: Student) => {
    setEditId(s.id);
    setForm({
      name: s.name,
      age: String(s.age),
      class: s.class,
      roll: s.roll,
      contact: s.contact,
      address: s.address,
      status: s.status,
    });
    setOpen(true);
  };
  const openLink = (s: Student) => {
    setLinkStudentId(s.id);
    setLinkAccount(s.linkedAccount ?? "");
    setLinkOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.class || !form.roll) {
      toast.error("Name, class and roll number are required");
      return;
    }
    if (editId !== null) {
      setStudents((prev) =>
        prev.map((s) =>
          s.id === editId ? { ...s, ...form, age: Number(form.age) } : s,
        ),
      );
      toast.success(`${t("update")} ${t("students")}`);
    } else {
      setStudents((prev) => [
        ...prev,
        { id: nextId, ...form, age: Number(form.age) },
      ]);
      setNextId((n) => n + 1);
      toast.success(t("addStudent"));
    }
    setOpen(false);
  };

  const handleDelete = () => {
    setStudents((prev) => prev.filter((s) => s.id !== deleteId));
    setDeleteId(null);
    toast.success(`${t("delete")} ${t("students")}`);
  };

  const handleLinkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = linkAccount.trim();
    if (!trimmed) {
      toast.error("Please enter a login account identifier");
      return;
    }
    const duplicate = students.find(
      (s) => s.id !== linkStudentId && s.linkedAccount === trimmed,
    );
    if (duplicate) {
      toast.error(
        `Account "${trimmed}" is already linked to ${duplicate.name}`,
      );
      return;
    }
    setStudents((prev) =>
      prev.map((s) =>
        s.id === linkStudentId ? { ...s, linkedAccount: trimmed } : s,
      ),
    );
    toast.success("Account linked successfully");
    setLinkOpen(false);
  };

  const handleUnlink = () => {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === unlinkId ? { ...s, linkedAccount: undefined } : s,
      ),
    );
    setUnlinkId(null);
    toast.success("Account unlinked");
  };

  const f = (k: keyof typeof EMPTY, v: string) =>
    setForm((p) => ({ ...p, [k]: v }));
  const linkingStudent = students.find((s) => s.id === linkStudentId);

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold dark:text-white">
              {t("studentsPage")}
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              {students.length} {t("students")}
            </p>
          </div>
          <Button
            onClick={openAdd}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            data-ocid="students.primary_button"
          >
            <Plus size={16} className="mr-2" /> {t("addStudent")}
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {[
            {
              label: t("totalStudents"),
              value: students.length,
              icon: <Users size={20} />,
              bg: "bg-blue-100 text-blue-600",
            },
            {
              label: t("active"),
              value: students.filter((s) => s.status === "Active").length,
              icon: <Users size={20} />,
              bg: "bg-green-100 text-green-600",
            },
            {
              label: t("linkedAccounts"),
              value: students.filter((s) => s.linkedAccount).length,
              icon: <Link2 size={20} />,
              bg: "bg-purple-100 text-purple-600",
            },
          ].map((stat) => (
            <Card key={stat.label}>
              <CardContent className="p-4 flex items-center gap-3">
                <div className={`p-2 rounded-lg ${stat.bg}`}>{stat.icon}</div>
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
                placeholder={t("searchStudents")}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="max-w-sm dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600"
                data-ocid="students.search_input"
              />
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="dark:text-gray-300">
                    {t("rollNo")}
                  </TableHead>
                  <TableHead className="dark:text-gray-300">
                    {t("name")}
                  </TableHead>
                  <TableHead className="dark:text-gray-300">
                    {t("age")}
                  </TableHead>
                  <TableHead className="dark:text-gray-300">
                    {t("class")}
                  </TableHead>
                  <TableHead className="dark:text-gray-300">
                    {t("contactNo")}
                  </TableHead>
                  <TableHead className="dark:text-gray-300">
                    {t("status")}
                  </TableHead>
                  <TableHead className="dark:text-gray-300">
                    {t("linkedAccounts")}
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
                      data-ocid="students.empty_state"
                    >
                      {t("noData")}
                    </TableCell>
                  </TableRow>
                )}
                {filtered.map((s, i) => (
                  <TableRow key={s.id} data-ocid={`students.item.${i + 1}`}>
                    <TableCell className="font-mono text-sm dark:text-gray-300">
                      {s.roll}
                    </TableCell>
                    <TableCell className="font-medium dark:text-gray-200">
                      {s.name}
                    </TableCell>
                    <TableCell className="dark:text-gray-300">
                      {s.age}
                    </TableCell>
                    <TableCell className="dark:text-gray-300">
                      {s.class}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {s.contact}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          s.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                        }
                      >
                        {s.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {s.linkedAccount ? (
                        <span className="inline-flex items-center gap-1.5 text-sm">
                          <span className="h-2 w-2 rounded-full bg-green-500 shrink-0" />
                          <span className="font-mono text-xs text-gray-700 dark:text-gray-200 truncate max-w-[120px]">
                            {s.linkedAccount}
                          </span>
                        </span>
                      ) : (
                        <span className="text-xs text-muted-foreground italic">
                          {t("notLinked")}
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openEdit(s)}
                          data-ocid={`students.edit_button.${i + 1}`}
                        >
                          <Pencil size={14} />
                        </Button>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => openLink(s)}
                              data-ocid={`students.link_button.${i + 1}`}
                              className="text-gray-600 dark:text-gray-300"
                            >
                              <Link2 size={14} />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            {s.linkedAccount
                              ? "Change linked account"
                              : "Link login account"}
                          </TooltipContent>
                        </Tooltip>
                        {s.linkedAccount && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setUnlinkId(s.id)}
                                data-ocid={`students.unlink_button.${i + 1}`}
                                className="text-gray-600 dark:text-gray-300"
                              >
                                <Link2Off size={14} />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Unlink account</TooltipContent>
                          </Tooltip>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-gray-600 dark:text-gray-300"
                          onClick={() => setDeleteId(s.id)}
                          data-ocid={`students.delete_button.${i + 1}`}
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
              <DialogTitle>{editId ? t("edit") : t("addStudent")}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label>{t("name")} *</Label>
                  <Input
                    value={form.name}
                    onChange={(e) => f("name", e.target.value)}
                    placeholder={t("studentName")}
                    data-ocid="students.input"
                  />
                </div>
                <div className="space-y-1">
                  <Label>{t("age")}</Label>
                  <Input
                    type="number"
                    value={form.age}
                    onChange={(e) => f("age", e.target.value)}
                    placeholder={t("age")}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label>{t("class")} *</Label>
                  <Select
                    value={form.class}
                    onValueChange={(v) => f("class", v)}
                  >
                    <SelectTrigger data-ocid="students.select">
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
                  <Label>{t("rollNo")} *</Label>
                  <Input
                    value={form.roll}
                    onChange={(e) => f("roll", e.target.value)}
                    placeholder={t("rollNo")}
                  />
                </div>
              </div>
              <div className="space-y-1">
                <Label>{t("contactNo")}</Label>
                <Input
                  value={form.contact}
                  onChange={(e) => f("contact", e.target.value)}
                  placeholder={t("phone")}
                />
              </div>
              <div className="space-y-1">
                <Label>{t("address")}</Label>
                <Input
                  value={form.address}
                  onChange={(e) => f("address", e.target.value)}
                  placeholder={t("address")}
                />
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
                    <SelectItem value="Active">{t("active")}</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
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
                  data-ocid="students.submit_button"
                >
                  {editId ? t("update") : t("addStudent")}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        <Dialog open={linkOpen} onOpenChange={setLinkOpen}>
          <DialogContent className="sm:max-w-sm">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Link2 size={18} /> Link Login Account
              </DialogTitle>
            </DialogHeader>
            {linkingStudent && (
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg px-4 py-3 mb-2">
                <p className="text-sm font-medium dark:text-white">
                  {linkingStudent.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {t("rollNo")} #{linkingStudent.roll} &middot; {t("class")}{" "}
                  {linkingStudent.class}
                </p>
              </div>
            )}
            <form onSubmit={handleLinkSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label>Login Account</Label>
                <Input
                  value={linkAccount}
                  onChange={(e) => setLinkAccount(e.target.value)}
                  placeholder="e.g. aisha.patel"
                  autoFocus
                  data-ocid="students.link_input"
                />
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setLinkOpen(false)}
                >
                  {t("cancel")}
                </Button>
                <Button
                  type="submit"
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                  data-ocid="students.link_submit_button"
                >
                  {t("save")}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        <AlertDialog
          open={deleteId !== null}
          onOpenChange={(o) => !o && setDeleteId(null)}
        >
          <AlertDialogContent data-ocid="students.dialog">
            <AlertDialogHeader>
              <AlertDialogTitle>
                {t("delete")} {t("students")}
              </AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete this student record.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel data-ocid="students.cancel_button">
                {t("cancel")}
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="bg-destructive hover:bg-destructive/90"
                data-ocid="students.confirm_button"
              >
                {t("delete")}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <AlertDialog
          open={unlinkId !== null}
          onOpenChange={(o) => !o && setUnlinkId(null)}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Unlink Account</AlertDialogTitle>
              <AlertDialogDescription>
                Remove the login account association from this student.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleUnlink}
                className="bg-destructive hover:bg-destructive/90"
                data-ocid="students.unlink_confirm_button"
              >
                Unlink
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </TooltipProvider>
  );
}
