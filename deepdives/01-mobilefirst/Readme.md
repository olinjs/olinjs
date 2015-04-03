# Deep Dive 1: Mobile First

CSS3 provides powerful tools for making mobile-friendly website. The trick is that if you want to make a responsive website, you need to start with small screens in mind (or face unnecessary headaches).

## Flexbox

Flexbox is a powerful way to layout boxes of content that will automatically grow to fill space, 

This section and example code was largely inspired by [this great Flexbox guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/).

## CSS Debugging Tips

This is how I figure out if my stylesheet is being included in a new document:

```css
body {
  background-color: red;
}
```

Simple things like making elements more visible are an immense help in debugging.

When you're doing layout, a rule like this can be useful.

```css
* {
  border: 1px dashed black;
}
```

`*` is a wildcard, so this rule gives every element a dashed black border.

## Media Queries

## Bootstrap