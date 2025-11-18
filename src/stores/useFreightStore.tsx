import { createContext, useContext, useState, ReactNode, useMemo } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { FreightState, Methodology, OperationalRow } from '@/types'
import {
  initialMethodology,
  initialOperationalRows,
  initialParamLTL,
  initialParamLotacao,
  initialParamANTT,
  initialParamConteiner,
  initialTabelaLTL,
  initialTabelaLotacao,
  initialEixos,
  initialCoeficientesANTT,
  initialICMSInterestadual,
} from '@/lib/initialData'

const FreightContext = createContext<FreightState | undefined>(undefined)

export function FreightProvider({ children }: { children: ReactNode }) {
  const [methodology, setMethodology] =
    useState<Methodology>(initialMethodology)
  const [operationalRows, setOperationalRows] = useState<OperationalRow[]>(
    initialOperationalRows,
  )

  const [paramLTL, setParamLTL] = useState(initialParamLTL)
  const [paramLotacao, setParamLotacao] = useState(initialParamLotacao)
  const [paramANTT, setParamANTT] = useState(initialParamANTT)
  const [paramConteiner, setParamConteiner] = useState(initialParamConteiner)

  const [tabelaLTL, setTabelaLTL] = useState(initialTabelaLTL)
  const [tabelaLotacao, setTabelaLotacao] = useState(initialTabelaLotacao)
  const [eixos, setEixos] = useState(initialEixos)
  const [coeficientesANTT, setCoeficientesANTT] = useState(
    initialCoeficientesANTT,
  )
  const [icmsInterestadual, setIcmsInterestadual] = useState(
    initialICMSInterestadual,
  )

  const addRow = () => {
    const newRow: OperationalRow = {
      id: uuidv4(),
      embarcador: '',
      cliente: '',
      ufOrigem: '',
      ufDestino: '',
      km: 0,
      peso: 0,
      fobCif: 'CIF',
      valorNF: 0,
      usarTabela: 'Sim',
      freteCaminhaoInput: 0,
      aplicarMarkup: 'Não',
      descontoManual: 0,
      valorNegociado: 0,
      aluguelEquipamentoInput: 0,
      cargaQtd: 0,
      descargaQtd: 0,
      pedagioInfo: 0,
      custosIncidemTributos: 'Sim',
    }
    setOperationalRows((prev) => [...prev, newRow])
  }

  const removeRow = (id: string) => {
    setOperationalRows((prev) => prev.filter((row) => row.id !== id))
  }

  const updateRow = (id: string, newRowData: Partial<OperationalRow>) => {
    setOperationalRows((prev) =>
      prev.map((row) => (row.id === id ? { ...row, ...newRowData } : row)),
    )
  }

  const value = useMemo(
    () => ({
      methodology,
      setMethodology,
      operationalRows,
      setOperationalRows,
      addRow,
      removeRow,
      updateRow,
      paramLTL,
      setParamLTL,
      paramLotacao,
      setParamLotacao,
      paramANTT,
      setParamANTT,
      paramConteiner,
      setParamConteiner,
      tabelaLTL,
      setTabelaLTL,
      tabelaLotacao,
      setTabelaLotacao,
      eixos,
      setEixos,
      coeficientesANTT,
      setCoeficientesANTT,
      icmsInterestadual,
      setIcmsInterestadual,
    }),
    [
      methodology,
      operationalRows,
      paramLTL,
      paramLotacao,
      paramANTT,
      paramConteiner,
      tabelaLTL,
      tabelaLotacao,
      eixos,
      coeficientesANTT,
      icmsInterestadual,
    ],
  )

  return (
    <FreightContext.Provider value={value}>{children}</FreightContext.Provider>
  )
}

export function useFreight() {
  const context = useContext(FreightContext)
  if (context === undefined) {
    throw new Error('useFreight must be used within a FreightProvider')
  }
  return context
}
