
import React, { useState } from 'react';
import { Calculator, Building2, Receipt, Users, Calendar } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Info = () => {
  const [selectedYear, setSelectedYear] = useState("2024");

  const years = ["2024", "2023", "2022", "2021"];

  const individualTaxRates = [
    { income: "First RM5,000", rate: "0%", tax: "0" },
    { income: "Next RM15,000 (RM5,001 - RM20,000)", rate: "1%", tax: "150" },
    { income: "Next RM15,000 (RM20,001 - RM35,000)", rate: "3%", tax: "450" },
    { income: "Next RM15,000 (RM35,001 - RM50,000)", rate: "8%", tax: "1,200" },
    { income: "Next RM20,000 (RM50,001 - RM70,000)", rate: "13%", tax: "2,600" },
    { income: "Next RM30,000 (RM70,001 - RM100,000)", rate: "21%", tax: "6,300" },
    { income: "Next RM150,000 (RM100,001 - RM250,000)", rate: "24%", tax: "36,000" },
    { income: "Next RM150,000 (RM250,001 - RM400,000)", rate: "24.5%", tax: "36,750" },
    { income: "Next RM200,000 (RM400,001 - RM600,000)", rate: "25%", tax: "50,000" },
    { income: "Next RM400,000 (RM600,001 - RM1,000,000)", rate: "26%", tax: "104,000" },
    { income: "Exceeding RM1,000,000", rate: "30%", tax: "-" }
  ];

  const corporateTaxRates = [
    { category: "Resident Company", rate: "24%", description: "Standard corporate income tax rate" },
    { category: "Small and Medium Company (Paid-up capital ≤ RM2.5 million)", rate: "17% on first RM600,000, 24% on excess", description: "Reduced rate for qualifying SMEs" },
    { category: "Petroleum Company", rate: "38%", description: "Special rate for petroleum operations" },
    { category: "Non-Resident Company", rate: "24%", description: "Same rate as resident companies" }
  ];

  const taxReliefs = [
    { category: "Self", amount: "RM9,000", description: "Basic personal relief" },
    { category: "Spouse", amount: "RM4,000", description: "Relief for spouse without income" },
    { category: "Child Relief", amount: "Up to RM12,000", description: "RM2,000 per child (max 6 children)" },
    { category: "Education Fees", amount: "RM8,000", description: "Self, spouse or child education" },
    { category: "Medical Expenses", amount: "RM8,000", description: "Parents' medical expenses" },
    { category: "Life Insurance", amount: "RM3,000", description: "Life insurance premiums" },
    { category: "EPF", amount: "RM4,000", description: "Additional voluntary EPF contributions" },
    { category: "Private Retirement Scheme", amount: "RM3,000", description: "PRS contributions" },
    { category: "Books/Journals", amount: "RM1,000", description: "Purchase of books, journals, magazines" },
    { category: "Computer/Smartphone", amount: "RM2,500", description: "Personal computer or smartphone (once every 3 years)" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-white via-blue-50 to-white py-20 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Malaysian Tax
              <span className="bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent block">
                Information Hub
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Complete guide to Malaysian tax rates and reliefs for individuals and corporations
            </p>
            
            {/* Year Selector */}
            <div className="flex items-center justify-center gap-4 bg-white p-6 rounded-2xl shadow-lg max-w-md mx-auto">
              <Calendar className="w-5 h-5 text-blue-600" />
              <span className="text-gray-700 font-medium">Assessment Year:</span>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-32 bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
                  {years.map((year) => (
                    <SelectItem key={year} value={year} className="hover:bg-gray-100">
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Tax Information Tabs */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="individual" className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="individual" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Individual Tax
              </TabsTrigger>
              <TabsTrigger value="corporate" className="flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                Corporate Tax
              </TabsTrigger>
              <TabsTrigger value="relief" className="flex items-center gap-2">
                <Receipt className="w-4 h-4" />
                Tax Relief
              </TabsTrigger>
            </TabsList>

            <TabsContent value="individual" className="space-y-6">
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
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Chargeable Income</TableHead>
                        <TableHead>Tax Rate</TableHead>
                        <TableHead>Tax Amount (RM)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {individualTaxRates.map((rate, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{rate.income}</TableCell>
                          <TableCell>{rate.rate}</TableCell>
                          <TableCell>{rate.tax}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="corporate" className="space-y-6">
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
            </TabsContent>

            <TabsContent value="relief" className="space-y-6">
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <Receipt className="w-8 h-8 text-blue-600" />
                  <h2 className="text-3xl font-bold text-gray-900">Individual Tax Relief</h2>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    Assessment Year {selectedYear}
                  </span>
                </div>
                <p className="text-gray-600 mb-8">Available tax reliefs for Malaysian resident individuals</p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {taxReliefs.map((relief, index) => (
                    <div key={index} className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{relief.category}</h3>
                      <div className="text-xl font-bold text-green-600 mb-2">{relief.amount}</div>
                      <p className="text-gray-600 text-sm">{relief.description}</p>
                    </div>
                  ))}
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
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-white shadow-inner">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Need Professional Tax Guidance?</h2>
          <p className="text-xl text-gray-600 mb-8">Our certified tax experts can help you optimize your tax strategy</p>
          <button className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-8 py-4 rounded-full text-lg font-medium hover:from-blue-600 hover:to-blue-800 transition-all duration-200 transform hover:scale-105 shadow-lg">
            Schedule Tax Consultation
          </button>
        </div>
      </section>
    </div>
  );
};

export default Info;
