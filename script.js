/* ==========================================================================
   Iron Force Academia — Script principal
   Todo o conteúdo dinâmico (modalidades, planos, professores, horários etc.)
   vem do arquivo data.json. Para editar textos e preços, altere apenas o JSON.
   ========================================================================== */

"use strict";

/* --------------------------------------------------------------------------
   Utilitários
   -------------------------------------------------------------------------- */
const $ = (seletor, raiz = document) => raiz.querySelector(seletor);
const $$ = (seletor, raiz = document) => [...raiz.querySelectorAll(seletor)];

/** Escapa texto para inserir com segurança em templates HTML. */
const esc = (txt) => String(txt).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const formatarMoeda = (valor) => valor.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const NOMES_PERIODO = { manha: "Manhã", tarde: "Tarde", noite: "Noite" };
const DIAS = [
  { id: "seg", curto: "Seg", nome: "Segunda" },
  { id: "ter", curto: "Ter", nome: "Terça" },
  { id: "qua", curto: "Qua", nome: "Quarta" },
  { id: "qui", curto: "Qui", nome: "Quinta" },
  { id: "sex", curto: "Sex", nome: "Sexta" },
  { id: "sab", curto: "Sáb", nome: "Sábado" }
];
const CICLOS = {
  mensal: { meses: 1, rotulo: "mês" },
  trimestral: { meses: 3, rotulo: "trimestre" },
  anual: { meses: 12, rotulo: "ano" }
};

/* --------------------------------------------------------------------------
   Carregamento dos dados
   Ao abrir o index.html direto do computador (file://), o navegador bloqueia
   o fetch do data.json. Nesse caso usamos a cópia do arquivo data.js.
   -------------------------------------------------------------------------- */
async function carregarDados() {
  try {
    const resposta = await fetch("data.json", { cache: "no-cache" });
    if (!resposta.ok) throw new Error(resposta.status);
    return await resposta.json();
  } catch (erro) {
    console.info("data.json indisponível (provavelmente aberto via file://). Usando dados embutidos.");
    return window.DADOS_SITE;
  }
}

/* --------------------------------------------------------------------------
   Inicialização
   -------------------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", async () => {
  const inicio = performance.now();
  const dados = await carregarDados();

  iniciarHeader();
  iniciarProgresso();
  preencherContato(dados.academia);
  renderizarContadores(dados.estatisticas);
  iniciarModalidades(dados.modalidades);
  iniciarPlanos(dados.planos);
  iniciarPersonais(dados.personais);
  iniciarHorarios(dados.horarios);
  iniciarGaleria(dados.galeria);
  iniciarDepoimentos(dados.depoimentos);
  renderizarFaq(dados.faq);
  iniciarFormularios(dados);
  iniciarModais();
  iniciarRevelar();
  tratarImagensQuebradas();
  $("#ano").textContent = new Date().getFullYear();

  // Garante que o loader apareça por pelo menos 700 ms (evita "piscar")
  const espera = Math.max(0, 700 - (performance.now() - inicio));
  setTimeout(esconderLoader, espera);
});

// Segurança: se algo travar, o loader some em 5 s mesmo assim
setTimeout(esconderLoader, 5000);

function esconderLoader() {
  const loader = $("#loader");
  if (!loader || loader.classList.contains("oculto")) return;
  loader.classList.add("oculto");
  document.body.classList.remove("carregando");
  document.body.classList.add("pronto"); // dispara a animação de entrada do hero
}

/* --------------------------------------------------------------------------
   Header: fundo ao rolar, menu hambúrguer e link ativo
   -------------------------------------------------------------------------- */
function iniciarHeader() {
  const header = $("#header");
  const nav = $("#nav");
  const botao = $("#hamburguer");
  const sombra = document.createElement("div");
  sombra.className = "nav-sombra";
  document.body.appendChild(sombra);

  const alternarMenu = (abrir) => {
    nav.classList.toggle("aberto", abrir);
    botao.classList.toggle("ativo", abrir);
    sombra.classList.toggle("visivel", abrir);
    document.body.classList.toggle("travado", abrir);
    botao.setAttribute("aria-expanded", abrir);
    botao.setAttribute("aria-label", abrir ? "Fechar menu" : "Abrir menu");
    if (abrir) $(".nav__link", nav).focus();
  };

  botao.addEventListener("click", () => alternarMenu(!nav.classList.contains("aberto")));
  sombra.addEventListener("click", () => alternarMenu(false));
  $$("a", nav).forEach((link) => link.addEventListener("click", () => alternarMenu(false)));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("aberto")) {
      alternarMenu(false);
      botao.focus();
    }
  });

  // Header com fundo sólido e botão "voltar ao topo" após rolar
  const topo = $("#btn-topo");
  const aoRolar = () => {
    header.classList.toggle("rolado", window.scrollY > 40);
    topo.classList.toggle("visivel", window.scrollY > 700);
  };
  window.addEventListener("scroll", aoRolar, { passive: true });
  aoRolar();

  // Destaca o link da seção visível
  const links = $$(".nav__link");
  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      if (!entrada.isIntersecting) return;
      links.forEach((l) => l.classList.toggle("ativo", l.getAttribute("href") === `#${entrada.target.id}`));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  links.forEach((l) => {
    const secao = $(l.getAttribute("href"));
    if (secao) observador.observe(secao);
  });
}

