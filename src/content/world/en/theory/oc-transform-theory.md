---
title: OC Transform Theory
description: The mapping and transformation mechanism from real-world Creator traits to two-dimensional OC traits.
order: 5
---

This chapter systematically presents OC Transform Theory, covering both continuous and discrete models.
This theory explains the mapping and transformation mechanism from real-world individual traits to the traits of a two-dimensional Original Character (OC), and serves as the theoretical foundation of Creator-OC transformation in this worldview.

## Feature Vector Function and Feature Vector Sequence

### Self-Insert OC and OC
In the OC community, the **Creator** is the individual in the real world, and the **Original Character (OC)** is the fictional character in the two-dimensional world. Through creating settings, drawing appearances, writing stories, and other means, the Creator gives the OC its unique traits.

However, the relation between Creator and OC is not a simple one-to-one mapping: one Creator may create multiple OCs. But a Creator may create a **Self-Insert OC**, that is, an OC that in some sense represents the Creator themself. A Self-Insert OC usually carries the Creator's idealized image, emotional projection, or self-expression.

Therefore, there is a much tighter trait relation between a Self-Insert OC and the Creator, and this relation can be quantified through OC Transform Theory. In other words, **an OC Transform is in fact the mapping process from the Creator's traits to the traits of their Self-Insert OC**. All OCs are related to the Creator's traits, but only the traits of a Self-Insert OC directly reflect the properties of the Creator.

For a Creator, as long as an OC exists, an OC Transform can be carried out mathematically; but for an OC, only when it is a Self-Insert OC is the OC Transform physically realized in \wkn{}'s worldview.

### Definitions of Feature Vector Function and Feature Vector Sequence

Any character, whether a real-world individual or a fictional figure in a two-dimensional world, can be completely described by a set of features.
These features form the character's "identity fingerprint," uniquely representing the character's core properties. In the real world, such features may include physiological traits
(such as height and weight), psychological traits (such as personality tendencies and emotional states), social traits (such as occupation and interpersonal relations), and so on; in the two-dimensional world,
the character's traits may instead take the form of more abstract artistic properties (such as moe attributes, character settings, plot functions, and so on).

In order to establish a unified mathematical framework for describing the evolution of character traits, we introduce the concept of the **Feature Vector**. At any given moment,
the state of a character can be represented by a multidimensional vector, where each component corresponds to a particular feature attribute. This representation can capture not only the static traits of a character,
but also the dynamic process by which those traits change over time.

Based on this idea, we define the following unified framework of the Feature Vector Function and the Feature Vector Sequence.

\begin{definition}[Feature Vector Function]
Suppose the features of the real world are described by $N$ quantifiable attributes, and the features of an OC are described by $M$ abstract attributes.

The **real-world Feature Vector Function (Real-world Feature Vector Function)** is the $N$-dimensional column vector:

$$
\mathbf{r}(t)=\bigl[r_1(t),\,r_2(t),\,\dots,\,r_N(t)\bigr]^{\mathsf{T}},
$$

where the component $r_i(t)$ is a quantifiable real-world attribute varying continuously with time.

The **OC Feature Vector Function** is the $M$-dimensional column vector:

$$
\mathbf{q}(t)=\bigl[q_1(t),\,q_2(t),\,\dots,\,q_M(t)\bigr]^{\mathsf{T}},
$$

where the component $q_j(t)$ represents an abstract attribute of the OC varying continuously with time.
\end{definition}

Sampling a continuous signal at interval $T_s$ yields a discrete sequence, namely the Feature Vector Sequence.

\begin{definition}[Feature Vector Sequence]
The **real-world Feature Vector Sequence (Real-world Feature Vector Sequence)** is the $N$-dimensional column vector:

$$
\mathbf{r}[n]=\bigl[r_1[n],\,r_2[n],\,\dots,\,r_N[n]\bigr]^{\mathsf{T}},\quad n\in\mathbb{Z},
$$

where $r_i[n]=r_i(nT_s)$ is the sampled discrete sequence component.

The **OC Feature Vector Sequence (OC Feature Vector Sequence)** is the $M$-dimensional column vector:

$$
\mathbf{q}[n]=\bigl[q_1[n],\,q_2[n],\,\dots,\,q_M[n]\bigr]^{\mathsf{T}},\quad n\in\mathbb{Z},
$$

where $q_j[n]=q_j(nT_s)$ is the sampled discrete sequence component.
\end{definition}

\begin{remark}
The components $r_i(t)$, $q_j(t)$, $r_i[n]$, and $q_j[n]$ of these functions or sequences are all real-valued functions or sequences, and are **causal**, that is, zero for $t<0$ or $n<0$. This assumption of causality reflects the **directionality of time** in the evolution of character traits: changes in traits may depend only on the present and past states, but not on future information.
\end{remark}

## Continuous-Time OC Transform

In the real world, the traits of an individual vary continuously over time; the traits of a two-dimensional OC do as well.
Therefore, the Continuous-Time OC Transform is the most natural model.

### Time-Domain Description

\begin{theorem}[Time-Domain Description of the Continuous-Time OC Transform]
The **Continuous-Time OC Transform** is realized by a multi-input multi-output continuous LTI system, whose input-output relation is given by the convolution integral

$$
\mathbf{q}(t)=\int_{-\infty}^{\infty}\mathbf{H}(\tau)\mathbf{r}(t-\tau)\,\mathrm{d}\tau = \mathbf{H}(t)*\mathbf{r}(t),

$$

where

$$
\mathbf{H}(\tau) = \begin{bmatrix}
            h_{11}(\tau) & h_{12}(\tau) & \cdots & h_{1N}(\tau) \\
            h_{21}(\tau) & h_{22}(\tau) & \cdots & h_{2N}(\tau) \\
            \vdots       & \vdots       & \ddots & \vdots       \\
            h_{M1}(\tau) & h_{M2}(\tau) & \cdots & h_{MN}(\tau)
        \end{bmatrix}
        \in\mathbb{R}^{M\times N}
$$

is called the system's **Continuous OC Impulse-Response Matrix**, and the corresponding system is called the **Continuous-Time OC Transform System**.
\end{theorem}

\begin{remark}
1. $\mathbf{H}(t)$ is causal. That is, $h_{ij}(t)=0$ when $t<0$, reflecting that the generation of OC traits can depend only on the past states of real-world traits.
2. Equation the relevant equation shows that the current OC feature vector $\mathbf{q}(t)$ depends on the entire history of the real-world feature vector $\mathbf{r}(t)$, and $\mathbf{H}(\tau)$ quantifies the influence weight of each historical moment on the present.
3. Note that the convolution here is a **one-dimensional temporal convolution** along the time variable $t$, not the two-dimensional spatial convolution used in image processing. Two-dimensional convolution usually slides a kernel over the two spatial coordinates of the pixel plane for image filtering, edge detection, and similar tasks; by contrast, Equation the relevant equation describes the accumulated influence across historical time.
4. For the $i$-th component of the output vector $\mathbf{q}(t)$, we have

$$
q_i(t) = \int_{-\infty}^{\infty} \left[ \sum_{j=1}^{N} h_{ij}(\tau) r_j(t-\tau) \right] \mathrm{d}\tau
                  = \sum_{j=1}^{N} \int_{-\infty}^{\infty} h_{ij}(\tau) r_j(t-\tau) \, \mathrm{d}\tau
$$

              that is,
              each output component $q_i(t)$ is the superposition of the convolutions between all input components $r_j(t)$ and the corresponding impulse-response functions $h_{ij}(\tau)$:

