import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { CheckCircle2, Save, XCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

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

const CLASS_STUDENTS: Record<
  string,
  { id: number; name: string; roll: string }[]
> = {
  Nursery: [
    { id: 50, name: "Ananya Singh", roll: "N01" },
    { id: 51, name: "Rohan Mehta", roll: "N02" },
    { id: 52, name: "Priya Sharma", roll: "N03" },
  ],
  LKG: [
    { id: 53, name: "Dev Patel", roll: "L01" },
    { id: 54, name: "Anika Roy", roll: "L02" },
  ],
  UKG: [
    { id: 55, name: "Aryan Gupta", roll: "U01" },
    { id: 56, name: "Neha Sharma", roll: "U02" },
  ],
  "10-A": [
    { id: 1, name: "Aisha Patel", roll: "101" },
    { id: 2, name: "Sophie Williams", roll: "102" },
    { id: 3, name: "Ryan Mitchell", roll: "103" },
    { id: 4, name: "Zara Ahmed", roll: "104" },
    { id: 5, name: "Carlos Mendez", roll: "105" },
  ],
  "10-B": [
    { id: 6, name: "Marcus Johnson", roll: "201" },
    { id: 7, name: "Emma Davis", roll: "202" },
    { id: 8, name: "Leo Turner", roll: "203" },
    { id: 9, name: "Nina Patel", roll: "204" },
  ],
  "9-A": [
    { id: 10, name: "Lily Zhang", roll: "301" },
    { id: 11, name: "Tyler Brooks", roll: "302" },
    { id: 12, name: "Mia Johnson", roll: "303" },
    { id: 13, name: "Oscar Bell", roll: "304" },
    { id: 14, name: "Chloe Martin", roll: "305" },
    { id: 15, name: "Finn Cooper", roll: "306" },
  ],
  "11-C": [
    { id: 16, name: "Ethan Rivera", roll: "401" },
    { id: 17, name: "Isabella Scott", roll: "402" },
    { id: 18, name: "Lucas Wright", roll: "403" },
  ],
  "12-A": [
    { id: 19, name: "Olivia Brown", roll: "501" },
    { id: 20, name: "Elijah Harris", roll: "502" },
    { id: 21, name: "Ava Thompson", roll: "503" },
  ],
};

type Status = "Present" | "Absent" | "Late";

export default function AttendancePage() {
  const { t } = useLanguage();
  const [selectedClass, setSelectedClass] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [statusMap, setStatusMap] = useState<Record<number, Status>>({});
  const [saved, setSaved] = useState(false);

  const students = CLASS_STUDENTS[selectedClass] || [];

  const handleClassChange = (cls: string) => {
    setSelectedClass(cls);
    setSaved(false);
    const defaultMap: Record<number, Status> = {};
    for (const s of CLASS_STUDENTS[cls] || []) defaultMap[s.id] = "Present";
    setStatusMap(defaultMap);
  };

  const toggle = (id: number, status: Status) => {
    setStatusMap((prev) => ({ ...prev, [id]: status }));
    setSaved(false);
  };

  const handleSave = () => {
    if (!selectedClass) {
      toast.error(t("selectClassFirst"));
      return;
    }
    const present = Object.values(statusMap).filter(
      (s) => s === "Present",
    ).length;
    const absent = Object.values(statusMap).filter(
      (s) => s === "Absent",
    ).length;
    const late = Object.values(statusMap).filter((s) => s === "Late").length;
    toast.success(
      `${t("saveAttendance")} — ${present} ${t("present")}, ${absent} ${t("absent")}, ${late} Late`,
    );
    setSaved(true);
  };

  const presentCount = Object.values(statusMap).filter(
    (s) => s === "Present",
  ).length;
  const absentCount = Object.values(statusMap).filter(
    (s) => s === "Absent",
  ).length;
  const lateCount = Object.values(statusMap).filter((s) => s === "Late").length;
  const attendancePct =
    students.length > 0
      ? Math.round((presentCount / students.length) * 100)
      : 0;

  const getStatusBadge = (status: Status) => {
    if (status === "Present")
      return "bg-green-100 text-green-700 border-green-200";
    if (status === "Absent") return "bg-red-100 text-red-700 border-red-200";
    return "bg-amber-100 text-amber-700 border-amber-200";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold dark:text-white">
            {t("attendancePage")}
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {t("markAttendance")}
          </p>
        </div>
        <Button
          onClick={handleSave}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
          data-ocid="attendance.primary_button"
        >
          <Save size={16} className="mr-2" /> {t("saveAttendance")}
        </Button>
      </div>

      <div className="flex gap-4 flex-wrap">
        <div className="space-y-1">
          <span className="text-sm font-medium block dark:text-gray-200">
            {t("selectClass")}
          </span>
          <Select value={selectedClass} onValueChange={handleClassChange}>
            <SelectTrigger className="w-40" data-ocid="attendance.select">
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
          <span className="text-sm font-medium block dark:text-gray-200">
            {t("date")}
          </span>
          <input
            id="attendance-date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="flex h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600"
          />
        </div>
      </div>

      {selectedClass && (
        <>
          <div className="grid grid-cols-4 gap-4">
            {[
              {
                label: t("total"),
                value: students.length,
                color: "bg-blue-50 text-blue-800",
                border: "border-l-4 border-l-blue-400",
              },
              {
                label: t("present"),
                value: presentCount,
                color: "bg-green-50 text-green-800",
                border: "border-l-4 border-l-green-500",
              },
              {
                label: t("absent"),
                value: absentCount,
                color: "bg-red-50 text-red-800",
                border: "border-l-4 border-l-red-500",
              },
              {
                label: "Late",
                value: lateCount,
                color: "bg-amber-50 text-amber-800",
                border: "border-l-4 border-l-amber-500",
              },
            ].map((stat) => (
              <Card key={stat.label} className={stat.border}>
                <CardContent
                  className={`p-4 text-center rounded-lg ${stat.color}`}
                >
                  <p className="text-xs font-medium">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-sm text-muted-foreground">
            {t("attendanceRate")}:{" "}
            <strong className="text-green-600">{attendancePct}%</strong>
          </div>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base dark:text-white">
                {t("class")} {selectedClass} — {date}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="dark:text-gray-300">
                      {t("rollNo")}
                    </TableHead>
                    <TableHead className="dark:text-gray-300">
                      {t("studentName")}
                    </TableHead>
                    <TableHead className="dark:text-gray-300">
                      {t("status")}
                    </TableHead>
                    <TableHead className="dark:text-gray-300">
                      {t("attendanceMark")}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((s, i) => {
                    const status = statusMap[s.id] || "Present";
                    return (
                      <TableRow
                        key={s.id}
                        data-ocid={`attendance.item.${i + 1}`}
                      >
                        <TableCell className="font-mono dark:text-gray-300">
                          {s.roll}
                        </TableCell>
                        <TableCell className="font-medium dark:text-gray-200">
                          {s.name}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={getStatusBadge(status)}
                          >
                            {status === "Present" ? (
                              <CheckCircle2 size={12} className="mr-1 inline" />
                            ) : (
                              <XCircle size={12} className="mr-1 inline" />
                            )}
                            {status === "Present"
                              ? t("present")
                              : status === "Absent"
                                ? t("absent")
                                : "Late"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              variant={
                                status === "Present" ? "default" : "outline"
                              }
                              className={
                                status === "Present"
                                  ? "bg-green-600 hover:bg-green-700 text-white border-green-600"
                                  : "hover:border-green-400 hover:text-green-600"
                              }
                              onClick={() => toggle(s.id, "Present")}
                              data-ocid={`attendance.toggle.${i + 1}`}
                            >
                              P
                            </Button>
                            <Button
                              size="sm"
                              variant={
                                status === "Absent" ? "default" : "outline"
                              }
                              className={
                                status === "Absent"
                                  ? "bg-red-600 hover:bg-red-700 text-white border-red-600"
                                  : "hover:border-red-400 hover:text-red-600"
                              }
                              onClick={() => toggle(s.id, "Absent")}
                            >
                              A
                            </Button>
                            <Button
                              size="sm"
                              variant={
                                status === "Late" ? "default" : "outline"
                              }
                              className={
                                status === "Late"
                                  ? "bg-amber-500 hover:bg-amber-600 text-white border-amber-500"
                                  : "hover:border-amber-400 hover:text-amber-600"
                              }
                              onClick={() => toggle(s.id, "Late")}
                            >
                              L
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
              <div className="mt-4 flex justify-end">
                <Button
                  onClick={handleSave}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                  data-ocid="attendance.save_button"
                >
                  <Save size={16} className="mr-2" />{" "}
                  {saved ? `${t("saveAttendance")} ✓` : t("saveAttendance")}
                </Button>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {!selectedClass && (
        <Card>
          <CardContent
            className="py-16 text-center"
            data-ocid="attendance.empty_state"
          >
            <CheckCircle2
              size={40}
              className="mx-auto text-muted-foreground mb-3"
            />
            <p className="text-muted-foreground">{t("selectClassFirst")}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
