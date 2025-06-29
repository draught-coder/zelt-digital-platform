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
          author: string | null
          category: string | null
          content: string | null
          created_at: string | null
          date: string
          excerpt: string | null
          id: number
          image_url: string | null
          read_time: number | null
          title: string
        }
        Insert: {
          author?: string | null
          category?: string | null
          content?: string | null
          created_at?: string | null
          date: string
          excerpt?: string | null
          id?: number
          image_url?: string | null
          read_time?: number | null
          title: string
        }
        Update: {
          author?: string | null
          category?: string | null
          content?: string | null
          created_at?: string | null
          date?: string
          excerpt?: string | null
          id?: number
          image_url?: string | null
          read_time?: number | null
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
      documents: {
        Row: {
          assigned_client: string
          created_at: string | null
          id: string
          status: string | null
          template_id: string
        }
        Insert: {
          assigned_client: string
          created_at?: string | null
          id?: string
          status?: string | null
          template_id: string
        }
        Update: {
          assigned_client?: string
          created_at?: string | null
          id?: string
          status?: string | null
          template_id?: string
        }
        Relationships: []
      }
      docuseal_forms: {
        Row: {
          client_id: string | null
          created_at: string
          created_by: string | null
          description: string | null
          document_type: string | null
          docuseal_form_id: string
          id: number
          name: string
        }
        Insert: {
          client_id?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          document_type?: string | null
          docuseal_form_id: string
          id?: number
          name: string
        }
        Update: {
          client_id?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          document_type?: string | null
          docuseal_form_id?: string
          id?: number
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "docuseal_forms_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      event_logs: {
        Row: {
          created_at: string | null
          document_id: string | null
          event_details: string | null
          event_type: string
          id: string
        }
        Insert: {
          created_at?: string | null
          document_id?: string | null
          event_details?: string | null
          event_type: string
          id?: string
        }
        Update: {
          created_at?: string | null
          document_id?: string | null
          event_details?: string | null
          event_type?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_logs_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "documents"
            referencedColumns: ["id"]
          },
        ]
      }
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
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string
          full_name: string | null
          id: string
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email: string
          full_name?: string | null
          id: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
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
        Relationships: []
      }
      tax_submissions: {
        Row: {
          assessment_year: number
          bookkeeper_id: string
          client_id: string
          created_at: string | null
          id: string
          status: Database["public"]["Enums"]["submission_status"]
          submission_date: string | null
          updated_at: string | null
        }
        Insert: {
          assessment_year: number
          bookkeeper_id: string
          client_id: string
          created_at?: string | null
          id?: string
          status?: Database["public"]["Enums"]["submission_status"]
          submission_date?: string | null
          updated_at?: string | null
        }
        Update: {
          assessment_year?: number
          bookkeeper_id?: string
          client_id?: string
          created_at?: string | null
          id?: string
          status?: Database["public"]["Enums"]["submission_status"]
          submission_date?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _user_id: string
          _role: Database["public"]["Enums"]["app_role"]
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "client" | "user"
      submission_status: "Pending" | "Submitted" | "Audited" | "Amended"
      user_role: "admin" | "bookkeeper" | "client"
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
      app_role: ["admin", "client", "user"],
      submission_status: ["Pending", "Submitted", "Audited", "Amended"],
      user_role: ["admin", "bookkeeper", "client"],
    },
  },
} as const
