import React, { Component } from 'react';
import createG2 from 'g2-react';

const Line = createG2(chart => {
  chart.col('date', { alias: ' ' });
  chart.col('value', { alias: '关注人数' });
  chart.col('type', { alias: '渠道' });
  chart
    .line()
    .position('date*value')
    .color('type', ['#36cfc9', '#ffc53d', '#40a9ff', '#ff4d4f', '#9254de'])
    .size(2);
  chart
    .point()
    .position('date*value')
    .color('type', ['#36cfc9', '#ffc53d', '#40a9ff', '#ff4d4f', '#9254de'])
    .size(2);
  chart.render();
});

const getType = type => {
  switch (type) {
    case 'online':
      return '微信线上关注数';
    case 'person':
      return '微信地推人员关注数';
    case 'hos':
      return '微信医院二维码关注数';
    case 'counts':
      return '微信关注总数';
    case 'unFollow':
      return '微信取消关注总数';
    default:
      return '';
  }
};

const getDateSource = data =>
  data.filter(obj => obj.date !== undefined).reduce((preArr, currObj) => {
    const singleArr = Object.keys(currObj)
      .filter(key => !(key === 'date' || key === 'appName'))
      .reduce((pre, curr, i, arr) => {
        const singleObj = {
          date: currObj.date,
          appName: currObj.appName,
          type: getType(arr[i]),
          value: currObj[arr[i]],
        };
        return [...pre, ...[singleObj]];
      }, []);
    return [...preArr, ...singleArr];
  }, []);

const getDataNewObj = (dataNew, type) => {
  let dataObj = dataNew;
  if (dataNew.length !== 0 && (type === '1' || type === '2' || type === '3')) {
    dataObj = dataNew.reverse();
  }
  return dataObj;
};

class FollowChart extends Component {
  state = {
    width: 1000,
    height: 500,
    plotCfg: {
      margin: [10, 200, 200, 120],
    },
  };

  render() {
    const { width, height, plotCfg } = this.state;
    const {
      data,
      params: { type },
    } = this.props;
    const dataNew = (data && getDateSource(data)) || [];
    const dataNewObj = getDataNewObj(dataNew, type);
    return <Line data={dataNewObj} width={width} height={height} plotCfg={plotCfg} forceFit />;
  }
}

export default FollowChart;
