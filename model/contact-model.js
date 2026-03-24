const db = require('../config/db');

class Subscriber {
  static async create(email) {
    const sql = `
      INSERT INTO subscribers (email)
      VALUES (?)
    `;
    return db.execute(sql, [email]);
  }
}

module.exports = Subscriber;