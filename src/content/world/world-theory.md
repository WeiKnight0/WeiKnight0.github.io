---
title: 世界理论
description: "世界的形式定义、层级结构、神与无全域神定理。"
order: 3
---

本节用离散数学与抽象代数语言，给出"世界"的形式定义，并讨论其性质与层级结构。随后，基于此定义，分析"神"与"无全域神定理"等哲学命题在该世界观下的数学表达。

## 世界与世界的性质

在世界观中，一个"**世界（World）**"是一个包含个体与命题的数学结构。个体是"存在的东西"，命题是"关于这些东西的陈述"。每个命题在某个世界中要么为真，要么为假。

> **世界的定义**
>
> 一个**世界** $w$ 是三元组
> $$w=(D_w,\Phi_w,\models_w)$$
> 其中
> 1. $D_w\neq\varnothing$ 是**个体集合（Domain）**，称为世界的**域**；
> 2. $\Phi_w$ 是世界的**命题集合**，满足对任意 $\varphi\in\Phi_w$，其否定 $\neg\varphi\in\Phi_w$；且排中律成立：$\varphi\not\equiv\neg\varphi$；
> 3. $\models_w : \Phi_w \to \{\text{true}, \text{false}\}$ 是**真值指派函数**，满足对任意 $\varphi\in\Phi_w$，$\models_w(\varphi)$ 仅取值 true 或 false；且 $\models_w(\neg\varphi)$ 与 $\models_w(\varphi)$ 互为否定。

这样的定义更像是在世界观下给出的一种理想化的"数学世界"模型。它适用于分析逻辑与集合论等基础数学问题，但在处理更复杂的哲学或语义问题时，可能需要更丰富的结构。

> **最小世界示例**
>
> 令 $D_w=\{a\}$，$\Phi_w=\{p,\neg p\}$，定义真值指派 $\models_w(p)=\text{true}$，则 $\models_w(\neg p)=\text{false}$。此时 $w$ 是一个合法世界。

> **世界类的定义**
>
> 令 $\mathcal{W}=\{w\mid w\text{ 是满足定义的世界}\}$。若不限制世界中可使用的个体与命题来源，则在 ZFC 下，$\mathcal{W}$ 应理解为**真类（Proper Class）**，即不属于任何集合。这样的 $\mathcal{W}$ 包含所有可能的世界，称作**世界类（World Class）**。
>
> 为了在后文中使用普通图论、偏序集与函数等集合论工具，我们固定一个足够大的**工作世界域（Working World Universe）** $\mathcal{W}_0\subseteq\mathcal{W}$，并要求 $\mathcal{W}_0$ 是集合。后文若无特别说明，所有世界图、层级关系、神的掌控范围等对象均在该固定集合 $\mathcal{W}_0$ 内讨论。

## 世界的层级

为了描述"一个世界比另一个世界拥有更多信息"这一直观想法，我们借用图论中的 **DAG（有向无环图）** 来描述世界之间的关系。

