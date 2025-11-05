Tailwind Intersect Plugin

**[← Back to Tailwind Docs](./README.md)**

Intersection Observer plugin for viewport-based animations and effects.

## Related Documentation

- [Responsive Design](./responsive-design.md) - Breakpoint-based styling
- [Custom Styles](./custom-styles.md) - Custom classes with `@apply`
- [Functions and Directives](./functions-and-directives.md) - `@variant` for custom variants

---

## Usage

Use the intersect: variant in your classes like you would with every other Tailwind CSS Variant:

<div class="bg-cyan-500 intersect:bg-indigo-600 transition-colors"></div>
Modifiers
intersect-once
You can use intersect-once if you want to trigger the event only on the first appearance of an element.

<div class="intersect:animate-spin intersect-once"></div>
intersect-half
Use the intersect-half utility to trigger the event when at least half of the element is visible. (threshold is set to 0.5)

<div class="intersect:animate-spin intersect-half"></div>
intersect-full
Use the intersect-full utility to trigger the event when when the element is fully visible. (threshold is set to 0.99)

<div class="intersect:animate-spin intersect-full"></div>
Custom classes
If you want to define the intersection behavior in a custom class (e.g. with the @apply directive), add a intersect class to your HTML element.

<div class="intersect custom-class"></div>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Example „Cards” - Tailwind CSS Intersection Observer Plugin</title>
    <link href="output.css" rel="stylesheet">
    <script defer src="https://unpkg.com/tailwindcss-intersect@2.x.x/dist/observer.min.js"></script>
</head>

<body class="bg-white p-8 lg:p-12 lg:text-lg">
    <div class="max-w-3xl mx-auto overflow-clip">
        
        <h1 class="text-3xl mb-2">Example „Image Cards”</h1>
        <h2 class="text-xl mb-12 lg:mb-16"><a href="https://github.com/heidkaemper/tailwindcss-intersect">Tailwind CSS Intersection Plugin</a></h2>

        <p class="my-8 lg:my-12">
            Scroll down and the images on this page will be animated.<br>
            If the images are already in the viewport when the page is loaded, there will be no animation.
            Therefore, the performance and loading time of the page will not be affected.
        </p>

        <p class="my-8 lg:my-12 text-gray-500">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
            ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
            dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
            Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip
            ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie
            consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim
            qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.
        </p>

        <p class="my-8 lg:my-12 text-gray-500">
            Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum
            dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent
            luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet,
            consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
            erat volutpat.
        </p>

        <p class="my-8 lg:my-12 text-gray-500">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
            ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
            dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
        </p>

        <div class="grid gap-4 lg:grid-cols-2">
            <div class="scale-50 opacity-0 intersect:scale-100 intersect:opacity-100 transition duration-700">
                <img src="https://picsum.photos/400?random=1" class="w-full h-96 object-cover bg-slate-300 rounded">
            </div>

            <div class="scale-50 opacity-0 intersect:scale-100 intersect:opacity-100 transition duration-700 lg:delay-200">
                <img src="https://picsum.photos/400?random=2" class="w-full h-96 object-cover bg-slate-300 rounded">
            </div>

            <div class="scale-50 opacity-0 intersect:scale-100 intersect:opacity-100 transition duration-700">
                <img src="https://picsum.photos/400?random=3" class="w-full h-96 object-cover bg-slate-300 rounded">
            </div>

            <div class="scale-50 opacity-0 intersect:scale-100 intersect:opacity-100 transition duration-700 lg:delay-200">
                <img src="https://picsum.photos/400?random=4" class="w-full h-96 object-cover bg-slate-300 rounded">
            </div>
        </div>

        <small class="block text-xs leading-none bg-gray-200 rounded font-mono p-2 my-4 cursor-help opacity-0 intersect:opacity-100 transition duration-1000 intersect-once" title="Classes used in the example above">
            scale-50 opacity-0 intersect:scale-100 intersect:opacity-100 transition
        </small>

        <p class="my-8 lg:my-12 text-gray-500">
            Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum
            dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent
            luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet,
            consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam
            erat volutpat.
        </p>

        <p class="my-8 lg:my-12 text-gray-500">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
            ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
            dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
            Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip
            ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie
            consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim
            qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.
        </p>

        <div class="translate-x-1/3 intersect:translate-x-0 transition ease-out duration-500">
            <img src="https://picsum.photos/600/400?random=1" class="w-full h-80 object-cover bg-slate-300 rounded">
        </div>

        <small class="block text-xs leading-none bg-gray-200 rounded font-mono p-2 my-4 cursor-help opacity-0 intersect:opacity-100 transition duration-1000 intersect-once" title="Classes used in the example above">
            translate-x-1/3 intersect:translate-x-0 transition
        </small>

        <p class="my-8 lg:my-12 text-gray-500">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
            ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
            dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
        </p>

        <p class="my-8 lg:my-12 text-gray-500">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
            ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
            dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
            Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip
            ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie
            consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim
            qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.
        </p>

        <div class="-translate-x-1/3 intersect:translate-x-0 transition ease-out duration-500">
            <img src="https://picsum.photos/600/400?random=2" class="w-full h-80 object-cover bg-slate-300 rounded">
        </div>

        <small class="block text-xs leading-none bg-gray-200 rounded font-mono p-2 my-4 cursor-help opacity-0 intersect:opacity-100 transition duration-1000 intersect-once" title="Classes used in the example above">
            -translate-x-1/3 intersect:translate-x-0 transition
        </small>

        <p class="my-8 lg:my-12">
            This is the end of this page.<br>
            Now get creative and build your own!
        </p>

        <a href="https://github.com/heidkaemper/tailwindcss-intersect/blob/main/docs/example/index.html" class="underline hover:no-underline">Link to Source Code</a>

    </div>

</body>

</html>
@import "tailwindcss" source(none);

@import "../../";

@source "index.html"

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tailwind CSS Intersection Observer Plugin</title>
    <style>
        body {
            background: white;
            color: black;
            font: normal 1rem/1.5 sans-serif;
            padding: 1rem;
            margin: 0;
        }
        a {
            color: black;
        }
    </style>
</head>

<body>
    <h1>Tailwind CSS Intersection Observer Plugin</h1>

    <ul>
        <li>
            <a href="example/" title="Example">Show Example</a>
        </li>
        <li>
            <a href="https://github.com/heidkaemper/tailwindcss-intersect" title="GitHub Repository">GitHub Repository</a>
        </li>
    </ul>

</body>

</html>
