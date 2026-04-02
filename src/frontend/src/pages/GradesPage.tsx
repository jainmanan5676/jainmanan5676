import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
import { Save, Star } from "lucide-react";
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
const EXAMS = [
  { id: "1", name: "Mid-Term Exam", subject: "Mathematics", maxMarks: 100 },
  { id: "2", name: "Unit Test 1", subject: "Physics", maxMarks: 50 },
  { id: "3", name: "Final Exam", subject: "Chemistry", maxMarks: 100 },
  { id: "4", name: "Class Test", subject: "English", maxMarks: 30 },
];

const CLASS_STUDENTS: Record<
  string,
  { id: string; name: string; roll: string }[]
> = {
  "10-A": [
    { id: "s1", name: "Aisha Patel", roll: "101" },
    { id: "s2", name: "Sophie Williams", roll: "102" },
    { id: "s3", name: "Ryan Mitchell", roll: "103" },
    { id: "s4", name: "Zara Ahmed", roll: "104" },
    { id: "s5", name: "Carlos Mendez", roll: "105" },
  ],
  "10-B": [
    { id: "s6", name: "Marcus Johnson", roll: "201" },
    { id: "s7", name: "Emma Davis", roll: "202" },
    { id: "s8", name: "Leo Turner", roll: "203" },
  ],
  "9-A": [
    { id: "s9", name: "Lily Zhang", roll: "301" },
    { id: "s10", name: "Tyler Brooks", roll: "302" },
    { id: "s11", name: "Mia Johnson", roll: "303" },
  ],
  "11-C": [
    { id: "s12", name: "Ethan Rivera", roll: "401" },
    { id: "s13", name: "Isabella Scott", roll: "402" },
  ],
  "12-A": [
    { id: "s14", name: "Olivia Brown", roll: "501" },
    { id: "s15", name: "Elijah Harris", roll: "502" },
  ],
};

function getGrade(
  marks: number,
  max: number,
): { grade: string; color: string } {
  const pct = (marks / max) * 100;
  if (pct >= 90) return { grade: "A+", color: "bg-green-100 text-green-800" };
  if (pct >= 80) return { grade: "A", color: "bg-blue-100 text-blue-800" };
  if (pct >= 70) return { grade: "B", color: "bg-cyan-100 text-cyan-800" };
  if (pct >= 60) return { grade: "C", color: "bg-yellow-100 text-yellow-800" };
  if (pct >= 50) return { grade: "D", color: "bg-orange-100 text-orange-800" };
  return { grade: "F", color: "bg-red-100 text-red-800" };
}

export default function GradesPage() {
  const { t } = useLanguage();
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedExam, setSelectedExam] = useState("");
  const [marksMap, setMarksMap] = useState<Record<string, string>>({});

  const examObj = EXAMS.find((e) => e.id === selectedExam);
  const students = CLASS_STUDENTS[selectedClass] || [];

  const handleClassChange = (cls: string) => {
    setSelectedClass(cls);
    setMarksMap({});
  };

  const handleSave = () => {
    if (!selectedClass || !selectedExam) {
      toast.error(`${t("selectClass")} & ${t("selectExam")}`);
      return;
    }
    const filled = Object.keys(marksMap).filter(
      (k) => marksMap[k] !== "",
    ).length;
    toast.success(`${t("saveGrades")} — ${filled} ${t("students")}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold dark:text-white">
            {t("gradesPage")}
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {t("enterGrades")}
          </p>
        </div>
        <Button
          onClick={handleSave}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
          data-ocid="grades.primary_button"
        >
          <Save size={16} className="mr-2" /> {t("saveGrades")}
        </Button>
      </div>

      <div className="flex gap-4 flex-wrap">
        <div className="space-y-1">
          <span className="text-sm font-medium block dark:text-gray-200">
            {t("class")}
          </span>
          <Select value={selectedClass} onValueChange={handleClassChange}>
            <SelectTrigger className="w-36" data-ocid="grades.select">
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
            {t("exams")}
          </span>
          <Select value={selectedExam} onValueChange={setSelectedExam}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder={t("selectExam")} />
            </SelectTrigger>
            <SelectContent
              position="popper"
              className="max-h-60 overflow-y-auto"
            >
              {EXAMS.map((e) => (
                <SelectItem key={e.id} value={e.id}>
                  {e.name} ({e.subject})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {selectedClass && selectedExam && examObj && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base dark:text-white">
              {examObj.name} — {examObj.subject} ({t("maxMarks")}:{" "}
              {examObj.maxMarks})
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
                    {t("enterMarks")} / {examObj.maxMarks}
                  </TableHead>
                  <TableHead className="dark:text-gray-300">
                    {t("addGrade")}
                  </TableHead>
                  <TableHead className="dark:text-gray-300">%</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((s, i) => {
                  const raw = marksMap[s.id] ?? "";
                  const marks = Number(raw);
                  const valid =
                    raw !== "" &&
                    !Number.isNaN(marks) &&
                    marks >= 0 &&
                    marks <= examObj.maxMarks;
                  const { grade, color } = valid
                    ? getGrade(marks, examObj.maxMarks)
                    : { grade: "—", color: "" };
                  return (
                    <TableRow key={s.id} data-ocid={`grades.item.${i + 1}`}>
                      <TableCell className="font-mono dark:text-gray-300">
                        {s.roll}
                      </TableCell>
                      <TableCell className="font-medium dark:text-gray-200">
                        {s.name}
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          min={0}
                          max={examObj.maxMarks}
                          value={raw}
                          onChange={(e) =>
                            setMarksMap((p) => ({
                              ...p,
                              [s.id]: e.target.value,
                            }))
                          }
                          className="w-24 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600"
                          placeholder="0"
                          data-ocid="grades.input"
                        />
                      </TableCell>
                      <TableCell>
                        {valid && <Badge className={color}>{grade}</Badge>}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {valid
                          ? `${Math.round((marks / examObj.maxMarks) * 100)}%`
                          : "—"}
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
                data-ocid="grades.save_button"
              >
                <Save size={16} className="mr-2" /> {t("saveGrades")}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {(!selectedClass || !selectedExam) && (
        <Card>
          <CardContent
            className="py-16 text-center"
            data-ocid="grades.empty_state"
          >
            <Star size={40} className="mx-auto text-muted-foreground mb-3" />
            <p className="text-muted-foreground">
              {t("selectClass")} & {t("selectExam")}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
