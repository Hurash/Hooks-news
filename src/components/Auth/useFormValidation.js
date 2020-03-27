import React from "react";

function useFormValidation(initialState, validate, authenticate) {
const [values, setValues] = React.useState(initialState);  
const [errors, setErrors] = React.useState({})
const [isSubmitting, setSubmitting ] = React.useState(false)

const authenticateCb = React.useCallback(() => authenticate, [authenticate]);

React.useEffect(() => {
if (isSubmitting) {   
 const noErrors = Object.keys(errors).length === 0;
 if (noErrors) {
  authenticateCb()     
  setSubmitting(false)    
 }  else {
    setSubmitting(false) 
 }
}
}, [errors, isSubmitting, authenticateCb])



function handleChange(event) {
 event.persist();   
 setValues(previousValues => ({
  ...previousValues,
  [event.target.name]: event.target.value
 }))   
}

function handleBlur() {
 const validationErrors = validate(values)
 setErrors(validationErrors)     
}

function handleSubmit(event) {
 event.prevent.Default();
 const validationErrors = validate(values)
 setErrors(validationErrors) 
 setSubmitting(true) 
 
}

return {handleSubmit, handleBlur, handleChange, values, errors, isSubmitting };
}

export default useFormValidation;
