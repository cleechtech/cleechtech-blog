ConnorLeech.info -- the source code
====

My personal site, made with Hexo.js

```
$ hexo new post "title goes here"
$ hexo generate
$ hexo server
```

To wipe tags (deletes pubpic folder):
```
$ hexo clean
```
New tags will be created when a build happens

To deploy run:

```
$ hexo deploy
```

The build will automatically deploys to the master branch of https://github.com/connor11528/connor11528.github.io (specified in **_config.yml**)

### Partials

Partials are included in themeName/layout/_partial and can be included like `<%- partial('_partial/mailchimp_bar') %>`


