'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">super-jss-workspace documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AppModule-87fdea8639377019c0b3721455cd7ff6129e4fc1201560dd6cb3aad0e36ebecaf496efde80127f427d950e896a4a238c9991a64ac9c5644c896c711b0bbef962"' : 'data-bs-target="#xs-components-links-module-AppModule-87fdea8639377019c0b3721455cd7ff6129e4fc1201560dd6cb3aad0e36ebecaf496efde80127f427d950e896a4a238c9991a64ac9c5644c896c711b0bbef962"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-87fdea8639377019c0b3721455cd7ff6129e4fc1201560dd6cb3aad0e36ebecaf496efde80127f427d950e896a4a238c9991a64ac9c5644c896c711b0bbef962"' :
                                            'id="xs-components-links-module-AppModule-87fdea8639377019c0b3721455cd7ff6129e4fc1201560dd6cb3aad0e36ebecaf496efde80127f427d950e896a4a238c9991a64ac9c5644c896c711b0bbef962"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CodeSnippetComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CodeSnippetComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HeaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HeaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LayoutComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LayoutComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SuperJssModule.html" data-type="entity-link" >SuperJssModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#directives-links-module-SuperJssModule-4d1d1f371c5d731dac1b84080fa63889d9abd8bf94919d43b83ee4af083d5b5016994d5584151969bbc077aaf643c0662ec8bd08eb9bb23e16af629029776ca6"' : 'data-bs-target="#xs-directives-links-module-SuperJssModule-4d1d1f371c5d731dac1b84080fa63889d9abd8bf94919d43b83ee4af083d5b5016994d5584151969bbc077aaf643c0662ec8bd08eb9bb23e16af629029776ca6"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-SuperJssModule-4d1d1f371c5d731dac1b84080fa63889d9abd8bf94919d43b83ee4af083d5b5016994d5584151969bbc077aaf643c0662ec8bd08eb9bb23e16af629029776ca6"' :
                                        'id="xs-directives-links-module-SuperJssModule-4d1d1f371c5d731dac1b84080fa63889d9abd8bf94919d43b83ee4af083d5b5016994d5584151969bbc077aaf643c0662ec8bd08eb9bb23e16af629029776ca6"' }>
                                        <li class="link">
                                            <a href="directives/SuperJssDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SuperJssDirective</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/SJssThemeService.html" data-type="entity-link" >SJssThemeService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/SJss.html" data-type="entity-link" >SJss</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SJssBreakingStyle.html" data-type="entity-link" >SJssBreakingStyle</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SJssBreakpoints.html" data-type="entity-link" >SJssBreakpoints</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SJssColorOption.html" data-type="entity-link" >SJssColorOption</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SJssTheme.html" data-type="entity-link" >SJssTheme</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});