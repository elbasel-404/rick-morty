# Tailwind Motion Documentation

## Overview

Tailwind Motion provides powerful animation utilities for Tailwind CSS. This guide covers enter animations, exit animations, loop animations, scroll-triggered animations, and animation modifiers.

---

## Enter Animations

Animations that trigger when elements enter the viewport or are mounted.

### Overview

Enter animations are triggered when elements are mounted in the DOM. They're perfect for adding animations to landing pages and animating appearing elements.

Each element will automatically animate from its starting state (the value after `-in-`) to its default state. For example:

- `motion-opacity-in-0` starts at opacity(0) and animates to opacity(100%)
- `motion-translate-y-in-100` starts at translateY(100%) and animates to translateY(0)
- `motion-blur-in-md` starts at blur(md) and animates to blur(0)
- `motion-scale-in-75` starts at scale(75%) and animates to scale(100%)

### Basic Usage

Create enter animations by using any base animation with the `in` direction:

```html
<div class="motion-translate-y-in-100">Slide up on enter</div>
```

### Combining Enter Animations

Stack multiple enter animations to create complex effects:

```html
<div class="motion-opacity-in-0 motion-translate-y-in-100 motion-blur-in-md">
  Fade in, slide up, and unblur
</div>
```

### Customizing Enter Animations

You can customize enter animations using modifiers:

```html
<div
  class="motion-translate-y-in-100 motion-duration-[2s] motion-ease-spring-smooth"
>
  Slow, smooth entrance
</div>
```

---

## Exit Animations

Animations that trigger when elements are about to be removed.

### Overview

Exit animations are CSS animations that transition elements to a final "exit" state. These classes provide the animation styles, but don't handle any DOM removal logic - you'll need to combine them with UI libraries or custom code to manage element removal.

Each element will animate from its default state to its exit state (the value after `-out-`). For example:

- `motion-opacity-out-0` animates from opacity(100%) to opacity(0)
- `motion-translate-y-out-100` animates from translateY(0) to translateY(100%)
- `motion-blur-out-md` animates from blur(0) to blur(md)
- `motion-scale-out-75` animates from scale(100%) to scale(75%)

### Basic Usage

Create exit animations by using the `out` direction with any base animation:

```html
<div class="motion-translate-y-out-100">Slide down and fade out</div>
```

### Combining Exit Animations

Stack multiple exit animations to create complex effects:

```html
<div class="motion-translate-y-out-100 motion-rotate-out-45 motion-blur-out-sm">
  Complex exit animation
</div>
```

### Customizing Exit Animations

You can customize exit animations using modifiers:

```html
<div
  class="motion-translate-y-out-100 motion-duration-[2s] motion-ease-spring-smooth"
>
  Slow, smooth exit
</div>
```

### Available Properties

The following properties can be animated on exit:

- Scale
- Translate
- Opacity
- Rotation
- Blur
- Background color
- Text color
- Grayscale

---

## Loop Animations

Animations that repeat indefinitely.

### Overview

Loop animations are continuous animations that repeat indefinitely. They're perfect for creating ongoing visual effects like spinners, pulsing elements, or floating objects.

Each element will continuously animate between its default state and the target state (the value after `-loop-`). For example:

- `motion-translate-y-loop-25` alternates between translateY(0) and translateY(25%)
- `motion-scale-loop-110` alternates between scale(1) and scale(1.1)
- `motion-rotate-loop-45` alternates between rotate(0deg) and rotate(45deg)
- `motion-opacity-loop-50` alternates between 100% and 50% opacity

### Basic Usage

Create loop animations by using the `loop` direction with any base animation:

```html
<div class="motion-translate-y-loop-25">Continuous up and down motion</div>
```

### Loop Modifiers

Loop animations can be modified with `/mirror` or `/reset` to achieve different looping behaviors:

#### Mirror Loops

Adding `/mirror` creates a back-and-forth animation that reverses direction:

```html
<div class="motion-translate-y-loop-50/mirror">Back-and-forth motion</div>
```

#### Reset Loops

