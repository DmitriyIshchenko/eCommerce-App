import {
  ImageSwatch,
  SwatchPicker,
  type SwatchPickerOnSelectEventHandler,
  makeStyles,
} from '@fluentui/react-components';
import StyledTooltip from '../tooltips/styled';
import { capitalizeString } from '../../../lib/utils/capitalizeString';

const useStyles = makeStyles({
  example: {
    width: '100%',
    height: '200px',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    margin: '4px 0',
  },
  swatch: {
    width: '100px',
    height: 'auto',
    aspectRatio: '1',
  },
  picker: {
    minWidth: '0',
  },
});

export default function SingleImageSwatchPicker({
  value,
  image,
  onChange,
  ariaLabel,
}: {
  image?: {
    swatchSrc: string;
    value: string;
    label: string;
    fullImageSrc: string;
  };
  onChange?: (value: string) => void;
  value?: string | number;
  ariaLabel?: string;
}) {
  const styles = useStyles();
  const handleSelect: SwatchPickerOnSelectEventHandler = (_, data) => {
    if (onChange) onChange(data.selectedValue);
  };

  return (
    <>
      <SwatchPicker
        aria-label={ariaLabel}
        selectedValue={(typeof value === 'string' && value) || ''}
        onSelectionChange={handleSelect}
        className={styles.picker}
      >
        {image && (
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
                <p style={{ gridArea: 'stack', marginTop: 4, marginRight: 5 }}>
                  {capitalizeString(image.label)}
                </p>
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
              style={{ minWidth: 0 }}
            />
          </StyledTooltip>
        )}
      </SwatchPicker>
    </>
  );
}
