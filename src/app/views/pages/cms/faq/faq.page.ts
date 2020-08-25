// Angular
import { Component, OnInit, ChangeDetectorRef, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Form, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'pt-cms-faq',
  templateUrl: './faq.page.html',
  styleUrls: [],
})
export class FAQPage implements OnInit {
  panelOpenState: boolean = false;
  loading: boolean = false;
  constructor(

    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private http: HttpClient, @Inject('BASE_URL') public baseUrl: string,
    public snackBar: MatSnackBar
  ) {

  }
  ngOnInit(): void {
    this.loadFAQDetails()
  }

  openSnackBarVerification(message) {
    this.snackBar.open(message, "", {
      duration: 2000,
    });
  }

  loadFAQDetails() {
 
  }



  submit() { }


}
