import { TUIContext, UIContext } from 'contexts/ui-context';
import React, { useContext, useEffect } from 'react';

const Upgrade: React.FunctionComponent = () => {
    const uiContext = useContext<TUIContext>(UIContext);

    useEffect(() => {
        uiContext.setTitle('Upgrade');
        uiContext.setSubTitle("Upgrade your firewall to Radware's professional WAF");
    });

    return (
        <div><a href='https://www.radware.com/products/appwall' target='_blank'>Upgrade to Professional Radware Products</a></div>
    );
};

export default Upgrade;
