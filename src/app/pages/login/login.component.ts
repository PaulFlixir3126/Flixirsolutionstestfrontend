import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/providers/service.service';
import { LoginHelper } from './login.helper';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoginHelper]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hide = true;
  constructor(
    public service: BackendService,
    private fb: FormBuilder,
    public router: Router,
    public helper: LoginHelper,
  ) { }

  ngOnInit(): void {
  }

}
