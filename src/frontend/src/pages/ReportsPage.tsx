import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  BookOpen,
  ClipboardCheck,
  DollarSign,
  Download,
  FileBarChart,
  FileText,
  GraduationCap,
  Loader2,
  Star,
} from "lucide-react";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";

const reportCards = [
  {
    id: "attendance",
    icon: <ClipboardCheck size={22} />,
    title: "Attendance Report",
    description:
      "Monthly and semester-wise attendance summary for all students and classes.",
    lastGenerated: "Mar 20, 2026",
  },
  {
    id: "grades",
    icon: <Star size={22} />,
    title: "Grade Summary",
    description:
      "Subject-wise grade distribution and performance analytics across all grades.",
    lastGenerated: "Mar 15, 2026",
  },
  {
    id: "fees",
    icon: <DollarSign size={22} />,
    title: "Fee Collection",
    description:
      "Detailed fee collection status, outstanding balances, and payment history.",
    lastGenerated: "Mar 22, 2026",
  },
  {
    id: "class",
    icon: <BookOpen size={22} />,
    title: "Class Performance",
    description:
      "Class-level academic performance comparison and ranking by subject.",
    lastGenerated: "Mar 18, 2026",
  },
  {
    id: "teacher",
    icon: <GraduationCap size={22} />,
    title: "Teacher Performance",
    description:
      "Teacher evaluation scores, class ratings, and attendance records.",
    lastGenerated: "Mar 12, 2026",
  },
  {
    id: "exam",
    icon: <FileText size={22} />,
    title: "Exam Results",
    description:
      "Comprehensive exam results analysis with pass/fail ratios and top performers.",
    lastGenerated: "Mar 10, 2026",
  },
];

const performanceData = [
  { month: "Sep", attendance: 94, grades: 72, exams: 68 },
  { month: "Oct", attendance: 92, grades: 75, exams: 71 },
  { month: "Nov", attendance: 95, grades: 78, exams: 74 },
  { month: "Dec", attendance: 88, grades: 74, exams: 70 },
  { month: "Jan", attendance: 93, grades: 80, exams: 77 },
  { month: "Feb", attendance: 96, grades: 83, exams: 80 },
  { month: "Mar", attendance: 94, grades: 86, exams: 83 },
];

