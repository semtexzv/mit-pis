import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import styled from '@emotion/styled'
import LoginContainer from "../containers/LoginContainer";
import DataTableContainer from "../containers/DataTableContainer";
import DataTable2Container from "../containers/DataTable2Container";
import TopMenu from "../containers/TopMenu"
import {TM_SITE1, TM_SITE2} from "../constants/TopMenuConstants"
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
          <Route exact path="/" render={() => <TopMenu />}/>
          <Route path="/site1" render={() => <TopMenu menu_items={TM_SITE1} />}/>
          <Route path="/site2" render={() => <TopMenu menu_items={TM_SITE2} />}/>
        </Switch>
        <Switch>
          <Route exact path="/" component={LoginContainer} />
          <Route path="/site1/dT" component={DataTableContainer} />
          <Route path="/site1/pT" component={DataTable2Container} />
          <Route path="/site2/dT" component={DataTableContainer} />
          <Route path="/site2/pT" component={DataTable2Container} />
        </Switch>
      </Container>
    </Router>
  )
}

export default Routes
