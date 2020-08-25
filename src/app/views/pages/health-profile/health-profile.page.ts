// Angular
import { Component, OnInit, ChangeDetectorRef, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Form, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'pt-health-profile',
  templateUrl: './health-profile.page.html',
  styleUrls: [],
})
export class HealthProfilePage implements OnInit {
  genderList: any[] = [];
  loading: boolean = false;
  profileForm: FormGroup;
  profileDetails: any = {};
  issueList: any = ["Issue 1", "Issue 2"];
  loading_current: boolean = false;
 
  constructor(

    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private http: HttpClient, @Inject('BASE_URL') public baseUrl: string,
    public snackBar: MatSnackBar
  ) {
    this.genderList = ["Male", "Female"];
  }
  ngOnInit(): void {
    this.loadProfileDetails()
  }

  openSnackBarVerification(message) {
    this.snackBar.open(message, "", {
      duration: 2000,
    });
  }

  changeCurrentHealth() {
    this.profileDetails.healthProfile.currentCondition.isCurrentHealthCondition = !this.profileDetails.healthProfile.currentCondition.isCurrentHealthCondition;

  }

  loadProfileDetails() {
    this.profileDetails = {};
    var health = {
      gender: '',
      dob: '',
      height: '',
      weight: '',
      currentMedicalConditions:[]
    };

    var id = localStorage["userid"];
    this.loading = true;
    var url = "api/user/profile?userUID=" + id;
    this.http.get<any>(this.baseUrl + url).subscribe(result => {
      if (result.status && result.data && result.data.length > 0) {
        this.loading = false;
        this.profileDetails = result.data[0];
        if (!this.profileDetails.healthProfile) {
          this.profileDetails.healthProfile = health;
        }

        if (!this.profileDetails.healthProfile.currentCondition) {
          var currentCondition = {
            isCurrentHealthCondition: false,
            currentMedicalConditions: []
          };
          this.profileDetails.healthProfile.currentCondition = currentCondition;
        }
    
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

  submitCurrentCondition() {
    var id = localStorage["userid"];
    this.profileDetails.userUID = id;
    this.loading = true;
    var url = "api/user/profile/update"
    this.http.put<any>(this.baseUrl + url, this.profileDetails).subscribe(result => {
      if (result.status && result.data) {
        this.loading = false;
        this.openSnackBarVerification(result.message);
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



  submit(type:string) {
           
    var id = localStorage["userid"];
    this.profileDetails.userUID = id;
    if (type == "HEALTH") {
      this.loading = true;
    }
    else {
      this.loading_current = true;
    }

    var url = "api/user/profile/update"
    this.http.put<any>(this.baseUrl + url, this.profileDetails).subscribe(result => {
      if (result.status && result.data ) {
        this.loading = false;
        this.loading_current = false;
        this.openSnackBarVerification(result.message);
      }
      else {
        this.profileDetails = {};
        this.openSnackBarVerification("Could not load profile information");
      }

      this.cdr.markForCheck();
    },
      error => {
        this.loading = false;
        this.loading_current = false;
      });

  }


}