/* --------------------------------------------------------------------------
   Barra de progresso de leitura
   -------------------------------------------------------------------------- */
function iniciarProgresso() {
  const barra = $("#progresso");
  let agendado = false;
  const atualizar = () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    barra.style.transform = `scaleX(${total > 0 ? window.scrollY / total : 0})`;
    agendado = false;
  };
  window.addEventListener("scroll", () => {
    if (!agendado) { agendado = true; requestAnimationFrame(atualizar); }
  }, { passive: true });
  atualizar();
}

/* --------------------------------------------------------------------------
   Animações de scroll (fade / slide) com IntersectionObserver
   -------------------------------------------------------------------------- */
function iniciarRevelar() {
  const observador = new IntersectionObserver((entradas, obs) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add("visivel");
        obs.unobserve(entrada.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  $$(".revelar").forEach((el) => observador.observe(el));
}

/* --------------------------------------------------------------------------
   Informações de contato (vêm do JSON para manter tudo num só lugar)
   -------------------------------------------------------------------------- */
function preencherContato(academia) {
  const linkWhats = `https://wa.me/${academia.whatsapp}?text=${encodeURIComponent("Olá! Gostaria de saber mais sobre a Iron Force.")}`;
  const telLimpo = academia.telefone.replace(/\D/g, "");

  $("#info-endereco").textContent = academia.endereco;
  $("#footer-endereco").textContent = academia.endereco;
  [["#info-telefone"], ["#footer-telefone"]].forEach(([sel]) => {
    $(sel).textContent = academia.telefone;
    $(sel).href = `tel:+55${telLimpo}`;
  });
  [["#info-email"], ["#footer-email"]].forEach(([sel]) => {
    $(sel).textContent = academia.email;
    $(sel).href = `mailto:${academia.email}`;
  });
  $("#info-whatsapp").textContent = academia.whatsappExibicao;
  $("#info-whatsapp").href = linkWhats;
  $("#btn-whatsapp").href = linkWhats;

  // Reaproveita os ícones de redes sociais no rodapé
  $("#redes-footer").innerHTML = $(".contato .redes").innerHTML;
}

/* --------------------------------------------------------------------------
   Contadores animados
   -------------------------------------------------------------------------- */
function renderizarContadores(estatisticas) {
  const area = $("#contadores");
  area.innerHTML = estatisticas.map((e) => `
    <div class="contador revelar">
      <div class="contador__numero" data-alvo="${e.valor}" data-sufixo="${esc(e.sufixo)}">0${esc(e.sufixo)}</div>
      <div class="contador__rotulo">${esc(e.rotulo)}</div>
    </div>`).join("");

  const animar = (el) => {
    const alvo = Number(el.dataset.alvo);
    const sufixo = el.dataset.sufixo;
    const duracao = 1800;
    const inicio = performance.now();
    const passo = (agora) => {
      const t = duracao ? Math.min((agora - inicio) / duracao, 1) : 1;
      const suavizado = 1 - Math.pow(1 - t, 3); // easeOutCubic
      el.textContent = Math.round(alvo * suavizado).toLocaleString("pt-BR") + sufixo;
      if (t < 1) requestAnimationFrame(passo);
    };
    requestAnimationFrame(passo);
  };

  const observador = new IntersectionObserver((entradas, obs) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        animar(entrada.target);
        obs.unobserve(entrada.target);
      }
    });
  }, { threshold: 0.6 });
  $$(".contador__numero", area).forEach((el) => observador.observe(el));
}

/* --------------------------------------------------------------------------
   Modalidades: cards, filtros e modal de detalhes
   -------------------------------------------------------------------------- */
