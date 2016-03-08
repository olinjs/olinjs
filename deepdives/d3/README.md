## Background Info
The [d3 website](https://d3js.org/) gives a good high-level explanation of the library.

## Resources
If you like textbooks, here's O'Reilly's [Interactive Data Visualization for the Web](http://chimera.labs.oreilly.com/books/1230000000345/index.html), free online.

If you like tutorials, here are some good ones:
- [The tutorials included in the O'Reilly's textbook](http://alignedleft.com/tutorials/d3)
- [Mike Bostock's official tutorials](https://github.com/mbostock/d3/wiki/) (Mike Bostock is the creator of d3.js)
- [A repo for an introductory class on journalistic d3](https://github.com/arnicas/interactive-vis-course/)
- [A talk-through introduction to d3](https://square.github.io/intro-to-d3/)

If you like examples:
- [The official d3 gallery](https://github.com/mbostock/d3/wiki/Gallery)
- Another gallery by [blockbuilder](http://bl.ocks.org/)
- Some jsfiddles we borrowed from blockbuilder -- feel free to fork and modify
    + [Random histogram](https://jsfiddle.net/swalters4925/oL8dpgr8/1/)
    + [Click vs. drag differentiation](https://jsfiddle.net/swalters4925/64cx65a3/1/)
    + [Epicyclic gears](https://jsfiddle.net/swalters4925/4wdm8gp9/2/)

## Sample App
There's a sample d3.js app in the [d3-sample](d3-sample) folder -- it includes a clock visualization and a simple data-driven bar chart. Feel free to use the sample app as boilerplate!

Challenge exercises:
- Chart:
  - Create a color scale for the bars which depends on frequency.
    - Show it all the time or only on hover -- up to you.
  - Display tooltips on the bars upon hover which show exact letter frequency.
- Clock:
  - Make a user interface for selecting color scheme.
  - Make a user interface for changing time zones.
  - Add a user interface for entering a "target time", and refactor so the visualization counts down until that time instead of representing the current time.
