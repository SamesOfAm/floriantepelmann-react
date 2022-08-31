import React from 'react';
import styles from './Logo.module.scss';

const Logo = () => {
    return(
        <div className={styles.Logo}>
            <h1><span className={styles.h1FirstName}>Florian</span><span className={styles.h1LastName}>Tepelmann</span></h1>
            <span className={styles.occupation}>Web Development&Design</span>
        </div>
    );
}

export default Logo;
