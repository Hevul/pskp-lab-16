const pool = require("../utils/db");

module.exports = {
  getAll: async () => {
    const query = "SELECT * FROM SUBJECT";

    const [rows] = await pool.execute(query);

    const subjects = rows.map((s) => {
      return {
        subject: s.SUBJECT,
        subject_name: s.SUBJECT_NAME,
        pulpit: s.PULPIT,
      };
    });

    return subjects;
  },
  getById: async (id) => {
    const query = `SELECT * FROM SUBJECT
                    WHERE SUBJECT = ?`;

    const [rows] = await pool.execute(query, [id]);

    if (rows[0] == null) return null;

    const subject = {
      subject: rows[0].SUBJECT,
      subject_name: rows[0].SUBJECT_NAME,
      pulpit: rows[0].PULPIT,
    };

    return subject;
  },
  add: async (data) => {
    const { subject, subject_name, pulpit } = data;

    const query = `INSERT INTO SUBJECT (SUBJECT, SUBJECT_NAME, PULPIT)
                    VALUES (?, ?, ?)`;

    await pool.execute(query, [subject, subject_name, pulpit]);

    return data;
  },
  update: async (data) => {
    const { subject, subject_name, pulpit } = data;

    const query = `UPDATE SUBJECT
                    SET SUBJECT_NAME = ?,
                        PULPIT = ?
                    WHERE SUBJECT = ?;`;

    const [result] = await pool.execute(query, [subject_name, pulpit, subject]);

    return result.affectedRows > 0 ? data : null;
  },
  delete: async (id) => {
    const selectQuery = `SELECT * FROM SUBJECT WHERE SUBJECT = ?`;
    const deleteQuery = `DELETE FROM SUBJECT WHERE SUBJECT = ?`;

    const [rows] = await pool.execute(selectQuery, [id]);

    if (rows.length === 0) return null;

    await pool.execute(deleteQuery, [id]);

    const subject = {
      subject: rows[0].SUBJECT,
      subject_name: rows[0].SUBJECT_NAME,
      pulpit: rows[0].PULPIT,
    };

    return subject;
  },
};
