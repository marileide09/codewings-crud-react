import React, { useState, useEffect } from "react";
import { FaUserPlus, FaTrash, FaEdit, FaSearch } from "react-icons/fa";

function App() {
  const [usuarios, setUsuarios] = useState(() => {
    const dadosSalvos = localStorage.getItem("usuarios");
    return dadosSalvos ? JSON.parse(dadosSalvos) : [];
  });

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [busca, setBusca] = useState("");
  const [usuarioEditando, setUsuarioEditando] = useState(null);
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
  }, [usuarios]);

  useEffect(() => {
    if (mensagem) {
      const tempo = setTimeout(() => {
        setMensagem("");
      }, 3000);

      return () => clearTimeout(tempo);
    }
  }, [mensagem]);

  const adicionarUsuario = () => {
    if (!nome || !email) {
      setMensagem("Preencha nome e email");
      return;
    }

    const novoUsuario = {
      id: Date.now(),
      nome,
      email,
    };

    setUsuarios([...usuarios, novoUsuario]);

    setNome("");
    setEmail("");

    setMensagem("Usuário adicionado com sucesso!");
  };

  const excluirUsuario = (id) => {
    const confirmar = window.confirm("Deseja excluir este usuário?");

    if (!confirmar) return;

    const novosUsuarios = usuarios.filter((usuario) => usuario.id !== id);

    setUsuarios(novosUsuarios);

    setMensagem("Usuário removido!");
  };

  const editarUsuario = (usuario) => {
    setUsuarioEditando(usuario.id);
    setNome(usuario.nome);
    setEmail(usuario.email);
  };

  const salvarEdicao = () => {
    const usuariosAtualizados = usuarios.map((usuario) => {
      if (usuario.id === usuarioEditando) {
        return {
          ...usuario,
          nome,
          email,
        };
      }

      return usuario;
    });

    setUsuarios(usuariosAtualizados);

    setUsuarioEditando(null);
    setNome("");
    setEmail("");

    setMensagem("Usuário atualizado!");
  };

  const usuariosFiltrados = usuarios.filter((usuario) =>
    usuario.nome.toLowerCase().includes(busca.toLowerCase()),
  );

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "40px",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          width: "520px",
          background: "#f4f6f8",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0,0,0,0.2)",
        }}
      >
        <h1 style={{ textAlign: "center" }}>CodeWings</h1>

        <h3 style={{ textAlign: "center" }}>Cadastro de Usuários</h3>

        <p>
          <strong>Total de usuários:</strong> {usuarios.length}
        </p>

        {mensagem && <p style={{ color: "green" }}>{mensagem}</p>}

        <input
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
          }}
        />

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
          }}
        />

        {usuarioEditando ? (
          <button
            onClick={salvarEdicao}
            style={{
              width: "100%",
              padding: "10px",
              background: "#2196f3",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            <FaEdit /> Atualizar usuário
          </button>
        ) : (
          <button
            onClick={adicionarUsuario}
            style={{
              width: "100%",
              padding: "10px",
              background: "#4CAF50",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            <FaUserPlus /> Adicionar usuário
          </button>
        )}

        <br />
        <br />

        <div style={{ display: "flex", alignItems: "center" }}>
          <FaSearch style={{ marginRight: "5px" }} />

          <input
            placeholder="Buscar usuário..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
            }}
          />
        </div>

        <hr />

        {usuariosFiltrados.map((usuario) => (
          <div
            key={usuario.id}
            style={{
              background: "white",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "5px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <strong>{usuario.nome}</strong>
              <br />
              {usuario.email}
            </div>

            <div>
              <button
                onClick={() => editarUsuario(usuario)}
                style={{
                  marginRight: "5px",
                  background: "#ffc107",
                  border: "none",
                  padding: "6px",
                  cursor: "pointer",
                }}
              >
                <FaEdit />
              </button>

              <button
                onClick={() => excluirUsuario(usuario.id)}
                style={{
                  background: "#f44336",
                  border: "none",
                  padding: "6px",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
