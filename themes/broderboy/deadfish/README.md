<h1 id="a-bootstrap-3-blog-theme-for-sculpin">A Bootstrap 3 Blog Theme for Sculpin</h1>

<h2 id="requirements">Requirements</h2>

<p>This theme requires Bootstrap 3, font awesome, and jQuery 1.9.*.  Please see
<code>_includes/custom/head.html</code> and <code>_includes/custom/after_footer.html</code> to see
where we expect these to live by default.</p>

<p>Feel free to create fresh copies of these files in <code>sources/_includes/custom/</code>
to override these values if you intend to install these dependencies elsewhere.</p>

<h2 id="installation">Installation</h2>

<p>Sculpin can automatically install this theme for you by adding the following to
your <code>sculpin.json</code>:</p>

<pre><code data-language="json">{
    "repositories": [
        {
            "type": "vcs",
            "url": "git@github.com:sculpin/bootstrap-3-blog-theme.git"
        }
    ],
    "require": {
        "sculpin/bootstrap-3-blog-theme": "dev-master"
    }
}
</code></pre>

<p>Once installed, modify <code>app/config/sculpin_kernel.yml</code> like this:</p>

<pre><code data-language="yaml">sculpin_theme:
    theme: sculpin/bootstrap-3-blog-theme
</code></pre>

<h2 id="not-invented-here">Not Invented Here</h2>

<p>Largely inspired by <a href="http://octopress.org/">Octopress</a> classic theme.</p>
