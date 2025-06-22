import { Image, makeStyles } from '@fluentui/react-components';
import type { CSSProperties } from 'react';
import useCarousel from './use-carousel';
import useFancybox from './use-fancybox';

const useCarouselStyles = makeStyles({
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
});

interface ProductCarouselProps {
  images?: { url: string }[];
  style?: CSSProperties;
  id?: string;
}

export function ProductFancyCarousel({ images = [], id }: ProductCarouselProps) {
  const classes = useCarouselStyles();
  const [fancyboxRef] = useFancybox({
    Hash: false,
    Carousel: {
      transition: 'crossfade',
    },
    hideScrollbar: false,
  });

  const [carouselRef] = useCarousel({
    Arrows: true,
    transition: 'crossfade',
  });

  if (images.length === 0) {
    return null;
  }

  return (
    <div
      ref={(el) => {
        carouselRef(el);
        fancyboxRef(el);
      }}
    >
      {images.map((image, index) => (
        <div
          className="f-carousel__slide"
          key={image.url}
          data-thumb-src={image.url}
          data-fancybox="gallery"
          data-src={image.url}
        >
          <Image
            className={classes.image}
            src={image.url}
            role="presentation"
            style={{
              viewTransitionName: index === 0 ? `product-image-${id}` : '',
            }}
          />
        </div>
      ))}
    </div>
  );
}
