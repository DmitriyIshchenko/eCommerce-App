import { ColorSwatch, makeStyles, SwatchPicker } from '@fluentui/react-components';
import StyledTooltip from '../tooltips/styled';

const useClasses = makeStyles({
  picker: {
    flexWrap: 'wrap',
    maxWidth: '140px',
    gap: '8px',
  },
});

export default function LargeSwatchPicker({
  colors,
  onChange,
  value,
  defaultValue,
}: {
  colors: { color: string; value: string; 'aria-label': string }[];
  onChange?: (value: string | null) => void;
  value?: string;
  defaultValue?: string;
}) {
  const classes = useClasses();
  return (
    <SwatchPicker
      aria-label="SwatchPicker large size"
      size="large"
      selectedValue={value}
      defaultSelectedValue={defaultValue}
      onSelectionChange={(_, d) => {
        const v = d.selectedValue === value ? null : d.selectedValue;
        if (onChange) onChange(v);
      }}
      className={classes.picker}
    >
      {colors.map((color) => {
        return (
          <StyledTooltip contentChildren={color['aria-label']} key={color.value}>
            <ColorSwatch {...color} style={{ width: 40, height: 40 }} />
          </StyledTooltip>
        );
      })}
    </SwatchPicker>
  );
}
