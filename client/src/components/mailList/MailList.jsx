import "./mailList.css";
import { useState } from "react";

const MailList = () => {

  const [email, setEmail] = useState(''); // State to store email
  
  const handleSubmit = (e) => {  // Function to handle form submission
  e.preventDefault();
  // Send email here using an email sending service
  // Daca mai vrei si asta in plus, la final
  console.log('Email to send:', email); // Placeholder for sending email
  setEmail(''); // Clear email state after submission
  }

  return (

    <div className="mail">
    
      <h1 className="mailTitle">Save time, save money!</h1>   
    
      <span className="mailDesc">Sign up and we'll send the best deals to you</span>
      
      <div className="mailInputContainer">
    
    
        <form onSubmit={handleSubmit}>  {/* Wrap input and button in a form */}
          <input type="text" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} />  {/* Update state on change */}
          <button>Subscribe</button>
        </form>
    
    
      </div>
    
    
    </div>
    )
    
    }

export default MailList