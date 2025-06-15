
import React from "react";
import { Building2 } from "lucide-react";

interface CorporateTaxRatesProps {
  selectedYear: string;
}
const corporateTaxRates = [
  { category: "Resident Company", rate: "24%", description: "Standard corporate income tax rate" },
  { category: "Small and Medium Company (Paid-up capital ≤ RM2.5 million)", rate: "17% on first RM600,000, 24% on excess", description: "Reduced rate for qualifying SMEs" },
  { category: "Petroleum Company", rate: "38%", description: "Special rate for petroleum operations" },
  { category: "Non-Resident Company", rate: "24%", description: "Same rate as resident companies" }
];

const CorporateTaxRates: React.FC<CorporateTaxRatesProps> = ({ selectedYear }) => (
  <div className="bg-white p-8 rounded-2xl shadow-lg">
    <div className="flex items-center gap-3 mb-6">
      <Building2 className="w-8 h-8 text-blue-600" />
      <h2 className="text-3xl font-bold text-gray-900">Corporate Income Tax Rates</h2>
      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
        Assessment Year {selectedYear}
      </span>
    </div>
    <p className="text-gray-600 mb-8">Corporate tax rates for Malaysian companies</p>

    <div className="grid gap-6">
      {corporateTaxRates.map((rate, index) => (
        <div key={index} className="bg-gray-50 p-6 rounded-xl border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{rate.category}</h3>
          <div className="text-2xl font-bold text-blue-600 mb-2">{rate.rate}</div>
          <p className="text-gray-600">{rate.description}</p>
        </div>
      ))}
    </div>

    <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
      <h3 className="text-lg font-semibold text-blue-900 mb-2">Important Notes:</h3>
      <ul className="text-blue-800 space-y-1">
        <li>• Tax rates are applicable for Assessment Year {selectedYear}</li>
        <li>• SME rate applies to companies with paid-up capital not exceeding RM2.5 million</li>
        <li>• All companies must submit their tax returns within 7 months after accounting period end</li>
      </ul>
    </div>
  </div>
);

export default CorporateTaxRates;
