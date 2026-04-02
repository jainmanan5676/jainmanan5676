import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Download,
  File,
  FileText,
  FolderOpen,
  Image,
  Search,
  Trash2,
  Upload,
} from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

type DocCategory =
  | "School"
  | "College"
  | "Finance"
  | "Reports"
  | "Personal"
  | "Other";

interface StoredDocument {
  id: string;
  name: string;
  type: string;
  size: string;
  category: DocCategory;
  date: string;
  data: string;
}

const STORAGE_KEY = "edumanage_documents";

const CATEGORIES: DocCategory[] = [
  "School",
  "College",
  "Finance",
  "Reports",
  "Personal",
  "Other",
];

const CATEGORY_COLORS: Record<DocCategory, string> = {
  School: "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100",
  College: "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100",
  Finance: "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100",
  Reports: "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100",
  Personal: "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100",
  Other: "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200",
};

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function getFileIcon(type: string) {
  if (type.startsWith("image/"))
    return <Image size={20} className="text-gray-500 dark:text-gray-400" />;
  if (
    type === "application/pdf" ||
    type.includes("document") ||
    type.includes("word") ||
    type.includes("text")
  )
    return <FileText size={20} className="text-gray-500 dark:text-gray-400" />;
  return <File size={20} className="text-gray-500 dark:text-gray-400" />;
}

function loadDocuments(): StoredDocument[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as StoredDocument[];
  } catch {
    return [];
  }
}

function saveDocuments(docs: StoredDocument[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(docs));
}

