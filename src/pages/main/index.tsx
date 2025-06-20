import CategoryOverview from '../../features/category-overview';
import ExtraBlock from '../../features/extra';
import ShopServices from '../../features/shop-services';
import Testimonials from '../../features/testimonials';

export default function MainPage() {
  return (
    <>
      <CategoryOverview />
      <div style={{ scrollSnapAlign: 'start' }} />
      <Testimonials />
      <ExtraBlock />
      <ShopServices />
    </>
  );
}
