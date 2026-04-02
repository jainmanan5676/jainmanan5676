import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Bell,
  BookOpen,
  Calendar,
  ClipboardCheck,
  DollarSign,
  GraduationCap,
  Library,
  TrendingUp,
  Trophy,
  UserPlus,
  Users,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const sampleEnrollment = [
  { month: "Jan", students: 1200 },
  { month: "Feb", students: 1250 },
  { month: "Mar", students: 1280 },
  { month: "Apr", students: 1320 },
  { month: "May", students: 1380 },
  { month: "Jun", students: 1420 },
];

const monthlyPerformance = [
  { month: "Sep", score: 72 },
  { month: "Oct", score: 75 },
  { month: "Nov", score: 78 },
  { month: "Dec", score: 74 },
  { month: "Jan", score: 80 },
  { month: "Feb", score: 83 },
  { month: "Mar", score: 86 },
];

const topStudents = [
  { rank: 1, name: "Aisha Patel", class: "10-A", avg: 97.4 },
  { rank: 2, name: "Marcus Johnson", class: "10-B", avg: 96.1 },
  { rank: 3, name: "Lily Zhang", class: "9-A", avg: 95.8 },
  { rank: 4, name: "Ethan Rivera", class: "11-C", avg: 94.2 },
  { rank: 5, name: "Sophie Williams", class: "10-A", avg: 93.9 },
];

const recentActivity = [
  {
    id: "enroll",
    text: "Emma Davis enrolled in Grade 9-B",
    time: "2 min ago",
    color: "bg-blue-500",
  },
  {
    id: "attend",
    text: "Attendance marked for Class 10-A",
    time: "15 min ago",
    color: "bg-green-500",
  },
  {
    id: "teacher",
    text: "Mr. Raj Kumar joined as Chemistry teacher",
    time: "1 hr ago",
    color: "bg-purple-500",
  },
  {
    id: "exam",
    text: "Mid-term exam scheduled for March 28",
    time: "2 hr ago",
    color: "bg-orange-500",
  },
  {
    id: "announce",
    text: "Announcement: Annual Sports Day on March 25",
    time: "3 hr ago",
    color: "bg-indigo-500",
  },
  {
    id: "fee",
    text: "Fee payment received from Marcus Johnson",
    time: "4 hr ago",
    color: "bg-emerald-500",
  },
];

const attendancePie = [
  { name: "Present", value: 87, color: "#22c55e" },
  { name: "Absent", value: 8, color: "#ef4444" },
  { name: "Late", value: 5, color: "#f59e0b" },
];

const statCards = [
  {
    label: "Total Students",
    value: "1,428",
    change: "+12 this month",
    icon: <Users size={22} />,
    page: "students",
    iconBg: "bg-blue-500/20 text-blue-400",
    borderColor: "border-l-4 border-l-blue-500",
  },
  {
    label: "Teachers",
    value: "64",
    change: "+2 this month",
    icon: <GraduationCap size={22} />,
    page: "teachers",
    iconBg: "bg-green-500/20 text-green-400",
    borderColor: "border-l-4 border-l-green-500",
  },
  {
    label: "Classes",
    value: "32",
    change: "All active",
    icon: <BookOpen size={22} />,
    page: "classes",
    iconBg: "bg-purple-500/20 text-purple-400",
    borderColor: "border-l-4 border-l-purple-500",
  },
  {
    label: "Attendance Today",
    value: "92%",
    change: "+3% vs yesterday",
    icon: <ClipboardCheck size={22} />,
    page: "attendance",
    iconBg: "bg-orange-500/20 text-orange-400",
    borderColor: "border-l-4 border-l-orange-500",
  },
];

type Page = string;

interface DashboardProps {
  onNavigate?: (page: Page) => void;
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  const { t } = useLanguage();
  const navigate = (page: Page) => {
    if (onNavigate) onNavigate(page);
  };

