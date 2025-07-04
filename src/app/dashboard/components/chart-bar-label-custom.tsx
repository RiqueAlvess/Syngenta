"use client";

import { TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface ChartData {
  month: string;
  desktop: number;
  mobile: number;
}

interface ChartBarLabelCustomProps {
  title: string;
  description: string;
  data: ChartData[];
  dataKey: string;
  labelKey: string;
  footerText?: string;
  metaText?: string;
}

export function ChartBarLabelCustom({
  title,
  description,
  data,
  dataKey,
  labelKey,
  footerText,
  metaText,
}: ChartBarLabelCustomProps) {
  const chartConfig = {
    [dataKey]: {
      label: "Solicitados",
      color: "#3b82f6",
    },
    mobile: {
      label: "Entregues",
      color: "#22c55e",
    },
    label: {
      color: "var(--background)",
    },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ left: 80, right: 20 }}
            height={400}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey={labelKey}
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              width={70}
              tickFormatter={(value: string) => String(value).slice(0, 3)}
            />
            <XAxis dataKey={dataKey} type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar dataKey={dataKey} fill={`var(--color-${dataKey})`} radius={4}>
              <LabelList
                dataKey={labelKey}
                position="insideLeft"
                offset={8}
                className="fill-[--color-label]"
                fontSize={12}
              />
              <LabelList
                dataKey={dataKey}
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
            <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4}>
              <LabelList
                dataKey="mobile"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          {footerText} <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">{metaText}</div>
      </CardFooter>
    </Card>
  );
}
