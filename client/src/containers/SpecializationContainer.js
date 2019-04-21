import React from "react";
import {connect} from "react-redux";
import {MultiSelect} from 'primereact/multiselect';
import {Dropdown} from 'primereact/dropdown';
import {Dialog} from 'primereact/dialog';
import {Button} from 'primereact/button';
import {Growl} from 'primereact/growl';
import raiseGrowl from "../utils/growl"
import * as S from "../selectors/SpecializationSelector";
import * as A from "../actions/SpecializationActions";
import * as snippet from "../components/smallSnippets"


const Specialization =
({
  allBrands,
  allEmployees,
  employeeId,
  chosenBrands,
  fillSpec,
  updateSpec,
  updateDropdown,
  saveSpec,
  warning,
  hideWarning,
  showWarning
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
  const warningFooter =
    <div>
      <Button label="Yes" icon="pi pi-check"  className="p-button-secondary"
        onClick={(e) => {hideWarning(); saveSpec();
          raiseGrowl("All specializations were removed", mygrowl, "success");}
        }
      />
      <Button label="No" icon="pi pi-times"
        onClick={(e) => hideWarning()}
      />
    </div>;

  //---------------------------------------
  // onChanges
  function onChangeDropDown(value) {
    if (value !== null) {
      updateDropdown(value);
      fillSpec();
    }
  }

  //---------------------------------------
  // Validations

  function checkDropDown(surname, errorHandler){
    if(surname.length === 0){
      raiseGrowl("You must choose some name", errorHandler);
      return false;
    }
    return true;
  }

  function checkMultiSelect(brands, errorHandler){
    if(brands.size === 0) {
      showWarning();
      return false;
    }
    else
      return true;
  }

  function saveButtonValidator(surname, brands, errorHandler){
    // user must choose some name form list
    if(checkDropDown(surname, errorHandler)){
      if(checkMultiSelect(brands, errorHandler)) {
        saveSpec();
        raiseGrowl("Specializations were added", errorHandler, "success");
      }
    }
  }

  //---------------------------------------
  // Return
  return(
    <div>
      <Growl ref={(el) => {setGrowl(el)}}> </Growl>
      <div>
        <h3> </h3>
        <Dropdown value={employeeId}
                  options={allEmployees.toJS()}
                  onChange={(e) => onChangeDropDown(e.value)}
                  filter={true} filterPlaceholder="employee filter"
                  filterBy="label,value" placeholder="Chose employee"
        />
        {snippet.required}
      </div>

      <div>
      <h3> </h3>
      <MultiSelect
        value={chosenBrands.toJS()} options={allBrands.toJS()}
        onChange={(e) => updateSpec(e.value)}
        style={{minWidth:'40em'}} filter={true} placeholder="Choose specializations"
      />
      {snippet.required}
      </div>

      <div>
        <h3> </h3>
        <Button label="Save" icon="pi pi-check" style={{right: "25px"}}
                onClick={e => {saveButtonValidator(employeeId, chosenBrands, mygrowl)}}/>
      </div>

      <div>
        <Dialog header="Warning" visible={warning} style={{width: '50vw'}}
                footer={warningFooter} onHide={(e) => hideWarning()}>
          <div>Are you sure you want to leave the specializations panel blank?</div>
          <div>It will cause deletion of all employee's specializations</div>
        </Dialog>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  allBrands: S.getAllBrands(state),
  allEmployees: S.getAllEmployees(state),
  employeeId: S.getEmployeeId(state),
  chosenBrands: S.getChosenBrands(state),
  warning: S.getWarning(state),
});

const mapDispatchToProps = (dispatch) => ({
  fillSpec: (value) => dispatch(A.fillSpec()),
  updateSpec: (value) => dispatch(A.updateSpec(value)),
  updateDropdown: (value) => dispatch(A.updateDropdown(value)),
  saveSpec: () => dispatch(A.saveSpec()),
  showWarning: () => dispatch(A.showWarning()),
  hideWarning: () => dispatch(A.hideWarning())
});

export default connect(mapStateToProps, mapDispatchToProps)(Specialization);
