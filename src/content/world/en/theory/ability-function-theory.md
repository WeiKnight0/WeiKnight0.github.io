---
title: Ability Function Theory
description: The mathematical abstraction of character abilities, covering Ability Functions, spells, and the Nabla spell.
order: 2
---

This section introduces the theory of Ability Functions. An Ability Function is the mathematical abstraction of a character's power in a two-dimensional world, and it serves as the foundation for understanding and designing character abilities.

## Definition of Ability Functions

In the mathematical model of a two-dimensional world, a character's special ability can be abstracted as a mapping relation, which we call an **Ability Function**. This function rigorously describes how an ability transforms inputs (targets or conditions of action) into outputs (effects produced by the action).

\begin{definition}[Ability Function]
Let $\mathcal{X}$ be the **Input Space** of an ability, containing all possible targets, initial conditions, or trigger states upon which the ability may act. Let $\mathcal{Y}$ be the **Output Space** of the ability, containing all possible resulting effects.

An **Ability Function** is a mapping

$$
F: \mathcal{X} \to \mathcal{Y}
$$

that maps each input $x \in \mathcal{X}$ to a unique output $y = F(x) \in \mathcal{Y}$.

In this case:
- $x$ is called the **input** or **preimage** of the ability.
- $y = F(x)$ is called the **output** or **image** of the ability under input $x$.
- The specific form of the mapping $F$ embodies the rules of how the character's ability operates and the effects it produces.
\end{definition}

Ability Functions have the following important characteristics:
1. **Breadth of Input and Output Spaces**: the input space $\mathcal{X}$ and output space $\mathcal{Y}$ are not limited to traditional number sets; they may instead be:
          - sets of concrete entities such as characters and objects;
- sets of attribute values such as HP, MP, and status conditions;
- continuous domains such as spatial coordinates and time intervals;
- vectors, matrices, or other abstract mathematical structures.
2. **Constraints of the Worldview**: all Ability Functions within the same worldview must obey the fundamental laws established by that world.
3. **Determinacy**: for a given input $x$, the Ability Function must produce a definite output $F(x)$.

## Two Basic Types of Ability Functions

Depending on the mathematical nature of the input $x$ and the way it is processed, Ability Functions exhibit two basic operational modes in practice, and are therefore divided into two fundamental types: discrete Ability Functions and continuous Ability Functions.
### Discrete Ability Functions

When the inputs of an Ability Function are discrete, countable objects, its mode of operation is discrete.

\begin{definition}[Discrete Ability Function]
If the input space $\mathcal{X}$ of an Ability Function $F$ is a discrete set (either finite or countably infinite), then $F$ is called a **Discrete Ability Function**. Its effect is realized by directly applying the function to each input element:

$$
\mathcal{Y} = F(\mathcal{X}) = \{F(x) \mid x \in \mathcal{X}\}
$$

If, in a given activation of the ability, the targeted input set is only $X = \{x_1, x_2, \ldots, x_n\} \subseteq \mathcal{X}$, then the corresponding output set $\mathcal{Y} = \{y_1, y_2, \ldots, y_n\}$ is:

$$
\forall x_i \in X, \quad y_i = F(x_i)
$$

where $X \subseteq \mathcal{X}$ is the specific set of targets selected in this activation of the ability.
\end{definition}

### Continuous Ability Functions

When the input of an Ability Function is an element of a continuous space, and its effect must be computed through accumulation, its mode of operation is continuous.

\begin{definition}[Continuous Ability Function]
If the input space of an Ability Function $F$ is a continuous domain $\Omega = \mathcal{X}$ (for example, a spatial region or a time interval), and its total effect is obtained by integrating an **Effect Density Function** $f(\omega)$ defined on $\Omega$, then $F$ is called a **Continuous Ability Function**. Its total effect set $\mathcal{Y}$ is expressed as:

$$
\mathcal{Y} = F(\Omega) = \int_{\Omega} f(\omega)  \mathrm{d}\omega
$$

where $\omega$ is an infinitesimal element over the domain $\Omega$, and $f: \Omega \to \mathbb{R}$ is the density function, which may itself be regarded as a local, pointwise Ability Function.
\end{definition}

\begin{remark}
Formally speaking, the expression of a Continuous Ability Function does not differ from that of a Discrete Ability Function; both may be written as $\mathcal{Y}=F(\mathcal{X})$. However, their methods of computation and scenarios of use are fundamentally different:
- Discrete Ability Functions: with the expression $\mathcal{Y}=F(\mathcal{X})$, one can directly evaluate the function on each discrete input, making them suitable for single-target or finitely many targets.
- Continuous Ability Functions: although the expression is likewise $\mathcal{Y}=F(\Omega)=F(\mathcal{X})$, direct evaluation is not possible; instead, one accumulates the effect density over a continuous domain by integration, making them suitable for area-based, region-based, or duration-based abilities.
\end{remark}

## Spells
**Spells** are a special class of Ability Function operators in this worldview. By altering the mapping rules of an Ability Function itself, they create new abilities.

\begin{definition}[Spell]
Let $\mathscr{F}$ be the set of all Ability Functions within a given worldview. A **Spell** $\mathcal{O}$ is a mapping from the set of Ability Functions to itself:

$$
\mathcal{O}: \mathscr{F} \to \mathscr{F}
$$

It maps one Ability Function $F \in \mathscr{F}$ to another new Ability Function $\mathcal{O}F \in \mathscr{F}$.

For any object of action $x \in \mathcal{X}_F$, the effect of the new Ability Function is determined by:

$$
(\mathcal{O}F)(x)
$$

