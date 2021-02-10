/* eslint-disable */
import React from 'react';
import styles from './IndividualMessage.css';


/*------------------------------------------------------*/
const IndividualMessage = (props) => {
  // console.log('props in conversation', props)
  return (
    <div>
      <span className={styles.message}>
        {props.message.sender}: {props.message.text}
      </span>
      <span className={styles.time}>
        {new Date(props.message.timestamp).toISOString()}
      </span>

    </div>
  );
};

export default IndividualMessage;