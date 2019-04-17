
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
    d.getFullYear() + " " +
    d.getHours() + ":" +
    formatNumber(d.getMinutes())
  )
}

function FEdate2javaDateTime(input){
  let date = new Date(input);
  return date.toISOString();
}

function recursiveConvert_ISO_date(tableData){
  findAndReplace(tableData, "date", javaDateTime2FEdate);
  return tableData;
}

function convert_ISO_date(oneDate){
  if(oneDate.length !== 0)
    return javaDateTime2FEdate(oneDate);
  else
    return oneDate;
}

function convert_FE_date(oneDate){
  return FEdate2javaDateTime(oneDate);
}

export {recursiveConvert_ISO_date, convert_ISO_date, convert_FE_date};
