// Stats 페이지 (통계 차트)
// UI만 담당: 통계 계산은 statsService에서 관리
// 디자인 변경 포인트: className="stats-page" 스타일만 수정하면 됨

import { useEffect, useState } from 'react';
import { AppShell } from '../components/AppShell';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { getNoiseDistribution, getCostDistribution } from '../lib/statsService';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

export const Stats = () => {
  const [noiseData, setNoiseData] = useState<Array<{ name: string; value: number }>>([]);
  const [costData, setCostData] = useState<Array<{ name: string; value: number }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getNoiseDistribution(), getCostDistribution()])
      .then(([noise, cost]) => {
        setNoiseData(noise);
        setCostData(cost);
        setLoading(false);
      })
      .catch((error) => {
        console.error('통계 데이터 로드 실패:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <AppShell title="통계" showBottomTabs={true}>
        <div className="stats-page">
          <p>로딩 중...</p>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell title="통계" showBottomTabs={true}>
      <div className="stats-page">
        <h2 className="stats-title">장소 통계</h2>
        <div className="stats-charts">
          <div className="stats-chart-container">
            <h3 className="stats-chart-title">소음 수준 분포</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={noiseData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="stats-chart-container">
            <h3 className="stats-chart-title">비용 수준 분포</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={costData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${percent ? (percent * 100).toFixed(0) : 0}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {costData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </AppShell>
  );
};
