---
layout: post
title: Switching from Emails to Usernames in the ASP.NET Core Web Template
description: 
modified: 2016-11-07
comments: true
tags: [code, programming, asp.net, .net, core, c#]
categories: [ASP.NET]
image:
  feature: 
---

The new [ASP.NET Core](https://docs.asp.net/en/latest/intro.html) template that gets generated in VIsual Studio (or when running the Yeoman generator with <code class="highlighter-rouge">yo aspnet</code> on OSX/Linux) conatins a lot of great features, including a fully-functioning user authentication system using [ASP.NET Identity](https://docs.asp.net/en/latest/security/authentication/identity.html). By default, this system automatically has the users email double as their username. But what if you also want to have them enter a username and use that to log in instead? This change isn't very complicated, but it will require changes to a few different files across the Models, Views, and Controllers. Making these changes can also serve as a nice way to learn more about the flow of data in an ASP.NET Core application. Let's get started! 

<!-- more -->

First, let's pay a visit to the Controller where all of the registration and login magic happens - the <code class="highlighter-rouge">AccountController</code>, which lives in <code class="highlighter-rouge">Controllers/AccountController.cs</code>. In particular, the Register POST method is where this option is initially set. Find the line of code below, that occurs just after model validation:

{% highlight c# %}
var user = new ApplicationUser { UserName = model.Email, Email = model.Email };
{% endhighlight %}

Here we can see that the value of ```UserName``` for our new ```ApplicationUser``` is being set to model.Email. This should be updated to ```model.UserName```, as shown below:

{% highlight c# %}
var user = new ApplicationUser { UserName = model.UserName, Email = model.Email };
{% endhighlight %}


Presently, this will caus ethe compiler to throw an error since the ViewModel being used doesnt have a username property yet. Head over to ```Models/AccountViewModels/RegisterViewModel.cs``` and add the following property underneath the current one for email:

{% highlight c# %}
[Required]
[Display(Name = "Username")]
public string UserName { get; set; }
{% endhighlight %}

Here we ar emaking a new property for the ```RegisterViewModel``` called ```UserName```, marking it as ```Required``` and setting its display value. Now the complier warnings back in the ```AccountController``` should be gone. But, we still dont have a way for the user to actually input thier username. 

For this, go over into ```Views/Account/Register.cshtml``` and add the following HTML code to the section after the email form-groups closing ```div``` tag:

{% highlight html %}
<div class="form-group">
    <label asp-for="UserName" class="col-md-2 control-label"></label>
    <div class="col-md-10">
        <input asp-for="UserName" class="form-control" />
        <span asp-validation-for="UserName" class="text-danger"></span>
    </div>
</div>
{% endhighlight %}

Now there will be a visible textbox for the user to enter their desired username. Go ahead and try it out!

![Register screenshot](/images/post-images/register-screen.png)

However, there a still a few more changes to make. While the user can now set up their own unique username, they won't be able to log back in with it just yet. For that to happen, we need to make a few more changes. 

Go back into ```Controllers/AccountController.cs```. Now we need to update the ```Login POST``` method and change the result to use ```model.UserName```. Here is the code for that:

{% highlight c# %}
var result = await _signInManager.PasswordSignInAsync(model.UserName, model.Password, 
                    model.RememberMe, lockoutOnFailure: false);
{% endhighlight %}

Then as before, we also need to update the Login view model at ```Models/AccountViewModels/LoginViewModel.cs``` with the new UserName property:

{% highlight c# %}
namespace MvcMovie.Models.AccountViewModels
{
    public class LoginViewModel
    {
        [Required]
        [Display(Name = "Username")]
        public string UserName { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [Display(Name = "Remember me?")]
        public bool RememberMe { get; set; }
    }
}

{% endhighlight %}

Finally, go into the ```Views/Account/Login.cshtml```, and update the ASP attributes to be for ```UserName``` instead of ```Email```. 

{% highlight html %}
<div class="form-group">
    <label asp-for="UserName" class="col-md-2 control-label"></label>
    <div class="col-md-10">
        <input asp-for="UserName" class="form-control" />
        <span asp-validation-for="UserName" class="text-danger"></span>
    </div>
</div>
{% endhighlight %}

And thats it! Now your users can log in with their usernames instead of their emails. Note that the validation error for uniqueness will still show if the username is already taken, instead of for the email, so emails will not be required to be unique. 

