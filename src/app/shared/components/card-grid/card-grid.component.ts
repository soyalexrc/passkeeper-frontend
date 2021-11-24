import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EditCardComponent} from '../../alerts/edit-card/edit-card.component';
import {SharedCardComponent} from '../../alerts/shared-card/shared-card.component';

@Component({
  selector: 'app-card-grid',
  templateUrl: './card-grid.component.html',
  styleUrls: ['./card-grid.component.scss']
})
export class CardGridComponent implements OnInit {
  @Input() arrData = [];
  isHereHome: boolean;

  constructor(
      private router: Router,
      private serviceModal: NgbModal,
  ) { }

  ngOnInit(): void {
    this.isHereHome = this.router.url.replace('/', '') === 'home';
    console.log(this.isHereHome);
  }

  catchLabel(variable) {
    if (variable.label === 'password') {
      return variable.user;
    } else if (variable.label === 'note') {
      return variable.description;
    } else if (variable.label === 'address') {
      return variable.direction;
    } else if (variable.label === 'payment-card') {
      return `Ends with ${variable.cardNumber.substring(variable.cardNumber.length - 4, variable.cardNumber.length)}, Expires in ${variable.expiredDate}`;
    } else if (variable.label === 'bank-account') {
      return variable.accountNumber;
    } else if (variable.label === 'messaging-app') {
      return variable.user;
    } else if (variable.label === 'passport-document') {
      return  `Expires in ${variable.documentExpiredDate}`;
    }
  }

  catchImage(variable) {
    if (variable.label === 'password') {
      return 'assets/app-logos/password.png';
    } else if (variable.label === 'note') {
      return 'assets/app-logos/notes.png';
    } else if (variable.label === 'address') {
      return 'assets/app-logos/direction.png';
    } else if (variable.label === 'payment-card') {
      return 'assets/app-logos/card.jpg';
    } else if (variable.label === 'bank-account') {
      return 'assets/app-logos/bank-account.png';
    } else if (variable.label === 'messaging-app') {
      return 'assets/app-logos/messaging-app.png';
    } else if (variable.label === 'passport-document') {
      return 'assets/app-logos/passport-document.png';
    }
  }

  validateLaunchable(card) {
    return card.label === ('password' || 'messaging-app') ;
  }

  editCard(card): any {
    const modal = this.serviceModal.open(EditCardComponent, {
      centered: true,
      windowClass: 'custom-modal d-flex flex-column w-100 justify-content-center'
    });
    modal.componentInstance.cardInfo = card;
    modal.result.then((res) => {
      console.log(res);
      Swal.fire({
        title: 'Updating Info...',
        text: 'Please Wait',
        icon: 'warning',
        backdrop: false,
      });
      Swal.showLoading();
      console.log('hello world');
    });
  }

  deleteCard(card): any {
    Swal.fire({
      title: `${card.title}`,
      text: 'Do you want to delete this item?',
      icon: 'question',
      showDenyButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: `Cancel`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Processing Info...',
          text: 'Please Wait',
          icon: 'warning',
          backdrop: false,
        });
        Swal.showLoading();
        console.log('hello world');
        setTimeout(() => {
          Swal.fire('Deleted!', '', 'success');
        }, 2000);
      }
    });
  }

  shareCard(card): any {
    const modal = this.serviceModal.open(SharedCardComponent, {
      centered: true,
      windowClass: 'custom-short-modal d-flex flex-column w-100 justify-content-center'
    });
    modal.componentInstance.cardInfo = card;
    modal.result.then((res) => {
      console.log(res);
      Swal.fire({
        title: 'Sending request...',
        text: 'Please Wait',
        icon: 'warning',
        backdrop: false,
      });
      Swal.showLoading();
      setTimeout(() => {
        Swal.fire('Request Sent!', '', 'success');
      }, 2000);
    });
  }
}
