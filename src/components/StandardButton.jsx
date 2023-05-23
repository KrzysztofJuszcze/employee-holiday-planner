import { Button } from '@mui/material'

export default function StandardButton(props) {

  const {text, variant, color, ...other} = props;
  
  return (
    <Button
        variant={variant || "contained"}
        color= {color || "primary" }
        {...other}
    >{text}</Button>
  )
}
