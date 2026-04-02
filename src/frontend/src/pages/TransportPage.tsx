import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useLanguage } from "@/contexts/LanguageContext";
import { Bus, Pencil, Plus, Search, Trash2, Users } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type Route = {
  id: number;
  routeNumber: string;
  driverName: string;
  vehicleNumber: string;
  capacity: number;
  area: string;
  status: "Active" | "Inactive";
  assignedStudents: string[];
};

const STUDENTS = [
  "Aisha Patel",
  "Marcus Johnson",
  "Lily Zhang",
  "Ethan Rivera",
  "Sophie Williams",
  "Noah Kim",
  "Olivia Brown",
  "James Wilson",
  "Emma Davis",
  "Liam Martinez",
  "Priya Sharma",
  "Arjun Mehta",
  "Sneha Reddy",
  "Karan Singh",
  "Ananya Gupta",
];

const SEED: Route[] = [
  {
    id: 1,
    routeNumber: "RT-01",
    driverName: "Ramesh Kumar",
    vehicleNumber: "MH-12-AB-1234",
    capacity: 40,
    area: "Sector 5, Andheri East",
    status: "Active",
    assignedStudents: ["Aisha Patel", "Marcus Johnson", "Lily Zhang"],
  },
  {
    id: 2,
    routeNumber: "RT-02",
    driverName: "Suresh Patil",
    vehicleNumber: "MH-12-CD-5678",
    capacity: 35,
    area: "Bandra West, Linking Road",
    status: "Active",
    assignedStudents: [
      "Ethan Rivera",
      "Sophie Williams",
      "Noah Kim",
      "Olivia Brown",
    ],
  },
  {
    id: 3,
    routeNumber: "RT-03",
    driverName: "Vijay Nair",
    vehicleNumber: "MH-12-EF-9012",
    capacity: 45,
    area: "Thane, Ghodbunder Road",
    status: "Active",
    assignedStudents: ["James Wilson", "Emma Davis"],
  },
  {
    id: 4,
    routeNumber: "RT-04",
    driverName: "Mohan Das",
    vehicleNumber: "MH-12-GH-3456",
    capacity: 30,
    area: "Powai, Hiranandani",
    status: "Inactive",
    assignedStudents: ["Liam Martinez", "Priya Sharma"],
  },
  {
    id: 5,
    routeNumber: "RT-05",
    driverName: "Arjun Yadav",
    vehicleNumber: "MH-12-IJ-7890",
    capacity: 40,
    area: "Juhu, Vile Parle",
    status: "Active",
    assignedStudents: [
      "Arjun Mehta",
      "Sneha Reddy",
      "Karan Singh",
      "Ananya Gupta",
    ],
  },
];

const EMPTY = {
  routeNumber: "",
  driverName: "",
  vehicleNumber: "",
  capacity: "",
  area: "",
  status: "Active" as "Active" | "Inactive",
};

