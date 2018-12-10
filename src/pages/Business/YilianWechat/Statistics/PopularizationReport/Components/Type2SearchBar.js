import React from 'react';
import { Button, DatePicker } from 'antd';
import moment from 'moment';

import classes from '../PopularizationReport.less';

function type2SearchBar(props) {
  const { params, onParamsChange, onReset, onExport } = props;

  return (
    <div className={classes.Search}>
      {/* <Select
        className={classes.Gap}
        name="countType"
        value={params.countType}
        onChange={value => onParamsChange(value, 'countType')}
      >
        <Select.Option value="day">按日统计</Select.Option>
        <Select.Option value="week">按周统计</Select.Option>
        <Select.Option value="month">按月统计</Select.Option>
        <Select.Option value="year">按年统计</Select.Option>
      </Select> */}
      <DatePicker.RangePicker
        className={classes.Gap}
        value={[moment(params.startTime, 'YYYY-MM-DD'), moment(params.endTime, 'YYYY-MM-DD')]}
        onChange={(_, dateStrings) => onParamsChange(dateStrings, 'date')}
        allowClear={false}
        ranges={{
          最近一周: [
            moment(new Date(new Date().valueOf() - 604800000), 'YYYY-MM-DD'),
            moment(new Date(), 'YYYY-MM-DD'),
          ],
          最近30天: [
            moment(new Date(new Date().valueOf() - 2592000000), 'YYYY-MM-DD'),
            moment(new Date(), 'YYYY-MM-DD'),
          ],
          最近90天: [
            moment(new Date(new Date().valueOf() - 7776000000), 'YYYY-MM-DD'),
            moment(new Date(), 'YYYY-MM-DD'),
          ],
          最近一年: [
            moment(new Date(new Date().valueOf() - 31536000000), 'YYYY-MM-DD'),
            moment(new Date(), 'YYYY-MM-DD'),
          ],
        }}
      />
      <Button type="primary" htmlType="button" onClick={onReset} className={classes.Gap}>
        重置
      </Button>
      <Button type="primary" htmlType="button" onClick={onExport}>
        导出
      </Button>
    </div>
  );
}

export default type2SearchBar;