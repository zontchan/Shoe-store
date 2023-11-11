import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getBestSellers} from "../reducers/bestSellersReducer";
import Preloader from "./Preloader";
import Item from "./Item";
import ErrorMessage from "./ErrorMessage";

export default function BestSellers() {
   const bestSellers = useSelector((state) => state.bestSellers);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getBestSellers());
    }, []);

    return (
            <section className="top-sales">
                <h2 className="text-center">Хиты продаж!</h2>
                {bestSellers.error && <>
                    <ErrorMessage text={'Ошибка при загрузке хитов продаж.'}/>
                    <button className="btn btn-outline-primary text-center" onClick={() => dispatch(getBestSellers())}>Попробовать снова</button>
                </>}
                <div className="row">
                    {bestSellers.status === 'loading' ? <Preloader/> : bestSellers.data.map((o) => <Item key={o.id} product={o}/>)}
                </div>
            </section>
    );
}