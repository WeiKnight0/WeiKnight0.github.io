---
title: 能力函数理论
description: 角色能力的数学抽象，涵盖能力函数定义、符咒与向量微分符咒。
order: 2
lang: zh-cn
category: theory
---

能力函数是二次元世界中角色能力的数学抽象，是理解和设计角色能力的基础。

## 能力函数的定义

在二次元世界的数学模型中，角色的特殊能力可以被抽象为一种映射关系，我们称之为**能力函数（Ability Function）**。此函数严格描述了能力如何将输入（作用目标或条件）转化为输出（作用效果）。

> **能力函数的定义**
>
> 设 $\mathcal{X}$ 为能力的**输入空间（Input Space）**，包含了所有可能的能力作用目标、初始条件或触发状态。设 $\mathcal{Y}$ 为能力的**输出空间（Output Space）**，包含了所有可能的能力作用效果。
>
> 一个**能力函数**是一个映射：
> $$F: \mathcal{X} \to \mathcal{Y}$$
> 它将每个输入 $x \in \mathcal{X}$ 映射到唯一的输出 $y = F(x) \in \mathcal{Y}$。
>
> 此时称：
> - $x$ 为能力的**输入**或**原像**。
> - $y = F(x)$ 为能力在输入 $x$ 下的**输出**或**像**。
> - 映射 $F$ 的具体形式，体现了角色能力的使用规则与使用效果。

能力函数具有以下重要特征：

1. **输入与输出空间的广泛性**：输入空间 $\mathcal{X}$ 和输出空间 $\mathcal{Y}$ 不限于传统的数集，可以是角色、物体等实体对象的集合，HP、MP、状态等属性值的集合，空间坐标、时间区间等连续范畴，或向量、矩阵等抽象数学结构。
2. **世界观的约束**：同一世界观下的所有能力函数必须遵守该世界设定的基本规律。
3. **确定性**：对于确定的输入 $x$，能力函数必须产生确定的输出 $F(x)$。

## 能力函数的两种类型

根据输入 $x$ 的数学性质及其被处理的方式，能力函数在实践中表现为两种基本类型：离散型能力函数和连续型能力函数。

### 离散型能力函数

当能力函数的输入是离散的、可数的对象时，其作用模式是离散的。

> **离散型能力函数的定义**
>
> 若能力函数 $F$ 的输入空间 $\mathcal{X}$ 是一个离散集合（有限或可数无限），则称 $F$ 为**离散型能力函数**。其效果通过直接将函数作用于每个输入元素来实现：
> $$\mathcal{Y} = F(\mathcal{X}) = \{F(x) \mid x \in \mathcal{X}\}$$
> 若本次能力发动仅针对输入集合 $X = \{x_1, x_2, \ldots, x_n\} \subseteq \mathcal{X}$，则对应的输出集合 $\mathcal{Y} = \{y_1, y_2, \ldots, y_n\}$ 为：
> $$\forall x_i \in X, \quad y_i = F(x_i)$$

**示例：单体治愈术**

角色A的治愈术以单一角色为目标，恢复其50点HP。能力函数为：
$$F_{\text{heal}}(\text{HP}) = \text{HP} + 50$$

### 连续型能力函数

当能力函数的输入是一个连续空间的元素，且其效果需要通过"累积"来计算时，其作用模式是连续的。

> **连续型能力函数的定义**
>
> 若能力函数 $F$ 的输入空间是一个连续域 $\Omega$，并且总效果由定义在 $\Omega$ 上的**效果密度函数** $f(\omega)$ 积分得到，则称 $F$ 为**连续型能力函数**。其总效果为：
> $$\mathcal{Y} = F(\Omega) = \int_{\Omega} f(\omega) \, \mathrm{d}\omega$$
> 其中 $\omega$ 是域 $\Omega$ 上的微元，$f: \Omega \to \mathbb{R}$ 是密度函数，它本身可以看作一个局部的、点上的能力函数。

**示例：范围火球术**

角色B释放火球术，对圆形区域 $\Omega = \{\vec{r} \in \mathbb{R}^2 : \|\vec{r}\| \leq R\}$ 造成伤害。伤害密度在中心最高，向外衰减，定义为 $f(\vec{r}) = 100 e^{-\|\vec{r}\|^2}$。经极坐标变换求解得：
$$F_{\text{fireball}}(\Omega) = 100\pi (1 - \mathrm{e}^{-R^2})$$

该能力对区域内位于点 $\vec{r}_p$ 的单个目标造成的伤害，是密度函数在该点的取值 $f(\vec{r}_p) = 100 \mathrm{e}^{-\|\vec{r}_p\|^2}$，体现了连续型能力函数与离散型能力函数在计算上的关联与区别。

## 符咒

**符咒（Spell）** 是世界观中一种特殊的能力函数算子，它通过改变能力函数本身的映射规则来创造新的能力。

