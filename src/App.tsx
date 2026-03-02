// 메인 App 컴포넌트 - 라우팅 설정
// 디자인 변경 포인트: 라우팅 구조만 유지하면 됨

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Recommend } from './pages/Recommend';
import { Results } from './pages/Results';
import { PlaceDetail } from './pages/PlaceDetail';
import { Map } from './pages/Map';
import { Stats } from './pages/Stats';
import { Compare } from './pages/Compare';
import { Search } from './pages/Search';
import './styles/globals.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recommend" element={<Recommend />} />
        <Route path="/results" element={<Results />} />
        <Route path="/place/:id" element={<PlaceDetail />} />
        <Route path="/map" element={<Map />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
