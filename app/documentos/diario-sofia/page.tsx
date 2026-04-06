import PageTransition from '@/components/PageTransition'

type EntryType = 'normal' | 'agente' | 'tension'

interface DiaryEntry {
  date: string
  type: EntryType
  content: React.ReactNode
}

const entries: DiaryEntry[] = [
  {
    date: '3 de junho, 1995 — sábado',
    type: 'normal',
    content: (
      <>
        <p>Último dia de aula foi hoje. O Pê me jogou borracha no cabelo durante a prova de história e eu fingi que não tinha percebido porque rir ia tirar ponto. O prof. Albrecht ficou me olhando como se eu fosse colar. Não ia. Ele é enjoado mas eu sabia a resposta.</p>
        <p style={{ marginTop: '0.8rem' }}>Jenny quer ir à Lagoa Negra na sexta com o Thomas e mais uns. Falei que talvez. Não sei. A lagoa sempre me dá uma sensação esquisita que não consigo explicar direito. Não é medo. É outra coisa.</p>
        <p style={{ marginTop: '0.8rem' }}>Férias de inverno. Finalmente.</p>
      </>
    ),
  },
  {
    date: '17 de junho, 1995 — domingo',
    type: 'agente',
    content: (
      <>
        <p style={{ fontStyle: 'italic', opacity: 0.7, fontSize: '0.8rem', marginBottom: '0.6rem' }}>[ AGENTE SOFIA — REGISTRO #001 ]</p>
        <p>Passei a tarde na biblioteca porque estava frio e a biblioteca tem aquecedor. Fui pegar um livro qualquer e acabei no corredor dos arquivos de jornal antigo. Tem uma caixinha de microfilme que ninguém toca desde aparentemente 1976.</p>
        <p style={{ marginTop: '0.8rem' }}>Encontrei um artigo do Correio da Serra de novembro de 1947 sobre "incidente envolvendo moradores na região da Lagoa Negra." Sem detalhes. Uma linha. Como se alguém tivesse publicado porque era obrigado a publicar alguma coisa, não porque queria contar.</p>
        <p style={{ marginTop: '0.8rem' }}>Não sei por que isso ficou na minha cabeça. Provavelmente é só história de cidade pequena chata. Mas vou anotar aqui: novembro de 1947, Lagoa Negra, "incidente."</p>
      </>
    ),
  },
  {
    date: '25 de junho, 1995 — segunda-feira',
    type: 'normal',
    content: (
      <>
        <p>Fui à Venda Becker buscar um chocolate quente e o Marcos estava lá esperando um pedido de entrega. Ele fez uma piada horrível sobre cuca fria que não tem a menor graça mas eu ri mesmo assim porque ele ficou tão orgulhoso da piada que foi impossível não rir. Ele é muito idiota de um jeito muito difícil de odiar.</p>
        <p style={{ marginTop: '0.8rem' }}>A Dona Ruth fez questão de me dar uma fatia de strudel de graça e me contou a mesma história de quando minha mãe era nova que ela me conta toda vez. Adorei ouvir de novo.</p>
        <p style={{ marginTop: '0.8rem' }}>Fui embora com o chocolate e fiquei pensando que gosto muito de morar aqui. E às vezes odeio isso porque parece que é fácil demais não ir embora.</p>
      </>
    ),
  },
  {
    date: '8 de julho, 1995 — sábado',
    type: 'agente',
    content: (
      <>
        <p style={{ fontStyle: 'italic', opacity: 0.7, fontSize: '0.8rem', marginBottom: '0.6rem' }}>[ AGENTE SOFIA — REGISTRO #002 ]</p>
        <p>Voltei à biblioteca. Passei três horas no microfilme e encontrei mais referências à Lagoa Negra entre 1940 e 1975. Nenhuma com detalhe. Uma em 1947 (o "incidente"), uma em 1953 (homem encontrado morto, registrado como "acidente não esclarecido"), e outras ao longo dos anos com apenas menção a "restrição de acesso temporário à lagoa por precaução." Uma de 1974 menciona uma família que saiu da cidade "sem deixar endereço."</p>
        <p style={{ marginTop: '0.8rem' }}>O que me deixou estranha foi a consistência. Não são eventos aleatórios. É um padrão de coisas que acontecem perto da lagoa e depois somem dos registros públicos.</p>
        <p style={{ marginTop: '0.8rem' }}>Vou tentar achar os nomes. Família que saiu em 1974 — sem endereço. Começar por aí.</p>
        <p style={{ marginTop: '0.8rem', fontSize: '0.78rem', fontStyle: 'italic', opacity: 0.6 }}>Isso provavelmente é bobagem. Mas é uma bobagem interessante.</p>
      </>
    ),
  },
  {
    date: '16 de julho, 1995 — domingo',
    type: 'normal',
    content: (
      <>
        <p>O Thomas foi à lagoa de novo no fim de semana. Ele vai quase toda semana. Jenny falou que isso é estranho mas eu acho que é só ele querendo ter um lugar só dele. Quando eu tinha quinze anos ficava na árvore atrás de casa por horas sem fazer nada. Todo mundo precisa de um lugar assim.</p>
        <p style={{ marginTop: '0.8rem' }}>Jenny está estranha. Não sei como explicar. Ela está presente mas parece que a cabeça está em outro lugar. Perguntei se estava tudo bem e ela disse que sim de um jeito que claramente não era verdade mas não insisti.</p>
        <p style={{ marginTop: '0.8rem' }}>Fiquei ouvindo aquele CD novo que a prima trouxe de Porto Alegre. Três vezes seguidas. Sem arrependimento nenhum.</p>
      </>
    ),
  },
  {
    date: '29 de julho, 1995 — sábado',
    type: 'agente',
    content: (
      <>
        <p style={{ fontStyle: 'italic', opacity: 0.7, fontSize: '0.8rem', marginBottom: '0.6rem' }}>[ AGENTE SOFIA — REGISTRO #003 ]</p>
        <p>Encontrei o nome. A família que saiu em 1974: <strong>Weil</strong>. Um pai, Edgar Weil, geólogo, e uma filha, Mara, seis anos. A esposa havia morrido antes de eles saírem. O Correio da Serra de julho de 1974 diz que "Edgar Weil encerrou sua estadia na cidade." Só isso.</p>
        <p style={{ marginTop: '0.8rem' }}>Só que eu perguntei para a dona Linda do armazém sobre o nome Weil, por acaso, fingindo que era pesquisa de escola, e ela parou tudo e ficou quieta por uns três segundos antes de responder. "Não me lembro desse nome." E aí mudou de assunto muito depressa.</p>
        <p style={{ marginTop: '0.8rem' }}>Lembra-se mas não quer falar. Anoto: Edgar Weil. 1974. Lagoa Negra. Saída sem endereço.</p>
        <p style={{ marginTop: '0.8rem' }}>Vou tentar os arquivos da Prefeitura.</p>
      </>
    ),
  },
  {
    date: '4 de agosto, 1995 — sexta-feira',
    type: 'tension',
    content: (
      <>
        <p>O Arno Hartmann me parou na saída do mercado hoje. Ele é o dono da serraria, aquele com a cara sempre fechada. Nunca falou comigo na vida. Ele disse: "Ouvi que você anda fazendo perguntas sobre a história da cidade." Eu disse que era pesquisa. Ele ficou olhando pra mim um tempo que foi desconfortável e então disse: "Algumas histórias não precisam de pesquisa. Especialmente de gente jovem."</p>
        <p style={{ marginTop: '0.8rem' }}>Saiu sem mais nada.</p>
        <p style={{ marginTop: '0.8rem' }}>Não sei o que isso significa. Provavelmente ele é só mal-humorado. Mas foi estranho. Escrevo aqui porque não quero esquecer a sensação.</p>
      </>
    ),
  },
  {
    date: '11 de agosto, 1995 — sexta-feira',
    type: 'agente',
    content: (
      <>
        <p style={{ fontStyle: 'italic', opacity: 0.7, fontSize: '0.8rem', marginBottom: '0.6rem' }}>[ AGENTE SOFIA — REGISTRO #004 ]</p>
        <p>Achei nos arquivos da Prefeitura um processo de 1973 sobre uma família chamada <strong>Correa</strong>. Laudo de morte — três membros da família, o pai por último. Registrado como "tragédia familiar, colapso mental." Assinado por um delegado cujo sobrenome é Pinheiro. Não o delegado atual — o pai dele, provavelmente.</p>
        <p style={{ marginTop: '0.8rem' }}>O que me chamou atenção: a data. Fevereiro de 1973. Edgar Weil aparece em registros da cidade pela primeira vez em março de 1973. Um mês depois da morte dos Correa. Chegou depois.</p>
        <p style={{ marginTop: '0.8rem' }}>A casa dos Correa ainda existe. Fica no caminho de terra que vai para a Lagoa Negra. Abandonada. Todo mundo sabe que existe, ninguém vai lá.</p>
        <p style={{ marginTop: '0.8rem' }}>Não é prova de nada. Mas o nome Correa e o nome Weil e a Lagoa Negra estão todos no mesmo círculo de anos. Isso não é coincidência que dá para ignorar.</p>
      </>
    ),
  },
  {
    date: '19 de agosto, 1995 — domingo',
    type: 'normal',
    content: (
      <>
        <p>Inverno quase acabando. Jenny e eu ficamos até tarde no quintal dela ontem à noite escutando o rádio e não fazendo nada. Foi bom. Às vezes é isso — ficar sem fazer nada com uma pessoa de quem você gosta.</p>
        <p style={{ marginTop: '0.8rem' }}>Ela perguntou sobre o que eu estava escrevendo no diário e eu disse que era só coisas. Ela não insistiu mas olhou de um jeito que significa que ela sabe que tem mais coisa. Ela sempre sabe.</p>
        <p style={{ marginTop: '0.8rem' }}>Falamos sobre o Thomas um pouco. Ela disse que ele foi à lagoa de novo na sexta. Ela disse de um jeito que não era conversa — era desabafo. Não sei o que fazer com isso.</p>
        <p style={{ marginTop: '0.8rem' }}>Vi o Marcos na rua de bicicleta fazendo entrega. Ele acenou com os dois braços ao mesmo tempo e quase derrubou tudo. Idiota absoluto.</p>
      </>
    ),
  },
  {
    date: '2 de setembro, 1995 — sábado',
    type: 'agente',
    content: (
      <>
        <p style={{ fontStyle: 'italic', opacity: 0.7, fontSize: '0.8rem', marginBottom: '0.6rem' }}>[ AGENTE SOFIA — REGISTRO #005 ]</p>
        <p>Encontrei uma foto. Num álbum de fotos da cidade de 1947 que fica na sala de história da biblioteca, que ninguém abre nunca. É uma foto da margem da Lagoa Negra. Tem um grupo de pessoas mas o que me parou foi um detalhe na pedra da margem: um símbolo gravado. Difícil descrever — como duas linhas curvas que se fecham em espiral, com um traço central. Simples mas preciso.</p>
        <p style={{ marginTop: '0.8rem' }}>Isso me assustou mais do que devia. Não sei por quê.</p>
        <p style={{ marginTop: '0.8rem' }}>Procurei o símbolo em outros materiais. Não encontrei referência histórica nenhuma. Não é símbolo indígena, não é marca de família, não é nada que eu reconheça.</p>
        <p style={{ marginTop: '0.8rem' }}>Desenhei aqui: <span style={{ display: 'inline-block', margin: '4px 0', border: '1px solid currentColor', borderRadius: '2px', padding: '2px 6px', fontSize: '0.75rem', fontStyle: 'normal', opacity: 0.8 }}>[ ver verso — esboço ]</span></p>
      </>
    ),
  },
  {
    date: '14 de setembro, 1995 — quinta-feira',
    type: 'tension',
    content: (
      <>
        <p>Jenny brigou comigo hoje. De verdade, não o tipo de briga que passa em meia hora. Ela disse que eu estava obcecada com "essa coisa toda" e que ia me machucar e que eu precisava parar.</p>
        <p style={{ marginTop: '0.8rem' }}>Tentei explicar que era pesquisa histórica e ela disse — e isso foi estranho — "Sofia, o que você está procurando não é história."</p>
        <p style={{ marginTop: '0.8rem' }}>Perguntei o que ela quis dizer. Ela fechou. Disse "esquece" e foi embora. A última coisa que ela falou foi: "Por favor. Para."</p>
        <p style={{ marginTop: '0.8rem' }}>Não entendo. Parece ciúme da minha pesquisa mas não parece só isso. Ela estava assustada, não com raiva. Isso é diferente.</p>
        <p style={{ marginTop: '0.8rem' }}>Não vou parar. Mas anoto aqui porque foi estranho.</p>
      </>
    ),
  },
  {
    date: '22 de setembro, 1995 — sexta-feira',
    type: 'tension',
    content: (
      <>
        <p>O Arno Hartmann passou na frente de casa duas vezes hoje. Eu vi da janela. Ele não desceu do carro, só passou devagar. Pode ser coincidência — ele mora perto. Mas é a segunda vez essa semana.</p>
        <p style={{ marginTop: '0.8rem' }}>E ontem de manhã tinha uma nota embaixo da porta. Papel dobrado, sem assinatura. "Deixa pra lá. Por favor." Letra grande, pressa.</p>
        <p style={{ marginTop: '0.8rem' }}>Não sei se foi o Hartmann. Não sei se foi Jenny. Não sei se foi outra pessoa que eu nem imaginei ainda.</p>
        <p style={{ marginTop: '0.8rem' }}>O "por favor" no final é estranho. Parece desespero, não ameaça. Guardo a nota.</p>
      </>
    ),
  },
  {
    date: '30 de setembro, 1995 — sábado',
    type: 'agente',
    content: (
      <>
        <p style={{ fontStyle: 'italic', opacity: 0.7, fontSize: '0.8rem', marginBottom: '0.6rem' }}>[ AGENTE SOFIA — REGISTRO #006 ]</p>
        <p>Vi Jenny saindo de casa às duas da manhã. Eu não conseguia dormir, estava na janela, e a vi atravessar a rua de casaco. Fui até a janela da frente e a perdi de vista mas a direção era claramente em direção à Lagoa Negra.</p>
        <p style={{ marginTop: '0.8rem' }}>Fiquei acordada esperando ela voltar. Voltou às quatro. Entrou em casa sem olhar pra cima.</p>
        <p style={{ marginTop: '0.8rem' }}>Esse é o terceiro comportamento estranho de Jenny em dois meses. As brigas. A nota (acho que foi ela). Agora a lagoa de madrugada.</p>
        <p style={{ marginTop: '0.8rem' }}>Mas o Thomas morreu na lagoa. Ela provavelmente vai lá porque sente falta dele. Isso faz sentido humano. Eu não devia colocar no caderno de investigação.</p>
        <p style={{ marginTop: '0.8rem' }}>Mas coloco mesmo assim porque não consigo separar. Desculpa Jenny.</p>
      </>
    ),
  },
  {
    date: '7 de outubro, 1995 — sábado',
    type: 'agente',
    content: (
      <>
        <p style={{ fontStyle: 'italic', opacity: 0.7, fontSize: '0.8rem', marginBottom: '0.6rem' }}>[ AGENTE SOFIA — REGISTRO #007 ]</p>
        <p>Achei que Edgar Weil ainda está aqui. Não saiu em 1974 — os registros de 1974 dizem que ele "encerrou sua estadia" mas isso é a versão do jornal. O registro de propriedade mostra uma casa no alto da estrada que vai para a lagoa registrada em nome dele desde 1973 e nunca vendida.</p>
        <p style={{ marginTop: '0.8rem' }}>Edgar Weil tem uns setenta anos agora, se ainda estiver vivo. Ninguém o menciona. Ninguém anda lá. A dona Linda do armazém ainda não reconhece o nome.</p>
        <p style={{ marginTop: '0.8rem' }}>O símbolo da foto de 1947. O nome Weil surgindo meses depois da morte dos Correa em 1973. A energia estranha que a lagoa passa. A casa que continua em nome dele vinte anos depois. A filha que morreu.</p>
        <p style={{ marginTop: '0.8rem' }}>Não sei o que é isso. Mas é um centro. Edgar Weil é o centro de alguma coisa que a cidade enterrou.</p>
        <p style={{ marginTop: '0.8rem' }}>Tenho que ir até lá. Preciso ver a Casa Correa primeiro — os registros indicam que é onde os Correa morreram em 1973, um mês antes do Weil aparecer. Se houver alguma coisa física que conecte os dois, vai estar lá.</p>
      </>
    ),
  },
  {
    date: '11 de outubro, 1995 — quarta-feira',
    type: 'normal',
    content: (
      <>
        <p>Prova de literatura amanhã. Estudei, acho. Não sei se estudei o suficiente. O Albrecht vai com certeza perguntar sobre o Machado de Assis e eu sempre confundo os capítulos do meio do Memórias Póstumas.</p>
        <p style={{ marginTop: '0.8rem' }}>O Marcos trouxe entrega errada pra nossa casa e ficou dez minutos na porta tentando explicar por que ele tinha certeza que era o número certo. A matemática dele não fechava de jeito nenhum e ele sabia disso mas continuava tentando. Minha mãe quase contratou ele pra ficar como mascote da casa.</p>
        <p style={{ marginTop: '0.8rem' }}>Liguei pra Jenny à noite. Atendeu depois de cinco toques e falamos por meia hora sobre nada. Foi bom. Sinto falta de quando era mais fácil.</p>
        <p style={{ marginTop: '0.8rem' }}>Tenho uma teoria. Vou confirmar com alguém de confiança.</p>
      </>
    ),
  },
]

const typeStyle: Record<EntryType, { borderColor: string; label?: string; labelColor?: string }> = {
  normal: { borderColor: '#c8b89080' },
  agente: { borderColor: '#5a3a2090', label: 'Agente Sofia', labelColor: '#8B4513' },
  tension: { borderColor: '#8B000060' },
}

export default function DiarioSofiaPage() {
  return (
    <PageTransition>
      <div className="min-h-screen py-12 px-6"
        style={{ background: 'linear-gradient(180deg, #0a0a0a 0%, #0f0f0f 100%)' }}>

        {/* Header label */}
        <div className="text-center mb-8">
          <div style={{ fontFamily: "'Special Elite', monospace", fontSize: '0.6rem', letterSpacing: '0.25em', color: '#4a4a4a', textTransform: 'uppercase', marginBottom: '4px' }}>
            Documento In-World · Encontrado na Sessão 3
          </div>
          <div style={{ fontFamily: "'Special Elite', monospace", fontSize: '0.6rem', letterSpacing: '0.15em', color: '#3a3a3a', textTransform: 'uppercase' }}>
            No fundo de uma gaveta · Atrás de cadernos de escola
          </div>
        </div>

        {/* Capa */}
        <div className="mx-auto max-w-xl mb-6 text-center py-8 px-6 relative overflow-hidden"
          style={{
            background: 'linear-gradient(160deg, #2a1a0a 0%, #1e1206 100%)',
            border: '1px solid #4a3020',
            boxShadow: '0 4px 30px rgba(0,0,0,0.6)',
          }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`, opacity: 0.06, pointerEvents: 'none' }} />
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', fontStyle: 'italic', color: '#c8a870', marginBottom: '6px', position: 'relative', zIndex: 1 }}>
            Diário
          </div>
          <div style={{ fontFamily: "'Special Elite', monospace", fontSize: '0.65rem', letterSpacing: '0.2em', color: '#7a5a3a', textTransform: 'uppercase', position: 'relative', zIndex: 1 }}>
            Sofia Neves · 1995
          </div>
          <div style={{ marginTop: '12px', borderTop: '1px solid #4a3020', paddingTop: '10px', fontFamily: "'Crimson Text', serif", fontSize: '0.8rem', fontStyle: 'italic', color: '#5a4030', position: 'relative', zIndex: 1 }}>
            São Francisco de Paula, RS
          </div>
        </div>

        {/* Nota mestre */}
        <div className="mx-auto max-w-xl mb-8 px-4 py-3"
          style={{
            background: '#1a0a0a', border: '1px solid #3a1515',
            fontFamily: "'Special Elite', monospace", fontSize: '0.62rem',
            color: '#6B4444', letterSpacing: '0.08em', lineHeight: 1.8,
          }}>
          <div style={{ color: '#8B0000', marginBottom: '4px', letterSpacing: '0.15em' }}>NOTA PARA O MESTRE</div>
          O diário não contém nenhuma entrada sobre a visita ao arquivo municipal. Não menciona o relatório do delegado Pinheiro de 1973. A última entrada é completamente normal. A ausência é a pista mais importante deste documento.
        </div>

        {/* Entradas */}
        <div className="mx-auto max-w-xl space-y-0">
          {entries.map((entry, i) => {
            const style = typeStyle[entry.type]
            const isAgente = entry.type === 'agente'

            return (
              <div key={i} style={{
                background: isAgente
                  ? 'linear-gradient(160deg, #f5ead0 0%, #ede0c0 100%)'
                  : 'linear-gradient(160deg, #f8f2e4 0%, #f0e8d4 100%)',
                borderLeft: `3px solid ${style.borderColor}`,
                padding: '1.75rem 2rem',
                position: 'relative', overflow: 'hidden',
              }}>
                {/* Textura papel */}
                <div style={{ position: 'absolute', inset: 0, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`, opacity: 0.045, pointerEvents: 'none' }} />
                {/* Linhas pautadas */}
                <div style={{ position: 'absolute', inset: '0 0 0 0', backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, rgba(120,80,20,0.07) 31px, rgba(120,80,20,0.07) 32px)', backgroundPositionY: '2rem', pointerEvents: 'none' }} />

                <div style={{ position: 'relative', zIndex: 1 }}>
                  {/* Data */}
                  <div style={{ fontFamily: "'Special Elite', monospace", fontSize: '0.65rem', letterSpacing: '0.12em', color: isAgente ? '#7a4a20' : '#8a7050', textTransform: 'uppercase', marginBottom: isAgente ? '0.25rem' : '0.75rem' }}>
                    {entry.date}
                  </div>

                  {/* Label Agente Sofia */}
                  {style.label && (
                    <div style={{ fontFamily: "'Special Elite', monospace", fontSize: '0.6rem', letterSpacing: '0.15em', color: style.labelColor, textTransform: 'uppercase', marginBottom: '0.75rem', paddingBottom: '0.4rem', borderBottom: `1px solid ${style.labelColor}40` }}>
                      ▪ {style.label}
                    </div>
                  )}

                  {/* Conteúdo */}
                  <div style={{
                    fontFamily: isAgente ? "'Special Elite', monospace" : "'Crimson Text', Georgia, serif",
                    fontSize: isAgente ? '0.78rem' : '1.05rem',
                    lineHeight: isAgente ? 1.9 : 1.75,
                    color: isAgente ? '#2a1808' : '#1a1008',
                    letterSpacing: isAgente ? '0.02em' : '0',
                  }}>
                    {entry.content}
                  </div>
                </div>

                {i < entries.length - 1 && (
                  <div style={{ position: 'absolute', bottom: 0, left: '10%', right: '10%', height: '1px', background: 'rgba(120,80,20,0.12)' }} />
                )}
              </div>
            )
          })}
        </div>

        {/* Contracapa */}
        <div className="mx-auto max-w-xl mt-0"
          style={{ background: 'linear-gradient(160deg, #2a1a0a 0%, #1e1206 100%)', border: '1px solid #4a3020', borderTop: 'none', padding: '1.25rem 2rem', textAlign: 'center' }}>
          <span style={{ fontFamily: "'Crimson Text', serif", fontSize: '0.85rem', fontStyle: 'italic', color: '#5a4030' }}>
            — fim das entradas —
          </span>
        </div>

        {/* Label inferior */}
        <div className="text-center mt-8">
          <span style={{ fontFamily: "'Special Elite', monospace", fontSize: '0.6rem', color: '#2a2a2a', letterSpacing: '0.2em' }}>
            ◆ &nbsp; São Francisco de Paula, RS · 1995 · Evidência #03 &nbsp; ◆
          </span>
        </div>
      </div>
    </PageTransition>
  )
}
