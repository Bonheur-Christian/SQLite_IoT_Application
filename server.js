const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const mqtt = require('mqtt');
const path = require('path');

const app = express();
const port = 3000;

// Connect to SQLite database
const db = new sqlite3.Database('./weather.db', (err) => {
    if (err) console.error('Error opening database', err);
    console.log("connected to the weather database");
    

});

db.run(`CREATE TABLE IF NOT EXISTS weather_data (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    temperature REAL,
    humidity REAL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
)`);
// Connect to MQTT Broker
const mqttClient = mqtt.connect('ws://157.173.101.159:9001');

mqttClient.on('connect', () => {
    console.log("Connected to MQTT via WebSockets");
    mqttClient.subscribe("/work_group_01/room_temp/temperature");
    mqttClient.subscribe("/work_group_01/room_temp/humidity");
});

// Function to generate random temperature and humidity data
function generateTestData() {
    const temperature = (Math.random() * 40).toFixed(2); // Random temperature between 0 and 40 °C
    const humidity = (Math.random() * 100).toFixed(2); // Random humidity between 0 and 100 %
    return { temperature, humidity };
}

// Function to send anonymous test data to MQTT broker
function sendTestData() {
    const { temperature, humidity } = generateTestData();

    // Publish random temperature and humidity data to MQTT topics
    mqttClient.publish("/work_group_01/room_temp/temperature", temperature.toString());
    mqttClient.publish("/work_group_01/room_temp/humidity", humidity.toString());

    // Log the data to the console
    console.log(`Sent test data: Temperature = ${temperature} °C, Humidity = ${humidity} %`);
}

// Send test data every 5 seconds (for testing purposes)
setInterval(sendTestData, 5000);

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

app.get('/data', (req, res) => {
    db.all(`SELECT * FROM weather_data ORDER BY timestamp DESC LIMIT 100`, (err, rows) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(rows);
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});