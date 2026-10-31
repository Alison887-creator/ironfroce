/* ==========================================================================
   Iron Force — Área do Aluno (treino.html)
   Três ferramentas: montar treino, montar dieta e calorias por foto.
   Os dados (exercícios, alimentos) ficam em dados-treino.js.
   Tudo o que o aluno monta é salvo no próprio navegador (localStorage).
   ========================================================================== */

"use strict";

/* --------------------------------------------------------------------------
   Utilitários
   -------------------------------------------------------------------------- */
const $ = (seletor, raiz = document) => raiz.querySelector(seletor);
const $$ = (seletor, raiz = document) => [...raiz.querySelectorAll(seletor)];
const esc = (txt) => String(txt).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const num = (valor, casas = 0) => Number(valor).toLocaleString("pt-BR", { maximumFractionDigits: casas, minimumFractionDigits: casas });

const D = window.DADOS_TREINO;
const LETRAS = "ABCDEFGHIJ";
const NIVEIS = { 1: "Iniciante", 2: "Intermediário", 3: "Avançado" };
const alimentoPorId = (id) => D.alimentos.find((a) => a.id === id);
const musculoPorId = (id) => D.musculos.find((m) => m.id === id);

/** localStorage com proteção (pode falhar em aba anônima ou com bloqueio de dados). */
const armazenamento = {
  ler(chave, padrao) {
    try { return JSON.parse(localStorage.getItem(chave)) ?? padrao; } catch { return padrao; }
  },
  salvar(chave, valor) {
    try { localStorage.setItem(chave, JSON.stringify(valor)); } catch { /* sem armazenamento: segue só na memória */ }
  }
};

/** Mensagem rápida no rodapé da tela. */
let timerToast;
function avisar(mensagem) {
  const toast = $("#toast");
  toast.textContent = mensagem;
  toast.classList.add("visivel");
  clearTimeout(timerToast);
  timerToast = setTimeout(() => toast.classList.remove("visivel"), 2800);
}

/** Calcula kcal e macros de um alimento para uma quantidade em gramas. */
function nutrientes(id, gramas) {
  const a = alimentoPorId(id);
  const f = gramas / 100;
  return { kcal: a.kcal * f, p: a.p * f, c: a.c * f, g: a.g * f };
}
const somar = (lista) => lista.reduce((t, item) => {
  const n = nutrientes(item.id, item.gramas);
  return { kcal: t.kcal + n.kcal, p: t.p + n.p, c: t.c + n.c, g: t.g + n.g };
}, { kcal: 0, p: 0, c: 0, g: 0 });

/** Encontra um alimento pelo nome digitado (exato ou parcial, sem acentos). */
const semAcento = (t) => t.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();
function buscarAlimento(texto) {
  const alvo = semAcento(texto);
  if (!alvo) return null;
  return D.alimentos.find((a) => semAcento(a.nome) === alvo) ||
         D.alimentos.find((a) => semAcento(a.nome).startsWith(alvo)) ||
         D.alimentos.find((a) => semAcento(a.nome).includes(alvo));
}

/** Refeição sugerida pelo horário atual. */
function refeicaoDoMomento() {
  const h = new Date().getHours();
  if (h < 10) return "cafe";
  if (h < 12) return "lanche1";
  if (h < 15) return "almoco";
  if (h < 18) return "lanche2";
  if (h < 21) return "jantar";
  return "ceia";
}

/* --------------------------------------------------------------------------
   Estado salvo
   -------------------------------------------------------------------------- */
const estado = {
  treino: armazenamento.ler("if_treino", { objetivo: "hipertrofia", dias: [] }),
  dieta: armazenamento.ler("if_dieta", { perfil: null, meta: null, refeicoes: {} }),
  prato: []
};
D.refeicoes.forEach((r) => { estado.dieta.refeicoes[r.id] ??= []; });

const salvarTreino = () => armazenamento.salvar("if_treino", estado.treino);
const salvarDieta = () => armazenamento.salvar("if_dieta", estado.dieta);

/* --------------------------------------------------------------------------
   Inicialização
   -------------------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  iniciarHeader();
  iniciarAbas();
  iniciarTreino();
  iniciarDieta();
  iniciarFoto();
  $("#ano").textContent = new Date().getFullYear();
  $("#lista-alimentos").innerHTML = D.alimentos.map((a) => `<option value="${esc(a.nome)}">`).join("");
});

/* --------------------------------------------------------------------------
   Header (menu hambúrguer) e barra de progresso
   -------------------------------------------------------------------------- */
