import { TUIContext, UIContext } from 'contexts/ui-context';
import React, { useContext, useEffect, useState } from 'react';
import {blockedAllowedDefinition, topRulesDefinition, topClientsDefinition, topStatusCodesDefinition, topSeverityDefinition, rulesPerMinuteDefinition} from 'charts/definitions';
import {connect} from "react-redux";
import {HorizontalBar, Bar, Doughnut, Line} from 'react-chartjs-2';
import {RootState} from "../../store";
import {mapRuleId} from "../../utils/owasp-mapping";
import {fetchData} from "../../services/service";
import {  Row, Col, Card, DatePicker  } from "antd";

const { RangePicker } = DatePicker;
const mapState = (state) => ({
  charts: state.dashboard.charts,
  timeRange: state.dashboard.timeRange,
});

const mapDispatch = dispatch => ({
  setBlockedAllowedData: dispatch.dashboard.setBlockedAllowedData,
  setTopRules : dispatch.dashboard.setTopRules,
  setTopClients : dispatch.dashboard.setTopClients,
  setTopStatusCodes : dispatch.dashboard.setTopStatusCodes,
  setTopSeverity : dispatch.dashboard.setTopSeverity,
  setRulesPerMinute : dispatch.dashboard.setRulesPerMinute,
  setTimeRange : dispatch.dashboard.setTimeRange,
});

const Dashboard = (props) => {
  const uiContext = useContext(UIContext);
  const {charts} = useState({});

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
        if(value.length === 2){
            if(value[0] !== null && value[1] !== null){
                props.setTimeRange(value);
            }

        }

    }

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
                      data={{datasets: props.charts.topRules.data.datasets, labels: props.charts.topRules.data.labels.map(m => m + "-" +  mapRuleId(m).title)}}
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
      </Row>
    </div>
  );

};

export default connect(
    mapState,
    mapDispatch
)(Dashboard)