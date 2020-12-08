import { Card, Col, DatePicker, Row, Table, Tag, Tooltip } from 'antd';
import { blockedAllowedDefinition, rulesPerMinuteDefinition, topClientsDefinition, topRulesDefinition, topSeverityDefinition, topStatusCodesDefinition } from 'charts/definitions';
import { UIContext } from 'contexts/ui-context';
import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import { Bar, Doughnut, HorizontalBar, Line } from 'react-chartjs-2';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchData } from '../../services/service';
import { mapRuleId } from '../../utils/owasp-mapping';

const { RangePicker } = DatePicker;
const mapState = (state) => ({
  charts: state.dashboard.charts,
  timeRange: state.dashboard.timeRange,
  realTimeRequests: state.realTime.auditDocuments.filter(ad => ad.status === 'Blocked').slice(0, 5),
});

const mapDispatch = dispatch => ({
  setBlockedAllowedData: dispatch.dashboard.setBlockedAllowedData,
  setTopRules: dispatch.dashboard.setTopRules,
  setTopClients: dispatch.dashboard.setTopClients,
  setTopStatusCodes: dispatch.dashboard.setTopStatusCodes,
  setTopSeverity: dispatch.dashboard.setTopSeverity,
  setRulesPerMinute: dispatch.dashboard.setRulesPerMinute,
  setTimeRange: dispatch.dashboard.setTimeRange,
});

const Dashboard = (props) => {
  const uiContext = useContext(UIContext);
  const { charts } = useState({});

  useEffect(() => {
    uiContext.setTitle('Dashboard');
    uiContext.setSubTitle('General overview of your web application\'s security');
    fetchData(blockedAllowedDefinition, props.setBlockedAllowedData, props.timeRange);
    fetchData(topRulesDefinition, props.setTopRules, props.timeRange);
    fetchData(topClientsDefinition, props.setTopClients, props.timeRange);
    fetchData(topStatusCodesDefinition, props.setTopStatusCodes, props.timeRange);
    fetchData(topSeverityDefinition, props.setTopSeverity, props.timeRange);
    fetchData(rulesPerMinuteDefinition, props.setRulesPerMinute, props.timeRange);

  }, [charts, props.timeRange]);

  function onOk(value) {
    if (value.length === 2) {
      if (value[0] !== null && value[1] !== null) {
        props.setTimeRange(value);
      }
    }
  }

  const requestsTableColumns = [
    {
      title: 'Time',
      dataIndex: 'time_stamp',
      render: ts => moment(ts).format('LTS'),
    },
    {
      title: 'Source',
      dataIndex: 'client_ip',
    },
    {
      title: 'URL',
      dataIndex: ['request', 'uri'],
      ellipsis: {
        showTitle: false,
      },
      render: url => (<Tooltip title={url} placement="topLeft">{url}</Tooltip>),
    },
    {
      title: 'Attacks',
      dataIndex: ['messages'],
      render: (_, doc) => {
        const titles = {};
        const tags = doc.messages
          .map(m => mapRuleId(m.details.ruleId))
          .filter(r => r.display && r.tagText)
          .map((r) => {
            titles[r.tagText] = r.title;
            return r.tagText;
          });
        const uniqueTags = Array.from(new Set(tags));
        return uniqueTags.map((tag) => {
          return (
            <Tooltip title={titles[tag]}>
              <Tag color='red'>{tag}</Tag>
            </Tooltip>
          );
        });
      },
    },
  ];

  return (
    <div>
      <Row>
        <Col span={6} offset={18}>
          <RangePicker
            showTime={{ format: 'HH:mm' }}
            format="YYYY-MM-DD HH:mm"
            onOk={onOk}
          />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Card title="Requests Per Minute">
            <Line
              data={props.charts.rulesPerMinute.data}
              height={300}
              width={100}
              options={rulesPerMinuteDefinition.options}
            />
          </Card>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Card title="Blocked and Allowed Requests">
            <Bar
              data={props.charts.blockedAllowed.data}
              height={300}
              width={100}
              options={blockedAllowedDefinition.options}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Top Rules">
            <HorizontalBar
              data={{ datasets: props.charts.topRules.data.datasets, labels: props.charts.topRules.data.labels.map(m => m + '-' + mapRuleId(m).title) }}
              height={300}
              width={100}
              options={topRulesDefinition.options}
            />
          </Card>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Card title="Top Clients">
            <Doughnut
              data={props.charts.topClients.data}
              height={300}
              width={100}
              options={topClientsDefinition.options}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Top Status Codes">
            <Doughnut
              data={props.charts.topStatusCodes.data}
              height={300}
              width={100}
              options={topStatusCodesDefinition.options}
            />
          </Card>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Card title="Top Severity">
            <HorizontalBar
              data={props.charts.topSeverity.data}
              height={300}
              width={100}
              options={topSeverityDefinition.options}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Real Time Attacks" extra={<Link to={`/audit`}>See All</Link>} style={{ height: '100%' }}>
            <Table dataSource={props.realTimeRequests} columns={requestsTableColumns} rowKey='unique_id' pagination={false} size="small" />
          </Card>
        </Col>
      </Row>
    </div>
  );

};

export default connect(
  mapState,
  mapDispatch,
)(Dashboard);