function iniciarHeader() {
  const nav = $("#nav");
  const botao = $("#hamburguer");
  const sombra = document.createElement("div");
  sombra.className = "nav-sombra";
  document.body.appendChild(sombra);

  const alternar = (abrir) => {
    nav.classList.toggle("aberto", abrir);
    botao.classList.toggle("ativo", abrir);
    sombra.classList.toggle("visivel", abrir);
    document.body.classList.toggle("travado", abrir);
    botao.setAttribute("aria-expanded", abrir);
    botao.setAttribute("aria-label", abrir ? "Fechar menu" : "Abrir menu");
  };
  botao.addEventListener("click", () => alternar(!nav.classList.contains("aberto")));
  sombra.addEventListener("click", () => alternar(false));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") alternar(false); });

  const barra = $("#progresso");
  const atualizar = () => {
    const total = document.documentElement.scrollHeight - innerHeight;
    barra.style.transform = `scaleX(${total > 0 ? scrollY / total : 0})`;
  };
  addEventListener("scroll", () => requestAnimationFrame(atualizar), { passive: true });
}

/* --------------------------------------------------------------------------
   Abas Treino / Dieta / Foto (também abre direto por #dieta ou #foto)
   -------------------------------------------------------------------------- */
function iniciarAbas() {
  const botoes = $$(".abas-aluno__btn");

  const mostrar = (painel, focar = false) => {
    botoes.forEach((b) => {
      const ativo = b.dataset.painel === painel;
      b.setAttribute("aria-selected", ativo);
      b.tabIndex = ativo ? 0 : -1;
      $(`#painel-${b.dataset.painel}`).hidden = !ativo;
      if (ativo && focar) b.focus();
    });
    history.replaceState(null, "", `#${painel}`);
    // Atualiza as listas que dependem de outras abas
    if (painel === "dieta") renderizarDieta();
  };

  botoes.forEach((b) => b.addEventListener("click", () => mostrar(b.dataset.painel)));
  $(".abas-aluno__lista").addEventListener("keydown", (e) => {
    if (!["ArrowLeft", "ArrowRight"].includes(e.key)) return;
    const i = botoes.findIndex((b) => b.getAttribute("aria-selected") === "true");
    const proximo = botoes[(i + (e.key === "ArrowRight" ? 1 : -1) + botoes.length) % botoes.length];
    mostrar(proximo.dataset.painel, true);
  });

  const inicial = location.hash.slice(1);
  mostrar(["treino", "dieta", "foto"].includes(inicial) ? inicial : "treino");
}

/* ==========================================================================
   1) TREINO
   ========================================================================== */
let musculoAtivo = "peito";

function iniciarTreino() {
  // Objetivos no gerador
  $("#g-objetivo").innerHTML = Object.entries(D.objetivos)
    .map(([id, o]) => `<option value="${id}" ${id === estado.treino.objetivo ? "selected" : ""}>${esc(o.nome)}</option>`).join("");

  // Botões de músculos
  const lista = $("#lista-musculos");
  lista.innerHTML = D.musculos.map((m) => `
    <button class="musculo" type="button" data-musculo="${m.id}" aria-pressed="${m.id === musculoAtivo}">
      ${esc(m.nome)}
    </button>`).join("");
  lista.addEventListener("click", (e) => {
    const b = e.target.closest(".musculo");
    if (!b) return;
    musculoAtivo = b.dataset.musculo;
    $$(".musculo", lista).forEach((x) => x.setAttribute("aria-pressed", x === b));
    renderizarExercicios();
  });

  // Adicionar exercício a um dia
  $("#lista-exercicios").addEventListener("click", (e) => {
    const b = e.target.closest("[data-adicionar]");
    if (!b) return;
    const card = b.closest(".exercicio");
    const exercicio = musculoPorId(musculoAtivo).exercicios[Number(b.dataset.adicionar)];
    let dia = Number($("select", card).value);
    if (dia === -1) dia = criarDia().indice;
    adicionarExercicio(dia, exercicio.nome, musculoAtivo);
    avisar(`${exercicio.nome} adicionado ao Treino ${LETRAS[dia]}`);
  });

  $("#form-gerador").addEventListener("submit", (e) => {
    e.preventDefault();
    gerarTreino(e.target.objetivo.value, Number(e.target.dias.value), Number(e.target.nivel.value));
  });
  $("#g-objetivo").addEventListener("change", (e) => {
    estado.treino.objetivo = e.target.value;
    salvarTreino();
    renderizarDias();
  });

  $("#btn-novo-dia").addEventListener("click", () => { criarDia(); avisar("Novo dia de treino criado"); });
  $("#btn-imprimir").addEventListener("click", () => window.print());
  $("#btn-limpar-treino").addEventListener("click", () => {
    if (!estado.treino.dias.length || !confirm("Apagar todo o treino montado?")) return;
    estado.treino.dias = [];
    salvarTreino();
    renderizarDias();
  });

  // Edição dentro dos dias (nome do dia, séries, reps, descanso e remover)
  const dias = $("#lista-dias");
  dias.addEventListener("input", (e) => {
    const { dia, item, campo } = e.target.dataset;
    if (campo === "nome-dia") estado.treino.dias[dia].nome = e.target.value;
    else if (campo) estado.treino.dias[dia].itens[item][campo] = e.target.value;
    salvarTreino();
  });
  dias.addEventListener("click", (e) => {
    const b = e.target.closest("[data-remover]");
    if (!b) return;
    const [dia, item] = b.dataset.remover.split("-").map(Number);
    if (item === -1) estado.treino.dias.splice(dia, 1);
    else estado.treino.dias[dia].itens.splice(item, 1);
    salvarTreino();
    renderizarDias();
  });

  renderizarExercicios();
  renderizarDias();
}

