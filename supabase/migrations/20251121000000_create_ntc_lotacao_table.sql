-- Tabela NTC Lotação
-- Baseada na estrutura de dados fornecida com 7 colunas principais

CREATE TABLE IF NOT EXISTS public.ntc_lotacao (
  id UUID NOT NULL DEFAULT gen_random_uuid(),

  -- Faixa de distância (KM_De e KM_Ate)
  distance_min INTEGER NOT NULL,
  distance_max INTEGER NOT NULL,

  -- Representação textual da faixa (Faixa_KM)
  distance_range TEXT NOT NULL,

  -- Custo por peso em tonelada (Custo_Peso_R$/t)
  price_per_ton NUMERIC(10, 2) NOT NULL,

  -- Percentuais
  freight_value_percent NUMERIC(6, 4) NOT NULL, -- Custo_Valor_% (0,003 = 0.3%)
  gris_percent NUMERIC(6, 4) NOT NULL,          -- GRIS_% (0,003 = 0.3%)
  tso_percent NUMERIC(6, 4) NOT NULL,           -- TSO_% (0,0015 = 0.15%)

  -- Controle de versão e ativação
  version_date DATE NOT NULL DEFAULT CURRENT_DATE,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,

  -- Auditoria
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),

  CONSTRAINT ntc_lotacao_pkey PRIMARY KEY (id),

  -- Garante que não haja sobreposição de faixas ativas
  CONSTRAINT ntc_lotacao_distance_check CHECK (distance_max > distance_min)
) TABLESPACE pg_default;

-- Índice para consultas por status ativo e versão
CREATE INDEX IF NOT EXISTS idx_ntc_lotacao_active
  ON public.ntc_lotacao USING btree (is_active, version_date)
  TABLESPACE pg_default;

-- Índice para consultas por faixa de distância
CREATE INDEX IF NOT EXISTS idx_ntc_lotacao_distance
  ON public.ntc_lotacao USING btree (distance_min, distance_max)
  TABLESPACE pg_default;

-- Índice para busca pelo range textual
CREATE INDEX IF NOT EXISTS idx_ntc_lotacao_distance_range
  ON public.ntc_lotacao USING btree (distance_range)
  TABLESPACE pg_default;

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_ntc_lotacao_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para atualizar updated_at
CREATE TRIGGER update_ntc_lotacao_updated_at
  BEFORE UPDATE ON public.ntc_lotacao
  FOR EACH ROW
  EXECUTE FUNCTION update_ntc_lotacao_updated_at();

-- Comentários nas colunas para documentação
COMMENT ON TABLE public.ntc_lotacao IS 'Tabela de preços de frete NTC por lotação baseada em faixas de distância';
COMMENT ON COLUMN public.ntc_lotacao.distance_min IS 'Distância mínima da faixa em KM (KM_De)';
COMMENT ON COLUMN public.ntc_lotacao.distance_max IS 'Distância máxima da faixa em KM (KM_Ate)';
COMMENT ON COLUMN public.ntc_lotacao.distance_range IS 'Representação textual da faixa (ex: "1-50", "51-100")';
COMMENT ON COLUMN public.ntc_lotacao.price_per_ton IS 'Custo por tonelada em R$ (Custo_Peso_R$/t)';
COMMENT ON COLUMN public.ntc_lotacao.freight_value_percent IS 'Percentual sobre o valor do frete (Custo_Valor_%)';
COMMENT ON COLUMN public.ntc_lotacao.gris_percent IS 'Percentual GRIS (Gerenciamento de Risco)';
COMMENT ON COLUMN public.ntc_lotacao.tso_percent IS 'Percentual TSO (Taxa sobre o Solo)';
