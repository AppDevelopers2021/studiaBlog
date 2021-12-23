---
title: 애드센스로 웹사이트에서 수익 창출하기
description: AdSense로 돈 버는 방법
layout: blogpost
author: 이종우
email: jongwoo@studia.blue
date: 2021/12/21
categories: adsense
---

> _"잠자는 동안에도 돈이 들어오는 방법을 찾아내지 못한다면 <br>당신을 죽을 때까지 일을 해야만 할 것이다."_
\- 워렌 버핏

자, 그럼 잠자는 동안에도 돈을 벌어봅시다!

### Google AdSense 소개

애드센스는 구글의 광고 플랫폼입니다. 코드 작업을 거의 하지 않고도 웹사이트에 광고를 게시하고 수익을 창출할 수 있습니다.

{% include ad.html %}

이런 광고 말이죠.

## 1. 애드센스 가입하기

![AdSense 메인 페이지](/assets/img/adsense-main.png)
[adsense.google.com](https://www.google.com/adsense/start/) 에서 "시작하기"를 누르고 구글 계정으로 로그인합니다.

![AdSense Account Start](/assets/img/adsense-start.png)
안내에 따라 계정 세팅을 진행하면 AdSense를 시작할 수 있습니다.

## 2. 사이트에 코드 복사

![AdSense 코드 복사](/assets/img/adsense-code.png)
하라는 대로 코드를 복사해 웹사이트의 `<head>` 내에 삽입합니다.
(사이트 메인과 광고를 넣을 모든 페이지에 코드를 삽입해 주세요)

"검토 요청" 저튼을 누르면 사이트는 검토 중으로 전환되고 구글에서 사이트에 광고를 넣을 수 있는지 판단해 승인 또는 거절 조치를 취합니다.

## 3. 사이트에 광고 넣기

사이트가 검토에 들어갔다면 승인 대기 중 광고를 넣을 수 있습니다. 실제 광고가 게시되지는 않지만 광고를 넣을 공간을 미리 마련해 둘 수 있습니다.

![AdSense 광고 페이지](/assets/img/adsense-ad.png)

애드센스 사이트에서 광고 > 개요 > 광고 단위 기준으로 이동하면 광고를 만들 수 있습니다.<br>
광고는 여러 종류가 있는데, 대표적으로
- 디스플레이 광고: 일반적인 배너 광고
- 인피드 광고: 게시물 목록 사이에 넣는 광고
- 자동 삽입 광고: 글의 내용에 따라 자동으로 삽입되는 광고
- 일치하는 콘텐츠: 글 맨 아래에 "관련된 글" 사이 광고를 넣는 것 (트래픽이 적으면 사용할 수 없음)

이런 종류의 광고들이 있습니다.

## 4. 신청이 거절되었다면

이 블로그도 승인이 몇 번이나 거절되었습니다. 정리하자면

1. __최초 제출:__ Javascript 때문에 거절. 자바스크립트가 비활성화되어 있으면 오류 페이지로 넘어가게 했는데, 구글 크롤러가 자바스크립트를 사용하지 않아 오류 페이지로 인식되었다.
2. 리디렉션 문제로 거절
3. 블로그에 글과 방문자가 너무 적어 (Search Console 사용 전) 거절

사이트가 거절되었다면 아래 항목을 지키는 것이 도움이 될 수 있습니다.
- 길고 질 좋은 글을 __지속적__ 으로 작성하기
- 블로그의 주제를 명확히 하기
- 카테고리, 태그 등으로 글을 체계적으로 관리하기
- __(중요)__ 구글 애드센스 정책을 위반하지 않기