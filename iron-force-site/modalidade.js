/* ==========================================================================
   Iron Force — Página de uma modalidade (modalidade.html?m=musculacao)
   Monta a página inteira a partir de window.DADOS_SITE (data.js):
   topo com slides, o que é, números, benefícios, como é a aula, horários,
   professor, galeria, o que levar, perguntas e outras modalidades.
   ========================================================================== */

"use strict";

const $ = (seletor, raiz = document) => raiz.querySelector(seletor);
const $$ = (seletor, raiz = document) => [...raiz.querySelectorAll(seletor)];
const esc = (txt) => String(txt).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const DIAS = { seg: "Segunda", ter: "Terça", qua: "Quarta", qui: "Quinta", sex: "Sexta", sab: "Sábado" };
const NOMES_PERIODO = { manha: "Manhã", tarde: "Tarde", noite: "Noite" };

document.addEventListener("DOMContentLoaded", () => {
  const dados = window.DADOS_SITE;
  const id = new URLSearchParams(location.search).get("m");
  const mod = dados.modalidades.find((m) => m.id === id);

  // Endereço sem modalidade válida volta para a lista do site
  if (!mod) {
    location.replace("index.html#modalidades");
    return;
  }

  document.title = `${mod.nome} | Iron Force Academia`;
  $('meta[name="description"]').content = `${mod.nome} na Iron Force: ${mod.detalhes.slogan.toLowerCase()}. Benefícios, como é a aula, horários e professor.`;
  $('meta[property="og:title"]').content = `${mod.nome} | Iron Force Academia`;

  $("#conteudo").innerHTML = [
    htmlTopo(mod),
    htmlFaixa(mod),
    htmlSobre(mod),
    htmlNumeros(mod, dados.horarios),
    htmlBeneficios(mod),
    htmlAula(mod),
    htmlHorarios(mod, dados.horarios),
    htmlProfessor(mod, dados.personais),
    htmlGaleria(mod),
    htmlDuvidas(mod),
    htmlOutras(mod, dados.modalidades),
    htmlChamada(mod)
  ].join("");

  iniciarHeader();
  iniciarRevelar();
  iniciarContadores();
  iniciarLinhaDoTempo();
  iniciarAcordeao();
  iniciarLightbox(mod);
  $("#ano").textContent = new Date().getFullYear();
});

/* --------------------------------------------------------------------------
   Seções (HTML)
   -------------------------------------------------------------------------- */
const linkMatricula = (mod) => `index.html?modalidade=${mod.id}#matricula`;

function htmlTopo(mod) {
  const d = mod.detalhes;
  return `
    <section class="hero hero--mod" id="inicio">
      <div class="hero__fundo" role="img" aria-label="Fotos de aulas de ${esc(mod.nome)}">
        ${d.fotos.map((foto, i) => i === 0
          ? `<div class="hero__slide ativo" style="background-image:url('${foto}')"></div>`
          : `<div class="hero__slide" data-bg="${foto}"></div>`).join("")}
      </div>
      <div class="hero__overlay"></div>
      <div class="container hero__conteudo">
        <a href="index.html#modalidades" class="mod-voltar anim-entrada" style="--d:.1s"><span aria-hidden="true">←</span> Todas as modalidades</a>
        <p class="hero__tag anim-entrada" style="--d:.2s"><span class="hero__tag-icone" aria-hidden="true">${icone(mod.icone)}</span> Modalidade</p>
        <h1 class="hero__titulo anim-entrada" style="--d:.25s"><span>${esc(mod.nome)}</span></h1>
        <p class="hero__digitando anim-entrada" style="--d:.7s">Treine com <span class="digitar" data-palavras="${esc(d.palavras.join("|"))}">${esc(d.palavras[0])}</span></p>
        <p class="hero__sub anim-entrada" style="--d:.85s"><strong>${esc(d.slogan)}.</strong> ${esc(mod.resumo)}</p>
        <ul class="mod-stats anim-entrada" style="--d:1s" aria-label="Resumo da aula">
          <li class="mod-stat"><span aria-hidden="true">${icone("relogio")}</span><div><strong>${d.duracao} min</strong><small>por aula</small></div></li>
          <li class="mod-stat"><span aria-hidden="true">${icone("chama")}</span><div><strong>~${d.kcal} kcal</strong><small>gasto médio</small></div></li>
          <li class="mod-stat"><span aria-hidden="true">${icone("subida")}</span><div>${htmlIntensidade(d.intensidade)}<small>intensidade</small></div></li>
          <li class="mod-stat"><span aria-hidden="true">${icone("medalha")}</span><div><strong>${esc(d.nivel)}</strong><small>nível</small></div></li>
        </ul>
        <div class="hero__botoes anim-entrada" style="--d:1.15s">
          <a href="${linkMatricula(mod)}" class="btn btn--primario btn--grande">Quero fazer essa aula</a>
          <a href="#horarios-mod" class="btn btn--contorno btn--grande">Ver horários</a>
        </div>
      </div>
      <a href="#sobre-mod" class="hero__scroll" aria-label="Rolar para a próxima seção"><span></span></a>
      <div class="hero__indicadores" id="hero-indicadores" aria-hidden="true"></div>
    </section>`;
}

