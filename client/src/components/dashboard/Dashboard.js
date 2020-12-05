import { TUIContext, UIContext } from 'contexts/ui-context';
import React, { useContext, useEffect, useState } from 'react';
import {blockedAllowedDefinition, topRulesDefinition, topHostsDefinition, topStatusCodesDefinition, topSeverityDefinition, rulesPerMinuteDefinition} from 'charts/definitions';
import {connect} from "react-redux";
import {HorizontalBar, Bar, Doughnut, Line} from 'react-chartjs-2';
import {RootState} from "../../store";
import {mapRuleId} from "../../utils/owasp-mapping";

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
    fetchBlockedAllowedData();
    fetchTopRules();
    fetchTopHosts();
    fetchTopStatusCodes();
    fetchTopSeverity();
    fetchRulesPerMinute();
  }, charts);

  const fetchBlockedAllowedData = () => {

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(blockedAllowedDefinition),
    };

    console.log(requestOptions);
    fetch('http://localhost:8088/history', requestOptions)
        .then((resp) => resp.json().then((body) => {
          console.log(body);
          props.setBlockedAllowedData(body)
        }));
  };

    const fetchTopRules = () => {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(topRulesDefinition),
        };

        console.log(requestOptions);
        fetch('http://localhost:8088/history', requestOptions)
            .then((resp) => resp.json().then((body) => {
                console.log(body);
                props.setTopRules(body)
            }));
    };

    const fetchTopHosts = () => {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(topHostsDefinition),
        };

        console.log(requestOptions);
        fetch('http://localhost:8088/history', requestOptions)
            .then((resp) => resp.json().then((body) => {
                console.log(body);
                props.setTopHosts(body)
            }));
    };

    const fetchTopStatusCodes = () => {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(topStatusCodesDefinition),
        };

        console.log(requestOptions);
        fetch('http://localhost:8088/history', requestOptions)
            .then((resp) => resp.json().then((body) => {
                console.log(body);
                props.setTopStatusCodes(body)
            }));
    };
    const fetchTopSeverity = () => {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(topSeverityDefinition),
        };

        console.log(requestOptions);
        fetch('http://localhost:8088/history', requestOptions)
            .then((resp) => resp.json().then((body) => {
                console.log(body);
                props.setTopSeverity(body)
            }));
    };

    const fetchRulesPerMinute = () => {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(rulesPerMinuteDefinition),
        };

        console.log(requestOptions);
        fetch('http://localhost:8088/history', requestOptions)
            .then((resp) => resp.json().then((body) => {
                console.log(body);
                props.setRulesPerMinute(body)
            }));
    };

  return (
    <div>Hello Dashboard
      <div>
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
              maintainAspectRatio: false
          }}
      />
      </div>
      <div>
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
                maintainAspectRatio: false
            }}
        />
      </div>

      <div>
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
                  maintainAspectRatio: false
              }}/>
      </div>
      <div>
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
                maintainAspectRatio: false
            }}/>
       </div>
       <div>
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
                maintainAspectRatio: false
            }}
         />
       </div>
       <div>
            <Line
                data={props.charts.rulesPerMinute.data}
                height={100}
                width={100}
                options={{
                    responsive: true,
                    legend: {
                        display: false
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }],
                        xAxes: [{
                            type: 'time',
                            time: {
                                unit: 'minute'
                            }
                        }]
                    }
                }}
            />
       </div>
    </div>
  );

};

export default connect(
    mapState,
    mapDispatch
)(Dashboard)