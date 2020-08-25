// Angular
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
// Material
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
// Translate
import { TranslateModule } from '@ngx-translate/core';

// Auth
import { AuthEffects, AuthGuard, authReducer, AuthService } from '../../../core/auth';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';

import { PrivacyPolicyPage } from './privacy-policy/privacy-policy.page';
import { FAQPage } from './faq/faq.page';
import { TermsPage } from './terms/terms.page';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
const routes: Routes = [
  {
    path: 'faq',
    component: FAQPage
  },
  {
    path: 'privacy',
    component: PrivacyPolicyPage
  }    ,
    {
    path: 'terms',
      component: TermsPage
  }

];


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    RouterModule.forChild(routes),
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatRadioModule,
    MatSnackBarModule,
    MatStepperModule,
    MatExpansionModule,
    MatDividerModule,
    NgbModule,
    TranslateModule.forChild()
  ],
  providers: [

  ],
  exports: [FAQPage,
    PrivacyPolicyPage,
    TermsPage],
  declarations: [
    FAQPage,
    PrivacyPolicyPage,
    TermsPage
  ]
})

export class CMSModule {

}
