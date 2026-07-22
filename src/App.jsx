import { useState } from 'react';
import Scene from './components/Scene';
import UIOverlay from './components/UIOverlay';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';

function App() {
  const [scrollTriggerRef, setScrollTriggerRef] = useState(null);

  return (
    <>
      <Preloader />
      <CustomCursor />
      <main className="relative w-full h-full">
        {/* Only pass scrollTriggerRef once it's set by UIOverlay */}
        <Scene scrollTriggerRef={scrollTriggerRef} />
        <UIOverlay setScrollTriggerRef={setScrollTriggerRef} />
      </main>
    </>
  );
}

export default App;
