import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
    name: 'datex'
})

export class DatexPipe implements PipeTransform {
	transform(value: any, format: string = ""): string {
	    var momentDate = moment(value);
	    // If moment didn't understand the value, return it unformatted.
		if (!momentDate.isValid()) return value;	
	    // Otherwise, return the date formatted as requested.
        return momentDate.format(format);
    }
}

@Pipe({
  name: 'truncate'
})
export class TruncatePipe {
  transform(value: string, args: string[]) : string {
    let limit = args.length > 0 ? parseInt(args[0], 90) : 90;
    let trail = args.length > 1 ? args[1] : '...';

    return value.length > limit ? value.substring(0, limit) + trail : value;
  }
}