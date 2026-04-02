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
import { ScrollArea } from "@/components/ui/scroll-area";
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
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  AlertCircle,
  BookOpen,
  Download,
  Eye,
  FileText,
  Hash,
  Pencil,
  Plus,
  RotateCcw,
  Search,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type Book = {
  id: number;
  title: string;
  author: string;
  category: string;
  status: string;
  borrowedBy: string;
  dueDate: string;
  isbn: string;
};

type DigitalResource = {
  id: number;
  title: string;
  subject: string;
  type: "PDF" | "eBook";
  size: string;
  uploadedDate: string;
  description: string;
  content: string;
};

type Reservation = {
  id: number;
  studentName: string;
  bookTitle: string;
  requestedDate: string;
  pickupDate: string;
  status: "Pending" | "Confirmed" | "Cancelled";
};

const SEED: Book[] = [
  {
    id: 1,
    title: "Introduction to Calculus",
    author: "James Stewart",
    category: "Math",
    status: "Available",
    borrowedBy: "",
    dueDate: "",
    isbn: "978-1-305-27177",
  },
  {
    id: 2,
    title: "Organic Chemistry Essentials",
    author: "Paula Bruice",
    category: "Science",
    status: "Borrowed",
    borrowedBy: "Aisha Patel",
    dueDate: "Mar 28, 2026",
    isbn: "978-0-321-96747",
  },
  {
    id: 3,
    title: "World History: Modern Era",
    author: "Peter Stearns",
    category: "History",
    status: "Available",
    borrowedBy: "",
    dueDate: "",
    isbn: "978-0-13-238297",
  },
  {
    id: 4,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    category: "Literature",
    status: "Borrowed",
    borrowedBy: "Marcus Johnson",
    dueDate: "Mar 25, 2026",
    isbn: "978-0-06-112008",
  },
  {
    id: 5,
    title: "Physics for Scientists",
    author: "Paul Tipler",
    category: "Science",
    status: "Overdue",
    borrowedBy: "Lily Zhang",
    dueDate: "Mar 10, 2026",
    isbn: "978-1-4641-2655",
  },
  {
    id: 6,
    title: "Linear Algebra",
    author: "Gilbert Strang",
    category: "Math",
    status: "Available",
    borrowedBy: "",
    dueDate: "",
    isbn: "978-0-9802327-7",
  },
  {
    id: 7,
    title: "1984",
    author: "George Orwell",
    category: "Literature",
    status: "Available",
    borrowedBy: "",
    dueDate: "",
    isbn: "978-0-452-28423",
  },
  {
    id: 8,
    title: "Biology: Life on Earth",
    author: "Teresa Audesirk",
    category: "Science",
    status: "Overdue",
    borrowedBy: "Ethan Rivera",
    dueDate: "Mar 5, 2026",
    isbn: "978-0-321-73650",
  },
  {
    id: 9,
    title: "Ancient Civilizations",
    author: "Chris Scarre",
    category: "History",
    status: "Borrowed",
    borrowedBy: "Priya Patel",
    dueDate: "Apr 1, 2026",
    isbn: "978-0-500-28781",
  },
  {
    id: 10,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    category: "Literature",
    status: "Available",
    borrowedBy: "",
    dueDate: "",
    isbn: "978-0-7432-7356",
  },
];

