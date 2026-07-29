import { useEffect, useState } from 'react'

const KONAMI = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
]

export function useKonami(onUnlock?: () => void) {
  const [unlocked, setUnlocked] = useState(() => {
    return sessionStorage.getItem('dev-mode') === '1'
  })

  useEffect(() => {
    let index = 0

    const onKeyDown = (event: KeyboardEvent) => {
      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key
      const expected = KONAMI[index]
      const expectedNorm = expected.length === 1 ? expected.toLowerCase() : expected

      if (key === expectedNorm) {
        index += 1
        if (index === KONAMI.length) {
          sessionStorage.setItem('dev-mode', '1')
          setUnlocked(true)
          onUnlock?.()
          index = 0
        }
      } else {
        index = key === (KONAMI[0].length === 1 ? KONAMI[0].toLowerCase() : KONAMI[0]) ? 1 : 0
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onUnlock])

  return unlocked
}
