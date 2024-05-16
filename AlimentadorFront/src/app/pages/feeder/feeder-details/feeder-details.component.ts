import { Feeder } from 'src/app/classes/feeder';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FeederService } from 'src/app/services/feeder.service';
import { History } from 'src/app/classes/history';
import { HistoryService } from 'src/app/services/history.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-feeder-details',
  templateUrl: './feeder-details.component.html',
  styleUrls: ['./feeder-details.component.css']
})
export class FeederDetailsComponent {
  feeder!: Feeder;
  histories: History[] = [];

  constructor(
    private route: ActivatedRoute,
    private feederService: FeederService,
    private historyService : HistoryService,
    private location: Location) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id') || '';
    if (id) {
      this.feederService.getById(id).subscribe({
        next: (response) => {
          this.feeder = response.data;
          this.loadHistory(id);
        },
        error: (err) => {
          console.error('Erro ao buscar detalhes do feeder:', err);
        }
      });
    } else {
      console.error('ID do feeder não fornecido');
    }
  }

  loadHistory(feederId: string) {
    this.historyService.getHistoryByFeederId(feederId).subscribe({
      next: (data) => {
        this.histories = data;
      },
      error: (err) => {
        console.error('Erro ao buscar histórico do feeder:', err);
      }
    });
  }

  goBack(): void {
    this.location.back();
  }

  update(id:string){
    console.log(id);
  }
}
