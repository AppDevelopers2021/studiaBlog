---
title: Jekyll 사이트에 수식 입력하기 (MathJax)
description: GitHub Pages 사이트에 MathJax로 수식을 입력할 수 있습니다.
layout: blogpost
author: 이종우
email: jongwoo@studia.blue
date: 2022/02/17
categories: web
use_math: true
---

Jekyll로 만든 블로그에 갑자기 수식을 입력해야 할 일이 생겼습니다. 많은 글들을 찾아봤지만 실제로 작동하는건 별로 없더군요. 그래서 제가 여러 글들을 참고해서 만들어 봤습니다.

# MathJax 불러오기

`MathJax`가 수식 입력의 핵심입니다. 자바스크립트 라이브러리로, `TeX` 문법으로 작성된 수식을 표시해주는 기능을 합니다.

```html
{% raw %}{% if page.use_math %}
<script type="text/javascript" id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js"></script>
{% endif %}{% endraw %}
```

블로그 게시글의 layout 파일의 `head` 내부에 위 코드를 추가해 주세요.

!["use_math: true"](/assets/img/use_math.png)

그 다음 수식 입력 기능을 사용할 페이지의 yaml 부분에 `use_math: true`라고 추가해 주시면 됩니다.

{% include ad.html %}

# 수식 입력하기

다른 내용 사이에 inline으로 수식을 입력할 때는 `\\(`와 `\\)` 사이에 입력합니다. 별도의 줄에 수식을 입력할 때에는 `$$` 사이에 입력합니다.
```
\\(x, x+h \in [a, b] \\)일 때 다음이 성립한다.

$$
F'(x)=\lim_{h \to 0}\frac{1}{h}\int_{x}^{x+h} f(t)dt
$$
```

> \\(x, x+h \in [a, b] \\)일 때 다음이 성립한다.
>
> $$
> F'(x)=\lim_{h \to 0}\frac{1}{h}\int_{x}^{x+h} f(t)dt
> $$

## TeX

MathJax는 TeX 문법으로 수식을 표현합니다. 위키백과에 `TeX` 문법을 정리한 [훌륭한 표](https://ko.wikipedia.org/wiki/%EC%9C%84%ED%82%A4%EB%B0%B1%EA%B3%BC:TeX_%EB%AC%B8%EB%B2%95)가 있으니 참고하면 웬만한 기호나 식은 나타낼 수 있을 겁니다.

{% include ad.html %}

# 마치며

이상 MathJax를 Jekyll 블로그에서 사용하는 법을 알아보았습니다.

$$
\forall \epsilon > 0 ; \exists \delta > 0 ~\text{s.t.}~ \forall x \in \mathbb{R} ; 0 < \vert x - x_0 \vert < \delta \implies \vert f(x) - a \vert < \epsilon
$$

잘 동작하네요. (위 식은 엡실론-델타 논법입니다.)