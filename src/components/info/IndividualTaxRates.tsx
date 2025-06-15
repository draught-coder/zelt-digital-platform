
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Users } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";

interface IndividualTaxRatesProps {
  selectedYear: string;
}

// Fetch from supabase
const fetchTaxRates = async (year: string) => {
  // Fetch only for selected year, sorted as original
  const { data, error } = await supabase
    .from("individual_tax_rates")
    .select("*")
    .eq("year", year)
    .order("chargeable_income", { ascending: true });

  if (error) throw error;
  return data;
};

const IndividualTaxRates: React.FC<IndividualTaxRatesProps> = ({ selectedYear }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["individual-tax-rates", selectedYear],
    queryFn: () => fetchTaxRates(selectedYear),
  });

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <Users className="w-8 h-8 text-blue-600" />
        <h2 className="text-3xl font-bold text-gray-900">Individual Income Tax Rates</h2>
        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
          Assessment Year {selectedYear}
        </span>
      </div>
      <p className="text-gray-600 mb-8">Progressive tax rates for Malaysian resident individuals</p>
      <div className="overflow-x-auto">
        {isLoading && (
          <div className="w-full text-center py-8 text-blue-600 font-semibold">Loading tax rates…</div>
        )}
        {error && (
          <div className="w-full text-center py-8 text-red-600 font-semibold">
            Failed to load tax rates!
          </div>
        )}
        {!isLoading && !error && (!data || data.length === 0) && (
          <div className="w-full text-center py-8 text-gray-500">No tax rates found for {selectedYear}.</div>
        )}
        {!!data && data.length > 0 && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Chargeable Income</TableHead>
                <TableHead>Bracket Type</TableHead>
                <TableHead>Calculation</TableHead>
                <TableHead>Tax Rate</TableHead>
                <TableHead>Tax (RM)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((rate, index) => (
                <TableRow key={rate.id ?? index}>
                  <TableCell className="font-medium">{rate.category ?? "-"}</TableCell>
                  <TableCell>{rate.chargeable_income ?? "-"}</TableCell>
                  <TableCell>{rate.bracket_type ?? "-"}</TableCell>
                  <TableCell>{rate.calculation ?? "-"}</TableCell>
                  <TableCell>{rate.rate ?? "-"}</TableCell>
                  <TableCell>{rate.tax_rm ?? "-"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default IndividualTaxRates;
