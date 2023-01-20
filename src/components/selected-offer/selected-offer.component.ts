import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
import { Offer } from 'src/services/offer/offer';
import { UserService } from 'src/services/user/user.service';
import { PostReply } from 'src/model/postReply';

@Component({
  selector: 'app-selected-offer',
  templateUrl: './selected-offer.component.html',
  styleUrls: ['./selected-offer.component.css'],
})
export class SelectedOfferComponent implements OnInit {
  selectedOffer: Offer = <Offer>{};
  replyFormVisible: boolean = false;
  param: number = 0;
  replyForm: FormGroup = new FormGroup({
    reply: new FormControl(''),
    cv: new FormControl(''),
  });

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    public userService: UserService
  ) {}

  ngOnInit(): void {
    let active = false;
    this.route.params.subscribe((params) => {
      this.param = params['id'];
      active = true;
    });
    if (active) {
      let url = 'https://localhost:7003/api/Offers/ById?offerId=' + this.param;
      this.http.get(url).subscribe((res) => {
        this.setOffer(res);
      });
    }
  }
  setOffer(offer: any) {
    this.selectedOffer = new Offer(
      offer.offerId,
      offer.offerName,
      offer.offerDescription,
      offer.salaryMin,
      offer.salaryMax,
      offer.location,
      offer.category,
      offer.user,
      offer.reponses
    );
  }

  submitReply() {
    let value = this.replyForm.value;
    let reply = value.reply;
    let cv = value.cv;

    let postReply = new PostReply(
      reply,
      cv,
      this.userService.user.id,
      this.param
    );
    console.log(postReply);

    const url = 'https://localhost:7003/api/Responses/Create';
    let header = {
      headers: new HttpHeaders().set(
        'Authorization',
        'Bearer ' + this.userService.jwt
      ),
    };
    this.http
      .post<PostReply>(url, postReply, header)
      .subscribe((response: any) => {
        console.log(response);
      });
  }

  replyFormToggle() {
    this.replyFormVisible = !this.replyForm;
    console.log('tog');
  }
}
