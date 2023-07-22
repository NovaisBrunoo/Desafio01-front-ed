import { useState } from 'react';
import api from '../../api/api';
import poligono from '../../assets/icons/poligno.svg';
import { setItem } from '../../utils/storage';
import './style.css';

export default function ModalLogin({ setShowModal, setProfile, setPagelist }) {
  const [formLogin, setFormLogin] = useState({
    email: '',
    senha: ''
  })
  async function handelSubmit(e) {
    e.preventDefault();

    try {
      if (!formLogin.email || !formLogin.senha) {
        console.log("Preencha todos os campos")
        return
      }
      const response = await api.post('/login', {
        email: formLogin.email,
        senha: formLogin.senha
      });

      console.log(response.data)
      setProfile(true)
      setItem('token', response.data.token);
      setItem('id', response.data.users.id);
      setItem('nome', response.data.users.nome);
      setPagelist(false)
      setShowModal(false)
    } catch (error) {
      console.log(error)
    }
  }
  function handleChangeForm(event) {
    setFormLogin({ ...formLogin, [event.target.name]: event.target.value });
  }



  return (
    <div className="containerModal" >
      <img className='poligno' src={poligono} alt="" />
      <div className="modal">
        <form className='form-login' onSubmit={handelSubmit}>
          <label htmlFor="">E-mail</label>
          <input
            type="text"
            name='email'
            placeholder='Digite seu email'
            value={formLogin.email}
            onChange={(e) => handleChangeForm(e)}
          />
          <label htmlFor="senha">Senha</label>
          <input
            type="password"
            name='senha'
            placeholder='Digite sua senha'
            value={formLogin.senha}
            onChange={(e) => handleChangeForm(e)}
          />
          <div className="contanier-btn">
            <button className='btn-login' sub>Entrar</button>
            <button className='btn-cancelar' onClick={() => setShowModal(false)}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  )
}