function iniciarModalidades(modalidades) {
  const lista = $("#lista-modalidades");
  const vazio = $("#modalidades-vazio");
  const filtroMod = $("#filtro-modalidade");
  const filtro = { modalidade: "todas", periodo: "todos" };

  filtroMod.innerHTML = `<button class="chip ativo" data-mod="todas" aria-pressed="true">Todas</button>` +
    modalidades.map((m) => `<button class="chip" data-mod="${m.id}" aria-pressed="false">${esc(m.nome)}</button>`).join("");

  const renderizar = () => {
    const filtradas = modalidades.filter((m) =>
      (filtro.modalidade === "todas" || m.id === filtro.modalidade) &&
      (filtro.periodo === "todos" || m.periodos.includes(filtro.periodo)));

    lista.innerHTML = filtradas.map((m, i) => `
      <article class="card-mod" style="animation-delay:${i * 0.07}s">
        <div class="card-mod__midia">
          <img src="${m.imagem}" alt="Aula de ${esc(m.nome)} na Iron Force" loading="lazy" width="800" height="500">
          <span class="card-mod__icone" aria-hidden="true">${icone(m.icone)}</span>
        </div>
        <div class="card-mod__corpo">
          <h3 class="card-mod__titulo"><a href="modalidade.html?m=${m.id}">${esc(m.nome)}</a></h3>
          <p class="card-mod__resumo">${esc(m.resumo)}</p>
          <div class="card-mod__periodos">${m.periodos.map((p) => `<span class="tag-periodo">${NOMES_PERIODO[p]}</span>`).join("")}</div>
          <a class="btn btn--escuro" href="modalidade.html?m=${m.id}">Saiba mais <span aria-hidden="true">→</span></a>
        </div>
      </article>`).join("");
    vazio.hidden = filtradas.length > 0;
  };

  // Ativa um chip e desativa os irmãos
  const ativarChip = (chip) => {
    $$(".chip", chip.parentElement).forEach((c) => {
      c.classList.toggle("ativo", c === chip);
      c.setAttribute("aria-pressed", c === chip);
    });
  };

  filtroMod.addEventListener("click", (e) => {
    const chip = e.target.closest(".chip");
    if (!chip) return;
    ativarChip(chip);
    filtro.modalidade = chip.dataset.mod;
    renderizar();
  });
  $("#filtro-periodo").addEventListener("click", (e) => {
    const chip = e.target.closest(".chip");
    if (!chip) return;
    ativarChip(chip);
    filtro.periodo = chip.dataset.periodo;
    renderizar();
  });

  renderizar();
}

/* --------------------------------------------------------------------------
   Planos: toggle de ciclo e atualização dos valores
   -------------------------------------------------------------------------- */
let cicloAtual = "mensal";

/** Faz o número de um elemento contar do valor atual até o novo (em reais). */
function animarValor(el, para) {
  const de = Number(el.dataset.valor ?? para);
  el.dataset.valor = para;
  if (de === para) { el.textContent = formatarMoeda(para); return; }
  const inicio = performance.now();
  el.classList.add("bump");
  const passo = (agora) => {
    const t = Math.min((agora - inicio) / 650, 1);
    el.textContent = formatarMoeda(de + (para - de) * (1 - Math.pow(1 - t, 3)));
    if (t < 1) requestAnimationFrame(passo);
    else el.classList.remove("bump");
  };
  requestAnimationFrame(passo);
}

function iniciarPlanos(planos) {
  const lista = $("#lista-planos");
  const toggle = $("#toggle-periodo");
  const indicador = $(".toggle-periodo__indicador", toggle);

  lista.innerHTML = planos.map((p, i) => `
    <article class="plano ${p.destaque ? "plano--destaque" : ""} revelar" style="transition-delay:${i * 0.12}s" data-plano="${p.id}">
      ${p.destaque ? `<span class="plano__selo">Mais escolhido</span>` : ""}
      <h3 class="plano__nome">${esc(p.nome)}</h3>
      <div class="plano__preco">
        <span class="plano__moeda">R$</span>
        <span class="plano__valor" data-valor="${p.precos.mensal}">${formatarMoeda(p.precos.mensal)}</span>
        <span class="plano__mes">/mês</span>
      </div>
      <p class="plano__economia" aria-live="polite"></p>
      <ul class="plano__lista">
        ${p.beneficios.map((b) => `
          <li class="${b.incluso ? "" : "nao"}">
            <span class="${b.incluso ? "icone-check" : "icone-x"}" aria-hidden="true">${b.incluso ? "✓" : "✕"}</span>
            <span>${esc(b.texto)}<span class="sr-only">${b.incluso ? " (incluso)" : " (não incluso)"}</span></span>
          </li>`).join("")}
      </ul>
      <a href="#matricula" class="btn ${p.destaque ? "btn--primario" : "btn--escuro"} btn--bloco" data-escolher-plano="${p.id}">Quero o ${esc(p.nome)}</a>
    </article>`).join("");

  const atualizarPrecos = () => {
    const { meses, rotulo } = CICLOS[cicloAtual];
    planos.forEach((p) => {
      const card = $(`[data-plano="${p.id}"]`, lista);
      const valorEl = $(".plano__valor", card);
      const economiaEl = $(".plano__economia", card);
      const preco = p.precos[cicloAtual];

      // O número "conta" do valor antigo até o novo
      animarValor(valorEl, preco);

      if (meses === 1) {
        economiaEl.innerHTML = `<small>Sem fidelidade · cancele quando quiser</small>`;
      } else {
        const economia = (p.precos.mensal - preco) * meses;
        const percentual = Math.round((1 - preco / p.precos.mensal) * 100);
        economiaEl.innerHTML = `Economize R$ ${formatarMoeda(economia)} por ${rotulo} (-${percentual}%)
          <small>Total de R$ ${formatarMoeda(preco * meses)} por ${rotulo}</small>`;
      }
    });
  };

  toggle.addEventListener("click", (e) => {
    const botao = e.target.closest(".toggle-periodo__btn");
    if (!botao) return;
    selecionarCiclo(botao);
  });
  // Setas do teclado no grupo de rádio
  toggle.addEventListener("keydown", (e) => {
    if (!["ArrowLeft", "ArrowRight"].includes(e.key)) return;
    const botoes = $$(".toggle-periodo__btn", toggle);
    const atual = botoes.findIndex((b) => b.classList.contains("ativo"));
    const proximo = botoes[(atual + (e.key === "ArrowRight" ? 1 : -1) + botoes.length) % botoes.length];
    selecionarCiclo(proximo);
    proximo.focus();
  });

  function selecionarCiclo(botao) {
    const botoes = $$(".toggle-periodo__btn", toggle);
    botoes.forEach((b) => {
      const ativo = b === botao;
      b.classList.toggle("ativo", ativo);
      b.setAttribute("aria-checked", ativo);
      b.tabIndex = ativo ? 0 : -1;
    });
    indicador.style.transform = `translateX(${botoes.indexOf(botao) * 100}%)`;
    cicloAtual = botao.dataset.ciclo;
    atualizarPrecos();
  }
  $$(".toggle-periodo__btn", toggle).forEach((b, i) => { b.tabIndex = i === 0 ? 0 : -1; });

  // Botão do plano: pré-seleciona no formulário de matrícula
  lista.addEventListener("click", (e) => {
    const botao = e.target.closest("[data-escolher-plano]");
    if (!botao) return;
    const select = $("#m-plano");
    select.value = `${botao.dataset.escolherPlano}|${cicloAtual}`;
    select.dispatchEvent(new Event("change"));
  });

  atualizarPrecos();
}

