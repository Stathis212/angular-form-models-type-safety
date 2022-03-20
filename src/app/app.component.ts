import { Component, OnInit, VERSION } from '@angular/core';
import { PersonModel, PersonViewModel } from './core/models/person.model';
import { stathisPerson } from './shared/mocks/person.mock';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  personDataFromApiResponse: PersonModel = stathisPerson;
  existingPersonData: PersonViewModel;

  public ngOnInit(): void {
    this.existingPersonData = new PersonViewModel(
      this.personDataFromApiResponse
    );
  }
}
