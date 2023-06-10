import { BlendFunction, Effect } from "postprocessing";
import { Uniform, WebGLRenderer, WebGLRenderTarget } from "three";

const fragmentShader = /* glsl */`
  uniform float frequency;
  uniform float amplitude;
  uniform float offset;

  void mainUv(inout vec2 uv) {
    uv.y += sin(uv.x * frequency + offset) * amplitude;
  }

  void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    outputColor = vec4(0.8, 1.0, 0.5, inputColor.a);
  }
`

export interface DunkProps {
  blendFunction?: BlendFunction;
  frequency?: number;
  amplitude?: number;
  offset?: number;
}

export default class DrunkEffect extends Effect {
  constructor({frequency = 0, amplitude = 0, offset = 0, blendFunction = BlendFunction.DARKEN}: DunkProps) {
    super(
      'DrunkEffect', 
      fragmentShader, 
      {
        blendFunction,
        uniforms: new Map([
          ['frequency', new Uniform(frequency)],
          ['amplitude', new Uniform(amplitude)],
          ['offset', new Uniform(offset)],
        ])
      }
    )
  }
  update(renderer: WebGLRenderer, inputBuffer: WebGLRenderTarget, deltaTime: number){    
    this.uniforms.get('offset')!.value += deltaTime
  }
}