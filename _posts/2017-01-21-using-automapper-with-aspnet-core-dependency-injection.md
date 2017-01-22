---
layout: post
title: Using AutoMapper with ASP.NET Core Dependency Injection
description: 
modified: 2017-01-21
comments: true
tags: [code, automapper, asp.net, .net, core, c#, dependency injection]
categories: [ASP.NET]
image:
  feature: 
---

[ASP.NET Core](https://docs.asp.net/en/latest/intro.html) features out of the box dependency injection, which is very useful for mocking up controller classes when testing and helps maintain good seperation of concerns. [AutoMapper](http://automapper.org/) is the popular .NET, convention-based object-object mapper, which can be used with either that static Mapper class, or with a little additional configuration, can be used with the .NET Core Dependency Injection as well, which is what I will explore in this post. 

<!-- more -->

The full code for this example can be found on [Github](https://github.com/gcheney/automapper-dependency-injection). To start with, I have a model Blob class, which we will be mapping into our DTO (Data Transfer Object), the BlobViewModel class. The view model class is what our view will present to the user.

{% highlight c# %}
namespace AutoMapperDI.Models
{
    public class Blob
    {
        public int Id { get; set; }
        public string Content { get; set; }
    }
}
{% endhighlight %}

{% highlight c# %}
namespace AutoMapperDI.ViewModels
{
    public class BlobViewModel
    {
        public int Id { get; set; }
        public string Content { get; set; }
    }
}
{% endhighlight %}

We will need to add the AutoMapper dependency by adding "AutoMapper": "4.2.1" to the dependencies section of project.json file. Once that is added, dependencies will need to be restored by running dotnet restore. Now, in the Configure method of Startup.cs we can configure our mappings:


{% highlight c# %}
public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
{
    Mapper.Initialize(config => 
    {
        config.CreateMap<Blob, BlobViewModel>().ReverseMap();
    });
}
{% endhighlight %}

Inside the HomeController, we set up a new List of Blobs, which AutoMapper will be mapping into an IEnumerable<BlobViewModel> and passing that to our view. This is using the default Mapper statis class:

{% highlight c# %}
public IActionResult Index()
{
    var blobs = new List<Blob>()
    {
        new Blob { Id = 1, Content = "One"},
        new Blob { Id = 2, Content = "Two"},
        new Blob { Id = 3, Content = "Three"}
    };

    var viewModel = Mapper.Map<IEnumerable<BlobViewModel>>(blobs);
    return View(viewModel);
}
{% endhighlight %}

Finally, in our Views/Home/Index.cshtml file we will set up a loop to display all of the BlobViewModel's that have been passed to the view:

{% highlight c# %}
@model IEnumerable<AutoMapperDI.ViewModels.BlobViewModel>

@{
    ViewData["Title"] = "Home Page";
}

<h1>Blobs</h1>

@foreach (var blob in Model)
{
    <p>@blob.Id - @blob.Content</p>
}

{% endhighlight %}

Now, we can start to set up AutoMapper to use ASP.NET Core DI. One thing this allows us to do is to use AutoMapper Profiles. So we set up a profile class mimicking the initial configuration of we had setup in Startup.cs

{% highlight c# %}

using AutoMapper;
using AutoMapperDI.Models;
using AutoMapperDI.ViewModels;

namespace AutoMapperDI
{
    public class AutoMapperProfileConfiguration : Profile
    {
        protected override void Configure()
        {
            CreateMap<Blob, BlobViewModel>().ReverseMap();
        }
    }
}
{% endhighlight %}

We will need to add a new MapperConfiguration object to the Startup.cs 

{% highlight c# %}
private MapperConfiguration MapperConfiguration { get; set; }
{% endhighlight %}


Then we can initialize this object in the Startup.cs constructor and set it to use the new AutoMapperProfileConfiguration class.

{% highlight c# %}
public Startup(IHostingEnvironment env)
{
    var builder = new ConfigurationBuilder()
        .SetBasePath(env.ContentRootPath)
        .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
        .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
        .AddEnvironmentVariables();

    Configuration = builder.Build();

    MapperConfiguration = new MapperConfiguration(config => 
    {
        config.AddProfile(new AutoMapperProfileConfiguration());
    });
}
{% endhighlight %}

After adding this, we can remove the code we previously added to the Configure method. Instead, we will inject the IMapper interface as a singleton service in the ConfigureServices method, and use the MapperConfiguration to create the mapper that we will use in the controller.

{% highlight c# %}
public void ConfigureServices(IServiceCollection services)
{
    services.AddSingleton<IMapper>(sp => MapperConfiguration.CreateMapper());

    services.AddMvc();            
}
{% endhighlight %}


Finally, we will need to inject our IMapper into the HomeController. To start, we will set up a constructor method for the Controller where we will get the mapper from the services. Then we can replace our static method with the new IMapper object.

{% highlight c# %}
public class HomeController : Controller
{
    private IMapper _mapper;

    public HomeController(IMapper mapper)
    {
        _mapper = mapper;
    }

    public IActionResult Index()
    {
        var blobs = new List<Blob>()
        {
            new Blob { Id = 1, Content = "One"},
            new Blob { Id = 2, Content = "Two"},
            new Blob { Id = 3, Content = "Three"}
        };

        var viewModel = _mapper.Map<IEnumerable<BlobViewModel>>(blobs);
        return View(viewModel);
    }
}
{% endhighlight %}

And with that in place, we now have AutoMapper configured through ASP.NET COre Dependency Injection. New profiles can be created and added easily by adding them in the Startup.cs constructor. 