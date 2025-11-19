import { useFreight } from '@/stores/useFreightStore'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Trash2, Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { UFS } from '@/lib/utils'

export default function TabelaLotacaoPage() {
  const {
    tabelaLotacao,
    addTabelaLotacaoRow,
    updateTabelaLotacaoRow,
    removeTabelaLotacaoRow,
    isLoading,
  } = useFreight()

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Tabela Lotação</h1>
        <Button onClick={addTabelaLotacaoRow}>Adicionar Linha</Button>
      </div>
      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>UF Origem</TableHead>
              <TableHead>UF Destino</TableHead>
              <TableHead>KM Min</TableHead>
              <TableHead>KM Max</TableHead>
              <TableHead>Custo Peso (R$/t)</TableHead>
              <TableHead>GRIS (%)</TableHead>
              <TableHead>TSO (%)</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tabelaLotacao.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <Select
                    value={row.uf_origem}
                    onValueChange={(v) =>
                      updateTabelaLotacaoRow(row.id, { uf_origem: v })
                    }
                  >
                    <SelectTrigger className="w-[80px]">
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
                      updateTabelaLotacaoRow(row.id, { uf_destino: v })
                    }
                  >
                    <SelectTrigger className="w-[80px]">
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
                    value={row.km_min}
                    onChange={(e) =>
                      updateTabelaLotacaoRow(row.id, {
                        km_min: parseInt(e.target.value),
                      })
                    }
                    className="w-20"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={row.km_max}
                    onChange={(e) =>
                      updateTabelaLotacaoRow(row.id, {
                        km_max: parseInt(e.target.value),
                      })
                    }
                    className="w-20"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={row.custo_peso_rs_ton}
                    onChange={(e) =>
                      updateTabelaLotacaoRow(row.id, {
                        custo_peso_rs_ton: parseFloat(e.target.value),
                      })
                    }
                    className="w-24"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={row.gris_percent * 100}
                    onChange={(e) =>
                      updateTabelaLotacaoRow(row.id, {
                        gris_percent: parseFloat(e.target.value) / 100,
                      })
                    }
                    className="w-20"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={row.tso_percent * 100}
                    onChange={(e) =>
                      updateTabelaLotacaoRow(row.id, {
                        tso_percent: parseFloat(e.target.value) / 100,
                      })
                    }
                    className="w-20"
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeTabelaLotacaoRow(row.id)}
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
