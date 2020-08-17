import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BackendService } from 'src/app/providers/service.service';
import { Router } from '@angular/router';
import { RegisterHelper } from './register.helper';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers:[RegisterHelper]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  hide = true;
  designationList = [
    'UI-developer',
    'SR. UI-developer',
    'Team lead',
    'Project head'
  ]
  constructor(
    public service: BackendService,
    private fb: FormBuilder,
    public helper: RegisterHelper,
    public router: Router
  ) { }

  ngOnInit(): void {
    localStorage.clear();
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      emailId: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required]],
      designation: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  register() {
    console.log('works');
    if (!this.registerForm.valid) {
      this.service.snackbar('Please fill all mandatory field!');
    }
    const payload =   this.helper.mapFormdataToServie(this.registerForm.value);
    this.service.register(payload).subscribe((res: any) => {
      if (res) {
        console.log(res);
        this.service.snackbar(res.message);
        this.router.navigate(['/login']);
      }
    });
  }
}
