---
title: (HTML) 새 탭에서 링크 열기
description: a 태그의 target 속성
layout: blogpost
author: 이종우
email: jongwoo@studia.blue
date: 2021/12/22
categories: web
---

인터넷을 서핑할 때 링크를 새 탭에서 여는 것이 유용할 때가 종종 있습니다. 하지만 항상 링크를 우클릭해 "새 탭에서 열기"를 누르거나 새 탭으로 끌어다 놓는 것은 귀찮은 일입니다. 사이트에서 링크를 자동으로 새 탭에서 열게 할 수는 없을까요? 이번 포스트에서는 HTML과 JS에서 링크를 새 탭에서 여는 방법과, 부가적으로 `target` 속성에 대해 상세하게 알아보도록 하겠습니다.

## 해결법

HTML
```html
<a href="https://mysite.com" target="_blank" >Click Me</a>
```

JS
```js
window.open("https://mysite.com", "_blank")
// 주의: 3번째 매개변수를 지정하면 링크가 새 탭이 아닌 새 창에서 열릴 수 있음.
```

HTML, JS에서 `target` 속성을 `_blank`로 지정하면 링크를 새 탭에서 열 수 있습니다.


----------------

## a 태그의 `target` 속성

`<a>` 태그의 `target` 속성은 링크된 문서를 어디에서 열지 지정합니다.<br>
사용 가능한 값은 다음과 같습니다.

| 값 | 설명 | 예시 |
| ----------- | ----------- | ------------ |
| `_blank` | 새 탭에서 링크를 엽니다. | <a href="https://studia.blue" target="_blank" >Example</a> |
| `_self` | (기본 설정) 현재 탭에서 링크를 엽니다. | <a href="https://studia.blue" target="_self" >Example</a> |
| `_parent` | 부모 프레임에서 링크를 엽니다. | <a href="https://studia.blue" target="_parent" >Example</a> |
| `_top` | 최상위 프레임에서 링크를 엽니다. | <a href="https://studia.blue" target="_top" >Example</a> |
| _framename_ | 지정된 name을 가진 iframe에서 링크를 엽니다. | <a href="https://studia.blue" target="iframe" >Example</a> |

`_blank`이랑 `_self` 는 바로 확인할 수 있겠지만 나머지는 iframe을 통해 확인해야 하니 아래에 iframe도 하나 두겠습니다.

<iframe name="iframe" src="./#a-태그의-target-속성" style="width: 100%; height: 300px; border: 2px solid #ddd;"></iframe>

"framename"에서는 링크가 iframe에서 열리고, iframe 내부 "_parent"에서는 링크가 iframe 내가 아닌 부모 프레인에서 열리는 것을 확인할 수 있습니다.

------------------

지금까지 알아본 바와 같이 `target` 속성을 이용하면 링크가 열리는 위치를 제어할 수 있습니다.<br>
`<a>` 태그에 대해 더 자세히 알아보려면 [MDN Docs](https://developer.mozilla.org/ko/docs/Web/HTML/Element/a)를 참고하세요.