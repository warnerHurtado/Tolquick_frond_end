import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { userModel } from '../../models/userModel'
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user    : userModel = new userModel();
  remember: boolean   = false;

  constructor( private auth  : AuthService,
               private router: Router) {

    if ( localStorage.getItem('token') ) {
      this.router.navigateByUrl('/adminSidebar');;
    }
    
    }

  ngOnInit(): void {

    if( localStorage.getItem('email')){
      this.user.email = localStorage.getItem('email');
      this.remember = true;
    }
  }

  login(form: NgForm){
    if ( form.invalid ) return;

    Swal.fire({

      allowOutsideClick: false,
      text: 'Espere por favor...',
      icon: 'info'
    });
    Swal.showLoading();

    this.auth.login( this.user )
    .subscribe( resp => {

        console.log(resp);
        Swal.close();

        if( this.remember ){
          localStorage.setItem('email', this.user.email);
        }else{
          localStorage.removeItem('email');
        }
        this.router.navigateByUrl('/adminSidebar');
        
      }, (err) => {
        console.log(err.error.error.message);
        Swal.fire({
          title: 'Usuario incorrecto',
          text : 'Correo o contraseña no validos',
          icon : 'error'
        });
      }
    )
    
  }

}
