import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'truncate' })
export class TruncatePipe implements PipeTransform {
    transform(value: string, chars: number): string {
        if (value.length > chars) {
            const text = `${value.substring(0, chars)} ...`;
            return text;
        } else {
            return value;
        }
    }
}