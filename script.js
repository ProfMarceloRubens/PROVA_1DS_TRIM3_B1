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
// 2. LISTA OFICIAL DE ESTUDANTES (1DS CESF)
// ==========================================
const studentList = [
  "2) ALLAN VINICIUS", "3) ANDREY EDIVAN", "4) BERNARDO AGE", "5) BERNARDO LEITE",
  "6) CAIO MONTAGNA", "7) CHRISTIAN GABRIEL", "8) DANIEL MOREIRA", "9) DANIEL WILCEK",
  "10) EDUARDO ANTONIO", "11) EDUARDO CREMER", "12) ELIAS SOUZA", "13) ELOÁ PEREIRA",
  "14) ERICK HOE", "15) FERNANDO VALENTIM", "16) GABRIEL DA SILVA", "17) GABRIEL SOEK",
  "18) GUSTAVO GONÇALVES", "19) GUSTAVO MASSOQUETO", "20) GUSTAVO SALDANHA", "21) IAN GUSTAVO",
  "22) JHONATHAN DA SILVA", "23) JOÃO FRANCISCO", "24) JOÃO PEDRO", "25) JOSÉ ROBERTO",
  "26) KAUE ALEXANDRE", "27) LEONARDO FRANQUITO", "30) LUÍS HENRIQUE", "33) MIGUEL PIETRO",
  "34) OSVALDO ZANLORENZI", "35) PEDRO ZAGESKI", "36) RILLARY VITÓRIA", "37) RODRIGO ARAÚJO",
  "38) ROGER DE PAULA", "39) THALES JOSÉ", "40) VICTOR HUGO", "41) WESLEY HENRIQUE",
  "42) OTÁVIO DA SILVA", "43) VINÍCIUS APARECIDO", "44) DERIK LUCCA"
];

// ==========================================
// 3. BANCO DE 30 QUESTÕES (AULAS 09, 10 E 11)
// ==========================================
const questionBank = [
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

// Variáveis Globais
let selectedStudent = "";
let selectedQuestions = [];
let evaluationsData = [];

// ==========================================
// 4. INICIALIZAÇÃO
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("studentSelect")) {
    initStudentPage();
  }

  if (document.getElementById("adminTable")) {
    initAdminPage();
  }
});

// ------------ LÓGICA DO ALUNO ------------
function initStudentPage() {
  const select = document.getElementById("studentSelect");
  
  studentList.forEach(student => {
    const opt = document.createElement("option");
    opt.value = student;
    opt.textContent = student;
    select.appendChild(opt);
  });

  document.getElementById("btnAdminAccess").addEventListener("click", () => {
    const pass = prompt("Digite a senha do Administrador:");
    if (pass === "masaju1820") {
      window.location.href = "admin.html";
    } else if (pass !== null) {
      alert("Senha incorreta!");
    }
  });

  document.getElementById("btnStart").addEventListener("click", startQuiz);
  document.getElementById("quizForm").addEventListener("submit", submitQuiz);
}

async function startQuiz() {
  const select = document.getElementById("studentSelect");
  selectedStudent = select.value;

  if (!selectedStudent) {
    alert("Por favor, selecione seu nome!");
    return;
  }

  const studentKey = selectedStudent.replace(/[^a-zA-Z0-9]/g, "_");

  try {
    const dbRef = ref(database);
    const snapshot = await get(child(dbRef, `evaluations/${studentKey}`));

    if (snapshot.exists()) {
      alert("Atenção: Você já realizou esta avaliação anteriormente!");
    } else {
      selectedQuestions = [...questionBank].sort(() => 0.5 - Math.random()).slice(0, 15);
      renderQuestions();

      document.getElementById("cardLogin").style.display = "none";
      document.getElementById("cardQuiz").style.display = "block";
      document.getElementById("studentGreeting").textContent = `Aluno: ${selectedStudent}`;
    }
  } catch (err) {
    console.error(err);
    alert("Erro ao conectar com o banco de dados.");
  }
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

  selectedQuestions.forEach((q, index) => {
    const selectedOption = document.querySelector(`input[name="q_${index}"]:checked`);
    if (selectedOption && selectedOption.value === q.answer) {
      correctCount++;
    }
  });

  const finalScore = parseFloat((correctCount * 0.2).toFixed(1));
  const studentKey = selectedStudent.replace(/[^a-zA-Z0-9]/g, "_");
  const now = new Date();

  const record = {
    studentName: selectedStudent,
    score: finalScore,
    correctAnswers: correctCount,
    totalQuestions: 15,
    timestamp: now.toISOString(),
    formattedDate: now.toLocaleDateString("pt-BR") + " " + now.toLocaleTimeString("pt-BR")
  };

  try {
    await set(ref(database, `evaluations/${studentKey}`), record);
    document.getElementById("cardQuiz").style.display = "none";
    document.getElementById("cardSuccess").style.display = "block";
  } catch (err) {
    console.error(err);
    alert("Erro ao salvar suas respostas no banco de dados.");
  }
}

// ------------ LÓGICA DO PAINEL ADMIN ------------
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
    const snapshot = await get(child(dbRef, "evaluations"));

    const tbody = document.querySelector("#adminTable tbody");
    tbody.innerHTML = "";

    if (!snapshot.exists()) {
      evaluationsData = [];
      document.getElementById("mTotal").textContent = "0 / 39";
      document.getElementById("mAverage").textContent = "0.0";
      document.getElementById("mMax").textContent = "0.0";
      document.getElementById("mMin").textContent = "0.0";
      tbody.innerHTML = "<tr><td colspan='4'>Nenhuma avaliação realizada até o momento.</td></tr>";
      return;
    }

    evaluationsData = Object.values(snapshot.val());

    const total = evaluationsData.length;
    const scores = evaluationsData.map(e => e.score);
    const avg = (scores.reduce((a, b) => a + b, 0) / total).toFixed(1);
    const max = Math.max(...scores).toFixed(1);
    const min = Math.min(...scores).toFixed(1);

    document.getElementById("mTotal").textContent = `${total} / 39`;
    document.getElementById("mAverage").textContent = avg;
    document.getElementById("mMax").textContent = max;
    document.getElementById("mMin").textContent = min;

    evaluationsData.forEach(item => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><strong>${item.studentName}</strong></td>
        <td>${item.score.toFixed(1)}</td>
        <td>${item.correctAnswers} / 15</td>
        <td>${item.formattedDate}</td>
      `;
      tbody.appendChild(tr);
    });
  } catch (err) {
    console.error(err);
  }
}

function exportToCSV() {
  if (evaluationsData.length === 0) {
    alert("Não há dados para exportar.");
    return;
  }

  let csvContent = "\uFEFF";
  csvContent += "Estudante;Nota;Acertos;Data e Horario\n";

  evaluationsData.forEach(item => {
    csvContent += `"${item.studentName}";"${item.score.toFixed(1)}";"${item.correctAnswers}/15";"${item.formattedDate}"\n`;
  });

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `relatorio_prova_1DS_CESF.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

async function resetDatabase() {
  const confirmPass = prompt("ATENÇÃO: Isso apagará TODOS os registros da turma!\nDigite a senha do admin para confirmar:");
  
  if (confirmPass === "masaju1820") {
    try {
      await remove(ref(database, "evaluations"));
      alert("Todos os dados foram removidos com sucesso!");
      loadAdminData();
    } catch (err) {
      console.error(err);
      alert("Erro ao tentar resetar o banco de dados.");
    }
  } else if (confirmPass !== null) {
    alert("Senha incorreta! Operação cancelada.");
  }
}