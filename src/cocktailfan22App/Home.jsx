import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/compat/app';
import '../db';

export default function Home() {
    const uiConfig = {
        signInFlow: 'popup',
        signInSuccessUrl: '/CocktailFanApp',
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        ],
    };

    return (
        <div>
            <h5>Welcome to My Favorite Cocktail Page. 
            Please sign in with Google Account!</h5>
            <StyledFirebaseAuth
                uiConfig={uiConfig}
                firebaseAuth={firebase.auth()}
            />
        </div>
    );
}
