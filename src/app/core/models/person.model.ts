import { AbstractControl, FormGroup } from '@angular/forms';
import { ServiceModel, ServiceViewModel } from './service.model';

export interface PersonModel {
  first_name: string;
  last_name: string;
  age: number;
  is_active: boolean;
  services: ServiceModel[];
}

export class PersonViewModel {
  firstName: string;
  lastName: string;
  age: number;
  isActive: boolean;
  services: ServiceViewModel[];

  constructor(responseData: PersonModel) {
    this.firstName = responseData.first_name;
    this.lastName = responseData.last_name;
    this.age = responseData.age;
    this.isActive = responseData.is_active;
    this.services = responseData.services.map(
      (service: ServiceModel) => new ServiceViewModel(service)
    );
  }
}

export class PersonFormModel {
  firstName: string;
  lastName: string;
  serviceIds: number[];
  includeServices: boolean;
}

export type PersonFormKey = keyof PersonFormModel;

export class PersonForm extends FormGroup {
  value: PersonFormModel;

  controls: { [K in PersonFormKey]: AbstractControl };

  constructor(controls = {}, validators = []) {
    super(controls, validators);
  }
}
