import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class UppercasePipe implements PipeTransform {  // this pipe transform our data by converting it to uppercase and then return to controller
  transform(value: any, metadata: ArgumentMetadata) { // the data first comes in value parameter
    if(typeof value === 'string'){
      return value.toUpperCase();
    }
    return value;
  }
}
