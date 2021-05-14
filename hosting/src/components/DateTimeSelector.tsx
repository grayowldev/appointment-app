import React from 'react'
import { Calendar } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import TimeSelector from './TimeSelector';

function DateTimeSelector() {

    function handleSelect(date:any){
        console.log(date)
    }
    
    return (
        <div>
            <Calendar
                date={new Date()}
                onChange={handleSelect}
            />
            <TimeSelector />
        </div>
    )
}

export default DateTimeSelector
