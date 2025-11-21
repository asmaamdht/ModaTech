export interface CounterProps {
  min?: number;
  max?: number;
  step?: number;
  value: number;
  onValueChange?: (val: number) => void;
  width?: number;
  height?: number;
}