import { TUIContext, UIContext } from 'contexts/ui-context';
import React, { useContext, useEffect, useState } from 'react';
import {blockedAllowedDefinition, topRulesDefinition, topHostsDefinition, topStatusCodesDefinition, topSeverityDefinition, rulesPerMinuteDefinition} from 'charts/definitions';
import {connect} from "react-redux";
import {HorizontalBar, Bar, Doughnut, Line} from 'react-chartjs-2';
import {RootState} from "../../store";
import {mapRuleId} from "../../utils/owasp-mapping";
import {fetchData} from "../../services/service";
import {  Row, Col  } from "antd";

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
              <Bar
                  data={props.charts.blockedAllowed.data}
                  height={300}
                  width={100}
                  options={{
                      title: {
                          display: true,
                          text: "Blocked and Allowed Requests"
                      },
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
          </Col>
          <Col span={12}>
              <HorizontalBar
                  data={{datasets: props.charts.topRules.data.datasets, labels: props.charts.topRules.data.labels.map(m => mapRuleId(m).category)}}
                  height={300}
                  width={100}
                  options={{
                      title: {
                          display: true,
                          text: "Top Rules"
                      },
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
          </Col>
      </Row>
      <Row>
        <Col span={12}>
            <Doughnut
                data={props.charts.topHosts.data}
                height={300}
                width={100}
                options={{
                    title: {
                        display: true,
                        text: "Top Hosts"
                    },
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
                            gridLines: {
                                display: false
                            }
                        }]
                    },
                    maintainAspectRatio: false
                }}/>
        </Col>
        <Col span={12}>
            <Doughnut
                data={props.charts.topStatusCodes.data}
                height={300}
                width={100}
                options={{
                    title: {
                        display: true,
                        text: "Top Status Codes"
                    },
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
                            gridLines: {
                                display: false
                            }
                        }]
                    },
                    maintainAspectRatio: false
                }}/>
        </Col>
      </Row>
      <Row>
          <Col span={12}>
              <HorizontalBar
                  data={props.charts.topSeverity.data}
                  height={300}
                  width={100}
                  options={{
                      title: {
                          display: true,
                          text: "Top Severity"
                      },
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
          </Col>
          <Col span={12}>
              <Line
                  data={props.charts.rulesPerMinute.data}
                  height={300}
                  width={100}
                  options={{
                      maintainAspectRatio: false,
                      title: {
                          display: true,
                          text: "Rules Per Minute"
                      },
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
          </Col>
      </Row>
    </div>
  );

};

export default connect(
    mapState,
    mapDispatch
)(Dashboard)