> **世界图与世界的层级关系**
>
> 称二元组 $G=(\mathcal{W}_0,E)$ 为**世界图（World Graph）**，其中边集
> $$E=\{(w,w')\in\mathcal{W}_0\times\mathcal{W}_0\mid \Phi_w \subsetneq \Phi_{w'},\ \text{且 } \models_{w'} \text{ 在 } \Phi_w \text{ 上的限制等于 } \models_w\}$$
>
> 该图是严格的DAG，因而诱导出偏序集 $(\mathcal{W}_0,\preceq)$，其中
> $$w\preceq w'\;\Longleftrightarrow\; \Phi_w \subseteq \Phi_{w'}\ \text{且 } \models_{w'} \text{ 在 } \Phi_w \text{ 上的限制等于 } \models_w$$
>
> 此时称 $w$ 为 $w'$ 的**信息子世界（Information Subworld）**。若 $w \preceq w'$ 且 $w \neq w'$，则记作 $w \prec w'$。

**偏序关系的三条性质**：
- **自反性**：对任意 $w\in\mathcal{W}_0$，有 $w\preceq w$；
- **反对称性**：对任意 $w_1,w_2\in\mathcal{W}_0$，若 $w_1\preceq w_2$ 且 $w_2\preceq w_1$，则 $w_1=w_2$；
- **传递性**：对任意 $w_1,w_2,w_3\in\mathcal{W}_0$，若 $w_1\preceq w_2$ 且 $w_2\preceq w_3$，则 $w_1\preceq w_3$。

### 极小元与层函数

> **良基子集的极小元存在**
>
> 设 $S\subseteq\mathcal{W}_0$ 为非空子集。若 $S$ 在关系 $\prec$ 下不存在无限严格下降链 $\cdots \prec w_2 \prec w_1 \prec w_0$，则 $S$ 中存在 $\preceq$-极小元。

若不加入良基条件，上述结论一般不成立。例如命题集可以形成无限真包含下降链，此时相应的世界子集可能没有极小元。因此，层级函数只在满足良基条件的世界域或分支上具有通常意义。

> **层函数的定义**
>
> 在满足良基条件的工作世界域中，定义**层函数** $\mathrm{level}:\mathcal{W}_0\to\mathbb{N}\cup\{\infty\}$ 如下：
> $$\mathrm{level}(w)= \begin{cases} \min \big\{ n \in \mathbb{N} \mid \exists w_0 \preceq w_1 \preceq \dots \preceq w_n = w,\ w_0 \text{ 是 } \mathcal{W}_0 \text{ 的极小元} \big\}, & \text{如果存在这样的链} \\ \infty, & \text{否则} \end{cases}$$

层函数把世界图划分成"代际"，但允许不同连通分量的世界拥有任意有限的层数或 $\infty$。第 0 层由所有极小元组成（可能有多个，且位于不同连通分量）。

## 结构子世界

除了信息子世界，我们还可以定义"**结构子世界（Structural Subworld）**"这一更强的概念。在直观上，一个"结构子世界"应当是大世界的一部分——不仅拥有的信息更少，其个体域也应包含于大世界的个体域中，且关于这部分个体的所有真值均与大世界一致。

> **结构子世界的定义**
>
> 设 $w = (D_w, \Phi_w, \models_w)$ 和 $w' = (D_{w'}, \Phi_{w'}, \models_{w'})$ 是两个世界。称 $w$ 是 $w'$ 的**结构子世界**，记作 $w \sqsubseteq w'$，当且仅当以下条件同时成立：
> 1. **个体域包含**：$D_w \subseteq D_{w'}$。
> 2. **命题集一致性**：$\Phi_w = \{\, \varphi \in \Phi_{w'} \mid \text{$\varphi$ 中出现的所有个体均属于 } D_w \,\}$。
> 3. **真值继承性**：对任意 $\varphi \in \Phi_w$，有 $\models_w(\varphi) = \models_{w'}(\varphi)$。

结构子世界完全由父世界通过限制个体域而得到。若 $w \sqsubseteq w'$，则 $w \preceq w'$，即结构子世界必是信息子世界。反之不成立：信息子世界只要求命题集的包含与真值一致，但允许个体域完全不同。

## 神

在许多哲学与神学体系中，"神"被描述为一个全知全能的存在。基于世界与子世界的框架，我们可以对"神"这一概念进行数学建模。

> **神的定义**
>
> **神** $G$ 是一个四元组：
> $$G = (w_G, \, \mathcal{S}_G, \, \pi, \, \Vdash_G)$$
> 其中：
> 1. $w_G \in \mathcal{W}_0$ 是一个世界，称为**神 $G$ 的主世界**。
> 2. $\mathcal{S}_G = \{ w' \in \mathcal{W}_0 \mid D_{w'} \subseteq D_{w_G},\ \Phi_{w'} = \{\varphi \in \Phi_{w_G} \mid \text{$\varphi$中所有个体属于 } D_{w'}\},\ \models_{w'} = \models_{w_G}|_{\Phi_{w'}} \}$ 是 $w_G$ 的所有结构子世界的集合，称为**神 $G$ 的掌控世界集**。
> 3. $\pi: \mathcal{S}_G \to \mathcal{P}(\Phi_{w_G})$ 是**投影函数**，满足 $\pi(w') = \Phi_{w'}$。
> 4. $\Vdash_G \subseteq \{ (w', \varphi) \in \mathcal{S}_G \times \Phi_{w_G} \mid \varphi \in \pi(w') \}$ 是**全局认知关系**，满足：
>    - **一致性公理**：若 $(w', \varphi) \in \Vdash_G$，则 $\models_{w'}(\varphi) = \text{true}$。
>    - **全知公理**：对任意 $w' \in \mathcal{S}_G$ 和任意 $\varphi \in \pi(w')$，有 $(w', \varphi) \in \Vdash_G$ 当且仅当 $\models_{w'}(\varphi) = \text{true}$。

这个定义的核心在于将"掌控"具体化为两种能力：
1. **范围**：神的掌控范围是其主世界的所有结构子世界 $\mathcal{S}_G$。
2. **认知**：神拥有一个全局的、无误的认知关系 $\Vdash_G$，能够无误地知晓其掌控范围内任何局部的任何事实。

> 区分宗教意义上的"神"与世界观中的"神"是重要的。这里的"神"是一个理想化的数学构造，旨在捕捉全知全能的概念，而非特定宗教或文化中的神学定义。

