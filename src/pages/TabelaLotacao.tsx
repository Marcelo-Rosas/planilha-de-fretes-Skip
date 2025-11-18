import { useFreight } from '@/stores/useFreightStore'
import { TabelaLotacaoRow } from '@/types'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Trash2 } from 'lucide-react'
import { v4 as uuidv4 } from 'uuid'
import { Input } from '@/components/ui/input'

export default function TabelaLotacaoPage() {
  const { tabelaLotacao, setTabelaLotacao } = useFreight()

  const handleAddRow = () => {
    const newRow: TabelaLotacaoRow = {
      id: uuidv4(),
      de_km: 0,
      ate_km: 0,
      rs_t: 0,
      custo_valor: 0,
      tso: 0,
      gris: 0,
    }
    setTabelaLotacao([...tabelaLotacao, newRow])
  }

  const handleRemoveRow = (id: string) => {
    setTabelaLotacao(tabelaLotacao.filter((row) => row.id !== id))
  }

  const handleInputChange = (
    id: string,
    field: keyof TabelaLotacaoRow,
    value: string,
  ) => {
    const updatedTable = tabelaLotacao.map((row) => {
      if (row.id === id) {
        return { ...row, [field]: parseFloat(value) || 0 }
      }
      return row
    })
    setTabelaLotacao(updatedTable)
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Tabela Lotação</h1>
        <Button onClick={handleAddRow}>Adicionar Linha</Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>KM De</TableHead>
              <TableHead>KM Até</TableHead>
              <TableHead>Faixa KM</TableHead>
              <TableHead>Custo Peso (R$/t)</TableHead>
              <TableHead>Custo Valor (%)</TableHead>
              <TableHead>GRIS (%)</TableHead>
              <TableHead>TSO (%)</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tabelaLotacao.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <Input
                    type="number"
                    value={row.de_km}
                    onChange={(e) =>
                      handleInputChange(row.id, 'de_km', e.target.value)
                    }
                    className="w-full bg-transparent"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={row.ate_km}
                    onChange={(e) =>
                      handleInputChange(row.id, 'ate_km', e.target.value)
                    }
                    className="w-full bg-transparent"
                  />
                </TableCell>
                <TableCell className="whitespace-nowrap">{`${row.de_km} - ${row.ate_km}`}</TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={row.rs_t}
                    onChange={(e) =>
                      handleInputChange(row.id, 'rs_t', e.target.value)
                    }
                    className="w-full bg-transparent"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={row.custo_valor * 100}
                    onChange={(e) =>
                      handleInputChange(
                        row.id,
                        'custo_valor',
                        String(parseFloat(e.target.value) / 100),
                      )
                    }
                    className="w-full bg-transparent"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={row.gris * 100}
                    onChange={(e) =>
                      handleInputChange(
                        row.id,
                        'gris',
                        String(parseFloat(e.target.value) / 100),
                      )
                    }
                    className="w-full bg-transparent"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={row.tso * 100}
                    onChange={(e) =>
                      handleInputChange(
                        row.id,
                        'tso',
                        String(parseFloat(e.target.value) / 100),
                      )
                    }
                    className="w-full bg-transparent"
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveRow(row.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
