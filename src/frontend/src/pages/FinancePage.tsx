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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  AlertTriangle,
  Bell,
  CheckCircle2,
  CreditCard,
  DollarSign,
  Download,
  History,
  Loader2,
  Pencil,
  Plus,
  Search,
  Settings,
  Shield,
  Trash2,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { toast } from "sonner";

type FeeRecord = {
  id: number;
  name: string;
  class: string;
  totalFee: number;
  paidAmount: number;
  status: string;
  dueDate: string;
  paymentMethod: string;
};

type PaymentTransaction = {
  id: number;
  studentId: number;
  date: string;
  amount: number;
  method: string;
  note: string;
};

const SEED: FeeRecord[] = [
  {
    id: 1,
    name: "Arjun Sharma",
    class: "10-A",
    totalFee: 45000,
    paidAmount: 45000,
    status: "Paid",
    dueDate: "2026-03-31",
    paymentMethod: "Online",
  },
  {
    id: 2,
    name: "Priya Patel",
    class: "9-A",
    totalFee: 42000,
    paidAmount: 21000,
    status: "Partial",
    dueDate: "2026-03-31",
    paymentMethod: "Cash",
  },
  {
    id: 3,
    name: "Rohan Mehta",
    class: "8-A",
    totalFee: 40000,
    paidAmount: 0,
    status: "Unpaid",
    dueDate: "2026-03-31",
    paymentMethod: "",
  },
  {
    id: 4,
    name: "Sneha Reddy",
    class: "11-B",
    totalFee: 52000,
    paidAmount: 52000,
    status: "Paid",
    dueDate: "2026-03-31",
    paymentMethod: "Cheque",
  },
  {
    id: 5,
    name: "Vikram Singh",
    class: "12-A",
    totalFee: 55000,
    paidAmount: 27500,
    status: "Partial",
    dueDate: "2026-03-31",
    paymentMethod: "Online",
  },
  {
    id: 6,
    name: "Ananya Gupta",
    class: "7-A",
    totalFee: 38000,
    paidAmount: 38000,
    status: "Paid",
    dueDate: "2026-03-31",
    paymentMethod: "Cash",
  },
  {
    id: 7,
    name: "Karthik Nair",
    class: "6-A",
    totalFee: 36000,
    paidAmount: 0,
    status: "Unpaid",
    dueDate: "2026-04-15",
    paymentMethod: "",
  },
  {
    id: 8,
    name: "Divya Krishnan",
    class: "10-B",
    totalFee: 45000,
    paidAmount: 45000,
    status: "Paid",
    dueDate: "2026-03-31",
    paymentMethod: "Online",
  },
  {
    id: 9,
    name: "Rahul Verma",
    class: "9-C",
    totalFee: 42000,
    paidAmount: 15000,
    status: "Partial",
    dueDate: "2026-03-31",
    paymentMethod: "Cash",
  },
  {
    id: 10,
    name: "Meera Iyer",
    class: "11-C",
    totalFee: 52000,
    paidAmount: 40000,
    status: "Partial",
    dueDate: "2026-03-31",
    paymentMethod: "Online",
  },
];

const SEED_TRANSACTIONS: PaymentTransaction[] = [
  {
    id: 1,
    studentId: 1,
    date: "2026-01-10",
    amount: 22500,
    method: "Online",
    note: "First half payment",
  },
  {
    id: 2,
    studentId: 1,
    date: "2026-02-15",
    amount: 22500,
    method: "Online",
    note: "Second half payment",
  },
  {
    id: 3,
    studentId: 2,
    date: "2026-01-20",
    amount: 21000,
    method: "Cash",
    note: "Partial payment - Term 1",
  },
  {
    id: 4,
    studentId: 4,
    date: "2026-01-05",
    amount: 52000,
    method: "Cheque",
    note: "Annual fee - full payment",
  },
  {
    id: 5,
    studentId: 5,
    date: "2026-01-12",
    amount: 27500,
    method: "Online",
    note: "Term 1 payment",
  },
  {
    id: 6,
    studentId: 6,
    date: "2026-02-01",
    amount: 38000,
    method: "Cash",
    note: "Full year payment",
  },
  {
    id: 7,
    studentId: 8,
    date: "2026-01-08",
    amount: 22500,
    method: "Online",
    note: "Advance payment received",
  },
  {
    id: 8,
    studentId: 8,
    date: "2026-02-20",
    amount: 22500,
    method: "Online",
    note: "Second installment",
  },
  {
    id: 9,
    studentId: 9,
    date: "2026-01-25",
    amount: 15000,
    method: "Cash",
    note: "Partial payment - Term 1",
  },
  {
    id: 10,
    studentId: 10,
    date: "2026-01-15",
    amount: 20000,
    method: "Online",
    note: "First half payment",
  },
  {
    id: 11,
    studentId: 10,
    date: "2026-03-10",
    amount: 20000,
    method: "Online",
    note: "Second half payment",
  },
];

