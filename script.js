// ==========================================
// 1. CONFIGURAÇÃO E INICIALIZAÇÃO DO FIREBASE (v13 Modular)
// ==========================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/13.2.0/firebase-app.js";
import { getDatabase, ref, get, child, set, remove } from "https://www.gstatic.com/firebasejs/13.2.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyA9y0tW7OH3hXPJD1RZsIntBb76KOYZxvA",
  authDomain: "prova-1ds-trim3-b1.firebaseapp.com",
  databaseURL: "https://prova-1ds-trim3-b1-default-rtdb.firebaseio.com",
  projectId: "prova-1ds-trim3-b1",
  storageBucket: "prova-1ds-trim3-b1.firebasestorage.app",
  messagingSenderId: "266741572349",
  appId: "1:266741572349:web:c4bcd4e8388585e21fd494"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// ==========================================
// 2. LISTA OFICIAL DE ESTUDANTES (1DS CESF - 39 ALUNOS)
// ==========================================
const studentList = [
  "ALLAN VINICIUS", "ANDREY EDIVAN", "BERNARDO AGE", "BERNARDO LEITE",
  "CAIO MONTAGNA", "CHRISTIAN GABRIEL", "DANIEL MOREIRA", "DANIEL WILCEK",
  "EDUARDO ANTONIO", "EDUARDO CREMER", "ELIAS SOUZA", "ELOÁ PEREIRA",
  "ERICK HOE", "FERNANDO VALENTIM", "GABRIEL DA SILVA", "GABRIEL SOEK",
  "GUSTAVO GONÇALVES", "GUSTAVO MASSOQUETO", "GUSTAVO SALDANHA", "IAN GUSTAVO",
  "JHONATHAN DA SILVA", "JOÃO FRANCISCO", "JOÃO PEDRO", "JOSÉ ROBERTO",
  "KAUE ALEXANDRE", "LEONARDO FRANQUITO", "LUÍS HENRIQUE", "MIGUEL PIETRO",
  "OSVALDO ZANLORENZI", "PEDRO ZAGESKI", "RILLARY VITÓRIA", "RODRIGO ARAÚJO",
  "ROGER DE PAULA", "THALES JOSÉ", "VICTOR HUGO", "WESLEY HENRIQUE",
  "OTÁVIO DA SILVA", "VINÍCIUS APARECIDO", "DERIK LUCCA"
];

