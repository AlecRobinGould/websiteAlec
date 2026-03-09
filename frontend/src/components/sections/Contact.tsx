import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useState } from 'react';
import emailjs from '@emailjs/browser';
import axios from 'axios';
import { theme } from '../../styles/theme';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const ContactSection = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  padding: ${theme.spacing.lg} 0;

  @media (min-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing.xl} 0;
  }
`;

const SectionTitle = styled(motion.h2)`
  text-align: center;
  font-size: clamp(2rem, 4vw, 2.5rem);
  margin-bottom: calc(${theme.spacing.xl} * 1.5);
  color: ${theme.colors.textLight};
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -${theme.spacing.md};
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 4px;
    background-color: ${theme.colors.accent};
    border-radius: 2px;
  }

  @media (min-width: ${theme.breakpoints.md}) {
    margin-bottom: calc(${theme.spacing.xl} * 2);
  }
`;

const ContactContent = styled(motion.div)`
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
`;

const Description = styled.p`
  font-size: clamp(1rem, 1.2vw, 1.2rem);
  margin-bottom: ${theme.spacing.xl};
  opacity: 0.9;
  line-height: 1.7;
  color: ${theme.colors.textLight};
`;

const ContactLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xl};
`;

const EmailLink = styled.a`
  font-size: clamp(1.1rem, 1.5vw, 1.3rem);
  color: ${theme.colors.accent};
  transition: all ${theme.transitions.default};
  font-weight: 600;

  &:hover {
    transform: translateY(-2px);
    text-decoration: underline;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: ${theme.spacing.lg};

  a {
    color: ${theme.colors.textLight};
    font-size: 1.75rem;
    transition: all ${theme.transitions.default};
    padding: ${theme.spacing.sm};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${theme.colors.glass.background};

    &:hover {
      color: ${theme.colors.light};
      transform: translateY(-3px);
      background: ${theme.colors.glass.card};
      box-shadow: 0 4px 12px rgba(246, 177, 122, 0.2);
    }
  }

  @media (min-width: ${theme.breakpoints.md}) {
    gap: ${theme.spacing.xl};
  }
`;

const ContactForm = styled.form`
  max-width: 500px;
  margin: 0 auto ${theme.spacing.xl};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

const Label = styled.label`
  font-size: 1rem;
  color: ${theme.colors.textLight};
  font-weight: 500;
`;

const Input = styled.input`
  padding: ${theme.spacing.md};
  border: 1px solid ${theme.colors.glass.border};
  border-radius: 8px;
  background: ${theme.colors.glass.background};
  color: ${theme.colors.textLight};
  font-size: 1rem;
  transition: all ${theme.transitions.default};

  &:focus {
    outline: none;
    border-color: ${theme.colors.accent};
    box-shadow: 0 0 0 3px rgba(246, 177, 122, 0.1);
  }

  &::placeholder {
    color: ${theme.colors.textLight}80;
  }
`;

const Textarea = styled.textarea`
  padding: ${theme.spacing.md};
  border: 1px solid ${theme.colors.glass.border};
  border-radius: 8px;
  background: ${theme.colors.glass.background};
  color: ${theme.colors.textLight};
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  transition: all ${theme.transitions.default};

  &:focus {
    outline: none;
    border-color: ${theme.colors.accent};
    box-shadow: 0 0 0 3px rgba(246, 177, 122, 0.1);
  }

  &::placeholder {
    color: ${theme.colors.textLight}80;
  }
`;

const SubmitButton = styled.button`
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  background: ${theme.colors.accent};
  color: ${theme.colors.textDark};
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all ${theme.transitions.default};
  align-self: flex-start;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(246, 177, 122, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const StatusMessage = styled.div<{ type: 'success' | 'error' }>`
  padding: ${theme.spacing.md};
  border-radius: 8px;
  font-weight: 500;
  text-align: center;
  margin-top: ${theme.spacing.md};

  ${props => props.type === 'success' ? `
    background: rgba(34, 197, 94, 0.1);
    color: #22c55e;
    border: 1px solid rgba(34, 197, 94, 0.2);
  ` : `
    background: rgba(239, 68, 68, 0.1);
    color: #ef4444;
    border: 1px solid rgba(239, 68, 68, 0.2);
  `}
`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    try {
      const result = await emailjs.send(
        'service_85876ch',   // <- replace with your EmailJS service ID
        'template_irg2yyb',  // <- replace with your EmailJS template ID
        formData,            // sends { name, email, message }
        'elqP6Dd3HrrYQjQnq'    // <- replace with your EmailJS public key
      );

      console.log('Email sent:', result.text);

      setStatus({ type: 'success', message: 'Thank you for your message! I\'ll get back to you soon.' });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      setStatus({ type: 'error', message: 'Sorry, there was an error sending your message. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ContactSection id="contact" role="region" aria-label="Get In Touch">
      <div className="container">
        <SectionTitle
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          role="heading"
          aria-level={2}
        >
          Get In Touch
        </SectionTitle>
        <ContactContent
          variants={variants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Description>
            I'm always interested in hearing about new projects and opportunities. Whether you have a question or just want to say hi, feel free to reach out!
          </Description>

          <ContactForm onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your name"
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="email">Email Address</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your.email@example.com"
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Tell me about your project or just say hello..."
                required
              />
            </FormGroup>

            <SubmitButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </SubmitButton>

            {status && (
              <StatusMessage type={status.type}>
                {status.message}
              </StatusMessage>
            )}
          </ContactForm>

          <ContactLinks>
            <EmailLink
              href="mailto:argould2277@gmail.com"
              aria-label="Send me an email"
            >
              Send me an email at argould2277@gmail.com
            </EmailLink>
          </ContactLinks>
          <SocialLinks role="list" aria-label="Social media links">
            <a
              href="https://github.com/AlecRobinGould"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit my GitHub profile"
              role="listitem"
            >
              <FaGithub aria-hidden="true" />
              <span className="sr-only">GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/alec-robin-gould-/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit my LinkedIn profile"
              role="listitem"
            >
              <FaLinkedin aria-hidden="true" />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit my Twitter profile"
              role="listitem"
            >
              <FaTwitter aria-hidden="true" />
              <span className="sr-only">Twitter</span>
            </a>
          </SocialLinks>
        </ContactContent>
      </div>
    </ContactSection>
  );
};

export default Contact;
