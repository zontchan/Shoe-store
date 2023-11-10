import {BrowserRouter as Router,Route, Routes} from "react-router-dom";
import './css/style.css';
import Static from "./components/Static";
import Main from "./pages/Main";
import CatalogPage from "./pages/CatalogPage";
import About from "./pages/About";
import Contacts from "./pages/Contacts";
import Product from "./pages/Product";
import NotFound from "./pages/NotFound";
import CartPage from "./pages/CartPage";
import {useEffect, useRef} from "react";
import {useSelector} from "react-redux";
import OrderDone from "./pages/OrderDone";

function App() {

  //Логика добавления корзины в local storage
  const isMounted = useRef(false);
  const {items} = useSelector((state) => state.cart);

  useEffect(() => {
    if(isMounted.current) {
      const json = JSON.stringify(items);
      localStorage.setItem('cart', json);
    }
    isMounted.current = true;
  }, [items]);

  return (
    <div className="App">
        <Router>
      <Static>
        <Routes>
          <Route path={'/'} element={<Main/>}/>
          <Route path={'/catalog'} element={<CatalogPage/>}/>
          <Route path={'/about'} element={<About/>}/>
          <Route path={'/contacts'} element={<Contacts/>}/>
          <Route path={'/catalog/:id'} element={<Product/>}/>
          <Route path={'/cart'} element={<CartPage/>}/>
          <Route path={'/order-done'} element={<OrderDone/>}/>
          <Route path={'*'} element={<NotFound/>}/>
        </Routes>
      </Static>
        </Router>
    </div>
  );
}

export default App;
