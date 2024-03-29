## Dev
create .env file in server, add MONGO_URI and SECRET_OR_KEY vals from heroku
npm i in server and client
npm run dev

0. Chores / things to learn any time
- redirecting to https causes infinite loop
- replace console.logs with console.errors. add console.info on loading the site (use css on console log)
- lighthouse performance issues (image sizes, strip image meta tags, use cloudinary to make images efficient)
- performance: artillery or zeit.time
- same site cookies
- refactor ugly code
- [FOUT](https://css-tricks.com/fout-foit-foft/)
- robots.txt / hiding edit page
- hamburger nav items close menu on click
- SEO
- Security
- Prettier / eslint
- Jsdoc
- Tests
- Anything Labeled TODO
- 404 page
- Work through end of readme links
- write up on experience
- add urls to CMS
- kubernetes ?
- convert to typescript ?

1. Backend and Auth
https://blog.bitsrc.io/build-a-login-auth-app-with-mern-stack-part-1-c405048e3669

1a. Node and cookies
https://expressjs.com/en/resources/middleware/cookie-parser.html
https://www.tutorialspoint.com/expressjs/expressjs_authentication.htm

2. Hosting and Deploying
Hosting:
https://youtu.be/71wSzpLyW9k?t=226

Deploying:
pushing to master deploys automatically
watch it with `heroku logs --tail`

3. Design
ref: https://www.caitlinlowans.com/

[UI Design Elements Glossary](https://careerfoundry.com/en/blog/ui-design/ui-element-glossary/)

### Sass Architecture
[Modern CSS Reset](https://dev.to/hankchizljaw/a-modern-css-reset-6p3)
[Sass File Structure - using simple](https://itnext.io/structuring-your-sass-projects-c8d41fa55ed4)
[Sass Structure Boilerplate](https://github.com/HugoGiraudel/sass-boilerplate/blob/master/stylesheets/main.scss)
[Typography](https://internetingishard.com/html-and-css/web-typography/)
[Different React Approaches - Using Modular](https://alligator.io/react/react-css/)
note: about examples are using css modules, which I'm not using. use `import ./styles.scss` in components instead
[Modular Design in Greater Detail](https://medium.com/@markmuskardin/intro-to-css-architecture-for-react-apps-da0ec1753c86)
[Class Naming with BEM Convention](http://getbem.com/naming/)

### Choosing a Typeface
[Technical Typography](https://www.smashingmagazine.com/2011/03/technical-web-typography-guidelines-and-techniques/#tt-face)
[Combining Typefaces](https://www.smashingmagazine.com/2010/11/best-practices-of-combining-typefaces/)
[Proportional vs Monospace Fonts](https://www.techwalla.com/articles/proportional-vs-monospace-fonts)
[Display typeface](https://en.wikipedia.org/wiki/Display_typeface)

Examples:
https://www.siteinspire.com/
https://www.typewolf.com/
https://www.awwwards.com/
https://hoverstat.es/
https://www.semplice.com/
https://themeforest.net/category/wordpress
https://fontsinuse.com/in/2/formats/3/web

### Images
[Consistent Sizing](https://www.sitepoint.com/maintain-image-aspect-ratios-responsive-web-design/)

### Favicon Generation and Web Manifest Info
https://favicon.io/favicon-generator/
https://www.favicon-generator.org/
https://developer.mozilla.org/en-US/docs/Web/Manifest
https://developers.google.com/web/fundamentals/web-app-manifest/

### Loading Spinner Flickering
https://blog.bitsrc.io/a-brief-history-of-flickering-spinners-c9eecd6053

4. Performance
Used Image Kit To Reduce Image Sizes - originally specified cloudinary but didn't look into it

5. SEO
[Header Tags](https://www.hobo-web.co.uk/headers/)
[Introduction To Meta Tags](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/The_head_metadata_in_HTML)
[Meta Tags Best Practices](https://www.sitepoint.com/meta-tags-html-basics-best-practices/)
[Meta Tags For Social Media](https://css-tricks.com/essential-meta-tags-social-media/)

6. Security
[Redirect to HTTPS](https://stackoverflow.com/questions/7450940/automatic-https-connection-redirect-with-node-js-express)

## Interesting Links:
Node.js best practices
https://www.codementor.io/mattgoldspink/nodejs-best-practices-du1086jja

Config structure:
https://stackoverflow.com/questions/8332333/node-js-setting-up-environment-specific-configs-to-be-used-with-everyauth

Viewing DB Contents:
cloud.mongodb.com > clusters > collections
https://docs.atlas.mongodb.com/data-explorer/

Axios Cheatsheet:
https://kapeli.com/cheat_sheets/Axios.docset/Contents/Resources/Documents/index

Axios Info:
https://medium.com/@MinimalGhost/what-is-axios-js-and-why-should-i-care-7eb72b111dc0
https://blog.logrocket.com/axios-or-fetch-api/
https://medium.com/@thejasonfile/fetch-vs-axios-js-for-making-http-requests-2b261cdd3af5

Securing Tokens:
http://timmyreilly.azurewebsites.net/githubs-gitignore-and-db-keys-safe/
https://danlevy.net/protect-your-tokens/
https://medium.com/codait/environment-variables-or-keeping-your-secrets-secret-in-a-node-js-app-99019dfff716

Uploading Images to Mlab:
https://stackoverflow.com/questions/51825874/uploading-images-in-mlab

SPA Routing:
https://www.kirupa.com/react/creating_single_page_app_react_using_react_router.htm

## Links to work through
[Website Launch Checklist](https://github.com/greghub/website-launch-checklist)
[Note so self, use pm2 apparently for load balancing](https://pm2.keymetrics.io/)
[Security and JS](https://it.toolbox.com/blogs/manjunathmatathamana/how-to-secure-your-frontend-javascript-code-against-vulnerabilities-and-attacks-030119)
[Accessibility Testing](https://www.matuzo.at/blog/beyond-automatic-accessibility-testing-6-things-i-check-on-every-website-i-build/)
[UI Design, Spacing and Grids](https://medium.com/design-with-figma/everything-you-need-to-know-as-a-ui-designer-about-spacing-layout-grids-2bc269e12321)
[Web.dev for performance testing](https://web.dev/)
[Lighthouse for performance testing](https://developers.google.com/web/tools/lighthouse)
[Owasp](https://www.owasp.org/index.php/Main_Page)

## Lingering Questions
- module.exports vs export / require vs import
- React Router / HashRouter combo (routing is bad)

## Increasing JS Heap Size
https://github.com/facebook/create-react-app/issues/4536

## Hosting
[Buying Domain with NameCheap](https://www.tentononline.com/how-to-register-a-domain-name-with-namecheap/)
[Connecting NameCheap to Heroku](https://medium.com/@usama_asfar/how-to-set-up-a-domain-to-heroku-with-namecheap-54b5f13a1de5)