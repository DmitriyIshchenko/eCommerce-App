import {
  Carousel,
  type CarouselAnnouncerFunction,
  CarouselCard,
  CarouselNav,
  CarouselNavContainer,
  CarouselNavImageButton,
  CarouselSlider,
  CarouselViewport,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTrigger,
  Image,
  makeStyles,
  tokens,
} from '@fluentui/react-components';
import { DismissRegular } from '@fluentui/react-icons';
import { type CSSProperties, useState } from 'react';
import CustomButton from '../ui/buttons/custom';
import StyledTooltip from '../ui/tooltips/styled';

const useCarouselStyles = makeStyles({
  carouselCard: {
    borderRadius: tokens.borderRadiusLarge,
    width: '100%',
  },
  carouselImage: {
    width: '100%',
    height: 'auto',
    objectFit: 'contain',
    cursor: 'pointer',
    margin: '0 auto',
  },
  card: {
    boxSizing: 'border-box',
    width: '100%',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
  modalImage: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
  viewport: {
    marginBottom: '0',
    cursor: 'pointer',
  },
  modalViewport: {
    maxHeight: 'calc(100vh - 96px)',
  },
  navButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: '48px',
    minHeight: '48px',
    backgroundColor: 'transparent',
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    margin: 0,
    "[aria-selected='true']": {
      border: `1px solid ${tokens.colorNeutralForeground4}`,
    },
  },
});

const getAnnouncement: CarouselAnnouncerFunction = (index: number, totalSlides: number) => {
  return `Product image ${index + 1} of ${totalSlides}`;
};

interface ProductCarouselProps {
  images?: { url: string }[];
  style?: CSSProperties;
  id?: string;
}

export function ProductCarousel({ images = [], style, id }: ProductCarouselProps) {
  const classes = useCarouselStyles();
  const [currentIndex, setCurrentIndex] = useState(0);

  if (images.length === 0) {
    return null;
  }

  return (
    <Carousel
      groupSize={1}
      align="center"
      announcement={getAnnouncement}
      motion={{ kind: 'slide', duration: 40 }}
      onActiveIndexChange={(_, d) => setCurrentIndex(d.index)}
      style={style}
      draggable
    >
      <Dialog>
        <DialogTrigger disableButtonEnhancement>
          <CarouselViewport className={classes.viewport}>
            <CarouselSlider style={{ maxHeight: 'calc(100vh - 100px)' }}>
              {images.map((image, index) => (
                <CarouselCard
                  key={image.url}
                  className={classes.card}
                  aria-label={`${index + 1} of ${images.length}`}
                >
                  <Image
                    className={classes.image}
                    src={image.url}
                    role="presentation"
                    style={{ viewTransitionName: index === 0 ? `product-image-${id}` : '' }}
                  />
                </CarouselCard>
              ))}
            </CarouselSlider>
          </CarouselViewport>
        </DialogTrigger>
        <DialogSurface style={{ padding: 12, paddingTop: 48 }}>
          <DialogActions style={{ position: 'absolute', top: 10, right: 10 }}>
            <DialogTrigger disableButtonEnhancement>
              <CustomButton
                appearance="transparent"
                icon={
                  <StyledTooltip contentChildren={'Close'}>
                    <DismissRegular />
                  </StyledTooltip>
                }
              />
            </DialogTrigger>
          </DialogActions>
          <DialogBody>
            <DialogContent>
              <Carousel
                groupSize={1}
                align="center"
                announcement={getAnnouncement}
                motion={{ kind: 'slide', duration: 40 }}
                onActiveIndexChange={(_, d) => setCurrentIndex(d.index)}
                activeIndex={currentIndex}
                draggable
              >
                <CarouselViewport className={classes.modalViewport} style={{ marginBottom: 0 }}>
                  <CarouselSlider style={{ maxHeight: 'calc(100vh - 96px)' }}>
                    {images.map((image, index) => (
                      <CarouselCard
                        key={image.url}
                        className={classes.card}
                        aria-label={`${index + 1} of ${images.length}`}
                        style={{ padding: 0 }}
                      >
                        <Image className={classes.modalImage} src={image.url} role="presentation" />
                      </CarouselCard>
                    ))}
                  </CarouselSlider>
                </CarouselViewport>
                <CarouselNavContainer
                  next={{ 'aria-label': 'go to next' }}
                  prev={{ 'aria-label': 'go to prev' }}
                />
              </Carousel>
            </DialogContent>
          </DialogBody>
        </DialogSurface>
      </Dialog>
      <CarouselNavContainer
        layout="overlay-expanded"
        next={null}
        prev={null}
        style={{ position: 'static', height: 'auto' }}
      >
        <CarouselNav
          style={{
            display: 'flex',
            width: '100%',
            flexWrap: 'wrap',
            gap: 8,
            height: 'auto',
            position: 'static',
          }}
        >
          {(index) => (
            <CarouselNavImageButton
              image={{ src: images[index].url }}
              aria-label={`Carousel Nav Button ${index}`}
              className={classes.navButton}
            />
          )}
        </CarouselNav>
      </CarouselNavContainer>
    </Carousel>
  );
}
