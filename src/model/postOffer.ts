export class PostOffer {
  offerName: string;
  offerDescription: string;
  userId: number;
  categoryId: number;
  locationId: number;
  salaryMin: number;
  salaryMax: number;

  constructor(
    offerName: string,
    offerDescription: string,
    userId: number,
    categoryId: number,
    locationId: number,
    salaryMin: number,
    salaryMax: number
  ) {
    this.offerName = offerName;
    this.offerDescription = offerDescription;
    this.userId = userId;
    this.categoryId = categoryId;
    this.locationId = locationId;
    this.salaryMin = salaryMin;
    this.salaryMax = salaryMax;
  }
}
