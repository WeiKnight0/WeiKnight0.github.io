---
title: Digital Image Generation of OCs
description: Digital image generation from written settings, feature vectors, reference sheets, and error analysis.
order: 6
---

This section discusses how an OC character image gradually develops from a written setting into a reusable visual form. "Digital image generation" here refers not only to automatic image generation, but also to the process by which an artist uses a tablet, drawing software, layers, brushes, and reference materials to draw an OC.

In the earlier OC Transform Theory, the nature of an OC was abstracted as the Feature Vector Function $\mathbf{q}(t)$. But in actual commissions or drawing practice, a Creator does not hand the artist $\mathbf{q}(t)$ in the form of a mathematical table. What the artist actually receives is usually a textual description, a reference sheet, a color palette, reference images, plot notes, or notes on personality.

Therefore, digital image generation for OCs can be divided into two main directions:
1. **From Written Setting to Reference Sheet**: turning a linguistic description into the first stable visual baseline.
2. **From Reference Sheet to More Artwork**: drawing images of the OC in different poses, expressions, clothing states, scenes, and compositions on the basis of an existing visual baseline.

These two directions correspond to two key problems in the production of OC imagery: first, the question of what the OC actually looks like must be settled; only then can the same OC remain consistent across more images.

## Image Generation Based on Written Settings

This subsection discusses the first chain: **from written setting to reference sheet**. Written settings are the most common initial carrier of information about an OC. For example, a Creator might write: "long silver hair, red eyes, a black dress, a cold personality, uses ice abilities." Such descriptions can tell the artist the general direction of the character, but they are not yet a directly reusable visual baseline.

Text expresses concepts, but a reference sheet must provide concrete form. The same phrase "long silver hair" may mean straight hair, curly hair, a low ponytail, twin tails, or waist-length hair; it may also mean a cool silver with blue-gray shadows, or a nearly white highlighted silver. Likewise, "black dress" may mean a gothic dress, an evening dress, a uniform-style dress, or a combat-oriented short dress, and it may include lace, metal buckles, a shawl, or an irregular hem. The shorter the written description, the more gaps the first reference sheet must fill in.

In the language of the Feature Vector Function, a written setting may be regarded as a low-density description of $\mathbf{q}(t)$. It constrains only part of the features, such as hair color, eye color, clothing category, personality atmosphere, and ability direction, but it does not fully determine the hairstyle outline, clothing layering, material, color proportions, or detail placement.

This indeterminacy mainly comes from three kinds of missing information:
1. **Missing Shape**: the text states what is present, but does not specify outline, proportion, or structure. For example, a "cape" may be very short or may trail along the ground; "horns" may be ram horns, dragon horns, or deer antlers.
2. **Missing Color and Material**: the text gives color names, but does not specify brightness, saturation, texture, or reflectivity. For example, a "white coat" may be cotton, leather, down, or metallic armor.
3. **Missing Relations**: the text lists multiple elements, but does not say how they are combined. For example, "black dress, red gem, silver chain" does not automatically state whether the gem is on the chest, the belt, or a hair ornament.

Therefore, turning text into a reference sheet is essentially a process of interpretation and fixation. The artist first understands the text, then fills in what is left unsaid according to experience, aesthetics, and style, and finally fixes that completion result into a visual baseline that can be used for later reference.

This process can be represented by the simplified model:

$$
I_{\text{reference sheet}}=G_{\text{text}\to\text{ref}}(T,A),
$$

where $T$ represents the written setting, $A$ represents the artist's interpretation, experience, and style, and $I_{\text{reference sheet}}$ represents the generated reference sheet. This formula is not for calculation, but to show that a reference sheet is not determined by text alone; it also contains the artist's visual judgment in the blank spaces of the text.

Once the text-to-reference-sheet process is complete, the OC acquires its first stable visual baseline. At this point, the reference sheet may be approximately regarded as a visual sampling of $\mathbf{q}(t)$ at some initial state $t_0$:

$$
I_{\text{reference sheet}}\approx \operatorname{Sample}(\mathbf{q}(t_0))
$$

Here, "sampling" means converting the abstract OC traits into a concrete visible image. A reference sheet cannot contain all possible states of an OC, but it fixes the most important reference baseline for later artwork.

## Image Generation Based on the Feature Vector Function

This subsection discusses the second chain: **from reference sheet to more artwork**. Once a reference sheet exists, later artwork no longer starts from interpreting the text from scratch, but uses the reference sheet as the visual baseline and draws the OC under different actions, expressions, scenes, and style requirements.

The reference sheet is not an ordinary reference image, but a visual manual of the OC's traits. It compresses a large amount of material that would otherwise require extensive textual explanation into observable form, color, and structure. The task of later artwork is to place the OC into new images without damaging those stable traits.

### Stable Traits Provided by the Reference Sheet

A complete reference sheet is usually more than just "a pretty drawing." Its function is explanatory. Different parts solve different problems:
1. **Front View**: explains the character's main identifying points, such as hairstyle, face shape, front clothing structure, and main color scheme.
2. **Side View and Back View**: explain structures not visible from the front, such as hair length, cape connections, back decorations, and weapon mounting positions.
3. **Color Palette**: fixes colors and avoids deviations in how different artists interpret words like "red," "blue," or "silver."
4. **Clothing Breakdown**: explains the layering relations of the clothes, such as whether the coat is outside or inside the shawl, and whether the belt presses down the skirt or hangs on the outer layer.
5. **Expression and Pose References**: explain how the character's personality is expressed through face and body language.
6. **Detail Enlargements**: explain small but highly recognizable parts such as eye patterns, badges, earrings, weapon textures, and weapon engravings.

