import {Component, Input, OnInit} from '@angular/core';
import {AcronymsService } from '../acronyms.service';
import {KeywordsService} from '../keywords.service';
import {LoadingService} from '../loading.service';
import {OutputVisibilityService} from '../output-visibility.service';
import {SummariseService} from '../summarise/summarise.service';
import {Summary} from '../summarise/summary.model';

@Component({
  selector: 'app-summary-output',
  templateUrl: './summary-output.component.html',
  styleUrls: ['./summary-output.component.css']
})
export class SummaryOutputComponent implements OnInit {
  @Input() color: string = '';

  summaryOptions = [
    'Condense',
    'Highlight'
  ];

  currentOption: string = 'Condense';

  loading: boolean = false;
  visible: boolean = false;
  highlightHTML: string = '';
  condenseHTML: string = '';
  broaderDetails: string = '';
  warnings: string = '';

  constructor(private summariseService: SummariseService, private loadingService: LoadingService,
              private visibilityService: OutputVisibilityService, private keywordService: KeywordsService,
    private acronymsService: AcronymsService) {
  }

  ngOnInit(): void {
    this.loadingService.getLoading().subscribe(
      result => {
        this.loading = result;
      }
    )

    this.visibilityService.getVisibility().subscribe(
      result => {
        this.visible = result;
      }
    );

    this.summariseService.getSummary().subscribe(
      result => {
        this.keywordService.setKeywords(result.keyword.words);
        this.acronymsService.setAcronyms(result.acronyms)
        this.loadingService.setLoading(false);
        this.visible = true;
        this.broaderDetails = 'Summary';
        this.highlightHTML = this.produceHighlightHTML(result);
        this.condenseHTML = this.produceCondenseHTML(result);
        this.warnings = this.getWarnings(result);
      }
    )
  }

  getWarnings(result: Summary): string {
    let output = '';

    if (result.summarise.indices.length <= 1) {
      output += 'Was unable to shorten text. This might be because your text was too short.\n';
    } else if (result.keyword.words.length <= 1) {
      output += 'Was unable to retrieve keywords. This might be because your text was too short.\n';
    }

    return output;
  }

  produceCondenseHTML(result: Summary): string {
    const numPairs = result.summarise.indices.length;

    let output = '';

    if (result.summarise.indices.length <= 1) {
      output = result.lastSent;
    } else {
      let sentences = [];

      for (let i = 0; i < numPairs; i++) {
        const pair = result.summarise.indices[i];

        sentences.push(result.lastSent.slice(
          pair[0],
          pair[1],
        ));
      }

      output = sentences.join('\n\n');
    }

    return output;
  }

  produceHighlightHTML(result: Summary): string {
    let output = '';

    /* Flatten list */
    let allIndices = result.summarise.indices.flat();
    allIndices.push(result.lastSent.length)

    if (allIndices[0] != 0) {
      allIndices = [0, 0].concat(allIndices);
    }

    let highlight = false;
    for (let i = 0; i < allIndices.length - 1; i++) {
      highlight = !highlight;
      if (allIndices[i + 1] - allIndices[i] == 0)
        continue;

      let segment = result.lastSent.slice(allIndices[i], allIndices[i + 1]);

      if (highlight) {
        segment = '<mark>' + segment + '</mark>';
      }

      output += segment;
    }

    return output;
  }
}
