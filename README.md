# Vue CSS Grid Layout
A grid layout for Vue.js using CSS Grid.

## Use via npm in SFC
To use this library via npm and with Vue's Single-File Components (SFC), follow these steps:

First install via `npm install vue-css-grid-layout --save` or `yarn add vue-css-grid-layout`

Create a custom component for rendering a single grid element like this, e.g. as `render-component.vue`:
```vue
<template>
    <div class="render-component">{{ element.id }}</div>
</template>

<script>
export default {
    props: {
        element: Object
    }
}
</script>

<style scoped>
.render-component {
    border: 1px solid black;
    display: flex;
    flex-grow: 1;
}
</style>
```

Use `GridLayout` from this library in order to render a grid:
```vue
<template>
    <grid-layout :elements="elements" :render-component="RenderComponent"/>
</template>

<script>
import { GridLayout } from 'vue-css-grid-layout';
import RenderComponent from './render-component.vue';

export default {
    components: { GridLayout, RenderComponent},
    data() {
        return {
            RenderComponent: RenderComponent,
            elements: [
                { x: 0, y: 0, width: 1, height: 1, id: 1 },
                { x: 1, y: 1, width: 1, height: 1, id: 2 }
            ]
        }
    }
}
</script>

<style src="vue-css-grid-layout/dist/vue-css-grid-layout.css"></style>
```

## Use from CDN
To directly use this library in your project, you can just import the file from CDN (or use the files from the `dist` folder of this repository).

Include the CSS: 
```html
<link rel="stylesheet" href="https://unpkg.com/vue-css-grid-layout/dist/vue-css-grid-layout.css">
```

Create some HTML using the `grid-layout` element`:
```html
<div id="app">
    <grid-layout :elements="elements" render-component="render-component"/>
</div>
```

Import the `GridLayout` class in a script and use it:
```html
<script type="module">
    import { GridLayout } from 'https://unpkg.com/vue-css-grid-layout/dist/vue-css-grid-layout.es.js';

    Vue.component('render-component', {
        template: '<div class="render-component">{{ element.id }}</div>',
        props: {
            element: Object
        }
    });

    new Vue({
        el: '#app',
        components: { GridLayout },
        data() {
            return {
                elements: [
                    { x: 0, y: 0, width: 1, height: 1, id: 1 },
                    { x: 1, y: 1, width: 1, height: 1, id: 2 }
                ]
            };
        }
    });
</script>
```
