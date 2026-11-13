import { useState } from 'react'
import './App.css'
import Abour from './Component/Abour'
import Authform from './Component/Authform'
import Contact from './Component/Contact'
import Footer from './Component/Footer'
import Header from './Component/Header'
import Projects from './Component/Projects'
import Testimonials from './Component/Testimonials'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
function App() {
  const [form , setForm] = useState(false)
  
  return (
    <div>
      <ToastContainer />
      <Header setForm={setForm} />
      {form && <Authform setForm={setForm} />}
      <Abour />
      <Projects />
      <Testimonials />
      <Contact />
      <Footer/>
    </div>
  )
}

export default App