/* --------------------------------------------------------------------------
   Personal trainers: slider com setas, pontos e swipe
   -------------------------------------------------------------------------- */
function iniciarPersonais(personais) {
  const trilho = $("#lista-personal");
  const pontos = $("#personal-pontos");
  const anterior = $("#personal-anterior");
  const proximo = $("#personal-proximo");
  let indice = 0;

  trilho.innerHTML = personais.map((p, i) => `
    <div class="slider__item" role="group" aria-roledescription="slide" aria-label="${i + 1} de ${personais.length}">
      <article class="card-personal">
        <div class="card-personal__foto">
          <img src="${p.foto}" alt="${esc(p.fotoAlt || `Foto de ${p.nome}, personal trainer`)}" style="object-position:${p.fotoPosicao || "50% 30%"}" loading="lazy" width="900" height="900">
          <h3 class="card-personal__nome">${esc(p.nome)}</h3>
        </div>
        <div class="card-personal__corpo">
          <p class="card-personal__esp">${esc(p.especialidade)}</p>
          <ul class="card-personal__cert" aria-label="Certificações">${p.certificacoes.map((c) => `<li>${esc(c)}</li>`).join("")}</ul>
          <button class="btn btn--primario btn--bloco" data-agendar="${esc(p.nome)}">Agendar avaliação</button>
        </div>
      </article>
    </div>`).join("");

  const porTela = () => (window.innerWidth >= 900 ? 3 : window.innerWidth >= 600 ? 2 : 1);
  const maximo = () => Math.max(0, personais.length - porTela());

  const atualizar = () => {
    indice = Math.min(indice, maximo());
    trilho.style.transform = `translateX(-${(indice * 100) / porTela()}%)`;
    anterior.disabled = indice === 0;
    proximo.disabled = indice === maximo();

    // Recria os pontos conforme o número de posições possíveis
    const total = maximo() + 1;
    if (pontos.children.length !== total) {
      pontos.innerHTML = Array.from({ length: total }, (_, i) =>
        `<button role="tab" aria-label="Ir para posição ${i + 1}" data-i="${i}"></button>`).join("");
    }
    $$("button", pontos).forEach((b, i) => {
      b.classList.toggle("ativo", i === indice);
      b.setAttribute("aria-selected", i === indice);
    });

    // Itens fora da tela não recebem foco pelo teclado
    $$(".slider__item", trilho).forEach((item, i) => {
      const visivel = i >= indice && i < indice + porTela();
      item.setAttribute("aria-hidden", !visivel);
      $$("button", item).forEach((b) => { b.tabIndex = visivel ? 0 : -1; });
    });
  };

  anterior.addEventListener("click", () => { indice = Math.max(0, indice - 1); atualizar(); });
  proximo.addEventListener("click", () => { indice = Math.min(maximo(), indice + 1); atualizar(); });
  pontos.addEventListener("click", (e) => {
    if (e.target.dataset.i) { indice = Number(e.target.dataset.i); atualizar(); }
  });
  adicionarSwipe(trilho, () => proximo.click(), () => anterior.click());
  window.addEventListener("resize", atualizar);

  // Abre o formulário de agendamento
  trilho.addEventListener("click", (e) => {
    const botao = e.target.closest("[data-agendar]");
    if (!botao) return;
    $("#modal-av-personal").textContent = botao.dataset.agendar;
    $("#form-avaliacao").dataset.personal = botao.dataset.agendar;
    abrirModal("#modal-avaliacao", botao);
  });

  atualizar();
}

/** Detecta arraste horizontal (touch) em um elemento. */
function adicionarSwipe(elemento, aoEsquerda, aoDireita) {
  let inicioX = null;
  elemento.addEventListener("touchstart", (e) => { inicioX = e.touches[0].clientX; }, { passive: true });
  elemento.addEventListener("touchend", (e) => {
    if (inicioX === null) return;
    const diferenca = e.changedTouches[0].clientX - inicioX;
    if (Math.abs(diferenca) > 50) (diferenca < 0 ? aoEsquerda : aoDireita)();
    inicioX = null;
  });
}

