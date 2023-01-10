import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  public transform(value: any, keys: string, term: string) {
    if (keys) {
      if (!term) { return value; }
      return (value || []).filter((item: any) => keys.split(',').some(key => item.hasOwnProperty(key) && new RegExp(term, 'gi').test(item[key])));
    }

  }
}


/*
 transform(value: any, keyWord: string) {
   if(value.length === 0 || keyWord === ''){
    return value;
   }else{
    return value.filter((item:any)=>{
      return item.name.toLowerCase() === keyWord.toLowerCase()
    })
   }
  }

*/
