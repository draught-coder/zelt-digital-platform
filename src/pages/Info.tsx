// Refactored Info Page – loads new extracted components
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InfoHero from "@/components/info/InfoHero";
import IndividualTaxRates from "@/components/info/IndividualTaxRates";
import CorporateTaxRates from "@/components/info/CorporateTaxRates";
import TaxReliefCards from "@/components/info/TaxReliefCards";
import InfoContactCTA from "@/components/info/InfoContactCTA";

const Info = () => {
  const [selectedYear, setSelectedYear] = useState("2024");
  // Update: show years from 2025 down to 2019 (so latest at top)
  const years = ["2025", "2024", "2023", "2022", "2021", "2020", "2019"];

  return (
    <div className="min-h-screen bg-white">
      <InfoHero selectedYear={selectedYear} setSelectedYear={setSelectedYear} years={years} />

      {/* Tax Information Tabs */}
      <section className="py-20 bg-gray-50 relative">
        <div className="container mx-auto px-4 relative z-10">
          <Tabs defaultValue="individual" className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="individual" className="flex items-center gap-2">
                {/* Avoid redundant icon import, handled by component */}
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