/* --------------------------------------------------------------------------
   Grade de horários com abas por dia
   -------------------------------------------------------------------------- */
function iniciarHorarios(horarios) {
  const abas = $("#abas-dias");
  const grade = $("#grade-horarios");

  // Abre no dia de hoje (domingo mostra segunda)
  const hoje = new Date().getDay(); // 0 = domingo
  let diaAtivo = DIAS[hoje === 0 ? 0 : hoje - 1].id;

  abas.innerHTML = DIAS.map((d) => `
    <button class="aba" role="tab" id="aba-${d.id}" aria-controls="grade-horarios" data-dia="${d.id}">
      ${d.curto}<small>${horarios[d.id]?.length || 0} aulas</small>
    </button>`).join("");

  const renderizar = () => {
    $$(".aba", abas).forEach((aba) => {
      const ativa = aba.dataset.dia === diaAtivo;
      aba.setAttribute("aria-selected", ativa);
      aba.tabIndex = ativa ? 0 : -1;
    });
    grade.setAttribute("aria-labelledby", `aba-${diaAtivo}`);

    const aulas = horarios[diaAtivo] || [];
    if (!aulas.length) {
      grade.innerHTML = `<p class="vazio">Sem aulas coletivas neste dia. A musculação funciona normalmente!</p>`;
      return;
    }
    grade.innerHTML = aulas.map((a, i) => {
      const ocupacao = Math.round(((a.capacidade - a.vagas) / a.capacidade) * 100);
      const estado = a.vagas === 0 ? "lotado" : a.vagas <= 3 ? "poucas" : "livre";
      const texto = estado === "lotado" ? "Lotado" : `${a.vagas} ${a.vagas === 1 ? "vaga" : "vagas"}`;
      return `
        <div class="aula aula--${estado}" style="animation-delay:${i * 0.05}s">
          <span class="aula__hora">${a.hora}</span>
          <span class="aula__nome">${esc(a.modalidade)}</span>
          <span class="aula__prof">${esc(a.professor)} · ${NOMES_PERIODO[a.periodo]}</span>
          <div class="aula__vagas">
            <div class="aula__barra" role="progressbar" aria-valuenow="${ocupacao}" aria-valuemin="0" aria-valuemax="100" aria-label="Ocupação da turma"><span style="width:${ocupacao}%"></span></div>
            <span class="aula__status">${texto}</span>
          </div>
        </div>`;
    }).join("");
  };

  abas.addEventListener("click", (e) => {
    const aba = e.target.closest(".aba");
    if (!aba) return;
    diaAtivo = aba.dataset.dia;
    renderizar();
  });
  // Navegação por setas entre as abas
  abas.addEventListener("keydown", (e) => {
    if (!["ArrowLeft", "ArrowRight"].includes(e.key)) return;
    const i = DIAS.findIndex((d) => d.id === diaAtivo);
    diaAtivo = DIAS[(i + (e.key === "ArrowRight" ? 1 : -1) + DIAS.length) % DIAS.length].id;
    renderizar();
    $(`[data-dia="${diaAtivo}"]`, abas).focus();
  });

  renderizar();
}

/* --------------------------------------------------------------------------
   Galeria com filtro e lightbox
   -------------------------------------------------------------------------- */
function iniciarGaleria(imagens) {
  const grade = $("#lista-galeria");
  const filtro = $("#filtro-galeria");
  const lightbox = $("#lightbox");
  let visiveis = imagens;
  let atual = 0;
  let origemFoco = null;

  const renderizar = (categoria) => {
    visiveis = categoria === "todos" ? imagens : imagens.filter((img) => img.categoria === categoria);
    grade.innerHTML = visiveis.map((img, i) => `
      <button class="galeria__item" data-i="${i}" style="animation-delay:${i * 0.04}s" aria-label="Ampliar: ${esc(img.alt)}">
        <img src="${img.src}" alt="${esc(img.alt)}" loading="lazy" width="600" height="600">
        <span class="galeria__legenda" aria-hidden="true"><strong>${esc(img.categoria)}</strong>${esc(img.alt)}</span>
      </button>`).join("");
  };

  filtro.addEventListener("click", (e) => {
    const chip = e.target.closest(".chip");
    if (!chip) return;
    $$(".chip", filtro).forEach((c) => {
      c.classList.toggle("ativo", c === chip);
      c.setAttribute("aria-pressed", c === chip);
    });
    renderizar(chip.dataset.cat);
  });

  const mostrar = (i) => {
    atual = (i + visiveis.length) % visiveis.length;
    const img = $("#lb-img");
    img.style.animation = "none";
    void img.offsetWidth; // reinicia a animação
    img.style.animation = "";
    img.src = visiveis[atual].src.replace("w=900", "w=1600");
    img.alt = visiveis[atual].alt;
    $("#lb-legenda").textContent = `${visiveis[atual].alt} (${atual + 1}/${visiveis.length})`;
  };
  const fechar = () => {
    lightbox.hidden = true;
    document.body.classList.remove("travado");
    origemFoco?.focus();
  };

  grade.addEventListener("click", (e) => {
    const item = e.target.closest(".galeria__item");
    if (!item) return;
    origemFoco = item;
    mostrar(Number(item.dataset.i));
    lightbox.hidden = false;
    document.body.classList.add("travado");
    $(".lightbox__fechar").focus();
  });
  $("#lb-anterior").addEventListener("click", () => mostrar(atual - 1));
  $("#lb-proximo").addEventListener("click", () => mostrar(atual + 1));
  $(".lightbox__fechar").addEventListener("click", fechar);
  lightbox.addEventListener("click", (e) => { if (e.target === lightbox) fechar(); });
  adicionarSwipe(lightbox, () => mostrar(atual + 1), () => mostrar(atual - 1));
  document.addEventListener("keydown", (e) => {
    if (lightbox.hidden) return;
    if (e.key === "Escape") fechar();
    if (e.key === "ArrowRight") mostrar(atual + 1);
    if (e.key === "ArrowLeft") mostrar(atual - 1);
    if (e.key === "Tab") prenderFoco(e, lightbox);
  });

  renderizar("todos");
}

