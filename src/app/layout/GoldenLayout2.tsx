import * as React from "react";
import { Allotment } from "allotment";
import {useState} from "react";

export const VisibleWithAnimation = (args) => {
    const [rightVisible, setRightVisible] = useState(true);
    const [bottomVisible, setBottomVisible] = useState(true);

    return (
        <Allotment defaultSizes={[75, 25]} snap onVisibleChange={(_, v) => setRightVisible(v)}>
            {/* Left Side: Main + Bottom (Vertical stack) */}
            <Allotment.Pane>
                <Allotment vertical defaultSizes={[75, 25]} snap onVisibleChange={(_, v) => setBottomVisible(v)}>
                    {/* Main Editor Area */}
                    <Allotment.Pane>
                        <div className="w-full h-full bg-gray-900 text-white p-4">
                            Main editor area
                        </div>
                    </Allotment.Pane>

                    {/* Bottom Panel (e.g. terminal) */}
                    <Allotment.Pane visible={bottomVisible}>
                        <div className="w-full h-full bg-black text-white p-4">
                            Terminal / Console
                        </div>
                    </Allotment.Pane>
                </Allotment>
            </Allotment.Pane>

            {/* Right Pane */}
            <Allotment.Pane visible={rightVisible}>
                <div className="w-full h-full bg-zinc-800 text-white p-4">
                    Right sidebar or preview
                </div>
            </Allotment.Pane>
        </Allotment>
    );
}
