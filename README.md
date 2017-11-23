ConnorLeech.info -- the source code
====

My personal site, made with [Hexo](https://hexo.io/)

### Local dev

Run a local server:

```
$ hexo server
```

This will open a local version of the site on http://localhost:4000/.

### Deploy

First, wipe the code for the previous deploy. The following command will delete the public folder and all of its contents:

```
$ hexo clean
```

To build out a new site from a specified themes (in this case **themes/customTheme**) and deploy to Github Pages run:

```
$ hexo deploy
```

This command automatically git pushes the built files to the master branch of https://github.com/connor11528/connor11528.github.io. These settings are configured in **_config.yml**.

### Post default:

```
layout: post
title: 
date: 2017-11-22
category: 
lede: ""
author: Connor Leech
published: true
---
```

### Theme

Currently using Computer Lab's theme: https://github.com/computer-lab/computerlab.io/tree/master/themes/computer-lab

All themes are stored in **themes** dir.


