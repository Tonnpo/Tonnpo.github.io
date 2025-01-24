---
layout: post
title:  "Exponential Smoothing"
tags: [time-series-data-analysis, forecasting-strategies]
category: statistics
references:
  - intro_time_series_r
---

**Exponential smoothing**, as the name suggests, is a smoothing procedure. It could also be regarded as a forecasting strategy. Given the model

$$x_t = \mu_t + w_t$$

where \\(\mu_t \\) is the non-stationary mean of the process at time \\(t \\) and \\(w_t \\) are independent random deviations with mean 0 and standard deviation \\(\sigma \\). Then, construct a new time series

$$a_t = \alpha x_t + (1-\alpha) a_{t-1}$$

where \\(a_t \\) is the **exponentially weighted moving average (EWMA)** at time \\(t\\) and \\(0 < \alpha < 1 \\) is called the **smoothing parameter**. Setting \\(\alpha \\) close to 1 (or 0) means putting more (or less) weight on the recent data. 

## How should we set the \\(\alpha \\)?
Consider

$$
\begin{align*}
a_t &= \alpha x_t + (1-\alpha)a_{t-1}\\
&= \alpha x_t + (1-\alpha)(\alpha x_{t-1} + (1-\alpha) a_{t-2}) \\
&= \alpha x_t + (1-\alpha) \alpha x_{t-1} + (1-\alpha)^2 a_{t-2} \\
&= \alpha x_t + \sum_{k=1}^{\infty} \alpha (1-\alpha)^k x_{t-k} \\
&= \alpha \mu_t + \sum_{k=1}^{\infty} \alpha (1-\alpha)^k \mu_{t-k} + \alpha w_t + \sum_{k=1}^{\infty} \alpha (1-\alpha)^k w_{t-k} 
\end{align*}
$$

As noted earlier, when \\(\alpha \\) is close to 1, the term \\((1-\alpha)^k \\) will approach zero exponentially fast. As a result, the values \\(\mu_{t-k}, w_{t-k}\\) have little effect to \\(a_t\\). 

There are two components, \\(\mu_t \\) and \\(w_t \\), that contribute to the value of \\(x_t\\). Because \\(w_t \\) has zero mean, we can regard \\(\mu_t \\) as the mean level and \\(w_t\\) as noise. By considering \\(w_t \\) as noise, this does not mean that \\(w_t\\) is small. If \\(\sigma \\) is large, then \\(w_t\\) could be large as well.

If we expect the changes in \\(\mu_t \\) to be large compared to \\(\sigma \\), it is more appropriate to set \\(\alpha \\) closer to 1. Doing this will put more weight on the recent data because new observations are supposed to be much different. As a result, the new time series, \\(a_t \\), will be quickly adapted to new observations.

On the other hand, if we expect \\(\sigma \\) to be large compared to the changes in \\(\mu_t \\), it is more appropriate to set \\(\alpha \\) closer to 0, this ensures that we put less weight on the recent data which is not changing much anyway, and, accumulate more changes from past observations, specifically from the noise since \\(\sigma \\) is large.

## Forecasting

Once we have determined a good value of \\(\alpha \\) either through an optimization or just from guessing, because we assume there is no trend and seasonal effect (or we have removed them), we could make a forecast by


$$\hat{x}_{t+k\vert t} = a_t$$

where \\(\hat{x}_{t+k\vert t}\\) is the forecast at time \\(t+k\\) predicted at time \\(t \\) and \\(k = 1,2, \cdots \\)