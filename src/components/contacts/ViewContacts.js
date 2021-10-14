import React, { Component } from 'react'
import { Link } from "react-router-dom";
import CustomerService from '../../services/CustomerServices';
//import SingleCustomer from './SingleCustomer';
import 'jquery/dist/jquery.min.js';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import jQuery from "jquery";
import 'datatables.net-buttons';
 class ViewContacts extends Component {
  constructor(props){
    super(props);
    this.state={
      contacts: [],
       
    }
  } 

   componentDidMount(){
   this.getContacts();
   setTimeout(()=>{
    let table = jQuery("#example2").DataTable({
     });
  },1000)
   }
  getContacts = () => {
    CustomerService.getIndividualContacts(this.props.match.params.id)
      .then(response => {
        console.log(response.data[0].contacts);
         this.setState({contacts:response.data[0].contacts});
       })
      .catch(e => {
        console.log(e);
      });
    //  console.log(this.state.customers);
  };

  render() {
    const { contacts} = this.state;
   
    return (
      <div className="container mt-5">  
        <div className="row" className="hdr">    
          <div className="col-sm-12 btn btn-info">    
          Contacts Listing  
            </div>    
            </div>    
          <div  style={{ marginTop: 20 }}>  
          <table id="example2" className="table table-bordered table-hover table-striped">
               <thead>
                 <tr>
                   <th>Customer ID</th>
                   <th>Address</th>
                   <th>City</th>
                   <th>Pin Code</th>
                   <th>Work Phone</th>
                   <th></th>
                 </tr>
               </thead>
           <tbody>
           {contacts && 
               contacts.map(user => (
               
              <tr><td>{  user.customer_id    } </td>
              <td>{  user.address    } </td>
              <td>{  user.city    } </td>
              <td>{  user.pincode    } </td>
              <td>{  user.work_phone    } </td>
              <td></td>
              </tr>
           ))}
            </tbody>
          </table>
          
          </div>  
          <Link to={'/customers'}
            className="btn-small m-1 btn btn-primary link-class"
          >
            <span
              className="glyphicon glyphicon-eye-open"
              aria-hidden="true"
            ></span>
            <span>
              <strong>Customer Listing View</strong>
            </span>
      </Link>
      </div>  
    )
  }
 }
export default ViewContacts
