import { useNavigate } from 'react-router-dom';
import { AppShell } from '../components/AppShell';
import styles from './Home.module.css';

import bgImage from '../assets/bg.png';
import recommendButtonImage from '../assets/recommendbutton.png';

export const Home = () => {
  const navigate = useNavigate();

  return (
    <AppShell title="홈" showTopBar={false} showBottomTabs={false} fullBleed={true}>
      <div
        className={styles.root}
        style={{ backgroundImage: `url(${bgImage})` }}
        role="img"
        aria-label="홈 배경"
      >
        <button
          type="button"
          className={styles.button}
          onClick={() => navigate('/recommend')}
          aria-label="추천받기"
        >
          <img
            src={recommendButtonImage}
            alt="추천받기"
            className={styles.buttonImage}
          />
        </button>
      </div>
    </AppShell>
  );
};
