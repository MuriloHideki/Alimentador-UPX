import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatKg'
})
export class FormatKgPipe implements PipeTransform {

  transform(value: number): any {
    return value / 1000;
  }
}
