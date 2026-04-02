import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Briefcase,
  Calendar,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  GraduationCap,
  LayoutDashboard,
  Library,
  Menu,
  Star,
  UserCheck,
  UserSquare,
  Users,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

interface LandingPageProps {
  onSignIn: () => void;
}

const features = [
  {
    icon: <LayoutDashboard size={24} />,
    title: "Smart Dashboard",
    description:
      "Charts, leaderboards, quick actions, and real-time stats all in one view. Know your institution at a glance.",
    iconBg: "bg-blue-100 text-blue-600",
    hoverBg: "group-hover:bg-blue-600 group-hover:text-white",
    border: "hover:border-blue-400",
    glow: "hover:shadow-blue-100",
  },
  {
    icon: <Users size={24} />,
    title: "Student Management",
    description:
      "Manage school and college students from Nursery to post-grad. CRUD operations, account linking, and portal access.",
    iconBg: "bg-emerald-100 text-emerald-600",
    hoverBg: "group-hover:bg-emerald-600 group-hover:text-white",
    border: "hover:border-emerald-400",
    glow: "hover:shadow-emerald-100",
  },
  {
    icon: <ClipboardCheck size={24} />,
    title: "Attendance Tracking",
    description:
      "Mark, track, and analyze attendance across all classes. Instant toggles with historical records.",
    iconBg: "bg-orange-100 text-orange-600",
    hoverBg: "group-hover:bg-orange-600 group-hover:text-white",
    border: "hover:border-orange-400",
    glow: "hover:shadow-orange-100",
  },
  {
    icon: <Star size={24} />,
    title: "Grades & Reports",
    description:
      "Input grades, compute GPAs, generate reports. Students view their own data through dedicated portals.",
    iconBg: "bg-purple-100 text-purple-600",
    hoverBg: "group-hover:bg-purple-600 group-hover:text-white",
    border: "hover:border-purple-400",
    glow: "hover:shadow-purple-100",
  },
  {
    icon: <Calendar size={24} />,
    title: "Timetable & Exams",
    description:
      "Build and edit timetables per class. Schedule exams, track results, and publish announcements.",
    iconBg: "bg-pink-100 text-pink-600",
    hoverBg: "group-hover:bg-pink-600 group-hover:text-white",
    border: "hover:border-pink-400",
    glow: "hover:shadow-pink-100",
  },
  {
    icon: <Library size={24} />,
    title: "Library & Finance",
    description:
      "Track library inventory and borrowings. Manage fee records, payments, and financial summaries.",
    iconBg: "bg-amber-100 text-amber-600",
    hoverBg: "group-hover:bg-amber-600 group-hover:text-white",
    border: "hover:border-amber-400",
    glow: "hover:shadow-amber-100",
  },
];

const portals = [
  {
    icon: <UserCheck size={28} />,
    role: "Administrator",
    description:
      "Full access to all 17 pages. Manage students, teachers, classes, finances, and more with complete CRUD control.",
    highlight: true,
    gradient: "from-indigo-600 via-purple-600 to-pink-600",
    iconBg: "bg-white/20",
    iconColor: "text-white",
  },
  {
    icon: <BookOpen size={28} />,
    role: "Teacher",
    description:
      "Access to grades, attendance, timetables, and class management tailored to their assigned subjects.",
    highlight: false,
    gradient: "",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    icon: <Users size={28} />,
    role: "School Student",
    description:
      "Personal portal showing their own grades, attendance, timetable, and announcements.",
    highlight: false,
    gradient: "",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },
  {
    icon: <UserSquare size={28} />,
    role: "College Student",
    description:
      "Course registration, GPA tracking, assignments, fee status, and an academic calendar.",
    highlight: false,
    gradient: "",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    icon: <Briefcase size={28} />,
    role: "College Faculty",
    description:
      "Course management, student rosters, grade submission, assignment posting, and enrollment tracking.",
    highlight: false,
    gradient: "",
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
  },
];

const stats = [
  { value: "17", label: "Feature Pages" },
  { value: "5", label: "Role-Based Portals" },
  { value: "100%", label: "Interactive" },
  { value: "1", label: "Unified Platform" },
];

const steps = [
  {
    number: "01",
    title: "Sign Up",
    description:
      "Create your account in seconds. Choose your role — admin, teacher, student, college student, or faculty.",
    gradient: "from-blue-500 to-indigo-600",
    glow: "shadow-blue-300",
  },
  {
    number: "02",
    title: "Set Up Your Institution",
    description:
      "Add classes from Nursery to Grade 12, import students and teachers, and configure your timetable.",
    gradient: "from-purple-500 to-pink-600",
    glow: "shadow-purple-300",
  },
  {
    number: "03",
    title: "Start Managing",
    description:
      "Your entire institution runs from one place. Every button works, every role has a home.",
    gradient: "from-pink-500 to-orange-500",
    glow: "shadow-pink-300",
  },
];

