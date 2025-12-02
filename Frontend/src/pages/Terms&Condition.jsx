import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

// A reusable component for sections to keep the main component clean
const Section = ({ title, children }) => (
  <section className="mt-8">
    <h2 className="text-2xl font-semibold text-teal-600 mb-4">{title}</h2>
    <div className="space-y-4 text-gray-700 leading-relaxed">
      {children}
    </div>
  </section>
);

const TermsAndConditions = () => {
  // Ensures the page opens at the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      className="bg-white min-h-screen"
    >
      <div className="max-w-4xl mx-auto pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-6xl font-bold text-teal-600 sm:text-6xl">
            Terms and Conditions
          </h1>
          
        </div>

        {/* Introduction */}
        <p className="text-gray-700 leading-relaxed">
          Welcome to BookBinge! These terms and conditions outline the rules and regulations for the use of BookBinge's Website..
        </p>
        <p className="mt-4 text-gray-700 leading-relaxed">
          By accessing this website we assume you accept these terms and conditions. Do not continue to use BookBinge if you do not agree to take all of the terms and conditions stated on this page.
        </p>

        {/* Section 1: Acceptance of Terms */}
        <Section title="1. Acceptance of Terms">
          <p>
            This is placeholder text. Here you would state that by using the service, the user agrees to be bound by these terms. It's the core agreement.
          </p>
        </Section>

        {/* Section 2: Use of the Service */}
        <Section title="2. Use of the Service">
          <p>
            This section describes what users are allowed (and not allowed) to do on BookBinge.
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>You must be at least 13 years old to use this service.</li>
            <li>You may not use the service for any illegal or unauthorized purpose.</li>
            <li>You are responsible for any activity that occurs under your account.</li>
            <li>You must not harass, abuse, or harm other users.</li>
          </ul>
        </Section>

        {/* Section 3: Intellectual Property */}
        <Section title="3. Intellectual Property">
          <p>
            The Service and its original content (excluding content provided by users), features, and functionality are and will remain the exclusive property of BookBinge and its licensors. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of BookBinge.
          </p>
        </Section>

        {/* Section 4: Termination */}
        <Section title="4. Termination">
          <p>
            We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
          </p>
          <p>
            Upon termination, your right to use the Service will immediately cease.
          </p>
        </Section>

        {/* Section 5: Disclaimer of Warranties */}
        <Section title="5. Disclaimer of Warranties">
          <p>
            Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis. The Service is provided without warranties of any kind, whether express or implied.
          </p>
          <p>
            <strong>This is important legal language. Do not use this placeholder. Consult a legal professional.</strong>
          </p>
        </Section>
        
        {/* Section 6: Limitation of Liability */}
        <Section title="6. Limitation of Liability">
          <p>
            In no event shall BookBinge, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
          </p>
        </Section>

        {/* Section 7: Changes to Terms */}
        <Section title="7. Changes to Terms">
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide at least 30 days' notice prior to any new terms taking effect.
          </p>
        </Section>

        {/* Section 8: Contact Us */}
        <Section title="8. Contact Us">
          <p>
            If you have any questions about these Terms, please contact us at:
          </p>
          <p className="font-medium text-teal-600">
            support@bookbinge.com
          </p>
        </Section>

      </div>
    </motion.div>
  );
};

export default TermsAndConditions;