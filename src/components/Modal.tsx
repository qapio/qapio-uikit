import React from "react";
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalTrigger,
} from "@/components/ui/animated-modal.tsx";


export function AnimatedModal({triggerClass, triggerContent="Open", content, footerContent}) {
    return (
        <Modal>
            <ModalTrigger className={triggerClass}>
                {triggerContent}
            </ModalTrigger>
            <ModalBody>
                {content && <ModalContent>
                    {content}
                </ModalContent>}

                {footerContent && <ModalFooter className="gap-4 mt-4">
                    {footerContent}
                </ModalFooter>}
            </ModalBody>
        </Modal>
    );
}