// ==========================================
// 3A. BANCO DE 30 QUESTÕES ORIGINAL (PROVA 1 & RECUPERAÇÃO)
// ==========================================
const questionBankP1 = [
  { id: 1, text: "Qual será a saída do comando 1 == '1' no console do JavaScript?", options: ["true", "false", "undefined", "TypeError"], answer: "true" },
  { id: 2, text: "Qual operador é utilizado para verificar a desigualdade entre dois valores no JS?", options: ["!=", "==", "=>", "="], answer: "!=" },
  { id: 3, text: "Qual o retorno da expressão (5 != 5) no console?", options: ["false", "true", "null", "NaN"], answer: "false" },
  { id: 4, text: "Qual a principal diferença entre os operadores '=' e '==' em JavaScript?", options: ["'=' atribui valor e '==' realiza comparação de igualdade.", "'=' compara e '==' atribui.", "Ambos realizam exatamente a mesma função.", "'==' só funciona com números."], answer: "'=' atribui valor e '==' realiza comparação de igualdade." },
  { id: 5, text: "Qual será a saída de 'b' > 'c' no console do navegador?", options: ["false", "true", "error", "undefined"], answer: "false" },
  { id: 6, text: "O que é retornado ao testar 'e' > 'c' em JavaScript?", options: ["true", "false", "null", "NaN"], answer: "true" },
  { id: 7, text: "Qual o resultado de 18 > 6 no JS?", options: ["true", "false", "18", "6"], answer: "true" },
  { id: 8, text: "Para abrir as ferramentas do desenvolvedor na aba Console no Chrome, qual o atalho padrão?", options: ["Ctrl + Shift + J", "Ctrl + Alt + Del", "Ctrl + P", "Alt + F4"], answer: "Ctrl + Shift + J" },
  { id: 9, text: "O operador '>=' significa:", options: ["Maior ou igual", "Menor ou igual", "Diferente", "Estritamente igual"], answer: "Maior ou igual" },
  { id: 10, text: "Qual das opções representa o operador de menor ou igual?", options: ["<=", "=>", "=<", "!="], answer: "<=" },
  { id: 11, code: "let idade = 21;\nvar resposta = (idade = 21);", text: "Na instrução var idade = 21, o operador '=' está fazendo:", options: ["Uma atribuição de valor à variável", "Uma comparação de igualdade", "Uma verificação condicional", "Uma conversão para texto"], answer: "Uma atribuição de valor à variável" },
  { id: 12, code: "var x = 10;\nif (x > 5) {\n  alert('Maior');\n} else {\n  alert('Menor');\n}", text: "Qual mensagem será exibida na tela pelo código acima?", options: ["Maior", "Menor", "Nenhuma", "Erro de sintaxe"], answer: "Maior" },
  { id: 13, text: "A estrutura de controle 'if' só executa o bloco dentro das chaves se a condição for:", options: ["true", "false", "0", "null"], answer: "true" },
  { id: 14, text: "Qual função do JS é usada para converter uma entrada de texto em número inteiro?", options: ["parseInt()", "toString()", "alert()", "console.log()"], answer: "parseInt()" },
  { id: 15, code: "var senha = '2112';\nvar tentativa = '2112';\nif (tentativa == senha) {\n  // Bloco A\n} else {\n  // Bloco B\n}", text: "Qual bloco será executado?", options: ["Bloco A", "Bloco B", "Ambos os blocos", "Nenhum bloco"], answer: "Bloco A" },
  { id: 16, text: "O comando 'else' serve para:", options: ["Executar um bloco alternativo quando o 'if' for falso", "Repetir o código 10 vezes", "Criar uma nova variável", "Encerrar o navegador"], answer: "Executar um bloco alternativo quando o 'if' for falso" },
  { id: 17, code: "var idade = 15;\nif (idade >= 18) {\n  console.log('Liberado');\n}", text: "O que será impresso no console?", options: ["Nada será impresso", "Liberado", "false", "Erro"], answer: "Nada será impresso" },
  { id: 18, text: "Para capturar o valor digitado pelo usuário em um input com id 'idade', usamos:", options: ["document.getElementById('idade').value", "document.value('idade')", "getElementById.value('idade')", "input.idade.getValue()"], answer: "document.getElementById('idade').value" },
  { id: 19, text: "Em um teste condicional, o que acontece quando o teste 'if' resulta em false e NÃO há um 'else'?", options: ["O programa pula o bloco e continua a execução", "O programa trava", "Abre uma janela de alerta de erro", "O código entra em loop"], answer: "O programa pula o bloco e continua a execução" },
  { id: 20, code: "if (10 == '10') { console.log('Sim'); }", text: "Qual a saída deste código?", options: ["Sim", "Não imprime nada", "Erro de tipo", "false"], answer: "Sim" },
  { id: 21, text: "O que caracteriza o aninhamento de estruturas 'if / else'?", options: ["Colocar uma estrutura 'if/else' dentro de outra", "Criar múltiplos arquivos HTML", "Usar apenas a palavra 'else' no script", "Declarar variáveis globais"], answer: "Colocar uma estrutura 'if/else' dentro de outra" },
  { id: 22, code: "let idade = 70;\nif (idade >= 18) {\n  if (idade >= 65) {\n    console.log('A');\n  } else {\n    console.log('B');\n  }\n}", text: "O que será impresso no console?", options: ["A", "B", "A e B", "Nada"], answer: "A" },
  { id: 23, code: "let idade = 20;\nif (idade >= 18) {\n  if (idade >= 65) {\n    console.log('A');\n  } else {\n    console.log('B');\n  }\n}", text: "Com idade = 20, qual a saída impressa?", options: ["B", "A", "Menor de idade", "Erro"], answer: "B" },
  { id: 24, code: "let idade = 14;\nif (idade < 16) {\n  alert('Não vota');\n} else {\n  if (idade < 18) {\n    alert('Facultativo');\n  }\n}", text: "Para idade = 14, qual o alerta exibido?", options: ["Não vota", "Facultativo", "Obrigatório", "Nenhum"], answer: "Não vota" },
  { id: 25, code: "let idade = 17;\nif (idade < 16) {\n  alert('Não vota');\n} else {\n  if (idade < 18) {\n    alert('Facultativo');\n  }\n}", text: "Para idade = 17, qual o alerta exibido?", options: ["Facultativo", "Não vota", "Obrigatório", "Erro"], answer: "Facultativo" },
  { id: 26, text: "Para verificar se um número é positivo, negativo ou nulo, é necessário utilizar:", options: ["Estruturas condicionais aninhadas (ou encadeadas)", "Apenas um operador de atribuição", "Uma tag <head> no HTML", "O atalho Ctrl+Shift+J"], answer: "Estruturas condicionais aninhadas (ou encadeadas)" },
  { id: 27, code: "let num = 0;\nif (num > 0) {\n  console.log('Positivo');\n} else {\n  if (num < 0) {\n    console.log('Negativo');\n  } else {\n    console.log('Nulo');\n  }\n}", text: "Com num = 0, qual será o resultado?", options: ["Nulo", "Positivo", "Negativo", "Zero"], answer: "Nulo" },
  { id: 28, text: "Boa prática recomendada para manter o código com 'if/else' aninhados legível:", options: ["Manter a indentação (alinhamento vertical) organizada", "Escrever todo o JS na mesma linha", "Não usar chaves {}", "Usar nomes de variáveis com apenas uma letra"], answer: "Manter a indentação (alinhamento vertical) organizada" },
  { id: 29, code: "let n1 = 10, n2 = 10;\nif (n1 > n2) {\n  res = 'Maior';\n} else if (n1 < n2) {\n  res = 'Menor';\n} else {\n  res = 'Igual';\n}", text: "Qual o valor da variável 'res'?", options: ["Igual", "Maior", "Menor", "undefined"], answer: "Igual" },
  { id: 30, text: "Se um teste interno em um aninhamento falhar, o programa executará o bloco:", options: ["'else' associado àquele 'if' interno específico", "Todo o arquivo HTML novamente", "O primeiro 'if' do script", "Nenhum código futuro"], answer: "'else' associado àquele 'if' interno específico" }
];

