import { useFreight } from '@/stores/useFreightStore'
import { TabelaLTLRow } from '@/types'
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

export default function TabelaLTLPage() {
  const { tabelaLTL, setTabelaLTL } = useFreight()

  const handleAddRow = () => {
    const newRow: TabelaLTLRow = {
      id: uuidv4(),
      de_km: 0,
      ate_km: 0,
      rs_t: 0,
      custo_valor: 0,
      tso: 0,
      gris: 0,
    }
    setTabelaLTL([...tabelaLTL, newRow])
  }

  const handleRemoveRow = (id: string) => {
    setTabelaLTL(tabelaLTL.filter((row) => row.id !== id))
  }

  const handleInputChange = (
    id: string,
    field: keyof TabelaLTLRow,
    value: string,
  ) => {
    const updatedTable = tabelaLTL.map((row) => {
      if (row.id === id) {
        return { ...row, [field]: parseFloat(value) || 0 }
      }
      return row
    })
    setTabelaLTL(updatedTable)
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Tabela LTL</h1>
        <Button onClick={handleAddRow}>Adicionar Linha</Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>De (km)</TableHead>
              <TableHead>Até (km)</TableHead>
              <TableHead>R$/t</TableHead>
              <TableHead>Custo Valor %</TableHead>
              <TableHead>TSO %</TableHead>
              <TableHead>GRIS %</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tabelaLTL.map((row) => (
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
