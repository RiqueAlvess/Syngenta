import Image from "next/image";

interface WatermarkProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  position?: "center" | "bottom-right" | "top-right";
}

export function Watermark({ 
  className = "", 
  size = "md",
  position = "bottom-right" 
}: WatermarkProps) {
  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-20 h-20", 
    lg: "w-24 h-24"
  };

  const positionClasses = {
    center: "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
    "bottom-right": "bottom-4 right-4",
    "top-right": "top-4 right-4"
  };

  return (
    <div 
      className={`absolute z-0 opacity-5 pointer-events-none ${positionClasses[position]} ${className}`}
    >
      <Image
        src="/empresa.png"
        alt=""
        width={80}
        height={80}
        className={`${sizeClasses[size]} object-contain filter grayscale`}
        priority={false}
      />
    </div>
  );
}
