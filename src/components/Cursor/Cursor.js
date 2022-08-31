import { gsap } from 'gsap';
import { lerp, getMousePos } from "../Utilities/Utilities";
let mouse = { x: 0, y: 0 };

window.addEventListener("mousemove", (ev) => (mouse = getMousePos(ev)));

export default class Cursor {
    constructor(el) {
        this.Cursor = el;
        this.Cursor.style.opacity = 0;
        this.Item = document.querySelectorAll('.card');
        this.Videos = document.querySelectorAll('.cursor-media video');
        this.cursorConfigs = {
            x: { previous: 0, current: 0, amt: 0.09 },
            y: { previous: 0, current: 0, amt: 0.09 }
        };
        this.onMouseMoveEv = () => {
            this.cursorConfigs.x.previous = this.cursorConfigs.x.current = mouse.x;
            this.cursorConfigs.y.previous = this.cursorConfigs.y.current = mouse.y;
            gsap.to(this.Cursor, {
                duration: 1,
                ease: "Power3.easeOut",
                opacity: 1
            });

            this.onScaleMouse();

            requestAnimationFrame(() => this.render());
            window.removeEventListener("mousemove", this.onMouseMoveEv);
        }
        window.addEventListener("mousemove", this.onMouseMoveEv);
    }

    onScaleMouse() {
        this.Item.forEach((link) => {
            console.log('Scaling');
            console.log(link.matches(":hover"));
            if(link.matches(":hover")) {
                this.scaleAnimation(this.Cursor, 0.8);
            }
            link.addEventListener("mouseenter", () => {
                this.scaleAnimation(this.Cursor, 0.1);
            });
            link.addEventListener("mouseleave", () => {
                this.scaleAnimation(this.Cursor, 0);
            });
            link.children[1].addEventListener("mouseenter", () => {
                this.scaleAnimation(this.Cursor, 1.2);
            });
            link.children[1].addEventListener("mouseleave", () => {
                this.scaleAnimation(this.Cursor, 0.8);
            });
        });
    }

    scaleAnimation(el, amt) {
        gsap.to(el, {
            duration: 0.6,
            scale: amt,
            ease: "Power3.easeOut"
        })
    }

    render() {
        this.cursorConfigs.x.current = mouse.x;
        this.cursorConfigs.y.current = mouse.y;
        for (const coordinate in this.cursorConfigs) {
            this.cursorConfigs[coordinate].previous = lerp(
                this.cursorConfigs[coordinate].previous,
                this.cursorConfigs[coordinate].current,
                this.cursorConfigs[coordinate].amt
            );
        }
        const hoveredElements = document.querySelectorAll(':hover');
        let highestHoveredElement = document.body;
        if(hoveredElements.length >= 1) {
            highestHoveredElement = hoveredElements[hoveredElements.length-1];
        }
        if(!highestHoveredElement.classList.contains('hover-effect')) {
            // this.Cursor.style.transform = `translate3d(${this.cursorConfigs.x.previous}px, ${this.cursorConfigs.y.previous}px, 1px)`;
            gsap.to(this.Cursor, {
                transform: 'translate3d(' + this.cursorConfigs.x.previous + 'px, ' + this.cursorConfigs.y.previous + 'px, 0px)'
            })
        }


        requestAnimationFrame(() => this.render());
    }
}
