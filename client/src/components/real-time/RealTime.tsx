import { TUIContext, UIContext } from 'contexts/ui-context';
import React, { PropsWithChildren, useContext, useEffect } from 'react';
import { connect } from 'react-redux';
import { RootState } from 'store';

const mapState = (state: RootState) => ({
  requests: state.realTime.requests,
});

type StateProps = ReturnType<typeof mapState> & PropsWithChildren<any>;

const RealTimeRaw: React.FunctionComponent = ({ requests }: StateProps) => {
  const uiContext = useContext<TUIContext>(UIContext);

  useEffect(() => {
    uiContext.setTitle('Real Time');
    uiContext.setSubTitle('See what\'s happening right now on your web application');
  });

  return (
    <>
      <div>Hello Real Time</div>

      {requests.map((r: any) => (<p>
        <pre>{JSON.stringify(r)}</pre>
      </p>))}
    </>
  );
};

export default connect(mapState)(RealTimeRaw);
