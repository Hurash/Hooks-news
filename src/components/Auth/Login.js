import React from "react";
import useFormValidation from "./useFormValidation";
import validateLogin from "./validateLogin";
import firebase from "../firebase"


const INITIAL_STATE = {
name: "",
email: "",
password: "",

}

function Login(props) {
 const { handleSubmit,
      handleBlur, 
      handleChange, 
      values, 
      errors, 
      isSubmitting 
    } = useFormValidation( INITIAL_STATE, validateLogin, authenticateUser 
   );
 const[login, setLogin] = React.useState(true)

async function authenticateUser(){
const { name, email, password} = values
const response = login

? await firebase.login(email,password) 
: await firebase.register(name, email, password)
console.log({response}) 
} 


  return <div>
            <h2 className="mv3">{login ? "Login" : "Create Account"}</h2>
            <form onSubmit={handleSubmit}className="flex flex-column">
              {!login && ( 
               <input 
                onChange={handleChange}                
                value={values.name}
                name="name"
                type="text"
                placeholder="Your name"
                autoComplete="off"
              />)} 
              <input
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                name="email"
                type="email"
                className={errors.email && 'error-input'}
                placeholder="Your email"
                autoComplete="off"
              />
              {errors.email && <p className="error-text">{errors.email}</p>}
                <input
                onChange={handleChange}
                onBlur={handleBlur}
                name="password"
                value={values.password}
                className={errors.password && 'error-input'}
                type="Password"
                placeholder="Choose a secure password"               
              />
              {errors.password && <p className="error-text">{errors.password}</p>}
              <div className="flex mt3">
                <button type="submit" className="button ponter mr2" dissabled=
                {isSubmitting}>
                style={{ background: isSubmitting ? "grey" : "orange"}}  
                 submit
                </button>
                <button type="button" className="pointer button" onClick={ 
                () => setLogin(prevLogin => !prevLogin)} 
             
                >
                 {login ? "need to create an account" : "Already have an account?"} 
                </button>                
               </div>                
            </form>
         </div>;
}

export default Login;
