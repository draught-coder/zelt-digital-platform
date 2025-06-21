export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          role: 'bookkeeper' | 'client'
          full_name: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id: string
          email: string
          role?: 'bookkeeper' | 'client'
          full_name?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          email?: string
          role?: 'bookkeeper' | 'client'
          full_name?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      financial_statements: {
        Row: {
          id: string
          bookkeeper_id: string
          client_id: string
          year: number
          revenue: number | null
          cost: number | null
          gross_profit: number | null
          gross_profit_percentage: number | null
          expenses: number | null
          net_profit: number | null
          net_profit_percentage: number | null
          fixed_asset: number | null
          current_asset: number | null
          fixed_liability: number | null
          current_liability: number | null
          owners_equity: number | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          bookkeeper_id: string
          client_id: string
          year: number
          revenue?: number | null
          cost?: number | null
          gross_profit?: number | null
          gross_profit_percentage?: number | null
          expenses?: number | null
          net_profit?: number | null
          net_profit_percentage?: number | null
          fixed_asset?: number | null
          current_asset?: number | null
          fixed_liability?: number | null
          current_liability?: number | null
          owners_equity?: number | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          bookkeeper_id?: string
          client_id?: string
          year?: number
          revenue?: number | null
          cost?: number | null
          gross_profit?: number | null
          gross_profit_percentage?: number | null
          expenses?: number | null
          net_profit?: number | null
          net_profit_percentage?: number | null
          fixed_asset?: number | null
          current_asset?: number | null
          fixed_liability?: number | null
          current_liability?: number | null
          owners_equity?: number | null
          created_at?: string | null
          updated_at?: string | null
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
          }
        ]
      }
      tax_computations: {
        Row: {
          id: string
          financial_statement_id: string
          business_income: number | null
          disallowable_expenses: number | null
          capital_allowance: number | null
          personal_relief: number | null
          tax_rebate: number | null
          tax_rate: number | null
          tax_payable: number | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          financial_statement_id: string
          business_income?: number | null
          disallowable_expenses?: number | null
          capital_allowance?: number | null
          personal_relief?: number | null
          tax_rebate?: number | null
          tax_rate?: number | null
          tax_payable?: number | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          financial_statement_id?: string
          business_income?: number | null
          disallowable_expenses?: number | null
          capital_allowance?: number | null
          personal_relief?: number | null
          tax_rebate?: number | null
          tax_rate?: number | null
          tax_payable?: number | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tax_computations_financial_statement_id_fkey"
            columns: ["financial_statement_id"]
            isOneToOne: false
            referencedRelation: "financial_statements"
            referencedColumns: ["id"]
          }
        ]
      }
      tax_submissions: {
        Row: {
          id: string
          client_id: string
          bookkeeper_id: string
          assessment_year: number
          status: 'Pending' | 'Submitted' | 'Audited' | 'Amended'
          submission_date: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          client_id: string
          bookkeeper_id: string
          assessment_year: number
          status?: 'Pending' | 'Submitted' | 'Audited' | 'Amended'
          submission_date?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          client_id?: string
          bookkeeper_id?: string
          assessment_year?: number
          status?: 'Pending' | 'Submitted' | 'Audited' | 'Amended'
          submission_date?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tax_submissions_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tax_submissions_bookkeeper_id_fkey"
            columns: ["bookkeeper_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
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
      user_role: 'bookkeeper' | 'client'
      submission_status: 'Pending' | 'Submitted' | 'Audited' | 'Amended'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
