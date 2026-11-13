import React, { useState } from 'react'
import { toast } from 'react-toastify';
const Authform = ({setForm}) => {
  const [signup, setSignUp] = useState(false);
   const [result, setResult] = useState("");
  
    const onSubmit = async (event) => {
      event.preventDefault();
      setResult("Sending....");
      const formData = new FormData(event.target);
      formData.append("access_key", "71f43d6f-837c-4aec-9080-981a955c8fbf");
  
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
  
      const data = await response.json();
      if (data.success) {
        setResult("");
       toast.success("Form submitted  ")
        event.target.reset();
      } else {
        console.log("Error", data)
        toast.error(data.message )
        setResult("");
      }
    };  
  return (
    <div className=' fixed  inset-0 bg-black/70  flex justify-center items-center '>
      <div className='w-87.5  bg-blue-950 p-6 rounded-lg shadowl-lg relative z-10 '>
        <button className='absolute top-2 right-3' onClick={() => setForm(false)}>X</button>
        {/* title */}
        <h2 className='text-center p-1 mb-2 text-xl text-white font-bold underline pb-1'>{signup ? "Create account" : "Login"}</h2>
        <form onSubmit={onSubmit}  className='flex flex-col gap-3'>
          {signup && (
            <input type="text" placeholder='Username' className='px-2 py-3  border rounded bg-gray-700  text-white'  required />
          )}
          <input type="email" className='px-2 py-3  border rounded bg-gray-700  text-white' placeholder='Enter Your Mail'required />
          <input type="password" className='px-2 py-3  border rounded bg-gray-700  text-white' placeholder='Enter Your Password'required />
          <button className='p-3 bg-blue-600 rounded ' type='submit'>Sign in</button>
          <p onClick={() => setSignUp(!signup)}   className='text-center text-blue-600 mt-3 cursor-pointer'>
           {signup ? "Already have an account? Login"
: "Don't have an account? Signup"}
          </p>
        </form>
      </div>
    </div>
  )
}

export default Authform
