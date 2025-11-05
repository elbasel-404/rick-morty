Custom useAtom hooks
This page shows the ways of creating different utility functions. Utility functions save your time on coding, and you can preserve your base atom for other usage.

utils
useSelectAtom
import { useAtomValue } from 'jotai'
import { selectAtom } from 'jotai/utils'

export function useSelectAtom(anAtom, selector) {
const selectorAtom = selectAtom(
anAtom,
selector,
// Alternatively, you can customize `equalityFn` to determine when it will rerender
// Check selectAtom's signature for details.
)
return useAtomValue(selectorAtom)
}

// how to use it
function useN(n) {
const selector = useCallback((v) => v[n], [n])
return useSelectAtom(arrayAtom, selector)
}
Please note that in this case keyFn must be stable, either define outside render or wrap with useCallback.

useFreezeAtom
import { useAtom } from 'jotai'
import { freezeAtom } from 'jotai/utils'

export function useFreezeAtom(anAtom) {
return useAtom(freezeAtom(anAtom))
}
useSplitAtom
import { useAtom } from 'jotai'
import { splitAtom } from 'jotai/utils'

export function useSplitAtom(anAtom) {
return useAtom(splitAtom(anAtom))
}
extensions
useFocusAtom
import { useAtom } from 'jotai'
import { focusAtom } from 'jotai-optics'

/_ if an atom is created here, please use `useMemo(() => atom(initValue), [initValue])` instead. _/
export function useFocusAtom(anAtom, keyFn) {
return useAtom(focusAtom(anAtom, keyFn))
}

// how to use it
useFocusAtom(anAtom) {
useMemo(() => atom(initValue), [initValue]),
useCallback((optic) => optic.prop('key'), [])
}
Stackblitz

Please note that in this case keyFn must be stable, either define outside render or wrap with useCallback.
