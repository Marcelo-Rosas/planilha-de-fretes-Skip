import { useMemo } from 'react'
import { useFreight } from '@/stores/useFreightStore'
import { OperationalRow } from '@/types'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { TableCell, TableRow } from '@/components/ui/table'
import { Trash2, AlertTriangle, CheckCircle2 } from 'lucide-react'
import { UFS, formatCurrency, cn } from '@/lib/utils'
import { calculateAll } from '@/lib/formulas'

export const OperacionalRowComponent = ({ row }: { row: OperationalRow }) => {
  const store = useFreight()
  const { updateRow, removeRow, methodology } = store

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

  const isLotacao = methodology === 'LOTAÇÃO'

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
      {!isLotacao && (
        <>
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
        </>
      )}
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
      {!isLotacao && (
        <>
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
        </>
      )}
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
      {isLotacao ? (
        <>
          <TableCell className="min-w-[150px]">
            <Input
              type="number"
              value={row.custoCargaInput}
              onChange={(e) =>
                handleInputChange('custoCargaInput', parseFloat(e.target.value))
              }
            />
          </TableCell>
          <TableCell className="min-w-[150px]">
            <Input
              type="number"
              value={row.custoDescargaInput}
              onChange={(e) =>
                handleInputChange(
                  'custoDescargaInput',
                  parseFloat(e.target.value),
                )
              }
            />
          </TableCell>
        </>
      ) : (
        <>
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
        </>
      )}
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
      {!isLotacao && (
        <TableCell className="min-w-[150px] bg-blue-50 font-mono text-right">
          {formatCurrency(calculations.freteFinal)}
        </TableCell>
      )}
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
          {calculations.resultado < 0 && <AlertTriangle className="h-4 w-4" />}
          {calculations.resultado >= 0 && <CheckCircle2 className="h-4 w-4" />}
          {isLotacao
            ? calculations.resultado > 0
              ? 'Viável'
              : 'Inviável'
            : `${(calculations.margemFinal * 100).toFixed(2)}%`}
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
