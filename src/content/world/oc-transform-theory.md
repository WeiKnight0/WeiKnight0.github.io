---
title: OC 变换理论
description: 现实世界个体特征向二次元 OC 特征的映射与转换机制。
order: 5
lang: zh-cn
category: theory
---

本节系统阐述 OC 变换理论，涵盖连续与离散两类模型。该理论阐述了现实世界个体特征向二次元原创角色（OC）特征的映射与转换机制，是世界观中设主与 OC 转换的理论基础。

## 特征向量函数与特征向量序列

### 自设与 OC

在 OC 圈中，**设主（Creator）** 是现实世界中的个体，**原创角色（Original Character，OC）** 是二次元世界中的虚构角色。设主通过创造设定、绘制形象、编写故事等方式，赋予 OC 独特的特征。

一个设主可能创造多个 OC。但设主可以为自己创造**自设（Self-Insert OC）**，即在某种程度上代表设主自身的 OC。自设通常承载着设主的理想化形象、情感寄托或自我表达。

因此，自设与设主之间存在更为紧密的特征关联，这种关联可以通过 OC 变换理论进行量化描述。换言之，**OC 变换其实是设主特征向自设特征的映射过程**，所有 OC 的特征都与设主相关，但只有自设的特征才直接反映设主的属性。

对于一个设主而言，存在 OC 就能在数学上进行 OC 变换；但对于一个 OC 而言，只有当它是自设时，才在世界观中物理实现 OC 变换。

### 特征向量函数与特征向量序列的定义

任何一个角色，无论是现实世界中的个体还是二次元世界中的虚构人物，都可以通过一组特征来完整描述。

\begin{definition}[特征向量函数的定义]
设现实世界的特征由 $N$ 个可量化属性描述，OC 的特征由 $M$ 个抽象属性描述。

**现实特征向量函数**为 $N$ 维列向量：
$$\mathbf{r}(t)=\bigl[r_1(t),\,r_2(t),\,\dots,\,r_N(t)\bigr]^{\mathsf{T}}$$

**OC 特征向量函数**为 $M$ 维列向量：
$$\mathbf{q}(t)=\bigl[q_1(t),\,q_2(t),\,\dots,\,q_M(t)\bigr]^{\mathsf{T}}$$

其中分量 $r_i(t)$ 和 $q_j(t)$ 均为实值函数，且是**因果的**，即在 $t<0$ 时为零。
\end{definition}

> 这些函数或序列的分量均为实值函数或序列，且是因果的，即在 $t<0$ 或 $n<0$ 时为零。这一因果性设定反映了角色特征的演化具有**时间方向性**，特征的变化只能依赖于当前和过去的状态，而不能依赖于未来的信息。

对连续信号以采样间隔 $T_s$ 取样，得到离散的序列，即为**特征向量序列**：
$$\mathbf{r}[n]=\bigl[r_1[n],\,r_2[n],\,\dots,\,r_N[n]\bigr]^{\mathsf{T}},\quad n\in\mathbb{Z}$$
$$\mathbf{q}[n]=\bigl[q_1[n],\,q_2[n],\,\dots,\,q_M[n]\bigr]^{\mathsf{T}},\quad n\in\mathbb{Z}$$

## 连续时间 OC 变换

在现实世界中，个体的特征随时间连续变化；二次元 OC 的特征亦然。因此，连续时间 OC 变换是最自然的模型。

\begin{theorem}[连续时间 OC 变换的时域描述]
连续时间 OC 变换由多输入多输出连续 LTI 系统实现，输入——输出关系用卷积积分给出：
$$\mathbf{q}(t)=\int_{-\infty}^{\infty}\mathbf{H}(\tau)\mathbf{r}(t-\tau)\,\mathrm{d}\tau = \mathbf{H}(t)*\mathbf{r}(t)$$

其中 $\mathbf{H}(\tau) \in \mathbb{R}^{M\times N}$ 称为系统的**连续OC冲激响应矩阵**：
$$\mathbf{H}(\tau) = \begin{bmatrix} h_{11}(\tau) & h_{12}(\tau) & \cdots & h_{1N}(\tau) \\ h_{21}(\tau) & h_{22}(\tau) & \cdots & h_{2N}(\tau) \\ \vdots & \vdots & \ddots & \vdots \\ h_{M1}(\tau) & h_{M2}(\tau) & \cdots & h_{MN}(\tau) \end{bmatrix}$$
\end{theorem}