/* --------------------------------------------------------------------------
   Depoimentos: carrossel automático que pausa no hover/foco
   -------------------------------------------------------------------------- */
function iniciarDepoimentos(depoimentos) {
  const carrossel = $("#carrossel-depoimentos");
  const trilho = $("#lista-depoimentos");
  const pontos = $("#depoimentos-pontos");
  let indice = 0;
  let timer = null;

  trilho.innerHTML = depoimentos.map((d) => `
    <div class="depoimento">
      <blockquote class="depoimento__caixa">
        <div class="estrelas" role="img" aria-label="Nota ${d.nota} de 5">${"★".repeat(d.nota)}${"☆".repeat(5 - d.nota)}</div>
        <p class="depoimento__texto">${esc(d.texto)}</p>
        <footer class="depoimento__autor">
          <img src="${d.foto}" alt="Foto de ${esc(d.nome)}" loading="lazy" width="54" height="54">
          <div><strong>${esc(d.nome)}</strong><span>${esc(d.info)}</span></div>
        </footer>
      </blockquote>
    </div>`).join("");

  const porTela = () => (window.innerWidth >= 900 ? 2 : 1);
  const total = () => depoimentos.length - porTela() + 1;

  const ir = (i) => {
    indice = (i + total()) % total();
    trilho.style.transform = `translateX(-${(indice * 100) / porTela()}%)`;
    if (pontos.children.length !== total()) {
      pontos.innerHTML = Array.from({ length: total() }, (_, n) =>
        `<button aria-label="Mostrar depoimento ${n + 1}" data-i="${n}"></button>`).join("");
    }
    $$("button", pontos).forEach((b, n) => b.classList.toggle("ativo", n === indice));
  };

  const iniciar = () => {
    parar();
    timer = setInterval(() => ir(indice + 1), 5000);
  };
  const parar = () => clearInterval(timer);

  carrossel.addEventListener("mouseenter", parar);
  carrossel.addEventListener("mouseleave", iniciar);
  carrossel.addEventListener("focusin", parar);
  carrossel.addEventListener("focusout", iniciar);
  pontos.addEventListener("click", (e) => {
    if (e.target.dataset.i) ir(Number(e.target.dataset.i));
  });
  adicionarSwipe(trilho, () => { ir(indice + 1); iniciar(); }, () => { ir(indice - 1); iniciar(); });
  window.addEventListener("resize", () => ir(indice));
  // Pausa quando a aba do navegador não está visível
  document.addEventListener("visibilitychange", () => (document.hidden ? parar() : iniciar()));

  ir(0);
  iniciar();
}

/* --------------------------------------------------------------------------
   FAQ: acordeão acessível
   -------------------------------------------------------------------------- */
function renderizarFaq(perguntas) {
  const lista = $("#lista-faq");
  lista.innerHTML = perguntas.map((p, i) => `
    <div class="acordeao__item revelar">
      <h3>
        <button class="acordeao__botao" aria-expanded="false" aria-controls="faq-${i}" id="faq-btn-${i}">
          ${esc(p.pergunta)}<span class="acordeao__sinal" aria-hidden="true"></span>
        </button>
      </h3>
      <div class="acordeao__painel" id="faq-${i}" role="region" aria-labelledby="faq-btn-${i}">
        <div><p>${esc(p.resposta)}</p></div>
      </div>
    </div>`).join("");

  lista.addEventListener("click", (e) => {
    const botao = e.target.closest(".acordeao__botao");
    if (!botao) return;
    const item = botao.closest(".acordeao__item");
    const abrir = !item.classList.contains("aberto");
    // Fecha os outros para manter só um aberto
    $$(".acordeao__item", lista).forEach((outro) => {
      outro.classList.remove("aberto");
      $(".acordeao__botao", outro).setAttribute("aria-expanded", "false");
    });
    item.classList.toggle("aberto", abrir);
    botao.setAttribute("aria-expanded", abrir);
  });
}

