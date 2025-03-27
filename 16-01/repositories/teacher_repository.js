const pool = require("../utils/db");

module.exports = {
  getAll: async () => {
    const query = "SELECT * FROM TEACHER";

    const [rows] = await pool.execute(query);

    const teachers = rows.map((r) => {
      return {
        teacher: r.TEACHER,
        teacher_name: r.TEACHER_NAME,
        pulpit: r.PULPIT,
      };
    });

    return teachers;
  },
  getById: async (id) => {
    const query = `SELECT * FROM TEACHER
                    WHERE TEACHER = ?`;

    const [rows] = await pool.execute(query, [id]);

    if (rows[0] == null) return null;

    const teacher = {
      teacher: rows[0].TEACHER,
      teacher_name: rows[0].TEACHER_NAME,
      pulpit: rows[0].PULPIT,
    };

    return teacher;
  },
  add: async (data) => {
    const { teacher, teacher_name, pulpit } = data;

    const query = `INSERT INTO TEACHER (TEACHER, TEACHER_NAME, PULPIT)
                    VALUES (?, ?, ?)`;

    await pool.execute(query, [teacher, teacher_name, pulpit]);

    return data;
  },
  update: async (data) => {
    const { teacher, teacher_name, pulpit } = data;

    const query = `UPDATE TEACHER
                    SET TEACHER_NAME = ?,
                        PULPIT = ?
                    WHERE TEACHER = ?;`;

    const [result] = await pool.execute(query, [teacher_name, pulpit, teacher]);

    return result.affectedRows > 0 ? data : null;
  },
  delete: async (id) => {
    const selectQuery = `SELECT * FROM TEACHER WHERE TEACHER = ?`;
    const deleteQuery = `DELETE FROM TEACHER WHERE TEACHER = ?`;

    const [rows] = await pool.execute(selectQuery, [id]);

    if (rows.length === 0) return null;

    await pool.execute(deleteQuery, [id]);

    const teacher = {
      teacher: rows[0].TEACHER,
      teacher_name: rows[0].TEACHER_NAME,
      pulpit: rows[0].PULPIT,
    };

    return teacher;
  },
};
