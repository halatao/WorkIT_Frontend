export class Filter {
  salaryMin: number;
  locationIds: number[];
  categoryIds: number[];
  created: Date;
  search: string;

  constructor(
    salaryMin: number,
    locationIds: number[],
    categoryIds: number[],
    created: Date,
    search: string
  ) {
    this.salaryMin = salaryMin;
    this.locationIds = locationIds;
    this.categoryIds = categoryIds;
    this.created = created;
    this.search = search;
  }
}
