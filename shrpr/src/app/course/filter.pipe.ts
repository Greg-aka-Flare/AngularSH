import {Pipe, PipeTransform} from '@angular/core';

@Pipe({ name: 'groups' })
export class GroupsPipe implements PipeTransform {

  transform(value, select: string) : any {

    //if empty, return intial value
    if(!value) return value;

    //create empty array
    let courses = [];

    //for every course
    value.every(function(course, i) {

      //add course
      if(course.group.label === select) courses.push(course);

      //while less than 3, keep going
      return courses.length < 3 ? true : false; 
    });

    //return new array
    return courses;
  }
}