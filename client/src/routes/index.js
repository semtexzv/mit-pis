import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import history from '../utils/history'
import styled from '@emotion/styled'
import LoginContainer from "../containers/LoginContainer";
import TopMenu from "../containers/TopMenu"
import MeetingContainer from "../containers/MeetingContainer"
import * as TM from "../constants/TopMenuConstants"
import "babel-polyfill";

const Container = styled.div`
  text-align: center;
`

function Routes() {
  return (
    <Router history={history}>
      <Container>
        <Switch>
          <Route exact path="/" render={() => <TopMenu />}/>
          <Route path="/meeting" render={() => <TopMenu menu_items={TM.SITE1} />}/>
        </Switch>
        <Switch>
          <Route exact path="/" component={LoginContainer} />
          <Route exact path="/meeting" component={MeetingContainer}/>
        </Switch>
      </Container>
    </Router>
  )
}

//<Route exact path="/" component={LoginContainer} />

export default Routes
