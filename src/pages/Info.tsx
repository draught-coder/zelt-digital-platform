
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

  // Fetch available years dynamically from Supabase
  useEffect(() => {
    const fetchYears = async () => {
      const { data, error } = await supabase
        .from('individual_tax_rates')
        .select('year')
        .order('year', { ascending: false });

      if (!error && data) {
        // Get unique years as strings
        const uniqueYears = Array.from(
          new Set(data.map((row) => typeof row.year === 'string' ? row.year : String(row.year)))
        );
        setYears(uniqueYears);
        setSelectedYear(uniqueYears[0] ?? "");
      }
    };
    fetchYears();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <InfoHero selectedYear={selectedYear} setSelectedYear={setSelectedYear} years={years} />

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
    </div>
  );
};
export default Info;

