class Pessoa {
    constructor(nome, idade, profissao) {
      this.nome = nome;
      this.idade = idade;
      this.profissao = profissao;
    }

    exibirinfo() {
      console.log(`Nome: ${this.nome}, Idade: ${this.idade}, Profissão: ${this.profissao}`);
    }
  }

  function adicionarPessoa() {
    let nome = document.getElementById("nome").value;
    let idade = document.getElementById("idade").value;
    let profissao = document.getElementById("profissao").value;

    if (nome === "" || idade === "" || profissao === "") {
      alert("Por favor, preencha todos os campos.");
    } else {
      let pessoa = new Pessoa(nome, idade, profissao);
      pessoa.exibirinfo();
      alert("Informações adicionadas com sucesso!");
    }
  }