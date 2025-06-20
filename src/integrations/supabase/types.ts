export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      financial_statements: {
        Row: {
          bookkeeper_id: string
          client_id: string
          cost: number | null
          created_at: string | null
          current_asset: number | null
          current_liability: number | null
          expenses: number | null
          fixed_asset: number | null
          fixed_liability: number | null
          gross_profit: number | null
          gross_profit_percentage: number | null
          id: string
          net_profit: number | null
          net_profit_percentage: number | null
          owners_equity: number | null
          revenue: number | null
          updated_at: string | null
          year: number
        }
        Insert: {
          bookkeeper_id: string
          client_id: string
          cost?: number | null
          created_at?: string | null
          current_asset?: number | null
          current_liability?: number | null
          expenses?: number | null
          fixed_asset?: number | null
          fixed_liability?: number | null
          gross_profit?: number | null
          gross_profit_percentage?: number | null
          id?: string
          net_profit?: number | null
          net_profit_percentage?: number | null
          owners_equity?: number | null
          revenue?: number | null
          updated_at?: string | null
          year: number
        }
        Update: {
          bookkeeper_id?: string
          client_id?: string
          cost?: number | null
          created_at?: string | null
          current_asset?: number | null
          current_liability?: number | null
          expenses?: number | null
          fixed_asset?: number | null
          fixed_liability?: number | null
          gross_profit?: number | null
          gross_profit_percentage?: number | null
          id?: string
          net_profit?: number | null
          net_profit_percentage?: number | null
          owners_equity?: number | null
          revenue?: number | null
          updated_at?: string | null
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "financial_statements_bookkeeper_id_fkey"
            columns: ["bookkeeper_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "financial_statements_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string
          full_name: string | null
          id: string
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          full_name?: string | null
          id: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          full_name?: string | null
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
        }
        Relationships: []
      }
      tax_computations: {
        Row: {
          business_income: number | null
          capital_allowance: number | null
          created_at: string | null
          disallowable_expenses: number | null
          financial_statement_id: string
          id: string
          personal_relief: number | null
          tax_payable: number | null
          tax_rate: number | null
          tax_rebate: number | null
          updated_at: string | null
        }
        Insert: {
          business_income?: number | null
          capital_allowance?: number | null
          created_at?: string | null
          disallowable_expenses?: number | null
          financial_statement_id: string
          id?: string
          personal_relief?: number | null
          tax_payable?: number | null
          tax_rate?: number | null
          tax_rebate?: number | null
          updated_at?: string | null
        }
        Update: {
          business_income?: number | null
          capital_allowance?: number | null
          created_at?: string | null
          disallowable_expenses?: number | null
          financial_statement_id?: string
          id?: string
          personal_relief?: number | null
          tax_payable?: number | null
          tax_rate?: number | null
          tax_rebate?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tax_computations_financial_statement_id_fkey"
            columns: ["financial_statement_id"]
            isOneToOne: false
            referencedRelation: "financial_statements"
            referencedColumns: ["id"]
          },
        ]
      }
      tax_planning: {
        Row: {
          bookkeeper_id: string
          client_id: string
          created_at: string | null
          id: string
          planning_details: Json | null
          updated_at: string | null
          year: number
        }
        Insert: {
          bookkeeper_id: string
          client_id: string
          created_at?: string | null
          id?: string
          planning_details?: Json | null
          updated_at?: string | null
          year: number
        }
        Update: {
          bookkeeper_id?: string
          client_id?: string
          created_at?: string | null
          id?: string
          planning_details?: Json | null
          updated_at?: string | null
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "tax_planning_bookkeeper_id_fkey"
            columns: ["bookkeeper_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tax_planning_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      tax_simulations: {
        Row: {
          bookkeeper_id: string
          client_id: string
          created_at: string | null
          id: string
          simulation_details: Json | null
          updated_at: string | null
          year: number
        }
        Insert: {
          bookkeeper_id: string
          client_id: string
          created_at?: string | null
          id?: string
          simulation_details?: Json | null
          updated_at?: string | null
          year: number
        }
        Update: {
          bookkeeper_id?: string
          client_id?: string
          created_at?: string | null
          id?: string
          simulation_details?: Json | null
          updated_at?: string | null
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "tax_simulations_bookkeeper_id_fkey"
            columns: ["bookkeeper_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tax_simulations_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_role: "bookkeeper" | "client"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      user_role: ["bookkeeper", "client"],
    },
  },
} as const