// ==========================================
// 3B. NOVO BANCO DE 30 QUESTÕES (PROVA 2 - AULAS 09, 10, 11 E JS GERAL)
// ==========================================
const questionBankP2 = [
  { id: 101, text: "No JavaScript, por que a expressão 5 == '5' retorna true?", options: ["Porque o JS converte automaticamente a string para número antes de comparar", "Porque '5' e 5 ocupam o mesmo espaço na memória física", "Porque o operador == ignora qualquer tipo de erro de sintaxe", "Porque números e textos são idênticos em todas as linguagens"], answer: "Porque o JS converte automaticamente a string para número antes de comparar" },
  { id: 102, text: "Quais são os dois únicos valores possíveis retornados por uma operação de comparação em JavaScript?", options: ["true ou false", "0 ou 1", "sim ou não", "null ou undefined"], answer: "true ou false" },
  { id: 103, text: "Qual será a saída no Console do Chrome ao digitar: 1 != 2", options: ["true", "false", "1", "SyntaxError"], answer: "true" },
  { id: 104, text: "Ao testar comparações entre letras no Console do navegador, qual será o resultado de 'a' > 'z'?", options: ["false", "true", "NaN", "undefined"], answer: "false" },
  { id: 105, text: "Em um formulário HTML, qual atributo de um campo <input> oculta os caracteres digitados (como em uma tela de senha)?", options: ["type=\"password\"", "type=\"hidden\"", "type=\"secret\"", "type=\"text\""], answer: "type=\"password\"" },
  { id: 106, text: "Qual evento HTML é utilizado em uma tag <button> para disparar uma função JavaScript ao ser clicado?", options: ["onclick", "onchange", "onhover", "onsubmit"], answer: "onclick" },
  { id: 107, code: "var idade = parseInt(document.getElementById('idade').value);\nvar faltam = 65 - idade;", text: "No desafio da aposentadoria (Aula 10), se o usuário digitar 50, qual será o valor armazenado na variável 'faltam'?", options: ["15", "65", "50", "-15"], answer: "15" },
  { id: 108, code: "var idade = 68;\nif (idade >= 65) {\n  alert('Pode aposentar');\n} else {\n  alert('Ainda precisa trabalhar');\n}", text: "Com base no código acima, qual mensagem será exibida para idade = 68?", options: ["Pode aposentar", "Ainda precisa trabalhar", "Nenhuma mensagem", "Erro de execução"], answer: "Pode aposentar" },
  { id: 109, text: "Por que precisamos usar parseInt() ao capturar um número digitado em um <input> HTML antes de fazer cálculos?", options: ["Porque valores vindos de inputs HTML chegam originalmente como texto (string)", "Porque o comando alert() só aceita números inteiros", "Para arredondar o texto para letras maiúsculas", "Porque o JavaScript não aceita variáveis sem parseInt()"], answer: "Porque valores vindos de inputs HTML chegam originalmente como texto (string)" },
  { id: 110, code: "var tentativa = '1234';\nvar senha = '2112';\nif (tentativa == senha) {\n  alert('Acesso permitido');\n} else {\n  alert('Senha incorreta');\n}", text: "Ao executar este script de login, qual alerta aparecerá na tela?", options: ["Senha incorreta", "Acesso permitido", "2112", "Nenhum alerta"], answer: "Senha incorreta" },
  { id: 111, text: "Na estrutura de decisão das eleições (Aula 11), para uma pessoa de 16 anos, qual é a situação do voto?", options: ["Voto facultativo", "Não pode votar", "Voto obrigatório", "Apenas voto em trânsito"], answer: "Voto facultativo" },
  { id: 112, code: "var idade = 66;\nif (idade < 16) {\n  alert('Não vota');\n} else {\n  if (idade < 18) {\n    alert('Facultativo');\n  } else {\n    if (idade > 65) {\n      alert('Facultativo');\n    } else {\n      alert('Obrigatório');\n    }\n  }\n}", text: "Seguindo a lógica encadeada da Aula 11, qual alerta será exibido para idade = 66?", options: ["Facultativo", "Obrigatório", "Não vota", "Erro de aninhamento"], answer: "Facultativo" },
  { id: 113, code: "var idade = 35;\nif (idade < 16) {\n  alert('Não vota');\n} else {\n  if (idade < 18) {\n    alert('Facultativo');\n  } else {\n    if (idade > 65) {\n      alert('Facultativo');\n    } else {\n      alert('Obrigatório');\n    }\n  }\n}", text: "Para um cidadão com idade = 35, qual mensagem o sistema exibirá?", options: ["Obrigatório", "Facultativo", "Não vota", "Nenhuma"], answer: "Obrigatório" },
  { id: 114, text: "No desafio 'positividade.html' (Aula 11), quais são as três classificações possíveis para um número digitado?", options: ["Positivo, negativo ou nulo", "Par, ímpar ou primo", "Inteiro, real ou texto", "Maior, menor ou diferente"], answer: "Positivo, negativo ou nulo" },
  { id: 115, code: "var num = -8;\nif (num > 0) {\n  alert('Positivo');\n} else {\n  if (num < 0) {\n    alert('Negativo');\n  } else {\n    alert('Nulo');\n  }\n}", text: "Qual saída será produzida pelo código acima?", options: ["Negativo", "Positivo", "Nulo", "undefined"], answer: "Negativo" },
  { id: 116, text: "No desafio 'comparacao.html' (Aula 11), o programa solicita dois números e verifica se o primeiro é:", options: ["Maior, menor ou igual ao segundo", "Somado ou subtraído do segundo", "Divisível pelo segundo", "Diferente de zero"], answer: "Maior, menor ou igual ao segundo" },
  { id: 117, code: "var a = 15;\nvar b = 20;\nif (a > b) {\n  console.log('Primeiro maior');\n} else {\n  if (a < b) {\n    console.log('Primeiro menor');\n  } else {\n    console.log('Iguais');\n  }\n}", text: "O que será impresso no console?", options: ["Primeiro menor", "Primeiro maior", "Iguais", "false"], answer: "Primeiro menor" },
  { id: 118, text: "Em HTML, dentro de qual tag costumamos inserir o código JavaScript diretamente na página?", options: ["<script>", "<style>", "<link>", "<meta>"], answer: "<script>" },
  { id: 119, text: "Qual operador realiza a concatenação (junção) de um texto com o valor de uma variável dentro de um alert() em JS?", options: ["Sinal de mais ( + )", "Asterisco ( * )", "Ponto e vírgula ( ; )", "Dois pontos ( : )"], answer: "Sinal de mais ( + )" },
  { id: 120, code: "var nome = 'Carlos';\nalert('Olá ' + nome + '!');", text: "Qual mensagem será exibida na caixa de alerta?", options: ["Olá Carlos!", "Olá nome!", "Carlos", "Olá + nome + !"], answer: "Olá Carlos!" },
  { id: 121, text: "Para que serve o ponto e vírgula ( ; ) ao final das instruções em JavaScript?", options: ["Indicar o encerramento de uma instrução/comando", "Criar um comentário no código", "Multiplicar dois valores", "Abrir um bloco condicional"], answer: "Indicar o encerramento de uma instrução/comando" },
  { id: 122, text: "Qual método exibe uma caixa de diálogo pop-up com uma mensagem e um botão 'OK' no navegador?", options: ["alert()", "console.log()", "parseInt()", "getElementById()"], answer: "alert()" },
  { id: 123, text: "Qual comando é usado para escrever mensagens de depuração diretamente na aba Console do DevTools?", options: ["console.log()", "alert()", "document.write()", "prompt()"], answer: "console.log()" },
  { id: 124, code: "var x = 10;\nx = 25;\nconsole.log(x);", text: "Qual valor será exibido no console ao executar este código?", options: ["25", "10", "35", "Erro de redeclaração"], answer: "25" },
  { id: 125, text: "Qual será o resultado da comparação: 10 <= 10", options: ["true", "false", "10", "NaN"], answer: "true" },
  { id: 126, text: "Qual será o resultado da comparação: 7 < 3", options: ["false", "true", "7", "3"], answer: "false" },
  { id: 127, text: "Em um código JavaScript, o que delimita o início e o fim do bloco de instruções de uma function?", options: ["Chaves { }", "Colchetes [ ]", "Aspas \" \"", "Sinais de menor e maior < >"], answer: "Chaves { }" },
  { id: 128, text: "Por que devemos alinhar verticalmente cada par de 'if' e 'else' ao programar?", options: ["Para facilitar a leitura e evitar erros de lógica no aninhamento", "Porque o navegador não executa códigos desalinhados", "Para diminuir o tamanho do arquivo em bytes", "Para transformar o código em HTML automaticamente"], answer: "Para facilitar a leitura e evitar erros de lógica no aninhamento" },
  { id: 129, code: "var nota = 6;\nif (nota >= 6) {\n  console.log('Aprovado');\n}", text: "Com nota = 6, qual será o comportamento do programa?", options: ["Imprime 'Aprovado' no console", "Não imprime nada", "Gera erro pois 6 não é maior que 6", "Imprime 'Reprovado'"], answer: "Imprime 'Aprovado' no console" },
  { id: 130, text: "Qual das opções representa uma declaração válida de variável em JavaScript?", options: ["var idade = 16;", "var 1idade = 16;", "var idade aluno = 16;", "16 = var idade;"], answer: "var idade = 16;" }
];