$$
q_i(t) = \sum_{j=1}^{N} (h_{ij} * r_j)(t)
$$

\end{remark}

### $s$-Domain Description

Since convolution is cumbersome to compute in the time domain, we introduce the Laplace transform to convert time-domain convolution into multiplication in the $s$-domain, thereby simplifying description and analysis.

\begin{definition}[Laplace Transform]
For any continuous function $f(t)$, its Laplace transform (also called the bilateral Laplace transform) is defined by

$$
\tilde{F}(s)=\mathcal{L}\{f(t)\}=\int_{-\infty}^{\infty}\mathrm{e}^{-st}f(t)\,\mathrm{d} t,\quad s=\sigma+\mj\omega.
$$

\end{definition}

\begin{theorem}[$s$-Domain Description of the OC Transform]
Apply the Laplace transform to each element of $\mathbf{r}(t)$, $\mathbf{q}(t)$, and $\mathbf{H}(\tau)$, and write

$$
\tilde{\mathbf{R}}(s)=\mathcal{L}\{\mathbf{r}(t)\},\quad
        \tilde{\mathbf{Q}}(s)=\mathcal{L}\{\mathbf{q}(t)\},\quad
        \tilde{\mathbf{H}}(s)=\mathcal{L}\{\mathbf{H}(\tau)\}.
$$

Then in the $s$-domain,

$$
\tilde{\mathbf{Q}}(s)=\tilde{\mathbf{H}}(s)\tilde{\mathbf{R}}(s),
$$

where $\tilde{\mathbf{H}}(s)$ is called the system's **Continuous OC Transfer-Function Matrix**.
\end{theorem}

\begin{remark}
To use the $s$-domain description of the OC Transform, it is necessary that $\mathbf{r}(t)$ and $\mathbf{H}(t)$ themselves be causal and satisfy the convergence conditions of the Laplace transform.
If they are not causal, a one-sided Laplace transform will lose signal content and cause an incorrect transform; if the convergence conditions are not satisfied, the Laplace transform is undefined.
\end{remark}

For convenience in describing the Laplace transform, we can use a **pole-zero plot** to represent the properties of the transfer-function matrix $\tilde{\mathbf{H}}(s)$.

\begin{definition}[Pole-Zero Plot]
For each element $h_{ij}(s)$ of the transfer-function matrix $\tilde{\mathbf{H}}(s)$, the **zeros** are the complex values of $s$ that make the numerator zero, and the **poles** are the complex values of $s$ that make the denominator zero.
A **pole-zero plot** is a diagram showing the locations of zeros and poles in the complex plane.
\end{definition}

\begin{remark}
For the Laplace transform $\tilde{\mathbf{H}}(s)$ of the matrix-valued function $\mathbf{H}(t)$, its pole-zero plot has the following properties:

1. **Pole origin**: the poles of $\tilde{\mathbf{H}}(s)$ come from the common zeros of the denominators of its elements.

2. **Vertical boundary of the region of convergence**: in the complex plane, the ROC is bounded by a vertical line $\operatorname{Re}(s) = \sigma_c$, where $\sigma_c$ is the real part of the rightmost pole of $\tilde{\mathbf{H}}(s)$.

3. **Region partition**: this vertical line divides the complex plane into two regions:
              - Right side ($\operatorname{Re}(s) > \sigma_c$): $\tilde{\mathbf{H}}(s)$ converges and is analytic
- Left side ($\operatorname{Re}(s) < \sigma_c$): $\tilde{\mathbf{H}}(s)$ diverges or contains poles

4. **Matrix integrity**: the ROC of the entire matrix $\tilde{\mathbf{H}}(s)$ is determined by the narrowest ROC among all its elements, namely by the largest real part among all poles.
\end{remark}

The pole-zero plot records the poles, zeros, and region of convergence of the OC Transform system. Pole-zero cancellation may affect stability and response characteristics, so the web version retains the qualitative conclusion rather than the illustrative example.

### Continuous-Time OC Existence Theorem

Every person inherently possesses a real-world Feature Vector Function $\mathbf{r}(t)$ and a self-referential OC impulse-response matrix $\mathbf{H}(t)$. Only when these two objects satisfy the following conditions can a valid OC feature vector $\mathbf{q}(t)$ actually be generated through convolution; only then do we say that "this person has that OC."

\begin{theorem}[Continuous-Time OC Existence Theorem]
In the OC Transform axiom system of \wkn{}'s worldview, given a person's $\mathbf{r}(t)$ and $\mathbf{H}(t)$, the **necessary and sufficient conditions** for that person to have the OC are that the following two groups of conditions hold simultaneously:
1. **Adaptability of the Real-World Feature Vector Function**: $\mathbf{r}(t)$ is causal, admits a Laplace transform, and does not cause divergence when acted on by the system.
              2. $\mathbf{r}(t)=0$ for $t<0$.
                        The equivalent $s$-domain statement is that the region of convergence of $\tilde{\mathbf{R}}(s)$ contains some right half-plane $\mathrm{Re}(s)>\sigma_r$.
3. The region of convergence of $\tilde{\mathbf{R}}(s)$ contains the imaginary axis. This is a necessary condition for ensuring that the real-world character setting does not collapse.
1. **Regularity of the OC Transform System**: $\mathbf{H}(t)$ is causal and stable.
              - **Causality**: $\mathbf{H}(t)=0$ for all $t<0$.
- **Stability**: every element $h_{ij}(t)$ of $\mathbf{H}(t)$ is absolutely integrable:

$$
\int_0^\infty |h_{ij}(\tau)| \, \mathrm{d}\tau < \infty, \quad \forall i,j
$$

- $s$-domain necessary statement: the region of convergence of $\tilde{\mathbf{H}}(s)$ contains some right half-plane $\mathrm{Re}(s)>\sigma_{\mathbf{H}}$ and contains the imaginary axis.
\end{theorem}

\begin{remark}
1. The above "necessary and sufficient conditions" are an internal OC existence criterion within \wkn{}'s worldview, not a complete classification of input-output legitimacy for general LTI systems in real signal-processing theory.
2. When $\mathbf{r}(t)$ and $\mathbf{H}(t)$ satisfy the above conditions, the convolution integral the relevant equation converges and produces a valid OC feature vector $\mathbf{q}(t)$.
3. In the $s$-domain, there is no equivalent description of causality; causality can only be judged together with the time-domain description. Stability, however, can be described by the ROC of $\tilde{\mathbf{H}}(s)$.
4. The adaptability of the real-world Feature Vector Function $\mathbf{r}(t)$ ensures that the OC Feature Vector Function $\mathbf{q}(t)$ does not collapse because of abnormalities in the real-world traits.
5. The regularity of the OC Transform system ensures that the generation process of the OC Feature Vector Function $\mathbf{q}(t)$ is stable and does not diverge or become unstable because of abnormalities in the system's impulse-response matrix $\mathbf{H}(t)$.
6. When these conditions are satisfied, the time-domain convolution integral and the Laplace transform can both be changed to one-sided forms, considering only the $t>0$ portion. That is,

$$
\mathbf{q}(t) = \int_0^\infty \mathbf{H}(\tau) \mathbf{r}(t-\tau) \, \mathrm{d}\tau
$$

              and the Laplace transform definition can be rewritten as

$$
\tilde{F}(s)=\mathcal{L}\{f(t)\}=\int_0^\infty\mathrm{e}^{-st}f(t)\,\mathrm{d} t,\quad s=\sigma+\mj\omega.
$$

