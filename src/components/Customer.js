 
import {Form,Button} from 'react-bootstrap';
import { Link } from "react-router-dom";
import {useState} from 'react';
import Joi from 'joi';
import http from '../http-common';
 
import { toast } from 'react-toastify';
const Customer = (props) => {

  const [customerForm, setCustomerForm] = useState({
    first_name: '',
    last_name: '',
    email:'',
    phone: ''
  })

  const [errors , setErrors] = useState({});

  let [backendErrors, setBackendErrors] = useState({});

  const [registered, setRegistered] = useState(false)

  const schema = Joi.object({
    first_name: Joi.string().messages({'string.empty': "Name cannot be empty"}),
    email: Joi.string()
       .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net','au','in'] } }).messages({'string.empty': "Email cannot be empty"}),
    phone: Joi.string().length(10).pattern(/^([0-9\s\-\+\(\)]*)$/).messages({'string.empty': "Phone number should ba a valid number"}) ,
    
       
  }).options({allowUnknown: true});

  const {first_name,last_name,email,phone} = customerForm;

  const validate = () => {
     
    const errors = {};
    const result = schema.validate(customerForm, {
      abortEarly: false,
    });
    if (!result.error) return null;
    
    result.error.details.map((item) => {
      return (errors[item.path[0]] = item.message);
    });
    console.log(errors);
    return errors;
  };

  const validateInput = (currentTarget) => {
    
     const object = { [currentTarget.name]: currentTarget.value };
     const result = schema.validate(object);
     
     if (!result.error) return null;
     
     return result.error.details[0].message;
   };

   const onHandleChange = (e) =>{
     const errorMsg = validateInput(e.currentTarget);
     console.log(errorMsg);    
     if (errorMsg) {
       errors[e.currentTarget.name] = errorMsg;
     } else {
       delete errors[e.currentTarget.name];
     }
       setCustomerForm({
        ...customerForm,
          [e.target.name]: e.target.value
      })
       setErrors(errors);
      
   }

   const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    setErrors(errors);
    
   if (errors) return;
   submitData() 
   toast.success("Customer created successfully")
   props.history.push("/customers");
  };

  const submitData = async() =>{
     try{
      const response = await http.post('/customer',customerForm);
      setRegistered(true);       
      if (response.data.validation_errors){
        setRegistered(false);
        setBackendErrors(response.data.validation_errors); 
       }
           
    }catch(error){
      setRegistered(false);
      console.log(error.response.data.errors[0])
      setErrors(error.response.data.errors[0]);
    }
  }

  return (
    <div className="container mt-5 card">
      <div className="card-header mt-6">
         <h2>Create Customer</h2>
      </div>
      <div className="card-body">
    <Form className="" onSubmit={handleSubmit}>
         
    <Form.Group controlId="customerCreateFormFname">
      <Form.Label className="fa-2x">First name</Form.Label>
      <Form.Control type="text" name="first_name" value={first_name} placeholder="Enter first name" onChange={onHandleChange}
      />
      
    </Form.Group>
    <span>
    {errors && errors.first_name && (
    <small className="alert-danger font-weight-bold">
      {errors.first_name}
    </small>
      )}
      </span>
      <Form.Group controlId="customerCreateFormLname">
      <Form.Label className="fa-2x">Last name</Form.Label>
      <Form.Control type="text" name="last_name" value={last_name} placeholder="Enter last name" onChange={onHandleChange}
      />
      
    </Form.Group>              
    <Form.Group controlId="customerCreateFormEmail">
      <Form.Label className="fa-2x">Email address</Form.Label>
      <Form.Control type="email" name="email" value={email} placeholder="Enter email"  onChange={onHandleChange} />
      
    </Form.Group>
      <span style={{ color: "red" }}>
        {errors && errors.email && (
        <small className="alert-danger font-weight-bold">
          {errors.email}
        </small>
        )}
      </span>

      <span style={{ color: "red" }}>
        {backendErrors && backendErrors.email && (
        <small className="alert-danger font-weight-bold">
          {backendErrors.email}
        </small>
        )}
      </span>    

      <Form.Group controlId="customerCreateFormPhone">
      <Form.Label className="fa-2x">Phone:</Form.Label>
      <Form.Control type="text" name="phone" value={phone} placeholder="Enter phone number" onChange={onHandleChange}  />
      
    </Form.Group>
     
    <span style={{ color: "red" }}>
        {errors && errors.phone && (
        <small className="alert-danger font-weight-bold">
          {errors.phone}
        </small>
        )}
      </span>
    
    <div className="mt-5">
    <Button variant="primary" type="submit" className="mt-16">
      Create
    </Button>
    </div>

    <ul>
   
</ul>
    
  </Form>
  <Link to={'/customers'}
            className="btn-small m-1 btn btn-primary link-class"
          >
            <span
              className="glyphicon glyphicon-eye-open"
              aria-hidden="true"
            ></span>
            <span>
              <strong>Customer Listing</strong>
            </span>
      </Link> 
  </div>
  
          
  </div>
  )
  
}

export default Customer;