export default function TransportPage() {
  const { t } = useLanguage();
  const [routes, setRoutes] = useState<Route[]>(SEED);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [nextId, setNextId] = useState(SEED.length + 1);
  const [assignOpen, setAssignOpen] = useState(false);
  const [assignRouteId, setAssignRouteId] = useState<number | null>(null);
  const [assignSelected, setAssignSelected] = useState<string[]>([]);

  const filtered = routes.filter(
    (r) =>
      r.routeNumber.toLowerCase().includes(search.toLowerCase()) ||
      r.driverName.toLowerCase().includes(search.toLowerCase()) ||
      r.area.toLowerCase().includes(search.toLowerCase()),
  );

  const openAdd = () => {
    setEditId(null);
    setForm(EMPTY);
    setOpen(true);
  };

  const openEdit = (r: Route) => {
    setEditId(r.id);
    setForm({
      routeNumber: r.routeNumber,
      driverName: r.driverName,
      vehicleNumber: r.vehicleNumber,
      capacity: String(r.capacity),
      area: r.area,
      status: r.status,
    });
    setOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.routeNumber || !form.driverName) {
      toast.error("Route number and driver name are required");
      return;
    }
    if (editId !== null) {
      setRoutes((prev) =>
        prev.map((r) =>
          r.id === editId
            ? { ...r, ...form, capacity: Number(form.capacity) || 0 }
            : r,
        ),
      );
      toast.success("Route updated successfully");
    } else {
      setRoutes((prev) => [
        ...prev,
        {
          id: nextId,
          ...form,
          capacity: Number(form.capacity) || 0,
          assignedStudents: [],
        },
      ]);
      setNextId((n) => n + 1);
      toast.success("Route added successfully");
    }
    setOpen(false);
  };

  const handleDelete = (id: number) => {
    setRoutes((prev) => prev.filter((r) => r.id !== id));
    toast.success("Route deleted");
  };

  const openAssign = (r: Route) => {
    setAssignRouteId(r.id);
    setAssignSelected([...r.assignedStudents]);
    setAssignOpen(true);
  };

  const handleAssignSave = () => {
    setRoutes((prev) =>
      prev.map((r) =>
        r.id === assignRouteId ? { ...r, assignedStudents: assignSelected } : r,
      ),
    );
    setAssignOpen(false);
    toast.success("Student assignments updated");
  };

  const toggleStudent = (name: string) => {
    setAssignSelected((prev) =>
      prev.includes(name) ? prev.filter((s) => s !== name) : [...prev, name],
    );
  };

  const f = (k: keyof typeof EMPTY, v: string) =>
    setForm((p) => ({ ...p, [k]: v }));

  const totalActive = routes.filter((r) => r.status === "Active").length;
  const totalStudents = routes.reduce(
    (sum, r) => sum + r.assignedStudents.length,
    0,
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{t("transportPage")}</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Manage bus routes, drivers, and student assignments
          </p>
        </div>
        <Button
          onClick={openAdd}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
          data-ocid="transport.primary_button"
        >
          <Plus size={16} className="mr-2" /> Add Route
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          {
            label: "Total Routes",
            value: routes.length,
            icon: <Bus size={20} />,
          },
          {
            label: "Active Routes",
            value: totalActive,
            icon: <Bus size={20} />,
          },
          {
            label: "Students Assigned",
            value: totalStudents,
            icon: <Users size={20} />,
          },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                {stat.icon}
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
                <p className="text-xl font-bold">{stat.value}</p>
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
              placeholder="Search by route, driver, or area..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-sm"
              data-ocid="transport.search_input"
            />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="dark:text-gray-300">Route No.</TableHead>
                <TableHead className="dark:text-gray-300">Driver</TableHead>
                <TableHead className="dark:text-gray-300">
                  Vehicle No.
                </TableHead>
                <TableHead className="dark:text-gray-300">Area</TableHead>
                <TableHead className="dark:text-gray-300">Capacity</TableHead>
                <TableHead>{t("students")}</TableHead>
                <TableHead>{t("status")}</TableHead>
                <TableHead>{t("actions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="text-center py-8 text-muted-foreground"
                    data-ocid="transport.empty_state"
                  >
                    No routes found
                  </TableCell>
                </TableRow>
              )}
              {filtered.map((r, i) => (
                <TableRow key={r.id} data-ocid={`transport.item.${i + 1}`}>
                  <TableCell className="font-bold">{r.routeNumber}</TableCell>
                  <TableCell>{r.driverName}</TableCell>
                  <TableCell className="font-mono text-sm">
                    {r.vehicleNumber}
                  </TableCell>
                  <TableCell className="text-sm text-gray-600 dark:text-gray-300">
                    {r.area}
                  </TableCell>
                  <TableCell>{r.capacity}</TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {r.assignedStudents.length} / {r.capacity}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        r.status === "Active"
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                      }
                    >
                      {r.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openAssign(r)}
                        data-ocid={`transport.secondary_button.${i + 1}`}
                      >
                        <Users size={14} className="mr-1" /> Assign
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openEdit(r)}
                        data-ocid={`transport.edit_button.${i + 1}`}
                      >
                        <Pencil size={14} />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-gray-600 dark:text-gray-300"
                        onClick={() => handleDelete(r.id)}
                        data-ocid={`transport.delete_button.${i + 1}`}
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

      {/* Add/Edit Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md" data-ocid="transport.dialog">
          <DialogHeader>
            <DialogTitle>{editId ? "Edit Route" : "Add New Route"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label>Route Number *</Label>
                <Input
                  value={form.routeNumber}
                  onChange={(e) => f("routeNumber", e.target.value)}
                  placeholder="e.g. RT-06"
                  data-ocid="transport.input"
                />
              </div>
              <div className="space-y-1">
                <Label>Vehicle Number *</Label>
                <Input
                  value={form.vehicleNumber}
                  onChange={(e) => f("vehicleNumber", e.target.value)}
                  placeholder="e.g. MH-12-XX-0000"
                />
              </div>
            </div>
            <div className="space-y-1">
              <Label>Driver Name *</Label>
              <Input
                value={form.driverName}
                onChange={(e) => f("driverName", e.target.value)}
                placeholder="Driver full name"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label>Area / Stop Description</Label>
                <Input
                  value={form.area}
                  onChange={(e) => f("area", e.target.value)}
                  placeholder="Area covered"
                />
              </div>
              <div className="space-y-1">
                <Label>Capacity</Label>
                <Input
                  type="number"
                  value={form.capacity}
                  onChange={(e) => f("capacity", e.target.value)}
                  placeholder="40"
                />
              </div>
            </div>
            <div className="space-y-1">
              <Label>{t("status")}</Label>
              <select
                value={form.status}
                onChange={(e) =>
                  f("status", e.target.value as "Active" | "Inactive")
                }
                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                data-ocid="transport.cancel_button"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                data-ocid="transport.submit_button"
              >
                {editId ? "Update" : "Add Route"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Assign Students Dialog */}
      <Dialog open={assignOpen} onOpenChange={setAssignOpen}>
        <DialogContent
          className="sm:max-w-sm"
          data-ocid="transport.assign.dialog"
        >
          <DialogHeader>
            <DialogTitle>Assign Students to Route</DialogTitle>
          </DialogHeader>
          <div className="space-y-2 max-h-72 overflow-y-auto py-2">
            {STUDENTS.map((name) => (
              <div key={name} className="flex items-center gap-3 py-1.5">
                <Checkbox
                  id={`student-${name}`}
                  checked={assignSelected.includes(name)}
                  onCheckedChange={() => toggleStudent(name)}
                  data-ocid="transport.checkbox"
                />
                <Label htmlFor={`student-${name}`} className="cursor-pointer">
                  {name}
                </Label>
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setAssignOpen(false)}
              data-ocid="transport.assign.cancel_button"
            >
              Cancel
            </Button>
            <Button
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={handleAssignSave}
              data-ocid="transport.assign.confirm_button"
            >
              Save Assignments
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
