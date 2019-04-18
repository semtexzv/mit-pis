
function findAndReplace(obj, key, func) {
  let list = [ ];
  if (!obj) return list;
  if (obj instanceof Array) {
    for (let i in obj) {
      list = list.concat(findAndReplace(obj[i], key, func));
    }
    return list;
  }
  if (obj[key]) {
    list.push(obj[key]);
    obj[key] = func(obj[key]);
  }

  if ((typeof obj == "object") && (obj !== null)) {
    let children = Object.keys(obj);
    if (children.length > 0) {
      for (let i = 0; i < children.length; i++) {
        list = list.concat(findAndReplace(obj[children[i]], key, func));
      }
    }
  }
  return list;
}

function formatNumber(input){
  let number = input.toString();
  return ("0" + number).slice(-2);
}

function javaDateTime2FEdate(input){
  let d = new Date(input);
  return (
    formatNumber(Number(d.getMonth())+1) + "/" +
    formatNumber(d.getDate()) + "/" +
    (d.getFullYear().toString()).slice(2) + " " +
    d.getHours() + ":" +
    formatNumber(d.getMinutes())
  )
}

// input: [{... date: 2019-04-17T21:10:04.557Z}, ...]
// output:[{... date: 04/17/19 21:10}, ...]
function recursiveConvert_ISO_date(tableData){
  findAndReplace(tableData, "date", javaDateTime2FEdate);
  return tableData;
}

// input:  2019-04-17T21:10:04.557Z or 04/17/19 21:10
// output: instanceof Date()
function convert_ISO_date(oneDate){
  if(oneDate.length !== 0) {
    return new Date(oneDate);
  }
}

// input:  instanceof Date()
// output: 2019-04-17T21:10:04.557Z
function convert_FE_date(oneDate){
  if(oneDate instanceof Date) {
    return oneDate.toISOString();
  }
}

// return today date and set zero minutes
function todayDate(){
  let date = new Date();
  date.setMinutes(0);
  return date;
}

export {recursiveConvert_ISO_date, convert_ISO_date, convert_FE_date, todayDate};
