// Angular
import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation, Inject, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
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
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'pt-change-password',
  templateUrl: './change-password.component.html',
  encapsulation: ViewEncapsulation.None
})
export class ChangePasswordComponent implements OnInit, OnDestroy,AfterViewInit {
  passwordForm: FormGroup;
  loading = false;
  errors: any = [];
  showVerifyCode = false;
  resultCode: any = {};
  @ViewChild('infoOnLoad') public info: ElementRef;
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
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService,
    private store: Store<AppState>,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private http: HttpClient, @Inject('BASE_URL') public baseUrl: string,
    public snackBar: MatSnackBar
  ) {
    this.unsubscribe = new Subject();
  }
    ngAfterViewInit(): void {
      this.modalService.open(this.info).result.then((result) => {
      }, (reason) => {
      });
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

  isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.passwordForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result = control.hasError(validationType) && (control.dirty || control.touched);
    return result;
  }




  initRegisterForm() {
    this.passwordForm = this.fb.group({

      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ])
      ],
      oldpassword: ['', Validators.compose([
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


  changePassword() {
    this.resultCode = {};
    const controls = this.passwordForm.controls;

    // check form
    if (this.passwordForm.invalid) {
      console.log(this.passwordForm);
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      return;
    }

    //const _user: any
    var _user: any = {};

    _user.newPassword = controls.password.value;
    _user.currentPassword = controls.oldpassword.value;
    _user.user_UID = localStorage["userid"];
    //this.openSnackBarVerification("A verification code has been sent to your email!");
    this.loading = true;
    var url = "api/user/changePassword";
    this.http.put<any>(this.baseUrl + url, _user).subscribe(result => {
      if (result.status) {
        this.loading = false;
        this.router.navigate(['/profile'])
      }
      else {

      }
    },
      error => {
        this.loading = false;
      });
  }



}