7. In practical terms: when a Creator is said to "have an OC," whether or not it is a Self-Insert OC, the above conditions must hold. At that point, an OC Transform can be performed mathematically.
8. But in \wkn{}'s worldview, only when that OC is a Self-Insert OC is the OC Transform physically realized, meaning that the OC Feature Vector Function $\mathbf{q}(t)$ generated by the Creator through OC Transform can actually exist in the two-dimensional world.
\end{remark}

### Continuous-Time Inverse OC Transform and Invertibility

\begin{definition}[Continuous-Time Invertible OC System]
For a Continuous-Time OC Transform system described by a causal, stable transfer-function matrix $\tilde{\mathbf{H}}(s) \in \mathbb{C}^{M \times N}$, if there exists another causal, stable LTI system $\tilde{\mathbf{G}}(s) \in \mathbb{C}^{N \times M}$ such that within the region of convergence,

$$
\tilde{\mathbf{G}}(s) \tilde{\mathbf{H}}(s) = \mathbf{I}_N,
$$

then the original OC Transform system is called **invertible**, and $\tilde{\mathbf{G}}(s)$ is called its **inverse system**.
\end{definition}

\begin{definition}[Continuous-Time OC Inverse Transform]
For an invertible Continuous-Time OC Transform system, its **inverse transform** is the transformation process realized by the inverse system $\tilde{\mathbf{G}}(s)$. In the time domain, this inverse transform is given by the following convolution integral:

$$
\mathbf{r}(t) = \int_{0}^{\infty} \mathbf{G}(\tau) \mathbf{q}(t-\tau) \, \mathrm{d}\tau,

$$

where $\mathbf{G}(\tau) = \mathcal{L}^{-1}\{\tilde{\mathbf{G}}(s)\}$ is the inverse system's Continuous OC Impulse-Response Matrix. This process can uniquely recover the real-world description $\mathbf{r}(t)$ from the OC feature vector $\mathbf{q}(t)$.
\end{definition}

\begin{theorem}[Criterion for Existence of the Continuous-Time OC Inverse Transform]

In the OC Transform axiom system of \wkn{}'s worldview, for a Continuous-Time OC Transform described by a rational matrix $\tilde{\mathbf{H}}(s)\in\mathbb{C}^{M \times N}$, a causal, stable left inverse system $\tilde{\mathbf{G}}(s)\in\mathbb{C}^{N \times M}$ exists if and only if the following conditions all hold:

1. **Forward-system property:** the original system $\tilde{\mathbf{H}}(s)$ itself is causal and stable.
2. **Dimensionality condition:** the dimension of the real-world feature space does not exceed the dimension of the OC feature space, that is,

$$
N \leq M.
$$

3. **Column-full-rank condition:** the original system $\tilde{\mathbf{H}}(s)$ has full column rank in the closed right half-plane, that is,

$$
\operatorname{rank}(\tilde{\mathbf{H}}(s)) = N,\quad \forall s\in\mathbb{C}\ \text{and}\ \operatorname{Re}(s)\geq 0.
$$

4. **Stable left-inverse condition:** there exists a rational matrix $\tilde{\mathbf{G}}(s)$ satisfying $\tilde{\mathbf{G}}(s)\tilde{\mathbf{H}}(s)=\mathbf{I}_N$, and all poles of $\tilde{\mathbf{G}}(s)$ lie strictly in the left half-plane:

$$
\{\,s\in\mathbb{C}\mid s\ \text{is a pole of}\ \tilde{\mathbf{G}}(s)\,\}
                  \subset
                  \{s\in\mathbb{C}:\mathrm{Re}(s)<0\}.
$$

\end{theorem}

\begin{remark}
1. Only when $\tilde{\mathbf{H}}(s)$ is causal and stable does the Continuous-Time OC inverse transform make sense.
2. When $N > M$, the system is intrinsically compressive, and the higher-dimensional real-world feature cannot be uniquely determined from the lower-dimensional OC feature; in this case, the inverse transform does not exist.
3. The second and third conditions exclude dimension compression and rank loss in the closed right half-plane, which are necessary constraints for stable inversion.
4. The fourth condition is an internal realizability axiom of the worldview: if the formal inverse system has poles in the right half-plane, the inverse transform can be written algebraically but cannot be implemented as a stable OC inverse-transform system.
5. In practical terms: a Creator may designate anything as their own "OC," even if that "OC" is not a character in the usual sense. When that "OC" satisfies the above criterion, after the Creator transforms into their own "OC," the real-world features can be uniquely recovered through the inverse transform.
6. The phrase "if and only if" here is an internal axiomatic criterion of \wkn{}'s worldview; if the model is regarded as a general MIMO LTI system in real control theory, additional system-theoretic analysis is required. This is equivalent to the Creator's OC being sufficiently distinctive, so that the inverse transform does not cease to exist and the feature map between the Creator and the "OC" remains bidirectional.
7. Likewise, only when that "OC" is a Self-Insert OC can the OC inverse transform be physically realized.
\end{remark}

\begin{theorem}[Construction of the Formal Inverse System]
When Theorem the relevant section is satisfied, the inverse system can be constructed as follows, and its belonging to the stable OC inverse-transform class is judged by its pole conditions:

1. **When $M = N$**:
              the formal inverse system is obtained directly by matrix inversion:

$$
\tilde{\mathbf{G}}(s) = \tilde{\mathbf{H}}(s)^{-1}.
$$

2. **When $M > N$**:
              a commonly used formal left inverse is given by the Moore-Penrose pseudoinverse:

$$
\tilde{\mathbf{G}}(s)=\tilde{\mathbf{H}}^{\sharp}(s) = \left( \tilde{\mathbf{H}}(s)^\dagger \tilde{\mathbf{H}}(s) \right)^{-1} \tilde{\mathbf{H}}(s)^\dagger,
$$

              where $^\dagger$ denotes conjugate transpose.
\end{theorem}

\begin{remark}
The pseudoinverse above is a formal construction in the frequency domain. In \wkn{}'s worldview, if the obtained $\tilde{\mathbf{G}}(s)$ satisfies the pole condition, then it is defined as an implementable OC inverse-transform system; if not, it is retained only as a formal inversion and does not have stable physical realizability.
\end{remark}

## Discrete-Time OC Transform

In computer-system implementations, both real-world traits and OC traits appear in the form of discrete sequences, so the Discrete-Time OC Transform is required. In addition, for local transformations of an OC, the discrete model is more suitable.

### Time-Domain Description

\begin{theorem}[Time-Domain Description of the Discrete-Time OC Transform]
The **Discrete-Time OC Transform** is still a multi-input multi-output LTI system, whose input-output relation is given by the convolution sum

$$
\mathbf{q}[n]=\sum_{k=-\infty}^{\infty}\mathbf{H}[k]\mathbf{r}[n-k]=\mathbf{H}[n]*\mathbf{r}[n],

$$

where

$$
\mathbf{H}[k] = \begin{bmatrix}
            h_{11}[k] & h_{12}[k] & \cdots & h_{1N}[k] \\
            h_{21}[k] & h_{22}[k] & \cdots & h_{2N}[k] \\
            \vdots    & \vdots    & \ddots & \vdots    \\
            h_{M1}[k] & h_{M2}[k] & \cdots & h_{MN}[k] \\
        \end{bmatrix}
$$

is the system's **Discrete OC Impulse-Response Matrix**, and the corresponding system is called the **Discrete-Time OC Transform System**.
\end{theorem}

\begin{remark}
Equation the relevant equation shows that the current OC feature vector $\mathbf{q}[n]$ depends on the entire history of the real-world feature vector $\mathbf{r}[n]$, and $\mathbf{H}[k]$ quantifies the influence weight of each historical moment on the present.
For the $i$-th component of the output vector $\mathbf{q}[n]$, we have

