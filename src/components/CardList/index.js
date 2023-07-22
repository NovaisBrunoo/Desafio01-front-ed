import { useEffect, useState } from 'react';
import api from '../../api/api';
import { getItem } from '../../utils/storage';
import './style.css';

export default function CardList() {
  const [listaPedidos, setListaPedidos] = useState([]);
  const item_id = '';

  async function GetPedidos() {
    try {
      const response = await api.get('/lista',
        {
          headers: {
            Authorization: `Bearer ${getItem('token')}`
          }
        });

      console.log(response.data)
      setListaPedidos(response.data)
      item_id = response.data.produto_id;
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    GetPedidos();
  }, [])

  function handelValor(valor) {

    const valorInteiro = valor;
    const valorReal = valorInteiro.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    return valorReal;
  }

  function handelQuantidade(valor, quantidade) {
    const valorInteiro = valor;
    const valorSomado = valorInteiro * quantidade;
    const valorReal = valorSomado.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    return valorReal;
  }


  function somaTotal(params) {
    const somatotal = listaPedidos.reduce((total, item) => {
      return total + item.valor * item.quantidade;
    }, 0);
    const valorInteiro = somatotal;
    const valorReal = valorInteiro.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    return valorReal;
  }


  async function handelApagar(item_id) {
    try {
      const response = await api.delete(`/lista/${item_id}`,
        {
          headers: {
            Authorization: `Bearer ${getItem('token')}`
          }
        });

      const newLista = listaPedidos.filter((item) => item.id !== item_id);
      setListaPedidos(newLista);
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handelApagar();
  }, [listaPedidos])

  return (
    <>
      {listaPedidos.map((pedido) => (
        <div className="cardLista">
          <div className="cardImg">
            <img src={pedido.imagem} alt="" />
          </div>
          <div className="cardDiscript">
            <strong>{pedido.nome_produto}</strong>
            <span>{pedido.descricao}</span>
            <div className="quantidadeProduto">
              <span>{`Quantidade: ${pedido.quantidade}`}</span>
              {/* <button>+</button> */}
              <button className="btnRemover" onClick={() => handelApagar(pedido.id)}>Remover</button>
            </div>

          </div>
          <div className="valor-pedidos">
            <div className="valorAVista">
              <span>Valor Unitario</span>
              <strong>{handelValor(pedido.valor)}</strong>
            </div>
            <div className="valorAPrazo">
              <span>Valor Total</span>
              <strong>{`X${pedido.quantidade}  ${handelQuantidade(pedido.valor, pedido.quantidade)}`}</strong>
            </div>
          </div>
        </div>


      ))}
      <div className="precoTotal">
        <strong className='valor-total'>Valor Total a pagar</strong>
        <span className='valor-total-real'>{somaTotal()}</span>
      </div>
    </>
  )
}