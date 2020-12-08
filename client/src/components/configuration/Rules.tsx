import { TUIContext, UIContext } from 'contexts/ui-context';
import React, { useContext, useEffect } from 'react';

const Rules: React.FunctionComponent = () => {
  const uiContext = useContext<TUIContext>(UIContext);

  useEffect(() => {
    uiContext.setTitle('Rules');
    uiContext.setSubTitle('Fine tune your firewall rules');
  });

  return (
    <div>List of rules to enable/disable</div>
  );
}

export default Rules;
