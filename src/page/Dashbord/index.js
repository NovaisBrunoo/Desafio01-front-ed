import { useEffect, useState } from "react";
import api from "../../api/api";
import arrowLeft from "../../assets/icons/arrow-left.svg";
import arrowRight from "../../assets/icons/arrow-right.svg";
import Card from "../../components/Card";
import Header from "../../components/Header";
import ModalLogin from "../../components/ModalLogin";
import "./style.css";

export default function Dashbord() {
    const [showModal, setShowModal] = useState(false)
    const [produtos, setProdutos] = useState([])
    const [profile, setProfile] = useState(false)
    const [pagelist, setPagelist] = useState(true)


    async function getprodutos() {
        try {
            const response = await api.get('/produtos')
            setProdutos(response.data)
            console.log(response.data)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getprodutos()
    }, [])

    return (
        <div className="container">
            <Header setShowModal={setShowModal} profile={profile} pagelist={pagelist} setPagelist={setPagelist} />
            {showModal && <ModalLogin setShowModal={setShowModal} setProfile={setProfile} setPagelist={setPagelist} />}
            <div className="banner">
                <img className="arrow" src={arrowLeft} alt="seta para esquerda" />
                <img className="arrow" src={arrowRight} alt="seta para direita" />
            </div>
            <div className="navbar">
                <strong className="title-navbar">produtos</strong>
            </div>
            <div className="hero">
                {produtos.map((produto) => (
                    <Card key={produto.id} produto={produto} />
                ))}

            </div>
        </div>
    )
}