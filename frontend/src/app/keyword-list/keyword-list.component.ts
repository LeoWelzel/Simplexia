import { Component, Input, OnInit} from '@angular/core';
import { KeywordsService } from '../keywords.service';
import { LoadingService } from '../loading.service';
import { OutputVisibilityService } from '../output-visibility.service';

@Component({
  selector: 'app-keyword-list',
  templateUrl: './keyword-list.component.html',
  styleUrls: ['./keyword-list.component.css']
})
export class KeywordListComponent implements OnInit {

  @Input() color: string = '';
  visible: boolean = false;
  loading: boolean = false;

  keywords: string[] = [];

  constructor(private outputVisibilityService: OutputVisibilityService,
      private loadingService: LoadingService,
      private keywordService: KeywordsService) { }

  ngOnInit(): void {
    this.keywordService.getKeywords().subscribe(
      (result: string[]) => {
        /* Arbitrary magic number 10 to ensure this list isn't too long. */
        this.keywords = [...result].slice(0, 10);
      }
    );

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
  }
}
