const facultyRes = require("./faculty_resolver");
const pulpitRes = require("./pulpit_resolver");
const subjectRes = require("./subject_resolver");
const teacherRes = require("./teacher_resolver");

const resolvers = {
  Query: {
    faculty: facultyRes.faculty,
    pulpit: pulpitRes.pulpit,
    subject: subjectRes.subject,
    teacher: teacherRes.teacher,
    getTeachersByFaculty: teacherRes.getTeachersByFaculty,
    getSubjectsByFaculty: subjectRes.getSubjectsByFaculty,
  },
  Mutation: {
    setFaculty: facultyRes.setFaculty,
    setPulpit: pulpitRes.setPulpit,
    setSubject: subjectRes.setSubject,
    setTeacher: teacherRes.setTeacher,
    delFaculty: facultyRes.delFaculty,
    delPulpit: pulpitRes.delPulpit,
    delSubject: subjectRes.delSubject,
    delTeacher: teacherRes.delTeacher,
  },
};

module.exports = resolvers;
