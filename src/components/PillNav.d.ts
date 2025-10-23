import { MouseEventHandler } from "react";

interface NavItem {
  label: string;
  ariaLabel?: string;
  href: string;
}

interface PillNavProps {
  logo: string;
  logoAlt?: string;
  items: NavItem[];
  activeHref?: string;
  className?: string;
  ease?: string;
  baseColor?: string;
  pillColor?: string;
  hoveredPillTextColor?: string;
  pillTextColor?: string;
  onMobileMenuClick?: MouseEventHandler<HTMLButtonElement>;
  initialLoadAnimation?: boolean;
}

declare const PillNav: React.FC<PillNavProps>;

export default PillNav;