function criarDia(nome = "") {
  estado.treino.dias.push({ nome, itens: [] });
  salvarTreino();
  renderizarDias();
  return { indice: estado.treino.dias.length - 1 };
}

function adicionarExercicio(dia, nome, musculo) {
  const o = D.objetivos[estado.treino.objetivo];
  estado.treino.dias[dia].itens.push({ nome, musculo, series: o.series, reps: o.reps, descanso: o.descanso });
  salvarTreino();
  renderizarDias();
}

/** Sugestões de exercícios do músculo selecionado. */
function renderizarExercicios() {
  const m = musculoPorId(musculoAtivo);
  const opcoesDias = estado.treino.dias.map((d, i) =>
    `<option value="${i}">Treino ${LETRAS[i]}${d.nome ? ` – ${esc(d.nome)}` : ""}</option>`).join("") +
    `<option value="-1">+ Novo dia</option>`;

  $("#lista-exercicios").innerHTML = m.exercicios.map((ex, i) => `
    <article class="exercicio" style="animation-delay:${i * 0.04}s">
      <div class="exercicio__topo">
        <h3 class="exercicio__nome">${esc(ex.nome)}</h3>
      </div>
      <div class="exercicio__meta">
        <span class="etiqueta">${esc(ex.equipamento)}</span>
        <span class="etiqueta etiqueta--n${ex.nivel}">${NIVEIS[ex.nivel]}</span>
      </div>
      <p class="exercicio__dica"><strong>Dica:</strong> ${esc(ex.dica)}</p>
      <div class="exercicio__add">
        <select aria-label="Dia do treino para ${esc(ex.nome)}">${opcoesDias}</select>
        <button class="btn btn--primario" type="button" data-adicionar="${i}">Adicionar</button>
      </div>
    </article>`).join("");
}

/** Lista de dias com os exercícios escolhidos. */
function renderizarDias() {
  const o = D.objetivos[estado.treino.objetivo];
  const dias = estado.treino.dias;
  $("#treino-info").textContent = dias.length
    ? `${dias.length} ${dias.length === 1 ? "dia" : "dias"} por semana · Objetivo: ${o.nome} · Sugestão: ${o.series} séries de ${o.reps} repetições, descanso de ${o.descanso}.`
    : "";

  $("#lista-dias").innerHTML = dias.length ? dias.map((d, i) => `
    <div class="dia">
      <div class="dia__cabecalho">
        <span class="dia__letra" aria-hidden="true">${LETRAS[i]}</span>
        <input class="dia__nome" value="${esc(d.nome)}" placeholder="Treino ${LETRAS[i]} (ex.: Peito e tríceps)" data-dia="${i}" data-campo="nome-dia" aria-label="Nome do treino ${LETRAS[i]}">
        <button class="btn-icone" type="button" data-remover="${i}--1" aria-label="Excluir treino ${LETRAS[i]}" title="Excluir dia">×</button>
      </div>
      ${d.itens.length ? `<div class="dia__lista">${d.itens.map((it, j) => `
        <div class="item-treino">
          <div>
            <span class="item-treino__musculo">${esc(musculoPorId(it.musculo)?.nome || "")}</span>
            <span class="item-treino__nome">${j + 1}. ${esc(it.nome)}</span>
          </div>
          <button class="btn-icone" type="button" data-remover="${i}-${j}" aria-label="Remover ${esc(it.nome)}">×</button>
          <div class="item-treino__campos">
            <label class="mini-campo">Séries <input type="text" inputmode="numeric" value="${esc(it.series)}" data-dia="${i}" data-item="${j}" data-campo="series"></label>
            <label class="mini-campo">Reps <input type="text" value="${esc(it.reps)}" data-dia="${i}" data-item="${j}" data-campo="reps"></label>
            <label class="mini-campo mini-campo--largo">Descanso <input type="text" value="${esc(it.descanso)}" data-dia="${i}" data-item="${j}" data-campo="descanso"></label>
          </div>
        </div>`).join("")}</div>`
      : `<p class="dia__vazio">Adicione exercícios usando as sugestões por músculo.</p>`}
    </div>`).join("")
    : `<p class="prato__vazio">Seu treino está vazio.<br>Gere um treino automático ou adicione exercícios pelas sugestões.</p>`;

  renderizarExercicios(); // atualiza a lista de dias nos selects
}

