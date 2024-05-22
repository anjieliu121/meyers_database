import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "../css/App.css";
import "../css/EmailForm.css";

import emails from '../static/lab_emails.json';


export const ShareData = () => {
  const form = useRef();

  // for email validation
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);




  const sendEmail = (e) => {
    e.preventDefault();
    const serviceId = 'service_egebp1b';
    const templateId = 'template_g1rd0sb';
    const publicKey = 'fD2ggtXRbcEzUbXND';

    // for email validation
    if (!emails.email.includes(email)) {
      setIsValidEmail(false);
      return;
    }

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

  // for email validation
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setIsValidEmail(true); // Reset the error message when the user starts typing
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

              <input type="email" name="from_email" placeholder="Your Email" className="form-input" value={email}
                     pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" required onChange={handleEmailChange}/>

              {!isValidEmail && <p style={{ color: 'red' }}>Email not found in the allowed list.</p>}

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

              <select className="form-select" aria-label="Default select example" name="lab_position">
                  <option selected>Select your position in Meyers Lab</option>
                  <option value="principal_investigator">Principal Investigator</option>
                  <option value="postdocs_researchers">Postdocs and Researchers</option>
                  <option value="graduate">Graduate Students</option>
                  <option value="undergraduate">Undergraduate Students</option>
              </select>


              <button type="submit">Send Email <img src="src/static/SubmitBtnArrow.png"/></button>
          </form>
          <div className="form-right">
              <img src="src/components/MeyersLabLogo.png"/>
          </div>
      </div>
  );
};

export default ShareData;