The Spell $\mathcal{O}$ changes the operational rule of the ability itself, rather than merely modifying its output value.
\end{definition}

The key difference between a Spell and simple function composition is that a Spell acts on the function itself as a mapping rule, rather than on specific input-output values. Common types of Spells include:

- **Linear Amplification Spell** $\mathcal{E}_k$: redefines the output of an Ability Function as $k$ times its original output

$$
(\mathcal{E}_k F)(x) = k \cdot F(x)
$$

- **Exponential Decay Spell** $\mathcal{D}_{\lambda}$: causes the effect of an Ability Function to decay exponentially with spatial or temporal coordinates. If $F(\vec{r})$ is a spatially dependent Ability Function, then after this Spell acts upon it, it becomes:

$$
(\mathcal{D}_{\lambda} F)(\mathbf{r}) = F(\mathbf{r}) \cdot \mathrm{e}^{-\lambda \|\mathbf{r}\|}
$$

- **Range Restriction Spell** $\mathcal{R}_S$: restricts the effective domain of an Ability Function to the region $S$

$$
(\mathcal{R}_S F)(x) = \begin{cases}
                  F(x) & \text{if } x \in S    \\
                  0    & \text{if } x \notin S
              \end{cases}
$$

The composition of Spells, written $\mathcal{O}_2 \mathcal{O}_1$, is defined as:

$$
(\mathcal{O}_2 \mathcal{O}_1)F = \mathcal{O}_2(\mathcal{O}_1 F)
$$

In general, Spell composition is not commutative; that is, $\mathcal{O}_2 \mathcal{O}_1 \neq \mathcal{O}_1 \mathcal{O}_2$.

The sound combination and application of Spells form one of the core mechanisms by which characters in \wkn{}'s worldview develop their abilities.

## Nabla Spell

The **Nabla Spell** is one of the most powerful Spells for spatial transformation in \wkn{}'s worldview, and is generally written as $\nabla$. This Spell can simultaneously manipulate multiple rates of change in space, and through different combinations can realize powerful effects such as the Gauss formula and Green's formula.

### Concept of the Nabla Spell

\begin{definition}[Nabla Spell]
In three-dimensional space, the Nabla Spell $\nabla$ is defined as:

$$
\nabla = \left(\dfrac{\partial}{\partial x}, \dfrac{\partial}{\partial y}, \dfrac{\partial}{\partial z}\right)
$$

This Spell may act on either a scalar Ability Function $\varphi$ or a vector Ability Function $\mathbf{F}=(F_x,F_y,F_z)$, producing different effects:

$$
\begin{aligned}
\text{Gradient Spell} & : \nabla\varphi = \left(\dfrac{\partial\varphi}{\partial x}, \dfrac{\partial\varphi}{\partial y}, \dfrac{\partial\varphi}{\partial z}\right) \\
        \text{Divergence Spell} & : \nabla\cdot\mathbf{F} = \dfrac{\partial F_x}{\partial x} + \dfrac{\partial F_y}{\partial y} + \dfrac{\partial F_z}{\partial z} \\
        \text{Curl Spell} & : \nabla\times\mathbf{F} = \left(\dfrac{\partial F_z}{\partial y} - \dfrac{\partial F_y}{\partial z}, \dfrac{\partial F_x}{\partial z} - \dfrac{\partial F_z}{\partial x}, \dfrac{\partial F_y}{\partial x} - \dfrac{\partial F_x}{\partial y}\right)
\end{aligned}
$$

In the two-dimensional plane, the $\nabla$ Spell may be defined analogously as:

$$
\nabla_{\text{2D}} = \left(\dfrac{\partial}{\partial x}, \dfrac{\partial}{\partial y}\right),\,
        \nabla_{\text{2D}}\times \mathbf{F}=\dfrac{\partial F_y}{\partial x} - \dfrac{\partial F_x}{\partial y}
$$

\end{definition}

\begin{remark}
When a Continuous Ability Function takes effect, it forms a field. This field is also called an **Ability Field**.
\end{remark}

### Applications of the Nabla Spell
The Nabla Spell $\nabla$ can produce powerful effects. Its principal effect is the **dimensional elevation of the scope of action**.

\begin{theorem}[Gauss Spell Formula]
When the $\nabla$ Spell is combined with the closed surface integral $\displaystyle\oiint$, it can realize the **transformation of the scope of action from a surface domain to a spatial domain**:

$$
\oiint_{\partial V} \mathbf{F}\cdot\mathrm{d}\mathbf{S}=\iiint_V (\nabla\cdot\mathbf{F}) \,\mathrm{d} V
$$

In this case, the range of action expands from the enclosing surface domain of a space to the spatial domain itself.
\end{theorem}

\begin{theorem}[Green Spell Formula]
In the two-dimensional plane, the $\nabla_{\text{2D}}$ Spell is combined with the closed curve integral $\oint$:

$$
\oint_C (L\mathrm{d}x + M\mathrm{d}y) = \iint_D \left(\dfrac{\partial M}{\partial x} - \dfrac{\partial L}{\partial y}\right) \mathrm{d}x\mathrm{d}y
$$

This realizes a transformation of the scope of action from a curve to the plane enclosed by that curve.
\end{theorem}

\begin{theorem}[Stokes Spell Formula]
For a spatial curve, the $\nabla$ Spell is combined with the closed curve integral $\oint$:

$$
\oint_C \mathbf{F}\cdot\mathrm{d}\mathbf{r} = \iint_S (\nabla\times\mathbf{F})\cdot\mathrm{d}\mathbf{S}
$$

In this case, the scope of action is transformed from a spatial curve into a spatial surface.
\end{theorem}
