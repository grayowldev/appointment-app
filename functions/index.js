const functions = require("firebase-functions");


// The Firebase Admin SDK to access Firestore.
const admin = require('firebase-admin');

const { firebaseConfig } = require("firebase-functions");
const { user } = require("firebase-functions/lib/providers/auth");
admin.initializeApp();
// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
const firestoreDB = admin.firestore();


exports.randomNumber = functions.https.onRequest((req, res) => {
    const number = Math.round(Math.random() * 100);
    res.send(number.toString());
});

exports.sayHello = functions.https.onCall((data, context) => {
    return `hello world`
});
//  Save user data in firestore
exports.generateUserData = functions.https.onCall(async (data,context) => {
    await firestoreDB.collection('users').doc(data.uid).set(data)
})
// Sign up function
exports.createUser = functions.https.onCall((data, context) => {
    admin.auth().createUser({
        email: data.email,
        emailVerified: false,
        phoneNumber: `+1${data.phoneNumber.toString()}`,
        password: data.password,
        displayName: `${data.firstName} ${data.lastName}`,
        disabled: false,
    }).then((userRecord) => {
            // See the UserRecord reference doc for the contents of userRecord.
            console.log('Successfully created new user:', userRecord.uid);
            const userData = {
                uid: userRecord.uid,
                email: data.email,
                phoneNumber: `+1${data.phoneNumber.toString()}`,
                firstName: data.firstName,
                lastName: data.lastName
            }
            firestoreDB.collection('users').doc(userRecord.uid).set(userData);
            return userData;
          })
          .catch((error) => {
            console.log('Error creating new user:', error);
            return error;
          });
    console.log(data);
});

exports.createUserData = functions.https.onCall((data, context) => {
    try{
        firestoreDB.collection('users').doc(data.uid).set(data);
        return "User data added successfully";
    }catch(err){
        return err;
    }
})



// exports.createAppointment = functions.https.onCall((data, context) => {

// });

exports.updateAppointmentStatus = functions.https.onCall((data, context) => {

});

exports.deleteAppointment = functions.https.onCall((data, context) => {

});

exports.getUserByEmail1 = functions.https.onCall((data, context) => {
    const userRef = firestoreDB.collection('users');
    const rtnUser = userRef.where('email', '==', data.toString()).orderBy('email').limit(1).get()
    return rtnUser;
});

exports.getUserData = functions.https.onCall((data, context) => {
    // try {
        const userdata = firestoreDB.collection('users').doc(data.uid).get();
        return userdata;
    // } catch(err) {
    //     return err;
    // }
});


/* Fresh Start */

/**
 * Test Here
 */
exports.helloFire = functions.https.onCall((data,context) => {
    console.log("Hello Fire! log")
    return "Hello Fire!"
});


/**
 * Get User Data By Uid
 */
exports.getUserByUid = functions.https.onCall(async (data, context) => {
    const userData = await firestoreDB.collection('users').doc(data.uid).get()
    .catch(error => {
        throw new functions.https.HttpsError('unknown', 'ERROR0', {
            message: error.message
        })
    });
    return userData.data();
});

/**
 * Get User Data By Email
 */

exports.getUserByEmail = functions.https.onCall(async (data,context) => {
    rtnUser = null;
    const ref = await firestoreDB.collection('users').get().catch(error => {
        throw new functions.https.HttpsError('unknown', 'ERROR0', {
            message: error.message
        })
    })
    rtnUser = ref.docs.filter(doc => doc.data().email === data.email).map(doc => doc.data());
    return rtnUser
})



 exports.generateUserData = functions.https.onCall(async (data,context) => {
    await firestoreDB.collection('users').doc(data.uid).set(data)
})
 

/**
 * Create User Data
 */
exports.createNewUserData = functions.https.onCall(async (data,context) => {
    await firestoreDB.collection('users').doc(data.uid).set(data)
    return {status: "Data added successfully"}
})

/**
 * Update User Data
 */
//TODO: Fix user ubavailable issue
exports.updateUserData = functions.https.onCall(async (data,context) => {
    const res = await firestoreDB.collection('users').doc(data.uid).update(data);
    // return rtnStatus;
})

/**
 * Delete User Data
 */

exports.deleteUserData = functions.https.onCall(async (data, context) => {
    // const res = await firestoreDB.collection(`users/${data.uid}`).delete()
    const ref = await firestoreDB.doc('users/user1').get()
    // const user = await ref.get().then((snapshot) => {
        // snapshot.docs.forEach(doc => {
        //     doc.update(data);
        // })
    // });
    // return {status: "deleted"}

    // if (user.empty) {
    //     return "empty"
    // } else {
    //     return user;
    // }
    

    // const documents = ref.docs.filter(doc => doc.data().uid === 'user1').map(doc => doc.data())
    // return documents;
    const batch = firestoreDB.batch();

    batch.delete(ref.ref);
    await batch.commit();
})

/**
 * Get All Appointments Data
 */

 exports.getUserAppointments = functions.https.onCall(async (data, context) => {
    
})

/**
 * Get Appointment Data By ID
 */

 exports.getAppointmentById = functions.https.onCall(async (data, context) => {
    
})

/**
 * Create Appointment Data
 */

 exports.createAppointment = functions.https.onCall(async (data, context) => {
    
})

/**
 * Update Appointment Data
 */

 exports.updateAppointment = functions.https.onCall(async (data, context) => {
    
})

/**
 * Delete Appointment By ID Data
 */

 exports.deleteAppointment = functions.https.onCall(async (data, context) => {
    
})

/**
 * Accept Appointment
 */

 exports.acceptAppointment = functions.https.onCall(async (data, context) => {
    
})

/**
 * Decline Apointment
 */
 exports.delineAppointment = functions.https.onCall(async (data, context) => {
    
})

/**
 * Get User Availability
 */


/**
 * Create User Availability
 */

/**
 * Update User Availability
 */

/**
 * Reset User Availability
 */

