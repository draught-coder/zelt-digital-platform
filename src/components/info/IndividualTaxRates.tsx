import React from "react";
import { Users } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";

interface IndividualTaxRatesProps {
  selectedYear: string;
}

const fetchIndividualTaxRates = async (year: string) => {
  if (!year) return [];
  const { data, error } = await supabase
    .from("individual_tax_rates")
    .select("category,chargeable_income,bracket_type,calculation,rate,tax_rm")
    .eq("year", year)
    .order("category", { ascending: true })
    .order("chargeable_income", { ascending: true });
  if (error) throw new Error(error.message);
  return data;
};

const IndividualTaxRates: React.FC<IndividualTaxRatesProps> = ({ selectedYear }) => {
  const {
    data: taxRates,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["individual-tax-rates", selectedYear],
    queryFn: () => fetchIndividualTaxRates(selectedYear),
    enabled: !!selectedYear,
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
          <div className="text-blue-600 text-center py-8">Loading tax rates...</div>
        ) : isError ? (
          <div className="text-red-600 font-semibold text-center py-8">Error: {(error as Error)?.message}</div>
        ) : taxRates && taxRates.length === 0 ? (
          <div className="text-yellow-700 font-semibold text-center py-8">
            No tax rates found for Assessment Year {selectedYear}
          </div>
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
              {taxRates?.map((rate, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{rate.category}</TableCell>
                  <TableCell>{rate.chargeable_income}</TableCell>
                  <TableCell>{rate.bracket_type}</TableCell>
                  <TableCell>{rate.calculation}</TableCell>
                  <TableCell>{rate.rate}</TableCell>
                  <TableCell>{rate.tax_rm}</TableCell>
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
