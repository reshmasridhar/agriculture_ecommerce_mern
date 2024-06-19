import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import './ContactUs.css'; // Import CSS file for styling

export const ContactUs = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_4gx3dvr', 'template_tin5tnw', form.current, {
        publicKey: 'HyPVjFjI1qCt7yLeK',
      })
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };

  return (
    <div className="contact-container">
      <h2>Your feedback counts! Got queries? let us know</h2>
      <form ref={form} onSubmit={sendEmail}>
        <label>Name</label>
        <input type="text" name="user_name" />
        <label>Email</label>
        <input type="email" name="user_email" />
        <label>Feedback/queries</label>
        <textarea name="message" />
        <input type="submit" value="Send" />
      </form>
     
    </div>
  );
};
