import React, {useState}from 'react'
import DateTimeSelector from '../components/DateTimeSelector'
import Navbar from '../components/Navbar'
import {getUserByEmail} from '../sdk';
import { Calendar } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { useAuth } from '../context/authContext';



function CreateAppointment(props:any) {
    // console.log( props)

    const [hostEamil, setHostEmail] = useState('');
    const [hostData, setHostData]:any = useState({})
    const [client, setClient] = useState('')
    const {currentUserData} = useAuth()

    console.log(currentUserData)

    let appointmentData = {
        host_name: '',
        host_id: '',
        host_email: '',
        host_phoneNumber: '',
        client_name: '',
        client_id: '',
        client_email: '',
        status: 'pending',
        meeting_date: '',
        meeting_time: '',
        host_delete: false,
        client_delete: false,
        client_phoneNumber: '',
        date_time_created: ''
    }

    const handleChange = (e:any) =>{
        setHostEmail(e.target.value.trim())
    }

    async function handleUserSearch(e:any){
        e.preventDefault()
        
        const u = await getUserByEmail({email:hostEamil});
        console.log(u)
        await setHostData(u)
        try {
            if (u.data[0].firstName){

                let host = u.data[0]
                host = {
                    firstName: host.firstName,
                    lastName: host.lastName,
                    email: host.email,
                    phoneNumber: host.phoneNumber,
                    hostId: host.uid
                }
                const date = new Date()
                setHostData(host)
                appointmentData.host_name = `${host.firstName + " " + host.lastName}`;
                appointmentData.host_id = host.hostId;
                appointmentData.host_email = host.email;
                appointmentData.host_phoneNumber = host.phoneNumber;
                appointmentData.client_id = currentUserData.uid;
                appointmentData.client_name = `${currentUserData.firstName+ " " + currentUserData.lastName}`;
                appointmentData.client_email = currentUserData.email;
                appointmentData.client_phoneNumber = currentUserData.phoneNumber;
                appointmentData.date_time_created = date.toDateString();
                

            }
        }catch(err) {
            console.error(err)
        }
        
        setClient(JSON.stringify(u))
        // setClient(JSON.stringify(u))
    }
    

    function handleSelect(date:any){
        console.log(date)
    }
    let hostView
    if (hostData.firstName) {
        hostView = <div className="card">
                        <div className="card-body"><div className="card-title">
                            {`${hostData.firstName + " " +hostData.lastName}`}
                        </div>
                </div></div>
    } else {
        hostView = <h5>Who are you meeting with?</h5>
    }
    return (
        <div className="row">
            {/* {Object.values(props).map((e:any) => {
                return <div>{e.name}</div>
            })} */}
            <Navbar />
            <h1>Create Appointment</h1><br/>
            <form className="date-form col-md-6 mx-auto">
                <div>{hostView}</div>
                <div className="input-group">
                    <div className="input-group-prepend">
                    <span className="input-group-text">@</span>
                    </div>
                    <input type="email" className="form-control" placeholder="Please enter a valid user email" onChange={handleChange}/><br className="spacing"/>
                    <button className="btn btn-primary" onClick={handleUserSearch}>Search</button>
                </div>
                <section>
                    <section className="cal split-box">
                        <Calendar
                            date={new Date()}
                            onChange={handleSelect}
                        />
                    </section>
                    <section className="timeholder split-box">
                        <ul className="list-group">
                            <button type="button" className="btn btn-outline-primary">  8:00am </button>
                            <button className="btn btn-outline-primary"> 10:00am </button>
                            <button className="btn btn-outline-primary"> 9:00am </button>
                            <button className="btn btn-outline-primary"> 10:00am </button>
                            <button className="btn btn-outline-primary"> 11:00am </button>
                            <button className="btn btn-outline-primary"> 12:00pm </button>
                            <button className="btn btn-outline-primary"> 1:00pm </button>
                            <button className="btn btn-outline-primary"> 2:00pm </button>
                            <button className="btn btn-outline-primary"> 3:00pm </button>
                            <button className="btn btn-outline-primary"> 4:00pm </button>            
                        </ul>
                    </section>
                </section>

                
                
                
            </form>
            <button className="btn btn-primary">Book Appointment</button>
        </div>
    )
}


export default CreateAppointment

