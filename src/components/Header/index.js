import { useState } from 'react';
import { Link } from 'react-router-dom';
import ShopCarbuy from '../../assets/icons/car-with-number.svg';
import ShopCar from '../../assets/icons/car.svg';
import profileicon from '../../assets/icons/profile.svg';
import ShopBag from '../../assets/icons/shoppingbag.svg';
import { getItem, removeItem } from '../../utils/storage';
import './style.css';

export default function Header({ setShowModal, profile, setPageList, pagelist }) {
    const [car, setCar] = useState(false)

    const name = getItem('nome')

    function logout() {
        removeItem('token')
        removeItem('id')
        removeItem('nome')
    }

    return (
        <div className="header">
            {pagelist ?
                <div className="logo">
                    <Link to={'/'}><img src={profile ? profileicon : ShopBag} alt="logo sacola" /></Link>
                    <strong onClick={() => setShowModal(true)}>Login</strong>
                </div> :
                <div className="logo">
                    <Link to={'/'}><img src={profile ? profileicon : ShopBag} alt="logo sacola" /></Link>
                    <Link to={'/'}><strong onClick={() => logout()}>Logout</strong></Link>
                </div>
            }
            <div className="logo_text">
                <strong>Good Bargain</strong>
            </div>
            <div className="carrinho">
                <Link to={'/ShoppingList'}><img src={car ? ShopCarbuy : ShopCar} alt="carrinho" /></Link>
            </div>


        </div>
    )
}