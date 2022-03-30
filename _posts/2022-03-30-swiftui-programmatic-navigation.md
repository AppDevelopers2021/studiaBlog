---
title: SwiftUI 코드로 내비게이션 (View 이동)
description: 앱에서 스위프트 코드만으로 뷰를 이동하는 방법을 알아봅니다.
layout: blogpost
author: 이종우
email: jongwoo@studia.blue
date: 2022/03/30
categories: ios
---

SwiftUI에서 내비게이번은 `NavigationView`와 `NavigationLink`를 사용해서 이루어집니다. 그러나 실제 개발에서는 스위프트 코드만으로 내비게이션을 해야 할 일이 종종 있습니다. 예를 들어, 유저를 로그인한 다음 메인 뷰로 이동하는 경우 프로그래매틱한 방법으로 내비게이션을 해야 합니다. 이때 Programmatic Navigation이라고 불리는 방법을 이용합니다.

{% include ad.html %}

## 간단한 방법

가장 간단한 방법은 다음과 같습니다.

```swift
// $State var goToViewTwo: Bool = false

NavigationLink(destination: Text("View #2"), isActive: $goToViewTwo) { EmptyView() }

// 이동하려면:
// self.goToViewTwo = true
```

`NavigationLink` 의 `isActive` 속성을 `Boolean` 변수로 지정해, 변수의 값이 참일 때 뷰가 이동되도록 했습니다. 이때, `NavigationLink` 내부가 비어있으면 오류가 나기 때문에 `EmptyView` 를 사용했습니다.

{% include ad.html %}

## 여러 개 사용할 때는

위의 방법만으로도 충분히 Programmatic Navigation 을 사용할 수 있지만, 경우에 따라 여러 가지의 뷰로 이동해야 하는 경우에는 변수를 여러 개 사용하는 것이 번거로울 수 있습니다. 이때에는 `Tag`와 `Selection` 속성을 사용합니다.

```swift
// $State var goToView: String? = nil

NavigationLink(destination: Text("View #3"), tag: "#3", selection: $goToView) { EmptyView() }
NavigationLink(destination: Text("View #4"), tag: "#4", selection: $goToView) { EmptyView() }

// View #3으로 이동하려면:
// self.goToView = "#3"
```

이 방법응 사용하면 단 하나의 String 변수만으로 여러 내비게이션을 컨트롤할 수 있게 됩니다. 변수의 값은 활성화하고자 하는 NavigationLink 의 Tag 값으로 합니다.