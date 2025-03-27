const facultyRep = require("../repositories/faculty_repository");

module.exports = {
  faculty: async (_, { id }) => {
    if (id) {
      const faculty = await facultyRep.getById(id);

      if (!faculty) return [];

      return [faculty];
    } else {
      const faculties = await facultyRep.getAll();

      return faculties;
    }
  },
  setFaculty: async (_, { id, faculty_name }) => {
    const faculty = await facultyRep.getById(id);

    if (faculty == null) {
      const newFaculty = await facultyRep.add({
        faculty: id,
        faculty_name: faculty_name,
      });

      return newFaculty;
    } else {
      const updFaculty = await facultyRep.update({
        faculty: id,
        faculty_name: faculty_name,
      });

      return updFaculty;
    }
  },
  delFaculty: async (_, { id }) => {
    const deletedFaculty = await facultyRep.delete(id);

    return deletedFaculty != null;
  },
};
