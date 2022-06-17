import React, { useState, useEffect } from 'react';
import "./styles/CocktailFanApp.css";
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import Button from 'react-bootstrap/Button';
import swal from 'sweetalert';

function ListingCocktailAll(props, item){
    const gotDrinks = props.gotDrinks.drinks;
    const drinkCat = props.drinkCat;
    let basketCocktailList = props.basketCocktailList;
    let setBasketCocktailList = props.setBasketCocktailList;
   
    //check if cocktail to be added already in the basket
    function cocktailExists(cocktailName) {
        return basketCocktailList.some(function(el) {
            return el.strDrink === cocktailName;
        }); 
    }   
    const onCocktailSelect = (event,item) => {

        event.preventDefault();
        if (!cocktailExists(item.strDrink)){
            setBasketCocktailList([...basketCocktailList, item]);
            swal(item.strDrink + " has been added to the basket!", "success");
        }
        else{
            swal(item.strDrink + " already exists in the basket. No duplicate entry allowed!", "info");
        }
        
    }

    return(
        
            <div>
                <div className="listingItem-header">
                    <p>Row #</p>
                    <p>Id</p>
                    <p>Name</p>
                    <p>Category</p>
                    <p>Image</p>
                    <p>Add to Basket</p>
                </div>

                {

                    gotDrinks && (gotDrinks).map((item, idx) =>
                        <form onSubmit={(e)=>onCocktailSelect(e,item)}>
                            <div key={item.idDrink} className="listingItem-details color">
                                <p>{++idx}</p>              
                                <p>{item.idDrink}</p>
                                <p>
                                    <Link state={basketCocktailList} to={`/CocktailDetails/${item.idDrink}`}>
                                        {item.strDrink}
                                    </Link>
                                </p>
                                <p>{drinkCat==='Ordinary_Drink'?'Ordinary Drink':'Cocktail'}</p>
                                <p><img src={item.strDrinkThumb+"/preview"} alt="drinkImg" className="img-thumbnail"/></p>             
                                <Button type="submit" className="select-button"variant="primary">Select</Button>
                            </div>
                        </form>
                    )
            
                }
                
            </div>
        
        
    );
}

export default function CocktailFanApp() {
    const [dropdown, setdropdown] = useState('Cocktail');
    const [cocktailList, setCocktailList] = useState([]);
    const [basketCocktailList, setBasketCocktailList] = useState([]);
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
                <NavBar 
                    basketCocktailList= {basketCocktailList} 
                />
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
                <ListingCocktailAll 
                    gotDrinks={cocktailList} 
                    drinkCat={dropdown}
                    basketCocktailList={basketCocktailList}
                    setBasketCocktailList={setBasketCocktailList}
                />
            </div>
        </div>
    );
}