import { LoginForm } from "@/components/login-form"
import styled from "styled-components";

const Container = styled.div`
        position: absolute;
        height: 100%;
        width: 100%;
        z-index: -1;
        filter: blur(180px);
        left: 0px;
        opacity: 0.2;
        background: conic-gradient( from 180deg at 50% 50%, #0aefff -69.37deg, #0f83ff 31.88deg, #b056e7 120deg, #ff9966 204.37deg, #0aefff 290.63deg, #0f83ff 391.87deg ), #a84ddf;
    
`

const Blueprint = styled.div`
    position: absolute;
    mask-image: radial-gradient(100% 100% at top, white 80%, transparent 95%);
    width: 100%;
    height: 100%;
    z-index: -1;
    filter: grayscale(100%) opacity(5%);
    background-image: linear-gradient(rgba(22,109,188,0.8) 3px, transparent 0), linear-gradient(90deg, rgba(22,109,188,0.8) 3px, transparent 0), linear-gradient(rgba(26,98,176,0.6) 2px, transparent 0), linear-gradient(90deg, rgba(26,98,176,0.6) 2px, transparent 0), linear-gradient(rgba(0,94,170,0.3) 1px, transparent 0), linear-gradient(90deg, rgba(0,94,170,0.3) 1px, transparent 0);
    background-size: 128px 128px, 128px 128px, 32px 32px, 32px 32px, 16px 16px, 16px 16px;
`
export const Index = ({returnUrl}) => {
    return (
        <div>
            <Container/>
            <Blueprint/>
            <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
                <div className="w-full max-w-sm md:max-w-3xl">
                    <LoginForm returnUrl={returnUrl} />
                </div>
            </div>
        </div>

    )
}