function generateCSV(reportId: string): string {
  const now = new Date().toLocaleDateString();
  const csvMap: Record<string, string> = {
    attendance: [
      "Student Name,Class,Section,Total Days,Present,Absent,Late,Attendance %",
      "Aarav Sharma,Grade 10,A,120,110,6,4,91.7%",
      "Priya Patel,Grade 10,A,120,115,3,2,95.8%",
      "Rohan Mehta,Grade 9,B,120,108,8,4,90.0%",
      "Sneha Gupta,Grade 11,A,120,112,5,3,93.3%",
      "Arjun Singh,Grade 8,C,120,100,14,6,83.3%",
    ].join("\n"),
    grades: [
      "Student Name,Subject,Exam,Marks Obtained,Total Marks,Percentage,Grade",
      "Aarav Sharma,Mathematics,Mid-Term,88,100,88%,A",
      "Aarav Sharma,Science,Mid-Term,92,100,92%,A+",
      "Priya Patel,Mathematics,Mid-Term,95,100,95%,A+",
      "Priya Patel,English,Mid-Term,87,100,87%,A",
      "Rohan Mehta,Mathematics,Mid-Term,74,100,74%,B",
    ].join("\n"),
    fees: [
      "Student Name,Class,Fee Type,Amount,Due Date,Status",
      "Aarav Sharma,Grade 10,Tuition Fee Term 1,4000,2026-04-10,Paid",
      "Aarav Sharma,Grade 10,Tuition Fee Term 2,4000,2026-07-10,Paid",
      "Priya Patel,Grade 10,Tuition Fee Term 1,4000,2026-04-10,Paid",
      "Rohan Mehta,Grade 9,Tuition Fee Term 1,4000,2026-04-10,Unpaid",
      "Sneha Gupta,Grade 11,Library & Lab Fee,1200,2026-04-10,Paid",
    ].join("\n"),
    class: [
      "Class,Total Students,Avg Attendance %,Avg Grade %,Top Subject,Bottom Subject",
      "Grade 10A,35,93.2%,84.5%,Mathematics,History",
      "Grade 10B,32,91.8%,81.2%,Science,Geography",
      "Grade 9A,38,94.1%,79.8%,English,Mathematics",
      "Grade 11A,30,92.5%,86.1%,Physics,Chemistry",
      "Grade 8B,36,89.7%,77.3%,English,Mathematics",
    ].join("\n"),
    teacher: [
      "Teacher Name,Subject,Classes Taught,Avg Class Score,Attendance %,Evaluation Score",
      "Mr. Ramesh Kumar,Mathematics,5,82.4%,97%,4.5/5",
      "Mrs. Sunita Sharma,Science,4,85.1%,98%,4.7/5",
      "Mr. Anil Verma,English,6,79.3%,95%,4.2/5",
      "Ms. Kavita Joshi,History,3,76.8%,96%,4.0/5",
      "Dr. Pradeep Nair,Physics,4,88.2%,99%,4.8/5",
    ].join("\n"),
    exam: [
      "Exam Name,Subject,Class,Total Students,Appeared,Passed,Failed,Pass %,Avg Score,Top Score",
      "Mid-Term Exam,Mathematics,Grade 10,35,34,30,4,88.2%,74.5,98",
      "Mid-Term Exam,Science,Grade 10,35,35,32,3,91.4%,78.2,100",
      "Final Exam,English,Grade 9,38,37,35,2,94.6%,81.3,99",
      "Unit Test,Physics,Grade 11,30,30,28,2,93.3%,79.6,97",
      "Mid-Term Exam,History,Grade 8,36,35,29,6,82.9%,68.4,95",
    ].join("\n"),
  };
  return `Generated: ${now}\n\n${csvMap[reportId] ?? "No data available"}`;
}

