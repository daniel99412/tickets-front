import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  file = new FormControl('');
  currentRate = 3;

  constructor() { }

  ngOnInit(): void {
    this.file.valueChanges.subscribe(value => {
      console.log(this.file);
    });
  }

  public openFileUpload(): void {
    document.getElementById('fileDetail').click();
  }
}