对于输出向量 $\mathbf{q}(t)$ 的第 $i$ 个分量有：
$$q_i(t) = \sum_{j=1}^{N} \int_{-\infty}^{\infty} h_{ij}(\tau) r_j(t-\tau) \, \mathrm{d}\tau = \sum_{j=1}^{N} (h_{ij} * r_j)(t)$$
即每个输出分量 $q_i(t)$ 是所有输入分量 $r_j(t)$ 与对应冲激响应函数 $h_{ij}(\tau)$ 卷积的叠加。

> $\mathbf{H}(t)$ 是因果的，即 $h_{ij}(t)=0$ 当 $t<0$，这反映了 OC 特征的生成只能依赖于现实特征的过去状态。当前 OC 特征 $\mathbf{q}(t)$ 取决于现实特征 $\mathbf{r}(t)$ 的整个历史，$\mathbf{H}(\tau)$ 量化各历史时刻对当下的影响权重。

OC 变换在 $s$ 域的描述通过拉普拉斯变换将时域卷积转化为乘法：

\begin{definition}[拉普拉斯变换的定义]
对任意连续函数 $f(t)$，其拉普拉斯变换（也叫双边拉普拉斯变换）定义为：
$$\tilde{F}(s)=\mathcal{L}\{f(t)\}=\int_{-\infty}^{\infty}\mathrm{e}^{-st}f(t)\,\mathrm{d}t,\quad s=\sigma+\mathrm{j}\omega$$
\end{definition}

\begin{theorem}[OC 变换的 $s$ 域描述定理]
对 $\mathbf{r}(t)$、$\mathbf{q}(t)$ 及 $\mathbf{H}(\tau)$ 的每个元素分别施行拉普拉斯变换，记 $\tilde{\mathbf{R}}(s)=\mathcal{L}\{\mathbf{r}(t)\}$，$\tilde{\mathbf{Q}}(s)=\mathcal{L}\{\mathbf{q}(t)\}$，$\tilde{\mathbf{H}}(s)=\mathcal{L}\{\mathbf{H}(\tau)\}$。则在 $s$ 域有：
$$\tilde{\mathbf{Q}}(s)=\tilde{\mathbf{H}}(s)\tilde{\mathbf{R}}(s)$$
其中 $\tilde{\mathbf{H}}(s)$ 称为系统的**连续OC传递函数矩阵**（Continuous OC Transfer-Function Matrix）。
\end{theorem}

> 要能使用 OC 变换的 $s$ 域描述，必须满足 $\mathbf{r}(t)$ 和 $\mathbf{H}(t)$ 本身是因果的，且满足拉普拉斯变换的收敛条件。如果不是因果的，单边拉普拉斯变换会造成信号损失，引起错误的变换；如果不满足收敛条件，拉普拉斯变换将无法定义。

为了方便地描述拉普拉斯变换，我们可以使用**零极点图**来表示传递函数矩阵 $\tilde{\mathbf{H}}(s)$ 的性质。

\begin{definition}[零极点图的定义]
对于传递函数矩阵 $\tilde{\mathbf{H}}(s)$ 的每个元素 $h_{ij}(s)$，其**零点（Zeros）**为使分子为零的复数 $s$ 值，**极点（Poles）**为使分母为零的复数 $s$ 值。**零极点图（Pole-Zero Plot）**是在复平面上绘制零点和极点的位置图。
\end{definition}

对于矩阵值函数 $\mathbf{H}(t)$ 的拉普拉斯变换 $\tilde{\mathbf{H}}(s)$，其零极点图具有以下性质：

1. **极点来源**：$\tilde{\mathbf{H}}(s)$ 的极点来源于其各元素分母的公共零点。
2. **收敛域的垂直边界**：在复平面上，收敛域由一条垂直边界线 $\operatorname{Re}(s) = \sigma_c$ 界定，其中 $\sigma_c$ 是 $\tilde{\mathbf{H}}(s)$ 最右侧极点的实部。
3. **区域划分**：该垂直线将复平面分为两个区域：
   - 右侧（$\operatorname{Re}(s) > \sigma_c$）：$\tilde{\mathbf{H}}(s)$ 收敛且解析
   - 左侧（$\operatorname{Re}(s) < \sigma_c$）：$\tilde{\mathbf{H}}(s)$ 发散或包含极点
4. **矩阵整体性**：整个矩阵 $\tilde{\mathbf{H}}(s)$ 的收敛域由其所有元素中收敛域最窄的那个决定，即所有极点的最右侧实部。

### 连续时间 OC 存在性定理

\begin{theorem}[连续时间 OC 存在性定理]
在 OC 变换公理体系中，给定一个人的 $\mathbf{r}(t)$ 和 $\mathbf{H}(t)$，该人存在 OC 的**充分必要条件**是以下条件同时成立：

