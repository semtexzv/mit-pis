import React from "react";
import {connect} from "react-redux";
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import * as S from "../selectors/OverviewSelector";
import {recursiveConvert_ISO_date} from "../utils/dateTimeConvert"

const Overview =
({
  overviewData,
}) => {
  return (
    <div>
      <DataTable value={recursiveConvert_ISO_date(overviewData.toJS())}
      >
        <Column field="customerName" header="Customer name"/>
        <Column field="customerSurname" header="Customer surname" sortable={true} filter={true}/>
        <Column field="employeeName" header="Employee name"/>
        <Column field="employeeSurname" header="Employee surname" sortable={true} filter={true}/>
        <Column field="brand" header="Brand" sortable={true} filter={true}/>
        <Column field="date" header="M/D/Y Time" sortable={true} filter={true}/>
      </DataTable>
    </div>
  );
};

const mapStateToProps = (state) => ({
  overviewData: S.getOverviewData(state),
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Overview);
