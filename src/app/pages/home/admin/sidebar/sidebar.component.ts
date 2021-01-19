import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery'
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  lines = true;

  constructor(private auth  : AuthService,
              private router: Router) { }

  title = 'angularbootstrap';
   ngOnInit() {
                //Toggle Click Function
    $("#menu-toggle").click(function(e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });
  }
  quit(){
  this.auth.logOut();
  this.router.navigateByUrl('/login');
}

  changeView(){
    this.lines = true;
  }

}
