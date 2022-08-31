import React from 'react';
import Work from "./Work/Work";
import styles from "./Works.module.scss";

const Works = (props) => {

    return(
        <div className={styles.Works + " Works"}>
            {props.works.map(
                work => <Work
                    key={work.sys.id}
                    name={work.fields.name}
                    year={work.fields.year}
                    place={work.fields.place}
                    type={work.fields.type}
                    client={work.fields.client}
                    technologies={work.fields.technologies}
                    shortDescription={work.fields.shortDescription}
                    longDescription={work.fields.longDescription}
                />
            )}
        </div>
    )
}

export default Works;
