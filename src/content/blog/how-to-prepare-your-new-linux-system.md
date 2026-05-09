---
title: How to Prepare Your New Linux System
date: 2026-03-27 14:03:40
tags:
  - linux
  - ubuntu
  - wsl
  - zsh
  - cuda
---

When you get a new Linux system (such as Ubuntu on a real machine, Ubuntu on WSL 2), there are several steps you can take to prepare it for use. Here are some general guidelines to help you get started:

(Usually, we use Ubuntu as an example, but the steps can be adapted for other Linux distributions.)

# Prepare for Drivers / Tools
1. **Get NVIDIA CUDA Toolkit and cuDNN**: If you have an NVIDIA GPU, you may want to install the CUDA Toolkit and cuDNN libraries to enable GPU acceleration for machine learning and other computational tasks.
    - download CUDA Toolkit: https://developer.nvidia.com/cuda-downloads
        - NOTE: you can choose deb(local) or deb(network) for installation method, but the deb(local) one is recommended to avoid potential issues with apt-get.
    - download cuDNN: https://developer.nvidia.com/cudnn
        - NOTE: choose FULL and deb(local) for installation method, not the deb(network) one, otherwise you may encounter issues with apt-get.

2. **Configure the Source List of apt-get**: You may want to configure the source list of apt-get to use a mirror that is closer to you for faster download speeds. For example, if you are in China, you can use the mirrors provided by Tsinghua University or Aliyun.
    - Tsinghua University: https://mirrors.tuna.tsinghua.edu.cn/help/ubuntu/
    - Aliyun: https://developer.aliyun.com/mirror/ubuntu
    Here is an example of how to change the source list to use Tsinghua University mirror:
    1. backup the original source list:
```bash
    sudo cp /etc/apt/sources.list /etc/apt/sources.list.bak
```
    2. edit the source list:
```bash
    sudo nano /etc/apt/sources.list
```
    3. replace the original content with the following lines:
    Ubuntu 24.04 noble:
```plaintext
    (Note: the source list for Ubuntu 24.04 noble is not available yet, but you can refer to the following lines for Ubuntu 22.04 jammy and replace "jammy" with "noble" when it becomes available.)
```
    Ubuntu 22.04 jammy:
```plaintext
# aliyun
deb http://mirrors.aliyun.com/ubuntu/ jammy main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ jammy main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ jammy-security main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ jammy-security main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ jammy-updates main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ jammy-updates main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ jammy-proposed main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ jammy-proposed main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ jammy-backports main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ jammy-backports main restricted universe multiverse
```

```plaintext
# tsinghua
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy main restricted universe multiverse
deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-updates main restricted universe multiverse
deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-updates main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-backports main restricted universe multiverse
deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-backports main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-security main restricted universe multiverse
deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-security main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-proposed main restricted universe multiverse
deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ jammy-proposed main restricted universe multiverse
```
    4. save and exit the editor (Ctrl + O, Enter, Ctrl + X for nano).
    5. update the package list:
```bash
    sudo apt-get update
```

3. **Install basic development tools**: You may want to install essential development tools such as build-essential, git, and curl.
```bash
    sudo apt-get update
    sudo apt-get install build-essential git curl -y
```

4. **Install zsh and Oh My Zsh**: zsh is a powerful shell that can enhance your command-line experience. Oh My Zsh is a framework for managing your zsh configuration.
```bash
    sudo apt-get install zsh -y
    sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```
    if you cannot access the above URL, you can try the following command to install Oh My Zsh:
```bash
# clone the Oh My Zsh repository to a local directory
git clone https://mirrors.tuna.tsinghua.edu.cn/git/ohmyzsh.git
cd ohmyzsh/tools
REMOTE=https://mirrors.tuna.tsinghua.edu.cn/git/ohmyzsh.git sh install.sh
```
    set zsh as the default shell:
```bash
chsh -s $(which zsh)
```
    and then change the omz source to the Tsinghua University mirror:
