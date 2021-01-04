---
title: VMWare Ubuntu 작업환경 세팅하기
tags:
- "#window"
- "#ubuntu"
- "#vmware"
- "#linux"
- "#KORUB"
categories: []
---

`Ubuntu`는 `apt`과  `snap`라는 패키지 매니저가 있다. 이 패키지 매니저를 통해서 여러가지 필요한 패키지 및 프로그램들을 다운받을 수 있다.

바탕화면에서 마우스 왼쪽키를 클릭한 후, `Open Terminal`를 눌러 터미널을 열어준다. 

![1](/assets/images/KORUB/2/1)

## Update 하기
아래와 같은 창이 뜬다면 
![2](/assets/images/KORUB/2/2)
`Install Now`를 눌러 업데이트 해준다.

만약 안뜨면,  아까 열어둔 터미널에 
```
sudo apt update
```
를 실행시키면 같은 역할을 한다.

이 업데이트를 안하면, 종종 내가 찾는 패키지를 찾을 수 없다는 에러들을 볼 수 있다. 

또 위에 창에서 이미 실행을 했는데, 또 터미널을 열어서 `sudo apt update`를 실행하면, 이미 어떤 프로그램이 사용중이라는 에러를 볼 수 있다. 
```
jacob@ubuntu:~/Desktop$ sudo apt update
[sudo] password for jacob: 
Reading package lists... Done
E: Could not get lock /var/lib/apt/lists/lock. It is held by process 5682 (aptd)
N: Be aware that removing the lock file is not a solution and may break your system.
E: Unable to lock directory /var/lib/apt/lists/
```
그러니 하나만 하고 인내심을 갖고 기다리자.

![3](/assets/images/KORUB/2/3)를 눌러보면,

![4](/assets/images/KORUB/2/4)와 같이 진행상황을 볼 수 있다.

![5](/assets/images/KORUB/2/5)
위와 같이 뜨면 설치가 완료된거다.

## Upgrade 하기 (옵션)
패키지 매니저와 있는 패키지를 업그레이드하는데, 용량을 많이 쓴다. 용량일 부족하면 스킵해도 좋다.

```
sudo apt upgrade -y # 용량부족하면 스킵
```

## 추가적인 프로그램 설치하기
Git과 vscode는 필수적이므로 설치를 한다면, 아래 코드로 설치할 수 있다.
```
sudo apt install -y git # -y 는 설치할 때 yes or not 뭍는거에 yes라고 자동으로 대답해 주는 태그

sudo snap install code —classic # vscode 설치함
```
