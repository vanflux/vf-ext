import styles from "./styles.module.css";
import React, { useEffect, useState } from "react";

export function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('[Page Script] Component mounted!');
    return () => console.log('[Page Script] Component unmounted!');
  }, []);

  return <div className={styles.container}>
    <div onClick={() => setCount(count+1)} className={styles.content}>
      HTML+CSS Injected (click me)<br/>
      {'yo '.repeat(count)}
    </div>
  </div>
}
