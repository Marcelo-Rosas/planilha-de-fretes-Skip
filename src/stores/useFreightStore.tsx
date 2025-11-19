import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
  useEffect,
} from 'react'
import { v4 as uuidv4 } from 'uuid'
import {
  FreightState,
  Methodology,
  OperationalRow,
  ParamLotacao,
  TabelaLotacaoRow,
} from '@/types'
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
import { supabase } from '@/lib/supabase/client'
import { toast } from '@/hooks/use-toast'

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

  // Fetch Lotacao Data from Supabase
  useEffect(() => {
    const fetchLotacaoData = async () => {
      // Fetch Params
      const { data: paramsData, error: paramsError } = await supabase
        .from('parametros_lotacao')
        .select('*')
        .single()

      if (paramsData) {
        setParamLotacao(paramsData)
      } else if (paramsError && paramsError.code !== 'PGRST116') {
        console.error('Error fetching parametros_lotacao:', paramsError)
      }

      // Fetch Table
      const { data: tableData, error: tableError } = await supabase
        .from('tabela_lotacao')
        .select('*')

      if (tableData) {
        setTabelaLotacao(tableData)
      } else if (tableError) {
        console.error('Error fetching tabela_lotacao:', tableError)
      }
    }

    fetchLotacaoData()
  }, [])

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
      custoCargaInput: 0,
      custoDescargaInput: 0,
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

  const saveParamLotacao = async (params: ParamLotacao) => {
    setParamLotacao(params)
    const { error } = await supabase.from('parametros_lotacao').upsert(params)

    if (error) {
      toast({
        title: 'Erro ao salvar parâmetros',
        description: error.message,
        variant: 'destructive',
      })
    } else {
      toast({
        title: 'Parâmetros salvos',
        description: 'Os parâmetros de Lotação foram atualizados.',
      })
    }
  }

  const addTabelaLotacaoRow = async () => {
    const newRow: Partial<TabelaLotacaoRow> = {
      uf_origem: 'SP',
      uf_destino: 'RJ',
      km_min: 0,
      km_max: 100,
      custo_peso_rs_ton: 0,
      gris_percent: 0,
      tso_percent: 0,
    }

    const { data, error } = await supabase
      .from('tabela_lotacao')
      .insert(newRow)
      .select()
      .single()

    if (data) {
      setTabelaLotacao((prev) => [...prev, data])
    } else if (error) {
      toast({
        title: 'Erro ao adicionar linha',
        description: error.message,
        variant: 'destructive',
      })
    }
  }

  const updateTabelaLotacaoRow = async (
    id: string,
    data: Partial<TabelaLotacaoRow>,
  ) => {
    // Optimistic update
    setTabelaLotacao((prev) =>
      prev.map((row) => (row.id === id ? { ...row, ...data } : row)),
    )

    const { error } = await supabase
      .from('tabela_lotacao')
      .update(data)
      .eq('id', id)

    if (error) {
      toast({
        title: 'Erro ao atualizar linha',
        description: error.message,
        variant: 'destructive',
      })
      // Revert logic could be added here
    }
  }

  const removeTabelaLotacaoRow = async (id: string) => {
    setTabelaLotacao((prev) => prev.filter((row) => row.id !== id))

    const { error } = await supabase
      .from('tabela_lotacao')
      .delete()
      .eq('id', id)

    if (error) {
      toast({
        title: 'Erro ao remover linha',
        description: error.message,
        variant: 'destructive',
      })
    }
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
      saveParamLotacao,
      paramANTT,
      setParamANTT,
      paramConteiner,
      setParamConteiner,
      tabelaLTL,
      setTabelaLTL,
      tabelaLotacao,
      setTabelaLotacao,
      addTabelaLotacaoRow,
      updateTabelaLotacaoRow,
      removeTabelaLotacaoRow,
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
