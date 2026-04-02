import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
import { CheckCircle, FileSpreadsheet, Trash2, Upload, X } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

const STUDENT_HEADERS = ["Name", "Class", "Roll Number", "Parent Contact"];
const TEACHER_HEADERS = ["Name", "Subject", "Qualification", "Email"];

function parseCSV(text: string): string[][] {
  const lines = text
    .trim()
    .split("\n")
    .filter((l) => l.trim());
  return lines.map((line) =>
    line.split(",").map((c) => c.trim().replace(/^"|"$/g, "")),
  );
}

interface ParsedData {
  headers: string[];
  rows: string[][];
}

function ImportTab({ type }: { type: "students" | "teachers" }) {
  const [data, setData] = useState<ParsedData | null>(null);
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const expectedHeaders =
    type === "students" ? STUDENT_HEADERS : TEACHER_HEADERS;

  const processFile = (file: File) => {
    if (!file.name.endsWith(".csv") && !file.name.endsWith(".txt")) {
      toast.error("Please upload a CSV file");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const rows = parseCSV(text);
      if (rows.length === 0) {
        toast.error("File is empty");
        return;
      }
      const headers = rows[0];
      const dataRows = rows.slice(1).slice(0, 20);
      setData({ headers, rows: dataRows });
    };
    reader.readAsText(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleConfirm = () => {
    if (!data) return;
    toast.success(`${data.rows.length} records imported successfully`);
    setData(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleClear = () => {
    setData(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <div className="space-y-6">
      {/* Drop Zone */}
      {!data && (
        <div
          data-ocid="bulk_import.dropzone"
          onKeyDown={(e) => e.key === "Enter" && fileRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors cursor-pointer ${
            dragging
              ? "border-black bg-gray-50 dark:bg-gray-800"
              : "border-gray-300 dark:border-gray-600 hover:border-gray-400"
          }`}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileRef.current?.click()}
        >
          <FileSpreadsheet size={40} className="mx-auto mb-3 text-gray-400" />
          <p className="text-base font-semibold text-gray-700 dark:text-gray-200">
            Drag & drop a CSV file here
          </p>
          <p className="text-sm text-gray-400 mt-1">or click to browse</p>
          <p className="text-xs text-gray-400 mt-2">Accepts .csv files only</p>
          <input
            ref={fileRef}
            type="file"
            accept=".csv,.txt"
            className="hidden"
            onChange={handleFileChange}
            data-ocid="bulk_import.upload_button"
          />
        </div>
      )}

      {/* Format Hint */}
      {!data && (
        <Card className="border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <CardHeader className="pb-2 pt-4">
            <CardTitle className="text-sm font-semibold text-gray-600 dark:text-gray-300">
              Expected CSV Format
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-4">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
              First row must be the header row:
            </p>
            <div className="flex flex-wrap gap-2">
              {expectedHeaders.map((h) => (
                <Badge key={h} variant="secondary" className="text-xs">
                  {h}
                </Badge>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-3">
              Example: {expectedHeaders.join(", ")}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Preview Table */}
      {data && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle
                size={18}
                className="text-gray-600 dark:text-gray-300"
              />
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                {data.rows.length} records parsed
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClear}
              data-ocid="bulk_import.cancel_button"
            >
              <X size={14} className="mr-1" /> Clear
            </Button>
          </div>

          <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <tr>
                  <th className="px-3 py-2.5 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 w-10">
                    #
                  </th>
                  {data.headers.map((h) => (
                    <th
                      key={h}
                      className="px-3 py-2.5 text-left text-xs font-semibold text-gray-500 dark:text-gray-400"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {data.rows.map((row) => {
                  const rowKey = row.join("|||");
                  return (
                    <tr
                      key={rowKey}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700 dark:bg-gray-800"
                    >
                      <td className="px-3 py-2 text-gray-400 text-xs">
                        {data.rows.indexOf(row) + 1}
                      </td>
                      {data.headers.map((h) => (
                        <td
                          key={h}
                          className="px-3 py-2 text-gray-700 dark:text-gray-200"
                        >
                          {row[data.headers.indexOf(h)]}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="flex gap-3">
            <Button
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={handleConfirm}
              data-ocid="bulk_import.submit_button"
            >
              <Upload size={14} className="mr-2" /> Confirm Import (
              {data.rows.length} records)
            </Button>
            <Button
              variant="outline"
              onClick={handleClear}
              data-ocid="bulk_import.delete_button"
            >
              <Trash2 size={14} className="mr-2" /> Clear
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function BulkImportPage() {
  const { t } = useLanguage();
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t("bulkImport")}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
          Upload students or teachers via CSV file
        </p>
      </div>

      <Tabs defaultValue="students">
        <TabsList className="mb-6">
          <TabsTrigger value="students" data-ocid="bulk_import.students.tab">
            Import Students
          </TabsTrigger>
          <TabsTrigger value="teachers" data-ocid="bulk_import.teachers.tab">
            Import Teachers
          </TabsTrigger>
        </TabsList>
        <TabsContent value="students">
          <ImportTab type="students" />
        </TabsContent>
        <TabsContent value="teachers">
          <ImportTab type="teachers" />
        </TabsContent>
      </Tabs>
    </div>
  );
}
