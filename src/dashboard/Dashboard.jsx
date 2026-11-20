import { useDashboard } from './useDashboard.js';
import { DashboardBody } from './DashboardBody.jsx';

export default function Dashboard() {
  const v = useDashboard();
  return <DashboardBody v={v} />;
}