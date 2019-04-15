import React, {Component} from "react";
import {connect} from "react-redux";

import {TabMenu} from 'primereact/tabmenu';
import {Menubar} from 'primereact/menubar';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import DataTable1Container from "../containers/DataTableContainer";

import {getMenuItem, getWindow} from "../selectors/TopMenuSelector";
import {updateWindow, updateMenuItem} from "../actions/TopMenuActions";
import {history} from "../routes/index"

class TopMenu extends Component {
  constructor(props){
    super(props);
    if(typeof this.props.menu_items === 'undefined') {
      this.state = {items: []};
      return;
    }
    else if (this.props.menu_items.length === 0){
      this.state = {items: []};
      return;
    }
    //expected menu_items as [["nameOfItem", "pathAfterClick"], ...]
    // look at ../constants/TopMenuConstants.js
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
    itemList.push({
      label: 'Logout', icon: "pi pi-power-off", style: {left:40}, command: () => {
        ; // TODO: no action for logout-click not implemented yet
      }
    })
    this.state = {items: itemList};
  }

  render(){
    return(
    <div className="TopMenu">
      <DataTable1Container/>
    </div>);
  }
}
//<TabMenu model={this.state.items}>
//</TabMenu>

//<TabMenu model={this.state.items}>
//<InputText placeholder="Search" type="text"/>
//<Button label="Logout" icon="pi pi-power-off" style={{marginLeft:4}}/>

const mapStateToProps = (menu_state) => ({
  windowValue: getWindow(menu_state),
  menuItemValue: getMenuItem(menu_state)
});

const mapDispatchToProps = (dispatch) => ({
  updateWindow: (value) => dispatch(updateWindow(value)),
  updateMenuItem: (value) => dispatch(updateMenuItem(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TopMenu);