Adding `/reset` makes the animation return instantly to its starting position:

```html
<div class="motion-translate-y-loop-50/reset">Instant reset motion</div>
```

This is particularly useful for creating spinners:

```html
<div class="motion-rotate-loop-[1turn]/reset motion-ease-linear"></div>
```

### Combining Loop Animations

Stack multiple loop animations to create complex effects:

```html
<div
  class="motion-translate-y-loop-25 motion-rotate-loop-45 motion-blur-loop-sm"
>
  Complex looping animation
</div>
```

### Customizing Loop Animations

You can customize loop animations using modifiers:

```html
<div
  class="-motion-translate-y-loop-50 motion-duration-[2s] motion-ease-spring-smooth"
>
  Slow, smooth floating
</div>
```

---

## Base Animations

Create custom animations using Tailwind Motion's base animation classes.

### Overview

Base animations are the fundamental building blocks in Tailwind Motion that allow you to create custom animations by combining different properties. Each property controls a specific aspect of the animation, such as opacity, translation, or rotation.

### How Base Animations Work

Base animations follow this naming pattern:

```
motion-[property]-[direction]-[value]
```

- **property**: The property to animate (opacity, translate, scale, etc.)
- **direction**: The animation direction:
  - `in` - Entrance animations
  - `out` - Exit animations
  - `loop` - Continuous animations
- **value**: The target value for the animation

### Quick Example

```html
<div class="motion-opacity-in-0 motion-translate-y-in-100">
  Fade in and slide in from below!
</div>
```

### Available Properties

Tailwind Motion includes these animation properties:

#### Visual Properties

- **Opacity** - Fade elements in/out
- **Scale** - Change element size
- **Translation** - Move elements horizontally/vertically
- **Rotation** - Rotate elements

#### Filter Effects

- **Blur** - Apply blur effects
- **Grayscale** - Control grayscale filters

#### Color Animations

- **Background Color** - Animate background colors
- **Text Color** - Animate text colors

### Combining Animations

Stack multiple animation classes to create complex effects:

```html
<div class="motion-opacity-in-0 motion-translate-y-in-100 motion-rotate-in-90">
  Complex animation!
</div>
```

All animations support entrance (`in`), exit (`out`), and continuous (`loop`) variations.

---

## Applying Modifiers

Learn how to apply modifiers to your animations.

### Overview

Modifiers allow you to customize various aspects of your animations, including duration, delay, timing function, and play state.

### Available Modifiers

- **Duration** - Control how long animations take
- **Delay** - Add a delay before animations start
- **Timing Function** - Adjust the easing of animations
- **Play State** - Pause and resume animations

### Basic Usage

Add modifier classes alongside your animation classes to customize their behavior:

```html
<div class="motion-preset-fade motion-duration-2000">Slow fade in</div>
```

### Applying to Specific Properties

You can target specific properties using a slash (`/`) followed by the property name:

```html
<div class="motion-delay-500/rotate motion-rotate-in-180 motion-opacity-in-0">
  Delayed rotation
</div>
```

In this example, the delay only applies to the rotation animation, while the opacity animation starts immediately.

### Combining Multiple Modifiers

You can stack multiple modifiers to achieve complex animation behaviors:

```html
<div
  class="motion-preset-slide-right-lg motion-duration-2000 motion-delay-500 motion-ease-bounce"
>
  Complex animation
</div>
```

### Play State Control

Use play state modifiers to control animation playback:

```html
<div class="motion-preset-oscillate-lg motion-paused hover:motion-running">
  Hover to play
</div>
```

### Arbitrary Values

Most modifiers support arbitrary values using square brackets:

```html
<div
  class="motion-scale-in-50 motion-duration-[1500ms] motion-ease-[cubic-bezier(1,-0.4,0.35,0.95)]"
>
  Custom timing
</div>
```

---

## Animation Presets

Rombo for Tailwind provides a collection of ready-made animation presets that combine multiple animation properties into single, easy-to-use classes.

### Loop Animation Presets

#### Pulse

