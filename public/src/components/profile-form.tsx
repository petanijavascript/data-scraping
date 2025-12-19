"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Hash, KeyRound, User, Users } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  input: z.string().min(1, 'Input is required.'),
  type: z.enum(['username', 'hashtag', 'keyword', 'competitor']),
});

export function ProfileForm() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      input: '',
      type: 'username',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: 'Profile Discovery Started',
      description: `Searching for profiles with ${values.type}: "${values.input}"`,
    });
    form.reset();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Discovery</CardTitle>
        <CardDescription>
          Find profiles by username, hashtag, keyword, or competitor.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Tabs
              defaultValue="username"
              className="w-full"
              onValueChange={value =>
                form.setValue('type', value as z.infer<typeof formSchema>['type'])
              }
            >
              <TabsList className="grid w-full grid-cols-4 h-12">
                <TabsTrigger value="username" className="flex-col gap-1 text-xs">
                  <User className="w-4 h-4" />
                  Username
                </TabsTrigger>
                <TabsTrigger value="hashtag" className="flex-col gap-1 text-xs">
                  <Hash className="w-4 h-4" />
                  Hashtag
                </TabsTrigger>
                <TabsTrigger value="keyword" className="flex-col gap-1 text-xs">
                  <KeyRound className="w-4 h-4" />
                  Keyword
                </TabsTrigger>
                <TabsTrigger value="competitor" className="flex-col gap-1 text-xs">
                  <Users className="w-4 h-4" />
                  Competitor
                </TabsTrigger>
              </TabsList>
              <FormField
                control={form.control}
                name="input"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div id="form-control-container">
                        <TabsContent value="username">
                          <Input
                            placeholder="@username"
                            {...field}
                            className="mt-4"
                          />
                        </TabsContent>
                        <TabsContent value="hashtag">
                          <Input
                            placeholder="#trending"
                            {...field}
                            className="mt-4"
                          />
                        </TabsContent>
                        <TabsContent value="keyword">
                          <Input
                            placeholder="e.g., sustainable fashion"
                            {...field}
                            className="mt-4"
                          />
                        </TabsContent>
                        <TabsContent value="competitor">
                          <Input
                            placeholder="competitor's @username"
                            {...field}
                            className="mt-4"
                          />
                        </TabsContent>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Tabs>

            <Button type="submit" className="w-full">
              Find Profiles
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
