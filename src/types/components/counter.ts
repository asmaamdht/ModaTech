export interface CounterProps {
  min?: number;
  max?: number;
  step?: number;
  initialValue?: number;
  onValueChange?: (val: number) => void;
  width?: number;
  height?: number;
}