import React from 'react'
import Layout from '../components/Layout';

export default function Notfound() {
    return (
        <Layout>
            <div style={{textAlign: 'center'}}>
                The Page doesn't exist <span role="img" aria-label="sad">😢</span>
            </div>
        </Layout>
    )
}
