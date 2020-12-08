import { DollarCircleOutlined, DashboardOutlined, FieldTimeOutlined, FundViewOutlined, SettingOutlined, BarsOutlined, ControlOutlined, FileProtectOutlined } from '@ant-design/icons';
import { Layout, Menu, PageHeader } from 'antd';
import 'App.less';
import Audit from 'components/audit/Audit';
import Protections from 'components/configuration/Protections';
import Rules from 'components/configuration/Rules';
import Settings from 'components/configuration/Settings';
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
                <Menu.SubMenu key="config" icon={<SettingOutlined />} title="Configuration">
                  <Menu.Item key={`/protections`} icon={<FileProtectOutlined />}>
                    <Link to={`/protections`}>Protected Web Apps</Link>
                  </Menu.Item>
                  <Menu.Item key={`/rules`} icon={<BarsOutlined />}>
                    <Link to={`/rules`}>Rules</Link>
                  </Menu.Item>
                  <Menu.Item key={`/settings`} icon={<ControlOutlined />}>
                    <Link to={`/settings`}>Settings</Link>
                  </Menu.Item>
                </Menu.SubMenu>
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
                    <Route path="/protections" component={Protections} />
                    <Route path="/rules" component={Rules} />
                    <Route path="/settings" component={Settings} />
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
