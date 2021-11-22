import React, {ReactNode} from 'react';

import './AppList.scss';

type AppListProps = {
  children: ReactNode;
};

const AppList = ({children}: AppListProps) => {
  return <div className="app-list">{children}</div>;
};

export default AppList;