const CLASSES = [
  "Nursery",
  "LKG",
  "UKG",
  "1-A",
  "2-A",
  "3-A",
  "4-A",
  "5-A",
  "6-A",
  "7-A",
  "7-B",
  "8-A",
  "8-B",
  "9-A",
  "9-C",
  "10-A",
  "10-B",
  "11-B",
  "11-C",
  "12-A",
];
const PAYMENT_METHODS = ["Online", "Cash", "Cheque", "Bank Transfer"];
const EMPTY = {
  name: "",
  class: "",
  totalFee: "",
  paidAmount: "",
  status: "Unpaid",
  dueDate: "",
  paymentMethod: "",
};

const statusColor: Record<string, string> = {
  Paid: "bg-green-100 text-green-700",
  Partial: "bg-amber-100 text-amber-700",
  Unpaid: "bg-red-100 text-red-700",
};

const budgetData = [
  { month: "Jan", Income: 480000, Expenses: 320000 },
  { month: "Feb", Income: 520000, Expenses: 345000 },
  { month: "Mar", Income: 610000, Expenses: 380000 },
  { month: "Apr", Income: 395000, Expenses: 310000 },
  { month: "May", Income: 465000, Expenses: 355000 },
  { month: "Jun", Income: 530000, Expenses: 370000 },
];

const expensePieData = [
  { name: "Salaries", value: 60 },
  { name: "Infrastructure", value: 20 },
  { name: "Events", value: 10 },
  { name: "Misc", value: 10 },
];

const PIE_COLORS = ["#3b82f6", "#22c55e", "#f97316", "#a855f7"];

function buildCsvContent(records: FeeRecord[]): string {
  const header =
    "Name,Class,Total Fee,Paid Amount,Status,Due Date,Payment Method";
  const rows = records.map(
    (r) =>
      `"${r.name}","${r.class}",${r.totalFee},${r.paidAmount},"${r.status}","${r.dueDate}","${r.paymentMethod}"`,
  );
  return [header, ...rows].join("\n");
}

