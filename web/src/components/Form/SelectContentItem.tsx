import * as Select from '@radix-ui/react-select'
import { Check } from 'phosphor-react';

interface SelectContentItemProps{
  itemValue: string;
  itemId: string;
}

export function SelectContentItem({itemId, itemValue}:SelectContentItemProps){
 return(
    <Select.SelectItem value={itemId} >     
      
      <Select.SelectItemText >{itemValue}</Select.SelectItemText>
      
    </Select.SelectItem>
  )
}
