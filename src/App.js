import './cocktailfan22App/styles/CocktailFanApp.css';
import { Route, Routes } from 'react-router-dom';
import Home from './cocktailfan22App/Home';
import CocktailFanApp from './cocktailfan22App/CocktailFanApp';
import CocktailDetails from './cocktailfan22App/CocktailDetails';
import CocktailSavedListing from './cocktailfan22App/CocktailSavedListing';
import CocktailBasketListing from './cocktailfan22App/CocktailBasketListing';
import "./cocktailfan22App/styles/CocktailFanApp.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import header from './cocktailfan22App/graphics/cocktail_header.jpg';

function App() {
  return (
    <div>
      <div>
        <img src={header} className="header" alt=""headerimg/>
      </div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="CocktailFanApp" element={<CocktailFanApp />}></Route>
        <Route path="CocktailBasketListing" element={<CocktailBasketListing />}></Route>
        <Route path="CocktailDetails/:idDrink" element={<CocktailDetails />}></Route>
        <Route path="CocktailSavedListing" element={<CocktailSavedListing />}></Route>       
      </Routes>
    </div>
  );
}

export default App;
