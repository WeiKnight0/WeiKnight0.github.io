---
title: World Theory
description: Formal definitions of worlds, hierarchy, gods, and the No Universal God theorem.
order: 3
---

This section uses the language of discrete mathematics and abstract algebra to give a formal definition of a "World" and to discuss its properties and hierarchical structure. Then, based on this definition, it analyzes the mathematical expression of philosophical propositions such as "God" and the "No Universal God Theorem" within this worldview.

## World and Properties of the World
In \wkn{}'s worldview, a "**World**" is a mathematical structure containing individuals and propositions. Individuals are "things that exist," and propositions are "statements about those things." Every proposition in a given World is either true or false. Different Worlds may have different sets of individuals and propositions.
Based on this, we give the following definition of a World:

\begin{definition}[World]

A **World** $w$ is a triple

$$
w=(D_w,\Phi_w,\models_w)
$$

where
1. $D_w\neq\varnothing$ is the **set of individuals (Domain)**, called the World's **domain (Domain)**;
2. $\Phi_w$ is the World's **set of propositions (Proposition Set)**, satisfying
              - for any $\varphi\in\Phi_w$, its **negation (Negation)** satisfies $\neg\varphi\in\Phi_w$;
- for any $\varphi\in\Phi_w$, the **Law of Excluded Middle** holds: $\varphi\not\equiv\neg\varphi$;
3. $\models_w : \Phi_w \to \{\text{true}, \text{false}\}$ is the **truth assignment function (Truth Assignment Function)**, satisfying
              - for any $\varphi\in\Phi_w$, $\models_w(\varphi)$ takes only the values \text{true} or \text{false};
- for any $\varphi\in\Phi_w$, $\models_w(\neg\varphi)$ and $\models_w(\varphi)$ are negations of one another;
- $\models_w$ is unique on $\Phi_w$.
\end{definition}

\begin{remark}
The conditions in Definition the relevant section guarantee the logical consistency of each World. The set of individuals $D_w$ ensures that the "things that exist" in the World are nonempty; the closure property of the proposition set $\Phi_w$ under negation and the Law of Excluded Middle ensure logical completeness and non-contradiction; and the uniqueness of the truth assignment function $\models_w$ ensures that each proposition has a determinate truth value in that World.
\end{remark}

\begin{remark}
Such a definition is not perfect. For example, it ignores non-propositional statements (such as the perceptual experience of the "thing" in "there exists something") as well as vague propositions (such as "this thing is large"). It also does not provide a particularly satisfying explanation of the ontological status of propositions.
More precisely, this definition is better understood as an idealized model of a "mathematical World" within \wkn{}'s worldview. It is suitable for analyzing foundational mathematical issues such as logic and set theory, but richer structures may be required when dealing with more complex philosophical or semantic questions.
\end{remark}

\begin{definition}[World Class]

Let

$$
\mathcal{W}=\{w\mid w\text{ is a World satisfying Definition the relevant section}\}.
$$

If the sources of individuals and propositions allowed in a World are unrestricted, then under ZFC, $\mathcal{W}$ should be understood as a **proper class (Proper Class)**, that is, it does not belong to any set. Such a $\mathcal{W}$ contains all possible Worlds, and is called the **World Class**.

In order to use ordinary set-theoretic tools such as graph theory, partially ordered sets, and functions later in the text, we fix a sufficiently large **working world universe (Working World Universe)** $\mathcal{W}_0\subseteq\mathcal{W}$ and require that $\mathcal{W}_0$ be a set. Unless otherwise specified, all later discussions of World graphs, hierarchical relations, the control range of God, and related objects take place within this fixed set $\mathcal{W}_0$.
\end{definition}

\begin{theorem}[Upper Bound on the Cardinality of Finite World Sets]
If we fix a set of $N$ candidate individuals and a set of $M$ candidate propositions, and consider only Worlds generated from them, then

$$
\mathcal{W}_{N,M}=\{w\in\mathcal{W}_0\mid |D_w|\leq N,\,|\Phi_w|\leq M\}
$$

