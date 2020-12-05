import { TUIContext, UIContext } from 'contexts/ui-context';
import React, { useContext, useEffect, useState } from 'react';
import {blockedAllowedDefinition} from 'charts/definitions';
import {connect} from "react-redux";
import {HorizontalBar} from 'react-chartjs-2';
import {RootState} from "../../store";

const mapState = (state) => ({
  charts: state.dashboard.charts,
});

const mapDispatch = dispatch => ({
  setBlockedAllowedData: dispatch.dashboard.setBlockedAllowedData,
});

const Dashboard = (props) => {
  const uiContext = useContext(UIContext);
  const charts = useState({});

  useEffect(() => {
    uiContext.setTitle('Dashboard');
    uiContext.setSubTitle('General overview of your web application\'s security');
    fetchBlockedAllowedData();
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

  return (
    <div>Hello Dashboard
      <div><HorizontalBar
          data={props.charts.blockedAllowed.data}
          height={100}
          width={100}
          options={{
          legend: {
              display: false,
          },
          maintainAspectRatio: false
          }}
      /></div>
    </div>
  );

};

export default connect(
    mapState,
    mapDispatch
)(Dashboard)