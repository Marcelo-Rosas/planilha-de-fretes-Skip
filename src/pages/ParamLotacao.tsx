import { useFreight } from '@/stores/useFreightStore'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2 } from 'lucide-react'

export default function ParamLotacaoPage() {
  const { paramLotacao, saveParamLotacao, isLoading } = useFreight()

  const handleSave = () => {
    saveParamLotacao(paramLotacao)
  }

  const handleChange = (field: keyof typeof paramLotacao, value: string) => {
    const numValue = parseFloat(value) / 100
    saveParamLotacao({ ...paramLotacao, [field]: numValue })
  }

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Card>
        <CardHeader>
          <CardTitle>Parâmetros Lotação</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label>ICMS %</Label>
            <Input
              type="number"
              value={paramLotacao.icms_percent * 100}
              onChange={(e) => handleChange('icms_percent', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>DAS %</Label>
            <Input
              type="number"
              value={paramLotacao.das_percent * 100}
              onChange={(e) => handleChange('das_percent', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>RCTR-C %</Label>
            <Input
              type="number"
              value={paramLotacao.rctr_c_percent * 100}
              onChange={(e) => handleChange('rctr_c_percent', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>RC-DC %</Label>
            <Input
              type="number"
              value={paramLotacao.rc_dc_percent * 100}
              onChange={(e) => handleChange('rc_dc_percent', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Markup %</Label>
            <Input
              type="number"
              value={paramLotacao.markup_percent * 100}
              onChange={(e) => handleChange('markup_percent', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Seguros %</Label>
            <Input
              type="number"
              value={paramLotacao.seguros_percent * 100}
              onChange={(e) => handleChange('seguros_percent', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Overhead %</Label>
            <Input
              type="number"
              value={paramLotacao.overhead_percent * 100}
              onChange={(e) => handleChange('overhead_percent', e.target.value)}
            />
          </div>
          <div className="md:col-span-2 lg:col-span-3 flex justify-end">
            <Button onClick={handleSave}>Salvar Parâmetros</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
