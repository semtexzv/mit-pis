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

export const transformConnectedEmployees = (rawData, brands, employees) =>  {

  return rawData.map((customer) => {

    const employee = employees.find(o => o.id === customer.assocEmployeeId);
    const brand = brands.find(o => o.id === customer.brandId);

    return {
      id: customer.id,
      name: customer.name,
      surname: customer.surname,
      assigned: employee.name + " " + employee.surname,
      brand: brand.name
    }});

};

export const transformUsersSpecializations = (specializations, userId) =>  {

  const usersSpecialization = specializations.filter(function (specialization) {
    return specialization.id.employeeId === userId;
  });

  return usersSpecialization.map((specialization) => {

    return {
      id: specialization.id.brandId,
    }});

};

export const transformUsersSpecializationsToJSON = (selectedBrands, userId) =>  {
    return {
      employeeId: userId,
      brandId: selectedBrands
    };

};

export const transformUserProfileToJSON = (username, name, surname, role) =>  {
  return{
    username: username,
    name: name,
    surname: surname,
    sysRole: role
  }

};


export const transformToOverViewRows = (meetings, users, brands, customers) =>  {

  return meetings.map((meeting) => {

    const customer = customers.find(o => o.id === meeting.customerId);
    const employee = users.find(o => o.id === customer.assocEmployeeId);
    const brand = brands.find(o => o.id === customer.brandId);

    return {
      customerName: customer.name,
      customerSurname: customer.surname,
      employeeName: employee.name,
      employeeSurname: employee.surname,
      brand: brand.name,
      date: "cekam na ISO format",
    }});

};
