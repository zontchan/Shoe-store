import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {deleteItem} from "../reducers/cartReducer";

export default function Cart() {
    const {items, totalPrice} = useSelector((state) => state.cart);
    const {loading, success} = useSelector((state) => state.order);
    const dispatch = useDispatch();

    const handleDelete = (id, size) => {
        dispatch(deleteItem({id, size}));
    }

    if(loading || success) return null;
    return (
        <section className="cart">
            <h2 className="text-center">Корзина</h2>
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Название</th>
                    <th scope="col">Размер</th>
                    <th scope="col">Кол-во</th>
                    <th scope="col">Стоимость</th>
                    <th scope="col">Итого</th>
                    <th scope="col">Действия</th>
                </tr>
                </thead>
                <tbody>
                    {items.map((o) => <tr key={Math.random()}><td scope="row">{items.indexOf(o) + 1}</td>
                        <td><Link to={`/catalog/${o.id}`}>{o.title}</Link></td>
                        <td>{o.selectedSize}</td>
                        <td>{o.amount}</td>
                        <td>{o.price} руб.</td>
                        <td>{o.totalItemPrice} руб.</td>
                        <td>
                            <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(o.id, o.selectedSize)}>Удалить</button>
                        </td></tr>)}
                <tr>
                    <td colSpan="5" className="text-right">Общая стоимость</td>
                    <td>{totalPrice} руб.</td>
                </tr>
                </tbody>
            </table>
        </section>
    );
}
