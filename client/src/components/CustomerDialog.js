import React from "react";
import {connect} from "react-redux";
import * as S from "../selectors/CustomerSelector";
import * as A from "../actions/CustomerActions";
import {Dialog} from 'primereact/dialog';
import {InputTextarea} from 'primereact/inputtextarea';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {Growl} from 'primereact/growl';
import raiseGrowl from "../utils/growl"
import * as snippet from "./smallSnippets"


const CustomerDialog =
({
   displayDialog,
   addButton,
   deleteRow,
   saveRow,
   unsetAddButton,
   toggleDisplayDialog,
   name,
   surname,
   title,
   brand,
   info,
   updateName,
   updateSurname,
   updateTitle,
   updateBrand,
   updateInfo,
}) => {

  //local variables
  var mygrowl; // use for error handling, contains Growl instance
  function setGrowl(el){
    // setting Growl instance to local variable
    if(el != null) {
      mygrowl = el;
    }
  }

  //---------------------------------------
  // JSX snippets
  function showDeleteButton(condition) {
    if(condition)
      return(<span> </span>);
    else
      return(
        <Button label="Delete" icon="pi pi-times"
          onClick={e => {deleteRow(); raiseGrowl("Data was deleted", mygrowl, "success")}}/>
      );
  }
  const dialogFooter =
    <div className="ui-dialog-buttonpane p-clearfix">
      {  /*it depends - don't show Delete Button if user adding new row*/
        showDeleteButton(addButton)
      }
      <Button label="Save" icon="pi pi-check"
        onClick={e => {saveRow(); raiseGrowl("Data was saved", mygrowl, "success")}}/>
    </div>;

  //---------------------------------------
  // Return
  return(
    <div>
      <Growl ref={(el) => {setGrowl(el)}}> </Growl>
      <Dialog header="Customer data"
              visible={displayDialog} modal={true} footer={dialogFooter}
              onHide={() => {toggleDisplayDialog(); unsetAddButton();}}
      >
        <div>
          <InputText value={name} onChange={(e) => updateName(e.target.value)} placeholder="name"/>
          {snippet.required}
        </div>

        <div>
          <InputText value={surname} onChange={(e) => updateSurname(e.target.value)} placeholder="surname"/>
          {snippet.required}
        </div>

        <div>
          <InputText value={title} onChange={(e) => updateTitle(e.target.value)} placeholder="title"/>
          {snippet.emptyRequired}
        </div>

        <div>
          <InputText value={brand} onChange={(e) => updateBrand(e.target.value)} placeholder="brand"/>
          {snippet.emptyRequired}
        </div>

        <div>
          <InputTextarea rows={5} cols={50} placeholder="Info about customer"
            onChange={(e) => updateInfo(e.target.value)} value={info}/>
        </div>

      </Dialog>
    </div>
  )
};

const mapStateToProps = (state) => ({
  displayDialog: S.getDisplayDialog(state),
  addButton: S.getAddButton(state),
  name: S.getName(state),
  surname: S.getSurname(state),
  title: S.getTitle(state),
  brand: S.getBrand(state),
  info: S.getInfo(state),
});

const mapDispatchToProps = (dispatch) => ({
  deleteRow: () => dispatch(A.deleteRow()),
  saveRow: () => dispatch(A.saveRow()),
  toggleDisplayDialog: () => dispatch(A.toggleDisplayDialog()),
  unsetAddButton: () => dispatch(A.unsetAddButton()),
  updateName: (value) => dispatch(A.updateName(value)),
  updateSurname: (value) => dispatch(A.updateSurname(value)),
  updateTitle: (value) => dispatch(A.updateTitle(value)),
  updateBrand: (value) => dispatch(A.updateBrand(value)),
  updateInfo: (value) => dispatch(A.updateInfo(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomerDialog);
