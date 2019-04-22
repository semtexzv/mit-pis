import React from "react";
import {connect} from "react-redux";
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Button} from 'primereact/button';
import ConnectEmployeeDialog from "../components/ConnectEmployeeDialog"
import {getCustomerData} from "../selectors/ConnectEmployeeSelector";
import {updateSelectedRow} from "../actions/ConnectEmployeeActions";

const ConnectEmployee =
({
  customerData,
  updateSelectedRow
}) => {
  return(
    <div>
      <DataTable value={customerData.toJS()} editable={true} header="Customer table"
                 selectionMode="single" onSelectionChange={e => updateSelectedRow(e.value)}
      >
        <Column field="name" header="Name" sortable={true}/>
        <Column field="surname" header="Surname" sortable={true} filter={true}/>
        <Column field="brand" header="Brand" sortable={true} filter={true}/>
        <Column field="assigned" header="Assigned" sortable={true} filter={true}/>
      </DataTable>

      <ConnectEmployeeDialog/>

      <div align="right">
        <Button icon="pi pi-info-circle" tooltip="Choose a row and double click to edit the record"/>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  customerData: getCustomerData(state),
});

const mapDispatchToProps = (dispatch) => ({
  updateSelectedRow: (value) => dispatch(updateSelectedRow(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ConnectEmployee);
