/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react')

const CompLibrary = require('../../core/CompLibrary.js')

const MarkdownBlock = CompLibrary.MarkdownBlock /* Used to read markdown */
const Container = CompLibrary.Container
const GridBlock = CompLibrary.GridBlock


class HomeSplash extends React.Component {
  render() {
    const {siteConfig, language = ''} = this.props
    const {baseUrl, docsUrl} = siteConfig
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`
    const langPart = `${language ? `${language}/` : ''}`
    const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`

    const SplashContainer = props => (
      <div className="homeContainer">
        <div className="homeSplashFade">
          <div className="wrapper homeWrapper">{props.children}</div>
        </div>
      </div>
    )

    const Button = props => (
      <div className="pluginWrapper buttonWrapper">
        <a className="button" href={props.href} target={props.target}>
          {props.children}
        </a>
      </div>
    )

    const Logo = props => (
      <div className="projectLogo">
        <img src={props.img_src} alt="Bodylight.js logo" />
      </div>
    )

    const ProjectTitle = () => (
      <h2 className="projectTitle">
        {siteConfig.title}
        <small>{siteConfig.tagline}</small>
      </h2>
    )

    const PromoSection = props => (
      <div className="section promoSection">
        <div className="promoRow">
          <div className="pluginRowBlock">{props.children}</div>
        </div>
      </div>
    )


    return (
      <SplashContainer>
        <Logo img_src={`${baseUrl}img/bodylight_logo.svg`} />
        <div className="inner">
          <ProjectTitle siteConfig={siteConfig} />
          <PromoSection>
            <Button href={docUrl('introduction')}>Getting started</Button>
            <Button href="composer/">Composer</Button>
          </PromoSection>
        </div>
      </SplashContainer>
    )
  }
}

class Index extends React.Component {
  render() {
    const {config: siteConfig, language = ''} = this.props
    const {baseUrl} = siteConfig

    const Block = props => (
      <Container
        padding={['bottom', 'top']}
        id={props.id}
        background={props.background}>
        <GridBlock
          align="center"
          contents={props.children}
          layout={props.layout}
        />
      </Container>
    )

    const FeatureCallout = () => (
      <div
        className="productShowcaseSection paddingBottom"
        style={{textAlign: 'center'}}>
        <h2>Simple simulator of a bouncing ball</h2>
        <p>Bodylight.js Composer is a visual editor for creating in-browser dynamic applications and visualizations.</p>

        <iframe
          className="titlevideo"
          src="https://www.youtube-nocookie.com/embed/lm_2BVQJjAQ"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen></iframe>

        <h2>Nephron simulator</h2>
        <p>One of the first simulators we developed was a simulator of the Nephron,
          you can try it for yourself <a href="http://www.physiome.cz/apps/Nephron/">here</a></p>
        <a href="http://www.physiome.cz/apps/Nephron/">
          <img className='titleimg' src={`${baseUrl}img/nephron.png`} alt="Nephron simulator"/>
        </a>
      </div>
    )

    const LearnHow = () => (
      <Block background="light">
        {[
          {
            content: `Composer is the main product of the Bodylight.js,
              it allows you to visually create an HTML simulator. We are using
              the wonderful project GrapesJS to provide the layouting engine,
              Adobe® Animate to create interactive animations and Modelica
              to make it all run on models your write yourself.`,
            image: `${baseUrl}img/composer.png`,
            imageAlign: 'left',
            title: 'Bodylight.js Composer',
          },
        ]}
      </Block>
    )

    const Features = () => (
      <Block layout="fourColumn">
        {[
          {
            content: 'Write models using the Modelica language.',
            image: `${baseUrl}img/ModelicaLogo.svg`,
            imageAlign: 'top',
            title: 'Powered by Modelica',
          },
          {
            content: 'Bringing near native speed for models to the browser.',
            image: `${baseUrl}img/web-assembly-logo.svg`,
            imageAlign: 'top',
            title: 'Executed in WebAssembly',
          },
          {
            content: 'Create complex animations in Adobe® Animate and export them to Easel.js',
            image: `${baseUrl}img/easeljs-logo-horizontal-gray-darker.svg`,
            imageAlign: 'top',
            title: 'Designed in Adobe® Animate',
          },
        ]}
      </Block>
    )

    return (
      <div>
        <HomeSplash siteConfig={siteConfig} language={language} />
        <div className="mainContainer">
          <Features />
          <LearnHow />
          <FeatureCallout />
        </div>
      </div>
    )
  }
}

module.exports = Index
