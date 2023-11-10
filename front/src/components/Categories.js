import {useDispatch, useSelector} from "react-redux";
import {setActive} from "../reducers/categoriesReducer";
import {getProducts} from "../reducers/catalogReducer";
import Preloader from "./Preloader";

export default function Categories() {

    const dispatch = useDispatch();
    const categories = useSelector((state) => state.categories);
    const allItems =[{title: 'Все', id: 0}, ...categories.data];

    const handleCategoryChange = (e, id) => {
        e.preventDefault();
        dispatch(setActive(id));
        dispatch(getProducts(0));
    }
    if(categories.error) return null;
    return(
        <ul className="catalog-categories nav justify-content-center">
            {categories.loading ? <Preloader/> : <>{allItems.map((o) => <li key={o.id} className="nav-item" onClick={(e) => handleCategoryChange(e, o.id)}>
                    <a className={`nav-link ${categories.categoryId === o.id && 'active'}`} href="#">{o.title}</a>
                </li>)}</>}
        </ul>
    );
}