import './salesReport.css';
import axios from '../../Config/axios.js';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import SalesChart from './components/charts/SalesChart';
import FeaturedInfo from './components/featuredInfo/FeaturedInfo';
import { UserData } from './components/data/userData';

function SalesReport() {
  const { token } = useSelector((state) => state.auth);

  const [startMonthDate, setStarMonthtDate] = useState(new Date('2021/01'));
  const [endMonthDate, setEndMonthDate] = useState(new Date('2021/04'));

  const [startYearDate, setStartYearDate] = useState(new Date());
  const [endYearDate, setEndYearDate] = useState(new Date());

  const [filterState, setFilterState] = useState({ filter: 'month' });

  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.year),
    datasets: [
      {
        label: 'Users Gained',
        data: UserData.map((data) => data.userGain),
        backgroundColor: ['rgba(75,192,192,1)', '#ecf0f1', '#50AF95', '#f3ba2f', '#2a71d0'],
        borderColor: 'black',
        borderWidth: 2,
      },
    ],
  });

  const handleChange = (e) => {
    setFilterState({ ...filterState, [e.target.name]: e.target.value });
  };

  const searchSalesReport = async () => {};

  const onSearchClick = () => {
    // searchSalesReport();
  };

  return (
    <div className="sales-report">
      <FeaturedInfo />

      <div style={{ width: 700, marginTop: 50 }}>
        <label style={{ display: 'flex', justifyContent: 'center' }}>Sales Report</label>
        <select onChange={handleChange} className="form-control" style={{ display: 'flex', justifyContent: 'center', backgroundColor: 'white', border: '0px', color: 'rgb(33, 37, 41)' }} name="filter">
          <option
            key="month"
            name="month"
            value="month"
            // getTransactionMonth()
          >
            Filter by month
          </option>
          <option
            key="year"
            name="year"
            value="year"
            // getTransactionYear()
          >
            Filter by year
          </option>
        </select>

        {filterState.filter === 'month' && (
          <>
            <DatePicker
              selected={startMonthDate}
              onChange={(date) => setStarMonthtDate(date)}
              selectsStart
              startDate={startMonthDate}
              endDate={endMonthDate}
              dateFormat="MM/yyyy"
              showMonthYearPicker
              // sdsd
            />
            <DatePicker
              selected={endMonthDate}
              onChange={(date) => setEndMonthDate(date)}
              selectsEnd
              startDate={startMonthDate}
              endDate={endMonthDate}
              dateFormat="MM/yyyy"
              showMonthYearPicker
              // dfsdf
            />
          </>
        )}
        {filterState.filter === 'year' && (
          <>
            <DatePicker
              selected={startYearDate}
              onChange={(date) => setStartYearDate(date)}
              selectsStart
              minDate={new Date(2021)}
              maxDate={new Date()}
              showYearPicker
              dateFormat="yyyy"
              // sdfdf
            />
            <DatePicker
              selected={endYearDate}
              onChange={(date) => setEndYearDate(date)}
              selectsEnd
              minDate={new Date(2021)}
              maxDate={new Date()}
              showYearPicker
              dateFormat="yyyy"
              // sdfasd
            />
          </>
        )}

        {/* Search Button */}
        <button type="button" class="btn btn-danger" style={{ marginTop: '18px', width: '100%' }} onClick={onSearchClick}>
          Search
        </button>
      </div>
      <div style={{ marginTop: 30 }}>
        <SalesChart chartData={userData} />
      </div>
    </div>
  );
}

export default SalesReport;
