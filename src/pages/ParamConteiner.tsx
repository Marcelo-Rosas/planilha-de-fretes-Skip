import { useFreight } from '@/stores/useFreightStore'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'

export default function ParamConteinerPage() {
  const { paramConteiner, setParamConteiner } = useFreight()
  const { toast } = useToast()

  const handleSave = () => {
    toast({
      title: 'Parâmetros Salvos',
      description: 'Os parâmetros de Contêiner foram salvos com sucesso!',
    })
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Card>
        <CardHeader>
          <CardTitle>Parâmetros Contêiner</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label>GRIS %</Label>
            <Input
              type="number"
              value={paramConteiner.gris * 100}
              onChange={(e) =>
                setParamConteiner({
                  ...paramConteiner,
                  gris: parseFloat(e.target.value) / 100,
                })
              }
            />
          </div>
          <div className="space-y-2">
            <Label>AdValorem %</Label>
            <Input
              type="number"
              value={paramConteiner.adValorem * 100}
              onChange={(e) =>
                setParamConteiner({
                  ...paramConteiner,
                  adValorem: parseFloat(e.target.value) / 100,
                })
              }
            />
          </div>
          <div className="space-y-2">
            <Label>TSO %</Label>
            <Input
              type="number"
              value={paramConteiner.tso * 100}
              onChange={(e) =>
                setParamConteiner({
                  ...paramConteiner,
                  tso: parseFloat(e.target.value) / 100,
                })
              }
            />
          </div>
          <div className="space-y-2">
            <Label>DAS %</Label>
            <Input
              type="number"
              value={paramConteiner.das * 100}
              onChange={(e) =>
                setParamConteiner({
                  ...paramConteiner,
                  das: parseFloat(e.target.value) / 100,
                })
              }
            />
          </div>
          <div className="space-y-2">
            <Label>ICMS %</Label>
            <Input
              type="number"
              value={paramConteiner.icms * 100}
              onChange={(e) =>
                setParamConteiner({
                  ...paramConteiner,
                  icms: parseFloat(e.target.value) / 100,
                })
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Overhead %</Label>
            <Input
              type="number"
              value={paramConteiner.overhead * 100}
              onChange={(e) =>
                setParamConteiner({
                  ...paramConteiner,
                  overhead: parseFloat(e.target.value) / 100,
                })
              }
            />
          </div>
          <div className="space-y-2">
            <Label>RCTR-C %</Label>
            <Input
              type="number"
              value={paramConteiner.rctrc * 100}
              onChange={(e) =>
                setParamConteiner({
                  ...paramConteiner,
                  rctrc: parseFloat(e.target.value) / 100,
                })
              }
            />
          </div>
          <div className="space-y-2">
            <Label>RC-DC %</Label>
            <Input
              type="number"
              value={paramConteiner.rcdc * 100}
              onChange={(e) =>
                setParamConteiner({
                  ...paramConteiner,
                  rcdc: parseFloat(e.target.value) / 100,
                })
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Valor Pessoa R$</Label>
            <Input
              type="number"
              value={paramConteiner.valorPessoa}
              onChange={(e) =>
                setParamConteiner({
                  ...paramConteiner,
                  valorPessoa: parseFloat(e.target.value),
                })
              }
            />
          </div>
          <div className="md:col-span-2 lg:col-span-3 flex justify-end mt-4">
            <Button onClick={handleSave}>Salvar Parâmetros</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
