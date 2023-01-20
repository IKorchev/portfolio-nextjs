'use client';

import { useState } from 'react';
import Alert from './Alert';

const sendForm = async (data) => {
  const response = await fetch('/api/send', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  const { status } = await response.json();
  return status;
};

const Form = () => {
  const [alertType, setAlertType] = useState('hidden');
  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [textInput, setTextInput] = useState('');

  const sendMessage = async (e) => {
    e.preventDefault();
    const data = {
      email: emailInput,
      name: nameInput,
      text: textInput,
    };
    (window.dataLayer || []).push({
      event: 'gtm.formSubmit',
      data: data,
    });
    const alertStatus = await sendForm(data);
    setAlertType(alertStatus);
    setNameInput('');
    setEmailInput('');
    setTextInput('');
  };
  return (
    <form
      className='max-w-[35rem] w-full p-3 mx-auto rounded-lg  my-10 xl:my-0'
      onSubmit={sendMessage}>
      <h3 className='text-3xl mb-5'>Contact me</h3>
      <div>
        <div className='flex  flex-col sm:flex-row gap-5'>
          <div className='flex flex-col flex-grow'>
            <label htmlFor='firstName'>Name *</label>
            <input
              required
              value={nameInput}
              name='name'
              type='text'
              id='firstName'
              placeholder='required'
              className='form-input rounded-lg'
              onChange={(e) => setNameInput(e.target.value)}
            />
          </div>
          <div className='flex flex-col flex-grow'>
            <label htmlFor='email'>Email *</label>
            <input
              required
              value={emailInput}
              placeholder='required'
              name='email'
              type='email'
              id='email'
              className='form-input'
              onChange={(e) => setEmailInput(e.target.value)}
            />
          </div>
        </div>
        <div className='flex flex-col mt-3'>
          <label htmlFor='textarea'>Message</label>
          <textarea
            required
            value={textInput}
            placeholder='How can I help?'
            name='message'
            id='textarea'
            className='form-input'
            rows='4'
            onChange={(e) => setTextInput(e.target.value)}
          />
        </div>
        <button
          className='form-input font-oswald rounded-sm font-bold bg-customyellow  text-center  text-black mt-5 transition duration-300 hover:bg-yellow-600 focus:bg-yellow-600  focus:ring-white'
          type='submit'>
          Send Message
        </button>
        <Alert type={alertType} />
      </div>
    </form>
  );
};

export default Form;
