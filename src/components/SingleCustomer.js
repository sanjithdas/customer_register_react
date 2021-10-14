import React from 'react'
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
import '../services/CustomerServices'

import CustomerServices from '../services/CustomerServices';
const SingleCustomer = ({id,first_name,last_name,email,phone, add_contacts, edit, delete_customer ,view_contacts ,props }) => {
  
  const removeCustomer = (id,e) =>{
      
    const confirm = window.confirm('Do you want to delete the record?');
     
    if(confirm){
      
      CustomerServices.remove(id)
      .then(response =>{
        toast.success("Customer deleted successfully")
        props.history.push("/customers");
      })
      .catch(e => {
        console.log(e);
      })
   }
   
  }
  return (
    <>
    <tr key={id}>
      <td>{id}</td>
       <td>{first_name}</td>
       <td>{last_name}</td>
       <td>{email}</td>
       <td>{phone}</td>
       
       <td>
            
         <Link to={`create_contact/${id}`} type="submit"   title="Add contacts" className="btn-sm btn btn-success mr-5" data-toggle="modal" data-target="myModal">{add_contacts}</Link>

         <Link to={`view_contact/${id}`} type="submit"  title="View contacts" className="btn-sm btn btn-warning mr-5" data-toggle="modal" data-target="myModal">{view_contacts}</Link>
        
         <Link to={`edit_customer/${id}`} type="submit"  title="Edit contacts" className="btn-sm btn btn-info mr-5" data-toggle="modal" data-target="myModal">{edit}</Link>

        <button type="submit" onClick={() => removeCustomer(id)} className="btn btn-sm btn-danger" title="Delete customer">{delete_customer}</button>
       
       </td>
       
    </tr>
     
    
   
    </>
    
  )
}

export default SingleCustomer
