import Array "mo:core/Array";
import Principal "mo:core/Principal";
import Order "mo:core/Order";
import Time "mo:core/Time";
import Map "mo:core/Map";
import List "mo:core/List";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import Set "mo:core/Set";

import StripeModule "stripe/stripe";
import OutCall "http-outcalls/outcall";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  type StudentId = Nat;
  type TeacherId = Nat;
  type ClassId = Nat;
  type SubjectId = Nat;
  type ExamId = Nat;
  type TimetableEntryId = Nat;
  type AnnouncementId = Nat;
  type AttendanceId = Nat;
  type GradeId = Nat;

  // Counters for unique IDs
  var studentCounter = 0;
  var teacherCounter = 0;
  var classCounter = 0;
  var subjectCounter = 0;
  var examCounter = 0;
  var timetableEntryCounter = 0;
  var announcementCounter = 0;
  var attendanceCounter = 0;
  var gradeCounter = 0;

  // Mixins
  // -- include MixinAuthorization for access control
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Types & modules
  type Student = {
    id : StudentId;
    name : Text;
    age : Nat;
    classId : ClassId;
    rollNumber : Nat;
    parentContact : Text;
    address : Text;
    userId : Principal;
  };

  module Student {
    public func compare(student1 : Student, student2 : Student) : Order.Order {
      Nat.compare(student1.id, student2.id);
    };
  };

  type Teacher = {
    id : TeacherId;
    name : Text;
    subjectSpecialization : [Text];
    contact : Text;
    qualification : Text;
    userId : Principal;
  };

  module Teacher {
    public func compare(teacher1 : Teacher, teacher2 : Teacher) : Order.Order {
      Nat.compare(teacher1.id, teacher2.id);
    };
  };

  type SchoolClass = {
    id : ClassId;
    name : Text;
    section : Text;
    teacherId : TeacherId;
    subjectIds : [SubjectId];
    studentIds : [StudentId];
  };

  module SchoolClass {
    public func compare(class1 : SchoolClass, class2 : SchoolClass) : Order.Order {
      Nat.compare(class1.id, class2.id);
    };
  };

  type Subject = {
    id : SubjectId;
    name : Text;
    classId : ClassId;
    teacherId : TeacherId;
  };

  module Subject {
    public func compare(subject1 : Subject, subject2 : Subject) : Order.Order {
      Nat.compare(subject1.id, subject2.id);
    };
  };

  type Exam = {
    id : ExamId;
    name : Text;
    subjectId : SubjectId;
    date : Time.Time;
    classId : ClassId;
    maxMarks : Nat;
  };

  module Exam {
    public func compare(exam1 : Exam, exam2 : Exam) : Order.Order {
      Nat.compare(exam1.id, exam2.id);
    };
  };

  type TimetableEntry = {
    id : TimetableEntryId;
    classId : ClassId;
    day : Text;
    period : Text;
    subjectId : SubjectId;
    teacherId : TeacherId;
    time : Text;
  };

  module TimetableEntry {
    public func compare(entry1 : TimetableEntry, entry2 : TimetableEntry) : Order.Order {
      Nat.compare(entry1.id, entry2.id);
    };
  };

  type Announcement = {
    id : AnnouncementId;
    title : Text;
    content : Text;
    date : Time.Time;
    targetAudience : [Text];
  };

  module Announcement {
    public func compare(announcement1 : Announcement, announcement2 : Announcement) : Order.Order {
      Nat.compare(announcement1.id, announcement2.id);
    };
  };

  type AttendanceStatus = {
    #present;
    #absent;
    #late;
  };

  module AttendanceStatus {
    public func compare(status1 : AttendanceStatus, status2 : AttendanceStatus) : Order.Order {
      switch (status1, status2) {
        case (#present, #present) { #equal };
        case (#present, _) { #less };
        case (#absent, #present) { #greater };
        case (#absent, #absent) { #equal };
        case (#absent, #late) { #less };
        case (#late, #late) { #equal };
        case (#late, _) { #greater };
      };
    };
  };

  type Attendance = {
    id : AttendanceId;
    studentId : StudentId;
    classId : ClassId;
    date : Time.Time;
    status : AttendanceStatus;
  };

  module Attendance {
    public func compare(attendance1 : Attendance, attendance2 : Attendance) : Order.Order {
      Nat.compare(attendance1.id, attendance2.id);
    };
  };

  type Grade = {
    id : GradeId;
    studentId : StudentId;
    subjectId : SubjectId;
    examId : ExamId;
    marksObtained : Nat;
    totalMarks : Nat;
    percentage : Nat;
  };

  module Grade {
    public func compare(grade1 : Grade, grade2 : Grade) : Order.Order {
      Nat.compare(grade1.id, grade2.id);
    };
  };

  // User Profile Type
  public type UserProfile = {
    name : Text;
    role : Text; // "admin", "teacher", or "student"
    entityId : ?Nat; // StudentId or TeacherId if applicable
  };

  // Persistent Data Structures
  let students = Map.empty<StudentId, Student>();
  let teachers = Map.empty<TeacherId, Teacher>();
  let classes = Map.empty<ClassId, SchoolClass>();
  let subjects = Map.empty<SubjectId, Subject>();
  let exams = Map.empty<ExamId, Exam>();
  let timetableEntries = Map.empty<TimetableEntryId, TimetableEntry>();
  let announcements = Map.empty<AnnouncementId, Announcement>();
  let attendanceRecords = Map.empty<AttendanceId, Attendance>();
  let grades = Map.empty<GradeId, Grade>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  // Helper function to check if caller is a teacher
  func isTeacher(caller : Principal) : Bool {
    for ((id, teacher) in teachers.entries()) {
      if (teacher.userId == caller) {
        return true;
      };
    };
    false;
  };

  // Helper function to get teacher ID by principal
  func getTeacherIdByPrincipal(caller : Principal) : ?TeacherId {
    for ((id, teacher) in teachers.entries()) {
      if (teacher.userId == caller) {
        return ?id;
      };
    };
    null;
  };

  // Helper function to check if caller is a student
  func isStudent(caller : Principal) : Bool {
    for ((id, student) in students.entries()) {
      if (student.userId == caller) {
        return true;
      };
    };
    false;
  };

  // Helper function to get student ID by principal
  func getStudentIdByPrincipal(caller : Principal) : ?StudentId {
    for ((id, student) in students.entries()) {
      if (student.userId == caller) {
        return ?id;
      };
    };
    null;
  };

  // User Profile Management (Required by frontend)
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Student Management
  public shared ({ caller }) func createStudent(name : Text, age : Nat, classId : ClassId, rollNumber : Nat, parentContact : Text, address : Text, userId : Principal) : async StudentId {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admin can create students");
    };

    studentCounter += 1;
    let id = studentCounter;
    let student : Student = {
      id;
      name;
      age;
      classId;
      rollNumber;
      parentContact;
      address;
      userId;
    };
    students.add(id, student);
    id;
  };

  public query ({ caller }) func getStudent(id : StudentId) : async Student {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view student data");
    };

    switch (students.get(id)) {
      case (null) { Runtime.trap("Student does not exist") };
      case (?student) {
        // Students can only view their own data, teachers and admins can view all
        if (not AccessControl.isAdmin(accessControlState, caller) and not isTeacher(caller)) {
          if (student.userId != caller) {
            Runtime.trap("Unauthorized: Students can only view their own data");
          };
        };
        student;
      };
    };
  };

  public query ({ caller }) func getAllStudents() : async [Student] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view students");
    };

    // Only admins and teachers can view all students
    if (not AccessControl.isAdmin(accessControlState, caller) and not isTeacher(caller)) {
      Runtime.trap("Unauthorized: Only admins and teachers can view all students");
    };

    students.values().toArray().sort();
  };

  // Teacher Management
  public shared ({ caller }) func createTeacher(name : Text, subjectSpecialization : [Text], contact : Text, qualification : Text, userId : Principal) : async TeacherId {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admin can create teachers");
    };

    teacherCounter += 1;
    let id = teacherCounter;
    let teacher : Teacher = {
      id;
      name;
      subjectSpecialization;
      contact;
      qualification;
      userId;
    };
    teachers.add(id, teacher);
    id;
  };

  public query ({ caller }) func getTeacher(id : TeacherId) : async Teacher {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view teacher data");
    };

    switch (teachers.get(id)) {
      case (null) { Runtime.trap("Teacher does not exist") };
      case (?teacher) {
        // Teachers can only view their own data unless admin
        if (not AccessControl.isAdmin(accessControlState, caller) and not isTeacher(caller)) {
          Runtime.trap("Unauthorized: Only admins and teachers can view teacher data");
        };
        if (not AccessControl.isAdmin(accessControlState, caller) and teacher.userId != caller) {
          Runtime.trap("Unauthorized: Teachers can only view their own data");
        };
        teacher;
      };
    };
  };

  public query ({ caller }) func getAllTeachers() : async [Teacher] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view teachers");
    };

    // Only admins and teachers can view all teachers
    if (not AccessControl.isAdmin(accessControlState, caller) and not isTeacher(caller)) {
      Runtime.trap("Unauthorized: Only admins and teachers can view all teachers");
    };

    teachers.values().toArray().sort();
  };

  // Class/Course Management
  public shared ({ caller }) func createClass(name : Text, section : Text, teacherId : TeacherId, subjectIds : [SubjectId]) : async ClassId {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admin can create classes");
    };

    classCounter += 1;
    let id = classCounter;
    let schoolClass : SchoolClass = {
      id;
      name;
      section;
      teacherId;
      subjectIds;
      studentIds = [];
    };
    classes.add(id, schoolClass);
    id;
  };

  public query ({ caller }) func getClass(id : ClassId) : async SchoolClass {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view class data");
    };

    switch (classes.get(id)) {
      case (null) { Runtime.trap("Class does not exist") };
      case (?schoolClass) { schoolClass };
    };
  };

  public query ({ caller }) func getAllClasses() : async [SchoolClass] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view classes");
    };

    classes.values().toArray().sort();
  };

  // Subject Management
  public shared ({ caller }) func createSubject(name : Text, classId : ClassId, teacherId : TeacherId) : async SubjectId {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admin can create subjects");
    };

    subjectCounter += 1;
    let id = subjectCounter;
    let subject : Subject = {
      id;
      name;
      classId;
      teacherId;
    };
    subjects.add(id, subject);
    id;
  };

  public query ({ caller }) func getSubject(id : SubjectId) : async Subject {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view subject data");
    };

    switch (subjects.get(id)) {
      case (null) { Runtime.trap("Subject does not exist") };
      case (?subject) { subject };
    };
  };

  public query ({ caller }) func getAllSubjects() : async [Subject] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view subjects");
    };

    subjects.values().toArray().sort();
  };

  // Attendance Management
  public shared ({ caller }) func markAttendance(studentId : StudentId, classId : ClassId, date : Time.Time, status : AttendanceStatus) : async AttendanceId {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can mark attendance");
    };

    // Only admins and teachers can mark attendance
    if (not AccessControl.isAdmin(accessControlState, caller) and not isTeacher(caller)) {
      Runtime.trap("Unauthorized: Only admins and teachers can mark attendance");
    };

    attendanceCounter += 1;
    let id = attendanceCounter;
    let attendance : Attendance = {
      id;
      studentId;
      classId;
      date;
      status;
    };
    attendanceRecords.add(id, attendance);
    id;
  };

  public query ({ caller }) func getAttendance(id : AttendanceId) : async Attendance {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view attendance");
    };

    switch (attendanceRecords.get(id)) {
      case (null) { Runtime.trap("Attendance record does not exist") };
      case (?attendance) {
        // Students can only view their own attendance
        if (not AccessControl.isAdmin(accessControlState, caller) and not isTeacher(caller)) {
          switch (getStudentIdByPrincipal(caller)) {
            case (?studentId) {
              if (attendance.studentId != studentId) {
                Runtime.trap("Unauthorized: Students can only view their own attendance");
              };
            };
            case null {
              Runtime.trap("Unauthorized: Only students, teachers, and admins can view attendance");
            };
          };
        };
        attendance;
      };
    };
  };

  public query ({ caller }) func getAllAttendance() : async [Attendance] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view attendance");
    };

    // Only admins and teachers can view all attendance
    if (not AccessControl.isAdmin(accessControlState, caller) and not isTeacher(caller)) {
      Runtime.trap("Unauthorized: Only admins and teachers can view all attendance");
    };

    attendanceRecords.values().toArray().sort();
  };

  // Exam Management
  public shared ({ caller }) func createExam(name : Text, subjectId : SubjectId, date : Time.Time, classId : ClassId, maxMarks : Nat) : async ExamId {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admin can create exams");
    };

    examCounter += 1;
    let id = examCounter;
    let exam : Exam = {
      id;
      name;
      subjectId;
      date;
      classId;
      maxMarks;
    };
    exams.add(id, exam);
    id;
  };

  public query ({ caller }) func getExam(id : ExamId) : async Exam {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view exam data");
    };

    switch (exams.get(id)) {
      case (null) { Runtime.trap("Exam does not exist") };
      case (?exam) { exam };
    };
  };

  public query ({ caller }) func getAllExams() : async [Exam] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view exams");
    };

    exams.values().toArray().sort();
  };

  // Timetable Management
  public shared ({ caller }) func createTimetableEntry(classId : ClassId, day : Text, period : Text, subjectId : SubjectId, teacherId : TeacherId, time : Text) : async TimetableEntryId {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admin can create timetable entries");
    };

    timetableEntryCounter += 1;
    let id = timetableEntryCounter;
    let entry : TimetableEntry = {
      id;
      classId;
      day;
      period;
      subjectId;
      teacherId;
      time;
    };
    timetableEntries.add(id, entry);
    id;
  };

  public query ({ caller }) func getTimetableEntry(id : TimetableEntryId) : async TimetableEntry {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view timetable");
    };

    switch (timetableEntries.get(id)) {
      case (null) { Runtime.trap("Timetable entry does not exist") };
      case (?entry) { entry };
    };
  };

  public query ({ caller }) func getAllTimetableEntries() : async [TimetableEntry] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view timetable");
    };

    timetableEntries.values().toArray().sort();
  };

  // Announcement Management
  public shared ({ caller }) func createAnnouncement(title : Text, content : Text, date : Time.Time, targetAudience : [Text]) : async AnnouncementId {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admin can create announcements");
    };

    announcementCounter += 1;
    let id = announcementCounter;
    let announcement : Announcement = {
      id;
      title;
      content;
      date;
      targetAudience;
    };
    announcements.add(id, announcement);
    id;
  };

  public query ({ caller }) func getAnnouncement(id : AnnouncementId) : async Announcement {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view announcements");
    };

    switch (announcements.get(id)) {
      case (null) { Runtime.trap("Announcement does not exist") };
      case (?announcement) { announcement };
    };
  };

  public query ({ caller }) func getAllAnnouncements() : async [Announcement] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view announcements");
    };

    announcements.values().toArray().sort();
  };

  // Grades Management
  public shared ({ caller }) func recordGrade(studentId : StudentId, subjectId : SubjectId, examId : ExamId, marksObtained : Nat, totalMarks : Nat) : async GradeId {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can record grades");
    };

    // Only admins and teachers can record grades
    if (not AccessControl.isAdmin(accessControlState, caller) and not isTeacher(caller)) {
      Runtime.trap("Unauthorized: Only admins and teachers can record grades");
    };

    gradeCounter += 1;
    let id = gradeCounter;
    let percentage = (marksObtained * 100) / totalMarks;
    let grade : Grade = {
      id;
      studentId;
      subjectId;
      examId;
      marksObtained;
      totalMarks;
      percentage;
    };
    grades.add(id, grade);
    id;
  };

  public query ({ caller }) func getGrade(id : GradeId) : async Grade {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view grades");
    };

    switch (grades.get(id)) {
      case (null) { Runtime.trap("Grade does not exist") };
      case (?grade) {
        // Students can only view their own grades
        if (not AccessControl.isAdmin(accessControlState, caller) and not isTeacher(caller)) {
          switch (getStudentIdByPrincipal(caller)) {
            case (?studentId) {
              if (grade.studentId != studentId) {
                Runtime.trap("Unauthorized: Students can only view their own grades");
              };
            };
            case null {
              Runtime.trap("Unauthorized: Only students, teachers, and admins can view grades");
            };
          };
        };
        grade;
      };
    };
  };

  public query ({ caller }) func getAllGrades() : async [Grade] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view grades");
    };

    // Only admins and teachers can view all grades
    if (not AccessControl.isAdmin(accessControlState, caller) and not isTeacher(caller)) {
      Runtime.trap("Unauthorized: Only admins and teachers can view all grades");
    };

    grades.values().toArray().sort();
  };

  // New Public Functions

  // Get student by principal
  public query ({ caller }) func getMyStudentProfile() : async ?Student {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view student profiles");
    };
    students.values().find(func(student) { student.userId == caller });
  };

  // Get grades for current principal's student id
  public query ({ caller }) func getMyGrades() : async [Grade] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view grades");
    };
    let myStudent = students.values().find(func(student) { student.userId == caller });
    switch (myStudent) {
      case (null) {
        [];
      };
      case (?student) {
        grades.values().filter(func(grade) { grade.studentId == student.id }).toArray();
      };
    };
  };

  // Get attendance records for current principal's student id
  public query ({ caller }) func getMyAttendance() : async [Attendance] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can view attendance");
    };
    let myStudent = students.values().find(func(student) { student.userId == caller });
    switch (myStudent) {
      case (null) {
        [];
      };
      case (?student) {
        attendanceRecords.values().filter(func(attendance) { attendance.studentId == student.id }).toArray();
      };
    };
  };

  // ─── Stripe ──────────────────────────────────────────────────────────────────
  stable var stripeSecretKey : Text = "";
  stable var stripeAllowedCountries : [Text] = ["US", "IN", "GB", "CA", "AU"];

  public query func isStripeConfigured() : async Bool {
    stripeSecretKey != ""
  };

  public shared ({ caller }) func setStripeConfiguration(config : { secretKey : Text; allowedCountries : [Text] }) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can configure Stripe");
    };
    stripeSecretKey := config.secretKey;
    stripeAllowedCountries := config.allowedCountries;
  };

  public type ShoppingItem = StripeModule.ShoppingItem;

  public shared ({ caller }) func createCheckoutSession(items : [ShoppingItem], successUrl : Text, cancelUrl : Text) : async Text {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can create checkout sessions");
    };
    if (stripeSecretKey == "") {
      Runtime.trap("Stripe is not configured");
    };
    let config : StripeModule.StripeConfiguration = {
      secretKey = stripeSecretKey;
      allowedCountries = stripeAllowedCountries;
    };
    await StripeModule.createCheckoutSession(config, caller, items, successUrl, cancelUrl, transform);
  };

  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input)
  };

};
