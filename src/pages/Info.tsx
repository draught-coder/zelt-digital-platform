import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InfoHero from "@/components/info/InfoHero";
import IndividualTaxRates from "@/components/info/IndividualTaxRates";
import CorporateTaxRates from "@/components/info/CorporateTaxRates";
import TaxReliefCards from "@/components/info/TaxReliefCards";
import InfoContactCTA from "@/components/info/InfoContactCTA";
import { supabase } from "@/integrations/supabase/client";

const Info = () => {
  const [years, setYears] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [fetchError, setFetchError] = useState<string | null>(null);

  // Fetch available years dynamically from Supabase
  useEffect(() => {
    const fetchYears = async () => {
      const { data, error } = await supabase
        .from('individual_tax_rates')
        .select('year')
        .order('year', { ascending: false });

      if (error) {
        setFetchError("Failed to fetch years from Supabase. Please ensure the tax tables exist.");
        console.error("Error fetching years:", error);
        setYears([]);
        setSelectedYear("");
        return;
      }
      
      if (data) {
        // Get unique years as strings
        const uniqueYears = Array.from(
          new Set(data.map((row) => String(row.year)))
        );
        setYears(uniqueYears);
        
        // Set the most recent year as the default
        if (uniqueYears.length > 0) {
          setSelectedYear(uniqueYears[0]);
        } else {
            setFetchError("No assessment years found in the database.");
            setSelectedYear("");
        }
        setFetchError(null);
      } else {
        setFetchError("No data returned from database.");
        setYears([]);
        setSelectedYear("");
      }
    };
    fetchYears();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <InfoHero selectedYear={selectedYear} setSelectedYear={setSelectedYear} years={years} />

      <section className="py-20 bg-gray-50 relative">
        <div className="container mx-auto px-4 relative z-10">
          {fetchError && (
            <div className="mb-8 max-w-xl mx-auto rounded-lg bg-red-100 text-red-800 p-4 border border-red-200 text-center font-semibold">
              {fetchError}
            </div>
          )}
          <Tabs defaultValue="individual" className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="individual">
                Individual Tax
              </TabsTrigger>
              <TabsTrigger value="corporate">
                Corporate Tax
              </TabsTrigger>
              <TabsTrigger value="relief">
                Tax Relief
              </TabsTrigger>
            </TabsList>
            <TabsContent value="individual">
              <IndividualTaxRates selectedYear={selectedYear} />
            </TabsContent>
            <TabsContent value="corporate">
              <CorporateTaxRates selectedYear={selectedYear} />
            </TabsContent>
            <TabsContent value="relief">
              <TaxReliefCards selectedYear={selectedYear} />
            </TabsContent>
          </Tabs>
        </div>
      </section>
      <InfoContactCTA />
    </div>
  );
};
export default Info;

