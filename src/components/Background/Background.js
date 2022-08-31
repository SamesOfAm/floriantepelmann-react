import React, { useEffect, useState } from 'react';
import styles from './Background.module.scss';
import Logo from "../Logo/Logo";
const contentful = require('contentful');

const Background = () => {
    const [backgroundImage, setBackgroundImage] = useState();

    useEffect(() => {


        let generalSettings;

        const client = contentful.createClient({
            space: '9p7h1pxdlx52',
            accessToken: 'CjkrfV7MjMe4BjDG9PPKdRSMbYR6yAtLsb1Be1G8pKg',
        });

        client.getEntries().then(entries => {
            entries.items.forEach(entry => {
                if (entry.sys.contentType.sys.id === "general") {
                    generalSettings = entry;
                }
            });
        })
            .then(() => {
                setBackgroundImage(generalSettings.fields.homepageBackgroundImage.fields.file.url);
            });
    }, []);


    return (
        <>
            <div className={styles.Background}>
                <img src={backgroundImage}/>
                <Logo/>
            </div>
            <div className={styles.Noise}> </div>
        </>
    );
}

export default Background;
