import { TUIContext, UIContext } from 'contexts/ui-context';
import React, { useContext, useEffect } from 'react';
import {fetchData} from "../../services/service";
import {Table} from "antd";

const Audit = (props) => {
  const uiContext = useContext(UIContext);

  useEffect(() => {
    uiContext.setTitle('Audit');
    uiContext.setSubTitle('Inspect your web application security in depth');
    //fetchData(rulesPerMinuteDefinition, props.setRulesPerMinute, props.timeRange);
  });

  return (
    <div>
      <div>Hello Audit</div>
      <Table dataSource={[]} columns={[]} rowKey='unique_id' pagination={false} size="small" />
    </div>
  );
}

export default Audit;
