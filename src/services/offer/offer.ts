import { Category } from 'src/services/category/category';
import { Location } from 'src/services/location/location';
import { Response } from 'src/model/response';
import { User } from 'src/services/user/user';

export class Offer {
  id: number;
  name: string;
  description: string;
  salaryLowest: number;
  salaryHighest: number;
  location: Location;
  category: Category;
  user: User;
  responses: Response[];

  constructor(
    id: number,
    name: string,
    description: string,
    salaryLowest: number,
    salaryHighest: number,
    location: Location,
    category: Category,
    user: User,
    responses: Response[]
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.salaryLowest = salaryLowest;
    this.salaryHighest = salaryHighest;
    this.location = location;
    this.category = category;
    this.user = user;
    this.responses = responses;
  }
}
