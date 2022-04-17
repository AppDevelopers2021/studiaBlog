---
title: SwiftUI URL에서 이미지 불러오기
description: 이미지 URL로 웹상의 이미지를 SwiftUI 뷰로 불러오는 방법을 알아봅니다.
layout: blogpost
author: 이종우
email: jongwoo@studia.blue
date: 2022/04/17
categories: ios
---

앱이 사용하는 이미지 중에는 앱 아이콘이나 회사 로고처럼 앱 자체에 포함되는 것도 있지만, 서버의 URL에서 불러와야 하는 이미지도 많습니다. 대표적으로 유저의 프로필 이미지나 다른 유저가 업로드한 이미지 등은 네트워킹 작업을 통해 불러와야 하는데요, 이는 매우 번거로운 작업일 수 있습니다. 그러나 iOS 15부터 이미지 불러오기를 간단하게 할 수 있는 View가 지원되어 공유해보려 합니다. 이 글은 관련 [애플 개발자 문서](https://developer.apple.com/documentation/swiftui/asyncimage)를 참고했음을 알립니다.

{% include ad.html %}

## AsyncImage

> A view that asynchronously loads and displays an image.

이미지를 비동기식으로 불러와서 보여주는 뷰라고 합니다.

```swift
AsyncImage(url: URL(string: "https://example.com/image.png"))
```

뷰가 정말 간단해졌네요.

![AsyncImage-1@2x.png](/assets/img/AsyncImage-12x.png)

이미지가 로딩중일 때에는 이렇게 크기에 맞는 회색 placeholder을 표시해 준다고 합니다. 이게 마음에 안 들면 바꿀 수도 있어요.

```swift
AsyncImage(url: URL(string: "https://example.com/image.png")) { image in
    image.resizable()
} placeholder: {
    ProgressView()
}
.frame(width: 50, height: 50)
```

이 예시에서는 `image.resizable()` 로 이미지 크기를 `frame`된 크기에 맞춰줬고, placeholder 속성을 사용하여 기본 회색 배경 대신에 [ProgressView](https://blog.studia.blue/ios/swiftui-progressview/)를 placeholder로 사용했네요. (참고로 resizable처럼 이미지에 적용되는 Modifier는 AsyncImage에 달아줄 순 없고 저렇게 image 아래에 써줘야 합니다) 

![AsyncImage-2@2x.png](/assets/img/AsyncImage-22x.png)

{% include ad.html %}

## 마치며

오늘은 웹상의 이미지를 SwiftUI 앱에서 쉽게 불러오는 방법을 알아보았습니다. 지금 iOS 15 이상을 필요로 하는 앱들은 거의 없긴 한데 (전 호환성 맞추는 게 너무 빡쳐서 그냥 iOS 15로 두고 하고 있습니다) 뭐, 그래도 저같은 사람들이 더 있을지도 모르잖아요. 그럼 모두 즐거운 코딩합니다!