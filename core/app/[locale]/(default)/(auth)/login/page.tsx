import { useTranslations } from 'next-intl';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';


import { Link } from '~/components/link';
import { Button } from '~/components/ui/button';
import { locales, LocaleType } from '~/i18n/routing';

import { LoginForm } from './_components/login-form';


import { GradientBackground } from '~/components/gradient';

export async function generateMetadata() {
  const t = await getTranslations('Login');

  return {
    title: t('title'),
  };
}

interface Props {
  params: { locale: LocaleType };
}

export default function Login({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);

  const t = useTranslations('Login');

  return (
    <div>
    <GradientBackground />
    <div className="isolate flex min-h-dvh items-center justify-center p-6 lg:p-8">
        <div className="w-full max-w-md rounded-xl bg-white shadow-md ring-1 ring-black/5">
        <LoginForm />
        </div>
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const dynamic = 'force-static';