function htmlIntensidade(nivel) {
  return `<span class="intensidade" role="img" aria-label="Intensidade ${nivel} de 5">
    ${Array.from({ length: 5 }, (_, i) => `<i class="${i < nivel ? "on" : ""}" style="--i:${i}"></i>`).join("")}
  </span>`;
}

function htmlFaixa(mod) {
  const itens = [mod.nome, ...mod.detalhes.palavras].map((p) => `<span>${esc(p)}</span><i>✦</i>`).join("");
  return `
    <div class="faixa" aria-hidden="true">
      <div class="faixa__trilho">${itens}${itens}${itens}${itens}</div>
    </div>`;
}

function htmlSobre(mod) {
  const d = mod.detalhes;
  return `
    <section class="secao mod-sobre" id="sobre-mod">
      <div class="container mod-sobre__grid">
        <div class="revelar">
          <p class="secao__tag">O que é</p>
          <h2 class="secao__titulo">O que é <span>${esc(mod.nome)}?</span></h2>
          ${d.sobre.map((p) => `<p class="mod-texto">${esc(p)}</p>`).join("")}
          <h3 class="mod-subtitulo">Para quem é indicado</h3>
          <ul class="check-lista">
            ${d.paraQuem.map((item, i) => `<li style="--i:${i}"><span aria-hidden="true">✓</span>${esc(item)}</li>`).join("")}
          </ul>
        </div>
        <div class="mod-colagem revelar revelar--esquerda">
          <img class="mod-colagem__foto mod-colagem__foto--1" src="${d.fotos[1] || d.fotos[0]}" alt="Aula de ${esc(mod.nome)} na Iron Force" loading="lazy" data-parallax="-0.05">
          <img class="mod-colagem__foto mod-colagem__foto--2" src="${d.fotos[2] || d.fotos[0]}" alt="Aluno treinando ${esc(mod.nome)}" loading="lazy" data-parallax="0.08">
          <div class="mod-colagem__selo"><strong>${d.kcal}</strong><span>kcal<br>por aula</span></div>
        </div>
      </div>
    </section>`;
}