## 无全域神定理

基于已建立的世界层级结构与神的定义，我们可以提出一个更为根本的论断：在命题可以无限扩张的假设下，掌控所有世界的神在逻辑上是不可能的。

> **命题的无限扩张性公理**
>
> 工作世界域 $\mathcal{W}_0$ 中的命题集可以无限扩张。形式化地：
> $$\forall w \in \mathcal{W}_0,\; \exists w' \in \mathcal{W}_0,\; \text{使得 } \Phi_w \subsetneq \Phi_{w'}$$
> 该公理断言，不存在一个拥有"所有"命题的世界。

> **全域神的定义**
>
> 设 $G^* = (w_{G^*}, \mathcal{S}_{G^*}, \pi, \Vdash_{G^*})$ 是一个神。若 $\mathcal{S}_{G^*} = \mathcal{W}_0$，即其掌控范围包含工作世界域中的所有世界，则称 $G^*$ 为**全域神（Universal God）**。

> **无全域神定理**
>
> 在 ZFC、固定工作世界域与命题的无限扩张性公理下，不存在全域神。

**证明**：采用反证法。

1. 假设存在一个全域神 $G^*$。根据定义，有 $\mathcal{S}_{G^*} = \mathcal{W}_0$。
2. 由于 $\mathcal{S}_{G^*}$ 是 $w_{G^*}$ 的所有结构子世界组成的集合，这意味着：$\forall w \in \mathcal{W}_0,\; D_w \subseteq D_{w_{G^*}}$ 且 $\Phi_w \subseteq \Phi_{w_{G^*}}$。
3. 根据命题的无限扩张性公理，存在另一个世界 $w' \in \mathcal{W}_0$，使得 $\Phi_{w_{G^*}} \subsetneq \Phi_{w'}$。
4. 但由第2点，由于 $w' \in \mathcal{W}_0$，必须有 $\Phi_{w'} \subseteq \Phi_{w_{G^*}}$。矛盾。
5. 因此，全域神 $G^*$ 不存在。

此证明不关心世界的具体内容（个体、真值），仅利用了两个基本事实：全域神的存在蕴含了存在一个世界其命题集包含所有其他世界的命题集；命题的无限扩张性保证了这样的世界不可能存在。

## 角色神

在叙事作品中，作者常常塑造一些拥有近乎神明般力量的角色。它们可能在其所处的故事范围内无所不能，但作者又会通过剧情明确展示其能力的边界。

> **角色神的定义**
>
> **角色神（Character God）** 是神结构的叙事性弱化。它仍是一个四元组
> $$G = (w_G, \mathcal{S}_G, \pi, \Vdash_G),$$
> 其中 $w_G$、$\mathcal{S}_G$、$\pi$ 的定义与神的定义相同，但认知关系 $\Vdash_G$ 不再要求满足全知公理，而只要求满足一致性公理。
>
> 若存在一个非空的**限制集（Restriction Set）** $R_G \subseteq \Phi_{w_G}$，使得其中每个真命题都不被角色神认知，即
> $$\forall \varphi \in R_G,\; \models_{w_G}(\varphi)=\text{true}\Rightarrow (w_G, \varphi) \notin \Vdash_G,$$
> 则称 $G$ 为一个**角色神**。集合 $R_G$ 中的命题称为该角色神的**未知命题**或**限制命题**。

角色神的定义体现了对"神性"的一种叙事性削弱：它在结构上与神相似，拥有主世界、掌控范围、投影函数和认知关系；但全知公理被削弱，存在一个明确的认知盲区 $R_G$。

**角色神的性质**：设 $G$ 是一个角色神，其限制集为 $R_G$。

1. $G$ 对其主世界**不是全知的**：存在真命题 $\varphi \in \Phi_{w_G}$，使得 $\models_{w_G}(\varphi)=\text{true}$ 但 $(w_G, \varphi) \notin \Vdash_G$。
2. $G$ 的认知关系 $\Vdash_G$ 在其掌控范围 $\mathcal{S}_G$ 上仍然是**一致的**（不会认知错误），但是**不完全的**（存在不知道的真命题）。
3. 若 $R_G = \Phi_{w_G}$，则 $G$ 对其主世界一无所知。这是一种极端情况，可称为**无知的神（Ignorant God）**。

> **无角色神定理**
>
> **全域角色神**（即满足 $\mathcal{S}_G = \mathcal{W}_0$ 的角色神）同样不存在。

"角色神"概念的引入，完成了对"神性"的形式化构建。它允许在不违背无全域神定理的前提下，严谨地分析和讨论叙事作品中那些拥有巨大能力但却存在明确边界的"类神"角色。
