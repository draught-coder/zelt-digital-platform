
import React from "react";
import { Users } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Updated interface and sample data to use chargeable_income and all specified columns.
interface IndividualTaxRatesProps {
  selectedYear: string;
}
// Updated sample data, assuming the backend and future dynamic fetching will match this structure.
const individualTaxRates = [
  {
    category: "Resident Individual",
    chargeable_income: "First RM5,000",
    bracket_type: "First",
    calculation: "",
    rate: "0%",
    tax_rm: "0",
  },
  {
    category: "Resident Individual",
    chargeable_income: "Next RM15,000 (RM5,001 - RM20,000)",
    bracket_type: "Next",
    calculation: "",
    rate: "1%",
    tax_rm: "150",
  },
  {
    category: "Resident Individual",
    chargeable_income: "Next RM15,000 (RM20,001 - RM35,000)",
    bracket_type: "Next",
    calculation: "",
    rate: "3%",
    tax_rm: "450",
  },
  {
    category: "Resident Individual",
    chargeable_income: "Next RM15,000 (RM35,001 - RM50,000)",
    bracket_type: "Next",
    calculation: "",
    rate: "8%",
    tax_rm: "1,200",
  },
  {
    category: "Resident Individual",
    chargeable_income: "Next RM20,000 (RM50,001 - RM70,000)",
    bracket_type: "Next",
    calculation: "",
    rate: "13%",
    tax_rm: "2,600",
  },
  {
    category: "Resident Individual",
    chargeable_income: "Next RM30,000 (RM70,001 - RM100,000)",
    bracket_type: "Next",
    calculation: "",
    rate: "21%",
    tax_rm: "6,300",
  },
  {
    category: "Resident Individual",
    chargeable_income: "Next RM150,000 (RM100,001 - RM250,000)",
    bracket_type: "Next",
    calculation: "",
    rate: "24%",
    tax_rm: "36,000",
  },
  {
    category: "Resident Individual",
    chargeable_income: "Next RM150,000 (RM250,001 - RM400,000)",
    bracket_type: "Next",
    calculation: "",
    rate: "24.5%",
    tax_rm: "36,750",
  },
  {
    category: "Resident Individual",
    chargeable_income: "Next RM200,000 (RM400,001 - RM600,000)",
    bracket_type: "Next",
    calculation: "",
    rate: "25%",
    tax_rm: "50,000",
  },
  {
    category: "Resident Individual",
    chargeable_income: "Next RM400,000 (RM600,001 - RM1,000,000)",
    bracket_type: "Next",
    calculation: "",
    rate: "26%",
    tax_rm: "104,000",
  },
  {
    category: "Resident Individual",
    chargeable_income: "Exceeding RM1,000,000",
    bracket_type: "Next",
    calculation: "",
    rate: "30%",
    tax_rm: "-",
  },
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
            <TableHead>Category</TableHead>
            <TableHead>Chargeable Income</TableHead>
            <TableHead>Bracket Type</TableHead>
            <TableHead>Calculation</TableHead>
            <TableHead>Tax Rate</TableHead>
            <TableHead>Tax (RM)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {individualTaxRates.map((rate, index) => (
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
    </div>
  </div>
);

export default IndividualTaxRates;
