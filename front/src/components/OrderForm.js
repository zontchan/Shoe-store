import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {clearOrderState, sendOrder} from "../reducers/orderReducer";
import Preloader from "./Preloader";
import {clearCart} from "../reducers/cartReducer";
import {useNavigate} from "react-router-dom";
import ErrorMessage from "./ErrorMessage";
import {InputMask} from 'primereact/inputmask';

export default function OrderForm() {
    const {loading, error, success} = useSelector((state) => state.order);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        phone: '',
        address: '',
        isChecked: false,
    });
    const dispatch = useDispatch();
    const {items} = useSelector((state) => state.cart);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            owner: {
                phone: formData.phone,
                address: formData.address,
            },
            items: items.map((o) => ({
                id: o.id,
                price: o.totalItemPrice,
                count: o.amount,
            }))
        }
        dispatch(sendOrder(data));
        setFormData({phone: '', address: '', isChecked: false});
    }
    const handleChange = (e) => {
        if(error) dispatch(clearOrderState());
        if(e.target.id === 'agreement') setFormData(prevState => ({...prevState, isChecked: e.target.checked}));
        setFormData(prevState => ({...prevState, [e.target.id]: e.target.value}))
    }

    useEffect(() => {
        if(success) {
            dispatch(clearCart());
            navigate('/order-done');
            dispatch(clearOrderState());
        }
    }, [success]);

    const isButtonDisabled = items.length === 0 || !formData.phone || !formData.address || !formData.isChecked;
    return (
        <section className="order">
            <h2 className="text-center">Оформить заказ</h2>
            <div className="card" style={{maxWidth: '30rem', margin: '0 auto'}}>
                <form className="card-body" onSubmit={(e) => handleSubmit(e)}>
                    <div className="form-group">
                        <label htmlFor="phone">Телефон</label>
                        <InputMask className="form-control"
                                   id="phone"
                                   value={formData.phone}
                                   onChange={(e) => handleChange(e)}
                                   required={true}
                                   mask="+7(999)-999-9999"
                                   placeholder="Ваш телефон"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Адрес доставки</label>
                        <input className="form-control"
                               id="address"
                               placeholder="Адрес доставки"
                               required={true}
                               value={formData.address}
                               onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div className="form-group form-check">
                        <input type="checkbox"
                               className="form-check-input"
                               id="agreement"
                               required={true}
                               checked={formData.isChecked}
                               onChange={(e) => handleChange(e)}
                        />
                        <label className="form-check-label" htmlFor="agreement">Согласен с правилами
                            доставки</label>
                    </div>
                    {loading ? <Preloader/> : <button type="submit" className="btn btn-outline-secondary" disabled={isButtonDisabled}>Оформить</button>}
                    {error && <ErrorMessage text={'Ошибка при оформлении заказа.'}/>}
                </form>
            </div>
        </section>
    );
}
