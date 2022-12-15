import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-single-prop',
  templateUrl: './single-prop.component.html',
  styleUrls: ['./single-prop.component.scss']
})
export class SinglePropComponent implements OnInit {

  public proponente: any;

  constructor(private router: Router, private route: ActivatedRoute, private dataService: DataService) {
    this.dataService.proponentPDAC().subscribe(data => {
      this.proponente = data;
      console.log(data)
    })
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(res => {
      this.proponente = res;
    })

    this.dataService.proponentPDAC().subscribe(data => {
      this.proponente = data;
    })
  }

}
