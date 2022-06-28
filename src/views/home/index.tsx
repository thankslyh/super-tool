
import classes from './index.module.css'

export default function Home() {
    return (
        <div className={classes.home}>
            <div className={classes['home-content']}>
                <h1 className={classes['home-content-title']}>thankslyh的blog</h1>
                <h4 className={classes['home-content-subtitle']}>前端开发工程师</h4>
                <div>
                    <button className={classes['home-btn']}>查看blog</button>
                </div>
            </div>
        </div>
    )
}
