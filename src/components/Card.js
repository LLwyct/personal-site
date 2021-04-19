import React from 'react';
import {Link} from 'gatsby';
import {css} from '@emotion/react';
import styled from '@emotion/styled';
import Pill from './Pill';

export default function Card(props) {
  console.log(props);
    const cardstyle = css`
        transition: all 0.35s ease;
        padding: 0.4em 1.5em;
        border-radius: 10px;
        &:hover {
          background-image: repeating-linear-gradient(-20deg, #e9defa 0%, #fbfcdbaa 100%);
          box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.25);
          transform: translateY(-10px);
        }
    `;
    const date = css`
        color: grey;
        font-size: 0.8em;
        margin: 0;
    `;
    const PillList = styled.div`
      div + div {
        margin-left: 15px;
      }
    `;
    console.log(props.labelstr);
    const labels = props.labelstr.split('&');
    return (
      <div css={cardstyle}>
        <h3 style={{ marginBottom: "12px" }}>
            
          <Link to={"/articles/" + encodeURIComponent(props.title)}>{props.title}</Link>
        </h3>
        <PillList>
          {labels.map((lb) => {
            return <Pill value={lb} key={lb} />;
          })}
        </PillList>
        <p>
          {props.excerpt}
        </p>
        <p css={date}>{props.date}</p>
      </div>
    );
}