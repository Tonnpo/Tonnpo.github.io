---
layout: post
title:  "Introduction to time series data"
tag: time-series-data-analysis
category: statistics
references:
  - intro_time_series_r
---

A **time series** can be thought of as a sequential data indexed by time. Time series data can be decomposed into three parts
1. Trend
2. Seasonal
3. Noise


Two common models to describe relationships between these components are **additive** and **multiplicative** models

1. Additive model

    $$x_t = m_t + s_t + z_t$$

    where $x_t$ is the observed data, $m_t$ is the trend, $s_t$ is the seasonal, and $z_t$ is the noise.

2. Multiplicative model

    $$x_t = m_t \cdot s_t + z_t$$

    where $x_t$ is the observed data, $m_t$ is the trend, $s_t$ is the seasonal, and $z_t$ is the noise. 

A time series can also be viewed as a relaization of a random process and these random variables are often correlated. One important thing to remember is that a single time series is considered as **one sample**. Therefore, the **mean function** of these random processes is defined as

$$\mu_t = E(x_t)$$

This function calculates, at each point in time, the average of the values from all possible time series in a model. However, in practice, we only have a historical data. Therefore, the best approximation we can have is simply the observed value i.e. $E(x_t) = x_t$. We say that a time series is **stationary in the mean** if $\mu_t$ is a constant function. 

Another important function is **autocovariance function** defined as

$$\gamma_k = E\left[(x_t - \mu)(x_{t+k} - \mu) \right]$$

where $\mu$ is the mean of the population which can be estimated by 

$$\hat{\mu} = \overline{x} = \frac{\sum_{t=1}^{n} x_t}{n}$$

We say that a time series is **second-order stationary** if it is stationary in the mean and the autocovariance function only depends on the lag term $k$