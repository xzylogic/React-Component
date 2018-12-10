import React, { Component } from 'react';
import { connect } from 'dva';
import debounce from 'lodash.debounce';
import moment from 'moment';

import SearchBar from './Type4SearchBar';
import ReportList from './Type4List';
import { POPULARIZATION_REPORT_TYPE } from '@/models/business/yilian-wechat/statistics/statistics';

import classes from '../PopularizationReport.less';

const mapStateToProps = state => ({
  searchParam:
    state.businessYilianWechatStatistics.searchParams.popularization[
      POPULARIZATION_REPORT_TYPE.TYPE4
    ],
  searchGroupList: state.businessYilianWechatStatistics.searchGroupList,
  reportList:
    state.businessYilianWechatStatistics.list.popularization[POPULARIZATION_REPORT_TYPE.TYPE4],
});

const mapDispatchToProps = dispatch => ({
  onFetchPopularizationReport: () =>
    dispatch({
      type: 'businessYilianWechatStatistics/fetchPopularizationReportType4',
      payload: { page: 0 },
    }),
  onFetchPopularizationReportDebounce: debounce(
    () =>
      dispatch({
        type: 'businessYilianWechatStatistics/fetchPopularizationReportType4',
        payload: { page: 0 },
      }),
    500
  ),
  onUpdateSearchParams: (key, value) =>
    dispatch({
      type: 'businessYilianWechatStatistics/updateSearchParams',
      payload: {
        pageKey: 'popularization',
        typeKey: POPULARIZATION_REPORT_TYPE.TYPE4,
        key,
        value,
      },
    }),
});

@connect(
  mapStateToProps,
  mapDispatchToProps
)
class Type3Container extends Component {
  componentDidMount() {
    const { reportList, onFetchPopularizationReport } = this.props;
    if (!reportList) {
      onFetchPopularizationReport();
    }
  }

  handleParamsChange = async (value, dataKey) => {
    const { onUpdateSearchParams, onFetchPopularizationReportDebounce } = this.props;
    await onUpdateSearchParams(dataKey, value);
    await onFetchPopularizationReportDebounce();
  };

  handleReset = async e => {
    const { onUpdateSearchParams, onFetchPopularizationReport } = this.props;
    e.preventDefault();
    await onUpdateSearchParams('time', moment(new Date().valueOf()).format('YYYY-MM-DD'));
    await onFetchPopularizationReport(0);
  };

  handleExport = e => {
    e.preventDefault();
    console.log('export');
  };

  render() {
    const { searchParam, searchGroupList, reportList } = this.props;
    return (
      <React.Fragment>
        <SearchBar
          params={searchParam}
          searchGroupList={searchGroupList}
          onParamsChange={this.handleParamsChange}
          onReset={this.handleReset}
          onExport={this.handleExport}
        />
        <div className={classes.Content}>
          <ReportList data={reportList} />
        </div>
      </React.Fragment>
    );
  }
}

export default Type3Container;