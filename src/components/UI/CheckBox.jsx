import { Checkbox as MuiCheckBox } from '@mui/material';
import { ReactComponent as CheckedIcon } from '../../static/icons/checkbox_checked.svg';
import { ReactComponent as CheckBoxIcon } from '../../static/icons/checkbox.svg';

export default function CheckBox({sx, ...props}) {
  return (
    <MuiCheckBox icon={<CheckBoxIcon />} checkedIcon={<CheckedIcon />} sx={{p: 0, ...sx}} {...props}/>
  )
}
