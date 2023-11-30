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

  // useEffect(() => {
  //   if (name) {
  //     fetch(`/api/${name}`) // Update with your Flask server URL
  //         .then((response) => response.text())
  //         .then((data) => {
  //           console.log('data:', data);
  //         })
  //         .catch((error) => console.error('Error fetching data: ', error));
  //   }
  // }, [name]);

  return (
    <>
      <p>I wasn't able to find the '{name}' page, sorry</p>
      <p><Link to='/' className={styles.link}> Go back home</Link></p>
    </>
  );
}
