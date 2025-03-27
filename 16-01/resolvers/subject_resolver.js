const subjectRep = require("../repositories/subject_repository");
const pulpitRep = require("../repositories/pulpit_repository");
const facultyRep = require("../repositories/faculty_repository");

module.exports = {
  subject: async (_, { id }) => {
    if (id) {
      const subject = await subjectRep.getById(id);

      if (!subject) return [];

      subject.pulpit = await pulpitRep.getById(subject.pulpit);

      subject.pulpit.faculty = await facultyRep.getById(subject.pulpit.faculty);

      return [subject];
    } else {
      let res = await subjectRep.getAll();

      const subjects = await Promise.all(
        res.map(async (s) => {
          s.pulpit = await pulpitRep.getById(s.pulpit);

          s.pulpit.faculty = await facultyRep.getById(s.pulpit.faculty);

          return s;
        })
      );

      return subjects;
    }
  },
  setSubject: async (_, { id, subject_name, pulpit }) => {
    const subject = await subjectRep.getById(id);

    if (subject == null) {
      const newSubject = await subjectRep.add({
        subject: id,
        subject_name: subject_name,
        pulpit: pulpit,
      });

      newSubject.pulpit = await pulpitRep.getById(newSubject.pulpit);

      newSubject.pulpit.faculty = await facultyRep.getById(
        newSubject.pulpit.faculty
      );

      return newSubject;
    } else {
      const updSubject = await subjectRep.update({
        subject: id,
        subject_name: subject_name,
        pulpit: pulpit,
      });

      updSubject.pulpit = await pulpitRep.getById(updSubject.pulpit);

      updSubject.pulpit.faculty = await facultyRep.getById(
        updSubject.pulpit.faculty
      );

      return updSubject;
    }
  },
  delSubject: async (_, { id }) => {
    const deletedSubject = await subjectRep.delete(id);

    return deletedSubject != null;
  },
  getSubjectsByFaculty: async (_, { faculty }) => {
    let res = await subjectRep.getAll();

    let subjects = await Promise.all(
      res.map(async (s) => {
        s.pulpit = await pulpitRep.getById(s.pulpit);

        s.pulpit.faculty = await facultyRep.getById(s.pulpit.faculty);

        return s;
      })
    );

    subjects = subjects.filter((s) => s.pulpit.faculty.faculty === faculty);

    return subjects;
  },
};
