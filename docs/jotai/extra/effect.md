Effect
jotai-effect is a utility package for reactive side effects in Jotai.

Install
npm install jotai-effect
observe
observe mounts an effect to watch state changes on a Jotai store. It's useful for running global side effects or logic at the store level.

If you don't have access to the store object and are not using the default store, use atomEffect or withAtomEffect instead.

Signature
type Cleanup = () => void

type Effect = (
get: Getter & { peek: Getter }
set: Setter & { recurse: Setter }
) => Cleanup | void

type Unobserve = () => void

function observe(effect: Effect, store?: Store): Unobserve
effect: A function for observing and reacting to atom state changes.

store: A Jotai store to mount the effect on. Defaults to the global store if not provided.

returns: A stable function that removes the effect from the store and cleans up any internal references.

Usage
import { observe } from 'jotai-effect'

const unobserve = observe((get, set) => {
set(logAtom, `someAtom changed: ${get(someAtom)}`)
})

unobserve()
This allows you to run Jotai state-dependent logic outside React's lifecycle, ideal for application-wide effects.

Usage With React
Pass the store to both observe and the Provider to ensure the effect is mounted to the correct store.

const store = createStore()
const unobserve = observe((get, set) => {
set(logAtom, `someAtom changed: ${get(someAtom)}`)
}, store)

<Provider store={store}>...</Provider>

atomEffect
atomEffect creates an atom for declaring side effects that react to state changes when mounted.

Signature
function atomEffect(effect: Effect): Atom<void>
effect: A function for observing and reacting to atom state changes.

Usage
import { atomEffect } from 'jotai-effect'

const logEffect = atomEffect((get, set) => {
set(logAtom, get(someAtom)) // Runs on mount or when someAtom changes
return () => {
set(logAtom, 'unmounting') // Cleanup on unmount
}
})

// activates the atomEffect while Component is mounted
function Component() {
useAtom(logEffect)
}
withAtomEffect
withAtomEffect binds an effect to a clone of the target atom. The effect is active while the cloned atom is mounted.

Signature
function withAtomEffect<T>(targetAtom: Atom<T>, effect: Effect): Atom<T>
targetAtom: The atom to which the effect is bound.

effect: A function for observing and reacting to atom state changes.

Returns: An atom that is equivalent to the target atom but having a bound effect.

Usage
import { withAtomEffect } from 'jotai-effect'

const valuesAtom = withAtomEffect(atom(null), (get, set) => {
set(valuesAtom, get(countAtom))
return () => {
// cleanup
}
})
Dependency Management
Aside from mount events, the effect runs when any of its dependencies change value.

Sync: All atoms accessed with get inside the effect are added to the atom's dependencies.

Async: Asynchronous get calls do not add dependencies.

Cleanup: get calls in cleanup do not add dependencies.

Dependency Map Recalculation: Dependencies are recalculated on every run.

Effect Behavior
Executes Synchronously: effect runs synchronous in the current task after synchronous evaluations complete.

Batched Updates: Multiple synchronous updates are batched as a single atomic transaction.

Resistant to Infinite Loops: atomEffect avoids rerunning when it updates a value that it is watching.

Cleanup Function: The cleanup function is invoked on unmount or before re-evaluation.

Idempotency: atomEffect runs once per state change, regardless of how many times it is referenced.

Conditionally Running Effects: atomEffect only runs when mounted.

Supports Peek: Use get.peek to read atom data without subscribing.

Supports Recursion: Recursion is supported with set.recurse but not in cleanup.
