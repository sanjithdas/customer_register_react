 
import {Form,Button} from 'react-bootstrap';
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import {useState} from 'react';
import Joi from 'joi';
import http from '../../http-common';
 
 
const Create = (props) => {

  const [contactForm, setContactForm] = useState({
    address: '',
    city:'',
    pincode: '',
    work_phone: '',
    customer_id:  props.match.params.id,
  })

  
 console.log(contactForm.customer_id);

  const [errors , setErrors] = useState({});

  let [backendErrors, setBackendErrors] = useState({});

  const [registered, setRegistered] = useState(false)

  const schema = Joi.object({
    address: Joi.string().messages({'string.empty': "Address cannot be empty"}),
    city: Joi.string().messages({'string.empty': "City cannot be empty"}),
     work_phone: Joi.string().length(10).pattern(/^([0-9\s\-\+\(\)]*)$/).messages({'string.empty': "Phone number should ba a valid number"}),
     pincode: Joi.number().integer().messages({'string.empty': "Phone number should ba a valid number"})
          
  }).options({allowUnknown: true});

  const { address,city,pincode,work_phone} = contactForm;

  const validate = () => {
     
    const errors = {};
    const result = schema.validate(contactForm, {
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
    
      setContactForm({
        ...contactForm,
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
   toast.success("Contacts added successfully")
   props.history.push("/customers");
    
  };

  const submitData = async() =>{
     try{
      const response = await http.post('/contacts',contactForm);
      setRegistered(true);       
      if (response.data.validation_errors){
        setRegistered(false);
        setBackendErrors(response.data.validation_errors); 
      }
      
      
    }catch(error){
      console.log('in error',error);
      setRegistered(false);
      console.log(error.response.data.errors[0])
      setErrors(error.response.data.errors[0]);
    }
  }


  return (
    <div className="container mt-5 card">
      <div className="card-header mt-6">
         <h2>Create Contact</h2>
      </div>
      <div className="card-body">
    <Form className="" onSubmit={handleSubmit}>
         
    <Form.Group controlId="formBasicEmail">
      <Form.Label className="fa-2x">Address</Form.Label>
      <Form.Control type="text" name="address" value={address} placeholder="Enter address" onChange={onHandleChange}
      />
      
    </Form.Group>
    <span>
    {errors && errors.address && (
    <small className="alert-danger font-weight-bold">
      {errors.address}
    </small>
      )}
      </span>
      <Form.Group controlId="formBasicEmail">
      <Form.Label className="fa-2x">City</Form.Label>
      <Form.Control type="text" name="city" value={city} placeholder="Enter city" onChange={onHandleChange}
      />
      
    </Form.Group>   

    <span style={{ color: "red" }}>
        {errors && errors.city && (
        <small className="alert-danger font-weight-bold">
          {errors.city}
        </small>
        )}
      </span>

    <Form.Group controlId="formBasicEmail">
      <Form.Label className="fa-2x">Pincode</Form.Label>
      <Form.Control type="text" name="pincode" value={pincode} placeholder="Enter pin code" onChange={onHandleChange}/>
      </Form.Group>

      <span style={{ color: "red" }}>
        {errors && errors.pincode && (
        <small className="alert-danger font-weight-bold">
          {errors.pincode}
        </small>
        )}
      </span>

      <span style={{ color: "red" }}>
        {backendErrors && backendErrors.pincode && (
        <small className="alert-danger font-weight-bold">
          {backendErrors.pincode}
        </small>
        )}
      </span>    

      <Form.Group controlId="formBasicEmail">
      <Form.Label className="fa-2x">Work Phone</Form.Label>
      <Form.Control type="text" name="work_phone" value={work_phone} placeholder="Enter workphone" onChange={onHandleChange}/>
      </Form.Group>    
       
     
    <span style={{ color: "red" }}>
        {errors && errors.work_phone && (
        <small className="alert-danger font-weight-bold">
          {errors.work_phone}
        </small>
        )}
      </span>
    
    <div className="mt-5">
    <Button variant="primary" type="submit" className="mt-16">
      Create
    </Button>
    </div>

    <ul>
    {/* {Object.keys(errors).map((error, index) => (
        <Error
            message={errors[error][0]}
            key={index}
        />
    ))} */}
</ul>

    <span style={{ color: "red" }} className="mr-5 mt-5">
        {registered && (
        <small className="alert alert-success font-weight-bold text-center">
          Successfully registered...
        </small>
        )}
      </span>
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

export default Create;

