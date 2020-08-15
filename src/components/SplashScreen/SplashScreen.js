import React from 'react';
import cx from './SplashScreen.module.css'


// Inspired by https://codepen.io/riktar/pen/EyQZmb created by Riccardo Tartaglia
// TODO: Fix for mobile view

const SplashScreen = () => {
    return (
        <div className={cx.Welcome}>
            <img className={cx.Grizzly} src='https://i.ibb.co/Wn196wz/volk-belyi-morda-vzgliad-chiornyi-fon-portret.png' alt={'wolf photo'} />
                <div className={cx.Claim}>
                    <h1>Welcome to</h1>
                    <h2>WOLFPACK</h2>
                </div>
        </div>
    );
};

export default SplashScreen;