// Variáveis Globais
let selectedStudent = "";
let currentExamMode = ""; // "P1", "REC" ou "P2"
let selectedQuestions = [];
let focusLossCount = 0;

function normalizeName(name) {
  return name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().trim();
}

// ==========================================
// 4. MÓDULO DE SEGURANÇA E ANTI-COLA
// ==========================================
function applySecurityMeasures() {
  document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    alert("O clique com o botão direito está desativado durante a avaliação.");
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "PrintScreen" || e.keyCode === 44) {
      e.preventDefault();
      alert("Capturas de tela não são permitidas nesta avaliação.");
      return false;
    }

    if (
      (e.ctrlKey && (e.key === "c" || e.key === "C" || e.key === "u" || e.key === "U" || e.key === "p" || e.key === "P")) ||
      e.key === "F12"
    ) {
      e.preventDefault();
      alert("Este atalho foi desativado por questões de segurança da avaliação.");
      return false;
    }
  });

  document.addEventListener("visibilitychange", () => {
    const cardQuiz = document.getElementById("cardQuiz");
    if (cardQuiz && cardQuiz.style.display !== "none") {
      if (document.hidden) {
        focusLossCount++;
        cardQuiz.classList.add("blur-protection");
      } else {
        cardQuiz.classList.remove("blur-protection");
        alert(`ATENÇÃO ${selectedStudent}!\nVocê saiu da aba da prova ${focusLossCount} vez(es).\nLembre-se de que a troca de abas é registrada.`);
      }
    }
  });

  document.addEventListener("copy", (e) => e.preventDefault());
  document.addEventListener("cut", (e) => e.preventDefault());
  document.addEventListener("paste", (e) => e.preventDefault());
}

