import { CheckCircleOutlined, CloudServerOutlined, DeploymentUnitOutlined, FileProtectOutlined, HourglassOutlined } from '@ant-design/icons';
import { Card, Col, Row, Spin, Steps } from 'antd';
import 'components/installation/install.scss';
import { TUIContext, UIContext } from 'contexts/ui-context';
import { useContext, useEffect } from 'react';

const { Step } = Steps;

const InstallDeploy = () => {
  const uiContext = useContext<TUIContext>(UIContext);

  useEffect(() => {
    uiContext.setTitle('Installation');
    uiContext.setSubTitle('Let\'s get your Web Application Firewall ready');
  });

  return (
    <>
      <div className="steps-container">
        <Steps current={2}>
          <Step title="Protected Web App" icon={<CloudServerOutlined />} />
          <Step title="Protection Rules" icon={<FileProtectOutlined />} />
          <Step title="Deploy" icon={<DeploymentUnitOutlined />} />
        </Steps>
      </div>

      <Row justify='center' className='mgb-20'>
        <Col span={8}>
          <Card title="Let's install your Web Application Firewall" className='progress-list'>
            <p><CheckCircleOutlined /> Install the firewall engine</p>
            <p><CheckCircleOutlined /> Download the OWASP Core Rule Set</p>
            <p><CheckCircleOutlined /> Download the Radware Advanced Rule Set</p>
            <p><Spin /> Configuring the firewall</p>
            <p><HourglassOutlined /> Start the monitoring application</p>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default InstallDeploy;
