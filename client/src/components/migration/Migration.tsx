import { TUIContext, UIContext } from 'contexts/ui-context';
import React, { useContext, useEffect } from 'react';

const Migration: React.FunctionComponent = () => {
  const uiContext = useContext<TUIContext>(UIContext);

  useEffect(() => {
    uiContext.setTitle('Migration');
    uiContext.setSubTitle("Upgrade your firewall to Radware's professional WAF");
  });

  return (
    <div>Hello Migration</div>
  );
}

export default Migration;
