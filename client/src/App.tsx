import { TrademarkOutlined, DollarCircleOutlined, DashboardOutlined, FieldTimeOutlined, FundViewOutlined, SettingOutlined } from '@ant-design/icons';
import { Layout, Menu, PageHeader } from 'antd';
import 'App.less';
import Audit from 'components/audit/Audit';
import Configuration from 'components/configuration/Configuration';
import Migration from 'components/migration/Migration';
import Upgrade from 'components/upgrade/Upgrade';
import Dashboard from 'components/dashboard/Dashboard';
import RealTime from 'components/real-time/RealTime';
import { UIContext, UIContextProvider } from 'contexts/ui-context';
import logo from 'logo.svg';
// import { ReactComponent as FireWafLogo } from 'radware.svg';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import io from 'socket.io-client';
import { store } from 'store';

const { Content, Sider } = Layout;

const App: React.FunctionComponent = () => {
  useEffect(() => {
    const backend_host = process.env.REACT_APP_BACKEND_HOST || 'localhost';
    const socket = io(`http://${backend_host}:8088`);
    socket.on('auditLog', (m: any) => {
      store.dispatch.realTime.addAuditDocument(m);
    });

    return () => {
      socket.close();
    };
  }, []);

  return (
    <BrowserRouter>
      <Provider store={store}>
        <UIContextProvider>
          <Layout style={{ minHeight: '100vh' }}>
            <Sider className="menu-sider" width={300}>
              <div className="firewaf-title">
                <img src={logo} style={{height:'70px'}} alt={'Radware'}/>
                <div>
                  <h3>WAF Lite</h3>
                </div>
              </div>

              <Menu
                style={{ width: '100%' }}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                className="main-menu"
              >
                <Menu.Item key={`/`} icon={<DashboardOutlined />}>
                  <Link to={`/`}>Dashboard</Link>
                </Menu.Item>
                <Menu.Item key={`/real-time`} icon={<FieldTimeOutlined />}>
                  <Link to={`/real-time`}>Real Time</Link>
                </Menu.Item>
                <Menu.Item key={`/audit`} icon={<FundViewOutlined />}>
                  <Link to={`/audit`}>Audit</Link>
                </Menu.Item>
                <Menu.Item key={`/configuration`} icon={<SettingOutlined />}>
                  <Link to={`/configuration`}>Configuration</Link>
                </Menu.Item>
                <Menu.Item key={`/migration`} icon={<TrademarkOutlined />}>
                  <Link to={`/migration`}>Migration</Link>
                </Menu.Item>
                <Menu.Item key={`/upgrade`} icon={<DollarCircleOutlined />}>
                  <Link to={`/upgrade`}>Upgrade</Link>
                </Menu.Item>
              </Menu>
            </Sider>

            <Content>
              <Layout style={{ minHeight: '100vh' }}>
                <UIContext.Consumer>
                  {({ title, subTitle }) => (
                    <PageHeader
                      className="global-page-header"
                      backIcon={false}
                      title={title}
                      subTitle={subTitle}
                    />
                  )}
                </UIContext.Consumer>

                <Content className="main-content">
                  <Switch>
                    <Route path="/upgrade" component={Upgrade}/>
                    <Route path="/real-time" component={RealTime} />
                    <Route path="/audit" component={Audit} />
                    <Route path="/configuration" component={Configuration} />
                    <Route path="/migration" component={Migration} />
                    <Route path="/" component={Dashboard} />
                  </Switch>
                </Content>
              </Layout>
            </Content>
          </Layout>
        </UIContextProvider>
      </Provider>
    </BrowserRouter>
  );
};

export default App;
