import {AnimatePresence, motion} from "motion/react";
import * as React from "react";

export const Deck = ({items, active}) => {

    const [selected, setSelected] = React.useState(active);

    const randomRotateY = () => {
        return Math.floor(Math.random() * 21) - 10;
    };

    const isActive = (index: number) => {
        return index === selected;
    };

    return (
        <div className="relative h-full w-full">
            <AnimatePresence>
                {items.map((item, index) => (
                    <motion.div
                       // onClick={() => setSelected((selected+1) % items.length)}
                        key={index}
                        initial={{
                            opacity: 0,
                            scale: 0.9,
                            z: -100,
                            rotate: randomRotateY(),
                        }}
                        animate={{
                            opacity: isActive(index) ? 1 : 0.7,
                            scale: isActive(index) ? 1 : 0.95,
                            z: isActive(index) ? 0 : -100,
                            rotate: isActive(index) ? 0 : randomRotateY(),
                            zIndex: isActive(index)
                                ? 40
                                : items.length + 2 - index,
                            y: isActive(index) ? [0, -80, 0] : 0,
                        }}
                        exit={{
                            opacity: 0,
                            scale: 0.9,
                            z: 100,
                            rotate: randomRotateY(),
                        }}
                        transition={{
                            duration: 0.4,
                            ease: "easeInOut",
                        }}
                        className="absolute inset-0 origin-bottom"
                    >
                        {item.content}
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    )
}