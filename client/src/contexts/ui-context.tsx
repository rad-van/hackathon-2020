import React from 'react';

export type TUIContext = {
  title: string,
  setTitle: Function,
  subTitle: string,
  setSubTitle: Function
};

// we initialise them without default values, to make that happen, we
// apply the Partial helper type.
export const UIContext = React.createContext<TUIContext>({
  title: '',
  setTitle: () => {},
  subTitle: '',
  setSubTitle: () => {},
});

interface Props {
  children: React.ReactNode
}

export const UIContextProvider = ({ children }: Props) => {
  const [title, setTitle] = React.useState<string>('');
  const [subTitle, setSubTitle] = React.useState<string>('');

  const value = {
    title,
    setTitle,
    subTitle,
    setSubTitle,
  };

  return (
    <UIContext.Provider value={value}>
      {children}
    </UIContext.Provider>
  );
};
