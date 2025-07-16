import { ForwardRefExoticComponent, ReactNode, RefAttributes } from "react";
import { LucideProps, Shield } from "lucide-react";

export const HomeListItem = ({
  Icon,
  iconBackgroundColor,
  iconColor,
  titleTextColor,
  descriptionTextColor,
  titleText,
  descriptionText,
}: {
  titleText: string | ReactNode;
  descriptionText: string | ReactNode;
  iconBackgroundColor?: string;
  iconColor?: string;
  titleTextColor?: string;
  descriptionTextColor?: string;
  Icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
}) => {
  return (
    <div className="flex items-center gap-4">
      <div className={`p-3 ${iconBackgroundColor ?? "bg-primary"} rounded-lg`}>
        <Icon className={`h-5 w-5 ${iconColor ?? "text-white"}`} />
      </div>
      <div>
        <h3 className={`font-bold ${titleTextColor ?? "text-foreground"}`}>
          {titleText}
        </h3>
        <p className={descriptionTextColor ?? "text-muted-foreground"}>
          {descriptionText}
        </p>
      </div>
    </div>
  );
};
