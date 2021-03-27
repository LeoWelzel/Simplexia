import { Component, Input, OnInit } from '@angular/core';
import { AcronymsService } from '../acronyms.service';
import { LoadingService } from '../loading.service';
import { OutputVisibilityService } from '../output-visibility.service';

@Component({
  selector: 'app-acronyms-list',
  templateUrl: './acronyms-list.component.html',
  styleUrls: ['./acronyms-list.component.css']
})
export class AcronymsListComponent implements OnInit {
  @Input() color: string = '';

  visible: boolean = false;
  loading: boolean = false;

  acronyms: { acronym: string, definition: string }[] = [];
  acronymsObject: object = {};

  constructor(private outputVisibilityService: OutputVisibilityService,
    private loadingService: LoadingService,
    private acronymsService: AcronymsService) { }

  ngOnInit(): void {
    this.loadingService.getLoading().subscribe(
      result => {
        this.loading = result;
      }
    );

    this.outputVisibilityService.getVisibility().subscribe(
      result => {
        this.visible = result;
      }
    )

    this.acronymsService.getAcronyms().subscribe(
      (result) => {
        this.acronymsObject = result;

        const keys = Object.keys(this.acronymsObject);
        const values = Object.values(this.acronymsObject);

        this.acronyms = [];
        for (let i = 0; i < keys.length; i++) {
          this.acronyms.push({
            acronym: keys[i],
            definition: values[i]
          })
        }
      }
    )
  }

  expandPair(pair: { acronym: string, definition: string }): string {
    return pair.acronym + ': ' + pair.definition;
  }
}
