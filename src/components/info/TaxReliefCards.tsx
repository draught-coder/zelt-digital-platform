
import React from "react";
import { Receipt } from "lucide-react";

interface TaxReliefCardsProps {
  selectedYear: string;
}
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

const TaxReliefCards: React.FC<TaxReliefCardsProps> = ({ selectedYear }) => (
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
);

export default TaxReliefCards;