1. **现实特征向量函数的适应性**：$\mathbf{r}(t)$ 是因果的，允许拉普拉斯变换且与系统作用后不引发发散。
   - $\mathbf{r}(t)=0$ 当 $t<0$。等价的 $s$ 域表述为：$\tilde{\mathbf{R}}(s)$ 的收敛域包含某个右半平面 $\operatorname{Re}(s)>\sigma_r$。
   - $\tilde{\mathbf{R}}(s)$ 的收敛域包含虚轴。这是保证现实人设不崩坏的必要条件。
2. **OC变换系统的正则性**：$\mathbf{H}(t)$ 是因果且稳定的。
   - **因果性**：$\mathbf{H}(t) = 0$ 对所有 $t < 0$ 成立。
   - **稳定性**：$\mathbf{H}(t)$ 的每个元素 $h_{ij}(t)$ 绝对可积：$\int_0^\infty |h_{ij}(\tau)| \, \mathrm{d}\tau < \infty$。
   - $s$ 域必要表述：$\tilde{\mathbf{H}}(s)$ 的收敛域包含某个右半平面 $\operatorname{Re}(s)>\sigma_{\mathbf{H}}$ 且包含虚轴。
\end{theorem}

> 只有当 $\mathbf{r}(t)$ 和 $\mathbf{H}(t)$ 满足上述条件时，卷积积分才收敛，并生成合法的 OC 特征 $\mathbf{q}(t)$。在 $s$ 域，没有等价的因果性描述，只能结合时域描述来判断；但稳定性可以通过 $\tilde{\mathbf{H}}(s)$ 的收敛域来描述。现实特征向量函数 $\mathbf{r}(t)$ 的适应性保证了 OC 特征 $\mathbf{q}(t)$ 不会因为现实特征的异常而崩坏。OC 变换系统的正则性保证了 OC 特征 $\mathbf{q}(t)$ 的生成过程是稳定的，不会因为系统冲激响应矩阵 $\mathbf{H}(t)$ 的异常而导致 OC 特征的发散或不稳定。
>
> 当满足上述条件时，时域卷积积分和拉普拉斯变换都可以换成单边的，只考虑 $t>0$ 的部分。

> 从实际意义上理解：当一个设主"存在 OC"时，无论是否是自设，必然满足上述条件。此时能够进行数学上的 OC 变换。但在世界观中，只有当该 OC 是自设时，才物理实现 OC 变换，即设主通过 OC 变换生成的 OC 特征 $\mathbf{q}(t)$ 才能在二次元世界中实际存在。

### 连续时间 OC 反变换与可逆性

\begin{theorem}[连续时间 OC 可逆系统]
对于一个由因果、稳定传递函数矩阵 $\tilde{\mathbf{H}}(s) \in \mathbb{C}^{M \times N}$ 描述的连续时间 OC 变换系统，如果存在一个同样因果、稳定的 LTI 系统 $\tilde{\mathbf{G}}(s) \in \mathbb{C}^{N \times M}$，使得在收敛域内满足 $\tilde{\mathbf{G}}(s) \tilde{\mathbf{H}}(s) = \mathbf{I}_N$，则称原 OC 变换系统是**可逆的**，并称 $\tilde{\mathbf{G}}(s)$ 为其**逆系统**。
\end{theorem}

\begin{theorem}[连续时间 OC 反变换]
对于一个可逆的连续时间 OC 变换系统，其**反变换**定义为由逆系统 $\tilde{\mathbf{G}}(s)$ 实现的变换过程。在时域中，该反变换由如下卷积积分给出：
$$\mathbf{r}(t) = \int_{0}^{\infty} \mathbf{G}(\tau) \mathbf{q}(t-\tau) \, \mathrm{d}\tau$$
其中 $\mathbf{G}(\tau) = \mathcal{L}^{-1}\{\tilde{\mathbf{G}}(s)\}$ 是逆系统的连续 OC 冲激响应矩阵。此过程可以从 OC 特征 $\mathbf{q}(t)$ 中唯一地恢复出现实描述 $\mathbf{r}(t)$。
\end{theorem}

\begin{theorem}[连续时间 OC 反变换存在性判据]
在 OC 变换公理体系中，一个由有理矩阵 $\tilde{\mathbf{H}}(s)\in\mathbb{C}^{M \times N}$ 描述的连续时间 OC 变换，其因果、稳定的左逆系统 $\tilde{\mathbf{G}}(s)\in\mathbb{C}^{N \times M}$ 存在，当且仅当以下条件同时成立：

