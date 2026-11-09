import { useId, useRef, useState } from 'react';
import { AlertCircle, Check, Loader2 } from 'lucide-react';
import { useI18n } from '../i18n/index.jsx';
import { SITE } from '../config/site.js';
import { services } from '../data/services.js';
import { sendContactMessage } from '../services/contact.js';
import Button from './Button.jsx';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const INITIAL = { name: '', email: '', service: '', message: '', company: '' };

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = 'form.errors.nameRequired';
  if (!values.email.trim()) errors.email = 'form.errors.emailRequired';
  else if (!EMAIL_RE.test(values.email.trim())) errors.email = 'form.errors.emailInvalid';
  if (!values.message.trim()) errors.message = 'form.errors.messageRequired';
  else if (values.message.trim().length < 10) errors.message = 'form.errors.messageShort';
  return errors;
}

const fieldClass =
  'w-full border-0 border-b border-line bg-transparent py-4 text-lg text-ink outline-none transition-colors duration-300 placeholder:text-muted/60 focus:border-accent focus-visible:outline-none aria-[invalid=true]:border-red-400';

export default function ContactForm() {
  const { t, l, lang } = useI18n();
  const uid = useId();
  const formRef = useRef(null);
  const startedAt = useRef(Date.now());
  const [values, setValues] = useState(INITIAL);
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const errors = validate(values);
  const errorFor = (field) => (touched[field] && errors[field] ? t(errors[field]) : '');

  const onChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };
  const onBlur = (event) => setTouched((prev) => ({ ...prev, [event.target.name]: true }));

  const onSubmit = async (event) => {
    event.preventDefault();
    setTouched({ name: true, email: true, message: true });
    const current = validate(values);
    const firstInvalid = Object.keys(current)[0];
    if (firstInvalid) {
      formRef.current?.querySelector(`[name="${firstInvalid}"]`)?.focus();
      return;
    }
    // Spam guards: filled honeypot or an implausibly fast submit are dropped silently (no success shown).
    if (values.company || Date.now() - startedAt.current < 1500) return;

    setStatus('sending');
    try {
      const picked = services.find((s) => s.slug === values.service);
      await sendContactMessage({
        name: values.name.trim(),
        email: values.email.trim(),
        service: picked ? picked.title.en : values.service === 'other' ? 'Other' : '',
        message: values.message.trim(),
        lang,
      });
      setStatus('success');
      setValues(INITIAL);
      setTouched({});
    } catch (error) {
      console.error('[contact] submission failed:', error);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div role="status" className="flex h-full flex-col items-start justify-center gap-6 rounded-[1.5rem] border border-line p-8 sm:p-12">
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent text-on-accent">
          <Check className="h-7 w-7" aria-hidden="true" />
        </span>
        <h3 className="display-md">{t('form.successTitle')}</h3>
        <p className="lead">{t('form.success')}</p>
        <Button variant="outline" icon={false} onClick={() => setStatus('idle')}>
          {t('form.reset')}
        </Button>
      </div>
    );
  }

  const sending = status === 'sending';
  const id = (field) => `${uid}-${field}`;

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-2" aria-busy={sending}>
      <h3 className="mb-6 font-display text-3xl sm:text-4xl">{t('form.title')}</h3>

      <div>
        <label htmlFor={id('name')} className="eyebrow before:hidden">
          {t('form.name')} <span className="sr-only">({t('form.required')})</span>
        </label>
        <input
          id={id('name')}
          name="name"
          type="text"
          autoComplete="name"
          value={values.name}
          onChange={onChange}
          onBlur={onBlur}
          aria-invalid={errorFor('name') ? 'true' : 'false'}
          aria-describedby={errorFor('name') ? id('name-error') : undefined}
          disabled={sending}
          className={fieldClass}
        />
        <p id={id('name-error')} className="min-h-[1.5rem] pt-1 text-sm text-red-400" role={errorFor('name') ? 'alert' : undefined}>
          {errorFor('name')}
        </p>
      </div>

      <div>
        <label htmlFor={id('email')} className="eyebrow before:hidden">
          {t('form.email')} <span className="sr-only">({t('form.required')})</span>
        </label>
        <input
          id={id('email')}
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          value={values.email}
          onChange={onChange}
          onBlur={onBlur}
          aria-invalid={errorFor('email') ? 'true' : 'false'}
          aria-describedby={errorFor('email') ? id('email-error') : undefined}
          disabled={sending}
          className={fieldClass}
        />
        <p id={id('email-error')} className="min-h-[1.5rem] pt-1 text-sm text-red-400" role={errorFor('email') ? 'alert' : undefined}>
          {errorFor('email')}
        </p>
      </div>

      <div>
        <label htmlFor={id('service')} className="eyebrow before:hidden">
          {t('form.service')}
        </label>
        <select
          id={id('service')}
          name="service"
          value={values.service}
          onChange={onChange}
          disabled={sending}
          className={`${fieldClass} [&>option]:bg-[#141414] [&>option]:text-[#f2f2ee]`}
        >
          <option value="">{t('form.servicePlaceholder')}</option>
          {services.map((service) => (
            <option key={service.slug} value={service.slug}>
              {l(service.title)}
            </option>
          ))}
          <option value="other">{t('form.other')}</option>
        </select>
        <p className="min-h-[1.5rem]" aria-hidden="true" />
      </div>

      <div>
        <label htmlFor={id('message')} className="eyebrow before:hidden">
          {t('form.message')} <span className="sr-only">({t('form.required')})</span>
        </label>
        <textarea
          id={id('message')}
          name="message"
          rows={5}
          value={values.message}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={t('form.messagePlaceholder')}
          aria-invalid={errorFor('message') ? 'true' : 'false'}
          aria-describedby={errorFor('message') ? id('message-error') : undefined}
          disabled={sending}
          className={`${fieldClass} resize-y`}
        />
        <p id={id('message-error')} className="min-h-[1.5rem] pt-1 text-sm text-red-400" role={errorFor('message') ? 'alert' : undefined}>
          {errorFor('message')}
        </p>
      </div>

      {/* Honeypot — real users never see or fill this field. */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" value={values.company} onChange={onChange} />
        </label>
      </div>

      {status === 'error' ? (
        <div role="alert" className="flex gap-3 rounded-2xl border border-red-400/40 bg-red-400/10 p-4 text-sm leading-relaxed text-ink">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-400" aria-hidden="true" />
          <div className="space-y-3">
            <p>{t('form.error', { email: SITE.email })}</p>
            <a href={`mailto:${SITE.email}`} className="link-underline font-medium">
              {t('form.emailFallback')}
            </a>
          </div>
        </div>
      ) : null}

      <div className="pt-4">
        <Button type="submit" variant="accent" icon={!sending} disabled={sending} className="w-full sm:w-auto">
          {sending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              {t('form.sending')}
            </>
          ) : (
            t('form.send')
          )}
        </Button>
      </div>
    </form>
  );
}
