import { useFreight } from '@/stores/useFreightStore'
import { Methodology } from '@/types'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Loader2 } from 'lucide-react'
import { OperacionalRowComponent } from '@/components/OperacionalRow'

export default function OperacionalPage() {
  const { methodology, setMethodology, operationalRows, addRow, isLoading } =
    useFreight()

  const isLotacao = methodology === 'LOTAÇÃO'

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
    !isLotacao && 'Custo Valor R$',
    !isLotacao && 'GRIS R$',
    !isLotacao && 'TSO R$',
    !isLotacao && 'Receita R$ (R)',
    'Aplicar Markup',
    !isLotacao && 'Desconto Manual R$',
    !isLotacao && 'Valor Negociado R$',
    'Receita R$ (R) Ajustada',
    'Aluguel Equi. Input R$',
    isLotacao ? 'Custo Carga R$' : 'Carga (qtd)',
    isLotacao ? 'Custo Descarga R$' : 'Descarga (qtd)',
    !isLotacao && 'Valor Pessoa R$',
    'Pedágio Inf. R$',
    'Custos Incidem Tributos?',
    !isLotacao && 'Frete R$',
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
    'Status',
    'Ações',
  ].filter(Boolean)

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

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
                <TableHead
                  key={h as string}
                  className="sticky top-0 bg-background whitespace-nowrap"
                >
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
