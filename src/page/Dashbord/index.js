import { useEffect, useState } from "react";
import api from "../../api/api";
import Header from "../../components/Header";
import "./style.css";

export default function Dashbord() {
    const [produtos, setProdutos] = useState([])

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
            <Header />
            <h1>Produtos</h1>
        </div>
    )
}