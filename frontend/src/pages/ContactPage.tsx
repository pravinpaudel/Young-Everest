import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import SectionTitle from '../components/SectionTitle';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  
  const [submitted, setSubmitted] = useState(false);
  
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // In a real app, you would send the form data to a server here
    console.log('Form submitted:', formData);
    setSubmitted(true);
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    });
    
    // Reset submission status after 5 seconds
    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };
  
  return (
    <div>
      {/* Contact Hero */}
      <div className="bg-young-everest-primary text-white py-16 relative overflow-hidden">
        {/* Mountain pattern background */}
        <div className="absolute inset-0 mountain-pattern opacity-20"></div>
        {/* Snow overlay */}
        <div className="absolute inset-0 snow-overlay"></div>
        
        <div className="container-custom text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-young-everest-light max-w-3xl mx-auto">
            Get in touch with Young Everest FC for inquiries, feedback, or to join our club
          </p>
        </div>
      </div>
      
      {/* Contact Information */}
      <section className="py-12 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-young-everest-light p-6 rounded-lg">
              <div className="w-12 h-12 bg-young-everest-primary rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-young-everest-primary mb-2">Phone</h3>
              <p className="text-gray-700 mb-1">Main Office: (123) 456-7890</p>
              <p className="text-gray-700 mb-1">Youth Academy: (123) 456-7891</p>
              <p className="text-gray-700">Ticket Office: (123) 456-7892</p>
            </div>
            
            <div className="bg-young-everest-light p-6 rounded-lg">
              <div className="w-12 h-12 bg-young-everest-primary rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-young-everest-primary mb-2">Email</h3>
              <p className="text-gray-700 mb-1">General Inquiries: info@youngeverestfc.com</p>
              <p className="text-gray-700 mb-1">Youth Academy: youth@youngeverestfc.com</p>
              <p className="text-gray-700">Media Relations: media@youngeverestfc.com</p>
            </div>
            
            <div className="bg-young-everest-light p-6 rounded-lg">
              <div className="w-12 h-12 bg-young-everest-primary rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-young-everest-primary mb-2">Address</h3>
              <p className="text-gray-700 mb-1">Young Everest Football Club</p>
              <p className="text-gray-700 mb-1">Green Valley Stadium</p>
              <p className="text-gray-700 mb-1">123 Mountain View Road</p>
              <p className="text-gray-700">Everest City, EC 12345</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Map & Form Section */}
      <section className="py-12 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Map (placeholder) */}
            <div>
              <SectionTitle 
                title="Visit Us" 
                subtitle="Our facilities are located at Green Valley Stadium"
              />
              
              <div className="h-80 bg-gray-200 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Map Placeholder</p>
              </div>
              
              <div className="mt-6">
                <h3 className="text-xl font-bold text-young-everest-primary mb-3">Training Times</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-bold text-gray-700 mb-2">First Team</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>Monday: 6:00 PM - 8:00 PM</li>
                      <li>Wednesday: 6:00 PM - 8:00 PM</li>
                      <li>Friday: 5:30 PM - 7:30 PM</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-bold text-gray-700 mb-2">Youth Teams</h4>
                    <ul className="space-y-1 text-gray-600">
                      <li>Tuesday: 5:00 PM - 6:30 PM (U16)</li>
                      <li>Thursday: 5:00 PM - 6:30 PM (U14)</li>
                      <li>Saturday: 10:00 AM - 12:00 PM (All)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div>
              <SectionTitle 
                title="Get In Touch" 
                subtitle="Send us a message and we'll get back to you as soon as possible"
              />
              
              {submitted ? (
                <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-6">
                  <p className="font-medium">Thank you for your message!</p>
                  <p>We'll get back to you as soon as possible.</p>
                </div>
              ) : null}
              
              <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 font-medium mb-1">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-young-everest-primary focus:border-young-everest-primary"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-young-everest-primary focus:border-young-everest-primary"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="phone" className="block text-gray-700 font-medium mb-1">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-young-everest-primary focus:border-young-everest-primary"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-gray-700 font-medium mb-1">Subject *</label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-young-everest-primary focus:border-young-everest-primary"
                    >
                      <option value="">Please select</option>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Joining the Club">Joining the Club</option>
                      <option value="Youth Academy">Youth Academy</option>
                      <option value="Sponsorship">Sponsorship</option>
                      <option value="Tickets">Tickets</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="message" className="block text-gray-700 font-medium mb-1">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-young-everest-primary focus:border-young-everest-primary"
                  ></textarea>
                </div>
                
                <button type="submit" className="btn-primary w-full">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-12 bg-white">
        <div className="container-custom">
          <SectionTitle 
            title="Frequently Asked Questions" 
            subtitle="Find answers to common questions about Young Everest FC"
            centered
          />
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              <div className="bg-young-everest-light p-6 rounded-lg">
                <h3 className="text-xl font-bold text-young-everest-primary mb-2">How can I join Young Everest FC?</h3>
                <p className="text-gray-700">
                  We hold open trials for various age groups throughout the year. Check our News section for announcements
                  or contact our youth development team at youth@youngeverestfc.com for more information.
                </p>
              </div>
              
              <div className="bg-young-everest-light p-6 rounded-lg">
                <h3 className="text-xl font-bold text-young-everest-primary mb-2">How can I purchase tickets for matches?</h3>
                <p className="text-gray-700">
                  Tickets for home matches can be purchased online through our website or at the ticket office
                  at Green Valley Stadium on match days. Season tickets offer the best value for regular supporters.
                </p>
              </div>
              
              <div className="bg-young-everest-light p-6 rounded-lg">
                <h3 className="text-xl font-bold text-young-everest-primary mb-2">Do you offer sponsorship opportunities?</h3>
                <p className="text-gray-700">
                  Yes, we offer various sponsorship packages for businesses of all sizes. These range from matchday
                  program advertisements to kit sponsorships. Please contact our commercial team at
                  sponsors@youngeverestfc.com for a detailed prospectus.
                </p>
              </div>
              
              <div className="bg-young-everest-light p-6 rounded-lg">
                <h3 className="text-xl font-bold text-young-everest-primary mb-2">What age groups are in your youth academy?</h3>
                <p className="text-gray-700">
                  Our youth academy currently caters to players from Under-8 to Under-18 age groups.
                  Each age group follows a structured development program aligned with our club's
                  playing philosophy and values.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
