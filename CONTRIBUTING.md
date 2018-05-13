# Contribution Guide

## Getting Started

Clone the repository, and install dependencies with `npm i`. To test changes, add your test script to Demo.js and run `npm run demo`. Just don't commit any changes to this file.

### Docs

All documentation is housed in `docs/`, and is written in Markdown. Follow the format for all other pages. If you're making a page that doesn't follow previous formats, ask me. Changes made to `index.html` will not be made lightly and 99% of cases don't need to change that. The format is set for documentation, so don't try and change it.

## Src

How `src/` works is already shown in About. Most PRs modifying `src/` will be about fixing small errors or adding a component. When adding a component however, it should be named logically, usually the same as the libui-node name. Easiest way to get started is to copy a file like `Button.js` and modify that. Any component should extend `DesktopComponent.js`!

## Important Points


Proton Native welcomes contributions to constantly improve. Contributions are accepted in the form of a PR, which has a few important points that should be followed. 

1. Styling is done with prettier. A git-hook has been added for convience, but any PR that isn't styled won't be accepted.

2. Follow common sense. If there already exists a file similar, use it as a template. Don't make up your own style. 

3. Minimize hacks. If there's a clean way to do it, do it.

4. **Document everything**! Even if you add a prop, it should be well documented. 