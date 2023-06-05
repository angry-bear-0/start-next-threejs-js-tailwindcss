import { EventManager, ReactThreeFiber, useFrame, useThree } from '@react-three/fiber'
import { useMemo, useEffect, forwardRef } from 'react';
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib'

export const OrbitControls = forwardRef(
  ({
    makeDefault,
    camera,
    regress,
    domElement,
    enableDamping = true,
    keyEvents = false,
    onChange,
    onStart,
    onEnd,
    ...restProps
  }, ref) => {

    const invalidate = useThree((state) => state.invalidate)
    const defaultCamera = useThree((state) => state.camera)
    const gl = useThree((state) => state.gl);
    const events = useThree((state) => state.events);
    const setEvents = useThree((state) => state.setEvents)
    const set = useThree((state) => state.set)
    const get = useThree((state) => state.get)
    const performance = useThree((state) => state.performance)
    const explCamera = (camera || defaultCamera);
    const explDomElement = (domElement || events.connected || gl.domElement)
    const controls = useMemo(() => new OrbitControlsImpl(explCamera), [explCamera])

    useFrame(() => {
      if (controls.enabled) controls.update()
    }, -1)

    useEffect(() => {
      if (keyEvents) {
        controls.connect(keyEvents === true ? explDomElement : keyEvents)
      }

      controls.connect(explDomElement)
      return () => void controls.dispose()
    }, [keyEvents, explDomElement, regress, controls, invalidate])

    useEffect(() => {
      const callback = (e) => {
        invalidate()
        if (regress) performance.regress()
        if (onChange) onChange(e)
      }

      const onStartCb = (e) => {
        if (onStart) onStart(e)
      }

      const onEndCb = (e) => {
        if (onEnd) onEnd(e)
      }

      controls.addEventListener('change', callback)
      controls.addEventListener('start', onStartCb)
      controls.addEventListener('end', onEndCb)

      return () => {
        controls.removeEventListener('start', onStartCb)
        controls.removeEventListener('end', onEndCb)
        controls.removeEventListener('change', callback)
      }
    }, [onChange, onStart, onEnd, controls, invalidate, setEvents])

    useEffect(() => {
      if (makeDefault) {
        const old = get().controls
        set({ controls })
        return () => set({ controls })
      }
    }, [makeDefault, controls])

    return <primitive ref={ref} object={controls} enableDamping={enableDamping} {...restProps} />
  }
)
