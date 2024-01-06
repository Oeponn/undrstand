import React from 'react';
import {Link} from 'react-router-dom';
// import Card from 'components/wrappers/Card';
import styles from './styles.module.scss';
import {useParams} from 'react-router-dom';

interface PageNotFoundParams {
  name: string,
}

export default function PageNotFound() {
  const {name} = useParams<PageNotFoundParams>();

  return (
    <div className={styles.container}>
      <p>I wasn't able to find the '{name}' page, sorry</p>
      <p><Link to='/' className={styles.link}> Go back home</Link></p>
    </div>
  );
}
