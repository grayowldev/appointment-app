import { error } from 'node:console';
import React, {useState} from 'react'
import * as All from '../sdk'

function Home() {
    const [preview, setPreview] = useState("empty")
    const jsonData = {
        uid: "user1",
        firstName: "John7",
        lastName: "Doe7"
    }

    async function handleTest() {
        // const data = await All.helloFire("hello")

        // const data = await All.getUserByUid(jsonData).catch(error => {
        //     console.error(error);
        // });

        // const data = await All.createUserData(jsonData).catch(error => {
        //     console.error(error);
        // });

        // const data = await All.updateUserData(jsonData).catch(error => {
        //     console.error(error);
        // });

        const data = await All.deleteUserData(jsonData).catch(error => {
            console.error(error);
        });
        // console.log(data.data[0].uid)
        console.log(JSON.stringify(data))
        setPreview(JSON.stringify(data));
        
    }
    return (
        
        <div>
            {preview}<br/>
            <button onClick={handleTest}>Test</button>
        </div>
    )
}

export default Home
