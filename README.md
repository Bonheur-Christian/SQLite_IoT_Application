MQTT Weather Station

This project is a real-time weather station that uses MQTT to receive temperature and humidity data. The data is displayed in a web interface with a real-time chart that updates every 5 minutes with averaged values.

Features

  Real-Time Data Display:
  
    . Displays real-time temperature and humidity values received via MQTT.
  
  Averaged Data Chart:
  
    . Visualizes the average temperature and humidity over the last 5 minutes using a dynamic chart.
  
  MQTT Integration:
  
    . Connects to an MQTT broker to subscribe to temperature, humidity, and averaged data topics.
  
  SQLite Database:
  
    . Stores historical temperature and humidity data for future analysis.

Technologies Used:

  Frontend:
  
    1. HTML, CSS, JavaScript
    2. Chart.js for real-time charting
    3. MQTT.js for MQTT communication
  
  Backend:
  
    1. Node.js with Express
    2. SQLite for data storage
    3. MQTT for real-time data communication

Prerequisites

Before running the project, ensure you have the following installed:

    a. Node.js (v14 or higher)
    b. SQLite3 (for the database)
    c. An MQTT broker 

Setup Instreuctions

1. Clone repository

   commands to use:
   
       git clone https://github.com/Bonheur-Christian/SQLite_IoT_Application.git
       cd SQLite_IoT_Application

3. Install Dependencies
   
       npm i express sqlite3 mqtt  

5. Set Up database
   
     The SQLite database will be created automatically when the server starts. Ensure the database file is writable by the application.


Finally configure MQTT Broker and then Run server: 

Commands:  

    const mqttClient = mqtt.connect('ws://your-mqtt-broker-address:9001');
    node server.js

Project structure

SQLite_IoT_Application/
├──view/
│   └── index.html          
├── server.js              
├── weather.db             
├── README.md               
└── package.json           





  
