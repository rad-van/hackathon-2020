import { TUIContext, UIContext } from 'contexts/ui-context';
import React, { useContext, useEffect, useState } from 'react';
import {blockedAllowedDefinition, topRulesDefinition, topHostsDefinition, topStatusCodesDefinition, topSeverityDefinition, rulesPerMinuteDefinition} from 'charts/definitions';
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
  setTopHosts : dispatch.dashboard.setTopHosts,
  setTopStatusCodes : dispatch.dashboard.setTopStatusCodes,
  setTopSeverity : dispatch.dashboard.setTopSeverity,
  setRulesPerMinute : dispatch.dashboard.setRulesPerMinute,
  setTimeRange : dispatch.dashboard.setTimeRange,
});

const Dashboard = (props) => {
  const uiContext = useContext(UIContext);
  const {charts} = useState({});

  console.log(props.timeRange);
  useEffect(() => {
    uiContext.setTitle('Dashboard');
    uiContext.setSubTitle('General overview of your web application\'s security');
    fetchData(blockedAllowedDefinition, props.setBlockedAllowedData, props.timeRange);
    fetchData(topRulesDefinition, props.setTopRules, props.timeRange);
    fetchData(topHostsDefinition, props.setTopHosts, props.timeRange);
    fetchData(topStatusCodesDefinition, props.setTopStatusCodes, props.timeRange);
    fetchData(topSeverityDefinition, props.setTopSeverity, props.timeRange);
    fetchData(rulesPerMinuteDefinition, props.setRulesPerMinute, props.timeRange);

  }, [charts, props.timeRange]);

    function onChange(value, dateString) {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
    }

    function onOk(value) {
        if(value.length === 2){
            if(value[0] !== null && value[1] !== null){
                console.log('start: ', value[0].valueOf());
                console.log('end: ', value[1].valueOf());
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
                  onChange={onChange}
                  onOk={onOk}
              />
          </Col>

      </Row>
      <Row>
          <Col span={12}>
              <Card title="Blocked and Allowed Requests">
                  <Bar
                      data={props.charts.blockedAllowed.data}
                      height={300}
                      width={100}
                      options={{
                          legend: {
                              display: false,
                          },
                          scales: {
                              xAxes: [{
                                  gridLines: {
                                      display: false
                                  }
                              }],
                              yAxes: [{
                                  gridLines: {
                                      display: false
                                  },
                                  ticks: {
                                      beginAtZero: true
                                  }
                              }]
                          },
                          maintainAspectRatio: false
                      }}
                  />
              </Card>

          </Col>
          <Col span={12}>
              <Card title="Top Rules">
              <HorizontalBar
                  data={{datasets: props.charts.topRules.data.datasets, labels: props.charts.topRules.data.labels.map(m => mapRuleId(m).category)}}
                  height={300}
                  width={100}
                  options={{
                      legend: {
                          display: false,
                      },
                      scales: {
                          xAxes: [{
                              gridLines: {
                                  display: false
                              }
                          }],
                          yAxes: [{
                              ticks: {
                                  autoSkip: false,
                                  fontFamily: 'Roboto, Areal, sans-serif',
                              },
                              gridLines: {
                                  display: false
                              }
                          }]
                      },
                      maintainAspectRatio: false
                  }}
              />
              </Card>
          </Col>
      </Row>
      <Row>
        <Col span={12}>
            <Card title="Top Hosts">
            <Doughnut
                data={props.charts.topHosts.data}
                height={300}
                width={100}
                options={{
                    legend: {
                        position: "left",
                    },
                    scales: {
                        xAxes: [{
                            display: false,
                            gridLines: {
                                display: false
                            }
                        }],
                        yAxes: [{
                            display: false,
                            gridLines: {
                                display: false
                            }
                        }]
                    },
                    maintainAspectRatio: false
                }}/>
            </Card>
        </Col>
        <Col span={12}>
            <Card title="Top Status Codes">
            <Doughnut
                data={props.charts.topStatusCodes.data}
                height={300}
                width={100}
                options={{
                    legend: {
                        position: "left",
                    },
                    scales: {
                        xAxes: [{
                            display: false,
                            gridLines: {
                                display: false
                            }
                        }],
                        yAxes: [{
                            display: false,
                            gridLines: {
                                display: false
                            }
                        }]
                    },
                    maintainAspectRatio: false
                }}/>
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
                  options={{
                      legend: {
                          display: false,
                      },
                      scales: {
                          xAxes: [{
                              gridLines: {
                                  display: false
                              }
                          }],
                          yAxes: [{
                              gridLines: {
                                  display: false
                              }
                          }]
                      },
                      maintainAspectRatio: false
                  }}
              />
              </Card>
          </Col>
          <Col span={12}>
              <Card title="Requests Per Minute">
              <Line
                  data={props.charts.rulesPerMinute.data}
                  height={300}
                  width={100}
                  options={{
                      maintainAspectRatio: false,
                      legend: {
                          display: false
                      },
                      scales: {
                          xAxes: [{
                              gridLines: {
                                  display: false
                              },
                              type: 'time',
                              time: {
                                  unit: 'minute'
                              },
                              distribution: 'series'
                          }],
                          yAxes: [{
                              gridLines: {
                                  display: false
                              },
                              ticks: {
                                  beginAtZero: true
                              }
                          }]
                      }
                  }}
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