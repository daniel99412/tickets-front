import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  file = new FormControl('');
  currentRate = 3;

  constructor( private router: Router ) { }

  ngOnInit(): void {
    this.file.valueChanges.subscribe(value => {
      console.log(this.file);
    });
  }

  public openFileUpload(): void {
    document.getElementById('fileDetail').click();
  }

  return() {
    this.router.navigate(['/tickets/list']);
  }
}