/* --------------------------------------------------------------------------
   Modais genéricos (abrir, fechar, foco preso, Esc)
   -------------------------------------------------------------------------- */
let modalAberto = null;
let focoAnterior = null;

function abrirModal(seletor, origem) {
  modalAberto = $(seletor);
  focoAnterior = origem || document.activeElement;
  modalAberto.hidden = false;
  document.body.classList.add("travado");
  $(".modal__fechar", modalAberto).focus();
}

function fecharModal(restaurarFoco = true) {
  if (!modalAberto) return;
  modalAberto.hidden = true;
  modalAberto = null;
  document.body.classList.remove("travado");
  // Links dentro do modal (ex.: "Quero fazer essa aula") navegam para outra seção,
  // então não devolvemos o foco ao botão de origem para não rolar a página de volta.
  if (restaurarFoco) focoAnterior?.focus();
}

function iniciarModais() {
  $$(".modal").forEach((modal) => {
    modal.addEventListener("click", (e) => {
      const alvo = e.target.closest("[data-fechar]");
      if (alvo) fecharModal(alvo.tagName !== "A");
    });
  });
  document.addEventListener("keydown", (e) => {
    if (!modalAberto) return;
    if (e.key === "Escape") fecharModal();
    if (e.key === "Tab") prenderFoco(e, modalAberto);
  });
}

/** Mantém o foco do teclado dentro de um diálogo aberto. */
function prenderFoco(e, container) {
  const focaveis = $$('a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])', container)
    .filter((el) => el.offsetParent !== null);
  if (!focaveis.length) return;
  const primeiro = focaveis[0];
  const ultimo = focaveis[focaveis.length - 1];
  if (e.shiftKey && document.activeElement === primeiro) { e.preventDefault(); ultimo.focus(); }
  else if (!e.shiftKey && document.activeElement === ultimo) { e.preventDefault(); primeiro.focus(); }
}

/* --------------------------------------------------------------------------
   Formulários: máscara, validação em tempo real e envio simulado
   -------------------------------------------------------------------------- */