$$
q_i[n] = \sum_{k=-\infty}^{\infty} \left[ \sum_{j=1}^{N} h_{ij}[k] r_j[n-k] \right]
        = \sum_{j=1}^{N} \sum_{k=-\infty}^{\infty} h_{ij}[k] r_j[n-k]
$$

that is,
each output component $q_i[n]$ is the superposition of the convolutions between all input components $r_j[n]$ and the corresponding discrete impulse-response functions $h_{ij}[k]$:

$$
q_i[n] = \sum_{j=1}^{N} (h_{ij} * r_j)[n]
$$

\end{remark}

### $z$-Domain Description

As in the continuous-time case, the discrete-time convolution sum is cumbersome to compute in the time domain, so we introduce the $Z$ transform to convert time-domain convolution into multiplication in the $z$-domain, thereby simplifying description and analysis.

\begin{definition}[$Z$ Transform]
For any discrete sequence $f[n]$, its $Z$ transform is defined by

$$
\tilde{F}(z)=\mathcal{Z}\{f[n]\}=\sum_{n=-\infty}^{\infty}f[n]z^{-n},\quad z=A\mathrm{e}^{\mj\omega}.
$$

\end{definition}

\begin{theorem}[$z$-Domain Description of the OC Transform]
Apply the $Z$ transform to each element of $\mathbf{r}[n]$, $\mathbf{q}[n]$, and $\mathbf{H}[k]$, and write

$$
\tilde{\mathbf{R}}(z)=\mathcal{Z}\{\mathbf{r}[n]\},\quad
        \tilde{\mathbf{Q}}(z)=\mathcal{Z}\{\mathbf{q}[n]\},\quad
        \tilde{\mathbf{H}}(z)=\mathcal{Z}\{\mathbf{H}[k]\}.
$$

Then in the $z$-domain,

$$
\tilde{\mathbf{Q}}(z)=\tilde{\mathbf{H}}(z)\tilde{\mathbf{R}}(z),
$$

where $\tilde{\mathbf{H}}(z)$ is called the system's **Discrete OC Transfer-Function Matrix**.
\end{theorem}

Like the continuous-time case, we can use a **pole-zero plot** to represent the properties of the transfer-function matrix $\tilde{\mathbf{H}}(z)$.

\begin{definition}[Pole-Zero Plot ($z$ Domain)]
For each element $h_{ij}(z)$ of the discrete transfer-function matrix $\tilde{\mathbf{H}}(z)$, the **zeros** are the complex values of $z$ that make the numerator zero, and the **poles** are the complex values of $z$ that make the denominator zero.
A **pole-zero plot** in the $z$ plane is a diagram showing the positions of these zeros and poles.
\end{definition}

\begin{remark}
For the $Z$ transform $\tilde{\mathbf{H}}(z)$ of the matrix-valued sequence $\mathbf{H}[n]$, its pole-zero plot has the following key properties:

1. **Pole origin**: the poles of $\tilde{\mathbf{H}}(z)$ come from the common zeros of the denominators of its elements.

2. **Circular boundary of the region of convergence**: in the $z$ plane, the ROC is bounded by the circle $|z| = R_c$, where $R_c$ is the magnitude of the outermost pole of $\tilde{\mathbf{H}}(z)$.

3. **Region partition**: this circle divides the $z$ plane into two regions:
              - Outside the circle ($|z| > R_c$): $\tilde{\mathbf{H}}(z)$ converges and is analytic
- Inside the circle ($|z| < R_c$): $\tilde{\mathbf{H}}(z)$ diverges or contains poles

4. **Matrix integrity**: the ROC of the entire matrix $\tilde{\mathbf{H}}(z)$ is determined by the narrowest ROC among all its elements, namely by the largest pole magnitude among all poles.
\end{remark}

The discrete pole-zero plot similarly records poles, zeros, and the circular region of convergence in the $z$ plane. Pole-zero cancellation and poles close to the unit circle may affect stability and decay behavior, so the web version retains the qualitative conclusion rather than the illustrative example.

### Discrete-Time OC Existence Theorem

Every person inherently possesses a real-world Feature Vector Sequence $\mathbf{r}[n]$ and a self-referential OC impulse-response matrix $\mathbf{H}[n]$. Only when these two objects satisfy the following conditions can a valid OC feature vector $\mathbf{q}[n]$ actually be generated through the convolution sum; only then do we say that "this person has that OC."

\begin{theorem}[Discrete-Time OC Existence Theorem]
In the OC Transform axiom system of \wkn{}'s worldview, given a person's $\mathbf{r}[n]$ and $\mathbf{H}[n]$, the **necessary and sufficient conditions** for that person to have the OC are that the following two groups of conditions hold simultaneously:
1. **Adaptability of the Real-World Feature Vector Sequence**: $\mathbf{r}[n]$ is causal, admits a $Z$ transform, and does not cause divergence when acted on by the system.
              2. $\mathbf{r}[n]=0$ for $n<0$.
                        The equivalent $z$-domain statement is that the region of convergence of $\tilde{\mathbf{R}}(z)$ contains some exterior region $|z|>R_r$ and contains $z=\infty$.
3. The region of convergence of $\tilde{\mathbf{R}}(z)$ contains the unit circle. This is a necessary condition for ensuring that the real-world character setting does not collapse.
1. **Regularity of the OC Transform System**: $\mathbf{H}[n]$ is causal and stable.
              - **Causality**: $\mathbf{H}[n]=0$ for all $n<0$.
- **Stability**: every element $h_{ij}[n]$ of $\mathbf{H}[n]$ is absolutely summable:

$$
\sum_{n=0}^\infty |h_{ij}[n]| < \infty, \quad \forall i,j
$$

- **Equivalent $z$-domain statement**: the region of convergence of $\tilde{\mathbf{H}}(z)$ is some exterior region $|z|>R_{\text{max}}$, and contains the unit circle $|z|=1$ and infinity $z=\infty$.
\end{theorem}

\begin{remark}
1. The above "necessary and sufficient conditions" are an internal OC existence criterion within \wkn{}'s worldview, not a complete classification of input-output legitimacy for general LTI systems in real discrete-time signal-processing theory.
2. Unlike the Continuous-Time OC Transform, the $z$-domain description does have an equivalent expression for causality, namely that the ROC contains $z=\infty$.
3. When these conditions are satisfied, the time-domain convolution sum and the $Z$ transform can both be replaced by one-sided forms, namely

$$
\mathbf{q}[n] = \sum_{k=0}^{\infty} \mathbf{H}[k] \mathbf{r}[n-k]
$$

              and the definition of the $Z$ transform can be rewritten as

$$
\tilde{F}(z)=\mathcal{Z}\{f[n]\}=\sum_{n=0}^{\infty}f[n]z^{-n},\quad z=A\mathrm{e}^{\mj\omega}.
$$

\end{remark}

### Discrete-Time OC Inverse Transform and Invertibility

\begin{definition}[Discrete-Time Invertible OC System]
For a Discrete-Time OC Transform system described by a causal, stable transfer-function matrix $\tilde{\mathbf{H}}(z) \in \mathbb{C}^{M \times N}$, if there exists another causal, stable LTI system $\tilde{\mathbf{G}}(z) \in \mathbb{C}^{N \times M}$ such that within the region of convergence,

$$
\tilde{\mathbf{G}}(z) \tilde{\mathbf{H}}(z) = \mathbf{I}_N,
$$

then the original OC Transform system is called **invertible**, and $\tilde{\mathbf{G}}(z)$ is called its **inverse system**.
\end{definition}

