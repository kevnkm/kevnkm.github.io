import { ReactNode } from "react";

export interface MagnetProps {
  children: ReactNode;
  padding?: number;
  disabled?: boolean;
  magnetStrength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  wrapperClassName?: string;
  innerClassName?: string;
  [key: string]: any; // For additional props
}

declare const Magnet: React.FC<MagnetProps>;

export default Magnet;
