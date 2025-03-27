const facultyRep = require("../repositories/faculty_repository");
const pulpitRep = require("../repositories/pulpit_repository");

module.exports = {
  pulpit: async (_, { id }) => {
    if (id) {
      const pulpit = await pulpitRep.getById(id);

      if (!pulpit) return [];

      pulpit.faculty = await facultyRep.getById(pulpit.faculty);

      return [pulpit];
    } else {
      const res = await pulpitRep.getAll();

      const pulpits = await Promise.all(
        res.map(async (p) => {
          p.faculty = await facultyRep.getById(p.faculty);

          return p;
        })
      );

      return pulpits;
    }
  },
  setPulpit: async (_, { id, pulpit_name, faculty }) => {
    const pulpit = await pulpitRep.getById(id);

    if (pulpit == null) {
      const newPulpit = await pulpitRep.add({
        pulpit: id,
        pulpit_name: pulpit_name,
        faculty: faculty,
      });

      newPulpit.faculty = await facultyRep.getById(newPulpit.faculty);

      return newPulpit;
    } else {
      const updPulpit = await pulpitRep.update({
        pulpit: id,
        pulpit_name: pulpit_name,
        faculty: faculty,
      });

      updPulpit.faculty = await facultyRep.getById(updPulpit.faculty);

      return updPulpit;
    }
  },
  delPulpit: async (_, { id }) => {
    const deletedPulpit = await pulpitRep.delete(id);

    return deletedPulpit != null;
  },
};
