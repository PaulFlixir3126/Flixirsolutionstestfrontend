// Angular
import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { Router } from '@angular/router';
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
import { ConfirmPasswordValidator } from './confirm-password.validator';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
	selector: 'kt-register',
	templateUrl: './register.component.html',
	encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit, OnDestroy {
	registerForm: FormGroup;
	loading = false;
	errors: any = [];

	private unsubscribe: Subject<any>; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

	/**
	 * Component constructor
	 *
	 * @param authNoticeService: AuthNoticeService
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
		private auth: AuthService,
		private store: Store<AppState>,
		private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private http: HttpClient, @Inject('BASE_URL') public baseUrl: string
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
		this.initRegisterForm();
	}

	/*
    * On destroy
    */
	ngOnDestroy(): void {
		this.unsubscribe.next();
		this.unsubscribe.complete();
		this.loading = false;
	}

	/**
	 * Form initalization
	 * Default params, validators
	 */
	initRegisterForm() {
		this.registerForm = this.fb.group({
			firstName: ['', Validators.compose([
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(100)
			])
      ],
      middleName: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(100)
      ])
      ],
      lastName: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ])
      ],
      userAddress: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ])
      ],
      phoneNo: ['', Validators.compose([
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10)
      ])
      ],
      gender: ['', Validators.compose([
        Validators.required
      ])
      ],
      maritalStatus: ['', Validators.compose([
        Validators.required
      ])
      ],
      dob: ['', Validators.compose([
        Validators.required
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

			password: ['', Validators.compose([
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(100)
			])
			],
			confirmPassword: ['', Validators.compose([
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(100)
			])
			],
			agree: [false, Validators.compose([Validators.required])]
		}, {
			validator: ConfirmPasswordValidator.MatchPassword
		});
	}

	/**
	 * Form Submit
	 */
	submit() {
		const controls = this.registerForm.controls;

		// check form
    if (this.registerForm.invalid) {
      console.log(this.registerForm);
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			return;
		}



		if (!controls.agree.value) {
			// you must agree the terms and condition
			// checkbox cannot work inside mat-form-field https://github.com/angular/material2/issues/7891
			this.authNoticeService.setNotice('You must agree the terms and condition', 'danger');
			return;
    }



    //const _user: User = new User();
    var _user: any = {};
		_user.email = controls.email.value;
    _user.firstName = controls.firstName.value;
    _user.middleName = controls.middleName.value;
    _user.lastName = controls.lastName.value;
    _user.phoneNo = controls.phoneNo.value;
    _user.dob = controls.dob.value;
    _user.gender = controls.gender.value;
    _user.password = controls.password.value;
    _user.userAddress = controls.userAddress.value;
    _user.maritalStatus = controls.maritalStatus.value;

    this.loading = true;
    var url = "api/user";
    this.http.post<any>(this.baseUrl + url, _user).subscribe(result => {
      if (result && result.message) {
        this.loading = false;
        this.router.navigate(['auth/verifyuseremail'])
      }
      else {

      }
    },
      error => {
        this.loading = false;
      });



		//this.auth.register(_user).pipe(
		//	tap(user => {
		//		if (user) {
		//			this.store.dispatch(new Register({authToken: user.accessToken}));
		//			// pass notice message to the login page
		//			this.authNoticeService.setNotice(this.translate.instant('AUTH.REGISTER.SUCCESS'), 'success');
		//			this.router.navigateByUrl('/auth/login');
		//		} else {
		//			this.authNoticeService.setNotice(this.translate.instant('AUTH.VALIDATION.INVALID_LOGIN'), 'danger');
		//		}
		//	}),
		//	takeUntil(this.unsubscribe),
		//	finalize(() => {
		//		this.loading = false;
		//		this.cdr.markForCheck();
		//	})
		//).subscribe();
	}

	/**
	 * Checking control validation
	 *
	 * @param controlName: string => Equals to formControlName
	 * @param validationType: string => Equals to valitors name
	 */
	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.registerForm.controls[controlName];
		if (!control) {
			return false;
		}

		const result = control.hasError(validationType) && (control.dirty || control.touched);
		return result;
	}
}
