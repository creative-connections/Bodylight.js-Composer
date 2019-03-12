/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/*
 * See https://docusaurus.io/docs/site-config for all the possible
 * site configuration options.
 */

const siteConfig = {
  title: 'Bodylight.js', // Title for your website.
  tagline: 'Simulators for the modern web',
  url: 'http://bodylight.physiome.cz/', // Your website URL
  baseUrl: '/', // Base URL for your project */
  /*
   * For github.io type URLs, you would set the url and baseUrl like:
   *   url: 'https://facebook.github.io',
   *   baseUrl: '/test-site/',
   */

  // Used for publishing and more
  projectName: 'bodylight.js',
  organizationName: 'creative-connections',
  /*
   * For top-level user or org sites, the organization is still the same.
   * e.g., for the https://JoelMarcey.github.io site, it would be set like...
   *   organizationName: 'JoelMarcey'
   */

  // For no header links in the top nav bar -> headerLinks: [],
  headerLinks: [
    {doc: 'introduction', label: 'Docs'},
    {href: 'https://github.com/creative-connections', label: 'GitHub'},
  ],

  /* path to images for header/footer */
  headerIcon: 'img/bodylight_logo.svg',
  footerIcon: 'img/bodylight_logo_text.svg',
  favicon: 'img/favicon.png',

  /* Colors for website */
  colors: {
    primaryColor: '#4a4a4a',
    secondaryColor: '#f6a713',
  },

  cname: "bodylight.physiome.cz",

  gaTrackingId: "UA-68541769-3",

  /* Custom fonts for website */
  /*
   * fonts: {
   * myFont: [
   * "Times New Roman",
   * "Serif"
   * ],
   * myOtherFont: [
   * "-apple-system",
   * "system-ui"
   * ]
   * },
   */

  // This copyright info is used in /core/Footer.js and blog RSS/Atom feeds.
  copyright: `Copyright © ${new Date().getFullYear()} Creative Connections s.r.o.`,

  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks.
    theme: 'default',
  },

  // Add custom scripts here that would be placed in <script> tags.
  scripts: ['https://buttons.github.io/buttons.js'],

  // On page navigation for the current documentation page.
  onPageNav: 'separate',
  // No .html extensions for paths.
  cleanUrl: true,

  /*
   * Show documentation's last contributor's name.
   * enableUpdateBy: true,
   */

  /*
   * Show documentation's last update time.
   * enableUpdateTime: true,
   */

  /*
   * You may provide arbitrary config keys to be used as needed by your
   * template. For example, if you need your repo's URL...
   *   repoUrl: 'https://github.com/facebook/test-site',
   */
}

module.exports = siteConfig