function htmlNumeros(mod, horarios) {
  const d = mod.detalhes;
  const aulasSemana = Object.values(horarios).flat().filter((a) => a.modalidade === mod.nome).length;
  const numeros = [
    { valor: d.kcal, sufixo: "", rotulo: "kcal gastas por aula" },
    { valor: d.duracao, sufixo: " min", rotulo: "de duração" },
    { valor: d.alunos, sufixo: "+", rotulo: "alunos treinando" },
    aulasSemana
      ? { valor: aulasSemana, sufixo: "", rotulo: "aulas por semana" }
      : { valor: 18, sufixo: "h", rotulo: "por dia de acesso livre" }
  ];
  return `
    <section class="mod-numeros" aria-label="${esc(mod.nome)} em números">
      <div class="container mod-numeros__grid">
        ${numeros.map((n, i) => `
          <div class="mod-numero revelar" style="transition-delay:${i * 0.1}s">
            <span class="mod-numero__valor" data-alvo="${n.valor}" data-sufixo="${esc(n.sufixo)}">0${esc(n.sufixo)}</span>
            <span class="mod-numero__rotulo">${esc(n.rotulo)}</span>
          </div>`).join("")}
      </div>
    </section>`;
}

function htmlBeneficios(mod) {
  return `
    <section class="secao mod-beneficios">
      <div class="container">
        <div class="secao__cabecalho revelar">
          <p class="secao__tag">Benefícios</p>
          <h2 class="secao__titulo">Por que fazer <span>${esc(mod.nome)}</span></h2>
        </div>
        <div class="beneficios">
          ${mod.detalhes.beneficios.map((b, i) => `
            <article class="beneficio revelar" style="transition-delay:${(i % 3) * 0.12}s">
              <span class="beneficio__num" aria-hidden="true">${String(i + 1).padStart(2, "0")}</span>
              <span class="beneficio__icone" aria-hidden="true">${icone(b.icone)}</span>
              <h3 class="beneficio__titulo">${esc(b.titulo)}</h3>
              <p>${esc(b.texto)}</p>
            </article>`).join("")}
        </div>
      </div>
    </section>`;
}

function htmlAula(mod) {
  const etapas = mod.detalhes.aula;
  const total = etapas.reduce((s, e) => s + e.minutos, 0);
  return `
    <section class="secao mod-aula">
      <div class="container">
        <div class="secao__cabecalho revelar">
          <p class="secao__tag">Passo a passo</p>
          <h2 class="secao__titulo">Como é a <span>aula</span></h2>
          <p class="secao__descricao">${total} minutos divididos em ${etapas.length} etapas.</p>
        </div>

        <div class="tempo revelar" aria-hidden="true">
          <div class="tempo__barra">
            ${etapas.map((e, i) => `<span style="--w:${(e.minutos / total) * 100}%; --i:${i}" title="${esc(e.etapa)}: ${e.minutos} min"></span>`).join("")}
          </div>
          <div class="tempo__legenda">
            ${etapas.map((e, i) => `<span style="--i:${i}"><i></i>${esc(e.etapa)} · ${e.minutos} min</span>`).join("")}
          </div>
        </div>

        <ol class="etapas" id="etapas">
          ${etapas.map((e, i) => `
            <li class="etapa revelar">
              <span class="etapa__marcador" aria-hidden="true">${i + 1}</span>
              <div class="etapa__caixa">
                <div class="etapa__topo">
                  <h3>${esc(e.etapa)}</h3>
                  <span class="etapa__min">${e.minutos} min</span>
                </div>
                <p>${esc(e.texto)}</p>
              </div>
            </li>`).join("")}
        </ol>
      </div>
    </section>`;
}

