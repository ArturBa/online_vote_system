import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VoteService } from 'src/app/services/vote.service';

@Component({
  selector: 'app-generate-code',
  templateUrl: './generate-code.component.html',
  styleUrls: ['./generate-code.component.scss'],
})
export class GenerateCodeComponent {
  form: FormGroup;

  constructor(protected voteService: VoteService) {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      PESEL: new FormControl('', Validators.required),
    });
  }

  submitForm(): void {
    this.voteService.getVoteCode(this.form.value).subscribe((res) => {
      console.log(res);
    });
  }
}
