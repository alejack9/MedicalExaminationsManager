import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appPassword]'
})
export class PasswordDirective {

  private _shown = false;

  private span = document.createElement('span');

  constructor(private el: ElementRef) {
    this._shown = !(el.nativeElement.getAttribute('type') === 'password');
    this.setElement();
    this.setup();
  }

  setElement() {
    this.span.innerHTML = `
      <div class="form-group mt-0">
        <div class="form-check">
          <input ${ this._shown ? 'checked=\"checked\"' : '' }  type="checkbox" class="form-check-input">
          <label class="form-check-label" for="showPsw">
            Mostra Password
          </label>
        </div>
      </div>`;
  }

  toggle() {
    this._shown = !this._shown;
    this.el.nativeElement.setAttribute('type', (this._shown) ? 'text' : 'password');
    this.setElement();
  }

  setup() {
    this.span.addEventListener('click', (event) => {
      this.toggle();
    });
    this.el.nativeElement.parentNode.appendChild(this.span);
  }

}
