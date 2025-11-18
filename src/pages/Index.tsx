import { useMemo } from 'react'
import { useFreight } from '@/stores/useFreightStore'
import { Methodology, OperationalRow } from '@/types'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Trash2, AlertTriangle, CheckCircle2 } from 'lucide-react'
import { UFS, formatCurrency, cn } from '@/lib/utils'
import { calculateAll } from '@/lib/formulas'

const OperacionalRowComponent = ({ row }: { row: OperationalRow }) => {
  const store = useFreight()
  const { updateRow, removeRow } = store

  const calculations = useMemo(() => calculateAll(row, store), [row, store])

  const handleInputChange = (
    field: keyof OperationalRow,
    value: string | number,
  ) => {
    updateRow(row.id, { [field]: value })
  }

  const handleSelectChange = (field: keyof OperationalRow, value: string) => {
    updateRow(row.id, { [field]: value })
  }

  const getMarginCellStyle = (margin: number) => {
    if (margin < 0) return 'bg-red-100 text-red-700'
    if (margin >= 0 && margin < 0.05) return 'bg-yellow-100 text-yellow-700'
    return 'bg-green-100 text-green-700'
  }

  return (
    <TableRow>
      <TableCell className="min-w-[150px]">
        <Input
          value={row.embarcador}
          onChange={(e) => handleInputChange('embarcador', e.target.value)}
        />
      </TableCell>
      <TableCell className="min-w-[150px]">
        <Input
          value={row.cliente}
          onChange={(e) => handleInputChange('cliente', e.target.value)}
        />
      </TableCell>
      <TableCell className="min-w-[100px]">
        <Select
          value={row.ufOrigem}
          onValueChange={(v) => handleSelectChange('ufOrigem', v)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {UFS.map((uf) => (
              <SelectItem key={uf} value={uf}>
                {uf}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </TableCell>
      <TableCell className="min-w-[100px]">
        <Select
          value={row.ufDestino}
          onValueChange={(v) => handleSelectChange('ufDestino', v)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {UFS.map((uf) => (
              <SelectItem key={uf} value={uf}>
                {uf}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </TableCell>
      <TableCell className="min-w-[120px] bg-blue-50">
        {calculations.ufKey}
      </TableCell>
      <TableCell className="min-w-[100px]">
        <Input
          type="number"
          value={row.km}
          onChange={(e) => handleInputChange('km', parseFloat(e.target.value))}
        />
      </TableCell>
      <TableCell className="min-w-[100px]">
        <Input
          type="number"
          value={row.peso}
          onChange={(e) =>
            handleInputChange('peso', parseFloat(e.target.value))
          }
        />
      </TableCell>
      <TableCell className="min-w-[120px]">
        <Select
          value={row.fobCif}
          onValueChange={(v) => handleSelectChange('fobCif', v)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="FOB">FOB</SelectItem>
            <SelectItem value="CIF">CIF</SelectItem>
          </SelectContent>
        </Select>
      </TableCell>
      <TableCell className="min-w-[150px]">
        <Input
          type="number"
          value={row.valorNF}
          onChange={(e) =>
            handleInputChange('valorNF', parseFloat(e.target.value))
          }
        />
      </TableCell>
      <TableCell className="min-w-[120px]">
        <Select
          value={row.usarTabela}
          onValueChange={(v) => handleSelectChange('usarTabela', v)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Sim">Sim</SelectItem>
            <SelectItem value="Não">Não</SelectItem>
          </SelectContent>
        </Select>
      </TableCell>
      <TableCell className="min-w-[150px] bg-blue-50 font-mono text-right">
        {formatCurrency(calculations.precoBase)}
      </TableCell>
      <TableCell className="min-w-[150px]">
        <Input
          type="number"
          value={row.freteCaminhaoInput}
          onChange={(e) =>
            handleInputChange('freteCaminhaoInput', parseFloat(e.target.value))
          }
        />
      </TableCell>
      <TableCell className="min-w-[150px] bg-blue-50 font-mono text-right">
        {formatCurrency(calculations.custoValor)}
      </TableCell>
      <TableCell className="min-w-[150px] bg-blue-50 font-mono text-right">
        {formatCurrency(calculations.gris)}
      </TableCell>
      <TableCell className="min-w-[150px] bg-blue-50 font-mono text-right">
        {formatCurrency(calculations.tso)}
      </TableCell>
      <TableCell className="min-w-[150px] bg-blue-50 font-mono text-right">
        {formatCurrency(calculations.receitaR)}
      </TableCell>
      <TableCell className="min-w-[120px]">
        <Select
          value={row.aplicarMarkup}
          onValueChange={(v) => handleSelectChange('aplicarMarkup', v)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Sim">Sim</SelectItem>
            <SelectItem value="Não">Não</SelectItem>
          </SelectContent>
        </Select>
      </TableCell>
      <TableCell className="min-w-[150px]">
        <Input
          type="number"
          value={row.descontoManual}
          onChange={(e) =>
            handleInputChange('descontoManual', parseFloat(e.target.value))
          }
        />
      </TableCell>
      <TableCell className="min-w-[150px]">
        <Input
          type="number"
          value={row.valorNegociado}
          onChange={(e) =>
            handleInputChange('valorNegociado', parseFloat(e.target.value))
          }
        />
      </TableCell>
      <TableCell className="min-w-[150px] bg-blue-50 font-mono text-right">
        {formatCurrency(calculations.receitaAjustada)}
      </TableCell>
      <TableCell className="min-w-[150px]">
        <Input
          type="number"
          value={row.aluguelEquipamentoInput}
          onChange={(e) =>
            handleInputChange(
              'aluguelEquipamentoInput',
              parseFloat(e.target.value),
            )
          }
        />
      </TableCell>
      <TableCell className="min-w-[100px]">
        <Input
          type="number"
          value={row.cargaQtd}
          onChange={(e) =>
            handleInputChange('cargaQtd', parseInt(e.target.value))
          }
        />
      </TableCell>
      <TableCell className="min-w-[100px]">
        <Input
          type="number"
          value={row.descargaQtd}
          onChange={(e) =>
            handleInputChange('descargaQtd', parseInt(e.target.value))
          }
        />
      </TableCell>
      <TableCell className="min-w-[150px] bg-blue-50 font-mono text-right">
        {formatCurrency(calculations.valorPessoa)}
      </TableCell>
      <TableCell className="min-w-[150px]">
        <Input
          type="number"
          value={row.pedagioInfo}
          onChange={(e) =>
            handleInputChange('pedagioInfo', parseFloat(e.target.value))
          }
        />
      </TableCell>
      <TableCell className="min-w-[120px]">
        <Select
          value={row.custosIncidemTributos}
          onValueChange={(v) => handleSelectChange('custosIncidemTributos', v)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Sim">Sim</SelectItem>
            <SelectItem value="Não">Não</SelectItem>
          </SelectContent>
        </Select>
      </TableCell>
      <TableCell className="min-w-[150px] bg-blue-50 font-mono text-right">
        {formatCurrency(calculations.freteFinal)}
      </TableCell>
      <TableCell className="min-w-[150px] bg-blue-50 font-mono text-right text-red-600">
        {formatCurrency(calculations.carreteiroNeg)}
      </TableCell>
      <TableCell className="min-w-[150px] bg-blue-50 font-mono text-right text-red-600">
        {formatCurrency(calculations.custoCargaNeg)}
      </TableCell>
      <TableCell className="min-w-[150px] bg-blue-50 font-mono text-right text-red-600">
        {formatCurrency(calculations.custoDescargaNeg)}
      </TableCell>
      <TableCell className="min-w-[150px] bg-blue-50 font-mono text-right text-red-600">
        {formatCurrency(calculations.aluguelNeg)}
      </TableCell>
      <TableCell className="min-w-[150px] bg-blue-50 font-mono text-right text-red-600">
        {formatCurrency(calculations.pedagioNeg)}
      </TableCell>
      <TableCell className="min-w-[150px] bg-blue-50 font-mono text-right">
        {formatCurrency(calculations.margemBruta)}
      </TableCell>
      <TableCell className="min-w-[150px] bg-blue-50 font-mono text-right text-red-600">
        {formatCurrency(calculations.das)}
      </TableCell>
      <TableCell className="min-w-[150px] bg-blue-50 font-mono text-right text-red-600">
        {formatCurrency(calculations.icms)}
      </TableCell>
      <TableCell className="min-w-[150px] bg-blue-50 font-mono text-right text-red-600">
        {formatCurrency(calculations.seguroRctrcNeg)}
      </TableCell>
      <TableCell className="min-w-[150px] bg-blue-50 font-mono text-right text-red-600">
        {formatCurrency(calculations.seguroRcdcNeg)}
      </TableCell>
      <TableCell className="min-w-[150px] bg-blue-50 font-mono text-right">
        {formatCurrency(calculations.margemLiquida)}
      </TableCell>
      <TableCell className="min-w-[150px] bg-blue-50 font-mono text-right text-red-600">
        {formatCurrency(calculations.overhead)}
      </TableCell>
      <TableCell className="min-w-[150px] bg-blue-50 font-mono text-right">
        {formatCurrency(calculations.resultado)}
      </TableCell>
      <TableCell
        className={cn(
          'min-w-[150px] font-mono text-right',
          getMarginCellStyle(calculations.margemFinal),
        )}
      >
        <div className="flex items-center justify-end gap-2">
          {calculations.margemFinal < 0 && (
            <AlertTriangle className="h-4 w-4" />
          )}
          {calculations.margemFinal >= 0 && calculations.margemFinal < 0.05 && (
            <AlertTriangle className="h-4 w-4" />
          )}
          {calculations.margemFinal >= 0.05 && (
            <CheckCircle2 className="h-4 w-4" />
          )}
          {(calculations.margemFinal * 100).toFixed(2)}%
        </div>
      </TableCell>
      <TableCell>
        <Button variant="ghost" size="icon" onClick={() => removeRow(row.id)}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </TableCell>
    </TableRow>
  )
}

export default function OperacionalPage() {
  const { methodology, setMethodology, operationalRows, addRow } = useFreight()

  const headers = [
    'Embarcador',
    'Cliente',
    'UF Origem',
    'UF Destino',
    'UF Key',
    'KM',
    'Peso (t)',
    'FOB/CIF',
    'Valor NF R$',
    'Usar Tabela?',
    'Preço Base R$',
    'Frete Caminhão Input R$',
    'Custo Valor R$',
    'GRIS R$',
    'TSO R$',
    'Receita R$ (R)',
    'Aplicar Markup',
    'Desconto Manual R$',
    'Valor Negociado R$',
    'Receita R$ (R) Ajustada',
    'Aluguel Equi. Input R$',
    'Carga (qtd)',
    'Descarga (qtd)',
    'Valor Pessoa R$',
    'Pedágio Inf. R$',
    'Custos Incidem Tributos?',
    'Frete R$',
    'Carreteiro R$ neg',
    'Custo Carga R$ neg',
    'Custo Descarga R$ neg',
    'Aluguel R$ neg',
    'Pedágio Inf. R$ neg',
    'Margem Bruta R$',
    'DAS R$',
    'ICMS R$',
    'Seguro RCTRC R$ neg',
    'Seguro RCDC R$ neg',
    'Margem Líquida R$',
    'Overhead R$',
    'Resultado R$',
    'Margem Final %',
    'Ações',
  ]

  return (
    <div className="p-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <h1 className="text-2xl font-bold">Planilha Operacional de Fretes</h1>
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="flex-grow sm:flex-grow-0">
            <Select
              value={methodology}
              onValueChange={(v) => setMethodology(v as Methodology)}
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Metodologia" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="LTL">LTL</SelectItem>
                <SelectItem value="LOTAÇÃO">LOTAÇÃO</SelectItem>
                <SelectItem value="ANTT">ANTT</SelectItem>
                <SelectItem value="CONTEINER">CONTEINER</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={addRow}>Adicionar Linha</Button>
        </div>
      </div>
      <div className="overflow-x-auto rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {headers.map((h) => (
                <TableHead key={h} className="sticky top-0 bg-background">
                  {h}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {operationalRows.map((row) => (
              <OperacionalRowComponent key={row.id} row={row} />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