function htmlHorarios(mod, horarios) {
  const dias = Object.entries(DIAS)
    .map(([id, nome]) => ({ nome, aulas: (horarios[id] || []).filter((a) => a.modalidade === mod.nome) }))
    .filter((d) => d.aulas.length);

  const conteudo = dias.length
    ? `<div class="mod-dias">
        ${dias.map((d, i) => `
          <div class="mod-dia revelar" style="transition-delay:${i * 0.08}s">
            <h3 class="mod-dia__nome">${d.nome}</h3>
            ${d.aulas.map((a) => {
              const estado = a.vagas === 0 ? "lotado" : a.vagas <= 3 ? "poucas" : "livre";
              const ocupacao = Math.round(((a.capacidade - a.vagas) / a.capacidade) * 100);
              return `
                <div class="aula aula--${estado}">
                  <span class="aula__hora">${a.hora}</span>
                  <span class="aula__nome">${NOMES_PERIODO[a.periodo]}</span>
                  <span class="aula__prof">${esc(a.professor)}</span>
                  <div class="aula__vagas">
                    <div class="aula__barra" role="progressbar" aria-valuenow="${ocupacao}" aria-valuemin="0" aria-valuemax="100" aria-label="Ocupação da turma"><span style="width:${ocupacao}%"></span></div>
                    <span class="aula__status">${a.vagas === 0 ? "Lotado" : `${a.vagas} ${a.vagas === 1 ? "vaga" : "vagas"}`}</span>
                  </div>
                </div>`;
            }).join("")}
          </div>`).join("")}
      </div>`
    : `<div class="mod-livre revelar">
        <span class="mod-livre__icone" aria-hidden="true">${icone("cadeado")}</span>
        <div>
          <h3>Acesso livre, sem horário marcado</h3>
          <ul>${mod.horarios.split("·").map((h) => `<li>${esc(h.trim())}</li>`).join("")}</ul>
        </div>
      </div>`;

  return `
    <section class="secao mod-horarios" id="horarios-mod">
      <div class="container">
        <div class="secao__cabecalho revelar">
          <p class="secao__tag">Horários</p>
          <h2 class="secao__titulo">Quando <span>treinar</span></h2>
          <p class="secao__descricao">${esc(mod.horarios)}</p>
        </div>
        ${conteudo}
      </div>
    </section>`;
}

function htmlProfessor(mod, personais) {
  const p = personais.find((x) => x.nome === mod.professor);
  if (!p) return "";
  return `
    <section class="secao mod-prof">
      <div class="container mod-prof__grid">
        <div class="mod-prof__foto revelar revelar--esquerda">
          <img src="${p.foto}" alt="${esc(p.fotoAlt || `Foto de ${p.nome}`)}" style="object-position:${p.fotoPosicao || "50% 30%"}" loading="lazy" width="900" height="900">
        </div>
        <div class="revelar">
          <p class="secao__tag">Professor responsável</p>
          <h2 class="secao__titulo">${esc(p.nome.split(" ")[0])} <span>${esc(p.nome.split(" ").slice(1).join(" "))}</span></h2>
          <p class="mod-prof__esp">${esc(p.especialidade)}</p>
          <blockquote class="mod-prof__frase">“Meu objetivo é que cada aluno saia da aula melhor do que entrou — com técnica, segurança e vontade de voltar.”</blockquote>
          <ul class="mod-prof__cert" aria-label="Certificações">
            ${p.certificacoes.map((c, i) => `<li style="--i:${i}"><span aria-hidden="true">${icone("medalha")}</span> ${esc(c)}</li>`).join("")}
          </ul>
          <a href="index.html#personal" class="btn btn--primario">Agendar avaliação</a>
        </div>
      </div>
    </section>`;
}

function htmlGaleria(mod) {
  return `
    <section class="secao mod-galeria">
      <div class="container">
        <div class="secao__cabecalho revelar">
          <p class="secao__tag">Galeria</p>
          <h2 class="secao__titulo">${esc(mod.nome)} na <span>prática</span></h2>
        </div>
        <div class="mod-galeria__grid">
          ${mod.detalhes.fotos.map((foto, i) => `
            <button class="galeria__item" data-i="${i}" aria-label="Ampliar foto ${i + 1} de ${esc(mod.nome)}">
              <img src="${foto.replace("w=1600", "w=900")}" alt="Aula de ${esc(mod.nome)} — foto ${i + 1}" loading="lazy">
              <span class="galeria__legenda" aria-hidden="true"><strong>${esc(mod.nome)}</strong>Foto ${i + 1} de ${mod.detalhes.fotos.length}</span>
            </button>`).join("")}
        </div>
      </div>
    </section>`;
}

