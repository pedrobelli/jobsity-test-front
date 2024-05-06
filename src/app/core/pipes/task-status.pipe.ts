import { Pipe, PipeTransform } from '@angular/core';

import { Status, StatusMap } from '../../shared/enums/status';

@Pipe({
  name: 'taskStatus'
})
export class TaskStatusPipe implements PipeTransform {

  transform(value: Status): unknown {
    if (value in Status) {
      return StatusMap.get(value);
    } else {
      return 'Invalid';
    }
  }

}
