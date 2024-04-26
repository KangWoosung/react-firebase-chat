/*   2024-04-25 02:21:46



*/
"use client";
import { useEffect, useState } from "react";

type UseAnimationProps = {
  condition: boolean;
};

function useAnimation(condition: boolean): [boolean, () => void, boolean] {
  const [isComplete, setComplete] = useState<boolean>(false);

  useEffect(() => {
    if (condition) {
      setComplete(true);
    }
  }, [condition]);

  const shouldRender = condition || isComplete;
  const animationTrigger = condition && isComplete;

  const handleTransitionEnd = () => {
    if (!condition) setComplete(false);
  };

  return [shouldRender, handleTransitionEnd, animationTrigger];
}

export default useAnimation;
