import { TUIContext, UIContext } from 'contexts/ui-context';
import React, { useContext, useEffect } from 'react';
import {ColumnsType} from "antd/es/table";
import {ProtectedEntityDocument} from "../../store/types/protected-entity-document";
import {Switch, Table} from "antd";
// import {Card, Col, Row, Table, Tag, Tooltip} from "antd";
// import {mapRuleId} from "../../utils/owasp-mapping";
// import {fetchRawData} from "../../services/service";
// import {auditLogDefinition} from "../../charts/definitions";

const static_data = [
  {
    name: 'radware.buzz',
    ip: '11.61.16.6',
    port: 443,
    protocol: 'HTTPS',
    enabled: true,
  },
  {
    name: 'github.army',
    ip: '116.611.161.6',
    port: 443,
    protocol: 'HTTPS',
    enabled: true,
  },
  {
    name: 'hiho.io',
    ip: '77.77.1.1',
    port: 80,
    protocol: 'HTTP',
    enabled: true,
  },
];

const Protections: React.FunctionComponent = () => {
  const uiContext = useContext<TUIContext>(UIContext);

  useEffect(() => {
    uiContext.setTitle('Web Applications');
    uiContext.setSubTitle('Protect your web applications');
  });

  const columns: ColumnsType<ProtectedEntityDocument> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'IP',
      dataIndex: 'ip',
      key: 'ip',
    },
    {
      title: 'Port',
      dataIndex: 'port',
      key: 'port',
    },
    {
      title: 'Protocol',
      dataIndex: 'protocol',
      key: 'protocol',
    },
    {
      title: 'Enabled',
      dataIndex: 'enabled',
      render: (e: any, record: any) => (< Switch defaultChecked={e} />)
    },

  ];


  return (
      <div>
        <Table dataSource={static_data} columns={columns} rowKey='name'/>
      </div>
  );

};

export default Protections;
