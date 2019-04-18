import React from "react";
import {connect} from "react-redux";
import {getMeetingData} from "../selectors/MeetingSelector";
import {updateSelectedRow, setAddButton} from "../actions/MeetingActions";
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Button} from 'primereact/button';
import MeetingDialog from "../components/MeetingDialog"
import {recursiveConvert_ISO_date} from "../utils/dateTimeConvert"

const Meeting =
({
  meetingData,
  setAddButton,
  updateSelectedRow,
}) => {

  const addButton =
    <div className="p-clearfix" style={{width:'100%'}}>
      <Button tooltip="Add a new record"
        style={{float:'left'}} label="Add" icon="pi pi-plus" onClick={e => setAddButton()}/>
    </div>;

  return(
    <div className="Meeting">
      <DataTable value={recursiveConvert_ISO_date(meetingData.toJS())} editable={true} footer={addButton}
        selectionMode="single" onSelectionChange={e => updateSelectedRow(e.value)}
      >
        <Column field="date" header="M/D/Y Time" sortable={true}/>
        <Column field="name" header="Name" sortable={true}/>
        <Column field="surname" header="Surname" sortable={true} filter={true}/>
        <Column field="title" header="Title" sortable={true}/>
        <Column field="brand" header="Brand" sortable={true} filter={true}/>
      </DataTable>

      <MeetingDialog/>

      <div align="right">
        <Button icon="pi pi-info-circle" tooltip="Choose a row and double click to edit the record"/>
      </div>
    </div>
  )
};

const mapStateToProps = (state) => ({
  meetingData: getMeetingData(state),
});

const mapDispatchToProps = (dispatch) => ({
  updateSelectedRow: (value) => dispatch(updateSelectedRow(value)),
  setAddButton: () => dispatch(setAddButton()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Meeting);
