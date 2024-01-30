import { useMediaQuery } from "@uidotdev/usehooks";
import classNames from "classnames";

function PetalFalling() {
    const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");
    const petalPlayers = [];
    function animatePetals() {
        const petals = document.querySelectorAll('.petal');
        if (!petals[0]?.animate) {
            const petalsContainer = document.getElementById('petals-container');
            petalsContainer?.prepend("Uh oh, it seems like your browser doesn't support Web Animations API yet. Have you tried this in Firefox or Chrome?");
            return false;
        }
        for (let i = 0, len = petals.length; i < len; ++i) {
            const petal = petals[i];
            petal.innerHTML = '<div class="rotate"><img src="/images/hoamai.png" class="askew"></div>';
            const scale = Math.random() * .8 + .2;
            const player = petal.animate([
                { transform: 'translate3d(' + (i / len * 100) + 'vw,0,0) scale(' + scale + ')', opacity: scale },
                { transform: 'translate3d(' + (i / len * 100 + 10) + 'vw,150vh,0) scale(' + scale + ')', opacity: 1 }
            ], {
                duration: Math.random() * 60000 + 3000,
                iterations: Infinity,
                delay: -(Math.random() * 5000)
            });
            petalPlayers.push(player);
        }
    }
    animatePetals();
    const petalsClass = classNames("w-screen", isSmallDevice ? "hidden" : "")
    return (
        <div id="petals-container" className={petalsClass}>
            {[...Array(20)].map(() => <div className="petal"></div>)}
        </div>
    )
}

export default PetalFalling