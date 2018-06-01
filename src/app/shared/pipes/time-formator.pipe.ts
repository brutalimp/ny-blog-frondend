import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'timeFormator'
})
export class TimeFormatorPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return moment(value).format('YYYY-MM-DD hh:mm:ss a');
  }

}
