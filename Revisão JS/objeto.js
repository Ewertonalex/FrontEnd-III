const pessoa = {
    nome: "João",
    idade: 30,
    profissao: "Desenvolvedor",
    endereco: {
      rua: "Rua dos Desenvolvedores",
      numero: 123,
      cidade: "São Paulo",
      estado: "SP"
    }
};

console.log(pessoa.nome); // Saída: João
console.log(pessoa.idade); // Saída: 30
console.log(pessoa.endereco.rua); // Saída: Rua dos Desenvolvedores
console.log(pessoa['endereco']['cidade']); // Saída: São Paulo


