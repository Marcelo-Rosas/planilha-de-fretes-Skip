CREATE TABLE IF NOT EXISTS public.tabela_lotacao (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    uf_origem TEXT NOT NULL,
    uf_destino TEXT NOT NULL,
    km_min INTEGER NOT NULL,
    km_max INTEGER NOT NULL,
    custo_peso_rs_ton NUMERIC NOT NULL,
    gris_percent NUMERIC NOT NULL,
    tso_percent NUMERIC NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.parametros_lotacao (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    icms_percent NUMERIC NOT NULL DEFAULT 0,
    das_percent NUMERIC NOT NULL DEFAULT 0,
    rctr_c_percent NUMERIC NOT NULL DEFAULT 0,
    rc_dc_percent NUMERIC NOT NULL DEFAULT 0,
    markup_percent NUMERIC NOT NULL DEFAULT 0,
    seguros_percent NUMERIC NOT NULL DEFAULT 0,
    overhead_percent NUMERIC NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Insert default parameters if empty
INSERT INTO public.parametros_lotacao (icms_percent, das_percent, rctr_c_percent, rc_dc_percent, markup_percent, seguros_percent, overhead_percent)
SELECT 0.12, 0.06, 0.0005, 0.0005, 0.20, 0.01, 0.10
WHERE NOT EXISTS (SELECT 1 FROM public.parametros_lotacao);
