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

app.get("/appointments", (req, res) => {
    const doctorId = req.query.doctorId;
    // expected date format YYYY-MM-DD
    const date = req.query.date;

    const dateTimestamp = new Date(date).getTime();
    const nextDateTimestamp = dateTimestamp + (60 * 60 * 24 * 1000);
  
    const filteredAppointments = appointments.filter(a => {
      return a.doctorId == doctorId &&
        a.dateTime >= dateTimestamp && a.dateTime < nextDateTimestamp;
    });
  
    res.send(filteredAppointments);
});

app.post("/appointments/new", (req, res) => {
    const patientFirstName = req.query.patientFirstName;
    const patientLastName = req.query.patientLastName;
    // expected date format YYYY-MM-DD
    const date = req.query.date;
    // expected time formate HH:MM (24 hour/military time)
    const time = req.query.time;
    const kind = req.query.kind;
    const doctorId = req.query.doctorId;

    const is15MinuteInterval = !(parseInt(time.split(":")[1]) % 15);
    const dateInt = new Date(date + "T" + time).getTime();
    const existingAppointmentCount = appointments.filter(a => {
      return a.doctorId == doctorId && a.dateTime === dateInt;
    }).length;

    if (is15MinuteInterval && existingAppointmentCount <= 2) {
      const appointment = {
        appointmentId: appointments.length,
        patientFirstName,
        patientLastName,
        dateTime: dateInt,
        kind,
        doctorId
      }
      appointments.push(appointment);
    
      console.log("appointmet", appointment);
      res.send("Created appointment");
    } else {
      res.send("Problem creating new appointment"); 
    }
});

app.delete("/appointments/:appointmentId", (req, res) => {
    const appointmentIndex = appointments.findIndex(a => a.appointmentId === req.params.appointmentId);
    appointments.splice(appointmentIndex, 1);
  
    console.log("appointments:", appointments);
    res.send("Deleted appointment");
});

app.listen(3000,()=>{
    console.log("App is listening on Port 3000");
});