```bash
git -C $ZSH remote set-url origin https://mirrors.tuna.tsinghua.edu.cn/git/ohmyzsh.git
git -C $ZSH pull
```

5. **Install conda**: 
    Please follow the instructions in [How to Use Conda for Deep Learning](/real/blog/how-to-conda/) to install conda and set up a virtual environment for your projects.

# Beautify and Customize Your Terminal
1. **Install ohmyzsh plugins**: Oh My Zsh comes with a variety of plugins that can enhance your terminal experience. Some popular plugins include git, zsh-autosuggestions, and zsh-syntax-highlighting.
    - zsh-autosuggestions:
```bash
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
```
    - zsh-syntax-highlighting:
```bash
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
```
    - after installing the plugins, you need to enable them in your .zshrc file:
```bash
plugins=(git zsh-autosuggestions zsh-syntax-highlighting)
```

2. **Install Powerlevel10k theme**: Powerlevel10k is a popular theme for Oh My Zsh that provides a highly customizable and visually appealing prompt.
```bash
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k
```
    - after installing the theme, you need to set it as the default theme in your `.zshrc` file:
```bash
ZSH_THEME="powerlevel10k/powerlevel10k"
```

# Prepare Environment Variables
```bash
# set environment variables for CUDA and cuDNN
export PATH=/usr/local/cuda/bin:$PATH
export LD_LIBRARY_PATH=/usr/local/cuda/lib64:$LD_LIBRARY_PATH
```
```bash
# for WSL 2
export PATH=/usr/lib/wsl/lib:$PATH
```

You can add the above lines to your `.zshrc` file to make the environment variables persistent across terminal sessions.

# Configure Network
1. **Install network tools**: You may want to install network tools such as net-tools and iputils-ping to help you troubleshoot network issues.
```bash
sudo apt-get install net-tools iputils-ping openssh-server -y
```

2. **Edit SSH Configuration**: If you want to access your Linux system remotely via SSH, you need to edit the SSH configuration file to allow remote connections. You can do this by editing the `/etc/ssh/sshd_config` file and changing the following lines:
```bash
Port xxxxx # change the default SSH port (22) to a custom port for better security, such as 8089
PasswordAuthentication yes
PubkeyAuthentication yes 
```
    Then restart the SSH service to apply the changes:
```bash
sudo systemctl restart ssh
```
3. **For WSL 2 users**: Modify the network configuration to allow access to the WSL 2 instance from the host machine. You can do this by editing the `%USERPROFILE%\.wslconfig` file on the host machine and adding the following lines:
```ini
[experimental]
networkingMode=mirrored
dnsTunneling=true
firewall=true
autoProxy=true
```
    And the firewall configuration to allow incoming connections on the custom SSH port (e.g., 8089):
```powershell
New-NetFirewallRule -DisplayName '"Allow SSH on Port xxxxx"' -Direction Inbound -Protocol TCP -LocalPort xxxxx -Action Allow
```
    Please replace `xxxxx` with the custom SSH port you set in the SSH configuration.
    Then restart the WSL 2 instance to apply the changes:
```powershell
wsl --shutdown
wsl
```

