import React from 'react';
import cx from './WelcomeText.module.css';

const WelcomeText = () => {
    return (
        <div className={cx.TextBackground}>
            <div className={cx.VerticalAlignText}>
                <h1 className={cx.HeaderText}>Woof, we are the Wolfpack. </h1>
                <p className={cx.ParagraphText}> We love <span className={cx.Span}></span></p>
            </div>
        </div>
    );
};

export default WelcomeText;
