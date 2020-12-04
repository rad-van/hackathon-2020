import { TUIContext, UIContext } from 'contexts/ui-context';
import React, { useContext, useEffect } from 'react';

function RealTime() {
  const uiContext = useContext<TUIContext>(UIContext);

  useEffect(() => {
    uiContext.setTitle('Real Time');
    uiContext.setSubTitle('See what\'s happening right now on your web application');
  });

  return (
    <div>Hello Real Time</div>
  );
}

export default RealTime;
