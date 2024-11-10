import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { useFormContext } from "react-hook-form"

const Field = ({name,label,desc,type}:{name:string,label?:string,desc ?:string, type?:string}) => {
    const form = useFormContext();
    return (
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="capitalize">{label}</FormLabel>
              <FormControl>
                <Input  type={type} placeholder="" {...field} />
              </FormControl>
              <FormDescription>
                {desc}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
    )
}

export default Field