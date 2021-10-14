 
import {Form,Button} from 'react-bootstrap';
import { Link } from "react-router-dom";
import {useState,useEffect} from 'react';
import Joi from 'joi';
import { toast } from 'react-toastify';
import CustomerServices from '../services/CustomerServices';
const EditCustomer = (props) => {
  const [customerForm, setCustomerForm] = useState({
    first_name: '',
    last_name: '',
    email:'',
    phone: ''
  })

  useEffect(() => {
    getCustomer(props.match.params.id);
  }, [props.match.params.id]);

  const getCustomer = id => {
    CustomerServices.get(id)
      .then(response => {
        setCustomerForm(response.data);
       })
      .catch(e => {
        console.log(e);
      });
  };

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
  
   const handleUpdate = (e) => {
    e.preventDefault();
    const errors = validate();
    setErrors(errors);
    
   if (errors) return;
   submitData() 
   toast.success("Customer edited successfully")
   props.history.push("/customers");
  };

  const submitData = async() =>{
     try{
      const response = await CustomerServices.update(customerForm.id,customerForm);
      setRegistered(true);       
      if (response.data.validation_errors){
        setRegistered(false);
        setBackendErrors(response.data.validation_errors); 
       }
     }catch(error){
       setRegistered(false);
      }
  }
  return (
      <div className="container mt-5 card">
      <div className="card-header mt-6">
         <h2>Edit Customer</h2>
      </div>
      <div className="card-body">
    <Form className="" onSubmit={handleUpdate}>
         
      <Form.Group controlId="formBasicEmail">
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
        <Form.Group controlId="formBasicEmail">
        <Form.Label className="fa-2x">Last name</Form.Label>
        <Form.Control type="text" name="last_name" value={last_name} placeholder="Enter last name" onChange={onHandleChange}
        />
        
      </Form.Group>              
      <Form.Group controlId="formBasicEmail">
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

        <Form.Group controlId="formBasicEmail">
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
        Edit
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

export default EditCustomer;

