const express = require("express");
const app = express();
const doctors = require("./doctors.json");
const appointments = require("./appointments.json");

app.get("/", (req, res) => {
    res.send("Doctor's appointment web app");
});

app.get("/doctors/:doctorId", (req, res) => {
    const doctor = doctors.find(d => d.doctorId == req.params.doctorId);
    console.log("doctor:",doctor);
    res.send(doctor);
});

app.get("/appointments/:appointmentId", (req, res) => {
    const appointment = appointments.find(a => a.appointmentId == req.params.appointmentId);
    console.log("appointment:",appointment);
    res.send(appointment);
});

app.listen(3000,()=>{
    console.log("App is listening on Port 3000");
});