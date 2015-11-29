Blog
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

To deploy run:

```
$ hexo generate
$ cp -R public ../cleechtech.github.io
```

Change into cleechtech.github.io

```
$ rm -rf * 
$ mv public/* .
$ rm -rf public
$ rm -rf assets/css/tranquilpeak.css
$ cp ../cleechtech-blog/tranquilpeak.css assets/css/
```

Check it out locally with `$ python -m SimpleHTTPServer`