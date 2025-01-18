---
layout: post
title:  "Generalized Linear Model"
tags: ["generalized-linear-model", "glm"]
category: statistics
references:
  - glm
---

A distribution of a single parameter \\(\theta \\) belongs to the **exponential family** if it can be written as

$$f(y; \theta) = s(y) t(\theta)  \exp^{a(y)b(\theta)} = \exp \left[a(y)b(\theta) + c(\theta) + d(y) \right]$$

where \\(a, b, s, t, c, d\\) are known functions where \\(t(\theta) = \exp c(\theta)\\) and \\(s(y) = \exp d(y) \\). Many well known distributions belong to this family. For example, assuming that \\(\sigma^2\\) is known, the density function of the normal distribution, \\(Y \sim \mathcal{N}(\mu, \sigma^2)\\), can be written as

$$
\begin{align*}
f(y; \mu) &= (2 \pi \sigma^2)^{-\frac{1}{2}} \exp \left[-\frac{1}{2\sigma^2}(y- \mu)^2  \right] \\
&= \exp \left[ -\frac{1}{2}\log (2\pi \sigma^2) -\frac{1}{2\sigma^2}(y^2- 2y \mu + \mu^2) \right] \\
&= \exp \left[ -\frac{1}{2}\log (2\pi \sigma^2) - \frac{y^2}{2\sigma^2} + \frac{y \mu}{\sigma^2} - \frac{\mu^2}{2\sigma^2} \right] 
\end{align*}
$$

Here, we have that

$$
a(y) = y,
b(\mu) = \frac{\mu}{\sigma^2},
c(\mu) = - \frac{\mu^2}{2\sigma^2} -\frac{1}{2}\log (2\pi \sigma^2),
d(y) = -\frac{y}{2\sigma^2}
$$


There is a reason we choose \\(a(y) = y\\) which we will explain in the next subsection. When a distribution from the exponential family has \\(a(y) = y\\), we say that it is in the **canonical form**.


We summarize some properties of distributions from the exponential family as the following

$$E\left[a(Y) \right] = - \frac{c'(\theta)}{b'(\theta)}$$


$$Var \left[a(Y) \right] = \frac{b''(\theta) c'(\theta) - c''(\theta)b'(\theta)}{[b'(\theta)]^3}$$

We can see that by choosing \\(a(y) = y\\), we directly obtain the expressions for expectation and variance of the random variable. For example, previously, we have that


$$
b'(\mu) = \frac{1}{\sigma^2}, b''(\mu) = 0, c'(\mu) = -\frac{\mu}{\sigma^2}, c''(\mu) = -\frac{1}{\sigma^2}
$$

Hence

$$
E[Y] = - \frac{c'(\mu)}{b'(\mu)} = \mu 
$$

$$
Var[Y] = \frac{b''(\mu) c'(\mu) - c''(\mu)b'(\mu)}{[b'(\mu)]^3} = \frac{- c''(\theta)b'(\theta)}{[b'(\theta)]^3} = \frac{\sigma^6}{\sigma^4} = \sigma^2
$$


Consider a set of independent random variables \\(Y_1, Y_2, \cdots, Y_N \\) where each \\(Y_i\\) has a distribution from the exponential family along with the following properties:

1. \\(a_i(Y_i) = y_i, \forall i \\)
2. \\(b_i, c_i, d_i\\) are the same for all \\(i\\) 

To summarize, we have

$$
f(y_i; \theta_i) = \exp \left[y_i b(\theta_i) +c(\theta_i) + d(y_i) \right]
$$


We are interested in a set of explanatory varibles which has a smaller set of parameters \\(\beta_1, \beta_2, \cdots \beta_p \\) where \\(p < N\\). A **generalized linear model** of \\(Y_1, Y_2, \cdots, Y_N \\) is defined as

$$
g(\mu_i) = x_i^T \beta
$$

where  \\(\mu_i = E[Y_i]\\), \\(g \\) is a monotone and differentiable function or the link function, \\(x_i\\) is a \\(p \times 1 \\) vector of explanatory variables, and \\(\beta_i \\) is a \\(p \times 1 \\) vector of the coefficients. 