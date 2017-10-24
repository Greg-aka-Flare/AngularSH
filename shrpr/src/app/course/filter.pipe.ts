import {Pipe, PipeTransform} from '@angular/core';
@Pipe({name: 'groups'})
export class GroupsPipe implements PipeTransform {
  transform(value, args:string[]) : any {
    var groups = {};
    value.forEach(function(o) {
      var group = o.group;
      groups[group] = groups[group] ?
         groups[group] : { name: group, resources: [] };
      groups[group].resources.push(o);  
    });

    return Object.keys(groups).map(function (key) {return groups[key]});
  }
}