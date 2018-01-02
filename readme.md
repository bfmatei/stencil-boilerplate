# Stencil Boilerplate

App boilerplate for [Stencil](https://stenciljs.com/) applications.

It features a couple of common principles and workflows that are used at the moment in the UI frameworks world:
   - Routing using [Stencil Router](https://github.com/ionic-team/stencil-router)
   - Redux
     - [Stencil Redux](https://github.com/ionic-team/stencil-redux) is used as basic router
     - connected router (like [react-router-redux](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-redux)) component
     - typed actions (as described in [this article](https://medium.com/@martin_hotell/redux-typescript-typed-actions-with-less-keystrokes-d984063901d)) pattern for a better typed-coding experience 
     - browser extension (using [Redux DevTools Extension](https://github.com/zalmoxisus/redux-devtools-extension)) included for easier development
   - Automated testing using [Jest](https://facebook.github.io/jest/)
   - Code quality is ensured by [TSLint](https://palantir.github.io/tslint/) and [stylelint](https://stylelint.io/) and both have manually-configured rules
   - Fully-configured for development using [JetBrains](https://www.jetbrains.com/) products, especially [WebStorm](https://www.jetbrains.com/webstorm/)
   - Custom built translations system
   - CSS grid layout

Please note that this boilerplate is built for web apps rather than public websites. This means that stuff like **prerendering** and **server side rendering** are not enabled and the styles are specifically built for [WebKit](https://webkit.org/)-based browsers.

## Known Issues
* Automated Testing is not working 

## Credits
* Original CSS Reset - [Eric Meyer](https://meyerweb.com/eric/tools/css/reset/) 
* Icons
   * [Material Design Icons](https://materialdesignicons.com)
   * [Material-UI](http://www.material-ui.com/)