\begin{definition}[Discrete-Time OC Inverse Transform]
For an invertible Discrete-Time OC Transform system, its **inverse transform** is the transformation process realized by the inverse system $\tilde{\mathbf{G}}(z)$. In the time domain, this inverse transform is given by the following convolution sum:

$$
\mathbf{r}[n] = \sum_{k=0}^{\infty} \mathbf{G}[k] \mathbf{q}[n-k],

$$

where $\mathbf{G}[k] = \mathcal{Z}^{-1}\{\tilde{\mathbf{G}}(z)\}$ is the inverse system's Discrete OC Impulse-Response Matrix. This process can uniquely recover the real-world description $\mathbf{r}[n]$ from the OC feature vector $\mathbf{q}[n]$.
\end{definition}

\begin{theorem}[Criterion for Existence of the Discrete-Time OC Inverse Transform]

In the OC Transform axiom system of \wkn{}'s worldview, for a Discrete-Time OC Transform described by a rational matrix $\tilde{\mathbf{H}}(z)\in\mathbb{C}^{M \times N}$, a causal, stable left inverse system $\tilde{\mathbf{G}}(z)\in\mathbb{C}^{N \times M}$ exists if and only if the following conditions all hold:

1. **Forward-system property:** the original system $\tilde{\mathbf{H}}(z)$ itself is causal and stable.
2. **Dimensionality condition:** the dimension of the real-world feature space does not exceed the dimension of the OC feature space, that is,

$$
N \leq M.
$$

3. **Full-rank condition:** the original system $\tilde{\mathbf{H}}(z)$ has full column rank, that is,

$$
\operatorname{rank}(\tilde{\mathbf{H}}(z)) = N,\quad \forall z\in\mathbb{C}\ \text{and}\ |z|\geq 1.
$$

              An equivalent statement is that the column vectors of $\tilde{\mathbf{H}}(z)$ are linearly independent, or equivalently, when $\tilde{\mathbf{H}}(z)$ is viewed as a linear map matrix, the corresponding map is injective.
4. **Stable left-inverse condition:** there exists a rational matrix $\tilde{\mathbf{G}}(z)$ satisfying $\tilde{\mathbf{G}}(z)\tilde{\mathbf{H}}(z)=\mathbf{I}_N$, and all poles of $\tilde{\mathbf{G}}(z)$ lie strictly inside the unit circle:

$$
\{\,z\in\mathbb{C}\mid z\ \text{is a pole of}\ \tilde{\mathbf{G}}(z)\,\}
                  \subset
                  \{z\in\mathbb{C}:|z|<1\}.
$$

\end{theorem}

\begin{remark}
The phrase "if and only if" here is an internal axiomatic criterion of \wkn{}'s worldview. If the model is regarded as a general MIMO LTI system in real discrete-time control theory, additional analysis of stable left inverses, zeros, and realizability is still required.
\end{remark}

\begin{theorem}[Construction of the Formal Inverse System]
When Theorem the relevant section is satisfied, the inverse system can be constructed as follows, and its belonging to the stable OC inverse-transform class is judged by its pole conditions:

1. **When $M = N$**:
              the formal inverse system is obtained directly by matrix inversion:

$$
\tilde{\mathbf{G}}(z) = \tilde{\mathbf{H}}(z)^{-1}.
$$

2. **When $M > N$**:
              a commonly used formal left inverse is given by the Moore-Penrose pseudoinverse:

$$
\tilde{\mathbf{G}}(z)=\tilde{\mathbf{H}}^{\sharp}(z) = \left( \tilde{\mathbf{H}}(z)^\dagger \tilde{\mathbf{H}}(z) \right)^{-1} \tilde{\mathbf{H}}(z)^\dagger,
$$

              where $^\dagger$ denotes conjugate transpose.
\end{theorem}

## Sampling Theory from Feature Vector Function to Feature Vector Sequence

When a Creator in the real world crosses into the two-dimensional world to become their Self-Insert OC, or when a Self-Insert OC returns from the two-dimensional world to the real world, an OC Transform or inverse transform is required.
This process includes:
1. the transformation from the real-world Feature Vector Function to the OC Feature Vector Function, where the Continuous-Time OC Transform occurs;
2. the transformation from the OC Feature Vector Function back to the real-world Feature Vector Function, where the Continuous-Time OC inverse transform occurs.

In the process of computing the Continuous-Time OC Transform and inverse transform, manual calculation is obviously impossible. For this reason, OC designers, artists, computer experts, and others jointly design the **automatic OC transform machine**. The automatic OC transform machine cannot directly process continuous Feature Vector Functions; it can only process discrete Feature Vector Sequences. Therefore, its implementation must combine sampling theory and discretize the Continuous-Time OC Transform into a Discrete-Time OC Transform.

### Sampling Process and Spectrum Analysis

\begin{definition}[Sampling Process of the OC Transform]
Uniformly sample the Continuous-Time real-world Feature Vector Function $\mathbf{r}(t)$ with sampling interval $T_s$ to obtain the discrete sequence:

$$
\mathbf{r}[n] = \mathbf{r}(nT_s), \quad n \in \mathbb{Z}
$$

Correspondingly, the Continuous OC Impulse-Response Matrix $\mathbf{H}(t)$ is also discretized as:

$$
\mathbf{H}[n] = \mathbf{H}(nT_s), \quad n \in \mathbb{Z}
$$

\end{definition}

\begin{remark}
This uses an idealized impulse-response sampling model. In general, simply setting $\mathbf{H}[n]=\mathbf{H}(nT_s)$ does not necessarily yield a discrete-time system exactly equivalent to the original continuous-time system; real engineering implementations also need to consider hold devices, anti-aliasing filters, DACs, and the specific discretization method. The sampling-theorem discussion below concerns the ideal lossless-information case under ideal bandlimiting and ideal reconstruction.
\end{remark}

Based on the existence theorem analysis, whether in continuous-time or discrete-time OC Transform, the impulse-response matrix $\mathbf{H}(t)$ or $\mathbf{H}[n]$ is stable and has a Fourier transform. Therefore, frequency-domain methods can be used to analyze the sampling process.

\begin{theorem}[Frequency-Domain Relation of the Sampled OC Transform]
Suppose the Continuous-Time OC Transform satisfies in the frequency domain:

$$
\tilde{\mathbf{Q}}(\mj\omega) = \tilde{\mathbf{H}}(\mj\omega) \tilde{\mathbf{R}}(\mj\omega)
$$

where $\tilde{\mathbf{R}}(\mj\omega)$, $\tilde{\mathbf{H}}(\mj\omega)$, and $\tilde{\mathbf{Q}}(\mj\omega)$ are the continuous-time Fourier transforms of $\mathbf{r}(t)$, $\mathbf{H}(t)$, and $\mathbf{q}(t)$, respectively.

The sampled discrete-time system satisfies in the frequency domain:

$$
\tilde{\mathbf{Q}}(\mathrm{e}^{\mj\varOmega}) = \dfrac{1}{T_s} \sum_{k=-\infty}^{\infty} \tilde{\mathbf{H}}\left(\dfrac{\varOmega + 2\pi k}{T_s}\right) \tilde{\mathbf{R}}\left(\dfrac{\varOmega + 2\pi k}{T_s}\right)
$$

where $\varOmega = \omega T_s$ is the digital angular frequency.
\end{theorem}

### Distortion-Free Sampling Conditions

\begin{theorem}[Distortion-Free Sampling Conditions for the OC Transform]
To recover the Continuous-Time OC feature vector $\mathbf{q}(t)$ without distortion from the discrete OC sequence $\mathbf{q}[n]$, the following three conditions must all be satisfied simultaneously:

