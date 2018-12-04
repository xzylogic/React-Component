import React, { Component } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import debounce from 'lodash.debounce';

import QuerySearchBar from '../../QueryComponent/QuerySearchBar';
import TableList from '@/components/PageComponents/Table/TableList';
import GroupDetail from './GroupDetail';

const mapStateToProps = state => ({
  groupList: state.businessYilianWechatQuery.list.group,
  currentPage: state.businessYilianWechatQuery.currentPage.group,
  totalElements: state.businessYilianWechatQuery.totalElements.group,
  searchParam: state.businessYilianWechatQuery.searchParam.group,
  loading: state.loading.effects['businessYilianWechatQuery/fetchGroupPerformance'],
});

const mapDispatchToProps = dispatch => ({
  onFetchGroupList: page =>
    dispatch({
      type: 'businessYilianWechatQuery/fetchGroupPerformance',
      payload: { page },
    }),
  onFetchGroupListDebounce: debounce(
    page =>
      dispatch({
        type: 'businessYilianWechatQuery/fetchGroupPerformance',
        payload: { page },
      }),
    500
  ),
  onSearchParamChange: (key, value) =>
    dispatch({
      type: 'businessYilianWechatQuery/updateSearchParam',
      payload: { origin: 'group', key, value },
    }),
});

@connect(
  mapStateToProps,
  mapDispatchToProps
)
class GroupContainer extends Component {
  state = {
    showDetail: false,
    selectedName: '',
  };

  componentDidMount() {
    const { onFetchGroupList } = this.props;
    onFetchGroupList(0);
  }

  handleParamsChanged = async (value, dataKey) => {
    const { onSearchParamChange, onFetchGroupListDebounce } = this.props;
    if (dataKey === 'date') {
      await onSearchParamChange('startTime', value[0]);
      await onSearchParamChange('endTime', value[1]);
    } else {
      await onSearchParamChange(dataKey, value);
    }
    await onFetchGroupListDebounce(0);
  };

  handleDetail = (e, record) => {
    e.preventDefault();
    this.setState({
      showDetail: true,
      selectedName: record.name,
    });
  };

  setTableColumns = () => {
    const columns = [
      {
        title: '组名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '人数',
        dataIndex: 'counts',
        key: 'counts',
      },
      {
        title: '渠道',
        dataIndex: 'origin',
        key: 'origin',
        render: () => '微信',
      },
      {
        title: '关注量',
        dataIndex: 'fansCount',
        key: 'fansCount',
      },
      {
        title: '注册量',
        dataIndex: 'regCount',
        key: 'regCount',
      },
      {
        title: '操作',
        dataIndex: 'id',
        key: 'action',
        render: (_, record) => (
          <span>
            <a onClick={e => this.handleDetail(e, record)}>查看详情</a>
          </span>
        ),
      },
    ];
    return columns;
  };

  handlePageChange = page => {
    const { onFetchGroupList } = this.props;
    onFetchGroupList(page - 1);
  };

  handleAmountSet = e => {
    e.preventDefault();
    console.log('amountset');
  };

  handleReset = async e => {
    e.preventDefault();
    const { onSearchParamChange, onFetchGroupList } = this.props;
    await onSearchParamChange(
      'startTime',
      moment(new Date().valueOf() - 604800000).format('YYYY-MM-DD')
    );
    await onSearchParamChange('endTime', moment(new Date().valueOf()).format('YYYY-MM-DD'));
    await onSearchParamChange('name', '');
    await onFetchGroupList(0);
  };

  handleExport = e => {
    e.preventDefault();
    console.log('export');
  };

  handleDetailClose = e => {
    e.preventDefault();
    this.setState({
      showDetail: false,
    });
  };

  render() {
    const { searchParam, groupList, currentPage, totalElements } = this.props;
    const { showDetail, selectedName } = this.state;
    return (
      <React.Fragment>
        <QuerySearchBar
          params={searchParam}
          onAmountSet={this.handleAmountSet}
          onReset={this.handleReset}
          onExport={this.handleExport}
          onParamsChange={this.handleParamsChanged}
        />
        <TableList
          rowKey="name"
          list={groupList}
          columns={this.setTableColumns()}
          currentPage={currentPage}
          totalElements={totalElements}
          onPageChange={this.handlePageChange}
        />
        <GroupDetail name={selectedName} visible={showDetail} onClose={this.handleDetailClose} />
      </React.Fragment>
    );
  }
}

export default GroupContainer;