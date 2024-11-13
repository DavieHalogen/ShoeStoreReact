const db = require('../config/db'); // Your database connection

class Activity {
    // Method to get recent activities
    static async findRecent(limit) {
        const [results] = await db.query('SELECT * FROM activities ORDER BY createdAt DESC LIMIT ?', [limit]);
        return results;
    }
}

module.exports = Activity;