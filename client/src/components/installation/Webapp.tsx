import { CloudServerOutlined, DeploymentUnitOutlined, FileProtectOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Col, Form, Input, Row, Steps } from 'antd';
import 'components/installation/install.scss';
import { TUIContext, UIContext } from 'contexts/ui-context';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const { Step } = Steps;

const InstallWebapp = () => {
  const uiContext = useContext<TUIContext>(UIContext);
  const [ipNumber, setIpNumber] = useState(1);

  useEffect(() => {
    uiContext.setTitle('Installation');
    uiContext.setSubTitle('Let\'s get your Web Application Firewall ready');
  });

  const renderInputs = () => {
    const inputs = [];

    for (let i = 0; i < ipNumber; i++) {
      inputs.push((
        <Form.Item>
          <Input addonBefore={`IP Address ${ipNumber > 1 ? i + 1 : ''}`} />
        </Form.Item>
      ));
    }

    return inputs;
  };

  const addInput = () => {
    setIpNumber(ipNumber + 1);
  };

  return (
    <>
      <div className="steps-container">
        <Steps current={0}>
          <Step title="Protected Web App" icon={<CloudServerOutlined />} />
          <Step title="Protection Rules" icon={<FileProtectOutlined />} />
          <Step title="Deploy" icon={<DeploymentUnitOutlined />} />
        </Steps>
      </div>

      <Row justify='center' className='mgb-20'>
        <Col span={8}>
          <Card title="What website would you like to protect?">
            <p>Enter the domain name of the website you want to protect.</p>

            <Form>
              <Input placeholder='my-awesome-website.com' />
            </Form>
          </Card>
        </Col>
      </Row>

      <Row justify='center' className='mgb-20'>
        <Col span={8}>
          <Card title="What servers would you like to protect?">
            <p>Enter the IP address of the website you'd like to protect. It can be the IP of the server running your application, or the IP of your load balancer if you have one.</p>
            <p>If you have multiple server running your application, use the <PlusOutlined /> button to add more IPs.</p>

            <Form>
              {renderInputs()}
            </Form>

            <div className="add-ip">
              <Button type="primary" shape="circle" icon={<PlusOutlined />} size='large' onClick={addInput} />
            </div>
          </Card>
        </Col>
      </Row>

      <Row justify='center' className='next-step'>
        <Col span={8}>
          <Card>
            <Link to='/install/rulesets' className='ant-btn ant-btn-primary ant-btn-lg'>Next</Link>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default InstallWebapp;
