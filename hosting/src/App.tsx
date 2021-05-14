import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { helloWorld, sayHello} from './sdk';
import TimeSelector from './components/TimeSelector';
import ShowAppointments from './pages/ShowAppointments';
import CreateAppointment from './pages/CreateAppointment';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { AuthProvider } from './context/authContext';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';


function App() {
  useEffect(() => {
    // helloWorld();
  }, []);
  

  const aptData = [
    {
      "name": "Kwasi Nsiah",
      "aptdate" : "2 Feb 2021",
      "apttime" : "11:00",
      "email": "xyz@abc.com",
      "phone" : "7324567890"
    },
    {
      "name": "James Libskin",
      "aptdate" : "2 Feb 2021",
      "apttime" : "13:00",
      "email": "xyz@abc.com",
      "phone" : "9874567890"
    },
    {
      "name": "Sara Jones",
      "aptdate" : "2 Feb 2021",
      "apttime" : "15:00",
      "email": "xyz@abc.com",
      "phone" : "1298767890"
    },
    {
      "name": "Jone Doe",
      "aptdate" : "1 Feb 2021",
      "apttime" : "16:00",
      "email": "aaaxyz@gmail.com",
      "phone" : "1234585290"
    },
    {
      "name": "Jane Doe",
      "aptdate" : "5 Feb 2021",
      "apttime" : "09:00",
      "email": "xyzqwe@abcd.com",
      "phone" : "8637567890"
    }
  ];

  return (
    // <TimeSelector />
    // <ShowAppointments appointments={aptData}/>
    // <CreateAppointment {...aptData}/>
    <Router>
        <AuthProvider>
          <Route path="/" exact component={Home} />
          <Route path="/signin" component={Login}/>
          <Route path="/signup" component={SignUp}/>
          <PrivateRoute path="/create-appointment" component={CreateAppointment}/>
          <PrivateRoute path="/show-appointments" component={ShowAppointments}/>
          {/* <button onClick={sayHello}>Say Hello</button> */}
      </AuthProvider>  
    </Router>


  );
}

export default App;
