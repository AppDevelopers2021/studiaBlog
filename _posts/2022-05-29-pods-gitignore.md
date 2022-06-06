---
title: Pods 폴더를 Gitignore 해야 할까?
description: 커밋할 때 CocoaPods 에러가 난다면 어떻게 해야 하는지 알아봅니다.
layout: blogpost
author: 이종우
email: jongwoo@studia.blue
date: 2022/05/29
categories: ios
---

iOS 프로젝트에서 CocoaPods를 사용하면 Pods 디렉터리가 생성됩니다. 하지만 pod의 크기가 커서 git으로 commit이 불가능한 경우도 종종 있습니다. 그렇다면 용량이 큰 Pods 폴더나 xcworkspace 파일을 .gitignore에 추가해도 괜찮을까요?

{% include ad.html %}

결론부터 말하자면 그렇게 해도 됩니다. 다른 컴퓨터에서 워크스페이스를 열어도 `pod install`을 실행하면 CocoaPods가  패키지를 자동으로 추가해줍니다. [CocoaPods 공식 프로젝트]([https://github.com/CocoaPods/CocoaPods/blob/master/.gitignore](https://github.com/CocoaPods/CocoaPods/blob/master/.gitignore)) 또한 이 방식을 취하고 있습니다. 그래서 저는 무거운 pod (OpenCV…)를 사용하는 경우에는 이를 gitignore해 버렸습니다. 이처럼 large file warning 때문이라면 그냥 제외하는 것을 추천드립니다. 

다만 이 방법이 무조건 좋은 것은 아닙니다. Pods 디렉터리를 제외해 버리면 다른 맥에서는 CocoaPods 없이는 빌드조차 불가능해집니다. 그래서 크기가 크지 않은 pod나 framework의 경우에는 통째로 커밋하는 걸 추천드립니다.
