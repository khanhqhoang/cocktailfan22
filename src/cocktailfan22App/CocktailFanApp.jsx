import React from 'react';
import imgheader from './graphics/cocktail_header.jpg';
import "./styles/CocktailFanApp.css";

function NavBar() {
    return(
        <div>
        My nav bar
        </div>
    );
}
export default function CocktailFanApp() {
    return (
        <div>
            <div>
                <img src={imgheader} className="header" alt=""headerimg/>
            </div>
            <div>
                <NavBar/>
            </div>
        </div>
    );
}