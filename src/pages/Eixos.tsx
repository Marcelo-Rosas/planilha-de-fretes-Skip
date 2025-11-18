import { useFreight } from '@/stores/useFreightStore'
import { EixoRow } from '@/types'
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

export default function EixosPage() {
  const { eixos, setEixos } = useFreight()

  const handleAddRow = () => {
    const newRow: EixoRow = { id: uuidv4(), eixo: 0, descricao: '' }
    setEixos([...eixos, newRow])
  }

  const handleRemoveRow = (id: string) => {
    setEixos(eixos.filter((row) => row.id !== id))
  }

  const handleInputChange = (
    id: string,
    field: keyof EixoRow,
    value: string | number,
  ) => {
    const updatedTable = eixos.map((row) => {
      if (row.id === id) {
        return { ...row, [field]: value }
      }
      return row
    })
    setEixos(updatedTable)
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Eixos</h1>
        <Button onClick={handleAddRow}>Adicionar Linha</Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Eixo</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {eixos.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <Input
                    type="number"
                    value={row.eixo}
                    onChange={(e) =>
                      handleInputChange(
                        row.id,
                        'eixo',
                        parseInt(e.target.value) || 0,
                      )
                    }
                    className="w-full bg-transparent"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="text"
                    value={row.descricao}
                    onChange={(e) =>
                      handleInputChange(row.id, 'descricao', e.target.value)
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
