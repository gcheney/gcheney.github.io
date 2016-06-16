---
layout: post
title: Hello World
description: 
modified: 2016-05-01
comments: true
tags: [code, highlighting, first, programming, languages]
categories: [programming]
image:
  feature: helloworld-toast-min.jpg
  credit: Windell Oskay
  creditlink: https://www.flickr.com/photos/oskay/
---

Hello world and welcome to my very first post! As a long time Wordpress user this is my first step into the world of the simple, blog-aware, static site generator known as [Jekyll](https://jekyllrb.com/), and what better way to start this blog off than with the traditional "Hello World" post! 

I will take it one step further though and make this "Hello World" post *about* the famous first programming example so many books and tutorials have used over the years. Ever since it first appeared in the [The C Programming Language](https://en.wikipedia.org/wiki/The_C_Programming_Language), the "Hello world" example has been the go to introduction to a new programming langauge for most software developers. In honor of that, I will present "Hello World" `foreach` of the current [Tiobe Index](http://www.tiobe.com/tiobe_index) top ten programming langauges as of April 2016. This will be a great way to learn a bit of what makes each of these langauges unique in both their syntax and their design philosophy (plus it will let me test out the code highlighting styles). Lets get started! 

<!-- more -->

### 1. Java

{% highlight java %}
/******************************************************************************
 *  Compilation:  javac HelloWorld.java
 *  Execution:    java HelloWorld
 *
 *  Prints "Hello, World". By tradition, this is everyone's first program.
 *
 *  % java HelloWorld
 *  Hello, World
 *
 *  These 17 lines of text are comments. They are not part of the program;
 *  they serve to remind us about its properties. The first two lines tell
 *  us what to type to compile and test the program. The next line describes
 *  the purpose of the program. The next few lines give a sample execution
 *  of the program and the resulting output. We will always include such 
 *  lines in our programs and encourage you to do the same.
 *
 ******************************************************************************/
 
public class HelloWorld {

    public static void main(String[] args) {
        System.out.println("Hello, World");
    }

}
{% endhighlight %}

The Java version of "Hello World", which comes to us by way of Robert Sedgewick and Kevin Wayne [Princeton Course](http://introcs.cs.princeton.edu/), is a pretty good example of what we can expection from many of the top languages on the list, which are all statically-typed, compiled languages in variants of the "C" family of langauges. There is the main method, public access modifier, the use of semicolons at the end of statements, calls to methods on a class int he form of ```System.out.println()```, and wrapping it all in a neat class to run. As a bonus, what Java program would be complete without a Javadoc comment that is more verbose than the program itself?  

### 2. C

{% highlight c %}
/* Hello World program */

#include<stdio.h>

main()
{
    printf("Hello World");

}
{% endhighlight %}

The classic C version of "Hello World" as shwon in [The C Programming Language](http://groups.engin.umd.umich.edu/CIS/course.des/cis400/c/hworld.html) does strip away some of the bells and whistles of the Java version (or more accurately, Java added those bells and whistles later on). Still we do see the ```main``` method, along with a return statement and type along with the ```printf()``` function that is used to display the message to the console, and the ```#include``` directive to bring in the IO functionality.

### 3. C++
{% highlight c++ %}
//hello.cpp
#include <iostream>

int main()
{
  std::cout << "Hello World!";
  return 0;
}
{% endhighlight %}

The C++ version of "Hello World" shares quite a few similarities with the C version, including the ```main()``` method and ending return statement. The printing statement in C++ is quite a bit different from anything else on our list, utilizing the global objects ```std::cout <<``` to use the output stream. The directive ```#include <iostream>```, instructs the preprocessor to include a section of standard C++ code, known as header iostream, that allows to perform standard input and output operations similar to the example in C.

### 4. C\#

{% highlight c# %}
// hello1.cs
public class HelloWorld
{
   public static void Main()
   {
      System.Console.WriteLine("Hello, World!");
   }
}

{% endhighlight %}

This C# example, whcih comes to us from the official [MSDN docs](https://msdn.microsoft.com/en-us/library/aa288463(v=vs.71).aspx) looks awfully familiar. This version is in many ways identical to the Java version from example one. The only true difference is the call to ```Console.WriteLine()``` instead of ```out.println()```. They both come from the same (in name only) ```System``` class. This makes since, as C# is base don both Java and C++, and shares many [similarities](https://msdn.microsoft.com/en-us/library/ms836794.aspx) with those lanaguages.

### 5. Python

{% highlight python %}
# hello.py
print "Hello World!"
{% endhighlight %}

The Python example is finally taking us in a diffeent direction than the previous four examples. Since Python is a weakly-typed, dynamic langauge we dont have to do quite as much to set it up and get the program running. There is a noticable lack of curly brackets, semicolons, types, and even a new way to write comments. the statement itself is also significantly less verbose than the C# and Java examples seen above. 

### 6. PHP

{% highlight php %}
 <?php 
    //hello.php
    echo 'Hello World'; 
 ?> 
{% endhighlight %}

With PHP here, we continue the trend at that will go through the second half of this list with a dynamic, weakly-typed language. We also see a few of the same features from all of the previous versions. The ```echo``` statement works in the same manner as Pythons ```print``` statement and i features use of the "C"-style semicolon.  

### 7. Javascript

{% highlight javascript %}
// hello.js
console.log("Hello world!");
{% endhighlight %}

Let's assume you are using something like Node.js and don't need to wrap anything in HTML for this one, and check out what Javascript has to offer. For this example Javascript looks like a mix of the dynamic langauges we have seen so far but also retains much of the syntax of the C-languages, even if the rest of Javascript does not follow closely at all. 

### 8. Perl

{% highlight perl %}
#!/usr/bin/perl
print "Hello World!";

{% endhighlight %}

This Perl example of "Hello World" brings an interesting syntactic blend between the Python and PHP examples above. It is interesting to note that all of the versions we have looked at since C# are dynamic, interpreted languages as opposed to beign static and compiled. Its also interesting to note how every langauge since then has managed to fit the entire "Hello World" program on one line.  

### 9. Ruby

{% highlight ruby %}
# hello.rb
puts 'Hello world!'

{% endhighlight %}

With Ruby, we are seeing yet another example of a single line "Hello World", this time very similar to python except for ```puts``` instead of ```print```. 


### 10. Visual Basic

{% highlight html %}
{% raw %}
' hello.vb 
Module HelloWorld
  Sub Main()
      Console.WriteLine("Hello World!")
  End Sub 
End Module
{% endraw %}
{% endhighlight %}

And finally, we come to Visual Basic, which at a superficial level looks almost nothing like the others we have seen on this list. (I was also, sadly, unable to find proper syntax highlighting for it.) Here the structure looks somewhat similar to C# and Java, but in place of curly brackets we have the ```sub``` and ```end``` statements and whitespace/indentation. Since even Tiobes cover story indicates that Visual Basic is losing popularity fast, its unlikely we will see many more "Hello Worlds" of this nature in the future. 

### Conclusion

So, there you have it! The world-famous "Hello World" program in the worlds current Top Ten programming languages. I know we didn't dive too deeply into the differences between these and really only just scratched the surface, but it still provides an interesting look at what type of syntax the most used languages have. 

Leave a comment below to let me know your thoughts, and I'll see you next time.
