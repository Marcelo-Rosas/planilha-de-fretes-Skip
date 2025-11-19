import { UF } from '@/lib/utils'

export type Methodology = 'LTL' | 'LOTAÇÃO' | 'ANTT' | 'CONTEINER'

export interface OperationalRow {
  id: string
  embarcador: string
  cliente: string
  ufOrigem: UF | ''
  ufDestino: UF | ''
  km: number
  peso: number
  fobCif: 'FOB' | 'CIF'
  valorNF: number
  usarTabela: 'Sim' | 'Não'
  freteCaminhaoInput: number
  aplicarMarkup: 'Sim' | 'Não'
  descontoManual: number
  valorNegociado: number
  aluguelEquipamentoInput: number
  cargaQtd: number
  descargaQtd: number
  pedagioInfo: number
  custosIncidemTributos: 'Sim' | 'Não'
  custoCargaInput: number
  custoDescargaInput: number
}

export interface ParamLTL {
  custoValor: number
  tso: number
  gris: number
  overhead: number
  das: number
  icmsDefault: number
  rctrc: number
  rcdc: number
  valorPessoa: number
  baseDasIncluiPedagio: boolean
  baseDasIncluiCarga: boolean
  baseDasIncluiDescarga: boolean
  baseDasIncluiAluguel: boolean
  overheadBase: 'Receita_CT-e' | 'Receita_Ajustada'
  margensOpcoes: string
}

export interface ParamLotacao {
  id?: string
  icms_percent: number
  das_percent: number
  rctr_c_percent: number
  rc_dc_percent: number
  markup_percent: number
  seguros_percent: number
  overhead_percent: number
}

export interface ParamANTT {
  eixosDefault: number
  retornoVazioMultDefault: number
  retornoVazioMultMaximo: number
  rateioFixos: number
  gris: number
  adValorem: number
  das: number
  icmsDefault: number
  rctrc: number
  rcdc: number
  overhead: number
  valorPessoa: number
  margemComercial: number
  tabelaANTT: string
  baseDasIncluiPedagio: boolean
  baseDasIncluiGeneralidades: boolean
  overheadBase: 'Receita_CT-e' | 'Receita_Ajustada'
  margensOpcoes: string
}

export interface ParamConteiner {
  gris: number
  adValorem: number
  tso: number
  das: number
  icms: number
  overhead: number
  rctrc: number
  rcdc: number
  valorPessoa: number
}

export interface TabelaLTLRow {
  id: string
  de_km: number
  ate_km: number
  rs_t: number
  custo_valor: number
  tso: number
  gris: number
}

export interface TabelaLotacaoRow {
  id: string
  uf_origem: UF | string
  uf_destino: UF | string
  km_min: number
  km_max: number
  custo_peso_rs_ton: number
  gris_percent: number
  tso_percent: number
}

export interface EixoRow {
  id: string
  eixo: number
  descricao: string
}

export interface CoeficienteANTTRow {
  id: string
  tabela: string
  eixos: number
  ccd: number
  cc: number
}

export interface ICMSInterestadualRow {
  id: string
  uf_origem: UF
  uf_destino: UF
  percent: number
}

export interface FreightState {
  methodology: Methodology
  setMethodology: (methodology: Methodology) => void
  operationalRows: OperationalRow[]
  setOperationalRows: (rows: OperationalRow[]) => void
  addRow: () => void
  removeRow: (id: string) => void
  updateRow: (id: string, newRowData: Partial<OperationalRow>) => void

  paramLTL: ParamLTL
  setParamLTL: (params: ParamLTL) => void
  paramLotacao: ParamLotacao
  setParamLotacao: (params: ParamLotacao) => void
  saveParamLotacao: (params: ParamLotacao) => Promise<void>

  paramANTT: ParamANTT
  setParamANTT: (params: ParamANTT) => void
  paramConteiner: ParamConteiner
  setParamConteiner: (params: ParamConteiner) => void

  tabelaLTL: TabelaLTLRow[]
  setTabelaLTL: (data: TabelaLTLRow[]) => void

  tabelaLotacao: TabelaLotacaoRow[]
  setTabelaLotacao: (data: TabelaLotacaoRow[]) => void
  addTabelaLotacaoRow: () => Promise<void>
  updateTabelaLotacaoRow: (
    id: string,
    data: Partial<TabelaLotacaoRow>,
  ) => Promise<void>
  removeTabelaLotacaoRow: (id: string) => Promise<void>

  eixos: EixoRow[]
  setEixos: (data: EixoRow[]) => void
  coeficientesANTT: CoeficienteANTTRow[]
  setCoeficientesANTT: (data: CoeficienteANTTRow[]) => void
  icmsInterestadual: ICMSInterestadualRow[]
  setIcmsInterestadual: (data: ICMSInterestadualRow[]) => void

  isLoading: boolean
}
