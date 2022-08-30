import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { setTimeline } from '../../store/general'
import { useSelector, useDispatch } from 'react-redux'
import SingleDay from './SingleDay'
import CalendarHeader from './CalendarHeader'

export default function Calendar() {
  const timeline = useSelector((state) => state.general.timeline)
  const dateRange = useSelector((state) => state.general.dateRange)
  const dispatch = useDispatch()
  useEffect(() => {
    axios.get('/api/schedules/timeline?range=' + dateRange.join(' to '))
      .then((res) => {
        dispatch(setTimeline(res.data))
      })
  }, [])

  const listTimeline = timeline.map((t) => <SingleDay key={t.date} day={t} />)
  return (
    <table id="schedulesTable" border="1" cellSpacing="0" cellPadding="3" className="w-full">
      <thead>
        <CalendarHeader />
      </thead>
      <tbody>
        { listTimeline }
      </tbody>
    </table>
  )
}
