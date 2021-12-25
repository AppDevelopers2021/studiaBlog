---
title: GitHub Pages에서 sitemap.xml이 404로 나올 때
description: 깃허브 페이지 사용시 설정법
layout: blogpost
author: 이종우
email: jongwoo@studia.blue
date: 2021/11/27
categories: web
---

![404 Page in GitHub Pages](/assets/img/ghpages-404.png)
GitHub Pages를 사용할 때 가끔 이런 일이 일어날 때가 있습니다.

*"분명 sitemap.xml을 생성하고 push했는데 URL에 들어가면 404라고 뜨네"*

이는 GitHub Pages를 사용할 때 서버에서 [jekyll](https://jekyllrb.com/)을 사용한 것으로 판단하여, 자동으로 코드를 컴파일하여 발생하는 문제입니다. 실제로 jekyll을 사용했다면 문제가 없지만 단순 호스팅 용도로 사용할 경우에는 필요한 파일을 찾지 못할 수 있습니다.

{% include ad.html %}

## 해결법

해결 방법은 간단합니다. 프로젝트 폴더 내에
```
.nojekyll
```
이라는 파일을 만들면 됩니다.

내용은 빈 상태로 놔두세요. 이제 깃허브로 `push`하게 되면 컴파일 과정을 거치지 않고 파일들이 모두 호스팅됩니다.