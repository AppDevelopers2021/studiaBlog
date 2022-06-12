---
title: SwiftUI Text 일부분만 색깔 바꾸기
description: 더하기 연산자를 이용해 SwiftUI에서 일부분의 색만 바꾸는 방법을 알아봅니다.
layout: blogpost
author: 이종우
email: jongwoo@studia.blue
date: 2022/06/12
categories: ios
---

가끔 앱에서 굉장히 중요한 부분이나 경고 메세지 등을 이렇게 일부분만 강조해야 할 때가 있습니다. 간혹 `HStack`을 이용해서 합치는 사람들이 있는데, 제발 그러지 마세요. 텍스트가 길어지거나 화면 크기가 작아지면 망합니다.

대신, 이렇게 하세요:

```swift
Text("Some")
+ Text("important")
  .foregroundColor(.red)
  .fontWeight(.bold)
+ Text("text")
```

> Some **important** text

{% include ad.html %}

`+` 연산자를 이용해 여러 개의 Text를 합칠 수 있습니다. 색상 말고도 굵기, 크기, 스타일 등 다양한 속성을 바꿀 수 있습니다.