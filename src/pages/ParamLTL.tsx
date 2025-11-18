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

export default function ParamLTLPage() {
  const { paramLTL, setParamLTL } = useFreight()
  const { toast } = useToast()

  const handleSave = () => {
    toast({
      title: 'Parâmetros Salvos',
      description: 'Os parâmetros LTL foram salvos com sucesso!',
    })
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Card>
        <CardHeader>
          <CardTitle>Parâmetros LTL</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label>Custo Valor %</Label>
            <Input
              type="number"
              value={paramLTL.custoValor * 100}
              onChange={(e) =>
                setParamLTL({
                  ...paramLTL,
                  custoValor: parseFloat(e.target.value) / 100,
                })
              }
            />
          </div>
          <div className="space-y-2">
            <Label>TSO %</Label>
            <Input
              type="number"
              value={paramLTL.tso * 100}
              onChange={(e) =>
                setParamLTL({
                  ...paramLTL,
                  tso: parseFloat(e.target.value) / 100,
                })
              }
            />
          </div>
          <div className="space-y-2">
            <Label>GRIS %</Label>
            <Input
              type="number"
              value={paramLTL.gris * 100}
              onChange={(e) =>
                setParamLTL({
                  ...paramLTL,
                  gris: parseFloat(e.target.value) / 100,
                })
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Overhead %</Label>
            <Input
              type="number"
              value={paramLTL.overhead * 100}
              onChange={(e) =>
                setParamLTL({
                  ...paramLTL,
                  overhead: parseFloat(e.target.value) / 100,
                })
              }
            />
          </div>
          <div className="space-y-2">
            <Label>DAS %</Label>
            <Input
              type="number"
              value={paramLTL.das * 100}
              onChange={(e) =>
                setParamLTL({
                  ...paramLTL,
                  das: parseFloat(e.target.value) / 100,
                })
              }
            />
          </div>
          <div className="space-y-2">
            <Label>ICMS % Default</Label>
            <Input
              type="number"
              value={paramLTL.icmsDefault * 100}
              onChange={(e) =>
                setParamLTL({
                  ...paramLTL,
                  icmsDefault: parseFloat(e.target.value) / 100,
                })
              }
            />
          </div>
          <div className="space-y-2">
            <Label>RCTRC % Custo Real</Label>
            <Input
              type="number"
              value={paramLTL.rctrc * 100}
              onChange={(e) =>
                setParamLTL({
                  ...paramLTL,
                  rctrc: parseFloat(e.target.value) / 100,
                })
              }
            />
          </div>
          <div className="space-y-2">
            <Label>RCDC % Custo Real</Label>
            <Input
              type="number"
              value={paramLTL.rcdc * 100}
              onChange={(e) =>
                setParamLTL({
                  ...paramLTL,
                  rcdc: parseFloat(e.target.value) / 100,
                })
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Valor Pessoa R$</Label>
            <Input
              type="number"
              value={paramLTL.valorPessoa}
              onChange={(e) =>
                setParamLTL({
                  ...paramLTL,
                  valorPessoa: parseFloat(e.target.value),
                })
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Overhead Base</Label>
            <Select
              value={paramLTL.overheadBase}
              onValueChange={(value) =>
                setParamLTL({ ...paramLTL, overheadBase: value as any })
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
              value={paramLTL.margensOpcoes}
              onChange={(e) =>
                setParamLTL({ ...paramLTL, margensOpcoes: e.target.value })
              }
            />
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              checked={paramLTL.baseDasIncluiPedagio}
              onCheckedChange={(checked) =>
                setParamLTL({ ...paramLTL, baseDasIncluiPedagio: checked })
              }
            />
            <Label>Base DAS Inclui Pedágio?</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              checked={paramLTL.baseDasIncluiCarga}
              onCheckedChange={(checked) =>
                setParamLTL({ ...paramLTL, baseDasIncluiCarga: checked })
              }
            />
            <Label>Base DAS Inclui Carga?</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              checked={paramLTL.baseDasIncluiDescarga}
              onCheckedChange={(checked) =>
                setParamLTL({ ...paramLTL, baseDasIncluiDescarga: checked })
              }
            />
            <Label>Base DAS Inclui Descarga?</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              checked={paramLTL.baseDasIncluiAluguel}
              onCheckedChange={(checked) =>
                setParamLTL({ ...paramLTL, baseDasIncluiAluguel: checked })
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
