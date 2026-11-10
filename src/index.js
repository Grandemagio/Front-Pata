import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './pages/app/App';
import Eventos from './pages/projeto tcc/eventos/index';
import Projeto from './pages/projeto tcc/tela inicial/index';
import Login from './pages/projeto tcc/autenticacao/Login';
import Cadastro from './pages/projeto tcc/autenticacao/Cadastro';
import { PerfilAdotante, ResultadoMatch, DetalheAnimal, Favoritos, MinhasAdocoes, MinhasDoacoes, Doar, Contato, MinhaConta, Admin } from './pages/projeto tcc/funcionalidades/PaginasAPI';
import {BrowserRouter,Routes,Route} from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Projeto/>} />
      <Route path='/sobre' element={<Projeto/>} />
      <Route path='/adotar' element={<Eventos/>} />
      <Route path='/incio' element={<App/>} />
      <Route path='/inicio' element={<App/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/cadastro' element={<Cadastro/>} />
      <Route path='/perfil-adotante' element={<PerfilAdotante/>} />
      <Route path='/match' element={<ResultadoMatch/>} />
      <Route path='/animal/:id' element={<DetalheAnimal/>} />
      <Route path='/favoritos' element={<Favoritos/>} />
      <Route path='/minhas-adocoes' element={<MinhasAdocoes/>} />
      <Route path='/minhas-doacoes' element={<MinhasDoacoes/>} />
      <Route path='/doar' element={<Doar/>} />
      <Route path='/contato' element={<Contato/>} />
      <Route path='/minha-conta' element={<MinhaConta/>} />
      <Route path='/admin' element={<Admin/>} />
    </Routes>
    </BrowserRouter>
  </React.StrictMode>
);


