---
title: JS로 애플 텍스트 애니메이션 따라하기 (feat.ScrollMagic)
description: 텍스트 스크롤 애니메이션을 적은 양의 코드로 만들어보자
layout: blogpost
author: 이종우
email: jongwoo@studia.blue
date: 2022/01/21
categories: web
---

# 인트로

오늘은 이걸 만들어 볼 겁니다.

<p class="codepen" data-height="400" data-default-tab="result" data-slug-hash="XWevmeO" data-user="lee-jongwoo" style="height: 400px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/lee-jongwoo/pen/XWevmeO">
  Multiple Apple Animations</a> by Jongwoo Lee (<a href="https://codepen.io/lee-jongwoo">@lee-jongwoo</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

어디서 많이 보셨죠?

바로 [이런](https://www.apple.com/airpods-pro/) 애플 사이트에 사용되는 텍스트 애니메이션입니다. 그런데 아무리 찾아봐도 이걸 만드는 법을 알려주는 글이 없더군요. 그래서 제가 직접 만들어봤습니다. (이해 안되는 부분 있으시면 댓글 남겨주세요)

이 글에서는 ScrollMagic과 GSAP을 이용합니다. 이는 AOS (Animate on scroll, 어느 지점까지 스크롤시 요소가 나타나는 것) 과 달리, 스크롤 위치에 따라 애니메이션이 바뀌게 하고 싶을 때 사용합니다. 딱 애플 사이트처럼 말이죠. 이 둘을 잘 모른다면 ScrollMagic 튜토리얼 정도는 보고 오시는 게 좋을 겁니다.

{% include ad.html %}

# 애플 애니메이션 뜯어보기

애플 웹사이트의 텍스트 애니메이션은 다음과 같이 이루어집니다.

1. 텍스트가 페이드 인과 동시에 위로 올라오며 나타납니다.
2. 텍스트가 아주 느린 속도로 위로 올라오며, 보는 사람이 글자를 읽을 시간을 줍니다.
3. 텍스트가 페이드 아웃과 동시에 위로 올라가며 사라집니다.

자, 여기에서 우리가 animate해야 할 요소는 다음과 같습니다.

- `opacity`: 0&rarr;1&rarr;0 으로 변화
- `translateY`: (-)&rarr;0&rarr;(+) 으로 변화

그래프로 나타내면 이렇습니다.

![Animation Graph](/assets/img/animation-graph.jpg)

`opacity`는 직선으로 되어 있으니 쉽게 만들 수 있지만 `translateY`는 그래프가 저렇게 요상하게 생겨서 생각보다 만들기 어렵습니다. 다행히도, GSAP에서 우리를 위한 Easing Function을 만들어 주었네요. [GreenSock Ease Visualizer](https://greensock.com/docs/v2/Easing) 에 가면 우리가 원하는 그래프가 있습니다.

![SlowMo](/assets/img/gsap-slowmo.png "바로 이거에요.")

> SlowMo is a configurable ease that produces a slow-motion effect that decelerates initially, then moves linearly for a certain portion of the ease (which you can choose) and then accelerates again at the end; it's great for effects like zooming text onto the screen, smoothly moving it long enough for people to read it, and then zooming it off the screen

> SlowMo는 처음에는 속도가 줄다가 특정 구간에서 (커스텀 가능합니다) 일정한 속도로 움직이고, 다시 빨라지며 이동하는 ease 입니다. 텍스트를 화면에 띄운 다음 사람들이 읽을 수 있도록 부드럽게 움직이고, 그런 다음 화면에서 제거하는 효과를 나타내기 좋습니다.

{% include ad.html %}

# 디자인 작업

우선 애니메이션이 진행되는 동안 텍스트는 화면에 고정되어 있어야 합니다. 스크롤을 내리면 `translateY`로 옮겨 줄거니까요. 그런데 fixed position을 주면 화면에 항상 따라다니게 되고 여러모로 불편할 테니까 `position: sticky`를 이용하도록 하겠습니다.

우리 HTML 구조는 이렇습니다.
```html
<div class="container">
  <h1 class="animate">애플 따라하기!</h1>
  <div class="trigger"></div>
</div>
```
여기서 `.animate`는 우리가 애니메이션을 입힐 텍스트, `.trigger`은 그냥 애니메이션을 시작하는데 사용되는 빈 요소입니다. 기본 HTML과 CSS 작업은 어려운 부분이 없을 것으로 생각하고 빠르게 넘어갈게요.

<p class="codepen" data-height="400" data-default-tab="result" data-slug-hash="xxXvazR" data-preview="true" data-user="lee-jongwoo" style="height: 400px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/lee-jongwoo/pen/xxXvazR">
  Apple Text Animation (Step 1)</a> by Jongwoo Lee (<a href="https://codepen.io/lee-jongwoo">@lee-jongwoo</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

{% include ad.html %}

# 애니메이션 설계

애니메이션 작업을 위해서는 타임라인을 만들어야 합니다. 단순한 효과는 `TweenMax` 만으로도 충분하지만 우리처럼 서로 애니메이션이 연달아 나오는 경우는 `TimelineMax`를 사용해야 합니다.

![Timeline](/assets/img/timeline.jpg)

이렇게 그리면 이해가 쉬울지는 모르겠는데, 제 코드를 도표로 표현하면 이렇습니다. 빨간색이 TranslateY, 파란색이 Opacity 애니메이션입니다. 각각의 애니메이션을 TweenMax으로 만들고, 그 다음 TimelineMax으로 둘을 이어 주면 되겠네요.

## ScrollMagic

먼저 ScrollMagic 라이브러리를 불러와 줍니다.
```html
<script src="//cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.7/ScrollMagic.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/gsap/2.1.3/TweenMax.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.5/plugins/animation.gsap.js"></script>

<!-- Optional -->
<script src="//cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.7/plugins/debug.addIndicators.min.js"></script>
```
`addIndicators`는 동작하는 데는 필요가 없지만 코딩 시 효과가 어디서 시작되고 끝나는지 확인하는 데 사용됩니다. 실제 웹사이트에 적용할 때는 제외하면 됩니다.

ScrollMagic Controller을 만들고 메인 Timeline을 생성합니다. 그런 다음 Scene을 만들어 앞의 Timeline을 Tween으로 등록합니다.
```js
var controller = new ScrollMagic.Controller();
var timeline = new TimelineMax();

// 여기 애니메이션 코드가 들어갈 거예요.

var scene_main = new ScrollMagic.Scene({
  triggerElement: ".trigger",
  duration: "1500px"  // 적당히 조절해 주시면 됩니다.
})
.setTween(timeline)
.addTo(controller)
```

{% include ad.html %}

## Opacity 애니메이션

먼저 CSS에서 `.animate`의 `opacity`를 0으로 설정합니다. 처음에는 보이지 않는 상태에서 시작해야 하니까요.

그 다음 TimelineMax으로 애니메이션을 만들어 주면 됩니다.
```js
var tween_opacity = new TimelineMax();

tween_opacity
  .to(".animate", 0.3, {    // 0.3은 애니메이션이 진행되는 길이입니다.
    ease: Linear.easeNone,  // Linear 애니메이션은 값이 직선형으로 일정하게 변한다는 뜻입니다.
    opacity: 1              // Opacity가 0으로 (to) 바뀜
  })
  .to(".animate", 0.3, {
    ease: Linear.easeNone,
    opacity: 0
  }, "+=0.4");              // 여기 있는 0.4는 앞의 애니메이션 이 끝난 후 0.4만큼 기다리고 실행하라는 뜻입니다.
                            // 텍스트가 페이드 인 한 뒤 일정 기간 나타나 있어야 하니까요.

timeline.add(tween_opacity, 0);
```

실행해 봅니다.<br>
뭔가 더 완성에 가까워진 것 같죠?

<p class="codepen" data-height="400" data-default-tab="result" data-slug-hash="zYPOryq" data-preview="true" data-user="lee-jongwoo" style="height: 400px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/lee-jongwoo/pen/zYPOryq">
  Apple Text Animation (Step 2)</a> by Jongwoo Lee (<a href="https://codepen.io/lee-jongwoo">@lee-jongwoo</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

## TranslateY 애니메이션

어려워 보이지만 (그래요. 외부 라이브러리 없이는 _굉장히_ 어렵습니다) 다행스럽게도 GSAP 덕에 우리는 아주 쉽게 TranslateY 애니메이션을 만들 수 있습니다.

```js
var tween_move = TweenMax.fromTo(".animate", 1, {
  ease: SlowMo.ease.config(0.7, 0.7, false),  // SlowMo가 우리가 원하는 애니메이션의 이름입니다.
  y: 50                                       // GSAP은 CSS와는 조금 달라서 transalateY 대신 y라는 이름으로 사용됩니다.
}, {
  ease: SlowMo.ease.config(0.7, 0.7, false),
  y: -50
});
```
이게 다입니다.

<p class="codepen" data-height="400" data-default-tab="result" data-slug-hash="YzrorBK" data-preview="true" data-user="lee-jongwoo" style="height: 400px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/lee-jongwoo/pen/YzrorBK">
  Apple Text Animation (Step 3)</a> by Jongwoo Lee (<a href="https://codepen.io/lee-jongwoo">@lee-jongwoo</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

{% include ad.html %}

# 완성!

전체 코드입니다.

```js
var controller = new ScrollMagic.Controller();
var timeline = new TimelineMax();

var tween_move = TweenMax.fromTo(
  ".animate",
  1,
  {
    ease: SlowMo.ease.config(0.7, 0.7, false),
    y: 50
  },
  {
    ease: SlowMo.ease.config(0.7, 0.7, false),
    y: -50
  }
);

var tween_opacity = new TimelineMax();
tween_opacity
  .to(".animate", 0.3, {
    ease: Linear.easeNone,
    opacity: 1
  })
  .to(".animate", 0.3, {
    ease: Linear.easeNone,
    opacity: 0
  }, "+=0.4");

timeline.add(tween_move, 0).add(tween_opacity, 0);

var scene_main = new ScrollMagic.Scene({
  triggerElement: ".trigger",
  duration: "1500px"
})
  .setTween(timeline)
  .addTo(controller);
```

{% include ad.html %}

# 응용하기 - 애니메이션을 여러 개 넣고 싶다면

자 그럼 아까 인트로에서 본 것처럼 여러 개의 애니메이션을 연달아 나오게 해 볼까요?

```html
<div class="whats-this">
  <h1>Apple Text Animation</h1>
  <p>Scroll Down</p>
</div>

<div class="container">
  <h1 class="animate animate_1">하나.</h1>
  <div class="trigger trigger_1"></div>
  <h1 class="animate animate_2">둘.</h1>
  <div class="trigger trigger_2"></div>
  <h1 class="animate animate_3">셋.</h1>
  <div class="trigger trigger_3"></div>
  <h1 class="animate animate_4">넷.</h1>
  <div class="trigger trigger_4"></div>
</div>
```
이렇게 container 안에 animate와 trigger 요소를 여러 개 넣어 줍니다.

```js
var controller = new ScrollMagic.Controller();
var animateElem = [".animate_1", ".animate_2", ".animate_3", ".animate_4"];
var triggerElem = [".trigger_1", ".trigger_2", ".trigger_3", ".trigger_4"];

for (var i = 0; i < animateElem.length; i++) {
  var currentAnimateElem = animateElem[i];
  var currentTriggerElem = triggerElem[i];

  var timeline = new TimelineMax();

  var tween_move = TweenMax.fromTo(
    currentAnimateElem,
    1,
    {
      ease: SlowMo.ease.config(0.7, 0.7, false),
      y: 50
    },
    {
      ease: SlowMo.ease.config(0.7, 0.7, false),
      y: -50
    }
  );

  var tween_opacity = new TimelineMax();
  tween_opacity
    .to(currentAnimateElem, 0.3, {
      ease: Linear.easeNone,
      opacity: 1
    })
    .to(
      currentAnimateElem,
      0.3,
      {
        ease: Linear.easeNone,
        opacity: 0
      },
      "+=0.4"
    );

  timeline.add(tween_move, 0).add(tween_opacity, 0);

  var scene_main = new ScrollMagic.Scene({
    triggerElement: currentTriggerElem,
    duration: "900px"
  })
    .setTween(timeline)
    .addTo(controller);
}
```
그 다음 이렇게 `for`문으로 애니메이션을 반복해 넣어주면 쉽게 연속적인 애니메이션을 만들 수 있습니다.

## 개선할 점

애니메이션을 만들면서 최대한 적은 양의 코드로 간단하게 만드려고 하다 보니 아직은 개선할 점이 많습니다.

- 애니메이션 성능 최적화
- 저 `for`문좀 어떻게 하기 (아시는 분 있으시면 연락좀 주세요)

그래도 오늘은 애니메이션을 구현하는 것에 중점을 두고 여기서 끝내도록 하겠습니다. 시간 남으면 다음번에는 더 효율적인 코드로 구현하는 방법을 포스팅할 생각입니다.<br>(어떻게 구현할지는 그때 생각해 봐야겠죠)