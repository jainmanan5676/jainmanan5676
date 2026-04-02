import { Actor, type ActorConfig } from "@dfinity/agent";
import type { backendInterface } from "./backend.d";

export type { backendInterface } from "./backend.d";
export type {
  Student,
  Teacher,
  SchoolClass,
  Subject,
  Grade,
  Exam,
  Attendance,
  Announcement,
  TimetableEntry,
  UserProfile,
  AttendanceStatus,
  UserRole,
  SubjectId,
  StudentId,
  TeacherId,
  ClassId,
  ExamId,
  GradeId,
  AttendanceId,
  TimetableEntryId,
  AnnouncementId,
  Time,
  Option,
  Some,
  None,
} from "./backend.d";

export interface CreateActorOptions {
  agentOptions?: Record<string, unknown>;
  agent?: unknown;
  processError?: (e: unknown) => never;
  [key: string]: unknown;
}

export class ExternalBlob {
  private _bytes?: Uint8Array;
  private _url?: string;
  onProgress?: (progress: number) => void;

  async getBytes(): Promise<Uint8Array> {
    if (this._bytes) return this._bytes;
    if (this._url) {
      const res = await fetch(this._url);
      const buf = await res.arrayBuffer();
      return new Uint8Array(buf);
    }
    return new Uint8Array();
  }

  static fromURL(url: string): ExternalBlob {
    const blob = new ExternalBlob();
    blob._url = url;
    return blob;
  }

  static fromBytes(bytes: Uint8Array): ExternalBlob {
    const blob = new ExternalBlob();
    blob._bytes = bytes;
    return blob;
  }
}

type IDLInterface = {
  Variant: (t: Record<string, unknown>) => unknown;
  Record: (t: Record<string, unknown>) => unknown;
  Func: (args: unknown[], ret: unknown[], ann?: string[]) => unknown;
  Service: (t: Record<string, unknown>) => unknown;
  Text: unknown;
  Nat: unknown;
  Int: unknown;
  Bool: unknown;
  Null: unknown;
  Principal: unknown;
  Vec: (t: unknown) => unknown;
  Opt: (t: unknown) => unknown;
};

type InterfaceFactory = (idl: { IDL: unknown }) => unknown;

// IDL factory for the backend canister
const idlFactory: InterfaceFactory = ({ IDL }: { IDL: unknown }) => {
  const I = IDL as IDLInterface;
  const AttendanceStatus = I.Variant({
    present: I.Null,
    late: I.Null,
    absent: I.Null,
  });
  const UserRole = I.Variant({
    admin: I.Null,
    user: I.Null,
    guest: I.Null,
  });
  const UserProfile = I.Record({
    name: I.Text,
    role: I.Text,
    entityId: I.Opt(I.Nat),
  });
  return I.Service({
    assignCallerUserRole: I.Func([I.Principal, UserRole], [], []),
    createAnnouncement: I.Func([I.Text, I.Text, I.Int, I.Vec(I.Text)], [I.Nat], []),
    createClass: I.Func([I.Text, I.Text, I.Nat, I.Vec(I.Nat)], [I.Nat], []),
    createExam: I.Func([I.Text, I.Nat, I.Int, I.Nat, I.Nat], [I.Nat], []),
    createStudent: I.Func([I.Text, I.Nat, I.Nat, I.Nat, I.Text, I.Text, I.Principal], [I.Nat], []),
    createSubject: I.Func([I.Text, I.Nat, I.Nat], [I.Nat], []),
    createTeacher: I.Func([I.Text, I.Vec(I.Text), I.Text, I.Text, I.Principal], [I.Nat], []),
    createTimetableEntry: I.Func([I.Nat, I.Text, I.Text, I.Nat, I.Nat, I.Text], [I.Nat], []),
    getAllAnnouncements: I.Func([], [I.Vec(I.Record({}))], ["query"]),
    getAllAttendance: I.Func([], [I.Vec(I.Record({}))], ["query"]),
    getAllClasses: I.Func([], [I.Vec(I.Record({}))], ["query"]),
    getAllExams: I.Func([], [I.Vec(I.Record({}))], ["query"]),
    getAllGrades: I.Func([], [I.Vec(I.Record({}))], ["query"]),
    getAllStudents: I.Func([], [I.Vec(I.Record({}))], ["query"]),
    getAllSubjects: I.Func([], [I.Vec(I.Record({}))], ["query"]),
    getAllTeachers: I.Func([], [I.Vec(I.Record({}))], ["query"]),
    getAllTimetableEntries: I.Func([], [I.Vec(I.Record({}))], ["query"]),
    getAnnouncement: I.Func([I.Nat], [I.Record({})], ["query"]),
    getAttendance: I.Func([I.Nat], [I.Record({})], ["query"]),
    getCallerUserProfile: I.Func([], [I.Opt(UserProfile)], ["query"]),
    getCallerUserRole: I.Func([], [UserRole], ["query"]),
    getClass: I.Func([I.Nat], [I.Record({})], ["query"]),
    getExam: I.Func([I.Nat], [I.Record({})], ["query"]),
    getGrade: I.Func([I.Nat], [I.Record({})], ["query"]),
    getMyAttendance: I.Func([], [I.Vec(I.Record({}))], ["query"]),
    getMyGrades: I.Func([], [I.Vec(I.Record({}))], ["query"]),
    getMyStudentProfile: I.Func([], [I.Opt(I.Record({}))], ["query"]),
    getStudent: I.Func([I.Nat], [I.Record({})], ["query"]),
    getSubject: I.Func([I.Nat], [I.Record({})], ["query"]),
    getTeacher: I.Func([I.Nat], [I.Record({})], ["query"]),
    getTimetableEntry: I.Func([I.Nat], [I.Record({})], ["query"]),
    getUserProfile: I.Func([I.Principal], [I.Opt(UserProfile)], ["query"]),
    isCallerAdmin: I.Func([], [I.Bool], ["query"]),
    markAttendance: I.Func([I.Nat, I.Nat, I.Int, AttendanceStatus], [I.Nat], []),
    recordGrade: I.Func([I.Nat, I.Nat, I.Nat, I.Nat, I.Nat], [I.Nat], []),
    saveCallerUserProfile: I.Func([UserProfile], [], []),
    _initializeAccessControlWithSecret: I.Func([I.Text], [], []),
  });
};

export function createActor(
  canisterId: string,
  _uploadFile: (file: ExternalBlob) => Promise<Uint8Array>,
  _downloadFile: (bytes: Uint8Array) => Promise<ExternalBlob>,
  options?: CreateActorOptions,
): backendInterface {
  const actorConfig: ActorConfig = {
    canisterId,
    ...(options?.agent ? { agent: options.agent as Parameters<typeof Actor.createActor>[1]["agent"] } : {}),
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return Actor.createActor<backendInterface>(idlFactory as any, actorConfig);
}