const DIGITAL_SEED: DigitalResource[] = [
  {
    id: 1,
    title: "NCERT Physics Class 12",
    subject: "Physics",
    type: "PDF",
    size: "8.2 MB",
    uploadedDate: "2026-03-01",
    description: "Complete NCERT Physics textbook for Class 12",
    content: `NCERT Physics Class 12 — Chapter Summaries

Chapter 1: Electric Charges and Fields
Electric charge is a fundamental property of matter. There are two types of charges: positive and negative. Like charges repel each other while unlike charges attract. The SI unit of charge is the Coulomb (C). Coulomb's Law states that the force between two point charges is directly proportional to the product of their charges and inversely proportional to the square of the distance between them: F = kq₁q₂/r². The electric field E at a point is defined as the force per unit positive test charge placed at that point.

Chapter 6: Electromagnetic Induction
Electromagnetic induction is the phenomenon of generating an electromotive force (EMF) in a conductor when it is placed in a changing magnetic field. Faraday's Law states that the induced EMF in a circuit is equal to the negative rate of change of magnetic flux through the circuit. Lenz's Law states that the direction of induced current is such that it opposes the change causing it. This principle is the basis for electric generators, transformers, and induction motors that power our modern world.

Chapter 9: Ray Optics and Optical Instruments
Light travels in straight lines called rays. When light strikes a polished surface, it obeys the laws of reflection: the angle of incidence equals the angle of reflection. Refraction occurs when light passes from one medium to another, changing speed and direction. Snell's Law describes this: n₁ sin θ₁ = n₂ sin θ₂. Lenses use refraction to converge or diverge light. Convex lenses form real inverted images for objects beyond the focal point. The lens formula 1/v − 1/u = 1/f connects object distance, image distance, and focal length.

Chapter 12: Atoms
Rutherford's nuclear model of the atom established that almost all of an atom's mass is concentrated in a tiny nucleus, with electrons orbiting around it. Bohr's model improved on this by proposing that electrons occupy fixed energy levels and emit or absorb photons when transitioning between levels. The energy of a photon is given by E = hν, where h is Planck's constant and ν is the frequency. Hydrogen's spectral series — Lyman, Balmer, Paschen — arise from electron transitions between these energy levels.

Chapter 13: Nuclei
The nucleus consists of protons and neutrons held together by the strong nuclear force. The mass number A is the total number of nucleons, while the atomic number Z gives the number of protons. Nuclear binding energy is the energy required to completely separate all nucleons. Radioactive decay occurs when an unstable nucleus emits alpha particles (helium nuclei), beta particles (electrons/positrons), or gamma rays (high-energy photons). The half-life is the time taken for half the nuclei in a sample to decay, a constant for each isotope.

Chapter 14: Semiconductor Electronics
Semiconductors are materials with electrical conductivity between conductors and insulators. Silicon and germanium are common semiconductors. In n-type semiconductors, extra electrons are the majority carriers; in p-type, holes are the majority carriers. A p-n junction diode allows current in one direction only — this rectification property is fundamental to all electronic circuits. Transistors, made of two p-n junctions, act as amplifiers or switches and form the building blocks of all modern digital circuits and processors.`,
  },
  {
    id: 2,
    title: "Organic Chemistry Notes",
    subject: "Chemistry",
    type: "PDF",
    size: "3.5 MB",
    uploadedDate: "2026-03-05",
    description: "Comprehensive notes on organic reactions",
    content: `Organic Chemistry — Comprehensive Study Notes

Introduction to Organic Chemistry
Organic chemistry is the study of carbon-containing compounds. Carbon's ability to form four covalent bonds and chain with other carbon atoms gives rise to an extraordinary diversity of molecules. Organic compounds range from simple methane (CH₄) to complex proteins and DNA. The backbone of organic chemistry is the understanding of functional groups — specific groups of atoms that confer characteristic properties and reactivity to molecules.

Alkanes, Alkenes, and Alkynes
Alkanes are saturated hydrocarbons with only single bonds (CₙH₂ₙ₊₂). They are relatively unreactive and undergo mainly combustion and substitution reactions. Alkenes contain at least one carbon-carbon double bond (CₙH₂ₙ) and are much more reactive due to the pi bond. They undergo addition reactions with hydrogen, halogens, water, and acids. Alkynes have triple bonds and are even more reactive. The Markovnikov rule governs the orientation of addition to unsymmetrical alkenes.

Functional Groups and Their Reactions
Alcohols (–OH) undergo oxidation to form aldehydes, ketones, or carboxylic acids. Primary alcohols oxidize to aldehydes and then to carboxylic acids; secondary alcohols give ketones. Aldehydes are oxidized to carboxylic acids but ketones resist further oxidation. Carboxylic acids (–COOH) are weak acids that form esters with alcohols in Fischer esterification reactions. Amines (–NH₂) are basic compounds derived from ammonia by replacement of hydrogen atoms with organic groups.

Aromatic Compounds
Benzene (C₆H₆) is the archetypal aromatic compound with a delocalized ring of six pi electrons. This delocalization gives benzene unusual stability and causes it to undergo electrophilic aromatic substitution rather than addition reactions. Nitration, halogenation, sulfonation, and Friedel-Crafts reactions are the key substitution reactions. Substituents on the ring can be either activating (electron-donating, direct ortho/para) or deactivating (electron-withdrawing, direct meta).

Named Reactions and Mechanisms
The SN1 and SN2 reactions describe two mechanisms of nucleophilic substitution. SN2 is a one-step backside attack favored by primary substrates in polar aprotic solvents. SN1 proceeds through a planar carbocation intermediate and is favored by tertiary substrates in polar protic solvents. The aldol condensation combines two carbonyl compounds in the presence of base to form a β-hydroxy carbonyl compound. Grignard reagents (RMgX) are powerful nucleophiles that add to carbonyl groups to extend carbon chains.`,
  },
  {
    id: 3,
    title: "The Selfish Gene",
    subject: "Biology",
    type: "eBook",
    size: "1.8 MB",
    uploadedDate: "2026-02-20",
    description: "Richard Dawkins' classic evolution book",
    content: `The Selfish Gene by Richard Dawkins — Summary and Key Concepts

Core Premise: The Gene-Centric View of Evolution
Richard Dawkins revolutionized our understanding of evolution by shifting the focus from organisms to genes. The central argument is that natural selection acts primarily at the level of genes, not individuals or species. Genes are "selfish" not in a conscious sense, but because those genes that promote their own replication persist and spread through generations, while those that do not are eliminated. The organism is merely a "survival machine" — a vehicle constructed by genes to ensure their propagation.

Replicators and Vehicles
Dawkins distinguishes between replicators (genes, which are copied with high fidelity) and vehicles (organisms, which carry and protect the replicators). Genes are the true units of selection because they persist across generations, while individual organisms are temporary. A successful gene is one that builds bodies skilled at surviving and reproducing. The gene's "goal" is simply to make more copies of itself — everything else, including cooperation, altruism, and complex behaviors, can be explained in terms of this fundamental drive.

Altruism and Kin Selection
The apparent paradox of altruism — why would an organism risk itself for another? — is resolved through kin selection. Hamilton's Rule states that altruistic behavior evolves when rb > c, where r is the genetic relatedness of the recipient, b is the benefit to the recipient, and c is the cost to the altruist. Organisms are more likely to sacrifice for close relatives because relatives share copies of the same genes. This explains why bees die defending the hive, why parents sacrifice for children, and why siblings cooperate.

Memes: Cultural Replicators
In an influential chapter, Dawkins introduces the concept of the "meme" — a unit of cultural transmission analogous to the gene. Memes are ideas, tunes, catchphrases, fashions, or skills that spread from brain to brain. Just as genes propagate by jumping from body to body, memes propagate by jumping from mind to mind. Successful memes spread because they are good at getting themselves copied, not because they benefit their host. This framework extends evolutionary thinking to culture and ideas.

Game Theory and Evolutionary Stable Strategies
Dawkins uses game theory to explain the evolution of behavior. An Evolutionarily Stable Strategy (ESS) is a behavioral strategy that, once adopted by most members of a population, cannot be bettered by any alternative strategy. The Hawk-Dove game illustrates how aggressive and passive strategies can coexist in a population at a stable equilibrium. Neither pure aggression nor pure pacifism is stable; a mixed strategy emerges that represents the optimal balance between the two.`,
  },
  {
    id: 4,
    title: "Introduction to Algorithms",
    subject: "Computer Science",
    type: "PDF",
    size: "12.4 MB",
    uploadedDate: "2026-02-25",
    description: "CLRS algorithms textbook",
    content: `Introduction to Algorithms (CLRS) — Key Concepts and Chapter Summaries

Algorithm Analysis and Big-O Notation
An algorithm is a well-defined computational procedure that takes some input and produces an output. The efficiency of an algorithm is measured by its time complexity (how long it takes) and space complexity (how much memory it uses). Big-O notation describes the upper bound of an algorithm's running time as input size n grows: O(1) is constant time, O(log n) is logarithmic, O(n) is linear, O(n log n) is linearithmic, O(n²) is quadratic, and O(2ⁿ) is exponential. Theta (Θ) gives a tight bound while Omega (Ω) gives a lower bound.

Sorting Algorithms
Sorting is one of the most fundamental algorithmic problems. Insertion sort runs in O(n²) but performs well on small or nearly sorted arrays. Merge sort uses the divide-and-conquer paradigm to achieve O(n log n) in all cases by recursively splitting the array and merging sorted halves. Quick sort also averages O(n log n) but has O(n²) worst case; in practice it is faster than merge sort due to better cache performance. Heap sort achieves O(n log n) using a binary heap data structure. Counting sort, radix sort, and bucket sort are linear-time algorithms that work for restricted input ranges.

Data Structures
A data structure is a way of organizing data to support efficient operations. Arrays provide O(1) random access but O(n) insertion. Linked lists allow O(1) insertion but O(n) search. Stacks (LIFO) and queues (FIFO) are abstract data types with O(1) push/pop. Binary search trees maintain sorted data with O(log n) average search, insert, and delete — but O(n) in the worst case. Red-Black trees and AVL trees are self-balancing BSTs that guarantee O(log n) operations. Hash tables achieve O(1) average case for search and insertion using hash functions.

Graph Algorithms
A graph G = (V, E) consists of vertices V and edges E. Breadth-First Search (BFS) explores a graph level by level and finds shortest paths in unweighted graphs. Depth-First Search (DFS) explores as far as possible along each branch and is used for topological sorting and detecting cycles. Dijkstra's algorithm finds shortest paths in weighted graphs with non-negative edges in O((V + E) log V) using a priority queue. Bellman-Ford handles negative edge weights. Floyd-Warshall computes all-pairs shortest paths in O(V³).

Dynamic Programming
Dynamic programming (DP) solves optimization problems by breaking them into overlapping subproblems and storing solutions to avoid redundant computation. The key insight is optimal substructure: the optimal solution to a problem contains optimal solutions to its subproblems. Classic DP problems include the 0/1 Knapsack problem, Longest Common Subsequence, Matrix Chain Multiplication, and Fibonacci numbers. DP can be implemented top-down (memoization) or bottom-up (tabulation). The time complexity improvement over brute force can be exponential.`,
  },
  {
    id: 5,
    title: "World History Study Guide",
    subject: "History",
    type: "PDF",
    size: "2.1 MB",
    uploadedDate: "2026-03-10",
    description: "Comprehensive study guide for modern history",
    content: `World History Study Guide — Modern Era

The Industrial Revolution (1760–1840)
The Industrial Revolution began in Britain and transformed economies from agrarian to manufacturing-based. Key inventions included James Watt's steam engine, the spinning jenny, and the power loom. The factory system replaced cottage industries, driving mass urbanization. Living conditions in early industrial cities were often harsh — overcrowding, child labor, and pollution were widespread. However, productivity and living standards rose dramatically over time. The revolution spread to continental Europe, North America, and eventually globally, reshaping society, politics, and international relations.

Colonialism and Imperialism (1800–1914)
European powers expanded their empires across Africa, Asia, and the Pacific during the 19th century. The Berlin Conference of 1884–85 formalized the "Scramble for Africa," dividing the continent among European powers with little regard for existing cultures or borders. Britain's empire covered a quarter of the globe at its peak. Colonial rule brought railways, telegraph lines, and Western education, but also exploitation, forced labor, and cultural suppression. Resistance movements arose throughout the colonial world, eventually fueling 20th-century independence struggles.

World War I (1914–1918)
The assassination of Archduke Franz Ferdinand in Sarajevo in June 1914 triggered a chain of alliance obligations that dragged Europe into war. The war introduced industrialized warfare: trenches, poison gas, tanks, and aircraft. The Western Front became a brutal stalemate for four years. The entry of the United States in 1917 and the collapse of German morale led to the Armistice of November 11, 1918. The Treaty of Versailles imposed harsh reparations on Germany, redrew the map of Europe, and created the conditions that would lead to World War II.

World War II (1939–1945)
Hitler's invasion of Poland on September 1, 1939 triggered World War II. Nazi Germany rapidly conquered most of continental Europe. The Holocaust — the systematic genocide of six million Jews and millions of others — represents history's most horrific atrocity. The war in the Pacific began with Japan's attack on Pearl Harbor in December 1941. Allied forces fought back through North Africa, Italy, and Normandy. Germany surrendered in May 1945, followed by Japan in September after the atomic bombings of Hiroshima and Nagasaki. The war reshaped the world order, leading to the Cold War, decolonization, and the founding of the United Nations.

The Cold War (1947–1991)
The post-World War II world was divided between the capitalist West led by the United States and the communist East led by the Soviet Union. This ideological conflict — the Cold War — was characterized by arms races, proxy wars, espionage, and space race competition. The Berlin Wall (1961–1989) became the most powerful symbol of the Iron Curtain dividing Europe. The Cuban Missile Crisis of 1962 brought the world to the brink of nuclear war. The Cold War ended with the fall of the Berlin Wall in 1989 and the dissolution of the Soviet Union in 1991.`,
  },
  {
    id: 6,
    title: "English Grammar Essentials",
    subject: "English",
    type: "eBook",
    size: "1.2 MB",
    uploadedDate: "2026-03-12",
    description: "Complete grammar guide for competitive exams",
    content: `English Grammar Essentials — Complete Guide

Parts of Speech
English has eight traditional parts of speech. Nouns name people, places, things, or ideas (teacher, city, happiness). Pronouns replace nouns (he, she, they, it). Verbs express actions or states of being (run, think, is). Adjectives modify nouns (beautiful, tall, three). Adverbs modify verbs, adjectives, or other adverbs (quickly, very, well). Prepositions show relationships between nouns and other words (in, on, at, by, with). Conjunctions join words or clauses (and, but, because, although). Interjections express emotion (oh!, wow!, hey!).

Tenses and Verb Forms
English has 12 main tenses organized around three time references (past, present, future) and four aspects (simple, continuous, perfect, perfect continuous). The simple present describes habits and facts; the present continuous describes ongoing actions; the present perfect links past actions to the present moment. Modals (can, could, will, would, shall, should, may, might, must) express ability, possibility, permission, and obligation. The passive voice restructures sentences to emphasize the object rather than the subject: "The exam was passed by all students."

Sentence Structure and Clauses
A simple sentence has one independent clause. A compound sentence joins two independent clauses with a coordinating conjunction (FANBOYS: for, and, nor, but, or, yet, so). A complex sentence has one independent clause and at least one dependent clause joined by a subordinating conjunction (because, although, when, if, since). A compound-complex sentence combines both. Relative clauses (who, which, that) add information about nouns. Participial phrases (working, having finished) and infinitive phrases (to succeed) add meaning economically.

Common Errors to Avoid
Subject-verb agreement: "The team are playing" (British) vs "The team is playing" (American). Pronoun-antecedent agreement: use "they" for singular indefinite pronouns in modern usage. Dangling modifiers: "Walking down the street, the trees were beautiful" incorrectly implies the trees were walking. Run-on sentences join independent clauses without proper punctuation. Comma splices incorrectly join two independent clauses with only a comma. The apostrophe shows possession (John's book) or contraction (it's = it is) — never in possessive pronouns (its, yours, theirs).

Vocabulary for Competitive Exams
Strong vocabulary is essential for competitive exams. Focus on learning roots, prefixes, and suffixes: -ology (study of), -phobia (fear of), pre- (before), mis- (wrongly), un- (not). Commonly confused words include affect/effect, complement/compliment, principal/principle, stationary/stationery. Idioms and phrases tested in exams include: "break the ice" (start a conversation), "beat around the bush" (avoid the main topic), "bite the bullet" (endure a painful situation), "cost an arm and a leg" (very expensive), "hit the nail on the head" (describe exactly).`,
  },
  {
    id: 7,
    title: "Calculus Problem Sets",
    subject: "Math",
    type: "PDF",
    size: "4.7 MB",
    uploadedDate: "2026-03-15",
    description: "500 solved calculus problems",
    content: `Calculus Problem Sets — Key Concepts and Solutions

Limits and Continuity
The limit of a function f(x) as x approaches a is the value f(x) approaches. Formal definition: lim(x→a) f(x) = L means for every ε > 0 there exists δ > 0 such that |f(x) − L| < ε whenever 0 < |x − a| < δ. L'Hôpital's Rule resolves indeterminate forms (0/0 or ∞/∞) by differentiating the numerator and denominator separately. A function is continuous at a point if the limit exists, the function is defined there, and the limit equals the function value. The Intermediate Value Theorem guarantees that a continuous function takes every value between any two of its values.

Differentiation
The derivative f'(x) = lim(h→0) [f(x+h) − f(x)]/h measures the instantaneous rate of change. Key rules: Power rule d/dx(xⁿ) = nxⁿ⁻¹, Product rule d/dx(uv) = u'v + uv', Quotient rule d/dx(u/v) = (u'v − uv')/v², Chain rule d/dx[f(g(x))] = f'(g(x))·g'(x). Important derivatives: d/dx(sin x) = cos x, d/dx(eˣ) = eˣ, d/dx(ln x) = 1/x. Applications include finding maxima and minima (set f'(x) = 0), related rates problems, and linear approximations.

Integration
The definite integral ∫ₐᵇ f(x)dx represents the net area under the curve from a to b. The Fundamental Theorem of Calculus connects differentiation and integration: if F'(x) = f(x), then ∫ₐᵇ f(x)dx = F(b) − F(a). Integration techniques include substitution (u = g(x)), integration by parts (∫u dv = uv − ∫v du), partial fractions for rational functions, and trigonometric substitutions. Improper integrals extend to infinite limits or discontinuous integrands and may converge or diverge.

Sequences and Series
A sequence {aₙ} converges to L if its terms approach L as n→∞. An infinite series Σaₙ converges if the sequence of partial sums converges. The geometric series Σarⁿ converges to a/(1−r) when |r| < 1. Tests for convergence include: Ratio Test, Root Test, Comparison Test, Integral Test, and Alternating Series Test. Taylor series represent functions as infinite polynomials: f(x) = f(a) + f'(a)(x−a) + f''(a)(x−a)²/2! + ⋯. Maclaurin series are Taylor series centered at a = 0: eˣ = 1 + x + x²/2! + x³/3! + ⋯`,
  },
  {
    id: 8,
    title: "Environmental Science Guide",
    subject: "Science",
    type: "PDF",
    size: "5.3 MB",
    uploadedDate: "2026-03-18",
    description: "Ecology and environment for Class 11-12",
    content: `Environmental Science Guide — Ecology and Environment

Ecosystems and Energy Flow
An ecosystem is a community of living organisms interacting with their physical environment. Energy enters ecosystems primarily through photosynthesis, where producers (plants, algae) convert solar energy into chemical energy. This energy flows through trophic levels: producers → primary consumers (herbivores) → secondary consumers (carnivores) → tertiary consumers. Only about 10% of energy is transferred between trophic levels (10% rule), which is why food chains are rarely longer than five links. Energy flow is unidirectional, unlike nutrient cycles which are circular.

Biogeochemical Cycles
Nutrients cycle through ecosystems in biogeochemical cycles. The carbon cycle involves photosynthesis (CO₂ → organic carbon), respiration, decomposition, and combustion. Human activities — primarily burning fossil fuels — have increased atmospheric CO₂ from 280 ppm (pre-industrial) to over 420 ppm today, driving climate change. The nitrogen cycle converts atmospheric N₂ to usable forms through nitrogen fixation (by bacteria), nitrification, denitrification, and assimilation. The water cycle (hydrological cycle) includes evaporation, condensation, precipitation, infiltration, and runoff.

Biodiversity and Conservation
Biodiversity encompasses genetic diversity, species diversity, and ecosystem diversity. The Earth currently hosts an estimated 8–10 million species, though only about 2 million have been formally described. Biodiversity hotspots — like the Western Ghats, Amazon Basin, and coral reefs — contain extraordinary concentrations of endemic species. Major threats to biodiversity include habitat loss and fragmentation, invasive species, overexploitation, pollution, and climate change. Conservation strategies include protected areas, wildlife corridors, ex-situ conservation (zoos, seed banks), and community-based conservation.

Climate Change and Global Warming
The greenhouse effect is a natural phenomenon where atmospheric gases (CO₂, CH₄, N₂O, H₂O vapor) trap heat radiated from Earth's surface. Human activities have enhanced this effect, raising global average temperatures by approximately 1.2°C above pre-industrial levels. Consequences include melting glaciers and ice sheets, rising sea levels, more frequent extreme weather events, shifts in species ranges, and ocean acidification. The Paris Agreement (2015) set a target of limiting warming to 1.5–2°C above pre-industrial levels. Mitigation strategies include renewable energy, energy efficiency, and reforestation.

Pollution and Environmental Issues
Air pollution from vehicles, industries, and power plants causes smog, acid rain, and respiratory diseases. Particulate matter (PM2.5) is especially harmful, penetrating deep into lungs. Water pollution from industrial effluents, agricultural runoff (fertilizers, pesticides), and untreated sewage contaminates freshwater and marine ecosystems. Soil pollution from heavy metals, pesticides, and industrial waste reduces agricultural productivity. Plastic pollution — particularly microplastics — has permeated every ecosystem on Earth. E-waste from discarded electronics is the fastest-growing waste stream globally.`,
  },
];