// ==========================================
// 5. INICIALIZAÇÃO
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("studentSelect")) {
    initStudentPage();
    applySecurityMeasures();
  }

  if (document.getElementById("adminTable")) {
    initAdminPage();
  }
});

// ==========================================
// 6. LÓGICA DO ESTUDANTE (PROVA 1, RECUPERAÇÃO E PROVA 2)
// ==========================================
async function initStudentPage() {
  const select = document.getElementById("studentSelect");
  
  studentList.forEach(student => {
    const opt = document.createElement("option");
    opt.value = student;
    opt.textContent = student;
    select.appendChild(opt);
  });

  select.addEventListener("change", renderStudentDashboard);

  document.getElementById("btnAdminAccess").addEventListener("click", () => {
    const pass = prompt("Digite a senha do Administrador:");
    if (pass === "masaju1820") {
      window.location.href = "admin.html";
    } else if (pass !== null) {
      alert("Senha incorreta!");
    }
  });

  document.getElementById("quizForm").addEventListener("submit", submitQuiz);
  
  document.getElementById("btnBackHome").addEventListener("click", () => {
    document.getElementById("cardSuccess").style.display = "none";
    document.getElementById("cardLogin").style.display = "block";
    renderStudentDashboard();
  });
}

async function renderStudentDashboard() {
  const select = document.getElementById("studentSelect");
  const dashboard = document.getElementById("studentDashboard");
  selectedStudent = select.value;

  if (!selectedStudent) {
    dashboard.style.display = "none";
    return;
  }

  dashboard.style.display = "block";
  document.getElementById("dashboardTitle").textContent = `Situação de: ${selectedStudent}`;

  const boxP1 = document.getElementById("boxProva1");
  const boxRec = document.getElementById("boxRec");
  const boxP2 = document.getElementById("boxProva2");

  boxP1.innerHTML = "<p>Consultando banco de dados...</p>";
  boxRec.innerHTML = "";
  boxP2.innerHTML = "";

  try {
    const dbRef = ref(database);
    const [snapP1, snapRec, snapP2] = await Promise.all([
      get(child(dbRef, "evaluations")),
      get(child(dbRef, "evaluations_rec")),
      get(child(dbRef, "evaluations_p2"))
    ]);

    const norm = normalizeName(selectedStudent);

    let recP1 = null;
    if (snapP1.exists()) {
      recP1 = Object.values(snapP1.val()).find(item => normalizeName(item.studentName) === norm);
    }

    let recRecuperacao = null;
    if (snapRec.exists()) {
      recRecuperacao = Object.values(snapRec.val()).find(item => normalizeName(item.studentName) === norm);
    }

    let recP2 = null;
    if (snapP2.exists()) {
      recP2 = Object.values(snapP2.val()).find(item => normalizeName(item.studentName) === norm);
    }

    // --- 1. BLOCO PROVA 1 (1ª CHAMADA / 2ª CHAMADA) ---
    if (recP1) {
      boxP1.innerHTML = `
        <div class="exam-option-info">
          <h4>1. Prova 1 (15 questões)</h4>
          <p>✅ Concluída | Nota obtida: <strong>${recP1.score.toFixed(1)}</strong> / 3,0</p>
        </div>
        <span style="color: #27ae60; font-weight: 600;">Realizada</span>
      `;
    } else {
      boxP1.innerHTML = `
        <div class="exam-option-info">
          <h4>1. Prova 1 - 2ª Chamada (15 questões)</h4>
          <p>⚠️ Pendente (Você ainda não realizou a Prova 1).</p>
        </div>
        <button class="btn-action" id="btnStartP1">Realizar Prova 1</button>
      `;
      document.getElementById("btnStartP1").addEventListener("click", () => startQuiz("P1"));
    }

    // --- 2. BLOCO RECUPERAÇÃO DA PROVA 1 (25 QUESTÕES - VALE 5,0) ---
    if (!recP1) {
      boxRec.innerHTML = `
        <div class="exam-option-info">
          <h4>2. Recuperação da Prova 1 (25 questões)</h4>
          <p>🔒 Disponível apenas para quem já realizou a Prova 1.</p>
        </div>
        <span style="color: #7f8c8d;">Bloqueada</span>
      `;
    } else if (recRecuperacao) {
      boxRec.innerHTML = `
        <div class="exam-option-info">
          <h4>2. Recuperação da Prova 1 (25 questões)</h4>
          <p>✅ Concluída | Nota obtida: <strong>${recRecuperacao.score.toFixed(1)}</strong> / 5,0</p>
        </div>
        <span style="color: #27ae60; font-weight: 600;">Realizada</span>
      `;
    } else {
      boxRec.innerHTML = `
        <div class="exam-option-info">
          <h4>2. Recuperação da Prova 1 (25 questões)</h4>
          <p>Sorteio de 25 questões do banco da Prova 1 (Vale até 5,0 pontos - 0,2 cada).</p>
        </div>
        <button class="btn-action" id="btnStartRec">Realizar Recuperação</button>
      `;
      document.getElementById("btnStartRec").addEventListener("click", () => startQuiz("REC"));
    }

    // --- 3. BLOCO PROVA 2 (15 NOVAS QUESTÕES - PARA TODOS) ---
    if (recP2) {
      boxP2.innerHTML = `
        <div class="exam-option-info">
          <h4>3. Prova 2 - Aulas 09, 10, 11 e JS (15 questões)</h4>
          <p>✅ Concluída | Nota obtida: <strong>${recP2.score.toFixed(1)}</strong> / 3,0</p>
        </div>
        <span style="color: #27ae60; font-weight: 600;">Realizada</span>
      `;
    } else {
      boxP2.innerHTML = `
        <div class="exam-option-info">
          <h4>3. Prova 2 - Aulas 09, 10, 11 e JS (15 questões)</h4>
          <p>Nova avaliação objetiva (Vale até 3,0 pontos - 0,2 cada).</p>
        </div>
        <button class="btn-action" id="btnStartP2">Realizar Prova 2</button>
      `;
      document.getElementById("btnStartP2").addEventListener("click", () => startQuiz("P2"));
    }

  } catch (err) {
    console.error(err);
    boxP1.innerHTML = "<p style='color:red;'>Erro ao conectar com o banco de dados.</p>";
  }
}

