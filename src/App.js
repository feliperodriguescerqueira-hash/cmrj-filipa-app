import React, { useState, useEffect } from 'react';
import { ChevronDown, Trophy, TrendingUp, BookOpen, RotateCcw, CheckCircle, XCircle, Lightbulb, Clock, FileText } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

// Conexão com o seu banco de dados no Supabase
const supabaseUrl = 'https://kdvaoykmexvkggjnprtu.supabase.co';
const supabaseKey = 'sb_publishable_vGwA76Cod9vPa_WzFrQwPA_px1wd9QH';
const supabase = createClient(supabaseUrl, supabaseKey);

const CMRJStudyApp = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(12600); 
  const [isTextModalOpen, setIsTextModalOpen] = useState(false);
  const [examQuestions, setExamQuestions] = useState([]);

  // Estado inicial puxando do localStorage por garantia de velocidade
  const [stats, setStats] = useState(() => {
    const saved = localStorage.getItem('cmrjStats');
    return saved ? JSON.parse(saved) : {};
  });

  // Busca os dados da nuvem assim que o app abre
  useEffect(() => {
    const fetchStatsFromDB = async () => {
      const { data, error } = await supabase.from('estatisticas').select('*');
      
      if (data && !error) {
        const dbStats = {};
        data.forEach(row => {
          dbStats[row.id] = {
            attempts: row.tentativas,
            bestScore: row.melhor_score,
            percentage: row.percentual,
            lastAttempt: row.ultima_tentativa,
            totalQuestions: 20
          };
        });
        setStats(dbStats);
        localStorage.setItem('cmrjStats', JSON.stringify(dbStats));
      }
    };
    fetchStatsFromDB();
  }, []);

  const examsData = {
    '2023-2024': {
      year: '2023-2024',
      texts: {
        portuguese: [
          { 
            title: 'TEXTO I - Correr não causa mais lesões do que outros esportes', 
            content: `Correr não causa mais lesões do que outros esportes
              
Fisioterapeuta especialista em biomecânica da corrida, Raquel Castanharo desmistifica alguns mitos em relação à modalidade
              
Correr pode causar lesões, mas, ao contrário do que alguns profissionais de saúde podem dizer, como "pare de correr e comece a nadar ou fazer hidroginastica", eu não vou te dizer isso. Nós, seres humanos, somos animais corredores. Nao somos baleias ou golfinhos feitos apenas para ficar na água. Então, em vez de se assustar com a possibilidade de correr e se machucar, quero te fornecer ferramentas para ter uma vida saudável na corrida e também desmistificar algumas crenças.
O primeiro mito é que a corrida causa mais lesões do que outros esportes. Isso não é verdade. Quando olhamos para as taxas de lesões na corrida em comparacao com outros esportes, nao há uma diferença significativa. Pode parecer que sim, porque quem corre geralmente leva a atividade mais a sério do que alguém que joga uma partida casual de futebol no fim de semana. Qualquer atividade física possui um certo risco de dores e lesões, como tendinite ou dores musculares. Mas a corrida, na verdade, ajuda a diminuir o risco de doenças relacionadas ao sedentarismo. O sedentarismo é a principal causa de doenças que levam à morte no mundo. Ficar em casa no sofá é muito pior do que correr.
E, diferente do que muitos pensam, correr não causa danos aos joelhos. Eu sei que você ja ouviu isso, mas se olharmos para as evidências científicas, não é verdade. Sabe o que realmente prejudica os joelhos? O sedentarismo, mais uma vez. Aliás, há evidências de que corredores têm menos incidência de artrose nos joelhos e quadris na velhice.
Mas nem tudo são flores. Se você está correndo e começa a sentir dor, não entre em pânico. Se você fizer tudo corretamente, essa lesão será apenas um episódio temporário que não vai te afastar da corrida. Trabalho com corrida há 16 anos e já passei por situações assim. Mais de 5 mil corredores já passaram pela minha clínica especializada em corrida, e posso te dizer que nunca vi uma lesao ou problema que tenha impedido alguém de correr para sempre. É um episódio ou um período difícil, mas não é o fim. Inclusive, pessoas correm mesmo sem pernas. Tenho dois amigos que sao amputados devido a acidentes e ainda assim correm. Um deles é recordista dos 100 metros rasos. Tenha isso em mente.
E o que você pode fazer para tornar esses episódios curtos e evitar que aconteçam com frequência ao longo da sua vida como corredor? A chave é equilibrar sua capacidade e demanda. Capacidade é o que seu joelho, seu pé, seu tendão suportam, e demanda é o que você está fazendo com o seu corpo. Se você estiver impondo uma demanda muito maior do que sua capacidade, lesões e dores ocorrerão. Você precisa aprender a equilibrar isso. Avalie se sua capacidade está adequada, se está fortalecido corretamente, se está absorvendo o impacto das suas passadas de forma adequada e se tem boa mobilidade. Às vezes, é necessário ajustar a demanda, descansar adequadamente e evitar aumentos bruscos nos treinos. Quando você sabe equilibrar a capacidade e a demanda, fica muito mais fácil controlar pequenos episódios de dor.
Claro, em algum momento você pode precisar de um médico, fisioterapeuta ou um profissional de educação fisica. Existe um conceito chamado autoeficácia, que é quando você sabe que sua saúde está em suas mãos e possui ferramentas para cuidar dela. Buscar ajuda profissional cientificamente embasada ajuda as pessoas a se recuperarem mais rapidamente, terem menos dor e sofrerem menos lesões. Eu tenho uma clínica e estou sempre disponível para ajudar, mas é importante que você saiba cuidar de si mesmo antes mesmo de chegar até aqui.
Quando você sabe equilibrar capacidade e demanda, fica muito mais facil controlar pequenos episodios de dor. Compartilhe esse texto com um amigo para que ele saiba que correr nao prejudica os joelhos.
              
(Adaptado de: www.ge.com.br/ acessado em: 08AGO23, às 14h37)` 
          },
          { 
            title: 'TEXTO II - Quem tem medo de quê?', 
            content: `O estudo, publicado na revista Frontiers in Psychology, explora o uso da corrida como escapismo
              
Correr como um meio de escapar das emoções negativas é muitas vezes percebido como uma estratégia benéfica para melhorar o bem-estar geral. No entanto, estudos recentes sugerem que essa abordagem pode ter consequências não intencionais e potencialmente exacerbada da sensação de bem-estar.
              
para suprir emoções negativas e como isso pode levar à dependência do exercício e à diminuição da sensação de bem-estar geral.
À primeira vista, correr parece oferecer uma solução promissora para indivíduos que buscam alívio para emoções negativas. Engajar-se em atividades físicas, como correr, pode desencadear a liberação de endorfinas, comumente chamadas de hormônios do "bem-estar". Essas endorfinas contribuem para uma elevação temporária do humor, proporcionando uma sensação de alívio do sofrimento emocional.
Durante o estudo, quase 230 corredores de todos os níveis preencheram questionários relacionados ao motivo de correrem. Os participantes foram questionados se sentiam que correr os levava a aprender coisas novas sobre si ou se se sentiam mais abertos a novas experiências e perspectivas.
Os pesquisadores descobriram que correr para suprimir emoções negativas estava fortemente associado à dependência do exercício e a uma diminuição do bem-estar subjetivo.
É crucial reconhecer que somente a corrida não pode resolver as causas profundas do sofrimento emocional. As emocões negativas geralmente decorrem de problemas psicológicos ou emocionais subjacentes que requerem atenção e resolução.
A confiança excessiva na corrida como uma fuga emocional pode inadvertidamente levar a uma obsessão doentia pela própria atividade. Essa fixação na corrida pode transformar uma saída positiva em uma fonte de estresse e pressão, impactando negativamente o bem-estar geral.
"Você faz algo que é bom para sua saúde física, mas, na verdade, destrói sua saúde mental", disse o Dr. Frode Stenseng, autor do estudo e professor de psicologia da Universidade Norueguesa de Ciéncia e Tecnologia.
Em estudos futuros, Stenseng espera descobrir de forma mais concreta o quanto a dependência de exercicios afeta o bem-estar e como mudar a mentalidade ao procurar este escape.
              
Adaptado de: https://www.tecmundo.com.br/ciencia/264380-cuidado-corrida-excesso-prejudicar.htm, acesso em 08AGO23, às 14:23h)` 
          },
          { 
            title: 'TEXTO III - Médico lista benefícios da corrida...', 
            content: `Médico lista benefícios da corrida para a saúde e bem-estar
Médico do esporte explica por que a corrida provoca bem-estar e qual a forma correta de praticá-la
A prática de atividades físicas é um dos pilares para a manutenção da saúde e do bem-estar. A corrida está entre um dos exercícios mais populares. Afinal, a atividade gera uma série de benefícios para a saúde e qualidade de vida.
"A corrida é uma atividade de longa duração, que ajusta principalmente os mecanismos de gasto energético. Então, ela melhora o metabolismo e ajusta a organela mitocôndria, que ativa a queima de gordura. Quando corre, a pessoa libera endorfinas, que ajudam principalmente no bem-estar, na sensação de prazer e saciedade", explica o médico do esporte João Branco.
Apesar dos inúmeros benefícios, a corrida precisa ser praticada de forma balanceada, não adianta correr de forma esporádica ou de forma desenfreada. "A corrida precisa ser programada. O excesso que nos chamamos de overtraining pode causar muitos danos articulares. Temos que ver o reforço muscular, treino, articulações e, principalmente, o joelho, o tênis e o terreno", afirma Branco.
Segundo o médico, não há um horário ideal para correr. O indicado é que a pessoa encaixe o exercicio conforme a sua disponibilidade.` 
          },
          { 
            title: 'TEXTO IV - Tirinha', 
            content: `Atenção: Como o texto IV é uma tirinha, a imagem está na própria questão 39.` 
          }
        ]
      },
      math: [
        { id: 1, text: `Dentre os Estabelecimentos de Ensino participantes dos XV Jogos da Amizade, destacam-se:\n- Colégio Militar do Rio de Janeiro (CMRJ)\n- Colégio Militar de Brasília (CMB)\n- Colégio Militar de Belo Horizonte (CMBH)\n- Colégio Militar da Vila Militar (CMVM)\n\nO gráfico abaixo traz a quantidade de alunos de cada Colégio Militar que participou dos Jogos da Amizade neste ano.\n\nSuponha que o CMVM deseje dobrar a quantidade de alunos participantes nos XVI Jogos da Amizade. Nesse caso, considerando que apenas o CMVM alteraria a quantidade de alunos participantes, qual seria, em porcentagem aproximada, o aumento da quantidade de alunos participantes do CMVM em relação ao somatório da quantidade de alunos participantes dos outros três Colégios Militares?`, image: 'COLE_O_LINK_DA_IMAGEM_AQUI', options: { 'A': `0,069%`, 'B': `0,138%`, 'C': `6,9%`, 'D': `13,8%`, 'E': `15,3%` }, correct: 'C' },
        { id: 2, text: `Os XIV Jogos da Amizade aconteceram na cidade de Curitiba e tiveram a presença de 1800 alunos. Já os XV Jogos da Amizade, no Rio de Janeiro, contaram com a presença de 2100 alunos. Supondo que seja mantido, pelas futuras edições, o mesmo aumento percentual da quantidade de participantes apresentados entre os XIV e XV Jogos da Amizade, determine, aproximadamente, a quantidade de alunos que participarão dos XVII Jogos da Amizade.`, options: { 'A': `300`, 'B': `2400`, 'C': `2450`, 'D': `2723`, 'E': `2858` }, correct: 'E' },
        { id: 3, text: `Nos Jogos da Amizade, alguns Colégios Militares fazem uniformes especiais para usar durante as competições. Nesse contexto, os alunos da equipe de futebol masculino do Colégio Militar do Rio de Janeiro foram a uma costureira e encomendaram as camisetas para uso na competição. A fim de confeccioná-las, a costureira dispunha de três rolos de tecido, de mesma largura e com as seguintes medidas de comprimento: 112 metros, 176 metros e 96 metros. \n\nProcurando atender na plenitude os pedidos dos uniformes, ela decidiu iniciar a confecção das camisetas cortando os tecidos de forma a obter pedaços de mesmo comprimento e com o maior tamanho possível. Após cortar os três rolos de tecido, determine a quantidade de pedaços de tecidos obtidos pela costureira.`, options: { 'A': `6`, 'B': `7`, 'C': `11`, 'D': `16`, 'E': `24` }, correct: 'E' },
        { id: 4, text: `Os membros do Colégio Militar do Rio de Janeiro lotaram as arquibancadas para torcer pelos seus atletas nas competições dos XV Jogos da Amizade. Visando facilitar o deslocamento da torcida até os locais das competições, foram disponibilizadas nove viaturas, entre ônibus, micro-ônibus e vans. Essas viaturas saíram do Colégio Militar do Rio de Janeiro com suas capacidades máximas de passageiros sentados e sem pessoas em pé, totalizando 255 indivíduos. Além disso, sabe-se que:\n- o total de vans excede o total de micro-ônibus em uma unidade;\n- o total de micro-ônibus excede o total de ônibus em uma unidade;\n- a quantidade de passageiros de um ônibus excede a quantidade de passageiros de um micro-ônibus em 25 unidades;\n- a quantidade de passageiros de um micro-ônibus excede a quantidade de passageiros de uma van em 5 unidades; e\n- cada categoria de transporte tem modelos com os mesmos números de lugares.\n\nDetermine a quantidade de passageiros que foram transportados por meio de 1 (um) micro-ônibus.`, options: { 'A': `15`, 'B': `18`, 'C': `20`, 'D': `25`, 'E': `50` }, correct: 'D' },
        { id: 5, text: `A delegação do Colégio Militar de Campo Grande, para participar dos XV Jogos da Amizade, enfrentou dois dias de viagem de ônibus no percurso entre Campo Grande e o Rio de Janeiro, com uma parada para pernoite em Campinas. No primeiro dia de viagem, após percorrerem 2/3 do total do percurso, chegaram a Campinas. No segundo dia de viagem, após percorrerem 1/5 do que faltava para chegar ao destino, fizeram uma parada para alimentação. \n\nSabendo que o percurso total de Campo Grande ao Rio de Janeiro tem 1425 quilômetros (km), a quilometragem que ainda faltava ser percorrida quando fizeram a parada para alimentação no segundo dia de viagem era de:`, options: { 'A': `95 km.`, 'B': `380 km.`, 'C': `475 km.`, 'D': `950 km.`, 'E': `1045 km.` }, correct: 'B' },
        { id: 6, text: `No dia 10 de julho, durante os XV Jogos da Amizade, aconteceu a partida de basquete feminino entre o Colégio Militar do Rio de Janeiro (CMRJ) e o Colégio Militar de Porto Alegre (CMPA). No referido esporte, as atletas arremessam a bola na cesta podendo obter 1, 2 ou 3 pontos em cada arremesso, a depender da posição na quadra ou da situação que a bola é arremessada. Próximo ao final da partida, a equipe do CMPA estava ganhando de um ponto de diferença da equipe do CMRJ. No último segundo, um atleta da equipe do CMRJ arremessou a bola e acertou a cesta, consagrando a vitória do CMRJ. \n\nSabe-se que, antes do arremesso final, o placar da equipe do CMPA era um número primo e, depois do arremesso final, o placar da equipe do CMRJ também passou a ser um número primo. A soma dos placares finais das duas equipes está compreendida entre 180 e 300 e é um número divisível por 3 e 8 ao mesmo tempo. Assim, determine a soma dos algarismos do número que representa o placar da equipe do CMRJ.`, options: { 'A': `5`, 'B': `7`, 'C': `8`, 'D': `10`, 'E': `11` }, correct: 'D' },
        { id: 7, text: `As partidas de vôlei feminino dos XV Jogos da Amizade aconteceram em uma das quatro quadras da Arena Coronel Wenceslau Malta. Essa quadra está representada na figura abaixo:\n\nSabe-se que:\n- cada quadradinho da figura tem 100 centímetros de lado;\n- a parte cinza é chamada de Zona Livre; e\n- a quadra é dividida em quatro retângulos (Zona de Defesa 1, Zona de Ataque 1, Zona de Ataque 2 e Zona de Defesa 2).\n\nDesse modo, determine a razão entre as áreas da Zona de Defesa 1 e a Zona Livre.`, image: 'COLE_O_LINK_DA_IMAGEM_AQUI', options: { 'A': `3/40`, 'B': `11/20`, 'C': `3/22`, 'D': `3/11`, 'E': `1/3` }, correct: 'D' },
        { id: 8, text: `A equipe de voleibol masculina do Colégio Militar do Rio de Janeiro, inscrita nos XV Jogos da Amizade, era composta de 6 jogadores titulares e de mais 6 jogadores reservas. A média aritmética da altura dos 12 jogadores era de 1,75 metro (m). Contudo, uma semana antes das competições, um dos jogadores teve uma lesão e foi afastado da equipe. Portanto, o técnico resolveu inscrever um novo jogador que possui 24 centímetros (cm) de altura a mais que o jogador lesionado. \n\nDetermine a nova média aritmética de altura da equipe de voleibol masculina do Colégio Militar do Rio de Janeiro.`, options: { 'A': `1,77 m`, 'B': `1,78 m`, 'C': `1,79 m`, 'D': `1,87 m`, 'E': `1,99 m` }, correct: 'A' },
        { id: 9, text: `De acordo com o previsto no regulamento dos XV Jogos da Amizade, uma equipe de handebol pode somar pontos na fase de grupos por meio de três formas:\n- vitória no tempo normal soma 3 pontos;\n- vitória no tempo extra ou em tiros de 7 metros soma 2 pontos;\n- derrota soma 1 ponto.\n\nEm um certo momento da competição, as equipes de handebol do CMRJ e do CMB estavam empatadas com 9 pontos, e ambas já haviam jogado 4 partidas cada. Supondo que o CMRJ fez uma campanha em que ganhou uma vez no tempo normal e três vezes no tempo extra, e que o CMB não obteve o mesmo quantitativo de vitórias em tempo normal e tempo extra, assinale a alternativa que representa uma possibilidade de campanha para o CMB.`, options: { 'A': `Duas vitórias em tempo normal e duas derrotas.`, 'B': `Duas vitórias em tempo normal e duas vitórias em tempo extra.`, 'C': `Duas vitórias em tempo normal, uma vitória em tempo extra e uma derrota.`, 'D': `Três vitórias em tempo normal e uma derrota.`, 'E': `Três vitórias em tempo normal e uma vitória em tempo extra.` }, correct: 'C' },
        { id: 10, text: `Nos XV Jogos da Amizade, a piscina usada mede 50 metros de comprimento, 25 metros de largura e 3 metros de profundidade. Antes do início das competições, foi necessário trocar parcialmente a água para melhorar o seu pH, bem como aspirar a sujeira encontrada nela. Para isso, abriram-se, por uma hora, dois ralos que liberaram 25 litros de água por segundo cada. Após essa operação, fecharam-se os dois ralos e abriram-se dez torneiras, por 30 minutos, que despejaram na piscina 0,01 metros cúbicos de água por segundo cada. \n\nDetermine o que ocorreu com o nível da água da piscina após essas duas operações.`, options: { 'A': `Desceu 7,2 cm.`, 'B': `Subiu 7,2 cm.`, 'C': `Desceu 14,4 cm.`, 'D': `Subiu 14,4 cm.`, 'E': `Ficou inalterado.` }, correct: 'E' },
        { id: 11, text: `Os 50 metros nado livre é a prova mais rápida da natação. Nos XV Jogos da Amizade, Rodrigo, atleta do CMRJ, participou dessa prova. Ao concluí-la, Rodrigo verificou que 1/3 do total de atletas participantes fizeram um tempo menor que o seu, e que 3/5 do total de atletas participantes fizeram um tempo maior que o seu. É correto afirmar que a colocação de Rodrigo na prova foi:`, options: { 'A': `5ª`, 'B': `6ª`, 'C': `7ª`, 'D': `8ª`, 'E': `9ª` }, correct: 'B' },
        { id: 12, text: `Júlia e Marina participaram de uma prova de corrida. Certo dia, em uma pista oval, Júlia deu voltas na pista em um ritmo de 2 minutos e 45 segundos cada, enquanto Marina deu voltas na pista em ritmo de 2 minutos e 12 segundos cada. Supondo que ambas largassem juntas e fizessem cada volta conforme os tempos acima mencionados, determine a quantidade de voltas que Marina deveria dar para cruzar com Júlia pela primeira vez.`, options: { 'A': `4`, 'B': `5`, 'C': `6`, 'D': `11`, 'E': `12` }, correct: 'B' },
        { id: 13, text: `O salto em distância é uma modalidade de atletismo. Supondo que a tabela abaixo mostre os resultados no salto em distância nos XV Jogos da Amizade, o segundo colocado nessa competição foi:`, image: 'COLE_O_LINK_DA_IMAGEM_AQUI', options: { 'A': `Marcos.`, 'B': `João Gabriel.`, 'C': `Pedro.`, 'D': `Lucas.`, 'E': `Matheus.` }, correct: 'A' },
        { id: 14, text: `O mapa da prova de orientation dos XV Jogos da Amizade foi projetado sobre um quadrado de 8 x 8, conforme a figura abaixo. Lucas, atleta do CMRJ, passou pelos 8 pontos de controle locados no mapa, seguindo a ordem: A1, A5, C5, C8, H8, H3, B3 e B1. Considerando que Lucas percorreu a menor distância entre os pontos de controle e que cada um dos quadradinhos tem 15 decâmetros (dam) de lado, determine a distância percorrida por Lucas, em quilômetros (km).`, image: 'COLE_O_LINK_DA_IMAGEM_AQUI', options: { 'A': `4,05 km`, 'B': `4,2 km`, 'C': `4,35 km`, 'D': `405 km`, 'E': `420 km` }, correct: 'A' },
        { id: 15, text: `A torre é uma peça do xadrez que só se move em linha reta, tanto na vertical quanto na horizontal, quantas casas quiser. A figura abaixo mostra as casas nas quais a torre pode ser deslocada. Determine a probabilidade de, ao movimentar essa peça da exata posição em que se encontra e conforme as regras, ela não caia em uma casa preta.`, image: 'COLE_O_LINK_DA_IMAGEM_AQUI', options: { 'A': `2/7`, 'B': `3/7`, 'C': `4/7`, 'D': `5/7`, 'E': `6/7` }, correct: 'B' },
        { id: 16, text: `Observe o quadro de medalhas distribuídas nos XV Jogos da Amizade. Utilizando os dados do quadro, assinale a alternativa correta.`, image: 'COLE_O_LINK_DA_IMAGEM_AQUI', options: { 'A': `O CMB ganhou 20% do total de medalhas de bronze.`, 'B': `O CMRJ ganhou mais de 10% do total de medalhas de ouro.`, 'C': `O CMC ganhou menos de 5% do total de medalhas.`, 'D': `O CMBH ganhou 1/6 do total de medalhas.`, 'E': `O CMM ganhou 5% do total de medalhas de ouro e prata.` }, correct: 'D' },
        { id: 17, text: `Para compor a plateia do ZumZaraVoice foram convidados alunos dos quinze Colégios Militares. Os alunos foram acomodados sentados em cadeiras numeradas em sequência cardinal, sem assentos vagos. Os alunos do CMF ocuparam entre as cadeiras de nº 30 e nº 99. A partir da cadeira nº 99, quinze cadeiras foram ocupadas pelos jurados. Após as cadeiras dos jurados, sentaram 95 alunos do CMRJ. Determine a quantidade de alunos do CMF que assistiram às apresentações.`, options: { 'A': `66 alunos`, 'B': `67 alunos`, 'C': `68 alunos`, 'D': `69 alunos`, 'E': `70 alunos` }, correct: 'C' },
        { id: 18, text: `A cadeira de maior número ocupada por um aluno do Colégio Militar do Rio de Janeiro (conforme o enunciado anterior) é a cadeira número:`, options: { 'A': `206.`, 'B': `207.`, 'C': `208.`, 'D': `209.`, 'E': `210.` }, correct: 'C' },
        { id: 19, text: `Na noite do dia 12 de julho, às 19 horas e 15 minutos, teve início as apresentações de cada colégio. A duração máxima de cada apresentação era de 7 minutos, e o intervalo entre uma apresentação e outra teria duração exata de 4 minutos. Sabe-se que a apresentação do CMF atrasou 5m32s e a do CMVM durou apenas 6m28s. Supondo que as outras utilizaram o tempo máximo e intervalos normais, determine depois de quantos minutos iniciou a apresentação do CMRJ. (Veja a tabela de ordem na prova).`, image: 'COLE_O_LINK_DA_IMAGEM_AQUI', options: { 'A': `117 minutos.`, 'B': `120 minutos.`, 'C': `121 minutos.`, 'D': `125 minutos.`, 'E': `126 minutos.` }, correct: 'E' },
        { id: 20, text: `Determine a que horas terminou a apresentação do último Colégio Militar, conforme as regras da questão anterior.`, options: { 'A': `22h 01min`, 'B': `22h 05min`, 'C': `22h 08min`, 'D': `22h 12min`, 'E': `22h 15min` }, correct: 'A' }
      ],
      portuguese: [
        { id: 21, text: `Releia a seguinte passagem do texto I: "Fisioterapeuta especialista em biomecânica da corrida, Raquel Castanharo desmistifica alguns mitos em relação à modalidade". \n\nA palavra em destaque ("desmistifica") tem o valor semântico de:`, options: { 'A': `tornar místico.`, 'B': `ratificar alguns mitos.`, 'C': `privar da falsa imagem.`, 'D': `incentivar a indiferença.`, 'E': `reforçar ideias preconcebidas.` }, correct: 'C' },
        { id: 22, text: `Releia a seguinte passagem do texto I: "Então, em vez de se assustar com a possibilidade de correr e se machucar, quero te fornecer ferramentas para ter uma vida saudável na corrida e também desmistificar algumas crenças." \n\nNesse fragmento, nota-se a interação com o leitor. É possível afirmar que a autora:`, options: { 'A': `utiliza suas próprias crenças para influenciar o leitor.`, 'B': `denota impessoalidade ao lançar mão da palavra "quero".`, 'C': `promove aproximação com o leitor por meio da palavra "te".`, 'D': `ao usar a palavra "assustar", busca um afastamento dos leitores.`, 'E': `mantém a neutralidade de seu discurso por se tratar de texto jornalístico.` }, correct: 'C' },
        { id: 23, text: `Assinale a única alternativa que apresenta uma dedução possível a respeito do seguinte trecho do texto I: "Nós, seres humanos, somos animais corredores. Não somos baleias ou golfinhos feitos apenas para ficar na água."`, options: { 'A': `"Mas nem tudo são flores".`, 'B': `"Às vezes, é necessário ajustar a demanda[...]".`, 'C': `"[...] em algum momento você pode precisar de um médico[...]".`, 'D': `"Buscar ajuda profissional cientificamente embasada ajuda as pessoas[...]".`, 'E': `"O primeiro mito é que a corrida causa mais lesões do que outros esportes".` }, correct: 'E' },
        { id: 24, text: `A chave é equilibrar sua capacidade e demanda. Capacidade é o que seu joelho, seu pé, seu tendão suportam, e demanda é o que você está fazendo com o seu corpo. (texto 1) \n\nA frase destacada no excerto acima, de acordo com o sentido global do texto, significa que a:`, options: { 'A': `demanda deve se adequar à capacidade do corredor.`, 'B': `capacidade sempre evolui conforme o aumento da demanda.`, 'C': `demanda traduz a resistência corporal aos desgastes do esporte.`, 'D': `capacidade, e não a demanda, é a causa para o desgaste do atleta.`, 'E': `demanda e capacidade em equilíbrio implicam perda do condicionamento.` }, correct: 'A' },
        { id: 25, text: `Na passagem do texto I apresenta-se o conceito de "autoeficácia": "Existe um conceito chamado autoeficácia, que é quando você sabe que sua saúde está em suas mãos e possui ferramentas para cuidar dela...". Da leitura, pode-se dizer que a "autoeficácia" refere-se necessariamente ao conceito de:`, options: { 'A': `altruísmo.`, 'B': `autoajuda.`, 'C': `proatividade.`, 'D': `imperiosidade.`, 'E': `individualismo.` }, correct: 'C' },
        { id: 26, text: `No texto I, as duas ocorrências do ponto de interrogação (linhas 15 e 25) indicam:`, options: { 'A': `interação explícita do autor com o leitor.`, 'B': `dúvidas trazidas previamente por leitores.`, 'C': `perguntas cuja resposta todos sabem previamente.`, 'D': `dilemas do próprio autor externalizados em seu texto.`, 'E': `questionamentos a serem respondidos, no texto, pelos leitores.` }, correct: 'A' },
        { id: 27, text: `No 1º parágrafo do texto I, o autor afirma que "(...) nós, seres humanos, somos animais corredores." Nesse caso, o par de vírgulas utilizado isola um termo cuja função é:`, options: { 'A': `negar.`, 'B': `explicar.`, 'C': `enumerar.`, 'D': `amplificar.`, 'E': `exemplificar.` }, correct: 'B' },
        { id: 28, text: `Uma das marcas desse diálogo do autor com o interlocutor no texto I é o uso de:`, options: { 'A': `jargões da área médica.`, 'B': `estudos publicados sobre essa prática.`, 'C': `pronome de tratamento "você", distanciando autor e leitor.`, 'D': `formalidade no discurso.`, 'E': `verbos na 1ª pessoa do singular como "quero" e "vou", aproximando leitor e produtor.` }, correct: 'E' },
        { id: 29, text: `Ao afirmar que "(...) O primeiro mito é que a corrida causa mais lesões do que outros esportes. Isso não é verdade.", o texto I incita o leitor a pensar que há outros mitos. Qual é o 2º mito mencionado implicitamente pelo texto?`, options: { 'A': `Transtornos de humor e de bipolaridade.`, 'B': `Eliminação do sedentarismo pela corrida.`, 'C': `Eliminação da obesidade e do sedentarismo.`, 'D': `Prejuízo às articulações, como as do joelho.`, 'E': `Resolução de problemas emocionais com a prática.` }, correct: 'D' },
        { id: 30, text: `Segundo o texto II, "o uso da corrida como escapismo para suprir emoções negativas [...] pode levar à dependência do exercício...". Nesse contexto, assinale a alternativa que melhor explique o sentido de "escapismo":`, options: { 'A': `saúde mental.`, 'B': `saída positiva.`, 'C': `fuga emocional.`, 'D': `estresse e pressão.`, 'E': `emoções negativas.` }, correct: 'C' },
        { id: 31, text: `O texto II defende que a corrida:`, options: { 'A': `é incapaz de gerar bem-estar emocional nos corredores.`, 'B': `mantém a saúde mental de seus praticantes.`, 'C': `prejudica o bem-estar físico dos corredores.`, 'D': `está necessariamente ligada a um vício.`, 'E': `nem sempre se vincula ao escapismo.` }, correct: 'E' },
        { id: 32, text: `Assinale a opção em que o autor do texto II defende uma ideia de forma impositiva:`, options: { 'A': `"Essa fixação na corrida pode transformar [...]"`, 'B': `"Stenseng espera descobrir de forma mais concreta"`, 'C': `"É crucial reconhecer que somente a corrida não pode resolver[...]"`, 'D': `"[...] estudos recentes sugerem que essa abordagem pode ter consequências"`, 'E': `"Você faz algo que é bom para sua saúde física, mas, na verdade, destrói sua saúde mental"` }, correct: 'C' },
        { id: 33, text: `Comparando-se os textos I e II, pode-se perceber que:`, options: { 'A': `o texto I apresenta um enfoque puramente fisiológico reforçado pelo texto II.`, 'B': `se aproximam já que ambos enfocam os benefícios da corrida em seus aspectos globais.`, 'C': `se distanciam pelas abordagens sobre dimensões corporais e emocionais, respectivamente.`, 'D': `o texto II reforça as ideias do texto I, acerca dos malefícios da corrida.`, 'E': `ambos os textos trabalham com a ideia dos benefícios e malefícios da corrida no bem-estar físico e psicológico dos atletas.` }, correct: 'C' },
        { id: 34, text: `Releia o seguinte excerto do texto II: "O estudo, publicado na revista Frontiers in Psychology, explora o uso da corrida como escapismo para suprir emoções negativas e como isso pode levar à dependência do exercício e à diminuição da sensação de bem-estar geral." A passagem acima pode ser reescrita, sem prejuízo de seu sentido, da seguinte forma:`, options: { 'A': `O estudo - veiculado na revista Frontiers in Psychology - analisa o uso da corrida como escapismo com o fito de suprir emoções negativas e como isso pode levar à dependência do exercício e à redução da sensação de bem-estar geral.`, 'B': `O estudo (presente na revista...) explora o uso da corrida como escapismo para alimentar emoções negativas...`, 'C': `O trabalho, publicado na revista... menciona o uso da corrida como escapismo para atenuar emoções negativas e como isso pode levar à preterição do exercício...`, 'D': `O estudo (publicado na revista...) explora, o uso da corrida, como escapismo para recrudescer emoções negativas...`, 'E': `O estudo publicado na revista... discorre sobre o uso da corrida como escapismo para aumentar emoções negativas...` }, correct: 'A' },
        { id: 35, text: `Releia o seguinte fragmento do texto III: "Quando corre, a pessoa libera endorfinas, que ajudam principalmente no bem-estar, na sensação de prazer e saciedade", explica o médico do esporte João Branco. No excerto, a expressão destacada ("a pessoa"), no contexto em que é apresentada, refere-se a:`, options: { 'A': `todos os corredores.`, 'B': `todos os leitores do texto.`, 'C': `todas as pessoas indistintamente.`, 'D': `apenas aos corredores de alto desempenho.`, 'E': `todos os atletas de quaisquer modalidades esportivas.` }, correct: 'A' },
        { id: 36, text: `Apesar dos inúmeros benefícios, a corrida precisa ser praticada de forma balanceada, não adianta correr de forma esporádica ou de forma desenfreada. (texto III) No excerto acima, as palavras em destaque ("esporádica" e "desenfreada") significam, respectivamente:`, options: { 'A': `casual e contida.`, 'B': `acidental e recatada.`, 'C': `proposital e moderada.`, 'D': `numerosa e desmedida.`, 'E': `espaçada e incontrolável.` }, correct: 'E' },
        { id: 37, text: `A respeito do texto III, assinale a alternativa que visa dar mais credibilidade às ideias defendidas pelo autor:`, options: { 'A': `"A prática de atividades físicas é um dos pilares..."`, 'B': `"Afinal, a atividade gera uma série de benefícios..."`, 'C': `"[...] a corrida precisa ser praticada de forma balanceada [...]"`, 'D': `"A corrida está entre um dos exercícios mais populares..."`, 'E': `"Segundo o médico, não há um horário ideal para correr"` }, correct: 'E' },
        { id: 38, text: `Após a leitura dos três textos apresentados, é possível afirmar que:`, options: { 'A': `apenas os textos II e III contêm a opinião de especialistas.`, 'B': `o texto III se limita a tratar aspectos relacionados ao bem-estar emocional.`, 'C': `o texto II se diferencia dos textos I e III por não enfatizar o aspecto fisiológico da corrida.`, 'D': `os textos II e III apresentam perspectivas equivalentes sobre a corrida...`, 'E': `todos os textos apresentados citam argumentos que corroboram os benefícios da corrida...` }, correct: 'C' },
        { id: 39, text: `[Texto IV] A tirinha abaixo apresenta um importante subentendido, que é o (a):`, image: 'COLE_O_LINK_DA_IMAGEM_AQUI', options: { 'A': `chegada da maturidade de forma precoce e consistente.`, 'B': `maturidade representou a continuidade do sedentarismo.`, 'C': `construção de hábitos permanentes e saudáveis na adolescência.`, 'D': `conscientização em prol do bem-estar e da saúde começa na escola.`, 'E': `forma como mudamos em relação às nossas posturas infantojuvenis.` }, correct: 'E' },
        { id: 40, text: `Ao compararmos os quatro textos dessa prova e interpretarmos seus principais pontos de vista, pode-se deduzir da passagem do 1º quadrinho para o 2º quadrinho (Texto IV) que a ausência de colegas praticando atividades físicas aos 30 anos deve-se principalmente ao fato de que:`, options: { 'A': `lesões ocorrem ao longo do tempo e impossibilitam a continuidade das atividades físicas.`, 'B': `conscientização e tomada de atitudes em prol da saúde ocorrem de maneira generalizada.`, 'C': `saúde e bem-estar podem ser mantidos sem necessariamente ocorrer a prática de atividades físicas.`, 'D': `corridas geram dependência física e mental e que, por isso, seus atletas a abandonam ao longo do tempo.`, 'E': `sedentarismo é um fato visível e latente atualmente e, desse modo, a corrida ou qualquer outra prática não serão prioridades.` }, correct: 'E' }
      ]
    },
    '2024-2025': {
      year: '2024-2025',
      texts: {
        portuguese: [
          { 
            title: 'TEXTO I - A LEBRE E A TARTARUGA', 
            content: `[COLE AQUI TODO O TEXTO I DA PROVA DE 2024-2025]` 
          },
          { 
            title: 'TEXTO II - AMOR PRA RECOMEÇAR', 
            content: `[COLE AQUI TODO O TEXTO II DA PROVA DE 2024-2025]` 
          },
          { 
            title: 'TEXTO III - DISCIPLINA EM SALA DE AULA...', 
            content: `[COLE AQUI TODO O TEXTO III DA PROVA DE 2024-2025]` 
          }
        ]
      },
      math: [
        { id: 1, text: `Observe o gráfico abaixo que apresenta a quantidade de clientes em dois restaurantes, durante seis dias.\n\nA média diária de clientes no Bistrô Carioca, nesses seis dias, foi de 513 e no Família Tijucana, de 518. Com base nessas informações, é correto afirmar que`, image: 'COLE_O_LINK_DA_IMAGEM_AQUI', options: { 'A': `o Bistrô Carioca e o Família Tijucana tiveram mais clientes no mesmo dia.`, 'B': `no "Dia 4", houve a menor diferença no número de clientes entre os dois restaurantes.`, 'C': `o número de clientes do Família Tijucana foi abaixo de sua média diária em, no máximo, um dia.`, 'D': `se no "Dia 2", o Família Tijucana tivesse recebido mais dez clientes, o número de clientes, nesse dia, seria maior que sua média diária nesses seis dias.`, 'E': `o Bistrô Carioca teve menos clientes que o Família Tijucana em quatro dias.` }, correct: 'E' },
        { id: 2, text: `Atualmente, no colete usado pelos jogadores profissionais de futebol, existe um aparelho que funciona como GPS (Global Positioning System) e que pode informar a distância que o jogador correu durante a partida.\n\nConsiderando um campo de futebol, em formato retangular, com 105 metros de comprimento por 45 metros de largura, quantas voltas daria, em torno desse campo, um jogador que correu 9400 metros durante a partida?`, options: { 'A': `2821/99`, 'B': `282/9`, 'C': `299/9`, 'D': `3389/99`, 'E': `319/9` }, correct: 'B' },
        { id: 3, text: `Segundo reportagem do site UOL, de 25/04/2021, existem histórias que contam que o biscoito da sorte, comum em restaurantes chineses, tem sua origem na China; outras, no Japão e algumas, nos Estados Unidos. Com uma massa sequinha e oco por dentro, esse biscoito possui, em seu interior, um papel com uma frase, contendo uma mensagem, a partir de provérbios com lições de vida.\n\nNo biscoito da sorte que se encontra no Brasil, além da frase, é possível encontrar, no verso, sugestões de seis números para a loteria. Observe os números nas imagens a seguir.\n\nConsidere dois numerais: o primeiro, formado pelos seis números da Imagem 1, escritos um ao lado do outro, na ordem em que aparecem; e o segundo, formado da mesma maneira, porém com os seis números da Imagem 2. Com base nesses dois numerais formados, é correto afirmar que`, image: 'COLE_O_LINK_DA_IMAGEM_AQUI', options: { 'A': `os dois numerais possuem a mesma quantidade de classes e ordens.`, 'B': `o primeiro numeral é maior que o segundo.`, 'C': `três algarismos de um numeral possuem o mesmo valor relativo que três algarismos do outro numeral.`, 'D': `a soma dos valores absolutos dos algarismos da segunda classe de um dos numerais é igual à soma dos valores absolutos dos algarismos da última classe do outro numeral.`, 'E': `um dos numerais possui uma classe com os mesmos algarismos de uma classe do outro numeral.` }, correct: 'C' },
        { id: 4, text: `No fim do ano passado, as mães das crianças da creche Pula-Pula resolveram fazer um "feirão de trocas" de brinquedos e livros, de modo a darem um destino mais sustentável aos materiais que seus filhos não usavam mais. Elas combinaram que:\n- 10 livros equivaleriam a 4 kits de blocos de montar;\n- 3 kits de blocos de montar equivaleriam a 7 bonecos e\n- 6 bonecos equivaleriam a R$ 240,30.\n\nNesse sistema de trocas, cada livro custou`, options: { 'A': `R$ 36,20.`, 'B': `R$ 37,38.`, 'C': `R$ 37,80.`, 'D': `R$ 38,24.`, 'E': `R$ 38,50.` }, correct: 'B' },
        { id: 5, text: `A fim de arrecadar dinheiro para sua formatura, Leca decidiu rifar uma cesta de chocolates e disponibilizou os 60 números da tabela abaixo para vender entre seus amigos.\n\nQuando Dani foi escolher o seu número, resolveu que ele deveria satisfazer as seguintes condições:\n- O número escolhido deveria ter 2 algarismos: um deles sendo par e o outro, ímpar.\n- O número escolhido não deveria ser divisível por 6, nem por 7.\n- Quando fosse dividir o número escolhido por 5, o resto deveria ser 2 ou 4.\n- Ao trocar a ordem dos algarismos, o número escolhido deveria continuar sendo um número contido na tabela.\n\nAo perceber que três números dessa tabela satisfaziam suas condições, Dani comprou os três. A soma desses três números é`, image: 'COLE_O_LINK_DA_IMAGEM_AQUI', options: { 'A': `66.`, 'B': `84.`, 'C': `86.`, 'D': `118.`, 'E': `124.` }, correct: 'D' },
        { id: 6, text: `Ricardo estava no parque de diversões, e os seus três brinquedos favoritos (Brinquedos 1, 2 e 3) tinham filas de tamanhos diferentes. Em cada um desses brinquedos, um grupo de crianças da fila entrava, brincava e saía, dando lugar para um novo grupo de crianças entrar.\n\nRicardo contou quantas crianças havia na fila de cada brinquedo. Como ele sabia quantas crianças entravam em cada grupo e quanto tempo levava a brincadeira, montou a seguinte tabela.\n\nPara decidir o brinquedo que iria, Ricardo considerou o tempo de espera, em minutos, para chegar a sua vez de brincar. Escolhendo o brinquedo [lacuna 1] o tempo de espera de Ricardo será um número [lacuna 2]. Assinale a alternativa que completa corretamente as duas lacunas da afirmativa acima.`, image: 'COLE_O_LINK_DA_IMAGEM_AQUI', options: { 'A': `3 - divisível por 7`, 'B': `2 - divisível por 9`, 'C': `1 - múltiplo de 13`, 'D': `3 - múltiplo de 11`, 'E': `1 - divisível por 15` }, correct: 'C' },
        { id: 7, text: `Na gravação de uma cena de um filme de faroeste, foi contratada uma quantidade mínima de figurantes. Todos deveriam usar uma calça, uma camisa, um par de botas e um chapéu. Esses vestuários chegavam ao set de filmagens embalados em caixas. Cada caixa de calças atendia a 90 figurantes; de camisas, a 120 figurantes; de botas, a 25 figurantes e de chapéus, a 180 figurantes.\n\nConsiderando que não houve sobras de vestuário em nenhuma das caixas e todos os figurantes ficaram vestidos de acordo com o previsto, qual a quantidade total de caixas necessárias para atendê-los?`, options: { 'A': `83`, 'B': `90`, 'C': `117`, 'D': `155`, 'E': `180` }, correct: 'C' },
        { id: 8, text: `Durante a Feira das Nações, realizada no CMRJ em 2024, os professores de cada uma das cinco disciplinas envolvidas atribuíram uma nota de 0,0 a 10,0 para cada turma. A nota final da turma corresponde à média aritmética dessas cinco notas. \n\nUma das turmas ficou com nota final 8,3, mas esperava ter ficado com uma nota final maior. Por isso, solicitou revisão das notas dadas pelos professores de cada disciplina. Ficou constatado que, de fato, uma delas havia sido digitada incorretamente. Após a correção, a nota final da turma passou a ser 9,7.\n\nA partir dessas informações, conclui-se que a diferença entre as notas digitadas correta e incorretamente é`, options: { 'A': `1,4.`, 'B': `3,6.`, 'C': `5,0.`, 'D': `7,0.`, 'E': `8,4.` }, correct: 'D' },
        { id: 9, text: `Um dos atributos do aluno do Colégio Militar é jamais faltar a verdade, ou seja, jamais mentir. Para isso, é necessário ter HONRA. O aluno Fábio, do CMRJ, resolveu fazer um teste com a aluna Jaqueline, sua amiga. Ele montou a tabela abaixo com as letras "C", "M", "R" e "J" e as associou às letras "H", "O", "N", "R" e "A", da seguinte forma:\n\nFábio perguntou se sua amiga saberia qual letra da palavra HONRA estaria relacionada à letra J que apareceria pela 2024ª vez. Jaqueline acertou. Qual foi a resposta dela?`, image: 'COLE_O_LINK_DA_IMAGEM_AQUI', options: { 'A': `H`, 'B': `O`, 'C': `N`, 'D': `R`, 'E': `A` }, correct: 'A' },
        { id: 10, text: `Nicole vai fazer uma festa de 15 anos e deseja enfeitar cada mesa do salão com um pequeno vaso de flores, contendo tulipas e rosas. Ela deseja fazer o maior número de vasos, todos idênticos, e com a mesma quantidade de tulipas e a mesma quantidade de rosas em cada um deles.\n\nSabendo que a floricultura fará a entrega de 108 tulipas e 72 rosas para a confecção desses vasos e que todas as flores serão usadas, é correto afirmar que`, options: { 'A': `cada vaso possuirá 6 tulipas.`, 'B': `serão montados 5 vasos com 36 flores cada.`, 'C': `cada vaso possuirá 5 flores.`, 'D': `serão montados 18 vasos com 10 flores cada.`, 'E': `cada vaso possuirá 8 rosas.` }, correct: 'C' },
        { id: 11, text: `Dois corredores A e B percorreram um trajeto de 10 quilômetros e combinaram alcançar juntos a linha de chegada. Ambos saíram juntos do ponto de largada. Em 1 hora, o corredor A conseguiu correr 8 quilômetros e seguiu nesse ritmo até completar o trajeto. \n\nO corredor B, inicialmente, fez a primeira metade do trajeto em 1 hora. Neste momento, ao perceber que estava muito atrás do corredor A, o corredor B aumentou seu ritmo de corrida para chegarem juntos à linha de chegada.\n\nSe o corredor B tivesse mantido sempre o mesmo ritmo dessa segunda metade do trajeto, teria sido capaz de correr, em 1 hora, a distância de`, options: { 'A': `10 km.`, 'B': `13 km.`, 'C': `16 km.`, 'D': `20 km.`, 'E': `24 km.` }, correct: 'D' },
        { id: 12, text: `Em uma partida de vôlei entre o Colégio Militar do Rio de Janeiro (CMRJ) e o Colégio Militar de Juiz de Fora (CMJF), foi distribuída uma camisa para cada um dos torcedores presentes nas seguintes condições:\n- Cada um dos 56 torcedores do CMRJ ganhava uma camisa com as letras "C", "M", "R" ou "J".\n- Cada um dos 28 torcedores do CMJF ganhava uma camisa com as letras "C", "M", "J" ou "F".\n- Cada um dos 126 torcedores neutros ganhava uma camisa com as letras "C" ou "M".\n\nEntre os torcedores do CMRJ, foi distribuída a mesma quantidade de camisas com as letras "C", "M", "R" e "J". O mesmo aconteceu entre os torcedores do CMJF e entre os torcedores neutros. No fim da partida, a bola do jogo foi sorteada entre os torcedores. Qual a probabilidade de o sorteado ter recebido a camisa com a letra "C"?`, options: { 'A': `10%`, 'B': `16%`, 'C': `32%`, 'D': `40%`, 'E': `45%` }, correct: 'D' },
        { id: 13, text: `Os alunos do CMRJ, Álvaro, Bernardo, Caio, Diego e Eduardo, atletas do time de basquete, estavam treinando corrida, a fim de ganharem resistência. O treinamento se dava da seguinte maneira: o aluno corria 25 metros, batia numa parede e retornava ao ponto inicial. Somente nesse momento, o próximo aluno, partindo do mesmo ponto, iniciava, imediatamente, a sua corrida, fazendo o mesmo percurso.\n\nO primeiro a correr foi o aluno Álvaro, seguido por Bernardo, depois por Caio, por Diego e, por último, Eduardo, reiniciando novamente com Álvaro e assim sucessivamente. Na tabela a seguir, encontra-se o tempo, em segundos, que cada um dos alunos levava para completar seu percurso.\n\nSe Álvaro iniciou o treinamento exatamente às 9 h 00 min 00 s, quem estava correndo quando o relógio marcava exatamente 9 h 27 min 20 s?`, image: 'COLE_O_LINK_DA_IMAGEM_AQUI', options: { 'A': `Álvaro`, 'B': `Bernardo`, 'C': `Caio`, 'D': `Diego`, 'E': `Eduardo` }, correct: 'C' },
        { id: 14, text: `Existem 11 planificações diferentes do cubo. A figura abaixo mostra uma planificação de um cubo em cujas faces laterais foram escritas as letras C, M, R e J. Uma outra planificação possível para esse mesmo cubo é`, image: 'COLE_O_LINK_DA_IMAGEM_AQUI', options: { 'A': `Opção (A) da prova.`, 'B': `Opção (B) da prova.`, 'C': `Opção (C) da prova.`, 'D': `Opção (D) da prova.`, 'E': `Opção (E) da prova.` }, correct: 'A' },
        { id: 15, text: `Júlia está juntando sua mesada para comprar um videogame. Para ajudar na compra, sua avó deu a ela R$ 300,00 de presente no Dia das Crianças, o que corresponde a 1 1/2 (um inteiro e um meio) de sua mesada. Pelos cálculos de Júlia, 9 meses de mesada correspondem a 75% do valor total do videogame. \n\nSendo assim, a ajuda da avó de Júlia correspondeu a qual porcentagem do valor total do videogame?`, options: { 'A': `5,0%`, 'B': `12,5%`, 'C': `15,0%`, 'D': `18,5%`, 'E': `25,0%` }, correct: 'B' },
        { id: 16, text: `Na malha quadriculada abaixo, onde cada quadradinho mede 1 cm², foram construídos três triângulos, nomeados ADEF, ADGF, ∆HIC e identificados pelos números 1, 2 e 3, respectivamente.\n\nComparando as áreas desses triângulos com a área de um quadrado de lado 32 mm, é correto afirmar que`, image: 'COLE_O_LINK_DA_IMAGEM_AQUI', options: { 'A': `a área do triângulo 1 é maior que a área do quadrado.`, 'B': `a área do quadrado é igual à área do triângulo 2.`, 'C': `a área do triângulo 3 é menor que a área do quadrado.`, 'D': `o dobro da área do quadrado é maior que a soma das áreas dos triângulos 2 e 3.`, 'E': `o triplo da área do quadrado é menor que soma das áreas dos triângulos 1, 2 e 3.` }, correct: 'E' },
        { id: 17, text: `Cecília aproveitou um período da manhã de sábado para estudar Língua Portuguesa, Redação e Matemática, realizando alguns intervalos para beber água e fazer um lanche rápido. Utilizou 1/6 do período para resolver exercícios de Língua Portuguesa e, depois, 3/10 do restante do período para fazer uma Redação. Em seguida, gastou 1/2 do período para a resolução de questões de Matemática. \n\nOs intervalos realizados por Cecília consumiram 28 minutos do período. Quantos minutos ela gastou para fazer a Redação, sabendo que não foi feito nenhum intervalo durante essa atividade?`, options: { 'A': `56`, 'B': `84`, 'C': `100`, 'D': `140`, 'E': `168` }, correct: 'B' },
        { id: 18, text: `Ivy tem uma piscina plástica, no formato de um paralelepípedo com todas as faces retangulares, cujo fundo tem medidas internas de 1,8 m de comprimento por 1,2 m de largura e deseja enchê-la até que o nível de água atinja 60 cm. \n\nDespejando na piscina 36 baldes grandes de água, completamente cheios, Ivy percebeu que o nível da água atingiu 20 cm. Nesse momento, o balde quebrou e, para finalizar o enchimento da piscina, foi necessário usar um outro balde com capacidade 25% menor que o anteriormente usado.\n\nQual a quantidade de baldes menores, completamente cheios de água, que Ivy ainda precisará despejar na piscina para atingir o nível desejado?`, options: { 'A': `36`, 'B': `48`, 'C': `64`, 'D': `72`, 'E': `96` }, correct: 'E' },
        { id: 19, text: `Em um passeio em família, Jorge levou embalagens com bebidas em uma caixa de isopor, de formato cúbico, cujas arestas internas mediam 28 cm. Para manter as bebidas geladas, Jorge colocou cubinhos de gelo dentro do isopor, sendo o volume de gelo colocado igual a 2/5 do volume total das bebidas (desconsidere o volume das embalagens).\n\nAo final do passeio, toda a bebida havia sido consumida e suas embalagens haviam sido jogadas na lixeira. Nenhum cubinho de gelo foi retirado do isopor durante o passeio. Sendo assim, a água formada pelo derretimento de todos os cubinhos de gelo atingiu uma altura de 3 cm.\n\nSabendo que cada embalagem possuía 420 mL (mililitros) de bebida, a quantidade de embalagens colocadas no isopor, para esse passeio em família, é um número múltiplo de`, options: { 'A': `3.`, 'B': `5.`, 'C': `7.`, 'D': `9.`, 'E': `11.` }, correct: 'C' },
        { id: 20, text: `Ana, Bia e Cida distribuíram um saco de jujubas em três potes iguais, preenchendo, inicialmente, dois terços do pote de Ana, três quartos do pote de Bia e um sexto do pote de Cida. Como cada uma delas queria encher completamente dois potes iguais aos três iniciais, elas abriram mais sacos de jujubas, idênticos ao primeiro, um de cada vez, e distribuíram as jujubas até completar inteiramente os seis potes, restando um pouco de jujubas apenas no último saco.\n\nAs jujubas restantes seriam suficientes para ocupar que fração de um outro pote, idêntico aos demais?`, options: { 'A': `1/3`, 'B': `3/10`, 'C': `7/12`, 'D': `1/6`, 'E': `1/2` }, correct: 'A' }
      ],
      portuguese: [
        { id: 21, text: `O texto I é uma fábula, ou seja, uma história na qual animais assumem características próprias do ser humano, participando como personagens da narrativa e, em sua parte final, há um ensinamento. Considerando os dois primeiros parágrafos, a tartaruga e a lebre apresentam, respectivamente, um comportamento caracterizado pela`, options: { 'A': `acolhida e vaidade.`, 'B': `indecisão e grosseria.`, 'C': `gentileza e humildade.`, 'D': `inconstância e modéstia.`, 'E': `prepotência e arrogância.` }, correct: 'E' },
        { id: 22, text: `De acordo com o contexto, uma palavra pode adquirir diferentes significados. Analise as frases a seguir e marque a opção em que a palavra "mole" esteja sendo usada com o mesmo sentido em que foi empregada no seguinte fragmento da fábula (Texto I).\n\n"Um dia uma tartaruga começou a contar vantagem, dizendo que corria muito depressa e que a lebre era muito mole." (l. 01-02)`, options: { 'A': `O sorvete está derretendo e ficando muito mole.`, 'B': `Gosto de comer ovo frito com a gema bem mole.`, 'C': `Concluiu a tarefa bem devagar, pois era muito mole.`, 'D': `O dente estava tão mole que acabou caindo sozinho.`, 'E': `A prova estava muito mole, logo todos acertaram tudo.` }, correct: 'C' },
        { id: 23, text: `Em dois momentos da fábula (Texto I), são empregadas as aspas, cujo objetivo é`, options: { 'A': `mostrar um diálogo.`, 'B': `explicar a fala da lebre.`, 'C': `marcar a fala do narrador.`, 'D': `indicar a fala da tartaruga.`, 'E': `reproduzir o pensamento da lebre.` }, correct: 'E' },
        { id: 24, text: `Releia as passagens do texto transcritas a seguir e assinale a alternativa que contém a explicação CORRETA, de acordo com o contexto, sobre os sentidos das palavras destacadas.\n\n"Depois de brincar, resolveu tirar uma soneca à sombra fresquinha de uma árvore." (l. 07-08)\n"Enquanto isso, lá vinha a tartaruga com seu jeitão" (l. 10-11)`, options: { 'A': `Fresquinha indica o frescor pequeno enquanto jeitão se refere a um defeito da tartaruga.`, 'B': `Fresquinha indica fragilidade grande enquanto jeitão se refere a uma irritação intensa da tartaruga.`, 'C': `Fresquinha indica uma sombra bem arejada enquanto jeitão se refere a um modo de ser da tartaruga.`, 'D': `Fresquinha indica uma sombra muito recente enquanto jeitão se refere ao jeito desaforado da tartaruga.`, 'E': `Fresquinha indica uma sombra muito pequena enquanto jeitão se refere ao mediano tamanho da tartaruga.` }, correct: 'C' },
        { id: 25, text: `Ao longo da fábula (Texto I), o narrador emprega recursos como a oposição de ideias. O trecho da fábula que ilustra essa oposição é`, options: { 'A': `"O dia estava quente, por isso lá pelo meio do caminho, a lebre teve a ideia de brincar" (l. 06-07)`, 'B': `"Se por acaso a tartaruga me passar, é só correr um pouco e fico na frente de novo" (l. 09)`, 'C': `"A lebre achava que não ia perder aquela corrida de jeito nenhum." (l. 10)`, 'D': `"Bem que a lebre se levantou e saiu zunindo, mas nem adiantava!" (l. 13-14)`, 'E': `"De longe, ela viu a tartaruga esperando por ela na linha de chegada." (l. 14)` }, correct: 'D' },
        { id: 26, text: `Toda história se organiza em torno de uma sequência de acontecimentos que estão interligados de forma a contribuírem para o desenvolvimento da narrativa. Uma dessas sequências em que se verifica uma relação de causa e consequência entre os fatos está presente no seguinte trecho do texto I:`, options: { 'A': `"E enquanto falava, a tartaruga ria e ria da lebre." (l. 02)`, 'B': `"Mas a lebre ficou mesmo impressionada foi quando a tartaruga resolveu apostar uma corrida com ela." (l. 02-03)`, 'C': `"Ora, a lebre dormiu tanto que esqueceu de prestar atenção na tartaruga." (l. 12)`, 'D': `"Quando ela acordou, cadê a tartaruga?" (l. 13)`, 'E': `"De longe, ela viu a tartaruga, esperando por ela na linha de chegada." (l. 14)` }, correct: 'C' },
        { id: 27, text: `Toda fábula apresenta uma moral, uma reflexão sobre algo que se procura ensinar. Na moral da fábula (Texto I) "A lebre e tartaruga", há o seguinte ensinamento:`, options: { 'A': `Aliar a paciência à constância permite atingir o sucesso.`, 'B': `Agir com lentidão e improviso garante realizar sonhos.`, 'C': `Persistir de forma displicente propicia obter resultados positivos.`, 'D': `Superar os obstáculos de forma irregular e contínua facilita ser vitorioso.`, 'E': `Atuar com hesitação e disciplina possibilita concretizar os objetivos da vida.` }, correct: 'A' },
        { id: 28, text: `Releia os seguintes versos: "Eu te desejo não parar tão cedo/Pois toda idade tem prazer e medo". A palavra destacada ("Pois") apresenta o sentido de`, options: { 'A': `explicação.`, 'B': `oposição.`, 'C': `finalidade.`, 'D': `conformidade.`, 'E': `consequência.` }, correct: 'A' },
        { id: 29, text: `Em "Quando você ficar triste, que seja por um dia, /E não o ano inteiro" (v. 05-06 do texto II), as partes destacadas "que seja por um dia / E não o ano inteiro" indicam que os momentos de tristeza`, options: { 'A': `são raros e podem ser evitados, desde que o sujeito seja forte.`, 'B': `acontecem, mas não precisam ser excessivamente prolongados.`, 'C': `parecem pequenos no tempo do relógio, mas são eternos na alma.`, 'D': `são ilusórios, mas, quando negligenciados, tornam-se reais e duradouros.`, 'E': `não deveriam ter acontecido, mas podem ser evitados e jamais se repetirem.` }, correct: 'B' },
        { id: 30, text: `Nos versos "Eu desejo que você ganhe dinheiro/ Pois é preciso viver também/E que você diga a ele, pelo menos uma vez, /Quem é mesmo o dono de quem" (v. 25 - 28 do texto II), é feito o seguinte alerta:`, options: { 'A': `Cultive outros valores para além do inútil dinheiro.`, 'B': `Enriqueça, pois o dinheiro é a maior fonte de felicidade.`, 'C': `Viva como se não houvesse amanhã, aproveite apenas o hoje.`, 'D': `Gaste toda sua vida trabalhando para acumular bens e riquezas.`, 'E': `Conquiste uma boa condição financeira, mas não se torne escravo do dinheiro.` }, correct: 'E' },
        { id: 31, text: `A repetição de palavras é um recurso comumente empregado pelos compositores que pode contribuir para a construção do ritmo e/ou para a produção de algum sentido. Na letra da música (Texto II), a expressão "Pra recomeçar" que aparece repetidamente, principalmente na última estrofe, indica um(a)`, options: { 'A': `dúvida sobre a importância do passado e do bem-estar do próximo.`, 'B': `valorização do humor entediante do dia a dia, cheio de mágoas, capaz de provocar muita ironia.`, 'C': `reação ao pensamento sonhador da vida cotidiana por não ter um momento extremamente dedicado ao descanso.`, 'D': `destaque na ideia de que é necessário saber construir novas oportunidades diante de negativas ou fracassos.`, 'E': `apagamento do desejo de se viver uma realidade acessível a todos com oportunidades marcadas por menos dificuldades sociais.` }, correct: 'D' },
        { id: 32, text: `Releia, abaixo, três versos retirados da letra da música "Pra recomeçar" (Texto II):\nI. "Eu te desejo não parar tão cedo" (v. 01)\nII. "E quando estiver bem cansado" (v.10)\nIII. "E não o ano inteiro" (v. 18)\n\nOs vocábulos destacados ("tão", "bem", "não") expressam, respectivamente, os sentidos de`, options: { 'A': `certeza, modo, oposição.`, 'B': `certeza, certeza, negação.`, 'C': `intensidade, modo, negação.`, 'D': `intensidade, intensidade, negação.`, 'E': `quantidade, quantidade, oposição.` }, correct: 'D' },
        { id: 33, text: `Segundo o texto III, há distintos entendimentos sobre o que seja a disciplina. Existe o que algumas pessoas frequentemente consideram ser a disciplina e aquilo que ela, de fato, é. Marque a alternativa em que tais entendimentos sobre a disciplina são, respectivamente, apresentados:`, options: { 'A': `A disciplina é considerada algo negativo, mas, na verdade, ela é subestimada.`, 'B': `A disciplina é considerada algo bom e frágil, mas, na verdade, ela é um desafio.`, 'C': `A disciplina é considerada algo eficaz, mas, na verdade, ela é muito improdutiva.`, 'D': `A disciplina é considerada algo desprezado, mas, na verdade, ela é de grande valia.`, 'E': `A disciplina é considerada algo muito bom, mas, na verdade, ela é desestruturadora.` }, correct: 'D' },
        { id: 34, text: `Releia o trecho do texto III a seguir: "No entanto, ela é a cola que mantém a dinâmica da sala de aula unida," (l. 02-03). De acordo com o contexto em que foi empregada, a palavra "cola" expressa sentido de um(a)`, options: { 'A': `sinal que se deixa ao se passar.`, 'B': `conexão entre as partes de um todo.`, 'C': `modo de se vigiar o comportamento de alguém.`, 'D': `meio de se obter desonestamente as respostas de uma prova.`, 'E': `substância grudenta usada para ligar materiais como madeira, papel etc.` }, correct: 'B' },
        { id: 35, text: `No texto III, há um comentário sobre a importância da disciplina na sala de aula hoje em dia. Imagine que o autor tivesse feito esse comentário, expressando uma possibilidade, projetando como a disciplina será importante no futuro. Nesse caso, a forma conjugada dos verbos precisaria ser modificada para adequadamente expressar essas ideias no futuro. \n\nFlexione os verbos entre parênteses no futuro do presente e marque a sequência CORRETA que preenche os espaços com (*).\n"A disciplina em sala de aula (*) (AFETAR) profundamente o comportamento dos alunos. Regras claras e expectativas bem definidas (*) (INCENTIVAR) o respeito mútuo, a responsabilidade e a autodisciplina. Os alunos (*) (APRENDER) a valorizar o tempo, a escutar os outros e a respeitar as diferenças, (*) (DESENVOLVER) habilidades importantes de resolução de conflitos e tomada de decisão."`, options: { 'A': `afetava, incentivam, aprendiam, desenvolviam.`, 'B': `afetará, incentivarão, aprenderão, desenvolverão.`, 'C': `afetará, incentivaram, aprenderam, desenvolveram.`, 'D': `afetará, incentivaram, aprenderão, desenvolveram.`, 'E': `afetaria, incentivariam, aprenderiam, desenvolveriam.` }, correct: 'B' },
        { id: 36, text: `De acordo com o texto III, as virtudes que um aluno pode adquirir se for estimulado a estudar com disciplina são as seguintes:`, options: { 'A': `perseverança, respeito e autocuidado.`, 'B': `responsabilidade, integridade e medo.`, 'C': `concentração, agilidade e amabilidade.`, 'D': `responsabilidade, respeito e integridade.`, 'E': `velocidade, submissão e tranquilidade.` }, correct: 'D' },
        { id: 37, text: `Releia o fragmento do texto III a seguir: "De fato, o envolvimento dos pais pode desempenhar um papel crucial na manutenção da disciplina. Entender como os pais podem ajudar e a importância do seu engajamento na educação dos filhos é fundamental para uma abordagem abrangente da disciplina." (l. 48-50)\n\nA palavra destacada ("seu") refere-se ao(s)`, options: { 'A': `filhos.`, 'B': `pais.`, 'C': `papel.`, 'D': `professores.`, 'E': `envolvimento.` }, correct: 'B' },
        { id: 38, text: `Ao abordar os impactos da disciplina na sala de aula, o texto III`, options: { 'A': `destaca insegurança do jovem diante da liberdade.`, 'B': `valoriza mais a criatividade do que a concentração.`, 'C': `reforça a capacidade de produção no caos criativo.`, 'D': `ressalta a importância da disciplina no caráter dos alunos.`, 'E': `revela a superioridade do professor em relação aos alunos.` }, correct: 'D' },
        { id: 39, text: `Em "Por fim, os pais podem se envolver ativamente na vida escolar dos filhos" (l. 59 do texto III), o sentido do vocábulo destacado (a palavra 'dos', que indica posse da vida escolar em relação aos filhos) é`, options: { 'A': `posse.`, 'B': `causa.`, 'C': `modo.`, 'D': `origem.`, 'E': `direção.` }, correct: 'A' },
        { id: 40, text: `Os textos I, II e III abordam uma atitude positiva para a construção de uma vida de sucesso. As palavras que representam, respectivamente, essa atitude são`, options: { 'A': `coragem, luta e superação.`, 'B': `união, amor e inteligência.`, 'C': `superação, perseverança e respeito.`, 'D': `transformação, competição e disciplina.`, 'E': `solidariedade, perseverança e aprendizado.` }, correct: 'C' }
      ]
    },
    '2025-2026': {
      year: '2025-2026',
      texts: {
        portuguese: [
          { 
            title: 'TEXTO I - TIRINHA (CARAMELO)', 
            content: `Atenção: O Texto I desta prova é uma tirinha em formato de imagem. Você a encontrará diretamente na questão 21.` 
          },
          { 
            title: 'TEXTO II - Quem tem medo de quê?', 
            content: `[COLE AQUI TODO O TEXTO II DA PROVA DE 2025-2026]` 
          },
          { 
            title: 'TEXTO III - Divertida Mente', 
            content: `[COLE AQUI TODO O TEXTO III DA PROVA DE 2025-2026]` 
          },
          { 
            title: 'TEXTO IV - O Leão Covarde', 
            content: `[COLE AQUI TODO O TEXTO IV DA PROVA DE 2025-2026]` 
          }
        ]
      },
      math: [
        { id: 1, text: `No gráfico abaixo, estão indicadas as temperaturas máximas e mínimas registradas nos 10 primeiros dias de agosto do presente ano, no Rio de Janeiro.\n\nCom base no gráfico, considere as seguintes afirmativas:\nI - A média das temperaturas mínimas foi inferior a 17,0°C.\nII - No dia 7 de agosto, foi registrada a maior diferença entre as temperaturas máxima e mínima em um mesmo dia.\nIII - Nos dias 1, 2 e 3 de agosto, a soma das temperaturas máximas é menor que 60,0°C.\nIV - Nos dias 5 e 9 de agosto, foram registradas as duas maiores temperaturas mínimas.\n\nÉ correto afirmar que são verdadeiras as afirmativas`, image: 'COLE_O_LINK_DA_IMAGEM_AQUI', options: { 'A': `I e IV.`, 'B': `III e IV.`, 'C': `II e III.`, 'D': `II e IV.`, 'E': `I, II e III.` }, correct: 'D' },
        { id: 2, text: `Mariana, aluna do 9º ano do Colégio Militar do Rio de Janeiro (CMRJ), participou de uma competição de corrida em que a pista tem seis pontos A, B, C, D, E e F. Mariana partiu do ponto A, passando por todos os demais pontos B, C, D e E, nessa ordem, até chegar a F. Sabe-se que as distâncias entre os pontos são: AB = 8.893 cm; BC = 1,1673 hm; CD = 0,22481 km; DE = 72.010 mm; e EF = 478,8 dm.\n\nQual foi a distância total percorrida por Mariana?`, options: { 'A': `5.503,6 mm`, 'B': `550,36 hm`, 'C': `550.360 cm`, 'D': `0,055036 km`, 'E': `55,036 dam` }, correct: 'E' },
        { id: 3, text: `Tito pediu à sua avó Patrícia que o ajudasse a comprar uma boneca de presente de aniversário para a sua irmã Ester. Patrícia, então, deu ao seu neto um cofre já com 30 moedas, sendo 10 moedas de R$1,00 e o restante de R$0,10. Tito juntará mais moedas colocando-as no cofre. Patrícia ainda combinou que, dois dias antes do aniversário, eles abririam o cofre e contariam o total acumulado; o que faltasse para a compra do presente, ela então completaria em dinheiro e, se fosse o caso, receberia o troco.\n\nNo dia da abertura do cofre, Tito, com a ajuda da sua avó, contou todas as moedas e as separou por valor. Tirando as moedas que já estavam no cofre, Tito conseguiu juntar mais 360 moedas, divididas assim:\n- 1 real: 1/4 das moedas;\n- 50 centavos: 1/3 das moedas;\n- 25 centavos: 2/5 das moedas; e\n- 10 centavos: o restante das moedas.\n\nSabendo que o valor da boneca é de R$ 237,80, é correto afirmar que Patrícia precisou completar o valor total acumulado no cofre com a quantia de`, options: { 'A': `R$ 30,00 e não teve troco.`, 'B': `R$ 35,00 e não teve troco.`, 'C': `R$ 40,00 e ainda teve troco de R$ 0,80.`, 'D': `R$ 45,00 e ainda teve um troco de R$ 2,40.`, 'E': `R$ 50,00 e ainda teve um troco de R$ 1,80.` }, correct: 'C' },
        { id: 4, text: `Guilherme gasta todo mês 0,25 do próprio salário com alimentação, 1/3 com aluguel e 1/8 com plano de saúde. Da quantia restante do seu salário após essas despesas, ele gasta 20%, o que equivale a R$ 595,00, com o plano de sua operadora de internet e TV.\n\nÉ correto afirmar que o salário de Guilherme é um valor entre`, options: { 'A': `R$ 4.000,00 e R$ 4.500,00.`, 'B': `R$ 4.501,00 e R$ 6.000,00.`, 'C': `R$ 6.001,00 e R$ 8.400,00.`, 'D': `R$ 8.401,00 e R$ 9.800,00.`, 'E': `R$ 9.801,00 e R$ 10.300,00.` }, correct: 'E' },
        { id: 5, text: `Bento, aluno do 6º ano do CMRJ, irá utilizar o cubo da figura 1, formado por cubinhos menores, para construir um "cubo esburacado". Para tal, em cada uma das três faces do cubo indicadas pelas setas na figura 2, Bento empurrará o cubinho central até sair pela face oposta, retirando todos os cubinhos no decorrer desse percurso (em linha reta), obtendo, enfim, o cubo esburacado. Considere que, nesse processo, os cubinhos não retirados permanecerão na mesma posição.\n\nConsidere a fração m/n, em que m é a quantidade de cubinhos retirados e n é a quantidade de cubinhos restantes. É correto afirmar que o produto 100 x (m/n) é um número`, image: 'COLE_O_LINK_DA_IMAGEM_AQUI', options: { 'A': `múltiplo de 3.`, 'B': `múltiplo de 4.`, 'C': `divisível por 6.`, 'D': `múltiplo de 7.`, 'E': `divisível por 9.` }, correct: 'D' },
        { id: 6, text: `Valéria, professora do CMRJ, deixou no quadro de uma das suas turmas o seguinte exercício:\n"Pense em um número M de 4 algarismos distintos, utilizando os números naturais de 1 a 9. A soma dos 4 algarismos distintos de M é 18, o algarismo das unidades é o quádruplo do algarismo da unidade de milhar e a diferença entre o algarismo das dezenas e o das centenas nessa ordem é 2. Determine, em algarismos romanos, a metade do número M."\n\nCinco alunos responderam ao desafio colocado pela professora, conforme a tabela abaixo:\n- Guilherme: MCLXVII\n- Rafael: MCLXXII\n- Rodrigo: MCXXIV\n- Isadora: MCLXXIX\n- Maria Luisa: MMCCCLVIII\n\nQual o(a) aluno(a) acertou a resposta do desafio?`, options: { 'A': `Rafael`, 'B': `Isadora`, 'C': `Rodrigo`, 'D': `Guilherme`, 'E': `Maria Luíza` }, correct: 'B' },
        { id: 7, text: `A Tenente Tassiana, professora do 6º ano do CMRJ, apresentou a seus alunos a planificação de uma caixa cúbica, conforme a figura a seguir.\nA professora perguntou: "Qual dos seguintes cubos é uma possível representação da referida caixa?".\n\nAssinale a única opção que responde corretamente à pergunta da Tenente Tassiana.`, image: 'COLE_O_LINK_DA_IMAGEM_AQUI', options: { 'A': `(A) da imagem`, 'B': `(B) da imagem`, 'C': `(C) da imagem`, 'D': `(D) da imagem`, 'E': `(E) da imagem` }, correct: 'C' },
        { id: 8, text: `A Tenente-Coronel Maria Elisa, professora de matemática do CMRJ, confeccionou oito fichas com números naturais, conforme a figura abaixo (109, 161, 221, 251, 263, 343, 637, 869). Em seguida, colocou essas fichas em um saquinho para sorteá-las.\n\nA Professora chamou o aluno Jorge para sortear uma ficha. Qual a probabilidade de que a ficha sorteada seja um número primo?`, image: 'COLE_O_LINK_DA_IMAGEM_AQUI', options: { 'A': `37,5%`, 'B': `50,0%`, 'C': `75,0%`, 'D': `87,5%`, 'E': `100,0%` }, correct: 'A' },
        { id: 9, text: `No laboratório de Matemática do CMRJ, há 3 sólidos, representados na imagem a seguir (um prisma triangular, um prisma pentagonal e um prisma hexagonal).\nÉ correto afirmar que a soma de todas as quantidades de arestas, faces e vértices dos 3 sólidos é um número entre`, image: 'COLE_O_LINK_DA_IMAGEM_AQUI', options: { 'A': `76 e 81.`, 'B': `80 e 85.`, 'C': `84 e 89.`, 'D': `88 e 93.`, 'E': `92 e 97.` }, correct: 'D' },
        { id: 10, text: `Sr. Alexandre é proprietário de um caminhão e cobra pelos serviços de transporte de acordo com o número de viagens e com a distância percorrida. Considere que o caminhão tenha uma caçamba na forma de um paralelepípedo retângulo, com dimensões internas iguais a 4 m de comprimento, 2,5 m de largura e 20 dm de altura.\n\nO Sr. Pimentel contratou os serviços do Sr. Alexandre para transportar os 72.000 litros de entulho de uma obra em seu sítio até um local da prefeitura, que recebe esse material, situado a 22.400 m do sítio.\nPor segurança, o Sr. Alexandre só carrega o caminhão até 90% da capacidade da caçamba. Ele cobra um valor fixo de R$ 750,00 por viagem para distâncias de até 20 km. Caso a distância ultrapasse 20 km, ele cobra o valor fixo mais R$ 50,00 por quilômetro excedente (mesmo que seja fração de km, conta-se como 1 km).\n\nConsiderando que, sempre que possível, em cada viagem será usado 90% da capacidade máxima da caçamba do caminhão, o valor total que o Sr. Pimentel pagará pelo transporte é igual a`, image: 'COLE_O_LINK_DA_IMAGEM_AQUI', options: { 'A': `R$ 3.450,00.`, 'B': `R$ 3.600,00.`, 'C': `R$ 3.750,00.`, 'D': `R$ 3.900,00.`, 'E': `R$ 4.050,00.` }, correct: 'B' },
        { id: 11, text: `Patrícia, Cátia e Maria, ex-alunas do CMRJ e muito amigas, concluíram o ensino médio no ano de 2015 e hoje trabalham na área de petróleo e gás. Elas trabalham por escala: Patrícia trabalha 5 dias seguidos e, após os quais, folga 1 dia; Cátia trabalha 6 dias consecutivos e, na sequência, folga 1 dia; Maria trabalha 7 dias ininterruptos e, em seguida, tem 1 dia de folga. Todas as vezes que as 3 amigas folgam no mesmo dia elas se reúnem para almoçar e "matar" a saudade dos tempos de alunas do CMRJ.\n\nConsidere que o período do ano de 2025 é assim distribuído por meses e dias: janeiro, março, maio, julho, agosto, outubro e dezembro têm 31 dias; fevereiro tem 28 dias; e abril, junho, setembro e novembro têm 30 dias.\nSabendo-se que elas almoçaram juntas em 9 de janeiro de 2025 e que mantiveram suas escalas de trabalho ao longo de todo o ano, qual foi o último dia em que elas se reencontraram para almoçar, ainda em 2025?`, options: { 'A': `26 de junho`, 'B': `27 de junho`, 'C': `28 de julho`, 'D': `07 de agosto`, 'E': `08 de agosto` }, correct: 'A' },
        { id: 12, text: `Um encontro no CMRJ reuniu 600 pessoas. Estavam presentes ex-professores (P), ex-alunos dos grêmios de Infantaria (INFA), Cavalaria (CAV), Artilharia (ART), Engenharia (ENG), Comunicações (COM) e Logística (LOG), com os seguintes quantitativos:\n- 1/3 de todas as pessoas presentes era ex-alunos de Infantaria (INFA);\n- 50% do número de ex-alunos Infantaria era igual à quantidade de ex-alunos do grêmio de Cavalaria (CAV) presentes;\n- 4/5 dos ex-alunos de Cavalaria era igual à quantidade de ex-alunos de Artilharia (ART) presentes;\n- 10% das pessoas presentes eram ex-alunos de Engenharia (ENG);\n- 1/4 do número de ex-alunos de Infantaria era igual à quantidade de ex-alunos de Comunicações (COM) presentes;\n- 5% das pessoas presentes eram ex-alunos de Logística (LOG) e\n- de todos os presentes, 80 pessoas eram ex-professores (P).\n\nConsidere M = (ENG + COM + LOG + P) / (INFA + CAV + ART). A soma do numerador e do denominador da fração irredutível de M é`, options: { 'A': `30.`, 'B': `40.`, 'C': `50.`, 'D': `60.`, 'E': `70.` }, correct: 'A' },
        { id: 13, text: `Maria quer muito estudar no CMRJ, portanto ela se inscreveu para realizar o processo seletivo deste ano. Exatamente no dia da prova, que acontece hoje, dia 19 de outubro, um domingo, Maria está fazendo aniversário.\nConsidere que um ano tem 365 dias e que o ano bissexto é um número múltiplo de 4 (como por exemplo, o ano de 1900) e, portanto, tem um dia a mais somado ao mês de fevereiro.\n\nSe Maria for aprovada, classificada dentro do número de vagas e matriculada para o ano letivo de 2026 no 6º ano do ensino fundamental, em qual dia cairá o aniversário de Maria no ano de 2032, quando ela estará cursando o último ano do ensino médio no CMRJ?`, options: { 'A': `Segunda-feira`, 'B': `Terça-feira`, 'C': `Quinta-feira`, 'D': `Sábado`, 'E': `Domingo` }, correct: 'B' },
        { id: 14, text: `O sistema de notas do ensino médio dos Colégios Militares funciona da seguinte forma:\n- O ano letivo é dividido em 3 trimestres.\n- Cada trimestre possui 3 avaliações: A1, A2 e A3 no 1º Trimestre; A4, A5 e A6 no 2º Trimestre; e A7, A8 e A9 no 3º Trimestre.\n- A nota do trimestre é a média aritmética das 3 avaliações.\n- A nota final do aluno é a média aritmética dos 3 trimestres.\n- A nota final para aprovação direta do aluno é 6,0.\n\nO quadro da prova mostra as avaliações da aluna Letícia no ano de 2024 em Matemática, contendo símbolos substituindo algumas avaliações. Qual foi, então, a nota que a aluna Letícia tirou na avaliação A5?`, image: 'COLE_O_LINK_DA_IMAGEM_AQUI', options: { 'A': `4,2`, 'B': `5,2`, 'C': `6,6`, 'D': `7,4`, 'E': `8,4` }, correct: 'A' },
        { id: 15, text: `O CMRJ recebeu um carregamento de 728 carteiras brancas, 1183 carteiras verdes e 819 carteiras azuis. Todas as carteiras deverão ser distribuídas pelas salas de aulas do colégio, respeitando-se o seguinte:\n- as salas de aula mobiliadas deverão ter somente carteiras das 3 cores;\n- as carteiras devem mobiliar o maior número possível de salas;\n- as salas mobiliadas deverão ter a mesma quantidade total de carteiras e\n- a quantidade de carteiras de cada uma das cores será a mesma em todas as salas de aula mobiliadas.\n\nNesse caso, qual a soma do número de carteiras brancas com o número de carteiras azuis numa sala de aula mobiliada?`, options: { 'A': `16`, 'B': `17`, 'C': `19`, 'D': `21`, 'E': `22` }, correct: 'B' },
        { id: 16, text: `O senhor Victor quer colocar uma cerca em volta de cada um dos quatro canteiros representados por C, M, R e J, desenhados na malha retangular abaixo, composta por retângulos iguais. Sabendo-se que o perímetro do canteiro C é 60 metros, que o do R é 64 metros e que o do J é 56 metros, de quantos metros de cerca precisará o senhor Victor para o canteiro M?`, image: 'COLE_O_LINK_DA_IMAGEM_AQUI', options: { 'A': `40 m`, 'B': `50 m`, 'C': `60 m`, 'D': `70 m`, 'E': `80 m` }, correct: 'C' },
        { id: 17, text: `Na praia de Copacabana, no Rio de Janeiro, foram estendidas cinco toalhas de praia retangulares iguais, formando um grande retângulo. As cinco toalhas estendidas formam um retângulo cuja área é 540 dm². Quanto medem o comprimento (C) e a largura (L) de cada uma das tolhas?`, image: 'COLE_O_LINK_DA_IMAGEM_AQUI', options: { 'A': `C = 1,5 m e L = 0,5 dm`, 'B': `C = 150 cm e L = 50 cm`, 'C': `C = 0,18 cm e L = 60 dm`, 'D': `C = 18 dm e L = 0,6 m`, 'E': `C = 21 dm e L = 0,7 dm` }, correct: 'D' },
        { id: 18, text: `Paulo quer fazer uma homenagem ao time de várzea em que ele joga futebol. Para isso, resolveu pintar a bandeira do seu time no muro da sua casa, usando 3 cores de tinta (branca, azul e dourada). O muro da casa de Paulo é revestido com cerâmica em formato quadrado de 50 cm x 50 cm cada, conforme a figura abaixo.\n\nPara realizar a pintura, Paulo comprará as latas de tintas. Considere que cada lata de tinta cobre 1,5 m² por camada de tinta e que serão necessárias duas camadas de tinta para todas as cores. Os preços das latas são:\n- Branca: R$ 12,00\n- Azul: R$ 16,00\n- Dourada: R$ 32,00\n\nQuanto Paulo gastará para executar essa pintura?`, image: 'COLE_O_LINK_DA_IMAGEM_AQUI', options: { 'A': `R$ 194,00`, 'B': `R$ 272,00`, 'C': `R$ 347,00`, 'D': `R$ 390,00`, 'E': `R$ 498,00` }, correct: 'B' },
        { id: 19, text: `O aluno Vinicius, aluno do CMRJ, resolveu corretamente a expressão matemática exibida na imagem. Qual é o valor encontrado pelo aluno?`, image: 'COLE_O_LINK_DA_IMAGEM_AQUI', options: { 'A': `1/8`, 'B': `19/4`, 'C': `11/4`, 'D': `43/24`, 'E': `103/92` }, correct: 'C' },
        { id: 20, text: `No esquema abaixo, as letras A, B, C, D e E correspondem ao valor resultante da operação indicada por cada uma das setas. Resolva a expressão abaixo, utilizando os valores encontrados para cada letra: 1 - E + B + 100xC - A/100 + 100xD.\n\nAo resolver corretamente a expressão, o valor encontrado pode ser representado por:`, image: 'COLE_O_LINK_DA_IMAGEM_AQUI', options: { 'A': `1 + A.`, 'B': `1 - B.`, 'C': `1 + C.`, 'D': `1 - D.`, 'E': `1 + E.` }, correct: 'E' }
      ],
      portuguese: [
        { id: 21, text: `Assinale a opção que contém a correlação adequada entre a expressão destacada e seu efeito de sentido na tirinha acima.`, image: 'COLE_O_LINK_DA_IMAGEM_AQUI', options: { 'A': `"fria e desoladora" - o lado arrogante do angustiado.`, 'B': `"chuvinha constante" - o caráter efêmero da angústia.`, 'C': `"nuvem densa e sombria" - o peso e a fuga operados pela memória.`, 'D': `"com suéter e guarda-chuva" - o aconchego e a proteção próprios do amor.`, 'E': `"estrondo de trovões ameaçadores" - a brandura e a impulsividade contidas na raiva.` }, correct: 'D' },
        { id: 22, text: `A expressão "tipo", usada no primeiro quadrinho, poderia ser substituída, sem prejuízo de sentido, por`, options: { 'A': `parte de.`, 'B': `oposta a.`, 'C': `idêntica a.`, 'D': `derivada de.`, 'E': `como se fosse.` }, correct: 'E' },
        { id: 23, text: `No texto I, as respostas fornecidas por Caramelo contêm um ponto de exclamação. Tal sinal de pontuação, nesse contexto, indica`, options: { 'A': `ênfase.`, 'B': `dúvida.`, 'C': `espanto.`, 'D': `irritação.`, 'E': `indiferença.` }, correct: 'A' },
        { id: 24, text: `No poema, personagens diferentes revelam seus medos de trovão, de injeção, de escuro, de vampiro, de piolho, de avião, entre outros. Sobre esses medos e a forma como são apresentados no poema, é possível afirmar que`, options: { 'A': `o medo pode ser tanto de coisas reais quanto imagináveis.`, 'B': `os medos representam apenas perigos reais e concretos.`, 'C': `os medos são inventados pelo autor para criar humor.`, 'D': `sentir medo é um comportamento muito reprovável.`, 'E': `o texto critica o medo gerado por lendas populares.` }, correct: 'A' },
        { id: 25, text: `Releia os versos do texto II a seguir e responda à questão proposta:\n"Que me mete muito medo!" (v. 4)\n"Mas eu tenho muito medo" (v. 7)\n"Do que eu tenho muito medo," (v. 21)\n\nNos versos acima, a repetição das expressions destacadas ("muito medo") produzem um efeito que`, options: { 'A': `confere humor ao texto.`, 'B': `reforça a intensidade do medo sentido.`, 'C': `explicita a preferência por aqueles que têm medo.`, 'D': `desfaz a comparação entre as falas ao longo do poema.`, 'E': `gera ambiguidade em relação aos medos apresentados.` }, correct: 'B' },
        { id: 26, text: `Releia os versos do texto II a seguir e responda à questão proposta:\n"Até me arrepia a espinha... / Tenho medo de injeção!" (v. 15 e 16)\n"Do que eu tenho muito medo, / que me deixa num apuro..." (v. 21 e 22)\n"Mas existe uma coisinha... / Eu de medo até me encolho!" (v. 37 e 38)\n"É que está chegando a hora / de aparecer lobisomem..." (v. 69 e 70)\n\nNo poema, as reticências aparecem várias vezes em diferentes contextos. Sobre o uso de reticências nos versos acima, é correto afirmar que são empregadas para`, options: { 'A': `marcar pausas aleatórias.`, 'B': `revelar que o poema está incompleto.`, 'C': `substituir vírgulas para variar a pontuação nesses versos.`, 'D': `indicar que o autor se esqueceu de concluir o pensamento.`, 'E': `sugerir uma hesitação ou uma fala que ainda não se completou.` }, correct: 'E' },
        { id: 27, text: `Em "(...) que é só acender a luz / e pronto! Acabou-se o escuro!" (v. 27 e 28), a expressão destacada ("e pronto! Acabou-se o escuro!") enfatiza a ideia de`, options: { 'A': `consequência.`, 'B': `proporção.`, 'C': `finalidade.`, 'D': `oposição.`, 'E': `causa.` }, correct: 'A' },
        { id: 28, text: `No texto II, há vozes que dialogam sobre o medo: uma delas comenta por que não se assusta diante daquilo que faz a outra tremer para, logo em seguida, confessar seu medo motivado por outras razões. O verso que exprime o que essa contraposição revela é`, options: { 'A': `"Não tenho medo de nada!" (v. 53)`, 'B': `"Mas apesar de valente" (v. 54)`, 'C': `"eu não tenho medo, não!" (v. 59)`, 'D': `"Pelo que vemos, pessoal," (v. 63)`, 'E': `"Todo mundo tem um medo," (v. 65)` }, correct: 'E' },
        { id: 29, text: `No poema, a tonicidade das palavras contribui bastante para a musicalidade do texto. Não só a presença de sílabas tônicas e átonas, como também a posição de cada uma delas podem conferir esse efeito. Assinale a opção cujo par de vocábulos apresenta a mesma posição da sílaba tônica.`, options: { 'A': `injeção - detesto`, 'B': `medo - segredo`, 'C': `até - acho`, 'D': `só - uma`, 'E': `me - só` }, correct: 'B' },
        { id: 30, text: `A propósito do texto III, é possível afirmar que o título do filme "Divertida Mente" contém um jogo de palavras que pode refletir tanto o modo (diversão, divertidamente) quanto o tipo de mente (mente divertida). De uma forma ou de outra, fica evidente a proposta de o filme abordar um tema denso com leveza. Assinale a opção cujo trecho ratifica essa afirmativa.`, options: { 'A': `"Lançada em 2015, a animação Divertida Mente tem como protagonista a menina Riley" (l. 1)`, 'B': `"Acompanhamos o seu processo de adaptação na vida nova" (l. 2)`, 'C': `"Através de personagens lúdicos, observamos o funcionamento cerebral de Riley" (l. 4)`, 'D': `"Não por acaso, o longa-metragem recebeu os mais importantes prêmios de melhor filme de animação" (l. 6-7)`, 'E': `"Após assistirmos à animação, notamos como não existem sentimentos bons e ruins" (l. 12-13)` }, correct: 'C' },
        { id: 31, text: `No texto III, as vírgulas empregadas isolam expressões com diversos fins. Assinale a opção cujos termos isolados por vírgulas contêm um comentário que caracteriza a expressão que lhe antecede.`, options: { 'A': `"A Alegria, por exemplo, tem um formato corporal que nos lembra uma estrela." (l. 9-10)`, 'B': `"O Medo, por sua vez, tem contornos de um nervo e é roxo. (l. 10)`, 'C': `"A Tristeza tem um contorno de gota, como uma lágrima, e é azul." (l. 12)`, 'D': `"Ao contrário do que nos faz crer a sociedade contemporânea, a tristeza é essencial para a nossa vida." (l. 15-16)`, 'E': `"Ao termos consciência de como o corpo processa o que foi vivido, entendemos melhor os nossos conflitos emocionais" (l. 27-28)` }, correct: 'C' },
        { id: 32, text: `De acordo com o texto III, o filme Divertida Mente permite que seu espectador chegue à seguinte conclusão:`, options: { 'A': `É necessário valorizar apenas os sentimentos positivos.`, 'B': `O sujeito não deve praticar a resiliência cotidianamente.`, 'C': `Os sentimentos negativos são mais importantes do que os positivos.`, 'D': `Os sentimentos negativos também são importantes para o nosso desenvolvimento.`, 'E': `A alegria é importante para a nossa defesa e proteção, contudo nos deixa vulneráveis.` }, correct: 'D' },
        { id: 33, text: `Releia o trecho do texto III a seguir e responda à questão proposta:\n"Cada emoção essencial de Divertida Mente possui um desenho específico que se relaciona diretamente com o sentimento que representa." (l. 8-9)\n\nNo texto III, o emprego do verbo no tempo presente é recorrente. Se, em vez de apresentar os fatos no presente, o autor tivesse mencionado o que ainda acontecerá, a substituição dos verbos destacados no trecho acima ("possui", "relaciona", "representa"), sem alterar o número e a pessoa, conforme as regras gramaticais vigentes, seria`, options: { 'A': `possuiu - relacionou - representou.`, 'B': `possui - relacionará - representarás.`, 'C': `possuirá - relacionará - representara.`, 'D': `possuirá - relacionará - representará.`, 'E': `possuirei - relacionarei - representarei.` }, correct: 'D' },
        { id: 34, text: `Releia o trecho do texto III a seguir e responda à questão proposta:\n"Acompanhamos o seu processo de adaptação na vida nova e assistimos como as cinco emoções (Alegria, Tristeza, Medo, Raiva e Nojinho) regem seu comportamento." (l. 2-4)\n\nO pronome "seu" em destaque ("seu comportamento") refere-se à`, options: { 'A': `"animação". (l. 1)`, 'B': `"menina Riley". (l. 1)`, 'C': `"cidade." (l. 2)`, 'D': `"vida nova". (l. 2)`, 'E': `"adaptação". (l. 2)` }, correct: 'B' },
        { id: 35, text: `Releia o trecho do texto III a seguir e responda à questão proposta:\n"Aprendemos, a partir da observação do cérebro de Riley, como acontecimentos externos repercutem em nós internamente (...)." (l. 18-19)\n\nAs classes de palavras contribuem ativamente na organização do texto. A alternativa que apresenta uma palavra da mesma classe gramatical ("internamente" - advérbio), com papel semelhante que a destacada é`, options: { 'A': `"cerebral". (l. 4)`, 'B': `"complexo". (l. 5)`, 'C': `"contorno". (l. 12)`, 'D': `"melhor". (l. 23)`, 'E': `"raro". (l. 25)` }, correct: 'D' },
        { id: 36, text: `No texto III, o autor declara que "Ao termos consciência de como o corpo processa o que foi vivido, entendemos melhor os nossos conflitos emocionais e respeitamos as nossas limitações internas, ao mesmo tempo que podemos escolher desafiá-las." (l. 27-29). Assinale a opção cujo fragmento do texto IV ilustra um momento dessa inteligência emocional do Leão.`, options: { 'A': `"o leão abriu a bocarra para devorá-lo." (l. 12-13)`, 'B': `"Fiquei surpreso ao vê-lo sair voando." (l. 24)`, 'C': `"- Talvez, se eu tivesse coração, não fosse covarde." (l. 48)`, 'D': `"- Eu não tenho. Minha cabeça é cheia de palha." (l. 51)`, 'E': `"- E eu, que me mande, com Totó, de volta para casa - acrescentou Dorothy." (l. 53)` }, correct: 'C' },
        { id: 37, text: `Ao Leão falta a coragem, mas não a linguagem cuidada, típica de um "Rei dos Animais". Em "Basta eu pressentir perigo que meu coração dispara." (l. 42), o termo destacado ("pressentir") reflete esse cuidado e pode ser substituído, sem prejuízo gramatical ou de sentido, por`, options: { 'A': `prover.`, 'B': `antever.`, 'C': `procurar.`, 'D': `enfrentar.`, 'E': `prestigiar.` }, correct: 'B' },
        { id: 38, text: `O personagem Leão afirma para Dorothy que tem sorte por seu rugido espantar os bichos, pois ele é quem fica em pânico quando encontra alguém à sua frente. A respeito desse fato, a reação dos bichos revela que`, options: { 'A': `nem sempre a aparência revela toda a essência.`, 'B': `o reino é composto apenas por bichos soberberbos.`, 'C': `todos são felizes até que se prove o contrário.`, 'D': `todos são empáticos e solidários com o rei.`, 'E': `é importante viver com gratidão e alegria.` }, correct: 'A' },
        { id: 39, text: `Releia o trecho do texto IV a seguir e responda à questão proposta:\n"Disse que a viagem é longa e o percurso, perigoso, mas tudo fica bonito, próximo à cidade onde vive o Grande Oz." (l. 3-4)\n"- Você não vai morder o Totó! Onde já se viu bicho do seu tamanho brigar com cachorrinho tão pequeno?" (l. 15-16)\n\nA palavra "onde" aparece nos trechos acima com finalidades diferentes. O primeiro "onde" se refere à cidade do Grande Oz. O segundo`, options: { 'A': `diz respeito ao lugar onde Totó vive.`, 'B': `minimiza a diferença de tamanho existente entre o Leão e Totó.`, 'C': `faz parte de uma expressão que enfatiza a indignação de Dorothy.`, 'D': `remete ao sentimento de indiferença que Dorothy sente pelo Leão.`, 'E': `é usado para suavizar a postura covarde do Leão em relação a Totó.` }, correct: 'C' },
        { id: 40, text: `Releia o trecho do texto IV a seguir:\n"O cachorrinho tinha, agora, um inimigo pela frente. Correu em direção à fera, e o leão abriu a bocarra para devorá-lo. Dorothy, sentindo que poderia perder o amigo, sem avaliar o perigo, avançou e deu um tapa no focinho do leão. Gritou:\n- Você não vai morder o Totó! Onde já se viu bicho do seu tamanho brigar com cachorrinho tão pequeno? Não tem vergonha, não?\n- Mas eu não mordi - disse o Leão, esfregando a pata no focinho, onde a menina tinha batido." (l. 12-17)\n\nA reação de Dorothy, no trecho acima, é gerada por um fato que a faz agir impulsivamente. O fato e a conclusão a que Dorothy chega a partir dele são, respectivamente,`, options: { 'A': `o Leão era covarde / Totó seria mordido.`, 'B': `o Leão abriu a boca diante de Totó / Totó estava correndo perigo.`, 'C': `Dorothy bateu no Leão / O Leão se vingaria em Totó, seu melhor amigo.`, 'D': `Totó correu em direção ao Leão / O Leão, por estar com medo, morderia Totó.`, 'E': `Totó fugiu do Leão / O Leão reagiria com valentia para manter sua condição de Rei dos Animais.` }, correct: 'B' }
      ]
    }
  };

  // Salva no localStorage e envia para a nuvem do Supabase simultaneamente
  const saveStatsToDB = async (key, statData) => {
    const newStats = { ...stats, [key]: statData };
    setStats(newStats);
    localStorage.setItem('cmrjStats', JSON.stringify(newStats));

    const { error } = await supabase
      .from('estatisticas')
      .upsert({
        id: key,
        tentativas: statData.attempts,
        melhor_score: statData.bestScore,
        percentual: statData.percentage,
        ultima_tentativa: statData.lastAttempt
      });
      
    if (error) {
      console.error("Erro ao salvar na nuvem:", error);
    }
  };

  const getYearStats = (year, subject) => {
    const key = `${year}-${subject}`;
    return stats[key] || { attempts: 0, bestScore: 0, totalQuestions: 20 };
  };

  const calculateScore = () => {
    let correct = 0;
    examQuestions.forEach(q => {
      if (userAnswers[q.id] === q.correct) correct++;
    });
    return correct;
  };

  // Função que mistura as opções do array
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  useEffect(() => {
    let timer;
    if (currentPage === 'quiz' && !showResults && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0 && currentPage === 'quiz' && !showResults) {
      handleSubmit();
    }
    return () => clearInterval(timer);
  }, [currentPage, showResults, timeLeft]);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}h ${m < 10 ? '0' : ''}${m}m ${s < 10 ? '0' : ''}${s}s`;
  };

  const handleAnswer = (questionId, answer) => {
    setUserAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = () => {
    const score = calculateScore();
    const percentage = (score / 20) * 100;
    const key = `${selectedYear}-${selectedSubject}`;
    const currentStats = getYearStats(selectedYear, selectedSubject);
    
    const attemptData = {
      attempts: currentStats.attempts + 1,
      bestScore: Math.max(currentStats.bestScore, score),
      totalQuestions: 20,
      percentage: percentage,
      lastAttempt: new Date().toLocaleDateString('pt-BR')
    };

    saveStatsToDB(key, attemptData);
    
    setShowResults(true);
    setIsTextModalOpen(false);
  };

  const resetQuiz = () => {
    const baseQuestions = examsData[selectedYear]?.[selectedSubject] || [];
    setExamQuestions(shuffleArray(baseQuestions));
    setUserAnswers({});
    setCurrentQuestion(0);
    setShowResults(false);
    setTimeLeft(12600); 
    setIsTextModalOpen(false);
  };

  const handleStartExam = (year, subject) => {
    setSelectedYear(year);
    setSelectedSubject(subject);
    
    const baseQuestions = examsData[year]?.[subject] || [];
    setExamQuestions(shuffleArray(baseQuestions));

    setCurrentPage('quiz');
    setUserAnswers({});
    setCurrentQuestion(0);
    setShowResults(false);
    setTimeLeft(12600); 
    setIsTextModalOpen(false);
  };

  const currentQ = examQuestions[currentQuestion];
  const score = calculateScore();
  const percentage = (score / 20) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;600;700&family=Inter:wght@400;500;600&display=swap');
        body { font-family: 'Inter', sans-serif; }
        .title-font { font-family: 'Fredoka', sans-serif; font-weight: 700; }
        .fade-in { animation: fadeIn 0.6s ease-in-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .bounce-in { animation: bounceIn 0.7s cubic-bezier(0.68, -0.55, 0.265, 1.55); }
        @keyframes bounceIn { 0% { transform: scale(0.3); opacity: 0; } 50% { opacity: 1; } 100% { transform: scale(1); opacity: 1; } }
        .pulse-light { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f3e8ff; border-radius: 8px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #c084fc; border-radius: 8px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #a855f7; }
      `}</style>

      {currentPage === 'quiz' && !showResults && examsData[selectedYear]?.texts?.[selectedSubject] && (
        <button
          onClick={() => setIsTextModalOpen(true)}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-full shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:scale-110 transition-all z-40 flex items-center gap-3 bounce-in border-2 border-white"
        >
          <FileText className="w-7 h-7" />
          <span className="font-bold text-lg hidden md:inline pr-2">Ler Textos</span>
        </button>
      )}

      {isTextModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-70 backdrop-blur-sm z-50 flex items-center justify-center p-4 fade-in">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[85vh] flex flex-col shadow-2xl border-4 border-purple-100">
            <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-pink-50 rounded-t-2xl">
              <h2 className="title-font text-2xl text-purple-800 flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-pink-500" />
                Textos de Apoio da Prova
              </h2>
              <button 
                onClick={() => setIsTextModalOpen(false)} 
                className="text-gray-500 hover:text-red-500 hover:bg-red-50 p-2 rounded-full transition-all"
              >
                <XCircle className="w-8 h-8" />
              </button>
            </div>
            <div className="p-8 overflow-y-auto space-y-10 custom-scrollbar">
              {examsData[selectedYear]?.texts?.[selectedSubject]?.map((texto, idx) => (
                <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-purple-100">
                  <h3 className="title-font text-xl mb-4 text-purple-800 border-b-2 border-purple-100 pb-2">{texto.title}</h3>
                  <p className="text-gray-700 whitespace-pre-wrap leading-relaxed text-lg font-medium">{texto.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {currentPage === 'home' && (
        <div className="max-w-6xl mx-auto fade-in">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Trophy className="w-12 h-12 text-yellow-500" />
              <h1 className="title-font text-5xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                Filipa estuda CMRJ
              </h1>
              <Lightbulb className="w-12 h-12 text-yellow-400" />
            </div>
            <p className="text-lg text-gray-600 mb-2">Prepare-se para o Colégio Militar do Rio de Janeiro</p>
            <p className="text-sm text-gray-500">Reúso de provas anteriores para treino</p>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-12">
            {['2023-2024', '2024-2025', '2025-2026'].map(year => {
              const mathStats = getYearStats(year, 'math');
              const portStats = getYearStats(year, 'portuguese');
              const totalAttempts = mathStats.attempts + portStats.attempts;
              const avgScore = totalAttempts > 0 ? ((mathStats.bestScore + portStats.bestScore) / 40 * 100).toFixed(1) : 0;

              return (
                <div key={year} className="bg-white rounded-2xl p-6 shadow-lg border-2 border-purple-100 hover:shadow-xl transition-all bounce-in">
                  <h3 className="title-font text-lg text-purple-700 mb-3">{year}</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Tentativas:</span>
                      <span className="title-font text-lg text-blue-600">{totalAttempts}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Melhor score:</span>
                      <span className="title-font text-lg text-green-600">{avgScore}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all" style={{ width: `${avgScore}%` }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {['2023-2024', '2024-2025', '2025-2026'].map(year => (
            <div key={year} className="mb-8 fade-in">
              <h2 className="title-font text-2xl text-purple-800 mb-4 flex items-center gap-2">
                <BookOpen className="w-6 h-6" /> Provas {year}
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <button onClick={() => handleStartExam(year, 'math')} className="bg-gradient-to-br from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white rounded-2xl p-8 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all text-left">
                  <div className="title-font text-2xl mb-2">📐 Matemática</div>
                  <p className="text-blue-100 mb-4">20 questões</p>
                  {(() => {
                    const stats = getYearStats(year, 'math');
                    return stats.attempts > 0 ? (
                      <div className="text-sm text-blue-100">
                        <p>Melhor: {stats.bestScore}/20 ({(stats.bestScore/20*100).toFixed(1)}%)</p>
                        <p>Tentativas: {stats.attempts}</p>
                      </div>
                    ) : ( <p className="text-blue-100">Clique para começar</p> );
                  })()}
                </button>

                <button onClick={() => handleStartExam(year, 'portuguese')} className="bg-gradient-to-br from-pink-400 to-purple-600 hover:from-pink-500 hover:to-purple-700 text-white rounded-2xl p-8 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all text-left">
                  <div className="title-font text-2xl mb-2">📚 Português</div>
                  <p className="text-pink-100 mb-4">20 questões</p>
                  {(() => {
                    const stats = getYearStats(year, 'portuguese');
                    return stats.attempts > 0 ? (
                      <div className="text-sm text-pink-100">
                        <p>Melhor: {stats.bestScore}/20 ({(stats.bestScore/20*100).toFixed(1)}%)</p>
                        <p>Tentativas: {stats.attempts}</p>
                      </div>
                    ) : ( <p className="text-pink-100">Clique para começar</p> );
                  })()}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {currentPage === 'quiz' && !showResults && (
        <div className="max-w-4xl mx-auto fade-in pb-20">
          <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="title-font text-2xl text-gray-800">
                {selectedSubject === 'math' ? '📐 Matemática' : '📚 Português'} - Prova {selectedYear}
              </h2>
              <div className="flex items-center gap-4">
                <div className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-colors ${timeLeft <= 1800 ? 'bg-red-100 text-red-600 pulse-light' : 'bg-blue-100 text-blue-600'}`}>
                  <Clock className="w-5 h-5" />
                  {formatTime(timeLeft)}
                </div>
                <button onClick={() => { setCurrentPage('home'); resetQuiz(); }} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all">
                  ← Voltar
                </button>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-700">Progresso</span>
                  <span className="text-sm font-semibold text-purple-600">{currentQuestion + 1}/20</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all" style={{ width: `${((currentQuestion + 1) / 20) * 100}%` }} />
                </div>
              </div>
            </div>
          </div>

          {currentQ && (
            <div className="bg-white rounded-2xl p-8 shadow-lg bounce-in">
              <div className="mb-8">
                <span className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full title-font mb-4">
                  Questão {currentQuestion + 1}
                </span>
                
                <h3 className="text-xl text-gray-800 font-semibold leading-relaxed whitespace-pre-wrap">
                  {currentQ.text}
                </h3>

                {currentQ.image && (
                  <div className="mt-6 mb-2 rounded-xl overflow-hidden border-2 border-gray-100">
                    <img src={currentQ.image} alt="Gráfico ou ilustração da questão" className="max-w-full h-auto object-contain" />
                  </div>
                )}
              </div>

              <div className="space-y-3 mb-8">
                {currentQ.options && Object.entries(currentQ.options).map(([letter, answerText]) => {
                  const isAnswered = userAnswers[currentQ.id] !== undefined;
                  const isSelected = userAnswers[currentQ.id] === letter;
                  const isCorrect = letter === currentQ.correct;

                  let buttonClass = 'border-gray-200 bg-white text-gray-700 hover:border-purple-300';
                  
                  if (isAnswered) {
                    if (isCorrect) {
                      buttonClass = 'border-green-500 bg-green-50 text-green-700';
                    } else if (isSelected && !isCorrect) {
                      buttonClass = 'border-red-500 bg-red-50 text-red-700';
                    } else {
                      buttonClass = 'border-gray-100 bg-gray-50 text-gray-400 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={letter}
                      onClick={() => !isAnswered && handleAnswer(currentQ.id, letter)}
                      disabled={isAnswered} 
                      className={`w-full p-4 text-left rounded-xl border-2 transition-all flex items-center gap-3 ${buttonClass}`}
                    >
                      <span className="text-lg font-bold min-w-[24px]">{letter}.</span>
                      <span className="text-lg font-medium flex-1">{answerText}</span>
                      
                      {isAnswered && isCorrect && <CheckCircle className="w-6 h-6 flex-shrink-0 text-green-600 bounce-in" />}
                      {isAnswered && isSelected && !isCorrect && <XCircle className="w-6 h-6 flex-shrink-0 text-red-600 bounce-in" />}
                    </button>
                  );
                })}
              </div>

              {userAnswers[currentQ.id] && (
                <div className={`p-4 rounded-xl mb-8 flex items-center gap-4 fade-in border-2 ${
                  userAnswers[currentQ.id] === currentQ.correct 
                    ? 'bg-green-50 border-green-200 text-green-800' 
                    : 'bg-red-50 border-red-200 text-red-800'
                }`}>
                  {userAnswers[currentQ.id] === currentQ.correct ? (
                    <>
                      <CheckCircle className="w-8 h-8 text-green-500 bounce-in flex-shrink-0" />
                      <span className="font-bold text-lg">✨ Parabéns, você acertou!</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-8 h-8 text-red-500 bounce-in flex-shrink-0" />
                      <span className="font-bold text-lg">
                        📚 Ops, vamos revisar essa? A resposta correta era a letra <span className="text-2xl uppercase bg-red-200 px-2 py-1 rounded">{currentQ.correct}</span>.
                      </span>
                    </>
                  )}
                </div>
              )}

              <div className="flex gap-4 justify-between">
                <button onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))} disabled={currentQuestion === 0} className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-300 transition-all font-semibold">
                  ← Anterior
                </button>

                {currentQuestion === examQuestions.length - 1 ? (
                  <button onClick={handleSubmit} className="px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:shadow-lg transition-all font-semibold flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" /> Enviar Respostas
                  </button>
                ) : (
                  <button onClick={() => setCurrentQuestion(Math.min(examQuestions.length - 1, currentQuestion + 1))} className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all font-semibold">
                    Próxima →
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {currentPage === 'quiz' && showResults && (
        <div className="max-w-4xl mx-auto fade-in">
          <div className="bg-white rounded-2xl p-8 shadow-lg mb-6 bounce-in">
            <div className="text-center mb-8">
              <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
              <h2 className="title-font text-4xl text-gray-800 mb-4">Resultado Final!</h2>
              
              <div className="flex justify-center mb-8">
                <div className="relative w-32 h-32">
                  <svg className="transform -rotate-90 w-32 h-32">
                    <circle cx="64" cy="64" r="56" fill="none" stroke="#e5e7eb" strokeWidth="8" />
                    <circle cx="64" cy="64" r="56" fill="none" stroke={percentage >= 70 ? '#10b981' : percentage >= 50 ? '#f59e0b' : '#ef4444'} strokeWidth="8" strokeDasharray={`${(percentage / 100) * 352} 352`} strokeLinecap="round" className="transition-all" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="title-font text-5xl font-bold text-purple-600">{score}</div>
                      <div className="text-gray-600">/20</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-3xl title-font font-bold mb-2">{percentage.toFixed(1)}%</div>

              {percentage >= 70 && <p className="text-lg text-green-600 font-semibold">🎉 Excelente! Continue assim!</p>}
              {percentage >= 50 && percentage < 70 && <p className="text-lg text-blue-600 font-semibold">✨ Bom trabalho! Continue treinando!</p>}
              {percentage < 50 && <p className="text-lg text-orange-600 font-semibold">💪 Não desista! Revise e tente novamente!</p>}
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="bg-green-50 rounded-xl p-4 text-center">
                <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="text-3xl font-bold text-green-600">{score}</div>
                <div className="text-sm text-gray-600">Acertos</div>
              </div>
              <div className="bg-red-50 rounded-xl p-4 text-center">
                <XCircle className="w-8 h-8 text-red-600 mx-auto mb-2" />
                <div className="text-3xl font-bold text-red-600">{20 - score}</div>
                <div className="text-sm text-gray-600">Erros</div>
              </div>
              <div className="bg-purple-50 rounded-xl p-4 text-center">
                <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <div className="text-3xl font-bold text-purple-600">{percentage.toFixed(1)}%</div>
                <div className="text-sm text-gray-600">Taxa de Acerto</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 mb-8">
              <h3 className="title-font text-lg text-gray-800 mb-4">Dicas para melhorar:</h3>
              <ul className="space-y-2 text-gray-700">
                {percentage < 50 && ( <> <li>✓ Releia as questões com mais atenção</li> <li>✓ Estude a matéria relacionada a cada questão</li> <li>✓ Faça exercícios práticos adicionais</li> </> )}
                {percentage >= 50 && percentage < 70 && ( <> <li>✓ Reforce os conceitos que errou</li> <li>✓ Pratique interpretação de texto</li> <li>✓ Revise fórmulas matemáticas</li> </> )}
                {percentage >= 70 && ( <> <li>✓ Mantenha a consistência nos estudos</li> <li>✓ Tente outras provas para comparar</li> <li>✓ Ajude colegas com suas técnicas!</li> </> )}
              </ul>
            </div>

            <div className="flex gap-4 justify-center">
              <button onClick={() => { setCurrentPage('home'); resetQuiz(); }} className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all font-semibold flex items-center gap-2">
                ← Voltar ao Início
              </button>
              <button onClick={resetQuiz} className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-lg transition-all font-semibold flex items-center gap-2">
                <RotateCcw className="w-5 h-5" /> Refazer Prova
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="title-font text-2xl text-gray-800 mb-6">Revisão das Respostas</h3>
            <div className="space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
              {examQuestions.map((q, idx) => {
                const isCorrect = userAnswers[q.id] === q.correct;
                return (
                  <div key={q.id} className={`p-4 rounded-lg border-2 ${isCorrect ? 'border-green-300 bg-green-50' : 'border-red-300 bg-red-50'}`}>
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 mt-1">
                        {isCorrect ? <CheckCircle className="w-6 h-6 text-green-600" /> : <XCircle className="w-6 h-6 text-red-600" />}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800">Questão {idx + 1}</p>
                        <p className={`text-sm mt-1 ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                          Sua resposta: <span className="font-bold">{userAnswers[q.id] || 'Não respondida'}</span>
                          {!isCorrect && <span className="block">Resposta correta: <span className="font-bold">{q.correct}</span></span>}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CMRJStudyApp;