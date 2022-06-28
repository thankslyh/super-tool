import { Outlet } from 'react-router-dom'

import Tabs from '@components/tabs'
import classes from './App.module.css'

export default function Home() {
  return (
      <div className={classes.app}>
          <Tabs/>
          <div className={classes['app-content']}>
              <Outlet/>
          </div>
      </div>
  )
}
