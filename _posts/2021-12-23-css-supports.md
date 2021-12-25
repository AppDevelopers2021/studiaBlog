---
title: CSS로 브라우저 호환성 감지하기 (feat.@supports)
description: supports를 사용하자
layout: blogpost
author: 이종우
email: jongwoo@studia.blue
date: 2021/12/23
categories: web
---

[STUDIA 웹 앱](https://studia.blue/app) 작업 당시 있었던 일입니다.

CSS `backdrop-filter`로 블러 효과를 앱에 활용하고 싶었는데, 비교적 최신 스펙이라 브라우저 호환성에 문제가 좀 있었습니다 (IE는 개발 지원 대상이 아니긴 했지만 FF에서 지원하지를 않았습니다). 아무리 좋은 기능이라도 브라우저가 지원하지 않으면 소용이 없으니까요. 최신 기술을 앱에 적용한다면 오래된 브라우저에서도 작동하게 하는 fallback을 사용해야 합니다.

이런 상황에서 사용할 수 있는 CSS 기능 쿼리가 바로 `@supports`입니다. 브라우저가 특정 CSS 구문을 지원하는지를 확인하고, 그렇지 않다면 fallback CSS를 적용할 수 있습니다.

{% include ad.html %}

## `@supports` Syntax

``` css
@supports (display: grid) {
    /* 브라우저에서 display:grid 구문을 지원합니다. */
}

@supports not (display: grid) {
    /* 브라우저에서 display:grid를 지원하지 않습니다. */

    .grid_item {
        float: right;
    }
    /* 이런 식으로 fallback을 지정할 수 있습니다. */
}
```

`@supports` 뒤에 오는 구문이 브라우저에서 지원된다면 아래에 작성된 CSS가 적용됩니다. `not`를 사용하면 지원하지 않는 경우에 CSS가 적용되게 할 수 있습니다. 이를 이용해 **특정 기능이 지원되지 않을 때 대신 보여지는** fallback을 사용할 수 있습니다.

``` js
if(CSS.supports("display", "grid")) {
    // 브라우저에서 display:grid 구문을 지원합니다.
}

if(CSS.supports("not ((backdrop-filter:blur(5px)) or (-webkit-backdrop-filter:blur(5px)))")) {
    // 이런 식으로 문자열 하나만 지정해서 사용해도 됩니다.
}
```

위와 같이 JavaScript로도 사용 가능합니다.

```css
@supports selector(A > B) {
    /* A>B selector을 이용할 수 있습니다. */
}
```

[`selector()`](https://css-tricks.com/supports-selector/)을 이용하면 특성 CSS selector가 지원되는지 여부를 확인할 수 있습니다.

{% include ad.html %}

## 실사용 예시

STUDIA 웹 앱의 CSS 코드의 일부분입니다.

```css
/* Fallback for backdrop-filter */
@supports (not ((backdrop-filter:blur(5px)) or (-webkit-backdrop-filter:blur(5px)))) {
    .blur_filter.blur {
        background-color: rgba(0, 0, 0, 0.5);
    }
}
```

CSS `backdrop-filter` 효과 (사파리 호환을 위해 -webkit prefix도 사용하였습니다)가 지원되지 않으면 배경을 어둡게 하는 효과로 대체하도록 했습니다. 위와 같이 `or`을 사용해 여러 구문을 연결할 수도 있습니다.