import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import "../css/App.css";
import "../css/EmailForm.css";

export const EmailForm = () => {
  const form = useRef();


  const sendEmail = (e) => {
    e.preventDefault();
    const serviceId = 'service_egebp1b';
    const templateId = 'template_g1rd0sb';
    const publicKey = 'fD2ggtXRbcEzUbXND';

    emailjs
      .sendForm(serviceId, templateId, form.current, {
        publicKey: publicKey,
      })
      .then(
        () => {
          console.log('SUCCESS!');
          window.location.reload();
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };

  return (
      <div className="form-container form-background">
          <form encType="multipart/form-data" method="post" ref={form} onSubmit={sendEmail}
                className='emailForm form-left'>
              <div>
                  <h1 className="form-title">Share Datasets</h1>
                  <hr className="form-hr"/>
              </div>
              <input type="text" name="from_name" placeholder="Your Name" className="form-input" required/>

              <input type="text" name="from_eid" placeholder="Your EID" className="form-input" required/>

              <input type="email" name="from_email" placeholder="Your Email" className="form-input" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" required/>

              <textarea name="message" placeholder="Source link of data and any comments you have."
                        className="form-input" cols="30" rows="10"/>

              <input type="file" name="my_file"/>

              <select className="form-select" aria-label="Default select example" name="disease_type">
                  <option selected>Select disease type</option>
                  <option value="covid">COVID-19</option>
                  <option value="rsv">RSV</option>
                  <option value="bird">Bird Flu</option>
                  <option value="others">Others</option>
              </select>

              <select className="form-select" aria-label="Default select example" name="data_type">
                  <option selected>Select data type</option>
                  <option value="mobility">Mobility</option>
                  <option value="hospitalization">Hospitalization</option>
                  <option value="simulation">Simulation</option>
                  <option value="others">Others</option>
              </select>


              <button type="submit">Send Email <img src="src/static/SubmitBtnArrow.png"/></button>
          </form>
          <div className="form-right">
              <img src="src/components/MeyersLabLogo.png"/>
          </div>
      </div>
  );
};

export default EmailForm;
