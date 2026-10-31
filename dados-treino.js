/* ==========================================================================
   Iron Force — Dados da Área do Aluno (treino, dieta e alimentos)
   Arquivo .js (e não .json) para funcionar também ao abrir o site com
   duplo clique (file://), onde o navegador bloqueia a leitura de JSON.
   Para editar exercícios ou alimentos, altere apenas este arquivo.
   ========================================================================== */

window.DADOS_TREINO = {
  /* ------------------------------------------------------------------
     Grupos musculares e exercícios
     nivel: 1 = iniciante, 2 = intermediário, 3 = avançado
     grande: músculos grandes recebem mais exercícios no treino automático
     ------------------------------------------------------------------ */
  musculos: [
    {
      id: "peito", nome: "Peito", grande: true,
      exercicios: [
        { nome: "Supino reto com barra", equipamento: "Barra e banco", nivel: 1, dica: "Desça a barra até a linha do peito, com as escápulas encaixadas no banco." },
        { nome: "Supino inclinado com halteres", equipamento: "Halteres e banco inclinado", nivel: 1, dica: "Banco entre 30° e 45° para focar a porção superior do peitoral." },
        { nome: "Crucifixo na máquina (peck deck)", equipamento: "Máquina", nivel: 1, dica: "Cotovelos levemente flexionados, aperte o peito no final do movimento." },
        { nome: "Crossover na polia", equipamento: "Polia dupla", nivel: 2, dica: "Incline o tronco à frente e cruze as mãos na frente do corpo." },
        { nome: "Flexão de braço", equipamento: "Peso corporal", nivel: 1, dica: "Corpo alinhado como uma prancha; apoie os joelhos se precisar." },
        { nome: "Supino declinado", equipamento: "Barra e banco declinado", nivel: 3, dica: "Trabalha a porção inferior do peitoral. Use um parceiro de segurança." }
      ]
    },
    {
      id: "costas", nome: "Costas", grande: true,
      exercicios: [
        { nome: "Puxada frontal", equipamento: "Polia alta", nivel: 1, dica: "Puxe a barra até o queixo levando os cotovelos para baixo e para trás." },
        { nome: "Remada baixa sentada", equipamento: "Polia baixa", nivel: 1, dica: "Coluna neutra; junte as escápulas ao puxar." },
        { nome: "Remada unilateral com halter", equipamento: "Halter e banco", nivel: 1, dica: "Puxe o halter em direção ao quadril, sem girar o tronco." },
        { nome: "Remada curvada com barra", equipamento: "Barra", nivel: 2, dica: "Tronco inclinado a ~45°, abdômen firme e coluna reta." },
        { nome: "Barra fixa", equipamento: "Barra fixa", nivel: 3, dica: "Use o graviton ou elástico como auxílio até conseguir fazer sozinho." },
        { nome: "Pulldown com corda", equipamento: "Polia alta", nivel: 2, dica: "Braços quase estendidos; leve a corda até as coxas." }
      ]
    },
    {
      id: "ombros", nome: "Ombros", grande: false,
      exercicios: [
        { nome: "Desenvolvimento com halteres", equipamento: "Halteres e banco", nivel: 1, dica: "Empurre os halteres para cima sem travar totalmente os cotovelos." },
        { nome: "Elevação lateral", equipamento: "Halteres", nivel: 1, dica: "Suba até a altura dos ombros, com os cotovelos levemente flexionados." },
        { nome: "Elevação frontal", equipamento: "Halteres ou anilha", nivel: 1, dica: "Evite balançar o corpo para ajudar o movimento." },
        { nome: "Crucifixo inverso", equipamento: "Máquina ou halteres", nivel: 2, dica: "Foco no deltoide posterior; movimento controlado." },
        { nome: "Desenvolvimento Arnold", equipamento: "Halteres", nivel: 3, dica: "Gire as palmas durante a subida para recrutar todo o ombro." }
      ]
    },
    {
      id: "biceps", nome: "Bíceps", grande: false,
      exercicios: [
        { nome: "Rosca direta com barra", equipamento: "Barra W ou reta", nivel: 1, dica: "Cotovelos colados ao corpo, sem jogar o tronco para trás." },
        { nome: "Rosca alternada", equipamento: "Halteres", nivel: 1, dica: "Gire o punho (supinação) durante a subida." },
        { nome: "Rosca martelo", equipamento: "Halteres", nivel: 1, dica: "Pegada neutra; trabalha também o antebraço." },
        { nome: "Rosca Scott", equipamento: "Banco Scott", nivel: 2, dica: "Não estenda totalmente o cotovelo no final para proteger a articulação." },
        { nome: "Rosca concentrada", equipamento: "Halter", nivel: 2, dica: "Apoie o cotovelo na parte interna da coxa e contraia no topo." }
      ]
    },
    {
      id: "triceps", nome: "Tríceps", grande: false,
      exercicios: [
        { nome: "Tríceps pulley", equipamento: "Polia alta com barra", nivel: 1, dica: "Só o antebraço se move; cotovelos fixos ao lado do corpo." },
        { nome: "Tríceps corda", equipamento: "Polia alta com corda", nivel: 1, dica: "Abra a corda no final do movimento." },
        { nome: "Tríceps testa", equipamento: "Barra W e banco", nivel: 2, dica: "Desça a barra em direção à testa de forma controlada." },
        { nome: "Mergulho no banco", equipamento: "Banco", nivel: 1, dica: "Mantenha as costas próximas ao banco." },
        { nome: "Tríceps francês", equipamento: "Halter", nivel: 2, dica: "Cotovelos apontados para cima durante todo o movimento." }
      ]
    },
    {
      id: "quadriceps", nome: "Quadríceps", grande: true,
      exercicios: [
        { nome: "Agachamento livre", equipamento: "Barra", nivel: 2, dica: "Joelhos alinhados com a ponta dos pés; desça até onde mantiver a coluna neutra." },
        { nome: "Leg press 45°", equipamento: "Máquina", nivel: 1, dica: "Não tire o quadril do encosto e não trave os joelhos." },
        { nome: "Cadeira extensora", equipamento: "Máquina", nivel: 1, dica: "Segure 1 segundo no topo do movimento." },
        { nome: "Afundo (passada)", equipamento: "Halteres", nivel: 1, dica: "Passo largo; o joelho de trás quase toca o chão." },
        { nome: "Agachamento búlgaro", equipamento: "Halteres e banco", nivel: 3, dica: "Pé de trás apoiado no banco; tronco levemente inclinado." },
        { nome: "Agachamento no hack", equipamento: "Máquina hack", nivel: 2, dica: "Pés mais à frente aumentam o trabalho de glúteos." }
      ]
    },
    {
      id: "posterior", nome: "Posterior de coxa", grande: true,
      exercicios: [
        { nome: "Mesa flexora", equipamento: "Máquina", nivel: 1, dica: "Quadril colado ao banco durante todo o movimento." },
        { nome: "Cadeira flexora", equipamento: "Máquina", nivel: 1, dica: "Ajuste o rolo logo acima do calcanhar." },
        { nome: "Stiff", equipamento: "Barra ou halteres", nivel: 2, dica: "Joelhos semiflexionados; desça a barra rente às pernas." },
        { nome: "Levantamento terra romeno", equipamento: "Barra", nivel: 3, dica: "Empurre o quadril para trás, mantendo a coluna neutra." },
        { nome: "Flexora em pé", equipamento: "Máquina ou caneleira", nivel: 1, dica: "Movimento unilateral, ótimo para corrigir desequilíbrios." }
      ]
    },
    {
      id: "gluteos", nome: "Glúteos", grande: true,
      exercicios: [
        { nome: "Elevação pélvica (hip thrust)", equipamento: "Barra e banco", nivel: 2, dica: "Queixo para baixo e contração forte dos glúteos no topo." },
        { nome: "Glúteo na polia (coice)", equipamento: "Polia baixa com tornozeleira", nivel: 1, dica: "Não arqueie a lombar ao estender a perna." },
        { nome: "Cadeira abdutora", equipamento: "Máquina", nivel: 1, dica: "Incline o tronco à frente para mais ativação do glúteo." },
        { nome: "Agachamento sumô", equipamento: "Halter ou kettlebell", nivel: 1, dica: "Pés afastados e pontas para fora." },
        { nome: "Ponte unilateral", equipamento: "Peso corporal", nivel: 1, dica: "Mantenha o quadril nivelado durante a subida." }
      ]
    },
    {
      id: "panturrilha", nome: "Panturrilha", grande: false,
      exercicios: [
        { nome: "Panturrilha em pé", equipamento: "Máquina ou step", nivel: 1, dica: "Amplitude total: alongue embaixo e suba na ponta dos pés." },
        { nome: "Panturrilha sentado", equipamento: "Máquina", nivel: 1, dica: "Foca o músculo sóleo; faça com pausa no topo." },
        { nome: "Panturrilha no leg press", equipamento: "Leg press", nivel: 2, dica: "Apoie só a ponta dos pés na plataforma." }
      ]
    },
    {
      id: "abdomen", nome: "Abdômen", grande: false,
      exercicios: [
        { nome: "Prancha", equipamento: "Peso corporal", nivel: 1, dica: "Corpo reto da cabeça aos pés; conte o tempo em segundos." },
        { nome: "Abdominal supra", equipamento: "Colchonete", nivel: 1, dica: "Tire só as escápulas do chão, sem puxar o pescoço." },
        { nome: "Elevação de pernas", equipamento: "Colchonete ou barra", nivel: 2, dica: "Desça as pernas devagar sem tirar a lombar do chão." },
        { nome: "Abdominal bicicleta", equipamento: "Colchonete", nivel: 1, dica: "Cotovelo em direção ao joelho oposto." },
        { nome: "Abdominal na polia", equipamento: "Polia alta com corda", nivel: 3, dica: "Flexione a coluna, não o quadril." }
      ]
    }
  ],

  /* Séries, repetições e descanso sugeridos para cada objetivo */
  objetivos: {
    hipertrofia: { nome: "Hipertrofia (ganhar massa)", series: 4, reps: "8-12", descanso: "60-90s" },
    emagrecimento: { nome: "Emagrecimento", series: 3, reps: "15-20", descanso: "30-45s" },
    forca: { nome: "Força", series: 5, reps: "4-6", descanso: "2-3min" },
    resistencia: { nome: "Condicionamento / saúde", series: 3, reps: "12-15", descanso: "45-60s" }
  },

  /* Divisão de treino por quantidade de dias na semana */
  divisoes: {
    2: [
      { nome: "Superiores", musculos: ["peito", "costas", "ombros", "biceps", "triceps"] },
      { nome: "Inferiores", musculos: ["quadriceps", "posterior", "gluteos", "panturrilha", "abdomen"] }
    ],
    3: [
      { nome: "Peito, ombros e tríceps", musculos: ["peito", "ombros", "triceps"] },
      { nome: "Costas, bíceps e abdômen", musculos: ["costas", "biceps", "abdomen"] },
      { nome: "Pernas completas", musculos: ["quadriceps", "posterior", "gluteos", "panturrilha"] }
    ],
    4: [
      { nome: "Peito e tríceps", musculos: ["peito", "triceps"] },
      { nome: "Costas e bíceps", musculos: ["costas", "biceps"] },
      { nome: "Pernas completas", musculos: ["quadriceps", "posterior", "gluteos", "panturrilha"] },
      { nome: "Ombros e abdômen", musculos: ["ombros", "abdomen"] }
    ],
    5: [
      { nome: "Peito e tríceps", musculos: ["peito", "triceps"] },
      { nome: "Costas e bíceps", musculos: ["costas", "biceps"] },
      { nome: "Quadríceps e panturrilha", musculos: ["quadriceps", "panturrilha"] },
      { nome: "Ombros e abdômen", musculos: ["ombros", "abdomen"] },
      { nome: "Posterior e glúteos", musculos: ["posterior", "gluteos"] }
    ],
    6: [
      { nome: "Peito e tríceps", musculos: ["peito", "triceps"] },
      { nome: "Costas e bíceps", musculos: ["costas", "biceps"] },
      { nome: "Quadríceps e panturrilha", musculos: ["quadriceps", "panturrilha"] },
      { nome: "Ombros e abdômen", musculos: ["ombros", "abdomen"] },
      { nome: "Posterior e glúteos", musculos: ["posterior", "gluteos"] },
      { nome: "Braços e abdômen", musculos: ["biceps", "triceps", "abdomen"] }
    ]
  },

  /* ------------------------------------------------------------------
     Tabela de alimentos — valores por 100 g (ou 100 ml), aproximados,
     com base na Tabela TACO (Unicamp) e USDA.
     porcao: sugestão de porção em gramas | medida: descrição caseira
     ------------------------------------------------------------------ */
  alimentos: [
    { id: "arroz", nome: "Arroz branco cozido", kcal: 128, p: 2.5, c: 28.1, g: 0.2, porcao: 100, medida: "4 colheres de sopa" },
    { id: "arroz-integral", nome: "Arroz integral cozido", kcal: 124, p: 2.6, c: 25.8, g: 1.0, porcao: 100, medida: "4 colheres de sopa" },
    { id: "feijao", nome: "Feijão carioca cozido", kcal: 76, p: 4.8, c: 13.6, g: 0.5, porcao: 86, medida: "1 concha" },
    { id: "feijao-preto", nome: "Feijão preto cozido", kcal: 77, p: 4.5, c: 14.0, g: 0.5, porcao: 86, medida: "1 concha" },
    { id: "frango", nome: "Peito de frango grelhado", kcal: 159, p: 32.0, c: 0, g: 2.5, porcao: 120, medida: "1 filé médio" },
    { id: "patinho", nome: "Carne bovina (patinho) grelhada", kcal: 219, p: 35.9, c: 0, g: 7.3, porcao: 120, medida: "1 bife médio" },
    { id: "carne-moida", nome: "Carne moída refogada", kcal: 212, p: 26.7, c: 0, g: 10.9, porcao: 100, medida: "3 colheres de sopa" },
    { id: "tilapia", nome: "Tilápia grelhada", kcal: 128, p: 26.2, c: 0, g: 2.7, porcao: 120, medida: "1 filé" },
    { id: "salmao", nome: "Salmão grelhado", kcal: 208, p: 20.4, c: 0, g: 13.4, porcao: 120, medida: "1 posta" },
    { id: "atum", nome: "Atum em lata (em água)", kcal: 116, p: 25.5, c: 0, g: 0.8, porcao: 60, medida: "1/2 lata" },
    { id: "ovo", nome: "Ovo cozido", kcal: 146, p: 13.3, c: 0.6, g: 9.5, porcao: 50, medida: "1 unidade" },
    { id: "ovo-frito", nome: "Ovo frito", kcal: 240, p: 15.6, c: 1.2, g: 18.6, porcao: 50, medida: "1 unidade" },
    { id: "batata-doce", nome: "Batata-doce cozida", kcal: 77, p: 0.6, c: 18.4, g: 0.1, porcao: 150, medida: "1 unidade média" },
    { id: "batata", nome: "Batata inglesa cozida", kcal: 52, p: 1.2, c: 11.9, g: 0, porcao: 150, medida: "1 unidade média" },
    { id: "pure", nome: "Purê de batata", kcal: 90, p: 1.9, c: 14.0, g: 3.0, porcao: 120, medida: "3 colheres de sopa" },
    { id: "batata-frita", nome: "Batata frita", kcal: 267, p: 5.0, c: 35.6, g: 13.1, porcao: 100, medida: "1 porção pequena" },
    { id: "mandioca", nome: "Mandioca cozida", kcal: 125, p: 0.6, c: 30.1, g: 0.3, porcao: 100, medida: "2 pedaços médios" },
    { id: "macarrao", nome: "Macarrão cozido", kcal: 102, p: 3.4, c: 19.9, g: 1.2, porcao: 150, medida: "1 prato raso" },
    { id: "carbonara", nome: "Macarrão à carbonara", kcal: 190, p: 8.0, c: 20.0, g: 8.5, porcao: 250, medida: "1 prato" },
    { id: "lasanha", nome: "Lasanha à bolonhesa", kcal: 160, p: 8.5, c: 14.0, g: 7.8, porcao: 250, medida: "1 pedaço" },
    { id: "cuscuz", nome: "Cuscuz de milho", kcal: 113, p: 2.2, c: 25.3, g: 0.7, porcao: 100, medida: "1 fatia" },
    { id: "tapioca", nome: "Tapioca (goma)", kcal: 240, p: 0, c: 59.0, g: 0, porcao: 50, medida: "1 unidade média" },
    { id: "pao-frances", nome: "Pão francês", kcal: 300, p: 8.0, c: 58.6, g: 3.1, porcao: 50, medida: "1 unidade" },
    { id: "pao-integral", nome: "Pão de forma integral", kcal: 253, p: 9.4, c: 49.9, g: 3.7, porcao: 50, medida: "2 fatias" },
    { id: "pao-queijo", nome: "Pão de queijo", kcal: 363, p: 5.1, c: 34.2, g: 24.6, porcao: 40, medida: "2 unidades pequenas" },
    { id: "bagel", nome: "Bagel", kcal: 257, p: 10.0, c: 50.0, g: 1.6, porcao: 90, medida: "1 unidade" },
    { id: "aveia", nome: "Aveia em flocos", kcal: 394, p: 13.9, c: 66.6, g: 8.5, porcao: 30, medida: "2 colheres de sopa" },
    { id: "granola", nome: "Granola", kcal: 421, p: 10.0, c: 64.0, g: 14.0, porcao: 30, medida: "3 colheres de sopa" },
    { id: "milho", nome: "Milho verde cozido", kcal: 98, p: 3.2, c: 17.1, g: 1.2, porcao: 100, medida: "1 espiga pequena" },
    { id: "banana", nome: "Banana prata", kcal: 98, p: 1.3, c: 26.0, g: 0.1, porcao: 70, medida: "1 unidade" },
    { id: "maca", nome: "Maçã", kcal: 56, p: 0.3, c: 15.2, g: 0, porcao: 130, medida: "1 unidade" },
    { id: "laranja", nome: "Laranja", kcal: 37, p: 1.0, c: 8.9, g: 0.1, porcao: 180, medida: "1 unidade" },
    { id: "limao", nome: "Limão", kcal: 32, p: 0.9, c: 11.1, g: 0.1, porcao: 60, medida: "1 unidade" },
    { id: "morango", nome: "Morango", kcal: 30, p: 0.9, c: 6.8, g: 0.3, porcao: 120, medida: "10 unidades" },
    { id: "mamao", nome: "Mamão papaia", kcal: 40, p: 0.5, c: 10.4, g: 0.1, porcao: 150, medida: "1/2 unidade" },
    { id: "abacaxi", nome: "Abacaxi", kcal: 48, p: 0.9, c: 12.3, g: 0.1, porcao: 150, medida: "2 fatias" },
    { id: "uva", nome: "Uva", kcal: 53, p: 0.7, c: 13.6, g: 0.2, porcao: 100, medida: "1 cacho pequeno" },
    { id: "abacate", nome: "Abacate", kcal: 96, p: 1.2, c: 6.0, g: 8.4, porcao: 100, medida: "4 colheres de sopa" },
    { id: "roma", nome: "Romã", kcal: 83, p: 1.7, c: 18.7, g: 1.2, porcao: 100, medida: "1/2 unidade" },
    { id: "figo", nome: "Figo", kcal: 74, p: 0.8, c: 19.2, g: 0.3, porcao: 50, medida: "1 unidade" },
    { id: "jaca", nome: "Jaca", kcal: 95, p: 1.7, c: 23.3, g: 0.6, porcao: 100, medida: "5 bagos" },
    { id: "acai", nome: "Açaí (polpa sem açúcar)", kcal: 58, p: 0.8, c: 6.2, g: 3.9, porcao: 200, medida: "1 tigela pequena" },
    { id: "brocolis", nome: "Brócolis cozido", kcal: 25, p: 2.1, c: 4.4, g: 0.5, porcao: 60, medida: "3 ramos" },
    { id: "couve-flor", nome: "Couve-flor cozida", kcal: 23, p: 1.9, c: 4.5, g: 0.3, porcao: 60, medida: "3 ramos" },
    { id: "salada", nome: "Salada verde (alface e tomate)", kcal: 15, p: 1.0, c: 2.8, g: 0.2, porcao: 100, medida: "1 prato de sobremesa" },
    { id: "cenoura", nome: "Cenoura crua", kcal: 34, p: 1.3, c: 7.7, g: 0.2, porcao: 50, medida: "3 colheres de sopa ralada" },
    { id: "pepino", nome: "Pepino", kcal: 10, p: 0.9, c: 2.0, g: 0, porcao: 60, medida: "6 rodelas" },
    { id: "pimentao", nome: "Pimentão", kcal: 21, p: 1.1, c: 4.9, g: 0.2, porcao: 50, medida: "1/2 unidade" },
    { id: "cogumelo", nome: "Cogumelo (champignon)", kcal: 25, p: 2.0, c: 3.3, g: 0.3, porcao: 50, medida: "3 colheres de sopa" },
    { id: "repolho", nome: "Repolho cru", kcal: 17, p: 0.9, c: 3.9, g: 0.1, porcao: 60, medida: "1/2 xícara" },
    { id: "abobrinha", nome: "Abobrinha refogada", kcal: 15, p: 1.1, c: 3.0, g: 0.2, porcao: 80, medida: "3 colheres de sopa" },
    { id: "abobora", nome: "Abóbora cozida", kcal: 29, p: 0.8, c: 6.6, g: 0.4, porcao: 100, medida: "3 pedaços" },
    { id: "leite", nome: "Leite integral", kcal: 61, p: 3.2, c: 4.6, g: 3.3, porcao: 200, medida: "1 copo (200 ml)" },
    { id: "leite-desnatado", nome: "Leite desnatado", kcal: 35, p: 3.4, c: 4.9, g: 0.2, porcao: 200, medida: "1 copo (200 ml)" },
    { id: "iogurte", nome: "Iogurte natural", kcal: 51, p: 4.1, c: 1.9, g: 3.0, porcao: 170, medida: "1 pote" },
    { id: "queijo-minas", nome: "Queijo minas frescal", kcal: 264, p: 17.4, c: 3.2, g: 20.2, porcao: 30, medida: "1 fatia" },
    { id: "requeijao", nome: "Requeijão light", kcal: 180, p: 11.0, c: 3.0, g: 14.0, porcao: 30, medida: "1 colher de sopa" },
    { id: "whey", nome: "Whey protein", kcal: 400, p: 80.0, c: 8.0, g: 6.0, porcao: 30, medida: "1 scoop" },
    { id: "pasta-amendoim", nome: "Pasta de amendoim", kcal: 588, p: 25.0, c: 20.0, g: 50.0, porcao: 15, medida: "1 colher de sopa" },
    { id: "castanha", nome: "Castanha-do-pará", kcal: 643, p: 14.5, c: 15.1, g: 63.5, porcao: 10, medida: "2 unidades" },
    { id: "azeite", nome: "Azeite de oliva", kcal: 884, p: 0, c: 0, g: 100, porcao: 8, medida: "1 colher de sopa" },
    { id: "feijoada", nome: "Feijoada", kcal: 117, p: 8.7, c: 11.6, g: 6.5, porcao: 225, medida: "1 concha grande" },
    { id: "pizza", nome: "Pizza de muçarela", kcal: 280, p: 12.0, c: 30.0, g: 12.0, porcao: 110, medida: "1 fatia" },
    { id: "hamburguer", nome: "Hambúrguer (sanduíche)", kcal: 260, p: 13.0, c: 30.0, g: 10.0, porcao: 200, medida: "1 unidade" },
    { id: "cachorro-quente", nome: "Cachorro-quente", kcal: 250, p: 9.0, c: 25.0, g: 13.0, porcao: 150, medida: "1 unidade" },
    { id: "burrito", nome: "Burrito", kcal: 210, p: 9.0, c: 26.0, g: 7.5, porcao: 220, medida: "1 unidade" },
    { id: "guacamole", nome: "Guacamole", kcal: 155, p: 2.0, c: 9.0, g: 14.0, porcao: 50, medida: "3 colheres de sopa" },
    { id: "pretzel", nome: "Pretzel", kcal: 380, p: 10.0, c: 80.0, g: 3.0, porcao: 60, medida: "1 unidade" },
    { id: "torta", nome: "Torta salgada", kcal: 260, p: 8.0, c: 24.0, g: 15.0, porcao: 130, medida: "1 pedaço" },
    { id: "sopa", nome: "Sopa de legumes", kcal: 45, p: 2.0, c: 7.0, g: 1.0, porcao: 300, medida: "1 prato fundo" },
    { id: "sorvete", nome: "Sorvete de massa", kcal: 207, p: 3.5, c: 24.0, g: 11.0, porcao: 100, medida: "2 bolas" },
    { id: "chocolate", nome: "Chocolate ao leite", kcal: 540, p: 7.2, c: 59.6, g: 30.3, porcao: 25, medida: "4 quadradinhos" },
    { id: "bolo", nome: "Bolo simples", kcal: 330, p: 5.0, c: 55.0, g: 10.0, porcao: 60, medida: "1 fatia" },
    { id: "sobremesa", nome: "Sobremesa cremosa (pavê/trifle)", kcal: 220, p: 4.0, c: 28.0, g: 10.0, porcao: 120, medida: "1 taça" },
    { id: "cafe", nome: "Café sem açúcar", kcal: 2, p: 0.1, c: 0.3, g: 0, porcao: 50, medida: "1 xícara" },
    { id: "suco-laranja", nome: "Suco de laranja natural", kcal: 45, p: 0.7, c: 10.4, g: 0.2, porcao: 250, medida: "1 copo" },
    { id: "refrigerante", nome: "Refrigerante", kcal: 42, p: 0, c: 10.6, g: 0, porcao: 350, medida: "1 lata" },
    { id: "vinho", nome: "Vinho tinto", kcal: 85, p: 0.1, c: 2.6, g: 0, porcao: 150, medida: "1 taça" }
  ],

  /* ------------------------------------------------------------------
     Ligação entre o que a IA reconhece na foto (classes do ImageNet,
     em inglês) e os alimentos da tabela acima.
     ------------------------------------------------------------------ */
  mapaIA: {
    "pizza": "pizza", "cheeseburger": "hamburguer", "hotdog": "cachorro-quente", "hot dog": "cachorro-quente",
    "french loaf": "pao-frances", "bagel": "bagel", "pretzel": "pretzel", "carbonara": "carbonara",
    "burrito": "burrito", "guacamole": "guacamole", "ice cream": "sorvete", "espresso": "cafe",
    "cup": "cafe", "banana": "banana", "orange": "laranja", "lemon": "limao", "strawberry": "morango",
    "pineapple": "abacaxi", "pomegranate": "roma", "fig": "figo", "granny smith": "maca", "broccoli": "brocolis",
    "cauliflower": "couve-flor", "cucumber": "pepino", "bell pepper": "pimentao", "mushroom": "cogumelo",
    "head cabbage": "repolho", "zucchini": "abobrinha", "corn": "milho", "ear": "milho", "meat loaf": "carne-moida",
    "mashed potato": "pure", "potpie": "torta", "consomme": "sopa", "hot pot": "sopa", "trifle": "sobremesa",
    "chocolate sauce": "chocolate", "red wine": "vinho", "jackfruit": "jaca", "acorn squash": "abobora",
    "butternut squash": "abobora", "spaghetti squash": "abobora", "custard apple": "jaca", "dough": "pao-frances",
    "eggnog": "leite", "plate": "", "menu": ""
  },

  /* Cardápio base (≈ 2000 kcal) usado pelo gerador de dieta; as quantidades
     são ajustadas proporcionalmente à meta calórica do aluno. */
  cardapioBase: {
    cafe: [["pao-integral", 50], ["ovo", 100], ["banana", 70], ["cafe", 50]],
    lanche1: [["iogurte", 170], ["aveia", 30], ["morango", 100]],
    almoco: [["arroz", 120], ["feijao", 86], ["frango", 130], ["salada", 100], ["azeite", 5]],
    lanche2: [["pao-frances", 50], ["queijo-minas", 30], ["maca", 130]],
    jantar: [["batata-doce", 150], ["tilapia", 130], ["brocolis", 80]],
    ceia: [["leite-desnatado", 200], ["castanha", 10]]
  },

  refeicoes: [
    { id: "cafe", nome: "Café da manhã" },
    { id: "lanche1", nome: "Lanche da manhã" },
    { id: "almoco", nome: "Almoço" },
    { id: "lanche2", nome: "Lanche da tarde" },
    { id: "jantar", nome: "Jantar" },
    { id: "ceia", nome: "Ceia" }
  ]
};
