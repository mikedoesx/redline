"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

const chartData = [
  { month: "Jan", cost: 45000 },
  { month: "Feb", cost: 52000 },
  { month: "Mar", cost: 48000 },
  { month: "Apr", cost: 61000 },
  { month: "May", cost: 55000 },
  { month: "Jun", cost: 67000 },
]

const chartConfig = {
  cost: {
    label: "Labor Cost",
    color: "hsl(var(--chart-1))",
  },
}

export function LaborChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Labor Costs</CardTitle>
        <CardDescription>Monthly labor costs for fire watch operations</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="cost"
                stroke="var(--color-cost)"
                strokeWidth={2}
                dot={{ fill: "var(--color-cost)" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
