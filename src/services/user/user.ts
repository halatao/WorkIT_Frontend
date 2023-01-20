import { Response } from 'src/model/response';
import { Role } from 'src/model/role';
import { Offer } from '../offer/offer';

export class User {
  id: number;
  username: string;
  role: Role;
  offers: Offer[];
  responses: Response[];

  constructor(
    id: number,
    username: string,
    role: Role,
    offers: Offer[],
    responses: Response[]
  ) {
    this.id = id;
    this.username = username;
    this.role = role;
    this.offers = offers;
    this.responses = responses;
  }
}
