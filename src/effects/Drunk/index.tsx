import { forwardRef } from "react";
import DrunkEffect, { DunkProps } from "./DrunkEffect";

export default forwardRef(function Drunk(props: DunkProps, ref) {
  const dunkEffect = new DrunkEffect(props)

  return <primitive ref={ref} object={dunkEffect} />
})
