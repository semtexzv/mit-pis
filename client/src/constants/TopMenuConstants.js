// ["nameOfItem", "pathAfterClick"]

import history from '../utils/history'

export const USER = [
  ["Meetings", "/meeting", "fa-compass"],
  ["Customers", "/customer", "fa-compass"],
  ["Profile", "/profile", "fa-compass"]
];

export const MANAGER = [
  ["Meetings", "/meeting", "fa-compass"],
  ["Customers", "/customer", "fa-compass"],
  ["Specializations", "/specialization", "fa-compass"],
  ["Assign customer", "/connectEmployee", "fa-compass"],
  ["Profile", "/profile", "fa-compass"],
];

export const ADMIN = [
  ["Meetings", "/meeting", "fa-compass"],
  ["Customers", "/customer", "fa-compass"],
  ["Specializations", "/specialization", "fa-compass"],
  ["Assign customer", "/connectEmployee", "fa-compass"],
  ["Employees", "/employee", "fa-compass"],
  ["Profile", "/profile", "fa-compass"],
];

export const OWNER = [
  ["Meetings", "/meeting", "fa-compass"],
  ["Customers", "/customer", "fa-compass"],
  ["Specializations", "/specialization", "fa-compass"],
  ["Assign customer", "/connectEmployee", "fa-compass"],
  ["Employees", "/employee", "fa-compass"],
  ["Overview", "/overview", "fa-compass"],
  ["Profile", "/profile", "fa-compass"],
];

export const SITE1 = [
  ["Meetings", "/meeting", "fa-compass"],
  ["Specializations", "/specialization", "fa-compass"],
  ["Assign customer", "/connectEmployee", "fa-compass"],
  ["Overview", "/overview", "fa-compass"],
  ["Customers", "/customer", "fa-compass"],
  ["My profile", "/profile", "fa-compass"],
  ["Employees", "/employee", "fa-compass"],
];

export function getItemList(role){

  let itemsParam;

  switch (role){
    case "ADMIN":{
      itemsParam = ADMIN;
      break;
    }
    case "USER":{
      itemsParam = USER;
      break;
    }
    case "MANAGER":{
      itemsParam = MANAGER;
      break;
    }
    case "OWNER":{
      itemsParam = OWNER;
      break;
    }
    default:
      itemsParam = SITE1;
      break;
  }


  var itemList = [];
  for (let i in itemsParam) {
    let name = itemsParam[i][0];
    let path = itemsParam[i][1];
    let iconText = itemsParam[i][2];

    itemList.push({
      label: name, icon: iconText, command: () => {
        history.push(path)
      }
    });
  }

  itemList.push({
    label: 'Logout', icon: "pi pi-power-off", style: {left: 40}, command: () => {
      ; // TODO: no action for logout-click not implemented yet
    }
  });

  return itemList;
}
