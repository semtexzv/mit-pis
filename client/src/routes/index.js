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
import EmployeeContainer from "../containers/EmployeeContainer";
import * as TM from "../constants/TopMenuConstants"
import "babel-polyfill";
import RegisterContainer from "../containers/RegisterContainer";
import {AuthRoute} from "../components/AuthRoute";
import {initCustomerData} from "../actions/CustomerActions";
import {initSpecializationData} from "../actions/SpecializationActions";
import {initConnectEmployeeData} from "../actions/ConnectEmployeeActions";
import {initData} from "../actions/MeetingActions";
import {initEmployeeData} from "../actions/EmployeeActions";
import {initOverview} from "../actions/OverviewActions";
import {doNothing} from "../actions/RegisterActions";
import {doNothingProfile} from "../actions/ProfileActions";


const Container = styled.div`
  text-align: center;
`

function Routes({store}) {
  return (
    <Router history={history}>
      <Container>
        <TopMenu menu_items={TM.SITE1}/>
        <Switch>
          <Route path="/meeting" render={() => (AuthRoute(store , "", MeetingContainer, initData()))} />
          <Route path="/specialization"render={() => (AuthRoute(store , "", SpecializationContainer, initSpecializationData()))}/>
          <Route path="/connectEmployee" render={() => (AuthRoute(store , "", ConnectEmployeeContainer, initConnectEmployeeData()))}/>
          <Route path="/register" render={() => (AuthRoute(store , "", RegisterContainer, doNothing()))}/>
          <Route path="/overview" render={() => (AuthRoute(store , "", OverviewContainer, initOverview()))}/>
          <Route path="/customer" render={() => (AuthRoute(store , "", CustomerContainer, initCustomerData()))}/>
          <Route path="/profile"render={() => (AuthRoute(store , "", ProfileContainer, doNothingProfile()))}/>
          <Route path="/employee" render={() => (AuthRoute(store, "", EmployeeContainer, initEmployeeData()))}/>
          <Route path="/" component={LoginContainer} />
        </Switch>
      </Container>
    </Router>
  )
}

export default Routes
