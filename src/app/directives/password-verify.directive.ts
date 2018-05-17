import { Directive, Input } from '@angular/core';
import { ValidatorFn, AbstractControl , NG_VALIDATORS} from '@angular/forms';

@Directive({
  selector: '[appPasswordVerify]',
  providers: [{ provide: NG_VALIDATORS, useExisting: PasswordVerifyDirective, multi: true }]
})
export class PasswordVerifyDirective {

  constructor() { }

  @Input('appPasswordVerify') password: string;

  validate(control: AbstractControl): { [key: string]: any } {
    return this.password ? PasswordValidator(this.password)(control)
      : null;
  }

}

export function PasswordValidator(password: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    const equal = password===control.value;
    return equal ? null: { 'passwordEqual': { value: control.value } };
  };
}


