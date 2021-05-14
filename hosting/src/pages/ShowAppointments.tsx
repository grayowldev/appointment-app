import userEvent from '@testing-library/user-event'
import React from 'react'
import Navbar from '../components/Navbar';

function ShowAppointments(appointments:any) {
    // console.log(appointments)
    const aptData = [
        {
          "name": "Kwasi Nsiah",
          "aptdate" : "2 Feb 2021",
          "apttime" : "11:00",
          "email": "xyz@abc.com",
          "phone" : "7324567890",
          
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
        <div>
          <Navbar />
          <div className="container mt-7">
            <h2 className="mb-5">Appointments</h2></div>
            
            <table className="table table-striped">
              <thead >
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Appointment</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Email</th>
                    <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {aptData.map((e) => {
                        return(
                            <tr>
                              <th scope="row">{e.name}</th>
                                <td><div><h6>{e.apttime}</h6><h6>{e.aptdate}</h6></div></td>
                                <td>pending</td>
                                <td>{e.phone}</td>
                                <td>{e.email}</td>
                                <td><button type="button" className="btn btn-primary-outline">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                    <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                                  </svg></button></td>
                            </tr>
                        )
                    })}
              </tbody>  
                
            </table>

        </div>
    )
}

export default ShowAppointments
