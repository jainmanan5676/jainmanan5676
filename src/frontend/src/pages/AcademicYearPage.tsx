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
  DialogTrigger,
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
import { Archive, CalendarRange, CheckCircle, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type YearStatus = "Active" | "Archived" | "Upcoming";

interface AcademicYear {
  id: number;
  name: string;
  status: YearStatus;
  createdDate: string;
}

const INITIAL_YEARS: AcademicYear[] = [
  { id: 1, name: "2022-23", status: "Archived", createdDate: "Apr 1, 2022" },
  { id: 2, name: "2023-24", status: "Archived", createdDate: "Apr 1, 2023" },
  { id: 3, name: "2024-25", status: "Active", createdDate: "Apr 1, 2024" },
  { id: 4, name: "2025-26", status: "Upcoming", createdDate: "Jan 15, 2025" },
];

function statusBadge(status: YearStatus) {
  if (status === "Active")
    return (
      <Badge className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-700">
        Active
      </Badge>
    );
  if (status === "Archived")
    return (
      <Badge className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700">
        Archived
      </Badge>
    );
  return (
    <Badge className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-700">
      Upcoming
    </Badge>
  );
}

export default function AcademicYearPage() {
  const { t } = useLanguage();
  const [years, setYears] = useState<AcademicYear[]>(INITIAL_YEARS);
  const [newYearName, setNewYearName] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [confirmYear, setConfirmYear] = useState<AcademicYear | null>(null);

  const handleAddYear = () => {
    if (!newYearName.trim()) {
      toast.error("Year name cannot be empty");
      return;
    }
    const next: AcademicYear = {
      id: Date.now(),
      name: newYearName.trim(),
      status: "Upcoming",
      createdDate: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    };
    setYears((prev) => [...prev, next]);
    setNewYearName("");
    setDialogOpen(false);
    toast.success(`Academic year "${next.name}" added`);
  };

  const handleSetActive = (year: AcademicYear) => {
    setConfirmYear(year);
  };

  const confirmSetActive = () => {
    if (!confirmYear) return;
    setYears((prev) =>
      prev.map((y) => ({
        ...y,
        status:
          y.id === confirmYear.id
            ? "Active"
            : y.status === "Active"
              ? "Archived"
              : y.status,
      })),
    );
    toast.success(`${confirmYear.name} is now the active academic year`);
    setConfirmYear(null);
  };

  const handleArchive = (year: AcademicYear) => {
    setYears((prev) =>
      prev.map((y) => (y.id === year.id ? { ...y, status: "Archived" } : y)),
    );
    toast.success(`${year.name} has been archived`);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Academic Year Management
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Switch between years and archive old data
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              data-ocid="academic_year.open_modal_button"
            >
              <Plus size={16} className="mr-2" /> Add New Year
            </Button>
          </DialogTrigger>
          <DialogContent data-ocid="academic_year.dialog">
            <DialogHeader>
              <DialogTitle>Add New Academic Year</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div>
                <Label htmlFor="year-name">Year Name</Label>
                <Input
                  id="year-name"
                  placeholder="e.g. 2026-27"
                  value={newYearName}
                  onChange={(e) => setNewYearName(e.target.value)}
                  data-ocid="academic_year.input"
                  className="mt-1"
                />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                New years are created with <strong>Upcoming</strong> status.
              </p>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setDialogOpen(false)}
                data-ocid="academic_year.cancel_button"
              >
                Cancel
              </Button>
              <Button
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={handleAddYear}
                data-ocid="academic_year.submit_button"
              >
                Add Year
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {(["Active", "Archived", "Upcoming"] as YearStatus[]).map((s) => (
          <Card key={s} className="border border-gray-100 dark:border-gray-700">
            <CardHeader className="pb-1 pt-4">
              <CardTitle className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                {s}
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-4">
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {years.filter((y) => y.status === s).length}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border border-gray-100 dark:border-gray-700">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 dark:bg-gray-800">
                <TableHead>{t("academicYear")}</TableHead>
                <TableHead>{t("status")}</TableHead>
                <TableHead className="dark:text-gray-300">Created</TableHead>
                <TableHead className="text-right">{t("actions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {years.map((year, i) => (
                <TableRow
                  key={year.id}
                  data-ocid={`academic_year.item.${i + 1}`}
                >
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <CalendarRange size={16} className="text-gray-400" />
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {year.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{statusBadge(year.status)}</TableCell>
                  <TableCell className="text-gray-500 dark:text-gray-400 text-sm">
                    {year.createdDate}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {year.status !== "Active" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleSetActive(year)}
                          data-ocid={`academic_year.primary_button.${i + 1}`}
                        >
                          <CheckCircle size={13} className="mr-1" /> Set Active
                        </Button>
                      )}
                      {year.status !== "Archived" && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-gray-600 dark:text-gray-300"
                          onClick={() => handleArchive(year)}
                          data-ocid={`academic_year.secondary_button.${i + 1}`}
                        >
                          <Archive size={13} className="mr-1" /> Archive
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Confirm Set Active Dialog */}
      <AlertDialog
        open={!!confirmYear}
        onOpenChange={(o) => !o && setConfirmYear(null)}
      >
        <AlertDialogContent data-ocid="academic_year.modal">
          <AlertDialogHeader>
            <AlertDialogTitle>Switch Active Academic Year?</AlertDialogTitle>
            <AlertDialogDescription>
              Setting <strong>{confirmYear?.name}</strong> as active will
              archive the current active year. This cannot be undone easily.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-ocid="academic_year.cancel_button">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={confirmSetActive}
              data-ocid="academic_year.confirm_button"
            >
              Yes, Switch
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
