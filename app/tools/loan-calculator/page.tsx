"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Home, DollarSign, TrendingUp, Calendar } from "lucide-react";
import { calculatorAPI } from "@/lib/api";
import { Container } from "@/components/layout/container";

export default function LoanCalculatorPage() {
  const [formData, setFormData] = useState({
    propertyValue: "",
    downPayment: "",
    downPaymentType: "percentage" as "amount" | "percentage",
    interestRate: "",
    loanTenure: "",
    loanType: "fixed" as "fixed" | "floating",
  });

  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCalculate = async () => {
    if (!formData.propertyValue || !formData.downPayment || !formData.interestRate || !formData.loanTenure) {
      alert("Please fill all required fields");
      return;
    }

    setLoading(true);
    try {
      const response = await calculatorAPI.calculateHomeLoan({
        propertyValue: parseFloat(formData.propertyValue),
        downPayment: parseFloat(formData.downPayment),
        downPaymentType: formData.downPaymentType,
        interestRate: parseFloat(formData.interestRate),
        loanTenure: parseInt(formData.loanTenure),
        loanType: formData.loanType,
      });

      setResult(response.data.data.calculation);
    } catch (error: any) {
      console.error("Calculation error:", error);
      alert(error.response?.data?.message || "Failed to calculate loan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-8 sm:py-12">
      <Container>
        <AnimatedSection variant="slideUp" className="mb-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <Home className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#111111] mb-2">
              Home Loan Calculator
            </h1>
            <p className="text-[#3A3C40] text-sm sm:text-base">
              Calculate your monthly EMI and loan details
            </p>
          </div>
        </AnimatedSection>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Input Form */}
          <AnimatedSection variant="slideUp">
            <Card className="bg-white border-[#E7EAEF]">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-[#111111]">
                  Loan Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="propertyValue">Property Value (PKR)</Label>
                  <Input
                    id="propertyValue"
                    type="number"
                    placeholder="Enter property value"
                    value={formData.propertyValue}
                    onChange={(e) => handleChange("propertyValue", e.target.value)}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="downPayment">Down Payment</Label>
                    <Input
                      id="downPayment"
                      type="number"
                      placeholder="Enter amount"
                      value={formData.downPayment}
                      onChange={(e) => handleChange("downPayment", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="downPaymentType">Type</Label>
                    <select
                      id="downPaymentType"
                      className="w-full px-3 py-2 border border-[#E7EAEF] rounded-lg bg-white"
                      value={formData.downPaymentType}
                      onChange={(e) =>
                        handleChange("downPaymentType", e.target.value as "amount" | "percentage")
                      }
                    >
                      <option value="percentage">Percentage (%)</option>
                      <option value="amount">Amount (PKR)</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="interestRate">Interest Rate (% per annum)</Label>
                    <Input
                      id="interestRate"
                      type="number"
                      step="0.1"
                      placeholder="e.g., 12.5"
                      value={formData.interestRate}
                      onChange={(e) => handleChange("interestRate", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="loanTenure">Loan Tenure (Years)</Label>
                    <Input
                      id="loanTenure"
                      type="number"
                      placeholder="e.g., 20"
                      value={formData.loanTenure}
                      onChange={(e) => handleChange("loanTenure", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="loanType">Loan Type</Label>
                  <select
                    id="loanType"
                    className="w-full px-3 py-2 border border-[#E7EAEF] rounded-lg bg-white"
                    value={formData.loanType}
                    onChange={(e) =>
                      handleChange("loanType", e.target.value as "fixed" | "floating")
                    }
                  >
                    <option value="fixed">Fixed Rate</option>
                    <option value="floating">Floating Rate</option>
                  </select>
                </div>

                <Button
                  onClick={handleCalculate}
                  disabled={loading}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  {loading ? "Calculating..." : "Calculate EMI"}
                </Button>
              </CardContent>
            </Card>
          </AnimatedSection>

          {/* Results */}
          <AnimatedSection variant="slideUp">
            {result ? (
              <Card className="bg-white border-[#E7EAEF]">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-[#111111]">
                    Loan Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-6 bg-gradient-to-br from-green-600 to-green-700 rounded-xl text-white">
                    <p className="text-sm opacity-90 mb-2">Monthly EMI</p>
                    <p className="text-4xl font-bold">
                      PKR {result.emi.monthly.toLocaleString()}
                    </p>
                    <p className="text-sm opacity-75 mt-2">
                      Yearly: PKR {result.emi.yearly.toLocaleString()}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-semibold text-[#111111]">Loan Details</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-[#3A3C40]">Property Value</span>
                        <span className="font-semibold">
                          PKR {result.propertyValue.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#3A3C40]">Down Payment</span>
                        <span className="font-semibold">
                          PKR {result.downPayment.amount.toLocaleString()} ({result.downPayment.percentage.toFixed(1)}%)
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#3A3C40]">Loan Amount</span>
                        <span className="font-semibold">
                          PKR {result.loanAmount.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#3A3C40]">Interest Rate</span>
                        <span className="font-semibold">{result.interestRate.annual}% p.a.</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#3A3C40]">Tenure</span>
                        <span className="font-semibold">{result.tenure.years} years</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span className="text-[#3A3C40]">Total Interest</span>
                      <span className="font-semibold text-red-600">
                        PKR {result.totalPayable.interest.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-blue-200">
                      <span className="text-[#3A3C40] font-semibold">Total Payable</span>
                      <span className="font-bold text-[#111111]">
                        PKR {result.totalPayable.total.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <p className="text-sm text-[#3A3C40] mb-1">
                      <strong>Minimum Monthly Income Required:</strong>
                    </p>
                    <p className="text-lg font-semibold text-[#111111]">
                      PKR {result.eligibility.minMonthlyIncome.toLocaleString()}
                    </p>
                  </div>

                  {result.paymentSchedule && result.paymentSchedule.length > 0 && (
                    <div className="space-y-2">
                      <h3 className="font-semibold text-[#111111]">Payment Schedule (First 12 Months)</h3>
                      <div className="max-h-64 overflow-y-auto">
                        <table className="w-full text-sm">
                          <thead className="bg-[#FAFAFA]">
                            <tr>
                              <th className="px-2 py-2 text-left">Month</th>
                              <th className="px-2 py-2 text-right">Principal</th>
                              <th className="px-2 py-2 text-right">Interest</th>
                              <th className="px-2 py-2 text-right">Balance</th>
                            </tr>
                          </thead>
                          <tbody>
                            {result.paymentSchedule.map((payment: any, index: number) => (
                              <tr key={index} className="border-t border-[#E7EAEF]">
                                <td className="px-2 py-2">{payment.month}</td>
                                <td className="px-2 py-2 text-right">
                                  {payment.principal.toLocaleString()}
                                </td>
                                <td className="px-2 py-2 text-right">
                                  {payment.interest.toLocaleString()}
                                </td>
                                <td className="px-2 py-2 text-right">
                                  {payment.remainingBalance.toLocaleString()}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-white border-[#E7EAEF]">
                <CardContent className="p-12 text-center">
                  <DollarSign className="w-16 h-16 text-[#E7EAEF] mx-auto mb-4" />
                  <p className="text-[#3A3C40]">Enter loan details and click calculate</p>
                </CardContent>
              </Card>
            )}
          </AnimatedSection>
        </div>
      </Container>
    </div>
  );
}

