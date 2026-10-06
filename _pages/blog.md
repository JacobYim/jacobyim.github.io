---
title: Notes
permalink: /blog/
layout: notes
---
<div class="intro"><div class="meta blue">Notes / Junghwan Yim</div><h1>작업하며 남긴 기록.</h1><p>실험하고, 구현하고, 문제를 해결하며 배운 것들.</p></div><div class="archivehead"><span>Archive</span><span>{{ site.posts.size }} notes</span></div>
{% for post in site.posts %}<a class="entry" href="{{ post.url | relative_url }}"><time class="date">{{ post.date | date: "%Y.%m.%d" }}</time><div><h2>{{ post.title | escape }}</h2><p>{{ post.excerpt | strip_html | truncate: 110 }}</p></div><span class="arrow" aria-hidden="true">↗</span></a>{% endfor %}
{% if site.posts.size == 0 %}<p style="padding:38px 0;color:#68706c;font-size:14px">아직 공개된 글이 없습니다.</p>{% endif %}
