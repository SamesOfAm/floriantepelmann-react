import React, { useRef } from 'react';
import styles from './Card.module.scss';
import { gsap } from 'gsap';

const Card = (props) => {
    const cursor = document.querySelector('.cursor');


    const onEnter = () => {
        const offsetTop = videoSlot.current.getBoundingClientRect().top;
        const offsetLeft = videoSlot.current.getBoundingClientRect().left;
        gsap.to(cursor, {
            // position: 'absolute',
            borderRadius: '0',
            // top: offsetTop + window.scrollY,
            // left: offsetLeft,
            // transform: 'none',
            transform: 'translate3d(' + offsetLeft + 'px, ' + offsetTop + 'px, 0px)',
            width: '50vw',
            height: '30vw'
        })
    }

    const onLeave = () => {
        gsap.to(cursor, {
            // position: 'fixed',
            borderRadius: '50%',
            width: '20vw',
            height: '20vw',
            // top: '0',
            // left: '0'
        })
    }

    const onMove = () => {
    }

    const videoSlot = useRef(null);

    return(
      <div className={styles.wrapper}>
        <div onMouseEnter={onEnter} onMouseLeave={onLeave} onMouseMove={onMove} className={styles.Card + " card hover-effect"}>{props.children}</div>
        <div className={styles.videoSlot + " videoSlot"} ref={videoSlot}></div>
      </div>
    )
}

export default Card;