function htmlDuvidas(mod) {
  const d = mod.detalhes;
  return `
    <section class="secao mod-duvidas">
      <div class="container mod-duvidas__grid">
        <div class="revelar">
          <p class="secao__tag">Prepare-se</p>
          <h2 class="secao__titulo">O que <span>levar</span></h2>
          <ul class="mod-levar">
            ${d.levar.map((item, i) => `<li style="--i:${i}"><span aria-hidden="true">${icone("mochila")}</span>${esc(item)}</li>`).join("")}
          </ul>
        </div>
        <div class="revelar">
          <p class="secao__tag">Dúvidas</p>
          <h2 class="secao__titulo">Perguntas <span>frequentes</span></h2>
          <div class="acordeao" id="lista-faq">
            ${d.faq.map((f, i) => `
              <div class="acordeao__item">
                <h3>
                  <button class="acordeao__botao" aria-expanded="false" aria-controls="faq-${i}" id="faq-btn-${i}">
                    ${esc(f.pergunta)}<span class="acordeao__sinal" aria-hidden="true"></span>
                  </button>
                </h3>
                <div class="acordeao__painel" id="faq-${i}" role="region" aria-labelledby="faq-btn-${i}">
                  <div><p>${esc(f.resposta)}</p></div>
                </div>
              </div>`).join("")}
          </div>
        </div>
      </div>
    </section>`;
}

function htmlOutras(mod, modalidades) {
  return `
    <section class="secao mod-outras">
      <div class="container">
        <div class="secao__cabecalho revelar">
          <p class="secao__tag">Continue explorando</p>
          <h2 class="secao__titulo">Outras <span>modalidades</span></h2>
        </div>
        <div class="mod-outras__lista">
          ${modalidades.filter((m) => m.id !== mod.id).map((m, i) => `
            <a class="mod-outra revelar" href="modalidade.html?m=${m.id}" style="transition-delay:${i * 0.08}s">
              <img src="${m.imagem}" alt="" loading="lazy">
              <span class="mod-outra__icone" aria-hidden="true">${icone(m.icone)}</span>
              <span class="mod-outra__nome">${esc(m.nome)}</span>
              <span class="mod-outra__resumo">${esc(m.detalhes.slogan)}</span>
              <span class="mod-outra__seta" aria-hidden="true">→</span>
            </a>`).join("")}
        </div>
      </div>
    </section>`;
}

function htmlChamada(mod) {
  return `
    <section class="mod-cta">
      <div class="container mod-cta__inner revelar">
        <h2 class="mod-cta__titulo">Pronto para começar <span>${esc(mod.nome)}?</span></h2>
        <p>Aula experimental gratuita e avaliação física inclusa em todos os planos.</p>
        <div class="hero__botoes">
          <a href="${linkMatricula(mod)}" class="btn btn--escuro btn--grande">Quero me matricular</a>
          <a href="index.html#planos" class="btn btn--contorno btn--grande">Ver planos</a>
        </div>
      </div>
    </section>`;
}

/* --------------------------------------------------------------------------
   Comportamentos
   -------------------------------------------------------------------------- */

/** Header transparente no topo, menu hambúrguer e barra de progresso. */
function iniciarHeader() {
  const header = $("#header");
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
  const aoRolar = () => {
    const total = document.documentElement.scrollHeight - innerHeight;
    barra.style.transform = `scaleX(${total > 0 ? scrollY / total : 0})`;
    header.classList.toggle("rolado", scrollY > 40);
  };
  addEventListener("scroll", () => requestAnimationFrame(aoRolar), { passive: true });
  aoRolar();
}