/** Monta uma divisão completa conforme objetivo, dias e nível. */
function gerarTreino(objetivo, qtdDias, nivel) {
  const temItens = estado.treino.dias.some((d) => d.itens.length);
  if (temItens && !confirm("Isso vai substituir o treino atual. Continuar?")) return;

  const o = D.objetivos[objetivo];
  estado.treino.objetivo = objetivo;
  estado.treino.dias = D.divisoes[qtdDias].map((divisao) => {
    const muitos = divisao.musculos.length >= 4; // dias com muitos músculos recebem menos exercícios por músculo
    const itens = divisao.musculos.flatMap((id) => {
      const m = musculoPorId(id);
      const quantidade = m.grande ? (muitos ? 2 : 3) : (muitos ? 1 : 2);
      return m.exercicios
        .filter((ex) => ex.nivel <= nivel)
        .slice(0, quantidade)
        .map((ex) => ({ nome: ex.nome, musculo: id, series: nivel === 1 ? Math.max(2, o.series - 1) : o.series, reps: o.reps, descanso: o.descanso }));
    });
    return { nome: divisao.nome, itens };
  });
  salvarTreino();
  renderizarDias();
  avisar(`Treino ${LETRAS.slice(0, qtdDias)} gerado!`);
  window.confete?.();
  if (innerWidth < 1000) $("#area-meu-treino").scrollIntoView({ behavior: "smooth" });
}

/* ==========================================================================
   2) DIETA
   ========================================================================== */
function iniciarDieta() {
  const opcoesRefeicao = D.refeicoes.map((r) => `<option value="${r.id}">${esc(r.nome)}</option>`).join("");
  $("#al-refeicao").innerHTML = opcoesRefeicao;
  $("#pr-refeicao").innerHTML = opcoesRefeicao;
  $("#al-refeicao").value = refeicaoDoMomento();
  $("#pr-refeicao").value = refeicaoDoMomento();

  // Restaura o perfil salvo no formulário
  const form = $("#form-calc");
  const perfil = estado.dieta.perfil;
  if (perfil) {
    form.sexo.value = perfil.sexo;
    ["idade", "peso", "altura", "atividade", "objetivo"].forEach((c) => { form[c].value = perfil[c]; });
    mostrarResultado();
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const dados = {
      sexo: form.sexo.value,
      idade: Number(form.idade.value),
      peso: Number(form.peso.value),
      altura: Number(form.altura.value),
      atividade: Number(form.atividade.value),
      objetivo: form.objetivo.value
    };
    const erro =
      !(dados.idade >= 14 && dados.idade <= 100) ? "Informe uma idade entre 14 e 100 anos." :
      !(dados.peso >= 30 && dados.peso <= 300) ? "Informe um peso entre 30 e 300 kg." :
      !(dados.altura >= 120 && dados.altura <= 230) ? "Informe a altura em centímetros (ex.: 175)." : "";
    $("#calc-erro").textContent = erro;
    if (erro) return;

    estado.dieta.perfil = dados;
    estado.dieta.meta = calcularMeta(dados);
    salvarDieta();
    mostrarResultado();
    renderizarDieta();
    avisar("Meta calculada!");
  });

  // Adicionar alimento a uma refeição
  $("#form-alimento").addEventListener("submit", (e) => {
    e.preventDefault();
    const alimento = buscarAlimento($("#al-nome").value);
    const erroEl = $("#alimento-erro");
    if (!alimento) { erroEl.textContent = "Alimento não encontrado. Escolha um item da lista."; $("#al-nome").focus(); return; }
    const gramas = Number($("#al-gramas").value) || alimento.porcao;
    if (gramas <= 0 || gramas > 2000) { erroEl.textContent = "Informe entre 1 e 2000 gramas."; return; }
    erroEl.textContent = "";
    const refeicao = $("#al-refeicao").value;
    estado.dieta.refeicoes[refeicao].push({ id: alimento.id, gramas });
    salvarDieta();
    renderizarDieta();
    $("#al-nome").value = "";
    $("#al-gramas").value = "";
    $("#al-gramas").placeholder = "100";
    $("#al-nome").focus();
    avisar(`${alimento.nome} (${gramas} g) adicionado`);
  });
  // Sugere a porção padrão quando o alimento é escolhido
  $("#al-nome").addEventListener("change", () => {
    const a = buscarAlimento($("#al-nome").value);
    if (a) $("#al-gramas").placeholder = a.porcao;
  });

  // Edição e remoção dentro das refeições
  const lista = $("#lista-refeicoes");
  lista.addEventListener("change", (e) => {
    const { refeicao, i } = e.target.dataset;
    if (!refeicao) return;
    estado.dieta.refeicoes[refeicao][i].gramas = Math.max(1, Number(e.target.value) || 1);
    salvarDieta();
    renderizarDieta();
  });
  lista.addEventListener("click", (e) => {
    const b = e.target.closest("[data-remover-alimento]");
    if (!b) return;
    const [refeicao, i] = b.dataset.removerAlimento.split("|");
    estado.dieta.refeicoes[refeicao].splice(Number(i), 1);
    salvarDieta();
    renderizarDieta();
  });

  $("#btn-gerar-cardapio").addEventListener("click", gerarCardapio);
  $("#btn-limpar-dieta").addEventListener("click", () => {
    if (!confirm("Apagar todos os alimentos do cardápio?")) return;
    D.refeicoes.forEach((r) => { estado.dieta.refeicoes[r.id] = []; });
    salvarDieta();
    renderizarDieta();
  });

  renderizarDieta();
}

