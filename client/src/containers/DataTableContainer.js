import React, {Component} from "react";
import {connect} from "react-redux";
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Button} from 'primereact/button';
import {Dialog} from 'primereact/dialog';
import {InputText} from 'primereact/inputtext';

const smallCars =
{
  "data" :[
  {"brand": "Volkswagen", "year": 2012, "color": "White", "vin": "dsad231ff"},
  {"brand": "Audi", "year": 2011, "color": "Black", "vin": "gwregre345"},
  {"brand": "Renault", "year": 2005, "color": "Gray", "vin": "h354htr"},
  {"brand": "BMW", "year": 2003, "color": "Blue", "vin": "j6w54qgh"},
  {"brand": "Mercedes", "year": 1995, "color": "White", "vin": "hrtwy34"},
  {"brand": "Volvo", "year": 2005, "color": "Black", "vin": "jejtyj"},
  {"brand": "Honda", "year": 2012, "color": "Yellow", "vin": "g43gr"},
  {"brand": "Jaguar", "year": 2013, "color": "White", "vin": "greg34"},
  {"brand": "Ford", "year": 2000, "color": "Black", "vin": "h54hw5"},
  {"brand": "Fiat", "year": 2013, "color": "Red", "vin": "245t2s"}
]
};

export class DataTable1 extends Component {

  constructor() {
    super();
    //this.state = {displayDialog: false};
    this.state = {};
    //this.carservice = new CarService();
    this.save = this.save.bind(this);
    this.delete = this.delete.bind(this);
    //this.onCarSelect = this.onCarSelect.bind(this);
    this.addNew = this.addNew.bind(this);
    this.findSelectedCarIndex = this.findSelectedCarIndex.bind(this);
    this.onCarSelect = this.onCarSelect.bind(this);
  }

  componentDidMount() {
    this.setState({cars: smallCars.data});
  }

  addNew(){
    this.setState({
       car: {vin:'', year: '', brand: '', color: ''},
       displayDialog: true
    });
  }

  findSelectedCarIndex() {
    return this.state.cars.indexOf(this.state.selectedCar);
  }

  onCarSelect(e){
    //this.newCar = false;
    this.setState({
      displayDialog:true,
      car: Object.assign({}, e.data)
    });
  }

  delete(){
  }

  save(){
  }

  updateProperty(property, value) {
    let car = this.state.car;
    car[property] = value;
    this.setState({car: car});
  }

  render() {
    let header = <div className="p-clearfix" style={{lineHeight:'1.87em'}}>CRUD for Cars </div>;
    let footer = <div className="p-clearfix" style={{width:'100%'}}>
        <Button style={{float:'left'}} label="Add" icon="pi pi-plus" onClick={this.addNew}/>
    </div>;

    let dialogFooter = <div className="ui-dialog-buttonpane p-clearfix">
            <Button label="Delete" icon="pi pi-times" onClick={this.delete}/>
            <Button label="Save" icon="pi pi-check" onClick={this.save}/>
        </div>;
    return (
      <div>
        <div className="Table">
          <DataTable
             value={this.state.cars} header={header} footer={footer}
             selectionMode="single"
             selection={this.state.selectedCar} onSelectionChange={e => this.setState({selectedCar: e.value})}
             onRowSelect={this.onCarSelect}
          >
            <Column field="vin" header="Vin" sortable={true} filter={true}/>
            <Column field="year" header="Year" />
            <Column field="brand" header="Brand" />
            <Column field="color" header="Color" />
          </DataTable>
        </div>
        <div className="Dialog">
          <Dialog header="Godfather I" visible={this.state.displayDialog} modal={true} blockScroll={false} footer={dialogFooter} onHide={(e) => this.setState({displayDialog: false})}>
            {this.state.car &&
            <div className="p-grid p-fluid">
              <div className="p-col-4" style={{padding: '.75em'}}><label htmlFor="vin">Vin</label></div>
              <div className="p-col-8" style={{padding: '.5em'}}>
                <InputText id="vin" onChange={(e) => {
                  this.updateProperty('vin', e.target.value)
                }} value={this.state.car.vin}/>
              </div>
            </div>
            }
          </Dialog>
        </div>
      </div>
    );
  }
}

/*
const DataTable = ({
                  message="default"
               }) => {
  return (
  );
};
 */

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(DataTable1);
/*
<Dialog visible={this.state.displayDialog} style={{width: '300px'}} header="Car Details" modal={true} footer={dialogFooter} onHide={() => this.setState({displayDialog: false})}
        blockScroll={false}>
  {
    this.state.car &&

    <div className="p-grid p-fluid">
      <div className="p-col-4" style={{padding:'.75em'}}><label htmlFor="vin">Vin</label></div>
      <div className="p-col-8" style={{padding:'.5em'}}>
        <InputText id="vin" onChange={(e) => {this.updateProperty('vin', e.target.value)}} value={this.state.car.vin}/>
      </div>

      <div className="p-col-4" style={{padding:'.75em'}}><label htmlFor="year">Year</label></div>
      <div className="p-col-8" style={{padding:'.5em'}}>
        <InputText id="year" onChange={(e) => {this.updateProperty('year', e.target.value)}} value={this.state.car.year}/>
      </div>

      <div className="p-col-4" style={{padding:'.75em'}}><label htmlFor="brand">Brand</label></div>
      <div className="p-col-8" style={{padding:'.5em'}}>
        <InputText id="brand" onChange={(e) => {this.updateProperty('brand', e.target.value)}} value={this.state.car.brand}/>
      </div>

      <div className="p-col-4" style={{padding:'.75em'}}><label htmlFor="color">Color</label></div>
      <div className="p-col-8" style={{padding:'.5em'}}>
        <InputText id="color" onChange={(e) => {this.updateProperty('color', e.target.value)}} value={this.state.car.color}/>
      </div>
    </div>
  }
</Dialog>
 */

