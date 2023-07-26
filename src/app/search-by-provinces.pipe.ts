import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchByProvinces'
})
export class SearchByProvincesPipe implements PipeTransform {

  transform(interest: any[], filterText: string) {
    if(interest.length === 0 || filterText === ''){
      return interest;
    }else{
      return interest.filter((interest) =>
      {
        return interest.province.toLowerCase() === filterText.toLowerCase()
      })
    }
  }

}
