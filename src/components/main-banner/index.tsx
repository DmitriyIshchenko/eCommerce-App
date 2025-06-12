import { Subtitle1, Title2 } from '@fluentui/react-components';
import './global.css';

export function MainBanner() {
  return (
    <main className="main">
      <Title2>🐱‍💻 Main Page 🐱‍💻</Title2>
      <Subtitle1 align="center">
        Hey! We&apos;re still wrapping up our project - would it be okay if you review it on the
        last day? Thanks a lot and good luck! 🙏
      </Subtitle1>
    </main>
  );
}
