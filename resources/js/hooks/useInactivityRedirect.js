import { useEffect, useRef, useCallback } from 'react'

export const useInactivityRedirect = () => {
  const timerRef = useRef(null)
  const sendBackUrl = new URLSearchParams(window.location.search).get('sendBack')

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      window.location.href = sendBackUrl
    }, 20000)
  }, [sendBackUrl])

  useEffect(() => {
    if (!sendBackUrl) return
    resetTimer()
    const events = ['mousedown', 'mousemove', 'touchstart', 'keydown', 'scroll']
    events.forEach((e) => document.addEventListener(e, resetTimer))
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      events.forEach((e) => document.removeEventListener(e, resetTimer))
    }
  }, [sendBackUrl, resetTimer])
}
