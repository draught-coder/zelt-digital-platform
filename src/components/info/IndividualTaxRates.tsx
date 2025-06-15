
import React from "react";
import { Users } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface IndividualTaxRatesProps {
  selectedYear: string;
}

const fetchIndividualTaxRates = async (year: string) => {
  const { data, error } = await supabase
    .from("individual_tax_rates")
    .select("*")
    .eq("year", year)
    .order("chargeable_income", { ascending: true });
  if (error) throw error;
  return data;
};

const IndividualTaxRates: React.FC<IndividualTaxRatesProps> = ({ selectedYear }) => {
  const { data: taxRates, isLoading, error } = useQuery({
    queryKey: ["individual-tax-rates", selectedYear],
    queryFn: () => fetchIndividualTaxRates(selectedYear),
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
        {isLoading ? (
          <div className="p-8 text-center text-blue-500">Loading tax rates…</div>
        ) : error ? (
          <div className="p-8 text-center text-red-500">Failed to load tax rates.</div>
        ) : (
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
              {taxRates && taxRates.length > 0 ? (
                taxRates.map((rate: any, index: number) => (
                  <TableRow key={rate.id || index}>
                    <TableCell className="font-medium">{rate.category}</TableCell>
                    <TableCell>{rate.chargeable_income}</TableCell>
                    <TableCell>{rate.bracket_type}</TableCell>
                    <TableCell>{rate.calculation}</TableCell>
                    <TableCell>{rate.rate}</TableCell>
                    <TableCell>{rate.tax_rm}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    No tax rates found for {selectedYear}.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default IndividualTaxRates;
