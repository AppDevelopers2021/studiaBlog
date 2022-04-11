---
title: Raspberry Pi 처음 시작하기
description: Raspberry Pi 구성품과 OS 설치하는 방법을 알아봅니다.
layout: blogpost
author: 윤준석
email: jongwoo@studia.blue
date: 2022/04/11
categories: hardware
---

# Raspberry Pi란...

Raspberry Pi는 영국의 라즈베리 파이(Raspberry Pi) 재단에서 만든 초소형 싱글보드 컴퓨터(SBC)입니다.
교육용 프로젝트의 일환으로 개발되었기에 매우 저렴하고 우수한 성능을 가지고 있습니다.

# 본격적으로 Raspberry Pi 시작하기

![Raspberry Pi 4 Model B](/assets/img/pi-out-of-box.jpeg)

우선 라즈베리 파이를 뜯었지만 막상 뜯고 나면 뭘해야할지 막막해집니다...
바로 가장 케이블과 마이크로 sd 카드가 없기 때문인데요.
케이블은 꼭 mini HDMI - HDMI 사시면되고 
마이크로 sd카드는 본인 용도에 따라 16-64기가 micro-sd카드사면됩니다.

# OS 설치

자 그러면 구성품이 다 왔다고 합시다.

그러면 라즈베리 파이로 돌릴 os를 정한 다음 가장 ~~정상적인~~ 루트인 라즈베리파이 이미저를 통해 micro sd 카드에 구우면 됩니다.

[Raspberry Pi OS - Raspberry Pi](https://www.raspberrypi.com/software/)

(좀 간지나게 다운받고 싶으면 터미널에 `sudo apt install rpi-image` 치면됩니다....)

![Installer](/assets/img/rpi-1.png)

![Installer](/assets/img/rpi-2.png)

![Installer](/assets/img/rpi-3.png)

YES 를 눌러줍니다

![Installer](/assets/img/rpi-4.png)

![Installer](/assets/img/rpi-warning.png)

이렇게 한뒤 5-7분뒤면 OS 굽기가 끝나고 마이크로 SD 카드를 추출한뒤 라즈베리파이에 꼽아줍니다