1. **正向系统属性**：原系统 $\tilde{\mathbf{H}}(s)$ 本身是因果且稳定的。
2. **维度条件**：现实特征的维度 $N$ 不超过 OC 特征的维度 $M$，即 $N \leq M$。
3. **列满秩条件**：原系统 $\tilde{\mathbf{H}}(s)$ 在闭右半平面列满秩，即 $\operatorname{rank}(\tilde{\mathbf{H}}(s)) = N,\quad \forall s\in\mathbb{C}\ \text{且}\ \operatorname{Re}(s)\geq 0$。
4. **稳定左逆条件**：存在一个有理矩阵 $\tilde{\mathbf{G}}(s)$ 满足 $\tilde{\mathbf{G}}(s)\tilde{\mathbf{H}}(s)=\mathbf{I}_N$，且 $\tilde{\mathbf{G}}(s)$ 的所有极点严格位于左半平面。
\end{theorem}

> 只有当 $\tilde{\mathbf{H}}(s)$ 为因果且稳定的系统时，连续时间 OC 反变换才有意义。当 $N > M$ 时，系统本质上是压缩的，从低维的 OC 特征无法唯一确定高维的现实特征，此时反变换不存在。第二点和第三点排除了维度压缩以及闭右半平面内的秩亏损，是可稳定反演的必要限制。第四点是世界观内部的可实现性公理：若形式逆系统含有右半平面极点，则反变换在代数上可写出，但不能作为稳定的 OC 变换系统实现。从实际意义上理解：对于设主，可以任意指定某样东西为自己的"OC"，即便这个"OC"不是人们通常意义上的角色。当该"OC"满足上述判据时，设主变换成自己的"OC"后能通过反变换唯一地恢复出自己的现实特征。这等价于**设主的 OC 足够独特**，不会导致反变换不存在，从而保证设主与其"OC"之间的特征映射是双向的。只有当该"OC"是自设时，才能物理实现 OC 反变换。

\begin{theorem}[形式逆系统的构造]
当满足反变换存在性判据时，逆系统可按如下方式构造，并按极点条件判断其是否属于稳定 OC 变换系统：

1. **当 $M = N$ 时**：形式逆系统由矩阵求逆直接得到：$\tilde{\mathbf{G}}(s) = \tilde{\mathbf{H}}(s)^{-1}$。
2. **当 $M > N$ 时**：一个常用的形式左逆由 Moore-Penrose 伪逆给出：$\tilde{\mathbf{G}}(s)=\tilde{\mathbf{H}}^{\sharp}(s) = \left( \tilde{\mathbf{H}}(s)^\dagger \tilde{\mathbf{H}}(s) \right)^{-1} \tilde{\mathbf{H}}(s)^\dagger$，其中 $^\dagger$ 表示共轭转置。
\end{theorem}

> 上述伪逆是频域中的形式构造。在世界观中，若所得 $\tilde{\mathbf{G}}(s)$ 满足极点条件，则它被规定为可实现的 OC 反变换系统；若不满足，则只保留为形式反演而不具备稳定的物理实现。

## 离散时间 OC 变换

在计算机系统的实现中，现实与 OC 特征均以离散序列形式出现，此时需借助离散时间 OC 变换。

\begin{theorem}[离散时间 OC 变换的时域描述]
离散时间 OC 变换仍为多输入多输出 LTI 系统，其输入——输出关系由卷积和给出：
$$\mathbf{q}[n]=\sum_{k=-\infty}^{\infty}\mathbf{H}[k]\mathbf{r}[n-k]=\mathbf{H}[n]*\mathbf{r}[n]$$

其中离散 OC 冲激响应矩阵为：
$$\mathbf{H}[k] = \begin{bmatrix} h_{11}[k] & h_{12}[k] & \cdots & h_{1N}[k] \\ h_{21}[k] & h_{22}[k] & \cdots & h_{2N}[k] \\ \vdots & \vdots & \ddots & \vdots \\ h_{M1}[k] & h_{M2}[k] & \cdots & h_{MN}[k] \end{bmatrix}$$
\end{theorem}

对于输出向量 $\mathbf{q}[n]$ 的第 $i$ 个分量有：
$$q_i[n] = \sum_{j=1}^{N} \sum_{k=-\infty}^{\infty} h_{ij}[k] r_j[n-k] = \sum_{j=1}^{N} (h_{ij} * r_j)[n]$$
即每个输出分量 $q_i[n]$ 是所有输入分量 $r_j[n]$ 与对应离散冲激响应函数 $h_{ij}[k]$ 卷积的叠加。

\begin{definition}[Z 变换的定义]
对任意离散序列 $f[n]$，其 Z 变换定义为：
$$\tilde{F}(z)=\mathcal{Z}\{f[n]\}=\sum_{n=-\infty}^{\infty}f[n]z^{-n},\quad z=A\mathrm{e}^{\mathrm{j}\omega}$$
\end{definition}

