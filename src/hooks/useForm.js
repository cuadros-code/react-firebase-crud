import { useState } from "react"

export const useForm = (initialState = {}) => {

  const [formValue, setFormValue] = useState(initialState)

  const onChange = ({ target }) => {
    setFormValue({
      ...formValue,
      [target.name]: target.value
    })
  }

  const reset = () => {
    setFormValue(initialState)
  }

  return {
    formValue,
    onChange,
    reset
  }
}
