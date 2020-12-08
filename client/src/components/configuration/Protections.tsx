import { TUIContext, UIContext } from 'contexts/ui-context';
import React, { useContext, useEffect } from 'react';

const Protections: React.FunctionComponent = () => {
  const uiContext = useContext<TUIContext>(UIContext);

  useEffect(() => {
    uiContext.setTitle('Web Applications');
    uiContext.setSubTitle('Protect your web applications');
  });

  return (
    <div>List of web applications</div>
  );
}

export default Protections;
