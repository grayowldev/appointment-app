import React, {useState}from 'react'
import DateTimeSelector from '../components/DateTimeSelector'
import Navbar from '../components/Navbar'
import {getUserByEmail} from '../sdk';
import { Calendar } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { useAuth } from '../context/authContext';
import te from 'date-fns/esm/locale/te/index.js';



function CreateAppointment(props:any) {
    // console.log( props)

    const [hostEamil, setHostEmail] = useState('');
    const [hostData, setHostData]:any = useState({})
    const [client, setClient] = useState('')
    const {currentUserData} = useAuth()
    const [aptDate, setAptDate] = useState(new Date())
    const [aptTime, setAptTime] = useState('');
    const [aptDateName, setAptDateName] = useState('');
    const [appointmentData, setAppointmentData] = useState({
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
    })

    console.log(currentUserData)
    console.log(aptDate)


    const handleChange = (e:any) =>{
        setHostEmail(e.target.value.trim())
    }

    const handleTimeClick = (e:any) => {
        e.preventDefault()
        console.log(e.target.value)
        setAptTime(e.target.value)
        appointmentData.meeting_time = aptTime;
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
                let tempData = appointmentData;
                tempData.host_name = `${host.firstName + " " + host.lastName}`;
                tempData.host_id = host.hostId;
                tempData.host_email = host.email;
                tempData.host_phoneNumber = host.phoneNumber;
                tempData.client_id = currentUserData.uid;
                tempData.client_name = `${currentUserData.firstName+ " " + currentUserData.lastName}`;
                tempData.client_email = currentUserData.email;
                tempData.client_phoneNumber = currentUserData.phoneNumber;
                tempData.date_time_created = date.toDateString();
                setAppointmentData(tempData)
                console.log(appointmentData)
            }
        }catch(err) {
            console.error(err)
        }
        
        setClient(JSON.stringify(u))
    }
    

    function handleSelect(date:any){
            setAptDate(date)
        console.log(aptDate)
    }
    
    async function handleAptSubmit(e:any) {
        e.preventDefault()
        console.log(appointmentData)
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

    let aptView
    if (aptTime === ''){
        aptView = <div>
            <h5>Please select an appointment time</h5>
        </div>
    }else {
        const monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
        const dateStr = monthNames[aptDate.getMonth()] + ' ' + aptDate.getDate() + ' ' + aptDate.getFullYear();
        console.log(typeof dateStr)
        appointmentData.meeting_date = dateStr;
        aptView = <div>
            <h5>{`${monthNames[aptDate.getMonth()] + " " + aptDate.getDate() + ' ' + aptDate.getFullYear() + ', ' + aptTime}`}</h5>
        </div>
    }
    return (
        <div className="row">
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
                <div>{aptView}</div>
                <section>
                    <section className="cal split-box">
                        <Calendar
                            date={new Date()}
                            onChange={handleSelect}
                        />
                    </section>
                    <section className="timeholder split-box">
                        <ul className="list-group">
                            <button type="button" className="btn btn-outline-primary" value="8:00am" onClick={handleTimeClick}>  8:00am </button>
                            <button type="button" className="btn btn-outline-primary" value="9:00am" onClick={handleTimeClick}> 9:00am </button>
                            <button type="button" className="btn btn-outline-primary" value="10:00am" onClick={handleTimeClick}> 10:00am </button>
                            <button type="button" className="btn btn-outline-primary" value="11:00am" onClick={handleTimeClick}> 11:00am </button>
                            <button type="button" className="btn btn-outline-primary" value="12:00pm" onClick={handleTimeClick}> 12:00pm </button>
                            <button type="button" className="btn btn-outline-primary" value="1:00pm" onClick={handleTimeClick}> 1:00pm </button>
                            <button type="button" className="btn btn-outline-primary" value="2:00pm" onClick={handleTimeClick}> 2:00pm </button>
                            <button type="button" className="btn btn-outline-primary" value="3:00pm" onClick={handleTimeClick}> 3:00pm </button>
                            <button type="button" className="btn btn-outline-primary" value="4:00pm" onClick={handleTimeClick}> 4:00pm </button>            
                        </ul>
                    </section>
                </section>
            </form>
            <button type="button" className="btn btn-primary" onClick={handleAptSubmit}>Book Appointment</button>
        </div>
    )
}


export default CreateAppointment

