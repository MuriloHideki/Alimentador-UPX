import { Feeder } from 'src/app/classes/feeder';
import { FeederService } from './../../../services/feeder.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feeders-list',
  templateUrl: './feeders-list.component.html',
  styleUrls: ['./feeders-list.component.css']
})
export class FeedersListComponent implements OnInit {
  feeders: Feeder[] = [];

  constructor(private feederService: FeederService, private router: Router) { }

  ngOnInit(): void {
    this.feederService.getAllFeeders().subscribe(response =>{
      this.feeders = response.data.feeders;
    })
  }

  getFeeders(): Feeder[] {
    return this.feeders;
  }

  detail(id:string){
    this.router.navigate(['/feeder', id]);
  }

  delete(id:string){
    console.log('delete '+id);

  }
}
