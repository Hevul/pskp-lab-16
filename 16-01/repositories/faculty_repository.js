const pool = require("../utils/db");

module.exports = {
  getAll: async () => {
    const query = "SELECT * FROM FACULTY";

    const [rows] = await pool.execute(query);

    const faculties = rows.map((f) => {
      return { faculty: f.FACULTY, faculty_name: f.FACULTY_NAME };
    });

    return faculties;
  },
  getById: async (id) => {
    const query = `SELECT * FROM FACULTY
                    WHERE FACULTY = ?`;

    const [rows] = await pool.execute(query, [id]);

    if (rows[0] == null) return null;

    const faculty = {
      faculty: rows[0].FACULTY,
      faculty_name: rows[0].FACULTY_NAME,
    };

    return faculty;
  },
  add: async (data) => {
    const { faculty, faculty_name } = data;

    const query = `INSERT INTO FACULTY
                    VALUES (?, ?)`;

    await pool.execute(query, [faculty, faculty_name]);

    return data;
  },
  update: async (data) => {
    const { faculty, faculty_name } = data;

    const query = `UPDATE FACULTY
                    SET FACULTY_NAME = ?
                    WHERE FACULTY = ?;`;

    const [result] = await pool.execute(query, [faculty_name, faculty]);

    return result.affectedRows > 0 ? data : null;
  },
  delete: async (id) => {
    const selectQuery = `SELECT * FROM FACULTY WHERE FACULTY = ?`;
    const deleteQuery = `DELETE FROM FACULTY WHERE FACULTY = ?`;

    const [rows] = await pool.execute(selectQuery, [id]);

    if (rows.length === 0) return null;

    await pool.execute(deleteQuery, [id]);

    const faculty = {
      faculty: rows[0].FACULTY,
      faculty_name: rows[0].FACULTY_NAME,
    };

    return faculty;
  },
};
