'use client'

import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'

const c = {
  cream: '#f0e6cc', ink: '#1a1208', faded: '#5a4830',
  label: '#6a5830', red: '#8B0000', blue: '#1a2f70',
  brown: '#5a4030', rule: '#c8b890',
}

const s = StyleSheet.create({
  page: { backgroundColor: c.cream, paddingTop: 52, paddingBottom: 52, paddingHorizontal: 58, fontSize: 8, color: c.ink },
  stampRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 14 },
  stamp: { borderWidth: 2, borderColor: c.red, color: c.red, fontSize: 7, letterSpacing: 2, paddingHorizontal: 8, paddingVertical: 3 },
  stampRight: { alignItems: 'flex-end' },
  rightMeta: { fontSize: 6, color: c.faded, letterSpacing: 1, lineHeight: 1.6, textAlign: 'right' },
  lhWrap: { borderBottomWidth: 2, borderBottomColor: c.ink, paddingBottom: 8, marginBottom: 14 },
  lhSupra: { fontSize: 6, letterSpacing: 1.5, color: c.faded, marginBottom: 2 },
  lhTitle: { fontSize: 12, letterSpacing: 3, color: c.ink, fontWeight: 700 },
  lhSub: { fontSize: 6, letterSpacing: 1, color: c.faded, marginTop: 2 },
  rule: { borderTopWidth: 1, borderTopColor: c.rule, marginVertical: 9, opacity: 0.6 },
  headerRow: { flexDirection: 'row', marginBottom: 3 },
  hLabel: { width: 72, color: c.label, fontSize: 7.5 },
  hValue: { flex: 1, fontSize: 7.5, color: c.ink, lineHeight: 1.8 },
  redact: { backgroundColor: c.ink, color: c.ink },
  secLabel: { fontSize: 6, letterSpacing: 2, color: c.red, textTransform: 'uppercase', borderBottomWidth: 0.5, borderBottomColor: c.rule, paddingBottom: 3, marginBottom: 7 },
  tRow: { flexDirection: 'row', marginBottom: 3 },
  tCell: { width: '36%', color: c.label, fontSize: 7.5, lineHeight: 1.7 },
  tVal: { flex: 1, fontSize: 7.5, lineHeight: 1.7, color: c.ink },
  body: { fontSize: 7.5, lineHeight: 1.85, color: c.ink, marginBottom: 5 },
  ink: { fontStyle: 'italic', color: c.blue, fontSize: 7.5 },
  inkRed: { fontStyle: 'italic', color: c.red, fontSize: 7.5 },
  inkBrown: { fontStyle: 'italic', color: c.brown, fontSize: 7 },
  pRow: { flexDirection: 'row', marginBottom: 4 },
  pNum: { width: 20, color: c.red, fontSize: 7.5 },
  pText: { flex: 1, fontSize: 7.5, lineHeight: 1.8, color: c.ink },
  sigWrap: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 6 },
  sigName: { fontSize: 16, fontStyle: 'italic', color: c.ink, borderBottomWidth: 0.5, borderBottomColor: c.ink, paddingBottom: 2, marginBottom: 3 },
  sigSub: { fontSize: 6, color: c.faded, letterSpacing: 0.8, lineHeight: 1.6 },
  footer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 18, paddingTop: 6, borderTopWidth: 0.5, borderTopColor: c.rule, opacity: 0.5 },
  footerText: { fontSize: 5.5, color: c.label, letterSpacing: 0.8 },
})

function RD({ w = 48 }: { w?: number }) {
  return <Text style={[s.redact, { width: w, height: 8 }]}>{' '}</Text>
}

