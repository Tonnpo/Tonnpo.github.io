---
layout: post
title:  "Option pricing"
tags: ["option-pricing", "stochastic-calculus", "Black-Scholes-Merton-formula"]
category: mathematical-finance
references:
  - stoch_calc_1
  - stoch_calc_2
---

We first consider **vanilla options** which include European and American options. We will discuss exotic options later.

## European Options
Suppose a stock price,  \\(S(t)\\), follows a geometric Brownian motion i.e. \\(S(t)\\) satisfies the stochastic differential equation

$$dS(t) = \alpha S(t) dt + \sigma S(t) dW(t)$$

where \\(W(t) \\) is a Brownian motion. A European call option with the strike price \\(K \\) and the expiration date \\(T > t \\) has the payoff

$$
V(T) = (S(T) - K)^+
$$

where \\(x^+ = \max(x, 0) \\). At time \\(t \\), the stock price is \\(S(t) \\) and the price of this call option, \\(c(t, S(t))\\), is

$$c(t, S(t)) = S(t) N(d_+ (T-t, S(t))) - Ke^{-r(T-t)} N(d_- (T-t, S(t)))$$


where \\(0 \leq t < T, S(t) > 0 \\), \\(N(y)\\) is the cumulative standard normal distribution, and,

$$
d_{\pm} (\tau, x) = \frac{1}{\sigma \sqrt{\tau}} \left[\log \frac{x}{K} + (r \pm \frac{\sigma^2}{2})\tau \right]
$$

This formula is known as **Black-Scholes-Merton** formula. Before proceeding with the American options, we look at [How good is the Black-Scholes-Merton formula?]({% post_url 2025-01-19-how-good-is-the-black-scholes-merton-formula %})