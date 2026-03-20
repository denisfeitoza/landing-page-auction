import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

interface ContactFormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export const useContactForm = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { language } = useLanguage();

  const validateForm = (): boolean => {
    const newErrors: ContactFormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate small delay for UI feel
      await new Promise(resolve => setTimeout(resolve, 500));

      const phoneNumber = '96178777946'; // Sales Number

      const header = language === 'pt-BR' ? '*Nova Mensagem do Site GoldPrime*' : '*New Message from GoldPrime Website*';
      const nameLabel = language === 'pt-BR' ? '*Nome:*' : '*Name:*';
      const emailLabel = language === 'pt-BR' ? '*Email:*' : '*Email:*';
      const messageLabel = language === 'pt-BR' ? '*Mensagem:*' : '*Message:*';

      const text = `${header}\n\n${nameLabel} ${formData.name}\n${emailLabel} ${formData.email}\n${messageLabel} ${formData.message}`;
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;

      // Redirect to WhatsApp
      window.open(whatsappUrl, '_blank');

      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    errors,
    isSubmitting,
    handleInputChange,
    handleSubmit
  };
};
