import React, { Component } from 'react'
import { Link } from "react-router-dom";
import CustomerService from '../services/CustomerServices';
import SingleCustomer from './SingleCustomer';
import 'jquery/dist/jquery.min.js';

import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import jQuery from "jquery";
import 'datatables.net-buttons';

 class Customers extends Component {
  constructor(props){
    super(props);
    this.state={
      customers: [],
      }
  } 
   componentDidMount(){
    this.getCustomers();
    setInterval(()=>{
    jQuery("#customer_list").DataTable();
   },1000)
   }

   componentDidUpdate(){
    this.getCustomers();
   }
 
  getCustomers = () => {
    CustomerService.getAll()
      .then(response => {
         this.setState({customers:response.data});
       })
      .catch(e => {
        console.log(e);
      });
   };
  render() {
    const { customers} = this.state;
    
    return (
      <div className="container mt-5">  
        <div className="row hdr">    
          <div className="col-sm-12 btn btn-info">    
          Customer Listing  
            </div>    
            </div>    
          <div  style={{ marginTop: 20 }}>  
          <table id="customer_list" className="table table-bordered table-hover table-striped">
               <thead>
                 <tr>
                   <th>ID</th>
                   <th>First Name</th>
                   <th>Last Name</th>
                   <th>Email</th>
                   <th>Phone</th>
                   <th></th>
                 </tr>
               </thead>

           <tbody>
                
           {customers && customers.data &&
               customers.data.map(user => (
               
                    <SingleCustomer  key={user.id}
                    id = {user.id}
                    first_name={user.first_name}
                    last_name ={user.last_name}
                    email = {user.email}
                    phone = {user.phone}
                    edit ="Edit|"
                    delete_customer = "Delete"
                    add_contacts = "Add Contacts|"
                    view_contacts = "View Contacts|"
                />
                 
           ))}
           </tbody>
          </table>
          
          </div> 

          <Link to={'/'}
            className="btn-small m-1 btn btn-primary link-class"
          >
            <span
              className="glyphicon glyphicon-eye-open"
              aria-hidden="true"
            ></span>
            <span>
              <strong>Create Customer</strong>
            </span>
      </Link> 
          
      </div>  
    )
  }
 }
export default Customers
