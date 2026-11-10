import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import './Autenticacao.scss';

export default function Cadastro() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ nome: '', email: '', telefone: '', senha: '', perfil: 'adotante' });
  const [mensagem, setMensagem] = useState('');
  const [carregando, setCarregando] = useState(false);

  function atualizar(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function cadastrar(e) {
    e.preventDefault();
    setMensagem('');
    setCarregando(true);
    try {
      const resposta = await api.post('/usuarios/registro', form);
      setMensagem(resposta.data?.mensagem || 'Cadastro realizado com sucesso!');
      navigate('/login', { state: { cadastroConcluido: true } });
    } catch (erro) {
      setMensagem(erro.response?.data?.mensagem || erro.response?.data?.erro || 'Não foi possível concluir o cadastro. Verifique se a API está ligada e se os campos correspondem ao backend.');
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="pagina-autenticacao">
      <header className="auth-cabecalho">
        <Link to="/" className="auth-logo"><img src="/assets/image/logo-pata.png" alt="Pata Amiga" /></Link>
        <nav><Link to="/">Início</Link><Link to="/adotar">Adotar</Link><Link to="/">Sobre</Link></nav>
        <Link to="/login" className="auth-link-cadastro">Já tenho conta</Link>
      </header>

      <main className="auth-conteudo auth-conteudo-cadastro">
        <section className="auth-ilustracao">
          <span className="auth-patinha">💚</span>
          <h1>Faça parte dessa história.</h1>
          <p>Crie sua conta para conhecer os pets, demonstrar interesse na adoção e acompanhar suas solicitações.</p>
          <img src="/assets/image/cachorro-gato.jpg" alt="Cachorro e gato esperando por um lar" />
        </section>

        <section className="auth-cartao auth-cartao-cadastro">
          <span className="auth-etiqueta">PATA AMIGA</span>
          <h2>Criar uma conta</h2>
          <p className="auth-subtitulo">Preencha seus dados para começar.</p>
          <form onSubmit={cadastrar}>
            <label htmlFor="nome">Nome completo</label>
            <input id="nome" name="nome" type="text" placeholder="Como podemos te chamar?" value={form.nome} onChange={atualizar} autoComplete="name" required />
            <label htmlFor="cad-email">E-mail</label>
            <input id="cad-email" name="email" type="email" placeholder="seuemail@exemplo.com" value={form.email} onChange={atualizar} autoComplete="email" required />
            <label htmlFor="telefone">Telefone</label>
            <input id="telefone" name="telefone" type="tel" placeholder="(00) 00000-0000" value={form.telefone} onChange={atualizar} autoComplete="tel" />
            <label htmlFor="cad-senha">Senha</label>
            <input id="cad-senha" name="senha" type="password" placeholder="Crie uma senha" value={form.senha} onChange={atualizar} autoComplete="new-password" minLength="6" required />
            <label htmlFor="perfil">Tipo de conta</label>
            <select id="perfil" name="perfil" value={form.perfil} onChange={atualizar}>
              <option value="adotante">Quero adotar</option>
              <option value="padrinho">Quero apadrinhar</option>
              <option value="doador">Quero doar</option>
            </select>
            {mensagem && <p className="auth-mensagem" role="alert">{mensagem}</p>}
            <button type="submit" disabled={carregando}>{carregando ? 'Criando conta...' : 'Criar minha conta'}</button>
          </form>
          <p className="auth-troca">Já possui cadastro? <Link to="/login">Faça login</Link></p>
          <Link to="/" className="auth-voltar">← Voltar para o início</Link>
        </section>
      </main>
      <footer className="auth-rodape">© 2026 Pata Amiga · Adoção responsável transforma vidas.</footer>
    </div>
  );
}
