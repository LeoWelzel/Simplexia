import {Component, Input} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingService } from '../loading.service';
import { OutputVisibilityService } from '../output-visibility.service';
import { SummariseService } from '../summarise/summarise.service';

@Component({
  selector: 'app-summary-input',
  templateUrl: './summary-input.component.html',
  styleUrls: ['./summary-input.component.css']
})
export class SummaryInputComponent {
  formDescription: string = 'Enter text for summary.';
  form: FormGroup;

  @Input() color: string = '';

  constructor(public summariseService: SummariseService, public loadingService: LoadingService,
    public outputVisibilityService: OutputVisibilityService) {

    this.outputVisibilityService.setVisibility(false);

    this.form = new FormGroup({
      'content': new FormControl(null, {
        validators: [Validators.required]
      })
    });
  }

  onSubmitPost(): void {
    this.summariseService.summarise(this.form.value.content);
    this.outputVisibilityService.setVisibility(true);
    this.loadingService.setLoading(true);
  }

  /** In theory this doesn't need an argument.
   *  Will be leaving it there in case we want to add more form controls. */
  verify(fieldName: string): boolean {
    return !!this.form.get(fieldName)?.valid;
  }
}
