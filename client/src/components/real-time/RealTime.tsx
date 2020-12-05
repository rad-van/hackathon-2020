import { TUIContext, UIContext } from 'contexts/ui-context';
import React, { useContext, useEffect } from 'react';
import { connect } from 'react-redux';
import { RootState } from 'store';

const mapState = (state: RootState) => ({
  requests: state.realTime.requests,
});

type Props = ReturnType<typeof mapState>;

const RealTimeRaw = ({ requests }: Props) => {
  const uiContext = useContext<TUIContext>(UIContext);

  useEffect(() => {
    uiContext.setTitle('Real Time');
    uiContext.setSubTitle('See what\'s happening right now on your web application');
  });

  return (
    <>
      <div>Hello Real Time</div>

      {requests.map((r) => (<p>
        <pre>{JSON.stringify(r)}</pre>
      </p>))}
    </>
  );
};

export default connect(mapState)(RealTimeRaw);
