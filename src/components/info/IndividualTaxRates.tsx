
import React from "react";
import { Users } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface IndividualTaxRatesProps {
  selectedYear: string;
}
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

const IndividualTaxRates: React.FC<IndividualTaxRatesProps> = ({ selectedYear }) => (
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
);

export default IndividualTaxRates;
