// Selecionando os elementos
const formAluno = document.getElementById('formAluno');
const nomeInput = document.getElementById('nome');
const nota1Input = document.getElementById('nota1');
const nota2Input = document.getElementById('nota2');
const tabelaAlunos = document.getElementById('tabelaAlunos').getElementsByTagName('tbody')[0];

// Função para calcular a média
function calcularMedia(nota1, nota2) {
    return (parseFloat(nota1) + parseFloat(nota2)) / 2;
}

// Função para adicionar um aluno à tabela
function adicionarAluno(nome, nota1, nota2, media) {
    const tr = document.createElement('tr');

    const tdNome = document.createElement('td');
    tdNome.textContent = nome;
    tr.appendChild(tdNome);

    const tdNota1 = document.createElement('td');
    tdNota1.textContent = nota1;
    tr.appendChild(tdNota1);

    const tdNota2 = document.createElement('td');
    tdNota2.textContent = nota2;
    tr.appendChild(tdNota2);

    const tdMedia = document.createElement('td');
    tdMedia.textContent = media.toFixed(2);
    tr.appendChild(tdMedia);

    const tdStatus = document.createElement('td');
    tdStatus.textContent = media >= 6 ? 'Aprovado' : 'Reprovado';
    tdStatus.classList.add(media >= 6 ? 'aprovado' : 'reprovado');
    tr.appendChild(tdStatus);

    tabelaAlunos.appendChild(tr);
}

// Função de resetar o formulário
function resetarFormulario() {
    nomeInput.value = '';
    nota1Input.value = '';
    nota2Input.value = '';
}

// Evento do formulário para adicionar aluno
formAluno.addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio do formulário

    const nome = nomeInput.value.trim();
    const nota1 = nota1Input.value.trim();
    const nota2 = nota2Input.value.trim();
     const nota3 = nota2Input.value.trim();


    if (!nome || !nota1 || !nota2) {
        alert("Todos os campos devem ser preenchidos!");
        return;
    }

    const media = calcularMedia(nota1, nota2);
    adicionarAluno(nome, nota1, nota2, media);
    resetarFormulario();

    // Carregar dados armazenados ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
    const alunos = JSON.parse(localStorage.getItem('alunos')) || [];
    alunos.forEach(aluno => {
        adicionarAluno(aluno.nome, aluno.nota1, aluno.nota2, aluno.media);
    });
});

// Armazenar dados no localStorage sempre que um aluno for adicionado
function salvarDadosNoLocalStorage() {
    const alunos = [];
    const rows = tabelaAlunos.rows;
    for (let i = 0; i < rows.length; i++) {
        const aluno = rows[i];
        const nome = aluno.cells[0].textContent;
        const nota1 = aluno.cells[1].textContent;
        const nota2 = aluno.cells[2].textContent;
        const media = aluno.cells[3].textContent;
        alunos.push({ nome, nota1, nota2, media: parseFloat(media) });
    }
    localStorage.setItem('alunos', JSON.stringify(alunos));
}

// Atualizar dados no localStorage após adicionar um aluno
formAluno.addEventListener('submit', function(event) {
    event.preventDefault();
    const nome = nomeInput.value.trim();
    const nota1 = nota1Input.value.trim();
    const nota2 = nota2Input.value.trim();

    if (!nome || !nota1 || !nota2) {
        alert("Todos os campos devem ser preenchidos!");
        return;
    }

    const media = calcularMedia(nota1, nota2);
    adicionarAluno(nome, nota1, nota2, media);
    salvarDadosNoLocalStorage();
    resetarFormulario();
});