# 2021.pwasummit.org

Website for the 2021 PWA Summit

## Usage

The following commands are the primary commands you're likely to run when developing the site:

- `npm start` - Runs the development server. Vite + Eleventy.
- `npm run build` - Runs a production build of the site
- `npm run lint` - Lints the site files
- `npm run fix` - Automatically fixes fixable lint issues

## Folder Structure

- `lib` - JS files needed for build system, like the Markdown compiler, Eleventy transforms, or Vite plugins
- `_data` - Eleventy global data folder
- `templates` Templates directory for Eleventy
  - `templates/_includes` - Eleventy includes directory
  - `templates/_layouts` - Eleventy layouts directory
- `src` - Site source, including Eleventy source pages (like Markdown or Nunjucks source) and asset sources (like JavaScript and Sass source)
  - `src/public` - Static site assets that should be copied as-is to the production build
- `public` - The output build directory. Should not be committed into the codebase

## Icons

Icons are from [coolicons](https://github.com/krystonschwarze/coolicons) by Kryston Schwarze.
