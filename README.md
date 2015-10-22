# Angular Gale Material

---
**[Download RC Version](https://github.com/dmunozgaete/Angular-Gale-Material/releases/tag/v1.0.0-rc.1) |**
**[Guide](https://angular-gale.azurewebsites.net) |**
**[C# API](https://gale.azurewebsites.net) |**
**[Report Issues](#report-an-issue)**
 
---

Angular Gale Material is a set of components design for support the UX created with 
the Angular-Material Project (Only Web Environment)

**Note:** *Angular-Gale-Material is under active development. As such, while this library is well-tested, the API may change. Consider using it in production applications only if you're comfortable following a changelog and updating your usage accordingly.*


## Get Started

**(1)** Get Angular-Gale-Material in one of the following ways:
 - [download the release](https://github.com/dmunozgaete/Angular-Gale-Material/releases/tag/v1.0.0-rc.1)
 - or via **[Bower](http://bower.io/)**: by running `$ bower install angular-gale-material --save` from your console

**(2)** Include `angular-gale-material.js` (or `angular-gale-material.min.js`) in your `index.html`

**(3)** Add `gale-material` to your main module's list of dependencies

When you're done, your setup should look similar to the following:

```html
<!doctype html>
<html ng-app="myApp">
<head>
    <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.4.7/angular.min.js"></script>
    <script src="//ajax.googleapis.com/ajax/libs/angular-material/0.11.2/angular-material.min.js"></script>
    <script src="bower_components/angular-gale-material/angular-gale-material.min.js"></script>
    <script>
        var myApp = angular.module('myApp', ['gale-material']);
    </script>
    ...
</head>
<body>
    ...
</body>
</html>
```

**Note:** if you want the unstable version use: `$ bower install dmunozgaete/angular-gale-material#master --save` from your console


# Report an Issue

Help us make Angular-Gale better! If you think you might have found a bug, or some other weirdness, start by making sure
it hasn't already been reported. You can [search through existing issues](https://github.com/dmunozgaete/Angular-Gale-Material/issues?q=is%3Aopen+is%3Aissue)
to see if someone's reported one similar to yours.

If not, then [create a plunkr](http://bit.ly/UIR-Plunk) that demonstrates the problem (try to use as little code
as possible: the more minimalist, the faster we can debug it).

Next, [create a new issue](https://github.com/dmunozgaete/Angular-Gale-Material/issues/new) that briefly explains the problem,
and provides a bit of background as to the circumstances that triggered it. Don't forget to include the link to
that plunkr you created!

Issues only! |
-------------|
Please keep in mind that the issue tracker is for *issues*. Please do *not* post an issue if you need help or support. 

# Contribute

**(1)** See the **[Developing](#developing)** section below, to get the development version of Angular-Gale up and running on your local machine.

**(2)** Check out the [roadmap](https://github.com/dmunozgaete/Angular-Gale-Material/milestones) to see where the project is headed, and if your feature idea fits with where we're headed.

**(4)** Finally, commit some code and open a pull request. Code & commits should abide by the following rules:

*Always*
- Commits should represent one logical change each; if a feature goes through multiple iterations, squash your commits down to one
- Changes should always respect the coding style of the project

## Resources 

- [Angular Gale Doc's](http://angular-gale.azurewebsites.net/)
- [Framework API](http://gale.azurewebsites.net/)
- [Grupo Valentys](http://www.valentys.com)

## Developing

```bash
 npm install & bower install
 grunt compile
```
