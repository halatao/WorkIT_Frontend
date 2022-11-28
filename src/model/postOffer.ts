export class PostOffer {
  name: string;
  salaryLowest: number;
  salaryHighest: number;
  location: number;
  category: number;
  user: number;

  constructor(
    name: string,
    salaryLowest: number,
    salaryHighest: number,
    location: number,
    category: number,
    user: number
  ) {
    this.name = name;
    this.salaryLowest = salaryLowest;
    this.salaryHighest = salaryHighest;
    this.location = location;
    this.category = category;
    this.user = user;
  }
}
