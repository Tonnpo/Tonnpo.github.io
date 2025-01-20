---
layout: post
title:  "How good is the Black-Scholes-Merton formula?"
tags: ["option-pricing", "Black-Scholes-Merton-formula", "illustration"]
category: mathematical-finance
references:
  - stoch_calc_2
  - AMZN_stock_quote
  - AMZN_option_quote
  - SOFR
---


Recall the **Black-Scholes-Merton** formula for a European call option with the strike price \\(K\\) and expires at time \\(T\\)

$$c(t, S(t)) = S(t) N(d_+ (T-t, S(t))) - Ke^{-r(T-t)} N(d_- (T-t, S(t)))$$


where \\(0 \leq t < T, S(t) > 0 \\), \\(N(y)\\) is the cumulative standard normal distribution, and,

$$
d_{\pm} (\tau, x) = \frac{1}{\sigma \sqrt{\tau}} \left[\log \frac{x}{K} + (r \pm \frac{\sigma^2}{2})\tau \right]
$$


A model is as good as its assumptions, including the Black-Scholes-Merton formula. Assuming that the stock pays no dividend, we can see that the value of a call option depends on the following factors:

1. Current stock price at time \\(t \\), \\(S(t)\\), which follow a geometric Brownian motion
2. Time to expiration date \\(\tau = T-t \\)
3. Strike Price \\(K\\)
4. **Constant** interest rate \\(r\\)
5. **Constant** volatility \\(\sigma \\)

People typically disagree on the value of \\(r\\) and \\(\sigma \\), and also the fact that they are constant. But how bad could it be if these assumptions are not true?


### Set up

We are going to use Python 3.12 to evaluate the value of call options. We use the following packages

```
numpy==2.2.2 # https://github.com/numpy/numpy
pandas==2.2.3 # https://github.com/pandas-dev/pandas
scipy==1.15.1 # https://github.com/scipy/scipy
yfinance==0.2.52 # https://github.com/ranaroussi/yfinance
notebook==7.3.2 # https://github.com/jupyter/notebook
matplotlib==3.10.0 # https://github.com/matplotlib/matplotlib
```

The data is from Yahoo Finance. We consider the Amazon.com stock (ticker: AMZN) as it pays no dividend.


### Step 0: Load required packages
{% highlight python %}
import numpy as np
from scipy.stats import norm
import yfinance as yf
from datetime import datetime
import matplotlib.pyplot as plt
{% endhighlight %}


### Step 1: Load data
{% highlight python %}
dat = yf.Ticker("AMZN")
expiration_date = dat.options[0]
call_prices = dat.option_chain(expiration_date).calls
{% endhighlight %}
This is what 
Note here that we use the closest expiration date for the variable `expiration_date`. At the time of writing, the last traiding day is January 17, 2025 and the closest expiration date is January 24, 2025.

### Step 2: Write helper functions to calculate call options prices

{% highlight python %}
def calcuate_d_plus(tau, x, K, r, sigma):
  return (1/(sigma*np.sqrt(tau))) * (np.log(x/K) + (r + sigma**2/2) * tau)

def bsm_call(tau, x, K, r, sigma):
  """
  Calculate the Black-Scholes-Merton call option price.

  Parameters:
  tau (float): Time to maturity (in years)
  x (float): Current stock price
  K (float): Strike price
  r (float): Risk-free interest rate
  sigma (float): Volatility

  Returns:
  float: Call option price
  """
  d_plus = calcuate_d_plus(tau, x, K, r, sigma)
  d_minus = d_plus - sigma*np.sqrt(tau)
  return x * norm.cdf(d_plus) - K * np.exp(-r * tau) * norm.cdf(d_minus)
{% endhighlight %}
These are the formulas provided at the beginning.

### Step 3: Prepare the input to the model
{% highlight python %}
T = datetime.strptime(expiration_date, '%Y-%m-%d')
t = datetime(call_prices["lastTradeDate"][0].year, call_prices["lastTradeDate"][0].month, call_prices["lastTradeDate"][0].day)
tau = (T-t).days / 365
r = 0.0429 # SOFR as of 01/16/2025
strike_prices = call_prices["strike"]
stock_price = dat.history(period="1d")["Close"].iloc[0] #225.94
{% endhighlight %}

Here, for simplicity, we assume that the interest rate will continue to be the same. **This may not be true**.

{% highlight python %}
close_prices = dat.history(period="3mo")["Close"]
log_returns = np.log(close_prices/close_prices.shift(1)).dropna()
historical_sigma = np.std(log_returns) * np.sqrt(252)
{% endhighlight %}
Here, we use the historical volatility as a proxy for the volatility of the stock. Note that this is backward looking. We implicitly assume that the volatility will continue to be the same. **Again, this may not be true**.


### Step 4: Check the output
{% highlight python %}
call_price = bsm_call(tau, stock_price, strike_prices[0], r, historical_sigma)
{% endhighlight %}

Here, we just pick the last traded stock price at 225.94 and the first strike price at 110 and use these to calculate the call option price. We have that the `call_price` is 116.03 while the last traded price from the data source is 115.76. Not a bad approximation I would say. 


If we use the historical volatility to calculate the prices of call options across differrent strike prices, we get


![call_prices_vs_strike_prices]({{ site.baseurl }}/assets/images/call_prices_vs_strike_prices.png){:style="display:block; margin-left:auto; margin-right:auto"}


Again, it does not seem to be a bad approximation. However, depending on use cases, the approximations may or may not be good enough, for example, when you buy many contracts, the errors scale up.


Earlier, we mention that the Black-Scholes-Merton model assumes that the volatility is constant. Well then, if this were true, we would expect that across different strike prices, the volatility should be roughly the same. We can check this by fixing all the variables except for the volatility. Then, we try to search for the value of the volatility such that the model outputs the call price equal to the observed price. We call such value **implied volatility**.

![volatility_smile]({{ site.baseurl }}/assets/images/volatility_smile.png){:style="display:block; margin-left:auto; margin-right:auto"}

Here, the plot above clearly shows that the values of volatility across different strike prices are not constant. And, because the shape of the implied volality looks like a smile, we sometimes call this a **volatility smile**.

