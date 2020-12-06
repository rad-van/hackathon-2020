import { TUIContext, UIContext } from 'contexts/ui-context';
import React, { useContext, useEffect, useState } from 'react';
import {blockedAllowedDefinition, topRulesDefinition, topHostsDefinition, topStatusCodesDefinition, topSeverityDefinition, rulesPerMinuteDefinition} from 'charts/definitions';
import {connect} from "react-redux";
import {HorizontalBar, Bar, Doughnut, Line} from 'react-chartjs-2';
import {RootState} from "../../store";
import {mapRuleId} from "../../utils/owasp-mapping";
import {fetchData} from "../../services/service";
import {  Row, Col, Card  } from "antd";

const mapState = (state) => ({
  charts: state.dashboard.charts,
});

const mapDispatch = dispatch => ({
  setBlockedAllowedData: dispatch.dashboard.setBlockedAllowedData,
  setTopRules : dispatch.dashboard.setTopRules,
  setTopHosts : dispatch.dashboard.setTopHosts,
  setTopStatusCodes : dispatch.dashboard.setTopStatusCodes,
  setTopSeverity : dispatch.dashboard.setTopSeverity,
  setRulesPerMinute : dispatch.dashboard.setRulesPerMinute,
});

const Dashboard = (props) => {
  const uiContext = useContext(UIContext);
  const charts = useState({});

  useEffect(() => {
    uiContext.setTitle('Dashboard');
    uiContext.setSubTitle('General overview of your web application\'s security');
    fetchData(blockedAllowedDefinition, props.setBlockedAllowedData);
    fetchData(topRulesDefinition, props.setTopRules);
    fetchData(topHostsDefinition, props.setTopHosts);
    fetchData(topStatusCodesDefinition, props.setTopStatusCodes);
    fetchData(topSeverityDefinition, props.setTopSeverity);
    fetchData(rulesPerMinuteDefinition, props.setRulesPerMinute);

  }, charts);

  return (
    <div>
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