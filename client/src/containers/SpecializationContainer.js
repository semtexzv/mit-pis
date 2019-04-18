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


const Specialization =
({
  allBrands,
  allEmployees,
  employeeName,
  employeeSurname,
  chosenBrands,
  updateSpec,
  updateEmployeeName,
  updateEmployeeSurname,
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
      let arr = value.split(" ");
      updateEmployeeName(arr[0]);
      updateEmployeeSurname(arr[1])
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
    console.log(brands);
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
        <Dropdown value={employeeName.concat(" ", employeeSurname)}
                  options={allEmployees.toJS()}
                  onChange={(e) => onChangeDropDown(e.value)}
                  filter={true} filterPlaceholder="employee filter"
                  filterBy="label,value" placeholder="Chose employee"
        />
      </div>

      <div>
      <MultiSelect
        value={chosenBrands} options={allBrands.toJS()}
        onChange={(e) => updateSpec(e.value)}
        style={{minWidth:'40em'}} filter={true} placeholder="Choose specializations"
      />
      </div>

      <div>
        <Button label="Save" icon="pi pi-check"
                onClick={e => {saveButtonValidator(employeeSurname, chosenBrands, mygrowl)}}/>
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

//<div style={{marginTop: '.5em'}}>{this.state.car2 ? 'Selected Car: ' + this.state.car2 : 'No car selected'}</div>

const mapStateToProps = (state) => ({
  allBrands: S.getAllBrands(state),
  allEmployees: S.getAllEmployees(state),
  employeeName: S.getEmployeeName(state),
  employeeSurname: S.getEmployeeSurname(state),
  chosenBrands: S.getChosenBrands(state),
  warning: S.getWarning(state),
});

const mapDispatchToProps = (dispatch) => ({
  updateSpec: (value) => dispatch(A.updateSpec(value)),
  updateEmployeeName: (value) => dispatch(A.updateEmployeeName(value)),
  updateEmployeeSurname: (value) => dispatch(A.updateEmployeeSurname(value)),
  saveSpec: () => dispatch(A.saveSpec()),
  showWarning: () => dispatch(A.showWarning()),
  hideWarning: () => dispatch(A.hideWarning())
});

export default connect(mapStateToProps, mapDispatchToProps)(Specialization);
