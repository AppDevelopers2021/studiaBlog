---
title: M1 맥에서 CocoaPods 오류 해결법
description: Apple Silicon 탑재 맥에서 CocoaPods 오류를 해결하는 방법을 알아봅니다.
layout: blogpost
author: 이종우
email: jongwoo@studia.blue
date: 2022/05/23
categories: web
---

## TL;DR

제가 M1 맥북 에어를 개발용으로 쓰기 시작하면서부터였습니다. `pod install`로 패키지를 추가하려고 할 때마다 오류가 나면서 진행되지 않더군요. Apple Silicon부터 CPU 아키텍처가 바뀌어 생기는 것으로 보였습니다. 이번 포스팅에서는 이 문제에 대한 해결법을 작성하려고 합니다. 

{% include ad.html %}

## 해결법

이 문제는 CocoaPods가 사용하는 `ffi` 라는 gem의 호환성 문제로 인한 것입니다. 따라서 x86 에뮬레이션 모드를 사용하면 문제가 해결됩니다. 

```plaintext
sudo arch -x86_64 gem install ffi
arch -x86_64 pod install
```

이 방법은 CocoaPods 뿐만 아니라 Jekyll 등 `ffi` 문제로 생기는 오류를 해결하는데 사용될 수 있습니다.
