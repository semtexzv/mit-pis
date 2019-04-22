
function raiseGrowl(message="", handler, severity="error"){
  if(typeof handler !== 'undefined') {
    if (severity === "error")
      handler.show({severity: "error", summary: "Error Message", detail: message});
    else if (severity === "info")
      handler.show({severity: "info", summary: "Info Message", detail: message});
    else if (severity === "warn")
      handler.show({severity: "warn", summary: "Warning Message", detail: message});
    else if (severity === "success")
      handler.show({severity: "success", summary: "Success Message", detail: message});
    else
      handler.show({severity: "info", summary: "Internal Message", detail: message});
  }
}

export default raiseGrowl;
