import React, { Component } from 'react';
import './CommonCSS.css';
export class AboutUs extends Component {
    static displayName = AboutUs.name;

    render() {
        return (
            <div>
                <h1>TatvaSoft</h1>
                <h2>Sclupting thoughts...</h2>
                <p>TatvaSoft is a CMMi Level 3 and Microsoft Gold Certified Software Development company that offers custom software development services on diverse technology platforms, like Microsoft, Java, PHP, Open Source, BI, and Mobile.</p>
                <p>With rich and varied experience of 18+ years in software development and stringent quality standards, we offer utmost qualitative, on-time and cost-effective software solutions. We serve clientele across the industries and globe with Offices in US, Canada, UK, Australia and Development Center in India with a workforce of 810+ IT professionals.</p>
                <p>We specializes in solving complex business challenges using thought process and information technology, and so far we have successfully completed 1800+ projects with 700+ SMEs and Fortune 500 companies.</p>
            </div>
        );
    }
}