1. **Bandwidth limitation of the real-world description**: the real-world Feature Vector Function $\mathbf{r}(t)$ is band-limited, i.e., there exists $\omega_r^{\text{max}}$ such that:

$$
\tilde{\mathbf{R}}(\mj\omega) = \mathbf{0}, \quad \forall |\omega| > \omega_r^{\text{max}}
$$

2. **Bandwidth limitation of the system**: the transfer-function matrix corresponding to the OC impulse-response matrix $\mathbf{H}(t)$ is band-limited, i.e., there exists $\omega_h^{\text{max}}$ such that:

$$
\tilde{\mathbf{H}}(\mj\omega) = \mathbf{0}, \quad \forall |\omega| > \omega_h^{\text{max}}
$$

3. **Sampling-rate requirement**: the sampling frequency $\displaystyle\omega_s = \dfrac{2\pi}{T_s}$ satisfies:

$$
\omega_s > 2 \cdot \min(\omega_r^{\text{max}}, \omega_h^{\text{max}})

$$

\end{theorem}

\begin{proof}
To prove the minimum sampling rate required for distortion-free recovery of $\mathbf{q}(t)$, we analyze the bandwidth of $\mathbf{q}(t)$.

In the frequency domain, the system output is:

$$
\mathbf{Q}(\mj\omega) = \mathbf{H}(\mj\omega) \mathbf{R}(\mj\omega).
$$

We know:

$$
\begin{aligned}
\mathbf{R}(\mj\omega) & = \mathbf{0}, \quad \forall |\omega| > \omega_r^{\max}, \\
        \mathbf{H}(\mj\omega) & = \mathbf{0}, \quad \forall |\omega| > \omega_h^{\max}.
\end{aligned}
$$

Consider the value of $\mathbf{Q}(\mj\omega)$ for $|\omega| > \min(\omega_r^{\max}, \omega_h^{\max})$.
Without loss of generality, assume $\omega_r^{\max} \le \omega_h^{\max}$, then when $|\omega| > \omega_r^{\max}$ we have $\mathbf{R}(\mj\omega) = \mathbf{0}$.
Therefore, for $|\omega| > \omega_r^{\max}$:

$$
\mathbf{Q}(\mj\omega) = \mathbf{H}(\mj\omega) \cdot \mathbf{0} = \mathbf{0}.
$$

Likewise, if $\omega_h^{\max} \le \omega_r^{\max}$, then when $|\omega| > \omega_h^{\max}$, $\mathbf{H}(\mj\omega) = \mathbf{0}$, which also yields $\mathbf{Q}(\mj\omega) = \mathbf{0}$.

Hence the bandwidth upper bound of $\mathbf{Q}(\mj\omega)$ is:

$$
B_q = \min(\omega_r^{\max}, \omega_h^{\max}).
$$

According to the Nyquist-Shannon sampling theorem, to recover $\mathbf{q}(t)$ without distortion from the sampled sequence $\mathbf{q}[n] = \mathbf{q}(nT_s)$, the sampling frequency must satisfy:

$$
\omega_s > 2 B_q = 2 \min(\omega_r^{\max}, \omega_h^{\max}).
$$

\end{proof}

### Reconstruction Theory and Ideal Interpolation

\begin{theorem}[Reconstruction of the OC Feature Vector Function]
When the above distortion-free sampling conditions are satisfied and the bilateral sampled sequence is known, the OC Feature Vector Function can be perfectly reconstructed from the discrete OC Feature Vector Sequence:

$$
\mathbf{q}(t) = \sum_{n=-\infty}^{\infty} \mathbf{q}[n] \cdot \text{sinc}\left(\dfrac{t - nT_s}{T_s}\right)

$$

where $\text{sinc}(x) = \dfrac{\sin(\pi x)}{\pi x}$ is the ideal interpolation function.
\end{theorem}

\begin{proof}
Under the distortion-free sampling conditions, the continuous-time signal $\mathbf{q}(t)$ is band-limited, with bandwidth $B_q = \min(\omega_r^{\max}, \omega_h^{\max})$ satisfying $\omega_s = 2\pi/T_s > 2B_q$.

Consider the continuous-time Fourier transform of $\mathbf{q}(t)$:

$$
\tilde{\mathbf{Q}}(\mj\omega) = \int_{-\infty}^{\infty} \mathbf{q}(t) \mathrm{e}^{-\mj\omega t} \mathrm{d} t
$$

By the bandwidth limitation, we have:

$$
\tilde{\mathbf{Q}}(\mj\omega) = \mathbf{0}, \quad \forall |\omega| > \dfrac{\omega_s}{2}
$$

Extend $\tilde{\mathbf{Q}}(\mj\omega)$ periodically in the frequency domain with period $\omega_s$ to obtain the periodic spectrum:

$$
\hat{\mathbf{Q}}(\mj\omega) = \sum_{k=-\infty}^{\infty} \tilde{\mathbf{Q}}(\mj(\omega - k \omega_s))
$$

Since $\omega_s > 2B_q$, the periodic replicas do not overlap, so no aliasing occurs.

On the other hand, the discrete-time Fourier transform of the sampled sequence $\mathbf{q}[n] = \mathbf{q}(nT_s)$ is:

$$
\tilde{\mathbf{Q}}_d(\mathrm{e}^{\mj\omega T_s}) = \sum_{n=-\infty}^{\infty} \mathbf{q}[n] \mathrm{e}^{-\mj\omega nT_s}
$$

By the sampling theorem, the relation between the discrete and continuous spectra is:

$$
\tilde{\mathbf{Q}}_d(\mathrm{e}^{\mj\omega T_s}) = \dfrac{1}{T_s} \hat{\mathbf{Q}}(\mj\omega) = \dfrac{1}{T_s} \tilde{\mathbf{Q}}(\mj\omega), \quad |\omega| < \dfrac{\omega_s}{2}
$$

Therefore, in the baseband, the continuous spectrum can be recovered from the discrete spectrum:

$$
\tilde{\mathbf{Q}}(\mj\omega) = T_s \cdot \tilde{\mathbf{Q}}_d(\mathrm{e}^{\mj\omega T_s}) \cdot \mathrm{rect}\left(\dfrac{\omega}{\omega_s}\right)
$$

where $\mathrm{rect}(u)$ is the rectangular function, equal to 1 when $|u| < \dfrac{1}{2}$ and 0 otherwise.

Taking the inverse Fourier transform of the above. In the time domain, multiplication in the frequency domain corresponds to convolution in the time domain:

$$
\begin{aligned}
\mathbf{q}(t) & = \mathcal{F}^{-1} \left\{ T_s \cdot \tilde{\mathbf{Q}}_d(\mathrm{e}^{\mj\omega T_s}) \cdot \mathrm{rect}\left(\dfrac{\omega}{\omega_s}\right) \right\}                             \\
                      & = \left( \sum_{n=-\infty}^{\infty} \mathbf{q}[n] \delta(t - nT_s) \right) * \left( T_s \cdot \dfrac{\omega_s}{2\pi} \cdot \text{sinc}\left(\dfrac{\omega_s t}{2\pi}\right) \right)
\end{aligned}
$$

where $T_s \cdot \dfrac{\omega_s}{2\pi} = T_s \cdot \dfrac{2\pi/T_s}{2\pi} = 1$, and $\text{sinc}\left(\dfrac{\omega_s t}{2\pi}\right) = \text{sinc}\left(\dfrac{t}{T_s}\right)$.

Hence:

