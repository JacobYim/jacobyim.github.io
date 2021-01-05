---
title: Window에 VMWare 설치하기
tags:
- "#window"
- "#ubuntu"
- "#vmware"
- "#linux"
- "#KORUB"
date:
- '2021-01-05 01:42:21'
image: assets/images/KORUB/1/5
---

## VMWare 설치파일 다운로드 하기
[VMWare 설치 링크](https://www.vmware.com/go/getworkstation-win)에서 `VMWare`설치파일을 내려받는다. 

## Ubuntu Desktop ISO 다운로드 하기 (Ubuntu Server ISO 아님)
[Ubuntu Desktop ISO 다운 링크](https://releases.ubuntu.com/20.04.1/ubuntu-20.04.1-desktop-amd64.iso?_ga=2.132610958.1672075639.1609768425-1497128947.16097684) 에서  `Ubuntu 20 Desktop ISO` 을 다운로드 받는다.

## VMWare 설치하기
`VMWare-workstation-full-16.1.0-17198959.exe`기본으로 설정되어 있는 그대로 `Next`를 눌러서 설치를 진행한다.

`Activation Key`를 구해서 넣고,  `Next`를 누르면 설치가 완료된다. 

이후, 아래 버튼을 눌러서 새로운 가상머신을 만들기를 시작한다.
![1](/assets/images/KORUB/1/1)

기본 Typical로 설정을 해주고 Next를 누른다.
![2](/assets/images/KORUB/1/2)

Browse를 눌러 이전에 다운 받았던, Ubuntu iso file를 선택한다.
![3](/assets/images/KORUB/1/3)
![4](/assets/images/KORUB/1/4)

우분투에서 사용할 아이디와 비밀번호를 입력한다. 띄여쓰기 없이 입력해준다.
![5](/assets/images/KORUB/1/5)

가상머신의 이름을 설정해준다.
![6](/assets/images/KORUB/1/6)

넉넉하게  하드디스크 용량을 50GB로 설정해주고,  나중에 복구하기 쉬운 `Split virtual disk into multiple files`로 설정한 뒤 Next를 누른다. 
![7](/assets/images/KORUB/1/7)

`Customize Hardware ...`를 눌러서 메모리 용량을 최대한 8GB까지 올려준다. (너무 적으면 속터진다. 돌리고 있는 컴퓨터(Host) 메모리 용량이 얼마 되지 않는다면  Recommand라고 되어있는데로 둔다. 만약 Host의 메모리가 모자라면, 이 또한 성능저하의 원인이 된다.)
![8](/assets/images/KORUB/1/8)
![9](/assets/images/KORUB/1/9)

이후, Next를 누르면 가상머신이 생성된다. 자동으로 실행되며, 이후 Ubuntu 운영체제가 설치된다. 

![10](/assets/images/KORUB/1/10)

![11](/assets/images/KORUB/1/11)으로 전체화면으로 설정할 수 있다.

아래 화면이 뜨면 설치가 완료된 것이다.
![12](/assets/images/KORUB/1/12)
