import React from 'react'
import {Router, Route, Switch} from 'react-router-dom'
import history from '../utils/history'
import styled from '@emotion/styled'
import TopMenu from "../containers/TopMenu"
import MeetingContainer from "../containers/MeetingContainer"
import SpecializationContainer from "../containers/SpecializationContainer"
import ConnectEmployeeContainer from "../containers/ConnectEmployeeContainer";
import OverviewContainer from "../containers/OverviewContainer";
import CustomerContainer from "../containers/CustomerContainer";
import ProfileContainer from "../containers/ProfileContainer";
import EmployeeContainer from "../containers/EmployeeContainer";
import "babel-polyfill";
import {AuthRoute} from "../components/AuthRoute";
import {initCustomerData} from "../actions/CustomerActions";
import {initSpecializationData} from "../actions/SpecializationActions";
import {initConnectEmployeeData} from "../actions/ConnectEmployeeActions";
import {initData} from "../actions/MeetingActions";
import {initEmployeeData} from "../actions/EmployeeActions";
import {initOverview} from "../actions/OverviewActions";
import {doNothingProfile} from "../actions/ProfileActions";
import {Logout} from "../components/Logout";


const Container = styled.div`
  text-align: center;
`

function Routes({store}) {
  return (
    <Router history={history}>
      <Container>
        <TopMenu />
        <Switch>
          <Route exact path="/" render={() => (Logout(store))} />
          <Route path="/meeting" render={() => (AuthRoute(store , ["ADMIN","USER","OWNER","MANAGER"], MeetingContainer, initData()))} />
          <Route path="/specialization"render={() => (AuthRoute(store , ["ADMIN","OWNER","MANAGER"], SpecializationContainer, initSpecializationData()))}/>
          <Route path="/connectEmployee" render={() => (AuthRoute(store , ["ADMIN","OWNER","MANAGER"], ConnectEmployeeContainer, initConnectEmployeeData()))}/>
          <Route path="/overview" render={() => (AuthRoute(store , ["OWNER"], OverviewContainer, initOverview()))}/>
          <Route path="/customer" render={() => (AuthRoute(store , ["ADMIN","USER","OWNER","MANAGER"], CustomerContainer, initCustomerData()))}/>
          <Route path="/profile"render={() => (AuthRoute(store , ["ADMIN","USER","OWNER","MANAGER"], ProfileContainer, doNothingProfile()))}/>
          <Route path="/employee" render={() => (AuthRoute(store, ["ADMIN","OWNER"], EmployeeContainer, initEmployeeData()))}/>
        </Switch>
      </Container>
    </Router>
  )
}

export default Routes
