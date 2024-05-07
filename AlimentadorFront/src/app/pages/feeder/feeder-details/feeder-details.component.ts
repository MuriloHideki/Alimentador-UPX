import { Feeder } from 'src/app/classes/feeder';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FeederService } from 'src/app/services/feeder.service';

@Component({
  selector: 'app-feeder-details',
  templateUrl: './feeder-details.component.html',
  styleUrls: ['./feeder-details.component.css']
})
export class FeederDetailsComponent {
  feeder: Feeder | undefined;

  constructor(private route: ActivatedRoute, private feederService: FeederService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id') || '';
    if (id) {
      this.feederService.getById(id).subscribe({
        next: (response) => {
          this.feeder = response.data;
        },
        error: (err) => {
          console.error('Erro ao buscar detalhes do feeder:', err);
        }
      });
    } else {
      console.error('ID do feeder não fornecido');
    }
  }
}
