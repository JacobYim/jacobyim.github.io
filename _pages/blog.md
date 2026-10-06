---
title: Notes
permalink: /blog/
layout: notes
---
<div class="intro"><div class="meta blue">Notes / Junghwan Yim</div><h1>Notes from research and practice.</h1><p>Lessons from experiments, implementation, and solving problems.</p></div><div class="archivehead"><span>Archive</span><span>{{ site.posts.size }} notes</span></div>
{% for post in site.posts %}<a class="entry" href="{{ post.url | relative_url }}"><time class="date">{{ post.date | date: "%Y.%m.%d" }}</time><div><h2>{{ post.title | escape }}</h2><p>{{ post.excerpt | strip_html | truncate: 110 }}</p></div><span class="arrow" aria-hidden="true">↗</span></a>{% endfor %}
{% if site.posts.size == 0 %}<p style="padding:38px 0;color:#68706c;font-size:14px">No posts published yet.</p>{% endif %}