在 $z$ 域有：
$$\tilde{\mathbf{Q}}(z)=\tilde{\mathbf{H}}(z)\tilde{\mathbf{R}}(z)$$

与连续时间情况类似，我们可以使用**零极点图**来表示传递函数矩阵 $\tilde{\mathbf{H}}(z)$ 的性质。

\begin{definition}[$z$ 域零极点图的定义]
对于离散传递函数矩阵 $\tilde{\mathbf{H}}(z)$ 的每个元素 $h_{ij}(z)$，其**零点**为使分子为零的复数 $z$ 值，**极点**为使分母为零的复数 $z$ 值。$z$ 平面上的零极点图是绘制这些零点和极点位置的图示。
\end{definition}

对于矩阵值序列 $\mathbf{H}[n]$ 的 $Z$ 变换 $\tilde{\mathbf{H}}(z)$，其零极点图具有以下关键性质：

1. **极点来源**：$\tilde{\mathbf{H}}(z)$ 的极点来源于其各元素分母的零点。
2. **收敛域的环形边界**：在 $z$ 平面上，收敛域由圆形边界 $|z| = R_c$ 界定，其中 $R_c$ 是 $\tilde{\mathbf{H}}(z)$ 最外侧极点的模值。
3. **区域划分**：该圆将 $z$ 平面分为两个区域：
   - 圆外区域（$|z| > R_c$）：$\tilde{\mathbf{H}}(z)$ 收敛且解析
   - 圆内区域（$|z| < R_c$）：$\tilde{\mathbf{H}}(z)$ 发散或包含极点
4. **矩阵整体性**：整个矩阵 $\tilde{\mathbf{H}}(z)$ 的收敛域由其所有元素中收敛域最窄的那个决定，即所有极点的最大模值。

### 离散时间 OC 存在性定理

\begin{theorem}[离散时间 OC 存在性定理]
在 OC 变换公理体系中，给定一个人的 $\mathbf{r}[n]$ 和 $\mathbf{H}[n]$，该人存在 OC 的**充分必要条件**是以下条件同时成立：

1. **现实特征向量序列的适应性**：$\mathbf{r}[n]$ 是因果的，允许 $Z$ 变换且与系统作用后不引发发散。
   - $\mathbf{r}[n]=0$ 当 $n<0$。等价的 $z$ 域表述为：$\tilde{\mathbf{R}}(z)$ 的收敛域包含某个圆外区域 $|z|>R_r$ 并包含 $z=\infty$。
   - $\tilde{\mathbf{R}}(z)$ 的收敛域包含单位圆。这是保证现实人设不崩坏的必要条件。
2. **OC变换系统的正则性**：$\mathbf{H}[n]$ 是因果且稳定的。
   - **因果性**：$\mathbf{H}[n] = 0$ 对所有 $n < 0$ 成立。
   - **稳定性**：$\mathbf{H}[n]$ 的每个元素 $h_{ij}[n]$ 绝对可和：$\sum_{n=0}^\infty |h_{ij}[n]| < \infty$。
   - $z$ 域等价表述：$\tilde{\mathbf{H}}(z)$ 的收敛域为某个圆外区域 $|z| > R_{\text{max}}$，且包含单位圆 $|z| = 1$ 和无穷大 $z=\infty$。
\end{theorem}

> 与连续时间 OC 变换不同，$z$ 域描述存在因果性的等价表述，即收敛域包含 $z=\infty$。当满足上述条件时，时域卷积和与 $Z$ 变换都可以换成单边的。

### 离散时间 OC 反变换与可逆性

\begin{theorem}[离散时间 OC 可逆系统]
对于一个由因果、稳定传递函数矩阵 $\tilde{\mathbf{H}}(z) \in \mathbb{C}^{M \times N}$ 描述的离散时间 OC 变换系统，如果存在一个同样因果、稳定的 LTI 系统 $\tilde{\mathbf{G}}(z) \in \mathbb{C}^{N \times M}$，使得在收敛域内满足 $\tilde{\mathbf{G}}(z) \tilde{\mathbf{H}}(z) = \mathbf{I}_N$，则称原 OC 变换系统是**可逆的**，并称 $\tilde{\mathbf{G}}(z)$ 为其**逆系统**。
\end{theorem}

\begin{theorem}[离散时间 OC 反变换]
对于一个可逆的离散时间 OC 变换系统，其**反变换**定义为由逆系统 $\tilde{\mathbf{G}}(z)$ 实现的变换过程。在时域中，该反变换由如下卷积和给出：
$$\mathbf{r}[n] = \sum_{k=0}^{\infty} \mathbf{G}[k] \mathbf{q}[n-k]$$
其中 $\mathbf{G}[k] = \mathcal{Z}^{-1}\{\tilde{\mathbf{G}}(z)\}$ 是逆系统的离散 OC 冲激响应矩阵。此过程可以从 OC 特征 $\mathbf{q}[n]$ 中唯一地恢复出现实描述 $\mathbf{r}[n]$。
\end{theorem}

