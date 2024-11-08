import React from 'react'
import './style.css'
import axios from 'axios' /* communicates with the backend(server side) */

const Login = () => {

    /*handling inputs*/
    const [values, setValues] = useState({
        email: '',
        password: ''
    })

    /*backend handling function for the onSubmit() of the authentication values*/
    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post('http://localhost:3000/auth/adminlogin')
        .then(result => console.log (result))
        .catch(err => console.log (err))
    }
        
  return (
    <div  className='d-flex justify-content-center align-items-center vh-100 loginPage'>
        <div className='p-3 rounded w-25 border loginForm'>
       
           <h2 class='Login'><strong>Welcome Back</strong></h2>
     
            <form onSubmit={handleSubmit}> 

                <div>
                <label htmlFor="email"><strong>Email:</strong></label>
                    <input type="email" name='email' autoComplete='off' placeholder='Enter Email'
                    /*onChange() will save em while onSubmit as above submits the values*/  
                    onChange={(e) => setValues({...values, email : e.target.value})} className='form-control rounded-0'/>
                </div>
                <div>
                <label htmlFor="password"><strong>Password:</strong></label>
                    <input type="password" name='password' placeholder='Enter Password'
                     onChange={(e) => setValues({...values, password : e.target.value})} className='form-control rounded-0'/>
                </div>
                <button className='btn btn-success w-100 rounded-0 mb-2'>Log in</button>

            <div className='mb-1'> 
                <input type="checkbox" name="tick" id="tick" className='me-2'/>
                <label htmlFor="password">You agree with the Terms & Conditions</label>
            </div> 
            </form>

        </div>
    </div>
  )
}

export default Login