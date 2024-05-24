import React, { useState, useRef } from 'react';
import { useForm } from "react-hook-form";
import emailjs from '@emailjs/browser';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "../css/App.css";
import "../css/EmailForm.css";

import emails from '../static/lab_emails.json';


export const ShareData = () => {
  const form = useRef();
  // retrieve approved email list
  const emailEntries = emails.emails;




  const sendEmail = (e, data) => {
    e.preventDefault();
    const serviceId = 'service_egebp1b';
    const templateId = 'template_g1rd0sb';
    const publicKey = 'fD2ggtXRbcEzUbXND';



    emailjs
      .sendForm(serviceId, templateId, form.current, publicKey)
      .then(
        (result) => {
          console.log('SUCCESS!', result.text);
          alert("Data shared successfully. Thank you!");
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

              <select className="form-select" aria-label="Default select example" name="lab_position">
                  <option selected>Select your position in Meyers Lab</option>
                  <option value="principal_investigator">Principal Investigator</option>
                  <option value="postdocs_researchers">Postdocs and Researchers</option>
                  <option value="graduate">Graduate Students</option>
                  <option value="undergraduate">Undergraduate Students</option>
                  <option value="not_in_lab">I am not a part of Meyers Lab</option>
              </select>

              <input type="text" name="from_name" placeholder="Your Name" className="form-input" required/>

              <input type="text" name="from_eid" placeholder="Your EID" className="form-input" required/>


              <input type="email" name="from_email" placeholder="Your Email" className="form-input"
                     pattern="\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*" required />

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

              <textarea name="message" placeholder="Source link of data and any comments you have."
                        className="form-input" cols="30" rows="10"/>

              <input type="file" name="my_file"/>
              <button type="submit">Upload <img src="src/static/SubmitBtnArrow.png"/></button>
          </form>
          <div className="form-right">
              <img src="src/components/MeyersLabLogo.png"/>
          </div>
      </div>
  );
};

export default ShareData;