function startQuiz(mode) {
  currentExamMode = mode;
  focusLossCount = 0;

  let titleText = "";

  if (mode === "P1") {
    selectedQuestions = [...questionBankP1].sort(() => 0.5 - Math.random()).slice(0, 15);
    titleText = "Prova 1 (2ª Chamada) - 15 Questões (Vale 3,0)";
  } else if (mode === "REC") {
    selectedQuestions = [...questionBankP1].sort(() => 0.5 - Math.random()).slice(0, 25);
    titleText = "Recuperação da Prova 1 - 25 Questões (Vale 5,0)";
  } else if (mode === "P2") {
    selectedQuestions = [...questionBankP2].sort(() => 0.5 - Math.random()).slice(0, 15);
    titleText = "Prova 2 (JS Básico) - 15 Questões (Vale 3,0)";
  }

  renderQuestions();

  document.getElementById("cardLogin").style.display = "none";
  document.getElementById("cardQuiz").style.display = "block";
  document.getElementById("studentGreeting").textContent = `Aluno: ${selectedStudent}`;
  document.getElementById("examSubtitle").textContent = titleText;
  window.scrollTo(0, 0);
}

function renderQuestions() {
  const container = document.getElementById("questionsContainer");
  container.innerHTML = "";

  selectedQuestions.forEach((q, index) => {
    const shuffledOptions = [...q.options].sort(() => 0.5 - Math.random());

    const qDiv = document.createElement("div");
    qDiv.className = "card question-card";

    let codeHTML = q.code ? `<div class="code-block">${q.code}</div>` : "";

    let optionsHTML = shuffledOptions.map(opt => `
      <label class="option-label">
        <input type="radio" name="q_${index}" value="${opt}" required>
        <span>${opt}</span>
      </label>
    `).join("");

    qDiv.innerHTML = `
      <div class="question-title">${index + 1}. ${q.text}</div>
      ${codeHTML}
      <div class="options-group">${optionsHTML}</div>
    `;

    container.appendChild(qDiv);
  });
}