$$
\begin{aligned}
\mathbf{q}(t) & = \sum_{n=-\infty}^{\infty} \mathbf{q}[n] \cdot \delta(t - nT_s) * \text{sinc}\left(\dfrac{t}{T_s}\right) \\
                      & = \sum_{n=-\infty}^{\infty} \mathbf{q}[n] \cdot \text{sinc}\left(\dfrac{t - nT_s}{T_s}\right)
\end{aligned}
$$

This is exactly Equation the relevant equation. The proof is complete.
\end{proof}

\begin{remark}
If an actual system stores only the causal truncated sequence for $n\geq 0$, then the bilateral perfect reconstruction in Equation the relevant equation becomes approximate reconstruction; the error is jointly determined by the truncation length, boundary extension method, and anti-aliasing filter.
\end{remark}

### Meaning of the Sampling Theorem in OC Transform

\begin{theorem}[Completeness from Discrete to Continuous]
If the sampling process satisfies the Shannon condition, reconstruction uses ideal sinc interpolation, and the implementation from the continuous system to the discrete system conforms to the idealized sampling model described above, then the discrete OC Transform system and the continuous OC Transform system are equivalent in terms of information:

$$
\mathbf{q}(t) \xrightarrow{\text{sampling}} \mathbf{q}[n] \xrightarrow{\text{reconstruction}} \mathbf{q}(t)
$$

That is, the sampling and reconstruction process is lossless in terms of information.
\end{theorem}

Based on sampling theory, the Continuous-Time OC Transform can be realized by a Discrete-Time system under ideal conditions, provided that:
1. an appropriate sampling rate $\omega_s$ satisfying the Shannon condition is chosen
2. an appropriate anti-aliasing filter is designed
3. an appropriate interpolation method is used for reconstruction
This provides the theoretical foundation for the automatic OC transform machine.

## Fast OC Transform

From a realistic perspective, no character could have been created infinitely far in the past, nor continue to exist for an infinite amount of time. In actual use of the automatic OC transform machine, the sequences may therefore be uniformly truncated to causal finite-length sequences of length $L$:

$$
\mathbf{r}[n]\in\mathbb{R}^{N\times 1},\;
\mathbf{H}[n]\in\mathbb{R}^{M\times N},\;
\mathbf{q}[n]\in\mathbb{R}^{M\times 1},\qquad
0\le n\le L-1.
$$

and $L$ is taken to be a power of 2 (with zero-padding if necessary).

If the convolution sum is computed directly from the definition, the time complexity is $O(NML^2)$. When $N$, $M$, and $L$ are large, the computational burden becomes too heavy for real-time processing. For this reason, fast algorithms must be introduced to improve computational efficiency.
This is the most important concrete implementation algorithm for OC Transform: the **Fast OC Transform**.

At this point, the process by which a real-world Creator crosses into the two-dimensional world to become their OC mainly contains the following steps:
1. the **sampling module** of the automatic OC transform machine samples and digitizes the Creator's real-world Feature Vector Function;
2. the **forward-transform module** performs the Discrete-Time OC Transform on the real-world Feature Vector Sequence, obtaining the OC Feature Vector Sequence;
3. the **reconstruction module** reconstructs the OC Feature Vector Sequence into the OC Feature Vector Function, thereby converting it into the two-dimensional OC character.
When returning to the real world is required, the reverse process is as follows: sample the OC Feature Vector Function, use the **inverse-transform module** to perform the Discrete-Time OC inverse transform and obtain the real-world Feature Vector Sequence, and then reconstruct it into the real-world Feature Vector Function.

The core computation of the Discrete-Time OC Transform consists of $N\times M$ elementwise convolutions, each of length $L$. Therefore, improving the computational efficiency of the automatic OC transform machine mainly depends on two points:
1. **Matrix-multiplication acceleration based on modern computer cache principles**: optimize memory access patterns to improve the efficiency of matrix multiplication.
2. **FFT-based elementwise convolution acceleration**: use the Fast Fourier Transform (FFT) to move convolution computation from the time domain to the frequency domain, greatly reducing computational complexity.

### Matrix-Multiplication Acceleration Based on Modern Computer Cache Principles

Matrix multiplication is a core operation in the Discrete-Time OC Transform. Direct matrix multiplication has time complexity $O(NM)$ if the cost of convolution is ignored, which is already relatively low; however, in practical computation, the efficiency of matrix multiplication is often limited by memory access patterns and cache hit rate.

Modern computers usually use hierarchical cache structures, such as L1, L2, and L3 caches, to improve memory access efficiency. Optimizing the memory access pattern of matrix multiplication can therefore significantly improve computational performance.

The second snippet processes the inner loop in a more cache-friendly order, improving cache hit rate and accelerating the matrix-multiplication accumulation in the OC Transform. Experiments show that this cache-optimization strategy can bring a certain performance improvement in practical computation, especially when the matrix size is large.

### Convolution Acceleration Based on Frequency-Domain Methods

The core of frequency-domain methods is to use the convolution theorem of the Discrete Fourier Transform (DFT), converting computationally expensive time-domain convolution into simple frequency-domain multiplication. This is the key technique for reducing the computational burden of OC Transform.

\begin{definition}[Discrete Fourier Transform (DFT)]
For a discrete sequence of length $N_f$, $x[n],\; n=0,1,\dots,N_f-1$, its **Discrete Fourier Transform (DFT)** $X[k]$ is defined by:

$$
X[k] = \sum_{n=0}^{N_f-1} x[n] \cdot \mathrm{e}^{-\mj\frac{2\pi}{N_f}kn}, \quad k=0,1,\dots,N_f-1
$$

Correspondingly, the **inverse discrete Fourier transform (IDFT)** is:

$$
x[n] = \dfrac{1}{N_f} \sum_{k=0}^{N_f-1} X[k] \cdot \mathrm{e}^{\mj\frac{2\pi}{N_f}kn}, \quad n=0,1,\dots,N_f-1
$$

\end{definition}

For DFT-transformed sequences, the **Circular Convolution Theorem** can be used to simplify convolution computation.

\begin{theorem}[Circular Convolution Theorem]

Let the sequences $\tilde{x}[n]$ and $\tilde{h}[n]$ both have length $N_f$. Their circular convolution $\tilde{y}[n]$ is defined by:

$$
\tilde{y}[n] = \sum_{m=0}^{N_f-1} \tilde{h}[m] \tilde{x}[(n-m) \bmod N_f]
$$

Let $\tilde{X}[k]$, $\tilde{H}[k]$, and $\tilde{Y}[k]$ be the DFTs of the three sequences. Then:

$$
\tilde{Y}[k] = \tilde{H}[k] \cdot \tilde{X}[k]
$$

That is, circular convolution in the time domain corresponds to multiplication in the frequency domain.
\end{theorem}

The convolution theorem is the bridge between time-domain and frequency-domain operations. It states that **circular convolution in the time domain is equivalent to pointwise multiplication in the frequency domain**. However, OC Transform requires **linear convolution**, not circular convolution. To use DFT to compute the linear convolution of two causal sequences $h_{ij}[n]$ and $r_j[n]$ of length $L$, zero-padding must be used to avoid aliasing.

\begin{theorem}[DFT-Based Linear Convolution Computation]

Suppose $h_{ij}[n]$ and $r_j[n]$ are causal sequences of length $L$. Zero-pad both to length $N_f \ge 2L-1$ (usually $N_f=2L$), obtaining $\tilde{h}_{ij}[n]$ and $\tilde{r}_j[n]$. Then the first $L$ samples of the circular convolution of $\tilde{h}_{ij}[n]$ and $\tilde{r}_j[n]$ are equal to the linear convolution of $h_{ij}[n]$ and $r_j[n]$.
\end{theorem}

