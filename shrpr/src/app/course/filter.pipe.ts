import {Pipe, PipeTransform} from '@angular/core';
@Pipe({
    name: 'isInGroup',
    pure: false
})
export class IsInGroup implements PipeTransform {
    transform(groups: string[], groupName: string): boolean {
        let filteredGroup = groups.filter(p => p.indexOf(groupName) !== -1);
        if (filteredGroup.length > 0)
            return true;
        return false;
    }
}