---
author: tim
comments: true
date: 2010-09-08 18:03:07+00:00
dsq_thread_id: '243618106'
layout: post
link: ''
slug: magento-enabling-the-product-review-form-anywhere
title: 'Magento:: Enabling the Product Review form anywhere'
wordpress_id: 647
category: Code
tags:
- magento
- php
---

the form code lives in
```app/design/frontend/yourtemplate/default/template/review/form.phtml``` in
catalog.xml enable it with: 

```xml
<block type="review/form" name="product.info.review_form" as="review_form" template="review/form.phtml"/>
```

and in your template: 

```PHP
<?php echo $this->getChildHtml('review_form'); ?>
```