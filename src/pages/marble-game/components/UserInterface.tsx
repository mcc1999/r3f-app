import { useKeyboardControls } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { addEffect } from "@react-three/fiber";
import styles from "../index.module.scss";
import useR3fStore from "@/stores";
import { GamePhase } from "@/stores/marbleGameSlice";

export default function UserInterface() {
  const phase = useR3fStore((state) => state.phase);
  const restart = useR3fStore((state) => state.restart);

  const forward = useKeyboardControls((state) => state.forward);
  const backward = useKeyboardControls((state) => state.backward);
  const leftward = useKeyboardControls((state) => state.leftward);
  const rightward = useKeyboardControls((state) => state.rightward);
  const jump = useKeyboardControls((state) => state.jump);

  const time = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const unsubscribeEffect = addEffect(() => {
      const state = useR3fStore.getState();

      let elapsedTime: number | string = 0;

      if (state.phase === GamePhase.PLAYING) {
        elapsedTime = Date.now() - state.startTime;
      } else if (state.phase === GamePhase.ENDED) {
        elapsedTime = state.endTime - state.startTime;
      }

      elapsedTime /= 1000;
      elapsedTime = elapsedTime.toFixed(2);

      if (time.current) time.current.textContent =  String(elapsedTime);
    });

    return () => {
      unsubscribeEffect();
    };
  }, []);

  return (
    <div className={styles.userInterface}>
      {/* Time */}
      {phase !== GamePhase.READY && (
        <div className="time">
          Time: <span ref={time}>0.00</span>s
        </div>
      )}

      {/* Restart */}
      {phase === GamePhase.ENDED && (
        <div className="restart" onClick={restart}>
          Restart
        </div>
      )}

      {/* Controls */}
      <div className="controls">
        <div className="raw">
          <div className={`key ${forward ? "active" : ""}`}>W/↑</div>
        </div>
        <div className="raw">
          <div className={`key ${leftward ? "active" : ""}`}>A/←</div>
          <div className={`key ${backward ? "active" : ""}`}>S/↓</div>
          <div className={`key ${rightward ? "active" : ""}`}>D/→</div>
        </div>
        <div className="raw">
          <div className={`key large ${jump ? "active" : ""}`}>SPACE</div>
        </div>
      </div>
    </div>
  );
}
