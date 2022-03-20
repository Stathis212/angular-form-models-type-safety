export interface ServiceModel {
  id: number;
  name: string;
}

export class ServiceViewModel {
  id: number;
  name: string;

  constructor(responseData: ServiceModel) {
    this.id = responseData.id;
    this.name = responseData.name;
  }
}