# Customize Welcome Message
You can customize the welcome message that appears when you open a terminal, by editing `.zshrc` file and adding the following lines:
```bash
# custom welcome message
system_status() {
    # Color definitions
    RED='\033[0;31m'
    GREEN='\033[0;32m'
    YELLOW='\033[0;33m'
    BLUE='\033[0;34m'
    MAGENTA='\033[0;35m'
    CYAN='\033[0;36m'
    WHITE='\033[0;37m'
    BOLD='\033[1m'
    NC='\033[0m'

    printf "\n"
    printf "%b\n" "${BLUE}${BOLD}================================================================================${NC}"
    printf "%b\n" "${BLUE}${BOLD}      WELCOME TO $(hostname | tr '[:lower:]' '[:upper:]') SERVER, $(whoami)!${NC}"
    printf "\n"
    printf "%b\n" "${BLUE}${BOLD}================================================================================${NC}"
    printf "%b\n" "${BLUE}${BOLD}  HOST: ${GREEN}$(hostname)${NC}${BLUE} | IP: ${GREEN}$(hostname -I | awk '{print $1}')${NC}"
    printf "%b\n" "${BLUE}${BOLD}  OS: ${GREEN}$(lsb_release -ds 2>/dev/null || cat /etc/os-release 2>/dev/null | grep PRETTY_NAME | cut -d'\"' -f2 | cut -d' ' -f1-3)${NC}"
    printf "%b\n" "${BLUE}${BOLD}================================================================================${NC}"
    printf "\n"

    # 1. System load
    load=$(uptime | awk -F'load average:' '{print $2}' | cut -d, -f1 | xargs)

    # 2. Usage of / 
    root_usage_pct=$(df -h / | awk 'NR==2 {print $5}')
    root_total=$(df -h / | awk 'NR==2 {print $2}')

    # 3. Memory usage
    mem_total=$(free | awk '/^Mem:/ {print $2}')
    mem_used=$(free | awk '/^Mem:/ {print $3}')
    if [ -n "$mem_total" ] && [ "$mem_total" -gt 0 ] 2>/dev/null; then
        mem_usage_pct=$(echo "scale=0; $mem_used * 100 / $mem_total" | bc)%
    else
        mem_usage_pct="0%"
    fi

    # 4. Swap usage 
    swap_total=$(free | awk '/^Swap:/ {print $2}')
    swap_used=$(free | awk '/^Swap:/ {print $3}')
    if [ -n "$swap_total" ] && [ "$swap_total" -gt 0 ] 2>/dev/null; then
        swap_usage_pct=$(echo "scale=0; $swap_used * 100 / $swap_total" | bc)%
    else
        swap_usage_pct="0%"
    fi

    # 5. Processes 
    processes=$(ps -e | wc -l)

    # 6. Users logged in 
    users=$(who | grep -v 'tmux' | wc -l)

    printf "  ${CYAN}%-23s${NC} %s\n" "System load:" "$load"
    printf "  ${CYAN}%-23s${NC} %s of %s\n" "Usage of /:" "$root_usage_pct" "$root_total"
    printf "  ${CYAN}%-23s${NC} %s\n" "Memory usage:" "$mem_usage_pct"
    printf "  ${CYAN}%-23s${NC} %s\n" "Swap usage:" "$swap_usage_pct"
    printf "  ${CYAN}%-23s${NC} %s\n" "Processes:" "$processes"
    printf "  ${CYAN}%-23s${NC} %s\n" "Users logged in:" "$users"

    # 7. IP addresses for all network interfaces (except lo, docker*, br-*)
    for iface in $(ip -o link show | awk -F': ' '{print $2}' | grep -v -e '^lo$' -e '^docker' -e '^br-'); do
        ipv4=$(ip -4 -o addr show dev "$iface" 2>/dev/null | awk '{print $4}' | cut -d/ -f1 | head -n 1)
        ipv6=$(ip -6 -o addr show dev "$iface" scope global 2>/dev/null | awk '{print $4}' | cut -d/ -f1 | head -n 1)

        if [ -n "$ipv4" ]; then
            printf "  ${CYAN}%-23s${NC} %s\n" "IPv4 address for $iface:" "$ipv4"
        fi
        if [ -n "$ipv6" ]; then
            printf "  ${CYAN}%-23s${NC} %s\n" "IPv6 address for $iface:" "$ipv6"
        fi
    done

    printf "\n"
    printf "%b\n" "${BLUE}${BOLD}================================================================================${NC}"
}

system_status
```
    Then you need disable the default welcome message (MOTD) by running the following command:
```bash
sudo chmod -x /etc/update-motd.d/*
```

# Conclusion
By following the above steps, you can prepare your new Linux system for development and customize it to your liking. Remember to keep your system updated and secure by regularly installing updates and using strong passwords for your user accounts.