All of this information reduces deviation in later artwork. Pure text forces the artist to imagine "what it looks like," whereas a reference sheet directly tells the artist "it generally looks like this." Therefore, the more complete the reference sheet is, the easier it is for later artwork to maintain character consistency.

### From Reference Sheet to New Artwork

When an artist sees a reference sheet, they do not simply copy the original image into a new picture. The actual drawing process is closer to extracting stable traits and then recombining them in a new image. For example, if a new action is to be drawn, the artist must first determine what must be preserved and what can change with the action.

This understanding process can be divided into several steps:
1. **Reading the Silhouette**: first confirm the character's overall form, such as the outer contour of the hair, clothing silhouette, weapon length, and the positions of wings or tail.
2. **Confirming Proportions**: determine the head-to-body ratio, shoulder width, leg length, hand and foot size, and so on. Once proportions change, the character's temperament also changes.
3. **Decomposing Layers**: understand the front-back relations of clothes and ornaments, such as whether a bow sits on top of the shirt, whether a cape is behind the coat, and whether a waist seal presses down the skirt waist.
4. **Identifying Key Points**: determine which identifying traits of this OC are absolutely indispensable, such as eye shape, hair ornaments, horns, color scheme, tattoos, weapons, or a special symbol.
5. **Inferring Variation**: infer how hair, fabric, and ornaments move when the character turns, raises a hand, runs, or is blown by wind.
6. **Matching the Style**: translate the reference sheet into the style required by the current piece. Thick painting, cel shading, chibi art, standing illustrations, and portraits all make different tradeoffs in detail.

The reference sheet provides constraints, and the artist must complete a new image within those constraints. Good later artwork is not a mechanical copy of the reference sheet, but a new composition in which the viewer can still recognize "this is the same OC."

This process can be represented by the simplified model:

$$
I_{\text{artwork}}=G_{\text{ref}\to\text{art}}(I_{\text{reference sheet}},C),
$$

where $I_{\text{reference sheet}}$ is the visual baseline, $C$ represents the composition, action, expression, lighting, scene, and style requirements of the new piece, and $I_{\text{artwork}}$ is the final artwork.

If described using the Feature Vector Function, later artwork may be approximately regarded as a visual sampling of $\mathbf{q}(t)$ in another state $t_1$:

$$
I_{\text{artwork}}\approx \operatorname{Sample}(\mathbf{q}(t_1),C)
$$

where $t_1$ does not necessarily represent real time; it may also represent a new expression state, action state, or plot state.

## Generation Workflow in Digital Drawing

From the perspective of digital drawing, an OC illustration usually goes through the following stages:
1. **Sketch Stage**: determine composition, action, and overall proportion. The focus at this stage is not detail, but whether the character stands convincingly and whether the pose fits the personality.
2. **Structural Refinement**: correct anatomy, perspective, clothing layers, and prop positions. Complex OCs are often most likely to go wrong at this stage.
3. **Line Art Stage**: fix the structure and determine which lines are contour lines and which are internal details.
4. **Flat Color Stage**: lay down the character's base colors and check whether they match the palette or the Creator's requirements.
5. **Light and Shadow Stage**: add shadows and light sources so that the character becomes a volumetric image rather than a flat setting.
6. **Material and Effect Stage**: render cloth, metal, leather, gems, flames, ice crystals, magic circles, and other special effects.
7. **Proofreading Stage**: check whether the hairstyle, color scheme, ornaments, clothing layers, and character atmosphere have deviated from the original setting.

In this workflow, the earlier stages affect the whole picture more, while the later stages affect the degree of completion more. If the sketch stage already misinterprets the character's proportions, then even beautiful coloring later may still fail to resemble the original OC. If the structure is correct but the materials are rendered insufficiently, the character will still be recognizable, but the degree of completion will be lower.

## Two Types of Generation Error

Deviation in OC image generation mainly comes in two types.

The first type is **error from text to reference sheet**. It comes from the incompleteness of linguistic description. For example, the Creator may write "short jacket" without specifying length, material, cuffs, buttons, or inner layers, so the artist must make those choices. Error at this stage affects the OC's first visual baseline.

The second type is **error from reference sheet to more artwork**. It comes from viewpoint, action, expression, light, composition, and style conversion. For example, a chest badge visible from the front on the reference sheet may be blocked by an arm in a side pose; long hair may lift when running; a chibi illustration may omit some complex ornaments. At this stage, the key is not pixel-level identity, but consistency of the core identifying traits.

Therefore, the relation among text, reference sheet, and more artwork is not one of simple copying, but of layered constraint. Text provides direction, the reference sheet fixes the appearance, and more artwork extends the visible states of the OC on that basis.

## Section Summary

The digital image generation of an OC mainly includes two directions: turning a written setting into a reference sheet, and turning a reference sheet into more artwork. The former answers the question "what is the visual baseline of this OC," while the latter answers the question "how can this OC continue to remain consistent across different images."

In the language of OC Transform Theory, a written setting is a low-density description of $\mathbf{q}(t)$, a reference sheet is the initial visual sampling of $\mathbf{q}(t_0)$, and later artwork is a new sampling of $\mathbf{q}(t)$ under different states and drawing conditions. In this way, text, reference sheet, and artwork are unified under the same framework for describing OC traits.
