import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import styled from '@emotion/styled'
import LoginContainer from "../containers/LoginContainer";
import DataTableContainer from "../containers/DataTableContainer";
import DataTable2Container from "../containers/DataTable2Container";
import TopMenu from "../containers/TopMenu"
import {TopMenuLoginItems, TopMenuSiteItems} from "../containers/TopMenu"
import "babel-polyfill";

const Container = styled.div`
  text-align: center;
`
export const history = createBrowserHistory()

function Routes() {
  return (
    <Router history={history}>
      <Container>
        <Switch>
          <Route exact path="/" render={() => <TopMenu menu_items={TopMenuLoginItems} />}/>
          <Route path="/site" render={() => <TopMenu menu_items={TopMenuSiteItems} />}/>
        </Switch>
        <Switch>
          <Route exact path="/" component={LoginContainer} />
          <Route path="/dT" component={DataTableContainer} />
          <Route path="/pT" component={DataTable2Container} />
          <Route path="/site/dT" component={DataTableContainer} />
          <Route path="/site/pT" component={DataTable2Container} />
        </Switch>
      </Container>
    </Router>
  )
}

export default Routes
