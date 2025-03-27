const pool = require("../utils/db");

module.exports = {
  getAll: async () => {
    const query = "SELECT * FROM AUDITORIUM";

    const [rows] = await pool.execute(query);

    return rows;
  },
  add: async (data) => {
    const query = `INSERT INTO AUDITORIUM
                    VALUES (?, ?, ?, ?)`;

    await pool.execute(query, [
      data.AUDITORIUM,
      data.AUDITORIUM_NAME,
      data.AUDITORIUM_CAPACITY,
      data.AUDITORIUM_TYPE,
    ]);

    return data;
  },
  update: async (data) => {
    const query = `UPDATE AUDITORIUM
                    SET AUDITORIUM_NAME = ?,
                        AUDITORIUM_CAPACITY = ?,
                        AUDITORIUM_TYPE = ?
                    WHERE AUDITORIUM = ?;`;

    const [result] = await pool.execute(query, [
      data.AUDITORIUM_NAME,
      data.AUDITORIUM_CAPACITY,
      data.AUDITORIUM_TYPE,
      data.AUDITORIUM,
    ]);

    return result.affectedRows > 0 ? data : null;
  },
  delete: async (id) => {
    const selectQuery = `SELECT * FROM AUDITORIUM WHERE AUDITORIUM = ?`;
    const deleteQuery = `DELETE FROM AUDITORIUM WHERE AUDITORIUM = ?`;

    const [rows] = await pool.execute(selectQuery, [id]);

    if (rows.length === 0) return null;

    await pool.execute(deleteQuery, [id]);

    return rows[0];
  },
};