const RESERVATION_SEED: Reservation[] = [
  {
    id: 1,
    studentName: "Rohan Mehta",
    bookTitle: "Introduction to Calculus",
    requestedDate: "2026-03-24",
    pickupDate: "2026-03-27",
    status: "Pending",
  },
  {
    id: 2,
    studentName: "Sneha Reddy",
    bookTitle: "1984",
    requestedDate: "2026-03-23",
    pickupDate: "2026-03-26",
    status: "Confirmed",
  },
  {
    id: 3,
    studentName: "Arjun Sharma",
    bookTitle: "Linear Algebra",
    requestedDate: "2026-03-22",
    pickupDate: "2026-03-28",
    status: "Pending",
  },
  {
    id: 4,
    studentName: "Priya Nair",
    bookTitle: "The Great Gatsby",
    requestedDate: "2026-03-20",
    pickupDate: "2026-03-25",
    status: "Cancelled",
  },
  {
    id: 5,
    studentName: "Kavya Iyer",
    bookTitle: "World History: Modern Era",
    requestedDate: "2026-03-25",
    pickupDate: "2026-03-29",
    status: "Pending",
  },
];

const CATEGORIES = [
  "Math",
  "Science",
  "History",
  "Literature",
  "Computer Science",
  "Geography",
  "Arts",
];

