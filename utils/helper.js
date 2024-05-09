import { useRef, useEffect } from 'react'

export const capitalize = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1)
}
