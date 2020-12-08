import { CloudServerOutlined, DeploymentUnitOutlined, FileProtectOutlined } from '@ant-design/icons';
import { Card, Col, Row, Steps, Switch } from 'antd';
import 'components/installation/install.scss';
import { TUIContext, UIContext } from 'contexts/ui-context';
import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

const { Step } = Steps;

const InstallRulesets = () => {
  const uiContext = useContext<TUIContext>(UIContext);

  useEffect(() => {
    uiContext.setTitle('Installation');
    uiContext.setSubTitle('Let\'s get your Web Application Firewall ready');
  });

  return (
    <>
      <div className="steps-container">
        <Steps current={1}>
          <Step title="Protected Web App" icon={<CloudServerOutlined />} />
          <Step title="Protection Rules" icon={<FileProtectOutlined />} />
          <Step title="Deploy" icon={<DeploymentUnitOutlined />} />
        </Steps>
      </div>

      <Row justify='center' className='mgb-20'>
        <Col span={8}>
          <Card title='Security Rules'>
            Select what security rule sets you want to enable in you firewall.
          </Card>
        </Col>
      </Row>

      <Row justify='center' className='mgb-20'>
        <Col span={8}>
          <Card>
            <Switch className='toggle' defaultChecked />
            <h3>OWASP Core Rule Set</h3>
            <p>The OWASP Core Rule Set (CRS) is a set of generic attack detection rules that aims to protect web applications from a wide range of attacks, including the OWASP Top Ten, with a minimum of false alerts.</p>
          </Card>
        </Col>
      </Row>

      <Row justify='center' className='mgb-20'>
        <Col span={8}>
          <Card>
            <Switch className='toggle' defaultChecked />
            <h3>Radware Advanced Rule Set</h3>
            <p>The Radware Advanced Rule Set provides an additional layer of security with professional rules covering advanced attacks and zero-day attack protection.</p>
          </Card>
        </Col>
      </Row>

      <Row justify='center' className='next-step'>
        <Col span={8}>
          <Card>
            <Link to='/install/deploy' className='ant-btn ant-btn-primary ant-btn-lg'>Next</Link>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default InstallRulesets;
