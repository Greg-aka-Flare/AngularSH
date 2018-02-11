import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'slug'
})
export class SlugPipe implements PipeTransform {

  transform(value: string, args?: any): any {

  	//convert to lowercase, remove leading/trailing spaces
  	value = value.toLowerCase().trim();

  	//remove all non-alphanumeric/hyphens/spaces
  	value = value.replace(/[^a-z0-9-\s]/g, '');

  	//replace multiple spaces/newlines with single space
  	//value = value.replace(/\s\s+/g, '-');

  	//replace spaces with hyphens
  	value = value.replace(/\s+/g, '-');

    return value;
  }
}