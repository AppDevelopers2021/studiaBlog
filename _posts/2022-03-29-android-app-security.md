---
title: Android 앱의 보안성 강화하기
description: 손쉽게 보안 강화하는 앱!
layout: blogpost
author: Jacob Lim
email: jacoblim@studia.blue
date: 2022/03/29
categories: android
---

Android 앱의 보안성 강화하기

Android 앱 개발자라면 앱에서는 보안이 생명이라는 것을 체감합니다. 따라서, 보안에 대해 관심을 많이 가지고 취약점을 찾아보려는 시도를 해야합니다. 그래서 제가 알아온 몇 가지 보안 체크 방법을 알려드리겠습니다.

## [ImmuniWeb](https://www.immuniweb.com/mobile/)
![ImmuniWeb](/assets/img/immuniweb.png)  
[ImmuniWeb](https://www.immuniweb.com/mobile/)은 제가 앱을 만들며 자주 사용했던 보안 체크 사이트입니다. 안드로이드 앱 스토어(Play Store 등)에서 앱을 찾아서 보안을 체크하거나 `APK` 파일 등을 업로드하면 무료로 보안 검사를 받을 수 있습니다. 이곳에서는 **OWASP Mobile Top 10 Test, Mobile App Privacy Check, Static & Dynamic Mobile Scan** 등의 서비스를 제공합니다.

{% include ad.html %}

## 직접 실천할 수 있는 것들
위에서 말씀드렸던 ImmuniWeb에서도 말하지만 AndroidManifest.xml를 ```android:allowBackup="false"```  
와 같이 설정해주셔야 합니다. 이러한 사소한 것들도 보안에 영향을 미치기 때문입니다. 또한 개인적으로 `SQL` 데이터베이스는 사용하는 것을 자제하는 것을 권고드립니다.

포스팅 마치겠습니다. 감사합니다.