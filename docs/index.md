# Supercharge Your Angular 20 Styling with Super JavaScript Stylesheets (SJSS)

Welcome to **Super JavaScript Stylesheets (SJSS)** – the ultimate dynamic and responsive styling library meticulously crafted for **Angular 20** applications. SJSS seamlessly integrates with Angular's latest advancements, transforming how you approach styling by making it intuitive, incredibly flexible, and effortlessly maintainable. Whether you're building a sleek personal project or a robust enterprise application, SJSS empowers you to achieve stunning UIs with unparalleled ease and efficiency.

## Why SJSS? Unleash the Power of Dynamic Styling

Tired of wrestling with complex CSS or boilerplate? SJSS simplifies styling in Angular by combining the best of JavaScript and CSS, offering a powerful, component-centric approach.

### Key Advantages:

*   📱 **Effortless Responsiveness:** Design truly adaptive layouts that look flawless on any screen size, from mobile to desktop, with minimal effort.
*   ✨ **Dynamic Control:** Update styles in real-time based on application state, user interactions, or theme preferences, creating truly interactive experiences.
*   🎨 **Simplified Theming:** Implement comprehensive theming capabilities with ease, allowing users to personalize their interface on the fly.
*   ⚡ **Angular-Native Performance:** Built from the ground up with Angular 20 signals, SJSS delivers blazing-fast performance without the typical overhead of RxJS, ensuring a smooth user experience.
*   🧩 **On-the-Fly CSS Generation:** SJSS generates and injects CSS classes into the DOM only as needed, avoiding large, unused style bundles and minimizing memory footprint.
*   🪶 **Incredibly Lightweight:** At less than 8KB minified (under 3KB gzipped), SJSS adds minimal footprint to your application.
*   ✍️ **Familiar & Intuitive:** Leverage a syntax that feels natural to anyone familiar with CSS or JavaScript, making adoption quick and easy.
*   🚀 **Standalone & Flexible:** As a standalone Angular directive, SJSS integrates seamlessly with any component, offering maximum flexibility.
*   🅰️ **Enhanced Typography:** Gain precise control over your text elements with powerful and intuitive typography styling options.

Unlike traditional utility-first frameworks like Tailwind CSS or component libraries like Material UI, SJSS doesn't ship with a giant prebuilt utility set or a large component library. Instead, it generates only the CSS you explicitly use, on the fly, keeping your application's bundle size minimal and ensuring optimal performance. This approach means no unused styles bloating your memory, just lean, efficient CSS tailored precisely to your needs.

### ✨ The Core Concept

> The principle is very simple: I take any CSS property, convert it to camelCase, and accept an object of breakpoints → all transformed into a CSS class for an ultra-lightweight experience. ✨ With added capabilities like a powerful theme system, where the entire look & feel is controlled in a single object — very fast and fluid thanks to Signals, for better integration with Angular.

In `super-jss`, you can take any CSS property, write it in `camelCase`, and assign it a value. For responsive design, you can use an object with breakpoint keys. This is all transformed into highly efficient CSS classes on the fly.

Here is a practical example of how you can apply themed, responsive, and dynamic styles to an element:

```html
<div [sj]="{
  backgroundColor: this.anyVariable ? 'primary.dark' : 'secondary.main',
  padding: { xs: 2, md: 4 }
  // You can also use shortcuts for convenience:
  // bg: this.anyVariable ? 'primary.dark' : 'secondary.main',
  // p: { xs: 2, md: 4 }
}">
  Themed, Responsive, and Dynamic Content
</div>
```
This small example demonstrates dynamic theming based on a variable, and responsive padding, all with a clean and concise syntax.

## Get Started in Seconds!

Experience the future of Angular styling. Dive into our comprehensive documentation:

*   [Installation Guide](installation.md): Your first step to transforming your Angular styling workflow.

## Community & Support

Join a growing community of developers pushing the boundaries of Angular styling. Connect, share, and contribute:

*   🌟 **Star us on GitHub:** [Super JSS on GitHub](https://github.com/rsantoyo-dev/super-jss-workspace)
*   📦 **Install via npm:** [Super JSS on npm](https://www.npmjs.com/package/super-jss)
*   🛠️ **Try live on StackBlitz:** [Super JSS on StackBlitz](https://stackblitz.com/edit/super-js?file=src%2Fmain.ts)

## Additional Resources

*   [Articles by Richard on Medium](https://medium.com/@viejorichard)

## 🎨 Demos

This interactive demo provides a hands-on experience with the powerful theming capabilities of SuperJSS. Here's what you can explore:

- **Live Theme Switching:** Use the theme selector in the header to switch between different pre-built themes (e.g., Default, Desert, Ocean) and even a custom theme. Notice how the application's entire look and feel changes instantly.
- **Dynamic Color Palette:** The "Palette" section showcases the theme's color palette, including primary, secondary, tertiary, and other semantic colors. These colors automatically update when you switch themes.
- **Adaptive Typography:** The "Typography" section demonstrates how headings, paragraphs, and other text elements adapt to the new theme's typography settings.


    <iframe src="https://stackblitz.com/edit/sjss-theming-demo?embed=1&file=src/app/app.component.ts&hideExplorer=1&hideNavigation=1&theme=dark&view=preview"
    style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
    title="sjss-theming-demo"
    allow="accelerometer; ambient-light-sensor; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
    sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts">
    </iframe>


## 💖☕ Support

If Super JSS empowers your projects, consider supporting its continued development:

*   [☕ ☕ ☕ Buy me a coffee](https://buymeacoffee.com/superjss)

## 📬 Contact

For inquiries, feedback, or issues, reach out at [ricardo.santoyo@hotmail.com](mailto:ricardo.santoyo@hotmail.com).