import { PersonModel } from '../../core/models/person.model';

export const stathisPerson: PersonModel = {
  first_name: 'Stathis',
  last_name: 'T',
  age: 34,
  is_active: true,
  services: [
    {
      id: 1,
      name: 'Service 1',
    },
    {
      id: 2,
      name: 'Service 2',
    },
  ],
};
