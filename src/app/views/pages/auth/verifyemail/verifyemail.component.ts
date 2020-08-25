// Angular
import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// RxJS
import { finalize, takeUntil, tap } from 'rxjs/operators';
// Translate
import { TranslateService } from '@ngx-translate/core';
// NGRX
import { Store } from '@ngrx/store';
import { AppState } from '../../../../core/reducers';
// Auth
import { AuthNoticeService, AuthService, Register, User } from '../../../../core/auth/';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepper } from '@angular/material/stepper';

@Component({
	selector: 'pt-verify-user-email',
  templateUrl: './verifyemail.component.html',
	encapsulation: ViewEncapsulation.None
})
export class VerifyEmailComponent implements OnInit, OnDestroy {
  emailForm: FormGroup;
  verificationForm: FormGroup;
	loading = false;
  errors: any = [];
  showVerifyCode = false;
  resultCode :any = {};

	private unsubscribe: Subject<any>; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

	/**
	 * Component constructor
	 *

	 * @param translate: TranslateService
	 * @param router: Router
	 * @param auth: AuthService
	 * @param store: Store<AppState>
	 * @param fb: FormBuilder
	 * @param cdr
	 */
	constructor(
    private authNoticeService: AuthNoticeService,
		private translate: TranslateService,
    private router: Router,
    private route: ActivatedRoute    ,
		private auth: AuthService,
		private store: Store<AppState>,
		private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private http: HttpClient, @Inject('BASE_URL') public baseUrl: string,
    public snackBar: MatSnackBar
	) {
		this.unsubscribe = new Subject();
	}

	/*
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
    */

	/**
	 * On init
	 */
	ngOnInit() {
    //this.route.queryParams.subscribe(params => {
    //  if (params) {
    //    var _token = params.token;
    //    var id = params.userId;
    //    if (_token && id) {
    //      this.verifyEmail(_token, id)
    //    }
    //  }
    //});

    this.initRegisterForm();
  }

  isControlHasErrorEmail(controlName: string, validationType: string): boolean {
    const control = this.emailForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result = control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }


  isControlHasErrorVerify(controlName: string, validationType: string): boolean {
    const control = this.verificationForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result = control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }

  initRegisterForm() {
    this.emailForm = this.fb.group({
   
      lastName: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ])
      ],
 
      email: ['', Validators.compose([
        Validators.required,
        Validators.email,
        Validators.minLength(3),
        // https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
        Validators.maxLength(320)
      ]),
      ],

    });

    this.verificationForm = this.fb.group({

      verificationCode: ['', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(6)
      ])
      ]
    });
  }

	/*
    * On destroy
    */
	ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
		this.loading = false;
  }

  openSnackBarVerification(message) {
    this.snackBar.open(message, "", {
      duration: 2000,
    });
  }

  verifyCode(stepper: MatStepper) {
    const controls = this.verificationForm.controls;

    // check form
    if (this.verificationForm.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      return;
    }

    //const _user: User = new User();

    this.resultCode.otp = controls.verificationCode.value;;
    this.loading = true;
    var url = "api/user/verify/otp";
    this.http.post<any>(this.baseUrl + url, this.resultCode).subscribe(result => {
      if (result.status && result.data) {
        stepper.next();
        this.cdr.markForCheck();
        this.loading = false;
        window.location.href = 'https://payments.pabbly.com/subscribe/5f324b17719adb0e645c9438/SUB_Plan_Test';
      }
      else {
        this.openSnackBarVerification("OTP verification error occured");
      }

      this.cdr.markForCheck();
    },
      error => {
        this.loading = false;
      });

  }


  resendCode() {
    this.resultCode = {};
    const controls = this.emailForm.controls;

    // check form
    if (this.emailForm.invalid) {
      console.log(this.emailForm);
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      return;
    }

    //const _user: User = new User();
    var _user: any = {};
    _user.email = controls.email.value;
    _user.lastName = controls.lastName.value;

    //this.openSnackBarVerification("A verification code has been sent to your email!");
    this.loading = true;
    var url = "api/user/verify/email";
    this.http.post<any>(this.baseUrl + url, _user).subscribe(result => {
      if (result.status && result.data) {

        this.loading = false;
        this.showVerifyCode = true;
        this.resultCode = result.data.token;
        this.openSnackBarVerification("A verification code has been sent to your email!");
        this.cdr.markForCheck();
      }
      else {
        this.openSnackBarVerification("Error occured while requesting OTP");
      }
    },
      error => {
        this.loading = false;
      });
  }

  requestVerificationCode(stepper: MatStepper) {

    this.resultCode = {};
    const controls = this.emailForm.controls;

    // check form
    if (this.emailForm.invalid) {
      console.log(this.emailForm);
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      return;
    }

    //const _user: User = new User();
    var _user: any = {};
    _user.email = controls.email.value;
    _user.lastName = controls.lastName.value;

    //this.openSnackBarVerification("A verification code has been sent to your email!");
    this.loading = true;
    var url = "api/user/verify/email";
    this.http.post<any>(this.baseUrl + url, _user).subscribe(result => {
      if (result.status && result.data) {
 
        this.loading = false;
        this.showVerifyCode = true;
       this.resultCode = result.data.token;
        this.openSnackBarVerification("A verification code has been sent to your email!");
        stepper.next();
        this.cdr.markForCheck();
      }
      else {
        this.openSnackBarVerification("Error occured while requesting OTP");
      }
    },
      error => {
        this.loading = false;
      });

  }

  verifyEmail(_token, id) {
    var obj = {
      userId: id
    };
    localStorage.removeItem("token");
    localStorage["token"] = _token;
    this.loading = true;
    var url = "api/user/verify/otp";
    this.http.put<any>(this.baseUrl + url, obj).subscribe(result => {
      if (result.status && result.message) {
        this.loading = false;
        this.router.navigate(['auth/login'])
      }
      else {

      }
    },
      error => {
        this.loading = false;
      });
  }


	
}
