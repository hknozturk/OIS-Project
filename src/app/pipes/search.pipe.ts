import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform(value: any[], searchParams: string): any[] {
    if (!value) {
      return [];
    }

    if (!searchParams) {
      return value;
    }

    return value.filter(result => {
      const searchResult = String(searchParams);
      return String(result['diseaseName']['value']).includes(searchResult);
    });
  }
}
