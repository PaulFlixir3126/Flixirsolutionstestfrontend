// Angular
import { Component, Input, ChangeDetectorRef, Inject } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DateActionService } from '../../../../../core/services/dateaction';


@Component({
  selector: 'pt-user-activities',
  templateUrl: './pt-user-activities.component.html'
})
export class WidgetUserActivitiesComponent {
  @Input() cssClasses = '';
  @Input() activityList: any[] = [];
  closeResult: string;
  newAction: any = {};
  selectedAction: any = {};
  goalList: any[] = ["Reduce Weight", "Increase Weight"];
  loading: boolean = false;
  //activityList: any[] = [];
  constructor(private modalService: NgbModal,
    private cdr: ChangeDetectorRef,
    public dateAction: DateActionService,
    private http: HttpClient, @Inject('BASE_URL') public baseUrl: string,
    public snackBar: MatSnackBar) {
    
  }

  open(content, data) {
    this.selectedAction = data;
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openNewAction(content) {
    this.newAction = {};

    this.modalService.open(content).result.then((result) => {

    }, (reason) => {

    });
  }

  deleteAction() {
    this.modalService.dismissAll();


    this.loading = true;
    var obj = {
      userActionUID: this.selectedAction._id,
      actionStatus: "Closed"
    };

    var url = "api/user/action";
    this.http.put<any>(this.baseUrl + url, obj).subscribe(result => {
      if (result.status && result.data) {
        this.selectedAction = {};
        this.openSnackBarVerification("Action has been closed");
        this.loadActivityList();
      }
      else {
        this.openSnackBarVerification("Could not load action information");
      }
      this.loading = false;
      this.cdr.markForCheck();
    },
      error => {
        this.loading = false;
      });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  openSnackBarVerification(message) {
    this.snackBar.open(message, "", {
      duration: 2000,
    });
  }


  createNewAction(content) {
    this.modalService.dismissAll();
    var id = localStorage["userid"];
    var userid = localStorage["userdataid"];
    this.loading = true;
    this.newAction.userRefId = id;
    this.newAction.userId = userid;
    var url = "api/user/action";
    this.http.post<any>(this.baseUrl + url, this.newAction).subscribe(result => {
  
      if (result.status && result.message) {
        this.newAction = {};
        this.openSnackBarVerification("New Action Created");
        this.loadActivityList();
      }
      else {

        this.openSnackBarVerification("");
      }
      this.loading = false;
      this.cdr.markForCheck();
    },
      error => {
        this.loading = false;
      });
  }

  loadActivityList() {
    this.activityList = [];
    var id = localStorage["userid"];
    if (id) {
      var url = "api/user/action?userRefId=" + id;
      this.http.get<any>(this.baseUrl + url).subscribe(result => {
        if (result.status && result.data && result.data.length > 0) {
          var list = result.data;
          list.forEach(item => {
            item.createdAtString = this.dateAction.getDateString(new Date(item.createdAt));
            if (item.isdeleted) {
              item.updatedAtString = this.dateAction.getDateString(new Date(item.updatedAt));
            }
          });
          this.activityList = list;
          this.cdr.markForCheck();
        }
        else {

        }
      },
        error => {
          this.cdr.markForCheck();
        });

    }


  }

}
