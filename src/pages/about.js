import React from 'react';
import Layout from '../components/Layout';

export default function about() {
    return (
        <Layout>
            <section style={{lineHeight: '1.85em'}}>
                <p style={{display: 'inline-block'}}>
                    Hello, this is my blog, welcome to visit. I am currently a graduate student in computer science. I will share my study and work experience here, and occasionally talk about my daily life and share my mood in life.
                </p>
                <p>
                    My postgraduate major is the formal verification of neural networks. And I have implemented a simple <a href="https://github.com/LLwyct/FFNN-Verify" target="blank" rel="noreferrer" style={{textDecoration: 'underline'}}>neural network verification tool</a> on my github using an optimization algorithm based on MILP. I want to work in front-end development in the future, because I think front-end development is a very interesting thing. You can quickly see the pages you make, and you can add your aesthetics and show your thoughts to others.
                </p>
            </section>
        </Layout>
    )
}
