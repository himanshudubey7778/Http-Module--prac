const mysql = require("mysql2");

// Connection configuration
const connection = mysql.createConnection({
    host: "127.0.0.1", // "localhost" ki jagah ye use karna safe hai
    user: "root",
    password: "Hanuman@19", // Make sure it is exactly like this
    database: "classdb"
});

connection.connect((err) => {
    if (err) {
        console.error("Error connecting to MySQL: ", err);
        return;
    }
    console.log("Connected to MySQL successfully!");

    // 1. Create table (students - Plural)
    connection.query(`
        CREATE TABLE IF NOT EXISTS students (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(30),
        email VARCHAR(100),
        age INT)`, (err) => {
        if (err) throw err;
        console.log("Table Checked/Created");

        // 2. Insert Data (Table name correct kiya: students)
        const insertQuery = `INSERT INTO students (name, email, age) VALUES 
                             ('himanshu', 'himanshu@gmail.com', 28),
                             ('Aman', 'aman@gmail.com', 32),
                             ('Divyansh', 'divyansh@gmail.com', 44)`;

        connection.query(insertQuery, (err) => {
            if (err) {
                console.log("Data might already exist or Error: ", err.message);
            } else {
                console.log("DATA Inserted");
            }

            // 3. Retrieve Data
            connection.query('SELECT * FROM students', (err, data) => {
                if (err) throw err;
                console.log("Current Data in Database:");
                console.table(data); // Table format me dabdaba dikhega!

                // 4. Update Data (Himanshu ki age 35 karni hai)
                connection.query('UPDATE students SET age = ? WHERE name = ?', [35, 'himanshu'], (err) => {
                    if (err) throw err;
                    console.log("Data Updated: Himanshu's age is now 35");

                    // 5. Final Retrieve to show updated data
                    connection.query('SELECT * FROM students', (err, updatedData) => {
                        if (err) throw err;
                        console.log("Updated Data:");
                        console.table(updatedData);

                        // Connection Close karna zaroori hai
                        connection.end();
                        console.log("Connection closed.");
                    });
                });
            });
        });
    });
});