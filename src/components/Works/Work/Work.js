import React, { useState, useEffect } from 'react';
import styles from './Work.module.scss';
import Card from '../../UI/Card/Card';
import { gsap } from 'gsap';

const Work = (props) => {

    return (
        <div className={styles.Work}>
            <Card>
                <h2 className="hover-effect">{props.name}</h2>
                <div className={styles.GeneralInfo + " hover-effect"}>
                    <div className="hover-effect">{props.year}</div>
                    <div className="hover-effect">{props.client}</div>
                    <div className="hover-effect">{props.place}</div>
                </div>
                <div className={styles.Specs + " hover-effect"}>
                    <div className="hover-effect">{props.type}</div>
                    <div className="hover-effect">{props.technologies.map(technology => <span>{technology}</span>)}</div>
                </div>
            </Card>
        </div>
    )
}

export default Work;