async function submitQuiz(e) {
  e.preventDefault();

  let correctCount = 0;
  const totalQ = selectedQuestions.length;

  selectedQuestions.forEach((q, index) => {
    const selectedOption = document.querySelector(`input[name="q_${index}"]:checked`);
    if (selectedOption && selectedOption.value === q.answer) {
      correctCount++;
    }
  });

  // Todas as provas valem 0,2 por questão (15q = 3,0 | 25q = 5,0)
  const finalScore = parseFloat((correctCount * 0.2).toFixed(1));
  const studentKey = selectedStudent.replace(/[^a-zA-Z0-9]/g, "_");
  const now = new Date();

  const record = {
    studentName: selectedStudent,
    score: finalScore,
    correctAnswers: correctCount,
    totalQuestions: totalQ,
    tabSwitches: focusLossCount,
    timestamp: now.toISOString(),
    formattedDate: now.toLocaleDateString("pt-BR") + " " + now.toLocaleTimeString("pt-BR")
  };

  let targetPath = "evaluations";
  if (currentExamMode === "REC") targetPath = "evaluations_rec";
  if (currentExamMode === "P2") targetPath = "evaluations_p2";

  try {
    await set(ref(database, `${targetPath}/${studentKey}`), record);
    document.getElementById("cardQuiz").style.display = "none";
    document.getElementById("cardSuccess").style.display = "block";
    window.scrollTo(0, 0);
  } catch (err) {
    console.error(err);
    alert("Erro ao salvar suas respostas no banco de dados.");
  }
}

// ==========================================
// 7. LÓGICA DO PAINEL ADMIN (CONSOLIDADO 1DS)
// ==========================================
let consolidatedRows = [];

function initAdminPage() {
  document.getElementById("btnExit").addEventListener("click", () => {
    window.location.href = "index.html";
  });

  document.getElementById("btnExportCSV").addEventListener("click", exportToCSV);
  
  const btnReset = document.getElementById("btnResetData");
  if (btnReset) {
    btnReset.addEventListener("click", resetDatabase);
  }

  loadAdminData();
}