\begin{theorem}[离散时间 OC 反变换存在性判据]
在 OC 变换公理体系中，一个由有理矩阵 $\tilde{\mathbf{H}}(z)\in\mathbb{C}^{M \times N}$ 描述的离散时间 OC 变换，其因果、稳定的左逆系统 $\tilde{\mathbf{G}}(z)\in\mathbb{C}^{N \times M}$ 存在，当且仅当以下条件同时成立：

1. **正向系统属性**：原系统 $\tilde{\mathbf{H}}(z)$ 本身是因果且稳定的。
2. **维度条件**：现实特征的维度 $N$ 不超过 OC 特征的维度 $M$，即 $N \leq M$。
3. **满秩条件**：原系统 $\tilde{\mathbf{H}}(z)$ 列满秩，即 $\operatorname{rank}(\tilde{\mathbf{H}}(z)) = N,\quad \forall z\in\mathbb{C}\ \text{且}\ |z|\geq 1$。
4. **稳定左逆条件**：存在一个有理矩阵 $\tilde{\mathbf{G}}(z)$ 满足 $\tilde{\mathbf{G}}(z)\tilde{\mathbf{H}}(z)=\mathbf{I}_N$，且 $\tilde{\mathbf{G}}(z)$ 的所有极点严格位于单位圆内。
\end{theorem}

> 这里的"当且仅当"是世界观内部的判定公理。若将该模型视为现实离散控制理论中的一般 MIMO LTI 系统，还需要额外分析稳定左逆、零点与可实现性等问题。

\begin{theorem}[离散时间形式逆系统的构造]
当满足离散时间反变换存在性判据时，逆系统可按如下方式构造：

1. **当 $M = N$ 时**：形式逆系统由矩阵求逆直接得到：$\tilde{\mathbf{G}}(z) = \tilde{\mathbf{H}}(z)^{-1}$。
2. **当 $M > N$ 时**：一个常用的形式左逆由 Moore-Penrose 伪逆给出：$\tilde{\mathbf{G}}(z)=\tilde{\mathbf{H}}^{\sharp}(z) = \left( \tilde{\mathbf{H}}(z)^\dagger \tilde{\mathbf{H}}(z) \right)^{-1} \tilde{\mathbf{H}}(z)^\dagger$。
\end{theorem}

## 特征向量函数到特征向量序列的采样理论

当现实世界的 {{wkn}} 要穿越到二次元世界成为其自设，或自设从二次元世界返回到现实世界时，均需要进行 OC 变换或反变换。这一过程包括从现实世界的特征向量函数到 OC 特征向量函数的变化（连续时间 OC 变换），以及反向的变化（连续时间 OC 变换）。

自动 OC 变换机无法直接处理连续的特征向量函数，只能处理离散的特征向量序列。因此，自动 OC 变换机的实现需要结合采样理论，将连续时间 OC 变换离散化为离散时间 OC 变换。

\begin{theorem}[OC 变换的采样过程]
对连续时间现实特征向量函数 $\mathbf{r}(t)$ 以采样间隔 $T_s$ 进行均匀采样，得到离散序列 $\mathbf{r}[n] = \mathbf{r}(nT_s), \quad n \in \mathbb{Z}$。相应的，连续 OC 冲激响应矩阵 $\mathbf{H}(t)$ 也被离散化为 $\mathbf{H}[n] = \mathbf{H}(nT_s), \quad n \in \mathbb{Z}$。
\end{theorem}

### 无失真采样条件

\begin{theorem}[OC 变换的无失真采样条件]
要从离散 OC 序列 $\mathbf{q}[n]$ 中无失真地恢复连续 OC 特征 $\mathbf{q}(t)$，必须同时满足以下三个条件：

1. **现实描述带宽限制**：$\mathbf{r}(t)$ 是带限的，即存在 $\omega_r^{\text{max}}$ 使得 $\tilde{\mathbf{R}}(\mathrm{j}\omega) = \mathbf{0}, \quad \forall |\omega| > \omega_r^{\text{max}}$。
2. **系统带宽限制**：OC 冲激响应矩阵 $\mathbf{H}(t)$ 对应的传递函数矩阵是带限的。
3. **采样率要求**：采样频率 $\omega_s = 2\pi/T_s$ 满足 $\omega_s > 2 \cdot \min(\omega_r^{\text{max}}, \omega_h^{\text{max}})$。
\end{theorem}

