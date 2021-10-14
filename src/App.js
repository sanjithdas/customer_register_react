 
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

import Customer from './components/Customer';
import Customers from './components/Customers';
import Create from './components/contacts/Create' 
import ViewContact from './components/contacts/ViewContacts';
import EditCustomer from './components/EditCustomer';
function App() {
  return (
    <>
    { <ToastContainer /> }
     <Router>
       <Switch>
         <Route exact path= "/" component = {Customer} />
         <Route exact path= "/customers" component = {Customers} />
         <Route exact path="/create_contact/:id" component={Create} />
         <Route exact path="/view_contact/:id" component={ViewContact} />
         <Route exact path="/edit_customer/:id" component={EditCustomer} />
       </Switch>
     </Router>
     </>
  );
}

export default App;
