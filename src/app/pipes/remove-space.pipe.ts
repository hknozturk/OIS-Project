import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeSpace'
})
export class RemoveSpacePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return '';
    }

    const result = value.replace(/\s/g, '');
    return result;
  }
}
