---
title: 알아두면 유용한 미디어 쿼리 모음
description: 다양한 종류의 media query를 사용해 다양한 기기에 사이트를 최적화해 보세요.
layout: blogpost
author: 이종우
email: jongwoo@studia.blue
date: 2021/12/06
categories: web
---

## media query란?
웹사이트를 만들다 보면 이런 상황이 가끔 있습니다.

> _"내비게이션 바를 모바일 화면에도 보기 쉽게 하고 싶다"_

> _"모바일 접속 시에는 화면 크기에 최적화된 이미지를 보여 주고 싶다"_

> _"모바일 기기 최적화를 해야 하지만 페이지를 새로 만들기는 번거롭다"_

이때 **미디어 쿼리**를 사용하게 되면 CSS만으로 이런 효과를 쉽게 낼 수 있습니다.

-----------------------

# Media Query 규칙

### 합치기
`and`, `or`, 또는 `not`을 사용해 복잡한 미디어 쿼리를 만들 수 있습니다.
```css
@media (min-height: 680px), screen and (orientation: portrait) {

    /* 스크린 높이가 680픽셀 이상이고 방향은 세로이고 어쩌고 저쩌고... */

}
```

### Backward-compatible하게 만들기
`only` 키워드를 사용하면 [너무 후져서](https://ko.wikipedia.org/wiki/%EC%9D%B8%ED%84%B0%EB%84%B7_%EC%9D%B5%EC%8A%A4%ED%94%8C%EB%A1%9C%EB%9F%AC) 미디어 쿼리를 지원하지 않는 브라우저에서 미디어 쿼리 속 CSS가 적용되는 것을 막을 수 있습니다.
```css
@media only screen and (color) {

    /* 에이 설마 only 넣어야 되겠어
    에이 설마 */

}
```

### 최신 스펙
간편하게 media query를 사용할 수 있는 [`Media Query Level 4`](https://caniuse.com/mdn-css_at-rules_media_range_syntax)가 나왔는데, 안타깝게도 아직 <span title="파폭 킹왕짱">파이어폭스</span>밖에는 지원을 안합니다.
```css
@media (30em <= width <= 50em ) {

    /* 경고: 쓰지 말것.
    대부분의 브라우저에서 지원되지 않습니다. */

}
```
아름답네요.

# Media Query 종류
자, 이제 미디어 쿼리 종류를 알아봅시다.

## Responsive Layout

Responsive Layout은 기기의 화면 크기에 맞춰 레이아웃이 달라지는 것을 말합니다.
```css
@media screen and (min-width: 768px) {

    /* 여기 작성된 CSS는 화면 가로 크기가 768px 이상일 때만 적용됩니다.
       모바일과 데스크탑을 구분하는 기준은 보통 768px로 둡니다.
       여기 작성되는 코드는 데스크탑 용이라는 거죠. */

}
```
이 미디어 쿼리를 이용하면 모바일 전용 페이지를 따로 만들지 않고도 모바일 최적화 작업을 할 수 있습니다.

## Dark Mode

```css
@media (prefers-color-scheme: dark) {

    /* 여기 작성된 CSS는 기기가 다크 모드일 때 적용됩니다. */

}
```
다크 모드 상태에서 밝은 웹사이트에 들어가면 눈이 부시니까 그러지 말라고 있는 겁니다.<br>(자세한 내용은 [이 글](https://blog.studia.blue/web/css-dark-mode/)을 참고하세요.)

## Print

```css
@media print {

     /* 여기 작성된 CSS는 사용자가 페이지를 프린트 할 때 적용됩니다.
     예를 들어 */
     footer {
         display: none;
     }
     /* 이렇게 작성하면 프린트된 페이지에서 footer는 숨겨지게 됩니다. */

}
```
사용자가 페이지를 프린트했을 때도 사이트의 내용이나 글씨 등이 가려져서는 안 됩니다. 
따라서 본 미디어 쿼리를 이용해 프린트된 페이지에서는 애니메이션을 제거하고, `fixed`나 `sticky` position이 적용된 요소는 `static`으로 전환하며, 불필요한 요소는 숨겨야 합니다.

## Hover

```css
@media (hover: none) {

    /* 장치가 hover 효과를 줄 수 없음!
    터치스크린 장치 등에서 적용됩니다. */

}
```
이건 제가 가장 좋아하는 미디어 쿼리 중 하나인데요, 이 코드를 사용하면 터치스크린 기기를 감지할 수 있습니다. `hover`가 불가능한 기기에서는 hover 효과를 클릭 효과 등으로 바꿔 주어야겠죠?

## Orientation

```css
@media (orientation: landscape) {

    /* 여기 작성된 코드는 기기가 가로 모드일 때 적용됩니다. */

}
```
자주 쓰이지는 않지만, 이 코드는 기기가 가로 모드 (landscape) 인지 세로 모드 (portrait) 인지 감지합니다.

# 지원 범위
[https://caniuse.com/css-mediaqueries](https://caniuse.com/css-mediaqueries)

웬만한 브라우저에서는 `media query`를 사용할 수 있습니다 (99.68%). 그러나 `prefers-color-scheme`처럼 지원 범위가 좁은 것도 있으니 사용 전에는 지원 여부를 확인해 보는 것이 좋을 듯 합니다.