/** Mifflin-St Jeor + ajuste do objetivo + distribuição de macronutrientes. */
function calcularMeta({ sexo, idade, peso, altura, atividade, objetivo }) {
  const tmb = 10 * peso + 6.25 * altura - 5 * idade + (sexo === "m" ? 5 : -161);
  const gasto = tmb * atividade;
  const minimo = sexo === "m" ? 1500 : 1200;
  const ajuste = { emagrecer: -500, manter: 0, massa: 300 }[objetivo];
  const kcal = Math.max(minimo, Math.round((gasto + ajuste) / 10) * 10);
  const p = Math.round(peso * { emagrecer: 2.0, manter: 1.6, massa: 1.8 }[objetivo]);
  const g = Math.round(peso * (objetivo === "emagrecer" ? 0.8 : 0.9));
  const c = Math.max(0, Math.round((kcal - p * 4 - g * 9) / 4));
  return { tmb: Math.round(tmb), gasto: Math.round(gasto), kcal, p, c, g, agua: Math.round(peso * 35) };
}

function mostrarResultado() {
  const m = estado.dieta.meta;
  if (!m) return;
  const objetivo = estado.dieta.perfil.objetivo;
  const dica = {
    emagrecer: "Déficit de 500 kcal por dia ≈ 0,5 kg a menos por semana. Mantenha a proteína alta para preservar a massa muscular.",
    manter: "Coma perto do seu gasto diário e distribua a proteína ao longo do dia.",
    massa: "Superávit leve de 300 kcal para ganhar massa com o mínimo de gordura. Treine pesado e durma bem!"
  }[objetivo];
  $("#resultado-calc").innerHTML = `
    <div class="stats">
      <div class="stat stat--meta"><strong>${num(m.kcal)} kcal</strong><span>Sua meta diária</span></div>
      <div class="stat"><strong>${num(m.tmb)}</strong><span>Metabolismo basal</span></div>
      <div class="stat"><strong>${num(m.gasto)}</strong><span>Gasto diário</span></div>
      <div class="stat"><strong>${num(m.p)} g</strong><span>Proteína</span></div>
      <div class="stat"><strong>${num(m.c)} g</strong><span>Carboidrato</span></div>
      <div class="stat"><strong>${num(m.g)} g</strong><span>Gordura</span></div>
      <div class="stat"><strong>${num(m.agua / 1000, 1)} L</strong><span>Água por dia</span></div>
    </div>
    <p class="dica-box"><strong>Dica:</strong> ${dica}</p>`;
}

