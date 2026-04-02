import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import { CheckSquare, Search, UserPlus, Users, X } from "lucide-react";
import { useState } from "react";

type ClubCategory = "All" | "Arts" | "Technology" | "Sports" | "Academic";
type ModalTab = "members" | "requirements";

interface Club {
  id: number;
  name: string;
  category: Exclude<ClubCategory, "All">;
  description: string;
  members: number;
  joined: boolean;
  color: string;
  studentMembers: string[];
  requirements: string[];
}

const CLUBS: Club[] = [
  {
    id: 1,
    name: "Drama Club",
    category: "Arts",
    description:
      "Explore the world of theater, acting, and stage productions. Annual play in December.",
    members: 8,
    joined: false,
    color: "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200",
    studentMembers: [
      "Aanya Sharma",
      "Rohan Verma",
      "Priya Nair",
      "Kabir Mehta",
      "Sneha Iyer",
      "Arjun Patel",
      "Divya Rao",
      "Nikhil Joshi",
    ],
    requirements: [
      "Completed audition form",
      "Rehearsal attendance (3x per week minimum)",
      "Black costume for stage performances",
      "Script memorization before dress rehearsal",
      "Permission slip for outstation events",
      "Attend 2 acting workshops per semester",
    ],
  },
  {
    id: 2,
    name: "Coding Society",
    category: "Technology",
    description:
      "Weekly hackathons, DSA practice, and open-source contributions. All skill levels welcome.",
    members: 9,
    joined: true,
    color: "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200",
    studentMembers: [
      "Rahul Gupta",
      "Ananya Singh",
      "Vikram Bhatt",
      "Pooja Desai",
      "Siddharth Rao",
      "Meera Pillai",
      "Amit Kumar",
      "Tanya Saxena",
      "Dev Malhotra",
    ],
    requirements: [
      "Personal laptop",
      "Active GitHub account",
      "Attendance at weekly hackathons",
      "Complete one open-source PR per semester",
      "Basic knowledge of Python or JavaScript",
      "Submit one mini-project per term",
    ],
  },
  {
    id: 3,
    name: "Debate Club",
    category: "Academic",
    description:
      "Sharpen your arguments and public speaking. Compete in national-level debate championships.",
    members: 7,
    joined: false,
    color: "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200",
    studentMembers: [
      "Ishaan Kapoor",
      "Riya Mishra",
      "Aryan Doshi",
      "Kavya Nambiar",
      "Saurabh Tiwari",
      "Aishwarya Jain",
      "Varun Oberoi",
    ],
    requirements: [
      "Prepared arguments for assigned topics each week",
      "Formal dress code for all competitions",
      "One reading assignment per week",
      "Attend 2 mock debates per month",
      "Register for at least one inter-college event per year",
    ],
  },
  {
    id: 4,
    name: "Photography Club",
    category: "Arts",
    description:
      "Learn composition, editing, and storytelling through the lens. Monthly photo walks.",
    members: 6,
    joined: false,
    color: "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200",
    studentMembers: [
      "Nisha Agarwal",
      "Rohit Shetty",
      "Disha Pandey",
      "Kiran Reddy",
      "Mansi Kulkarni",
      "Tarun Bose",
    ],
    requirements: [
      "Camera (DSLR, mirrorless, or smartphone accepted)",
      "Editing software installed (Lightroom / Snapseed)",
      "Monthly photo submission (min. 5 photos)",
      "Attend monthly photo walks",
      "Contribute to end-of-year exhibition",
    ],
  },
  {
    id: 5,
    name: "Music Band",
    category: "Arts",
    description:
      "Jam sessions, live performances, and recording projects. Instruments provided for members.",
    members: 5,
    joined: true,
    color: "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200",
    studentMembers: [
      "Aarav Thakur",
      "Simran Kaur",
      "Harsh Vardhan",
      "Anushka Roy",
      "Parth Trivedi",
    ],
    requirements: [
      "Own instrument or borrow from club inventory",
      "Practice sessions 2x per week",
      "Attend all scheduled jam sessions",
      "Perform at annual college cultural fest",
      "Basic music theory knowledge",
    ],
  },
  {
    id: 6,
    name: "Sports Committee",
    category: "Sports",
    description:
      "Organize and participate in inter-college tournaments. Fitness programs and team sports.",
    members: 10,
    joined: false,
    color: "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200",
    studentMembers: [
      "Deepak Yadav",
      "Sunita Patil",
      "Gaurav Nair",
      "Ranjini Menon",
      "Chirag Shah",
      "Aarti Choudhary",
      "Mohit Grover",
      "Lakshmi Subramanian",
      "Yash Mehrotra",
      "Pallavi Sinha",
    ],
    requirements: [
      "Valid medical fitness certificate",
      "Complete sports kit (shoes, jersey, shorts)",
      "Attend all training sessions",
      "Represent college in minimum 1 tournament per year",
      "Signed indemnity form from parent/guardian",
    ],
  },
  {
    id: 7,
    name: "Science Society",
    category: "Academic",
    description:
      "Research projects, lab experiments, and science fairs. Collaboration with industry mentors.",
    members: 8,
    joined: false,
    color: "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200",
    studentMembers: [
      "Sanjana Krishnan",
      "Aditya Banerjee",
      "Preeti Joshi",
      "Kunal Tripathi",
      "Roshni Hegde",
      "Akash Dubey",
      "Mitali Sen",
      "Pranav Bhosale",
    ],
    requirements: [
      "Lab coat (mandatory for lab sessions)",
      "Safety goggles",
      "Approved research project proposal",
      "Attend monthly science fair prep meetings",
      "Submit lab reports within 3 days of experiments",
      "Adhere to all lab safety protocols",
    ],
  },
  {
    id: 8,
    name: "Literary Club",
    category: "Academic",
    description:
      "Book discussions, creative writing workshops, and the annual college literary magazine.",
    members: 7,
    joined: false,
    color: "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200",
    studentMembers: [
      "Zara Khan",
      "Vivek Anand",
      "Chandni Batra",
      "Omkar Wagh",
      "Shruti Naidu",
      "Farhan Qureshi",
      "Leela Varma",
    ],
    requirements: [
      "Read assigned book or text each month",
      "Submit one original article or poem per semester",
      "Attend monthly writing workshop",
      "Contribute to the college literary magazine",
      "Participate in at least one spoken word or reading event",
    ],
  },
];

