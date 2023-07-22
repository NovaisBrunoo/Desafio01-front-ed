import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
import carrinho from '../../assets/icons/car.svg';
import { getItem } from '../../utils/storage';
import './style.css';

export default function Card({ produto }) {
    const valorInteiro = produto.valor;
    const valorReal = valorInteiro.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    const valorParcela = valorInteiro / 10;
    console.log(produto.id)

    const navegate = useNavigate();

    async function handelCompra() {
        try {
            const response = await api.post('/criarpedido', {
                usuario_id: Number(getItem('id')),
                produto_id: Number(produto.id),
                nome_produto: produto.nome,
                descricao: produto.descricao,
                imagem: produto.imagem,
                quantidade: 1,
                valor: produto.valor,
            },
                {
                    headers: {
                        Authorization: `Bearer ${getItem('token')}`
                    }

                });
            console.log(response.data)
            navegate('/ShoppingList')
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className="card">
            <img className='card-img' src={produto.imagem} alt="foto do produto" />
            <strong className='title-produto'>{produto.nome}</strong>
            <span className='valor'>{valorReal}</span>
            <span className='parcela'>ou 10x de {valorParcela.toFixed(2)}</span>
            <div className="btn-card">
                <button className="btn" onClick={() => handelCompra()}>Comprar</button>
                <button className="btn" onClick={() => handelCompra()}><img src={carrinho} alt="adc.carrinho" /></button>
            </div>
        </div>
    )
}