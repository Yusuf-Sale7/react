import React, { useEffect, useState } from "react"
import axios from "axios"
import toastr from "toastr";
import 'toastr/build/toastr.min.css'

export const useApi = (url) => {
  const [data, setData] = useState([])

  useEffect(() => {
    axios.get(url)
    .then(res => setData(res.data))
    .catch(err => toastr.error(err.message))
  }, [])

  return data
}