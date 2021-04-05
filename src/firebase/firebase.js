import * as firebase from "firebase";
import expenses from "../tests/fixtures/expenses";

const config={
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
};

firebase.initializeApp(config);

const database=firebase.database()
const googleAuthProvider =new firebase.auth.GoogleAuthProvider();

export {firebase,googleAuthProvider,database as default};


/*database.ref().set({
    name:"Ray Allen",
    age:16,
    isSingle:true,
    location:{
        city:"London",
        country:"Canada"
    }
}).then(()=>{
    console.log("data is saved")
}).catch((error)=>{
    console.log(err)
})

database.ref("age").set(27)
database.ref("location/city").set("New York")
database.ref("attribute").set({
    height:73,
    weight:78
})

database.ref().update({
    name:"Andres",
    age:28,
    "location/city":"Waterloo"
})*/
/*

database.ref("expenses").on("value",(snapshot)=>{
    const expenses=[]
    snapshot.forEach((childSnapshot)=>{
        expenses.push({
            id:childSnapshot.key,
            ...childSnapshot
        })
    })
    console.log(expenses)
})

database.ref("expenses").on("child_removed",(snapshot)=>{
    console.log(snapshot.key,snapshot.val())
})

database.ref("expenses").on("child_changed",(snapshot)=>{
    console.log(snapshot.key,snapshot.val())
})

database.ref("expenses").on("child_added",(snapshot)=>{
    console.log(snapshot.key,snapshot.val())
})

database.ref("expenses").push({
    amount:5600,
    createAt:6712348568,
    description:"",
    note:""
})


*/