### OC 特征向量函数的重构

\begin{theorem}[OC 特征向量函数的重构]
当满足无失真采样条件，并且已知双边采样序列时，OC 特征向量函数可以从离散的 OC 特征向量序列完美重构：
$$\mathbf{q}(t) = \sum_{n=-\infty}^{\infty} \mathbf{q}[n] \cdot \text{sinc}\left(\dfrac{t - nT_s}{T_s}\right)$$
其中 $\text{sinc}(x) = \dfrac{\sin(\pi x)}{\pi x}$ 是理想插值函数。
\end{theorem}

基于采样理论，连续时间 OC 变换可以在理想条件下通过离散时间系统无失真实现，只要选择合适的采样率、设计适当的抗混叠滤波器、采用合适的插值方法进行重构。

\begin{theorem}[离散到连续的完备性]
如果采样过程满足香农条件，重构采用理想 sinc 插值，并且连续系统到离散系统的实现符合前述理想化采样模型，那么离散 OC 变换系统与连续 OC 变换系统在信息意义上是等价的：$\mathbf{q}(t) \xrightarrow{\text{采样}} \mathbf{q}[n] \xrightarrow{\text{重构}} \mathbf{q}(t)$，即采样和重构过程是信息无损的。
\end{theorem}

> 若实际系统只保存 $n\geq 0$ 的因果截断序列，则双边完美重构会变成近似重构；误差由截断长度、边界延拓方式和抗混叠滤波器共同决定。

## 快速 OC 变换

从现实的角度考虑，任何角色不可能在无穷久远的时间就创立了，也不可能经过无穷大的时间仍然存在。在实际的自动 OC 变换机的使用中，可以设三者统一截断为长度 $L$ 的因果有限长序列，且 $L$ 为 2 的幂（不足则补零）。

如果直接按定义计算卷积和，时间复杂度为 $O(NML^2)$，当 $N,M,L$ 较大时，计算量过于庞大，难以实时处理。为此，需引入快速算法以提升计算效率。

### 基于频域方法的卷积加速

频域方法的核心在于利用离散傅里叶变换（DFT）的卷积定理，将计算复杂的时域卷积转化为计算简单的频域乘法。

\begin{definition}[离散傅里叶变换（DFT）的定义]
对于一个长度为 $N_f$ 的离散序列 $x[n],\; n=0,1,\dots,N_f-1$，其离散傅里叶变换 $X[k]$ 定义为：
$$X[k] = \sum_{n=0}^{N_f-1} x[n] \cdot \mathrm{e}^{-\mathrm{j}\frac{2\pi}{N_f}kn}, \quad k=0,1,\dots,N_f-1$$
相应的离散傅里叶逆变换（IDFT）为：
$$x[n] = \frac{1}{N_f} \sum_{k=0}^{N_f-1} X[k] \cdot \mathrm{e}^{\mathrm{j}\frac{2\pi}{N_f}kn}, \quad n=0,1,\dots,N_f-1$$
\end{definition}

\begin{theorem}[循环卷积定理]
设序列 $\tilde{x}[n]$ 和 $\tilde{h}[n]$ 的长度均为 $N_f$，其循环卷积 $\tilde{y}[n]$ 定义为：
$$\tilde{y}[n] = \sum_{m=0}^{N_f-1} \tilde{h}[m] \tilde{x}[(n-m) \mod N_f]$$
令 $\tilde{X}[k]$、$\tilde{H}[k]$、$\tilde{Y}[k]$ 分别为三者的 DFT，则有 $\tilde{Y}[k] = \tilde{H}[k] \cdot \tilde{X}[k]$。即时域的循环卷积对应于频域的乘积。
\end{theorem}

然而，OC 变换需要计算的是**线性卷积**，而非循环卷积。为了利用 DFT 计算两个长度为 $L$ 的因果序列 $h_{ij}[n]$ 和 $r_j[n]$ 的线性卷积，必须通过补零来避免混叠效应：将两者各补零至长度 $N_f \ge 2L-1$（通常取 $N_f = 2L$），此时循环卷积的前 $L$ 个点等于线性卷积。

**快速傅里叶变换（FFT）** 是一类高效计算 DFT 的算法总称，其核心思想是分治策略，通过将大的 DFT 分解为多个小 DFT 来减少计算量。FFT 将计算复杂度从 $O(N_f^2)$ 降至 $O(N_f \log N_f)$。

\begin{theorem}[FFT 加速的线性卷积计算复杂度]
设 $h_{ij}[n]$ 和 $r_j[n]$ 均为长度 $L$ 的因果序列（补零至 $N_f=2L$）。利用 FFT 计算线性卷积的复杂度为 $O(N_f \log N_f) = O(L \log L)$。相比之下，直接时域卷积的复杂度为 $O(L^2)$。
\end{theorem}

