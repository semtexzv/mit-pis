import React from "react";
import {connect} from "react-redux";
import EmployeeDialog from "../components/EmployeeDialog"
import {getEmployeeData} from "../selectors/EmployeeSelector";
import {updateSelectedRow} from "../actions/EmployeeActions";
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Button} from 'primereact/button';

const Employee =
  ({
     employeeData,
     updateSelectedRow,
   }) => {

    return(
      <div>
        <DataTable value={employeeData.toJS()} editable={true}
                   selectionMode="single" onSelectionChange={e => updateSelectedRow(e.value)}
        >
          <Column field="name" header="Name" sortable={true}/>
          <Column field="surname" header="Surname" sortable={true} filter={true}/>
          <Column field="role" header="Role" sortable={true} filter={true}/>
        </DataTable>

        <EmployeeDialog/>

        <div align="right">
          <Button icon="pi pi-info-circle" tooltip="Choose a row and double click to edit the record"/>
        </div>
      </div>
    )
  };

const mapStateToProps = (state) => ({
  employeeData: getEmployeeData(state),
});

const mapDispatchToProps = (dispatch) => ({
  updateSelectedRow: (value) => dispatch(updateSelectedRow(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Employee);
