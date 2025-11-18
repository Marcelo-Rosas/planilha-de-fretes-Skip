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

export default function ParamANTTPage() {
  const { paramANTT, setParamANTT } = useFreight()
  const { toast } = useToast()

  const handleSave = () => {
    toast({
      title: 'Parâmetros Salvos',
      description: 'Os parâmetros ANTT foram salvos com sucesso!',
    })
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Card>
        <CardHeader>
          <CardTitle>Parâmetros ANTT</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label>Eixos Default</Label>
            <Input
              type="number"
              value={paramANTT.eixosDefault}
              onChange={(e) =>
                setParamANTT({
                  ...paramANTT,
                  eixosDefault: parseInt(e.target.value),
                })
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Retorno Vazio Mult. Default</Label>
            <Input
              type="number"
              value={paramANTT.retornoVazioMultDefault}
              onChange={(e) =>
                setParamANTT({
                  ...paramANTT,
                  retornoVazioMultDefault: parseFloat(e.target.value),
                })
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Retorno Vazio Mult. Máximo</Label>
            <Input
              type="number"
              value={paramANTT.retornoVazioMultMaximo}
              onChange={(e) =>
                setParamANTT({
                  ...paramANTT,
                  retornoVazioMultMaximo: parseFloat(e.target.value),
                })
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Rateio Fixos %</Label>
            <Input
              type="number"
              value={paramANTT.rateioFixos * 100}
              onChange={(e) =>
                setParamANTT({
                  ...paramANTT,
                  rateioFixos: parseFloat(e.target.value) / 100,
                })
              }
            />
          </div>
          <div className="space-y-2">
            <Label>GRIS %</Label>
            <Input
              type="number"
              value={paramANTT.gris * 100}
              onChange={(e) =>
                setParamANTT({
                  ...paramANTT,
                  gris: parseFloat(e.target.value) / 100,
                })
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Ad Valorem %</Label>
            <Input
              type="number"
              value={paramANTT.adValorem * 100}
              onChange={(e) =>
                setParamANTT({
                  ...paramANTT,
                  adValorem: parseFloat(e.target.value) / 100,
                })
              }
            />
          </div>
          <div className="space-y-2">
            <Label>DAS %</Label>
            <Input
              type="number"
              value={paramANTT.das * 100}
              onChange={(e) =>
                setParamANTT({
                  ...paramANTT,
                  das: parseFloat(e.target.value) / 100,
                })
              }
            />
          </div>
          <div className="space-y-2">
            <Label>ICMS % Default</Label>
            <Input
              type="number"
              value={paramANTT.icmsDefault * 100}
              onChange={(e) =>
                setParamANTT({
                  ...paramANTT,
                  icmsDefault: parseFloat(e.target.value) / 100,
                })
              }
            />
          </div>
          <div className="space-y-2">
            <Label>RCTRC % Custo Real</Label>
            <Input
              type="number"
              value={paramANTT.rctrc * 100}
              onChange={(e) =>
                setParamANTT({
                  ...paramANTT,
                  rctrc: parseFloat(e.target.value) / 100,
                })
              }
            />
          </div>
          <div className="space-y-2">
            <Label>RCDC % Custo Real</Label>
            <Input
              type="number"
              value={paramANTT.rcdc * 100}
              onChange={(e) =>
                setParamANTT({
                  ...paramANTT,
                  rcdc: parseFloat(e.target.value) / 100,
                })
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Overhead %</Label>
            <Input
              type="number"
              value={paramANTT.overhead * 100}
              onChange={(e) =>
                setParamANTT({
                  ...paramANTT,
                  overhead: parseFloat(e.target.value) / 100,
                })
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Valor Pessoa R$</Label>
            <Input
              type="number"
              value={paramANTT.valorPessoa}
              onChange={(e) =>
                setParamANTT({
                  ...paramANTT,
                  valorPessoa: parseFloat(e.target.value),
                })
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Margem Comercial %</Label>
            <Input
              type="number"
              value={paramANTT.margemComercial * 100}
              onChange={(e) =>
                setParamANTT({
                  ...paramANTT,
                  margemComercial: parseFloat(e.target.value) / 100,
                })
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Tabela ANTT</Label>
            <Input
              value={paramANTT.tabelaANTT}
              onChange={(e) =>
                setParamANTT({ ...paramANTT, tabelaANTT: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Overhead Base</Label>
            <Select
              value={paramANTT.overheadBase}
              onValueChange={(value) =>
                setParamANTT({ ...paramANTT, overheadBase: value as any })
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
              value={paramANTT.margensOpcoes}
              onChange={(e) =>
                setParamANTT({ ...paramANTT, margensOpcoes: e.target.value })
              }
            />
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              checked={paramANTT.baseDasIncluiPedagio}
              onCheckedChange={(checked) =>
                setParamANTT({ ...paramANTT, baseDasIncluiPedagio: checked })
              }
            />
            <Label>Base DAS Inclui Pedágio?</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              checked={paramANTT.baseDasIncluiGeneralidades}
              onCheckedChange={(checked) =>
                setParamANTT({
                  ...paramANTT,
                  baseDasIncluiGeneralidades: checked,
                })
              }
            />
            <Label>Base DAS Inclui Generalidades?</Label>
          </div>
          <div className="md:col-span-2 lg:col-span-3 flex justify-end">
            <Button onClick={handleSave}>Salvar Parâmetros</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
