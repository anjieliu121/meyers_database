import React, { useState } from 'react'
import emailjs from '@emailjs/browser';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "../css/App.css";
import "../css/EmailForm.css";


const EmailForm = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Your EmailJS service ID, template ID, and Public Key
    const serviceId = 'service_egebp1b';
    const templateId = 'template_g1rd0sb';
    const publicKey = 'fD2ggtXRbcEzUbXND';

    // Create a new object that contains dynamic template params
    const templateParams = {
      from_name: name,
      from_email: email,
      to_name: 'Web Wizard',
      message: message,
    };

    // Send the email using EmailJS
    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        console.log('Email sent successfully!', response);
        setName('');
        setEmail('');
        setMessage('');
      })
      .catch((error) => {
        console.error('Error sending email:', error);
      });
  }

  return (
      <div className="form-container form-background">
          <form onSubmit={handleSubmit} className='emailForm form-left'>
              <div>
                  <h1 className="form-title">Share Datasets</h1>
                  <hr className="form-hr"/>
              </div>

              <input
                  className="form-input"
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
              />
              <input
                  className="form-input"
                  type="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
              />
              <textarea
                  className="form-input"
                  cols="30"
                  rows="10"
                  placeholder="Source link of data and any comments you have."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
              >
              </textarea>
              <button type="submit">Send Email <img src="src/static/SubmitBtnArrow.png"/></button>
          </form>
          <div className="form-right">
            <img src="src/static/MeyersLabLogo.png" />
          </div>
      </div>

  )
}

export default EmailForm