import { useEffect, useRef, useState } from "react";
import { fetchWithAuth } from "../api/fetchWithAuth";
import { baseUrl } from "../constants";

export const ProfilePage = () => {
  const inputFileRef = useRef();

  const updateProfile = (e) => {
    e.preventDefault();
    fetchWithAuth(baseUrl + "user-info/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userData }),
    })
      .then((response) => console.log(response.json()))
      .then((data) => {
        console.log(data);
      });
  };

  const [userData, setUserData] = useState({
    name: "",
    surname: "",
    caption: "",
    account: { username: "", email: "", id: "" },
    photo: "",
  });

  useEffect(() => {
    fetchWithAuth(baseUrl + "user-info/", { method: "GET", headers: {} })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setUserData(data);
        }
      });
  }, []);
  return (
    <div>
      <h2>Profile information</h2>
      {userData.photo && (
        <img src={"http://127.0.0.1:8000" + userData.photo} alt="photo" />
      )}
      <div>
        Name:{" "}
        <input
          value={userData.name}
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
        />
        Surname:{" "}
        <input
          value={userData.surname}
          onChange={(e) =>
            setUserData({ ...userData, surname: e.target.value })
          }
        />
        Photo: <input type="file" ref={inputFileRef} />
        Caption:{" "}
        <input
          value={userData.caption}
          onChange={(e) =>
            setUserData({ ...userData, caption: e.target.value })
          }
        />
        Username:{" "}
        <input
          value={userData.account.username}
          onChange={(e) =>
            setUserData({
              ...userData,
              account: { ...userData.account, username: e.target.value },
            })
          }
        />
        Email: <input value={userData.account.email} disabled />
        <button onClick={updateProfile}>Submit</button>
      </div>
    </div>
  );
};
