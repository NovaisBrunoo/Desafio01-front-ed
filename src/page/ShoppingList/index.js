import { useEffect, useState } from "react";
import api from "../../api/api";
import arrowLeft from "../../assets/icons/arrow-left.svg";
import arrowRight from "../../assets/icons/arrow-right.svg";
import CardList from "../../components/CardList";
import Header from "../../components/Header";
import "./style.css";

export default function ShoppingList() {
    const [listaDeCompras, setListaDeCompras] = useState([])

    async function getlistaDePedidos() {
        try {
            const response = await api.get('/lista')
            setListaDeCompras(response.data)
            console.log(response.data)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getlistaDePedidos()
    }, [])

    return (
        <div className="container">
            <Header />

            <div className="banner">
                <img className="arrow" src={arrowLeft} alt="seta para esquerda" />
                <img className="arrow" src={arrowRight} alt="seta para direita" />
            </div>
            <div className="navbar">
                <strong className="title-navbar">produtos</strong>
            </div>
            <div className="hero-lista">
                <CardList />
            </div>
        </div>
    )
}