const statusColor: Record<string, string> = {
  Available: "bg-green-100 text-green-700",
  Borrowed: "bg-blue-100 text-blue-700",
  Overdue: "bg-red-100 text-red-700",
};

const reservationStatusColor: Record<string, string> = {
  Pending: "bg-amber-100 text-amber-700",
  Confirmed: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-600",
};

const EMPTY = {
  title: "",
  author: "",
  category: "Math",
  isbn: "",
  status: "Available",
  borrowedBy: "",
  dueDate: "",
};

function calcFine(dueDate: string): number {
  if (!dueDate) return 0;
  const due = new Date(dueDate);
  const today = new Date();
  const diffDays = Math.floor(
    (today.getTime() - due.getTime()) / (1000 * 60 * 60 * 24),
  );
  return diffDays > 0 ? diffDays * 2 : 0;
}

export default function LibraryPage() {
  const { t } = useLanguage();
  const [books, setBooks] = useState<Book[]>(SEED);
  const [search, setSearch] = useState("");
  const [isbnSearch, setIsbnSearch] = useState("");
  const [filterCat, setFilterCat] = useState("All");
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [nextId, setNextId] = useState(SEED.length + 1);
  const [form, setForm] = useState(EMPTY);

  // Digital library state
  const [digitalResources, setDigitalResources] =
    useState<DigitalResource[]>(DIGITAL_SEED);
  const [digitalDialogOpen, setDigitalDialogOpen] = useState(false);
  const [digitalForm, setDigitalForm] = useState({
    title: "",
    subject: "",
    type: "PDF" as "PDF" | "eBook",
    description: "",
    size: "",
  });

  // View modal state
  const [viewResource, setViewResource] = useState<DigitalResource | null>(
    null,
  );

  // Reservations state
  const [reservations, setReservations] =
    useState<Reservation[]>(RESERVATION_SEED);
  const [reserveDialogOpen, setReserveDialogOpen] = useState(false);
  const [reserveBook, setReserveBook] = useState("");
  const [reserveForm, setReserveForm] = useState({
    studentName: "",
    pickupDate: "",
  });

  // Paid fines tracking
  const [paidFines, setPaidFines] = useState<Set<number>>(new Set());

  const filtered = books.filter((b) => {
    const matchSearch =
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase());
    const matchIsbn = !isbnSearch || b.isbn.includes(isbnSearch);
    const matchCat = filterCat === "All" || b.category === filterCat;
    return matchSearch && matchIsbn && matchCat;
  });

  const totalOutstandingFines = books
    .filter((b) => b.status === "Overdue" && !paidFines.has(b.id))
    .reduce((sum, b) => sum + calcFine(b.dueDate), 0);

  const openAdd = () => {
    setEditId(null);
    setForm(EMPTY);
    setOpen(true);
  };
  const openEdit = (b: Book) => {
    setEditId(b.id);
    setForm({
      title: b.title,
      author: b.author,
      category: b.category,
      isbn: b.isbn,
      status: b.status,
      borrowedBy: b.borrowedBy,
      dueDate: b.dueDate,
    });
    setOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.author) {
      toast.error("Title and author are required");
      return;
    }
    if (editId !== null) {
      setBooks((prev) =>
        prev.map((b) => (b.id === editId ? { ...b, ...form } : b)),
      );
      toast.success("Book updated");
    } else {
      setBooks((prev) => [...prev, { id: nextId, ...form }]);
      setNextId((n) => n + 1);
      toast.success("Book added to library");
    }
    setOpen(false);
  };

  const handleDelete = () => {
    setBooks((prev) => prev.filter((b) => b.id !== deleteId));
    setDeleteId(null);
    toast.success("Book removed from library");
  };

  const toggleBorrow = (b: Book) => {
    if (b.status === "Available") {
      const borrower = window.prompt("Enter borrower name:");
      if (!borrower) return;
      const due = new Date();
      due.setDate(due.getDate() + 14);
      const dueStr = due.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
      setBooks((prev) =>
        prev.map((bk) =>
          bk.id === b.id
            ? {
                ...bk,
                status: "Borrowed",
                borrowedBy: borrower,
                dueDate: dueStr,
              }
            : bk,
        ),
      );
      toast.success(`Book borrowed by ${borrower}`);
    } else {
      setBooks((prev) =>
        prev.map((bk) =>
          bk.id === b.id
            ? { ...bk, status: "Available", borrowedBy: "", dueDate: "" }
            : bk,
        ),
      );
      toast.success("Book returned to library");
    }
  };

  const handleMarkFinePaid = (bookId: number) => {
    setPaidFines((prev) => new Set([...prev, bookId]));
    toast.success("Fine marked as paid");
  };

  const handleReserve = (bookTitle: string) => {
    setReserveBook(bookTitle);
    setReserveForm({ studentName: "", pickupDate: "" });
    setReserveDialogOpen(true);
  };

  const submitReservation = () => {
    if (!reserveForm.studentName || !reserveForm.pickupDate) {
      toast.error("Fill in all fields");
      return;
    }
    const newId = Math.max(0, ...reservations.map((r) => r.id)) + 1;
    setReservations((prev) => [
      ...prev,
      {
        id: newId,
        studentName: reserveForm.studentName,
        bookTitle: reserveBook,
        requestedDate: new Date().toISOString().split("T")[0],
        pickupDate: reserveForm.pickupDate,
        status: "Pending",
      },
    ]);
    setReserveDialogOpen(false);
    toast.success(`Reservation submitted for ${reserveBook}`);
  };

  const updateReservation = (id: number, status: "Confirmed" | "Cancelled") => {
    setReservations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r)),
    );
    toast.success(`Reservation ${status.toLowerCase()}`);
  };

  const addDigitalResource = () => {
    if (!digitalForm.title || !digitalForm.subject) {
      toast.error("Title and subject required");
      return;
    }
    const newId = Math.max(0, ...digitalResources.map((d) => d.id)) + 1;
    setDigitalResources((prev) => [
      ...prev,
      {
        id: newId,
        ...digitalForm,
        size: digitalForm.size || "1 MB",
        uploadedDate: new Date().toISOString().split("T")[0],
        content: `${digitalForm.title}\n\nSubject: ${digitalForm.subject}\n\n${digitalForm.description}\n\nThis resource covers key topics in ${digitalForm.subject}. Explore the material to deepen your understanding of this subject area.`,
      },
    ]);
    setDigitalDialogOpen(false);
    toast.success("Resource uploaded");
  };

  const handleDownload = (d: DigitalResource) => {
    const content = `${
      d.title
    }\nSubject: ${d.subject} | Type: ${d.type} | Size: ${d.size}\nUploaded: ${d.uploadedDate}\n\n${"=".repeat(60)}\n\n${d.content}\n\n${"=".repeat(
      60,
    )}\n\nEnd of Document — EduManage Digital Library`;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${d.title}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(`Downloading ${d.title}...`);
  };

  const f = (k: keyof typeof EMPTY, v: string) =>
    setForm((p) => ({ ...p, [k]: v }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{t("library")}</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {books.length} books in collection
          </p>
        </div>
        <Button
          onClick={openAdd}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
          data-ocid="library.primary_button"
        >
          <Plus size={16} className="mr-2" /> Add Book
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          {
            label: "Available",
            value: books.filter((b) => b.status === "Available").length,
            color: "text-gray-600 dark:text-gray-300",
          },
          {
            label: "Borrowed",
            value: books.filter((b) => b.status === "Borrowed").length,
            color: "text-gray-600 dark:text-gray-300",
          },
          {
            label: "Overdue",
            value: books.filter((b) => b.status === "Overdue").length,
            color: "text-gray-600 dark:text-gray-300",
          },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                {stat.label === "Overdue" ? (
                  <AlertCircle size={20} className={stat.color} />
                ) : (
                  <BookOpen size={20} className={stat.color} />
                )}
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
                <p className={`text-2xl font-bold ${stat.color}`}>
                  {stat.value}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="physical">
        <TabsList>
          <TabsTrigger value="physical" data-ocid="library.physical.tab">
            Physical Books
          </TabsTrigger>
          <TabsTrigger value="digital" data-ocid="library.digital.tab">
            Digital Library
          </TabsTrigger>
          <TabsTrigger
            value="reservations"
            data-ocid="library.reservations.tab"
          >
            Reservations
          </TabsTrigger>
        </TabsList>

        {/* Physical Books Tab */}
        <TabsContent value="physical" className="space-y-4">
          {totalOutstandingFines > 0 && (
            <Card className="border-amber-200 bg-amber-50">
              <CardContent className="p-4 flex items-center gap-3">
                <AlertCircle size={18} className="text-amber-600" />
                <p className="text-sm text-amber-800 font-medium">
                  Total Outstanding Fines:{" "}
                  <span className="font-bold">₹{totalOutstandingFines}</span>
                </p>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <Search size={16} className="text-muted-foreground" />
                  <Input
                    placeholder="Search books..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-48"
                    data-ocid="library.search_input"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Hash size={16} className="text-muted-foreground" />
                  <Input
                    placeholder="Search ISBN..."
                    value={isbnSearch}
                    onChange={(e) => setIsbnSearch(e.target.value)}
                    className="w-44"
                    data-ocid="library.isbn_input"
                  />
                </div>
                <Select value={filterCat} onValueChange={setFilterCat}>
                  <SelectTrigger
                    className="w-36"
                    data-ocid="library.category_select"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Categories</SelectItem>
                    {CATEGORIES.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="dark:text-gray-300">
                        Title
                      </TableHead>
                      <TableHead className="dark:text-gray-300">
                        Author
                      </TableHead>
                      <TableHead className="dark:text-gray-300">
                        Category
                      </TableHead>
                      <TableHead className="dark:text-gray-300">ISBN</TableHead>
                      <TableHead>{t("status")}</TableHead>
                      <TableHead className="dark:text-gray-300">
                        Borrowed By
                      </TableHead>
                      <TableHead className="dark:text-gray-300">
                        Due Date
                      </TableHead>
                      <TableHead>{t("fine")}</TableHead>
                      <TableHead>{t("actions")}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.length === 0 && (
                      <TableRow>
                        <TableCell
                          colSpan={9}
                          className="text-center py-8 text-muted-foreground"
                          data-ocid="library.empty_state"
                        >
                          No books found
                        </TableCell>
                      </TableRow>
                    )}
                    {filtered.map((b, i) => {
                      const fine =
                        b.status === "Overdue" ? calcFine(b.dueDate) : 0;
                      const finePaid = paidFines.has(b.id);
                      return (
                        <TableRow
                          key={b.id}
                          data-ocid={`library.item.${i + 1}`}
                        >
                          <TableCell className="font-medium">
                            {b.title}
                          </TableCell>
                          <TableCell>{b.author}</TableCell>
                          <TableCell>{b.category}</TableCell>
                          <TableCell className="text-xs text-muted-foreground font-mono">
                            {b.isbn}
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={`text-xs ${statusColor[b.status] ?? "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"}`}
                            >
                              {b.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{b.borrowedBy || "—"}</TableCell>
                          <TableCell>{b.dueDate || "—"}</TableCell>
                          <TableCell>
                            {fine > 0 && !finePaid ? (
                              <span className="text-gray-600 dark:text-gray-300 font-semibold text-sm">
                                ₹{fine}
                              </span>
                            ) : finePaid ? (
                              <span className="text-gray-600 dark:text-gray-300 text-xs">
                                Paid
                              </span>
                            ) : (
                              <span className="text-muted-foreground">—</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              {b.status === "Available" && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-7 text-xs"
                                  onClick={() => handleReserve(b.title)}
                                  data-ocid={`library.reserve_button.${i + 1}`}
                                >
                                  Reserve
                                </Button>
                              )}
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-7 text-xs"
                                onClick={() => toggleBorrow(b)}
                                data-ocid={`library.borrow_button.${i + 1}`}
                              >
                                {b.status === "Available" ? (
                                  "Borrow"
                                ) : (
                                  <>
                                    <RotateCcw size={12} className="mr-1" />{" "}
                                    Return
                                  </>
                                )}
                              </Button>
                              {fine > 0 && !finePaid && (
                                <Button
                                  size="sm"
                                  className="h-7 text-xs bg-primary text-primary-foreground hover:bg-primary/90"
                                  onClick={() => handleMarkFinePaid(b.id)}
                                  data-ocid={`library.fine_pay_button.${i + 1}`}
                                >
                                  Pay Fine
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7"
                                onClick={() => openEdit(b)}
                                data-ocid={`library.edit_button.${i + 1}`}
                              >
                                <Pencil size={13} />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 text-gray-500 dark:text-gray-400"
                                onClick={() => setDeleteId(b.id)}
                                data-ocid={`library.delete_button.${i + 1}`}
                              >
                                <Trash2 size={13} />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Digital Library Tab */}
        <TabsContent value="digital" className="space-y-4">
          <div className="flex justify-end">
            <Button
              onClick={() => {
                setDigitalForm({
                  title: "",
                  subject: "",
                  type: "PDF",
                  description: "",
                  size: "",
                });
                setDigitalDialogOpen(true);
              }}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              data-ocid="library.upload_button"
            >
              <Plus size={16} className="mr-2" /> Upload Resource
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {digitalResources.map((d, i) => (
              <Card key={d.id} data-ocid={`library.digital.item.${i + 1}`}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <FileText size={20} className="text-blue-600" />
                    </div>
                    <Badge
                      className={
                        d.type === "PDF"
                          ? "bg-green-100 text-green-700"
                          : "bg-amber-100 text-amber-700"
                      }
                    >
                      {d.type}
                    </Badge>
                  </div>
                  <CardTitle className="text-sm mt-2">{d.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-xs text-muted-foreground mb-1">
                    {d.subject} • {d.size}
                  </p>
                  <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                    {d.description}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 text-xs h-8"
                      onClick={() => setViewResource(d)}
                      data-ocid={`library.digital.view_button.${i + 1}`}
                    >
                      <Eye size={13} className="mr-1" /> View
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 text-xs h-8"
                      onClick={() => handleDownload(d)}
                      data-ocid={`library.digital.download_button.${i + 1}`}
                    >
                      <Download size={13} className="mr-1" /> Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Reservations Tab */}
        <TabsContent value="reservations" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="dark:text-gray-300">
                        Student
                      </TableHead>
                      <TableHead className="dark:text-gray-300">Book</TableHead>
                      <TableHead className="dark:text-gray-300">
                        Requested
                      </TableHead>
                      <TableHead className="dark:text-gray-300">
                        Pickup Date
                      </TableHead>
                      <TableHead>{t("status")}</TableHead>
                      <TableHead>{t("actions")}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reservations.length === 0 && (
                      <TableRow>
                        <TableCell
                          colSpan={6}
                          className="text-center py-8 text-muted-foreground"
                          data-ocid="library.reservations.empty_state"
                        >
                          No reservations
                        </TableCell>
                      </TableRow>
                    )}
                    {reservations.map((r, i) => (
                      <TableRow
                        key={r.id}
                        data-ocid={`library.reservations.item.${i + 1}`}
                      >
                        <TableCell className="font-medium">
                          {r.studentName}
                        </TableCell>
                        <TableCell>{r.bookTitle}</TableCell>
                        <TableCell>{r.requestedDate}</TableCell>
                        <TableCell>{r.pickupDate}</TableCell>
                        <TableCell>
                          <Badge
                            className={`text-xs ${reservationStatusColor[r.status]}`}
                          >
                            {r.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {r.status === "Pending" && (
                            <div className="flex gap-1">
                              <Button
                                size="sm"
                                className="h-7 text-xs bg-gray-600 hover:bg-gray-700 text-white"
                                onClick={() =>
                                  updateReservation(r.id, "Confirmed")
                                }
                                data-ocid={`library.reservations.confirm_button.${i + 1}`}
                              >
                                Confirm
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-7 text-xs text-gray-600 dark:text-gray-300"
                                onClick={() =>
                                  updateReservation(r.id, "Cancelled")
                                }
                                data-ocid={`library.reservations.cancel_button.${i + 1}`}
                              >
                                Cancel
                              </Button>
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add/Edit Book Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editId !== null ? "Edit Book" : "Add New Book"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1 col-span-2">
                <Label>Title</Label>
                <Input
                  value={form.title}
                  onChange={(e) => f("title", e.target.value)}
                  placeholder="Book title"
                  data-ocid="library.book_title.input"
                />
              </div>
              <div className="space-y-1">
                <Label>Author</Label>
                <Input
                  value={form.author}
                  onChange={(e) => f("author", e.target.value)}
                  placeholder="Author name"
                />
              </div>
              <div className="space-y-1">
                <Label>ISBN</Label>
                <Input
                  value={form.isbn}
                  onChange={(e) => f("isbn", e.target.value)}
                  placeholder="978-..."
                />
              </div>
              <div className="space-y-1">
                <Label>Category</Label>
                <Select
                  value={form.category}
                  onValueChange={(v) => f("category", v)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label>{t("status")}</Label>
                <Select
                  value={form.status}
                  onValueChange={(v) => f("status", v)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Available">{t("available")}</SelectItem>
                    <SelectItem value="Borrowed">Borrowed</SelectItem>
                    <SelectItem value="Overdue">{t("overdue")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                data-ocid="library.book_submit_button"
              >
                {editId !== null ? "Update" : "Add"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Digital Resource Upload Dialog */}
      <Dialog open={digitalDialogOpen} onOpenChange={setDigitalDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Upload Digital Resource</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1">
              <Label>Title</Label>
              <Input
                value={digitalForm.title}
                onChange={(e) =>
                  setDigitalForm((p) => ({ ...p, title: e.target.value }))
                }
                placeholder="Resource title"
                data-ocid="library.digital.title.input"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label>{t("subject")}</Label>
                <Input
                  value={digitalForm.subject}
                  onChange={(e) =>
                    setDigitalForm((p) => ({ ...p, subject: e.target.value }))
                  }
                  placeholder="e.g. Physics"
                />
              </div>
              <div className="space-y-1">
                <Label>{t("type")}</Label>
                <Select
                  value={digitalForm.type}
                  onValueChange={(v) =>
                    setDigitalForm((p) => ({
                      ...p,
                      type: v as "PDF" | "eBook",
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PDF">PDF</SelectItem>
                    <SelectItem value="eBook">eBook</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-1">
              <Label>Description</Label>
              <Textarea
                value={digitalForm.description}
                onChange={(e) =>
                  setDigitalForm((p) => ({ ...p, description: e.target.value }))
                }
                rows={2}
                placeholder="Brief description"
              />
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setDigitalDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={addDigitalResource}
                data-ocid="library.digital.submit_button"
              >
                Upload
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Digital Resource Dialog */}
      <Dialog
        open={viewResource !== null}
        onOpenChange={(o) => !o && setViewResource(null)}
      >
        <DialogContent className="sm:max-w-2xl max-h-[85vh] flex flex-col">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <BookOpen
                  size={20}
                  className="text-gray-700 dark:text-gray-200"
                />
              </div>
              <div>
                <DialogTitle className="text-lg">
                  {viewResource?.title}
                </DialogTitle>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {viewResource?.subject} • {viewResource?.type} •{" "}
                  {viewResource?.size} • Uploaded {viewResource?.uploadedDate}
                </p>
              </div>
            </div>
          </DialogHeader>

          <div className="flex-1 overflow-hidden">
            <p className="text-sm text-muted-foreground mb-3 italic">
              {viewResource?.description}
            </p>
            <ScrollArea className="h-[420px] rounded-md border p-4 bg-gray-50 dark:bg-gray-800 dark:bg-gray-900">
              <pre
                className="text-sm leading-relaxed whitespace-pre-wrap font-sans text-gray-800 dark:text-gray-100 dark:text-gray-200"
                data-ocid="library.digital.content_panel"
              >
                {viewResource?.content}
              </pre>
            </ScrollArea>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setViewResource(null)}
              data-ocid="library.digital.view.close_button"
            >
              Close
            </Button>
            {viewResource && (
              <Button
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={() => {
                  handleDownload(viewResource);
                }}
                data-ocid="library.digital.view.download_button"
              >
                <Download size={14} className="mr-2" /> Download
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reserve Dialog */}
      <Dialog open={reserveDialogOpen} onOpenChange={setReserveDialogOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Reserve Book</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Reserving: <strong>{reserveBook}</strong>
            </p>
            <div className="space-y-1">
              <Label>Student Name</Label>
              <Input
                value={reserveForm.studentName}
                onChange={(e) =>
                  setReserveForm((p) => ({ ...p, studentName: e.target.value }))
                }
                placeholder="Enter student name"
                data-ocid="library.reserve.name.input"
              />
            </div>
            <div className="space-y-1">
              <Label>Pickup Date</Label>
              <Input
                type="date"
                value={reserveForm.pickupDate}
                onChange={(e) =>
                  setReserveForm((p) => ({ ...p, pickupDate: e.target.value }))
                }
              />
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setReserveDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={submitReservation}
                data-ocid="library.reserve.submit_button"
              >
                Reserve
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog
        open={deleteId !== null}
        onOpenChange={(o) => !o && setDeleteId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Book</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove the book from the library.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive hover:bg-destructive/90"
            >
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