is a finite set, and one upper bound on its cardinality is:

$$
|\mathcal{W}_{N,M}| \leq \sum_{d=1}^{N} \sum_{p=0}^{M} \binom{N}{d} \cdot \binom{M}{p} \cdot 2^{p}.
$$

Here $\binom{M}{p}$ denotes the number of ways to choose $p$ propositions from $M$ propositions.
\end{theorem}

\begin{proof}
For each possible number of individuals $d$ (from 1 to $N$) and each possible number of propositions $p$ (from 0 to $M$),
- there are $\binom{N}{d}$ ways to choose the individual set $D_w$;
- there are $\binom{M}{p}$ ways to choose the proposition set $\Phi_w$;
- the truth assignment function $\models_w$ has 2 choices for each proposition (true or false), so for $p$ propositions there are $2^p$ different assignments.
Therefore, for fixed $d$ and $p$, the number of possible Worlds is:

$$
\binom{N}{d} \cdot \binom{M}{p} \cdot 2^p.
$$

Summing over all possible combinations of $d$ and $p$, we obtain the upper bound on the total number of Worlds:

$$
|\mathcal{W}_{N,M}| \leq \sum_{d=1}^{N} \sum_{p=0}^{M} \binom{N}{d} \cdot \binom{M}{p} \cdot 2^{p}.
$$

This upper bound is loose, because in actual valid Worlds:
1. the proposition set $\Phi_w$ must be closed under negation (that is, if $\varphi \in \Phi_w$, then $\neg\varphi \in \Phi_w$), which implies that $p$ must be even;
2. the Law of Excluded Middle requires that a proposition and its negation cannot be equivalent, which further restricts the possible truth assignments;
3. the content of propositions should be related to the domain of individuals, whereas here we assume all $M$ propositions are independent.
Since we count all possible structures, including those that do not satisfy all the conditions in Definition the relevant section, what we obtain is an upper bound.
\end{proof}

\begin{theorem}[World Non-Confusability]

For any $w_1,w_2\in\mathcal{W}_0$, if there exists $\varphi\in\Phi_{w_1}\cap\Phi_{w_2}$ such that
$\models_{w_1}(\varphi)\neq\;\models_{w_2}(\varphi)$, then $w_1\neq w_2$.
\end{theorem}

\begin{proof}
By Definition the relevant section, the truth assignment function of a World is unique. If $w_1 = w_2$, then $\models_{w_1}$ and $\models_{w_2}$ are the same function, so they must agree on $\Phi_{w_1}\cap\Phi_{w_2}$, contradicting the assumption.
\end{proof}

## Hierarchy of Worlds
To describe the intuitive idea that "one World has more information than another," we borrow the notion of a **DAG (Directed Acyclic Graph)** from graph theory to describe the relations between Worlds. The vertices of the DAG are Worlds, and the edges represent the relation of "proposition extension."

\begin{definition}[World Graph and Hierarchical Relation of Worlds]

The pair $G=(\mathcal{W}_0,E)$ is called a **World Graph**, where the edge set is

$$
E=\{(w,w')\in\mathcal{W}_0\times\mathcal{W}_0\mid \Phi_w \subsetneq \Phi_{w'},\ \text{and } \models_{w'} \text{ restricted to } \Phi_w\text{, namely }\models_{w'}|_{\Phi_w},\text{ equals } \models_w\}.
$$

This graph is a strict DAG, and therefore induces a partially ordered set $(\mathcal{W}_0,\preceq)$, where

$$
w\preceq w'\;\stackrel{\text{def}}{\Longleftrightarrow}\;
        \Phi_w \subseteq \Phi_{w'}\ \text{and } \models_{w'} \text{ restricted to } \Phi_w\text{, namely }\models_{w'}|_{\Phi_w},\text{ equals } \models_w.
$$

In this case, $w$ is called an **Information Subworld** of $w'$.
If $w \preceq w'$ and $w \neq w'$, we write $w \prec w'$ and call $w$ a **Proper Information Subworld** of $w'$.
The partial order relation $\preceq$ is called the **hierarchical relation of Worlds**.
\end{definition}

\begin{remark}
Restriction of a function: if $f:A\to B$ is a function and $A'\subseteq A$, then $f|_{A'}:A'\to B$ is a function satisfying $f|_{A'}(a)=f(a)$ for any $a\in A'$.
\end{remark}

