import { TUIContext, UIContext } from 'contexts/ui-context';
import React, { useContext, useEffect } from 'react';

function Audit() {
  const uiContext = useContext<TUIContext>(UIContext);

  useEffect(() => {
    uiContext.setTitle('Audit');
    uiContext.setSubTitle('Inspect your web application security in depth');
  });

  return (
    <div>Hello Audit</div>
  );
}

export default Audit;
