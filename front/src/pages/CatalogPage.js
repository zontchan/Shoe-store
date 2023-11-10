import Catalog from "../components/Catalog";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getProducts, setIsMore, setSearchValue} from "../reducers/catalogReducer";


export default function CatalogPage() {
    const catalog = useSelector((state) => state.catalog);
    const [value, setValue] = useState(catalog.searchValue);

    const dispatch = useDispatch();

    useEffect(() => {
       setValue(catalog.searchValue)
           // dispatch(getProducts(0));  //из за этого ухожят два запроса при смене текста в поле поиска и повторном поиске
        dispatch(setIsMore(true));
   }, [catalog.searchValue]);

   useEffect(() => {
     //dispatch(getProducts(0));
     return () => {
         dispatch(setSearchValue(''));
     }
   }, []);

   const handleSubmit = (e) => {
       e.preventDefault();
       dispatch(setSearchValue(value));
       dispatch(getProducts(0));
   }

    return (
        <div>
            <Catalog catalog={catalog}>
                <form className="catalog-search-form form-inline" onSubmit={(e) => handleSubmit(e)}>
                    <input value={value} onChange={(e) => setValue(e.target.value)} className="form-control" placeholder="Поиск"/>
                </form>
            </Catalog>
        </div>
    );
}