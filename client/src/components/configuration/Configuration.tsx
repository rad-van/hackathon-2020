import { TUIContext, UIContext } from 'contexts/ui-context';
import React, { useContext, useEffect } from 'react';

function Configuration() {
  const uiContext = useContext<TUIContext>(UIContext);

  useEffect(() => {
    uiContext.setTitle('Configuration');
    uiContext.setSubTitle('Fine-tune your web application firewall');
  });

  return (
    <div>Hello Configuration</div>
  );
}

export default Configuration;
