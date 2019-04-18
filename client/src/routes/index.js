import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import styled from '@emotion/styled'
import LoginContainer from "../containers/LoginContainer";
import TopMenu from "../containers/TopMenu"
import MeetingContainer from "../containers/MeetingContainer"
import SpecializationContainer from "../containers/SpecializationContainer"
import * as TM from "../constants/TopMenuConstants"
import "babel-polyfill";

const Container = styled.div`
  text-align: center;
`
export const history = createBrowserHistory();

function Routes() {
  return (
    <Router history={history}>
      <Container>
        <Switch>
          <Route exact path="/" render={() => <TopMenu />}/>
          <Route path="/siteA" render={() => <TopMenu menu_items={TM.SITE1} />}/>
          <Route path="/siteB" render={() => <TopMenu menu_items={TM.SITE2} />}/>
        </Switch>
        <Switch>
          <Route exact path="/" component={LoginContainer} />
          <Route path="/meeting" component={MeetingContainer}/>
          <Route path="/specialization" component={SpecializationContainer}/>
        </Switch>
      </Container>
    </Router>
  )
}

export default Routes
