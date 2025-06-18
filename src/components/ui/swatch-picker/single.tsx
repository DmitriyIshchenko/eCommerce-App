import { ColorSwatch, SwatchPicker } from '@fluentui/react-components';
import StyledTooltip from '../tooltips/styled';

export default function SingleSwatchPicker({
  color,
  onChange,
  value,
}: {
  color: { color: string; value: string; 'aria-label': string };
  onChange?: (value: string) => void;
  value?: string | number;
  isOn?: boolean;
}) {
  return (
    <SwatchPicker
      aria-label="SwatchPicker large size"
      size="large"
      selectedValue={(typeof value === 'string' && value) || ''}
      onSelectionChange={(_, d) => {
        if (onChange) onChange(d.selectedValue);
      }}
    >
      <StyledTooltip contentChildren={color['aria-label']} key={color.value}>
        <ColorSwatch {...color} />
      </StyledTooltip>
    </SwatchPicker>
  );
}
