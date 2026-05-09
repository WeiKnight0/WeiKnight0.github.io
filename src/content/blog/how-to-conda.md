---
title: How to Use Conda for Deep Learning
date: 2026-03-27 14:53:42
tags:
  - conda
  - python
  - deep-learning
  - linux
---

In this post, we will go through the steps to set up a deep learning environment on your local machine. This includes installing necessary libraries and tools to get you started with deep learning projects.

## Step 1: Install Python
Conda is a popular package manager and environment management system for Python and other programming languages. You can use it to create isolated environments for your projects and manage dependencies.
    - website: https://www.anaconda.com/docs/getting-started/miniconda/install/linux-install
    - installation command:
```bash
curl -O https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh
bash ~/Miniconda3-latest-Linux-x86_64.sh
source ~/.zshrc

# after installation, you can use initialization command to set up conda for zsh:
conda init
# to disable conda auto-activation, you can run the following command:
conda config --set auto_activate_base false
```
To get better network performance, you can change the default conda channel to Tsinghua University mirror:

```bash
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/pytorch/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/pytorch/linux-64/
conda config --set show_channel_urls yes
```
To get better network performance when installing packages with pip, you can change the default pip source to Tsinghua University mirror by running the following command:

```bash
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
```

**Conda Commands Table:**
| Command | Description |
|---------|-------------|
| `conda create -n myenv python=3.8` | Create a new virtual environment named `myenv` with Python 3.8 |
| `conda activate myenv` | Activate the virtual environment `myenv` |
| `conda install numpy pandas` | Install NumPy and Pandas in the active environment |
| `conda list` | List all installed packages in the active environment |
| `conda deactivate` | Deactivate the current virtual environment |
| `conda env remove -n myenv` | Remove the virtual environment named `myenv` |
| `conda env export > environment.yml` | Export the current environment to a YAML file |
| `conda env create -f environment.yml` | Create a new environment from a YAML file |


## Step 2: Create a Virtual Environment
It is recommended to create a new virtual environment for your deep learning projects to avoid conflicts between different libraries. You can create a new environment using the following command:

```bash
conda create -n dplrn python=3.12
```
This command creates a new environment named `dplrn` with Python 3.12 installed.

## Step 3: Activate the Virtual Environment
To start using the virtual environment you just created, you need to activate it with the following command:
```bash
conda activate dplrn
```


## Step 4: Install Deep Learning Libraries
Once you have activated your virtual environment, you can install the necessary libraries for deep learning.

Pytorch:
Please follow the instructions on the [official PyTorch website](https://pytorch.org/get-started/locally/) to install PyTorch with CUDA support if you have an NVIDIA GPU.
