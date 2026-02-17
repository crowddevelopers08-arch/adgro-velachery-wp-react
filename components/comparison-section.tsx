"use client";

const SimpleMap = () => {
  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
      `}</style>
    <div className="w-full bg-white py-8 px-4 max-[470px]:pt-4"style={{fontFamily: "'Outfit', sans-serif"}}>
      <div className="max-w-4xl mx-auto">
        {/* <h2 className="text-2xl font-bold text-center text-[#d3315c] mb-4">
          Visit Us
        </h2> */}
         <h2 className="text-2xl sm:text-3xl text-center pb-4 lg:text-4xl font-bold text-[#ea2424]">
                     Visit Us
                  </h2>
        <div className="w-full h-64 sm:h-80 md:h-96 rounded-lg overflow-hidden shadow">
        <iframe src="https://www.google.com/maps/embed?pb=!1m19!1m8!1m3!1d15546.07212023543!2d80.1540219!3d13.0663217!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x3a5263c0af418de9%3A0x2d425eee5c85bb53!2sAdgrohair%20Clinic%20Ambattur%2C%204526%2B439%2C%20Redhills%20Main%20Rd%2C%20above%20Pommys%20Nighties%2C%20Old%20Ambattur%2C%20Vijayalakshmi%20Puram%2C%20Ambattur%2C%20Chennai%2C%20Tamil%20Nadu%20600058!3m2!1d13.1003104!2d80.16023369999999!5e0!3m2!1sen!2sin!4v1770892907224!5m2!1sen!2sin"
            className="w-full h-full border-0"
            loading="lazy"
            title="Clinic Location"
            allowFullScreen
          />
        </div>
      </div>
    </div>
    </>
  );
};

export default SimpleMap;