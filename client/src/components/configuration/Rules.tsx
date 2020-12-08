import { TUIContext, UIContext } from 'contexts/ui-context';
import React, { useContext, useEffect } from 'react';
import {Button, Col, Row, Space, Switch, Table} from 'antd';

const Rules: React.FunctionComponent = () => {
  const uiContext = useContext<TUIContext>(UIContext);

  const columns = [
    {
      title: 'Rule',
      dataIndex: 'rule',
    },
    {
      title: 'Type',
      dataIndex: 'type',
    },
    {
      title: 'Rule Group',
      dataIndex: 'group',
    },
    {
      title: 'Rule Group',
      dataIndex: 'group',
    },
    {
      title: 'Enabled',
      dataIndex: 'enabled',
      render: (e: any, record: any) => (< Switch defaultChecked={e} />)
    },
  ];


  const data = [
    {
      rule: 'INITIALIZATION',
      group: '901',
      type: 'Request',
      enabled: true
    },
    {
      rule: 'DRUPAL-EXCLUSION-RULES',
      group: '903.9001',
      type: 'Request',
      enabled: true
    },
    {
      rule: 'WORDPRESS-EXCLUSION-RULES',
      group: '903.9002',
      type: 'Request',
      enabled: true
    },
    {
      rule: 'NEXTCLOUD-EXCLUSION-RULES',
      group: '903.9003',
      type: 'Request',
      enabled: true
    },
    {
      rule: 'DOKUWIKI-EXCLUSION-RULES',
      group: '903.9004',
      type: 'Request',
      enabled: true
    },
    {
      rule: 'CPANEL-EXCLUSION-RULES',
      group: '903.9005',
      type: 'Request',
      enabled: true
    },
    {
      rule: 'COMMON-EXCEPTIONS',
      group: '905',
      type: 'Request',
      enabled: true
    },
    {
      rule: 'IP-REPUTATION',
      group: '910',
      type: 'Request',
      enabled: true
    },
    {
      rule: 'METHOD-ENFORCEMENT',
      group: '911',
      type: 'Request',
      enabled: true
    },
    {
      rule: 'DOS-PROTECTIONT',
      group: '912',
      type: 'Request',
      enabled: true
    },
    {
      rule: 'SCANNER-DETECTION',
      group: '913',
      type: 'Request',
      enabled: true
    },
    {
      rule: 'PROTOCOL-ENFORCEMENT',
      group: '920',
      type: 'Request',
      enabled: true
    },
    {
      rule: 'PROTOCOL-ENFORCEMENT',
      group: '920',
      type: 'Request',
      enabled: true
    },
    {
      rule: 'PROTOCOL-ENFORCEMENT',
      group: '920',
      type: 'Request',
      enabled: true
    },
    {
      rule: 'PROTOCOL-ENFORCEMENT',
      group: '920',
      type: 'Request',
      enabled: true
    },
    {
      rule: 'PROTOCOL-ATTACK',
      group: '921',
      type: 'Request',
      enabled: true
    },
    {
      rule: 'APPLICATION-ATTACK-LFIT',
      group: '930',
      type: 'Request',
      enabled: true
    },
    {
      rule: 'APPLICATION-ATTACK-RFI',
      group: '931',
      type: 'Request',
      enabled: true
    },
    {
      rule: 'APPLICATION-ATTACK-RCE',
      group: '932',
      type: 'Request',
      enabled: true
    },
    {
      rule: 'APPLICATION-ATTACK-PHP',
      group: '933',
      type: 'Request',
      enabled: true
    },
    {
      rule: 'APPLICATION-ATTACK-XSS',
      group: '941',
      type: 'Request',
      enabled: true
    },
    {
      rule: 'APPLICATION-ATTACK-SQLI',
      group: '942',
      type: 'Request',
      enabled: true
    },
    {
      rule: 'APPLICATION-ATTACK-SESSION-FIXATION',
      group: '943',
      type: 'Request',
      enabled: true
    },
    {
      rule: 'APPLICATION-ATTACK-JAVA',
      group: '944',
      type: 'Request',
      enabled: true
    },
    {
      rule: 'BLOCKING-EVALUATION',
      group: '949',
      type: 'Request',
      enabled: true
    },
    {
      rule: 'DATA-LEAKAGES',
      group: '950',
      type: 'Response',
      enabled: true
    },
    {
      rule: 'DATA-LEAKAGES-SQL',
      group: '951',
      type: 'Response',
      enabled: true
    },
    {
      rule: 'DATA-LEAKAGES-JAVA',
      group: '952',
      type: 'Response',
      enabled: true
    },
    {
      rule: 'DATA-LEAKAGES-PHP',
      group: '953',
      type: 'Response',
      enabled: true
    },
    {
      rule: 'DATA-LEAKAGES-IIS',
      group: '954',
      type: 'Response',
      enabled: true
    },
    {
      rule: 'LOCKING-EVALUATION',
      group: '959',
      type: 'Response',
      enabled: true
    },
    {
      rule: 'CORRELATION',
      group: '980',
      type: 'Response',
      enabled: true
    },
  ];

  useEffect(() => {
    uiContext.setTitle('Rules');
    uiContext.setSubTitle('Fine tune your firewall rules');
  });

  return (
      <div>
        <div>List of OWASP Top 10 rules to enable/disable</div>
        <Row>
          <Col span={6} offset={18}>
            <Space>
              <Button type="primary">Add New Rule</Button>
              <Button type="primary">Purchase Radware Rule Set</Button>
            </Space>
          </Col>
        </Row>

        <Table columns={columns} dataSource={data} pagination={{defaultPageSize: 10, showSizeChanger: true}}/>
      </div>


  );
}

export default Rules;
