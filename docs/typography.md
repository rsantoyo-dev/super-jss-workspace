# Typography

Super JSS provides a robust theming mechanism for typography. By simply adding the `sj` directive to your HTML tags, you can apply predefined styles from the theme to your text elements. This ensures consistency and a professional look across your application.

## Usage

You can use any HTML tag from H1 to H6, P, or span, and add the `sj` directive to apply the predefined typography styles:

```html
<h1 [sj]="">Hello world H1</h1>
<h2 [sj]="">Hello world H2</h2>
<h3 [sj]="">Hello world H3</h3>
<h4 [sj]="">Hello world H4</h4>
<h5 [sj]="">Hello world H5</h5>
<h6 [sj]="">Hello world H6</h6>
<p [sj]="">Hello world P</p>
<span [sj]="">Hello world span</span>
<strong [sj]="">Hello world span</strong>
```
These styles are defined in the SJssTheme interface under the typography property. Each tag (H1 to H6, P, span, etc.) corresponds to a specific style definition. By using the sj directive, you're telling Super JSS to apply the associated style from the theme to that tag.

---

[← Responsive Styles](responsive-style.md) | [Home](index.md) | [Theming →](theming.md)
