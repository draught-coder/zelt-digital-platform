
// Refactored Info Page – loads new extracted components
import React, { useState, useEffect } from 'react';
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InfoHero from "@/components/info/InfoHero";
import IndividualTaxRates from "@/components/info/IndividualTaxRates";
import CorporateTaxRates from "@/components/info/CorporateTaxRates";
import TaxReliefCards from "@/components/info/TaxReliefCards";
import InfoContactCTA from "@/components/info/InfoContactCTA";

// Helper to fetch distinct years from Supabase
const fetchTaxYears = async () => {
  const { data, error } = await supabase
    .from("individual_tax_rates")
    .select("year")
    .order("year", { ascending: false });
  if (error) throw error;
  // Get unique years, sorted descending (latest first)
  const rawYears = (data || []).map(r => r.year);
  // Remove nulls and duplicates
  const years = Array.from(new Set(rawYears.filter(Boolean)));
  // Sort descending numerically (handle if there's any text value as well, fallback to string sort)
  years.sort((a, b) => {
    const numA = parseInt(a, 10), numB = parseInt(b, 10);
    if (!isNaN(numA) && !isNaN(numB)) return numB - numA;
    return String(b).localeCompare(String(a));
  });
  return years;
};

const Info = () => {
  // Load years from Supabase
  const { data: years, isLoading, error } = useQuery({
    queryKey: ["individual-tax-years"],
    queryFn: fetchTaxYears,
    staleTime: 60 * 60 * 1000, // one hour, since years rarely change
  });

  // Set selectedYear to latest available year
  const [selectedYear, setSelectedYear] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (years && years.length > 0) {
      setSelectedYear(prev => years.includes(prev as string) ? prev : years[0]);
    }
  }, [years]);

  return (
    <div className="min-h-screen bg-white">
      {/* Year selector handling loading/error/empty */}
      {isLoading && (
        <div className="w-full py-32 text-center text-lg text-blue-600 font-semibold">Loading available assessment years…</div>
      )}
      {error && (
        <div className="w-full py-32 text-center text-lg text-red-600 font-semibold">
          Error loading year options. Please try again later.
        </div>
      )}
      {/* If no years */}
      {!isLoading && !error && (!years || years.length === 0) && (
        <div className="w-full py-32 text-center text-lg text-gray-600 font-semibold">
          No assessment years available.
        </div>
      )}
      {/* Show page if we have year data */}
      {!isLoading && !error && years && years.length > 0 && selectedYear && (
        <>
          <InfoHero
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
            years={years}
          />

          {/* Tax Information Tabs */}
          <section className="py-20 bg-gray-50 relative">
            <div className="container mx-auto px-4 relative z-10">
              <Tabs defaultValue="individual" className="max-w-6xl mx-auto">
                <TabsList className="grid w-full grid-cols-3 mb-8">
                  <TabsTrigger value="individual" className="flex items-center gap-2">
                    Individual Tax
                  </TabsTrigger>
                  <TabsTrigger value="corporate" className="flex items-center gap-2">
                    Corporate Tax
                  </TabsTrigger>
                  <TabsTrigger value="relief" className="flex items-center gap-2">
                    Tax Relief
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="individual" className="space-y-6">
                  <IndividualTaxRates selectedYear={selectedYear} />
                </TabsContent>
                <TabsContent value="corporate" className="space-y-6">
                  <CorporateTaxRates selectedYear={selectedYear} />
                </TabsContent>
                <TabsContent value="relief" className="space-y-6">
                  <TaxReliefCards selectedYear={selectedYear} />
                </TabsContent>
              </Tabs>
            </div>
          </section>
          <InfoContactCTA />
        </>
      )}
    </div>
  );
};

export default Info;