> **符咒的定义**
>
> 设 $\mathscr{F}$ 为某世界观下所有能力函数构成的集合。一个**符咒** $\mathcal{O}$ 是一个从能力函数集到其自身的映射：
> $$\mathcal{O}: \mathscr{F} \to \mathscr{F}$$
> 它将一个能力函数 $F \in \mathscr{F}$ 映射为另一个新的能力函数 $\mathcal{O}F \in \mathscr{F}$。
>
> 对于任意作用对象 $x \in \mathcal{X}_F$，新能力函数的效果由下式确定：
> $$(\mathcal{O}F)(x)$$
> 符咒 $\mathcal{O}$ 改变了能力的作用规则，而不仅仅是其输出值。

常见的符咒类型包括：

- **线性强化符咒** $\mathcal{E}_k$：重新定义能力函数的输出为原输出的 $k$ 倍。
  $$(\mathcal{E}_k F)(x) = k \cdot F(x)$$

- **指数衰减符咒** $\mathcal{D}_{\lambda}$：使能力函数效果随空间或时间坐标指数衰减。
  $$(\mathcal{D}_{\lambda} F)(\mathbf{r}) = F(\mathbf{r}) \cdot \mathrm{e}^{-\lambda \|\mathbf{r}\|}$$

- **作用域限制符咒** $\mathcal{R}_S$：将能力函数的有效作用域限制在区域 $S$ 内。
  $$(\mathcal{R}_S F)(x) = \begin{cases} F(x) & \text{若 } x \in S \\ 0 & \text{若 } x \notin S \end{cases}$$

符咒的复合运算 $\mathcal{O}_2 \mathcal{O}_1$ 定义为：
$$(\mathcal{O}_2 \mathcal{O}_1)F = \mathcal{O}_2(\mathcal{O}_1 F)$$
符咒的复合通常不满足交换律，即 $\mathcal{O}_2 \mathcal{O}_1 \neq \mathcal{O}_1 \mathcal{O}_2$。

## 向量微分符咒

**向量微分符咒（Nabla Spell）** 是世界观中最为强大的空间变化符咒之一，一般写作 $\nabla$。该符咒可以同时操控空间中的多种变化率，根据不同的组合方式实现高斯公式、格林公式等强大效果。

### 向量微分符咒的概念

> **向量微分符咒的定义**
>
> 在三维空间中，向量微分符咒 $\nabla$ 定义为：
> $$\nabla = \left(\frac{\partial}{\partial x}, \frac{\partial}{\partial y}, \frac{\partial}{\partial z}\right)$$
> 该符咒可以作用于标量能力函数 $\varphi$ 或向量能力函数 $\mathbf{F}=(F_x,F_y,F_z)$，产生不同效果：
>
> - **梯度符咒**：$\nabla\varphi = \left(\frac{\partial\varphi}{\partial x}, \frac{\partial\varphi}{\partial y}, \frac{\partial\varphi}{\partial z}\right)$
> - **散度符咒**：$\nabla\cdot\mathbf{F} = \frac{\partial F_x}{\partial x} + \frac{\partial F_y}{\partial y} + \frac{\partial F_z}{\partial z}$
> - **旋度符咒**：$\nabla\times\mathbf{F} = \left(\frac{\partial F_z}{\partial y} - \frac{\partial F_y}{\partial z}, \frac{\partial F_x}{\partial z} - \frac{\partial F_z}{\partial x}, \frac{\partial F_y}{\partial x} - \frac{\partial F_x}{\partial y}\right)$

当一个连续性能力函数作用的时候，会形成一个场。这个场又称作**能力场（Ability Field）**。

### 向量微分符咒的应用

向量微分符咒的主要效果就是**作用域的升维**。

> **高斯符咒公式**
>
> 当 $\nabla$ 符咒与闭合曲面积分组合时，可实现作用域从曲面域到空间域的变化：
> $$\oiint_{\partial V} \mathbf{F}\cdot\mathrm{d}\mathbf{S}=\iiint_V (\nabla\cdot\mathbf{F}) \,\mathrm{d}V$$

> **格林符咒公式**
>
> 在二维平面上，$\nabla_{\text{2D}}$ 符咒与闭合曲线积分组合：
> $$\oint_C (L\,\mathrm{d}x + M\,\mathrm{d}y) = \iint_D \left(\frac{\partial M}{\partial x} - \frac{\partial L}{\partial y}\right) \mathrm{d}x\,\mathrm{d}y$$

> **斯托克斯符咒公式**
>
> 对于空间曲线，$\nabla$ 符咒与闭合曲线积分组合：
> $$\oint_C \mathbf{F}\cdot\mathrm{d}\mathbf{r} = \iint_S (\nabla\times\mathbf{F})\cdot\mathrm{d}\mathbf{S}$$

这些公式展示了向量微分符咒如何借助闭合积分实现作用域的升维——从曲线到曲面，从曲面到体积。
