import { LucideIcon } from "lucide-react";
import clsx from "clsx";
import { Watermark } from "@/components/ui/watermark";

type Props = {
  title: string;
  value: string | number;
  subtitle?: string;
  info?: string;
  icon: LucideIcon;
  iconColor?: string;
  borderColor?: string;
  status?: 'success' | 'warning' | 'danger';
  target?: number;
  unit?: string;
};

export function KpiCard({
  title,
  value,
  subtitle,
  info,
  icon: Icon,
  iconColor = "text-green-600",
  borderColor = "border-gray-200",
  status = "success",
  target,
  unit,
}: Props) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'text-green-600';
      case 'warning':
        return 'text-yellow-600';
      case 'danger':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'danger':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className={clsx(
      "bg-white rounded-xl border shadow-sm relative overflow-hidden",
      getStatusBg(status)
    )}>
      <Watermark size="sm" position="bottom-right" />
      
      <div className="relative z-10 p-6">
        <div className="flex flex-row items-start justify-between space-y-0 pb-2">
          <h3 className="text-sm font-medium text-gray-700">
            {title}
          </h3>
          <Icon className={clsx("h-5 w-5", getStatusColor(status))} />
        </div>
        
        <div className="space-y-1">
          <div className="text-2xl font-bold text-gray-900">
            {typeof value === 'number' ? value.toLocaleString() : value}
            {unit && <span className="text-sm text-gray-500 ml-1">{unit}</span>}
          </div>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
          {info && <p className="text-sm mt-1 text-green-600">{info}</p>}
          {target && (
            <p className="text-xs text-gray-500">
              Meta: {target.toLocaleString()}{unit}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
