const notas = [1, 5.5, 9.0];


console.log("A primeira nota do alunos é " + notas[0]);
console.log("A segunda nota do alunos é " + notas[1]); 
console.log("A terceira nota do alunos é " + notas[2]); 

let somaNotas = 0;

for (let i = 0; i < notas.length; i++) {
  somaNotas += notas[i];
}

const media = somaNotas / notas.length;
console.log("A média do aluno é " + media);


if (media >= 7) {
  console.log("Você está APROVADO");
} else {
  console.log("Você está REPROVADO.");
}