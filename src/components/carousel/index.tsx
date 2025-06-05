import {
  Carousel,
  type CarouselAnnouncerFunction,
  CarouselCard,
  CarouselNav,
  CarouselNavButton,
  CarouselNavContainer,
  CarouselSlider,
  CarouselViewport,
  Image,
  makeStyles,
  tokens,
} from '@fluentui/react-components';

const useCarouselStyles = makeStyles({
  carouselCard: {
    borderRadius: tokens.borderRadiusLarge,
    height: '100%',
    width: '100%',
  },
  carouselImage: {
    width: '100%',
    height: 'auto',
    objectFit: 'contain',
  },
});

const getAnnouncement: CarouselAnnouncerFunction = (index: number, totalSlides: number) => {
  return `Product image ${index + 1} of ${totalSlides}`;
};

interface ProductCarouselProps {
  images?: { url: string }[];
}

export function ProductCarousel({ images = [] }: ProductCarouselProps) {
  const classes = useCarouselStyles();

  if (images.length === 0) {
    return null;
  }

  return (
    <Carousel
      groupSize={1}
      circular
      announcement={getAnnouncement}
      motion={'fade'}
      autoplayInterval={3000}
    >
      <CarouselViewport>
        <CarouselSlider>
          {images.map((image, index) => (
            <CarouselCard
              key={`product-image-${index}`}
              className={classes.carouselCard}
              aria-label={`${index + 1} of ${images.length}`}
            >
              <Image
                className={classes.carouselImage}
                src={image.url}
                alt={`Product view ${index + 1}`}
                fit="contain"
              />
            </CarouselCard>
          ))}
        </CarouselSlider>
      </CarouselViewport>
      <CarouselNavContainer
        layout="inline"
        autoplayTooltip={{ content: 'Autoplay', relationship: 'label' }}
        nextTooltip={{ content: 'Next image', relationship: 'label' }}
        prevTooltip={{ content: 'Previous image', relationship: 'label' }}
      >
        <CarouselNav>
          {(index) => <CarouselNavButton aria-label={`Carousel Nav Button ${index + 1}`} />}
        </CarouselNav>
      </CarouselNavContainer>
    </Carousel>
  );
}