\begin{remark}
A partial order is a binary relation, usually denoted by $\preceq$, that satisfies the following three properties:
- Reflexivity: for any $w\in\mathcal{W}_0$, we have $w\preceq w$;
- Antisymmetry: for any $w_1,w_2\in\mathcal{W}_0$, if $w_1\preceq w_2$ and $w_2\preceq w_1$, then $w_1=w_2$;
- Transitivity: for any $w_1,w_2,w_3\in\mathcal{W}_0$, if $w_1\preceq w_2$ and $w_2\preceq w_3$, then $w_1\preceq w_3$.
\end{remark}

\begin{remark}
In Definition the relevant section, the edge $(w,w')$ means that $w'$ adds new propositions on top of $w$, while preserving the truth values of the propositions already in $w$. The partial order relation $\preceq$ expresses the hierarchical relation.
Since the proposition set grows strictly, the World Graph contains no self-loops, thereby ensuring the irreflexivity of the strict relation $\prec$ and preventing cycles in this hierarchy.
\end{remark}

\begin{definition}[Hasse Diagram of Worlds]

The **Hasse Diagram** of the World Graph $G=(\mathcal{W}_0,E)$ is a simplified directed graph obtained by removing all edges that can be inferred by transitivity.
That is, if there exist $w_1,w_2,w_3\in\mathcal{W}_0$ such that $w_1 \prec w_2$ and $w_2 \prec w_3$, then the edge $(w_1,w_3)$ is not drawn in the Hasse Diagram,
and arrowheads are omitted. If $w_1 \prec w_2$, then a line segment is drawn from $w_1$ to $w_2$ in the Hasse Diagram, with $w_2$ placed **above** $w_1$.
\end{definition}

\begin{lemma}[Existence of Minimal Elements in Well-Founded Subsets]

Let $S\subseteq\mathcal{W}_0$ be a nonempty subset. If $S$ has no infinite strictly descending chain under the relation $\prec$

$$
\cdots \prec w_2 \prec w_1 \prec w_0,
$$

then $S$ contains a $\preceq$-minimal element.
\end{lemma}

\begin{proof}
Suppose that $S$ has no minimal element. Take any $w_0\in S$. Since $w_0$ is not minimal, there exists $w_1\in S$ such that $w_1\prec w_0$. Repeating the same argument recursively, we can construct $w_{n+1}\prec w_n$, thereby obtaining an infinite strictly descending chain

$$
\cdots \prec w_2 \prec w_1 \prec w_0,
$$

contradicting the assumption. Therefore $S$ must have a minimal element.
\end{proof}

\begin{remark}
Without the well-foundedness condition, the conclusion above generally does not hold. For example, proposition sets may form an infinite strictly descending chain under proper inclusion, and then the corresponding subset of Worlds may fail to have a minimal element. Therefore, the level function has its usual meaning only on working world universes or branches satisfying the well-foundedness condition.
\end{remark}

\begin{remark}
A **minimal element** is a World in a subset such that there is no World in that subset with "less information" than it. Note that, unlike a least element, a minimal element need not be unique, and there may be multiple minimal elements in different connected components.

For example, if $w_1$ and $w_2$ are minimal elements on two unrelated branches, then neither has a World with less information than itself, so both are minimal elements, but $w_1 \not\preceq w_2$ and $w_2 \not\preceq w_1$.

Unfortunately, a World generally has no **least element**. This is because the relation between Worlds is a partial order rather than a total order, so any two Worlds need not be comparable.
\end{remark}

\begin{definition}[Level Function]

In a well-founded working world universe satisfying Lemma the relevant section, define the **level function (Level Function)** $\mathrm{level}:\mathcal{W}_0\to\mathbb{N}\cup\{\infty\}$ by:

$$
\mathrm{level}(w)=
        \begin{cases}
            \min \big\{ n \in \mathbb{N} \mid \exists w_0 \preceq w_1 \preceq \dots \preceq w_n = w,\ w_0 \text{ is a minimal element of } \mathcal{W}_0 \big\}, & \text{if such a chain exists}, \\
            \infty,                                                                                                                                   & \text{otherwise}.
        \end{cases}
$$

That is, $\mathrm{level}(w)$ is the length of the shortest chain from some minimal element to $w$; if $w$ cannot be reached from any minimal element, then its level is $\infty$.
\end{definition}

\begin{remark}
The level function divides the World Graph into "generations," while allowing Worlds in different connected components to have arbitrary finite levels or level $\infty$.
Level 0 consists of all minimal elements (possibly many, and in different connected components).
If $w \prec w'$, then $\mathrm{level}(w) < \mathrm{level}(w')$; however, the converse does not hold, since Worlds with smaller levels need not be comparable at all (for example, Worlds on different branches may have the same level while being completely unrelated).
\end{remark}

