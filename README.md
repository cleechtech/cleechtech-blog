My blog -- the source code
====

Made with Hexo.js and [tranquilpeak-hexo-theme](https://github.com/LouisBarranqueiro/tranquilpeak-hexo-theme)

```
$ hexo new post "title goes here"
$ hexo generate
$ hexo server
```

To wipe tags:
```
$ hexo clean
```
New tags will be created when a build happens

To deploy run:

```
$ hexo deploy
```

Your build will automagically be deployed to the master branch of https://github.com/connor11528/connor11528.github.io (specified in **_config.yml**)

### Partials

Partials are included in themeName/layout/_partial and can be included like `<%- partial('_partial/mailchimp_bar') %>`


