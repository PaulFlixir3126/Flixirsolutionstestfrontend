import { Injectable, Inject } from '@angular/core';


@Injectable()
export class DateActionService {
  constructor() {

  }

  getDateString(date) :string {
    var today = date;
    var datestring = "";
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    datestring = yyyy + '/' + mm + '/' + dd;
    return datestring;
  }

  getDateTimeString(date) {
    var obj = {};
    var today = date;
    var datestring = "";
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    datestring = yyyy + '/' + mm + '/' + dd;

    var h = today.getHours(), m = today.getMinutes();
    var _time = (h > 12) ? (h - 12 + ':' + m + ' PM') : (h + ':' + m + ' AM');

    return {
      date: datestring,
      time: _time
    };
  }
}
