/* ==========================================================================
   Iron Force — Cópia do data.json em formato JavaScript
   Usada quando o site é aberto com duplo clique (file://), pois o navegador
   bloqueia a leitura do data.json nesse caso. A página de modalidade usa
   sempre esta cópia.
   ATENÇÃO: o data.json é a fonte dos dados. Depois de editá-lo, copie o
   conteúdo dele para cá (substituindo o objeto abaixo).
   ========================================================================== */

window.DADOS_SITE = {
  "academia": {
    "nome": "Iron Force",
    "telefone": "(11) 3456-7890",
    "whatsapp": "5511987654321",
    "whatsappExibicao": "(11) 98765-4321",
    "email": "contato@ironforce.com.br",
    "endereco": "Av. Paulista, 1500 - Bela Vista, São Paulo - SP, 01310-100"
  },
  "estatisticas": [
    {
      "valor": 2500,
      "sufixo": "+",
      "rotulo": "Alunos ativos"
    },
    {
      "valor": 12,
      "sufixo": "",
      "rotulo": "Anos de experiência"
    },
    {
      "valor": 6,
      "sufixo": "",
      "rotulo": "Modalidades"
    },
    {
      "valor": 35,
      "sufixo": "",
      "rotulo": "Professores"
    }
  ],
  "modalidades": [
    {
      "id": "musculacao",
      "nome": "Musculação",
      "icone": "haltere",
      "imagem": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&q=70&auto=format&fit=crop",
      "resumo": "Treino de força com acompanhamento profissional e equipamentos de ponta.",
      "descricao": "Mais de 1.500 m² com equipamentos de última geração, área de peso livre e máquinas guiadas. Seu treino é montado e revisado pela nossa equipe a cada 6 semanas, de acordo com o seu objetivo.",
      "professor": "Rafael Moreira",
      "periodos": [
        "manha",
        "tarde",
        "noite"
      ],
      "horarios": "Seg a Sex: 5h às 23h · Sáb: 8h às 18h · Dom: 8h às 13h",
      "detalhes": {
        "slogan": "Construa força, músculos e confiança",
        "palavras": [
          "força",
          "hipertrofia",
          "definição",
          "saúde",
          "disciplina"
        ],
        "fotos": [
          "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=1600&q=70&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1600&q=70&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=1600&q=70&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=1600&q=70&auto=format&fit=crop"
        ],
        "intensidade": 4,
        "kcal": 450,
        "duracao": 60,
        "nivel": "Todos os níveis",
        "alunos": 1400,
        "sobre": [
          "A musculação é o treino com pesos livres e máquinas para desenvolver força, massa muscular e resistência. É a base de qualquer programa de condicionamento físico — e serve tanto para quem quer ganhar músculos quanto para quem quer emagrecer, melhorar a postura ou envelhecer com saúde.",
          "Na Iron Force você nunca treina sozinho: cada aluno recebe uma ficha personalizada, montada depois da avaliação física e revisada a cada 6 semanas. Professores ficam no salão o tempo todo para corrigir a execução e ajustar as cargas."
        ],
        "beneficios": [
          {
            "icone": "haltere",
            "titulo": "Ganho de massa muscular",
            "texto": "Estímulo direto para hipertrofia, com progressão de carga planejada."
          },
          {
            "icone": "chama",
            "titulo": "Metabolismo acelerado",
            "texto": "Mais músculo significa mais calorias gastas até em repouso."
          },
          {
            "icone": "escudo",
            "titulo": "Ossos e articulações fortes",
            "texto": "Aumenta a densidade óssea e protege as articulações."
          },
          {
            "icone": "pessoa",
            "titulo": "Postura e menos dores",
            "texto": "Fortalece o core e as costas, reduzindo dores no dia a dia."
          },
          {
            "icone": "lampada",
            "titulo": "Saúde mental",
            "texto": "Reduz ansiedade e estresse e melhora a qualidade do sono."
          },
          {
            "icone": "coracao",
            "titulo": "Controle de glicose e pressão",
            "texto": "Ajuda a prevenir diabetes tipo 2 e hipertensão."
          }
        ],
        "aula": [
          {
            "etapa": "Aquecimento",
            "minutos": 10,
            "texto": "Esteira ou bike leve e mobilidade das articulações que serão treinadas."
          },
          {
            "etapa": "Exercícios principais",
            "minutos": 35,
            "texto": "Exercícios compostos e isolados da sua ficha, com séries e cargas definidas."
          },
          {
            "etapa": "Core e complementos",
            "minutos": 10,
            "texto": "Abdômen, lombar e exercícios corretivos indicados na avaliação."
          },
          {
            "etapa": "Alongamento",
            "minutos": 5,
            "texto": "Volta à calma e alongamento dos músculos trabalhados."
          }
        ],
        "paraQuem": [
          "Quem quer ganhar massa muscular",
          "Quem quer emagrecer com saúde",
          "Idosos que buscam autonomia e força",
          "Atletas de outras modalidades"
        ],
        "levar": [
          "Roupa leve e tênis fechado",
          "Toalha (obrigatória nos aparelhos)",
          "Garrafa de água",
          "Fone de ouvido, se quiser"
        ],
        "faq": [
          {
            "pergunta": "Nunca treinei. Vou saber usar os aparelhos?",
            "resposta": "Sim! A primeira semana é de adaptação, com um professor ensinando cada exercício da sua ficha."
          },
          {
            "pergunta": "Musculação emagrece?",
            "resposta": "Sim. Ela aumenta o gasto calórico e preserva a massa magra. Combinada com alimentação ajustada, é uma das formas mais eficientes de perder gordura."
          },
          {
            "pergunta": "Quantas vezes por semana devo treinar?",
            "resposta": "De 3 a 5 vezes por semana é o ideal para a maioria dos objetivos. Seu professor define a divisão certa para a sua rotina."
          }
        ]
      }
    },
    {
      "id": "jiujitsu",
      "nome": "Jiu-jitsu",
      "icone": "escudo",
      "imagem": "https://images.unsplash.com/photo-1564415315949-7a0c4c73aab4?w=800&q=70&auto=format&fit=crop",
      "resumo": "Técnica, disciplina e defesa pessoal para todas as faixas.",
      "descricao": "Aulas para iniciantes e graduados, com foco em fundamentos, drills e rola supervisionado. Turmas separadas por nível e preparação para campeonatos.",
      "professor": "Thiago Lima",
      "periodos": [
        "manha",
        "noite"
      ],
      "horarios": "Seg, Qua e Sex: 7h e 19h30 · Ter e Qui: 20h30",
      "detalhes": {
        "slogan": "A arte suave que transforma corpo e mente",
        "palavras": [
          "técnica",
          "disciplina",
          "respeito",
          "estratégia",
          "superação"
        ],
        "fotos": [
          "https://images.unsplash.com/photo-1564415315949-7a0c4c73aab4?w=1600&q=70&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1615117972428-28de67cda58e?w=1600&q=70&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1555597408-26bc8e548a46?w=1600&q=70&auto=format&fit=crop"
        ],
        "intensidade": 4,
        "kcal": 600,
        "duracao": 75,
        "nivel": "Da faixa branca à preta",
        "alunos": 260,
        "sobre": [
          "O Jiu-jitsu brasileiro é uma arte marcial de solo baseada em alavancas, quedas, raspagens e finalizações. A ideia central é que técnica vence força: uma pessoa menor consegue controlar um adversário maior usando o próprio peso a seu favor.",
          "Nossas turmas são separadas por nível, com foco em fundamentos para iniciantes e preparação para campeonatos para quem quer competir. O treino desenvolve condicionamento, autoconfiança, raciocínio estratégico e um forte senso de equipe."
        ],
        "beneficios": [
          {
            "icone": "escudo",
            "titulo": "Defesa pessoal real",
            "texto": "Técnicas eficientes para controlar uma situação de risco."
          },
          {
            "icone": "lampada",
            "titulo": "Raciocínio estratégico",
            "texto": "Conhecido como “xadrez humano”: cada movimento exige pensar à frente."
          },
          {
            "icone": "chama",
            "titulo": "Alto gasto calórico",
            "texto": "Uma aula intensa pode passar de 600 kcal."
          },
          {
            "icone": "setas",
            "titulo": "Flexibilidade e mobilidade",
            "texto": "Movimentos de solo que trabalham o corpo inteiro."
          },
          {
            "icone": "equipe",
            "titulo": "Disciplina e respeito",
            "texto": "Valores do tatame que levamos para a vida."
          },
          {
            "icone": "folha",
            "titulo": "Alívio do estresse",
            "texto": "Foco total no treino desliga a mente dos problemas."
          }
        ],
        "aula": [
          {
            "etapa": "Aquecimento",
            "minutos": 15,
            "texto": "Corrida, rolamentos, fuga de quadril e exercícios específicos do tatame."
          },
          {
            "etapa": "Técnica",
            "minutos": 25,
            "texto": "O professor demonstra a posição do dia e os alunos repetem em duplas."
          },
          {
            "etapa": "Drills",
            "minutos": 10,
            "texto": "Repetição em velocidade para automatizar os movimentos."
          },
          {
            "etapa": "Rola (treino livre)",
            "minutos": 25,
            "texto": "Luta supervisionada, respeitando o nível e o limite de cada um."
          }
        ],
        "paraQuem": [
          "Iniciantes sem nenhuma experiência",
          "Quem quer aprender defesa pessoal",
          "Quem busca emagrecer de forma divertida",
          "Competidores e graduados"
        ],
        "levar": [
          "Kimono (temos para empréstimo na aula experimental)",
          "Chinelo para fora do tatame",
          "Garrafa de água",
          "Unhas cortadas e sem acessórios"
        ],
        "faq": [
          {
            "pergunta": "Preciso ter condicionamento para começar?",
            "resposta": "Não. O condicionamento vem com os treinos, e o iniciante faz tudo no próprio ritmo."
          },
          {
            "pergunta": "Mulheres podem treinar?",
            "resposta": "Claro! Temos muitas alunas e as turmas são mistas, com ambiente respeitoso e supervisionado."
          },
          {
            "pergunta": "Quanto tempo leva para trocar de faixa?",
            "resposta": "Em média 1,5 a 2 anos da branca para a azul, dependendo da frequência e da evolução técnica."
          }
        ]
      }
    },
    {
      "id": "boxe",
      "nome": "Boxe",
      "icone": "luva",
      "imagem": "https://images.unsplash.com/photo-1622599511051-16f55a1234d0?w=800&q=70&auto=format&fit=crop",
      "resumo": "Condicionamento intenso, coordenação e muita queima calórica.",
      "descricao": "Treinos com manopla, saco e circuitos funcionais. Ideal para quem busca condicionamento, alívio do estresse e evolução técnica, com ou sem foco em luta.",
      "professor": "Carla Mendes",
      "periodos": [
        "tarde",
        "noite"
      ],
      "horarios": "Ter e Qui: 12h e 19h · Sáb: 10h",
      "detalhes": {
        "slogan": "Golpes precisos, cardio de atleta",
        "palavras": [
          "explosão",
          "coordenação",
          "cardio",
          "foco",
          "atitude"
        ],
        "fotos": [
          "https://images.unsplash.com/photo-1622599511051-16f55a1234d0?w=1600&q=70&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1606335543042-57c525922933?w=1600&q=70&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1590556409324-aa1d726e5c3c?w=1600&q=70&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1509255929945-586a420363cf?w=1600&q=70&auto=format&fit=crop"
        ],
        "intensidade": 5,
        "kcal": 700,
        "duracao": 60,
        "nivel": "Todos os níveis",
        "alunos": 220,
        "sobre": [
          "O boxe é a “nobre arte” dos golpes com os punhos: jab, direto, cruzado e uppercut, combinados com esquivas e muito trabalho de pernas. É um dos treinos mais completos para condicionamento cardiovascular e coordenação motora.",
          "Nas aulas da Iron Force você treina com manopla, saco de pancada e circuitos funcionais. Não é obrigatório lutar: a maioria dos alunos treina pelo condicionamento e pela sensação incrível de descarregar o estresse."
        ],
        "beneficios": [
          {
            "icone": "chama",
            "titulo": "Queima de até 700 kcal",
            "texto": "Um dos treinos que mais gastam calorias por hora."
          },
          {
            "icone": "raio",
            "titulo": "Reflexos e agilidade",
            "texto": "Esquivas e combinações deixam você mais rápido."
          },
          {
            "icone": "pulso",
            "titulo": "Condicionamento cardiovascular",
            "texto": "Rounds intervalados melhoram o fôlego rapidamente."
          },
          {
            "icone": "estrela",
            "titulo": "Alívio do estresse",
            "texto": "Socar o saco é a melhor terapia depois de um dia difícil."
          },
          {
            "icone": "alvo",
            "titulo": "Coordenação motora",
            "texto": "Mãos, pés e tronco trabalhando juntos."
          },
          {
            "icone": "haltere",
            "titulo": "Braços e core definidos",
            "texto": "Ombros, braços e abdômen trabalham em cada golpe."
          }
        ],
        "aula": [
          {
            "etapa": "Aquecimento",
            "minutos": 10,
            "texto": "Pular corda, polichinelos e sombra (golpes no ar)."
          },
          {
            "etapa": "Técnica",
            "minutos": 15,
            "texto": "Base, guarda e combinações de golpes ensinadas passo a passo."
          },
          {
            "etapa": "Manopla e saco",
            "minutos": 25,
            "texto": "Rounds de 3 minutos aplicando as combinações com intensidade."
          },
          {
            "etapa": "Finalização",
            "minutos": 10,
            "texto": "Abdominais, flexões e alongamento."
          }
        ],
        "paraQuem": [
          "Quem quer emagrecer rápido",
          "Quem precisa aliviar o estresse",
          "Quem quer melhorar o fôlego",
          "Quem pensa em competir no futuro"
        ],
        "levar": [
          "Luvas de boxe (12 a 16 oz)",
          "Bandagem para as mãos",
          "Toalha e água",
          "Tênis leve ou treino descalço"
        ],
        "faq": [
          {
            "pergunta": "Vou ter que lutar com alguém?",
            "resposta": "Não. O sparring é opcional e só para alunos avançados que desejam. As aulas regulares são de técnica e condicionamento."
          },
          {
            "pergunta": "Preciso comprar luvas logo no começo?",
            "resposta": "Na aula experimental emprestamos o equipamento. Depois recomendamos ter o seu, por higiene."
          },
          {
            "pergunta": "Boxe é bom para mulheres?",
            "resposta": "Excelente! Melhora o condicionamento, define o corpo e aumenta a autoconfiança."
          }
        ]
      }
    },
    {
      "id": "muaythai",
      "nome": "Muay Thai",
      "icone": "raio",
      "imagem": "https://images.unsplash.com/photo-1517438322307-e67111335449?w=800&q=70&auto=format&fit=crop",
      "resumo": "A arte das oito armas: força, explosão e resistência.",
      "descricao": "Golpes de punho, cotovelo, joelho e canela em aulas dinâmicas. Trabalhamos técnica, condicionamento e confiança em um ambiente seguro.",
      "professor": "Diego Santos",
      "periodos": [
        "manha",
        "noite"
      ],
      "horarios": "Seg, Qua e Sex: 6h30 e 20h · Sáb: 11h",
      "detalhes": {
        "slogan": "A arte das oito armas",
        "palavras": [
          "potência",
          "resistência",
          "confiança",
          "tradição",
          "garra"
        ],
        "fotos": [
          "https://images.unsplash.com/photo-1517438322307-e67111335449?w=1600&q=70&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1616279969856-759f316a5ac1?w=1600&q=70&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1555597673-b21d5c935865?w=1600&q=70&auto=format&fit=crop"
        ],
        "intensidade": 5,
        "kcal": 750,
        "duracao": 60,
        "nivel": "Todos os níveis",
        "alunos": 240,
        "sobre": [
          "O Muay Thai é a arte marcial nacional da Tailândia, conhecida como “a arte das oito armas” por usar punhos, cotovelos, joelhos e canelas. Combina golpes potentes, clinch e uma tradição de muito respeito.",
          "Nossas aulas trabalham técnica, condicionamento e confiança em um ambiente seguro. Você aprende a chutar, defender e combinar golpes com aparadores e saco, e evolui por graduação de prajieds (as faixas do Muay Thai)."
        ],
        "beneficios": [
          {
            "icone": "chama",
            "titulo": "Até 750 kcal por aula",
            "texto": "Treino intenso que acelera o emagrecimento."
          },
          {
            "icone": "subida",
            "titulo": "Pernas e glúteos fortes",
            "texto": "Chutes e joelhadas trabalham toda a parte inferior."
          },
          {
            "icone": "escudo",
            "titulo": "Defesa pessoal",
            "texto": "Golpes eficientes em curta e média distância."
          },
          {
            "icone": "pulso",
            "titulo": "Fôlego de lutador",
            "texto": "Rounds intensos melhoram muito o condicionamento."
          },
          {
            "icone": "balanca",
            "titulo": "Equilíbrio e flexibilidade",
            "texto": "Chutes altos exigem base firme e mobilidade de quadril."
          },
          {
            "icone": "trofeu",
            "titulo": "Autoconfiança",
            "texto": "Superar cada treino fortalece a mente."
          }
        ],
        "aula": [
          {
            "etapa": "Aquecimento",
            "minutos": 10,
            "texto": "Corda, corrida e alongamento dinâmico de quadril."
          },
          {
            "etapa": "Técnica",
            "minutos": 15,
            "texto": "Chutes, joelhadas, cotoveladas e defesas em duplas."
          },
          {
            "etapa": "Aparadores e saco",
            "minutos": 25,
            "texto": "Rounds de combinações com alta intensidade."
          },
          {
            "etapa": "Condicionamento",
            "minutos": 10,
            "texto": "Abdominais, agachamentos e alongamento final."
          }
        ],
        "paraQuem": [
          "Quem quer queimar muitas calorias",
          "Quem busca defesa pessoal",
          "Quem gosta de treino intenso",
          "Quem quer competir"
        ],
        "levar": [
          "Luvas e bandagem",
          "Caneleiras",
          "Bermuda de Muay Thai ou short",
          "Água e toalha"
        ],
        "faq": [
          {
            "pergunta": "Muay Thai machuca muito?",
            "resposta": "Com equipamentos e supervisão, o risco é baixo. As canelas se adaptam aos poucos e o contato é controlado."
          },
          {
            "pergunta": "Qual a diferença para o boxe?",
            "resposta": "O boxe usa só os punhos. O Muay Thai acrescenta chutes, joelhadas, cotoveladas e clinch."
          },
          {
            "pergunta": "Posso fazer Muay Thai e musculação juntos?",
            "resposta": "Sim, e é uma ótima combinação. Seu professor ajuda a organizar a semana para você se recuperar bem."
          }
        ]
      }
    },
    {
      "id": "spinning",
      "nome": "Spinning",
      "icone": "bike",
      "imagem": "https://images.unsplash.com/photo-1520877880798-5ee004e3f11e?w=800&q=70&auto=format&fit=crop",
      "resumo": "Pedal de alta energia com música, luz e muito suor.",
      "descricao": "Aulas de ciclismo indoor com treinos intervalados e playlist motivadora. Bikes com monitor de cadência e sala climatizada.",
      "professor": "Juliana Costa",
      "periodos": [
        "manha",
        "tarde",
        "noite"
      ],
      "horarios": "Seg a Sex: 7h, 12h15 e 18h30",
      "detalhes": {
        "slogan": "Pedale no ritmo da música",
        "palavras": [
          "energia",
          "ritmo",
          "suor",
          "resistência",
          "diversão"
        ],
        "fotos": [
          "https://images.unsplash.com/photo-1520877880798-5ee004e3f11e?w=1600&q=70&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1517130038641-a774d04afb3c?w=1600&q=70&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=1600&q=70&auto=format&fit=crop"
        ],
        "intensidade": 4,
        "kcal": 550,
        "duracao": 45,
        "nivel": "Todos os níveis",
        "alunos": 380,
        "sobre": [
          "O spinning é uma aula de ciclismo indoor em bikes especiais, com variações de velocidade e carga que simulam subidas, sprints e estradas planas. Tudo acontece no ritmo de uma playlist motivadora e com iluminação de festa.",
          "Cada aluno controla a própria carga, então iniciantes e atletas pedalam juntos na mesma turma. Nossas bikes têm monitor de cadência e a sala é climatizada para você render ao máximo."
        ],
        "beneficios": [
          {
            "icone": "chama",
            "titulo": "Queima de gordura",
            "texto": "Treino intervalado que mantém o gasto calórico alto até depois da aula."
          },
          {
            "icone": "subida",
            "titulo": "Pernas e glúteos",
            "texto": "Fortalece e define a parte inferior do corpo."
          },
          {
            "icone": "escudo",
            "titulo": "Baixo impacto",
            "texto": "Protege joelhos e tornozelos, ideal para quem está acima do peso."
          },
          {
            "icone": "pulso",
            "titulo": "Coração mais forte",
            "texto": "Melhora a capacidade cardiorrespiratória rapidamente."
          },
          {
            "icone": "musica",
            "titulo": "Aula animada",
            "texto": "Música, luz e energia do grupo fazem o tempo voar."
          },
          {
            "icone": "ajustes",
            "titulo": "Você controla a carga",
            "texto": "Mesma aula serve para iniciantes e avançados."
          }
        ],
        "aula": [
          {
            "etapa": "Aquecimento",
            "minutos": 5,
            "texto": "Pedalada leve para ajustar a bike e preparar o corpo."
          },
          {
            "etapa": "Subidas",
            "minutos": 15,
            "texto": "Carga alta e cadência baixa, trabalhando força nas pernas."
          },
          {
            "etapa": "Sprints",
            "minutos": 18,
            "texto": "Tiros de velocidade intercalados com recuperação ativa."
          },
          {
            "etapa": "Desaceleração",
            "minutos": 7,
            "texto": "Pedalada leve e alongamento fora da bike."
          }
        ],
        "paraQuem": [
          "Quem quer emagrecer",
          "Quem tem dores nos joelhos",
          "Quem gosta de aula animada",
          "Ciclistas que treinam fora"
        ],
        "levar": [
          "Bermuda com forro (opcional)",
          "Toalha (você vai suar muito!)",
          "Garrafa de água grande",
          "Tênis de sola firme"
        ],
        "faq": [
          {
            "pergunta": "Sou iniciante. Vou aguentar a aula?",
            "resposta": "Sim! Você controla a carga da bike e pode pedalar mais leve sempre que precisar."
          },
          {
            "pergunta": "Preciso reservar a bike?",
            "resposta": "Sim, as vagas são limitadas. Reserve pelo app ou na recepção até 2 horas antes."
          },
          {
            "pergunta": "Spinning deixa a perna grossa?",
            "resposta": "Não. Por ser um treino de resistência, tende a definir e afinar as pernas."
          }
        ]
      }
    },
    {
      "id": "pilates",
      "nome": "Pilates",
      "icone": "folha",
      "imagem": "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=70&auto=format&fit=crop",
      "resumo": "Postura, flexibilidade e fortalecimento do core.",
      "descricao": "Pilates solo e com acessórios em turmas reduzidas. Melhora a postura, previne lesões e complementa qualquer outro treino.",
      "professor": "Fernanda Alves",
      "periodos": [
        "manha",
        "tarde"
      ],
      "horarios": "Ter e Qui: 8h, 9h e 15h · Sáb: 9h",
      "detalhes": {
        "slogan": "Força de dentro para fora",
        "palavras": [
          "postura",
          "equilíbrio",
          "controle",
          "flexibilidade",
          "bem-estar"
        ],
        "fotos": [
          "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1600&q=70&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1599447421416-3414500d18a5?w=1600&q=70&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1600881333168-2ef49b341f30?w=1600&q=70&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1591258370814-01609b341790?w=1600&q=70&auto=format&fit=crop"
        ],
        "intensidade": 2,
        "kcal": 250,
        "duracao": 50,
        "nivel": "Todos os níveis",
        "alunos": 180,
        "sobre": [
          "O Pilates é um método criado por Joseph Pilates que fortalece o centro do corpo (o “powerhouse”: abdômen, lombar e glúteos), melhora a postura e aumenta a flexibilidade com movimentos controlados e respiração consciente.",
          "Na Iron Force as turmas são reduzidas, de no máximo 10 alunos, com Pilates solo e acessórios. É perfeito para prevenir lesões, aliviar dores nas costas e complementar qualquer outro treino."
        ],
        "beneficios": [
          {
            "icone": "pessoa",
            "titulo": "Postura alinhada",
            "texto": "Corrige desequilíbrios e fortalece a musculatura das costas."
          },
          {
            "icone": "alvo",
            "titulo": "Core forte",
            "texto": "Abdômen e lombar estáveis protegem a coluna."
          },
          {
            "icone": "setas",
            "titulo": "Flexibilidade",
            "texto": "Mais amplitude de movimento em todas as articulações."
          },
          {
            "icone": "cruz",
            "titulo": "Alívio de dores",
            "texto": "Muito indicado para dores lombares e cervicais."
          },
          {
            "icone": "balanca",
            "titulo": "Consciência corporal",
            "texto": "Você aprende a controlar cada músculo e a respiração."
          },
          {
            "icone": "folha",
            "titulo": "Menos estresse",
            "texto": "Respiração e concentração acalmam a mente."
          }
        ],
        "aula": [
          {
            "etapa": "Respiração e ativação",
            "minutos": 8,
            "texto": "Respiração lateral e ativação do powerhouse."
          },
          {
            "etapa": "Mobilidade",
            "minutos": 12,
            "texto": "Exercícios de coluna, quadril e ombros."
          },
          {
            "etapa": "Fortalecimento",
            "minutos": 22,
            "texto": "Sequências clássicas com bola, anel e faixa elástica."
          },
          {
            "etapa": "Alongamento e relaxamento",
            "minutos": 8,
            "texto": "Liberação muscular e volta à calma."
          }
        ],
        "paraQuem": [
          "Quem sente dores nas costas",
          "Quem quer melhorar a postura",
          "Gestantes (com liberação médica)",
          "Atletas que querem prevenir lesões"
        ],
        "levar": [
          "Roupa confortável e justa",
          "Meias antiderrapantes",
          "Garrafa de água",
          "Toalha pequena"
        ],
        "faq": [
          {
            "pergunta": "Pilates emagrece?",
            "resposta": "Ajuda, mas o foco principal é força, postura e flexibilidade. Para emagrecer, combine com musculação ou spinning."
          },
          {
            "pergunta": "Homens podem fazer Pilates?",
            "resposta": "Com certeza! Muitos atletas usam o Pilates para melhorar o desempenho e evitar lesões."
          },
          {
            "pergunta": "Posso fazer com hérnia de disco?",
            "resposta": "Na maioria dos casos sim, e costuma ajudar muito. Traga a liberação médica para adaptarmos os exercícios."
          }
        ]
      }
    }
  ],
  "planos": [
    {
      "id": "basico",
      "nome": "Básico",
      "destaque": false,
      "precos": {
        "mensal": 99.9,
        "trimestral": 89.9,
        "anual": 79.9
      },
      "beneficios": [
        {
          "texto": "Acesso à musculação",
          "incluso": true
        },
        {
          "texto": "Avaliação física com personal trainer",
          "incluso": true
        },
        {
          "texto": "App de treino",
          "incluso": true
        },
        {
          "texto": "Jiu-jitsu, Boxe e Muay Thai",
          "incluso": false
        },
        {
          "texto": "Spinning e Pilates",
          "incluso": false
        },
        {
          "texto": "Acompanhamento mensal com personal",
          "incluso": false
        },
        {
          "texto": "Acesso a todas as unidades",
          "incluso": false
        }
      ]
    },
    {
      "id": "completo",
      "nome": "Completo",
      "destaque": true,
      "precos": {
        "mensal": 169.9,
        "trimestral": 149.9,
        "anual": 129.9
      },
      "beneficios": [
        {
          "texto": "Acesso à musculação",
          "incluso": true
        },
        {
          "texto": "Avaliação física com personal trainer",
          "incluso": true
        },
        {
          "texto": "App de treino",
          "incluso": true
        },
        {
          "texto": "Jiu-jitsu, Boxe e Muay Thai",
          "incluso": true
        },
        {
          "texto": "Spinning e Pilates",
          "incluso": true
        },
        {
          "texto": "Acompanhamento mensal com personal",
          "incluso": false
        },
        {
          "texto": "Acesso a todas as unidades",
          "incluso": false
        }
      ]
    },
    {
      "id": "premium",
      "nome": "Premium",
      "destaque": false,
      "precos": {
        "mensal": 249.9,
        "trimestral": 219.9,
        "anual": 189.9
      },
      "beneficios": [
        {
          "texto": "Acesso à musculação",
          "incluso": true
        },
        {
          "texto": "Avaliação física com personal trainer",
          "incluso": true
        },
        {
          "texto": "App de treino",
          "incluso": true
        },
        {
          "texto": "Jiu-jitsu, Boxe e Muay Thai",
          "incluso": true
        },
        {
          "texto": "Spinning e Pilates",
          "incluso": true
        },
        {
          "texto": "Acompanhamento mensal com personal",
          "incluso": true
        },
        {
          "texto": "Acesso a todas as unidades",
          "incluso": true
        }
      ]
    }
  ],
  "personais": [
    {
      "nome": "Rafael Moreira",
      "especialidade": "Hipertrofia e força",
      "foto": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=900&q=75&auto=format&fit=crop",
      "certificacoes": [
        "CREF 012345-G/SP",
        "Pós em Fisiologia do Exercício",
        "NSCA-CPT"
      ],
      "fotoPosicao": "50% 30%",
      "fotoAlt": "Rafael Moreira treinando rosca direta com barra"
    },
    {
      "nome": "Juliana Costa",
      "especialidade": "Emagrecimento e condicionamento",
      "foto": "https://images.unsplash.com/photo-1546483875-ad9014c88eba?w=900&q=75&auto=format&fit=crop",
      "certificacoes": [
        "CREF 023456-G/SP",
        "Treinamento Funcional",
        "Nutrição Esportiva"
      ],
      "fotoPosicao": "68% 25%",
      "fotoAlt": "Juliana Costa fazendo remada com halteres"
    },
    {
      "nome": "Thiago Lima",
      "especialidade": "Lutas e preparação física",
      "foto": "https://images.unsplash.com/photo-1564415315949-7a0c4c73aab4?w=900&q=75&auto=format&fit=crop",
      "certificacoes": [
        "CREF 034567-G/SP",
        "Faixa-preta de Jiu-jitsu",
        "Preparação para MMA"
      ],
      "fotoPosicao": "50% 45%",
      "fotoAlt": "Thiago Lima em luta de jiu-jitsu no tatame"
    },
    {
      "nome": "Fernanda Alves",
      "especialidade": "Pilates e reabilitação",
      "foto": "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=900&q=75&auto=format&fit=crop",
      "certificacoes": [
        "CREF 045678-G/SP",
        "Pilates Clínico",
        "Pós em Biomecânica"
      ],
      "fotoPosicao": "40% 40%",
      "fotoAlt": "Fernanda Alves em aula de pilates no colchonete"
    },
    {
      "nome": "Diego Santos",
      "especialidade": "Muay Thai e HIIT",
      "foto": "https://images.unsplash.com/photo-1517438322307-e67111335449?w=900&q=75&auto=format&fit=crop",
      "certificacoes": [
        "CREF 056789-G/SP",
        "Kru de Muay Thai",
        "CrossFit L1"
      ],
      "fotoPosicao": "50% 30%",
      "fotoAlt": "Diego Santos treinando muay thai com aparadores"
    },
    {
      "nome": "Carla Mendes",
      "especialidade": "Boxe e performance",
      "foto": "https://images.unsplash.com/photo-1590556409324-aa1d726e5c3c?w=900&q=75&auto=format&fit=crop",
      "certificacoes": [
        "CREF 067890-G/SP",
        "Treinadora CBBoxe",
        "Treinamento Desportivo"
      ],
      "fotoPosicao": "40% 30%",
      "fotoAlt": "Carla Mendes treinando boxe com luvas"
    }
  ],
  "horarios": {
    "seg": [
      {
        "hora": "06:30",
        "modalidade": "Muay Thai",
        "professor": "Diego Santos",
        "periodo": "manha",
        "vagas": 4,
        "capacidade": 20
      },
      {
        "hora": "07:00",
        "modalidade": "Jiu-jitsu",
        "professor": "Thiago Lima",
        "periodo": "manha",
        "vagas": 0,
        "capacidade": 18
      },
      {
        "hora": "07:00",
        "modalidade": "Spinning",
        "professor": "Juliana Costa",
        "periodo": "manha",
        "vagas": 9,
        "capacidade": 25
      },
      {
        "hora": "12:15",
        "modalidade": "Spinning",
        "professor": "Juliana Costa",
        "periodo": "tarde",
        "vagas": 2,
        "capacidade": 25
      },
      {
        "hora": "18:30",
        "modalidade": "Spinning",
        "professor": "Juliana Costa",
        "periodo": "noite",
        "vagas": 0,
        "capacidade": 25
      },
      {
        "hora": "19:30",
        "modalidade": "Jiu-jitsu",
        "professor": "Thiago Lima",
        "periodo": "noite",
        "vagas": 6,
        "capacidade": 18
      },
      {
        "hora": "20:00",
        "modalidade": "Muay Thai",
        "professor": "Diego Santos",
        "periodo": "noite",
        "vagas": 3,
        "capacidade": 20
      }
    ],
    "ter": [
      {
        "hora": "08:00",
        "modalidade": "Pilates",
        "professor": "Fernanda Alves",
        "periodo": "manha",
        "vagas": 1,
        "capacidade": 10
      },
      {
        "hora": "09:00",
        "modalidade": "Pilates",
        "professor": "Fernanda Alves",
        "periodo": "manha",
        "vagas": 5,
        "capacidade": 10
      },
      {
        "hora": "12:00",
        "modalidade": "Boxe",
        "professor": "Carla Mendes",
        "periodo": "tarde",
        "vagas": 8,
        "capacidade": 16
      },
      {
        "hora": "15:00",
        "modalidade": "Pilates",
        "professor": "Fernanda Alves",
        "periodo": "tarde",
        "vagas": 0,
        "capacidade": 10
      },
      {
        "hora": "19:00",
        "modalidade": "Boxe",
        "professor": "Carla Mendes",
        "periodo": "noite",
        "vagas": 0,
        "capacidade": 16
      },
      {
        "hora": "20:30",
        "modalidade": "Jiu-jitsu",
        "professor": "Thiago Lima",
        "periodo": "noite",
        "vagas": 7,
        "capacidade": 18
      }
    ],
    "qua": [
      {
        "hora": "06:30",
        "modalidade": "Muay Thai",
        "professor": "Diego Santos",
        "periodo": "manha",
        "vagas": 6,
        "capacidade": 20
      },
      {
        "hora": "07:00",
        "modalidade": "Jiu-jitsu",
        "professor": "Thiago Lima",
        "periodo": "manha",
        "vagas": 3,
        "capacidade": 18
      },
      {
        "hora": "07:00",
        "modalidade": "Spinning",
        "professor": "Juliana Costa",
        "periodo": "manha",
        "vagas": 12,
        "capacidade": 25
      },
      {
        "hora": "12:15",
        "modalidade": "Spinning",
        "professor": "Juliana Costa",
        "periodo": "tarde",
        "vagas": 0,
        "capacidade": 25
      },
      {
        "hora": "18:30",
        "modalidade": "Spinning",
        "professor": "Juliana Costa",
        "periodo": "noite",
        "vagas": 4,
        "capacidade": 25
      },
      {
        "hora": "19:30",
        "modalidade": "Jiu-jitsu",
        "professor": "Thiago Lima",
        "periodo": "noite",
        "vagas": 0,
        "capacidade": 18
      },
      {
        "hora": "20:00",
        "modalidade": "Muay Thai",
        "professor": "Diego Santos",
        "periodo": "noite",
        "vagas": 5,
        "capacidade": 20
      }
    ],
    "qui": [
      {
        "hora": "08:00",
        "modalidade": "Pilates",
        "professor": "Fernanda Alves",
        "periodo": "manha",
        "vagas": 3,
        "capacidade": 10
      },
      {
        "hora": "09:00",
        "modalidade": "Pilates",
        "professor": "Fernanda Alves",
        "periodo": "manha",
        "vagas": 0,
        "capacidade": 10
      },
      {
        "hora": "12:00",
        "modalidade": "Boxe",
        "professor": "Carla Mendes",
        "periodo": "tarde",
        "vagas": 5,
        "capacidade": 16
      },
      {
        "hora": "15:00",
        "modalidade": "Pilates",
        "professor": "Fernanda Alves",
        "periodo": "tarde",
        "vagas": 7,
        "capacidade": 10
      },
      {
        "hora": "19:00",
        "modalidade": "Boxe",
        "professor": "Carla Mendes",
        "periodo": "noite",
        "vagas": 2,
        "capacidade": 16
      },
      {
        "hora": "20:30",
        "modalidade": "Jiu-jitsu",
        "professor": "Thiago Lima",
        "periodo": "noite",
        "vagas": 9,
        "capacidade": 18
      }
    ],
    "sex": [
      {
        "hora": "06:30",
        "modalidade": "Muay Thai",
        "professor": "Diego Santos",
        "periodo": "manha",
        "vagas": 10,
        "capacidade": 20
      },
      {
        "hora": "07:00",
        "modalidade": "Jiu-jitsu",
        "professor": "Thiago Lima",
        "periodo": "manha",
        "vagas": 5,
        "capacidade": 18
      },
      {
        "hora": "07:00",
        "modalidade": "Spinning",
        "professor": "Juliana Costa",
        "periodo": "manha",
        "vagas": 0,
        "capacidade": 25
      },
      {
        "hora": "12:15",
        "modalidade": "Spinning",
        "professor": "Juliana Costa",
        "periodo": "tarde",
        "vagas": 14,
        "capacidade": 25
      },
      {
        "hora": "18:30",
        "modalidade": "Spinning",
        "professor": "Juliana Costa",
        "periodo": "noite",
        "vagas": 1,
        "capacidade": 25
      },
      {
        "hora": "19:30",
        "modalidade": "Jiu-jitsu",
        "professor": "Thiago Lima",
        "periodo": "noite",
        "vagas": 4,
        "capacidade": 18
      },
      {
        "hora": "20:00",
        "modalidade": "Muay Thai",
        "professor": "Diego Santos",
        "periodo": "noite",
        "vagas": 0,
        "capacidade": 20
      }
    ],
    "sab": [
      {
        "hora": "09:00",
        "modalidade": "Pilates",
        "professor": "Fernanda Alves",
        "periodo": "manha",
        "vagas": 2,
        "capacidade": 10
      },
      {
        "hora": "10:00",
        "modalidade": "Boxe",
        "professor": "Carla Mendes",
        "periodo": "manha",
        "vagas": 6,
        "capacidade": 16
      },
      {
        "hora": "11:00",
        "modalidade": "Muay Thai",
        "professor": "Diego Santos",
        "periodo": "manha",
        "vagas": 0,
        "capacidade": 20
      }
    ]
  },
  "galeria": [
    {
      "src": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=900&q=70&auto=format&fit=crop",
      "categoria": "estrutura",
      "alt": "Área de musculação com fileira de halteres"
    },
    {
      "src": "https://images.unsplash.com/photo-1517130038641-a774d04afb3c?w=900&q=70&auto=format&fit=crop",
      "categoria": "aulas",
      "alt": "Turma em aula coletiva de alta intensidade"
    },
    {
      "src": "https://images.unsplash.com/photo-1576678927484-cc907957088c?w=900&q=70&auto=format&fit=crop",
      "categoria": "equipamentos",
      "alt": "Halteres organizados no suporte"
    },
    {
      "src": "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=900&q=70&auto=format&fit=crop",
      "categoria": "estrutura",
      "alt": "Salão amplo e iluminado com aparelhos"
    },
    {
      "src": "https://images.unsplash.com/photo-1606335543042-57c525922933?w=900&q=70&auto=format&fit=crop",
      "categoria": "aulas",
      "alt": "Aluno treinando boxe no saco de pancadas"
    },
    {
      "src": "https://images.unsplash.com/photo-1509255929945-586a420363cf?w=900&q=70&auto=format&fit=crop",
      "categoria": "equipamentos",
      "alt": "Par de luvas de boxe vermelhas"
    },
    {
      "src": "https://images.unsplash.com/photo-1623874514711-0f321325f318?w=900&q=70&auto=format&fit=crop",
      "categoria": "estrutura",
      "alt": "Visão geral da academia com pé-direito alto"
    },
    {
      "src": "https://images.unsplash.com/photo-1564415315949-7a0c4c73aab4?w=900&q=70&auto=format&fit=crop",
      "categoria": "aulas",
      "alt": "Treino de jiu-jitsu no tatame"
    },
    {
      "src": "https://images.unsplash.com/photo-1544033527-b192daee1f5b?w=900&q=70&auto=format&fit=crop",
      "categoria": "equipamentos",
      "alt": "Anilhas e halteres em preto e branco"
    },
    {
      "src": "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=900&q=70&auto=format&fit=crop",
      "categoria": "estrutura",
      "alt": "Área de cardio com iluminação baixa"
    },
    {
      "src": "https://images.unsplash.com/photo-1520877880798-5ee004e3f11e?w=900&q=70&auto=format&fit=crop",
      "categoria": "aulas",
      "alt": "Turma de spinning pedalando"
    },
    {
      "src": "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=900&q=70&auto=format&fit=crop",
      "categoria": "equipamentos",
      "alt": "Halteres e elástico de treino sobre madeira"
    }
  ],
  "depoimentos": [
    {
      "nome": "Mariana Ribeiro",
      "foto": "https://randomuser.me/api/portraits/women/12.jpg",
      "info": "Aluna há 2 anos",
      "nota": 5,
      "texto": "Perdi 14 kg com o acompanhamento da equipe. O ambiente é motivador e os professores realmente se importam com a sua evolução."
    },
    {
      "nome": "Lucas Ferreira",
      "foto": "https://randomuser.me/api/portraits/men/22.jpg",
      "info": "Aluno de Jiu-jitsu",
      "nota": 5,
      "texto": "Comecei do zero no jiu-jitsu e hoje já compito. Estrutura impecável e professores de altíssimo nível."
    },
    {
      "nome": "Patrícia Gomes",
      "foto": "https://randomuser.me/api/portraits/women/33.jpg",
      "info": "Aluna de Pilates",
      "nota": 5,
      "texto": "O pilates acabou com minhas dores nas costas. Turmas pequenas e atenção individual em todas as aulas."
    },
    {
      "nome": "Bruno Carvalho",
      "foto": "https://randomuser.me/api/portraits/men/51.jpg",
      "info": "Plano Premium",
      "nota": 5,
      "texto": "Ganhei 8 kg de massa magra em um ano. O acompanhamento mensal com o personal faz toda a diferença."
    },
    {
      "nome": "Camila Rocha",
      "foto": "https://randomuser.me/api/portraits/women/57.jpg",
      "info": "Aluna de Spinning",
      "nota": 5,
      "texto": "As aulas de spinning são viciantes! Música boa, energia lá em cima e resultado visível em poucas semanas."
    }
  ],
  "faq": [
    {
      "pergunta": "Qual é o horário de funcionamento?",
      "resposta": "Funcionamos de segunda a sexta das 5h às 23h, aos sábados das 8h às 18h e aos domingos e feriados das 8h às 13h. As aulas coletivas seguem a grade de horários disponível no site."
    },
    {
      "pergunta": "Como faço minha matrícula?",
      "resposta": "Preencha o pré-cadastro aqui no site ou venha até a recepção com um documento com foto. Nossa equipe entra em contato em até 24 horas para finalizar a matrícula e agendar sua avaliação."
    },
    {
      "pergunta": "A avaliação física está inclusa?",
      "resposta": "Sim! Todos os planos incluem uma avaliação física completa com personal trainer: bioimpedância, medidas, testes de mobilidade e definição de objetivos. No plano Premium a reavaliação é mensal."
    },
    {
      "pergunta": "Como funciona o cancelamento?",
      "resposta": "No plano mensal você pode cancelar a qualquer momento, sem multa, com 30 dias de antecedência. Nos planos trimestral e anual, o cancelamento antecipado tem multa de 10% sobre o valor restante."
    },
    {
      "pergunta": "Preciso de ajuda para usar os equipamentos?",
      "resposta": "Nossos professores ficam no salão durante todo o horário de funcionamento para orientar a execução dos exercícios e o uso correto dos aparelhos. Iniciantes recebem uma aula de adaptação gratuita."
    },
    {
      "pergunta": "Posso trancar meu plano?",
      "resposta": "Sim. Planos trimestrais e anuais podem ser trancados por até 30 dias por ano, mediante solicitação na recepção ou pelo app."
    }
  ]
};