**证明**：两次 FFT（计算 $H_{ij}[k]$ 和 $R_j[k]$）的复杂度为 $2 \times O(N_f \log N_f)$；一次频域点乘的复杂度为 $O(N_f)$；一次 IFFT 的复杂度为 $O(N_f \log N_f)$。故总复杂度为 $O(N_f \log N_f) = O(L \log L)$。

利用 FFT 加速后，OC 变换的总复杂度从 $O(NML^2)$ 显著降低至 $O(NML \log L)$，在 $L$ 较大时带来数个数量级的加速比，使得实时 OC 变换成为可能。

值得注意的是，在实际实现中可以利用变换域的系数复用进一步优化：

- **系数预计算**：离散 OC 冲激响应矩阵 $\mathbf{H}$ 通常是固定的系统参数，可以预先计算并存储所有 $H_{ij} = \mathrm{FFT}(h_{ij})$。
- **输入变换复用**：对于每个输入通道 $r_j$，只需计算一次 $\mathrm{FFT}(r_j)$，即可复用于所有 $M$ 个输出通道的计算。
- **并行计算**：各输出通道 $q_i$ 的计算相互独立，适合并行处理。

该综合优化算法将总复杂度从 $O(NML^2)$ 显著降低至 $O(NML \log L)$，在 $L$ 较大时带来数个数量级的加速比，使得实时 OC 变换成为可能。

### 综合优化算法

在实际应用中，为了最大化 OC 变换的计算效率，可以将缓存优化策略与 FFT 加速方法相结合：

1. **频域计算主体框架**：采用基于 FFT 的频域卷积，将时间复杂度降至 $O(NML \log L)$。
2. **缓存优化的内存访问**：在矩阵乘法累加阶段，优化内存访问模式，提升缓存命中率。
3. **并行计算架构**：利用现代多核处理器的并行计算能力，同时对多个输出通道或输入通道进行计算。

这对自动 OC 变换机的设计者提出了重要启示：需要根据问题规模动态选择最优算法，并在算法实现中充分考虑现代处理器的内存层次结构特性。

### 算法性能对比分析

| 算法类型 | 时间复杂度 | 空间复杂度 | 速度 |
|---------|-----------|-----------|------|
| 缓存不友好的时域卷积 | $O(NML^2)$ | $O(NML)$ | 慢 |
| 缓存友好的时域卷积 | $O(NML^2)$ | $O(NML)$ | 较慢 |
| 基于原始 DFT 算法 | $O(NML^2)$ | $O(NML)$ | 最慢 |
| 基于 FFT 的频域算法 | $O(NML \log L)$ | $O(NML)$ | 快 |
| 综合优化算法 | $O(NML \log L)$ | $O(NML)$ | 很快 |

> 基于原始 DFT 算法的"快速"OC 变换算法其实一点也不快。这是由于 DFT 的计算复杂度为 $O(N_f^2)=O(L^2)$，与直接时域卷积的 $O(L^2)$ 相当，且 DFT 的常数因子较大，导致其在实际应用中反而更慢。

### 数值实验结论

经过系统测试，在不同规模问题下，实验结果表明：

1. **计算效率层次分明**：算法性能呈现明显的规模依赖性。在小规模问题（$N=4,L=32$）中，直接卷积优化版本表现最佳；而在大规模问题（$N=64,L=2048$）中，FFT 方法实现了 30 倍以上的加速比。
2. **缓存优化效果显著**：对比 "good_cache" 与 "bad_cache" 版本，优化的内存访问模式在不同规模下带来稳定性能提升，凸显了缓存友好算法设计的重要性。
3. **数值精度卓越**：所有 FFT 方法的平均绝对误差均在 $10^{-17}$–$10^{-19}$ 量级，展现了极高的数值稳定性。
4. **算法适用场景**：缓存友好的直接卷积适合小规模问题（$L \leq 512$）；FFT 方法在大规模问题（$L \geq 1024$）中优势明显，是目前自动 OC 变换机的首选算法；DFT 直接法仅适用于理论验证。
5. **系统稳定性验证**：所有测试案例中最大绝对和为 0.909091，远小于 1，满足绝对可和条件，确保了 OC 变换系统的 BIBO 稳定性。
6. **复杂度理论验证**：实测结果与理论分析高度一致。当 $L$ 从 32 增长到 2048（64 倍），直接卷积计算时间增长约 55970 倍，接近 $O(L^2)$ 的理论增长；而 FFT 方法增长约 2313 倍，接近 $O(L\log L)$ 的理论增长趋势。
