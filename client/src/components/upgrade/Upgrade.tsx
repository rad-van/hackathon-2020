import { TUIContext, UIContext } from 'contexts/ui-context';
import React, { useContext, useEffect } from 'react';

const Upgrade: React.FunctionComponent = () => {
    const uiContext = useContext<TUIContext>(UIContext);

    useEffect(() => {
        uiContext.setTitle('Upgrade');
        uiContext.setSubTitle("Upgrade your firewall to Radware's professional WAF");
    });

    return (
        <div>
        <div style={{marginBottom: '30px'}}><a href='https://www.radware.com' target='_blank'>Upgrade to Radware Premium Ruleset</a></div>
        <div><a href='https://www.radware.com/products/appwall' target='_blank'>Upgrade to Professional Radware Products</a></div>
        </div>
    );
};

export default Upgrade;
