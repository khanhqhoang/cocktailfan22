import React, { useState, useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import "./styles/CocktailFanApp.css";
import NavBar from './NavBar';
//import Button from 'react-bootstrap/Button';
import homeIcon from './graphics/home.PNG';

export default function CocktailDetails(props){
    const {idDrink} = useParams();
    const [cocktail, setCocktail] = useState([]);
    //const [entries, setEntries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const location = useLocation();
    const basketCocktailList = location.state;

    useEffect(()=> {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`;
        const getCocktail = async () => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.drinks) {
                 const {
                    strDrink: name,
                    strDrinkThumb: image,
                    strCategory: category,
                    strGlass: glass,
                    strInstructions: instructions,
                    strAlcoholic: info,
                    strIngredient1,
                    strIngredient2,
                    strIngredient3,
                    strIngredient4,
                    strIngredient5,
                } = data.drinks[0];
                const ingredients = [
                    strIngredient1,
                    strIngredient2,
                    strIngredient3,
                    strIngredient4,
                    strIngredient5,
                ];
                const cocktailItem = {
                    name,
                    image,
                    info,
                    category,
                    glass,
                    instructions,
                    ingredients,
                };
                
                setCocktail(cocktailItem);
                setIsLoading(false);
                setHasError(false);
            } 
            else {
                setCocktail(null);
                setIsLoading(false);
                setHasError(false);
            }
        }
        catch (e) {
            console.error(e.toString);
            setIsLoading(false);
            setHasError(true);
            } 
        }
       //fetch data from api
        getCocktail(); 
    }, [idDrink]);
    if (isLoading) {
        return <p>Loading...</p>;
    }
    if (hasError) {
        return <p>Opps.Something wrong!</p>;
    }
   
    return(
        <div>
            <NavBar basketCocktailList={basketCocktailList}/>
            <div className="item-details">
                <p><img src={cocktail.image} alt="drinkImg" className="img-details"/></p>
                <div>
                    <ul>
                        <li><span className="font-bold">Name :</span> {cocktail.name}</li>
                        <li><span className="font-bold">Category : </span>{cocktail.category}</li>
                        <li><span className="font-bold">Info : </span>{cocktail.info}</li>
                        <li><span className="font-bold">Glass : </span>{cocktail.glass}</li>
                        <li><span className="font-bold">Instructions: </span>{cocktail.instructions}</li>
                        <li><span className="font-bold">
                            Ingredients :</span>{" "}
                                {cocktail.ingredients.map((item, index) => {
                                    return item ? <span key={index}>{item}</span> : null;
                                })}
                        </li>
                    </ul>
                    <Link state={basketCocktailList} to="/CocktailFanApp">
                        <img src={homeIcon} className="navbar-icon" alt="homeIcon"/>
                    </Link>
                </div>            
            </div>
        </div>
    );
}