import React from 'react';
import Footer from '../components/Footer';

const TermsAndConditions = () => {
  return (

    <div>
    <div className="container mx-auto p-6">
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">01. Terms & Conditions</h2>
        <p className="mb-4">
          Welcome to our job portal. By using our services, you agree to comply with and be bound by the following terms and conditions. Please review them carefully.
        </p>
        <ul className="list-disc list-inside">
          <li className="mb-2">Use of the website is subject to these terms and conditions.</li>
          <li className="mb-2">We reserve the right to update these terms at any time.</li>
          <li className="mb-2">You are responsible for maintaining the confidentiality of your account information.</li>
          <li className="mb-2">Any unauthorized use of the website may result in termination of your access.</li>
          <li className="mb-2">We are not liable for any damages resulting from your use of the website.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">02. Limitations</h2>
        <p className="mb-4">
          While we strive to ensure the accuracy of the information on our website, we cannot guarantee that all content is up-to-date or free from errors.
        </p>
        <ul className="list-disc list-inside">
          <li className="mb-2">We are not responsible for any inaccuracies or omissions in the content.</li>
          <li className="mb-2">The website is provided on an "as is" basis without warranties of any kind.</li>
          <li className="mb-2">We do not warrant that the website will be available at all times.</li>
          <li className="mb-2">We are not liable for any loss or damage resulting from your reliance on the website.</li>
          <li className="mb-2">We reserve the right to modify or discontinue the website at any time.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">03. Security</h2>
        <p className="mb-4">
          We are committed to ensuring the security of your information. However, no system can be completely secure, and we cannot guarantee the absolute security of your data.
        </p>
        <ul className="list-disc list-inside">
          <li className="mb-2">We implement reasonable security measures to protect your information.</li>
          <li className="mb-2">You are responsible for maintaining the security of your account credentials.</li>
          <li className="mb-2">We are not liable for any unauthorized access to your account.</li>
          <li className="mb-2">We recommend that you use strong passwords and change them regularly.</li>
          <li className="mb-2">If you suspect any unauthorized use of your account, please notify us immediately.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">04. Privacy Policy</h2>
        <p className="mb-4">
          Your privacy is important to us. Our privacy policy outlines how we collect, use, and protect your personal information.
        </p>
        <ul className="list-disc list-inside">
          <li className="mb-2">We collect information that you provide to us voluntarily.</li>
          <li className="mb-2">We use your information to provide and improve our services.</li>
          <li className="mb-2">We do not share your personal information with third parties without your consent.</li>
          <li className="mb-2">We implement measures to protect your information from unauthorized access.</li>
          <li className="mb-2">Our privacy policy is subject to change, and we will notify you of any significant updates.</li>
        </ul>
      </section>
      </div>
      <Footer/>
    </div>
  );
};

export default TermsAndConditions;
