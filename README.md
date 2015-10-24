Blog
====

Made with Hexo.js and [tranquilpeak-hexo-theme](https://github.com/LouisBarranqueiro/tranquilpeak-hexo-theme)

```
$ hexo new post "title goes here"
$ hexo generate
$ hexo server

```

To deploy run:

```
$ hexo generate
$ cp -R public ../cleechtech.github.io
```

Change into cleechtech.github.io

```
$ mv public/* .
$ rm -rf public
```

Check it out locally with `$ python -m SimpleHTTPServer`