export default function LandingPage({ onSignIn }: LandingPageProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 text-black font-sans">
      {/* Sticky Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-md border-b border-indigo-100 shadow-md shadow-indigo-100/40"
            : "bg-transparent"
        }`}
        data-ocid="landing.nav.panel"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <GraduationCap size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              EduManage
            </span>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {["features", "portals", "about"].map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => scrollTo(id)}
                className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors capitalize"
                data-ocid={`landing.${id}.link`}
              >
                {id}
              </button>
            ))}
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button
              type="button"
              onClick={onSignIn}
              className="px-4 py-2 text-sm font-semibold border border-indigo-200 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
              data-ocid="landing.signin.button"
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={onSignIn}
              className="px-4 py-2 text-sm font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md shadow-indigo-200"
              data-ocid="landing.get_started.button"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className="md:hidden p-2 text-gray-600"
            onClick={() => setMobileMenuOpen((v) => !v)}
            data-ocid="landing.mobile_menu.toggle"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md border-b border-indigo-100 px-4 pb-5 pt-2 space-y-1">
            {["features", "portals", "about"].map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => scrollTo(id)}
                className="block w-full text-left px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg capitalize"
              >
                {id}
              </button>
            ))}
            <div className="pt-2 flex flex-col gap-2">
              <button
                type="button"
                onClick={onSignIn}
                className="w-full py-2.5 text-sm font-semibold border border-indigo-200 text-indigo-600 rounded-lg hover:bg-indigo-50"
                data-ocid="landing.mobile_signin.button"
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={onSignIn}
                className="w-full py-2.5 text-sm font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg"
                data-ocid="landing.mobile_get_started.button"
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #1e1b4b 0%, #312e81 25%, #4c1d95 50%, #1e3a5f 75%, #0f172a 100%)",
        }}
      >
        {/* Animated gradient orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute top-40 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-10 left-1/2 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />

        {/* Background grid pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-36 pb-28 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-purple-400/40 bg-purple-500/10 text-xs font-medium text-purple-200 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            School & College Management — All in One
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08] mb-6">
            <span className="text-white">The Complete School &</span>
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #fbbf24, #f97316, #ec4899, #a855f7)",
              }}
            >
              College Management
            </span>
            <br />
            <span className="text-white">System</span>
          </h1>

          <p className="text-lg sm:text-xl text-indigo-200 max-w-2xl mx-auto mb-10 leading-relaxed">
            Manage students, faculty, grades, timetables, attendance, library,
            and finances — from a single beautifully designed platform.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              type="button"
              onClick={onSignIn}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold rounded-xl transition-all shadow-lg shadow-purple-900/50"
              style={{
                background:
                  "linear-gradient(135deg, #f97316, #ec4899, #a855f7)",
                color: "white",
              }}
              data-ocid="landing.hero.get_started.button"
            >
              Get Started Free
              <ArrowRight size={18} />
            </button>
            <button
              type="button"
              onClick={() => scrollTo("features")}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold border border-white/30 text-white rounded-xl hover:bg-white/10 transition-colors"
              data-ocid="landing.hero.learn_more.button"
            >
              Learn More
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section
        style={{
          background: "linear-gradient(135deg, #4f46e5, #7c3aed, #9333ea)",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-4xl font-bold text-yellow-300 mb-1">
                  {s.value}
                </div>
                <div className="text-sm text-indigo-200 font-medium">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-24"
        style={{
          background:
            "linear-gradient(180deg, #f0f4ff 0%, #faf5ff 50%, #fff0f5 100%)",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <div className="inline-block px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold mb-4 uppercase tracking-wider">
              Features
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 text-gray-900">
              Everything your institution needs
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              17 fully functional pages, every button wired up, no feature left
              half-built.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className={`group p-6 rounded-2xl border border-gray-200 bg-white hover:shadow-xl ${f.glow} transition-all duration-300`}
                data-ocid="landing.features.card"
              >
                <div
                  className={`w-12 h-12 rounded-xl ${f.iconBg} ${f.hoverBg} flex items-center justify-center mb-4 transition-all duration-300`}
                >
                  {f.icon}
                </div>
                <h3 className="text-base font-semibold mb-2 text-gray-900">
                  {f.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portals Section */}
      <section
        id="portals"
        className="py-24"
        style={{
          background:
            "linear-gradient(135deg, #eef2ff 0%, #f5f3ff 50%, #fdf2f8 100%)",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <div className="inline-block px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-semibold mb-4 uppercase tracking-wider">
              Role Portals
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 text-gray-900">
              Role-based portals for everyone
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Every user type gets a dedicated experience tailored to their
              responsibilities.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {portals.map((p) => (
              <div
                key={p.role}
                className={`p-6 rounded-2xl border transition-all hover:scale-[1.02] ${
                  p.highlight
                    ? `bg-gradient-to-br ${p.gradient} text-white border-transparent shadow-xl shadow-purple-300`
                    : "bg-white border-gray-200 hover:border-purple-300 hover:shadow-lg hover:shadow-purple-100"
                }`}
                data-ocid="landing.portals.card"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${p.iconBg} ${p.iconColor}`}
                >
                  {p.icon}
                </div>
                <h3
                  className={`text-base font-semibold mb-2 ${p.highlight ? "text-white" : "text-gray-900"}`}
                >
                  {p.role}
                </h3>
                <p
                  className={`text-sm leading-relaxed ${p.highlight ? "text-white/80" : "text-gray-500"}`}
                >
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <div className="inline-block px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-semibold mb-4 uppercase tracking-wider">
              How It Works
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 text-gray-900">
              Up and running in minutes
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Three steps to transform how your institution operates.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10 relative">
            {/* Connector lines */}
            <div
              className="hidden md:block absolute top-8 left-1/3 right-1/3 h-0.5"
              style={{ background: "linear-gradient(90deg, #a855f7, #ec4899)" }}
            />
            {steps.map((step, i) => (
              <div key={step.number} className="relative text-center">
                <div
                  className={`w-16 h-16 rounded-full bg-gradient-to-br ${step.gradient} shadow-lg ${step.glow} flex items-center justify-center mx-auto mb-6 relative z-10`}
                >
                  <span className="text-lg font-bold text-white">{i + 1}</span>
                </div>
                <div className="inline-block px-2 py-0.5 rounded-full bg-gray-100 text-xs font-mono text-gray-500 mb-3">
                  {step.number}
                </div>
                <h3 className="text-lg font-semibold mb-3 text-gray-900">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Checklist Section */}
      <section
        style={{
          background:
            "linear-gradient(135deg, #f0fdf4 0%, #f0f4ff 50%, #fdf2f8 100%)",
        }}
        className="py-20"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold mb-4 uppercase tracking-wider">
                Built for Scale
              </div>
              <h2 className="text-3xl font-bold tracking-tight mb-4 text-gray-900">
                Built for the modern institution
              </h2>
              <p className="text-gray-500 leading-relaxed mb-6">
                From a single Nursery classroom to a full college with
                departments and faculty — EduManage scales with you.
              </p>
              <button
                type="button"
                onClick={onSignIn}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-purple-200"
                style={{
                  background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
                }}
                data-ocid="landing.checklist.cta.button"
              >
                Start Managing
                <ArrowRight size={16} />
              </button>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {[
                "Nursery to Grade 12 class support",
                "College course registration (18-credit limit)",
                "Admin-to-student account linking",
                "Role-based access for 5 user types",
                "Real-time search & notification feed",
                "Library, Finance & Events management",
                "Timetable & Exam scheduling",
                "College Faculty enrollment management",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2
                    size={18}
                    className="text-emerald-500 shrink-0"
                  />
                  <span className="text-sm text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section
        className="py-24 text-white"
        style={{
          background:
            "linear-gradient(135deg, #1e40af 0%, #7c3aed 40%, #db2777 70%, #ea580c 100%)",
        }}
      >
        {/* Decorative orbs */}
        <div className="absolute left-10 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute right-10 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center relative">
          <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-6">
            <BarChart3 size={32} className="text-yellow-300" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Ready to get started?
          </h2>
          <p className="text-blue-100 text-lg mb-10">
            Join administrators, teachers, and students already managing their
            institutions on EduManage.
          </p>
          <button
            type="button"
            onClick={onSignIn}
            className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold bg-white text-indigo-700 rounded-xl hover:bg-indigo-50 transition-colors shadow-xl"
            data-ocid="landing.cta.signin.button"
          >
            Sign In Now
            <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
        }}
        className="border-t border-white/10 py-12"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <GraduationCap size={16} className="text-white" />
              </div>
              <span className="text-white font-bold">EduManage</span>
              <span className="text-gray-400 text-sm ml-2">
                The complete school & college management system
              </span>
            </div>
            <div className="flex items-center gap-6">
              {["features", "portals", "about"].map((id) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => scrollTo(id)}
                  className="text-sm text-gray-400 hover:text-purple-300 transition-colors capitalize"
                >
                  {id}
                </button>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
