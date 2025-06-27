import {
  ImageSwatch,
  SwatchPicker,
  type SwatchPickerOnSelectEventHandler,
  makeStyles,
} from '@fluentui/react-components';
import type { SwatchImg } from '../../../lib/constants';
import StyledTooltip from '../tooltips/styled';

const useStyles = makeStyles({
  example: {
    width: '100%',
    height: '200px',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    margin: '4px 0',
  },
  swatch: {
    width: '40px',
    height: 'auto',
    aspectRatio: '1',
  },
  picker: {
    minWidth: '0',
    gap: '8px',
  },
});

export default function ImageSwatchPicker({
  value,
  images,
  onChange,
  ariaLabel,
}: {
  images?: SwatchImg[];
  onChange?: (value: string) => void;
  value?: string | number;
  ariaLabel?: string;
}) {
  const styles = useStyles();
  if (!images) return null;
  const handleSelect: SwatchPickerOnSelectEventHandler = (_, data) => {
    if (onChange) onChange(data.selectedValue);
  };

  return (
    <SwatchPicker
      aria-label={ariaLabel}
      selectedValue={(typeof value === 'string' && value) || ''}
      onSelectionChange={handleSelect}
      className={styles.picker}
    >
      {images.map((image) => (
        <StyledTooltip
          key={image.value}
          contentChildren={
            <div
              style={{
                display: 'grid',
                gridTemplateAreas: 'stack',
                justifyItems: 'end',
              }}
            >
              <img src={image.fullImageSrc} alt="" style={{ width: 214, gridArea: 'stack' }} />
              <p style={{ gridArea: 'stack', marginTop: 4, marginRight: 5 }}>{image.label}</p>
            </div>
          }
          nonCircular
          positioning={'above-start'}
        >
          <ImageSwatch
            className={styles.swatch}
            src={image.swatchSrc}
            value={image.value}
            aria-label={image.label}
          />
        </StyledTooltip>
      ))}
    </SwatchPicker>
  );
}