async function loadAdminData() {
  try {
    const dbRef = ref(database);
    const [snapP1, snapRec, snapP2] = await Promise.all([
      get(child(dbRef, "evaluations")),
      get(child(dbRef, "evaluations_rec")),
      get(child(dbRef, "evaluations_p2"))
    ]);

    const mapP1 = {};
    if (snapP1.exists()) {
      Object.values(snapP1.val()).forEach(item => {
        mapP1[normalizeName(item.studentName)] = item;
      });
    }

    const mapRec = {};
    if (snapRec.exists()) {
      Object.values(snapRec.val()).forEach(item => {
        mapRec[normalizeName(item.studentName)] = item;
      });
    }

    const mapP2 = {};
    if (snapP2.exists()) {
      Object.values(snapP2.val()).forEach(item => {
        mapP2[normalizeName(item.studentName)] = item;
      });
    }

    const tbody = document.querySelector("#adminTable tbody");
    tbody.innerHTML = "";
    consolidatedRows = [];

    let countP1 = 0, countRec = 0, countP2 = 0;
    let scoresP2 = [];

    studentList.forEach(student => {
      const norm = normalizeName(student);
      const r1 = mapP1[norm];
      const rRec = mapRec[norm];
      const r2 = mapP2[norm];

      if (r1) countP1++;
      if (rRec) countRec++;
      if (r2) {
        countP2++;
        scoresP2.push(r2.score);
      }

      const s1 = r1 ? r1.score : null;
      const sRec = rRec ? rRec.score : null;
      const s2 = r2 ? r2.score : null;

      let finalP1 = null;
      if (s1 !== null && sRec !== null) finalP1 = Math.max(s1, sRec);
      else if (s1 !== null) finalP1 = s1;
      else if (sRec !== null) finalP1 = sRec;

      const row = {
        studentName: student,
        p1: s1 !== null ? s1.toFixed(1) : "-",
        rec: sRec !== null ? sRec.toFixed(1) : "-",
        finalP1: finalP1 !== null ? finalP1.toFixed(1) : "-",
        p2: s2 !== null ? s2.toFixed(1) : "-",
        tabsRec: rRec ? (rRec.tabSwitches || 0) : 0,
        tabsP2: r2 ? (r2.tabSwitches || 0) : 0
      };

      consolidatedRows.push(row);

      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><strong>${row.studentName}</strong></td>
        <td>${row.p1}</td>
        <td>${row.rec} ${row.tabsRec > 0 ? `<small style="color:#c0392b;">(${row.tabsRec}x aba)</small>` : ""}</td>
        <td><strong>${row.finalP1}</strong></td>
        <td>${row.p2} ${row.tabsP2 > 0 ? `<small style="color:#c0392b;">(${row.tabsP2}x aba)</small>` : ""}</td>
      `;
      tbody.appendChild(tr);
    });

    document.getElementById("mTotalP1").textContent = `${countP1} / 39`;
    document.getElementById("mTotalRec").textContent = `${countRec} / 39`;
    document.getElementById("mTotalP2").textContent = `${countP2} / 39`;

    if (scoresP2.length > 0) {
      const avgP2 = (scoresP2.reduce((a, b) => a + b, 0) / scoresP2.length).toFixed(1);
      document.getElementById("mAverageP2").textContent = avgP2;
    } else {
      document.getElementById("mAverageP2").textContent = "0.0";
    }

  } catch (err) {
    console.error(err);
  }
}

function exportToCSV() {
  if (consolidatedRows.length === 0) return;

  let csvContent = "\uFEFF";
  csvContent += "Estudante;Prova 1;Recuperacao P1 (max 5.0);Nota Final P1;Prova 2 (max 3.0)\n";

  consolidatedRows.forEach(r => {
    csvContent += `"${r.studentName}";"${r.p1}";"${r.rec}";"${r.finalP1}";"${r.p2}"\n`;
  });

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", "relatorio_consolidado_1DS_CESF.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

async function resetDatabase() {
  const choice = prompt("Qual etapa deseja resetar?\nDigite 1 para Recuperação (evaluations_rec)\nDigite 2 para Prova 2 (evaluations_p2)\n(As notas da 1ª chamada original não serão apagadas)");
  
  if (choice !== "1" && choice !== "2") return;

  const confirmPass = prompt("Digite a senha do admin para confirmar a exclusão:");
  if (confirmPass === "masaju1820") {
    const node = choice === "1" ? "evaluations_rec" : "evaluations_p2";
    try {
      await remove(ref(database, node));
      alert("Registros apagados com sucesso!");
      loadAdminData();
    } catch (err) {
      console.error(err);
      alert("Erro ao resetar dados.");
    }
  } else if (confirmPass !== null) {
    alert("Senha incorreta!");
  }
}