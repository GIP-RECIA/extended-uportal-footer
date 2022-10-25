import { html, LitElement, css, unsafeCSS, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import scss from '@styles/my-element.scss';

@customElement('my-element')
export class MyElement extends LitElement {
  @property({ type: String })
  message = 'world';

  static styles = css`
    ${unsafeCSS(scss)}
  `;

  constructor() {
    super();
  }

  render(): TemplateResult {
    console.log('render');
    return html`
      <div>
        <h2>hello ${this.message}</h2>
        <slot> </slot>
      </div>
    `;
  }
}
