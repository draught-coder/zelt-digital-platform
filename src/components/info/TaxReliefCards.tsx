
import React from "react";
import { Receipt } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const fetchTaxReliefs = async () => {
  const { data, error } = await supabase
    .from("tax_reliefs")
    .select("*")
    .order("year", { ascending: false });
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

const TaxReliefCards: React.FC = () => {
  const { data: reliefs, isLoading, error } = useQuery({
    queryKey: ["tax-reliefs-all"],
    queryFn: fetchTaxReliefs,
  });

  const grouped = reliefs ? groupByYear(reliefs) : {};

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <Receipt className="w-8 h-8 text-blue-600" />
        <h2 className="text-3xl font-bold text-gray-900">Individual Tax Relief</h2>
      </div>
      <p className="text-gray-600 mb-8">
        Available tax reliefs for Malaysian resident individuals, for all available assessment years.
      </p>

      <div className="grid gap-12">
        {isLoading ? (
          <div className="p-8 text-center text-blue-500">Loading tax relief data…</div>
        ) : error ? (
          <div className="p-8 text-center text-red-500">Failed to load tax reliefs.</div>
        ) : reliefs && Object.keys(grouped).length > 0 ? (
          Object.keys(grouped).sort((a, b) => Number(b) - Number(a)).map((year) => (
            <div key={year}>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  Assessment Year {year}
                </span>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {grouped[year].map((relief, index) => (
                  <div key={relief.id || index} className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{relief.category}</h3>
                    <div className="text-xl font-bold text-green-600 mb-2">{relief.amount}</div>
                    <p className="text-gray-600 text-sm">{relief.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center text-gray-500">No tax reliefs found.</div>
        )}
      </div>

      <div className="mt-8 p-6 bg-green-50 rounded-xl border border-green-200">
        <h3 className="text-lg font-semibold text-green-900 mb-2">Maximize Your Tax Savings:</h3>
        <ul className="text-green-800 space-y-1">
          <li>• Keep all receipts and documentation for claimed reliefs</li>
          <li>• Combine reliefs to maximize your total deduction</li>
          <li>• Consult our tax experts for personalized tax planning strategies</li>
        </ul>
      </div>
    </div>
  );
};

export default TaxReliefCards;