  const quickActions = [
    { label: t("addStudent"), icon: <UserPlus size={16} />, page: "students" },
    {
      label: "Mark Attendance",
      icon: <ClipboardCheck size={16} />,
      page: "attendance",
    },
    { label: t("scheduleExam"), icon: <Calendar size={16} />, page: "exams" },
    {
      label: "Post Announcement",
      icon: <Bell size={16} />,
      page: "announcements",
    },
    {
      label: "Add Teacher",
      icon: <GraduationCap size={16} />,
      page: "teachers",
    },
    { label: t("library"), icon: <Library size={16} />, page: "library" },
    {
      label: "Fee Collection",
      icon: <DollarSign size={16} />,
      page: "finance",
    },
    {
      label: t("viewReports"),
      icon: <TrendingUp size={16} />,
      page: "reports",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{t("dashboard")}</h1>
        <p className="text-muted-foreground text-sm mt-1">{t("welcomeBack")}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => (
          <Card
            key={stat.label}
            className={`cursor-pointer hover:shadow-md transition-shadow ${stat.borderColor}`}
            onClick={() => navigate(stat.page)}
            data-ocid={`dashboard.${stat.page}.card`}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className={`p-2 rounded-lg ${stat.iconBg}`}>
                  {stat.icon}
                </div>
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">{t("quickActions")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {quickActions.map((action) => (
              <Button
                key={action.label}
                variant="outline"
                className="flex items-center gap-2 justify-start h-10"
                onClick={() => navigate(action.page)}
                data-ocid={`dashboard.${action.page}.button`}
              >
                {action.icon}
                <span className="text-xs">{action.label}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Enrollment Chart */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">
              {t("studentEnrollmentTrend")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={sampleEnrollment}>
                <defs>
                  <linearGradient
                    id="colorStudents"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="currentColor"
                  strokeOpacity={0.1}
                />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="students"
                  stroke="#3b82f6"
                  fill="url(#colorStudents)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Performance Chart */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">
              {t("monthlyPerformanceScore")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={monthlyPerformance}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="currentColor"
                  strokeOpacity={0.1}
                />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} domain={[60, 100]} />
                <Tooltip />
                <Bar
                  dataKey="score"
                  fill="#6366f1"
                  radius={[3, 3, 0, 0]}
                  name="Score %"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Attendance Pie */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Today&apos;s Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <ResponsiveContainer width={160} height={160}>
                <PieChart>
                  <Pie
                    data={attendancePie}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={70}
                    dataKey="value"
                  >
                    {attendancePie.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2">
                {attendancePie.map((entry) => (
                  <div key={entry.name} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ background: entry.color }}
                    />
                    <span className="text-sm">{entry.name}</span>
                    <span className="text-sm font-semibold ml-auto">
                      {entry.value}%
                    </span>
                  </div>
                ))}
                <Button
                  size="sm"
                  className="w-full mt-2 bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={() => navigate("attendance")}
                  data-ocid="dashboard.attendance.button"
                >
                  <ClipboardCheck size={13} className="mr-1" /> Mark Now
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top Students */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <Trophy size={16} className="text-yellow-500" />{" "}
                {t("topStudents")}
              </CardTitle>
              <Button
                size="sm"
                variant="outline"
                onClick={() => navigate("grades")}
                data-ocid="dashboard.grades.button"
              >
                View Grades
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {topStudents.map((student, i) => (
                <div
                  key={student.rank}
                  className="flex items-center gap-3"
                  data-ocid={`dashboard.students.item.${i + 1}`}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      student.rank === 1
                        ? "bg-yellow-400 text-yellow-900"
                        : student.rank === 2
                          ? "bg-gray-300 text-gray-700 dark:text-gray-200"
                          : student.rank === 3
                            ? "bg-amber-600 text-white"
                            : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                    }`}
                  >
                    {student.rank}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{student.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Class {student.class}
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className="font-semibold text-blue-600 border-blue-200"
                  >
                    {student.avg}%
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">{t("recentActivity")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivity.map((activity, i) => (
              <div
                key={activity.id}
                className="flex items-center gap-3"
                data-ocid={`dashboard.activity.item.${i + 1}`}
              >
                <div
                  className={`w-2 h-2 rounded-full ${activity.color} shrink-0`}
                />
                <p className="text-sm flex-1">{activity.text}</p>
                <span className="text-xs text-muted-foreground shrink-0">
                  {activity.time}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
