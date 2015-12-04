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

### Add Mailchimp

In **index.html**, after:
```
<div id="main" data-behavior="1"
                 class="
                        hasCoverMetaIn
                        ">
```

Paste in:

```
<!-- Begin MailChimp Signup Form -->
<link href="//cdn-images.mailchimp.com/embedcode/slim-081711.css" rel="stylesheet" type="text/css">
<style type="text/css">
    #mc_embed_signup{background:#fff; clear:left; font:14px Helvetica,Arial,sans-serif; }
    /* Add your own MailChimp form style overrides in your site stylesheet or in this style block.
       We recommend moving this block and the preceding CSS link to the HEAD of your HTML file. */
</style>
<div id="mc_embed_signup">
<form action="//github.us5.list-manage.com/subscribe/post?u=0713e0ac2a414eae4ca4bb786&amp;id=0bdf2bdb00" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
    <div id="mc_embed_signup_scroll">
    <label for="mce-EMAIL">I'll be teaching new courses on <a href='http://learntomakestuffwithcode.teachable.com/'>Learn To Make Stuff With Code</a>, sign up for updates here!</label>
    <input type="email" value="" name="EMAIL" class="email" id="mce-EMAIL" placeholder="email address" required>
    <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
    <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_0713e0ac2a414eae4ca4bb786_0bdf2bdb00" tabindex="-1" value=""></div>
    <div class="clear"><input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="button"></div>
    </div>
</form>
</div>

<!--End mc_embed_signup-->
```