import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import Swal, { SweetAlertResult } from 'sweetalert2';

export type AlertType = 'success' | 'info' | 'warning' | 'danger' | 'primary' | 'secondary' | 'light' | 'dark';

export interface Alert {
  message: string;
  type: AlertType;
}

@Injectable()
export class AlertService {
  constructor(private toastr: ToastrService) {
    this.toastr.toastrConfig.closeButton = true;
    this.toastr.toastrConfig.newestOnTop = false;
    this.toastr.toastrConfig.progressBar = true;
    this.toastr.toastrConfig.positionClass = 'toast-top-right';
    this.toastr.toastrConfig.preventDuplicates = true;
    this.toastr.toastrConfig.timeOut = 5000;
    this.toastr.toastrConfig.extendedTimeOut = 1000;
  }

  error(message: string) {
    this.toastr.error(message);
  }

  alert(message: string) {
    this.toastr.warning(message);
  }

  success(message: string) {
    this.toastr.success(message);
  }

  confirm(title: string, message: string): Promise<SweetAlertResult> {
    const swal = Swal.mixin({
      customClass: {
        actions: 'mr-2 mb-4',
        confirmButton: 'btn btn-cerulean-900 btn-confirm-swal',
        cancelButton: 'btn btn-secondary btn-cancel-swal'
      },
      buttonsStyling: false
    });

    return swal.fire({
      title,
      html: message,
      showCancelButton: true,
      showCloseButton: true,
      buttonsStyling: false,
      reverseButtons: true,
    });
  }
}
