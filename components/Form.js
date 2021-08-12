import { useState } from "react"
import Alert from "./Alert"
import { sendForm } from "../utils/sendForm"

const Form = () => {
  const [alertType, setAlertType] = useState("hidden")
  const [nameInput, setNameInput] = useState("")
  const [emailInput, setEmailInput] = useState("")
  const [textInput, setTextInput] = useState("")

  const sendMessage = async (e) => {
    e.preventDefault()
    const data = {
      email: emailInput,
      name: nameInput,
      text: textInput,
    }
    const alertStatus = await sendForm(data)
    setAlertType(alertStatus)
    setNameInput("")
    setEmailInput("")
    setTextInput("")
  }
  return (
    <form className='w-full md:w-2/3 lg:w-2/4 xl:w-1/3 mx-auto' onSubmit={sendMessage}>
      <div className=' border p-5 mt-12 bg-trueGray-800'>
        <h3 className='text-3xl mb-5 text-center'>Contact form</h3>
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
          <span className='text-gray-200 text-sm'>required field</span>
        </div>
        <div className='flex flex-col mt-3'>
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
          <span className='text-gray-200 text-sm'>required field</span>
        </div>
        <div className='flex flex-col mt-3'>
          <label htmlFor='textarea'>Message</label>
          <textarea
            required
            value={textInput}
            name='message'
            id='textarea'
            className='px-3 py-1 text-lg text-black'
            rows='5'
            onChange={(e) => setTextInput(e.target.value)}
          />
        </div>

        <button
          className='cto-link bg-white border text-center w-full text-black mt-2 transition duration-300 hover:bg-transparent hover:text-white'
          type='submit'>
          SUBMIT
        </button>
        <Alert type={alertType} />
      </div>
    </form>
  )
}

export default Form
