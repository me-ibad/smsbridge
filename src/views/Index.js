/*eslint-disable*/
import React from "react";
import { Link } from "react-router-dom";

import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/FooterSmall.js";
import CardSettings from "components/Cards/CardSettings.js";
import CardProfile from "components/Cards/CardProfile.js";


import { Progress, Form, Input, Button, Space,Checkbox  } from 'antd';



export default function Index() {

  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math. round(Math.random() * 10);
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <>
      <IndexNavbar fixed />
      <section className="header relative pt-1 mt-28 items-center ">
        <div className="container mx-auto items-center flex flex-wrap">
          <div className="w-full ">
            <div className="">
              <h2 className="font-semibold text-4xl text-gray-700">
               Send bulk sms using sms bridge
              </h2>
              {/* <p className="mt-4 text-lg leading-relaxed text-gray-600">
                Notus React is Free and Open Source. It does not change or add
                any CSS to the already one from{" "}
                <a
                  href="https://tailwindcss.com/?ref=creativetim"
                  className="text-gray-700"
                  target="_blank"
                >
                  Tailwind CSS
                </a>
                . It features multiple HTML elements and it comes with dynamic
                components for ReactJS, Vue and Angular.
              </p> */}



<div className="text-white px-6 py-4 mt-10 border-0 rounded relative mb-4 bg-yellow-500">
  <span className="text-xl inline-block mr-5 align-middle">
    <i className="fas fa-bell"></i>
  </span>
  <span className="inline-block align-middle mr-8">
    <b className="capitalize">Phone Number</b> Should start from the 2nd templete 
  </span>
 <a  href="/images/myw3schoolsimage.jpg" download className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none">
    <span>sample</span>
  </a>
</div>



 <div className="flex-auto px-4 g bg-gray-200  lg:px-10 py-10 mt-10">
          <form>
            <h6 className="text-gray-500 text-sm mt-3 mb-6 font-bold uppercase">
              Twilio Information
            </h6>
<div className='float-right -mt-12'>
<div class="upload-btn-wrapper">
  <button className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">Upload Excel</button>
  <input type="file" name="myfile"  accept=".xlsx, .xls, .csv" />
</div>

<br/>

</div>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                  accountSid
                  </label>
                  <input
                    type="text"
                    className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                  
                  />
                </div>
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                   authToken
                  </label>
                  <input
                    type="email"
                    className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                   
                  />
                </div>
              </div>
              <div className="w-full mt-6 lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                Messaging Service SID
                  </label>
                  <input
                    type="text"
                    className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                   
                  />
                </div>
              </div>
              
            </div>


 <div className="flex flex-wrap mt-6">
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Body
                  </label>
                  <textarea
                    type="text"
                    className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                   
                    rows="4"
                  ></textarea>
                </div>
              </div>
            </div>


</form>
</div>

 <div className="mt-6">

<Checkbox >add filter</Checkbox>
 <div className="flex flex-wrap">
<div className=" w-32 mt-4 ">
 <input
  type="text"
className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
            placeholder="from"      
      />
      </div>

<div className=" w-32 mt-4 mx-10 ">
 <input
  type="text"
className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                    placeholder="To"  
      />
      </div>


  </div>
 </div>
 <div className="mt-4">
     
       <Progress percent={progress} status="active" />
       
    </div>

              <div className="mt-12">
                <a
                  href=""
                 
                  className="get-started text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-blue-500 active:bg-blue-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"
                >
                 Send
                </a>
                <a
                  href=""
                  className="github-star ml-1 text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-red-600 active:bg-red-700 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"
               
                >
                 Stop
                </a>
              </div>
            </div>
          </div>
        </div>
{/* 
        <img
          className="absolute top-0 b-auto right-0 pt-16 sm:w-6/12 -mt-48 sm:mt-0 w-10/12 max-h-860px"
          src={require("assets/img/pattern_react.png")}
          alt="..."
        /> */}
      </section>
{/* 
      */}
      <br/>
         <br/>
   
      <Footer />
    </>
  );
}
