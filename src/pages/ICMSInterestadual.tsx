import { useFreight } from '@/stores/useFreightStore'
import { ICMSInterestadualRow, UF } from '@/types'
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
import { UFS } from '@/lib/utils'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'

export default function ICMSInterestadualPage() {
  const { icmsInterestadual, setIcmsInterestadual } = useFreight()

  const handleAddRow = () => {
    const newRow: ICMSInterestadualRow = {
      id: uuidv4(),
      uf_origem: 'SP',
      uf_destino: 'SP',
      percent: 0,
    }
    setIcmsInterestadual([...icmsInterestadual, newRow])
  }

  const handleRemoveRow = (id: string) => {
    setIcmsInterestadual(icmsInterestadual.filter((row) => row.id !== id))
  }

  const handleUpdateRow = (
    id: string,
    field: keyof ICMSInterestadualRow,
    value: string | number,
  ) => {
    const updatedTable = icmsInterestadual.map((row) => {
      if (row.id === id) {
        return { ...row, [field]: value }
      }
      return row
    })
    setIcmsInterestadual(updatedTable)
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">ICMS Interestadual</h1>
        <Button onClick={handleAddRow}>Adicionar Linha</Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>UF Origem</TableHead>
              <TableHead>UF Destino</TableHead>
              <TableHead>Percentual (%)</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {icmsInterestadual.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <Select
                    value={row.uf_origem}
                    onValueChange={(v) =>
                      handleUpdateRow(row.id, 'uf_origem', v as UF)
                    }
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
                <TableCell>
                  <Select
                    value={row.uf_destino}
                    onValueChange={(v) =>
                      handleUpdateRow(row.id, 'uf_destino', v as UF)
                    }
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
                <TableCell>
                  <Input
                    type="number"
                    value={row.percent * 100}
                    onChange={(e) =>
                      handleUpdateRow(
                        row.id,
                        'percent',
                        parseFloat(e.target.value) / 100,
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
