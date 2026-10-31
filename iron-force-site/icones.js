/* ==========================================================================
   Iron Force — Ícones (SVG de traço, herdam a cor do texto)
   Uso em JavaScript:   icone("haltere")  → devolve o <svg> como texto
   Uso em HTML:         <span data-icone="haltere"></span>
   Carregue este arquivo antes dos outros scripts.
   ========================================================================== */

"use strict";

(() => {
  const ICONES = {
    haltere: '<path d="M6.5 6.5v11M17.5 6.5v11M3 9.5v5M21 9.5v5M6.5 12h11"/>',
    luva: '<path d="M6 10V7a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v5a6 6 0 0 1-6 6h-2a4 4 0 0 1-4-4z"/><path d="M8 21h8M6 12.5h4"/>',
    escudo: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/>',
    raio: '<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
    bike: '<circle cx="6" cy="16" r="3.5"/><circle cx="18" cy="16" r="3.5"/><path d="M6 16l4-8h5l3 8M10 8L8.5 5H7M15 8l-3 8H6"/>',
    folha: '<path d="M20 4C10 4 5 9 5 15c0 2 1 4 1 4s5 1 9-3 5-8 5-12z"/><path d="M5 19c4-6 8-9 12-11"/>',
    chama: '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
    coracao: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7z"/>',
    pessoa: '<circle cx="12" cy="5" r="2.2"/><path d="M12 8v7M8 10h8M10 21l2-6 2 6"/>',
    alvo: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.2"/>',
    trofeu: '<path d="M8 4h8v6a4 4 0 0 1-8 0z"/><path d="M8 6H4v1a4 4 0 0 0 4 4M16 6h4v1a4 4 0 0 1-4 4M12 14v4M8 21h8M10 18h4"/>',
    musica: '<path d="M9 18V5l11-2v13"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="17.5" cy="16" r="2.5"/>',
    ajustes: '<path d="M4 7h10M18 7h2M4 17h2M10 17h10"/><circle cx="16" cy="7" r="2"/><circle cx="8" cy="17" r="2"/>',
    cruz: '<path d="M10 4h4v6h6v4h-6v6h-4v-6H4v-4h6z"/>',
    setas: '<path d="M4 12h16M8 8l-4 4 4 4M16 8l4 4-4 4"/>',
    pulso: '<path d="M3 12h4l3-8 4 16 3-8h4"/>',
    equipe: '<circle cx="9" cy="8" r="3"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><circle cx="17" cy="9" r="2.5"/><path d="M17 14c2.5 0 4.5 2 4.5 5"/>',
    lampada: '<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.5 1 2.5h6c0-1 .3-1.8 1-2.5A6 6 0 0 0 12 3z"/>',
    subida: '<path d="M3 17l6-6 4 4 8-8M15 7h6v6"/>',
    estrela: '<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
    balanca: '<path d="M12 4v16M5 9h14M7 9l-3 6a3 3 0 0 0 6 0zM17 9l-3 6a3 3 0 0 0 6 0zM8 20h8"/>',
    relogio: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    medalha: '<circle cx="12" cy="9" r="5"/><path d="M8.5 13.5L7 21l5-3 5 3-1.5-7.5"/>',
    cadeado: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 7.5-2"/>',
    mochila: '<path d="M8 8a4 4 0 0 1 8 0v1H8z"/><rect x="5" y="9" width="14" height="12" rx="3"/><path d="M9 15h6"/>',
    floco: '<path d="M12 3v18M4.2 7.5l15.6 9M4.2 16.5l15.6-9"/>',
    estacionamento: '<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M10 16V8h3a2.5 2.5 0 0 1 0 5h-3"/>',
    prato: '<path d="M7 3v8M5 3v5a2 2 0 0 0 4 0V3M7 11v10M17 3c-2 2-3 5-3 8h3v10"/>',
    camera: '<path d="M4 8h3l2-3h6l2 3h3v12H4z"/><circle cx="12" cy="13" r="3.5"/>',
    imagem: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="1.7"/><path d="M21 17l-5-5-9 8"/>',
    lista: '<rect x="6" y="4" width="12" height="17" rx="2"/><path d="M9 4V3h6v1M9 11h6M9 15h6"/>',
    calculadora: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 7h8M8 12h2M12 12h2M8 16h2M12 16h2M16 12h0M16 16h0"/>',
    recibo: '<path d="M6 3h12v18l-3-2-3 2-3-2-3 2z"/><path d="M9 8h6M9 12h6"/>',
    pin: '<path d="M12 21s7-6 7-12a7 7 0 0 0-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
    telefone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
    chat: '<path d="M4 5h16v11H9l-5 4z"/>',
    email: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
    aviso: '<path d="M12 3l10 18H2z"/><path d="M12 10v5M12 18h0"/>',
    check: '<path d="M5 12l5 5 9-10"/>'
  };

  /** Devolve o <svg> do ícone (vazio se o nome não existir). */
  window.icone = (nome) => (ICONES[nome]
    ? `<svg class="ico" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${ICONES[nome]}</svg>`
    : "");

  /** Preenche os elementos do HTML marcados com data-icone. */
  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-icone]").forEach((el) => { el.innerHTML = window.icone(el.dataset.icone); });
  });
})();
