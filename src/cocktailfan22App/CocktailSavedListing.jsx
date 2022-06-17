import React, {useState, useEffect} from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import db from '../db';
import firebase from 'firebase/compat/app';
//import { Link } from 'react-router-dom';
//import Button from 'react-bootstrap/Button';
import trashImg from './graphics/trash.png';
import swal from 'sweetalert';
//import NavBar from './NavBar';

export default function CocktailSavedListing(props){

    const [cocktailSavedEntries, setCocktailSavedEntries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [user, setUser] = useState(null);
   // let basketCocktailList = props.state;
   
    const handleDelete = (event, entry)=>{
        event.preventDefault();
        swal("Future Implementation","success");
        /**
        db.collection("cocktailListEntries").doc(entry.id).delete().then(() => {
            swal(" Cocktail has been removed from the favorite list!", "success");
        }).catch((error) => {
            console.error("Error removing cocktail: ", error.message);
        });
        **/
    }

    useEffect(()=> {
        const unsubscribe = firebase.auth().onAuthStateChanged(user =>{
            setUser(user);
        });
        return () => unsubscribe();
    },[]);
    useEffect(()=> {
    if (!user) 
    {
        return;
    }
    const entriesQuery = query(
            collection(db, 'users', user.uid, 'cocktailListEntries'),
            orderBy('createdAt', 'desc')
    );
    const unsubscribe = onSnapshot(
        entriesQuery,
        snapshot => {
            setCocktailSavedEntries(snapshot.docs);
            setLoading(false);
        },
        reason => {
            console.log(reason);
            setError(true);
            setLoading(false);
        }
    );
    return () => unsubscribe();
    }, [user]);
   
  
    if (error) {
        return <p>An error occurred, please try again.</p>
    }

    if (loading) {
        return <p>Loading...</p>
    }
    return (
        <div>

            <div className="saved-listing-header-div">
                <p>Id</p>
                <p>Name</p>
                <p>Category</p>
                <p>Glass</p>
                <p>Info</p>
                <p>Ingredients</p>
                <p>Instructions</p>
                <p>Image</p>
                <p>Delete</p>
            </div>
            {cocktailSavedEntries.map(entry => {
                return (
                    <form onSubmit={(e) =>handleDelete(e, entry)}>
                        <div key={entry.data().id} className="saved-listing-item-div color">
                            <p>{entry.data().id}</p>
                            <p>{entry.data().name}</p>
                            <p>{entry.data().Category}</p>
                            <p>{entry.data().Glass}</p>
                            <p>{entry.data().Info}</p>
                            <p>{entry.data().Ingredients}</p>
                            <p>{entry.data().Instructions}</p>
                            <p><img src={entry.data().image} className="navbar-icon" alt="imageIcon"/></p>
                            <span>  
                                <input id="trashBtn" type="image" src={trashImg} alt="deleteItem" className="navbar-icon"/>                               
                            </span>
                            <hr />
                        </div>
                    </form>
                );
            })}
        </div>
    );
}