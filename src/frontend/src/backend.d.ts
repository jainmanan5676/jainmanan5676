import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type SubjectId = bigint;
export interface UserProfile {
    name: string;
    role: string;
    entityId?: bigint;
}
export type Time = bigint;
export interface Attendance {
    id: AttendanceId;
    status: AttendanceStatus;
    studentId: StudentId;
    date: Time;
    classId: ClassId;
}
export interface TimetableEntry {
    id: TimetableEntryId;
    day: string;
    period: string;
    time: string;
    classId: ClassId;
    subjectId: SubjectId;
    teacherId: TeacherId;
}
export type AttendanceId = bigint;
export interface Teacher {
    id: TeacherId;
    contact: string;
    subjectSpecialization: Array<string>;
    userId: Principal;
    name: string;
    qualification: string;
}
export type StudentId = bigint;
export type TeacherId = bigint;
export type ExamId = bigint;
export interface Grade {
    id: GradeId;
    totalMarks: bigint;
    studentId: StudentId;
    marksObtained: bigint;
    subjectId: SubjectId;
    examId: ExamId;
    percentage: bigint;
}
export type TimetableEntryId = bigint;
export interface Exam {
    id: ExamId;
    date: Time;
    name: string;
    classId: ClassId;
    subjectId: SubjectId;
    maxMarks: bigint;
}
export type GradeId = bigint;
export type AnnouncementId = bigint;
export type ClassId = bigint;
export interface Announcement {
    id: AnnouncementId;
    title: string;
    content: string;
    date: Time;
    targetAudience: Array<string>;
}
export interface Subject {
    id: SubjectId;
    name: string;
    classId: ClassId;
    teacherId: TeacherId;
}
export interface SchoolClass {
    id: ClassId;
    name: string;
    section: string;
    studentIds: Array<StudentId>;
    subjectIds: Array<SubjectId>;
    teacherId: TeacherId;
}
export interface Student {
    id: StudentId;
    age: bigint;
    parentContact: string;
    userId: Principal;
    name: string;
    classId: ClassId;
    rollNumber: bigint;
    address: string;
}
export enum AttendanceStatus {
    present = "present",
    late = "late",
    absent = "absent"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createAnnouncement(title: string, content: string, date: Time, targetAudience: Array<string>): Promise<AnnouncementId>;
    createClass(name: string, section: string, teacherId: TeacherId, subjectIds: Array<SubjectId>): Promise<ClassId>;
    createExam(name: string, subjectId: SubjectId, date: Time, classId: ClassId, maxMarks: bigint): Promise<ExamId>;
    createStudent(name: string, age: bigint, classId: ClassId, rollNumber: bigint, parentContact: string, address: string, userId: Principal): Promise<StudentId>;
    createSubject(name: string, classId: ClassId, teacherId: TeacherId): Promise<SubjectId>;
    createTeacher(name: string, subjectSpecialization: Array<string>, contact: string, qualification: string, userId: Principal): Promise<TeacherId>;
    createTimetableEntry(classId: ClassId, day: string, period: string, subjectId: SubjectId, teacherId: TeacherId, time: string): Promise<TimetableEntryId>;
    getAllAnnouncements(): Promise<Array<Announcement>>;
    getAllAttendance(): Promise<Array<Attendance>>;
    getAllClasses(): Promise<Array<SchoolClass>>;
    getAllExams(): Promise<Array<Exam>>;
    getAllGrades(): Promise<Array<Grade>>;
    getAllStudents(): Promise<Array<Student>>;
    getAllSubjects(): Promise<Array<Subject>>;
    getAllTeachers(): Promise<Array<Teacher>>;
    getAllTimetableEntries(): Promise<Array<TimetableEntry>>;
    getAnnouncement(id: AnnouncementId): Promise<Announcement>;
    getAttendance(id: AttendanceId): Promise<Attendance>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getClass(id: ClassId): Promise<SchoolClass>;
    getExam(id: ExamId): Promise<Exam>;
    getGrade(id: GradeId): Promise<Grade>;
    getMyAttendance(): Promise<Array<Attendance>>;
    getMyGrades(): Promise<Array<Grade>>;
    getMyStudentProfile(): Promise<Student | null>;
    getStudent(id: StudentId): Promise<Student>;
    getSubject(id: SubjectId): Promise<Subject>;
    getTeacher(id: TeacherId): Promise<Teacher>;
    getTimetableEntry(id: TimetableEntryId): Promise<TimetableEntry>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    markAttendance(studentId: StudentId, classId: ClassId, date: Time, status: AttendanceStatus): Promise<AttendanceId>;
    recordGrade(studentId: StudentId, subjectId: SubjectId, examId: ExamId, marksObtained: bigint, totalMarks: bigint): Promise<GradeId>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    _initializeAccessControlWithSecret(secret: string): Promise<void>;
}

export interface CreateActorOptions {
    agentOptions?: Record<string, unknown>;
    agent?: unknown;
    processError?: (e: unknown) => never;
    [key: string]: unknown;
}

export declare class ExternalBlob {
    onProgress?: (progress: number) => void;
    getBytes(): Promise<Uint8Array>;
    static fromURL(url: string): ExternalBlob;
}

export declare function createActor(
    canisterId: string,
    uploadFile: (file: ExternalBlob) => Promise<Uint8Array>,
    downloadFile: (bytes: Uint8Array) => Promise<ExternalBlob>,
    options?: CreateActorOptions
): backendInterface;
