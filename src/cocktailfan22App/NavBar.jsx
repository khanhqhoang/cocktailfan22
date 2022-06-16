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
    const basketCocktailList = props.basketCocktailList;
    //const [basketCount, setBasketCount] = useState(0);
    //setBasketCount(basketCocktailList.length);

    return(
        <div className="navbar">      
            <div>
                <Link state={basketCocktailList} to="/CocktailFanApp">
                    <img src={homeIcon} className="navbar-icon" alt="homeIcon"/>
                </Link>
                
            </div>
            <div className="navbar-basket-div">
                <p>Basket Item Count: {basketCocktailList.length}</p>
                <Link to="/CocktailBasketListing">
                    <img src={basketIcon} className="navbar-icon" alt="basketIcon"/>
                </Link>
            </div>
            <div className="navbar-basket-div">
                <p>Favorite Item List Count: {0}</p>
                <Link state={basketCocktailList} to="/CocktailSavedListing">
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