function generateHTML(reportId: string, title: string, period: string): string {
  const now = new Date().toLocaleDateString();
  const csv = generateCSV(reportId);
  const lines = csv
    .split("\n")
    .filter((l) => l.trim() && !l.startsWith("Generated"));
  const headers = lines[0]?.split(",") ?? [];
  const rows = lines.slice(1);

  const tableRows = rows
    .map(
      (row) =>
        `<tr>${row
          .split(",")
          .map((cell) => `<td>${cell}</td>`)
          .join("")}</tr>`,
    )
    .join("\n");

  const tableHeaders = headers.map((h) => `<th>${h}</th>`).join("");

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>${title}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: Arial, sans-serif; font-size: 12px; padding: 24px; color: #111; }
    h1 { font-size: 20px; font-weight: bold; margin-bottom: 4px; }
    .meta { color: #555; font-size: 11px; margin-bottom: 20px; }
    table { width: 100%; border-collapse: collapse; margin-top: 12px; }
    th { background: #111; color: #fff; padding: 8px 10px; text-align: left; font-size: 11px; }
    td { padding: 7px 10px; border-bottom: 1px solid #e5e7eb; }
    tr:nth-child(even) td { background: #f9fafb; }
    @media print {
      body { padding: 12px; }
      button { display: none; }
    }
  </style>
</head>
<body>
  <h1>${title}</h1>
  <div class="meta">Period: ${period} &nbsp;|&nbsp; Generated: ${now} &nbsp;|&nbsp; EduManage School Management System</div>
  <table>
    <thead><tr>${tableHeaders}</tr></thead>
    <tbody>${tableRows}</tbody>
  </table>
  <script>window.onload = function() { window.print(); }<\/script>
</body>
</html>`;
}

export default function ReportsPage() {
  const { t } = useLanguage();
  const [downloading, setDownloading] = useState<string | null>(null);
  const [period, setPeriod] = useState("monthly");
  const [format, setFormat] = useState("pdf");

  const handleDownload = (reportId: string, reportTitle: string) => {
    setDownloading(reportId);
    setTimeout(() => {
      setDownloading(null);
      if (format === "pdf") {
        const html = generateHTML(reportId, reportTitle, period);
        const win = window.open("", "_blank");
        if (win) {
          win.document.write(html);
          win.document.close();
        } else {
          toast.error(
            "Popup blocked. Please allow popups for this site to download PDF.",
          );
        }
      } else {
        const csv = generateCSV(reportId);
        const ext = format === "xlsx" ? "xlsx" : "csv";
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${reportTitle.replace(/ /g, "_")}_${period}.${ext}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        toast.success(`${reportTitle} downloaded as ${format.toUpperCase()}`);
      }
    }, 800);
  };

  const handleGenerateAll = () => {
    setDownloading("all");
    setTimeout(() => {
      setDownloading(null);
      if (format === "pdf") {
        // Open a combined PDF with all reports
        const allHtml = reportCards
          .map((r) => generateHTML(r.id, r.title, period))
          .join("<div style='page-break-before:always'></div>");
        const win = window.open("", "_blank");
        if (win) {
          win.document.write(allHtml.replace(/window\.onload[^<]+/g, ""));
          win.document.close();
          setTimeout(() => win.print(), 500);
        } else {
          toast.error("Popup blocked. Please allow popups for this site.");
        }
      } else {
        const combined = reportCards
          .map((r) => `=== ${r.title} ===\n${generateCSV(r.id)}`)
          .join("\n\n");
        const ext = format === "xlsx" ? "xlsx" : "csv";
        const blob = new Blob([combined], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `All_Reports_${period}.${ext}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        toast.success("All reports downloaded successfully");
      }
    }, 1200);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{t("reports")}</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Generate and download school reports
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-32" data-ocid="reports.select">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="semester">Semester</SelectItem>
              <SelectItem value="annual">Annual</SelectItem>
            </SelectContent>
          </Select>
          <Select value={format} onValueChange={setFormat}>
            <SelectTrigger className="w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pdf">PDF</SelectItem>
              <SelectItem value="csv">CSV</SelectItem>
              <SelectItem value="xlsx">XLSX</SelectItem>
            </SelectContent>
          </Select>
          <Button
            onClick={handleGenerateAll}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            disabled={downloading === "all"}
            data-ocid="reports.primary_button"
          >
            {downloading === "all" ? (
              <Loader2 size={16} className="mr-2 animate-spin" />
            ) : (
              <Download size={16} className="mr-2" />
            )}
            Export All
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reportCards.map((report, i) => (
          <Card key={report.id} data-ocid={`reports.item.${i + 1}`}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="flex gap-3 items-start flex-1">
                  <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                    {report.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">{report.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      {report.description}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Last generated: {report.lastGenerated}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-3 flex gap-2">
                <Button
                  size="sm"
                  className="flex-1 bg-black text-white hover:bg-gray-800"
                  onClick={() => handleDownload(report.id, report.title)}
                  disabled={downloading === report.id}
                  data-ocid={`reports.download_button.${i + 1}`}
                >
                  {downloading === report.id ? (
                    <Loader2 size={13} className="mr-1.5 animate-spin" />
                  ) : (
                    <Download size={13} className="mr-1.5" />
                  )}
                  {downloading === report.id
                    ? "Generating..."
                    : `Download ${format.toUpperCase()}`}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <FileBarChart size={18} /> School Performance Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart
              data={performanceData}
              margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} domain={[60, 100]} />
              <Tooltip />
              <Bar
                dataKey="attendance"
                fill="#1a1a1a"
                name="Attendance %"
                radius={[3, 3, 0, 0]}
              />
              <Bar
                dataKey="grades"
                fill="#555"
                name="Grade Avg %"
                radius={[3, 3, 0, 0]}
              />
              <Bar
                dataKey="exams"
                fill="#aaa"
                name="Exam Score %"
                radius={[3, 3, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
