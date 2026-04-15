# Chapter 3: Calculus and Linear Algebra

**Source:** *A Practical Guide to Quantitative Finance Interviews* — Xinfeng Zhou

> Calculus and linear algebra lay the foundation for many advanced math topics used in quantitative finance. This chapter focuses on the core concepts that are frequently tested in quantitative interviews — without covering every proof or caveat. If any topic feels rusty, review a calculus or linear algebra textbook before your interview.

---

## Table of Contents

- [3.1 Limits and Derivatives](#31-limits-and-derivatives)
  - [Basics of Derivatives](#basics-of-derivatives)
  - [Maximum and Minimum](#maximum-and-minimum)
  - [L'Hospital's Rule](#lhospitals-rule)
- [3.2 Integration](#32-integration)
  - [Basics of Integration](#basics-of-integration)
  - [Applications of Integration](#applications-of-integration)
  - [Expected Value Using Integration](#expected-value-using-integration)
- [3.3 Partial Derivatives and Multiple Integrals](#33-partial-derivatives-and-multiple-integrals)
- [3.4 Important Calculus Methods](#34-important-calculus-methods)
  - [Taylor's Series](#taylors-series)
  - [Newton's Method](#newtons-method)
  - [Lagrange Multipliers](#lagrange-multipliers)
- [3.5 Ordinary Differential Equations](#35-ordinary-differential-equations)
  - [Separable Differential Equations](#separable-differential-equations)
  - [First-Order Linear Differential Equations](#first-order-linear-differential-equations)
  - [Homogeneous Linear Equations](#homogeneous-linear-equations)
  - [Nonhomogeneous Linear Equations](#nonhomogeneous-linear-equations)
- [3.6 Linear Algebra](#36-linear-algebra)
  - [Vectors](#vectors)
  - [QR Decomposition and Linear Least Squares](#qr-decomposition-and-linear-least-squares)
  - [Determinant, Eigenvalue, and Eigenvector](#determinant-eigenvalue-and-eigenvector)
  - [Positive Semidefinite and Positive Definite Matrices](#positive-semidefinite-and-positive-definite-matrices)
  - [LU Decomposition and Cholesky Decomposition](#lu-decomposition-and-cholesky-decomposition)

---

## 3.1 Limits and Derivatives

### Basics of Derivatives

**Derivative definition:**
```
f'(x) = dy/dx = lim(Δx→0) Δy/Δx = lim(Δx→0) [f(x+Δx) - f(x)] / Δx
```

**Product rule:** If `u = u(x)` and `v = v(x)` and their respective derivatives exist:
```
d(uv)/dx = u·(dv/dx) + v·(du/dx)    or equivalently    (uv)' = u'v + uv'
```

**Quotient rule:**
```
d(u/v)/dx = [v·(du/dx) - u·(dv/dx)] / v²    or equivalently    (u/v)' = (u'v - uv') / v²
```

**Chain rule:** If `y = f(u(x))` and `u = u(x)`, then:
```
dy/dx = (dy/du) · (du/dx)
```

**Generalized power rule:**
```
d(yⁿ)/dx = n·yⁿ⁻¹ · (dy/dx)    for all n ≠ 0
```

---

**Useful limits and equations:**

| Formula | Notes |
|---------|-------|
| `aˣ = eˣ·ˡⁿᵃ` | Converts exponential bases |
| `ln(ab) = ln a + ln b` | Log product rule |
| `eˣ = lim(n→∞) (1 + x/n)ⁿ` | Definition of e |
| `lim(x→0) sin(x)/x = 1` | Fundamental trig limit |
| `lim(x→0) (1 + kx)^(1/x) = eᵏ` | Generalizes (1+x)^(1/x) → e |
| `lim(x→∞) ln(x)/xʳ = 0` for any `r > 0` | Log grows slower than any power |
| `lim(x→∞) xʳ·e⁻ˣ = 0` for any `r` | Exponential dominates any power |

**Derivative formulas:**
```
d/dx(eᵘ)   = eᵘ · du/dx
d/dx(aᵘ)   = aᵘ · ln(a) · du/dx
d/dx(ln u) = (1/u) · du/dx
d/dx(sin x) = cos x
d/dx(cos x) = -sin x
d/dx(tan x) = sec²x
```

---

**Problem — Derivative of `y = (ln x)^(ln x)`**

**Question:** What is the derivative of `y = (ln x)^(ln x)`?

> **Hint:** For functions of the form `y = f(x)^(g(x))`, take the natural log of both sides and differentiate, using `d(ln y)/dx = (1/y)·(dy/dx)`.

**Solution:**

Take `ln` of both sides:
```
ln y = ln[(ln x)^(ln x)] = ln(x) · ln(ln x)
```

Differentiate both sides with respect to x using the chain rule and product rule:
```
(1/y) · dy/dx = d/dx[ln(x) · ln(ln x)]
              = ln(ln x) · (1/x) + ln(x) · d/dx[ln(ln x)]
```

To compute `d/dx[ln(ln x)]`, apply the chain rule with `v = ln x`:
```
d/dx[ln(ln x)] = d/dv[ln v] · dv/dx = (1/v) · (1/x) = 1/(x · ln x)
```

Substituting back:
```
(1/y) · dy/dx = ln(ln x)/x + ln(x)/(x · ln x) = ln(ln x)/x + 1/x = [ln(ln x) + 1] / x
```

Therefore:
```
dy/dx = y · [ln(ln x) + 1] / x = (ln x)^(ln x) · [ln(ln x) + 1] / x
```

---

### Maximum and Minimum

`f'(x)` is the slope of the tangent line to `y = f(x)` and the instantaneous rate of change of `y` with respect to `x`.

- If `f'(c) > 0`: `f(x)` is increasing at `c`
- If `f'(c) < 0`: `f(x)` is decreasing at `c`

**Local extremum:** If `f(x)` is differentiable on an open interval containing `c` and `f(c)` is a local max or min, then `f'(c) = 0`.

**Second derivative test:** Suppose `f''(x)` is continuous near `c`:
- If `f'(c) = 0` and `f''(c) > 0`: local **minimum** at `c`
- If `f'(c) = 0` and `f''(c) < 0`: local **maximum** at `c`

---

**Problem — eᵠ vs. πe**

**Question:** Without numerical calculation, which is larger: `eᵠ` or `πe`?

**Solution (Calculus approach):**

Taking natural logs of both sides, the question reduces to: is `π·ln e = π` larger or smaller than `e·ln π`? Equivalently, is `π/ln π > e/ln e`? Equivalently, is `ln(e)/e > ln(π)/π`, i.e., does `f(x) = ln(x)/x` satisfy `f(e) > f(π)`?

Taking the derivative:
```
f'(x) = [(1/x)·x - ln x] / x² = (1 - ln x) / x²
```

`f'(x) = 0` when `ln x = 1`, i.e., `x = e`. Since `f'(x) < 0` for `x > e` (because `ln x > 1`), `f(x)` is strictly decreasing for `x > e`.

Since `π > e`, we have `f(π) < f(e)`:
```
ln(π)/π < ln(e)/e = 1/e  →  e·ln(π) < π  →  ln(πe) < ln(eᵠ)  →  πe < eᵠ
```

**Therefore: `eᵠ > πe`.**

**Alternative (Taylor's series):**
Since `eˣ > 1 + x` for all `x > 0` (from the Taylor series), let `x = π/e - 1 > 0`:
```
e^(π/e - 1) > π/e  →  e^(π/e) > π  →  eᵠ > πe  ✓
```

---

### L'Hospital's Rule

If `f(x)` and `g(x)` are differentiable at `x → a`, `g'(a) ≠ 0`, and either:
- `lim f(a) = 0` and `lim g(a) = 0`, or
- `lim f(a) → ±∞` and `lim g(a) → ±∞`

then:
```
lim[x→a] f(x)/g(x) = lim[x→a] f'(x)/g'(x)
```

L'Hospital's rule converts an indeterminate form (`0/0` or `∞/∞`) into a determinate one.

---

**Problem — Two limits**

**Question:** What is the limit of `eˣ/x²` as `x → ∞`, and what is the limit of `x²·ln x` as `x → 0⁺`?

**Solution:**

**Limit 1:** `lim(x→∞) eˣ/x²`

Both `eˣ → ∞` and `x² → ∞`, so apply L'Hospital's rule:
```
lim eˣ/x² = lim eˣ/(2x)   [still ∞/∞, apply again]
           = lim eˣ/2 = ∞
```

**Therefore: `lim(x→∞) eˣ/x² = ∞`.**

**Limit 2:** `lim(x→0⁺) x²·ln x`

This is a `0 · (-∞)` form. Rewrite as `ln(x) / (1/x²)`, which is `(-∞)/∞`. Now apply L'Hospital's rule:
```
lim x²·ln x = lim ln(x)/(1/x²) = lim (1/x)/(-2/x³) = lim (-x²/2) = 0
```

**Therefore: `lim(x→0⁺) x²·ln x = 0`.**

---

## 3.2 Integration

### Basics of Integration

If `F'(x) = f(x)`, then `F(x)` is an **antiderivative** of `f(x)`. The **Fundamental Theorem of Calculus**:
```
∫ₐᵇ f(x)dx = [F(x)]ₐᵇ = F(b) - F(a)

d/dx [∫ₐˣ f(t)dt] = f(x),    F(a) = yₐ,    F(x) = yₐ + ∫ₐˣ f(t)dt
```

**Generalized power rule (reverse):**
```
∫ uᵏ du = u^(k+1)/(k+1) + c    for k ≠ -1
```

**Integration by substitution:**
```
∫ f(g(x))·g'(x) dx = ∫ f(u) du    where u = g(x), du = g'(x)dx
```

**Definite integral substitution:**
```
∫ₐᵇ f(g(x))·g'(x) dx = ∫_{g(a)}^{g(b)} f(u) du
```

**Integration by parts:**
```
∫ u dv = uv - ∫ v du
```

---

**Problem A — ∫ ln(x) dx**

**Solution:** Apply integration by parts with `u = ln x` and `dv = dx`, so `du = (1/x)dx` and `v = x`:
```
d(uv) = v du + u dv = (x · 1/x)dx + ln x · dx = dx + ln x · dx
```

Therefore:
```
∫ ln x dx = x ln x - ∫ dx = x ln x - x + c
```

**Result: `∫ ln x dx = x ln x - x + c`**

---

**Problem B — ∫₀^(π/6) sec(x) dx**

**Solution:** We need `∫ sec x dx`. Start from trig derivatives. We only need to remember:
```
d/dx(sin x) = cos x    and    d/dx(cos x) = -sin x
```

All others follow from the product or quotient rule:
```
d/dx(sec x) = d/dx(1/cos x) = sin x / cos²x = sec x · tan x

d/dx(tan x) = d/dx(sin x / cos x) = (cos²x + sin²x)/cos²x = sec²x

d/dx(sec x + tan x) = sec x · tan x + sec²x = sec x · (tan x + sec x)
```

Since `(sec x + tan x)` appears in the derivative of `(sec x + tan x)`, we have:
```
d/dx [ln|sec x + tan x|] = sec x · (sec x + tan x) / (sec x + tan x) = sec x
```

Therefore: `∫ sec x dx = ln|sec x + tan x| + c`

For the definite integral:
```
∫₀^(π/6) sec x dx = ln(sec(π/6) + tan(π/6)) - ln(sec(0) + tan(0))
```

Computing the trig values:
```
sec(π/6) = 1/cos(π/6) = 1/(√3/2) = 2/√3
tan(π/6) = sin(π/6)/cos(π/6) = (1/2)/(√3/2) = 1/√3

sec(π/6) + tan(π/6) = 2/√3 + 1/√3 = 3/√3 = √3

sec(0) + tan(0) = 1 + 0 = 1
```

**Result:**
```
∫₀^(π/6) sec x dx = ln(√3) - ln(1) = ln(√3)
```

---

### Applications of Integration

**Problem A — Volume of intersecting cylinders**

**Question:** Two cylinders each with radius 1 intersect at right angles and their centers also intersect. What is the volume of the intersection?

**Solution:**

This is an application of integration for volume calculation. Orient the cylinders so their axes lie along the x-axis and y-axis respectively:
```
Cylinder 1 (axis along x): y² + z² ≤ 1
Cylinder 2 (axis along y): x² + z² ≤ 1
```

The general volume formula is `V = ∫ A(z) dz` where `A(z)` is the cross-sectional area cut by a horizontal plane at height `z`.

**Finding A(z):** At height `z`, the cross-section must satisfy both constraints:
- From cylinder 1: `|y| ≤ √(1 - z²)`
- From cylinder 2: `|x| ≤ √(1 - z²)`

This is a **square** with side length `2√(1 - z²)`, so:
```
A(z) = (2√(1 - z²))² = 4(1 - z²)
```

**Computing the volume** (using symmetry about `z = 0`):
```
V = 2 × ∫₀¹ 4(1 - z²) dz = 8 × [z - z³/3]₀¹ = 8 × (1 - 1/3) = 8 × (2/3) = 16/3
```

**Result: `V = 16/3`**

**Alternative approach (inscribed sphere):**

A sphere of radius `r = 1` (same as the cylinders) fits inside both cylinders and is therefore inscribed in their intersection. Its volume is `V_sphere = (4/3)π`.

At every height `z`, the sphere's circular cross-section (area `π(1-z²)`) is inscribed in the intersection's square cross-section (area `4(1-z²)`). The ratio is constant:
```
A_circle / A_square = π(1-z²) / 4(1-z²) = π/4    for all z
```

Since this ratio is constant for every z-slice:
```
V_sphere / V_intersection = π/4  →  V_intersection = (4/π) × V_sphere = (4/π) × (4π/3) = 16/3  ✓
```

---

**Problem B — Snow plow problem**

**Question:** Snow began falling at a constant rate some time before noon. At noon, a snow plow began clearing a road, removing a constant volume of snow per unit time. At 1 pm it had moved 2 miles; at 2 pm, 3 miles. When did the snow begin to fall?

**Solution:**

Let `t = 0` denote noon and let `T` be the number of hours before noon when snow began falling. Define:
- `c₁` = volume of snow the plow removes per hour (constant)
- `c₂` = rate of cross-sectional area increase per hour (constant snowfall rate)
- `A(t) = c₂(t + T)` = cross-sectional area of snow at time `t` after noon

The plow's speed is inversely proportional to the snow depth it must clear:
```
v(t) = c₁ / A(t) = c₁ / [c₂(t + T)] = c / (t + T)    where c = c₁/c₂
```

Distance traveled from `t = 0` to `t = t₁`:
```
∫₀^(t₁) c/(t + T) dt = c · ln((t₁ + T)/T)
```

Applying the given conditions:
```
c · ln((1 + T)/T) = 2    ...(1)
c · ln((2 + T)/T) = 3    ...(2)
```

Dividing equation (2) by equation (1):
```
ln((2 + T)/T) / ln((1 + T)/T) = 3/2
```

Let `k = e^(1/c)`. Then from equations (1) and (2):
```
(1 + T)/T = k²    →    1/T = k² - 1
(2 + T)/T = k³    →    1/T = k³ - k²
```

Setting these equal:
```
k³ - k² = k² - 1  →  k³ - 2k² + 1 = 0  →  (k-1)(k² - k - 1) = 0
```

Since `k = e^(1/c) > 1` (strictly), we discard `k = 1`. The remaining factor gives:
```
k² - k - 1 = 0  →  k = (1 + √5)/2    (taking the positive root)
```

This is the **golden ratio φ ≈ 1.618**. Since `T = 1/(k² - 1) = 1/k` (using `k² = k + 1`):
```
T = 1/k = 2/(1 + √5) = (√5 - 1)/2 ≈ 0.618 hours ≈ 37 minutes
```

**The snow began to fall approximately (√5−1)/2 hours ≈ 37 minutes before noon.**

> This problem tests analytical skills, integration knowledge, and algebra. The key steps are: (1) correctly modeling the plow speed, (2) setting up the distance integrals, and (3) solving the resulting transcendental equation.

---

### Expected Value Using Integration

Integration is used extensively in probability to compute conditional and unconditional expectations. A key example:

**Problem — E[X | X > 0] for a standard normal**

**Question:** If `X ~ N(0, 1)`, what is `E[X | X > 0]`?

**Solution:**

The standard normal pdf is `f(x) = (1/√(2π)) e^(-x²/2)`. The conditional expectation is:
```
E[X | X > 0] = ∫₀^∞ x · f(x) dx  /  P(X > 0)
```

**Computing the numerator** using the substitution `u = -x²/2`, so `du = -x dx`:
```
∫₀^∞ x · (1/√(2π)) e^(-x²/2) dx = (1/√(2π)) ∫₀^∞ e^u (-du)  [limits: x=0→u=0, x=∞→u=-∞]
                                  = (1/√(2π)) [-e^(-x²/2)]₀^∞
                                  = (1/√(2π)) · (0 - (-1)) = 1/√(2π)
```

**Dividing by** `P(X > 0) = 1/2`:
```
E[X | X > 0] = (1/√(2π)) / (1/2) = 2/√(2π) = √(2/π) ≈ 0.7979
```

**Result: `E[X | X > 0] = √(2/π)`**

---

## 3.3 Partial Derivatives and Multiple Integrals

**Partial derivative** of `w = f(x, y)` with respect to `x`:
```
∂f/∂x (x₀, y₀) = lim(Δx→0) [f(x₀ + Δx, y₀) - f(x₀, y₀)] / Δx
```

**Second-order partial derivatives:**
```
∂²f/∂x² = ∂/∂x (∂f/∂x)
∂²f/∂x∂y = ∂/∂x (∂f/∂y) = ∂/∂y (∂f/∂x)    (equality holds when partials are continuous)
```

**General chain rule:** If `w = f(x₁, x₂, ..., xₘ)` and each `xᵢ` is a function of variables `t₁, t₂, ..., tₙ`, and all first-order partial derivatives are continuous, then for each `tᵢ` (`1 ≤ i ≤ n`):
```
∂w/∂tᵢ = (∂w/∂x₁)(∂x₁/∂tᵢ) + (∂w/∂x₂)(∂x₂/∂tᵢ) + ... + (∂w/∂xₘ)(∂xₘ/∂tᵢ)
```

**Changing Cartesian integrals to polar integrals:**

The Cartesian coordinates `(x, y)` map to polar coordinates via `x = r cosθ`, `y = r sinθ`. Over a polar region `R`:
```
∬_R f(x, y) dx dy = ∬ f(r cosθ, r sinθ) · r dr dθ
```

The extra factor of `r` (the Jacobian) is essential.

---

**Problem — Compute `∫₋∞^∞ e^(-x²/2) dx`**

**Solution:**

Recall that the pdf of `N(0,1)` is `f(x) = (1/√(2π)) e^(-x²/2)`, and by definition `∫₋∞^∞ f(x)dx = 1`, so `∫₋∞^∞ e^(-x²/2)dx = √(2π)`. Here is the proof using polar integrals:

Let `I = ∫₋∞^∞ e^(-x²/2) dx`. Then:
```
I² = (∫₋∞^∞ e^(-x²/2) dx)(∫₋∞^∞ e^(-y²/2) dy) = ∬_ℝ² e^(-(x²+y²)/2) dx dy
```

Convert to polar coordinates `(x² + y² = r², dx dy = r dr dθ)`:
```
I² = ∫₀^(2π) ∫₀^∞ e^(-r²/2) · r dr dθ = 2π · ∫₀^∞ r e^(-r²/2) dr
```

Evaluate using the substitution `u = -r²/2`, `du = -r dr`:
```
∫₀^∞ r e^(-r²/2) dr = [-e^(-r²/2)]₀^∞ = 0 - (-1) = 1
```

Therefore: `I² = 2π · 1 = 2π`, so **`I = ∫₋∞^∞ e^(-x²/2) dx = √(2π)`**.

---

## 3.4 Important Calculus Methods

### Taylor's Series

**One-dimensional Taylor's series** expands `f(x)` around a point `x = x₀`:
```
f(x) = f(x₀) + f'(x₀)(x - x₀) + f''(x₀)/2! · (x - x₀)² + ... + f⁽ⁿ⁾(x₀)/n! · (x - x₀)ⁿ + ...
```

**At `x₀ = 0` (Maclaurin series):**
```
f(x) = f(0) + f'(0)x + f''(0)/2! · x² + ... + f⁽ⁿ⁾(0)/n! · xⁿ + ...
```

**Three essential expansions at `x₀ = 0`:**
```
eˣ   = Σ xⁿ/n!        = 1 + x + x²/2! + x³/3! + ...

sin x = Σ (-1)ⁿ x^(2n+1)/(2n+1)!  = x - x³/3! + x⁵/5! - x⁷/7! + ...

cos x = Σ (-1)ⁿ x^(2n)/(2n)!      = 1 - x²/2! + x⁴/4! - x⁶/6! + ...
```

**Remainder term:** The Taylor series can be expressed as `f(x) = Tₙ(x) + Rₙ(x)` where:
```
Rₙ(x) = f⁽ⁿ⁺¹⁾(x̄) / (n+1)! · (x - x₀)^(n+1)    for some x̄ between x₀ and x
```

If `M = max|f⁽ⁿ⁺¹⁾(x)|` over `[x₀, x]`, then `|Rₙ(x)| ≤ M · |x - x₀|^(n+1) / (n+1)!`

---

**Problem A — What is i^i?**

**Solution:**

First, prove **Euler's formula** `e^(iθ) = cos θ + i sin θ` using Taylor series:
```
e^(iθ) = 1 + (iθ)/1! + (iθ)²/2! + (iθ)³/3! + (iθ)⁴/4! + (iθ)⁵/5! + ...
        = 1 + iθ - θ²/2! - iθ³/3! + θ⁴/4! + iθ⁵/5! - ...

cos θ = 1 - θ²/2! + θ⁴/4! - ...
sin θ = θ - θ³/3! + θ⁵/5! - ...    →    i sin θ = iθ - iθ³/3! + iθ⁵/5! - ...
```

Combining the real and imaginary parts: **`e^(iθ) = cos θ + i sin θ`** ✓

**Special values:**
- `θ = π`: `e^(iπ) = cos π + i sin π = -1` → **Euler's identity: `e^(iπ) + 1 = 0`**
- `θ = π/2`: `e^(iπ/2) = cos(π/2) + i sin(π/2) = i`

**Computing i^i:**

Since `e^(iπ/2) = i`, we have `ln i = iπ/2`. Therefore:
```
i^i = e^(i · ln i) = e^(i · iπ/2) = e^(i²π/2) = e^(-π/2) ≈ 0.2079
```

**Result: `i^i = e^(-π/2)`** — a real number.

---

**Problem B — Bernoulli's Inequality**

**Question:** Prove that `(1 + x)ⁿ > 1 + nx` for all `x > -1` and all integers `n ≥ 2`.

**Solution 1 — Taylor's series:**

Let `f(x) = (1 + x)ⁿ`. Note that `1 + nx` is the first two terms of the Taylor series of `f(x)` around `x₀ = 0`.

Applying the Taylor series with `x₀ = 0`:
```
f(x) = f(0) + f'(0)·x + f''(x̄)/2! · x²
     = 1 + nx + [n(n-1)(1+x̄)^(n-2)] / 2 · x²    for some x̄ between 0 and x
```

Since `n ≥ 2`, `x > -1`, and `x² > 0`:
- `n ≥ 2 > 0` ✓
- `(n-1) ≥ 1 > 0` ✓
- `(1 + x̄)^(n-2) > 0` (since `x̄ > -1`) ✓

Therefore the remainder term is positive, and `f(x) = (1+x)ⁿ > 1 + nx`. ✓

**Solution 2 — Mathematical induction:**

**Base case (n = 2):** `(1+x)² = 1 + 2x + x² > 1 + 2x` for all `x > -1` since `x² ≥ 0`. ✓

**Inductive step:** Assume `(1+x)ᵏ > 1 + kx` for all `x > -1`. Show `(1+x)^(k+1) > 1 + (k+1)x`:
```
(1+x)^(k+1) = (1+x)ᵏ · (1+x) > (1 + kx)(1 + x)    [inductive hypothesis, since 1+x > 0]
             = 1 + (k+1)x + kx²
             > 1 + (k+1)x    [since kx² ≥ 0]
```

By induction, the inequality holds for all integers `n ≥ 2`. ✓

---

### Newton's Method

Newton's method (also known as the Newton-Raphson method) is an iterative process for solving `f(x) = 0`. Starting from an initial guess `x₀`:
```
x_{n+1} = xₙ - f(xₙ) / f'(xₙ)
```

> **Derivation:** The iteration comes from the first-order Taylor approximation: `f(x_{n+1}) ≈ f(xₙ) + f'(xₙ)(x_{n+1} - xₙ) = 0` → `x_{n+1} = xₙ - f(xₙ)/f'(xₙ)`.

**Convergence:** When Newton's method converges, the convergence rate is **quadratic**:
```
|x_{n+1} - x*| / |xₙ - x*|² < C < 1    where x* is the true root
```

This means errors decrease roughly as the square at each step. Convergence is NOT guaranteed if `x₀` is far from the root or if `f(x)` is not differentiable near the root.

---

**Problem A — Approximate √37 to three digits**

**Solution:** Let `f(x) = x² - 37`. We want to solve `f(x) = 0`. A natural initial guess is `x₀ = 6` (since `6² = 36 ≈ 37`).

Applying one Newton iteration:
```
x₁ = x₀ - f(x₀)/f'(x₀) = 6 - (36 - 37)/(2 × 6) = 6 - (-1/12) = 6 + 1/12 ≈ 6.083
```

Verify: `6.083² ≈ 37.003` ✓

**Alternative (Taylor approximation):** Let `g(x) = √x`, `g'(x) = 1/(2√x)`:
```
√37 ≈ g(36) + g'(36) · (37 - 36) = 6 + (1/12) · 1 = 6.083  ✓
```

**Alternative (Algebra):** Let `x = 6 + y` where `y` is small. Then:
```
(6 + y)² = 37  →  12y + y² = 1  →  y ≈ 1/12 = 0.083    (ignoring the y² term)
```

**Result: √37 ≈ 6.083**

---

**Problem B — Root-finding algorithms**

**Question:** Describe some root-finding algorithms for `f(x) = 0` (differentiable `f(x)`).

**Solution:**

Besides Newton's method, two important alternatives are the bisection method and the secant method.

**Bisection method:**

Start with two values `a₀` and `b₀` such that `f(a₀) < 0` and `f(b₀) > 0` (a sign change bracket). At each step, evaluate the midpoint:
- If `f((aₙ + bₙ)/2) < 0`: set `aₙ₊₁ = (aₙ + bₙ)/2`, `bₙ₊₁ = bₙ`
- If `f((aₙ + bₙ)/2) > 0`: set `aₙ₊₁ = aₙ`, `bₙ₊₁ = (aₙ + bₙ)/2`
- If `|f((aₙ + bₙ)/2)|` is within tolerance: stop, `x* ≈ (aₙ + bₙ)/2`

The bisection method has **linear convergence**: `|x_{n+1} - x*| / |xₙ - x*| < δ < 1`. It is slower than Newton's method, but **convergence is guaranteed** once a valid bracket `(a₀, b₀)` is found.

**Secant method:**

Start with two initial values `x₀`, `x₁` and apply:
```
x_{n+1} = xₙ - f(xₙ) · (xₙ - x_{n-1}) / (f(xₙ) - f(x_{n-1}))
```

This replaces the exact derivative `f'(xₙ)` in Newton's method with a finite-difference approximation. The secant method does not require computing derivatives, making it valuable when `f'(x)` is hard to compute.

**Convergence rate: `(1 + √5)/2 ≈ 1.618`** (superlinear — faster than bisection, slower than Newton). Like Newton's method, convergence is not guaranteed for poor initial values.

| Method | Convergence Rate | Needs Derivative? | Guaranteed? |
|--------|-----------------|-------------------|-------------|
| Newton | Quadratic (~2) | Yes | No |
| Secant | Superlinear (~1.618) | No | No |
| Bisection | Linear (<1) | No | Yes (given bracket) |

---

### Lagrange Multipliers

The method of Lagrange multipliers finds local maxima/minima of a multivariate function subject to equality constraints.

For function `f(x₁, ..., xₙ)` with gradient `∇f(x)` and `k` constraints `g₁(x) = 0, ..., gₖ(x) = 0`, the necessary condition for an extremum is:
```
∇f(x) + λ₁∇g₁(x) + λ₂∇g₂(x) + ... + λₖ∇gₖ(x) = 0
```

where `λ₁, ..., λₖ` are called the **Lagrange multipliers**.

---

**Problem — Distance from origin to a plane**

**Question:** What is the distance from the origin to the plane `2x + 3y + 4z = 12`?

**Solution:**

Minimizing distance `D` is equivalent to minimizing `D² = f(x, y, z) = x² + y² + z²` subject to `g(x, y, z) = 2x + 3y + 4z - 12 = 0`.

Applying Lagrange conditions `∇f + λ∇g = 0`:
```
2x + 2λ = 0  →  x = -λ
2y + 3λ = 0  →  y = -3λ/2
2z + 4λ = 0  →  z = -2λ
```

Substituting into the constraint `2x + 3y + 4z = 12`:
```
2(-λ) + 3(-3λ/2) + 4(-2λ) = 12
-2λ - 9λ/2 - 8λ = 12
λ(-4/2 - 9/2 - 16/2) = 12
λ(-29/2) = 12    →    λ = -24/29
```

Optimal point:
```
x = 24/29,    y = 36/29,    z = 48/29
```

Distance:
```
D = √(x² + y² + z²) = √((24² + 36² + 48²)/29²) = √(4176/841) = √(144/29) = 12/√29
```

**Result: `D = 12/√29`**

**General formula:** For a plane `ax + by + cz = d`, the distance from the origin is:
```
D = |d| / √(a² + b² + c²)
```

Applying: `D = 12/√(4 + 9 + 16) = 12/√29` ✓

---

## 3.5 Ordinary Differential Equations

Four ODE patterns commonly tested in quantitative interviews:

### Separable Differential Equations

A **separable ODE** has the form `dy/dx = g(x)·h(y)`. Separating variables:
```
dy/h(y) = g(x)dx    →    ∫ dy/h(y) = ∫ g(x)dx
```

---

**Problem A — Separable ODE with initial condition**

**Question:** Solve `y' + 6xy = 0`, `y(0) = 1`.

**Solution:** Separate variables with `g(x) = -6x` and `h(y) = y`:
```
dy/y = -6x dx
∫ dy/y = ∫ -6x dx    →    ln y = -3x² + c    →    y = Ae^(-3x²)
```

Applying `y(0) = 1`: `A = 1`.

**Result: `y = e^(-3x²)`**

---

**Problem B — Change of variable**

**Question:** Solve `y' = (x - y)/(x + y)`.

> **Hint:** Introduce the substitution `z = x + y`.

**Solution:** The equation is not separable in its original form. Let `z = x + y`, so `y = z - x` and `y' = z' - 1`. Substituting:
```
z' - 1 = (x - (z - x)) / z = (2x - z) / z
z' = 1 + (2x - z)/z = (z + 2x - z)/z = 2x/z
```

Now it is separable: `z dz = 2x dx`
```
∫ z dz = ∫ 2x dx    →    z²/2 = x² + c₁    →    z² = 2x² + C
```

Substituting back `z = x + y`:
```
(x + y)² = 2x² + C    →    x² + 2xy + y² = 2x² + C
```

**Result: `y² + 2xy - x² = C`**

Verification: Differentiating `y² + 2xy - x² = C` implicitly:
```
2y·y' + 2y + 2x·y' - 2x = 0  →  y'(y + x) = x - y  →  y' = (x - y)/(x + y)  ✓
```

---

### First-Order Linear Differential Equations

A **first-order linear ODE** has the form:
```
dy/dx + P(x)y = Q(x)
```

The standard method is to find an **integrating factor** `I(x)` satisfying `I'(x) = I(x)P(x)`:
```
I(x) = e^(∫ P(x) dx)
```

Multiplying through: `(I(x)y)' = I(x)Q(x)`. Integrating:
```
y = [∫ I(x)Q(x) dx] / I(x)
```

---

**Problem — First-order linear ODE**

**Question:** Solve `y' + y/x = 1/x²`, `y(1) = 1`, where `x > 0`.

**Solution:** Here `P(x) = 1/x` and `Q(x) = 1/x²`.

Integrating factor: `I(x) = e^(∫ 1/x dx) = e^(ln x) = x`

Rewrite as `(xy)' = x · (1/x²) = 1/x`. Integrate both sides:
```
xy = ∫ (1/x) dx = ln x + c    →    y = (ln x + c)/x
```

Applying `y(1) = 1`: `c/1 = 1` → `c = 1`.

**Result: `y = (ln x + 1)/x`**

---

### Homogeneous Linear Equations

A **homogeneous second-order linear ODE** has the form:
```
a(x)y'' + b(x)y' + c(x)y = 0
```

If `y₁` and `y₂` are linearly independent solutions, then `y(x) = c₁y₁(x) + c₂y₂(x)` (with arbitrary constants `c₁`, `c₂`) is also a solution.

**When `a`, `b`, `c` are constants** (with `a ≠ 0`), define the **characteristic equation** `ar² + br + c = 0` with roots `r₁` and `r₂`:

| Case | Roots | General Solution |
|------|-------|-----------------|
| Real, distinct | `r₁ ≠ r₂` | `y = c₁e^(r₁x) + c₂e^(r₂x)` |
| Real, repeated | `r₁ = r₂ = r` | `y = c₁e^(rx) + c₂xe^(rx)` |
| Complex | `r = α ± βi` | `y = e^(αx)[c₁cos(βx) + c₂sin(βx)]` |

> **Quadratic formula:** `r = (-b ± √(b²-4ac)) / (2a)`. You should memorize this or derive it by completing the square: `(r + b/2a)² = (b²-4ac)/(4a²)`.

---

**Problem — Complex roots ODE**

**Question:** What is the solution of `y'' + y' + y = 0`?

**Solution:** Here `a = b = c = 1`. The characteristic equation is `r² + r + 1 = 0`.

Discriminant: `b² - 4ac = 1 - 4 = -3 < 0` → complex roots.
```
r = (-1 ± √(-3)) / 2 = -1/2 ± (√3/2)i
```

So `α = -1/2` and `β = √3/2`. The general solution is:
```
y = e^(-x/2) [c₁cos(√3x/2) + c₂sin(√3x/2)]
```

---

### Nonhomogeneous Linear Equations

A **nonhomogeneous second-order linear ODE** has the form:
```
ay'' + by' + cy = d(x)
```

There is no closed-form general solution. However, if we can find any **particular solution** `yₚ(x)`, the general solution is:
```
y(x) = yₕ(x) + yₚ(x)
```

where `yₕ(x)` is the general solution of the homogeneous equation `ay'' + by' + cy = 0`.

> **Key insight:** When `d(x)` is a simple polynomial, the particular solution is often a polynomial of the same degree.

---

**Problem — Two nonhomogeneous ODEs**

**Question:** Find the solutions of `y'' + y' + y = 1` and `y'' + y' + y = x`.

**Solution:**

From the previous problem, both ODEs share the same homogeneous solution (since `a = b = c = 1`, `b² - 4ac = -3 < 0`):
```
yₕ(x) = e^(-x/2)[c₁cos(√3x/2) + c₂sin(√3x/2)]
```

**For `y'' + y' + y = 1`:**

Try `yₚ = 1` (constant particular solution):
```
yₚ'' + yₚ' + yₚ = 0 + 0 + 1 = 1  ✓
```

**General solution: `y = e^(-x/2)[c₁cos(√3x/2) + c₂sin(√3x/2)] + 1`**

**For `y'' + y' + y = x`:**

Try `yₚ = mx + n` (linear particular solution):
```
yₚ'' + yₚ' + yₚ = 0 + m + (mx + n) = mx + (m + n) = x
```

Matching coefficients: `m = 1` and `m + n = 0` → `n = -1`. So `yₚ = x - 1`.

Verify: `0 + 1 + (x - 1) = x` ✓

**General solution: `y = e^(-x/2)[c₁cos(√3x/2) + c₂sin(√3x/2)] + (x - 1)`**

---

## 3.6 Linear Algebra

Linear algebra is used extensively in applied quantitative finance through statistics, optimization, Monte Carlo simulation, signal processing, and more.

### Vectors

An `n × 1` column vector represents a point in the `n`-dimensional Euclidean space `ℝⁿ`.

**Inner product (dot product):** For two vectors `x, y ∈ ℝⁿ`:
```
xᵀy = Σᵢ xᵢyᵢ
```

**Euclidean norm:**
```
||x|| = √(xᵀx) = √(Σᵢ xᵢ²)    and    ||x - y|| = √((x-y)ᵀ(x-y))
```

**Angle between vectors:**
```
cos θ = xᵀy / (||x|| · ||y||)
```

Vectors `x` and `y` are **orthogonal** if `xᵀy = 0`. The **correlation coefficient** of two random variables can be interpreted as the cosine of the angle between them in Euclidean space: `ρ = cos θ`.

---

**Problem — Maximum and minimum correlation (vector approach)**

**Question:** There are 3 random variables `x`, `y`, `z`. The correlation between `x` and `y` is 0.8, and between `x` and `z` is 0.8. What are the maximum and minimum correlations between `y` and `z`?

**Solution (geometric):**

Treat `x`, `y`, `z` as unit vectors. Let `θ` be the angle between `x` and `y`, so `cos θ = ρ_xy = 0.8`. The angle between `x` and `z` is also `θ`.

- **Maximum `ρ_yz`:** When `y` and `z` point in the same direction, the angle between them is 0, so `ρ_yz = 1`.

- **Minimum `ρ_yz`:** This occurs when `y` and `z` are on opposite sides of `x`, making the angle between them equal to `2θ`:

```
cos(2θ) = 2cos²θ - 1 = 2(0.8)² - 1 = 2(0.64) - 1 = 0.28
```

**Verification via dot product:** In 2D, `y = (0.8, 0.6)` and `z = (0.8, -0.6)` (symmetric about `x = (1, 0)`, both with `cos θ = 0.8`):
```
y · z = (0.8)(0.8) + (0.6)(-0.6) = 0.64 - 0.36 = 0.28  ✓
```

**Result: Maximum correlation = 1, Minimum correlation = 0.28.**

---

### QR Decomposition and Linear Least Squares

**QR decomposition:** For each nonsingular `n × n` matrix `A`, there exists a unique pair of an orthogonal matrix `Q` (satisfying `Q⁻¹ = Qᵀ`) and an upper-triangular matrix `R` with positive diagonal elements such that `A = QR`.

To solve the linear system `Ax = b`:
```
QRx = b  →  Rx = Qᵀb
```

Since `R` is upper-triangular, solve for `xₙ` first (from the last equation `Rₙₙxₙ = (Qᵀb)ₙ`), then recursively solve for `xᵢ` for `i = n-1, n-2, ..., 1` (**back substitution**).

---

**Problem — Linear least squares regression**

**Question:** If your programming language has no built-in least squares function, how would you design an algorithm?

**Solution:**

A linear regression with `n` observations and `p` regressors (including intercept):
```
yᵢ = β₀xᵢ₀ + β₁xᵢ₁ + ... + β_{p-1}xᵢ,p-1 + εᵢ    (where xᵢ₀ = 1 ∀i)
```

In matrix form: `Y = Xβ + ε`, where `Y` and `ε` are `n×1` column vectors, `X` is `n×p`.

The goal is to minimize the sum of squared residuals:
```
min f(β) = min ||ε||² = min (Y - Xβ)ᵀ(Y - Xβ)
```

Taking the derivative with respect to `β` and setting to zero:
```
f'(β) = -2Xᵀ(Y - Xβ) = 0    →    (XᵀX)β = XᵀY
```

This is the **normal equation**. Let `A = XᵀX` (a `p×p` symmetric matrix) and `b = XᵀY`. The problem reduces to solving `Aβ = b`, which can be solved using QR decomposition, or directly via:
```
β = (XᵀX)⁻¹XᵀY
```

> **Note:** Direct matrix inversion introduces large numerical error when `X` is nearly singular or badly scaled. QR decomposition is numerically preferred.

**Assumptions behind OLS:**
1. Linearity: `Y = Xβ + ε`
2. Zero mean errors: `E[εᵢ] = 0` for all `i`
3. Homoskedasticity and no autocorrelation: `Var(εᵢ) = σ²` (constant), `E[εᵢεⱼ] = 0` for `i ≠ j`
4. No perfect multicollinearity: `ρ(xᵢ, xⱼ) ≠ ±1` for `i ≠ j`
5. Exogeneity: `ε` and `xᵢ` are independent

When these assumptions hold, OLS is the **Best Linear Unbiased Estimator (BLUE)**. Violations require remedies from econometrics.

---

### Determinant, Eigenvalue, and Eigenvector

**Determinant:** For an `n×n` matrix `A = {Aᵢⱼ}`:
```
det(A) = Σₚ ν(p) · A_{1,p₁} · A_{2,p₂} · ... · A_{n,pₙ}
```

where the sum is over all `n!` permutations `p = (p₁, p₂, ..., pₙ)` of `(1, 2, ..., n)`, and `ν(p) = +1` if `p` requires an even number of swaps to reach natural order, `-1` if odd.

**Closed forms for small matrices:**
```
det([[a, b], [c, d]]) = ad - bc

det([[a, b, c], [d, e, f], [g, h, i]]) = aei + bfg + cdh - ceg - afh - bdi
```

**Key properties:**
```
det(Aᵀ) = det(A)
det(AB) = det(A) · det(B)
det(A⁻¹) = 1/det(A)
```

**Eigenvalue and eigenvector:** A real number `λ` is an **eigenvalue** of `A` if there exists a nonzero vector `x` such that:
```
Ax = λx
```

Every nonzero `x` satisfying this is an **eigenvector** of `A` associated with eigenvalue `λ`.

**Finding eigenvalues:** Solve the **characteristic equation** `det(A - λI) = 0`.

**Key relationships:**
```
λ₁ × λ₂ × ... × λₙ = det(A)
λ₁ + λ₂ + ... + λₙ = trace(A) = Σᵢ Aᵢᵢ
```

**Diagonalization:** If `A` has `n` linearly independent eigenvectors (guaranteed when all `n` eigenvalues are real and distinct), then with `X = [x₁ | x₂ | ... | xₙ]` (eigenvector matrix) and `D = diag(λ₁, ..., λₙ)`:
```
X⁻¹AX = D    →    A = XDX⁻¹    →    Aᵏ = XDᵏX⁻¹
```

---

**Problem — Eigenvalues and eigenvectors of a 2×2 matrix**

**Question:** For `A = [[2, 1], [1, 2]]`, find the eigenvalues and eigenvectors.

**Solution (three approaches):**

**Approach A — Direct definition:**

Let `Ax = λx` with eigenvector `x = [x₁, x₂]ᵀ`:
```
2x₁ + x₂ = λx₁    ...(eq 1)
x₁ + 2x₂ = λx₂    ...(eq 2)
```

Adding equations: `3(x₁ + x₂) = λ(x₁ + x₂)`. So either `λ = 3` (when `x₁ = x₂`) or `x₁ + x₂ = 0` (when `x₁ = -x₂`, giving `λ = 1` from equation 1).

| Eigenvalue | Eigenvector condition | Normalized eigenvector |
|-----------|----------------------|----------------------|
| `λ = 3` | `x₁ = x₂` | `[1/√2, 1/√2]ᵀ` |
| `λ = 1` | `x₁ = -x₂` | `[1/√2, -1/√2]ᵀ` |

**Approach B — Characteristic equation:**
```
det(A - λI) = (2 - λ)² - 1 = λ² - 4λ + 3 = (λ-1)(λ-3) = 0
```
→ `λ₁ = 1`, `λ₂ = 3` ✓

**Approach C — Trace and determinant:**
```
det(A) = 2×2 - 1×1 = 3 = λ₁λ₂
trace(A) = 2 + 2 = 4 = λ₁ + λ₂
```
Solving: `λ₁ = 1`, `λ₂ = 3` ✓

---

### Positive Semidefinite and Positive Definite Matrices

When `A` is a **symmetric** `n×n` matrix (as in covariance and correlation matrices), all eigenvalues are real. Eigenvectors corresponding to distinct eigenvalues are orthogonal.

**Positive semidefinite (PSD) — necessary and sufficient conditions (any one suffices):**
1. `xᵀAx ≥ 0` for any `n×1` vector `x`
2. All eigenvalues of `A` are nonnegative
3. All leading submatrices `Aₖ` (`K = 1, ..., n`) have nonnegative determinants

**Positive definite (PD) — necessary and sufficient conditions (any one suffices):**
1. `xᵀAx > 0` for any nonzero `n×1` vector `x`
2. All eigenvalues of `A` are positive
3. All leading submatrices `Aₖ` (`K = 1, ..., n`) have positive determinants

Covariance/correlation matrices must be PSD. If there is no perfect linear dependence among variables, they must be PD.

---

**Problem — Correlation bounds (PSD approach)**

**Question:** With `ρ_xy = ρ_xz = 0.8`, what are the maximum and minimum values of `ρ_yz`?

**Solution:**

The correlation matrix for `(x, y, z)` is:
```
P = | 1    0.8   0.8 |
    | 0.8  1     p   |
    | 0.8  p     1   |
```

For `P` to be valid (PSD), we need `det(P) ≥ 0`. Expanding by cofactor along the first row:
```
det(P) = 1·det([[1, p], [p, 1]]) - 0.8·det([[0.8, p], [0.8, 1]]) + 0.8·det([[0.8, 1], [0.8, p]])
       = (1 - p²) - 0.8(0.8 - 0.8p) + 0.8(0.8p - 0.8)
       = (1 - p²) - 0.64 + 0.64p + 0.64p - 0.64
       = -p² + 1.28p - 0.28
```

Setting `det(P) ≥ 0`:
```
-p² + 1.28p - 0.28 ≥ 0
p² - 1.28p + 0.28 ≤ 0
(p - 1)(p - 0.28) ≤ 0
0.28 ≤ p ≤ 1
```

**Result: Maximum `ρ_yz = 1`, Minimum `ρ_yz = 0.28`**

> Both methods (vector geometry and PSD condition) give the same answer. The vector method uses `cos(2θ) = 2cos²θ - 1 = 2(0.64) - 1 = 0.28` and is more intuitive; the PSD method is more algebraic.

---

### LU Decomposition and Cholesky Decomposition

**LU decomposition:** For a nonsingular `n×n` matrix `A`, express as the product of a lower and upper triangular matrix:
```
A = LU
```

Applications:
- Solving `Ax = b`: decompose as `LUx = b` → solve `Ly = b` (forward substitution) → solve `Ux = y` (back substitution)
- Computing determinant: `det(A) = det(L)·det(U) = (∏ Lᵢᵢ)(∏ Uᵢᵢ)`

**Cholesky decomposition:** When `A` is a **symmetric positive definite** matrix, decompose as:
```
A = RᵀR
```

where `R` is a unique upper-triangular matrix with positive diagonal entries. This is an LU decomposition with `L = Rᵀ`, exploiting symmetry for efficiency.

---

**Problem — Generating correlated normal random variables**

**Question:** How do you generate two `N(0,1)` random variables with correlation `ρ`, given a standard normal random number generator?

**Solution:**

Let `z₁`, `z₂` be independent `N(0,1)` random variables. Generate:
```
x₁ = z₁
x₂ = ρz₁ + √(1 - ρ²) z₂
```

**Verification:**
```
Var(x₁) = Var(z₁) = 1  ✓
Var(x₂) = ρ²·Var(z₁) + (1 - ρ²)·Var(z₂) = ρ² + (1 - ρ²) = 1  ✓
Cov(x₁, x₂) = Cov(z₁, ρz₁ + √(1-ρ²)z₂) = ρ·Var(z₁) + 0 = ρ  ✓
```

This is a basic application of Cholesky decomposition. The Cholesky factor of the 2×2 correlation matrix `[[1, ρ], [ρ, 1]]` is `R = [[1, 0], [ρ, √(1-ρ²)]]`, and `x = Rᵀz` produces the correlated pair.

---

**Generalization to n dimensions:**

For an `n`-dimensional multivariate normal `X = [X₁, ..., Xₙ]ᵀ ~ N(μ, Σ)` with mean vector `μ` and positive definite covariance matrix `Σ`:

1. Decompose `Σ = RᵀR` (Cholesky)
2. Generate independent `z₁, ..., zₙ ~ N(0,1)`; let `Z = [z₁, ..., zₙ]ᵀ`
3. Compute: **`X = μ + RᵀZ`**

**Alternative via SVD:** For any `n×p` matrix, the **Singular Value Decomposition** is `X = UDVᵀ`, where `U` (`n×p`) and `V` (`p×p`) are orthogonal matrices, and `D` is a diagonal matrix of singular values.

For a positive definite covariance matrix `Σ`: `V = U`, so `Σ = UDUᵀ`, where `D = diag(λ₁, ..., λₙ)` (eigenvalues) and `U` is the matrix of eigenvectors. Define `D^(1/2) = diag(√λ₁, ..., √λₙ)`. Then:
```
Σ = UD^(1/2)(UD^(1/2))ᵀ    →    X = μ + (UD^(1/2))Z
```

> For the multivariate normal, the probability density function is: `f(x) = (1/((2π)^(n/2)·√det(Σ))) · exp(-½(x-μ)ᵀΣ⁻¹(x-μ))`

---

*End of Chapter 3*
