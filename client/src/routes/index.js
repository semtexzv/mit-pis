import React from 'react'
import {Router, Route, Switch} from 'react-router-dom'
import history from '../utils/history'
import styled from '@emotion/styled'
import LoginContainer from "../containers/LoginContainer";
import TopMenu from "../containers/TopMenu"
import MeetingContainer from "../containers/MeetingContainer"
import SpecializationContainer from "../containers/SpecializationContainer"
import ConnectEmployeeContainer from "../containers/ConnectEmployeeContainer";
import OverviewContainer from "../containers/OverviewContainer";
import CustomerContainer from "../containers/CustomerContainer";
import ProfileContainer from "../containers/ProfileContainer";
import * as TM from "../constants/TopMenuConstants"
import "babel-polyfill";
import RegisterContainer from "../containers/RegisterContainer";

const Container = styled.div`
  text-align: center;
`

function Routes() {
  return (
    <Router history={history}>
      <Container>
        <TopMenu menu_items={TM.SITE1}/>
        <Switch>
          <Route exact path="/" component={LoginContainer}/>
          <Route path="/meeting" component={MeetingContainer}/>
          <Route path="/specialization" component={SpecializationContainer}/>
          <Route path="/connectEmployee" component={ConnectEmployeeContainer}/>
          <Route path="/register" component={RegisterContainer}/>
          <Route path="/overview" component={OverviewContainer}/>
          <Route path="/customer" component={CustomerContainer}/>
          <Route path="/profile" component={ProfileContainer}/>
        </Switch>
      </Container>
    </Router>
  )
}

export default Routes
