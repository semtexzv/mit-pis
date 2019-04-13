import React, {Component} from "react";
import {connect} from "react-redux";

import {TabMenu} from 'primereact/tabmenu';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';

import {getMenuItem, getWindow} from "../selectors/TopMenuSelector";
import {updateWindow, updateMenuItem} from "../actions/TopMenuActions";
import {history} from "../routes/index"

export const TopMenuLoginItems = [
  ["home", "/"],
  ["item1", "/dT"],
  ["item2", "/pT"]
]

export const TopMenuSiteItems = [
  ["SiteHome", "/site"],
  ["SiteItem1", "/site/dT"],
  ["SiteItem2", "/site/pT"]
]

class TopMenu extends Component {
  constructor(props){
    super(props);
    var itemsParam = this.props.menu_items;
    var itemList = [];
    for(let i in itemsParam) {
      let name = itemsParam[i][0];
      let path = itemsParam[i][1];
      itemList.push({
        label: name, icon: 'fa-compass', command: () => {
          history.push(path)
        }
      });
    }
    this.state = {items: itemList};
  }

  render(){
    return(
    <div className="TopMenu">
      <TabMenu model={this.state.items}>
        <InputText placeholder="Search" type="text"/>
        <Button label="Logout" icon="pi pi-power-off" style={{marginLeft:4}}/>
      </TabMenu>
    </div>);
  }
}

const mapStateToProps = (menu_state) => ({
  windowValue: getWindow(menu_state),
  menuItemValue: getMenuItem(menu_state)
});

const mapDispatchToProps = (dispatch) => ({
  updateWindow: (value) => dispatch(updateWindow(value)),
  updateMenuItem: (value) => dispatch(updateMenuItem(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TopMenu);
