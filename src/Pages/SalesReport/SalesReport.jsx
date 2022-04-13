// import Chart from '../../components/chart/Chart';

import FeaturedInfo from './components/featuredInfo/FeaturedInfo';
import './salesReport.css';
// import { userData } from '../../dummyData';

function SalesReport() {
  return (
    <div className="sales-report">
      <FeaturedInfo />
      {/* <Chart data={userData} title="User Analytics" grid dataKey="Active User" /> */}
    </div>
  );
}

export default SalesReport;
