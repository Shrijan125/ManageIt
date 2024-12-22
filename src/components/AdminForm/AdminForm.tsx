'use client';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFieldArray } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Loader from '../Loader/loader';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

const checkpointSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(3).max(1000),
  dueDate: z.date(),
  marks: z.number().int().min(0),
  completed: z.boolean(),
});

const formSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(3).max(1000),
  dueDate: z.date(),
  totalMarks: z.number().int().min(0),
  checkpoints: z
    .array(checkpointSchema)
    .min(1, { message: 'At least one checkpoint should be added.' }),
});

const AdminForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      dueDate: new Date(),
      totalMarks: 0,
      checkpoints: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'checkpoints',
  });

  const isLoading = form.formState.isSubmitting;
  const { toast } = useToast();
  const router = useRouter();
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const result = await axios.post('/api/addProjects', values);
      if (result.status === 201) {
        toast({ description: 'Project added successfully!' });
        router.back();
        return;
      }
      const message = result.data.message || 'Failed to add project';
      if (result.status === 400) {
        toast({ description: message, variant: 'destructive' });
        return;
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        toast({
          description: error.response.data.message,
          variant: 'destructive',
        });
      } else if (error instanceof Error) {
        toast({ description: error.message, variant: 'destructive' });
      } else {
        toast({ description: 'An error occurred.', variant: 'destructive' });
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dueDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Due Date</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  placeholder="Due Date"
                  {...field}
                  value={
                    field.value instanceof Date
                      ? field.value.toISOString().split('T')[0]
                      : field.value
                  }
                  onChange={(e) => field.onChange(new Date(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="totalMarks"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Total Marks</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Total Marks"
                  {...field}
                  value={field.value || ''}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <h3 className="text-lg font-semibold">Checkpoints</h3>
          <FormField
            control={form.control}
            name="checkpoints"
            render={() => (
              <FormItem>
                {fields.map((checkpoint, index) => (
                  <div key={checkpoint.id} className="space-y-4 border-b pb-4">
                    <FormField
                      control={form.control}
                      name={`checkpoints.${index}.title`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Checkpoint Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Title" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`checkpoints.${index}.description`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Input placeholder="Description" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`checkpoints.${index}.dueDate`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Due Date</FormLabel>
                          <FormControl>
                            <Input
                              type="date"
                              placeholder="Due Date"
                              {...field}
                              value={
                                field.value instanceof Date
                                  ? field.value.toISOString().split('T')[0]
                                  : field.value
                              }
                              onChange={(e) =>
                                field.onChange(new Date(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`checkpoints.${index}.marks`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Marks</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Marks"
                              {...field}
                              value={field.value || ''}
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => remove(index)}
                    >
                      Remove Checkpoint
                    </Button>
                  </div>
                ))}
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="button"
            variant={'outline'}
            onClick={() =>
              append({
                title: '',
                description: '',
                dueDate: new Date(),
                marks: 0,
                completed: false,
              })
            }
          >
            + Add Checkpoint
          </Button>
        </div>

        <Button type="submit" className="w-full p-6" disabled={isLoading}>
          {!isLoading ? 'Submit' : <Loader />}
        </Button>
      </form>
    </Form>
  );
};

export default AdminForm;
