import { useRef, useEffect } from 'react'

export const capitalize = (word = 'start') => {
    return word.charAt(0).toUpperCase() + word.slice(1)
}

export function useUpdateEffect(effect, dependencies = []) {
    const isInitialMount = useRef(true)

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false
        } else {
            return effect()
        }
    }, dependencies)
}

export const debounce = (func, delay) => {
    let timeoutId

    return (...args) => {
        clearTimeout(timeoutId)

        timeoutId = setTimeout(() => {
            func.apply(this, args)
        }, delay)
    }
}
