# R3F Knowledge

## Environment And Staging
### BackgroundColor
- With Css：r3f Canvas背景是透明的，可以给Container加背景色
- WebGLRenderer.setClearColor( ) / scene.background
  ```tsx
  <Canvas
    onCreated={({ gl, scene }) => {
      gl.setClearColor('#ff0000', 1)
      // scene.background = new THREE.Color(0xff0000)
    }}
    //...
  >
  {/** ... */}
  </Canvas>
  ```
- Create `<color>` in `<Canvas>`，then set the `attach` property to `background`
  ```tsx
  <Canvas>
    <color args={[ '#ff0000' ]} attach="background" />
    {/** ... */}
  </Canvas>
  ```

### Shadows
- **Basic Shadows**
- **Baking Shadows**(by shadowMap): Use `<BakeShadows />` from `drei`
- **Soften Shadow**: Use `<SoftShadows />` from `drei`
- **Accumulative Shadows**: 
  - This will receive multiple shadow renderers, 
  - Only can be rendered on a `Plane`
  - 和`receiveShadow`生成的普通shadow不是一个，需要从`<mesh/>`上删除receiveShadow属性
  - Use `<AccumulativeShadows />` from `drei`
- **Contact Shadows**
  - 不依赖threeJs系统的shadow，移除`Canvas`的`shadows`属性
  - Only can be rendered on a `Plane`

## Load Model
### useLoader
```tsx
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

// 没被压缩的模型
const model = useLoader(GLTFLoader, '/path-to-model')

// 被压缩的模型
const model = useLoader(GLTFLoader, '/path-to-draco-model', (loader) => {
  const dracoLoader = new DRACOLoader()
  dracoLoader.setDecoderPath('/path-to-draco-file')
  // loader is GLTFLoader
  loader.setDRACOLoader(dracoLoader)
})

// ...

<primitive object={model.scene} />
```

### useGLTF && PreLoading
```tsx
import { useGLTF } from '@react-three/drei'

const Model = () => {
  // same for draco models
  const model = useGLTF('/path-to-model')
  
  return (
    // ...
    <primitive object={model.scene} />
  )
}

// 提前加载preLoading
useGLTF.preload('/path-to-model')
```

### Lazy Loading
- 把模型抽象成单独组件
- 在引用模型时使用`<Suspense>`嵌套模型组件
- 设置`Suspense`的fallback属性设置loading时展示的内容

```tsx
import Model from './path-to-model-component'

// ... 

<Suspense
  fallback={"Loading Model"} // Or some other mesh / 统一的Placeholder组件
>
  <Model />
</Suspense>
```

### Copy Model
- Use `Clone` helper from `@react-three/drei`
- replace `<primitive />` with `<Clone />`
```tsx
import { Clone } from '@react-three/drei'

// ...

<Clone object={model.scene} />
```

### GLTFJSX
[🔗Drag the model file to the website, then you will get the jsx component](https://gltf.pmnd.rs)

### Animations in Model
- Use `useAnimations` from `@react-three/drei`
- `useAnimations` will convert the `animation clips` to `action`, and return them
```tsx
import { useAnimations } from '@react-three/drei'
import { useControl } from 'leva'

const Model = () => {
  // same for draco models
  const model = useGLTF('/path-to-model')
  
  const { actions, mixer, clips, names ...other } = useAnimations(model.animations, model.scene)
  
  // 动作间流传切换
  actions.Walk.play()

  setTimeOut(() => {
    actions.Run.play()
    // parameters: action from && time to switch
    actions.Run.crossFadeFrom(actions.Walk, 1) 
  }, 5000)


  // Leva 控制动作间切换
  const animationName = useControl({
    animationName: { options: names }
  })
  useEffect(() => {
    const action = actions[animationName]
    action.reset().fadeIn(0.5).play()

    return () => {
      action.fadeOut(0.5)
    }
  }, [animationName])
  
}

// 提前加载preLoading
useGLTF.preload('/path-to-model')
```