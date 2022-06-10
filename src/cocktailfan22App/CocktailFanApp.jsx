import React, { useState, useEffect } from 'react';
import "./styles/CocktailFanApp.css";
import { Link } from 'react-router-dom';
import NavBar from './NavBar';

function ListingCocktailAll(props){
    const gotDrinks = props.gotDrinks.drinks;
    const drinkCat = props.drinkCat;
    console.log(gotDrinks);
    return(
        <div>
            <div className="listingItem-header">
                <p>Row #</p>
                <p>Id</p>
                <p>Name</p>
                <p>Category</p>
                <p>Image</p>
            </div>
            {
                gotDrinks && (gotDrinks).map((item, idx) =>
                <div key={idx} className="listingItem-details color">
                    <p>{++idx}</p>              
                    <p>{item.idDrink}</p>
                    <p>
                        <Link to={`/CocktailDetails/${item.idDrink}`}>
                            {item.strDrink}
                        </Link>
                    </p>
                    <p>{drinkCat==='Ordinary_Drink'?'Ordinary Drink':'Cocktail'}</p>
                    <p><img src={item.strDrinkThumb+"/preview"} alt="drinkImg" className="img-thumbnail"/></p>             
                </div>      
           )
            }
        </div>
    );
}

export default function CocktailFanApp() {
    const [dropdown, setdropdown] = useState('Cocktail');
    const [cocktailList, setCocktailList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const dropdownChange = (event) => {
        setdropdown(event.target.value);
    };
    
//eslint-disable-next-line
    useEffect(() => {
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${dropdown}`)
        .then((response) => response.json())
        .then(
            (drinks) => {
                console.log(drinks);
                setCocktailList(drinks);
                setIsLoading(false);
            }
        )
        .catch((err) => {
                setHasError(true);
                setIsLoading(false);
        });
    },[dropdown]);
    if (isLoading){
        return <p>Loading..</p>
    }
    if (hasError) {
        return <p>Opps.Something goes wrong!</p>;
    }
    //eslint-disable-next-line
    return (
        <div>
            <div>
                <NavBar/>
            </div>
            <div>
                <label>
                    Select Drink Category:&nbsp;  
                    <select className="dropdown" value={dropdown} onChange={dropdownChange}>                   
                        <option value="Cocktail">Cocktail</option>
                        <option value="Ordinary_Drink">Ordinary Drink</option>
                    </select>
                </label>
            </div>
            <div>
                <ListingCocktailAll gotDrinks={cocktailList} drinkCat={dropdown}/>
            </div>
        </div>
    );
}