import React, {useState, useEffect} from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import db from '../db';
import firebase from 'firebase/compat/app';
import { Link } from 'react-router-dom';

export default function CocktailSavedListing(){

    const [cocktailSavedEntries, setCocktailSavedEntries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [user, setUser] = useState(null);
    useEffect(()=> {
        const unsubscribe = firebase.auth().onAuthStateChanged(user =>{
            console.log(user);
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
            <h1>CocktailSavedListing</h1>
            {cocktailSavedEntries.map(entry => {
                return (
                    <div key={entry.id}>
                        <p>{entry.data().entry}</p>
                        <span>
                            <Link to={`/CocktailDetails/${entry.cockTailID}`}>View</Link>
                        </span>
                        <hr />
                    </div>
                );
            })}
        </div>
    );
}