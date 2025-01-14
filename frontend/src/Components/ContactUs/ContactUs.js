import Nav from '../Nav/Nav'
import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
function ContactUs() {
    const form = useRef();

    const sendEmail = (e) => {
      e.preventDefault();
  
      emailjs
        .sendForm(
            'service_xyii7j4',
            'template_qvqpdcs', 
            form.current, {
            publicKey: 
           'HcnjWTyMfQlAVMmVf',
        })
        .then(
          () => {
            console.log('SUCCESS!');
            alert('Email sent successfully');
          },
          (error) => {
            console.log('FAILED...', error.text);
            alert('Email failed to send');
          },
        );
    };
  return (
    <div>
        <Nav/>
      <h1>Contact Us</h1>
      <form ref={form} onSubmit={sendEmail}>
        <label>Name</label><br></br>
        <input type="text" name="user_name" /><br></br><br></br>
        <label>Email</label><br></br>
        <input type="email" name="user_email" /><br></br><br></br>
        <label>Message</label><br></br>
        <textarea name="message" /><br></br><br></br>
        <input type="submit" value="Send" />
    </form>
    </div>
  );
}

export default ContactUs
