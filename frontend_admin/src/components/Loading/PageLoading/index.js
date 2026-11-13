import React from 'react';
import css from './css.less';

export default (props) => 
{
    return(
        <div className={css.loading}>
            <div className={css.block}>
                <div className={css.logo}>
                    <div className={css.skcircle}>
                        <div></div><div></div><div></div><div></div><div></div>
                        <div></div><div></div><div></div><div></div><div></div>
                        <div></div><div></div>
                    </div>
                </div>
            </div>
        </div>
    )
}