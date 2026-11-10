
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import "./index.scss";

// Fotos enviadas pela ONG ficam na API (/uploads); as demais estão na pasta public do site
function caminhoDaImagem(foto) {
  if (!foto) return "/assets/image/logo-pata.png";
  return foto.startsWith("/uploads") ? api.defaults.baseURL + foto : foto;
}

function Index() {
  const navigate = useNavigate();
  const [busca, setBusca] = useState("");
  const [especie, setEspecie] = useState("");
  const [porte, setPorte] = useState("");
  const [idade, setIdade] = useState("");
  const [favoritos, setFavoritos] = useState([]);

  const [animais, setAnimais] = useState([]);

  // Busca os animais disponíveis no banco (pela API)
  useEffect(() => {
    api
      .get("/pets", { params: { status: "disponivel" } })
      .then((resposta) => {
        const lista = resposta.data.animais.map((a) => ({
          id: a.id,
          nome: a.nome,
          tipo: a.tipo,
          especie: a.especie,
          idade: a.idade || "Idade não informada",
          faixaEtaria: a.faixa_etaria,
          porte: a.porte_label,
          imagem: caminhoDaImagem(a.foto_url),
        }));
        setAnimais(lista);
      })
      .catch(() => setAnimais([]));
  }, []);

  // Se a pessoa estiver logada, carrega os favoritos dela
  useEffect(() => {
    if (!localStorage.getItem("token")) return;

    api
      .get("/favoritos")
      .then((resposta) => setFavoritos(resposta.data.animais.map((a) => a.id)))
      .catch(() => {});
  }, []);

  const alternarFavorito = (id) => {
    if (!localStorage.getItem("token")) { navigate('/login'); return; }
    const jaFavorito = favoritos.includes(id);

    setFavoritos((anteriores) =>
      jaFavorito
        ? anteriores.filter((item) => item !== id)
        : [...anteriores, id]
    );

    // Com login, o favorito fica salvo no banco
    if (localStorage.getItem("token")) {
      const pedido = jaFavorito
        ? api.delete("/favoritos/" + id)
        : api.post("/favoritos/" + id);
      pedido.catch(() => {});
    }
  };

  const animaisFiltrados = animais.filter((animal) => {
    const correspondeBusca = animal.nome
      .toLowerCase()
      .includes(busca.toLowerCase());

    const correspondeEspecie =
      especie === "" || animal.especie === especie;

    const correspondePorte =
      porte === "" || animal.porte === porte;

    const correspondeIdade =
      idade === "" || animal.faixaEtaria === idade;

    return (
      correspondeBusca &&
      correspondeEspecie &&
      correspondePorte &&
      correspondeIdade
    );
  });

  return (
    <div className="pagina-adocao">

      {/* CABEÇALHO */}
      <header className="inicio">

        <Link to="/" className="logo-pata">
          <img 
            src="/assets/image/logo-pata.png"
            alt="PataAmiga"
          />
        </Link>

        <nav className="menu-navegacao">
          <Link to="/" className="nav-item">Início</Link>
          <Link to="/adotar" className="nav-item ativo">Adotar</Link>
          <Link to="/doar" className="nav-item">Doar</Link>
          <Link to="/sobre" className="nav-item">Sobre</Link>
          <Link to="/contato" className="nav-item">Contato</Link>
        </nav>

        <div className="icones-header">

          <Link to="/login" className="icone-header">
            <img
              src="/assets/image/pesquisa.png"
              alt="Pesquisar"
            />
          </Link>

          <Link to="/login" className="icone-header">
            <img
              src="/assets/image/log-up.png"
              alt="Login"
            />
          </Link>

          <Link to="/cadastro" className="icone-header favorito-header">
            ♡
          </Link>

        </div>

      </header>

      {/* TÍTULO E APRESENTAÇÃO */}
      <main>

        <section className="apresentacao">

          <div className="decoracao-adocao">
            <span>🐾</span>
            <strong>Adote<br />mude uma<br />vida</strong>
            <span>♡</span>
          </div>

          <div className="titulo-apresentacao">
            <h1>Encontre seu novo melhor amigo</h1>

            <div className="frase-decorativa">
              <span>🐾</span>
              <p>Pequenos detalhes, grande diferença.</p>
              <span>🐾</span>
            </div>
          </div>

        </section>

        <div className="atalho-match-adocao">
          <div><strong>Quer encontrar um pet que combine com sua rotina?</strong><span>Responda ao questionário e veja seu percentual de compatibilidade.</span></div>
          <Link to={localStorage.getItem("token") ? "/perfil-adotante" : "/login"}>Encontrar meu match</Link>
        </div>

        {/* FILTROS */}
        <section className="area-filtros">

          <div className="barra-busca">

            <span>⌕</span>

            <input
              type="text"
              placeholder="Buscar por nome, espécie..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />

          </div>

          <select
            value={especie}
            onChange={(e) => setEspecie(e.target.value)}
          >
            <option value="">Espécie</option>
            <option value="Cachorro">Cachorro</option>
            <option value="Gato">Gato</option>
          </select>

          <select
            value={porte}
            onChange={(e) => setPorte(e.target.value)}
          >
            <option value="">Porte</option>
            <option value="Pequeno">Pequeno</option>
            <option value="Médio">Médio</option>
            <option value="Grande">Grande</option>
          </select>

          <select
            value={idade}
            onChange={(e) => setIdade(e.target.value)}
          >
            <option value="">Idade</option>
            <option value="Filhote">Filhote</option>
            <option value="Adulto">Adulto</option>
          </select>

          <button
            className="botao-filtro"
            onClick={() => {
              setBusca("");
              setEspecie("");
              setPorte("");
              setIdade("");
            }}
            title="Limpar filtros"
          >
            ↻
          </button>

        </section>

        {/* CARDS DOS ANIMAIS */}
        <section className="lista-animais">

          {animaisFiltrados.map((animal) => (

            <article className="card-animal" key={animal.id}>

              <div className="imagem-animal">

                <img
                  src={animal.imagem}
                  alt={animal.nome}
                />

                <span className="disponivel">
                  Disponível
                </span>

              </div>

              <div className="informacoes-animal">

                <div className="dados-animal">
                  <Link to={`/animal/${animal.id}`} className="link-detalhe-animal"><h2>{animal.nome}</h2></Link>

                  <p>
                    {animal.tipo} • {animal.idade}
                  </p>
                </div>

                <button
                  className={`botao-favorito ${
                    favoritos.includes(animal.id) ? "selecionado" : ""
                  }`}
                  onClick={() => alternarFavorito(animal.id)}
                  aria-label={`Favoritar ${animal.nome}`}
                >
                  {favoritos.includes(animal.id) ? "♥" : "♡"}
                </button>

              </div>

            </article>

          ))}

          {animaisFiltrados.length === 0 && (
            <p className="nenhum-animal">
              Nenhum animal encontrado.
            </p>
          )}

        </section>

      </main>

      {/* RODAPÉ */}
      <footer className="rodape">

        <div className="rodape-principal">

          <div className="rodape-marca">

            <img
              src="/assets/image/logo-branca.png"
              alt="PataAmiga"
            />

            <p>
              Mais que um projeto de adoção, um compromisso de amor,
              cuidado e transformação de vidas de pets necessitados
              em todo o Brasil.
            </p>

          </div>

          <div className="rodape-links">

            <div>
              <h3>Menu</h3>
              <Link to="/">Início</Link>
              <Link to="/adotar">Adotar</Link>
              <Link to="/doar">Doar</Link>
              <Link to="/sobre">Sobre Nós</Link>
            </div>

            <div>
              <h3>Suporte</h3>
              <Link to="/contato">Como Funciona</Link>
              <Link to="/contato">Parceiros</Link>
              <Link to="/contato">Dúvidas Frequentes</Link>
              <Link to="/contato">Contato</Link>
            </div>

          </div>

        </div>

        <div className="rodape-final">
          © 2026 PataAmiga. Todos os direitos reservados.
        </div>

      </footer>

    </div>
  );
}

export default Index;
