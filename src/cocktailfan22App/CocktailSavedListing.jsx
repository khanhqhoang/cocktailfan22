import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/compat/app';
import '../db';
export default function CocktailSavedListing(){
   const uiConfig = {
        signInFlow: 'popup',
        signInSuccessUrl: '/CocktailSavedListing',
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        ],
    };

    return (
        <div>
            <h1>CocktailSavedListing</h1>
            <StyledFirebaseAuth
                uiConfig={uiConfig}
                firebaseAuth={firebase.auth()}
            />
        </div>
    );
}