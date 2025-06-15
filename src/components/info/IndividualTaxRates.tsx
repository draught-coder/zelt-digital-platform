
import React from "react";
import { Users } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const fetchIndividualTaxRates = async () => {
  const { data, error } = await supabase
    .from("individual_tax_rates")
    .select("*")
    .order("year", { ascending: false })
    .order("chargeable_income", { ascending: true });
  if (error) throw error;
  return data;
};

const groupByYear = (arr: any[]) => {
  const group: Record<string, any[]> = {};
  arr.forEach((item) => {
    if (!group[item.year]) group[item.year] = [];
    group[item.year].push(item);
  });
  return group;
};

const IndividualTaxRates: React.FC = () => {
  const { data: taxRates, isLoading, error } = useQuery({
    queryKey: ["individual-tax-rates-all"],
    queryFn: fetchIndividualTaxRates,
  });

  const grouped = taxRates ? groupByYear(taxRates) : {};

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <Users className="w-8 h-8 text-blue-600" />
        <h2 className="text-3xl font-bold text-gray-900">Individual Income Tax Rates</h2>
      </div>
      <p className="text-gray-600 mb-8">
        Progressive tax rates for Malaysian resident individuals, for all available assessment years.
      </p>
      <div className="overflow-x-auto space-y-12">
        {isLoading ? (
          <div className="p-8 text-center text-blue-500">Loading tax rates…</div>
        ) : error ? (
          <div className="p-8 text-center text-red-500">Failed to load tax rates.</div>
        ) : (
          taxRates && Object.keys(grouped).length > 0 ? (
            Object.keys(grouped).sort((a, b) => Number(b) - Number(a)).map((year) => (
              <div key={year}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    Assessment Year {year}
                  </span>
                </div>
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
                    {grouped[year].map((rate: any, index: number) => (
                      <TableRow key={rate.id || index}>
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
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-gray-500">No tax rates found.</div>
          )
        )}
      </div>
      {/* Debug: Show raw taxRates array as JSON if data is loaded */}
      {taxRates && taxRates.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">Raw Tax Rates Array (Debug)</h3>
          <pre className="bg-gray-100 max-w-full overflow-x-auto rounded p-4 text-xs text-gray-700">
            {JSON.stringify(taxRates, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default IndividualTaxRates;
