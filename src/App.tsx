import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { FreightProvider } from '@/stores/useFreightStore'

import Layout from './components/Layout'
import Index from './pages/Index'
import NotFound from './pages/NotFound'
import ParamLTLPage from './pages/ParamLTL'
import ParamLotacaoPage from './pages/ParamLotacao'
import ParamANTTPage from './pages/ParamANTT'
import ParamConteinerPage from './pages/ParamConteiner'
import TabelaLTLPage from './pages/TabelaLTL'
import TabelaLotacaoPage from './pages/TabelaLotacao'
import EixosPage from './pages/Eixos'
import CoeficientesANTTPage from './pages/CoeficientesANTT'
import ICMSInterestadualPage from './pages/ICMSInterestadual'

const App = () => (
  <BrowserRouter>
    <FreightProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/param-ltl" element={<ParamLTLPage />} />
            <Route path="/param-lotacao" element={<ParamLotacaoPage />} />
            <Route path="/param-antt" element={<ParamANTTPage />} />
            <Route path="/param-conteiner" element={<ParamConteinerPage />} />
            <Route path="/tabela-ltl" element={<TabelaLTLPage />} />
            <Route path="/tabela-lotacao" element={<TabelaLotacaoPage />} />
            <Route path="/eixos" element={<EixosPage />} />
            <Route
              path="/coeficientes-antt"
              element={<CoeficientesANTTPage />}
            />
            <Route
              path="/icms-interestadual"
              element={<ICMSInterestadualPage />}
            />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </FreightProvider>
  </BrowserRouter>
)

export default App
