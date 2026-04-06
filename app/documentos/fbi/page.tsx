import PageTransition from '@/components/PageTransition'
import PrintButton from './PrintButton'

function Redact({ width = 110 }: { width?: number }) {
  return (
    <span style={{
      display: 'inline-block', background: '#1a1208', color: '#1a1208',
      width: `${width}px`, height: '0.95em', borderRadius: '1px',
      verticalAlign: 'middle', margin: '0 2px', userSelect: 'none',
    }}>&nbsp;</span>
  )
}

function Stamp({ children, color = '#8B0000', angle = -1.5 }: {
  children: string; color?: string; angle?: number
}) {
  return (
    <span style={{
      display: 'inline-block', border: `2.5px solid ${color}`, color,
      fontFamily: "'Special Elite', monospace", fontSize: '0.62rem',
      letterSpacing: '0.22em', padding: '3px 10px 2px',
      transform: `rotate(${angle}deg)`, opacity: 0.85,
      textTransform: 'uppercase', whiteSpace: 'nowrap',
    }}>{children}</span>
  )
}

function Ink({ children, angle = -0.8, color = '#1a2f70' }: {
  children: React.ReactNode; angle?: number; color?: string
}) {
  return (
    <span style={{
      fontFamily: "'Crimson Text', Georgia, serif", fontStyle: 'italic',
      fontSize: '0.83rem', color, transform: `rotate(${angle}deg)`,
      display: 'inline-block', lineHeight: 1.5,
    }}>{children}</span>
  )
}

function Rule() {
  return <div style={{ borderTop: '1px solid #c8b89055', margin: '1.2rem 0' }} />
}

function SectionLabel({ children }: { children: string }) {
  return (
    <div style={{
      fontFamily: "'Special Elite', monospace", fontSize: '0.6rem',
      letterSpacing: '0.2em', color: '#8B0000', textTransform: 'uppercase',
      borderBottom: '1px solid #c8b89040', paddingBottom: '4px', marginBottom: '0.7rem',
    }}>{children}</div>
  )
}

function FieldLabel({ children }: { children: string }) {
  return (
    <span style={{
      fontFamily: "'Special Elite', monospace", fontSize: '0.58rem',
      letterSpacing: '0.15em', textTransform: 'uppercase',
      color: '#6a5830', marginRight: '0.5rem',
    }}>{children}</span>
  )
}

