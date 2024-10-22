'use client';

import { useTranslations } from 'next-intl';
import { ChangeEvent, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';



import { Link } from '~/components/link';
import { Button } from '~/components/ui/button';
import {
  Field,
  FieldControl,
  FieldLabel,
  FieldMessage,
  Form,
  FormSubmit,
  Input,
} from '~/components/ui/form';
import { Message } from '~/components/ui/message';

import { CbdIcon } from '~/components/custom-icons';


import { useAccountStatusContext } from '../../../account/(tabs)/_components/account-status-provider';
import { login } from '../_actions/login';



const SubmitButton = () => {
  const { pending } = useFormStatus();
  const t = useTranslations('Login');

  return (
    <Button
      className="md:w-full shadow-md rounded-full"
      loading={pending}
      loadingText={t('Form.submitting')}
      variant="subtle"
    >
      {t('Form.logIn')}
    </Button>
  );
};

export const LoginForm = () => {
  const t = useTranslations('Login');

  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [state, formAction] = useFormState(login, { status: 'idle' });
  const { accountState } = useAccountStatusContext();

  const isFormInvalid = state?.status === 'error';



  const handleInputValidation = (e: ChangeEvent<HTMLInputElement>) => {
    const validationStatus = e.target.validity.valueMissing;

    switch (e.target.name) {
      case 'email': {
        setIsEmailValid(!validationStatus);

        return;
      }

      case 'password': {
        setIsPasswordValid(!validationStatus);
      }
    }
  };

  return (
    <>
      {accountState.status === 'success' && (
        <Message className="col-span-full mb-8 w-full text-gray-500" variant={accountState.status}>
          <p>{accountState.message}</p>
        </Message>
      )}

      {isFormInvalid && (
        <Message className="mb-8 lg:col-span-2" variant="error">
          <p>{t('Form.error')}</p>
        </Message>
      )}
    
      
         
    <Form action={formAction} className="p-7 sm:p-11">
            <div className="flex items-start">
            <Link href="/" title="Home">
        
            <CbdIcon key="cbd" />
              </Link>
            </div>
            <h1 className="mt-8 text-base/6 font-medium">Welcome back!</h1>
            <p className="mt-1 text-sm/5 text-gray-600">
              Sign in to your account to continue.
            </p>

            <Field className="mt-8 space-y-3" name="email">
              <FieldLabel htmlFor="email">{t('Form.emailLabel')}</FieldLabel>
          <FieldControl asChild>
            <Input
              autoComplete="email"
              error={!isEmailValid}
              id="email"
              onChange={handleInputValidation}
              onInvalid={handleInputValidation}
              required
              autoFocus
              type="email"
            />
          </FieldControl>
          <FieldMessage
            className="absolute inset-x-0 bottom-0 inline-flex w-full text-sm text-error"
            match="valueMissing"
          >
            {t('Form.enterEmailMessage')}
          </FieldMessage>
            </Field>

            <Field className="mt-8 space-y-3" name="password">
              <FieldLabel htmlFor="password">{t('Form.passwordLabel')}</FieldLabel>
              <FieldControl asChild>
                <Input
                  error={!isPasswordValid}
                  id="password"
                  onChange={handleInputValidation}
                  onInvalid={handleInputValidation}
                  required
                  type="password"
                />
              </FieldControl>
              <FieldMessage
                className="absolute inset-x-0 bottom-0 inline-flex w-full text-sm text-error"
                match="valueMissing"
              >
                {t('Form.entePasswordMessage')}
              </FieldMessage>
            </Field>

           

            <div className="mt-8">
              <FormSubmit asChild>
                <SubmitButton />
              </FormSubmit>
            </div>

            <div className="mt-8 flex items-center justify-center text-sm/5">
              <Link href="/login/forgot-password" className=" text-gray-300">
                {t('Form.forgotPassword')}
              </Link>
            </div>

          </Form>
          <div className="m-1.5 rounded-lg bg-gray-50 py-4 text-center text-sm/5 ring-1 ring-black/5">
            Don't have a login?{' '}
            <Link href="/register" className="font-semibold hover:text-gray-600">
             Create an account
            </Link>
          </div>


    </>
  );
};
