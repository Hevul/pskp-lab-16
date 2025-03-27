const pool = require("../utils/db");

module.exports = {
  getAll: async () => {
    const query = "SELECT * FROM PULPIT";

    const [rows] = await pool.execute(query);

    const pulpits = rows.map((p) => {
      return {
        pulpit: p.PULPIT,
        pulpit_name: p.PULPIT_NAME,
        faculty: p.FACULTY,
      };
    });

    return pulpits;
  },
  getById: async (id) => {
    const query = `SELECT * FROM PULPIT
                    WHERE PULPIT = ?`;

    const [rows] = await pool.execute(query, [id]);

    if (rows[0] == null) return null;

    const pulpit = {
      pulpit: rows[0].PULPIT,
      pulpit_name: rows[0].PULPIT_NAME,
      faculty: rows[0].FACULTY,
    };

    return pulpit;
  },
  add: async (data) => {
    const { pulpit, pulpit_name, faculty } = data;

    const query = `INSERT INTO PULPIT (PULPIT, PULPIT_NAME, FACULTY)
                    VALUES (?, ?, ?)`;

    await pool.execute(query, [pulpit, pulpit_name, faculty]);

    return data;
  },
  update: async (data) => {
    const { pulpit, pulpit_name, faculty } = data;

    const query = `UPDATE PULPIT
                    SET PULPIT_NAME = ?,
                        FACULTY = ?
                    WHERE PULPIT = ?;`;

    const [result] = await pool.execute(query, [pulpit_name, faculty, pulpit]);

    return result.affectedRows > 0 ? data : null;
  },
  delete: async (id) => {
    const selectQuery = `SELECT * FROM PULPIT WHERE PULPIT = ?`;
    const deleteQuery = `DELETE FROM PULPIT WHERE PULPIT = ?`;

    const [rows] = await pool.execute(selectQuery, [id]);

    if (rows.length === 0) return null;

    await pool.execute(deleteQuery, [id]);

    const pulpit = {
      pulpit: rows[0].PULPIT,
      pulpit_name: rows[0].PULPIT_NAME,
      faculty: rows[0].FACULTY,
    };

    return pulpit;
  },
};
