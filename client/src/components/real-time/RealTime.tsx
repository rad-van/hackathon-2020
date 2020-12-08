import { Table, Tag, Tooltip } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { TUIContext, UIContext } from 'contexts/ui-context';
import moment from 'moment';
import React, { useContext, useEffect } from 'react';
import { connect } from 'react-redux';
import { RootState } from 'store';
import { AuditDocument } from 'store/types/audit-document';
import { mapRuleId } from 'utils/owasp-mapping';

const mapState = (state: RootState) => ({
  requests: state.realTime.auditDocuments.filter(ad => ad.status === 'Blocked').slice(0, 10),
});

type Props = ReturnType<typeof mapState>;

const columns: ColumnsType<AuditDocument> = [
  {
    title: 'Date & Time',
    dataIndex: 'time_stamp',
    render: ts => moment(ts).format('ll LTS'),
  },
  {
    title: 'Source',
    dataIndex: 'client_ip',
    render: (client_ip, doc) => (doc.request.headers['55555'] ? doc.request.headers['55555'] : client_ip),
    filtered: true,
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
    title: 'Status Code',
    dataIndex: ['response', 'http_code'],
  },
  {
    title: 'Attacks',
    dataIndex: ['messages'],
    render: (_, doc) => {
      const titles: { [key: string]: string } = {};
      const tags = doc.messages
        .map(m => mapRuleId(m.details.ruleId))
        .filter(r => r.display && r.tagText)
        .map((r) => {
          titles[r.tagText!] = r.title;
          return r.tagText!;
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

const RealTimeRaw = ({ requests }: Props) => {
  const uiContext = useContext<TUIContext>(UIContext);

  useEffect(() => {
    uiContext.setTitle('Real Time');
    uiContext.setSubTitle('See what\'s happening right now on your web application');
  });

  return (
    <>
      <Table dataSource={requests} columns={columns} rowKey='unique_id' pagination={false} size="small" />
    </>
  );
};

export default connect(mapState)(RealTimeRaw);
