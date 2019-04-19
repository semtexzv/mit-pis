import React, {Component} from "react";
import {connect} from "react-redux";

import {TabMenu} from 'primereact/tabmenu';
import history from '../utils/history'

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
        <TabMenu model={this.state.items}>
        </TabMenu>
      </div>);
  }
}

const mapStateToProps = (menu_state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(TopMenu);
