import TrackVisibility from "react-on-screen";
import { motion } from "framer-motion";

export default function MotionAnimation({ children, xSlide, ySlide }) {
  const cardVariants = {
    offscreen: { [xSlide ? "x" : "y"]: xSlide ? xSlide : ySlide },
    onscreen: {
      [xSlide ? "x" : "y"]: 0,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 2,
      },
    },
  };
  return (
    <TrackVisibility>
      {({ isVisible }) => {
        return (
          isVisible && (
            <motion.div initial="offscreen" whileInView="onscreen">
              <motion.div variants={cardVariants}>{children}</motion.div>
            </motion.div>
          )
        );
      }}
    </TrackVisibility>
  );
}
