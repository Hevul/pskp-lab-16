const teacherRep = require("../repositories/teacher_repository");
const pulpitRep = require("../repositories/pulpit_repository");
const facultyRep = require("../repositories/faculty_repository");
const { faculty } = require("./faculty_resolver");

module.exports = {
  teacher: async (_, { id }) => {
    if (id) {
      const teacher = await teacherRep.getById(id);

      if (!teacher) return [];

      teacher.pulpit = await pulpitRep.getById(teacher.pulpit);

      teacher.pulpit.faculty = await facultyRep.getById(teacher.pulpit.faculty);

      return [teacher];
    } else {
      const res = await teacherRep.getAll();

      const teachers = await Promise.all(
        res.map(async (t) => {
          t.pulpit = await pulpitRep.getById(t.pulpit);

          t.pulpit.faculty = await facultyRep.getById(t.pulpit.faculty);

          return t;
        })
      );

      return teachers;
    }
  },
  setTeacher: async (_, { id, teacher_name, pulpit }) => {
    const teacher = await teacherRep.getById(id);

    if (teacher == null) {
      const newTeacher = await teacherRep.add({
        teacher: id,
        teacher_name: teacher_name,
        pulpit: pulpit,
      });

      newTeacher.pulpit = await pulpitRep.getById(newTeacher.pulpit);

      newTeacher.pulpit.faculty = await facultyRep.getById(
        newTeacher.pulpit.faculty
      );

      return newTeacher;
    } else {
      const updTeacher = await teacherRep.update({
        teacher: id,
        teacher_name: teacher_name,
        pulpit: pulpit,
      });

      updTeacher.pulpit = await pulpitRep.getById(updTeacher.pulpit);

      updTeacher.pulpit.faculty = await facultyRep.getById(
        updTeacher.pulpit.faculty
      );

      return updTeacher;
    }
  },
  delTeacher: async (_, { id }) => {
    const deletedTeacher = await teacherRep.delete(id);

    return deletedTeacher != null;
  },
  getTeachersByFaculty: async (_, { faculty }) => {
    const res = await teacherRep.getAll();

    let teachers = await Promise.all(
      res.map(async (t) => {
        t.pulpit = await pulpitRep.getById(t.pulpit);

        t.pulpit.faculty = await facultyRep.getById(t.pulpit.faculty);

        return t;
      })
    );

    teachers = teachers.filter((t) => t.pulpit.faculty.faculty === faculty);

    return teachers;
  },
};
