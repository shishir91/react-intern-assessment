import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_END_POINT } from "../configs/constants";

const Profile = () => {
  const [profile, setProfile] = useState({});
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${API_END_POINT}/user/me`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")} `,
          },
        });
        console.log(response.data);
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);
  return (
    <center>
      <div className="p-10">
        <div
          style={{
            marginTop: "20px",
            marginLeft: "20px",
            boxShadow: "0px 0px 5px #ccc",
            padding: "10px",
            display: "flex",
            flexDirection: "column",
            cursor: "pointer",
          }}
        >
          <div>
            <img
              src={profile.image}
              style={{
                height: "250px",
                width: "250px",
                objectFit: "contain",
              }}
            />
          </div>
          <br />
          <div className="">
            <h3 className="font-bold text-3xl font-semibold tracking-widest rounded-lg">
              {profile.firstName} {profile.lastName}
            </h3>
            <span>
              <b>Age:</b> {profile.age}
            </span>
            <br />
            <span>
              <b>Date of Birth:</b> {profile.birthDate}
            </span>
            <br />
            <span>
              <b>Email:</b> {profile.email}
            </span>
            <br />
            <span>
              <b>Phone:</b> {profile.phone}
            </span>
          </div>
        </div>
      </div>
    </center>
  );
};

export default Profile;
