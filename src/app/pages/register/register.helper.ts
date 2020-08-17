export class RegisterHelper {

  mapFormdataToServie(formData) {
    if (formData) {
      const payload = {
        'email': formData.emailId,
        'password': formData.password,
        'firstName': formData.firstName,
        'lastName': formData.lastName,
        'mainAdmin': true,
        'designation': formData.designation,
        'contact': {
          'primaryPhone': {
            'countryCode': '+91',
            'number': formData.phoneNumber
          }
        }
      };
      return payload;
    }
  }

}