/** Fade/slide dos blocos ao entrar na tela. */
function iniciarRevelar() {
  const observador = new IntersectionObserver((entradas, obs) => {
    entradas.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add("visivel");
      obs.unobserve(e.target);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  $$(".revelar, .tempo").forEach((el) => observador.observe(el));
}

/** Números que contam até o valor final quando aparecem. */
function iniciarContadores() {
  const animar = (el) => {
    const alvo = Number(el.dataset.alvo);
    const inicio = performance.now();
    const passo = (agora) => {
      const t = Math.min((agora - inicio) / 1800, 1);
      el.textContent = Math.round(alvo * (1 - Math.pow(1 - t, 3))).toLocaleString("pt-BR") + el.dataset.sufixo;
      if (t < 1) requestAnimationFrame(passo);
    };
    requestAnimationFrame(passo);
  };
  const observador = new IntersectionObserver((entradas, obs) => {
    entradas.forEach((e) => {
      if (!e.isIntersecting) return;
      animar(e.target);
      obs.unobserve(e.target);
    });
  }, { threshold: 0.6 });
  $$(".mod-numero__valor").forEach((el) => observador.observe(el));
}

/** A linha das etapas da aula "enche" conforme a rolagem e acende cada etapa. */
function iniciarLinhaDoTempo() {
  const lista = $("#etapas");
  const etapas = $$(".etapa", lista);
  const atualizar = () => {
    const r = lista.getBoundingClientRect();
    const linha = innerHeight * 0.6;
    const progresso = Math.min(1, Math.max(0, (linha - r.top) / r.height));
    lista.style.setProperty("--p", progresso.toFixed(3));
    etapas.forEach((e) => e.classList.toggle("ativa", e.getBoundingClientRect().top < linha));
  };
  addEventListener("scroll", () => requestAnimationFrame(atualizar), { passive: true });
  atualizar();
}

/** Perguntas frequentes: abre uma por vez. */
function iniciarAcordeao() {
  const lista = $("#lista-faq");
  lista.addEventListener("click", (e) => {
    const botao = e.target.closest(".acordeao__botao");
    if (!botao) return;
    const item = botao.closest(".acordeao__item");
    const abrir = !item.classList.contains("aberto");
    $$(".acordeao__item", lista).forEach((outro) => {
      outro.classList.remove("aberto");
      $(".acordeao__botao", outro).setAttribute("aria-expanded", "false");
    });
    item.classList.toggle("aberto", abrir);
    botao.setAttribute("aria-expanded", abrir);
  });
}

/** Lightbox simples para a galeria da modalidade. */
function iniciarLightbox(mod) {
  const fotos = mod.detalhes.fotos;
  const caixa = $("#lightbox");
  let atual = 0;
  let origem = null;

  const mostrar = (i) => {
    atual = (i + fotos.length) % fotos.length;
    $("#lb-img").src = fotos[atual];
    $("#lb-img").alt = `Aula de ${mod.nome} — foto ${atual + 1}`;
    $("#lb-legenda").textContent = `${mod.nome} (${atual + 1}/${fotos.length})`;
  };
  const fechar = () => {
    caixa.hidden = true;
    document.body.classList.remove("travado");
    origem?.focus();
  };

  $(".mod-galeria__grid").addEventListener("click", (e) => {
    const item = e.target.closest(".galeria__item");
    if (!item) return;
    origem = item;
    mostrar(Number(item.dataset.i));
    caixa.hidden = false;
    document.body.classList.add("travado");
    $(".lightbox__fechar").focus();
  });
  $("#lb-anterior").addEventListener("click", () => mostrar(atual - 1));
  $("#lb-proximo").addEventListener("click", () => mostrar(atual + 1));
  $(".lightbox__fechar").addEventListener("click", fechar);
  caixa.addEventListener("click", (e) => { if (e.target === caixa) fechar(); });
  document.addEventListener("keydown", (e) => {
    if (caixa.hidden) return;
    if (e.key === "Escape") fechar();
    if (e.key === "ArrowRight") mostrar(atual + 1);
    if (e.key === "ArrowLeft") mostrar(atual - 1);
  });
}
