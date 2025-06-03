import {QRCodeSVG} from 'qrcode.react';

import React, { useEffect, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling';

export const QrCode = ({url}) => {
    const ref = useRef(null);
    const qrCodeRef = useRef(null);

    useEffect(() => {
        if (!qrCodeRef.current) {
            qrCodeRef.current = new QRCodeStyling({
                width: 100,
                height: 100,
                data: `${url}`,
                margin: 0,
                qrOptions: {
                    typeNumber: 0,
                    mode: 'Byte',
                    errorCorrectionLevel: 'Q',
                },
                // image: "10cc19bd484118dbcd0a7886a38ceddc.png",
                imageOptions: {
                    crossOrigin: "anonymous",
                    saveAsBlob: true,
                    hideBackgroundDots: true,
                    imageSize: 0.4,
                    margin: 0,
                },
                dotsOptions: {
                    type: "dots",
                    color: "#61afef",
                },
                backgroundOptions: {
                    color: "transparent",
                },
                cornersSquareOptions: {
                    type: "extra-rounded",
                    color: "#61afef",
                },
                cornersDotOptions: {
                    type: "dot",
                    color: "#61afef",
                }
            });
        }

        if (ref.current) {
            qrCodeRef.current.append(ref.current);
        }
    }, []);

    return <div ref={ref} />;
};


/*
export const QrCode2 = ({url}) => {

      return (
        <QRCodeSVG size={80} value={url}/>
    );
}*/
