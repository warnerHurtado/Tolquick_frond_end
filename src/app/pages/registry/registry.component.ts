import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { userModel } from '../../models/userModel';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registry',
  templateUrl: './registry.component.html',
  styleUrls: ['./registry.component.css']
})
export class RegistryComponent implements OnInit {

  user    : userModel;
  remember: boolean   = false;

  constructor(private auth  : AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.user = new userModel();
  }

  
  onSubmit(f: NgForm) {
    if (f.invalid) { return; }

    Swal.fire({

      allowOutsideClick: false,
      text: 'Espere por favor...',
      icon: 'info'
    });
    Swal.showLoading();

    this.auth.newUser( this.user ).subscribe(resp => {
       
      Swal.fire({
        icon: 'success',
        title: 'Registrado con exito',
        showConfirmButton: false,
        timer: 2500
      });

      console.log(resp)

      if( this.remember ){
        localStorage.setItem('email', this.user.email);
      }

      this.router.navigateByUrl('/login');

    },(err) => {
      console.log(err.error.error.message);
      Swal.fire({
        text : 'El correo ya se encuentra registrado',
        icon : 'error'
      });
    });
  }

}
