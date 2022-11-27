export class Response {
  id: number;
  reply: string;
  cv: string;

  constructor(id: number, reply: string, cv: string) {
    this.id = id;
    this.reply = reply;
    this.cv = cv;
  }
}
