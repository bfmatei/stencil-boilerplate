# Stencil Boilerplate

App boilerplate for [Stencil](https://stenciljs.com/) applications.

It features a couple of common principles and workflows that are used at the moment in the Web Apps development world:
   * Routing using [Stencil Router](https://github.com/ionic-team/stencil-router)
   * Redux:
      * [Stencil Redux](https://github.com/ionic-team/stencil-redux) is used as basic router
      * Typed actions (as described in [this article](https://medium.com/@martin_hotell/redux-typescript-typed-actions-with-less-keystrokes-d984063901d)) pattern for a better typed-coding experience 
      * Browser extension (using [Redux DevTools Extension](https://github.com/zalmoxisus/redux-devtools-extension)) included for easier development
   * Automated testing using [Jest](https://facebook.github.io/jest/)
   * Linting:
      * [TSLint](https://palantir.github.io/tslint/)
      * [stylelint](https://stylelint.io/) 
      * Manually-configured rules
   * Fully-configured for development using [JetBrains](https://www.jetbrains.com/) products:
      * Code Styles
      * Run Configurations
   * Decorators for quicker development:
      * Debounce
      * Autobind
   * Translations system
      * Connected to Redux - map the translations directly as a prop
      * Named values replacement
      * Component for quicker translations
   * Advanced CSS tehniques:
      * SCSS pre-processor
      * Grid layout
      * Centralized variables
      * Material-UI-based styles
   * nginx configuration

## Components
The boilerplate project aims to ease the development of a project while keeping everything as simple as possible.

* Button
   * Label (optional)
   * Icon (optional)
   * Disabled State (optional)
   * Pending State (optional)
   * Background Color Palette
* Connected Link
   * Wrap another element in an internal link
* Enhanced Route
   * Can check for authorization
   * Can check the user role
   * Redirects to login page in case of unauthorized
* Icon (via SVG definitions)
* Loader Indicator
   * Multiple sizes: small, medium, large
   * Multiple styles: white background, dark background etc.
* Menu Component
   * Controlled via redux
   * Auto-adjusts using media queries
* Rich Editor
   * Based on native implementation using contenteditable attribute
   * Has support for default values
   * Available Menu Items:
      * Bold, Italic, Underline, Strike-Through
      * Justify text, Align Left, Align Center, Align Right
      * Unordered List, Ordered List
      * Horizontal Rule
      * Link
      * Headings (H1-H6)
      * Quote-Block, Code-Block
* Text Input
   * Label (optional)
   * Available Types:
      * Text
      * Password
   * Error State with message
   * Disabled State
   * Message Container
* Translate
   * Can act as a link via url prop
   
## Orchestrators
The orchestrators are singleton store instances which coordinate a specific piece of functionality.

* App Config
* Connected Router (like [react-router-redux](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-redux))
* Internationalization (i18n) System 
* User Layer

## Known Issues
Please note that this boilerplate is built for web apps rather than public websites. This means that stuff like **prerendering** and **server side rendering** are not enabled and the styles are specifically built for [WebKit](https://webkit.org/)-based browsers.

* Due to an issue with contenteditable items (the cursor repositions itself at the beginning of the element after a re-render), the content cannot be controlled from outside the component. It can, however receive a default value mapped to Redux.
* Automated Testing is not working 

## Credits
* Original CSS Reset
   * [Eric Meyer](https://meyerweb.com/eric/tools/css/reset/) 
* Icons:
   * [Material Design Icons](https://materialdesignicons.com)
   * [Material-UI](http://www.material-ui.com/)
* Styles inspired from:
   * [Material-UI](http://www.material-ui.com/)
   * [Marmelab](https://marmelab.com)
   * [Flow](https://flowdash.co)
   * [Anton Kalik](https://dribbble.com/idedy)
* Original Loader Indicator
   * [John Louie Biñas](https://codepen.io/johnlouie04/pen/LEoOGV)
* nginx config rules
   * [H5BP](https://github.com/h5bp/server-configs-nginx)
