---
title: How to Install Overleaf with docker on Linux
date: 2025-10-07 10:20:43
tags: 
    - docker
    - ubuntu
    - linux
    - overleaf
---

# Install Overleaf on Docker

To install overleaf, an essential toolkit called `overleaf-toolkit` is required.
Before this, please ensure that Docker Engine has been installed.

```bash
git clone --depth=1 https://github.com/overleaf/toolkit.git ./overleaf-toolkit
```

Navigate to the project directory.
```bash
cd ./overleaf-toolkit
```

Initialize the service.
```bash
bin/init
```

Start the service.
```bash
bin/up -d
```

Open a browser, enter [http://127.0.0.1/launchpad](http://127.0.0.1/launchpad) to configure the administrator account and password, then enter [http://127.0.0.1/login](http://127.0.0.1/login) to start using.

# Install the full set of packages
Enter the shell of the image
```bash
bin/shell
```

Update all installed macro packages, including `tlmgr` itself. Then install the `scheme-full` package (all macro packages on CTAN)
```bash
tlmgr update --self --all
tlmgr install scheme-full
```

To install Chinese fonts, run the following commands:
```bash
apt update
apt install ttf-mscorefonts-installer  # 安装 Windows 字体
apt install inkscape python3-pygments  # 安装 TikZ & Syntax highlighter 依赖
apt install -y latex-cjk-all texlive-lang-chinese texlive-lang-english
apt install -y xfonts-wqy

ln -s /usr/local/texlive/2024/texmf-var/fonts/conf/texlive-fontconfig.conf /etc/fonts/conf.d/09-texlive.conf
fc-cache -fsv
```

Also, you had better copy windows fonts to the docker image for better Chinese typesetting effects.

Suppose you have packed the Windows fonts into a `gz` file named `windows-fonts.tar.gz`, you can use the following command to copy it into the docker image and extract it: 
```bash
docker cp windows-fonts.tar.gz sharelatex:/usr/local/share
docker exec -it sharelatex bash
cd /usr/local/share
tar -zxvf windows-fonts.tar.gz
mv /usr/local/share/windows-fonts/* /usr/local/share/fonts/winfonts/
cd /usr/local/share/fonts/winfonts
mkfontscale
mkfontdir
fc-cache -fsv
```

When finished, you can view the installed Chinese fonts using the command:
```bash
fc-list :lang=zh-cn
```