## Structural Subworld
In addition to Information Subworld, we may define the stronger concept of a **Structural Subworld**.
Intuitively, a Structural Subworld should be a part of a larger World: it not only contains less information, but its domain of individuals should also be included in the larger World's domain, and all truth values concerning those individuals should agree with the larger World.

\begin{definition}[Structural Subworld]

Let $w = (D_w, \Phi_w, \models_w)$ and $w' = (D_{w'}, \Phi_{w'}, \models_{w'})$ be two Worlds.
We say that $w$ is a **Structural Subworld** of $w'$, written $w \sqsubseteq w'$, if and only if all the following conditions hold:
1. **Domain Inclusion**: $D_w \subseteq D_{w'}$.
2. **Proposition Set Consistency**: $\Phi_w = \{\, \varphi \in \Phi_{w'} \mid \text{all individuals appearing in } \varphi \text{ belong to } D_w \,\}$.
3. **Truth Inheritance**: for any $\varphi \in \Phi_w$, we have $\models_w(\varphi) = \models_{w'}(\varphi)$.
If $w \sqsubseteq w'$ and $w \neq w'$, we write $w \sqsubset w'$, and call $w$ a **Proper Structural Subworld** of $w'$.
\end{definition}

\begin{remark}
Condition 2 in Definition the relevant section ensures that the proposition set of $w$ consists exactly of those propositions in the proposition set of $w'$ that speak only about individuals in $D_w$. Condition 3 guarantees that for these propositions, the Structural Subworld and the parent World agree completely on truth values. This shows that a Structural Subworld is obtained entirely from the parent World by restricting the domain of individuals.
\end{remark}

\begin{theorem}[Relation Between Structural Subworld and Information Subworld]

If $w \sqsubseteq w'$, then $w \preceq w'$. That is, every Structural Subworld is necessarily an Information Subworld.
\end{theorem}

\begin{proof}
By Definition the relevant section, we have $D_w \subseteq D_{w'}$ and $\Phi_w \subseteq \Phi_{w'}$ (since $\Phi_w$ is a subset of $\Phi_{w'}$), and the truth values agree on $\Phi_w$. This is exactly the condition required for $w \preceq w'$ in Definition the relevant section.
\end{proof}

\begin{remark}
The converse does not hold. An Information Subworld requires only inclusion of proposition sets and agreement of truth values, but allows the domains of individuals to be entirely different. Therefore, Structural Subworld is a special case of Information Subworld, strengthening the intuitive notion of a "partial structure."
\end{remark}

In addition, we use **Subworld** as a collective term for Information Subworld and Structural Subworld.

## God
In many philosophical and theological systems, "God" is described as an omniscient and omnipotent being capable of controlling all things.
Based on the framework of Worlds and Subworlds, we can model the concept of God mathematically. God is defined as an intelligent entity capable of "controlling" a certain main World and all of its Structural Subworlds. This "control" is concretely expressed as complete and error-free cognition of all facts within its range of control.

\begin{definition}[God]

**God** $G$ is a quadruple:

$$
G = (w_G, \, \mathcal{S}_G, \, \pi, \, \Vdash_G)
$$

where:
1. $w_G = (D_{w_G}, \Phi_{w_G}, \models_{w_G}) \in \mathcal{W}_0$ is a World, called the **main World of God $G$**.
2. $\mathcal{S}_G = \{ w' \in \mathcal{W}_0 \mid D_{w'} \subseteq D_{w_G},\ \Phi_{w'} = \{\varphi \in \Phi_{w_G} \mid \text{all individuals in } \varphi \text{ belong to } D_{w'}\},\ \models_{w'} = \models_{w_G}|_{\Phi_{w'}} \}$
              is the set of all Structural Subworlds of $w_G$, called the **control World set of God $G$**.
3. $\pi: \mathcal{S}_G \to \mathcal{P}(\Phi_{w_G})$ is a **projection function (Projection Function)** satisfying $\pi(w') = \Phi_{w'}$.
4. $\Vdash_G \subseteq \{ (w', \varphi) \in \mathcal{S}_G \times \Phi_{w_G} \mid \varphi \in \pi(w') \}$ is a **global cognition relation (Global Cognition Relation)** satisfying:
              - **Consistency Axiom**: if $(w', \varphi) \in \Vdash_G$, then $\models_{w'}(\varphi) = \text{true}$.
- **Omniscience Axiom**: for any $w' \in \mathcal{S}_G$ and any $\varphi \in \pi(w')$, we have $(w', \varphi) \in \Vdash_G$ if and only if $\models_{w'}(\varphi) = \text{true}$.
\end{definition}

\begin{remark}
The core of this definition is that it makes "control" concrete in terms of two capacities:
1. **Range**: God's range of control is the set of all Structural Subworlds of its main World, namely $\mathcal{S}_G$.
2. **Cognition**: God possesses a global and error-free cognition relation $\Vdash_G$, enabling it to know without error any fact in any local part (that is, any Structural Subworld) within its range of control.
\end{remark}

\begin{remark}
It is important to distinguish the religious notion of "God" from "God" in \wkn{}'s worldview. Here, "God" is an idealized mathematical construct intended to capture the concept of omniscience and omnipotence, rather than a theological definition from any particular religion or culture.
\end{remark}

Based on this definition, we can derive some important properties of God.

\begin{theorem}[God's Omniscience Over the Main World]
God is omniscient with respect to its main World $w_G$. That is, for any $\varphi \in \Phi_{w_G}$, we have:

$$
(w_G, \varphi) \in \Vdash_G \quad \text{if and only if} \quad \models_{w_G} (\varphi) = \text{true}.
$$

\end{theorem}

\begin{theorem}[God's Control Over Local Information]
Let $w' \in \mathcal{S}_G$ and $w" \in \{w | w \in \mathcal{W}_0 \land w \sqsubseteq w'\}$, then $w" \in \mathcal{S}_G$. Furthermore, God's cognition $(w", \varphi) \in \Vdash_G$ of any proposition $\varphi$ in $w"$ is consistent with its cognition $(w', \varphi) \in \Vdash_G$ of $\varphi$ in $w'$ (whenever $\varphi \in \pi(w")$), and both conform to the objective truth values in their respective Worlds.
\end{theorem}

