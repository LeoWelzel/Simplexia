import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {
  }

  goToLink() {
    window.open('https://github.com/jb-dot/NdHack', '_blank');
  }

}
