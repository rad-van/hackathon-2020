import { TUIContext, UIContext } from 'contexts/ui-context';
import React, { useContext, useEffect } from 'react';

const Settings: React.FunctionComponent = () => {
  const uiContext = useContext<TUIContext>(UIContext);

  useEffect(() => {
    uiContext.setTitle('Settings');
    uiContext.setSubTitle('Configure the WAF appliance');
  });

  return (
    <div>Tune the host and nginx</div>
  );
}

export default Settings;
