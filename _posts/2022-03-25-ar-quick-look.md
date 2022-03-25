---
title: 웹사이트에 AR 넣기 (iOS, Android 모두)
description: AR Quick Look부터 Model Viewer까지.
layout: blogpost
author: 이종우
email: jongwoo@studia.blue
date: 2022/03/25
categories: web
---

# 들어가며

웹사이트에 AR을 넣고 싶을 이유는 얼마든지 있습니다. 제품을 3D로 보여주는 것부터 이벤트를 홍보하는 것까지 AR 기술의 활용도는 어마어마합니다. 뭐, 일단 멋지니까요. 

<script type="module" src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"></script>
<model-viewer style="width: 100%; height: 300px;" alt="A 3D model of a chair." src="/assets/ar/chair_swan.gltf" ios-src="/assets/ar/chair_swan.usdz" ar></model-viewer>

이 페이지를 <span title="광고 수익이 오르는 건 덤">모바일로 접속해보세요</span>. 위의 의자 모형을 AR로 볼 수 있을 것입니다. 이 글에서는 웹에서 AR을 사용하는 방법에 대해 알아보겠습니다.

{% include ad.html %}

# 어떻게 AR을 넣을 것인가

## AR Quick Look

애플 웹사이트의 제품 소개 페이지를 Safari로 열면 제품을 AR로 볼 수 있습니다. 여기서 사용되는 기술이 `AR Quick Look`인데요, 애플 사파리 브라우저에서 사용할 수 있습니다. AR 모델로는 `USDZ` 파일을 사용합니다. 여기서는 깊게 다루지는 않을 텐데, [개발자 문서(영문)](https://developer.apple.com/documentation/arkit/previewing_a_model_with_ar_quick_look#3263412)에서 자세히 읽을 수 있습니다.

!["AR Quick Look Website"](/assets/img/arquicklook.png)

여기 들어가면 AR Quick Look를 기기로 체험해 볼 수 있습니다.

### AR Quick Look - 장단점

- 코드가 간결함
- 페이지 로딩이 빠름 (클릭하지 않는 한 파일을 다운받지 않음)
- 아이폰, 아이패드의 Safari에서만 가능

나름 괜찮은 방법입니다. 미국 같은 경우는 아이폰이 대부분이니 이렇게들 많이 합니다. 그런데 한국에서는 안되겠네요. PC 또는 안드로이드에서는 USDZ 파일을 그냥 다운로드해 버리기 때문입니다.

## Model Viewer

대안으로, 구글에서 제작한 JS 라이브러리입니다. iOS, Android에서의 AR은 물론 PC 브라우저에서의 webXR 또한 지원합니다.

!["Model Viewer Website"](/assets/img/modelviewer.png)

[modelviewer.dev](https://modelviewer.dev/) 에 들어가면 직접 체험해 볼 수 있습니다.

### Model Viewer - 장단점

- 다양한 플랫폼에서 사용 가능
- 페이지 로딩은 느린 편

{% include ad.html %}

# 코딩

## 라이브러리 불러오기

```html
<script type="module" src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"></script>
```
`model-viewer` 자바스크립트 라이브러리를 불러옵니다.

## AR 모델 준비

AR 기능을 사용하려면 `glTF`와 `USDZ` 파일이 필요합니다. 이를 만드는 법은 여러 가지가 있는데요, 

- 3D 디자인 소프트웨어 이용
- Reality Composer 앱으로 실제 물체 스캔 (LiDAR 센서가 있으면 좋습니다)
- 모든 방향에서 찍은 HEIF 이미지로 모델 생성 (M1 또는 최신 인텔 맥과 Xcode 필요)

파일 변환이 필요하다면 [여기](https://products.aspose.app/3d/ko/conversion/usdz-to-gltf)서 하시면 됩니다.

하지만 저는 그냥 애플이 제공한 샘플을 사용하도록 하겠습니다. (귀찮으니까요... ㅋ)

## Model Viewer 사용하기

```html
<model-viewer alt="Alt Text" src="glTF 또는 GLB 파일 URL" ios-src="USDZ 파일 URL" ar></model-viewer>
```

끝입니다. 좀 더 다양한 걸 해보려면 [공식 문서](https://modelviewer.dev/docs/index.html)를 읽어보세요.

