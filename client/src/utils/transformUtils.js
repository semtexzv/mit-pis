export const transformMeetings = (rawData, customers) => {

  return rawData.map((meeting) => {

    const customer = customers.find((obj) => obj.id === meeting.customerId);

    return {
    meetingId: meeting.id,
    customerId: meeting.customerId,
    date: "",
      name: customer.name,
      surname: customer.surname,
      title: customer.title,
      brand: customer.brandId,
      customerInfo: customer.info,
      meetingInfo: meeting.report
  }});

};

export const transformCustomers = (rawData) =>  {

  return rawData.map((customer) => {

    return {
      label: customer.name + " " + customer.surname,
      value: customer.id,
      title: customer.title,
      brand: customer.brandId
    }});

};

export const transformEmployees = (rawData) =>  {

  return rawData.map((employee) => {

    return {
      label: employee.name + " " + employee.surname,
      value: employee.id,
    }});

};

export const transformBrands = (rawData) =>  {

  return rawData.map((brand) => {

    return {
      label: brand.name,
      value: brand.id,
    }});

};