const CATEGORIES: ClubCategory[] = [
  "All",
  "Arts",
  "Technology",
  "Sports",
  "Academic",
];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function ClubsPage() {
  const { t } = useLanguage();
  const [clubs, setClubs] = useState<Club[]>(CLUBS);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<ClubCategory>("All");
  const [selectedClub, setSelectedClub] = useState<Club | null>(null);
  const [memberSearch, setMemberSearch] = useState("");
  const [newMemberName, setNewMemberName] = useState("");
  const [showAddInput, setShowAddInput] = useState(false);
  const [activeTab, setActiveTab] = useState<ModalTab>("members");

  const filtered = clubs.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "All" || c.category === category;
    return matchSearch && matchCat;
  });

  const toggleJoin = (id: number) => {
    setClubs((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              joined: !c.joined,
              members: c.joined ? c.members - 1 : c.members + 1,
            }
          : c,
      ),
    );
  };

  const openClub = (club: Club) => {
    setSelectedClub(club);
    setMemberSearch("");
    setNewMemberName("");
    setShowAddInput(false);
    setActiveTab("members");
  };

  const closeModal = () => {
    setSelectedClub(null);
  };

  const removeMember = (clubId: number, name: string) => {
    setClubs((prev) =>
      prev.map((c) =>
        c.id === clubId
          ? {
              ...c,
              studentMembers: c.studentMembers.filter((m) => m !== name),
              members: c.members - 1,
            }
          : c,
      ),
    );
    setSelectedClub((prev) =>
      prev
        ? {
            ...prev,
            studentMembers: prev.studentMembers.filter((m) => m !== name),
            members: prev.members - 1,
          }
        : null,
    );
  };

  const addMember = (clubId: number) => {
    const trimmed = newMemberName.trim();
    if (!trimmed) return;
    setClubs((prev) =>
      prev.map((c) =>
        c.id === clubId
          ? {
              ...c,
              studentMembers: [...c.studentMembers, trimmed],
              members: c.members + 1,
            }
          : c,
      ),
    );
    setSelectedClub((prev) =>
      prev
        ? {
            ...prev,
            studentMembers: [...prev.studentMembers, trimmed],
            members: prev.members + 1,
          }
        : null,
    );
    setNewMemberName("");
    setShowAddInput(false);
  };

  const filteredMembers = selectedClub
    ? selectedClub.studentMembers.filter((m) =>
        m.toLowerCase().includes(memberSearch.toLowerCase()),
      )
    : [];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t("clubs")}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
          Browse and join college clubs
        </p>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <Input
            placeholder="Search clubs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
            data-ocid="clubs.search_input"
          />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              data-ocid={`clubs.${cat.toLowerCase()}.tab`}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                category === cat
                  ? "bg-black text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div
          className="text-center py-16 text-gray-400"
          data-ocid="clubs.empty_state"
        >
          <Users size={40} className="mx-auto mb-3 opacity-40" />
          <p className="font-medium">No clubs found</p>
          <p className="text-sm mt-1">Try a different search or category</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((club, i) => (
            <Card
              key={club.id}
              className="border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow cursor-pointer"
              data-ocid={`clubs.item.${i + 1}`}
              onClick={() => openClub(club)}
            >
              <CardHeader className="pb-2 pt-4">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-base font-bold text-gray-900 dark:text-white leading-tight">
                    {club.name}
                  </CardTitle>
                  <Badge className={`text-[10px] shrink-0 ${club.color}`}>
                    {club.category}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pb-4 space-y-3">
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                  {club.description}
                </p>
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 underline underline-offset-2 hover:text-black dark:hover:text-white transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      openClub(club);
                    }}
                    data-ocid={`clubs.members.button.${i + 1}`}
                  >
                    <Users size={12} /> {club.members} members
                  </button>
                  <Button
                    size="sm"
                    variant={club.joined ? "outline" : "default"}
                    className={
                      club.joined
                        ? "text-gray-600 dark:text-gray-300"
                        : "bg-black text-white hover:bg-gray-800"
                    }
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleJoin(club.id);
                    }}
                    data-ocid={`clubs.toggle.${i + 1}`}
                  >
                    {club.joined ? "Leave" : "Join"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Club Detail Modal */}
      <Dialog
        open={!!selectedClub}
        onOpenChange={(open) => !open && closeModal()}
      >
        <DialogContent className="max-w-md" data-ocid="clubs.dialog">
          {selectedClub && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2">
                  <DialogTitle className="text-lg font-bold">
                    {selectedClub.name}
                  </DialogTitle>
                  <Badge className={`text-[10px] ${selectedClub.color}`}>
                    {selectedClub.category}
                  </Badge>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {selectedClub.members} member
                  {selectedClub.members !== 1 ? "s" : ""}
                </p>
              </DialogHeader>

              {/* Tab Switcher */}
              <div className="flex gap-1 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
                <button
                  type="button"
                  onClick={() => setActiveTab("members")}
                  data-ocid="clubs.members.tab"
                  className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-medium rounded-md transition-colors ${
                    activeTab === "members"
                      ? "bg-white dark:bg-gray-900 text-black shadow-sm"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:text-gray-200"
                  }`}
                >
                  <Users size={13} />
                  Members
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("requirements")}
                  data-ocid="clubs.requirements.tab"
                  className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs font-medium rounded-md transition-colors ${
                    activeTab === "requirements"
                      ? "bg-white dark:bg-gray-900 text-black shadow-sm"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:text-gray-200"
                  }`}
                >
                  <CheckSquare size={13} />
                  Requirements
                </button>
              </div>

              {/* Members Tab */}
              {activeTab === "members" && (
                <div className="space-y-3">
                  {/* Member search */}
                  <div className="relative">
                    <Search
                      size={14}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <Input
                      placeholder="Search members..."
                      value={memberSearch}
                      onChange={(e) => setMemberSearch(e.target.value)}
                      className="pl-9 text-sm"
                      data-ocid="clubs.member_search_input"
                    />
                  </div>

                  {/* Add Member */}
                  {showAddInput ? (
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter student name"
                        value={newMemberName}
                        onChange={(e) => setNewMemberName(e.target.value)}
                        onKeyDown={(e) =>
                          e.key === "Enter" && addMember(selectedClub.id)
                        }
                        className="text-sm"
                        autoFocus
                        data-ocid="clubs.add_member.input"
                      />
                      <Button
                        size="sm"
                        className="bg-black text-white hover:bg-gray-800 shrink-0"
                        onClick={() => addMember(selectedClub.id)}
                        data-ocid="clubs.add_member.submit_button"
                      >
                        Add
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="shrink-0"
                        onClick={() => {
                          setShowAddInput(false);
                          setNewMemberName("");
                        }}
                        data-ocid="clubs.add_member.cancel_button"
                      >
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full border-dashed border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-black hover:text-black dark:hover:text-white"
                      onClick={() => setShowAddInput(true)}
                      data-ocid="clubs.add_member_button"
                    >
                      <UserPlus size={14} className="mr-1" /> Add Member
                    </Button>
                  )}

                  {/* Member list */}
                  <div className="max-h-60 overflow-y-auto space-y-1 pr-1">
                    {filteredMembers.length === 0 ? (
                      <div
                        className="text-center py-8 text-gray-400 text-sm"
                        data-ocid="clubs.members.empty_state"
                      >
                        {memberSearch
                          ? "No members match your search"
                          : "No members yet"}
                      </div>
                    ) : (
                      filteredMembers.map((name, idx) => (
                        <div
                          key={name}
                          className="flex items-center justify-between gap-3 px-2 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 dark:bg-gray-800 group"
                          data-ocid={`clubs.member.item.${idx + 1}`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-xs font-semibold shrink-0">
                              {getInitials(name)}
                            </div>
                            <span className="text-sm text-gray-800 dark:text-gray-100">
                              {name}
                            </span>
                          </div>
                          <button
                            type="button"
                            className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-gray-500 dark:text-gray-400"
                            onClick={() => removeMember(selectedClub.id, name)}
                            aria-label={`Remove ${name}`}
                            data-ocid={`clubs.member.delete_button.${idx + 1}`}
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* Requirements Tab */}
              {activeTab === "requirements" && (
                <div className="space-y-2">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                    Every member of this club must fulfil the following
                    requirements:
                  </p>
                  <div className="max-h-72 overflow-y-auto space-y-2 pr-1">
                    {selectedClub.requirements.map((req, idx) => (
                      <div
                        key={req}
                        className="flex items-start gap-3 px-3 py-2.5 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700"
                        data-ocid={`clubs.requirement.item.${idx + 1}`}
                      >
                        <CheckSquare
                          size={15}
                          className="text-black shrink-0 mt-0.5"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-200 leading-snug">
                          {req}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
