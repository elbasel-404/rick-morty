Resettable
atomWithReset
Ref: https://github.com/pmndrs/jotai/issues/41

function atomWithReset<Value>(
initialValue: Value,
): WritableAtom<Value, SetStateAction<Value> | typeof RESET>
Creates an atom that could be reset to its initialValue with useResetAtom hook. It works exactly the same way as primitive atom would, but you are also able to set it to a special value RESET. See examples in Resettable atoms.

Example
import { atomWithReset } from 'jotai/utils'

const dollarsAtom = atomWithReset(0)
const todoListAtom = atomWithReset([
{ description: 'Add a todo', checked: false },
])
RESET
Ref: https://github.com/pmndrs/jotai/issues/217

const RESET: unique symbol
Special value that is accepted by Resettable atoms created with atomWithReset, atomWithDefault or writable atom created with atom if it accepts RESET symbol.

Example
import { atom, useSetAtom } from 'jotai'
import { atomWithReset, useResetAtom, RESET } from 'jotai/utils'

const dollarsAtom = atomWithReset(0)
const centsAtom = atom(
(get) => get(dollarsAtom) \* 100,
(get, set, newValue: number | typeof RESET) =>
set(dollarsAtom, newValue === RESET ? newValue : newValue / 100)
)

const ResetExample = () => {
const setDollars = useSetAtom(dollarsAtom)
const resetCents = useResetAtom(centsAtom)

return (
<>
<button onClick={() => setDollars(RESET)}>Reset dollars</button>
<button onClick={resetCents}>Reset cents</button>
</>
)
}
useResetAtom
function useResetAtom<Value>(
anAtom: WritableAtom<Value, typeof RESET>,
): () => void | Promise<void>
Resets a Resettable atom to its initial value.

Example
import { useResetAtom } from 'jotai/utils'
import { todoListAtom } from './store'

const TodoResetButton = () => {
const resetTodoList = useResetAtom(todoListAtom)
return <button onClick={resetTodoList}>Reset</button>
}
atomWithDefault
Ref: https://github.com/pmndrs/jotai/issues/352

Usage
This is a function to create a resettable primitive atom. Its default value can be specified with a read function instead of a static initial value.

import { atomWithDefault } from 'jotai/utils'

const count1Atom = atom(1)
const count2Atom = atomWithDefault((get) => get(count1Atom) \* 2)
Stackblitz

Resetting default values
You can reset the value of an atomWithDefault atom to its original default value.

import { useAtom } from 'jotai'
import { atomWithDefault, useResetAtom, RESET } from 'jotai/utils'

const count1Atom = atom(1)
const count2Atom = atomWithDefault((get) => get(count1Atom) \* 2)

const Counter = () => {
const [count1, setCount1] = useAtom(count1Atom)
const [count2, setCount2] = useAtom(count2Atom)
const resetCount2 = useResetAtom(count2Atom)

return (
<>
<div>
count1: {count1}, count2: {count2}
</div>
<button onClick={() => setCount1((c) => c + 1)}>increment count1</button>
<button onClick={() => setCount2((c) => c + 1)}>increment count2</button>
<button onClick={() => resetCount2()}>Reset with useResetAtom</button>
<button onClick={() => setCount2(RESET)}>Reset with RESET const</button>
</>
)
}
This can be useful when an atomWithDefault atom value is overwritten using the set function, in which case the provided getter function is no longer used and any change in dependencies atoms will not trigger an update.

Resetting the value allows us to restore its original default value, discarding changes made previously via the set function.

atomWithRefresh
function atomWithRefresh<Value>(
read: Read<Value, [], void>,
): WritableAtom<Value, [], void>
Creates an atom that we can refresh, which is to force reevaluating the read function.

This is helpful when you need to refresh asynchronous data. It can also be used to implement "pull to refresh" functionality.

function atomWithRefresh<Value, Args extends unknown[], Result>(
read: Read<Value, Args, Result>,
write: Write<Value, Args, Result>,
): WritableAtom<Value, Args | [], Result | void>
Passing zero arguments to set will refresh. Passing one or more arguments to set will call "write" function.

Example
Here's how you'd use it to implement an refresh-able source of data:

import { atomWithRefresh } from 'jotai/utils'

const postsAtom = atomWithRefresh((get) =>
fetch('https://jsonplaceholder.typicode.com/posts').then((r) => r.json()),
)
In a component:

const PostsList = () => {
const [posts, refreshPosts] = useAtom(postsAtom)

return (
<div>
<ul>
{posts.map((post) => (
<li key={post.id}>{post.title}</li>
))}
</ul>

      {/* Clicking this button will re-fetch the posts */}
      <button type="button" onClick={() => refreshPosts()}>
        Refresh posts
      </button>
    </div>

)
}
