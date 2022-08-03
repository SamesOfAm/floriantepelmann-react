import './App.css';
import React, { useEffect } from 'react';
import Background from "./componentes/Background/Background";

const contentful = require('contentful');

function App() {
  useEffect(() => {
    /* console.log("////////////////////////////////////////////");
    console.groupCollapsed('I dare you to enter...');
    console.log('%cWelcome to my site! Feel free to inspect the code. ', 'color: #FFD5E5');
    console.log('%cPlease also see my github:', 'color: #FFD5E5');
    console.log('%chttps://www.github.com/floriantepelmann', 'color: #9E7FFF');
    console.groupEnd();
    console.log("////////////////////////////////////////////"); */


    let backgroundImage;
    const allProjects = [];
    let generalSettings;

    const client = contentful.createClient({
      space: '9p7h1pxdlx52',
      accessToken: 'CjkrfV7MjMe4BjDG9PPKdRSMbYR6yAtLsb1Be1G8pKg',
    });

    client.getEntries().then(entries => {
      // log the title for all the entries that have it
      entries.items.forEach(entry => {
        if(entry.sys.contentType.sys.id === "project") {
          allProjects.push(entry);
        }
        if(entry.sys.contentType.sys.id === "general") {
          generalSettings = entry;
        }
      });
    })
        .then(() =>  {
          backgroundImage = generalSettings.fields.homepageBackgroundImage.fields.file.url;
        });
  }, []);


  return (
    <div className="background">
      <Background />
      <h1><span className="h1FirstName">Florian</span><span className="h1LastName">Tepelmann</span></h1>
    </div>
  );
}

export default App;
