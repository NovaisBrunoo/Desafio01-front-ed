import { useState } from 'react';
import ShopCarbuy from '../../assets/icons/car-with-number.svg';
import ShopCar from '../../assets/icons/car.svg';
import ShopBag from '../../assets/icons/shoppingbag.svg';
import './style.css';

export default function Header() {
    const [car, setCar] = useState(false)

    return (
        <div className="header">
            <div className="logo">
                <img src={ShopBag} alt="logo sacola" />
            </div>
            <div className="logo_text">
                <strong>Good Bargain</strong>
            </div>
            <div className="carrinho">
                <img src={car ? ShopCarbuy : ShopCar} alt="carrinho" onClick={() => setCar(!car)} style={{ cursor: "pointer" }} />
            </div>
        </div>
    )
}