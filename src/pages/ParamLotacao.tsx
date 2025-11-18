import { useFreight } from '@/stores/useFreightStore'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { useToast } from '@/components/ui/use-toast'

export default function ParamLotacaoPage() {
  const { paramLotacao, setParamLotacao } = useFreight()
  const { toast } = useToast()

  const handleSave = () => {
    toast({
      title: 'Parâmetros Salvos',
      description: 'Os parâmetros de Lotação foram salvos com sucesso!',
    })
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Card>
        <CardHeader>
          <CardTitle>Parâmetros Lotação</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label>Overhead %</Label>
            <Input
              type="number"
              value={paramLotacao.overhead * 100}
              onChange={(e) =>
                setParamLotacao({
                  ...paramLotacao,
                  overhead: parseFloat(e.target.value) / 100,
                })
              }
            />
          </div>
          <div className="space-y-2">
            <Label>DAS %</Label>
            <Input
              type="number"
              value={paramLotacao.das * 100}
              onChange={(e) =>
                setParamLotacao({
                  ...paramLotacao,
                  das: parseFloat(e.target.value) / 100,
                })
              }
            />
          </div>
          <div className="space-y-2">
            <Label>ICMS % Default</Label>
            <Input
              type="number"
              value={paramLotacao.icmsDefault * 100}
              onChange={(e) =>
                setParamLotacao({
                  ...paramLotacao,
                  icmsDefault: parseFloat(e.target.value) / 100,
                })
              }
            />
          </div>
          <div className="space-y-2">
            <Label>RCTRC % Custo Real</Label>
            <Input
              type="number"
              value={paramLotacao.rctrc * 100}
              onChange={(e) =>
                setParamLotacao({
                  ...paramLotacao,
                  rctrc: parseFloat(e.target.value) / 100,
                })
              }
            />
          </div>
          <div className="space-y-2">
            <Label>RCDC % Custo Real</Label>
            <Input
              type="number"
              value={paramLotacao.rcdc * 100}
              onChange={(e) =>
                setParamLotacao({
                  ...paramLotacao,
                  rcdc: parseFloat(e.target.value) / 100,
                })
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Valor Pessoa R$</Label>
            <Input
              type="number"
              value={paramLotacao.valorPessoa}
              onChange={(e) =>
                setParamLotacao({
                  ...paramLotacao,
                  valorPessoa: parseFloat(e.target.value),
                })
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Overhead Base</Label>
            <Select
              value={paramLotacao.overheadBase}
              onValueChange={(value) =>
                setParamLotacao({ ...paramLotacao, overheadBase: value as any })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Receita_CT-e">Receita_CT-e</SelectItem>
                <SelectItem value="Receita_Ajustada">
                  Receita_Ajustada
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Margens Opções (%)</Label>
            <Input
              value={paramLotacao.margensOpcoes}
              onChange={(e) =>
                setParamLotacao({
                  ...paramLotacao,
                  margensOpcoes: e.target.value,
                })
              }
            />
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              checked={paramLotacao.baseDasIncluiPedagio}
              onCheckedChange={(checked) =>
                setParamLotacao({
                  ...paramLotacao,
                  baseDasIncluiPedagio: checked,
                })
              }
            />
            <Label>Base DAS Inclui Pedágio?</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              checked={paramLotacao.baseDasIncluiCarga}
              onCheckedChange={(checked) =>
                setParamLotacao({
                  ...paramLotacao,
                  baseDasIncluiCarga: checked,
                })
              }
            />
            <Label>Base DAS Inclui Carga?</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              checked={paramLotacao.baseDasIncluiDescarga}
              onCheckedChange={(checked) =>
                setParamLotacao({
                  ...paramLotacao,
                  baseDasIncluiDescarga: checked,
                })
              }
            />
            <Label>Base DAS Inclui Descarga?</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              checked={paramLotacao.baseDasIncluiAluguel}
              onCheckedChange={(checked) =>
                setParamLotacao({
                  ...paramLotacao,
                  baseDasIncluiAluguel: checked,
                })
              }
            />
            <Label>Base DAS Inclui Aluguel?</Label>
          </div>
          <div className="md:col-span-2 lg:col-span-3 flex justify-end">
            <Button onClick={handleSave}>Salvar Parâmetros</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
