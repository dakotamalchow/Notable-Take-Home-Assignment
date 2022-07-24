const express = require("express");
const app = express();
const doctors = require("./doctors.json");
const appointments = require("./appointments.json");

app.get("/", (req, res) => {
    res.send("Doctor's appointment web app");
});

app.get("/doctors", (req, res) => {
    res.send(doctors);
});

app.get("/doctors/:doctorId", (req, res) => {
    const doctor = doctors.find(d => d.doctorId == req.params.doctorId);
    console.log("doctor:",doctor);
    res.send(doctor);
});

app.get("/appointments", (req, res) => {
    const doctorId = req.query.doctorId;
    //expected date format YYYY-MM-DD
    const date = req.query.date;

    const dateTimestamp = new Date(date).getTime();
    const nextDateTimestamp = dateTimestamp + (60 * 60 * 24 * 1000);
  
    const filteredAppointments = appointments.filter(a => {
      return a.doctorId == doctorId &&
        a.dateTime >= dateTimestamp && a.dateTime < nextDateTimestamp;
    });
  
    res.send(filteredAppointments);
});

app.get("/appointments/:appointmentId", (req, res) => {
    const appointment = appointments.find(a => a.appointmentId == req.params.appointmentId);
    console.log("appointment:",appointment);
    res.send(appointment);
});

app.listen(3000,()=>{
    console.log("App is listening on Port 3000");
});