\begin{proof}
By transitivity of the Subworld relation, we obtain $w" \in \mathcal{S}_G$. The consistency of cognition is guaranteed by the Omniscience Axiom, because $\models_{w"}(\varphi)$ and $\models_{w'}(\varphi)$ agree whenever $\varphi \in \pi(w")$ (by the definition of Structural Subworld).
\end{proof}

## No Universal God Theorem

Based on the established hierarchical structure of Worlds and the definition of God, we can state a more fundamental claim: under the assumption that propositions may be expanded infinitely, a God that controls all Worlds is logically impossible. This conclusion does not depend on domains of individuals or concrete truth-value conflicts, but arises solely from the structural properties of the partially ordered set of Worlds itself.

\begin{axiom}[Infinite Expandability of Propositions]
The proposition sets in the working world universe $\mathcal{W}_0$ can be expanded infinitely. This is the **Axiom of Infinite Expandability of Propositions**. Formally:

$$
\forall w \in \mathcal{W}_0,\; \exists w' \in \mathcal{W}_0,\; \text{such that } \Phi_w \subsetneq \Phi_{w'}.
$$

This axiom asserts that there is no World possessing "all" propositions.
\end{axiom}

\begin{definition}[Universal God]
Let $G^* = (w_{G^*}, \mathcal{S}_{G^*}, \pi, \Vdash_{G^*})$ be a God. If $\mathcal{S}_{G^*} = \mathcal{W}_0$, that is, its range of control contains all Worlds in the working world universe, then $G^*$ is called a **Universal God**.
\end{definition}