export default function DocumentsPage() {
  const { t } = useLanguage();
  const [documents, setDocuments] = useState<StoredDocument[]>(loadDocuments);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<"all" | DocCategory>(
    "all",
  );
  const [uploadOpen, setUploadOpen] = useState(false);
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [pendingCategory, setPendingCategory] = useState<DocCategory>("Other");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filtered = documents.filter((doc) => {
    const matchSearch = doc.name.toLowerCase().includes(search.toLowerCase());
    const matchCat =
      categoryFilter === "all" || doc.category === categoryFilter;
    return matchSearch && matchCat;
  });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.warning(
        "File is larger than 5 MB. It may not save correctly due to browser storage limits.",
      );
    }
    setPendingFile(file);
    setUploadOpen(true);
    e.target.value = "";
  };

  const handleUploadConfirm = () => {
    if (!pendingFile) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const data = ev.target?.result as string;
      const newDoc: StoredDocument = {
        id: Date.now().toString(),
        name: pendingFile.name,
        type: pendingFile.type || "application/octet-stream",
        size: formatSize(pendingFile.size),
        category: pendingCategory,
        date: new Date().toISOString(),
        data,
      };
      try {
        const updated = [newDoc, ...documents];
        saveDocuments(updated);
        setDocuments(updated);
        toast.success(`"${pendingFile.name}" saved to Documents.`);
      } catch {
        toast.error("Failed to save document. Storage may be full.");
      }
      setUploadOpen(false);
      setPendingFile(null);
      setPendingCategory("Other");
    };
    reader.readAsDataURL(pendingFile);
  };

  const handleDownload = (doc: StoredDocument) => {
    const a = document.createElement("a");
    a.href = doc.data;
    a.download = doc.name;
    a.click();
  };

  const handleDeleteConfirm = () => {
    if (!deleteId) return;
    const updated = documents.filter((d) => d.id !== deleteId);
    saveDocuments(updated);
    setDocuments(updated);
    toast.success("Document deleted.");
    setDeleteId(null);
  };

  const deleteDoc = documents.find((d) => d.id === deleteId);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-black rounded-lg">
            <FolderOpen size={22} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              {t("documents")}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {documents.length} document{documents.length !== 1 ? "s" : ""}{" "}
              stored
            </p>
          </div>
        </div>
        <Button
          className="bg-black text-white hover:bg-gray-800 gap-2"
          data-ocid="documents.upload_button"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload size={16} />
          Upload Document
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleFileSelect}
        />
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <Input
            placeholder="Search documents..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            data-ocid="documents.search_input"
          />
        </div>
        <Select
          value={categoryFilter}
          onValueChange={(v) => setCategoryFilter(v as "all" | DocCategory)}
        >
          <SelectTrigger className="w-44" data-ocid="documents.category.select">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {CATEGORIES.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Document Grid */}
      {filtered.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center py-20 text-center"
          data-ocid="documents.empty_state"
        >
          <div className="p-5 bg-gray-100 dark:bg-gray-700 rounded-full mb-4">
            <FolderOpen size={36} className="text-gray-400" />
          </div>
          <h3 className="text-base font-semibold text-gray-700 dark:text-gray-200 mb-1">
            {search || categoryFilter !== "all"
              ? "No documents match your filters"
              : "No documents yet"}
          </h3>
          <p className="text-sm text-gray-400 mb-4">
            {search || categoryFilter !== "all"
              ? "Try adjusting your search or filter."
              : "Upload your first document to get started."}
          </p>
          {!search && categoryFilter === "all" && (
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload size={15} />
              Upload Document
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((doc, idx) => (
            <Card
              key={doc.id}
              className="border border-gray-200 dark:border-gray-700 hover:border-gray-400 hover:shadow-md transition-all"
              data-ocid={`documents.item.${idx + 1}`}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="p-2.5 bg-gray-100 dark:bg-gray-700 rounded-lg">
                    {getFileIcon(doc.type)}
                  </div>
                  <Badge
                    className={`text-xs font-medium border-0 ${CATEGORY_COLORS[doc.category]}`}
                  >
                    {doc.category}
                  </Badge>
                </div>
                <p
                  className="text-sm font-semibold text-gray-900 dark:text-white truncate mb-1"
                  title={doc.name}
                >
                  {doc.name}
                </p>
                <p className="text-xs text-gray-400 mb-3">
                  {doc.size} &middot;{" "}
                  {new Date(doc.date).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 gap-1.5 text-xs h-8"
                    data-ocid={`documents.download_button.${idx + 1}`}
                    onClick={() => handleDownload(doc)}
                  >
                    <Download size={13} />
                    Download
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8 px-2.5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-gray-400"
                    data-ocid={`documents.delete_button.${idx + 1}`}
                    onClick={() => setDeleteId(doc.id)}
                  >
                    <Trash2 size={13} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Upload Dialog */}
      <Dialog open={uploadOpen} onOpenChange={setUploadOpen}>
        <DialogContent data-ocid="documents.upload.dialog">
          <DialogHeader>
            <DialogTitle>Upload Document</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                File
              </Label>
              <p className="mt-1 text-sm text-gray-800 dark:text-gray-100 font-semibold truncate">
                {pendingFile?.name}
              </p>
              <p className="text-xs text-gray-400">
                {pendingFile ? formatSize(pendingFile.size) : ""}
              </p>
            </div>
            <div>
              <Label
                htmlFor="doc-category"
                className="text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                Category
              </Label>
              <Select
                value={pendingCategory}
                onValueChange={(v) => setPendingCategory(v as DocCategory)}
              >
                <SelectTrigger
                  id="doc-category"
                  className="mt-1.5"
                  data-ocid="documents.upload.category.select"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setUploadOpen(false);
                setPendingFile(null);
              }}
              data-ocid="documents.upload.cancel_button"
            >
              Cancel
            </Button>
            <Button
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={handleUploadConfirm}
              data-ocid="documents.upload.confirm_button"
            >
              Save Document
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)}>
        <DialogContent data-ocid="documents.delete.dialog">
          <DialogHeader>
            <DialogTitle>Delete Document</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-600 dark:text-gray-300 py-2">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              &ldquo;{deleteDoc?.name}&rdquo;
            </span>
            ? This action cannot be undone.
          </p>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteId(null)}
              data-ocid="documents.delete.cancel_button"
            >
              Cancel
            </Button>
            <Button
              className="bg-gray-600 text-white hover:bg-gray-700"
              onClick={handleDeleteConfirm}
              data-ocid="documents.delete.confirm_button"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
