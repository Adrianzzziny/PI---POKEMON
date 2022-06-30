import React from 'react';
import {Link} from 'react-router-dom';
import styles from '../LandingPage/LandingPage.module.css'

export default function LandinPage(){
    return (
        <div className={styles.background}>
            <br/>
            <Link to='/home'>
            <button className={styles.btn}>START</button>
            </Link>

        </div>
    )
}
