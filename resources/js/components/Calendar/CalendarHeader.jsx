import React from 'react'
import { useSelector } from 'react-redux'

export default function CalendarHeader() {
  const state = useSelector((state) => state.general)
  const shifts = Array.from(Array(state.shifts).keys())
  const occupations = state.activeOccupation !== null ? state.occupations.filter((o) => o.id === state.activeOccupation) : state.occupations.filter((o) => o.id !== null)
  const shiftName = ['I', 'M', 'II']
  const listShifts = occupations.map((o) => shifts.map((s, i) => <td key={i} className="border-l border-gray-400 py-3 font-semibold">{shiftName[i]}</td>))

  return (
    <tr className={'sticky top-0 sm:top-7 z-10 border border-t-0 border-gray-300 bg-gray-300 text-center text-sm font-medium text-gray-900 ' }>
      <td className="py-3 font-semibold">Datum</td>
      { listShifts }
    </tr>
  )
}
