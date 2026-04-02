import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const attendanceData = [
  { month: "Jan", School: 92, College: 88 },
  { month: "Feb", School: 94, College: 85 },
  { month: "Mar", School: 91, College: 90 },
  { month: "Apr", School: 89, College: 87 },
  { month: "May", School: 95, College: 92 },
  { month: "Jun", School: 93, College: 89 },
];

const gradeData = [
  { subject: "Math", average: 74 },
  { subject: "Science", average: 78 },
  { subject: "English", average: 82 },
  { subject: "History", average: 71 },
  { subject: "Physics", average: 76 },
  { subject: "Chemistry", average: 73 },
  { subject: "Bio", average: 80 },
  { subject: "CS", average: 85 },
];

const gradeBarColors = [
  "#3b82f6",
  "#22c55e",
  "#6366f1",
  "#f97316",
  "#3b82f6",
  "#22c55e",
  "#6366f1",
  "#f97316",
];

const feeData = [
  { month: "Jan", Collected: 420000, Target: 500000 },
  { month: "Feb", Collected: 480000, Target: 500000 },
  { month: "Mar", Collected: 510000, Target: 500000 },
  { month: "Apr", Collected: 390000, Target: 500000 },
  { month: "May", Collected: 465000, Target: 500000 },
  { month: "Jun", Collected: 530000, Target: 500000 },
];

const enrollmentData = [
  { month: "Sep", students: 820 },
  { month: "Oct", students: 845 },
  { month: "Nov", students: 860 },
  { month: "Dec", students: 855 },
  { month: "Jan", students: 890 },
  { month: "Feb", students: 910 },
  { month: "Mar", students: 935 },
];

const PIE_COLORS = ["#3b82f6", "#22c55e", "#f97316", "#a855f7"];

export default function AnalyticsPage() {
  const { t } = useLanguage();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{t("analyticsPage")}</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Trends and insights across the institution
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Attendance Trends */}
        <Card data-ocid="analytics.attendance_card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Attendance Trends (%)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={attendanceData}>
                <defs>
                  <linearGradient id="schoolGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="collegeGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis domain={[80, 100]} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="School"
                  stroke="#3b82f6"
                  fill="url(#schoolGrad)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="College"
                  stroke="#22c55e"
                  fill="url(#collegeGrad)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Grade Averages */}
        <Card data-ocid="analytics.grades_card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">
              Grade Averages by Subject
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={gradeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="subject" tick={{ fontSize: 11 }} />
                <YAxis domain={[60, 100]} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="average" radius={[4, 4, 0, 0]}>
                  {gradeData.map((entry, index) => (
                    <Cell
                      key={entry.subject}
                      fill={gradeBarColors[index % gradeBarColors.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Fee Collection */}
        <Card data-ocid="analytics.fees_card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">
              Fee Collection vs Target (₹)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={feeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis
                  tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                  tick={{ fontSize: 11 }}
                />
                <Tooltip
                  formatter={(value: number) => `₹${value.toLocaleString()}`}
                />
                <Legend />
                <Bar dataKey="Target" fill="#e2e8f0" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Collected" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Enrollment Growth */}
        <Card data-ocid="analytics.enrollment_card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">
              Student Enrollment Growth
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={enrollmentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis domain={[800, 950]} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="students"
                  stroke="#a855f7"
                  strokeWidth={2.5}
                  dot={{ fill: "#a855f7", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Expense Breakdown Pie */}
      <Card data-ocid="analytics.expense_card">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Expense Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row items-center gap-6">
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={[
                  { name: "Salaries", value: 60 },
                  { name: "Infrastructure", value: 20 },
                  { name: "Events", value: 10 },
                  { name: "Misc", value: 10 },
                ]}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {PIE_COLORS.map((color) => (
                  <Cell key={color} fill={color} />
                ))}
              </Pie>
              <Tooltip formatter={(v: number) => `${v}%`} />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
