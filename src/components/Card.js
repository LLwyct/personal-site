import React from 'react';
import {Link} from 'gatsby';
import {css} from '@emotion/react';
import styled from '@emotion/styled';
import Pill from './Pill';

export default function Card(props) {
    const cardstyle = css`
        transition: all 0.35s ease;
        padding: 0.4em 1.5em;
        border-radius: 10px;
        &:hover {
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
    const labels = props.labelstr.split('&');
    console.log(encodeURIComponent(props.title));
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
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur,
          natus perferendis! Harum, molestias iusto! Similique.
        </p>
        <p css={date}>{props.date}</p>
      </div>
    );
}