export default function DPFDocumentPage() {
  return (
    <PageTransition>
      <div className="min-h-screen py-10 px-6 print-page-bg"
        style={{ background: 'linear-gradient(180deg, #080808 0%, #0f0f0f 100%)' }}>

        {/* Toolbar */}
        <div className="no-print flex items-center justify-between max-w-2xl mx-auto mb-5">
          <span style={{
            fontFamily: "'Special Elite', monospace", fontSize: '0.6rem',
            letterSpacing: '0.2em', color: '#3a3a3a', textTransform: 'uppercase',
          }}>
            Documento In-World · Sessão 1 · Entregar ao Agente
          </span>
          <PrintButton />
        </div>

        {/* O documento */}
        <div className="mx-auto max-w-2xl print-document" style={{
          background: 'linear-gradient(168deg, #f2e8d2 0%, #e9dfc5 55%, #ede4cc 100%)',
          boxShadow: '0 10px 70px rgba(0,0,0,0.85), inset 0 1px 0 rgba(255,255,255,0.25)',
          padding: '3rem 3.5rem 3.5rem', color: '#1a1208',
          position: 'relative', overflow: 'visible',
        }}>
          {/* Textura papel */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.88' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
            opacity: 0.065,
          }} />
          {/* Mancha café */}
          <div style={{
            position: 'absolute', right: '3rem', bottom: '4rem',
            width: '68px', height: '68px', borderRadius: '50%',
            border: '2px solid rgba(100,65,15,0.1)',
            boxShadow: 'inset 0 0 0 8px rgba(100,65,15,0.04)',
            pointerEvents: 'none',
          }} />

          {/* Carimbos de canto */}
          <div style={{ position: 'absolute', top: '1.6rem', left: '2.8rem' }}>
            <Stamp color="#8B0000" angle={-2}>Sigiloso</Stamp>
          </div>
          <div style={{ position: 'absolute', top: '1.6rem', right: '2.8rem' }}>
            <Stamp color="#8B0000" angle={1.5}>Distribuição Restrita</Stamp>
          </div>

          {/* Cabeçalho República */}
          <div style={{ marginTop: '2rem', borderBottom: '3px double #1a1208', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
            <div style={{
              fontFamily: "'Special Elite', monospace", fontSize: '0.58rem',
              letterSpacing: '0.2em', color: '#5a4830', marginBottom: '4px',
            }}>
              REPÚBLICA FEDERATIVA DO BRASIL · MINISTÉRIO DA JUSTIÇA
            </div>
            <div style={{
              fontFamily: "'Special Elite', monospace", fontSize: '1.1rem',
              letterSpacing: '0.25em', textTransform: 'uppercase',
              color: '#1a1208', fontWeight: 700,
            }}>
              Polícia Federal
            </div>
            <div style={{
              fontFamily: "'Special Elite', monospace", fontSize: '0.57rem',
              letterSpacing: '0.15em', color: '#5a4830', marginTop: '3px',
            }}>
              Departamento de Polícia Federal · Divisão de Análise de Padrões · Brasília, DF
            </div>
          </div>

          {/* Bloco Para/De/Data */}
          <div style={{
            fontFamily: "'Special Elite', monospace", fontSize: '0.7rem',
            lineHeight: 2.05, color: '#2a1e0e', marginBottom: '1.25rem',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
              <span><FieldLabel>Formulário</FieldLabel>DPF-DAP/117 (Rev. 1992)</span>
              <span><FieldLabel>Classificação</FieldLabel>SIGILOSO / R-2</span>
            </div>
            <Rule />
            <div><FieldLabel>Para:</FieldLabel><Redact width={145} /> — Agente, DPF / Brasília-DF</div>
            <div><FieldLabel>De:</FieldLabel>Assessor Esp. Nogueira — Análise de Padrões Comportamentais</div>
            <div><FieldLabel>Data:</FieldLabel>18 de setembro de 1995</div>
            <div><FieldLabel>Ref.:</FieldLabel>Designação de Campo — São Francisco de Paula, RS — Deslocamento Imediato</div>
            <div><FieldLabel>Cruzamento:</FieldLabel><Redact width={55} /> / Ocorrência 07, Curitiba-PR, 1991 (selada)</div>
          </div>

          <Rule />

          {/* Seção 1 */}
          <div style={{ marginBottom: '1.4rem' }}>
            <SectionLabel>1. Descrição do Caso</SectionLabel>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: "'Special Elite', monospace", fontSize: '0.7rem', lineHeight: 1.95, color: '#2a1e0e' }}>
              <tbody>
                {[
                  ['Vítima:', 'Sofia Neves · feminino · 17 anos · estudante'],
                  ['Causa da morte:', 'Asfixia por estrangulamento manual'],
                  ['Local:', 'Casa Correa · estrada de terra s/n · São Francisco de Paula, RS'],
                  ['Data / hora:', '17 de setembro de 1995 · hora estimada entre 17h e 20h'],
                  ['Descoberta:', '18 de setembro de 1995 · morador local'],
                  ['Evidências:', 'Fotografias da cena (11 imagens) · laudo de perícia estadual pendente'],
                ].map(([label, value]) => (
                  <tr key={label}>
                    <td style={{ width: '38%', color: '#6a5830', verticalAlign: 'top', paddingRight: '0.5rem' }}>{label}</td>
                    <td>{value}</td>
                  </tr>
                ))}
                <tr>
                  <td style={{ color: '#6a5830', verticalAlign: 'top', paddingRight: '0.5rem' }}>Suspeitos:</td>
                  <td>
                    Nenhum em custódia{'  '}
                    <Ink angle={-1} color="#1a2f70">→ padrão ativo — ver <Redact width={45} /> antes de partir</Ink>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <Rule />

          {/* Seção 2 */}
          <div style={{ marginBottom: '1.4rem' }}>
            <SectionLabel>2. Fundamento para Competência Federal</SectionLabel>
            <div style={{ fontFamily: "'Special Elite', monospace", fontSize: '0.7rem', lineHeight: 1.95, color: '#2a1e0e' }}>
              <p>
                Homicídio com elementos compatíveis com padrão ritual documentado em ocorrências
                anteriores de âmbito federal. Imagem #4 da série fotográfica da cena submetida ao
                sistema estadual (SINESPJC, 18/09/1995) gerou correspondência com arquivo de
                referência <Redact width={60} />.
              </p>
              <p style={{ marginTop: '0.5rem' }}>
                Cruzamento com: <strong>Ocorrência 07, Curitiba-PR, 1991</strong> (processo selado · acesso R-2).{'  '}
                <Ink angle={0.5} color="#1a2f70">mesmo padrão · confirmado</Ink>
              </p>
              <p style={{ marginTop: '0.5rem' }}>
                Possível conexão interestadual. Solicitação de apoio analítico à DAP/Brasília conforme
                protocolo interno.
              </p>
            </div>
          </div>

          <Rule />

          {/* Seção 3 */}
          <div style={{ marginBottom: '1.4rem' }}>
            <SectionLabel>3. Designação do Agente</SectionLabel>
            <div style={{ fontFamily: "'Special Elite', monospace", fontSize: '0.7rem', lineHeight: 1.95, color: '#2a1e0e' }}>
              <p>
                O agente <Redact width={145} /> fica designado para apoio investigativo
                à Delegacia de Polícia Civil de São Francisco de Paula, RS, com deslocamento
                imediato a partir de 18 de setembro de 1995.
              </p>
              <p style={{ marginTop: '0.5rem' }}>
                <FieldLabel>Duração:</FieldLabel>Em aberto.{'  '}
                <FieldLabel>Coordenação:</FieldLabel>Mandatória com autoridade local.
              </p>
              <p style={{ marginTop: '0.6rem' }}>
                <Ink angle={-0.5} color="#1a2f70">sem registro anterior com <Redact width={40} /> — perspectiva necessária.</Ink>
              </p>
            </div>
          </div>

          <Rule />

          {/* Seção 4 */}
          <div style={{ marginBottom: '1.4rem' }}>
            <SectionLabel>4. Coordenação com Autoridade Local</SectionLabel>
            <div style={{ fontFamily: "'Special Elite', monospace", fontSize: '0.7rem', lineHeight: 1.95, color: '#2a1e0e', position: 'relative' }}>
              {/* Círculo a caneta ao redor de Pinheiro */}
              <span style={{ position: 'relative', display: 'inline-block' }}>
                <span style={{
                  position: 'absolute', inset: '-4px -8px',
                  border: '1.5px solid #1a2f70', borderRadius: '50%',
                  transform: 'rotate(-1.5deg)', pointerEvents: 'none', opacity: 0.7,
                }} />
                <strong>Delegado Pinheiro</strong>
              </span>
              {', Delegacia de Polícia Civil de São Francisco de Paula.  '}
              <Ink angle={1} color="#1a2f70">AVALIAR CONFIABILIDADE — PRIORITÁRIO</Ink>
              <p style={{ marginTop: '0.5rem' }}>
                O delegado foi informado que a PF federal envia apoio técnico mediante solicitação
                da jurisdição local.{'  '}
                <Ink angle={-1} color="#5a4030">(não houve solicitação formal)</Ink>
              </p>
              <p style={{ marginTop: '0.5rem' }}>
                Origem do acionamento federal <strong>não deve ser divulgada</strong> à autoridade local
                nem ao comando regional.
              </p>
            </div>
          </div>

          <Rule />

          {/* Seção 5 */}
          <div style={{ marginBottom: '1.75rem' }}>
            <SectionLabel>5. Parâmetros Operacionais</SectionLabel>
            <div style={{ fontFamily: "'Special Elite', monospace", fontSize: '0.7rem', lineHeight: 2.1, color: '#2a1e0e' }}>
              {[
                { n: '01', content: 'Deslocamento imediato para São Francisco de Paula, RS.' },
                { n: '02', content: 'Apoio à investigação de homicídio em andamento.' },
                {
                  n: '03', content: null, el: <>
                    Análise de padrão na cena do crime.{'  '}
                    <Ink angle={0.8} color="#1a2f70">
                      não registrar observações relativas a <Redact width={40} /> em canais padrão
                    </Ink>
                  </>,
                },
                { n: '04', content: 'Avaliação de risco de recorrência e escalada.' },
                {
                  n: '05', content: null, el: <>
                    Avaliação da confiabilidade e integridade da autoridade local.{'  '}
                    <Ink angle={-1} color="#1a2f70">ver item 4</Ink>
                  </>,
                },
                {
                  n: '06', content: null, el: <>
                    Relatório de campo em 72h.{'  '}
                    <Ink angle={-0.5} color="#8B0000">
                      se o padrão for o que acredito ser, o homicídio é a parte menos importante. — N.
                    </Ink>
                  </>,
                },
                { n: '07', content: 'Canal de comunicação: exclusivamente comigo. Não usar canais institucionais.' },
              ].map((item) => (
                <div key={item.n} className="flex gap-3" style={{ marginBottom: '0.2rem' }}>
                  <span style={{ color: '#8B0000', flexShrink: 0, width: '2rem' }}>{item.n}.</span>
                  <span>{item.el ?? item.content}</span>
                </div>
              ))}
            </div>
          </div>

          <Rule />

          {/* Assinatura */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '0.5rem' }}>
            <div>
              <div style={{
                fontFamily: "'Crimson Text', serif", fontStyle: 'italic',
                fontSize: '1.4rem', color: '#1a1208',
                borderBottom: '1px solid #1a120870', paddingBottom: '2px', marginBottom: '4px',
              }}>
                Nogueira
              </div>
              <div style={{ fontFamily: "'Special Elite', monospace", fontSize: '0.57rem', color: '#5a4830', letterSpacing: '0.1em', lineHeight: 1.7 }}>
                Assessor Esp. Nogueira · Análise de Padrões<br />
                DPF / Brasília — sem vínculo institucional ativo
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'flex-end' }}>
              <Stamp color="#8B0000" angle={2.5}>Uma Cópia Emitida</Stamp>
              <Stamp color="#8B0000" angle={-1}>Destruir Após Leitura</Stamp>
            </div>
          </div>

          {/* Rodapé */}
          <div style={{
            marginTop: '2rem', paddingTop: '0.75rem',
            borderTop: '1px solid #c8b89030',
            display: 'flex', justifyContent: 'space-between',
            fontFamily: "'Special Elite', monospace", fontSize: '0.52rem',
            color: '#8a7a5a', letterSpacing: '0.1em',
          }}>
            <span>DPF · DIVISÃO DE ANÁLISE DE PADRÕES · BRASÍLIA-DF</span>
            <span>FORMULÁRIO DPF-DAP/117 (REV. 1992)</span>
          </div>
        </div>

        {/* Label inferior */}
        <div className="no-print text-center mt-6">
          <span style={{ fontFamily: "'Special Elite', monospace", fontSize: '0.55rem', color: '#222', letterSpacing: '0.2em' }}>
            ◆ &nbsp; São Francisco de Paula, RS · 1995 · Arquivo Azul &nbsp; ◆
          </span>
        </div>
      </div>
    </PageTransition>
  )
}
