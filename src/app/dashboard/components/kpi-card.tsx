import { LucideIcon } from "lucide-react";
import clsx from "clsx";
import { Watermark } from "@/components/ui/watermark";

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
    <div className={clsx("bg-white rounded-xl border shadow-sm relative overflow-hidden", borderColor && `${borderColor}`)}>
      <Watermark size="sm" position="bottom-right" />
      
      <div className="relative z-10 p-6">
        <div className="flex flex-row items-start justify-between space-y-0 pb-2">
          <h3 className="text-sm font-medium text-gray-700">
            {title}
          </h3>
          <Icon className={clsx("h-5 w-5", iconColor)} />
        </div>
        
        <div className="space-y-1">
          <div className="text-2xl font-bold text-gray-900">{value}</div>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
          {info && <p className="text-sm mt-1 text-green-600">{info}</p>}
        </div>
      </div>
    </div>
  );
}
