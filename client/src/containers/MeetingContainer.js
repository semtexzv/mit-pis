import React, {Component} from "react";
import {connect} from "react-redux";
//import {getFields, getHeader, getKeys} from "../selectors/MeetingSelector";
import * as S from "../selectors/MeetingSelector";
import * as A from "../actions/MeetingActions";
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Dialog} from 'primereact/dialog';
import {Button} from 'primereact/button';
import {InputText} from 'primereact/inputtext';
import {InputTextarea} from 'primereact/inputtextarea';

const Meeting =
({
  meetingData,
  selectedRow,
  date,
  name,
  surname,
  title,
  brand,
  customerInfo,
  meetingInfo,
  displayDialog,
  toggleDisplayDialog,
  deleteRow,
  saveRow,
  addRow,
  updateSelectedRow,
  updateDate,
  updateName,
  updateSurname,
  updateTitle,
  updateBrand,
  updateCustomerInfo,
  updateMeetingInfo
}) => {
  const dialogFooter =
    <div className="ui-dialog-buttonpane p-clearfix">
      <Button label="Delete" icon="pi pi-times" onClick={e => deleteRow()} />
      <Button label="Save" icon="pi pi-check" onClick={e => saveRow()}/>
    </div>;

  const addButton =
    <div className="p-clearfix" style={{width:'100%'}}>
      <Button style={{float:'left'}} label="Add" icon="pi pi-plus" onClick={e => addRow()}/>
    </div>;

  return(
    <div className="Meeting">
      <DataTable value={meetingData.toJS()} editable={true} footer={addButton}
        selectionMode="single" onSelectionChange={e => updateSelectedRow(e.value)}
      >
        <Column field="date" header="Date" sortable={true}/>
        <Column field="name" header="Name" sortable={true}/>
        <Column field="surname" header="Surname" sortable={true} filter={true}/>
        <Column field="title" header="Title" sortable={true}/>
        <Column field="brand" header="Brand" sortable={true} filter={true}/>
      </DataTable>

      <Dialog
        visible={displayDialog} modal={true} footer={dialogFooter} onHide={() => toggleDisplayDialog()}
        style={{width: '50vw'} } header="Edit record"
      >
          <InputText id="date" onChange={(e) => updateDate(e.target.value)} value={date}/>
          <InputText id="name" onChange={(e) => updateName(e.target.value)} value={name}/>
          <InputText id="surname" onChange={(e) => updateSurname(e.target.value)} value={surname}/>
          <InputText id="title" onChange={(e) => updateTitle(e.target.value)} value={title}/>
          <InputText id="brand" onChange={(e) => updateBrand(e.target.value)} value={brand}/>
          <InputTextarea id="customerInfo" onChange={(e) => updateCustomerInfo(e.target.value)} value={customerInfo}/>
          <InputTextarea id="meetingInfo" onChange={(e) => updateMeetingInfo(e.target.value)} value={meetingInfo}/>
      </Dialog>
    </div>
  )
};

const mapStateToProps = (state) => ({
  meetingData: S.getMeetingData(state),
  selectedRow: S.getSelectedRow(state),
  displayDialog: S.getDisplayDialog(state),
  date: S.getDate(state),
  name: S.getName(state),
  surname: S.getSurname(state),
  title: S.getTitle(state),
  brand: S.getBrand(state),
  customerInfo: S.getCustomerInfo(state),
  meetingInfo: S.getMeetingInfo(state)
});

const mapDispatchToProps = (dispatch) => ({
  toggleDisplayDialog: () => dispatch(A.toggleDisplayDialog()),
  deleteRow: () => dispatch(A.deleteRow()),
  saveRow: () => dispatch(A.saveRow()),
  addRow: () => dispatch(A.addRow()),
  updateSelectedRow: (value) => dispatch(A.updateSelectedRow(value)),
  updateDate: (value) => dispatch(A.updateDate(value)),
  updateName: (value) => dispatch(A.updateName(value)),
  updateSurname: (value) => dispatch(A.updateSurname(value)),
  updateTitle: (value) => dispatch(A.updateTitle(value)),
  updateBrand: (value) => dispatch(A.updateBrand(value)),
  updateCustomerInfo: (value) => dispatch(A.updateCustomerInfo(value)),
  updateMeetingInfo: (value) => dispatch(A.updateMeetingInfo(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Meeting);
