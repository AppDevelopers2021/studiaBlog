---
title: SwiftUI 로딩 표시 만들기
description: ProgressView를 사용해 로딩 스피너를 만드는 법을 알아봅니다.
layout: blogpost
author: 이종우
email: jongwoo@studia.blue
date: 2022/03/29
categories: ios
---

앱이 서버와 통신하거나 시간이 오래 걸리는 작업을 하는 경우 화면이 멈춰 있으면 사용자가 앱이 동작하지 않는다고 착각할 수 있습니다. 따라서 앱이 로딩 중이라는 것을 사용자에게 표시해야 하는데, 이때 로딩 아이콘인 ProgressView를 사용합니다. 예를 들어, STUDIA iOS 앱은 로그인 버튼을 눌렀을 때 버튼에 로딩 아이콘을 표시합니다.

!["ProgressView in STUDIA App"](/assets/img/studia-progressview.png)

이번 글에서는 SwiftUI에서 로딩 아이콘을 표시하는 방법을 알아보겠습니다.

{% include ad.html %}

# ProgressView란?

아까 위에서도 말했듯이, ProgressView는 뭔가 시간이 오래 걸리는 작업이 있을 때 이를 표시해 주는 역할을 합니다. 여기에는 크게 두 가지 스타일이 있는데, Linear과 Circular입니다.

!["Progress View Styles"](/assets/img/progressview-style.png)

Linear은 보통 파일 다운로드와 같이 사용자에게 작업의 경과를 표시할 수 있을 때, Circular은 화면 로딩과 같이 경과를 표시하지 않을 때 사용합니다.

# Linear ProgressView

```swift
ProgressView("Some Text", value: someValue, total: 100)

// 색상 바꾸기
ProgressView("Some Other Text", value: someOtherValue, total: 200)
    .progressViewStyle(LinearProgressViewStyle(tint: .purple))
```

!["Linear ProgressView in blue and purple"](/assets/img/linear-progressview.png)

첫 번째 인수의 값으로 문자열을 입력하면 ProgressView의 이름처럼 사용할 수 있습니다. value 인자는 나타낼 값을, total 인자는 최댓값을 나타냅니다. progressViewStyle을 이용하면 `tint` 색상 (로딩 바의 색상)을 다른 색으로 바꿀 수도 있습니다.

{% include ad.html %}

# Circular ProgressView

```swift
ProgressView("Loading...")
    .progressViewStyle(CircularProgressViewStyle())
```

!["Circular ProgressView in gray"](/assets/img/circular-progressview.png)

문자열을 입력하면 아래에 텍스트로 표시됩니다. 위의 앱에서와 같이 색 있는 바탕 위에서 사용할 때에는 색상을 흰색으로 설정하는 것이 좋은데, 이때도 Linear과 마찬가지로 tint 색상을 변경해주면 됩니다.

```swift
// 색상 바꾸기
ProgressView("Other Loading...")
    .progressViewStyle(CircularProgressViewStyle(tint: .white))
```

오늘 포스팅 여기서 마치겠습니다.