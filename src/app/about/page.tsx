import axios from 'axios'
import {putData} from '../../api/client'

export default async function Page() {
  let data = await putData()
  console.log(data)
  return (
    <ul>
    </ul>
  )
}