/** HTML do resumo de calorias e macros (usado na dieta e no prato). */
function htmlResumo(total, meta, rotulo) {
  const pct = (v, alvo) => (alvo ? Math.min(100, (v / alvo) * 100) : 0);
  const excedeu = meta && total.kcal > meta.kcal * 1.05;
  return `
    <div class="resumo__kcal">
      <div><strong>${num(total.kcal)}</strong> <small>kcal ${rotulo}</small></div>
      ${meta ? `<small>Meta: ${num(meta.kcal)} kcal · ${excedeu ? "acima da meta" : `faltam ${num(Math.max(0, meta.kcal - total.kcal))}`}</small>` : ""}
    </div>
    ${meta ? `<div class="barra ${excedeu ? "excedeu" : ""}"><span style="width:${pct(total.kcal, meta.kcal)}%"></span></div>` : ""}
    <div class="macros">
      <div class="macro">Proteína <b>${num(total.p)} g${meta ? ` / ${meta.p}` : ""}</b>${meta ? `<div class="barra barra--p"><span style="width:${pct(total.p, meta.p)}%"></span></div>` : ""}</div>
      <div class="macro">Carbo <b>${num(total.c)} g${meta ? ` / ${meta.c}` : ""}</b>${meta ? `<div class="barra barra--c"><span style="width:${pct(total.c, meta.c)}%"></span></div>` : ""}</div>
      <div class="macro">Gordura <b>${num(total.g)} g${meta ? ` / ${meta.g}` : ""}</b>${meta ? `<div class="barra barra--g"><span style="width:${pct(total.g, meta.g)}%"></span></div>` : ""}</div>
    </div>`;
}

/** Linha de um alimento com gramas editáveis. */
function htmlAlimento(item, atributos) {
  const a = alimentoPorId(item.id);
  const n = nutrientes(item.id, item.gramas);
  return `
    <div class="alimento">
      <span class="alimento__nome">${esc(a.nome)}<small>${num(n.kcal)} kcal · P ${num(n.p)} · C ${num(n.c)} · G ${num(n.g)}</small></span>
      <label class="alimento__gramas"><input type="number" min="1" max="2000" value="${item.gramas}" ${atributos.input} aria-label="Gramas de ${esc(a.nome)}"> g</label>
      <button class="btn-icone" type="button" ${atributos.remover} aria-label="Remover ${esc(a.nome)}">×</button>
    </div>`;
}

function renderizarDieta() {
  const todas = D.refeicoes.flatMap((r) => estado.dieta.refeicoes[r.id]);
  $("#resumo-dieta").innerHTML = htmlResumo(somar(todas), estado.dieta.meta, "no dia") +
    (estado.dieta.meta ? "" : `<small class="bloco__info">Calcule sua meta ao lado para acompanhar o quanto falta.</small>`);

  $("#lista-refeicoes").innerHTML = D.refeicoes.map((r) => {
    const itens = estado.dieta.refeicoes[r.id];
    const total = somar(itens);
    return `
      <div class="refeicao">
        <div class="refeicao__cabecalho"><span>${esc(r.nome)}</span><small>${num(total.kcal)} kcal</small></div>
        ${itens.length ? itens.map((it, i) => htmlAlimento(it, {
          input: `data-refeicao="${r.id}" data-i="${i}"`,
          remover: `data-remover-alimento="${r.id}|${i}"`
        })).join("") : `<p class="refeicao__vazia">Nenhum alimento ainda.</p>`}
      </div>`;
  }).join("");
}

