---
title: 알아두면 유용한 미디어 쿼리 모음
description: media query를 사용해 다양한 기기에 사이트를 최적화해 보세요.
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

아래는 제가 가장 자주 사용하는 유용한 미디어 쿼리의 목록입니다.

# Responsive Layout
![Responsive Website](/assets/img/responsive.png)
Responsive Layout은 기기의 화면 크기에 맞춰 레이아웃이 달라지는 것을 말합니다.
```css
@media screen and (min-width: 768px) {

    /* 여기 작성된 CSS는 화면 가로 크기가 768px 이상일 때만 적용됩니다.
       모바일과 데스크탑을 구분하는 기준은 보통 768px로 둡니다.
       여기 작성되는 코드는 데스크탑 용이라는 거죠. */

}
```
이 미디어 쿼리를 이용하면 모바일 전용 페이지를 따로 만들지 않고도 모바일 최적화 작업을 할 수 있습니다.

-----------------------

# Dark Mode
![Dark Mode](/assets/img/darkmode.png)
```css
@media (prefers-color-scheme: dark) {

    /* 여기 작성된 CSS는 기기가 다크 모드일 때 적용됩니다. */

}
```
다크 모드 상태에서 밝은 웹사이트에 들어가면 눈이 부시니까 그러지 말라고 있는 겁니다.<br>(자세한 내용은 [이 글](https://blog.studia.blue/web/css-dark-mode/)을 참고하세요.)

-----------------------

# Print
![Printer](/assets/img/print.png)
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

-----------------------

# Hover
![Hover Effect](/assets/img/hover.png)
```css
@media (hover: none) {

    /* 장치가 hover 효과를 줄 수 없음!
    터치스크린 장치 등에서 적용됩니다. */

}
```
이건 제가 가장 좋아하는 미디어 쿼리 중 하나인데요,