export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: '13.0.5'
  }
  public: {
    Tables: {
      parametros_lotacao: {
        Row: {
          created_at: string
          das_percent: number
          icms_percent: number
          id: string
          markup_percent: number
          overhead_percent: number
          rc_dc_percent: number
          rctr_c_percent: number
          seguros_percent: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          das_percent?: number
          icms_percent?: number
          id?: string
          markup_percent?: number
          overhead_percent?: number
          rc_dc_percent?: number
          rctr_c_percent?: number
          seguros_percent?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          das_percent?: number
          icms_percent?: number
          id?: string
          markup_percent?: number
          overhead_percent?: number
          rc_dc_percent?: number
          rctr_c_percent?: number
          seguros_percent?: number
          updated_at?: string
        }
        Relationships: []
      }
      tabela_lotacao: {
        Row: {
          created_at: string
          custo_peso_rs_ton: number
          gris_percent: number
          id: string
          km_max: number
          km_min: number
          tso_percent: number
          uf_destino: string
          uf_origem: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          custo_peso_rs_ton: number
          gris_percent: number
          id?: string
          km_max: number
          km_min: number
          tso_percent: number
          uf_destino: string
          uf_origem: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          custo_peso_rs_ton?: number
          gris_percent?: number
          id?: string
          km_max?: number
          km_min?: number
          tso_percent?: number
          uf_destino?: string
          uf_origem?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
