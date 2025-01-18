import avatar from '../Assets/avatar.jpg';
import fb from '../Assets/fbb.png';
import google from '../Assets/google.png';
import otpic from '../assets/otpic.jpg';

import javis from '../assets/OurTeam/javis.png';
import merce from '../assets/OurTeam/merce.jpg';
import tala from '../Assets/OurTeam/tala.png';

export default function OurTeam() {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen p-8 pb-10"
      style={{
        backgroundImage: `url(${otpic})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="text-center max-w-2xl mb-12 bg-white bg-opacity-80 p-6 rounded-lg shadow-md">
        <h1 className="text-black lg:text-5xl xsm:text-3xl font-normal font-serif mb-6 relative group">
          Meet Our Team
          <span
            className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#845162] transition-all duration-300 group-hover:w-full"
          />
        </h1>
        <p className="text-gray-700 lg:text-lg xsm:text-md leading-relaxed">
          At Loop, we’re more than just a team – we’re a family united by a passion for creativity, craftsmanship, and sustainability. Each member brings a unique skill set to ensure that every crochet piece tells a story of dedication and artistry.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 text-center max-w-6xl w-full group">
        {[
          { name: "John Mark Navajas",img: merce, pos: "Lead Developer", fb: "", google: "" },
          { name: "Mark Javis Mateo",img: javis, pos: "Assistant Programmer/Lead Design Developer", fb: "", google: "" },
          { name: "Crystal Nable",img: tala, pos: "Assistant Developer/Lead Documenter", fb: "", google: "" }
        ].map((obj, index) => (
          <div
            key={index}
            className="card flex flex-col items-center bg-gray-100 p-6 rounded-xl shadow-md hover:shadow-lg group-hover:opacity-50 hover:!opacity-100 transition-opacity duration-300 bg-opacity-90 hover:scale-110 transition-transform duration-300 font-serif"
          >
            <img
              src={obj.img}
              alt={`${obj.name}`}
              className="rounded-full w-32 h-32 mb-4 border-4 border-gray-300"
            />
            <p className="text-black text-2xl font-medium mb-2">{obj.name}</p>
            <p className="text-gray-900">{obj.pos}</p>
            <div className="flex gap-5 p-3">
              <a href={obj.fb}><img src={fb} alt="" className="w-4 h-4" /></a>
              <a href={obj.google}><img src={google} alt="" className="w-4 h-4" /></a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
