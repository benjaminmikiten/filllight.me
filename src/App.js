import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { setLightness } from 'polished';

const StyledControl = styled(motion.div)`
  /* position: absolute; */
  /* top: 50%; */
  /* left: 50%; */
  /* transform: translate(-50%, -50%); */
  height: 40px;
  width: 40px;
  border-radius: 100%;
  background-color: black;
  cursor: grab;
  z-index: 999;
`;

const Panel = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  height: 100vh;
  min-height: 100vh;
  width: 100vw;
  min-width: 100vw;
  display: relative;
`;

const PanelBackground = styled(motion.div)`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right:  0;
`;

const App = () => {
  const WARM = '#FF6C00';
  const WHITE = '#FFFFFF';
  const COOL = '#B5CDFF';

  const panelRef = useRef();

  const xMv = useMotionValue(0);
  const yMv = useMotionValue(0);

  const panelHorizHalf = panelRef.current?.offsetWidth * .5;
  const panelVertHalf = panelRef.current?.offsetHeight * .5;

  const opacity = useTransform(yMv, [panelVertHalf * -1, 0, panelVertHalf], [0, 0.5, 1]);
  const warmth = useTransform(xMv, [panelHorizHalf * -1, 0, panelHorizHalf], [WARM, WHITE, COOL]);

  return (
    <div className="App" ref={panelRef}>
      <Panel>
        <PanelBackground style={{ background: warmth, opacity: opacity }} />
        <StyledControl
          style={{ x: xMv, y: yMv }}
          dragMomentum={false}
          drag
          dragConstraints={panelRef}
        />
      </Panel>
    </div>
  );
};

export default App;
