import { prisma } from '@/lib/prisma'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const force = searchParams.get('force') === 'true'

  const existing = await prisma.character.count()
  if (existing > 0 && !force) {
    return Response.json({ ok: false, message: 'Dados já existem. Use ?force=true para recriar.' })
  }

  if (force) {
    await prisma.event.deleteMany()
    await prisma.clue.deleteMany()
    await prisma.character.deleteMany()
    await prisma.location.deleteMany()
    await prisma.note.deleteMany()
  }

  // ── LOCAIS ──────────────────────────────────────────────
  const [
    cedroLake, casaEdgar, delegacia, dinerRuth,
    igreja, prefeitura, casoSofia, serraria, oficinaMarcus
  ] = await Promise.all([
    prisma.location.create({ data: { name: 'Cedar Lake', category: 'forest', mapX: 390, mapY: 455, description: 'O lago no centro de tudo. A energia do culto dorme aqui desde 1947. À noite, a névoa não sai da beira da água mesmo no verão.' } }),
    prisma.location.create({ data: { name: 'Casa de Edgar Thorne', category: 'other', mapX: 280, mapY: 430, description: 'Propriedade isolada com vista direta para o Cedar Lake. Edgar não sai daqui há 22 anos. Correspondências são entregues na caixa de correio na entrada. As janelas do andar de cima ficam iluminadas de madrugada.' } }),
    prisma.location.create({ data: { name: 'Delegacia de Black Pines', category: 'police', mapX: 370, mapY: 308, description: 'Main Street. Patton trabalha aqui há 30 anos. Sofia veio aqui com suas descobertas. Foi a última pessoa a vê-la com vida.' } }),
    prisma.location.create({ data: { name: 'Diner da Ruth', category: 'diner', mapX: 510, mapY: 308, description: 'O centro social informal de Black Pines. Ruth sabia de tudo e não segurava o que sabia. O lugar ficou diferente depois da morte dela.' } }),
    prisma.location.create({ data: { name: 'Igreja de Black Pines', category: 'other', mapX: 560, mapY: 235, description: 'Congregação liderada pelo Pastor Grove. Na sacristia há documentos do avô dele — registros do "conflito de 1947" com o culto do lago. O Símbolo aparece em fotografias guardadas nessa pasta.' } }),
    prisma.location.create({ data: { name: 'Prefeitura', category: 'business', mapX: 250, mapY: 308, description: 'Carol Briggs tem um projeto de resort no Cedar Lake em andamento. Sofia veio aqui antes de ir à delegacia. Briggs a atendeu e a dispensou — e depois ligou para Patton.' } }),
    prisma.location.create({ data: { name: 'Casa de Sofia Maves', category: 'residential', mapX: 195, mapY: 360, description: 'Bairro residencial, Rua dos Pinheiros. Dana Mercer mora na casa ao lado. O diário de Sofia foi encontrado no quarto dela.' } }),
    prisma.location.create({ data: { name: 'Serraria Marsh', category: 'business', mapX: 660, mapY: 308, description: 'Owen Marsh trabalha e mora aqui. Na beira da Main Street, lado leste. O carro dele foi visto perto da casa de Sofia várias vezes nas semanas antes do assassinato.' } }),
    prisma.location.create({ data: { name: 'Oficina de Marcus Cole', category: 'business', mapX: 165, mapY: 250, description: 'Marcus faz pequenos reparos para metade da cidade. Rua dos Pinheiros. O caminhão vermelho dele é bem reconhecível — e foi visto perto da casa de Ruth na noite da morte dela.' } }),
  ])

  // ── PERSONAGENS ─────────────────────────────────────────
  await Promise.all([

    prisma.character.create({ data: {
      name: 'Sofia Maves',
      role: 'resident',
      narrativeRole: 'vitima',
      occupation: 'Estudante, 17 anos',
      alive: false,
      primaryLocationId: casoSofia.id,
      description: 'Adolescente curiosa e inteligente. Cresceu em Black Pines mas sempre achou a cidade estranha. Passou os últimos meses pesquisando a história local como hobby, anotando tudo num diário onde se chamava de "Agente Sofia".',
      connectionToVictim: 'A própria vítima. Centro de tudo.',
      alibi: 'N/A — vítima',
      secrets: 'Sofia foi à delegacia com suas descobertas e foi morta por Patton. Seu diário aponta para Edgar e o lago — nunca para o xerife. A última entrada é completamente normal. A ausência de registro da visita à delegacia É a pista.',
      notes: 'Revelar o diário cedo. Os jogadores vão seguir a trilha do lago — que os leva a Edgar, que É culpado de Ruth. A ironia é que Sofia estava certa sobre o lago mas foi morta por uma razão completamente humana.',
    }}),

    prisma.character.create({ data: {
      name: 'Ruth Calloway',
      role: 'resident',
      narrativeRole: 'vitima_2',
      occupation: 'Dona do Diner da Ruth',
      alive: false,
      primaryLocationId: dinerRuth.id,
      description: 'A fofoqueira benevolente de Black Pines. Conhecia todo mundo, sabia de tudo, e falava sem filtro. Viu o caminhão de Marcus Cole perto da casa de Sofia naquela noite. Não entendeu o que tinha visto — mas comentou.',
      connectionToVictim: 'Testemunha acidental. Via e ouvia tudo no diner.',
      alibi: 'N/A — vítima',
      secrets: 'Morreu porque viu o caminhão de Marcus na noite do assassinato de Sofia e foi falando. Edgar soube e dirigiu Marcus até ela. Ruth não tinha ideia do que estava carregando.',
      notes: 'Ativar a morte de Ruth quando os jogadores começarem a se aproximar de Marcus ou do lago. Antes de morrer, ela contou o que viu para pelo menos duas pessoas — definir quem antes da sessão.',
    }}),

    prisma.character.create({ data: {
      name: 'Edgar Thorne',
      role: 'suspect',
      narrativeRole: 'orquestrador',
      occupation: 'Ex-geólogo. Recluso há 22 anos',
      alive: true,
      primaryLocationId: casaEdgar.id,
      description: 'Homem de ~72 anos. Vive em isolamento total com vista para o Cedar Lake. Chegou em 1973 como geólogo, perdeu a filha Mara para a energia do lago — encoberto pela cidade. Transformou o luto em obsessão e a obsessão em devoção. Não é louco: é metódico, inteligente, e parcialmente simbiótico com a energia.',
      connectionToVictim: 'Sabia que Sofia pesquisava a história do lago e dos Thorne. Patton agiu por conta própria — Edgar não ordenou a morte de Sofia.',
      alibi: 'Nunca sai de casa — alibi permanente e ao mesmo tempo profundamente suspeito. Pete Harlan o viu na varanda às 3h da manhã da noite de Sofia.',
      secrets: 'Aprendeu a direcionar a energia do lago após 50 anos de estudo. Usou Marcus Cole como instrumento para matar Ruth Calloway. Não matou Sofia. Sabe que Patton o fez — e isso lhe convém, pois mantém a atenção longe do lago.',
      notes: 'Toda evidência sobrenatural aponta para ele. Ele É culpado de Ruth, mas não de Sofia. Os jogadores chegam nele primeiro e estão parcialmente certos — o que torna a revelação sobre Patton mais devastadora. Qualquer interrogação precisa ser feita na propriedade dele.',
    }}),

    prisma.character.create({ data: {
      name: 'Sheriff James Patton',
      role: 'suspect',
      narrativeRole: 'assassino_real',
      occupation: 'Xerife de Black Pines, 30 anos no cargo',
      alive: true,
      primaryLocationId: delegacia.id,
      description: 'Homem de 55 anos. Veterano respeitado. A cara da lei em Black Pines por três décadas. Chamou o FBI pessoalmente após a morte de Sofia — aparentemente abalado, determinado a resolver o caso. Trabalha lado a lado com o agente federal durante toda a investigação.',
      connectionToVictim: 'Sofia foi à delegacia com suas descobertas. Patton foi a última pessoa a vê-la com vida.',
      alibi: 'Estava "na delegacia fazendo papelada" na noite do assassinato. Sem testemunhas verificáveis. Mas quem suspeita do xerife que chamou o FBI?',
      secrets: 'Matou Sofia após ela apresentar documentos que conectavam o pai dele ao encobrimento da morte de Mara Thorne em 1973. Chamou o FBI como manobra de controle — para aparecer como aliado e guiar a investigação para longe de si. Está queimando arquivos antigos do pai em casa.',
      notes: 'CAMADA VISÍVEL: fica tenso quando Thorne/1973 aparecem, acessa cenas antes do FBI, queima documentos em casa. Os jogadores vão achar que protege a memória do pai. Estão certos — mas não sabem o tamanho. A Prefeita Briggs ligou para ele horas antes do assassinato.',
    }}),

    prisma.character.create({ data: {
      name: 'Marcus Cole',
      role: 'suspect',
      narrativeRole: 'assassino_controlado',
      occupation: 'Carpinteiro',
      alive: true,
      primaryLocationId: oficinaMarcus.id,
      description: 'Homem de 42 anos. Pai de família, querido em Black Pines. Faz pequenos reparos para metade da cidade. Foi ao Cedar Lake numa noite de crise conjugal três meses atrás — sentou à beira d\'água até de madrugada. Não entendeu o que aconteceu naquela noite.',
      connectionToVictim: 'Seu caminhão foi visto perto da casa de Ruth na noite da morte dela. Não tem memória do ocorrido.',
      alibi: 'Diz que estava em casa dormindo. Esposa confirma, mas ela dormia e não pode ter certeza do horário.',
      secrets: 'Matou Ruth Calloway sob influência da energia do lago, dirigida por Edgar Thorne. Não tem memória alguma. Está tendo blackouts crescentes e está com medo de si mesmo. Botas sujas de lama sem explicação.',
      notes: 'Personagem para gerar empatia. Quando o FBI tentar montar um perfil psicológico, nada vai encaixar — sem histórico, sem motivo, sem prazer no crime. É o momento onde o framework de serial killer quebra.',
    }}),

    prisma.character.create({ data: {
      name: 'Owen Marsh',
      role: 'suspect',
      narrativeRole: 'red_herring_forte',
      occupation: 'Dono da Serraria Marsh',
      alive: true,
      primaryLocationId: serraria.id,
      description: 'Homem de 52 anos. Carrancudo, reservado, com fama de temperamental. O avô estava no linchamento de James Edlow em 1953. Owen cresceu sabendo disso. Quando Sofia começou a puxar fios da história da cidade, entrou em pânico.',
      connectionToVictim: 'Mandou mensagens desesperadas para Sofia pedindo que ela parasse. O carro foi visto perto da casa dela na semana anterior à morte.',
      alibi: 'Diz que estava em casa. Mora sozinho. Sem verificação possível.',
      secrets: 'Não matou Sofia. Estava tentando protegê-la ao avisar que mexer na história da cidade era perigoso. As "mensagens ameaçadoras" eram súplicas de pânico. Sabe do linchamento mas não sabe nada sobre o lago ou Edgar.',
      notes: 'Red herring mais convincente. Evidências circunstanciais sólidas. Histórico de briga física há 10 anos. Os jogadores vão fixar nele por pelo menos duas sessões.',
    }}),

    prisma.character.create({ data: {
      name: 'Pastor Elias Grove',
      role: 'suspect',
      narrativeRole: 'red_herring_medio',
      occupation: 'Pastor da Igreja de Black Pines',
      alive: true,
      primaryLocationId: igreja.id,
      description: 'Homem de 64 anos. Líder da congregação há 25 anos. Gentil em público, mas claramente guarda algo. Herdou documentos do avô — o pastor que organizou o massacre do culto do lago em 1947 e o registrou como "conflito infeliz".',
      connectionToVictim: 'Sofia foi à igreja perguntar sobre a história local. Grove foi evasivo e encerrou a conversa rapidamente.',
      alibi: 'Estava pregando no culto de quarta-feira quando Ruth morreu. Verificável por dezenas de feligreses. Para Sofia: diz que estava em casa preparando sermão.',
      secrets: 'Tem documentos de 1947 que descrevem o massacre do culto. O Símbolo aparece nesses documentos. Foi duas vezes à Prefeitura à noite para convencer Briggs a manter o arquivo histórico fechado. Não tem nada a ver com os assassinatos — é cúmplice do silêncio histórico.',
      notes: 'Alibi para Ruth é sólido. A evasividade vai parecer culpa mas é medo de exposição institucional. Se pressionado o suficiente, pode revelar os documentos de 1947 — o que abre toda a linha sobrenatural.',
    }}),

    prisma.character.create({ data: {
      name: 'Dana Mercer',
      role: 'suspect',
      narrativeRole: 'red_herring_fraco',
      occupation: 'Professora substituta',
      alive: true,
      primaryLocationId: casoSofia.id,
      description: 'Mulher de 31 anos. Vizinha de Sofia na Rua dos Pinheiros. Tinha a chave da casa dela para regar plantas. Reação à notícia da morte foi estranhamente fria — não chorou, ficou quieta, saiu rápido.',
      connectionToVictim: 'Vizinha. Tinha chave da casa. Foi vista entrando no imóvel após o crime.',
      alibi: 'Estava num clube do livro na casa de Wendy Park quando Sofia foi morta e quando Ruth morreu. Verificável por seis pessoas.',
      secrets: 'Nenhum relacionado ao crime. A frieza é luto processado de forma atípica — teve depressão severa e aprendeu a não demonstrar emoção em público. Entrou na casa de Sofia para recuperar um livro emprestado.',
      notes: 'Red herring mais fraco. Alibi facilmente verificável. Útil para ocupar os jogadores nos primeiros momentos.',
    }}),

    prisma.character.create({ data: {
      name: 'Pete Harlan',
      role: 'resident',
      narrativeRole: 'testemunha_chave',
      occupation: 'Estudante, 17 anos',
      alive: true,
      primaryLocationId: cedroLake.id,
      description: 'Melhor amigo de Sofia. Os dois tinham o hábito de ir ao lago à noite — era "deles". Pete estava lá na noite relevante, mas foi embora antes de Sofia. Desde a morte dela, está com culpa intensa e agindo de forma errática. Evita qualquer autoridade.',
      connectionToVictim: 'Amigo próximo. Conhecia o diário "Agente Sofia" e as pesquisas dela. Estava no lago na noite de Sofia.',
      alibi: 'Estava no lago — o que ele não pode revelar sem se incriminar por estar fora sem permissão dos pais.',
      secrets: 'Viu Edgar Thorne na varanda às 3h da manhã na noite de Sofia. Viu o caminhão de Marcus Cole perto da casa de Ruth na noite da morte dela. Tem medo de falar porque sente que quem está envolvido é poderoso. Sente que devia ter ficado com Sofia naquela noite.',
      notes: 'Testemunha mais valiosa da campanha. Pressão vai fazê-lo fechar. Confiança, tempo, ou encontrar algo pra ele vai abrir. Abordagem errada pode fechar essa linha por sessões inteiras.',
    }}),

    prisma.character.create({ data: {
      name: 'Linda Cross',
      role: 'resident',
      narrativeRole: 'testemunha',
      occupation: 'Carteira (USPS)',
      alive: true,
      primaryLocationId: null,
      description: 'Mulher de 54 anos. Carteira há 15 anos. Entrega para Edgar Thorne semanalmente — ele recebe tudo por correspondência. Nunca questionou os hábitos dele. Uma vez viu um símbolo rabiscado num envelope de saída.',
      connectionToVictim: 'Conexão indireta via Edgar. Entrega e coleta correspondências da propriedade Thorne.',
      alibi: 'N/A — testemunha',
      secrets: 'Abriu uma carta de Edgar por curiosidade. Continha texto fragmentado e o Símbolo desenhado. O endereço era em Portland, Oregon. Ficou com medo e jogou fora. Nunca contou a ninguém. O endereço do Oregon aparece num arquivo Blue Rose sobre incidente semelhante em 1989.',
      notes: 'Vai resistir a compartilhar por vergonha (abriu correspondência alheia). O endereço do Oregon é a primeira ponte para o Blue Rose — se o agente FBI pesquisar.',
    }}),

    prisma.character.create({ data: {
      name: 'Prefeita Carol Briggs',
      role: 'resident',
      narrativeRole: 'autoridade',
      occupation: 'Prefeita de Black Pines',
      alive: true,
      primaryLocationId: prefeitura.id,
      description: 'Mulher de 53 anos. Família dela estava no linchamento de James Edlow em 1953. Tem um projeto de resort turístico no Cedar Lake em andamento. Qualquer escavação histórica ameaça o projeto e o nome Briggs.',
      connectionToVictim: 'Sofia foi à Prefeitura antes de ir à delegacia. Briggs a atendeu brevemente e a dispensou. Ligou para Patton em seguida.',
      alibi: 'N/A — autoridade',
      secrets: 'Percebeu que Sofia tinha documentos perigosos. Ligou para Patton para "informar sobre uma situação inconveniente" — sem pedir nada explicitamente. Não sabe que Patton matou Sofia. Acredita que fez apenas uma ligação de rotina. Esse autoengano é o que a torna mais perturbadora.',
      notes: 'Vai defender que "não fez nada de errado" até o fim. Tecnicamente verdade, moralmente devastadora. Obstrui a investigação por interesse político, não por encobrimento consciente do crime.',
    }}),
  ])

  // ── PISTAS ──────────────────────────────────────────────
  await Promise.all([

    prisma.clue.create({ data: {
      title: 'Diário "Agente Sofia"',
      status: 'hidden',
      location: 'Casa de Sofia Maves — quarto',
      description: 'Diário pessoal de Sofia. Escrito como se fosse um caso real: "Agente Sofia reportando." Registra semanas de pesquisa sobre o Cedar Lake, o culto de 1947, mortes não explicadas, e o nome Thorne. As anotações estão misturadas com entradas normais de adolescente — escola, músicas, reclamações. A última entrada, do dia anterior à morte, é completamente banal. Sem menção à visita à delegacia.',
    }}),

    prisma.clue.create({ data: {
      title: 'O Símbolo do Lago',
      status: 'found',
      location: 'Ambos os locais de crime',
      description: 'Símbolo idêntico encontrado nos dois locais de crime — riscado na madeira. Não foi deixado por nenhum suspeito: aparece espontaneamente onde a energia do lago age com força. O mesmo símbolo está em fotografias de 1947 (arquivo da Igreja), gravado numa árvore no local do linchamento de 1953, e nas paredes do quarto de Mara na casa de Edgar Thorne.',
    }}),

    prisma.clue.create({ data: {
      title: 'Mensagens de Owen Marsh para Sofia',
      status: 'found',
      location: 'Celular de Sofia',
      description: 'Série de mensagens enviadas por Owen nas semanas anteriores à morte. Tom: "para de fazer perguntas", "você não sabe o que está mexendo", "sai disso enquanto pode". Podem ser lidas como ameaças. São súplicas de pânico — ele tentava protegê-la.',
    }}),

    prisma.clue.create({ data: {
      title: 'Carro de Owen visto próximo à casa de Sofia',
      status: 'found',
      location: 'Rua dos Pinheiros',
      description: 'Dana Mercer viu o carro de Owen Marsh passando pela rua de Sofia três vezes na semana antes do assassinato. Não parou — só passou devagar.',
    }}),

    prisma.clue.create({ data: {
      title: 'Caminhão de Marcus próximo à casa de Ruth',
      status: 'found',
      location: 'Rua de Ruth Calloway',
      description: 'Pete Harlan viu o caminhão vermelho de Marcus Cole perto da casa de Ruth na noite da morte dela. Pete ainda não revelou isso voluntariamente — está com medo.',
    }}),

    prisma.clue.create({ data: {
      title: 'Sofia esteve na Prefeitura',
      status: 'found',
      location: 'Prefeitura',
      description: 'Funcionária da recepção viu Sofia Maves no dia anterior à sua morte sendo atendida pela Prefeita Briggs por cerca de 10 minutos. Saiu rapidamente. Parecia animada antes de entrar, calada ao sair.',
    }}),

    prisma.clue.create({ data: {
      title: 'Documentos do Culto de 1947',
      status: 'hidden',
      location: 'Sacristia da Igreja de Black Pines',
      description: 'Pasta com anotações e fotografias do avô do Pastor Grove. Registra o "conflito infeliz" com o culto do lago. As fotos mostram o local do massacre às margens do Cedar Lake. O Símbolo aparece claramente em pelo menos três imagens — muito antes dos crimes atuais.',
    }}),

    prisma.clue.create({ data: {
      title: 'Registro Falso — Morte de Mara Thorne, 1973',
      status: 'hidden',
      location: 'Arquivo Municipal (gaveta 1974)',
      description: 'Atestado de óbito registrando a morte de Mara Thorne (6 anos) como "afogamento acidental no Cedar Lake". Assinado pelo pai do Xerife Patton, então delegado. Sofia tinha uma fotocópia deste documento entre suas pesquisas. Era o que ela levou à delegacia.',
    }}),

    prisma.clue.create({ data: {
      title: 'Ligação da Prefeitura para a Delegacia',
      status: 'hidden',
      location: 'Registros de ligação — Prefeitura',
      description: 'Registro de ligação da linha direta da Prefeita Briggs para a delegacia no mesmo dia em que Sofia a visitou. Duração: 4 minutos. Sem transcrição. Patton recebeu essa ligação horas antes do assassinato de Sofia.',
    }}),

    prisma.clue.create({ data: {
      title: 'Blackouts de Marcus Cole',
      status: 'hidden',
      location: 'Casa de Marcus Cole',
      description: 'Esposa de Marcus relata que ele tem acordado desorientado, sem lembrar de onde esteve. Botas sujas de lama pela manhã sem explicação. Começou três meses atrás — após a noite que ele passou no Cedar Lake.',
    }}),

    prisma.clue.create({ data: {
      title: 'Pete viu Edgar na varanda às 3h',
      status: 'hidden',
      location: 'Cedar Lake / Casa de Edgar Thorne',
      description: 'Pete Harlan viu Edgar Thorne parado na varanda do segundo andar às 3h da manhã — na mesma noite em que Sofia foi assassinada. Edgar estava de costas, encarando o lago. Completamente imóvel por pelo menos 20 minutos.',
    }}),

    prisma.clue.create({ data: {
      title: 'Carta de Edgar — Endereço no Oregon',
      status: 'hidden',
      location: 'Casa de Edgar Thorne',
      description: 'Linda Cross guardou na memória o endereço de Portland, Oregon que aparecia numa das cartas de Edgar para envio. O conteúdo que ela leu: texto fragmentado com o Símbolo desenhado. Uma pesquisa no endereço revela que foi sede de um grupo de pesquisa paranormal dissolvido em 1991. O mesmo grupo aparece num arquivo Blue Rose não publicado sobre um incidente em 1989.',
    }}),

    prisma.clue.create({ data: {
      title: 'Arquivos em chamas — Casa de Patton',
      status: 'hidden',
      location: 'Residência de Patton',
      description: 'Vizinho de Patton notou fumaça saindo do quintal dele tarde da noite, três dias após a chegada do FBI. Patton disse que estava "queimando lixo antigo". São os arquivos do pai — os que conectam a família Patton ao encobrimento de 1973.',
    }}),

    prisma.clue.create({ data: {
      title: 'Ausência no diário — a noite que falta',
      status: 'red-herring',
      location: 'Diário "Agente Sofia"',
      description: 'PISTA FALSA INTERPRETATIVA: Jogadores podem concluir que a ausência de entrada no diário prova que Sofia parou a investigação. Na verdade, ela foi agir — foi à delegacia — e simplesmente não teve tempo de escrever.',
    }}),
  ])

  // ── LINHA DO TEMPO ──────────────────────────────────────
  await Promise.all([

    prisma.event.create({ data: { title: 'O Massacre do Culto do Lago', date: '1947', type: 'death', order: 10, description: 'Famílias devotas do Cedar Lake foram violentamente dispersadas pela comunidade, liderada pelo pastor local. O líder foi afogado no lago. Registrado como "conflito infeliz". O Símbolo aparece em fotografias daquela noite.' } }),

    prisma.event.create({ data: { title: 'O Linchamento de James Edlow', date: '1953', type: 'death', order: 20, description: 'Trabalhador sazonal acusado de "enlouquecer" perto do lago. Homens das famílias Marsh, Grove e Briggs formaram uma multidão. Registrado como "incidente não resolvido". O Símbolo está gravado numa árvore no local.' } }),

    prisma.event.create({ data: { title: 'Família Thorne chega a Black Pines', date: '1973', type: 'event', order: 30, description: 'Edgar Thorne, jovem geólogo, chega com esposa e filha Mara (6 anos) para mapear depósitos minerais. Descobre anomalias no Cedar Lake.' } }),

    prisma.event.create({ data: { title: 'Mara Thorne morre — Encobrimento', date: '1973', type: 'death', order: 40, description: 'Mara é encontrada catatônica à beira do lago. Morre dias depois. O pai do Xerife Patton registra como "afogamento acidental". Edgar recusa partir. Enterra a filha perto do lago sem registro oficial.' } }),

    prisma.event.create({ data: { title: 'Início da reclusão de Edgar Thorne', date: '1974', type: 'event', order: 50, description: 'Edgar passa a viver em isolamento total. Começa 50 anos de observação e estudo da energia do lago. Aprende, com o tempo, a não apenas sentir — mas direcionar.' } }),

    prisma.event.create({ data: { title: 'Marcus Cole passa a noite no lago', date: '3 meses antes da campanha', type: 'event', order: 60, description: 'Em meio a uma crise conjugal, Marcus vai ao Cedar Lake de madrugada. Fica horas à beira da água. A energia do lago o marca. Primeiros blackouts começam semanas depois.' } }),

    prisma.event.create({ data: { title: 'Sofia inicia pesquisa histórica', date: '5 semanas antes', type: 'event', order: 70, description: 'Sofia começa a pesquisar a história de Black Pines como hobby. Encontra registros de mortes não explicadas no lago, o nome Thorne, e referências ao culto de 1947.' } }),

    prisma.event.create({ data: { title: 'Sofia visita a Prefeitura', date: '2 dias antes', type: 'event', order: 80, description: 'Sofia apresenta suas descobertas à Prefeita Briggs. É dispensada em 10 minutos. Briggs liga para Patton logo depois.' } }),

    prisma.event.create({ data: { title: 'Briggs liga para Patton', date: '2 dias antes — tarde', type: 'event', order: 85, description: 'Ligação de 4 minutos da Prefeitura para a Delegacia. "Informar sobre uma situação inconveniente." Sem gravar o conteúdo. Patton age.' } }),

    prisma.event.create({ data: { title: 'Assassinato de Sofia Maves', date: 'Início da campanha', type: 'death', order: 90, description: 'Sofia é encontrada morta. O Símbolo aparece no local. O Xerife Patton chama o FBI alegando padrão de serial killer ritualístico. Ele é o assassino.' } }),

    prisma.event.create({ data: { title: 'Agente FBI chega a Black Pines', date: 'Dia 1', type: 'event', order: 100, description: 'O agente federal inicia a investigação ao lado do Xerife Patton. Framework inicial: serial killer ritualístico com assinatura no local. Framework errado.' } }),
  ])

  // ── NOTAS DO MESTRE ─────────────────────────────────────
  await Promise.all([

    prisma.note.create({ data: {
      title: 'O Símbolo — Regras de Aparição',
      category: 'plot',
      content: 'O Símbolo NÃO é deixado por ninguém. Aparece espontaneamente em madeira, pedra e ocasionalmente pele onde a energia do lago age com força. Locais confirmados: cenas dos crimes, fotografias de 1947, árvore do linchamento de 1953, paredes do quarto de Mara (casa de Edgar), cartas de Edgar. Quando o agente FBI encontrar o Símbolo em múltiplos locais históricos, esse é o momento onde o framework de serial killer começa a rachar.',
    }}),

    prisma.note.create({ data: {
      title: 'A Mecânica do Lago — Regras',
      category: 'plot',
      content: 'A energia do lago:\n1. Alimenta-se do pecado COLETIVO da cidade (silêncio, cumplicidade, proteção de legados)\n2. Sobe em ciclos (~25-30 anos). 1947, 1973, agora.\n3. Quando forte o suficiente, pode corromper QUALQUER pessoa — não precisa de maldade individual. Marcus foi marcado na crise emocional, não por ser mau.\n4. Edgar aprendeu a DIRECIONAR essa influência após 50 anos. Isso torna esse ciclo diferente de todos os outros.\n5. O que Edgar quer: comungar com a energia até morrer, protegendo o lago de exposição. Não tem agenda grandiosa — é devoção.',
    }}),

    prisma.note.create({ data: {
      title: 'Blue Rose — Como introduzir',
      category: 'plot',
      content: 'O agente FBI NÃO sabe que é um caso Blue Rose. A introdução deve ser gradual:\n\nAto 1: Framework de serial killer. O Símbolo como assinatura.\nAto 2: Marcus Cole não encaixa em nenhum perfil. A morte de Ruth não tem lógica humana. A investigação não fecha.\nAto 3: Uma ligação de Washington de um supervisor desconhecido. Ou um arquivo que aparece na mesa do agente com casos similares. Ou o endereço do Oregon de Linda Cross abre algo.\n\nO agente pode ignorar na primeira vez. Deve ignorar, inclusive. O Blue Rose não se anuncia.',
    }}),

    prisma.note.create({ data: {
      title: 'Patton — Como jogar durante a campanha',
      category: 'npc',
      content: 'Patton deve parecer que ESTÁ escondendo algo — porque está. Mas os jogadores devem concluir que é a incompetência do pai, não o próprio assassinato.\n\nComportamentos a jogar:\n- Fica visivelmente tenso quando Thorne/1973 aparecem na conversa\n- Acessa as cenas do crime antes do FBI "para checar" — manipula evidências sutilmente\n- Às vezes sabe de detalhes que não deveria saber (se perguntarem como, inventa)\n- Queima documentos em casa (vizinho notou)\n- Ocasionalmente redireciona a investigação para Owen Marsh sem parecer forçado\n\nA revelação final deve ser um momento de silêncio na mesa.',
    }}),
  ])

  return Response.json({ ok: true, message: 'Black Pines semeado com sucesso.' })
}
