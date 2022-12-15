import {
  html,
  LitElement,
  css,
  unsafeCSS,
  TemplateResult,
  PropertyValueMap,
} from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import templateService, { template } from '@services/templateService';
import scss from '@styles/extended-uportal-footer.scss';

@customElement('extended-uportal-footer')
export class MyElement extends LitElement {
  @property({ type: String })
  domain = '';
  @property({ type: String, attribute: 'portal-path' })
  portalPath = '';
  @property({ type: String, attribute: 'template-api-url' })
  templateApiUrl = '';
  @property({ type: String, attribute: 'template-api-path' })
  templateApiPath = process.env.APP_TPL_API_PATH ?? '';
  @property({ type: Object })
  template: template | null = null;
  @property({ type: Boolean })
  debug = false;

  constructor() {
    super();
    if (this.domain === '') {
      this.domain = window.document.domain;
    }
  }

  protected shouldUpdate(
    _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): boolean {
    if (
      _changedProperties.has('domain') ||
      _changedProperties.has('portalPath') ||
      _changedProperties.has('templateApiUrl')
    ) {
      this._getTemplate();
      return false;
    }
    if (_changedProperties.has('template') && this.template !== null) {
      return true;
    }
    this._getTemplate();
    return false;
  }

  private async _getTemplate() {
    const template = await templateService.get(this._tplApiUrl(), this.domain);
    if (template !== null) {
      this.template = template;
    }
  }

  private _tplApiUrl() {
    return this.templateApiUrl != ''
      ? this.templateApiUrl
      : this.templateApiPath != ''
      ? this._makeUrl(this.templateApiPath)
      : '';
  }

  private _makeUrl(path: string, domain = ''): string {
    const protocol = this.debug ? 'http' : 'https';
    return `${protocol}://${domain == '' ? this.domain : domain}${path}`;
  }

  render(): TemplateResult {
    return html` <footer>
      <section>
        ${this?.template
          ? this._renderLogo(
              this.template?.name,
              this._makeUrl(this.portalPath),
              this.template?.logoPath
            )
          : ''}
      </section>
      ${this.template?.sponsors
        ? repeat(this.template.sponsors, (sponsor) => {
            return html`<section>
              ${this._renderLogo(sponsor.name, sponsor.url, sponsor.logoPath)}
            </section>`;
          })
        : html``}
    </footer>`;
  }

  _renderLogo(name: string, url: string, imgPath: string, target = '_blank') {
    return html`
      <a target="${target}" href="${url}" title="${name}">
        <img src="${this._makeUrl(imgPath)}" alt="${name}" />
      </a>
    `;
  }

  static styles = css`
    ${unsafeCSS(scss)}
  `;
}
