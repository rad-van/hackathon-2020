import { DashboardOutlined, FieldTimeOutlined, FundViewOutlined, SettingOutlined, TrademarkOutlined } from '@ant-design/icons';
import { Layout, Menu, PageHeader } from 'antd';
import 'App.less';
import Audit from 'components/audit/Audit';
import Configuration from 'components/configuration/Configuration';
import Migration from 'components/migration/Migration';
import Dashboard from 'components/dashboard/Dashboard';
import RealTime from 'components/real-time/RealTime';
import { UIContext, UIContextProvider } from 'contexts/ui-context';
import { ReactComponent as FireWafLogo } from 'firewaf.svg';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import io from 'socket.io-client';
import { store } from 'store';

const { Content, Sider } = Layout;

const App: React.FunctionComponent = () => {
  useEffect(() => {
    const socket = io('http://localhost:8088');
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
                <FireWafLogo />
                <h1>Radware FireWAF</h1>
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

                {/*            <SubMenu key="sub1" icon={<DashboardOutlined />} title="Navigation One">
                <Menu.ItemGroup key="g1" title="Item 1">
                  <Menu.Item key="1">Option 1</Menu.Item>
                  <Menu.Item key="2">Option 2</Menu.Item>
                </Menu.ItemGroup>
                <Menu.ItemGroup key="g2" title="Item 2">
                  <Menu.Item key="3">Option 3</Menu.Item>
                  <Menu.Item key="4">Option 4</Menu.Item>
                </Menu.ItemGroup>
              </SubMenu>
              <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
                <Menu.Item key="5">Option 5</Menu.Item>
                <Menu.Item key="6">Option 6</Menu.Item>
                <SubMenu key="sub3" title="Submenu">
                  <Menu.Item key="7">Option 7</Menu.Item>
                  <Menu.Item key="8">Option 8</Menu.Item>
                </SubMenu>
              </SubMenu>
              <SubMenu key="sub4" icon={<SettingOutlined />} title="Navigation Three">
                <Menu.Item key="9">Option 9</Menu.Item>
                <Menu.Item key="10">Option 10</Menu.Item>
                <Menu.Item key="11">Option 11</Menu.Item>
                <Menu.Item key="12">Option 12</Menu.Item>
              </SubMenu>*/}
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