Based on this theorem, the steps for computing linear convolution with DFT are:
1. **Zero-padding**: zero-pad $h_{ij}$ and $r_j$ to length $N_f=2L$.
2. **Forward transform**: compute their DFTs: $H_{ij}[k]=\mathrm{DFT}(\tilde{h}_{ij})$, $R_j[k]=\mathrm{DFT}(\tilde{r}_j)$.
3. **Frequency-domain multiplication**: $Y_{ij}[k]=H_{ij}[k]\cdot R_j[k]$.
4. **Inverse transform**: compute the IDFT and take the first $L$ samples: $(h_{ij}*r_j)[n]=\mathrm{IDFT}(Y_{ij})[n],\; n=0,\dots,L-1$.

Direct computation of an $N_f$-point DFT has time complexity $O(N_f^2)$. If this method is used for convolution, the total complexity is $O(N_f^2)=O(L^2)$, comparable to direct time-domain convolution and therefore not advantageous. For this reason, the Fast Fourier Transform (FFT) is introduced to improve the efficiency of DFT computation.

The **Fast Fourier Transform (FFT)** is a class of efficient algorithms for computing the DFT. Its core idea is divide and conquer: a large DFT is decomposed into multiple smaller DFTs to reduce the amount of computation.

There are many implementations of FFT, among which the classic Cooley-Tukey algorithm is the most common. When the transform length $N_f$ is a power of 2, a radix-2 algorithm can be used, mainly divided into Decimation in Time (DIT) and Decimation in Frequency (DIF).

The DIF form differs from the DIT form mainly in the following ways:
- **Direction of decomposition**: DIF first decomposes the DFT output sequence by even and odd indices in the frequency domain, hence the name "Decimation in Frequency."
- **Butterfly operation**: in DIF, multiplication by the twiddle factor occurs on the latter branch of the butterfly operation.
- **Order requirements**: DIT requires bit-reversed input and produces natural-order output; DIF requires natural-order input and produces bit-reversed output.

Both algorithms reduce computational complexity from $O(N_f^2)$ to $O(N_f\log N_f)$, and they have the same computational cost and numerical accuracy. In practical applications, either may be chosen according to specific requirements.

\begin{theorem}[Computational Complexity of FFT-Accelerated Linear Convolution]

Suppose $h_{ij}[n]$ and $r_j[n]$ are causal sequences of length $L$ (zero-padded if necessary to length $N_f=2L$, with $N_f$ a power of 2). The complexity of computing their linear convolution using FFT is:

$$
O(N_f \log N_f) = O(L \log L)
$$

By contrast, the complexity of direct time-domain convolution is $O(L^2)$.
\end{theorem}

\begin{proof}
FFT reduces the computational complexity of DFT from $O(N_f^2)$ to $O(N_f\log N_f)$. In the convolution computation described above:
1. two FFTs, computing $H_{ij}[k]$ and $R_j[k]$, have complexity $2\times O(N_f\log N_f)$;
2. one frequency-domain pointwise multiplication has complexity $O(N_f)$;
3. one IFFT has complexity $O(N_f\log N_f)$.
Therefore, the total complexity is $O(N_f\log N_f)=O(L\log L)$.
\end{proof}

In the complete computation of OC Transform, all $N\times M$ channels require separate convolution. Direct time-domain convolution has total complexity $O(NML^2)$, while FFT acceleration reduces the total complexity to:

$$
O(NM\cdot L\log L)
$$

It is worth noting that coefficients in the transform domain can be reused for further optimization in practical implementation:
- **Coefficient precomputation**: the Discrete OC Impulse-Response Matrix $\mathbf{H}$ is usually a fixed system parameter, so all $H_{ij}=\mathrm{FFT}(h_{ij})$ can be computed and stored in advance.
- **Input-transform reuse**: for each input channel $r_j$, $\mathrm{FFT}(r_j)$ only needs to be computed once, and can then be reused by all $M$ output channels.
- **Parallel computation**: the computation of each output channel $q_i$ is independent and suitable for parallel processing.

This algorithm significantly reduces the total complexity from $O(NML^2)$ to $O(NML\log L)$. When $L$ is large, it brings several orders of magnitude of speedup and makes real-time OC Transform possible.

### Integrated Optimization Algorithm: Combining Cache Optimization and FFT

In practical applications, to maximize the computational efficiency of OC Transform, cache optimization strategies can be combined with FFT acceleration to form an integrated optimization algorithm. Its core ideas are:
1. **Frequency-domain computation as the main framework**: use FFT-based frequency-domain convolution as the main computational paradigm, reducing time complexity from $O(NML^2)$ to $O(NML\log L)$.
2. **Cache-optimized memory access**: during the matrix-multiplication accumulation stage, optimize memory access patterns to improve cache hit rate and reduce memory bandwidth bottlenecks.
3. **Parallel-computation architecture**: use the parallel computing ability of modern multicore processors to compute multiple output or input channels simultaneously.

While preserving the low time complexity of the FFT algorithm, this integrated algorithm further reduces constant factors by optimizing memory access patterns, allowing practical hardware to approach theoretical peak computational efficiency.

### Algorithm Performance Comparison and Analysis

The algorithms can be compared qualitatively by asymptotic complexity, cache behavior, memory layout, and numerical stability.

\begin{remark}
Interestingly, the "fast" OC Transform algorithm based on the original DFT algorithm is not fast at all. This is because the computational complexity of the DFT is $O(N_f^2)=O(L^2)$, which is comparable to the $O(L^2)$ complexity of direct time-domain convolution, while the DFT also carries a larger constant factor, making it slower in practical applications.
\end{remark}

### Numerical Experiments and Performance Analysis

Only the conclusions of the numerical experiments are retained here; detailed tables, code listings, and plots are omitted in the web version.

The experimental results lead to the following conclusions:
1. **Computational efficiency has clear levels**: algorithm performance is strongly scale-dependent. In small-scale problems ($N=4,L=32$), the optimized direct-convolution version performs best; in large-scale problems ($N=64,L=2048$), FFT methods achieve more than 30 times speedup, fully demonstrating the advantage of their $O(MNL\log L)$ complexity.
2. **Cache optimization is significant**: comparing the "good\_cache" and "bad\_cache" versions shows that optimized memory access patterns provide stable performance improvements across different scales.
3. **Numerical accuracy is excellent**: all FFT methods have mean absolute errors on the order of $10^{-17}$ to $10^{-19}$, showing very high numerical stability.
4. **Algorithm applicability differs by scenario**: cache-friendly direct convolution is suitable for small-scale problems ($L\leq512$), FFT methods are advantageous for large-scale problems ($L\geq1024$), and direct DFT is mainly suitable for theoretical verification.
5. **System stability is verified**: in all test cases, the maximum absolute sum is 0.909091, far below 1, satisfying the absolute-summability condition and ensuring BIBO stability of the OC Transform system.
6. **Complexity theory is verified**: the measured results are highly consistent with theoretical analysis. As $L$ grows, direct convolution follows a trend close to $O(L^2)$, while FFT methods follow the expected $O(L\log L)$ trend.

In practical engineering implementation, the performance of FFT methods is highly sensitive to cache utilization and data layout. The tests show that optimizing data access patterns, as in `fft_good_cache`, provides stable performance improvements at different scales. This gives an important lesson for designers of automatic OC transform machines: the optimal algorithm should be selected dynamically according to problem scale, and modern processor memory hierarchy should be fully considered in implementation.
