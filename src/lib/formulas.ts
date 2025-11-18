import { FreightState, OperationalRow } from '@/types'

export const calculateAll = (row: OperationalRow, store: FreightState) => {
  const {
    methodology,
    paramLTL,
    paramLotacao,
    paramANTT,
    paramConteiner,
    tabelaLTL,
    tabelaLotacao,
    coeficientesANTT,
    icmsInterestadual,
  } = store

  const ufKey = `${row.ufOrigem}→${row.ufDestino}`

  const lotacaoRate =
    methodology === 'LOTAÇÃO' && row.usarTabela === 'Sim'
      ? tabelaLotacao.find((r) => row.km >= r.de_km && row.km <= r.ate_km)
      : undefined

  const precoBase = (() => {
    if (row.usarTabela === 'Não') return row.freteCaminhaoInput
    switch (methodology) {
      case 'LTL': {
        const rate = tabelaLTL.find(
          (r) => row.km >= r.de_km && row.km <= r.ate_km,
        )
        return rate ? rate.rs_t * row.peso : row.freteCaminhaoInput
      }
      case 'LOTAÇÃO': {
        return lotacaoRate
          ? lotacaoRate.rs_t * row.peso
          : row.freteCaminhaoInput
      }
      case 'ANTT': {
        const coef = coeficientesANTT.find(
          (c) => c.tabela === 'A' && c.eixos === paramANTT.eixosDefault,
        )
        return coef ? row.km * coef.ccd + coef.cc : row.freteCaminhaoInput
      }
      case 'CONTEINER':
        return row.freteCaminhaoInput
      default:
        return 0
    }
  })()

  const custoValor = (() => {
    switch (methodology) {
      case 'LTL':
        return paramLTL.custoValor * row.valorNF
      case 'LOTAÇÃO':
        return (lotacaoRate?.custo_valor ?? 0) * row.valorNF
      case 'ANTT':
        return paramANTT.adValorem * row.valorNF
      case 'CONTEINER':
        return paramConteiner.adValorem * row.valorNF
      default:
        return 0
    }
  })()

  const gris = (() => {
    switch (methodology) {
      case 'LTL':
        return paramLTL.gris * row.valorNF
      case 'LOTAÇÃO':
        return (lotacaoRate?.gris ?? 0) * row.valorNF
      case 'ANTT':
        return paramANTT.gris * row.valorNF
      case 'CONTEINER':
        return paramConteiner.gris * row.valorNF
      default:
        return 0
    }
  })()

  const tso = (() => {
    switch (methodology) {
      case 'LTL':
        return paramLTL.tso * row.valorNF
      case 'LOTAÇÃO':
        return (lotacaoRate?.tso ?? 0) * row.valorNF
      case 'ANTT':
        return 0
      case 'CONTEINER':
        return paramConteiner.tso * row.valorNF
      default:
        return 0
    }
  })()

  const receitaR = precoBase + custoValor + gris + tso

  const receitaAjustada =
    row.aplicarMarkup === 'Sim'
      ? receitaR - row.descontoManual
      : row.valorNegociado > 0
        ? row.valorNegociado
        : receitaR

  const valorPessoa = (() => {
    switch (methodology) {
      case 'LTL':
        return paramLTL.valorPessoa
      case 'LOTAÇÃO':
        return paramLotacao.valorPessoa
      case 'ANTT':
        return paramANTT.valorPessoa
      case 'CONTEINER':
        return paramConteiner.valorPessoa
      default:
        return 0
    }
  })()

  const freteFinal =
    receitaAjustada +
    row.aluguelEquipamentoInput +
    row.cargaQtd * valorPessoa +
    row.descargaQtd * valorPessoa +
    row.pedagioInfo

  const carreteiroNeg = -Math.abs(Math.max(precoBase, row.freteCaminhaoInput))
  const custoCargaNeg = -(row.cargaQtd * valorPessoa)
  const custoDescargaNeg = -(row.descargaQtd * valorPessoa)
  const aluguelNeg = -row.aluguelEquipamentoInput
  const pedagioNeg = -row.pedagioInfo

  const margemBruta =
    freteFinal +
    carreteiroNeg +
    custoCargaNeg +
    custoDescargaNeg +
    aluguelNeg +
    pedagioNeg

  const das = (() => {
    const baseTributavel =
      row.custosIncidemTributos === 'Sim' ? freteFinal : receitaAjustada
    const taxa =
      {
        LTL: paramLTL.das,
        LOTAÇÃO: paramLotacao.das,
        ANTT: paramANTT.das,
        CONTEINER: paramConteiner.das,
      }[methodology] || 0
    return -(baseTributavel * taxa)
  })()

  const icms = (() => {
    const rate = icmsInterestadual.find(
      (r) => r.uf_origem === row.ufOrigem && r.uf_destino === row.ufDestino,
    )?.percent
    const defaultRate =
      {
        LTL: paramLTL.icmsDefault,
        LOTAÇÃO: paramLotacao.icmsDefault,
        ANTT: paramANTT.icmsDefault,
        CONTEINER: paramConteiner.icms,
      }[methodology] || 0
    return -(freteFinal * (rate ?? defaultRate))
  })()

  const seguroRctrcNeg = -(
    ({
      LTL: paramLTL.rctrc,
      LOTAÇÃO: paramLotacao.rctrc,
      ANTT: paramANTT.rctrc,
      CONTEINER: paramConteiner.rctrc,
    }[methodology] || 0) * row.valorNF
  )

  const seguroRcdcNeg = -(
    ({
      LTL: paramLTL.rcdc,
      LOTAÇÃO: paramLotacao.rcdc,
      ANTT: paramANTT.rcdc,
      CONTEINER: paramConteiner.rcdc,
    }[methodology] || 0) * row.valorNF
  )

  const margemLiquida =
    margemBruta + das + icms + seguroRctrcNeg + seguroRcdcNeg

  const overhead = (() => {
    const params = { LTL: paramLTL, LOTAÇÃO: paramLotacao, ANTT: paramANTT }[
      methodology
    ]
    if (!params) return -(paramConteiner.overhead * receitaR) // Conteiner doesn't have overheadBase
    const base =
      params.overheadBase === 'Receita_CT-e' ? receitaR : receitaAjustada
    return -(params.overhead * base)
  })()

  const resultado = margemLiquida + overhead

  const margemFinal = freteFinal !== 0 ? resultado / freteFinal : 0

  return {
    ufKey,
    precoBase,
    custoValor,
    gris,
    tso,
    receitaR,
    receitaAjustada,
    valorPessoa,
    freteFinal,
    carreteiroNeg,
    custoCargaNeg,
    custoDescargaNeg,
    aluguelNeg,
    pedagioNeg,
    margemBruta,
    das,
    icms,
    seguroRctrcNeg,
    seguroRcdcNeg,
    margemLiquida,
    overhead,
    resultado,
    margemFinal,
  }
}
