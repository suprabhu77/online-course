import React, { useEffect, useState } from "react";
import globalAPI from "../../../_utils/globalAPI";
import Image from "next/image";

function SideBarNav() {
  const [sideNavList, setSideNavList] = useState();
  useEffect(() => {
    getSideBarNav();
  }, []);
  const getSideBarNav = () => {
    globalAPI.getSideBarNav().then((res) => {
      setSideNavList(res.sideBanners);
    });
  };
  console.log(sideNavList);
  return (
    <div>
      {sideNavList &&
        sideNavList.map((item, index) => (
          <div key={index} className="mb-4">
            <div className="bg-white rounded-lg shadow-lg p-4"> 
            {<Image src={item.banner.url} alt="url" height={10} width={300} className="rounded-lg cursor-pointer" onClick={()=>{
                window.open(item.url)
            } }/>}
            </div>
            
          </div>
        ))}
    </div>
  );
}

export default SideBarNav;
