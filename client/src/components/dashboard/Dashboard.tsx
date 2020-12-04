import { TUIContext, UIContext } from 'contexts/ui-context';
import React, { useContext, useEffect } from 'react';

function Dashboard() {
  const uiContext = useContext<TUIContext>(UIContext);

  useEffect(() => {
    uiContext.setTitle('Dashboard');
    uiContext.setSubTitle('General overview of your web application\'s security');
  });

  return (
    <div>Hello Dashboard</div>
  );
}

export default Dashboard;