function downloadCsv(content: string, filename: string) {
  const blob = new Blob([content], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// ─── Online Payment Modal ─────────────────────────────────────────────────────
function OnlinePaymentModal({
  record,
  open,
  onClose,
  onSuccess,
}: {
  record: FeeRecord | null;
  open: boolean;
  onClose: () => void;
  onSuccess: (id: number) => void;
}) {
  const [step, setStep] = useState<"form" | "processing" | "success">("form");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardName, setCardName] = useState("");

  const handleClose = () => {
    setStep("form");
    setCardNumber("");
    setExpiry("");
    setCvv("");
    setCardName("");
    onClose();
  };

  const handlePay = () => {
    if (!cardNumber || !expiry || !cvv || !cardName) {
      toast.error("Fill in all card details");
      return;
    }
    setStep("processing");
    setTimeout(() => {
      setStep("success");
      if (record) onSuccess(record.id);
    }, 2000);
  };

  if (!record) return null;
  const balance = record.totalFee - record.paidAmount;

  return (
    <Dialog open={open} onOpenChange={(o) => !o && handleClose()}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard size={16} /> Online Payment
          </DialogTitle>
        </DialogHeader>
        {step === "form" && (
          <>
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Paying for: <strong>{record.name}</strong>
              </p>
              <p className="text-lg font-bold">
                Amount: ₹{balance.toLocaleString()}
              </p>
              <div className="space-y-1">
                <Label>Cardholder Name</Label>
                <Input
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  placeholder="Name on card"
                  data-ocid="payment.name.input"
                />
              </div>
              <div className="space-y-1">
                <Label>Card Number</Label>
                <Input
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  data-ocid="payment.card.input"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label>Expiry</Label>
                  <Input
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    placeholder="MM/YY"
                  />
                </div>
                <div className="space-y-1">
                  <Label>CVV</Label>
                  <Input
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    placeholder="123"
                    maxLength={3}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={handleClose}
                data-ocid="payment.cancel_button"
              >
                Cancel
              </Button>
              <Button
                className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2"
                onClick={handlePay}
                data-ocid="payment.submit_button"
              >
                <CreditCard size={14} /> Pay ₹{balance.toLocaleString()}
              </Button>
            </DialogFooter>
          </>
        )}
        {step === "processing" && (
          <div
            className="flex flex-col items-center justify-center py-12 gap-4"
            data-ocid="payment.loading_state"
          >
            <Loader2 size={40} className="animate-spin text-black" />
            <p className="font-semibold text-lg">Processing Payment…</p>
            <p className="text-sm text-muted-foreground">
              Please do not close this window.
            </p>
          </div>
        )}
        {step === "success" && (
          <div
            className="flex flex-col items-center justify-center py-10 gap-4"
            data-ocid="payment.success_state"
          >
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle2 size={36} className="text-green-600" />
            </div>
            <div className="text-center">
              <p className="font-bold text-xl">Payment Successful!</p>
              <p className="text-sm text-muted-foreground mt-1">
                ₹{balance.toLocaleString()} paid for {record.name}
              </p>
            </div>
            <Button
              className="bg-primary text-primary-foreground hover:bg-primary/90 mt-2"
              onClick={handleClose}
              data-ocid="payment.close_button"
            >
              Done
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default function FinancePage() {
  const { t } = useLanguage();
  const [records, setRecords] = useState<FeeRecord[]>(SEED);
  const [transactions, setTransactions] =
    useState<PaymentTransaction[]>(SEED_TRANSACTIONS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editRecord, setEditRecord] = useState<FeeRecord | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<FeeRecord | null>(null);
  const [historyRecord, setHistoryRecord] = useState<FeeRecord | null>(null);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [stripeConfigOpen, setStripeConfigOpen] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [payingRecord, setPayingRecord] = useState<FeeRecord | null>(null);
  const [form, setForm] = useState(EMPTY);

  const filtered = records.filter((r) => {
    const matchSearch =
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.class.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || r.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalFees = records.reduce((a, r) => a + r.totalFee, 0);
  const totalCollected = records.reduce((a, r) => a + r.paidAmount, 0);
  const totalPending = totalFees - totalCollected;
  const paidCount = records.filter((r) => r.status === "Paid").length;

  // Fee reminders: overdue (dueDate < today and status != Paid)
  const today = new Date();
  const overdueRecords = records
    .filter((r) => {
      if (r.status === "Paid") return false;
      const due = new Date(r.dueDate);
      return due < today;
    })
    .map((r) => {
      const due = new Date(r.dueDate);
      const daysOverdue = Math.floor(
        (today.getTime() - due.getTime()) / (1000 * 60 * 60 * 24),
      );
      return { ...r, daysOverdue };
    });

  const openAdd = () => {
    setEditRecord(null);
    setForm(EMPTY);
    setDialogOpen(true);
  };
  const openEdit = (r: FeeRecord) => {
    setEditRecord(r);
    setForm({
      name: r.name,
      class: r.class,
      totalFee: String(r.totalFee),
      paidAmount: String(r.paidAmount),
      status: r.status,
      dueDate: r.dueDate,
      paymentMethod: r.paymentMethod,
    });
    setDialogOpen(true);
  };

  const saveRecord = () => {
    if (!form.name || !form.class || !form.totalFee) {
      toast.error("Fill in required fields");
      return;
    }
    const total = Number(form.totalFee);
    const paid = Number(form.paidAmount || 0);
    let status = form.status;
    if (paid >= total) status = "Paid";
    else if (paid > 0) status = "Partial";
    else status = "Unpaid";

    if (editRecord) {
      setRecords((prev) =>
        prev.map((r) =>
          r.id === editRecord.id
            ? { ...r, ...form, totalFee: total, paidAmount: paid, status }
            : r,
        ),
      );
      toast.success("Fee record updated");
    } else {
      const newId = Math.max(0, ...records.map((r) => r.id)) + 1;
      setRecords((prev) => [
        ...prev,
        { id: newId, ...form, totalFee: total, paidAmount: paid, status },
      ]);
      toast.success("Fee record added");
    }
    setDialogOpen(false);
  };

  const deleteRecord = (r: FeeRecord) => {
    setRecords((prev) => prev.filter((x) => x.id !== r.id));
    toast.success(`Deleted record for ${r.name}`);
    setDeleteTarget(null);
  };

  const handlePayOnline = (r: FeeRecord) => {
    setPayingRecord(r);
    setPaymentModalOpen(true);
  };

  const handlePaymentSuccess = (recordId: number) => {
    const rec = records.find((r) => r.id === recordId);
    const balance = rec ? rec.totalFee - rec.paidAmount : 0;
    setRecords((prev) =>
      prev.map((r) =>
        r.id === recordId
          ? {
              ...r,
              paidAmount: r.totalFee,
              status: "Paid",
              paymentMethod: "Online",
            }
          : r,
      ),
    );
    const newTxn: PaymentTransaction = {
      id: Math.max(0, ...transactions.map((t) => t.id)) + 1,
      studentId: recordId,
      date: new Date().toISOString().split("T")[0],
      amount: balance,
      method: "Online",
      note: "Online payment via card",
    };
    setTransactions((prev) => [...prev, newTxn]);
    toast.success("Payment recorded successfully!");
  };

  const downloadStudentRecord = (r: FeeRecord) => {
    const studentTxns = transactions.filter((t) => t.studentId === r.id);
    const content = [
      `Fee Record for ${r.name} (${r.class})`,
      `Total Fee: ₹${r.totalFee}`,
      `Paid: ₹${r.paidAmount}`,
      `Status: ${r.status}`,
      `Due Date: ${r.dueDate}`,
      `Payment Method: ${r.paymentMethod}`,
      "",
      "Payment History:",
      ...studentTxns.map(
        (t) => `${t.date} - ₹${t.amount} via ${t.method} - ${t.note}`,
      ),
    ].join("\n");
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `fee_record_${r.name.replace(" ", "_")}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(`Downloaded record for ${r.name}`);
  };

  const sendReminder = (name: string) => {
    toast.success(`Reminder sent to ${name}`);
  };
  const sendAllReminders = () => {
    toast.success(`Reminders sent to ${overdueRecords.length} students`);
  };

  const totalBudgetIncome = budgetData.reduce((a, d) => a + d.Income, 0);
  const totalBudgetExpenses = budgetData.reduce((a, d) => a + d.Expenses, 0);
  const netBalance = totalBudgetIncome - totalBudgetExpenses;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{t("finance")}</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Fee management, budgets & reports
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setStripeConfigOpen(true)}
            className="flex items-center gap-2"
            data-ocid="finance.configure_button"
          >
            <Settings size={14} /> Configure Stripe
          </Button>
          <Button
            onClick={openAdd}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            data-ocid="finance.add_button"
          >
            <Plus size={16} className="mr-2" /> Add Record
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card data-ocid="finance.total_fees_card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Total Fees</p>
                <p className="text-xl font-bold">
                  ₹{totalFees.toLocaleString()}
                </p>
              </div>
              <DollarSign className="text-blue-600" size={28} />
            </div>
          </CardContent>
        </Card>
        <Card data-ocid="finance.collected_card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Collected</p>
                <p className="text-xl font-bold text-green-600">
                  ₹{totalCollected.toLocaleString()}
                </p>
              </div>
              <TrendingUp className="text-green-600" size={28} />
            </div>
          </CardContent>
        </Card>
        <Card data-ocid="finance.pending_card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">{t("pending")}</p>
                <p className="text-xl font-bold text-amber-600">
                  ₹{totalPending.toLocaleString()}
                </p>
              </div>
              <Shield className="text-gray-500 dark:text-gray-400" size={28} />
            </div>
          </CardContent>
        </Card>
        <Card data-ocid="finance.paid_card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Fully Paid</p>
                <p className="text-xl font-bold">{paidCount} students</p>
              </div>
              <CheckCircle2 className="text-emerald-600" size={28} />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="fee-records">
        <TabsList>
          <TabsTrigger value="fee-records" data-ocid="finance.fee_records.tab">
            Fee Records
          </TabsTrigger>
          <TabsTrigger
            value="budget-reports"
            data-ocid="finance.budget_reports.tab"
          >
            Budget Reports
          </TabsTrigger>
          <TabsTrigger
            value="fee-reminders"
            data-ocid="finance.fee_reminders.tab"
          >
            Fee Reminders{" "}
            {overdueRecords.length > 0 && (
              <span className="ml-1 bg-red-500 text-white text-xs rounded-full px-1.5">
                {overdueRecords.length}
              </span>
            )}
          </TabsTrigger>
        </TabsList>

        {/* Fee Records Tab */}
        <TabsContent value="fee-records" className="space-y-4">
          <div className="flex flex-wrap gap-3 items-center justify-between">
            <div className="flex gap-2 flex-1 min-w-0">
              <div className="relative flex-1 max-w-xs">
                <Search
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <Input
                  placeholder="Search students..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9"
                  data-ocid="finance.search_input"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger
                  className="w-32"
                  data-ocid="finance.status_filter_select"
                >
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent
                  position="popper"
                  className="max-h-60 overflow-y-auto"
                >
                  <SelectItem value="all">{t("all")}</SelectItem>
                  <SelectItem value="Paid">{t("paid")}</SelectItem>
                  <SelectItem value="Partial">Partial</SelectItem>
                  <SelectItem value="Unpaid">{t("unpaid")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              variant="outline"
              onClick={() => {
                downloadCsv(buildCsvContent(filtered), "fee_records.csv");
                toast.success("Fee records downloaded");
              }}
              className="flex items-center gap-2"
              data-ocid="finance.download_button"
            >
              <Download size={14} /> Export CSV
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="dark:text-gray-300">
                        Student
                      </TableHead>
                      <TableHead className="dark:text-gray-300">
                        Class
                      </TableHead>
                      <TableHead className="dark:text-gray-300">
                        Total Fee
                      </TableHead>
                      <TableHead>{t("paid")}</TableHead>
                      <TableHead className="dark:text-gray-300">
                        Balance
                      </TableHead>
                      <TableHead>{t("status")}</TableHead>
                      <TableHead className="dark:text-gray-300">
                        Due Date
                      </TableHead>
                      <TableHead>{t("actions")}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.length === 0 && (
                      <TableRow>
                        <TableCell
                          colSpan={8}
                          className="text-center py-8 text-muted-foreground"
                          data-ocid="finance.empty_state"
                        >
                          No records found
                        </TableCell>
                      </TableRow>
                    )}
                    {filtered.map((r, i) => (
                      <TableRow key={r.id} data-ocid={`finance.item.${i + 1}`}>
                        <TableCell className="font-medium">{r.name}</TableCell>
                        <TableCell>{r.class}</TableCell>
                        <TableCell>₹{r.totalFee.toLocaleString()}</TableCell>
                        <TableCell className="text-gray-700 dark:text-gray-200">
                          ₹{r.paidAmount.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-gray-600 dark:text-gray-300">
                          ₹{(r.totalFee - r.paidAmount).toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={`text-xs ${statusColor[r.status] ?? ""}`}
                          >
                            {r.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{r.dueDate}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            {r.status !== "Paid" && (
                              <Button
                                size="sm"
                                className="h-7 text-xs bg-primary text-primary-foreground hover:bg-primary/90"
                                onClick={() => handlePayOnline(r)}
                                data-ocid={`finance.pay_button.${i + 1}`}
                              >
                                Pay Online
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() => {
                                setHistoryRecord(r);
                                setHistoryOpen(true);
                              }}
                              data-ocid={`finance.history_button.${i + 1}`}
                            >
                              <History size={13} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() => downloadStudentRecord(r)}
                              data-ocid={`finance.download_record_button.${i + 1}`}
                            >
                              <Download size={13} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() => openEdit(r)}
                              data-ocid={`finance.edit_button.${i + 1}`}
                            >
                              <Pencil size={13} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 text-gray-500 dark:text-gray-400"
                              onClick={() => setDeleteTarget(r)}
                              data-ocid={`finance.delete_button.${i + 1}`}
                            >
                              <Trash2 size={13} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Budget Reports Tab */}
        <TabsContent value="budget-reports" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <TrendingUp className="text-green-600" size={28} />
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Total Income (YTD)
                    </p>
                    <p className="text-xl font-bold text-gray-600 dark:text-gray-300">
                      ₹{totalBudgetIncome.toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <TrendingDown className="text-red-500" size={28} />
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Total Expenses (YTD)
                    </p>
                    <p className="text-xl font-bold text-gray-500 dark:text-gray-400">
                      ₹{totalBudgetExpenses.toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <DollarSign className="text-blue-600" size={28} />
                  <div>
                    <p className="text-xs text-muted-foreground">Net Balance</p>
                    <p
                      className={`text-xl font-bold ${netBalance >= 0 ? "text-emerald-600" : "text-red-600"}`}
                    >
                      ₹{netBalance.toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">
                  Monthly Income vs Expenses (₹)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={budgetData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                    <YAxis
                      tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                      tick={{ fontSize: 11 }}
                    />
                    <Tooltip
                      formatter={(v: number) => `₹${v.toLocaleString()}`}
                    />
                    <Legend />
                    <Bar
                      dataKey="Income"
                      fill="#3b82f6"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="Expenses"
                      fill="#f97316"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Expense Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={240}>
                  <PieChart>
                    <Pie
                      data={expensePieData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {expensePieData.map((entry) => (
                        <Cell
                          key={entry.name}
                          fill={
                            PIE_COLORS[
                              expensePieData.indexOf(entry) % PIE_COLORS.length
                            ]
                          }
                        />
                      ))}
                    </Pie>
                    <Tooltip formatter={(v: number) => `${v}%`} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Fee Reminders Tab */}
        <TabsContent value="fee-reminders" className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              {overdueRecords.length} students with overdue fees
            </p>
            <Button
              className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2"
              onClick={sendAllReminders}
              data-ocid="finance.send_all_reminders_button"
            >
              <Bell size={14} /> Send All Reminders
            </Button>
          </div>

          {overdueRecords.length === 0 ? (
            <Card>
              <CardContent
                className="py-12 text-center"
                data-ocid="finance.reminders.empty_state"
              >
                <CheckCircle2
                  size={32}
                  className="mx-auto mb-3 text-green-500"
                />
                <p className="text-muted-foreground">
                  No overdue fees — all students are up to date!
                </p>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="dark:text-gray-300">
                          Student
                        </TableHead>
                        <TableHead className="dark:text-gray-300">
                          Class
                        </TableHead>
                        <TableHead className="dark:text-gray-300">
                          Amount Due
                        </TableHead>
                        <TableHead className="dark:text-gray-300">
                          Days Overdue
                        </TableHead>
                        <TableHead>{t("status")}</TableHead>
                        <TableHead className="dark:text-gray-300">
                          Action
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {overdueRecords.map((r, i) => (
                        <TableRow
                          key={r.id}
                          data-ocid={`finance.reminder.item.${i + 1}`}
                        >
                          <TableCell className="font-medium">
                            {r.name}
                          </TableCell>
                          <TableCell>{r.class}</TableCell>
                          <TableCell className="text-gray-600 dark:text-gray-300 font-semibold">
                            ₹{(r.totalFee - r.paidAmount).toLocaleString()}
                          </TableCell>
                          <TableCell>
                            <span
                              className={`font-medium ${r.daysOverdue > 30 ? "text-red-600" : r.daysOverdue > 7 ? "text-orange-500" : "text-amber-500"}`}
                            >
                              {r.daysOverdue} days
                            </span>
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={`text-xs ${statusColor[r.status] ?? ""}`}
                            >
                              {r.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-7 text-xs flex items-center gap-1"
                              onClick={() => sendReminder(r.name)}
                              data-ocid={`finance.send_reminder_button.${i + 1}`}
                            >
                              <Bell size={12} /> Send Reminder
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editRecord ? "Edit Fee Record" : "Add Fee Record"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1 col-span-2">
                <Label>Student Name</Label>
                <Input
                  value={form.name}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, name: e.target.value }))
                  }
                  placeholder="Full name"
                  data-ocid="finance.name.input"
                />
              </div>
              <div className="space-y-1">
                <Label>Class</Label>
                <Select
                  value={form.class}
                  onValueChange={(v) => setForm((p) => ({ ...p, class: v }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent
                    position="popper"
                    className="max-h-60 overflow-y-auto"
                  >
                    {CLASSES.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label>Payment Method</Label>
                <Select
                  value={form.paymentMethod}
                  onValueChange={(v) =>
                    setForm((p) => ({ ...p, paymentMethod: v }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Method" />
                  </SelectTrigger>
                  <SelectContent
                    position="popper"
                    className="max-h-60 overflow-y-auto"
                  >
                    {PAYMENT_METHODS.map((m) => (
                      <SelectItem key={m} value={m}>
                        {m}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label>Total Fee (₹)</Label>
                <Input
                  type="number"
                  value={form.totalFee}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, totalFee: e.target.value }))
                  }
                  placeholder="45000"
                  data-ocid="finance.total_fee.input"
                />
              </div>
              <div className="space-y-1">
                <Label>Paid Amount (₹)</Label>
                <Input
                  type="number"
                  value={form.paidAmount}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, paidAmount: e.target.value }))
                  }
                  placeholder="0"
                />
              </div>
              <div className="space-y-1 col-span-2">
                <Label>Due Date</Label>
                <Input
                  type="date"
                  value={form.dueDate}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, dueDate: e.target.value }))
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={saveRecord}
                data-ocid="finance.submit_button"
              >
                {editRecord ? "Update" : "Add"}
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

      {/* Payment History Dialog */}
      <Dialog open={historyOpen} onOpenChange={setHistoryOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Payment History — {historyRecord?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            {historyRecord &&
              transactions.filter((t) => t.studentId === historyRecord.id)
                .length === 0 && (
                <p className="text-muted-foreground text-sm py-4 text-center">
                  No payment history
                </p>
              )}
            {historyRecord &&
              transactions
                .filter((t) => t.studentId === historyRecord.id)
                .map((t) => (
                  <div
                    key={t.id}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    <div>
                      <p className="text-sm font-medium">
                        ₹{t.amount.toLocaleString()} via {t.method}
                      </p>
                      <p className="text-xs text-muted-foreground">{t.note}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">{t.date}</p>
                  </div>
                ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Configure Stripe Dialog */}
      <Dialog open={stripeConfigOpen} onOpenChange={setStripeConfigOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Configure Stripe</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Enter your Stripe publishable key to enable online payments.
            </p>
            <div className="space-y-1">
              <Label>Publishable Key</Label>
              <Input
                placeholder="pk_test_..."
                defaultValue="pk_test_51TEtiEH..."
              />
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setStripeConfigOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={() => {
                  toast.success("Stripe configured");
                  setStripeConfigOpen(false);
                }}
                data-ocid="finance.stripe.save_button"
              >
                Save
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(o) => !o && setDeleteTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Fee Record</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the fee record for{" "}
              {deleteTarget?.name}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteTarget && deleteRecord(deleteTarget)}
              className="bg-destructive hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <OnlinePaymentModal
        record={payingRecord}
        open={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        onSuccess={handlePaymentSuccess}
      />
    </div>
  );
}
