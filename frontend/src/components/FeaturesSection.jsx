import React from 'react';
import clientprop3 from '../assets/client-prop3.jpeg';


const FeaturesSection = () => {
  return (
    <section className=" ">
    <div className='pt-12 mx-auto bg-black text-white '>
      <div className="w-full px-6 md:px-10 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              A whole world of freelance talent at your fingertips
            </h2>
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                {/* <img src={featureIcon1} alt="Proof of quality" className="h-8 w-8" /> */}
                <div>
                  <h3 className="text-xl font-semibold">Proof of quality</h3>
                  <p>Check any pro’s work samples, client reviews, and identity verification.</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                {/* <img src={featureIcon2} alt="No cost until you hire" className="h-8 w-8" /> */}
                <div>
                  <h3 className="text-xl font-semibold">No cost until you hire</h3>
                  <p>Check any pro’s work samples, client reviews, and identity verification.</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                {/* <img src={featureIcon3} alt="Safe and secure" className="h-8 w-8" /> */}
                <div>
                  <h3 className="text-xl font-semibold">Safe and secure</h3>
                  <p>Check any pro’s work samples, client reviews, and identity verification.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 items-end h-full w-full">
            <img src={clientprop3} alt="User 4" className="rounded-t-full h-40" />
            <img src={clientprop3} alt="User 4" className="rounded-full h-40" />
            <img src={clientprop3} alt="User 4" className="rounded-full h-40" />
            <img src={clientprop3} alt="User 4" className="rounded-b-full  h-40" />

          </div>
        </div>
    </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center bg-white text-black p-12">
          <div>
            <h4 className="text-2xl md:text-3xl font-bold">890M</h4>
            <p>Total Freelancers</p>
          </div>
          <div>
            <h4 className="text-2xl md:text-3xl font-bold">750M</h4>
            <p>Positive Reviews</p>
          </div>
          <div>
            <h4 className="text-2xl md:text-3xl font-bold">98M</h4>
            <p>Orders Received</p>
          </div>
          <div>
            <h4 className="text-2xl md:text-3xl font-bold">336M</h4>
            <p>Projects Completed</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