Available sizes: `motion-preset-pulse-sm`, `motion-preset-pulse-md`, `motion-preset-pulse-lg`

```html
<div class="motion-preset-pulse">pulse</div>
```

#### Wobble

Available sizes: `motion-preset-wobble-sm`, `motion-preset-wobble-md`, `motion-preset-wobble-lg`

```html
<div class="motion-preset-wobble">wobble</div>
```

#### Seesaw

Available sizes: `motion-preset-seesaw-sm`, `motion-preset-seesaw-md`, `motion-preset-seesaw-lg`

```html
<div class="motion-preset-seesaw">seesaw</div>
```

#### Oscillate

Available sizes: `motion-preset-oscillate-sm`, `motion-preset-oscillate-md`, `motion-preset-oscillate-lg`

```html
<div class="motion-preset-oscillate">oscillate</div>
```

#### Stretch

Available sizes: `motion-preset-stretch-sm`, `motion-preset-stretch-md`, `motion-preset-stretch-lg`

```html
<div class="motion-preset-stretch">stretch</div>
```

#### Float

Available sizes: `motion-preset-float-sm`, `motion-preset-float-md`, `motion-preset-float-lg`

```html
<div class="motion-preset-float">float</div>
```

#### Spin

```html
<div class="motion-preset-spin">spin</div>
```

#### Blink

```html
<div class="motion-preset-blink">blink</div>
```

#### Typewriter

Enter the number of characters you want to animate in the square brackets.

```html
<div class="motion-preset-typewriter-[10]">typewriter</div>
```

#### Flomoji

```html
<div class="motion-preset-flomoji-[🚀]">flomoji-[🚀]</div>
```

---

## Scroll Animations

How to implement scroll triggered animations.

### Overview

For scroll-triggered animations, you'll need to use an additional library alongside Rombo for Tailwind as it doesn't support scroll animations yet. This guide shows you how to implement scroll animations using `tailwindcss-intersect`.

### Installation

First, install the `tailwindcss-intersect` plugin:

```bash
npm install -D tailwindcss-intersect
# or
pnpm add -D tailwindcss-intersect
```

Then, add the plugin to your Tailwind configuration:

```js
// tailwind.config.js
module.exports = {
  content: [...],
  theme: {
    extend: {...},
  },
  plugins: [
    require('tailwindcss-motion'),
    require('tailwindcss-intersect')
  ],
};
```

### Setting Up the Observer

The plugin requires an observer to be initialized.

#### React Setup

Add the component to your project:

```tsx
// ObserverProvider.tsx
"use client";
import { Observer } from "tailwindcss-intersect";
import { useEffect } from "react";

export default function ObserverProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    Observer.start();
  }, []);

  return <>{children}</>;
}
```

And then wrap your app with the `ObserverProvider`:

```tsx
// App.tsx
import ObserverProvider from "./ObserverProvider";

function App() {
  return (
    <ObserverProvider>
      <YourApp />
    </ObserverProvider>
  );
}
```

### Basic Usage

Add the `intersect:` prefix to any Rombo animation class to trigger it when the element enters the viewport:

```html
<div class="intersect:motion-preset-fade">Fade in on scroll</div>
```

### One-Time Animations

Add the `intersect-once` class to trigger the animation only the first time an element enters the viewport:

```html
<div class="intersect-once intersect:motion-preset-slide-up">Slide up once</div>
```

### Examples

#### Staggered List Items

Create a staggered animation effect for list items:

```html
<div class="space-y-4">
  <div class="intersect:motion-preset-slide-up motion-delay-0">First item</div>
  <div class="intersect:motion-preset-slide-up motion-delay-100">
    Second item
  </div>
  <div class="intersect:motion-preset-slide-up motion-delay-200">
    Third item
  </div>
</div>
```

#### Combined Animations

Mix multiple animations that trigger on scroll:

```html
<div
  class="intersect:motion-opacity-in-0 intersect:motion-translate-y-in-100 intersect:motion-rotate-in-180"
>
  Complex scroll animation
</div>
```