export default function DPFDocumentPDF() {
  return (
    <Document title="DPF — Designação de Campo — São Francisco de Paula, RS — 1995" author="Assessor Esp. Nogueira / DAP / Brasília">
      <Page size="LETTER" style={s.page}>

        {/* Carimbos */}
        <View style={s.stampRow}>
          <View>
            <Text style={s.stamp}>Sigiloso</Text>
            <Text style={[s.stamp, { marginTop: 4 }]}>Distribuição Restrita</Text>
          </View>
          <View style={s.stampRight}>
            <Text style={s.rightMeta}>ROTEAMENTO: NÃO-PADRÃO{'\n'}UMA CÓPIA EMITIDA</Text>
            <Text style={[s.rightMeta, { color: c.red, marginTop: 3 }]}>DESTRUIR APÓS LEITURA</Text>
          </View>
        </View>

        {/* Cabeçalho */}
        <View style={s.lhWrap}>
          <Text style={s.lhSupra}>REPÚBLICA FEDERATIVA DO BRASIL · MINISTÉRIO DA JUSTIÇA</Text>
          <Text style={s.lhTitle}>Polícia Federal</Text>
          <Text style={s.lhSub}>Departamento de Polícia Federal · Divisão de Análise de Padrões · Brasília, DF</Text>
        </View>

        {/* Para/De/Data */}
        <View style={{ marginBottom: 10 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 }}>
            <Text style={{ fontSize: 6.5, color: c.ink }}>
              <Text style={{ color: c.label }}>Formulário </Text>DPF-DAP/117 (Rev. 1992)
            </Text>
            <Text style={{ fontSize: 6.5, color: c.ink }}>
              <Text style={{ color: c.label }}>Classificação </Text>SIGILOSO / R-2
            </Text>
          </View>
          <View style={s.rule} />
          {[
            { l: 'Para:', rd: true, rdW: 38, suf: ' — Agente, DPF / Brasília-DF' },
            { l: 'De:', v: 'Assessor Esp. Nogueira — Análise de Padrões Comportamentais' },
            { l: 'Data:', v: '18 de setembro de 1995' },
            { l: 'Ref.:', v: 'Designação de Campo — São Francisco de Paula, RS — Deslocamento Imediato' },
            { l: 'Cruzamento:', rd: true, rdW: 14, suf: ' / Ocorrência 07, Curitiba-PR, 1991 (selada)' },
          ].map((row, i) => (
            <View key={i} style={s.headerRow}>
              <Text style={s.hLabel}>{row.l}</Text>
              <Text style={s.hValue}>
                {row.rd ? <><RD w={row.rdW! * 5} /><Text>{row.suf}</Text></> : row.v}
              </Text>
            </View>
          ))}
        </View>

        <View style={s.rule} />

        {/* Seção 1 */}
        <View style={{ marginBottom: 11 }}>
          <Text style={s.secLabel}>1. Descrição do Caso</Text>
          {[
            ['Vítima:', 'Sofia Neves · feminino · 17 anos · estudante'],
            ['Causa da morte:', 'Asfixia por estrangulamento manual'],
            ['Local:', 'Casa Correa · estrada de terra s/n · São Francisco de Paula, RS'],
            ['Data / hora:', '17 de setembro de 1995 · hora estimada entre 17h e 20h'],
            ['Descoberta:', '18 de setembro de 1995 · morador local'],
            ['Evidências:', 'Fotografias da cena (11 imagens) · laudo de perícia estadual pendente'],
          ].map(([l, v], i) => (
            <View key={i} style={s.tRow}>
              <Text style={s.tCell}>{l}</Text>
              <Text style={s.tVal}>{v}</Text>
            </View>
          ))}
          <View style={s.tRow}>
            <Text style={s.tCell}>Suspeitos:</Text>
            <Text style={s.tVal}>
              <Text>Nenhum em custódia   </Text>
              <Text style={s.ink}>→ padrão ativo — ver </Text>
              <RD w={30} />
              <Text style={s.ink}> antes de partir</Text>
            </Text>
          </View>
        </View>

        <View style={s.rule} />

        {/* Seção 2 */}
        <View style={{ marginBottom: 11 }}>
          <Text style={s.secLabel}>2. Fundamento para Competência Federal</Text>
          <Text style={s.body}>
            Homicídio com elementos compatíveis com padrão ritual documentado em ocorrências anteriores de âmbito federal. Imagem #4 da série fotográfica submetida ao sistema estadual (SINESPJC, 18/09/1995) gerou correspondência com arquivo de referência <RD w={40} />.
          </Text>
          <Text style={s.body}>
            <Text>Cruzamento com: </Text>
            <Text style={{ fontWeight: 700 }}>Ocorrência 07, Curitiba-PR, 1991</Text>
            <Text> (processo selado · acesso R-2).   </Text>
            <Text style={s.ink}>mesmo padrão · confirmado</Text>
          </Text>
          <Text style={s.body}>Possível conexão interestadual. Solicitação de apoio analítico à DAP/Brasília conforme protocolo interno.</Text>
        </View>

        <View style={s.rule} />

        {/* Seção 3 */}
        <View style={{ marginBottom: 11 }}>
          <Text style={s.secLabel}>3. Designação do Agente</Text>
          <Text style={s.body}>
            <Text>O agente </Text><RD w={80} /><Text> fica designado para apoio investigativo à Delegacia de Polícia Civil de São Francisco de Paula, RS, com deslocamento imediato a partir de 18 de setembro de 1995.</Text>
          </Text>
          <Text style={s.body}>
            <Text style={{ color: c.label }}>Duração: </Text><Text>Em aberto.   </Text>
            <Text style={{ color: c.label }}>Coordenação: </Text><Text>Mandatória com autoridade local.</Text>
          </Text>
          <Text style={[s.body, { marginTop: 3 }]}>
            <Text style={s.ink}>sem registro anterior com </Text><RD w={30} /><Text style={s.ink}> — perspectiva necessária.</Text>
          </Text>
        </View>

        <View style={s.rule} />

        {/* Seção 4 */}
        <View style={{ marginBottom: 11 }}>
          <Text style={s.secLabel}>4. Coordenação com Autoridade Local</Text>
          <Text style={s.body}>
            <Text style={{ fontWeight: 700 }}>Delegado Pinheiro</Text>
            <Text>, Delegacia de Polícia Civil de São Francisco de Paula.   </Text>
            <Text style={[s.ink, { fontWeight: 700 }]}>AVALIAR CONFIABILIDADE — PRIORITÁRIO</Text>
          </Text>
          <Text style={s.body}>
            <Text>O delegado foi informado que a PF envia apoio técnico mediante solicitação da jurisdição local.   </Text>
            <Text style={s.inkBrown}>(não houve solicitação formal)</Text>
          </Text>
          <Text style={s.body}>
            <Text>Origem do acionamento federal </Text>
            <Text style={{ fontWeight: 700 }}>não deve ser divulgada</Text>
            <Text> à autoridade local nem ao comando regional.</Text>
          </Text>
        </View>

        <View style={s.rule} />

        {/* Seção 5 */}
        <View style={{ marginBottom: 16 }}>
          <Text style={s.secLabel}>5. Parâmetros Operacionais</Text>
          {[
            { n: '01.', t: 'Deslocamento imediato para São Francisco de Paula, RS.' },
            { n: '02.', t: 'Apoio à investigação de homicídio em andamento.' },
            { n: '03.', el: <Text style={s.pText}><Text>Análise de padrão na cena do crime.   </Text><Text style={s.ink}>não registrar observações relativas a </Text><RD w={30} /><Text style={s.ink}> em canais padrão</Text></Text> },
            { n: '04.', t: 'Avaliação de risco de recorrência e escalada.' },
            { n: '05.', el: <Text style={s.pText}><Text>Avaliação da confiabilidade e integridade da autoridade local.   </Text><Text style={s.ink}>ver item 4</Text></Text> },
            { n: '06.', el: <Text style={s.pText}><Text>Relatório de campo em 72h.   </Text><Text style={s.inkRed}>se o padrão for o que acredito ser, o homicídio é a parte menos importante. — N.</Text></Text> },
            { n: '07.', t: 'Canal de comunicação: exclusivamente comigo. Não usar canais institucionais.' },
          ].map((item, i) => (
            <View key={i} style={s.pRow}>
              <Text style={s.pNum}>{item.n}</Text>
              {item.el ?? <Text style={s.pText}>{item.t}</Text>}
            </View>
          ))}
        </View>

        <View style={s.rule} />

        {/* Assinatura */}
        <View style={s.sigWrap}>
          <View>
            <Text style={s.sigName}>Nogueira</Text>
            <Text style={s.sigSub}>Assessor Esp. Nogueira · Análise de Padrões{'\n'}DPF / Brasília — sem vínculo institucional ativo</Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={s.stamp}>Uma Cópia Emitida</Text>
            <Text style={[s.stamp, { marginTop: 5 }]}>Destruir Após Leitura</Text>
          </View>
        </View>

        {/* Rodapé */}
        <View style={s.footer}>
          <Text style={s.footerText}>DPF · DIVISÃO DE ANÁLISE DE PADRÕES · BRASÍLIA-DF</Text>
          <Text style={s.footerText}>FORMULÁRIO DPF-DAP/117 (REV. 1992)</Text>
        </View>

      </Page>
    </Document>
  )
}
