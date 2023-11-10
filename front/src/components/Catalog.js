import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import Categories from "./Categories";
import Preloader from "./Preloader";
import GetMore from "./GetMore";
import Cards from "./Cards";
import {getProducts, setIsMore} from "../reducers/catalogReducer";
import {getCategories, setActive} from "../reducers/categoriesReducer";
import ErrorMessage from "./ErrorMessage";
import NothingFound from "./NothingFound";

export default function Catalog({children}) {

    const catalog = useSelector((state) => state.catalog);
    const categories = useSelector((state) => state.categories);
    const dispatch = useDispatch();

   useEffect(() => {
       dispatch(setIsMore(true));
   }, [categories.categoryId]);


    useEffect(() => {
        dispatch(getCategories());
        if (!catalog.loading) {
            dispatch(setActive(0))
            dispatch(getProducts(0));
        }
    }, []);

    const handleReload = () => {
        dispatch(getCategories());
        dispatch(getProducts(0));
    }

   const catalogLoading = catalog.loading && categories.loading;
   const error = catalog.error || categories.error;

    return (
        <section className="catalog">
            <h2 className="text-center">Каталог</h2>
            {error ?
                <><ErrorMessage text={'Ошибка при загрузке каталога.'}/>
                <button className="btn btn-outline-primary text-center" onClick={handleReload}>Попробовать снова</button></>
                   :
                <>
                {
                    catalogLoading === false
                    &&  (<>
                        {children}
                        <Categories/>
                        {!catalog.loading && catalog.data.length === 0 ? <NothingFound/> :
                            <>
                            <Cards catalog={catalog.data} loading={catalog.loading}/>
                            <GetMore catalog={catalog}/>
                            </>
                        }
                    </>)
                }
            </>}
            {catalogLoading && <Preloader/>}
        </section>
    );
}