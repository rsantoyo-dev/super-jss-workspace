# Styling with Super JSS

Super JSS allows for easy and dynamic styling in Angular applications. One of the key features is that all CSS properties are camel-cased, making it intuitive and easy to remember or find.

### 1.  Basic Styling:

With Super JSS integrated, you can now apply dynamic styles directly in your Angular templates using the [sj] directive.

```html
<div [sj]="{backgroundColor: 'red', color:'white'}">HELLO WORLD</div>
```

### 2.  Combining Styles:
Super JSS allows for combining multiple styles. This can be done by defining styles in your component and then combining them in your template.

In your component's TypeScript:

```typescript
styleOne: SJssStyles = {backgroundColor: 'red'};
styleTwo: SJssStyles = {color: 'white'};
```
In your component's HTML:

```html
<div [sj]="[styleOne, styleTwo]">Combined Styles</div>
```

### 3.  Responsive Styling
Define styles for various breakpoints to ensure responsiveness.

```html
<div [sj]="{backgroundColor: {xs:'red', sm:'blue', md:'green', lg:'purple', xl:'orange'}}">RESPONSIVE DIV</div>
```

---

[← Installation](installation.md) | [Home](index.md) | [Responsive Styles →](responsive-style.md)
