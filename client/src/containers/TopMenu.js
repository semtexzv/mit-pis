import React from "react";
import {connect} from "react-redux";

import {TabMenu} from "primereact/tabmenu"
import {getLogged, getMyRole} from "../selectors/AuthSelector";
import {getItemList} from "../constants/TopMenuConstants";

const TopMenu = ({
                   items,
                   logged
               }) => {
  if(logged){
    return ( <div className="TopMenu">
        <TabMenu model={items}/>
      </div> )
  }else{
    return (<div></div>);
  }
};



const mapStateToProps = (state) => ({
  items: getItemList(getMyRole(state)),
  logged: getLogged(state),
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(TopMenu);
