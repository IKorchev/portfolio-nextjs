import { useState } from "react"

const Contact = () => {
  const [nameInput, setNameInput] = useState("")
  const [emailInput, setEmailInput] = useState("")
  const [textInput, setTextInput] = useState("")

  return (
    <div className='container px-5 mx-auto text-white' id='contact'>
      <h1 className='text-5xl bg-gray-300'>contact</h1>
      <form className='w-full lg:w-96' action='/sent' method='post'>
        <fieldset className='border p-5 mt-12 '>
          <legend className='text-2xl text-white px-2'> Contact Form</legend>
          <div className='flex flex-col'>
            <label htmlFor='firstName'>Name</label>
            <input
              required
              value={nameInput}
              name='name'
              type='text'
              id='firstName'
              className='px-3 py-1 text-lg text-black'
              onChange={(e) => setNameInput(e.target.value)}
            />
          </div>
          <div className='flex flex-col mt-5'>
            <label htmlFor='lastName'>Email</label>
            <input
              required
              value={emailInput}
              name='email'
              type='text'
              id='lastName'
              className='px-3 py-1 text-lg text-black'
              onChange={(e) => setEmailInput(e.target.value)}
            />
          </div>
          <div className='flex flex-col mt-5'>
            <label htmlFor='textarea'>Message</label>
            <textarea
              required
              value={textInput}
              name='message'
              id='textarea'
              className='px-3 py-1 text-lg text-black'
              cols='50'
              rows='5'
              onChange={(e) => setTextInput(e.target.value)}
            />
          </div>
          <button
            className='cto-link bg-white border text-center w-full text-black mt-2 transition duration-300 hover:bg-transparent hover:text-white'
            type='submit'>
            SUBMIT
          </button>
        </fieldset>
      </form>
      <div>
        <h2>Links</h2>
        <div>
          <a href='https://github.com/IKorchev' target='_blank' rel='noreferrer'></a>
          <a
            href='https://www.linkedin.com/in/ivaylo-korchev-b87bba19b/'
            target='_blank'
            rel='noreferrer'></a>
          <a href='mailto:korchev94@gmail.com'></a>
        </div>
      </div>
    </div>
  )
}

export default Contact
