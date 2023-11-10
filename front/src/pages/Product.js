import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getProduct} from "../reducers/productReducer";
import Preloader from "../components/Preloader";
import {addItem} from "../reducers/cartReducer";
import ErrorMessage from "../components/ErrorMessage";

export default function Product() {
   const [selectedSize, setSelectedSize] = useState('');
   const [currentAmount, setCurrentAmount] = useState(1);
   const {id} = useParams();
   const {data, loading, error} = useSelector((state) => state.product);
   const dispatch = useDispatch();

   useEffect(() => {
     dispatch(getProduct(id));
   }, []);

   const increaseAmountHandler = () => {
       if(currentAmount === 10) return
        setCurrentAmount(prevState => prevState + 1);
   }
    const decreaseAmountHandler = () => {
        if(currentAmount === 1) return
        setCurrentAmount(prevState => prevState - 1);
    }
    const handleAddToCart = () => {
       const item = {...data, selectedSize: selectedSize, amount: currentAmount};
       dispatch(addItem(item));
    }

   const isSizesAvailable = data.sizes && data.sizes.filter((o) => o.available === true).length !== 0;


    return (
    <section className="catalog-item">
        {error ? <><ErrorMessage text={'Не удалось загрузить товар.'}/>
                   <button className="btn btn-outline-primary text-center" onClick={() => dispatch(getProduct(id))}>Попробовать снова</button>
           </> : <>
            { loading ? <Preloader/> : <><h2 className="text-center">{data.title}</h2>
                <div className="row product">
                    <div className="col-5">
                        <img src={data.images && data.images[0]}
                             className="img-fluid" alt=""/>
                    </div>
                    <div className="col-7">
                        <table className="table table-bordered">
                            <tbody>
                            <tr>
                                <td>Артикул</td>
                                <td>{data.sku}</td>
                            </tr>
                            <tr>
                                <td>Производитель</td>
                                <td>{data.manufacturer}</td>
                            </tr>
                            <tr>
                                <td>Цвет</td>
                                <td>{data.color}</td>
                            </tr>
                            <tr>
                                <td>Материалы</td>
                                <td>{data.material}</td>
                            </tr>
                            <tr>
                                <td>Сезон</td>
                                <td>{data.season}</td>
                            </tr>
                            <tr>
                                <td>Повод</td>
                                <td>{data.reason}</td>
                            </tr>
                            </tbody>
                        </table>
                        <div className="text-center">
                            <p>Размеры в наличии: {!isSizesAvailable && 0}{data.sizes && data.sizes.map((o) => o.available &&
                                <span key={o.size}
                                      className={`catalog-item-size ${selectedSize === o.size && 'selected'}`}
                                      onClick={() => setSelectedSize(o.size)}>{o.size}</span>)}
                            </p>

                            {isSizesAvailable && <p>Количество: <span className="btn-group btn-group-sm pl-2">
                                        <button className="btn btn-secondary" onClick={decreaseAmountHandler}>-</button>
                                        <span className="btn btn-outline-primary">{currentAmount}</span>
                                        <button className="btn btn-secondary" onClick={increaseAmountHandler}>+</button>
                                    </span>
                            </p>}
                        </div>
                        {isSizesAvailable && <Link to={'/cart'}><button
                            className="btn btn-danger btn-block btn-lg"
                            disabled={!selectedSize}
                            onClick={handleAddToCart}>В корзину</button></Link>}
                    </div>
                </div></>}</>}
    </section>
    );
}