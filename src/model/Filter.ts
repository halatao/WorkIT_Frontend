export class Filter {
  salaryMin: number;
  locationIds: number[];
  categoryIds: number[];

  constructor(salaryMin: number, locationIds: number[], categoryIds: number[]) {
    this.salaryMin = salaryMin;
    this.locationIds = locationIds;
    this.categoryIds = categoryIds;
  }
}
