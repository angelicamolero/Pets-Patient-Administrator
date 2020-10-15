import React, { Fragment, useState } from 'react';
import uuid from 'uuid/v4';
import PropTypes from 'prop-types';

const Form = ({createAppointment}) => {

    const [appoinment, updateAppointment] = useState({
        pet: '',
        owner:'',
        date:'',
        hour:'',
        symptoms:''
    });

    const [ error, updateError ] = useState(false); 

    // functions that runs when the user types in an input
    const handleChange = e => {
        updateAppointment({
            ...appoinment,
            [e.target.name] : e.target.value
        })
    }

    //obtain the values
    const { pet, owner, date, hour, symptoms } = appoinment;

    //When the user press the schedule button
    const submitAppointment = e => {
        e.preventDefault();

        //Validate
        if(pet.trim() === '' || owner.trim() === '' || date.trim() === '' || hour.trim() === '' || symptoms.trim() === ''){
            updateError(true);
            return;
        }
        //Remove error message
        updateError(false);
        //Asign ID
        appoinment.id = uuid();

        //Create Appoinment
        createAppointment(appoinment);

        //Reboot form
        updateAppointment({
        pet: '',
        owner:'',
        date:'',
        hour:'',
        symptoms:''
        });
    }

    return (
        <Fragment>
            <h2>Create Appointment</h2>
                { error ? <p className="alerta-error">Todos los campos son obligatorios</p> : null }
            <form
                onSubmit={submitAppointment}
            >
                <label>Pet's Name</label>
                <input 
                type="text"
                name="pet"
                className="u-full-width"
                placeholder="Pet's Name"
                onChange={handleChange}
                value={pet}
                />
                <label>Pet's Owner Name</label>
                <input 
                type="text"
                name="owner"
                className="u-full-width"
                placeholder="Pet's Owner Name"
                onChange={handleChange}
                value={owner}
                />
                <label>Date</label>
                <input 
                type="date"
                name="date"
                className="u-full-width"
                onChange={handleChange}
                value={date}
                />
                <label>Time</label>
                <input 
                type="time"
                name="hour"
                className="u-full-width"
                onChange={handleChange}
                value={hour}
                />
                <label>Symptoms</label>
                <textarea
                className="u-full-width"
                name="symptoms"
                onChange={handleChange}
                value={symptoms}
                ></textarea>
                <button
                type="submit"
                className="u-full-width button-primary"
                >Schedule</button>
            </form>
        </Fragment>
    );
}

Form.propTypes = {
    createAppointment: PropTypes.func.isRequired
}

export default Form;