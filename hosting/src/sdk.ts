import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/functions';
import { promises } from "node:dns";

const firebaseConfig = {
  apiKey: "AIzaSyBWs8aJS6Biydz4DdxVgoOR5nXbh_h0PgQ",
    authDomain: "hosting-4cb23.firebaseapp.com",
    projectId: "hosting-4cb23",
    storageBucket: "hosting-4cb23.appspot.com",
    messagingSenderId: "760269650531",
    appId: "1:760269650531:web:85d64a87c12b7409121656",
    measurementId: "G-RC3DRWE1XG"
};

const app = firebase.initializeApp(firebaseConfig);


const firebaseFunctions = app.functions();
firebaseFunctions.useEmulator('localhost', 5001);

export async function helloWorld(): Promise<void> {
  const res = await firebaseFunctions.httpsCallable('helloWorld')({});
  console.log(res);
}

export async function sayHello(): Promise<void> {
  const res = await firebaseFunctions.httpsCallable('sayHello')({});
  console.log(res)
}

// export async function createUserData(data:any): Promise<any> {
//   const res = await firebaseFunctions.httpsCallable('createUserData')(data);
//   return res;
// }

export async function getUserData(userUid:string): Promise<any> {
  const res = await firebaseFunctions.httpsCallable('getUserData')({uid: userUid})
  return res;
}

export async function createAppointment(data:any): Promise<any> {
  const res = await firebaseFunctions.httpsCallable('')()
  return res;
}

export async function updateAppointmentStatus(data:any): Promise<any> {
  const res = await firebaseFunctions.httpsCallable('')()
  return res;
}

// export async function deleteAppointment(data:any): Promise<any> {
//   const res = await firebaseFunctions.httpsCallable('')()
//   return res;
// }

export async function signup(data:any): Promise<any> {
  const res = await firebaseFunctions.httpsCallable('createUser')(data)
  console.log(await res);
  console.log(typeof res);
  return res;
}

export async function getUserByEmail1(email:any): Promise<any> {

  const res = await firebaseFunctions.httpsCallable('getUserByEmail1')(email)
  return res;
}


export const auth = app.auth()
export default app;




export async function helloFire(str:string) {
  const rtn = await firebaseFunctions.httpsCallable('helloFire')("hello")
  return rtn;
  // return "Hello Fire Test"
}


export async function getUserByUid(data:any): Promise<any> {
  
  const rtnData = await firebaseFunctions.httpsCallable('getUserByUid')(data)
  return rtnData;
}

// TODO
export async function getUserByEmail(data:any): Promise<any> {
  const rtnData = await firebaseFunctions.httpsCallable('getUserByEmail')(data)
  return rtnData;
}

export async function createUserData(data:any): Promise<any> {
  
  const rtnData = await firebaseFunctions.httpsCallable('createNewUserData')(data)
  return rtnData;
}

// TODO
export async function updateUserData(data:any): Promise<any> {
  const rtnData = await firebaseFunctions.httpsCallable('updateUserData')(data)
  return rtnData;
}

// TODO
export async function deleteUserData(data:any): Promise<any> {
  const rtnData = await firebaseFunctions.httpsCallable('deleteUserData')(data)
  return rtnData;
}

// TODO
export async function getUserAppointments(data:any): Promise<any> {

}

// TODO
export async function getUserAppointmentById(data:any): Promise<any> {

}

// TODO
export async function updateAppointment(data:any): Promise<any> {

}

// TODO
export async function deleteAppointment(data:any): Promise<any> {

}

// TODO
export async function acceptAppointment(data:any): Promise<any> {

}

// TODO
export async function declineAppointment(data:any): Promise<any> {

}

// TODO
export async function getUserAvailability(data:any): Promise<any> {

}

// TODO
export async function setUserAvailability(data:any): Promise<any> {

}

// TODO
export async function resetUserAvailability(data:any): Promise<any> {

}






