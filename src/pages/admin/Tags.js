import React from 'react';
import { Helmet } from 'react-helmet-async';

function Tags() {
    return (
        <>
            <Helmet>
                <title> Tags - Words | Lavie </title>
            </Helmet>
            <section>
                <div className="centered text-4xl h-screen">This is Tags Page</div>
            </section>
        </>
    );
}

export default Tags;