/** Máscara de telefone: (11) 98765-4321 ou (11) 3456-7890 */
function mascararTelefone(valor) {
  const d = valor.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

/** Regras de validação por nome de campo. Retornam a mensagem de erro ou "". */
const REGRAS = {
  nome: (v) => {
    if (!v.trim()) return "Informe seu nome.";
    if (v.trim().length < 3) return "O nome precisa ter pelo menos 3 letras.";
    if (!/^[A-Za-zÀ-ÿ' ]+$/.test(v.trim())) return "Use apenas letras no nome.";
    if (v.trim().split(/\s+/).length < 2) return "Informe nome e sobrenome.";
    return "";
  },
  email: (v) => {
    if (!v.trim()) return "Informe seu e-mail.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())) return "E-mail inválido. Ex.: nome@email.com";
    return "";
  },
  telefone: (v) => {
    const d = v.replace(/\D/g, "");
    if (!d) return "Informe seu telefone.";
    if (d.length < 10) return "Telefone incompleto. Inclua o DDD.";
    if (d.length === 11 && d[2] !== "9") return "Celular deve começar com 9 após o DDD.";
    return "";
  },
  modalidade: (v) => (v ? "" : "Escolha uma modalidade."),
  plano: (v) => (v ? "" : "Escolha um plano."),
  objetivo: (v) => (v ? "" : "Selecione seu objetivo."),
  aceite: (v, el) => (el.checked ? "" : "É preciso aceitar o contato para continuar."),
  mensagem: (v) => (v.trim().length < 10 ? "A mensagem precisa ter pelo menos 10 caracteres." : ""),
  hora: (v) => (v ? "" : "Escolha um horário."),
  data: (v) => {
    if (!v) return "Escolha uma data.";
    const escolhida = new Date(`${v}T12:00:00`);
    const amanha = new Date(); amanha.setHours(0, 0, 0, 0); amanha.setDate(amanha.getDate() + 1);
    if (escolhida < amanha) return "Escolha uma data a partir de amanhã.";
    if (escolhida.getDay() === 0) return "Não realizamos avaliações aos domingos.";
    return "";
  }
};

/** Valida um campo, mostra/limpa a mensagem e retorna true se estiver ok. */
function validarCampo(campo) {
  const form = campo.form;
  const nome = campo.name;
  const regra = REGRAS[nome];
  if (!regra) return true;

  let valor = campo.value;
  if (campo.type === "radio") valor = form.querySelector(`input[name="${nome}"]:checked`)?.value || "";
  // Nome no formulário de contato não exige sobrenome
  const mensagem = nome === "nome" && form.id === "form-contato"
    ? (valor.trim().length < 3 ? "Informe seu nome." : "")
    : regra(valor, campo);

  const wrapper = campo.closest(".campo");
  const prefixo = form.id === "form-matricula" ? "m" : form.id === "form-contato" ? "c" : "a";
  const erroEl = $(`#${prefixo}-${nome}-erro`);
  if (wrapper && campo.type !== "radio") {
    wrapper.classList.toggle("erro", !!mensagem);
    wrapper.classList.toggle("ok", !mensagem);
  }
  if (campo.type !== "radio") campo.setAttribute("aria-invalid", !!mensagem);
  if (erroEl) erroEl.textContent = mensagem;
  return !mensagem;
}

function iniciarFormularios(dados) {
  // Opções dos selects a partir do JSON
  $("#m-modalidade").insertAdjacentHTML("beforeend",
    dados.modalidades.map((m) => `<option value="${m.id}">${esc(m.nome)}</option>`).join(""));
  $("#m-plano").insertAdjacentHTML("beforeend",
    dados.planos.flatMap((p) => Object.keys(CICLOS).map((c) =>
      `<option value="${p.id}|${c}">${esc(p.nome)} — ${c[0].toUpperCase() + c.slice(1)} (R$ ${formatarMoeda(p.precos[c])}/mês)</option>`)).join(""));

  // Vindo da página de uma modalidade (index.html?modalidade=boxe#matricula), já deixa selecionada
  const modalidadeDaUrl = new URLSearchParams(location.search).get("modalidade");
  if (dados.modalidades.some((m) => m.id === modalidadeDaUrl)) $("#m-modalidade").value = modalidadeDaUrl;

  // Data mínima do agendamento = amanhã
  const amanha = new Date(); amanha.setDate(amanha.getDate() + 1);
  $("#a-data").min = amanha.toISOString().split("T")[0];

  // Máscara de telefone
  $$('[data-mascara="telefone"]').forEach((input) => {
    input.addEventListener("input", () => { input.value = mascararTelefone(input.value); });
  });

  // Validação em tempo real: após o primeiro "blur" o campo passa a validar a cada digitação
  $$("form[novalidate]").forEach((form) => {
    $$("input, select, textarea", form).forEach((campo) => {
      campo.addEventListener("blur", () => { campo.dataset.tocado = "1"; validarCampo(campo); });
      campo.addEventListener("input", () => { if (campo.dataset.tocado) validarCampo(campo); });
      campo.addEventListener("change", () => { campo.dataset.tocado = "1"; validarCampo(campo); });
    });
  });

  configurarEnvio("#form-matricula", (form) => {
    const plano = dados.planos.find((p) => p.id === form.plano.value.split("|")[0]);
    const primeiroNome = form.nome.value.trim().split(" ")[0];
    $("#sucesso-texto").textContent =
      `Obrigado, ${primeiroNome}! Recebemos seu interesse no plano ${plano.nome}. Nossa equipe vai falar com você pelo WhatsApp em até 24 horas.`;
    $("#sucesso-matricula").hidden = false;
    window.confete?.();
  });

  configurarEnvio("#form-contato", () => {
    const ok = $("#contato-ok");
    ok.hidden = false;
    setTimeout(() => { ok.hidden = true; }, 6000);
  });

  configurarEnvio("#form-avaliacao", (form) => {
    const data = new Date(`${form.data.value}T12:00:00`).toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "long" });
    const ok = $("#avaliacao-ok");
    ok.textContent = `Avaliação agendada com ${form.dataset.personal} para ${data}, às ${form.hora.value}.`;
    ok.hidden = false;
    window.confete?.();
    setTimeout(() => { ok.hidden = true; fecharModal(); }, 3500);
  });

  // Volta o formulário de matrícula ao estado inicial
  $("#novo-cadastro").addEventListener("click", () => {
    $("#sucesso-matricula").hidden = true;
    $("#m-nome").focus();
  });
}

/** Valida todos os campos no envio, simula o envio e chama o callback de sucesso. */
function configurarEnvio(seletor, aoSucesso) {
  const form = $(seletor);
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const campos = $$("input, select, textarea", form).filter((c) => REGRAS[c.name]);
    // Radios do mesmo grupo: valida só uma vez
    const vistos = new Set();
    const invalidos = campos.filter((c) => {
      if (c.type === "radio") {
        if (vistos.has(c.name)) return false;
        vistos.add(c.name);
      }
      c.dataset.tocado = "1";
      return !validarCampo(c);
    });

    if (invalidos.length) {
      invalidos[0].focus();
      return;
    }

    // Simula a requisição ao servidor
    const botao = $('button[type="submit"]', form);
    botao.classList.add("enviando");
    botao.disabled = true;
    setTimeout(() => {
      botao.classList.remove("enviando");
      botao.disabled = false;
      aoSucesso(form);
      form.reset();
      $$(".campo", form).forEach((c) => c.classList.remove("ok", "erro"));
      $$("[data-tocado]", form).forEach((c) => delete c.dataset.tocado);
    }, 1300);
  });
}

/* --------------------------------------------------------------------------
   Imagens que não carregarem mostram um bloco com o gradiente da marca
   -------------------------------------------------------------------------- */
function tratarImagensQuebradas() {
  document.addEventListener("error", (e) => {
    const img = e.target;
    if (img.tagName !== "IMG") return;
    img.classList.add("img-falhou");
    img.parentElement?.classList.add("img-fallback");
  }, true);
}
