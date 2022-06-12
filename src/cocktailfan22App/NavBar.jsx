import React from 'react';
import "./styles/CocktailFanApp.css";
import { Link, useNavigate } from 'react-router-dom';
import homeIcon from './graphics/home.PNG';
import basketIcon from './graphics/basket.PNG';
import listIcon from './graphics/list.PNG';
import signOutIcon from './graphics/signout.jpg';
import firebase from 'firebase/compat/app';

export default function NavBar(props){
    const navigate = useNavigate();
    return(
        <div className="navbar">      
            <div>
                <Link to="/CocktailFanApp">
                    <img src={homeIcon} className="navbar-icon" alt="homeIcon"/>
                </Link>
                
            </div>
            <div>
                <Link to="/">
                    <img src={basketIcon} className="navbar-icon" alt="basketIcon"/>
                </Link>
            </div>
            <div>
                <Link to="/CocktailSavedListing">
                    <img src={listIcon} className="navbar-icon" alt="listIcon"/>
                </Link>
            </div>
            <div>
                <button type="image" onClick={() => {
                            firebase.auth().signOut();
                            navigate('/');
                        }}>
                        <img src={signOutIcon} className="navbar-icon" alt="signOutIcon"/>
                </button>
            </div>
        </div>
    );
}