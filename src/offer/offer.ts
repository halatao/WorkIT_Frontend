import { Category } from 'src/model/category';
import { Location } from 'src/model/location';
import { Response } from 'src/model/response';
import { User } from 'src/model/user';

export class Offer {
  id: number;
  name: string;
  salaryLowest: number;
  salaryHighest: number;
  location: Location;
  category: Category;
  user: User;
  responses: Response[];

  constructor(
    id: number,
    name: string,
    salaryLowest: number,
    salaryHighest: number,
    location: Location,
    category: Category,
    user: User,
    responses: Response[]
  ) {
    this.id = id;
    this.name = name;
    this.salaryLowest = salaryLowest;
    this.salaryHighest = salaryHighest;
    this.location = location;
    this.category = category;
    this.user = user;
    this.responses = responses;
  }
}
