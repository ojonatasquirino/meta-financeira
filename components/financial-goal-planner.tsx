"use client";

import type React from "react";
import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Calculator, Clock, Target } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export function FinancialGoalPlanner() {
  const [goal, setGoal] = useState<string>("");
  const [monthlySavings, setMonthlySavings] = useState<string>("");
  const [result, setResult] = useState<{
    months: number;
    years: number;
    chartData: { month: number; savings: number }[];
  } | null>(null);

  const parseCurrency = (value: string) => {
    const numeric = Number(value.replace(/\D/g, "")) / 100;
    return isNaN(numeric) ? 0 : numeric;
  };

  const calculateGoal = () => {
    const goalValue = parseCurrency(goal);
    const monthlyValue = parseCurrency(monthlySavings);

    if (!goalValue || goalValue <= 0) {
      ({
        title: "Valor da meta inválido",
        description:
          "Por favor, insira um valor válido para a sua meta financeira.",
        variant: "destructive",
      });
      return;
    }

    if (!monthlyValue || monthlyValue <= 0) {
      ({
        title: "Valor mensal inválido",
        description:
          "Por favor, insira um valor válido para sua economia mensal.",
        variant: "destructive",
      });
      return;
    }

    const months = Math.ceil(goalValue / monthlyValue);
    const years = months / 12;

    const chartData = [];
    let currentSavings = 0;

    for (let i = 0; i <= months; i++) {
      currentSavings = i * monthlyValue;
      if (currentSavings > goalValue) currentSavings = goalValue;

      chartData.push({
        month: i,
        savings: currentSavings,
      });
    }

    setResult({
      months,
      years,
      chartData,
    });
  };

  const formatCurrency = (value: string) => {
    const numericValue = value.replace(/\D/g, "");
    if (numericValue === "") return "";

    const formattedValue = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    }).format(Number(numericValue) / 100);

    return formattedValue;
  };

  const handleGoalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGoal(formatCurrency(e.target.value));
  };

  const handleMonthlySavingsChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMonthlySavings(formatCurrency(e.target.value));
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Meta
          </CardTitle>
          <CardDescription>
            Insira o valor da sua meta e quanto você pode economizar mensalmente
            para atingi-la.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="goal">Valor da Meta</Label>
              <Input
                id="goal"
                placeholder="R$ 10.000,00"
                value={goal}
                onChange={handleGoalChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="monthly">Economia Mensal</Label>
              <Input
                id="monthly"
                placeholder="R$ 500,00"
                value={monthlySavings}
                onChange={handleMonthlySavingsChange}
              />
            </div>
            <Button onClick={calculateGoal} className="w-full">
              <Calculator className="mr-2 h-4 w-4" />
              Calcular
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Resultado
          </CardTitle>
          <CardDescription>
            Veja quanto tempo levará para atingir sua meta!
          </CardDescription>
        </CardHeader>
        <CardContent>
          {result ? (
            <div className="grid gap-4">
              <div className="grid gap-1">
                <div className="text-sm font-medium text-muted-foreground">
                  Tempo necessário:
                </div>
                <div className="text-2xl font-bold">
                  {result.months} {result.months === 1 ? "mês" : "meses"}
                  {result.years >= 1 &&
                    ` (${result.years.toFixed(1)} ${
                      result.years === 1 ? "ano" : "anos"
                    })`}
                </div>
              </div>

              <div className="h-[250px] w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={result.chartData}
                    margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="month"
                      label={{
                        value: "Meses",
                        position: "insideBottomRight",
                        offset: -5,
                      }}
                    />
                    <YAxis
                      tickFormatter={(value) =>
                        new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                          notation: "compact",
                          compactDisplay: "short",
                        }).format(value)
                      }
                    />
                    <Tooltip
                      formatter={(value) =>
                        new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(Number(value))
                      }
                      labelFormatter={(label) => `Mês ${label}`}
                    />
                    <Line
                      type="monotone"
                      dataKey="savings"
                      stroke="#000000"
                      strokeWidth={2}
                      dot={{ r: 2 }}
                      activeDot={{ r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[250px] text-center text-muted-foreground">
              <Target className="h-12 w-12 mb-4 opacity-20" />
              <p>
                Preencha os campos com os valores e clique em calcular para ver
                o resultado.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
