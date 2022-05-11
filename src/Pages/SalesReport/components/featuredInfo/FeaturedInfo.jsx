import './featuredInfo.css';
import { useState } from 'react';
import React, { useSEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from '../../../../Config/axios';

export default function FeaturedInfo() {
  const { token, warehouse_id } = useSelector((state) => state.auth);
  const [totalSales, setTotalSales] = useState();

  const getTotalSales = async () => {
    try {
      const res = await axios.post(`/sales-report/total-sales`, {
        warehouse_id,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { data } = res;
      // setTotalSales(data);
      console.log(data);
    } catch (error) {}
  };

  console.log(getTotalSales());

  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Total Sales</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">Rp {totalSales}</span>
        </div>
        <span className="featuredSub">Most categories: Chair</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Sales This Month</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">Rp 23.123.322</span>
        </div>
        <span className="featuredSub">Most categories: Chair</span>
      </div>

      <div className="featuredItem">
        <span className="featuredTitle">Total Product Sold</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">41.231</span>
        </div>
        <span className="featuredSub">Most categories: Chair</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Product Sold This Month</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">2.123</span>
        </div>
        <span className="featuredSub">Most categories: Chair</span>
      </div>
    </div>
  );
}
