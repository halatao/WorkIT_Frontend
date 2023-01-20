export class PostReply {
  responseText: string;
  curriculumVitae: string;
  userId: number;
  offerId: number;

  constructor(
    responseText: string,
    curriculumVitae: string,
    userId: number,
    offerId: number
  ) {
    this.responseText = responseText;
    this.curriculumVitae = curriculumVitae;
    this.userId = userId;
    this.offerId = offerId;
  }
}
