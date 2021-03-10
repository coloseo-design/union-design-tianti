import React from 'react';

import {
  HashRouter as Router,
  Switch,
  Route,
  RouteComponentProps,
} from 'react-router-dom';
import { BasePageComponent } from './utils';
import Layout, { menus } from './layout';

const BaseComponent: React.FC<RouteComponentProps<any>> = (props) => {
  const { match } = props;
  const { name } = match.params;
  return <BasePageComponent name={name} />;
};

const Startup = () => (
  <Router>
    <Layout menus={menus}>
      <Switch>
        <Route path="/develop/components/:name" component={BaseComponent} />
      </Switch>
    </Layout>
  </Router>
);

export default Startup;
