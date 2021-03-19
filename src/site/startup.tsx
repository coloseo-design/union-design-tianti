/* eslint-disable */
import React from 'react';

import {
  HashRouter as Router,
  Switch,
  Route,
  RouteComponentProps,
} from 'react-router-dom';
import { BasePageComponent } from './utils';
import Layout, { menus } from './layout';

const BaseComponent: React.FC<RouteComponentProps<{}>> = (props) => {
  /* eslint react/prop-types: 0 */
  const { match: { params: { name } } } = props;
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
