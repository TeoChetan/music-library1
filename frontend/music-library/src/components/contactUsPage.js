import React from "react";


const ContactUsPage = () => {

   

  return (
    <div className="bg-polar-sky">
      <div className="min-h-screen flex flex-col md:flex-row pt-12 md:pt-32 px-4 md:px-0">
        <div className="flex flex-col justify-center flex-1 md:ml-10 lg:mr-48 md:-mt-48">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Get in Touch with Us</h2>
          <p className="mb-4 text-lg text-break md:mr-32">
            If you have any questions, suggestions, or simply want to say hi,
            feel free to contact us
          </p>
        </div>
        <div className="flex-1 p-8">
          <div className="max-w-md mx-auto">
            <h3 className="text-2xl font-bold mb-6">Send Us a Message</h3>
            <form >
              <div className="mb-4">
                <input
                  type="email"
                  name="from"
                  placeholder="Email"
                  className="w-full p-2 bg-transparent border border-black rounded focus:border-gray-900"
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  className="w-full p-2 bg-transparent border border-black rounded focus:border-gray-900"
                />
              </div>
              <div className="mb-6">
                <textarea
                  name="message"
                  rows="4"
                  placeholder="Type your message here..."
                  className="w-full p-2 bg-transparent border border-black rounded focus:border-gray-900"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full p-3 bg-polar-sky border border-black text-black rounded hover:bg-gray-300"
              >Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
