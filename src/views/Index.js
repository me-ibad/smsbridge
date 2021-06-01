/*eslint-disable*/
import React from "react";
import { Link } from "react-router-dom";
import readXlsxFile from "read-excel-file";
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/FooterSmall.js";
import CardSettings from "components/Cards/CardSettings.js";
import CardProfile from "components/Cards/CardProfile.js";
import axios from "axios";

import { Progress, Form, Input, Button, Space, Checkbox } from "antd";

let isPhoneNumber = input => {
  try {
    let ISD_CODES = [
        93, 355, 213, 1684, 376, 244, 1264, 672, 1268, 54, 374, 297, 61, 43,
        994, 1242, 973, 880, 1246, 375, 32, 501, 229, 1441, 975, 591, 387, 267,
        55, 246, 1284, 673, 359, 226, 257, 855, 237, 1, 238, 1345, 236, 235, 56,
        86, 61, 61, 57, 269, 682, 506, 385, 53, 599, 357, 420, 243, 45, 253,
        1767, 1809, 1829, 1849, 670, 593, 20, 503, 240, 291, 372, 251, 500, 298,
        679, 358, 33, 689, 241, 220, 995, 49, 233, 350, 30, 299, 1473, 1671,
        502, 441481, 224, 245, 592, 509, 504, 852, 36, 354, 91, 62, 98, 964,
        353, 441624, 972, 39, 225, 1876, 81, 441534, 962, 7, 254, 686, 383, 965,
        996, 856, 371, 961, 266, 231, 218, 423, 370, 352, 853, 389, 261, 265,
        60, 960, 223, 356, 692, 222, 230, 262, 52, 691, 373, 377, 976, 382,
        1664, 212, 258, 95, 264, 674, 977, 31, 599, 687, 64, 505, 227, 234, 683,
        850, 1670, 47, 968, 92, 680, 970, 507, 675, 595, 51, 63, 64, 48, 351,
        1787, 1939, 974, 242, 262, 40, 7, 250, 590, 290, 1869, 1758, 590, 508,
        1784, 685, 378, 239, 966, 221, 381, 248, 232, 65, 1721, 421, 386, 677,
        252, 27, 82, 211, 34, 94, 249, 597, 47, 268, 46, 41, 963, 886, 992, 255,
        66, 228, 690, 676, 1868, 216, 90, 993, 1649, 688, 1340, 256, 380, 971,
        44, 1, 598, 998, 678, 379, 58, 84, 681, 212, 967, 260, 263,
      ],
      //extract numbers from string
      thenum = input.match(/[0-9]+/g).join(""),
      totalnums = thenum.length,
      last10Digits = parseInt(thenum) % 10000000000,
      ISDcode = thenum.substring(0, totalnums - 10);

    //phone numbers are generally of 8 to 16 digits
    if (totalnums >= 8 && totalnums <= 16) {
      if (ISDcode) {
        if (ISD_CODES.includes(parseInt(ISDcode))) {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    }
  } catch (e) {}

  return false;
};

export default function Index() {
  const buttonTextRef = React.useRef();
  const serverPoint = "https://massmarketing.tk";
  const [progress, setProgress] = React.useState(0);
  var allNumbers = [];
  const [finalNumber, setfinalNumber] = React.useState([]);
  const [smsBody, setsmsBody] = React.useState("");

  const [startLimt, setstartLimt] = React.useState(1);

  const [isStop, setisStop] = React.useState(false);
  const [authToken, setauthToken] = React.useState("");
  const [authSid, setauthSid] = React.useState("");
  const [authMsgSid, setauthMsgSid] = React.useState("");

  const [smsLength, setsmsLength] = React.useState("");

  const [sendingMsg, setsendingMsg] = React.useState("");
  const smsOnChange = async e => {
    setsmsLength(e.target.value.length);
    setsmsBody(e.target.value);
  };
  const onChangeHandler = async e => {
    /////  setuserimg(e.target.files[0]);
    if (e.target.files[0].name.split(".").pop() == "xlsx") {
      if (e.target.files[0]) {
        readXlsxFile(e.target.files[0]).then(rows => {
          //  console.log(rows[0][0]);

          var i;
          for (i = 1; i < rows.length; i++) {
            // console.log(rows[i][0]);
            // let myArr = [...allNumbers];
            // myArr.push(rows[i][0]);

            let filter = rows[i][0].toString().replace(/\D/g, "");

            if (isPhoneNumber(filter) == true) {
              allNumbers.push("+" + filter);
            }
            // setallNumbers(myArr);
          }

          var textarea = document.getElementById("your_textarea");
          textarea.value = allNumbers.join("\n");
          setfinalNumber(allNumbers);
        });
      }
    } else {
      alert("please attach xls file");
    }
  };
  function checkisstop() {
    buttonTextRef.current = "true";
  }

  const sendSMS = async e => {
    buttonTextRef.current = "false";
    if (
      authMsgSid != "" &&
      authSid != "" &&
      authToken != "" &&
      finalNumber != "" &&
      smsBody != ""
    ) {
      var i;
      for (i = startLimt; i < finalNumber.length; i++) {
        /////     alert(checkisstop());
        if (buttonTextRef.current === "true") {
          break;
        }
        let data = {
          authToken: authToken,
          authMsgSid: authMsgSid,
          authSid: authSid,
          smsBody: smsBody,
          finalNumber: finalNumber[i],
        };
        let res = await axios.post(serverPoint + "/api/sendSms", { data });
        ///  alert(res.data);
        setsendingMsg(
          "Sent to  " +
            finalNumber[i] +
            "     Status  " +
            i +
            " out of   " +
            finalNumber.length
        );
        setstartLimt(i);
      }
    } else {
      alert("Some field Is missign");
    }
  };

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress(oldProgress => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.round(Math.random() * 10);
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
                  <b className="capitalize">Phone Number</b> Should start from
                  the 2nd templete
                </span>
                <a
                  href="/images/myw3schoolsimage.jpg"
                  download
                  className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none"
                >
                  <span>sample</span>
                </a>
              </div>

              <div className="flex-auto px-4 g bg-gray-200  lg:px-10 py-10 mt-10">
                <form>
                  <h6 className="text-gray-500 text-sm mt-3 mb-6 font-bold uppercase">
                    Twilio Information
                  </h6>
                  <div className="float-right -mt-12">
                    <div class="upload-btn-wrapper">
                      <button className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                        Upload Excel
                      </button>
                      <input
                        type="file"
                        name="myfile"
                        onChange={onChangeHandler}
                        accept=".xlsx"
                      />
                    </div>
                    <br />
                    <textarea id="your_textarea"></textarea>
                    Total Number Uploded: {finalNumber.length}
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
                          onChange={e => setauthSid(e.target.value)}
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
                          onChange={e => setauthToken(e.target.value)}
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
                          onChange={e => setauthMsgSid(e.target.value)}
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
                          onChange={smsOnChange}
                          className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                          rows="4"
                        ></textarea>
                        SMS character : {smsLength}
                        <br></br>
                        {sendingMsg}
                      </div>
                    </div>
                  </div>
                </form>
              </div>

              {/* <div className="mt-6">
                <Checkbox>add filter</Checkbox>
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
              </div> */}

              <div className="mt-12">
                <a
                  onClick={() => sendSMS()}
                  className="get-started text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-blue-500 active:bg-blue-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"
                >
                  Send
                </a>
                <a
                  onClick={() => checkisstop()}
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
      <br />
      <br />

      <Footer />
    </>
  );
}
