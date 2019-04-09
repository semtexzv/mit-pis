import React from "react";
import {connect} from "react-redux";

import {Menubar} from 'primereact/menubar';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';




const TopMenu = ({

               }) => {

  const items = [

    ];

  return (
    <div className="TopMenu">
      <Menubar model={items}>
        <InputText placeholder="Search" type="text"/>
        <Button label="Logout" icon="pi pi-power-off" style={{marginLeft:4}}/>
      </Menubar>
    </div>);
};

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(TopMenu);
