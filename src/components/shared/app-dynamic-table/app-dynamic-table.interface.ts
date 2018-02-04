export enum ColumnTypes {
  INDEX = 'index',
  TEXT = 'text',
  ICONS = 'icons',
  BUTTONS = 'buttons',
  RICH_TEXT = 'richText'
}

export enum ColumnAlign {
  LEFT = 'left',
  CENTER = 'center',
  RIGHT = 'right'
}

export interface ColumnData {
  id: string;
  type?: ColumnTypes;
  label?: string;
  dataKey: string;
  width?: string;
  align?: ColumnAlign.LEFT | ColumnAlign.CENTER | ColumnAlign.RIGHT;
  className?: string;
  itemClassName?: string;
}

export interface ButtonData {
  id: string | number;
  value: string | number;
  icon: string;
  iconClassName?: string;
  className?: string;
  onClick?: (value?: string | number) => void;
  onMouseEnter?: (value?: string | number) => void;
  onMouseLeave?: (value?: string | number) => void;
  disabled?: boolean;
}

export interface IconData {
  id: string | number;
  value: string | number;
  icon: string;
  className?: string;
  onClick?: (value?: string | number) => void;
  onMouseEnter?: (value?: string | number) => void;
  onMouseLeave?: (value?: string | number) => void;
}

export interface IndexData {
  className?: string;
  onClick?: (evt: UIEvent) => void;
  onMouseEnter?: (evt: UIEvent) => void;
  onMouseLeave?: (evt: UIEvent) => void;
}

export interface RichData {

}
