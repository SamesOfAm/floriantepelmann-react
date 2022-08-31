import './App.scss';
import React, { useEffect, useState, useRef } from 'react';
import Cursor from "./components/Cursor/Cursor";
import Background from "./components/Background/Background";
import Curtain from "./components/Curtain/Curtain";
import Works from "./components/Works/Works";
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';


const contentful = require('contentful');

function App() {
  const [allProjects, setAllProjects] = useState([]);
  const [toggle, setToggle] = useState(false);
  const cursorText = useRef();
  const tl = useRef();

    const lenis = new Lenis({
        lerp: 0.1,
        smooth: true,
    });
    const scrollFn = () => {
        lenis.raf();
        requestAnimationFrame(scrollFn);
    };
    requestAnimationFrame(scrollFn);

  const toggleTimeline = () => {
    setToggle(!toggle);
  };

  gsap.registerEffect({
    name: "swapText",
    effect: (targets, config) => {
      let tl = gsap.timeline({delay: config.delay});
      tl.to(targets, {opacity: 0, duration: config.duration / 2});
      tl.add(() => targets[0].innerText = config.text);
      tl.to(targets, {opacity: 1, duration: config.duration});
      return tl;
    },
    defaults: {duration: 1},
    extendTimeline: true
  });


    useEffect(() => {
      tl.current = gsap.timeline()
        .to(cursorText,{duration: 0.5, x:100})
        .to(cursorText,{duration: 0.5, y: 100})
        .to(cursorText,{duration: 1, rotation: 360})
        .reverse();
    }, [cursorText]);



  useEffect(() => {
      /* console.log("////////////////////////////////////////////");
      console.groupCollapsed('I dare you to enter...');
      console.log('%cWelcome to my site! Feel free to inspect the code. ', 'color: #FFD5E5');
      console.log('%cPlease also see my github:', 'color: #FFD5E5');
      console.log('%chttps://www.github.com/floriantepelmann', 'color: #9E7FFF');
      console.groupEnd();
      console.log("////////////////////////////////////////////"); */

  let allProjects = [];
    const cursor = new Cursor(document.querySelector('.cursor'));
    let generalSettings;

    const client = contentful.createClient({
      space: '9p7h1pxdlx52',
      accessToken: 'CjkrfV7MjMe4BjDG9PPKdRSMbYR6yAtLsb1Be1G8pKg',
    });

    client.getEntries().then(entries => {
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
          setAllProjects(allProjects);
        });

  }, []);


  return (
      <>
          <React.StrictMode>
              <Curtain/>
              <div className="background">
                  <Background />
              </div>
              <Works works={allProjects}/>
              <div className="cursor" ref={cursorText}></div>
          </React.StrictMode>
      </>
  );
}

export default App;
