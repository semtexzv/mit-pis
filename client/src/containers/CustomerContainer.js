import React from "react";
import {connect} from "react-redux";
import CustomerDialog from "../components/CustomerDialog"
import {getCustomerData} from "../selectors/CustomerSelector";
import {updateSelectedRow, setAddButton} from "../actions/CustomerActions";
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Button} from 'primereact/button';

const Customer =
({
   customerData,
   setAddButton,
   updateSelectedRow,
}) => {

  const addButton =
    <div className="p-clearfix" style={{width:'100%'}}>
      <Button tooltip="Add a new record"
              style={{float:'left'}} label="Add" icon="pi pi-plus"
              onClick={e => setAddButton()}/>
    </div>;

  return(
    <div>
      <DataTable value={customerData.toJS()} editable={true} footer={addButton}
        selectionMode="single" onSelectionChange={e => updateSelectedRow(e.value)}
      >
        <Column field="name" header="Name" sortable={true}/>
        <Column field="surname" header="Surname" sortable={true} filter={true}/>
        <Column field="title" header="Title" sortable={true}/>
        <Column field="brand" header="Brand" sortable={true} filter={true}/>
      </DataTable>

      <CustomerDialog/>

      <div align="right">
        <Button icon="pi pi-info-circle" tooltip="Choose a row and double click to edit the record"/>
      </div>
    </div>
  )
};

const mapStateToProps = (state) => ({
  customerData: getCustomerData(state),
});

const mapDispatchToProps = (dispatch) => ({
  updateSelectedRow: (value) => dispatch(updateSelectedRow(value)),
  setAddButton: () => dispatch(setAddButton()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Customer);
