// Angular
import { Component, OnInit, ChangeDetectorRef, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Form, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'pt-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: [],
})
export class UserProfilePage implements OnInit {
  stateList: any[] = [];
  loading: boolean = false;
  profileForm: FormGroup;
    profileDetails:any= {};
  constructor(

    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private http: HttpClient, @Inject('BASE_URL') public baseUrl: string,
    public snackBar: MatSnackBar
  ) {
    this.stateList = [{ name: 'Arizona', id: 1 },
    { name: 'Texas', id: 2 }];
  }
  ngOnInit(): void {
          this.loadProfileDetails()
  }

  openSnackBarVerification(message) {
    this.snackBar.open(message, "", {
      duration: 2000,
    });
  }

  loadProfileDetails() {
    this.profileDetails = {};
    var id  = localStorage["userid"];
    this.loading = true;
    var url = "api/user/profile?userUID=" + id;
    this.http.get<any>(this.baseUrl + url).subscribe(result => {
      if (result.status && result.data && result.data.length > 0) {
        this.loading = false;
        this.profileDetails = result.data[0];
      }
      else {
        this.profileDetails = {};
        this.openSnackBarVerification("Could not load profile information");
      }

      this.cdr.markForCheck();
    },
      error => {
        this.loading = false;
      });
  }



  submit() { }


}
