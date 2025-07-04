import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import clsx from "clsx";

type Props = {
  title: string;
  value: string;
  subtitle?: string;
  info?: string;
  icon: LucideIcon;
  iconColor?: string;
  borderColor?: string;
};

export function KpiCard({
  title,
  value,
  subtitle,
  info,
  icon: Icon,
  iconColor = "text-green-600",
  borderColor = "border-gray-200",
}: Props) {
  return (
    <Card className={clsx("shadow-sm", borderColor && `border ${borderColor}`)}>
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-700">
          {title}
        </CardTitle>
        <Icon className={clsx("h-5 w-5", iconColor)} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900">{value}</div>
        {subtitle && (
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        )}
        {info && <p className="text-sm mt-1 text-green-600">{info}</p>}
      </CardContent>
    </Card>
  );
}
