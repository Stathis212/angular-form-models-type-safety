import { Component, Input } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import {
  PersonForm,
  PersonFormKey,
  PersonFormModel,
  PersonViewModel,
} from '../../core/models/person.model';
import { ServiceViewModel } from '../../core/models/service.model';
import { isEqual } from 'lodash';

@Component({
  selector: 'person-form',
  templateUrl: './person-form.component.html',
})
export class PersonFormComponent {
  @Input() public existingPersonData: PersonViewModel;

  public form: PersonForm;
  public formHasChanges: boolean;

  public firstNameKey: PersonFormKey = 'firstName';
  public lastNameKey: PersonFormKey = 'lastName';
  public includeServicesKey: PersonFormKey = 'includeServices';
  public includeServicesText: string;

  private initialFormValue: PersonFormModel;
  private subscription: Subscription = new Subscription();

  constructor(private fb: FormBuilder) {}

  public ngOnInit(): void {
    this.mapExistingPersonDataToInitialFormValue();
    this.buildForm();
    this.adjustIncludeServicesText(
      this.form.get(this.includeServicesKey).value
    );
    this.subscribeToFormChanges();
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public setIncludeServices(shouldIncludeEvent: Event) {
    this.adjustIncludeServicesText(shouldIncludeEvent.target['checked']);
  }

  private mapExistingPersonDataToInitialFormValue(): void {
    this.initialFormValue = {
      firstName: this.existingPersonData?.firstName || '',
      lastName: this.existingPersonData?.lastName || '',
      serviceIds:
        this.existingPersonData?.services?.map(
          (service: ServiceViewModel) => service.id
        ) || [],
      includeServices: this.existingPersonData?.services?.length > 0,
    };
  }

  private buildForm(): void {
    const controls: { [K in PersonFormKey]: AbstractControl } = {
      firstName: this.fb.control(this.initialFormValue.firstName, [
        Validators.required,
      ]),
      lastName: this.fb.control(this.initialFormValue.lastName, [
        Validators.required,
      ]),
      serviceIds: this.fb.control(this.initialFormValue.serviceIds),
      includeServices: this.fb.control(this.initialFormValue.includeServices),
    };
    this.form = new PersonForm(controls);
  }

  private subscribeToFormChanges(): void {
    this.subscription = this.form.valueChanges.subscribe(
      (value: PersonFormModel) => {
        this.formHasChanges = !isEqual(value, this.initialFormValue);
      }
    );
  }

  private adjustIncludeServicesText(shouldInclude: boolean): void {
    this.includeServicesText = `Services ${
      !shouldInclude ? 'not' : ''
    } Included`;
  }
}