/** Cardápio sugerido: o cardápio base é escalado para a meta calórica. */
function gerarCardapio() {
  const meta = estado.dieta.meta;
  if (!meta) {
    avisar("Calcule sua meta primeiro");
    $("#d-idade").focus();
    return;
  }
  const temItens = D.refeicoes.some((r) => estado.dieta.refeicoes[r.id].length);
  if (temItens && !confirm("Isso vai substituir o cardápio atual. Continuar?")) return;

  // Separa alimentos proteicos (mais de 40% das calorias vindas de proteína) dos demais
  // e resolve um sistema 2x2 para acertar ao mesmo tempo a meta de calorias e de proteína.
  const base = Object.values(D.cardapioBase).flat().map(([id, gramas]) => ({ id, gramas }));
  const ehProteico = (id) => { const a = alimentoPorId(id); return (a.p * 4) / a.kcal > 0.4; };
  const prot = somar(base.filter((i) => ehProteico(i.id)));
  const outros = somar(base.filter((i) => !ehProteico(i.id)));
  const det = prot.p * outros.kcal - outros.p * prot.kcal;
  const limitar = (f) => Math.min(3, Math.max(0.5, f));
  let fatorProt = limitar((meta.p * outros.kcal - outros.p * meta.kcal) / det);
  // Recalcula o fator dos demais para fechar as calorias com o fator proteico já limitado
  let fatorOutros = limitar((meta.kcal - fatorProt * prot.kcal) / outros.kcal);
  if (!Number.isFinite(fatorProt)) fatorProt = fatorOutros = meta.kcal / somar(base).kcal;

  Object.entries(D.cardapioBase).forEach(([refeicao, itens]) => {
    estado.dieta.refeicoes[refeicao] = itens.map(([id, gramas]) => ({
      id,
      // Café e azeite não precisam escalar; o resto é arredondado de 5 em 5 g
      gramas: ["cafe", "azeite"].includes(id)
        ? gramas
        : Math.max(5, Math.round((gramas * (ehProteico(id) ? fatorProt : fatorOutros)) / 5) * 5)
    }));
  });
  salvarDieta();
  renderizarDieta();
  avisar(`Cardápio de ~${num(meta.kcal)} kcal sugerido!`);
}

/* ==========================================================================
   3) CALORIAS POR FOTO
   Usa o modelo MobileNet (TensorFlow.js), que roda no próprio navegador.
   Ele reconhece cerca de 40 alimentos comuns (pizza, banana, brócolis...).
   Pratos que ele não conhece (ex.: arroz e feijão) são adicionados pela busca.
   ========================================================================== */
const URL_TF = "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@4.22.0/dist/tf.min.js";
const URL_MOBILENET = "https://cdn.jsdelivr.net/npm/@tensorflow-models/mobilenet@2.1.1/dist/mobilenet.min.js";
let modeloPromessa = null;

function carregarScript(url) {
  return new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = url;
    s.onload = resolve;
    s.onerror = () => reject(new Error(`Falha ao carregar ${url}`));
    document.head.appendChild(s);
  });
}

/** Carrega a IA só quando for usada pela primeira vez (economiza dados). */
function carregarModelo() {
  modeloPromessa ??= carregarScript(URL_TF)
    .then(() => carregarScript(URL_MOBILENET))
    .then(() => window.mobilenet.load({ version: 2, alpha: 1.0 }))
    .catch((erro) => { modeloPromessa = null; throw erro; });
  return modeloPromessa;
}

function iniciarFoto() {
  const area = $("#area-upload");

  ["#foto-camera", "#foto-galeria"].forEach((sel) => {
    $(sel).addEventListener("change", (e) => {
      if (e.target.files[0]) processarFoto(e.target.files[0]);
      e.target.value = ""; // permite escolher a mesma foto de novo
    });
  });

  // Arrastar e soltar (computador)
  area.addEventListener("dragover", (e) => { e.preventDefault(); area.classList.add("arrastando"); });
  area.addEventListener("dragleave", () => area.classList.remove("arrastando"));
  area.addEventListener("drop", (e) => {
    e.preventDefault();
    area.classList.remove("arrastando");
    const arquivo = e.dataTransfer.files[0];
    if (arquivo?.type.startsWith("image/")) processarFoto(arquivo);
  });

  // Incluir alimento manualmente no prato
  $("#form-prato").addEventListener("submit", (e) => {
    e.preventDefault();
    const a = buscarAlimento($("#pr-nome").value);
    if (!a) { $("#prato-erro").textContent = "Alimento não encontrado. Escolha um item da lista."; return; }
    $("#prato-erro").textContent = "";
    adicionarAoPrato(a.id);
    $("#pr-nome").value = "";
  });

  // Botões "+ Adicionar" dos resultados da IA
  $("#resultado-ia").addEventListener("click", (e) => {
    const b = e.target.closest("[data-prato]");
    if (b) adicionarAoPrato(b.dataset.prato);
  });

  const lista = $("#lista-prato");
  lista.addEventListener("change", (e) => {
    const i = e.target.dataset.prato;
    if (i === undefined) return;
    estado.prato[i].gramas = Math.max(1, Number(e.target.value) || 1);
    renderizarPrato();
  });
  lista.addEventListener("click", (e) => {
    const b = e.target.closest("[data-remover-prato]");
    if (!b) return;
    estado.prato.splice(Number(b.dataset.removerPrato), 1);
    renderizarPrato();
  });

  $("#btn-salvar-prato").addEventListener("click", () => {
    if (!estado.prato.length) { avisar("Seu prato está vazio"); return; }
    const refeicao = $("#pr-refeicao").value;
    estado.dieta.refeicoes[refeicao].push(...estado.prato);
    salvarDieta();
    const nome = D.refeicoes.find((r) => r.id === refeicao).nome;
    estado.prato = [];
    renderizarPrato();
    $("#resultado-ia").innerHTML = "";
    avisar(`Prato salvo em "${nome}" na sua dieta`);
  });

  renderizarPrato();
}

