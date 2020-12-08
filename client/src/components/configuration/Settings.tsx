import { TUIContext, UIContext } from 'contexts/ui-context';
import { Form, Select, InputNumber, Switch, Button } from 'antd';
import React, { useContext, useEffect } from 'react';
const { Option } = Select;

const Settings: React.FunctionComponent = () => {
  const uiContext = useContext<TUIContext>(UIContext);

  useEffect(() => {
    uiContext.setTitle('Settings');
    uiContext.setSubTitle('Configure the WAF Proxy');
  });

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8 },
  };
  const tailLayout = {
    wrapperCol: { offset: 4, span: 8 },
  };

  return (
    <Form {...layout} >
      <Form.Item label="Number of Threads" >
        <Select defaultValue="auto">
          <Option value="auto">Auto</Option>
          <Option value="1">1</Option>
          <Option value="2">2</Option>
          <Option value="4">4</Option>
          <Option value="8">8</Option>
        </Select>
      </Form.Item>
      <Form.Item label="Connections Per Thread">
        <InputNumber min={1024} max={8192} step={1024} defaultValue={4096} />
      </Form.Item>
      <Form.Item label="Log level">
        <Select defaultValue="warn">
          <Option value="warn">Warning</Option>
          <Option value="error">Error</Option>
          <Option value="crit">Critical</Option>
          <Option value="alert">Alert</Option>
          <Option value="emerg">Emergency</Option>
        </Select>
      </Form.Item>
      <Form.Item label="Check Response Bodies">
        <Switch defaultChecked />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default Settings;
