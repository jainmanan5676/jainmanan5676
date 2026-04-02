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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  CheckCircle,
  ClipboardList,
  Eye,
  EyeOff,
  Pencil,
  Plus,
  Save,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type QuestionType = "MCQ" | "Short Answer" | "Long Answer";

interface MCQOption {
  text: string;
  isCorrect: boolean;
}

interface Question {
  id: number;
  text: string;
  type: QuestionType;
  marks: number;
  options: MCQOption[];
}

interface Paper {
  id: number;
  title: string;
  subject: string;
  classCourse: string;
  totalMarks: number;
  duration: string;
  instructions: string;
  questions: Question[];
  savedAt: string;
}

const SUBJECTS = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "English",
  "History",
  "Computer Science",
  "Data Structures",
  "Machine Learning",
];
const CLASSES = [
  "Class 9",
  "Class 10",
  "Class 11",
  "Class 12",
  "BCA Sem 1",
  "BCA Sem 2",
  "BSc CS",
  "MBA",
];

function QuestionForm({ onAdd }: { onAdd: (q: Omit<Question, "id">) => void }) {
  const { t } = useLanguage();
  const [text, setText] = useState("");
  const [type, setType] = useState<QuestionType>("MCQ");
  const [marks, setMarks] = useState("2");
  const [options, setOptions] = useState<MCQOption[]>([
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
  ]);

  const setCorrect = (idx: number) => {
    setOptions((prev) => prev.map((o, i) => ({ ...o, isCorrect: i === idx })));
  };

  const handleAdd = () => {
    if (!text.trim()) {
      toast.error("Question text is required");
      return;
    }
    onAdd({
      text,
      type,
      marks: Number(marks) || 2,
      options: type === "MCQ" ? options : [],
    });
    setText("");
    setMarks("2");
    setOptions([
      { text: "", isCorrect: false },
      { text: "", isCorrect: false },
      { text: "", isCorrect: false },
      { text: "", isCorrect: false },
    ]);
  };

  return (
    <Card className="border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
      <CardHeader className="pb-2 pt-4">
        <CardTitle className="text-sm font-semibold">New Question</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 pb-4">
        <Textarea
          placeholder="Enter question text..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={2}
          data-ocid="question_paper.textarea"
        />
        <div className="flex gap-3">
          <div className="flex-1">
            <Label className="text-xs">{t("type")}</Label>
            <Select
              value={type}
              onValueChange={(v) => setType(v as QuestionType)}
            >
              <SelectTrigger className="mt-1" data-ocid="question_paper.select">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="MCQ">MCQ</SelectItem>
                <SelectItem value="Short Answer">Short Answer</SelectItem>
                <SelectItem value="Long Answer">Long Answer</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-28">
            <Label className="text-xs">Marks</Label>
            <Input
              type="number"
              value={marks}
              onChange={(e) => setMarks(e.target.value)}
              min={1}
              className="mt-1"
              data-ocid="question_paper.input"
            />
          </div>
        </div>
        {type === "MCQ" && (
          <div className="space-y-2">
            <Label className="text-xs">Options (select correct answer)</Label>
            {options.map((opt, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: fixed-length MCQ options array
              <div key={i} className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setCorrect(i)}
                  className={`h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                    opt.isCorrect
                      ? "border-gray-500 bg-gray-500"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                  data-ocid={`question_paper.radio.${i + 1}`}
                >
                  {opt.isCorrect && (
                    <CheckCircle size={10} className="text-white" />
                  )}
                </button>
                <Input
                  placeholder={`Option ${i + 1}`}
                  value={opt.text}
                  onChange={(e) =>
                    setOptions((prev) =>
                      prev.map((o, j) =>
                        j === i ? { ...o, text: e.target.value } : o,
                      ),
                    )
                  }
                  className="h-8 text-sm"
                />
              </div>
            ))}
          </div>
        )}
        <Button
          size="sm"
          className="bg-primary text-primary-foreground hover:bg-primary/90"
          onClick={handleAdd}
          data-ocid="question_paper.submit_button"
        >
          <Plus size={13} className="mr-1" /> Add Question
        </Button>
      </CardContent>
    </Card>
  );
}

function PaperPreview({
  paper,
}: { paper: Partial<Paper> & { questions: Question[] } }) {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-8 space-y-6 font-serif">
      <div className="text-center border-b border-gray-300 dark:border-gray-600 pb-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          {paper.title || "Untitled Paper"}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
          {paper.subject} | {paper.classCourse}
        </p>
        <div className="flex justify-center gap-8 mt-2 text-sm text-gray-500 dark:text-gray-400">
          <span>
            Total Marks: <strong>{paper.totalMarks || 0}</strong>
          </span>
          <span>
            Duration: <strong>{paper.duration || "—"}</strong>
          </span>
        </div>
        {paper.instructions && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 italic">
            {paper.instructions}
          </p>
        )}
      </div>
      {paper.questions.length === 0 ? (
        <p className="text-center text-gray-400 text-sm py-4">
          No questions added yet.
        </p>
      ) : (
        <ol className="space-y-5 list-decimal list-inside">
          {paper.questions.map((q) => (
            <li key={q.id} className="text-gray-800 dark:text-gray-100">
              <span className="font-medium">{q.text}</span>
              <span className="ml-2 text-xs text-gray-400 font-sans">
                [{q.marks} mark{q.marks !== 1 ? "s" : ""}]
              </span>
              {q.type === "MCQ" && q.options.length > 0 && (
                <ol className="mt-2 ml-6 space-y-1 list-[lower-alpha] font-sans text-sm">
                  {q.options
                    .filter((o) => o.text)
                    .map((o) => (
                      <li
                        key={o.text}
                        className={
                          o.isCorrect
                            ? "text-gray-700 dark:text-gray-200 font-medium"
                            : ""
                        }
                      >
                        {o.text}
                      </li>
                    ))}
                </ol>
              )}
              {q.type === "Short Answer" && (
                <div className="mt-2 ml-4 h-6 border-b border-dotted border-gray-300 dark:border-gray-600" />
              )}
              {q.type === "Long Answer" && (
                <div className="mt-2 ml-4 h-16 border border-dotted border-gray-300 dark:border-gray-600 rounded" />
              )}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

export default function QuestionPaperPage() {
  const { t } = useLanguage();
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [classCourse, setClassCourse] = useState("");
  const [totalMarks, setTotalMarks] = useState("");
  const [duration, setDuration] = useState("");
  const [instructions, setInstructions] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [preview, setPreview] = useState(false);
  const [savedPapers, setSavedPapers] = useState<Paper[]>([]);

  const addQuestion = (q: Omit<Question, "id">) => {
    setQuestions((prev) => [...prev, { ...q, id: Date.now() }]);
    setShowForm(false);
  };

  const deleteQuestion = (id: number) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  const savePaper = () => {
    if (!title.trim()) {
      toast.error("Paper title is required");
      return;
    }
    const paper: Paper = {
      id: Date.now(),
      title,
      subject,
      classCourse,
      totalMarks:
        Number(totalMarks) || questions.reduce((s, q) => s + q.marks, 0),
      duration,
      instructions,
      questions,
      savedAt: new Date().toLocaleString(),
    };
    setSavedPapers((prev) => [paper, ...prev]);
    toast.success(`"${title}" saved successfully`);
  };

  const currentPaper = {
    title,
    subject,
    classCourse,
    totalMarks: Number(totalMarks),
    duration,
    instructions,
    questions,
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Question Paper Builder
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
          Create and save exam question papers
        </p>
      </div>

      <Tabs defaultValue="builder">
        <TabsList className="mb-6">
          <TabsTrigger value="builder" data-ocid="question_paper.builder.tab">
            Builder
          </TabsTrigger>
          <TabsTrigger value="saved" data-ocid="question_paper.saved.tab">
            Saved Papers ({savedPapers.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="builder">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Settings */}
            <div className="space-y-4">
              <Card className="border border-gray-100 dark:border-gray-700">
                <CardHeader className="pb-2 pt-4">
                  <CardTitle className="text-base">Paper Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 pb-4">
                  <div>
                    <Label className="text-xs">Paper Title</Label>
                    <Input
                      placeholder="e.g. Mid-Term Examination 2025"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="mt-1"
                      data-ocid="question_paper.title_input"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-xs">{t("subject")}</Label>
                      <Select value={subject} onValueChange={setSubject}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          {SUBJECTS.map((s) => (
                            <SelectItem key={s} value={s}>
                              {s}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-xs">Class / Course</Label>
                      <Select
                        value={classCourse}
                        onValueChange={setClassCourse}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          {CLASSES.map((c) => (
                            <SelectItem key={c} value={c}>
                              {c}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-xs">Total Marks</Label>
                      <Input
                        type="number"
                        placeholder="100"
                        value={totalMarks}
                        onChange={(e) => setTotalMarks(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Duration</Label>
                      <Input
                        placeholder="3 hours"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs">Instructions</Label>
                    <Textarea
                      placeholder="General instructions for students..."
                      value={instructions}
                      onChange={(e) => setInstructions(e.target.value)}
                      rows={2}
                      className="mt-1"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setPreview(!preview)}
                  data-ocid="question_paper.toggle"
                >
                  {preview ? (
                    <EyeOff size={14} className="mr-2" />
                  ) : (
                    <Eye size={14} className="mr-2" />
                  )}
                  {preview ? "Hide Preview" : "Preview Paper"}
                </Button>
                <Button
                  className="flex-1 bg-black text-white hover:bg-gray-800"
                  onClick={savePaper}
                  data-ocid="question_paper.save_button"
                >
                  <Save size={14} className="mr-2" /> Save Paper
                </Button>
              </div>
            </div>

            {/* Questions */}
            <div className="space-y-4">
              {preview ? (
                <PaperPreview paper={currentPaper} />
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-100">
                      Questions ({questions.length})
                    </h3>
                    {!showForm && (
                      <Button
                        size="sm"
                        className="bg-primary text-primary-foreground hover:bg-primary/90"
                        onClick={() => setShowForm(true)}
                        data-ocid="question_paper.open_modal_button"
                      >
                        <Plus size={14} className="mr-1" /> Add Question
                      </Button>
                    )}
                  </div>

                  {showForm && <QuestionForm onAdd={addQuestion} />}

                  {questions.length === 0 && !showForm ? (
                    <div
                      className="text-center py-12 text-gray-400 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl"
                      data-ocid="question_paper.empty_state"
                    >
                      <ClipboardList
                        size={36}
                        className="mx-auto mb-2 opacity-40"
                      />
                      <p className="text-sm">
                        No questions yet. Click "Add Question" to start.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {questions.map((q, i) => (
                        <Card
                          key={q.id}
                          className="border border-gray-100 dark:border-gray-700"
                          data-ocid={`question_paper.item.${i + 1}`}
                        >
                          <CardContent className="pt-4 pb-3">
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-xs font-bold text-gray-500 dark:text-gray-400">
                                    Q{i + 1}.
                                  </span>
                                  <Badge
                                    variant="secondary"
                                    className="text-[10px]"
                                  >
                                    {q.type}
                                  </Badge>
                                  <Badge
                                    variant="outline"
                                    className="text-[10px]"
                                  >
                                    {q.marks} marks
                                  </Badge>
                                </div>
                                <p className="text-sm text-gray-800 dark:text-gray-100">
                                  {q.text}
                                </p>
                                {q.type === "MCQ" && q.options.length > 0 && (
                                  <div className="mt-2 grid grid-cols-2 gap-1">
                                    {q.options
                                      .filter((o) => o.text)
                                      .map((o, j) => (
                                        <div
                                          key={o.text}
                                          className={`text-xs px-2 py-0.5 rounded ${
                                            o.isCorrect
                                              ? "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-medium"
                                              : "bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
                                          }`}
                                        >
                                          {String.fromCharCode(65 + j)}.{" "}
                                          {o.text}
                                        </div>
                                      ))}
                                  </div>
                                )}
                              </div>
                              <div className="flex gap-1 shrink-0">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="h-7 w-7 p-0"
                                  data-ocid={`question_paper.edit_button.${i + 1}`}
                                >
                                  <Pencil size={12} />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="h-7 w-7 p-0 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:text-gray-200"
                                  onClick={() => deleteQuestion(q.id)}
                                  data-ocid={`question_paper.delete_button.${i + 1}`}
                                >
                                  <Trash2 size={12} />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="saved">
          {savedPapers.length === 0 ? (
            <div
              className="text-center py-16 text-gray-400"
              data-ocid="question_paper.empty_state"
            >
              <ClipboardList size={40} className="mx-auto mb-3 opacity-40" />
              <p className="font-medium">No saved papers yet</p>
              <p className="text-sm mt-1">
                Save a paper from the Builder tab to see it here
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {savedPapers.map((p, i) => (
                <Card
                  key={p.id}
                  className="border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow"
                  data-ocid={`question_paper.item.${i + 1}`}
                >
                  <CardHeader className="pb-2 pt-4">
                    <CardTitle className="text-base font-bold text-gray-900 dark:text-white">
                      {p.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pb-4 space-y-2">
                    <div className="flex gap-2 flex-wrap">
                      <Badge variant="secondary" className="text-[10px]">
                        {p.subject}
                      </Badge>
                      <Badge variant="outline" className="text-[10px]">
                        {p.classCourse}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {p.questions.length} questions • {p.totalMarks} marks •{" "}
                      {p.duration}
                    </p>
                    <p className="text-[10px] text-gray-400">
                      Saved: {p.savedAt}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
