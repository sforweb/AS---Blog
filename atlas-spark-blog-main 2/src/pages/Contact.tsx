
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Mail, Phone, MessageSquare } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../components/ui/form';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Button } from '../components/ui/button';

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Nome deve ter pelo menos 2 caracteres.",
  }),
  email: z.string().email({
    message: "Digite um email válido.",
  }),
  whatsapp: z.string().min(10, {
    message: "WhatsApp deve ter pelo menos 10 dígitos.",
  }),
  subject: z.string().min(5, {
    message: "Assunto deve ter pelo menos 5 caracteres.",
  }),
  message: z.string().min(10, {
    message: "Mensagem deve ter pelo menos 10 caracteres.",
  }),
});

const Contact = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      whatsapp: "",
      subject: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Aqui você pode implementar o envio do formulário
    alert("Mensagem enviada com sucesso!");
    form.reset();
  }

  return (
    <div className="min-h-screen bg-white dark:bg-tech-blue-950">
      <Header />
      <main className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-lora font-bold text-gray-900 dark:text-white mb-6">
              Entre em Contato
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Tem alguma dúvida, sugestão ou quer compartilhar sua história de viagem? 
              Adoraríamos ouvir de você!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="text-left">
              <h2 className="text-2xl font-lora font-bold text-gray-900 dark:text-white mb-6">
                Informações de Contato
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-tech-blue-500/10 dark:bg-tech-blue-500/20 rounded-lg">
                    <Mail className="w-6 h-6 text-tech-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Email</h3>
                    <p className="text-gray-600 dark:text-gray-300">contato@atlascollective.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-tech-blue-500/10 dark:bg-tech-blue-500/20 rounded-lg">
                    <Phone className="w-6 h-6 text-tech-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">WhatsApp</h3>
                    <p className="text-gray-600 dark:text-gray-300">+55 11 99999-9999</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-tech-blue-500/10 dark:bg-tech-blue-500/20 rounded-lg">
                    <MessageSquare className="w-6 h-6 text-tech-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Resposta</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Respondemos em até 24 horas
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-tech-blue-50 to-tech-blue-100 dark:from-tech-blue-900/30 dark:to-tech-blue-800/30 rounded-xl border border-tech-blue-200 dark:border-tech-blue-700/50">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Quer compartilhar sua história?
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Se você tem uma história de viagem incrível para contar, 
                  adoraríamos considerar publicá-la em nosso blog. Entre em contato!
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-50 dark:bg-tech-blue-900/20 p-8 rounded-2xl border border-gray-200 dark:border-tech-blue-700/50">
              <h2 className="text-2xl font-lora font-bold text-gray-900 dark:text-white mb-6 text-left">
                Envie sua Mensagem
              </h2>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="text-left">
                        <FormLabel>Nome</FormLabel>
                        <FormControl>
                          <Input placeholder="Seu nome completo" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="text-left">
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="seu@email.com" type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="whatsapp"
                    render={({ field }) => (
                      <FormItem className="text-left">
                        <FormLabel>WhatsApp</FormLabel>
                        <FormControl>
                          <Input placeholder="(11) 99999-9999" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem className="text-left">
                        <FormLabel>Assunto</FormLabel>
                        <FormControl>
                          <Input placeholder="Qual é o assunto da sua mensagem?" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem className="text-left">
                        <FormLabel>Mensagem</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Escreva sua mensagem aqui..."
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full">
                    Enviar Mensagem
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
