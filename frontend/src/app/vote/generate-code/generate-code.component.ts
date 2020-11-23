import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VoteService } from 'src/app/services/vote.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-generate-code',
  templateUrl: './generate-code.component.html',
  styleUrls: ['./generate-code.component.scss'],
})
export class GenerateCodeComponent {
  form: FormGroup;
  userCode = '';
  errorCode = '';

  constructor(protected voteService: VoteService) {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      PESEL: new FormControl('', Validators.required),
    });
  }

  saveToFile() {
    const blob = new Blob(['Online vote code: ', this.userCode], {
      type: 'text/plain;charset=utf-8',
    });
    saveAs(blob, 'OnlineVoteCode.txt');
  }

  copyToClipboard() {
    document.addEventListener('copy', (e: ClipboardEvent) => {
      e.clipboardData.setData('text/plain', this.userCode);
      e.preventDefault();
      document.removeEventListener('copy', null);
    });
    document.execCommand('copy');
  }

  submitForm(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.userCode = '';
      this.errorCode = '';
      this.voteService.getVoteCode(this.form.value).subscribe(
        (res) => {
          this.userCode = res;
        },
        (res) => {
          this.errorCode = res;
        },
      );
    }
  }
}
