import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
import { Offer } from 'src/services/offer/offer';
import { UserService } from 'src/services/user/user.service';
import { PostReply } from 'src/model/postReply';
import { ResponseService } from 'src/services/response/response.service';

@Component({
  selector: 'app-selected-offer',
  templateUrl: './selected-offer.component.html',
  styleUrls: ['./selected-offer.component.css'],
})
export class SelectedOfferComponent implements OnInit {
  selectedOffer: Offer = <Offer>{};
  replyFormVisible: boolean = true;
  responses: any[] = [];
  selectedResponse: any = <any>{};
  selectedResponseActive: boolean = false;
  param: number = 0;
  replyForm: FormGroup = new FormGroup({
    reply: new FormControl(''),
    cv: new FormControl(''),
  });
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    public userService: UserService,
    public response: ResponseService,
    private router: Router
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
    if (this.userService.user.role.name == 'recruiter') {
      let header = {
        headers: new HttpHeaders().set(
          'Authorization',
          'Bearer ' + this.userService.jwt
        ),
      };
      let url =
        'https://localhost:7003/api/Responses/ByOffer?offerId=' + this.param;
      this.http.get<any[]>(url, header).subscribe((res) => {
        this.setResponses(res);
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
  setResponses(responses: any[]) {
    this.responses = [];
    responses.forEach((response) => {
      this.responses.push(response);
    });
  }

  setResponse(i: number) {
    this.selectedResponse = this.responses.find((q) => q.responseId == i);
    this.selectedResponseActive = true;
    console.log(this.selectedResponse);
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

    const url = 'https://localhost:7003/api/Responses/Create';
    let header = {
      headers: new HttpHeaders().set(
        'Authorization',
        'Bearer ' + this.userService.jwt
      ),
    };
    this.http.post<PostReply>(url, postReply, header).subscribe(
      (response: any) => {},
      (error: any) => {
        if (error.status == 401) {
          this.router.navigate(['/auth']);
        }
      }
    );
    this.replyFormToggle();
  }

  replyFormToggle() {
    this.replyFormVisible = !this.replyForm;
  }
}
