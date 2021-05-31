import React from 'react';
import { Statistic, Icon } from '../index';

const StatisticDemo = () => (
  <div>
    <Statistic title="Active Users" value={112893} />
    <br />
    <Statistic title="Active Users" value={112893} precision={2} valueStyle={{ color: '#3f8600' }} prefix={<Icon type="arrow-up" />} />
    <br />
    <Statistic title="Feedback" value={1128} prefix={<Icon type="like" />} />
    <br />
    <Statistic title="Unmerged" value={93} suffix="/ 100" />
  </div>
);

export default StatisticDemo;
