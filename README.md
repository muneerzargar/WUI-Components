# wui-components

> ## 🛠 Status: Work in progress
> Idea is to create composite web components which would be used by
> the developers in order to avoid creation of UI components. 
> Collection of UI components which can be integrated by developers in 
> applications which are framework agnostic i.e. the components can be 
> used in any framework(although we need to add a HOC for the
> management of lifecycle) without the hassle of creating components 
> from scratch.

# Next steps/ TODO 
*   [x] Add Lerna for mono-repo.
*   [x] Add Yarn.
*   [x] Remove common dependencies from the packages and add them in root package.json 
*   [x] Add rule for compiling typescript to javaScript.
*   [] Add tests.
*   [] set up npm package and publish.

## Scripts
- `start:build` runs your app after it has been built using the build command
- `build` builds your app and outputs it in your `dist` directory
- `storybook` runs the storybook for the components.
- `lint` runs the eslint and prettier on the project.
- `test` runs the code coverage for the project. 

[![Built with open-wc recommendations](https://img.shields.io/badge/built%20with-open--wc-blue.svg)](https://github.com/open-wc)