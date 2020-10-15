import React, { Fragment, useState, useEffect } from 'react';
import Form from './components/Form';
import Appointment from './components/Appointment';


function App() {

  //Appointments in localstorage
  let initialAppointments = JSON.parse(localStorage.getItem('appointments'));
  if(!initialAppointments) {
    initialAppointments = [];
  }

  //List of Appoinments
  const [ appointments, saveAppoinments ] = useState([]);

  //Use Effect to do some operations when the state changes
  useEffect( () => {
    let initialAppointments = JSON.parse(localStorage.getItem('appointments'));
   if(initialAppointments){
     localStorage.setItem('appointments', JSON.stringify(appointments))
   } else {
     localStorage.setItem('appointments', JSON.stringify([]));
   }
  }, [appointments] );

  //Function that takes the existing appoinments and add a new one
  const createAppointment = appointment => {
      saveAppoinments([
        ...appointments,
        appointment
      ])
  }

  //Function that removes an appoinment per id
  const removeAppointment = id => {
    const newAppointment = appointments.filter(appointment => appointment.id !== id)
    saveAppoinments(newAppointment);
  }

  //Conditional message
  const title = appointments.length === 0 ? 'No Appoinments' : 'Manage Appointments';

  return (
    <Fragment>
    <h1>Patient's Administrator</h1>
    <div className="container">
        <div className="row">
            <div className="one-half column">
              <Form
              createAppointment = {createAppointment}
              />
            </div>
            <div className="one-half column">
                <h2>{title}</h2>
                { appointments.map(appointment => (
                  <Appointment
                  key = {appointment.id}
                  appointment={appointment}
                  removeAppointment = {removeAppointment}
                  />
                ))}
            </div>
        </div>
    </div>
    </Fragment>
  );
}

export default App;
