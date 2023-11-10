import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getProducts, setSearchValue} from "../reducers/catalogReducer";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [value, setValue] = useState('');
    const {items} = useSelector((state) => state.cart);
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const handleClick = (e) => {
       if(isOpen){
           if(value.length !== 0)
           {
               dispatch(setSearchValue(value));
               dispatch(getProducts(0));
               setValue('');
               setIsOpen(false);
               navigate('/catalog');
           }
           else{
              setIsOpen(prevState => !prevState);
           }
       }
       else setIsOpen(prevState => !prevState);
   }

   const handleSubmit = (e) => {
       e.preventDefault();
       if(value.length !== 0) {
           console.log('sss')

           dispatch(setSearchValue(value));
           dispatch(getProducts(0));

           setValue('');

           setIsOpen(false);
           navigate('/catalog');
       }
   }

    return (
        <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <Link className={"navbar-brand"} to='/'>
                <img src={'/static/header-logo.png'} alt="Bosa Noga"/>
            </Link>
            <div className="collapse navbar-collapse" id="navbarMain">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className={"nav-link"} to='/'>Главная</Link>
                    </li>
                    <li className="nav-item">
                        <Link className={"nav-link"} to='/catalog'>Каталог</Link>
                    </li>
                    <li className="nav-item">
                        <Link className={"nav-link"} to='/about'>О магазине</Link>
                    </li>
                    <li className="nav-item">
                        <Link className={"nav-link"} to='/contacts'>Контакты</Link>
                    </li>
                </ul>
                <div>
                    <div className="header-controls-pics">
                        <div data-id="search-expander"
                             onClick={(e) => handleClick(e)}
                             className="header-controls-pic header-controls-search"></div>
                        <Link to={'/cart'} className="header-controls-pic header-controls-cart">
                            {items.length !== 0 && <div className="header-controls-cart-full">{items.length}</div>}
                            <div className="header-controls-cart-menu"></div>
                        </Link>
                    </div>
                    <form data-id="search-form"
                          className={`header-controls-search-form form-inline ${isOpen !== true && 'invisible'}`}
                          onSubmit={(e) => handleSubmit(e)}>
                        <input value={value} onChange={(e) => setValue(e.target.value)} className="form-control" placeholder="Поиск"/>
                    </form>
                </div>
            </div>
        </nav>
    );
}