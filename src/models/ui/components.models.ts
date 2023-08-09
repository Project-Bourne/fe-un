import { Dispatch, ReactNode } from "react";

export interface TabModel {
  tabHeaderContents: any[];
  tabBodyContents?: any[];
  tabIndex?: number;
}

export interface InputModel
  extends React.InputHTMLAttributes<HTMLInputElement> {
  isDisabled?: boolean;
  classNameStyle?: string;
}

export interface DropdownModel
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  data?: any[];
  selectItem?: any;
  className?: any;
  style?: any;
  isDisabled?: boolean;
}

export interface ButtonModel
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value?: any;
  background?: string;
  classNameStyle?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export interface CustomSwitchType
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  styles?: any;
  title: string;
  content: string;
}

export interface TabModel {
  tabHeaderContents: any[];
  tabBodyContents?: any[];
}

export interface CustomCollabDashboardCardModel {
  classes2?: string;
  layoutCount: number;
  children?: any; // Added children prop to include additional content
}

export interface CustomCardModal {
  imgSrc: any;
  imgSrc2?: any;
  mainText: number | string;
  mainText2?: number | string;
  subText: string;
  subText2?: string;
  classes?: string;
  classes2?: string;
  children?: ReactNode;
  layoutCount: number;
}
