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
      blog_posts: {
        Row: {
          category: string | null
          content: string | null
          created_at: string | null
          date: string | null
          excerpt: string | null
          id: number
          read_time: string | null
          title: string
        }
        Insert: {
          category?: string | null
          content?: string | null
          created_at?: string | null
          date?: string | null
          excerpt?: string | null
          id?: number
          read_time?: string | null
          title: string
        }
        Update: {
          category?: string | null
          content?: string | null
          created_at?: string | null
          date?: string | null
          excerpt?: string | null
          id?: number
          read_time?: string | null
          title?: string
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          company: string | null
          contact_number: string | null
          created_at: string | null
          email: string
          id: string
          message: string | null
          Name: string
        }
        Insert: {
          company?: string | null
          contact_number?: string | null
          created_at?: string | null
          email: string
          id?: string
          message?: string | null
          Name: string
        }
        Update: {
          company?: string | null
          contact_number?: string | null
          created_at?: string | null
          email?: string
          id?: string
          message?: string | null
          Name?: string
        }
        Relationships: []
      }
      corporate_tax_rates: {
        Row: {
          category: string | null
          description: string | null
          id: string
          rate: string | null
          year: string
        }
        Insert: {
          category?: string | null
          description?: string | null
          id?: string
          rate?: string | null
          year?: string
        }
        Update: {
          category?: string | null
          description?: string | null
          id?: string
          rate?: string | null
          year?: string
        }
        Relationships: []
      }
      individual_tax_rates: {
        Row: {
          bracket_type: string | null
          calculation: string | null
          category: string | null
          chargeable_income: string | null
          id: string
          rate: string | null
          tax_rm: string | null
          year: string
        }
        Insert: {
          bracket_type?: string | null
          calculation?: string | null
          category?: string | null
          chargeable_income?: string | null
          id?: string
          rate?: string | null
          tax_rm?: string | null
          year?: string
        }
        Update: {
          bracket_type?: string | null
          calculation?: string | null
          category?: string | null
          chargeable_income?: string | null
          id?: string
          rate?: string | null
          tax_rm?: string | null
          year?: string
        }
        Relationships: []
      }
      tax_reliefs: {
        Row: {
          amount: string | null
          category: string | null
          description: string | null
          id: string
          year: string
        }
        Insert: {
          amount?: string | null
          category?: string | null
          description?: string | null
          id?: string
          year?: string
        }
        Update: {
          amount?: string | null
          category?: string | null
          description?: string | null
          id?: string
          year?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          id: string
          email: string
          role: Database["public"]["Enums"]["user_role"]
          full_name: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id: string
          email: string
          role?: Database["public"]["Enums"]["user_role"]
          full_name?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          email?: string
          role?: Database["public"]["Enums"]["user_role"]
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
      tax_planning: {
        Row: {
          id: string
          bookkeeper_id: string
          client_id: string
          year: number
          planning_details: Json | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          bookkeeper_id: string
          client_id: string
          year: number
          planning_details?: Json | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          bookkeeper_id?: string
          client_id?: string
          year?: number
          planning_details?: Json | null
          created_at?: string | null
          updated_at?: string | null
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
          }
        ]
      }
      tax_simulations: {
        Row: {
          id: string
          bookkeeper_id: string
          client_id: string
          year: number
          simulation_details: Json | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          bookkeeper_id: string
          client_id: string
          year: number
          simulation_details?: Json | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          bookkeeper_id?: string
          client_id?: string
          year?: number
          simulation_details?: Json | null
          created_at?: string | null
          updated_at?: string | null
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
          }
        ]
      }
      tax_submissions: {
        Row: {
          id: string
          client_id: string
          bookkeeper_id: string
          assessment_year: number
          status: Database["public"]["Enums"]["submission_status"]
          submission_date: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          client_id: string
          bookkeeper_id: string
          assessment_year: number
          status?: Database["public"]["Enums"]["submission_status"]
          submission_date?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          client_id?: string
          bookkeeper_id?: string
          assessment_year?: number
          status?: Database["public"]["Enums"]["submission_status"]
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
      has_role: {
        Args: {
          _user_id: string
          _role: Database["public"]["Enums"]["user_role"]
        }
        Returns: boolean
      }
    }
    Enums: {
      user_role: "bookkeeper" | "client"
      submission_status: "Pending" | "Submitted" | "Audited" | "Amended"
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
  TableName extends DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
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
  TableName extends DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
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
  TableName extends DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
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
  EnumName extends DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
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
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
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
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
