import { useFreight } from '@/stores/useFreightStore'
import { CoeficienteANTTRow } from '@/types'
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

export default function CoeficientesANTTPage() {
  const { coeficientesANTT, setCoeficientesANTT } = useFreight()

  const handleAddRow = () => {
    const newRow: CoeficienteANTTRow = {
      id: uuidv4(),
      tabela: 'A',
      eixos: 0,
      ccd: 0,
      cc: 0,
    }
    setCoeficientesANTT([...coeficientesANTT, newRow])
  }

  const handleRemoveRow = (id: string) => {
    setCoeficientesANTT(coeficientesANTT.filter((row) => row.id !== id))
  }

  const handleInputChange = (
    id: string,
    field: keyof CoeficienteANTTRow,
    value: string | number,
  ) => {
    const updatedTable = coeficientesANTT.map((row) => {
      if (row.id === id) {
        const parsedValue =
          typeof value === 'string' && field !== 'tabela'
            ? parseFloat(value) || 0
            : value
        return { ...row, [field]: parsedValue }
      }
      return row
    })
    setCoeficientesANTT(updatedTable)
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Coeficientes ANTT</h1>
        <Button onClick={handleAddRow}>Adicionar Linha</Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tabela</TableHead>
              <TableHead>Eixos</TableHead>
              <TableHead>CCD (R$/km)</TableHead>
              <TableHead>CC (R$ fixo)</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {coeficientesANTT.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <Input
                    type="text"
                    value={row.tabela}
                    onChange={(e) =>
                      handleInputChange(row.id, 'tabela', e.target.value)
                    }
                    className="w-full bg-transparent"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={row.eixos}
                    onChange={(e) =>
                      handleInputChange(row.id, 'eixos', e.target.value)
                    }
                    className="w-full bg-transparent"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={row.ccd}
                    onChange={(e) =>
                      handleInputChange(row.id, 'ccd', e.target.value)
                    }
                    className="w-full bg-transparent"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={row.cc}
                    onChange={(e) =>
                      handleInputChange(row.id, 'cc', e.target.value)
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
