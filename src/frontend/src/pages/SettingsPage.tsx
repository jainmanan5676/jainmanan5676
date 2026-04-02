import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Bell, Globe, Lock, Palette, Save, School, User } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useLanguage } from "../contexts/LanguageContext";

export default function SettingsPage() {
  const { t } = useLanguage();
  const { language, setLanguage } = useLanguage();

  const [profile, setProfile] = useState({
    name: "Admin User",
    email: "admin@edumanage.school",
    phone: "9800000001",
    role: "admin",
  });
  const [school, setSchool] = useState({
    name: "EduManage International School",
    address: "123 Education Lane, Knowledge City",
    phone: "9800000000",
    email: "info@edumanage.school",
    principal: "Dr. Robert Thompson",
    established: "2005",
  });
  const [notifications, setNotifications] = useState({
    email: true,
    attendance: true,
    fees: true,
    exams: false,
    announcements: true,
  });
  const [bgColor, setBgColor] = useState<"black" | "white">(
    () =>
      (localStorage.getItem("edumanage_bg_color") as "black" | "white") ||
      "white",
  );
  const [timezone, setTimezone] = useState("Asia/Kolkata");
  const [saving, setSaving] = useState<string | null>(null);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const save = (section: string, label: string) => {
    setSaving(section);
    setTimeout(() => {
      setSaving(null);
      toast.success(`${label} saved successfully`);
    }, 600);
  };

  const handleBgColor = (color: "black" | "white") => {
    setBgColor(color);
    localStorage.setItem("edumanage_bg_color", color);
    if (color === "black") {
      document.documentElement.classList.add("dark");
      document.body.classList.remove("bg-blue-theme");
      document.body.style.backgroundColor = "";
    } else {
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("bg-blue-theme");
      document.body.style.backgroundColor = "";
    }
    toast.success(`Background color set to ${color}`);
  };

  // Apply stored background color on mount
  useEffect(() => {
    const stored = localStorage.getItem("edumanage_bg_color");
    if (stored === "black") {
      document.documentElement.classList.add("dark");
      document.body.classList.remove("bg-blue-theme");
    } else {
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("bg-blue-theme");
      document.body.style.backgroundColor = "";
    }
  }, []);

  const handleUpdatePassword = () => {
    if (!currentPassword) {
      toast.error("Please enter your current password");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("New password must be at least 6 characters");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }
    setSaving("security");
    setTimeout(() => {
      setSaving(null);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      toast.success("Password updated successfully");
    }, 600);
  };

  const handleLanguageSave = () => {
    toast.success("Language preference saved");
  };

  const p = (k: keyof typeof profile, v: string) =>
    setProfile((prev) => ({ ...prev, [k]: v }));
  const s = (k: keyof typeof school, v: string) =>
    setSchool((prev) => ({ ...prev, [k]: v }));

  const languageOptions = [
    { value: "en" as const, label: "English" },
    { value: "hi" as const, label: "हिन्दी Hindi" },
    { value: "ta" as const, label: "தமிழ் Tamil" },
  ];

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold">{t("settings")}</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Manage account, school info, and preferences
        </p>
      </div>

      {/* Profile */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <User size={16} /> {t("profileSettings")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="text-lg font-bold bg-black text-white">
                {profile.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{profile.name}</p>
              <Badge variant="secondary">{profile.role}</Badge>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label>Full Name</Label>
              <Input
                value={profile.name}
                onChange={(e) => p("name", e.target.value)}
                data-ocid="settings.profile.name.input"
              />
            </div>
            <div className="space-y-1">
              <Label>{t("email")}</Label>
              <Input
                type="email"
                value={profile.email}
                onChange={(e) => p("email", e.target.value)}
                data-ocid="settings.profile.email.input"
              />
            </div>
            <div className="space-y-1">
              <Label>{t("phone")}</Label>
              <Input
                value={profile.phone}
                onChange={(e) => p("phone", e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label>{t("role")}</Label>
              <Select value={profile.role} onValueChange={(v) => p("role", v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Administrator</SelectItem>
                  <SelectItem value="teacher">Teacher</SelectItem>
                  <SelectItem value="faculty">College Faculty</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={() => save("profile", "Profile")}
            disabled={saving === "profile"}
            data-ocid="settings.profile.save_button"
          >
            <Save size={14} className="mr-2" />{" "}
            {saving === "profile" ? "Saving..." : "Save Profile"}
          </Button>
        </CardContent>
      </Card>

      {/* School Info */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <School size={16} /> {t("schoolSettings")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1 col-span-2">
              <Label>School Name</Label>
              <Input
                value={school.name}
                onChange={(e) => s("name", e.target.value)}
                data-ocid="settings.school.name.input"
              />
            </div>
            <div className="space-y-1 col-span-2">
              <Label>{t("address")}</Label>
              <Input
                value={school.address}
                onChange={(e) => s("address", e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label>{t("phone")}</Label>
              <Input
                value={school.phone}
                onChange={(e) => s("phone", e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label>{t("email")}</Label>
              <Input
                value={school.email}
                onChange={(e) => s("email", e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label>Principal</Label>
              <Input
                value={school.principal}
                onChange={(e) => s("principal", e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label>Established Year</Label>
              <Input
                value={school.established}
                onChange={(e) => s("established", e.target.value)}
              />
            </div>
          </div>
          <Button
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={() => save("school", "School info")}
            disabled={saving === "school"}
            data-ocid="settings.school.save_button"
          >
            <Save size={14} className="mr-2" />{" "}
            {saving === "school" ? "Saving..." : "Save Info"}
          </Button>
        </CardContent>
      </Card>

      {/* Language & Region */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <Globe size={16} /> {t("language")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label>Interface Language</Label>
              <Select
                value={language}
                onValueChange={(v) => setLanguage(v as "en" | "hi" | "ta")}
              >
                <SelectTrigger data-ocid="settings.language.select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languageOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Current:{" "}
                {languageOptions.find((o) => o.value === language)?.label}
              </p>
            </div>
            <div className="space-y-1">
              <Label>Timezone</Label>
              <Select value={timezone} onValueChange={setTimezone}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Asia/Kolkata">
                    IST (Asia/Kolkata)
                  </SelectItem>
                  <SelectItem value="Asia/Dubai">GST (Asia/Dubai)</SelectItem>
                  <SelectItem value="UTC">UTC</SelectItem>
                  <SelectItem value="America/New_York">
                    EST (New York)
                  </SelectItem>
                  <SelectItem value="Europe/London">GMT (London)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={handleLanguageSave}
            data-ocid="settings.language.save_button"
          >
            <Save size={14} className="mr-2" /> Save Language & Region
          </Button>
        </CardContent>
      </Card>

      {/* Background Color */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <Palette size={16} /> {t("backgroundColor")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-xs text-muted-foreground">
            Choose the app background color
          </p>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => handleBgColor("black")}
              data-ocid="settings.bg_black.button"
              className={`flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all focus:outline-none ${
                bgColor === "black"
                  ? "border-blue-500 ring-2 ring-blue-400"
                  : "border-gray-300 dark:border-gray-600 hover:border-gray-500"
              }`}
            >
              <div className="w-16 h-10 rounded bg-black border border-gray-600" />
              <span className="text-sm font-medium">Black</span>
            </button>
            <button
              type="button"
              onClick={() => handleBgColor("white")}
              data-ocid="settings.bg_white.button"
              className={`flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all focus:outline-none ${
                bgColor === "white"
                  ? "border-blue-500 ring-2 ring-blue-400"
                  : "border-gray-300 dark:border-gray-600 hover:border-gray-500"
              }`}
            >
              <div className="w-16 h-10 rounded bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600" />
              <span className="text-sm font-medium">White</span>
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <Bell size={16} /> {t("notifications")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            {
              key: "email" as const,
              label: "Email Notifications",
              desc: "Receive updates via email",
            },
            {
              key: "attendance" as const,
              label: "Attendance Alerts",
              desc: "Alert when student is absent",
            },
            {
              key: "fees" as const,
              label: "Fee Reminders",
              desc: "Reminder for pending payments",
            },
            {
              key: "exams" as const,
              label: "Exam Updates",
              desc: "Notifications about upcoming exams",
            },
            {
              key: "announcements" as const,
              label: "Announcements",
              desc: "New announcement notifications",
            },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
              <Switch
                checked={notifications[item.key]}
                onCheckedChange={(v) =>
                  setNotifications((prev) => ({ ...prev, [item.key]: v }))
                }
                data-ocid={`settings.notifications.${item.key}.switch`}
              />
            </div>
          ))}
          <Button
            className="bg-black text-white hover:bg-gray-800 mt-2"
            onClick={() => save("notifications", "Notification settings")}
            disabled={saving === "notifications"}
            data-ocid="settings.notifications.save_button"
          >
            <Save size={14} className="mr-2" />{" "}
            {saving === "notifications" ? "Saving..." : "Save Notifications"}
          </Button>
        </CardContent>
      </Card>

      {/* Security */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <Lock size={16} /> {t("security")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <Label>Current Password</Label>
            <Input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter current password"
              data-ocid="settings.security.current_password.input"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label>New Password</Label>
              <Input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New password"
              />
            </div>
            <div className="space-y-1">
              <Label>Confirm Password</Label>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
              />
            </div>
          </div>
          <Button
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={handleUpdatePassword}
            disabled={saving === "security"}
            data-ocid="settings.security.save_button"
          >
            <Lock size={14} className="mr-2" />{" "}
            {saving === "security" ? "Updating..." : "Update Password"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
