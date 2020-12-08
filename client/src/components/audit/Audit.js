import { TUIContext, UIContext } from 'contexts/ui-context';
import React, { useContext, useEffect, useState } from 'react';
import {Col, DatePicker, Row, Table, Tag, Tooltip, Card} from "antd";
import {auditLogDefinition} from "../../charts/definitions";
import {fetchRawData} from "../../services/service";
import moment from "moment";
import {connect} from "react-redux";

const { RangePicker } = DatePicker;
const mapState = (state) => ({
    dataSource: state.audit.dataSource,
    timeRange: state.audit.timeRange,
});

const mapDispatch = (dispatch) => ({
    setData : dispatch.audit.setData,
    setTimeRange : dispatch.audit.setTimeRange,
});

const Audit = (props) => {
  const uiContext = useContext(UIContext);
  const {data} = useState({date: []});

  const columns = [
    {
        title: 'Date & Time',
        dataIndex: 'time_stamp',
        render: (_, doc) => moment(doc._source.time_stamp).format('ll LTS'),
    },
    {
        title: 'Source',
        dataIndex: 'client_ip',
        render: (_, doc) => `${doc._source.client_ip}:${doc._source.client_port}`,
        filtered: true,
    },
    {
        title: 'URL',
        dataIndex: ['request', 'uri'],
        ellipsis: {
            showTitle: false,
        },
        render: (_, doc) => <Tooltip title={doc._source.request.uri} placement="topLeft">{doc._source.request.uri}</Tooltip>
    },
    {
        title: 'Response Code',
        dataIndex: ['response', 'http_code'],
        render: (_, doc) => doc._source.response.http_code,
        filtered: true,
    },
    {
        title: 'Severity',
        dataIndex: ['message', 'message', 'details', 'severity'],
        render: (_, doc) => doc._source.message ? doc._source.message.details.severity : 'None',
    },
    {
        title: 'Rule ID',
        dataIndex: ['message', 'message', 'details', 'ruleId'],
        //render: (_, doc) => doc._source.message? doc._source.message.details.ruleId : 'None',
    },
  ];

    function onOk(value) {
        if(value.length === 2){
            if(value[0] !== null && value[1] !== null){
                props.setTimeRange(value);
            }

        }
    }

  useEffect(() => {
    uiContext.setTitle('Audit');
    uiContext.setSubTitle('Inspect your web application security in depth');
    console.log(props.timeRange);
    fetchRawData(auditLogDefinition, props.setData, props.timeRange);
  }, [data, props.timeRange]);

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
      <Table dataSource={props.dataSource.data ? props.dataSource.data : []} columns={columns} rowKey={record => record._id}
             expandable={{
                 expandedRowRender: record =>
                     <Card><p style={{ margin: 50 }}>
                         Host IP: {record._source.host_ip}<br/>
                         Message: {record._source.message.message}<br/>
                         Rule Data: {record._source.message.details.data}<br/>
                         Rule Conf File: {record._source.message.details.file}<br/>
                     </p></Card>
                ,
                 rowExpandable: record => record._source.message
             }}
             pagination={{defaultPageSize: 25, showSizeChanger: true}} />
    </div>
  );
}

export default connect(mapState, mapDispatch)(Audit);
