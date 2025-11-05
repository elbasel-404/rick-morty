Babel
babel/plugin-react-refresh
This plugin adds support for React Refresh for Jotai atoms. This makes sure that state isn't reset, when developing using React Refresh.

Usage
With a babel configuration file:

{
"plugins": ["jotai/babel/plugin-react-refresh"]
}
The plugin recognizes a predefined list of atom function names (e.g. 'atom', 'atomFamily', 'atomWithDefault'). If you’re using custom atom function names, you can explicitly supply them to ensure they are recognized.

Here’s how you can configure it in your Babel setup:

{
"plugins": [
["jotai/babel/plugin-react-refresh", { "customAtomNames": ["customAtom"] }]
]
}
Examples can be found below.

babel/plugin-debug-label
Jotai is based on object references and not keys (like Recoil). This means there's no identifier for atoms. To identify atoms, it's possible to add a debugLabel to an atom, which can be found in React devtools.

However, this can quickly become cumbersome to add a debugLabel to every atom.

This babel plugin adds a debugLabel to every atom, based on its identifier.

The plugin transforms this code:

export const countAtom = atom(0)
Into:

export const countAtom = atom(0)
countAtom.debugLabel = 'countAtom'
Default exports are also handled, based on the file naming:

// countAtom.ts
export default atom(0)
Which transform into:

// countAtom.ts
const countAtom = atom(0)
countAtom.debugLabel = 'countAtom'
export default countAtom
Usage
It is recommended to disable this plugin for production builds to avoid unnecessary overhead. You can conditionally include it in your Babel configuration based on the environment.

With a babel configuration file:

{
"plugins": ["jotai/babel/plugin-debug-label"]
}
The plugin recognizes a predefined list of atom function names (e.g. 'atom', 'atomFamily', 'atomWithDefault'). If you’re using custom atom function names, you can explicitly supply them to ensure they are recognized.

Here’s how you can configure it in your Babel setup:

{
"plugins": [
["jotai/babel/plugin-debug-label", { "customAtomNames": ["customAtom"] }]
]
}
Examples can be found below.

babel/preset
Jotai ships with a babel preset containing the plugins created for Jotai.

Usage
With a babel configuration file:

{
"presets": ["jotai/babel/preset"]
}
You can also supply your atom names to the preset:

{
"presets": [["jotai/babel/preset", { "customAtomNames": ["customAtom"] }]]
}
