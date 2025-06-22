import {
  Carousel,
  type CarouselAnnouncerFunction,
  CarouselCard,
  CarouselNav,
  CarouselNavContainer,
  CarouselNavImageButton,
  CarouselSlider,
  CarouselViewport,
  Image,
  makeStyles,
  tokens,
} from '@fluentui/react-components';
import useFancybox from './use-fancybox';
import type { CSSProperties } from 'react';

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

export function ProductFancyGallery({ images = [], style, id }: ProductCarouselProps) {
  const classes = useCarouselStyles();
  const [fancyboxRef] = useFancybox({
    Hash: false,
    Carousel: {
      transition: 'crossfade',
    },
  });

  if (images.length === 0) {
    return null;
  }

  return (
    <div ref={fancyboxRef}>
      <Carousel
        groupSize={1}
        align="center"
        announcement={getAnnouncement}
        motion={{ kind: 'slide', duration: 40 }}
        style={style}
        draggable
      >
        <CarouselViewport className={classes.viewport}>
          <CarouselSlider style={{ maxHeight: 'calc(100vh - 100px)' }}>
            {images.map((image, index) => (
              <CarouselCard
                key={image.url}
                className={classes.card}
                aria-label={`${index + 1} of ${images.length}`}
              >
                <a href={image.url} data-fancybox="gallery">
                  <Image
                    className={classes.image}
                    src={image.url}
                    role="presentation"
                    style={{
                      viewTransitionName: index === 0 ? `product-image-${id}` : '',
                    }}
                  />
                </a>
              </CarouselCard>
            ))}
          </CarouselSlider>
        </CarouselViewport>
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
              <div data-fancybox="gallery">
                <CarouselNavImageButton
                  image={{ src: images[index].url }}
                  aria-label={`Carousel Nav Button ${index}`}
                  className={classes.navButton}
                />
              </div>
            )}
          </CarouselNav>
        </CarouselNavContainer>
      </Carousel>
    </div>
  );
}
