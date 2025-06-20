import { makeStyles, mergeClasses, tokens } from '@fluentui/react-components';
import { ChevronUpRegular } from '@fluentui/react-icons';
import CustomButton from './custom';
import useScrolledBy from '../../../hooks/use-scrolled-by';

const useCss = makeStyles({
  root: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    opacity: 0,
    transition: tokens.durationNormal,
    pointerEvents: 'none',
  },
  visible: {
    opacity: 1,
    pointerEvents: 'auto',
  },
});

export default function ScrollToTopButton() {
  const css = useCss();
  const isScrolled = useScrolledBy(300);
  return (
    <CustomButton
      onClick={() => window.scrollTo(0, 0)}
      icon={<ChevronUpRegular />}
      shape="circular"
      appearance="inverted"
      className={mergeClasses(css.root, isScrolled && css.visible)}
    />
  );
}
