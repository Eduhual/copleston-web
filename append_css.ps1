$css = @"

/* --- Soft Paywall (Muro de Cristal) Premium --- */
.article-content-wrapper {
    position: relative;
    overflow: hidden;
}
.content-locked {
    filter: blur(8px);
    user-select: none;
    pointer-events: none;
    opacity: 0.35;
    transition: filter 0.8s ease, opacity 0.8s ease;
}
.paywall-overlay {
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translateX(-50%);
    width: 90%;
    max-width: 550px;
    text-align: center;
    padding: 3.5rem 3rem;
    border-radius: 16px;
    z-index: 10;
    box-shadow: 0 30px 60px rgba(0,0,0,0.6);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    background: rgba(4, 6, 12, 0.9);
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
    border: 1px solid rgba(197, 160, 89, 0.3);
    transition: opacity 0.8s ease;
}
.paywall-icon {
    width: 48px;
    height: 48px;
    opacity: 0.9;
    animation: goldPulse 3s infinite;
}
@keyframes goldPulse {
    0% { transform: scale(1); filter: drop-shadow(0 0 5px rgba(197,160,89,0.2)); }
    50% { transform: scale(1.05); filter: drop-shadow(0 0 15px rgba(197,160,89,0.6)); }
    100% { transform: scale(1); filter: drop-shadow(0 0 5px rgba(197,160,89,0.2)); }
}
"@
Add-Content ".\style.css" $css -Encoding UTF8