function adicionarAoPrato(id) {
  const existente = estado.prato.find((p) => p.id === id);
  if (existente) existente.gramas += alimentoPorId(id).porcao;
  else estado.prato.push({ id, gramas: alimentoPorId(id).porcao });
  renderizarPrato();
  avisar(`${alimentoPorId(id).nome} no prato`);
}

function renderizarPrato() {
  $("#lista-prato").innerHTML = estado.prato.map((it, i) =>
    htmlAlimento(it, { input: `data-prato="${i}"`, remover: `data-remover-prato="${i}"` })).join("");
  $("#prato-total").innerHTML = estado.prato.length
    ? `<div class="resumo">${htmlResumo(somar(estado.prato), null, "no prato")}</div>`
    : `<p class="prato__vazio">Nenhum alimento no prato ainda.<br>Tire uma foto ou busque o alimento acima.</p>`;
}

async function processarFoto(arquivo) {
  const preview = $("#foto-preview");
  const analisando = $("#foto-analisando");
  const status = $("#foto-status");
  const resultado = $("#resultado-ia");

  // Mostra a foto
  if (preview.src.startsWith("blob:")) URL.revokeObjectURL(preview.src);
  preview.src = URL.createObjectURL(arquivo);
  preview.hidden = false;
  $("#upload-vazio").hidden = true;
  await preview.decode().catch(() => {});

  analisando.hidden = false;
  resultado.innerHTML = "";
  status.textContent = modeloPromessa ? "Analisando a foto..." : "Carregando a inteligência artificial (só na primeira vez)...";

  try {
    const modelo = await carregarModelo();
    status.textContent = "Analisando a foto...";
    const previsoes = await modelo.classify(preview, 10);
    mostrarDeteccao(interpretarPrevisoes(previsoes));
  } catch (erro) {
    console.error(erro);
    resultado.innerHTML = `<p class="deteccao__msg">Não foi possível carregar a IA (verifique sua internet). Você ainda pode montar o prato pela busca ao lado.</p>`;
  } finally {
    analisando.hidden = true;
  }
}

/** Converte as classes do modelo (em inglês) em alimentos da nossa tabela. */
function interpretarPrevisoes(previsoes) {
  const pontuacao = {};
  previsoes.forEach(({ className, probability }) => {
    className.toLowerCase().split(",").map((n) => n.trim()).some((nome) => {
      const id = D.mapaIA[nome];
      if (id === undefined) return false;
      if (id) pontuacao[id] = (pontuacao[id] || 0) + probability;
      return true;
    });
  });
  return Object.entries(pontuacao)
    .map(([id, prob]) => ({ id, prob }))
    .filter((r) => r.prob >= 0.05)
    .sort((a, b) => b.prob - a.prob)
    .slice(0, 3);
}

function mostrarDeteccao(resultados) {
  const area = $("#resultado-ia");
  if (!resultados.length) {
    area.innerHTML = `<p class="deteccao__msg">Não consegui identificar o alimento com segurança. Use a busca em <strong>Seu prato</strong> para incluir os itens (ex.: arroz, feijão, frango).</p>`;
    return;
  }

  // O resultado mais provável já entra no prato automaticamente
  const [principal] = resultados;
  if (principal.prob >= 0.2 && !estado.prato.some((p) => p.id === principal.id)) adicionarAoPrato(principal.id);

  area.innerHTML = `<p class="deteccao__titulo">Encontrei na foto:</p>` + resultados.map((r, i) => {
    const a = alimentoPorId(r.id);
    const n = nutrientes(a.id, a.porcao);
    const confianca = Math.round(r.prob * 100);
    return `
      <div class="deteccao__item" style="animation-delay:${i * 0.08}s">
        <div><strong>${esc(a.nome)}</strong><small>${esc(a.medida)} (${a.porcao} g) ≈ <b>${num(n.kcal)} kcal</b></small></div>
        <button class="btn-mini" type="button" data-prato="${a.id}">+ Adicionar</button>
        <div class="deteccao__confianca">
          <div class="barra"><span style="width:${confianca}%"></span></div>
          <small>${confianca}% de confiança</small>
        </div>
      </div>`;
  }).join("");
}
