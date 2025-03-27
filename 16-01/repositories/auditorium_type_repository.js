const pool = require("../utils/db");

module.exports = {
  getAll: async () => {
    const query = "SELECT * FROM AUDITORIUM_TYPE";

    const [rows] = await pool.execute(query);

    return rows;
  },
  add: async (data) => {
    const query = `INSERT INTO AUDITORIUM_TYPE
                    VALUES (?, ?)`;

    await pool.execute(query, [data.AUDITORIUM_TYPE, data.AUDITORIUM_TYPENAME]);

    return data;
  },
  update: async (data) => {
    const query = `UPDATE AUDITORIUM_TYPE
                    SET AUDITORIUM_TYPENAME = ?
                    WHERE AUDITORIUM_TYPE = ?;`;

    const [result] = await pool.execute(query, [
      data.AUDITORIUM_TYPENAME,
      data.AUDITORIUM_TYPE,
    ]);

    return result.affectedRows > 0 ? data : null;
  },
  delete: async (id) => {
    const selectQuery = `SELECT * FROM AUDITORIUM_TYPE WHERE AUDITORIUM_TYPE = ?`;
    const deleteQuery = `DELETE FROM AUDITORIUM_TYPE WHERE AUDITORIUM_TYPE = ?`;

    const [rows] = await pool.execute(selectQuery, [id]);

    if (rows.length === 0) return null;

    await pool.execute(deleteQuery, [id]);

    return rows[0];
  },
};
