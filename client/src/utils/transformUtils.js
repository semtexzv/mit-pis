export const transformMeetings = (rawData, customers, brands) => {

  return rawData.map((meeting) => {

    const customer = customers.find((obj) => obj.id === meeting.customerId);
    const brand = brands.find((obj) => obj.id === customer.brandId);

    return {
    meetingId: meeting.id,
    customerId: meeting.customerId,
    date: meeting.date,
      name: customer.name,
      surname: customer.surname,
      title: customer.title,
      brand: brand.name,
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

export const transformEmployees2 = (rawData, userId) =>  {

  rawData = rawData.filter(function (employee) {
    return employee.id !== userId;
  });

  return rawData.map((employee) => {
    return {
      id: employee.id,
      name: employee.name,
      surname: employee.surname,
      username: employee.username,
      role: employee.sysRole,
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

export const transformUserProfileToJSON = (username, name, surname) =>  {
  return{
    username: username,
    name: name,
    surname: surname,
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
      date: meeting.date,
    }});

};


export const transformCustomersToRows = (customers, brands, userId, role) =>  {

  if(role === "USER"){
    customers = customers.filter((customer) => customer.assocEmployeeId === userId);
  }

   return customers.map((customer) => {

    const brand = brands.find(o => o.id === customer.brandId);

    return {
      id: customer.id,
      name: customer.name,
      surname: customer.surname,
      title: customer.title,
      brand: brand.name,
      info: customer.info,
    }});
};
