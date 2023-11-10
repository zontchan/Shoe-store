
import {getProducts} from "../reducers/catalogReducer";
import {useDispatch} from "react-redux";
import ErrorMessage from "./ErrorMessage";

export default function GetMore({catalog}) {
    const {isMore} = catalog;
    const dispatch = useDispatch();

    const getMoreHandler = () => {
        dispatch(getProducts(catalog.data.length));
    }
    if(catalog.loading) return null;
    return (
        <div className="text-center">
            {catalog.getMoreError && <ErrorMessage text={'Ошибка при загрузке дополнительных товаров.'}/>}
        {isMore && <button className="btn btn-outline-primary" onClick={getMoreHandler}>Загрузить ещё</button>}
        </div>
    );
}