export class LoginHelper {

  mapFormdataToServie(formData) {
    if (formData) {
      const payload = {
        'email': formData.username,
        'password': formData.password,
      };
      return payload;
    }
  }

}
