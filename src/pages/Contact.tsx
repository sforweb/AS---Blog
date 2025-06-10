import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { getImagePath } from '@/lib/path';

import {
  Mail,
  Phone,
  MessageSquare,
  Send,
  Loader2,
  CheckCircle,
} from 'lucide-react';

const chatLightIcon = 'images/icons/chat-light.png';
const chatDarkIcon = 'images/icons/chat-dark.png';
const officeLightIcon = 'images/icons/office-light.png';
const officeDarkIcon = 'images/icons/office-dark.png';
const communityLightIcon = 'images/icons/community-light.png';
const communityDarkIcon = 'images/icons/community-dark.png';
const supportLightIcon = 'images/icons/support-light.png';
const supportDarkIcon = 'images/icons/support-dark.png';

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

/* -------------------------------------------------------------------------- */
/* Validação e tipos                                                          */
/* -------------------------------------------------------------------------- */

const formSchema = z.object({
  name: z.string().min(2, { message: 'Nome deve ter pelo menos 2 caracteres.' }),
  email: z.string().email({ message: 'Digite um email válido.' }),
  whatsapp: z.string().min(10, { message: 'WhatsApp deve ter pelo menos 10 dígitos.' }),
  subject: z.string().min(5, { message: 'Assunto deve ter pelo menos 5 caracteres.' }),
  message: z.string().min(10, { message: 'Mensagem deve ter pelo menos 10 caracteres.' }),
});

type FormData = z.infer<typeof formSchema>;

/* -------------------------------------------------------------------------- */
/* Componente                                                                 */
/* -------------------------------------------------------------------------- */

export default function Contact() {
  // Rola para o topo da página ao carregar
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      whatsapp: '',
      subject: '',
      message: '',
    },
  });

  async function onSubmit(values: FormData) {
    try {
      setIsSubmitting(true);
      await new Promise((r) => setTimeout(r, 1500)); // simula API
      console.log(values);
      setIsSuccess(true);
      form.reset();
      setTimeout(() => setIsSuccess(false), 4000);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-tech-blue-950">
      <Header />

      <main className="flex flex-col items-center justify-start min-h-[calc(100vh-8rem)] pt-28 pb-12 px-4 bg-gray-50 dark:bg-[#020525]">
        {/* ------------------------------------------------------------------ */}
        {/* Cabeçalho + formulário                                             */}
        {/* ------------------------------------------------------------------ */}
        <div className="w-full max-w-2xl">
          <header className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-lora text-gray-900 dark:text-white mb-3">
              <span className="font-light">Fale </span>
              <span className="font-bold text-[#65c7f8]">Conosco</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Tem alguma dúvida sobre como contratar nossos serviços? Entre em contato conosco.
            </p>
          </header>

          {/* Formulário */}
          <div className="bg-white/95 dark:bg-[#040a4a]/15 backdrop-blur-lg p-8 rounded-2xl dark:border dark:border-gray-700/30">
            <h2 className="text-2xl font-lora font-bold text-gray-900 dark:text-white mb-6">
              Envie sua Mensagem
            </h2>

            {isSuccess ? (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Mensagem enviada!
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Obrigado pelo seu contato. Retornaremos em breve.
                </p>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  {/* Nome */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 dark:text-gray-300">Nome</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Seu nome completo"
                            className="h-14 rounded-xl border border-gray-300 dark:border-tech-blue-700 bg-white dark:bg-tech-blue-950 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-tech-blue-500"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Email */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 dark:text-gray-300">Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="seu@email.com"
                            className="h-14 rounded-xl border border-gray-300 dark:border-tech-blue-700 bg-white dark:bg-tech-blue-950 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-tech-blue-500"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* WhatsApp */}
                  <FormField
                    control={form.control}
                    name="whatsapp"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 dark:text-gray-300">WhatsApp</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="(11) 99999-9999"
                            className="h-14 rounded-xl border border-gray-300 dark:border-tech-blue-700 bg-white dark:bg-tech-blue-950 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-tech-blue-500"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Assunto */}
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 dark:text-gray-300">Assunto</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Qual é o assunto da sua mensagem?"
                            className="h-14 rounded-xl border border-gray-300 dark:border-tech-blue-700 bg-white dark:bg-tech-blue-950 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-tech-blue-500"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Mensagem */}
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 dark:text-gray-300">Mensagem</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Escreva sua mensagem aqui..."
                            className="min-h-[120px] rounded-xl border border-gray-300 dark:border-tech-blue-700 bg-white dark:bg-tech-blue-950 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-tech-blue-500"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Botão */}
                  <div className="pt-2">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-12 bg-[#67c9f8] hover:bg-[#4ab9f7] text-white font-semibold rounded-full transition"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Enviando…
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-5 w-5" />
                          Enviar Mensagem
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            )}
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* Outras formas de contato                                           */}
        {/* ------------------------------------------------------------------ */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <h2 className="text-3xl font-lora font-bold text-gray-900 dark:text-white text-center mb-16">
            Outras formas de contato
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-8 max-w-5xl mx-auto">
            {/* Card helper */}
            {[
              {
                light: officeLightIcon,
                dark: officeDarkIcon,
                title: 'Nosso escritório',
                desc: 'Rua Nova Prata, 121, Vl. Maria, São Paulo - SP.',
              },
              {
                light: chatLightIcon,
                dark: chatDarkIcon,
                title: 'Via WhatsApp',
                desc: 'Segunda a Sexta das 9h às 18h.',
                onClick: () => {
                  const phoneNumber = '5511912095561'; // Número com DDI 55 e DDD 11
                  const message = encodeURIComponent('Olá, gostaria de mais informações sobre seus serviços.');
                  window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
                }
              },
              {
                light: supportLightIcon,
                dark: supportDarkIcon,
                title: 'Dúvidas gerais',
                desc: 'falecom@alexandrespada.com.br',
              },
              {
                light: communityLightIcon,
                dark: communityDarkIcon,
                title: 'Nossa comunidade',
                desc: 'Conecte-se com outros profissionais interessados em tecnologia.',
              },
            ].map(({ light, dark, title, desc, onClick }) => (
              <div
                key={title}
                onClick={onClick}
                className={`bg-white/95 dark:bg-[#040a4a]/15 backdrop-blur-lg p-8 rounded-2xl flex items-center min-h-[140px] hover:shadow-md transition-all duration-300 border border-transparent hover:border-[#67c9f8] dark:border-gray-700/30 dark:hover:border-[#67c9f8] transform hover:-translate-y-1 ${onClick ? 'cursor-pointer' : ''}`}
              >
                <div className="w-16 h-16 flex-shrink-0 bg-tech-blue-50 dark:bg-tech-blue-900/20 rounded-xl flex items-center justify-center mr-6 p-2">
                  <img 
                    src={getImagePath(light)} 
                    alt="" 
                    className="h-8 w-8 dark:hidden" 
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.opacity = '0';
                    }}
                  />
                  <img 
                    src={getImagePath(dark)} 
                    alt="" 
                    className="h-8 w-8 hidden dark:block"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.opacity = '0';
                    }}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                    {title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}