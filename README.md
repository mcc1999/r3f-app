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

