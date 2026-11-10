import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Index.scss';

function Index() {
  const [mostrarBusca, setMostrarBusca] = useState(false);
  const [textoBusca, setTextoBusca] = useState('');

  const toggleBusca = () => {
    setMostrarBusca(!mostrarBusca);
  };

  return (
    <div className="inicial">

      {/* ========================= */}
      {/* BARRA INICIAL */}
      {/* ========================= */}

      <header className="inicio">

        <img
          className="logo-pata"
          src="./assets/image/logo-pata.png"
          alt="Logo Pata Amiga"
        />

        <nav className="menu-navegacao">

          <Link to="/" className="nav-item">
            Inicio
          </Link>

          <Link to="/adotar" className="nav-item">
            Adotar
          </Link>

          <Link to="/doar" className="nav-item">
            Doar
          </Link>

          <Link to="/sobre" className="nav-item">
            Sobre
          </Link>

          <Link to="/contato" className="nav-item">
            Contato
          </Link>

          <Link to="/match" className="nav-item">
            Meu Match
          </Link>

        </nav>


        {/* ========================= */}
        {/* PESQUISA E ÍCONES */}
        {/* ========================= */}

        <div className="container-pesquisa">

          <input
            type="text"
            className="campo-pesquisa"
            placeholder="Buscar..."
            value={textoBusca}
            onChange={(e) => setTextoBusca(e.target.value)}
            autoFocus
          />

          <img
            className="pesquisa"
            src="./assets/image/pesquisa.png"
            alt="Lupa de pesquisa"
            onClick={toggleBusca}
          />


          {/* LOGIN */}

          <Link className="log" to="/login">

            <img
              className="log-in"
              src="./assets/image/log-up.png"
              alt="Log in"
            />

          </Link>


          {/* FAVORITOS */}

          <Link className="fav" to="/favoritos">

            <img
              className="favorito"
              src="./assets/image/favorito.png"
              alt="Favorito"
            />

          </Link>

        </div>

      </header>


      {/* ========================= */}
      {/* PRIMEIRA PARTE */}
      {/* ========================= */}

      <div className="quadrado-verde">

        <div className="texto-quadrado">

          <h1 className="lar">
            Um lar pode transformar uma vida.
          </h1>

          <p className="paragrafo">
            Milhares de pets esperam por uma família.
            Talvez o próximo encontro que você procura
            esteja aqui.
          </p>

        </div>


        {/* IMAGEM */}

        <div className="img-quadrado">

          <img
            className="f1"
            src="/assets/image/cachorro-gato.jpg"
            alt="Cachorro e gato para adoção"
          />

        </div>


        {/* BOTÃO ADOTAR */}

        <Link to="/adotar" className="adotar">

          🐾 Quero Adotar

          <img
            className="seta"
            src="/assets/image/seta.png"
            alt="Adotar"
          />

        </Link>


        {/* BOTÃO DOAR */}

        <Link to="/doar" className="doar">
          💖 Quero Doar
        </Link>

      </div>


      {/* ========================= */}
      {/* TERCEIRA PARTE */}
      {/* ========================= */}

      <div className="quadrado-branco">

        <img
          className="pataesquerda"
          src="/assets/image/pata-esquerda.png"
          alt="Patinhas"
        />

        <img
          className="patadireita"
          src="/assets/image/pata-direita.png"
          alt="Patinhas"
        />


        {/* ========================= */}
        {/* CARD ADOTE */}
        {/* ========================= */}

        <div className="div-adotar">

          <img
            className="adotar-img"
            src="/assets/image/circulo pata.jpg"
            alt="Adotar"
          />

          <h1 className="adote-h1">
            Adote
          </h1>

          <p className="adote-p">
            Adotar um cachorro é oferecer amor,
            proteção e uma nova chance de vida a
            um animal que precisa de um lar
            e de uma família..
          </p>

        </div>


        {/* ========================= */}
        {/* CARD DOE */}
        {/* ========================= */}

        <div className="doe">

          <img
            className="doe-img"
            src="/assets/image/coracao verde.png"
            alt="Doar"
          />

          <h1 className="doe-h1">
            Doe
          </h1>

          <p className="doe-p">
            Doar ajuda animais que precisam de alimento,
            cuidados veterinários, abrigo e carinho,
            garantindo melhores condições de vida
            e novas oportunidades.
          </p>

        </div>


        {/* ========================= */}
        {/* CARD FAÇA A DIFERENÇA */}
        {/* ========================= */}

        <div className="diferença">

          <img
            className="diferença-img"
            src="/assets/image/folha verde.png"
            alt="Diferença"
          />

          <h1 className="diferença-h1">
            Faça a Diferença
          </h1>

          <p className="diferença-p">
            Pequenas atitudes podem mudar completamente
            a vida de um animal, oferecendo esperança,
            segurança e a chance de encontrar um lar
            cheio de carinho
          </p>

        </div>

      </div>


      {/* ========================= */}
      {/* RODAPÉ */}
      {/* ========================= */}

      <div className="quadrado-final">


        {/* ========================= */}
        {/* INFORMAÇÕES */}
        {/* ========================= */}

        <div className="info-final1">

          <div className="pata-amiga2">

            <img
              className="cachorro-de-lado"
              src="/assets/image/logo-branca.png"
              alt="Logo Pata Amiga"
            />

          </div>


          <strong>
            Mais do que um projeto de adoção, um compromisso de amor,
            cuidado e transformação, que dá uma nova chance a pets
            necessitados em todo o Brasil.
          </strong>


          <img
            className="tres-icones"
            src="/assets/image/imagem-icones.png"
            alt="Redes sociais"
          />

        </div>


        {/* ========================= */}
        {/* MENU DO RODAPÉ */}
        {/* ========================= */}

        <div className="info-final2">


          <div className="coluna-rodape">

            <h3>
              Menu
            </h3>

            <Link to="/">
              Início
            </Link>

            <Link to="/adotar">
              Adotar
            </Link>

            <Link to="/doar">
              Doar
            </Link>

            <Link to="/sobre">
              Sobre Nós
            </Link>

          </div>


          {/* ========================= */}
          {/* SUPORTE */}
          {/* ========================= */}

          <div className="coluna-rodape">

            <h3>
              Suporte
            </h3>

            <Link to="/contato">
              Como Funciona
            </Link>

            <Link to="/contato">
              Parceiros
            </Link>

            <Link to="/contato">
              Dúvidas Frequentes
            </Link>

            <Link to="/contato">
              Contato
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Index;