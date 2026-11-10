import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import './Autenticacao.scss';

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', senha: '' });
  const [mensagem, setMensagem] = useState('');
  const [carregando, setCarregando] = useState(false);

  function atualizar(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function entrar(e) {
    e.preventDefault();
    setMensagem('');
    setCarregando(true);
    try {
      const resposta = await api.post('/usuarios/login', form);
      const token = resposta.data?.token || resposta.data?.accessToken;
      if (token) localStorage.setItem('token', token);
      if (resposta.data?.usuario) localStorage.setItem('usuario', JSON.stringify(resposta.data.usuario));
      setMensagem(resposta.data?.mensagem || 'Login realizado com sucesso!');
      navigate('/');
    } catch (erro) {
      setMensagem(erro.response?.data?.mensagem || erro.response?.data?.erro || 'Não foi possível entrar. Confira seus dados e verifique se a API está ligada.');
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="pagina-autenticacao">
      <header className="auth-cabecalho">
        <Link to="/" className="auth-logo"><img src="/assets/image/logo-pata.png" alt="Pata Amiga" /></Link>
        <nav><Link to="/">Início</Link><Link to="/adotar">Adotar</Link><Link to="/">Sobre</Link></nav>
        <Link to="/cadastro" className="auth-link-cadastro">Criar conta</Link>
      </header>

      <main className="auth-conteudo">
        <section className="auth-ilustracao">
          <span className="auth-patinha">🐾</span>
          <h1>Que bom ter você de volta!</h1>
          <p>Entre na sua conta e continue acompanhando os animais que estão esperando por um lar.</p>
          <img src="/assets/image/cachorro-gato.jpg" alt="Cachorro e gato juntos" />
        </section>

        <section className="auth-cartao">
          <span className="auth-etiqueta">PATA AMIGA</span>
          <h2>Entrar na sua conta</h2>
          <p className="auth-subtitulo">Informe seus dados para continuar.</p>
          <form onSubmit={entrar}>
            <label htmlFor="email">E-mail</label>
            <input id="email" name="email" type="email" placeholder="seuemail@exemplo.com" value={form.email} onChange={atualizar} autoComplete="email" required />
            <label htmlFor="senha">Senha</label>
            <input id="senha" name="senha" type="password" placeholder="Digite sua senha" value={form.senha} onChange={atualizar} autoComplete="current-password" required />
            {mensagem && <p className="auth-mensagem" role="alert">{mensagem}</p>}
            <button type="submit" disabled={carregando}>{carregando ? 'Entrando...' : 'Entrar'}</button>
          </form>
          <p className="auth-troca">Ainda não tem uma conta? <Link to="/cadastro">Cadastre-se</Link></p>
          <Link to="/" className="auth-voltar">← Voltar para o início</Link>
        </section>
      </main>
      <footer className="auth-rodape">© 2026 Pata Amiga · Adoção responsável transforma vidas.</footer>
    </div>
  );
}
