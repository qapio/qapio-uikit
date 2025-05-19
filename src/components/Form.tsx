import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {useState} from "react";

const FormSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
});

export const DataForm = ({title, properties, onSubmit, callToAction}) => {

    const [response, setResponse] = useState();

    const defaultValues = {};

    properties.forEach(({name, placeholder}) => {
        defaultValues[name] = "";
    });

    const form = useForm<z.infer<typeof FormSchema>>({
        defaultValues,
    })

    const getControl = (prop, field) =>  {
        return  <Input placeholder={prop.placeholder} {...field} />;
    }

    return   <div>
        <h1>{title}</h1>
        <Form {...form}>
            <form onSubmit={form.handleSubmit((data) => onSubmit(data, setResponse))} className="w-2/3 space-y-6">
                {properties.map(({name, label, description, placeholder}, idx) => {
                    return   <FormField
                        key={idx}
                        control={form.control}
                        name={name}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{label}</FormLabel>
                                <FormControl>
                                    {getControl({placeholder}, field)}
                                </FormControl>
                                <FormDescription>
                                    {description}
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                })}

                <Button type="submit">{callToAction}</Button>
                <div>{response}</div>
            </form>
        </Form></div>
}