\begin{theorem}[No Universal God Theorem]

Under ZFC, the fixed working world universe, and the Axiom of Infinite Expandability of Propositions, no Universal God exists.
\end{theorem}

\begin{proof}
We proceed by contradiction.
1. Assume that there exists a Universal God $G^* = (w_{G^*}, \mathcal{S}_{G^*}, \pi, \Vdash_{G^*})$. By the definition of Universal God, we have $\mathcal{S}_{G^*} = \mathcal{W}_0$.
2. Since $\mathcal{S}_{G^*}$ is the set of all Structural Subworlds of $w_{G^*}$, and $\mathcal{S}_{G^*}=\mathcal{W}_0$, this means:

$$
\forall w \in \mathcal{W}_0,\; D_w \subseteq D_{w_{G^*}} \ \text{and} \ \Phi_w \subseteq \Phi_{w_{G^*}}.
$$

              In particular, the proposition set $\Phi_{w_{G^*}}$ of $w_{G^*}$ must contain the proposition set of every other World.
3. Now consider the main World $w_{G^*}$ of God $G^*$. By the Axiom of Infinite Expandability of Propositions, there exists another World $w' \in \mathcal{W}_0$ such that:

$$
\Phi_{w_{G^*}} \subsetneq \Phi_{w'}.
$$

4. But by point 2, since $w' \in \mathcal{W}_0$, we must have $\Phi_{w'} \subseteq \Phi_{w_{G^*}}$.
5. This contradicts the conclusion of point 3 that $\Phi_{w_{G^*}} \subsetneq \Phi_{w'}$, because one set cannot be both a proper superset of another and a subset of it.
6. Therefore, the original assumption that a Universal God exists is false. Hence no Universal God $G^*$ exists.
\end{proof}

\begin{remark}
This proof does not depend on the concrete content of a World (individuals, truth values), but uses only two basic facts:
1. The existence of a Universal God implies the existence of a World whose proposition set contains the proposition sets of all other Worlds.
2. Infinite expandability of propositions guarantees that such a World cannot exist.
A Universal God would attempt to control the entire working world universe on the basis of some main World, but under the assumption of infinitely expandable propositions, the working world universe contains no World with a maximal proposition set.
\end{remark}

\begin{corollary}[Logical Necessity of Polytheism]
For any God, its range of control must necessarily be local. That is, there exist multiple Gods $G_1, G_2, \dots, G_n$, corresponding respectively to different main Worlds $w_{G_1}, w_{G_2}, \dots, w_{G_n}$, such that:

$$
\mathcal{S}_{G_i} \subsetneq \mathcal{W}_0, \quad \bigcup_{i=1}^n \mathcal{S}_{G_i} \subseteq \mathcal{W}_0.
$$

Logically speaking, **Polytheism** is a necessary consequence within this framework.
\end{corollary}

The No Universal God Theorem does not assert that God does not exist. Rather, it precisely proves that the concept of a "Universal God" is logically incoherent. It presents a picture in which divinity is local, hierarchical, and bound to specific Worlds. The absolute, all-governing sole ruler, under the scrutiny of logic, is nothing more than an unrealizable illusion.

## Character God

In narrative works, authors often create characters with nearly godlike power. Such characters may seem omnipotent within the scope of their own stories, yet the plot explicitly shows the boundaries of their power as well (for example, being unable to alter a certain cosmic law, unable to interfere with another dimension, or facing a question they cannot answer). In order to capture this concept precisely within the formal framework, and to distinguish it from the "God" defined earlier, we introduce the concept of **Character God**.

\begin{definition}[Character God]

A **Character God** is a narrative weakening of the structure of God. It is still a quadruple

$$
G = (w_G, \mathcal{S}_G, \pi, \Vdash_G),
$$

where the definitions of $w_G$, $\mathcal{S}_G$, and $\pi$ are the same as in Definition the relevant section, but the cognition relation $\Vdash_G$ is no longer required to satisfy the Omniscience Axiom; it is only required to satisfy the Consistency Axiom: if $(w',\varphi)\in\Vdash_G$, then $\models_{w'}(\varphi)=\text{true}$.

If there exists a nonempty **restriction set (Restriction Set)** $R_G \subseteq \Phi_{w_G}$ such that every true proposition in it is not known by the Character God, namely,

$$
\forall \varphi \in R_G,\; \models_{w_G}(\varphi)=\text{true}\Rightarrow (w_G, \varphi) \notin \Vdash_G,
$$

then $G$ is called a **Character God**.
The propositions in the set $R_G$ are called the Character God's **Unknown Propositions** or **Restricted Propositions**.
\end{definition}

\begin{remark}
The definition of Character God reflects a **narrative weakening** of divinity:
- A Character God is structurally similar to God: it has a main World, a range of control, a projection function, and a cognition relation.
- Its key difference from God is that the Omniscience Axiom is weakened. A Character God is not omniscient with respect to its main World; it has a definite cognitive blind spot $R_G$.
\end{remark}

\begin{theorem}[Properties of Character God]
Let $G$ be a Character God whose restriction set is $R_G$.
1. $G$ is **not omniscient** with respect to its main World. That is, $\exists \varphi \in \Phi_{w_G}$ such that $(w_G, \varphi) \notin \Vdash_G$.
2. The cognition relation $\Vdash_G$ of $G$ remains **consistent** over its range of control $\mathcal{S}_G$ (it never knows falsehoods), but is **incomplete** (there exist true propositions that it does not know).
3. If $R_G = \Phi_{w_G}$, then $G$ knows nothing about its main World. This is an extreme case, which may be called an **Ignorant God**.
\end{theorem}

\begin{definition}[Strength of Divinity]
We may use the size of the restriction set to roughly measure a Character God's **Strength of Divinity**:
- If $|R_G| = 0$, then $G$ is a true **God**.
- If $0 < |R_G| \ll |\Phi_{w_G}|$, then $G$ is a **Nearly Omnipotent Being**.
- If $|R_G| \approx |\Phi_{w_G}|$, then $G$ is an **Extremely Restricted Being**.
This way of measuring provides a formal yardstick for comparing the powers of "godlike characters" across different narratives.
\end{definition}

\begin{theorem}[No Universal Character God Theorem]
A **Universal Character God** (that is, a Character God satisfying $\mathcal{S}_G = \mathcal{W}_0$) likewise does not exist.
\end{theorem}

\begin{proof}
Assume that a Universal Character God $G^*$ exists. By definition, $\mathcal{S}_{G^*} = \mathcal{W}_0$.
As in the proof of Theorem the relevant section, this requires the proposition set of $w_{G^*}$ to contain the proposition sets of all other Worlds.
But by the Axiom of Infinite Expandability of Propositions, such a World cannot exist.
Therefore, a Universal Character God $G^*$ also does not exist.
\end{proof}

The introduction of the concept of Character God completes our formal construction of divinity.
It allows us, without violating the No Universal God Theorem, to rigorously analyze and discuss those "godlike" characters in narrative works who possess immense power but also definite limits. Whether a character is "God" is no longer a vague matter of literary commentary, but a mathematical question that can be determined precisely by analyzing its cognitive boundary $R_G$.
